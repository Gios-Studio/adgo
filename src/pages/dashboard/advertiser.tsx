// src/pages/dashboard/advertiser.tsx

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Campaign } from "@/types/campaign";
import { Metrics } from "@/types/metrics";
import Link from "next/link";

// Supabase client
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
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Advertiser Dashboard</h1>

      {/* Refund Policy static link */}
      <Link
        href="/docs/refund-policy-v1.0.pdf"
        target="_blank"
        className="text-blue-600 underline"
      >
        View Refund Policy
      </Link>

      {/* Example raw data output */}
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify({ campaigns, metrics }, null, 2)}
      </pre>
    </div>
  );
}