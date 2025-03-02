import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Contact() {
    return (
        <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
            <Navbar />
            <div className="bg-white pt-24 pb-4 sm:pt-32 rounded-md drop-shadow-xl">
                <div className="mx-auto max-w-2xl text-center px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Contact Us
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Have any questions? Get in touch with us!
                    </p>
                </div>

                <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-10 text-gray-600 leading-7">
                    {/* Contact Email */}
                    <h2 className="text-xl font-semibold text-gray-900">Email</h2>
                    <p className="mt-2">
                        Reach out to me{" "}
                        <a
                            href="mailto:prestonnyamweya@gmail.com"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            prestonnyamweya@gmail.com
                        </a>
                    </p>

                    {/* Social Media Links */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Social Media</h2>
                    <p className="mt-2">
                        Follow me on{" "}
                        <a
                            href="https://twitter.com/@preston_mayieka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            X
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://linkedin.com/preston-mayieka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            LinkedIn
                        </a>
                    </p>

                    {/* Contact Form */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Send Us a Message</h2>
                    <form className="mt-4">
                        <div className="grid grid-cols-1 gap-4 text-white">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-3 border border-gray-300 rounded-lg "
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                required
                            />
                            <textarea
                                placeholder="Your Message"
                                className="w-full p-3 border border-gray-300 rounded-lg h-32"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <Footer />
            </div>
        </main>
    );
}
