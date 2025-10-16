/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminModerationPanel() {
  const [ads, setAds] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("ads").select("*").eq("moderation_status", "pending").then(({ data }) => setAds(data || []));
  }, []);
  const updateStatus = async (id: string, status: string) => {
    await supabase.from("ads").update({ moderation_status: status }).eq("id", id);
    setAds(ads.filter(ad => ad.id !== id));
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Creative Moderation</h1>
      <ul>
        {ads.map(ad => (
          <li key={ad.id} className="flex items-center gap-4 mb-2">
            <span>{ad.title}</span>
            <button className="bg-green-500 text-white px-2 rounded" onClick={() => updateStatus(ad.id, "approved")}>Approve</button>
            <button className="bg-red-500 text-white px-2 rounded" onClick={() => updateStatus(ad.id, "blocked")}>Block</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
