// src/types/metrics.ts

export interface Metrics {
  id: string;
  tenant_id: string;
  campaign_id: string;
  ride_id: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  ecpm: number;
  payouts: number;
  is_exposed: boolean;
  created_at: string; // ISO date
}