// Migrated AdUpload from old repo
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

type Campaign = { id: string; name: string };

export default function AdUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [promo, setPromo] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data } = await supabase.from("campaigns").select("id, name");
    setCampaigns(data || []);
  };

  const uploadAd = async () => {
    if (!file || !campaignId) return;
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("media_assets")
      .upload(`ads/${file.name}`, file);
    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    await supabase.from("ads").insert({
      file_url: data?.path,
      promo_code: promo,
      campaign_id: campaignId,
    });
    setLoading(false);
    setFile(null);
    setPromo("");
    setCampaignId("");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow max-w-md mx-auto mt-10">
      <div className="mb-2">
        <label className="block font-semibold mb-1">Select Campaign</label>
        <select
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Choose a campaign</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-2" />
      <input
        type="text"
        placeholder="Promo Code"
        value={promo}
        onChange={(e) => setPromo(e.target.value)}
        className="border p-2 my-2 rounded w-full"
      />
      <button
        onClick={uploadAd}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Ad"}
      </button>
    </div>
  );
}
