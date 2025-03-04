"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2Icon, Maximize, Minimize } from "lucide-react";

function PdfView({ url }: { url: string }) {
    const [file, setFile] = useState<Blob | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [scale, ] = useState<number>(1);
    const embedRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchFile = async () => {
            const response = await fetch(url);
            setFile(await response.blob());
        };
        fetchFile();
    }, [url]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            embedRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };


    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div
                ref={embedRef}
                className={`relative w-full max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] ${
                    isFullscreen ? "h-screen" : "h-[92vh]"
                } flex flex-col items-center overflow-hidden`}
            >
                {/* Controls */}
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                    {/* <button
                        onClick={zoomOut}
                        aria-label="Zoom Out"
                        className="bg-gray-800 text-white p-2 rounded-md"
                    >
                        <ZoomOut size={20} />
                    </button>
                    <button
                        onClick={zoomIn}
                        aria-label="Zoom In"
                        className="bg-gray-800 text-white p-2 rounded-md"
                    >
                        <ZoomIn size={20} />
                    </button> */}
                    <button
                        onClick={toggleFullscreen}
                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                        className="bg-gray-800 text-white p-2 rounded-md"
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                </div>

                {/* PDF Viewer */}
                {file ? (
                    <embed
                        src={URL.createObjectURL(file)}
                        type="application/pdf"
                        width={`${scale * 100}%`}
                        height="100%"
                        className="border-0"
                    />
                ) : (
                    <Loader2Icon className="animate-spin h-20 w-20 text-blue-600" />
                )}
            </div>
        </div>
    );
}

export default PdfView;
