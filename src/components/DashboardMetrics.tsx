// components/DashboardMetrics.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("campaign_metrics")
      .select("impressions, clicks, conversions, ctr, ecpm, payouts")
      .then(({ data }) => setMetrics(data || []));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {metrics.map((m, i) => (
        <div key={i} className="rounded-xl p-4 bg-white shadow">
          <p>Impressions: {m.impressions}</p>
          <p>Clicks: {m.clicks}</p>
          <p>Conversions: {m.conversions}</p>
          <p>CTR: {m.ctr}%</p>
          <p>eCPM: {m.ecpm}</p>
          <p>Payouts: {m.payouts}</p>
        </div>
      ))}
    </div>
  );
}