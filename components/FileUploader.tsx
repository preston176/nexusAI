"use client"

import useUpload, { StatusText } from "@/app/dashboard/upload/useUpload";
import { BuildingIcon, CheckCircleIcon, CircleArrowDown, RocketIcon, SaveIcon } from "lucide-react"
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, JSX } from "react"
import { useDropzone } from "react-dropzone"

function FileUploader() {
    const { progress, status, fileId, handleUpload } = useUpload();
    const router = useRouter();

    useEffect(() => {
        if (fileId) {
            router.push(`/dashboard/files/${fileId}`);
        }
    }, [fileId, router]);
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do sth with files
        const file = acceptedFiles[0]
        if (file) {
            await handleUpload(file)
        } else {

        }
    }, [handleUpload])

    const statusIcons: {
        [key in StatusText]: JSX.Element;
    } = {
        [StatusText.UPLOADING] : (
            <RocketIcon className="h-20 w-20 text-indigo-600" />
        ),
        [StatusText.UPLOADED] : (
            <CheckCircleIcon className="h-20 w-20 text-indigo-600" />
        ),
        [StatusText.GENERATING] : (
            <BuildingIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
        ),
        [StatusText.SAVING] : (
            <SaveIcon className="h-20 w-20 text-indigo-600 animate-bounce" />
        ),
    }
    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "application/pdf": [".pdf"]
        }
    })
    const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

    return (
        <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
            {
                uploadInProgress && (
                    <div className="mt-32 flex flex-col justify-center items-center gap-5">
                        <div className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${progress === 100 && "hidden"
                            }`}
                            role="progressbar"
                            style={{
                                // @ts-expect-error DaisyUI styling
                                "--value": progress,
                                "--size": "12rem",
                                "--thickness": "1.3rem"
                                ,
                            }}>
                            {progress} %
                        </div>
                        {/* Render Status Icon */}
                        {
                            // @ts-expect-error DaisyUI
                            statusIcons[status!]
                        }
                        <p className="text-indigo-600 animate-pulse">{String(status) ?? ''}</p>
                    </div>
                )
            }
            {!uploadInProgress && (<div className={`p-10 border-indigo-600 text-indigo-600 border-2 border-dashed mt-10 w-[90%] rounded-lg h-96 flex items-center text-center justify-center hover:cursor-grabbing hover:border-indigo-900 hover:text-indigo-900 transition-all duration-100 ease-in-out ${isFocused || isDragAccept ? "bg-indigo-300" :
                "bg-indigo-100"
                }`}    {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center">
                    {
                        isDragActive ? (
                            <>
                                <RocketIcon className="h-20 w-20 animate-ping" />
                                <p>Drop the files here ...</p>
                            </>
                        ) : (
                            <>
                                <CircleArrowDown className="h-20 w-20 animate-bounce" />
                                <p>Drag &apos;n&apos; drop files here or click to select files</p>
                            </>

                        )
                    }
                </div>
            </div>)}
        </div>
    )
}

export default FileUploader