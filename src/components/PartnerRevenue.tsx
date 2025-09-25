import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerRevenue() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("partner_revenue_snapshot").select("*").then(({ data }) => {
      if (data) setRows(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Partner Revenue</h2>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2">Campaign</th>
            <th className="p-2">Rides</th>
            <th className="p-2">Total Payouts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.campaign_id}>
              <td className="p-2">{r.campaign_name}</td>
              <td className="p-2">{r.total_rides}</td>
              <td className="p-2">KES {r.total_payouts / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}