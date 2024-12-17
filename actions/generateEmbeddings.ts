"use server"

import { generateEmbeddingsInPineconeVectorStore } from "@/lib/langChain";
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId:string) {
    auth.protect();

    // Helper function to turn a pdf into vector embeddings
    await generateEmbeddingsInPineconeVectorStore(docId);

    revalidatePath('/dashboard');

    return {completed: true}
}