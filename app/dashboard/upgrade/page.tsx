"use client";

import { Button } from "@/components/ui/button";
import useSubscription from "@/hooks/useSubscription";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import PaystackPop from '@paystack/inline-js';

export type UserDetails = {
    email?: string;
    name: string;
};

function PricingPage() {
    const { user } = useUser();
    const router = useRouter();
    const { hasActiveMembership, loading } = useSubscription();
    const [isPending, startTransition] = useTransition();

    const handleUpgrade = async () => {
        if (!user) {
            console.error("User is not logged in");
            return;
        }

        const userDetails: UserDetails = {
            email: user.primaryEmailAddress?.toString(),
            name: user.fullName ? user.fullName.toString() : "Unknown",
        };

        startTransition(async () => {
            // Request initialization on backend to create a Paystack transaction
            if (hasActiveMembership === true) {
                return;
            }


                const paystack = new PaystackPop();
                paystack.newTransaction({
                    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!, // Your public key
                    email: userDetails.email!,
                    amount: 25000, // Amount in kobo
                    onCancel: () => {
                        alert("Transaction cancelled");
                        router.push(`/dashboard?upgrade=false`);
                    },
                    onLoad: () => {
                        // Transaction has loaded

                        // You can parse the transaction object if you need to.
                    },
                    onSuccess: async (transaction) => {
                        alert(`Payment successful! Verifying transaction...`);
            
                        try {
                            const verifyResponse = await fetch("/api/paystack", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    reference: transaction.reference,
                                    userId: user.id,
                                }),
                            });
            
                            const result = await verifyResponse.json();
            
                            if (result.success) {
                                alert("Payment verified successfully!");
                                router.push(`/dashboard?upgrade=true`);
                            } else {
                                alert("Payment verification failed!");
                                router.push(`/dashboard?upgrade=false`);
                            }
                        } catch (error) {
                            alert("Error verifying payment");
                            console.error(error)
                            router.push(`/dashboard?upgrade=false`);
                        }
                    },
                    onError: () => {
                        alert("An Error occurred!!");
                        router.push(`/dashboard?upgrade=false`);
                    }
                });
            
        });
    };

    return (
        <>
            <Head>
                <script src="https://js.paystack.co/v1/inline.js" async></script>
            </Head>
            <div>
                <div className="py-25 sm:py-32">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-base font-semibold leading-7 text-blue-500">Pricing</h2>
                        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Supercharge your Document Companion
                        </p>
                    </div>

                    <p className="mx-auto mt-6 max-w-2xl px-10 text-center text-lg leading-8 text-gray-600">
                        Select an affordable plan that&apos;s packed with the best features for interacting with your PDFs, enhancing productivity and streamlining your workflow
                    </p>
                    <div className="max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 md:max-w-2xl gap-8 lg:max-w-4xl">
                        <div className="ring-1 ring-gray-200 p-8 h-fit pb-12 rounded-3xl">
                            <h3 className="text-lg font-semibold leading-8 text-gray-900">Starter Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                                Explore Core Features at No Cost
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">Free</span>
                            </p>
                            <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                                <li className="flex gap-x-3">
                                    <CheckIcon className="h-6 w-5 flex-none text-blue-600" />
                                    Store up to 5 Documents at a time.
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
                        </div>

                        <div className="ring-2 ring-blue-600 rounded-3xl p-8">
                            <h3 className="text-lg font-semibold leading-8 text-blue-600">Pro Plan</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">
                                Maximize your Productivity with PRO Features
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tighter text-gray-900">Ksh 250</span>
                                <span className="text-sm font-semibold leading-6 text-gray-600">/ Month</span>
                            </p>

                            <Button
                                disabled={loading || isPending}
                                className="bg-blue-600 w-full text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                onClick={handleUpgrade}
                            >
                                {isPending || loading
                                    ? "Loading"
                                    : hasActiveMembership
                                        ? "Manage My Subscription"
                                        : "Upgrade To Pro"}
                            </Button>

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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PricingPage;