import React from "react";

export default function OversizedFileWarning({ file }: { file: File }) {
  if (file.size <= 50 * 1024 * 1024) return null; // 50 MB
  return (
    <div className="p-3 bg-red-100 border border-red-400 rounded text-red-800">
      File {file.name} is too large ({(file.size / 1024 / 1024).toFixed(2)} MB).
      Max allowed size is 50 MB.
    </div>
  );
}