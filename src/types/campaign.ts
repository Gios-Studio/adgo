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

// src/types/campaign.ts

export type CampaignStatus =
  | "draft"
  | "active"
  | "paused"
  | "ended"
  | "archived";

export interface Campaign {
  id: string; // uuid
  name: string;
  tenant_id: string;
  org_id: string;
  status: CampaignStatus;
  budget: number; // in cents
  start_date: string; // ISO string from Supabase
  end_date: string; // ISO string
  created_at: string;
  updated_at: string;
  frequency_cap: boolean;
}