import { EyeIcon, GlobeIcon, ServerCogIcon, ZapIcon } from "lucide-react";
import { features } from "./_data/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
      <div className="bg-white py-24 sm:py-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto container px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-base font-serif leading-7 text-indigo-600">Your AI-Powered Document Companion</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Transform Your PDFs into Interactive Conversations</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600">NexusAI</span>
              <br />
              <br /> Upload your document, and our chatbot will answer questions, summarize content and answer all your Questions.
              Ideal for everyone.<span className="text-indigo-600 font-bold">NexusAI</span>{" "}
              turns static documents into {" "}
              <span className="font-bold">
                dynamic conversations
              </span>,
              enhancing your productivity
            </p>
          </div>
          <Button asChild className="mt-10">
            <Link href={"/dashboard"}>
              Get Started</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
