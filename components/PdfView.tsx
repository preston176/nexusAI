"use client"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { Document, Page, pdfjs } from "react-pdf"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react"

// TODO CORS Configuration
// gsutil cors set cors.json gs://<app-name>.firebasestorage.app
// gsutil cors set cors.json gs://nexusai-pdf.firebasestorage.app
// go here >>> https://console.cloud.google.com
// create new file in editor called cors.json
// run >>> // gsutil cors set cors.json gs://nexusai-pdf.firebasestorage.app
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

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

    useEffect(() => {
        const fetchFile = async () => {
            const response = await fetch(url);
            const file = await response.blob();
            setFile(file);
        }

        fetchFile();
    }, [url]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
        setNumPages(numPages);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="">
                <div className="">
                    <Button
                        variant={"outline"}
                        disabled={pageNumber === 1}
                        onClick={() => {
                            if (pageNumber > 1) {
                                setPageNumber(pageNumber - 1);
                            }
                        }}>
                        Previous
                    </Button>
                    <p className="flex items-center justify-center">
                        {pageNumber} of  {numPages}
                    </p>
                    <Button
                        variant={"outline"}
                        disabled={pageNumber === numPages}
                        onClick={() => {
                            if (numPages){
                                if (pageNumber < numPages) {
                                    setPageNumber(pageNumber + 1);
                                }
                            }
                        }}>
                        Next
                    </Button>
                </div>
            </div>
            {
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
                    </Document>)
            }
        </div >
    )
}

export default PdfView