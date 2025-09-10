// components/AdUpload.tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [promo, setPromo] = useState("");

  const uploadAd = async () => {
    if (!file) return;
    const { data, error } = await supabase.storage
      .from("media_assets")
      .upload(`ads/${file.name}`, file);
    if (error) console.error(error);

    await supabase.from("ads").insert({
      file_url: data?.path,
      promo_code: promo,
    });
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Promo Code"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        className="border p-2 my-2 rounded w-full"
      />
      <button onClick={uploadAd} className="bg-green-600 text-white px-4 py-2 rounded">
        Upload Ad
      </button>
    </div>
  );
}