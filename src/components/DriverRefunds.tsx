import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DriverRefunds() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("driver_refunds_view").select("*").then(({ data }) => {
      if (data) setRows(data);
    });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">Driver Refunds</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Driver</th>
            <th>Wallet</th>
            <th>Refunds (KES)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.driver_id}>
              <td>{r.driver_name}</td>
              <td>{r.wallet_id}</td>
              <td>{r.refunds_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}