import { features } from "./_data/features";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
      <Navbar />
      <div className="bg-white pt-24 pb-4 sm:pt-32 rounded-md drop-shadow-xl">
        <div className="flex flex-col justify-center items-center mx-auto container px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            {/* Product Hunt Embed */}
            <div className="flex items-center justify-center my-5">
              <a href="https://www.producthunt.com/posts/nexus-ai-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-nexus&#0045;ai&#0045;3" target="_blank">
                <Image
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=939232&theme=dark&t=1741334050851"
                  alt="Nexus&#0032;AI - Store&#0032;and&#0032;chat&#0032;with&#0032;your&#0032;documents&#0044;&#0032;all&#0032;in&#0032;one&#0032;place | Product Hunt"
                  width={250}
                  height={54}
                />
              </a>
            </div>
            <h2 className="text-base font-serif leading-7 text-indigo-600">
              Your AI-Powered Document Companion
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Transform Your PDFs into Interactive Conversations
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Introducing{" "}
              <span className="font-bold text-indigo-600">NexusAI</span>
              <br />
              <br />
              Upload your document, and our chatbot will answer questions, summarize content, and answer all your questions.
              Ideal for everyone. <span className="text-indigo-600 font-bold">NexusAI</span>{" "}
              turns static documents into{" "}
              <span className="font-bold">dynamic conversations</span>, enhancing your productivity.
            </p>
          </div>
          <div className="flex gap-4">
            <Button variant={"default"} asChild className="mt-10">
              <Link href={"/dashboard"}>Get Started</Link>
            </Button>
            <Button variant={"link"} asChild className="mt-10">
              <Link href={"https://www.youtube.com/embed/qxq8C-HEZVY"} target="_blank">Watch A Demo</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative overflow-hidden pt-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Image
              alt="Application Screenshot"
              src={"/demo.png"}
              width={2432}
              height={1442}
              className="mb-[-0%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            />
            <div aria-hidden="true" className="relative">
              <div className="absolute bottom-0 bg-gradient-to-t from-white/90 pt-[5%]"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
          <dl className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature, index) => (
              <div key={index} className="relative pl-9">
                {/* Corrected icon usage */}
                <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                <dt className="inline font-semibold text-gray-900">{feature.name}</dt>
                <dd>{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
