import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// Ensure `params` is awaited properly
async function ChatToFile({ params }: { params: Promise<{ id: string }> }) {
    // Await the params to resolve the promise
    const resolvedParams = await params;
    const { id } = resolvedParams;

    auth.protect();
    const { userId } = await auth();

    const ref = await adminDb
        .collection("users")
        .doc(userId!)
        .collection("files")
        .doc(id)
        .get();

    const url = ref.data()?.downloadURL;

    return (
        <div className="grid lg:grid-cols-5 h-full overflow-hidden">
            {/* Right */}
            <div className="col-span-5 lg:col-span-2 overflow-y-auto">
                {/* Chat */}
                <Chat id={id} />
            </div>

            {/* Left */}
            <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-blue-600 lg:-order-1 overflow-auto">
                {/* View the PDF */}
                <PdfView url={url} />
            </div>
        </div>
    );
}

export default ChatToFile;
