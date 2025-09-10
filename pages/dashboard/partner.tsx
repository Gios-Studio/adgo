// pages/dashboard/partner.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PartnerDashboard() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [revshare, setRevshare] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: campData } = await supabase
        .from("campaigns")
        .select("id, name, budget, start_date, end_date");

      const { data: txnData } = await supabase
        .from("transactions")
        .select("id, amount_cents, type, ref, memo, created_at")
        .order("created_at", { ascending: false })
        .limit(10);

      setCampaigns(campData || []);
      setRevshare(txnData || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Partner Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Active Campaigns</h2>
        <ul className="list-disc pl-6">
          {campaigns.map((c, i) => (
            <li key={i}>
              {c.name} — Budget {c.budget} (from {c.start_date} to {c.end_date})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Revenue Share Credits</h2>
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
              <th className="p-2">Ref</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {revshare.map((r, i) => (
              <tr key={i}>
                <td className="p-2">{r.amount_cents / 100}</td>
                <td className="p-2">{r.type}</td>
                <td className="p-2">{r.ref}</td>
                <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}