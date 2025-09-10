
// packages/types/src/index.ts
// AdGo shared TypeScript types for FE/BE boundary

export type UUID = string;

export type GoalType = 'awareness' | 'ctr' | 'redemption';
export type EventKind = 'view' | 'click' | 'redemption';
export type DeliveryStatus = 'queued' | 'sending' | 'sent' | 'failed' | 'blocked' | 'capped';
export type AdSlot = 'ride' | 'pickup' | 'dropoff';

export interface Campaign {
  id: UUID;
  tenant_id: UUID;
  advertiser_id: UUID;
  name: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  time_window?: [string, string]; // ISO start/end
  goal: GoalType;
  cap_daily?: number;
  budget_total: number;
  currency: string;
  created_by?: UUID;
}

export interface Creative {
  id: UUID;
  tenant_id: UUID;
  campaign_id: UUID;
  kind: 'image' | 'video' | 'text';
  storage_url: string;
  width?: number;
  height?: number;
  duration_ms?: number;
  meta?: Record<string, unknown>;
}

export interface Targeting {
  id: UUID;
  tenant_id: UUID;
  campaign_id: UUID;
  poi_ids?: UUID[];
  time_of_day?: Array<[number, number]>; // minutes since midnight
  days_of_week?: number[]; // 0-6
  meta?: Record<string, unknown>;
}

export interface DeliveryPreviewRequest {
  campaign_id: UUID;
}

export interface DeliveryPreviewResponse {
  estimated_reach: number;
  top_pois: Array<{ id: UUID; name: string; count: number }>;
  est_cost: number;
  currency: string;
}

export interface DeliveryDispatchRequest {
  campaign_id: UUID;
  channel?: 'sms';
}

export interface EventIngest {
  campaign_id: UUID;
  creative_id?: UUID;
  delivery_id?: UUID;
  kind: EventKind;
  meta?: Record<string, unknown>;
  at?: string;
}
