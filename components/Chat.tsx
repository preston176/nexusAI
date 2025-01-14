"use client"
import { FormEvent, useEffect, useRef, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { askQuestion } from "@/actions/askQuestion"
import { Loader2Icon } from "lucide-react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useUser } from "@clerk/nextjs"
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "@/firebase"
import ChatMessage from "./ChatMessage"
import { useToast } from "@/hooks/use-toast"


export type Message = {
    id?: string;
    role: "human" | "placeholder" | "ai";
    message: string;
    createdAt: Date;
};

function Chat({ id }: {
    id: string
}) {

    const { user } = useUser();
    const { toast } = useToast();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("")
    const [isPending, startTransition] = useTransition();

    // Create A ref to redirect the user to the bottom of page
    const bottomofChatRef = useRef<HTMLDivElement>(null);


    const [snapshot, loading,] = useCollection(
        user && query(
            collection(db, "users", user?.id, "files", id, "chat"),
            orderBy("createdAt", "asc")
        )
    )

    useEffect(() => {
        bottomofChatRef.current?.scrollIntoView(
            {
                behavior: "smooth"
            }
        )
    }, [messages]);

    useEffect(() => {
        if (!snapshot) return;

        // console.log("updated snapshot", snapshot.docs)

        // get 2nd last msg to check if the AI is thinking

        const lastMessage = messages.pop();
        if (lastMessage?.role === "ai" && lastMessage.message === "Processing ...") {
            // return this is a dummy placeholder msg
            return;
        }
        const newMessages = snapshot.docs.map(doc => {
            const { role, message, createdAt } = doc.data();
            return {
                id: doc.id,
                role,
                message,
                createdAt: createdAt.toDate()
            }

        })

        setMessages(newMessages);

    }, [snapshot]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const question = input;

        setInput("");

        // Optimistic UI Update

        setMessages((prev) => [
            ...prev,
            {
                role: "human",
                message: question,
                createdAt: new Date(),
            },
            {
                role: "ai",
                message: "Processing ...",
                createdAt: new Date(),
            },
        ])

        startTransition(async () => {
            const { success, message } = await askQuestion(id, question)

            if (!success) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: message,
                });

                setMessages((prev) =>
                    prev.slice(0, prev.length - 1).concat([
                        {
                            role: "ai",
                            message: `Sorry... ${message}`,
                            createdAt: new Date(),
                        },
                    ])

                )
            }
        });
    }
    return (
        <div className="flex flex-col h-full overflow-scroll">
            {/*Contents  */}
            <div className="flex-1 w-full">
                {/* Chat msgs */}
                {
                    loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2Icon className="animate-spin h-20 w-20 text-blue-600 mt-20" />
                        </div>
                    ) : (
                        <div className="p-5 ">
                            {
                                messages.length === 0 && (
                                    <ChatMessage
                                        key={"placeholder"}
                                        message={{
                                            role: "ai",
                                            message: "Ask me anything about this document! I will be glad to answer",
                                            createdAt: new Date()
                                        }}
                                    />
                                )
                            }
                            {
                                messages.map((msg, index) => (
                                    <ChatMessage key={index} message={msg} />
                                ))
                            }
                            <div ref={bottomofChatRef}></div>
                        </div>
                    )
                }

            </div>

            <form
                onSubmit={handleSubmit}
                className="flex sticky bottom-0 space-x-2 p-5 bg-blue-600/75"
            >
                <Input
                    placeholder="Ask me anything ..."
                    value={input}
                    className="bg-white placeholder:text-black outline-none active:shadow-lg hover:shadow-lg shadow-md"
                    onChange={e => setInput(e.target.value)}
                />
                <Button className="hover:cursor-pointer" type="submit" disabled={
                    !input || isPending
                }>
                    {
                        isPending ? (
                            <Loader2Icon className="animate-spin text-blue-600" />
                        ) : (
                            "Ask"
                        )
                    }
                </Button>
            </form>
        </div>
    )
}

export default Chat