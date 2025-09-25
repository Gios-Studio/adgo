import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerReportingDashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.rpc("partner_reporting_summary");
      if (error) console.error(error);
      else setData(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Partner Reporting</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Partner</th>
            <th className="p-2 border">Rides</th>
            <th className="p-2 border">Revenue Share (KES)</th>
            <th className="p-2 border">Fraud Flags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="p-2 border">{row.partner_name}</td>
              <td className="p-2 border">{row.ride_count}</td>
              <td className="p-2 border">{(row.revenue_share_cents / 100).toFixed(2)}</td>
              <td className="p-2 border">{row.fraud_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}