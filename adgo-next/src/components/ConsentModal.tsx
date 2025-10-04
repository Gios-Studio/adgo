import React, { useState } from "react";

type Props = {
  onAccept: () => void;
};

export default function ConsentModal({ onAccept }: Props) {
  const [open, setOpen] = useState(true);

  const handleAccept = () => {
    setOpen(false);
    onAccept();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Consent Required</h2>
        <p className="mb-6 text-gray-700">
          By continuing, you agree to AdGo’s data use under GDPR and Kenya DPA.
        </p>
        <button
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleAccept}
        >
          I Agree
        </button>
      </div>
    </div>
  );
}
