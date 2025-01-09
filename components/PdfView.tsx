"use client"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { Document, Page, pdfjs } from "react-pdf"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react"

// Set the worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfView({
    url
}: {
    url: string
}) {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [file, setFile] = useState<Blob | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);
    const [isDesktop, setIsDesktop] = useState<boolean>(false); // Detect screen size

    useEffect(() => {
        const fetchFile = async () => {
            const response = await fetch(url);
            const file = await response.blob();
            setFile(file);
        }

        fetchFile();

        // Detect screen size
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024); // Assuming 1024px as desktop size
        };

        handleResize(); // Check on load
        window.addEventListener("resize", handleResize); // Check on resize

        return () => window.removeEventListener("resize", handleResize);
    }, [url]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="sticky top-0 z-50 bg-gray-100 rounded-b-lg">
                {
                    !isDesktop && <div className="max-w-6xl px-2 grid grid-cols-6 gap-2">
                        <Button
                            variant={"outline"}
                            disabled={pageNumber === 1}
                            onClick={() => {
                                if (pageNumber > 1) {
                                    setPageNumber(prevPage => prevPage - 1);
                                }
                            }}>
                            Previous
                        </Button>
                        <p className="flex items-center justify-center">
                            {pageNumber} of {numPages}
                        </p>
                        <Button
                            variant={"outline"}
                            disabled={pageNumber === numPages}
                            onClick={() => {
                                if (numPages) {
                                    if (pageNumber < numPages) {
                                        setPageNumber(prevPage => prevPage + 1);
                                    }
                                }
                            }}>
                            Next
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                setRotation(prevRotation => (prevRotation + 90) % 360)
                            }
                        >
                            {rotation}&deg;
                            <RotateCw />
                        </Button>
                        {/* Zoom in out buttons */}
                        <Button
                            variant={"outline"}
                            disabled={scale >= 1.5}
                            onClick={() => setScale(prevScale => prevScale * 1.2)}
                        >
                            <ZoomInIcon />
                        </Button>
                        <Button
                            variant={"outline"}
                            disabled={scale <= 0.75}
                            onClick={() => setScale(prevScale => prevScale / 1.2)}
                        >
                            <ZoomOutIcon />
                        </Button>
                    </div>
                }
            </div>

            {/* Desktop: Use iframe, Mobile: Use react-pdf */}
            {isDesktop ? (
                <iframe
                    src={url}
                    title="PDF View"
                    width="100%"
                    height="870"
                    frameBorder="0"
                />
            ) : (
                !file ? (
                    <Loader2Icon className="animate-spin h-20 w-20 text-blue-600 mt-20" />
                ) : (
                    <Document
                        loading={null}
                        file={file}
                        rotate={rotation}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="m-4 overflow-scroll"
                    >
                        <Page
                            className="shadow-lg"
                            scale={scale}
                            pageNumber={pageNumber}
                        />
                    </Document>
                )
            )}
        </div >
    )
}

export default PdfView
