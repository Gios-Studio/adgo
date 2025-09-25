import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Refund = {
  id: string;
  wallet_id: string;
  amount_cents: number;
  reason: string;
  created_at: string;
  invoice_number: string | null; // <-- flat field, optional
};

export default function RefundsHistory() {
  const [refunds, setRefunds] = useState<Refund[]>([]);

  useEffect(() => {
    const fetchRefunds = async () => {
      const { data, error } = await supabase
        .from("refunds")
        .select(`
          id,
          wallet_id,
          amount_cents,
          reason,
          created_at,
          refund_receipts (invoice_number)
        `);

      if (error) {
        console.error("Error fetching refunds:", error);
      } else {
        // Flatten refund_receipts → invoice_number
        const formatted = data.map((r: any) => ({
          ...r,
          invoice_number: r.refund_receipts?.[0]?.invoice_number ?? null,
        }));
        setRefunds(formatted);
      }
    };

    fetchRefunds();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Refund History</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 border">Date</th>
            <th className="px-2 py-1 border">Wallet</th>
            <th className="px-2 py-1 border">Amount</th>
            <th className="px-2 py-1 border">Reason</th>
            <th className="px-2 py-1 border">Invoice</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((r) => (
            <tr key={r.id}>
              <td className="px-2 py-1 border">
                {new Date(r.created_at).toLocaleString()}
              </td>
              <td className="px-2 py-1 border">{r.wallet_id}</td>
              <td className="px-2 py-1 border">KES {(r.amount_cents / 100).toFixed(2)}</td>
              <td className="px-2 py-1 border">{r.reason}</td>
              <td className="px-2 py-1 border">{r.invoice_number ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}