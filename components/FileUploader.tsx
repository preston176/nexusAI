"use client"

import { CircleArrowDown, RocketIcon } from "lucide-react"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"

function FileUploader() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do sth with files
        console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop })

    return (
        <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
            <div className={`p-10 border-indigo-600 text-indigo-600 border-2 border-dashed mt-10 w-[90%] rounded-lg h-96 flex items-center text-center justify-center hover:cursor-grabbing hover:border-indigo-900 hover:text-indigo-900 transition-all duration-100 ease-in-out ${isFocused || isDragAccept ? "bg-indigo-300" :
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
            </div>
        </div>
    )
}

export default FileUploader