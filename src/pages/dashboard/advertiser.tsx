// pages/dashboard/advertiser.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdvertiserDashboard() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [fraud, setFraud] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: ctrData } = await supabase
        .from("campaign_ctr")
        .select("*");

      const { data: fraudData } = await supabase
        .from("fraud_flags")
        .select("*")
        .order("created_at", { ascending: false });

      setMetrics(ctrData || []);
      setFraud(fraudData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Advertiser Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Campaign CTR</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Campaign</th>
              <th className="p-2">Impressions</th>
              <th className="p-2">Clicks</th>
              <th className="p-2">CTR (%)</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((row, i) => (
              <tr key={i}>
                <td className="p-2">{row.campaign_id}</td>
                <td className="p-2">{row.impressions}</td>
                <td className="p-2">{row.clicks}</td>
                <td className="p-2">{row.ctr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Fraud Alerts</h2>
        <ul className="list-disc pl-6">
          {fraud.map((f, i) => (
            <li key={i}>{f.reason} (Ride {f.ride_id})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}