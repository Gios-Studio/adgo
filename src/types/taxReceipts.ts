// src/types/taxReceipts.ts
export interface TaxReceipt {
  id: string;
  tenant_id: string;
  transaction_id: string;
  amount_cents: number;
  vat_rate: number;
  vat_amount: number;
  invoice_number: number;
  issued_at: string;
}