"use client";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div
      className="flex flex-col w-64 h-80 rounded-xl bg-white drop-shadow-md justify-between p-4 transition-all transform hover:scale-105 hover:bg-blue-600 hover:text-white cursor-pointer group"
      onClick={() => router.push(`/dashboard/files/${id}`)}
    >
      {/* PDF Preview */}
      <div className="w-full h-36 bg-gray-200 rounded-md mb-4 overflow-hidden">
        <iframe
          src={downloadURL}
          title={`Preview of ${name}`}
          className="w-full h-full"
          frameBorder="0"
        />
      </div>

      {/* File details */}
      <div className="flex-1">
        <p className="font-semibold line-clamp-2">{name}</p>
        <p className="text-sm text-gray-500 group-hover:text-blue-100">
          {size < 1024
            ? `${size} bytes`
            : size < 1048576
            ? `${(size / 1024).toFixed(2)} KB`
            : `${(size / 1048576).toFixed(2)} MB`}
        </p>
      </div>
    </div>
  );
}

export default Document;
