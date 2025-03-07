"use client";

import { features } from "@/app/_data/features";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

function Features() {
    return (
        <>
            <Head>
                <title>Features</title>
            </Head>
            <div className="flex flex-col overflow-y-scroll">
                <Navbar />
                <main className="flex-grow py-24 sm:py-32 ">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-500">Features</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Unlock the Power of Smart PDF Management
                        </p>
                    </div>
                    <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
                        Explore the advanced capabilities designed to enhance your document experience.
                    </p>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                        {features.map((feature, index) => (
                            <div key={index} className="ring-1 ring-gray-200 p-8 rounded-3xl text-center shadow-sm">
                                <feature.icon className="h-12 w-12 mx-auto text-blue-600" />
                                <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.name}</h3>
                                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Features;