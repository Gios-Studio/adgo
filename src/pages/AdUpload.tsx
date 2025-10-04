import { useState } from "react";
import AdUploadFilters from "./AdUploadFilters";
import Modal from "./Modal"; // Assume a simple modal component
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function AdUpload() {
  const [form, setForm] = useState({ title: "", description: "", file: null });
  const [filters, setFilters] = useState({ radius: 5, language: "English", riderType: "All" });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // File validation
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/", "video/"];
    if (!validTypes.some(t => file.type.startsWith(t))) {
      toast.error("File must be image or video");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setForm(f => ({ ...f, file }));
  };

  // Preview modal
  const handlePreview = () => setPreviewOpen(true);

  // Upload logic
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload file to Supabase Storage (pseudo)
      // const { data, error } = await supabase.storage.from("ads").upload(form.file.name, form.file);
      // Save campaign/ad with filters
      await supabase.from("ads").insert({
        ...form,
        targeting: filters,
        // media_url: data?.Key,
      });
      toast.success("Ad uploaded!");
    } catch (err) {
      toast.error("Upload failed");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Title" onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
      <textarea name="description" placeholder="Description" onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
      <input type="file" accept=\"image/*,video/*\" onChange={handleFile} required />
      <AdUploadFilters filters={filters} onChange={setFilters} />
      <button type="button" onClick={handlePreview} className="bg-gray-200 px-4 py-2 rounded">Preview</button>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
      {previewOpen && (
        <Modal onClose={() => setPreviewOpen(false)}>
          <h2 className="font-bold mb-2">Ad Preview</h2>
          <div>{form.title}</div>
          <div>{form.description}</div>
          {form.file && (form.file.type.startsWith("image/") ?
            <img src={URL.createObjectURL(form.file)} className="max-w-xs" /> :
            <video src={URL.createObjectURL(form.file)} controls className="max-w-xs" />
          )}
          <div>Targeting: {filters.radius}km, {filters.language}, {filters.riderType}</div>
        </Modal>
      )}
    </form>
  );
}// adgo-upload.ts
// Usage (React): await uploadCreative(file, { orgId, campaignId, creativeId })
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const API_BASE = "http://localhost:3001"; // your Express proxy base
const BUCKET = "creatives";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function uploadCreative(
  file: File,
  { orgId, campaignId, creativeId }: { orgId: string; campaignId: string; creativeId: string }
) {
  // 1) upload to storage path: creatives/<org>/<campaign>/<filename>
  const path = `${orgId}/${campaignId}/${Date.now()}_${file.name}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (upErr) throw new Error(`upload failed: ${upErr.message}`);

  // 2) call process-creative via your proxy (no HMAC needed)
  const r = await fetch(`${API_BASE}/api/adgo?op=process-creative`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      org_id: orgId,
      campaign_id: campaignId,
      creative_id: creativeId,
      bucket: BUCKET,
      path: `creatives/${path}`, // server expects bucket-relative "creatives/<...>"
    }),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`process-creative failed: ${r.status} ${JSON.stringify(data)}`);
  return { ok: true, path: `creatives/${path}`, meta: data };
}