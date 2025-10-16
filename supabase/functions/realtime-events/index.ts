// AdGo SDK Real-time Event Handler with Caching
// Supabase Edge Function for high-performance event processing

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory cache for performance
const cache = new Map();
const CACHE_TTL = 300000; // 5 minutes

interface CacheEntry {
  data: any;
  timestamp: number;
}

function getCached(key: string): any | null {
  const entry = cache.get(key) as CacheEntry;
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, data } = await req.json();
    
    switch (action) {
      case 'verify_event':
        return handleEventVerification(supabase, data);
      
      case 'get_realtime_metrics':
        return handleRealtimeMetrics(supabase, data);
        
      case 'cache_warmup':
        return handleCacheWarmup(supabase, data);
        
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
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
    const { data: campaigns } = await supabase
      .from('campaigns')
      .select('id, name, status')
      .eq('status', 'active')
      .limit(10);
      
    setCache('active_campaigns', campaigns);
    
    return new Response(
      JSON.stringify({ 
        warmed: true,
        cache_size: cache.size,
        campaigns_cached: campaigns?.length || 0
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