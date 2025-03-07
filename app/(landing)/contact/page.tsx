"use client";

import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";



export default function Contact() {

    const { toast } = useToast()

    const recaptcha = useRef<ReCAPTCHA | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        const recaptchaToken = recaptcha.current?.getValue();
        if (!recaptchaToken) {
            toast({
                title: "An error ocurred",
                description: "Please complete ReCAPTCHA first!",
            })
            setStatus(null);
            return;
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_API as string, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });

            if (response.ok) {
                setStatus("success");
                toast({
                    title: "Message Sent Successfully",
                    description: "Please complete ReCAPTCHA first!",
                })
                setFormData({ name: "", email: "", message: "" });
                recaptcha.current?.reset();
            } else {
                setStatus("error");
                toast({
                    title: "An error ocurred",
                    description: "Error while submitting your message",
                })
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        
        }
    };

    return (
        <main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to bg-blue-600">
            <Toaster />
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
                        Reach out to{" "}
                        <Link href="mailto:prestonnyamweya@gmail.com" target="_blank" className="text-indigo-600 font-semibold hover:underline">
                            prestonnyamweya@gmail.com
                        </Link>
                    </p>

                    {/* Social Media Links */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Social Media</h2>
                    <p className="mt-2">
                        Follow me on{" "}
                        <Link
                            href="https://twitter.com/preston_mayieka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            X
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="https://linkedin.com/in/preston-mayieka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            LinkedIn
                        </Link>
                    </p>

                    {/* Contact Form */}
                    <h2 className="text-xl font-semibold text-gray-900 mt-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="grid grid-cols-1 gap-4 text-white">
                            <Input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                required
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                                required
                            />
                            <Textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg h-32 text-black"
                                required
                            ></Textarea>
                            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} ref={recaptcha} />
                            <button
                                type="submit"
                                className={`w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg ${status === "loading" ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
                                    } disabled:cursor-not-allowed`}
                                disabled={status === "loading" || !recaptcha.current?.getValue()}
                            >
                                {status === "loading" ? "Sending..." : "Send Message"}
                            </button>
                        </div>
                    </form>
            <Footer />
                </div>
            </div>

        </main>
    );
}
