"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import { Loader2Icon, StarIcon } from "lucide-react"
import useSubscription from "@/hooks/useSubscription"

function UpgradeButton() {
    const { hasActiveMembership, loading } = useSubscription();

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
        <Button variant={"default"} className="border-blue-600 bg-blue-600">
            <p><span className="font-extrabold">PRO</span> Account</p>
        </Button>
    )
}

export default UpgradeButton