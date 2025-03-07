import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
            <Navbar />
            <div className="bg-white pt-24 pb-4 sm:pt-32 rounded-md drop-shadow-xl">
                <div className="mx-auto max-w-2xl text-center px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        About NexusAI
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Your AI-powered document companion for smarter interactions.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-10 text-gray-600 leading-7">
                    {/* Our Mission */}
                    <h2 className="text-xl font-semibold text-gray-900">Our Mission</h2>
                    <p className="mt-2">
                        At <span className="text-indigo-600 font-semibold">NexusAI</span>, we aim to
                        revolutionize the way people interact with their documents. Our AI-powered
                        chatbot transforms static PDFs into dynamic, conversational experiences, helping
                        users quickly extract insights, ask questions, and summarize content efficiently.
                    </p>

                    {/* How It Works */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">How It Works</h2>
                    <ul className="mt-2 list-disc list-inside space-y-2">
                        <li>Upload your document securely.</li>
                        <li>Ask questions and get AI-generated answers.</li>
                        <li>Summarize lengthy content in seconds.</li>
                        <li>Improve productivity with smarter document interactions.</li>
                    </ul>

                    {/* Why Choose Us */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Why Choose NexusAI?</h2>
                    <p className="mt-2">
                        NexusAI is built for students, researchers, and professionals who need instant
                        insights from their documents. With cutting-edge AI, we make information more
                        accessible and easy to understand.
                    </p>

                    {/* Join Us */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Join Our Journey</h2>
                    <p className="mt-2">
                        Be part of the future of document processing.{" "}
                        <a
                            href="/dashboard"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Get Started
                        </a>{" "}
                        today!
                    </p>

                    {/* Video Section */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Watch Our Introduction Video</h2>
                    <div className="mt-4">
                        <iframe
                            className="w-full aspect-video rounded-md"
                            src="https://www.youtube.com/embed/qxq8C-HEZVY"
                            title="NexusAI Introduction"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>

                <Footer />
            </div>
        </main>
    );
}
