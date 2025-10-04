import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

type Invoice = {
  id: number;
  advertiser_email: string;
  campaign_name: string;
  amount_cents: number;
  vat_rate: number;
  total: number;
  status: string;
  issued_at: string;
};

type Revenue = {
  id: number;
  advertiser_email: string;
  campaign_name: string;
  amount: number;
  total: number;
  recorded_at: string;
};

export default function BillingDashboard() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    advertiser_id: "",
    campaign_id: "",
    amount_cents: "",
    vat_rate: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch invoices and revenue
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: invoiceData } = await supabase.from("invoice_summary").select("*");
      const { data: revenueData } = await supabase.from("revenue_summary").select("*");
      setInvoices(invoiceData || []);
      setRevenues(revenueData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Chart data: group revenue by advertiser_email
  const chartData = Object.values(
    revenues.reduce((acc: any, r) => {
      acc[r.advertiser_email] = acc[r.advertiser_email] || { advertiser: r.advertiser_email, total: 0 };
      acc[r.advertiser_email].total += r.total;
      return acc;
    }, {})
  );

  // Generate invoice
  async function handleGenerateInvoice(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/functions/v1/generate_invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        advertiser_id: form.advertiser_id,
        campaign_id: form.campaign_id,
        amount_cents: Number(form.amount_cents),
        vat_rate: Number(form.vat_rate),
      }),
    });
    setSubmitting(false);
    setForm({ advertiser_id: "", campaign_id: "", amount_cents: "", vat_rate: "" });
    // Refresh data
    const { data: invoiceData } = await supabase.from("invoice_summary").select("*");
    setInvoices(invoiceData || []);
  }

  // Mark invoice as paid
  async function handlePayInvoice(invoice_id: number) {
    await fetch("/functions/v1/pay_invoice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoice_id }),
    });
    // Refresh data
    const { data: invoiceData } = await supabase.from("invoice_summary").select("*");
    setInvoices(invoiceData || []);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">Billing & Revenue Dashboard</h1>
          <p className="text-gray-600 mb-4">Manage invoices and view revenue performance.</p>
        </div>

        {/* Invoices Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Invoices</h2>
            <form className="flex gap-2 items-center" onSubmit={handleGenerateInvoice}>
              <input
                className="border rounded px-2 py-1"
                placeholder="Advertiser ID"
                value={form.advertiser_id}
                onChange={e => setForm(f => ({ ...f, advertiser_id: e.target.value }))}
                required
              />
              <input
                className="border rounded px-2 py-1"
                placeholder="Campaign ID"
                value={form.campaign_id}
                onChange={e => setForm(f => ({ ...f, campaign_id: e.target.value }))}
                required
              />
              <input
                className="border rounded px-2 py-1"
                placeholder="Amount (cents)"
                type="number"
                value={form.amount_cents}
                onChange={e => setForm(f => ({ ...f, amount_cents: e.target.value }))}
                required
              />
              <input
                className="border rounded px-2 py-1"
                placeholder="VAT Rate"
                type="number"
                step="0.01"
                value={form.vat_rate}
                onChange={e => setForm(f => ({ ...f, vat_rate: e.target.value }))}
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Generate Invoice"}
              </button>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Invoice ID</th>
                  <th className="px-3 py-2 text-left">Advertiser Email</th>
                  <th className="px-3 py-2 text-left">Campaign Name</th>
                  <th className="px-3 py-2 text-left">Amount ($)</th>
                  <th className="px-3 py-2 text-left">VAT Rate</th>
                  <th className="px-3 py-2 text-left">Total ($)</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Issued At</th>
                  <th className="px-3 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={inv.id} className={idx % 2 ? "bg-gray-50" : ""}>
                    <td className="px-3 py-2">{inv.id}</td>
                    <td className="px-3 py-2">{inv.advertiser_email}</td>
                    <td className="px-3 py-2">{inv.campaign_name}</td>
                    <td className="px-3 py-2">{(inv.amount_cents / 100).toFixed(2)}</td>
                    <td className="px-3 py-2">{inv.vat_rate}</td>
                    <td className="px-3 py-2">{(inv.total / 100).toFixed(2)}</td>
                    <td className="px-3 py-2">{inv.status}</td>
                    <td className="px-3 py-2">{new Date(inv.issued_at).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      {inv.status !== "paid" && (
                        <button
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          onClick={() => handlePayInvoice(inv.id)}
                        >
                          Mark as Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {invoices.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center py-4 text-gray-400">No invoices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Revenue Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="advertiser" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#2563eb" name="Total Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 text-left">Revenue ID</th>
                  <th className="px-3 py-2 text-left">Advertiser Email</th>
                  <th className="px-3 py-2 text-left">Campaign Name</th>
                  <th className="px-3 py-2 text-left">Amount ($)</th>
                  <th className="px-3 py-2 text-left">Total ($)</th>
                  <th className="px-3 py-2 text-left">Recorded At</th>
                </tr>
              </thead>
              <tbody>
                {revenues.map((rev, idx) => (
                  <tr key={rev.id} className={idx % 2 ? "bg-gray-50" : ""}>
                    <td className="px-3 py-2">{rev.id}</td>
                    <td className="px-3 py-2">{rev.advertiser_email}</td>
                    <td className="px-3 py-2">{rev.campaign_name}</td>
                    <td className="px-3 py-2">{(rev.amount / 100).toFixed(2)}</td>
                    <td className="px-3 py-2">{(rev.total / 100).toFixed(2)}</td>
                    <td className="px-3 py-2">{new Date(rev.recorded_at).toLocaleString()}</td>
                  </tr>
                ))}
                {revenues.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-400">No revenue records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Place your Supabase client in: lib/supabaseClient.ts
// Example:
// import { createClient } from "@supabase/supabase-js";
// export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);