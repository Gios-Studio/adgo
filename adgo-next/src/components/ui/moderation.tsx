// pages/admin/moderation.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ModerationPanel() {
  const [ads, setAds] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("ads").select("*").then(({ data }) => setAds(data || []));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("ads").update({ moderation_status: status }).eq("id", id);
    setAds(ads.map(ad => ad.id === id ? { ...ad, moderation_status: status } : ad));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Creative Moderation</h1>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th>Title</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ads.map(ad => (
            <tr key={ad.id}>
              <td>{ad.title}</td>
              <td>{ad.moderation_status}</td>
              <td>
                <button className="bg-green-600 text-white px-2 py-1 rounded mr-2"
                  onClick={() => updateStatus(ad.id, "approved")}>Approve</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => updateStatus(ad.id, "rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}