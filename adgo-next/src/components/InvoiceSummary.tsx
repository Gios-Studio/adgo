import React from "react";

type Invoice = {
  id: string;
  amount: number;
  vat_rate: number;
  vat: number;
  total_with_vat: number;
  currency: string;
  created_at: string;
};

type Props = {
  invoice: Invoice;
};

export default function InvoiceSummary({ invoice }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Invoice Summary</h2>
      <div className="mb-1 text-sm text-gray-500">Invoice ID: <span className="font-mono">{invoice.id}</span></div>
      <div className="mb-1">Amount: <span className="font-medium">{invoice.amount} {invoice.currency}</span></div>
      <div className="mb-1">VAT ({(invoice.vat_rate * 100).toFixed(0)}%): <span className="font-medium">{invoice.vat} {invoice.currency}</span></div>
      <div className="mb-3 font-bold text-lg">Total: {invoice.total_with_vat} {invoice.currency}</div>
      <div className="text-xs text-gray-400">Created: {new Date(invoice.created_at).toLocaleString()}</div>
    </div>
  );
}
