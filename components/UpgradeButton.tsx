"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import {  Loader2Icon, StarIcon } from "lucide-react"
import useSubscription from "@/hooks/useSubscription"
import { useTransition } from "react"


function UpgradeButton() {
    const { hasActiveMembership, loading } = useSubscription();
    const [isPending, startTransition] = useTransition();

const handleAccount = () => {
    startTransition(async () => {
     //  redirect to manage subscription
    //  router.push
    })
}

    if (!hasActiveMembership && !loading)
        return (
            <Button asChild variant={"default"} className="border-blue-600">
                <Link href={"/dashboard/upgrade"}>
                    Upgrade <StarIcon className="ml-3 fill-blue-600 text-white" />
                </Link>
            </Button>
        )

    if (loading) {
        return (
            <Button variant={"default"} className="border-blue-600">
                <Loader2Icon className="animate-spin" />
            </Button>
        )
    }
    return (
        <Button onClick={handleAccount} disabled={isPending} variant={"default"} className="border-blue-600 bg-blue-600">
            {
                isPending ? (
                    <Loader2Icon />
                ) : (
                    <p><span className="font-extrabold">PRO</span> Account</p>
                )
            }
        </Button>
    )
}

export default UpgradeButton