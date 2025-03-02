import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { Index, RecordMetadata } from "@pinecone-database/pinecone";
import { adminDb } from "../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
// Alternative
import { ChatGroq } from "@langchain/groq";



// Initialize Gemini Model
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// ALTERNATIVE
// const model = new ChatOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     modelName: "gpt-4o"
// });

// const model = new ChatOpenAI({
//   azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
//   azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
//   azureOpenAIApiDeploymentName: "gpt-4o", // <-- Add your deployment name here
//   azureOpenAIApiVersion: "2024-02-01", // Use the correct API version
// });

// GROQ Free
const model = new ChatGroq({
  model: "mixtral-8x7b-32768",
  temperature: 0
});

export const indexName = "nexus";

async function fetchMessagesFromDB(docId: string) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not found");
  }
  console.log("---Fetching chat history from firebase db ---");
  // get the last 6 msg from chat history

  const chats = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .collection("chat")
    .orderBy("createdAt", "desc")
    // .limit(LIMIT)
    .get();

  const chatHistory = chats.docs.map((doc) =>
    doc.data().role === "human"
      ? new HumanMessage(doc.data().message)
      : new AIMessage(doc.data().message)
  );

  console.log(
    `--- Fetched last ${chatHistory.length} messages successfully ---`
  );

  console.log(chatHistory.map((msg) => msg.content.toString()));

  return chatHistory;
}

export async function generateDocs(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  console.log("--- Fetching the download URL from Firebase ... ---");
  const firebaseRef = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .get();

  const downloadUrl = firebaseRef.data()?.downloadURL;

  if (!downloadUrl) {
    throw new Error("Download URL not found please confirm");
  }

  console.log(`--- Download URL: ${downloadUrl} ---`);

  // Fetch the PDF from the specified URL
  const response = await fetch(downloadUrl);
  // Load the PDF into a PDFDocument Object

  // blob resembles binary info
  const data = await response.blob();

  // Now load the PDF doc from the specified path

  console.log(" --- Loading the PDF Document ---");
  const loader = new PDFLoader(data);
  const docs = await loader.load();

  // Split the PDF into chunks
  console.log("--- Splitting the doc into smaller parts ... ---");
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`--- Split into ${splitDocs.length} parts ---`);

  return splitDocs;
}

async function namespaceExists(
  index: Index<RecordMetadata>,
  namespace: string
) {
  if (namespace === null) throw new Error("No namespace value provided");
  const { namespaces } = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineconeVectorStore(docId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not found");
  }

  let pineconeVectorStore;

  // generate embeddings (numerical representations) for the split documents
  console.log("--Generating Embeddings for the split documents... ---");

  const embeddings = new OpenAIEmbeddings();

  const index = await pineconeClient.index(indexName);
  const namespaceAlreadyExists = await namespaceExists(index, docId);

  if (namespaceAlreadyExists) {
    console.log(
      `--- Namespace ${docId} already exists, reusing existing embeddings ... ---`
    );

    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  } else {
    // if namespace does not exist, download the PDF from firestore & generate embeddings and store them in Pinecone vector store
    const splitDocs = await generateDocs(docId);

    console.log(
      `--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store ... ---`
    );

    pineconeVectorStore = await PineconeStore.fromDocuments(
      splitDocs,
      embeddings,
      {
        pineconeIndex: index,
        namespace: docId,
      }
    );
    return pineconeVectorStore;
  }
}

const generateLangchainCompletion = async (docId: string, question: string) => {

  const pineconeVectorStore = await generateEmbeddingsInPineconeVectorStore(docId);

  if (!pineconeVectorStore) {
    throw new Error("Pinecone vector store not found");
  }
  // TODO: Create a retriever to search through the vector store

  console.log("---Creating a retriever ---");

  const retriever = pineconeVectorStore.asRetriever();

  //   Fetch the chat history from the database

  const chatHistory = await fetchMessagesFromDB(docId);

  //   Define a prompt template for generating search queries based on conversation history

  console.log("--- Defining a prompt template... ---");

  const historyAwarePrompt = ChatPromptTemplate.fromMessages([
    ...chatHistory,
    ["user", "{input}"],
    [
      "user",
      "given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
    ],
  ]);

  // Create a history aware retriever chain that uses the model, retriever and prompt

  console.log("--- Creating a history-aware retriever chain");

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  //   Define a prompt template for answering questions based on retrieved context
  console.log("--- Defining a prompt template for answering questions ... ---");
  const historyAwareRetrievalPrompt = ChatPromptTemplate.fromMessages([
    ["system", "Answer the user's question based on the below context:"],
    ["system", "{context}"], 
    ...chatHistory,
    ["user", "{input}"],
  ]);

  // Create a chain to combine the retrieved documents into a coherent response

  console.log("--- Creating a document combining chain ... ---");
  const historyAwareCombineDocsChain = await createStuffDocumentsChain({
    llm: model,
    prompt: historyAwareRetrievalPrompt,
  });

  // Create the main retrieval chain that combines the history-aware retriever and document combining chains
  console.log("--- Creating the main retrieval chain ---");
  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: historyAwareCombineDocsChain,
  });

  console.log(" --- Running the chain with a sample conversation ----");
  const reply = await conversationalRetrievalChain.invoke({
    chat_history: chatHistory,
    input: question,
  });

  // Print the result to console

  console.log(reply.answer);
  return reply.answer;
};

// Export the moel and the run function

export { model, generateLangchainCompletion };
