"use server";

import { Message } from "@/components/Chat";
import { adminDb } from "@/firebaseAdmin";
import { generateLangchainCompletion } from "@/lib/langChain";
import { auth } from "@clerk/nextjs/server";
// import { generateLangchainCompletion } from "@/lib/langChain/langchain";

const FREE_LIMIT = 10;
const PRO_LIMIT = 100;

export async function askQuestion(id: string, question: string) {
  auth.protect();

  const { userId } = await auth();

  const chatRef = adminDb
    .collection("users")
    .doc(userId!)
    .collection("files")
    .doc(id)
    .collection("chat");

  const chatSnapshot = await chatRef.get();
  const userMessages = chatSnapshot.docs.filter(
    (doc) => doc.data().role === "human"
  );

  //   TODO: Limit Pro/free users

  const userMessage: Message = {
    role: "human",
    message: question,
    createdAt: new Date(),
  };

  await chatRef.add(userMessage);

  //   Get AI Response
  const reply = await generateLangchainCompletion(id, question);

  const aiMessage: Message = {
    role: "ai",
    message: reply,
    createdAt: new Date(),
  };

  //   add that to Database

  await chatRef.add(aiMessage);

  return {success: true, message: null}
}
