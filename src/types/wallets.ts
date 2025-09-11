// src/types/wallets.ts
export interface Wallet {
  id: string;
  owner_id: string;
  currency: string;
  balance_cents: number;
  created_at: string;
  updated_at: string;
}