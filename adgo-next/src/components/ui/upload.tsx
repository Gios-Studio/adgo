
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type FormState = { title: string; description: string; targeting: string; promo_code: string; qr_url: string };

export default function CampaignUpload() {
  const [form, setForm] = useState<FormState>({ title: "", description: "", targeting: "", promo_code: "", qr_url: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("campaigns").insert(form);
    setLoading(false);
  };

  return (
    <form className="max-w-md mx-auto p-6 bg-white rounded shadow" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold mb-4">Upload Campaign</h1>
      <input name="title" placeholder="Title" className="mb-2 w-full border p-2 rounded" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" className="mb-2 w-full border p-2 rounded" onChange={handleChange} required />
      <input name="targeting" placeholder="Targeting" className="mb-2 w-full border p-2 rounded" onChange={handleChange} />
      <input name="promo_code" placeholder="Promo Code" className="mb-2 w-full border p-2 rounded" onChange={handleChange} />
      <input name="qr_url" placeholder="QR URL" className="mb-2 w-full border p-2 rounded" onChange={handleChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}