import Header from "@/components/Header"
import { ClerkLoaded } from "@clerk/nextjs"
import Head from "next/head"

function DashboardLayout({ children }: { children: React.ReactNode }) {
    <Head>
        <script src="https://apis.google.com/js/platform.js" async defer></script>

    </Head>
    return (
        <>
            <ClerkLoaded><div className="flex flex-col flex-1 h-screen">
                <Header />
                <main className="flex-1 overflow-y-auto">{children}</main></div></ClerkLoaded>
        </>
    )
}

export default DashboardLayout