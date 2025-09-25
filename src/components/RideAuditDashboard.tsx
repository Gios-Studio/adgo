// src/components/RideAuditDashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RideAuditRow {
  ride_id: string;
  driver_id: string;
  driver_name: string;
  wallet_id: string | null;
  transaction_id: string | null;
  txn_type: string | null;
  amount_cents: number | null;
  ledger_id: string | null;
  debit: number | null;
  credit: number | null;
  tax_receipt_id: string | null;
  vat_rate: number | null;
  vat_amount: number | null;
  fraud_id: string | null;
  fraud_reason: string | null;
  detected_at: string | null;
}

export default function RideAuditDashboard() {
  const [rows, setRows] = useState<RideAuditRow[]>([]);

  useEffect(() => {
    supabase
      .from("rides_audit_view")
      .select("*")
      .then(({ data, error }) => {
        if (error) {
          console.error("Error loading audit view:", error);
        } else {
          setRows(data || []);
        }
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Ride Audit Dashboard</h1>
      {rows.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Ride</th>
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Txn Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">VAT</th>
              <th className="p-2 border">Fraud</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.ride_id}>
                <td className="p-2 border">{row.ride_id}</td>
                <td className="p-2 border">{row.driver_name}</td>
                <td className="p-2 border">{row.txn_type || "-"}</td>
                <td className="p-2 border">
                  {row.amount_cents ? `KES ${(row.amount_cents / 100).toFixed(2)}` : "-"}
                </td>
                <td className="p-2 border">
                  {row.vat_amount ? `KES ${(row.vat_amount / 100).toFixed(2)} (${row.vat_rate}%)` : "-"}
                </td>
                <td className="p-2 border">{row.fraud_reason || "ok"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}