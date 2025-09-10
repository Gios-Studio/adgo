
// api/examples/routes.ts
// Minimal Express-like handlers (can be adapted for Next.js)

import type {
  DeliveryPreviewRequest,
  DeliveryPreviewResponse,
  DeliveryDispatchRequest,
  EventIngest,
} from "../../packages/types/src";

// PLAN: roughly estimate reach based on current seed data
export async function planDelivery(reqBody: DeliveryPreviewRequest): Promise<DeliveryPreviewResponse> {
  // TODO: query Supabase for eligible rides/POIs; here we mock
  return {
    estimated_reach: 1250,
    top_pois: [
      { id: 'poi-1', name: 'ArtCafé Village Market', count: 480 },
      { id: 'poi-2', name: 'ArtCafé Westgate', count: 370 },
    ],
    est_cost: 1250 * 1.5, // mock KES 1.5 per SMS
    currency: 'KES',
  };
}

export async function dispatchDelivery(reqBody: DeliveryDispatchRequest) {
  // TODO: insert into deliveries + sms_queue
  return { ok: true, enqueued: 800 };
}

export async function ingestEvent(reqBody: EventIngest) {
  // TODO: insert into events; update matviews async
  return { ok: true };
}
