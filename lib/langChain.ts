import { ChatOpenAI } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { OpenAIEmbeddings } from "@langchain/openai";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {createRetrievalChain} from "langchain/chains/retrieval";
import {createHistoryAwareRetriever} from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import pineconeClient from "./pinecone";
import {PineconeStore} from "@langchain/pinecone";
import {PineconeConflictError} from '@pinecone-database/pinecone/dist/errors';
import {Index, RecordMetadata} from "@pinecone-database/pinecone";
import { adminDb } from "../firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// Initialize Gemini Model
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// ALTERNATIVE
// const model = new ChatOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//     modelName: "gpt-4o"
// });


const model = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: "gpt-4o", // <-- Add your deployment name here
    azureOpenAIApiVersion: "2024-02-01", // Use the correct API version
  });

export const indexName = "nexus";
export async function generateDocs(docId:string) {
    const {userId} = await auth();

    if(!userId) {
        throw new Error("User not found");
    }

    console.log("--- Fetching the download URL from Firebase ... ---");
    const firebaseRef = await adminDb.collection("users")
    .doc(userId)
    .collection("files")
    .doc(docId)
    .get();

    const downloadUrl = firebaseRef.data()?.downloadURL;

    if(!downloadUrl) {
        throw new Error("Download URL not found please confirm")
    }

    console.log(`--- Download URL: ${downloadUrl} ---` );

    // Fetch the PDF from the specified URL
    const response = await fetch(downloadUrl);
    // Load the PDF into a PDFDocument Object

    // blob resembles binary info
    const data = await response.blob();

    // Now load the PDF doc from the specified path

    console.log(" --- Loading the PDF Document ---");
    const loader = new PDFLoader(data);
    const docs  = await loader.load();

    // Split the PDF into chunks
    console.log("--- Splitting the doc into smaller parts ... ---");
    const splitter = new RecursiveCharacterTextSplitter();
    const splitDocs = await splitter.splitDocuments(docs);
    console.log(`--- Split into ${splitDocs.length} parts ---`)

    return splitDocs
}


async function namespaceExists(index: Index<RecordMetadata>, namespace:string) {
    if(namespace === null) throw new Error("No namespace value provided");
    const {namespaces} = await index.describeIndexStats();
    return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineconeVectorStore(docId:string) {
    const {userId} = await auth();

    if (!userId) {
        throw new Error ("User not found");
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
                namespace: docId
            });

            return pineconeVectorStore;
        } else {
            // if namespace does not exist, download the PDF from firestore & generate embeddings and store them in Pinecone vector store
            const splitDocs = await generateDocs(docId);

            console.log(`--- Storing the embeddings in namespace ${docId} in the ${indexName} Pinecone vector store ... ---`);

            pineconeVectorStore = await PineconeStore.fromDocuments(
                splitDocs,
                embeddings,
                {
                    pineconeIndex: index,
                    namespace: docId,
                }
            )
            return pineconeVectorStore;
        }

}

