import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdUpload({ campaignId }: { campaignId: string }) {
  const [form, setForm] = useState({ title: "", media_url: "", tags: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("ads").insert({
      ...form,
      campaign_id: campaignId,
      moderation_status: "pending"
    });
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 rounded w-full" required />
      <input name="media_url" placeholder="Media URL" onChange={handleChange} className="border p-2 rounded w-full" required />
      <input name="tags" placeholder="Tags (comma separated)" onChange={handleChange} className="border p-2 rounded w-full" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}