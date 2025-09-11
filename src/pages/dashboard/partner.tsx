import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Partner } from "@/types/partners";
import { Metrics } from "@/types/metrics";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerDashboard() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [metrics, setMetrics] = useState<Metrics[]>([]);

  useEffect(() => {
    supabase.from("partners").select("*").then(({ data }) => {
      if (data) setPartners(data as Partner[]);
    });

    supabase.from("metrics").select("*").then(({ data }) => {
      if (data) setMetrics(data as Metrics[]);
    });
  }, []);

  return (
    <div className="p-6">
      <h1>Partner Dashboard</h1>
      <pre>{JSON.stringify({ partners, metrics }, null, 2)}</pre>
    </div>
  );
}