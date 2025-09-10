// pages/dashboard/ad-upload.tsx
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !name || !budget) return;

    // Upload file to Storage
    const { data, error } = await supabase.storage
      .from("creatives")
      .upload(`ads/${Date.now()}-${file.name}`, file);

    if (error) {
      setMessage("Upload failed: " + error.message);
      return;
    }

    const fileUrl = supabase.storage.from("creatives").getPublicUrl(data.path).data.publicUrl;

    // Insert into creatives + campaigns
    const { error: dbError } = await supabase.from("campaigns").insert([
      {
        name,
        budget: Number(budget),
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]);

    if (dbError) {
      setMessage("DB insert failed: " + dbError.message);
      return;
    }

    setMessage("Ad uploaded and campaign created!");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Upload New Ad</h1>

      <input
        type="text"
        placeholder="Campaign name"
        className="border p-2 w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Budget (KES)"
        className="border p-2 w-full"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      />

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >
        Upload
      </button>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}