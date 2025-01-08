import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";

// Define the props type
interface PageProps {
    params: {
        id: string;
    };
}

async function ChatToFile({ params: { id } }: PageProps) {
    // Protect the route
    auth.protect();
    // Get the authenticated user's ID
    const { userId } = await auth();

    // Fetch the document reference from Firestore
    const ref = await adminDb
        .collection("users")
        .doc(userId!)
        .collection("files")
        .doc(id)
        .get();

    // Get the download URL from the document data
    const url = ref.data()?.downloadURL;

    return (
        <div className="grid lg:grid-cols-5 h-full overflow-hidden">
            {/* Right section */}
            <div className="col-span-5 lg:col-span-2 overflow-y-auto">
                {/* Chat component */}
                <Chat id={await id} />
            </div>

            {/* Left section */}
            <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-blue-600 lg:-order-1 overflow-auto">
                {/* PDF View component */}
                <PdfView url={url} />
            </div>
        </div>
    );
}

export default ChatToFile;