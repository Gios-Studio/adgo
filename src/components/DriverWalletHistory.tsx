// src/components/DriverWalletHistory.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DriverWalletHistory({ driverId }: { driverId: string }) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHistory() {
      const { data, error } = await supabase
        .from("ledger")
        .select("id, debit, credit, balance_after, created_at")
        .eq("wallet_id", driverId)
        .order("created_at", { ascending: false });
      if (!error) setHistory(data || []);
    }
    fetchHistory();
  }, [driverId]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Wallet & Refunds</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Balance After</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td>{new Date(h.created_at).toLocaleString()}</td>
              <td>{h.debit / 100}</td>
              <td>{h.credit / 100}</td>
              <td>{h.balance_after / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}