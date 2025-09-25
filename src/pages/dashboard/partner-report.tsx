// src/pages/dashboard/partner-report.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PartnerReport {
  ride_id: string;
  revenue_share: number;
  started_at: string;
}

export default function PartnerReport() {
  const [data, setData] = useState<PartnerReport[]>([]);

  useEffect(() => {
    supabase.from("rides")
      .select("id, started_at, campaign_id")
      .then(({ data }) => {
        if (data) {
          // mock revenue share calc
          setData(data.map(r => ({
            ride_id: r.id,
            started_at: r.started_at,
            revenue_share: 250
          })));
        }
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Partner Reporting</h1>
      <table className="w-full border">
        <thead>
          <tr><th>Ride</th><th>Date</th><th>Revenue Share</th></tr>
        </thead>
        <tbody>
          {data.map(r => (
            <tr key={r.ride_id}>
              <td>{r.ride_id}</td>
              <td>{new Date(r.started_at).toLocaleString()}</td>
              <td>KES {r.revenue_share}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}