// src/types/transactions.ts

export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  wallet_id: string;
  created_by: string;
  type: TransactionType;
  amount_cents: number;
  ref: string | null;
  memo: string | null;
  created_at: string;
  tenant_id: string;
}