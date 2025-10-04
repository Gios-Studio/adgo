export default function ReceiptsPage() {
  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Receipts & VAT Invoices</h1>
      <p className="mb-2">Access your VAT-compliant invoices and receipts below.</p>
      <a href="/public/invoices/latest-invoice.pdf" className="text-blue-600 underline">Download Latest Invoice (PDF)</a>
    </div>
  );
}
