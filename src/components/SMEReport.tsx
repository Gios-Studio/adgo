// components/SMEReport.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SMEReport({ advertiserId }: { advertiserId: string }) {
  const [report, setReport] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("campaign_metrics")
      .select("impressions, clicks, conversions, payouts")
      .eq("tenant_id", advertiserId)
      .then(({ data }) => setReport(data || []));
  }, [advertiserId]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">SME Report</h2>
      {report.map((r, i) => (
        <p key={i}>Impressions: {r.impressions} | Clicks: {r.clicks} | Conversions: {r.conversions} | Payouts: {r.payouts}</p>
      ))}
    </div>
  );
}