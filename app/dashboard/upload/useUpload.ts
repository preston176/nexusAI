"use client"

import { useState } from "react"

export enum StatusText {
    UPLOADING = "File is Uploading...",
    UPLOADED = "File Uploaded Successfully",
    SAVING = "Saving file to database",
    GENERATING = "Generating AI Embeddings, This will only take a few seconds ..."
}

export type Status = StatusText[keyof StatusText]

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const [status, setStatus] = useState<Status | null>(null);
}

export default useUpload