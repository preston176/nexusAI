"use server";

import { adminDb, adminStorage } from "@/firebaseAdmin";

import { indexName } from "@/lib/langChain";
import pineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteDocument(docId: string) {
  auth.protect();
  const { userId } = await auth();

  //   Delete the docuemnt from the database

  await adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(docId)
    .delete();

  // Also delete from firebase storage

  await adminStorage
    .bucket(process.env.FIREBASE_STORAGE_BUCKET)
    .file(`users/${userId}/files/${docId}`)
    .delete();

  try {
    // Delete all embeddings of the document
    const index = await pineconeClient.index(indexName);
    await index.namespace(docId).deleteAll();
  } catch {
    console.error("Embeddings do not exist");
  }

  // Revalidate the dashboard page

  revalidatePath("/dashboard");
}
