import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { uploadCreative } from "src/lib/adgo-upload"; // adjust path

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [frequencyCap, setFrequencyCap] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const orgId = "org-demo";
    const campaignId = "camp-demo";
    const creativeId = "creative-demo";

    // Upload creative file
    await uploadCreative(file, { orgId, campaignId, creativeId });

    // Save frequency cap flag in campaign row
    const { error } = await supabase
      .from("campaigns")
      .update({ frequency_cap: frequencyCap })
      .eq("id", campaignId);

    if (error) {
      console.error("Error saving frequency cap:", error.message);
      alert("Upload failed at frequency cap step.");
    } else {
      alert("Creative uploaded & frequency cap saved!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={frequencyCap}
          onChange={e => setFrequencyCap(e.target.checked)}
        />
        Enable frequency cap (1 ad per ride max)
      </label>

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Upload
      </button>
    </form>
  );
}