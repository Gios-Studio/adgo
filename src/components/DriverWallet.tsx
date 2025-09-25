import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DriverWallet() {
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("driver_wallet_snapshot").select("*").then(({ data }) => {
      if (data) setEntries(data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Driver Wallet</h2>
      {entries.length > 0 && (
        <div className="mb-4">
          <p>
            Balance:{" "}
            <strong>
              KES {entries[0].balance_cents / 100}
            </strong>
          </p>
        </div>
      )}
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.ledger_id}>
              <td className="p-2">{new Date(e.created_at).toLocaleString()}</td>
              <td className="p-2">{e.type}</td>
              <td className="p-2">
                {e.credit > 0 ? `+${e.credit}` : `-${e.debit}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}