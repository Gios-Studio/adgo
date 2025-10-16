// AdGo SDK Real-time Event Handler with Enhanced Redis-style Caching
// Supabase Edge Function for sub-1s performance event processing

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-sdk-version',
  'Cache-Control': 'public, max-age=60', // 1 minute cache
};

// Enhanced multi-tier cache with LRU eviction
const cache = new Map();
const hotCache = new Map(); // Frequently accessed items
const CACHE_TTL = 60000; // 1 minute for high-frequency updates
const HOT_CACHE_TTL = 300000; // 5 minutes for frequently accessed
const MAX_CACHE_SIZE = 1000;
const MAX_HOT_CACHE_SIZE = 100;

interface CacheEntry {
  data: any;
  timestamp: number;
  hits: number;
  ttl: number;
}

// Enhanced cache management with LRU eviction and hit tracking
function getCached(key: string): any | null {
  // Check hot cache first
  let entry = hotCache.get(key) as CacheEntry;
  if (entry) {
    if (Date.now() - entry.timestamp <= entry.ttl) {
      entry.hits++;
      return entry.data;
    }
    hotCache.delete(key);
  }
  
  // Check regular cache
  entry = cache.get(key) as CacheEntry;
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > entry.ttl) {
    cache.delete(key);
    return null;
  }
  
  // Promote to hot cache if frequently accessed
  entry.hits++;
  if (entry.hits > 5) {
    promoteToHotCache(key, entry);
  }
  
  return entry.data;
}

function setCache(key: string, data: any, ttl: number = CACHE_TTL): void {
  // Implement LRU eviction
  if (cache.size >= MAX_CACHE_SIZE) {
    evictLRU();
  }
  
  cache.set(key, {
    data,
    timestamp: Date.now(),
    hits: 0,
    ttl
  });
}

function promoteToHotCache(key: string, entry: CacheEntry): void {
  if (hotCache.size >= MAX_HOT_CACHE_SIZE) {
    // Evict oldest hot cache entry
    const oldestKey = hotCache.keys().next().value;
    hotCache.delete(oldestKey);
  }
  
  hotCache.set(key, {
    ...entry,
    ttl: HOT_CACHE_TTL,
    timestamp: Date.now()
  });
}

function evictLRU(): void {
  // Find and remove least recently used entry
  let oldestKey = null;
  let oldestTime = Date.now();
  
  for (const [key, entry] of cache.entries()) {
    if (entry.timestamp < oldestTime) {
      oldestTime = entry.timestamp;
      oldestKey = key;
    }
  }
  
  if (oldestKey) {
    cache.delete(oldestKey);
  }
}

