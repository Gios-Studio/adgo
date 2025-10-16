/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:33 UTC
 */

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