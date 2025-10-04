import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Metric = { impressions: number; clicks: number; ctr: number; roi?: number; campaign_id: string };

export default function AdvertiserDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("sme_dashboard_metrics").select("*").then(({ data }) => {
      setMetrics(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!metrics.length) return <div>No data</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Advertiser Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">Impressions<br /><span className="font-bold">{metrics[0].impressions}</span></div>
        <div className="bg-white p-4 rounded shadow">Clicks<br /><span className="font-bold">{metrics[0].clicks}</span></div>
        <div className="bg-white p-4 rounded shadow">CTR<br /><span className="font-bold">{metrics[0].ctr}%</span></div>
        <div className="bg-white p-4 rounded shadow">ROI<br /><span className="font-bold">{metrics[0].roi ?? "N/A"}%</span></div>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Trends</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={metrics}>
            <XAxis dataKey="campaign_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="impressions" fill="#8884d8" />
            <Bar dataKey="clicks" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}