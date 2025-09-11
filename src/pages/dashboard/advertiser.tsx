import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Campaign } from "@/types/campaign";
import { Metrics } from "@/types/metrics";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdvertiserDashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);

  useEffect(() => {
    supabase.from("campaigns").select("*").then(({ data }) => {
      if (data) setCampaigns(data as Campaign[]);
    });

    supabase.from("metrics").select("*").then(({ data }) => {
      if (data) setMetrics(data as Metrics[]);
    });
  }, []);

  return (
    <div className="p-6">
      <h1>Advertiser Dashboard</h1>
      <pre>{JSON.stringify({ campaigns, metrics }, null, 2)}</pre>
    </div>
  );
}