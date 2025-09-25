import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Wallet {
  id: string;
  balance_cents: number;
  owner_id: string;
}
interface Refund {
  id: string;
  refund_code: string;
  amount_cents: number;
  created_at: string;
}
interface Receipt {
  id: string;
  invoice_number: number;
  amount_cents: number;
  vat_rate: number;
  vat_amount: number;
  issued_at: string;
}

export default function FinanceDashboard() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  useEffect(() => {
    supabase.from("wallets").select("*").then(({ data }) => setWallets(data || []));
    supabase.from("refunds").select("*").then(({ data }) => setRefunds(data || []));
    supabase.from("tax_receipts").select("*").then(({ data }) => setReceipts(data || []));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Finance Dashboard</h1>

      <section>
        <h2 className="font-semibold">Wallets</h2>
        <pre>{JSON.stringify(wallets, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold">Refunds</h2>
        <pre>{JSON.stringify(refunds, null, 2)}</pre>
      </section>

      <section>
        <h2 className="font-semibold">VAT Receipts</h2>
        <pre>{JSON.stringify(receipts, null, 2)}</pre>
      </section>
    </div>
  );
}