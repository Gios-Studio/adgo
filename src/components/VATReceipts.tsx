// components/VATReceipts.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function VATReceipts({ tenantId }: { tenantId: string }) {
  const [receipts, setReceipts] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("tax_receipts")
      .select("*")
      .eq("tenant_id", tenantId)
      .then(({ data }) => setReceipts(data || []));
  }, [tenantId]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">VAT Receipts</h2>
      {receipts.map((r) => (
        <div key={r.id} className="border-b py-2">
          <p>Amount: {r.amount} {r.currency}</p>
          <p>VAT: {r.vat}</p>
          <p>Date: {new Date(r.issued_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}