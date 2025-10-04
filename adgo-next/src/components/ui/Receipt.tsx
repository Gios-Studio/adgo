// components/Receipt.tsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Invoice = { name: string; amount: number };

export default function Receipt({ invoiceId }: { invoiceId: string }) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const VAT_RATE = 0.16; // configurable

  useEffect(() => {
    supabase.from("advertiser_profile").select("*").eq("invoice_id", invoiceId).single()
      .then(({ data }) => setInvoice(data));
  }, [invoiceId]);

  if (!invoice) return <div>Loading...</div>;

  const vat = invoice.amount * VAT_RATE;
  const total = invoice.amount + vat;

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="font-bold mb-2">Receipt</h2>
      <div>Advertiser: {invoice.name}</div>
      <div>Amount: {invoice.amount} KES</div>
      <div>VAT ({VAT_RATE * 100}%): {vat} KES</div>
      <div className="font-bold">Total: {total} KES</div>
    </div>
  );
}