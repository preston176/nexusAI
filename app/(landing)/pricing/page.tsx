"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";

function Pricing() {
    const { user } = useUser();
    const router = useRouter();

    const handleUpgrade = () => {
        if (user) {
            router.push("/dashboard/upgrade");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <>
            <Head>
                <title>Pricing</title>
            </Head>
            <div>
                <Navbar />
                <div className="py-25 sm:py-32">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-base font-semibold leading-7 text-blue-500">Pricing</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Supercharge your Document Companion
                        </p>
                    </div>
                    <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
                        Select an affordable plan packed with features for interacting with your PDFs.
                    </p>
                    <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
                        <div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
                            <h3 className="text-lg font-semibold leading-8 text-gray-900">Starter Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">Explore Core Features at No Cost</p>
                            <p className="mt-6 text-4xl font-bold tracking-tight text-gray-900">Free</p>
                            <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-blue-600" />
                                    Store up to 5 Documents
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-blue-600" />
                                    Up to 10 Messages per document <br />
                                    Resets every 48 Hours
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-blue-600" />
                                    Try out the AI Chat Functionality
                                </li>
                            </ul>

                            <Button
                                className="bg-black w-full text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6"
                                onClick={handleUpgrade}
                            >
                                Get Started
                            </Button>
                        </div>
                        <div className="ring-2 ring-blue-600 rounded-3xl p-8">
                            <h3 className="text-lg font-semibold leading-8 text-blue-600">Pro Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">Maximize productivity with PRO features</p>
                            <p className="mt-6 text-4xl font-bold tracking-tighter text-gray-900">Ksh 250</p>
                            <p className="text-sm font-semibold leading-6 text-gray-600">/ Month</p>
                            <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                                    Store  upto<span className="font-bold">100</span> Documents
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                                    Ability to Delete Documents
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                                    Unlimited Messaging
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                                    Full Power AI Chat Functionality with Memory Recall
                                </li>
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" />
                                    24-hour support
                                </li>
                            </ul>

                            <Button
                                className="bg-blue-600 w-full text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6"
                                onClick={handleUpgrade}
                            >
                                Explore More
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Pricing;