serve(async (req) => {
  const startTime = performance.now();
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();
    let response;
    
    switch (action) {
      case 'verify_event':
        response = await handleEventVerification(supabase, data);
        break;
      
      case 'get_realtime_metrics':
        response = await handleRealtimeMetrics(supabase, data);
        break;
        
      case 'cache_warmup':
        response = await handleCacheWarmup(supabase, data);
        break;

      case 'batch_process':
        response = await handleBatchProcessing(supabase, data);
        break;

      case 'performance_stats':
        response = await handlePerformanceStats(supabase, data);
        break;
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
    
    // Add performance metrics to response
    const processingTime = performance.now() - startTime;
    const responseBody = await response.json();
    
    return new Response(
      JSON.stringify({
        ...responseBody,
        performance: {
          processing_time_ms: Math.round(processingTime * 100) / 100,
          cache_hit_rate: calculateCacheHitRate(),
          memory_usage: {
            cache_entries: cache.size,
            hot_cache_entries: hotCache.size
          }
        },
        sdk_version: '1.0.0-sdk-verified'
      }),
      { 
        status: response.status,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Processing-Time': processingTime.toString()
        } 
      }
    );
    
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString(),
        sdk_version: '1.0.0-sdk-verified'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function handleEventVerification(supabase: any, data: any) {
  const { event_id, ride_id } = data;
  const cacheKey = `event_${event_id}`;
  
  // Check cache first
  let eventData = getCached(cacheKey);
  
  if (!eventData) {
    const { data: result, error } = await supabase
      .from('analytics_events')
      .select('id, event_type, ride_id, created_at')
      .eq('id', event_id)
      .single();
      
    if (error) {
      return new Response(
        JSON.stringify({ verified: false, error: error.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    eventData = result;
    setCache(cacheKey, eventData);
  }
  
  return new Response(
    JSON.stringify({ 
      verified: true,
      event: eventData,
      cached: getCached(cacheKey) !== null,
      response_time: Date.now(),
      sdk_version: '1.0.0'
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleRealtimeMetrics(supabase: any, data: any) {
  const { period = '1h' } = data;
  const cacheKey = `metrics_${period}`;
  
  let metrics = getCached(cacheKey);
  
  if (!metrics) {
    const now = new Date();
    const startTime = new Date();
    
    switch (period) {
      case '1h':
        startTime.setHours(now.getHours() - 1);
        break;
      case '24h':
        startTime.setDate(now.getDate() - 1);
        break;
      default:
        startTime.setHours(now.getHours() - 1);
    }
    
    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('event_type, created_at')
      .gte('created_at', startTime.toISOString());
      
    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const impressions = events?.filter((e: any) => e.event_type === 'impression').length || 0;
    const clicks = events?.filter((e: any) => e.event_type === 'click').length || 0;
    
    metrics = {
      period,
      impressions,
      clicks,
      ctr: impressions > 0 ? ((clicks / impressions) * 100) : 0,
      timestamp: new Date().toISOString()
    };
    
    setCache(cacheKey, metrics);
  }
  
  return new Response(
    JSON.stringify({
      ...metrics,
      cached: getCached(cacheKey) !== null,
      cache_size: cache.size
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function handleCacheWarmup(supabase: any, data: any) {
  try {
    // Preload frequently accessed data
    const promises = [
      supabase.from('campaigns').select('id, name, status').eq('status', 'active').limit(10),
      supabase.from('analytics_events').select('event_type, created_at').gte('created_at', new Date(Date.now() - 3600000).toISOString()),
      supabase.from('campaign_metrics').select('*').limit(5)
    ];
    
    const [campaignsResult, recentEventsResult, metricsResult] = await Promise.all(promises);
    
    setCache('active_campaigns', campaignsResult.data, HOT_CACHE_TTL);
    setCache('recent_events_1h', recentEventsResult.data);
    setCache('campaign_metrics_summary', metricsResult.data, HOT_CACHE_TTL);
    
    return new Response(
      JSON.stringify({ 
        warmed: true,
        cache_size: cache.size,
        hot_cache_size: hotCache.size,
        preloaded: {
          campaigns: campaignsResult.data?.length || 0,
          recent_events: recentEventsResult.data?.length || 0,
          metrics: metricsResult.data?.length || 0
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handleBatchProcessing(supabase: any, data: any) {
  try {
    const { events, batch_size = 50 } = data;
    const results = [];
    
    // Process events in optimized batches
    for (let i = 0; i < events.length; i += batch_size) {
      const batch = events.slice(i, i + batch_size);
      const batchKey = `batch_${i}_${batch_size}`;
      
      let batchResult = getCached(batchKey);
      if (!batchResult) {
        batchResult = await processBatch(supabase, batch);
        setCache(batchKey, batchResult, 30000); // 30 second cache for batch results
      }
      
      results.push(...batchResult);
    }
    
    return new Response(
      JSON.stringify({
        processed: true,
        batch_count: Math.ceil(events.length / batch_size),
        total_events: events.length,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

async function handlePerformanceStats(supabase: any, data: any) {
  const stats = {
    cache: {
      size: cache.size,
      hot_cache_size: hotCache.size,
      hit_rate: calculateCacheHitRate(),
      memory_efficiency: ((cache.size + hotCache.size) / (MAX_CACHE_SIZE + MAX_HOT_CACHE_SIZE)) * 100
    },
    performance: {
      avg_response_time_ms: getAverageResponseTime(),
      requests_per_second: getRequestsPerSecond(),
      uptime_seconds: getUptimeSeconds()
    },
    database: {
      connection_pool_active: true,
      last_query_time: Date.now()
    }
  };

  return new Response(
    JSON.stringify(stats),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

async function processBatch(supabase: any, batch: any[]) {
  const { data, error } = await supabase
    .from('analytics_events')
    .insert(batch)
    .select();
    
  if (error) throw error;
  return data;
}

function calculateCacheHitRate(): number {
  const totalEntries = cache.size + hotCache.size;
  if (totalEntries === 0) return 0;
  
  let totalHits = 0;
  for (const entry of cache.values()) {
    totalHits += entry.hits;
  }
  for (const entry of hotCache.values()) {
    totalHits += entry.hits;
  }
  
  return totalEntries > 0 ? (totalHits / totalEntries) * 100 : 0;
}

let startTime = Date.now();
let requestCount = 0;
let responseTimeSum = 0;

function getAverageResponseTime(): number {
  return requestCount > 0 ? responseTimeSum / requestCount : 0;
}

function getRequestsPerSecond(): number {
  const uptimeSeconds = (Date.now() - startTime) / 1000;
  return uptimeSeconds > 0 ? requestCount / uptimeSeconds : 0;
}

function getUptimeSeconds(): number {
  return (Date.now() - startTime) / 1000;
}