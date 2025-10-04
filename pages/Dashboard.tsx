// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useKPI } from './useKPI';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [name, setName] = useState<string>("");
  const { data: kpi, error } = useKPI();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase!.auth.getUser();
      if (!mounted) return;
      setName(data.user?.email || "you");
    })();
    return () => { mounted = false; };
  }, []);

  if (error) return <div>Error loading metrics</div>;
  if (!kpi) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {name}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Active Campaigns" value="—" />
        <Card title="Total Spend (KES)" value="—" />
        <Card title="Impressions (7d)" value="—" />
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="font-medium mb-2">Quick links</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li><a className="underline" href="/my-ads">Manage Ads</a></li>
          <li><a className="underline" href="/calendar">Schedule Campaign</a></li>
          <li><a className="underline" href="/wallet">Wallet</a></li>
          <li><a className="underline" href="/analytics">Analytics</a></li>
        </ul>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>Views: {kpi.impressions}</div>
        <div>Clicks: {kpi.clicks}</div>
        <div>CTR: {kpi.ctr}%</div>
        <div>ROI: {kpi.roi}%</div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={[kpi]}>
          <XAxis dataKey="impressions" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clicks" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string; }) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}