"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import { Loader2Icon, Maximize, Minimize, ZoomIn, ZoomOut } from "lucide-react";
import { pdfjs } from "react-pdf";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({ url }: { url: string }) {
    const [file, setFile] = useState<Blob | null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const embedRef = useRef<HTMLDivElement>(null);
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

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
                    {isMobile && (
                        <>
                            <button onClick={zoomOut} className="bg-gray-800 text-white p-2 rounded-md">
                                <ZoomOut size={20} />
                            </button>
                            <button onClick={zoomIn} className="bg-gray-800 text-white p-2 rounded-md">
                                <ZoomIn size={20} />
                            </button>
                        </>
                    )}
                    <button
                        onClick={toggleFullscreen}
                        className="bg-gray-800 text-white p-2 rounded-md"
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                </div>

                {/* PDF Viewer */}
                {file ? (
                    isMobile ? (
                        <div className="overflow-auto h-full w-full">
                            <Document
                                file={URL.createObjectURL(file)}
                                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                                className="w-full"
                            >
                                {Array.from(new Array(numPages), (_, index) => (
                                    <Page key={index + 1} pageNumber={index + 1} scale={scale} />
                                ))}
                            </Document>
                        </div>
                    ) : (
                        <embed
                            src={URL.createObjectURL(file)}
                            type="application/pdf"
                            width="100%"
                            height="100%"
                            className="border-0"
                        />
                    )
                ) : (
                    <Loader2Icon className="animate-spin h-20 w-20 text-blue-600" />
                )}
            </div>
        </div>
    );
}

export default PdfView;
