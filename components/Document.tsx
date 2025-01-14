"use client";

import useSubscription from "@/hooks/useSubscription";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { DownloadCloudIcon, Trash2Icon } from "lucide-react";
import { deleteDocument } from "@/actions/deleteDocument";
import Link from "next/link";


function Document({
  id,
  name,
  size,
  downloadURL,
}: {
  id: string;
  name: string;
  size: number;
  downloadURL: string;
}) {
  const [isDeleting, startTransaction] = useTransition();
  const { hasActiveMembership } = useSubscription();

  return (
    <div
      className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-blue-600 hover:text-white cursor-pointer group"

    >
      {/* PDF Preview */}
      {/* <div className="w-full h-36 bg-gray-200 rounded-md mb-4 overflow-hidden">
        <iframe
          src={downloadURL}
          title={`Preview of ${name}`}
          className="w-full h-full"
          frameBorder="0"
        />
      </div> */}

      {/* File details */}
      <div className="flex-1">
        <Link href={`/dashboard/files/${id}`}>
          <p className="font-semibold line-clamp-2">{name}</p>
        </Link>
        <p className="text-sm text-gray-500 group-hover:text-blue-100">
          {size < 1024
            ? `${size} bytes`
            : size < 1048576
              ? `${(size / 1024).toFixed(2)} KB`
              : `${(size / 1048576).toFixed(2)} MB`}
        </p>
      </div>
      {/* CRUD actions */}
      <div className="flex space-x-2 justify-end">
        <Button onClick={() => {
          const prompt = window.confirm(
            "Are you sure you want to delete this document?"
          )
          if (prompt) {
            // delete doc
            startTransaction(async () => {
              await deleteDocument(id)
            })
          }
        }} variant={"outline"} disabled={isDeleting}>
          <Trash2Icon className="h-6 w-6 text-red-500" />
    {/* <span className="text-red-500 ml-2">
              PRO Feature
            </span> */}
        </Button>
        <Button variant={"outline"} asChild>
          <a href={downloadURL} download>
            <DownloadCloudIcon className="h-6 w-6 text-blue-600" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default Document;
