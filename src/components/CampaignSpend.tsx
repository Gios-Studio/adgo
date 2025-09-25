import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CampaignSpend() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("campaign_spend_view").select("*").then(({ data }) => {
      if (data) setRows(data);
    });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Campaign Spend vs Budget</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Campaign</th>
            <th>Spend</th>
            <th>Budget</th>
            <th>% Used</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.campaign_id}>
              <td>{r.name}</td>
              <td>{r.spend}</td>
              <td>{r.budget}</td>
              <td>{r.pct_spent}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}