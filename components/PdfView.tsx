"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";
// import { Button } from "./ui/button";
import { Loader2Icon, Maximize, Minimize } from "lucide-react";

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({ url }: { url: string }) {
    // const [numPages, setNumPages] = useState<number>();
    // const [pageNumber, setPageNumber] = useState<number>(1);
    const [file, setFile] = useState<Blob | null>(null);
    // const [rotation, setRotation] = useState<number>(0);
    // const [scale, setScale] = useState<number>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const iframeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchFile = async () => {
            const response = await fetch(url);
            setFile(await response.blob());
        };
        fetchFile();
    }, [url]);

    // const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => setNumPages(numPages);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            iframeRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div ref={iframeRef} className="relative w-full h-[870px]">
                {/* Fullscreen Toggle Button */}
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-4 right-4 z-50 bg-gray-800 text-white p-2 rounded-md"
                >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>

                {file ? (
                    <iframe
                        src={url}
                        title="PDF View"
                        width="100%"
                        height="100%"
                        className="w-full h-full border-0"
                    />
                ) : (

                        <Loader2Icon className="animate-spin h-20 w-20 text-blue-600 " />
                )}
            </div>
        </div>
    );
}

export default PdfView;
