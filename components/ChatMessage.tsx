"use client"

import { useUser } from "@clerk/nextjs";
import { Message } from "./Chat"
import Image from "next/image";
import { BotIcon, Loader2Icon } from "lucide-react";
import Markdown from "react-markdown"

function ChatMessage({ message }: { message: Message }) {
    const isHuman = message.role === "human";
    const { user } = useUser();

    return (
        <div className={`chat ${isHuman ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    {
                        isHuman ? (
                            user?.imageUrl && (
                                <Image
                                    src={user?.imageUrl}
                                    alt="Profile pic"
                                    height={40}
                                    width={40}
                                    className="rounded-full"
                                />
                            )
                        ) : (
                            <div className="h-10 w-10 bg-blue-600 flex items-center justify-center">
                                <BotIcon className="text-white h-7 w-7" />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={`chat-bubble prose ${isHuman && "bg-blue-600 text-white"}`}>
                {
                    message.message === "Processing ..." ? (
                        <div className="flex items-center justify-center">
                            <Loader2Icon className="animate-spin h-5 w-5 text-white" />
                        </div>
                    ) : (
                        <Markdown>{message.message}</Markdown>
                    )
                }
            </div>
        </div>
    )
}

export default ChatMessage