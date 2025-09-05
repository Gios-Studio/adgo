import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type CampaignRow = {
  campaign_id: string;
  name: string;
  impressions: number;
  clicks: number;
  ctr_pct: number;
  spend_cents: number;
};

export default function Analytics() {
  const [rows, setRows] = useState<CampaignRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc("rpc_campaign_summary_30d");
      if (error) setErr(error.message);
      if (data) setRows(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-6">Loading analytics…</div>;
  if (err) return <div className="p-6 text-red-600">Error: {err}</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Campaign Performance (30d)</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="text-left p-2">Campaign</th>
            <th className="text-right p-2">Impr</th>
            <th className="text-right p-2">Clicks</th>
            <th className="text-right p-2">CTR %</th>
            <th className="text-right p-2">Spend (KES)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.campaign_id} className="border-t">
              <td className="p-2">{r.name}</td>
              <td className="p-2 text-right">{r.impressions?.toLocaleString()}</td>
              <td className="p-2 text-right">{r.clicks?.toLocaleString()}</td>
              <td className="p-2 text-right">{r.ctr_pct?.toFixed(2)}</td>
              <td className="p-2 text-right">{(r.spend_cents/100).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}