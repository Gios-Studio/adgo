// src/components/CampaignGraphs.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function CampaignGraphs({ campaignId }: { campaignId: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("campaign_metrics_view") // <- use view we built
        .select("*")
        .eq("campaign_id", campaignId);
      if (!error) setData(data);
    }
    load();
  }, [campaignId]);

  return (
    <div className="p-4">
      <h2 className="font-semibold mb-2">Campaign Performance</h2>
      <LineChart width={500} height={250} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="ctr" stroke="#8884d8" />
        <Line type="monotone" dataKey="spend" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}