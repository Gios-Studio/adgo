// pages/dashboard/partner-report.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerReport() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [fraud, setFraud] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: campData } = await supabase
        .from("campaign_ctr")
        .select("*");

      const { data: fraudData } = await supabase
        .from("fraud_flags")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setCampaigns(campData || []);
      setFraud(fraudData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Partner Reporting</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Campaign Performance</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Campaign</th>
              <th className="p-2">Impressions</th>
              <th className="p-2">Clicks</th>
              <th className="p-2">CTR</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i}>
                <td className="p-2">{c.campaign_id}</td>
                <td className="p-2">{c.impressions}</td>
                <td className="p-2">{c.clicks}</td>
                <td className="p-2">{c.ctr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Fraud Alerts</h2>
        <ul className="list-disc pl-6">
          {fraud.map((f, i) => (
            <li key={i}>{f.reason} — Ride {f.ride_id}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}