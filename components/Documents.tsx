import { auth } from "@clerk/nextjs/server";
import PlaceholderDocument from "./PlaceholderDocument";
import { adminDb } from "@/firebaseAdmin";
import Document from "./Document";
async function Documents() {
    auth.protect();
    // Fetch the authenticated user's details
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User not found");
    }

    // Fetch documents from Firestore
    const documentSnapshot = await adminDb
        .collection("users")
        .doc(userId)
        .collection("files")
        .get();

    // Check if there are no documents
    const documents = documentSnapshot.docs;

    return (
        <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">

            {documents.length > 0 && (
                documents.map((doc) => {
                    const { name, downloadURL, size } = doc.data();
                    return (
                        <Document
                            key={doc.id}
                            id={doc.id}
                            name={name}
                            size={size}
                            downloadURL={downloadURL}
                        />
                    );
                })
            )}
          <PlaceholderDocument />
        </div>
    );
}

export default Documents;
