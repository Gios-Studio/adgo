
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function toCSV(rows: any[]) {
  if (!rows.length) return '';
  const header = Object.keys(rows[0]);
  const csv = [header.join(",")].concat(
    rows.map(row => header.map(field => {
      const val = row[field];
      if (val == null) return '';
      // Escape quotes
      return `"${String(val).replace(/"/g, '""')}"`;
    }).join(","))
  ).join("\n");
  return csv;
}

export default function InvoiceList({ advertiserId }: { advertiserId: string }) {
  const [invoices, setInvoices] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("invoices").select("*").eq("advertiser_id", advertiserId).then(({ data }) => setInvoices(data || []));
  }, [advertiserId]);

  const handleExportCSV = () => {
    const csv = toCSV(invoices);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoices.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Invoices</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleExportCSV}
        disabled={!invoices.length}
      >
        Export CSV
      </button>
      <ul>
        {invoices.map(inv => (
          <li key={inv.id} className="mb-2">
            <div>Invoice #{inv.id}</div>
            <div>Amount: {(inv.amount_cents/100).toFixed(2)} KES</div>
            <div>VAT: {(inv.vat_amount_cents/100).toFixed(2)} KES</div>
            <div>Total: {((inv.amount_cents + (inv.vat_amount_cents || 0))/100).toFixed(2)} KES</div>
            <div>Date: {new Date(inv.issued_at).toLocaleDateString()}</div>
            {inv.receipt_pdf_url && (
              <a href={inv.receipt_pdf_url} className="text-blue-600 underline" download>Download PDF</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
