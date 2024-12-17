import { Pinecone } from '@pinecone-database/pinecone';

if (!process.env.NEXT_PUBLIC_PINECONE_API_KEY) {
    throw new Error("NEXT_PUBLIC_PINECONE_API_KEY is missing ")
}

const pineconeClient = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY || '',
})

export default pineconeClient;