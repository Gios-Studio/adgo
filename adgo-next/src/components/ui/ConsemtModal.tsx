// components/ConsentModal.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ConsentModal({ userId }: { userId: string }) {
  const [open, setOpen] = useState(true);

  const handleConsent = async () => {
    await supabase.from("user_profile").update({ consent: true }).eq("id", userId);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-sm">
        <h2 className="font-bold mb-2">Consent Required</h2>
        <p className="mb-4">By using AdGo you agree to data processing per GDPR/DPA.</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConsent}>I Agree</button>
      </div>
    </div>
  );
}