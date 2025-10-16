/**
 * AdGo SDK Analytics Library
 * Enhanced batch processing and event handling for optimal performance
 */

import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4, validate as isUUID } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AnalyticsEvent {
  campaign_id: string;
  ad_id: string;
  ride_id: string;
  device_id?: string;
  event_type: 'impression' | 'click' | 'conversion';
  zone?: string;
  meta?: Record<string, any>;
}

export interface BatchResult {
  success: boolean;
  batch_id: string;
  events_processed: number;
  events_inserted: number;
  events_duplicates: number;
  events_failed: number;
  processing_time_ms: number;
  event_ids: string[];
}

// Batch processing configuration
const BATCH_CONFIG = {
  maxSize: 50,
  defaultSize: 25,
  retryAttempts: 2,
  baseDelay: 75, // ms
  maxDelay: 1500 // ms
};

/**
 * Process analytics events in safe batches with duplicate handling
 */
export async function processBatchEvents(
  events: AnalyticsEvent[],
  batchId?: string
): Promise<BatchResult> {
  const startTime = Date.now();
  const finalBatchId = batchId || uuidv4();
  
  if (events.length > BATCH_CONFIG.maxSize) {
    throw new Error(`Batch size ${events.length} exceeds maximum ${BATCH_CONFIG.maxSize}`);
  }
  
  // Normalize and prepare events for insertion
  const processedEvents = events.map((event, index) => ({
    ...normalizeEventData(event),
    meta: { 
      ...event.meta, 
      batch_id: finalBatchId,
      batch_index: index,
      batch_processing: true 
    },
    occurred_at: new Date().toISOString()
  }));
  
  // Process events with Promise.allSettled for reliability
  const insertResults = await Promise.allSettled(
    processedEvents.map(async (eventData, index) => {
      return await insertSingleEventWithRetry(eventData, index, processedEvents.length);
    })
  );
  
  // Collect statistics
  const stats = analyzeInsertResults(insertResults);
  const processingTime = Date.now() - startTime;
  
  // Log batch processing results for monitoring
  if (stats.duplicates > 0 || stats.failed > 0) {
    console.log('[SDK_ANALYTICS_BATCH]', JSON.stringify({
      timestamp: new Date().toISOString(),
      batch_id: finalBatchId,
      ...stats,
      processing_time_ms: processingTime
    }));
  }
  
  return {
    success: true,
    batch_id: finalBatchId,
    events_processed: stats.total,
    events_inserted: stats.successful,
    events_duplicates: stats.duplicates,
    events_failed: stats.failed,
    processing_time_ms: processingTime,
    event_ids: stats.eventIds
  };
}

/**
 * Insert single event with enhanced retry logic
 */
async function insertSingleEventWithRetry(
  eventData: any,
  index: number,
  totalCount: number
): Promise<{ success: boolean; data?: any; duplicate?: boolean; index: number }> {
  let duplicateAttempts = 0;
  
  for (let attempt = 0; attempt < BATCH_CONFIG.retryAttempts; attempt++) {
    try {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert(eventData)
        .select()
        .single();
      
      if (error) throw error;
      
      return { success: true, data, index };
      
    } catch (error: any) {
      // Handle duplicate key violations
      if (error.message?.includes('duplicate key') || error.code === '23505') {
        duplicateAttempts++;
        if (duplicateAttempts >= 2) {
          console.log(`Event ${index + 1}/${totalCount}: duplicate after ${duplicateAttempts} attempts - skipping`);
          return { success: true, duplicate: true, index };
        }
      }
      
      // Don't retry on validation errors
      if (error.code?.startsWith('23') && !error.message?.includes('duplicate key')) {
        throw error;
      }
      
      if (attempt === BATCH_CONFIG.retryAttempts - 1) {
        throw error;
      }
      
      // Conditional delay with jitter
      const delay = Math.min(
        BATCH_CONFIG.baseDelay * Math.pow(1.5, attempt) + Math.random() * 25,
        BATCH_CONFIG.maxDelay
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error(`Failed to insert event after ${BATCH_CONFIG.retryAttempts} attempts`);
}

/**
 * Normalize event data and ensure valid UUIDs
 */
function normalizeEventData(event: AnalyticsEvent): any {
  const normalized = { ...event };
  
  // Ensure ride_id is UUID or create one
  if (!isUUID(normalized.ride_id)) {
    console.log(`Invalid ride_id: ${normalized.ride_id}, generating UUID`);
    normalized.ride_id = uuidv4();
  }
  
  // Ensure campaign_id is valid UUID
  if (!isUUID(normalized.campaign_id)) {
    console.log(`Invalid campaign_id: ${normalized.campaign_id}, using default`);
    normalized.campaign_id = 'ace29fa0-5765-4ce0-b856-074b3abad5e7';
  }
  
  // Ensure ad_id is valid UUID
  if (!isUUID(normalized.ad_id)) {
    console.log(`Invalid ad_id: ${normalized.ad_id}, using default`);
    normalized.ad_id = '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c';
  }
  
  return {
    campaign_id: normalized.campaign_id,
    ad_id: normalized.ad_id,
    ride_id: normalized.ride_id,
    device_id: normalized.device_id || null,
    event_type: normalized.event_type,
    region: normalized.zone || 'post-ride'
  };
}

/**
 * Analyze Promise.allSettled results and extract statistics
 */
function analyzeInsertResults(results: PromiseSettledResult<any>[]): {
  total: number;
  successful: number;
  duplicates: number;
  failed: number;
  eventIds: string[];
} {
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;
  
  const duplicates = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
    .filter(r => r.value.duplicate)
    .length;
  
  const eventIds = results
    .filter((r): r is PromiseFulfilledResult<any> => 
      r.status === 'fulfilled' && r.value.data?.id)
    .map(r => r.value.data.id);
  
  return {
    total: results.length,
    successful,
    duplicates,
    failed,
    eventIds
  };
}

/**
 * Process events in smaller chunks for very large batches
 */
export async function processLargeBatch(
  events: AnalyticsEvent[],
  chunkSize: number = BATCH_CONFIG.defaultSize
): Promise<BatchResult[]> {
  const chunks: AnalyticsEvent[][] = [];
  
  for (let i = 0; i < events.length; i += chunkSize) {
    chunks.push(events.slice(i, i + chunkSize));
  }
  
  const results = await Promise.allSettled(
    chunks.map(chunk => processBatchEvents(chunk))
  );
  
  return results
    .filter((r): r is PromiseFulfilledResult<BatchResult> => r.status === 'fulfilled')
    .map(r => r.value);
}

/**
 * Validate ride reference integrity
 */
export async function validateRideReference(rideId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('rides')
      .select('id')
      .eq('id', rideId)
      .single();
    
    return !error && !!data;
  } catch {
    return false;
  }
}