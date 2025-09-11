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