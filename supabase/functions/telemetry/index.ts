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

/**
 * AdGo SDK Telemetry Collection Edge Function
 * Handles enterprise-grade telemetry, analytics, and audit logging
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-adgo-license, x-adgo-sig',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface TelemetryEvent {
  license_id?: string
  event_type: 'init' | 'verify_key' | 'api_call' | 'error' | 'heartbeat' | 'feature_used'
  event_data: any
  sdk_version?: string
  sdk_name?: string
  session_id?: string
  timestamp?: string
  region?: string
}

interface BatchTelemetryRequest {
  license_key: string
  events: TelemetryEvent[]
  sdk_info: {
    name: string
    version: string
    platform: string
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const url = new URL(req.url)
    const pathname = url.pathname

    switch (pathname) {
      case '/telemetry':
        return await handleTelemetryCollection(req, supabase)
      case '/telemetry/batch':
        return await handleBatchTelemetry(req, supabase)
      case '/telemetry/analytics':
        return await handleAnalyticsQuery(req, supabase)
      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Telemetry Function Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function handleTelemetryCollection(req: Request, supabase: any): Promise<Response> {
  try {
    const {
      license_key,
      event_type,
      event_data,
      sdk_version,
      sdk_name,
      session_id
    } = await req.json()

    if (!license_key || !event_type) {
      return respondWithError('License key and event type are required', 400)
    }

    // Verify license exists and get license_id
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .select('id, partner_id, region, status')
      .eq('license_key', license_key)
      .single()

    if (licenseError || !license) {
      return respondWithError('Invalid license key', 401)
    }

    if (license.status !== 'active') {
      return respondWithError('License is not active', 401)
    }

    // Prepare telemetry event
    const telemetryEvent = {
      license_id: license.id,
      partner_id: license.partner_id,
      event_type,
      event_data: {
        ...event_data,
        client_ip: getClientIP(req),
        user_agent: req.headers.get('user-agent'),
        referrer: req.headers.get('referer')
      },
      timestamp: new Date().toISOString(),
      region: req.headers.get('x-adgo-region') || license.region || 'global',
      sdk_version,
      sdk_name,
      session_id,
      ip_address: getClientIP(req),
      user_agent: req.headers.get('user-agent')
    }

    // Insert telemetry event
    const { error: insertError } = await supabase
      .from('telemetry_events')
      .insert(telemetryEvent)

    if (insertError) {
      console.error('Telemetry insert error:', insertError)
      return respondWithError('Failed to record telemetry', 500)
    }

    // Update license last_used timestamp
    await supabase
      .from('licenses')
      .update({ 
        last_used: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', license.id)

    // Return success with any relevant system messages
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      event_id: crypto.randomUUID()
    }

    // Check for system alerts or messages based on event
    if (event_type === 'error') {
      const errorRate = await calculateErrorRate(supabase, license.id)
      if (errorRate > 10) { // Alert if error rate > 10%
        response.alerts = [{
          type: 'high_error_rate',
          message: 'High error rate detected. Consider reviewing integration.',
          threshold: 10,
          current: errorRate
        }]
      }
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Telemetry collection error:', error)
    return respondWithError('Telemetry collection failed', 500)
  }
}

async function handleBatchTelemetry(req: Request, supabase: any): Promise<Response> {
  try {
    const { license_key, events, sdk_info }: BatchTelemetryRequest = await req.json()

    if (!license_key || !events || !Array.isArray(events)) {
      return respondWithError('License key and events array are required', 400)
    }

    // Verify license
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .select('id, partner_id, region, status')
      .eq('license_key', license_key)
      .single()

    if (licenseError || !license || license.status !== 'active') {
      return respondWithError('Invalid or inactive license', 401)
    }

    // Prepare batch telemetry events
    const telemetryEvents = events.map(event => ({
      license_id: license.id,
      partner_id: license.partner_id,
      event_type: event.event_type,
      event_data: {
        ...event.event_data,
        batch_info: {
          total_events: events.length,
          sdk_info,
          client_ip: getClientIP(req)
        }
      },
      timestamp: event.timestamp || new Date().toISOString(),
      region: event.region || license.region || 'global',
      sdk_version: event.sdk_version || sdk_info?.version,
      sdk_name: event.sdk_name || sdk_info?.name,
      session_id: event.session_id,
      ip_address: getClientIP(req),
      user_agent: req.headers.get('user-agent')
    }))

    // Batch insert telemetry events
    const { error: insertError } = await supabase
      .from('telemetry_events')
      .insert(telemetryEvents)

    if (insertError) {
      console.error('Batch telemetry insert error:', insertError)
      return respondWithError('Failed to record batch telemetry', 500)
    }

    // Update license last_used
    await supabase
      .from('licenses')
      .update({ 
        last_used: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', license.id)

    return new Response(JSON.stringify({
      success: true,
      events_processed: events.length,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Batch telemetry error:', error)
    return respondWithError('Batch telemetry failed', 500)
  }
}

async function handleAnalyticsQuery(req: Request, supabase: any): Promise<Response> {
  try {
    const url = new URL(req.url)
    const license_key = url.searchParams.get('license_key')
    const days_back = parseInt(url.searchParams.get('days') || '7')
    const event_type = url.searchParams.get('event_type')

    if (!license_key) {
      return respondWithError('License key is required', 400)
    }

    // Verify license ownership (in production, verify JWT token)
    const { data: license, error: licenseError } = await supabase
      .from('licenses')
      .select('id, partner_id')
      .eq('license_key', license_key)
      .single()

    if (licenseError || !license) {
      return respondWithError('Invalid license key', 401)
    }

    // Build analytics query
    let query = supabase
      .from('telemetry_events')
      .select('*')
      .eq('license_id', license.id)
      .gte('timestamp', new Date(Date.now() - days_back * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: false })

    if (event_type) {
      query = query.eq('event_type', event_type)
    }

    const { data: events, error: queryError } = await query.limit(1000)

    if (queryError) {
      console.error('Analytics query error:', queryError)
      return respondWithError('Failed to fetch analytics', 500)
    }

    // Calculate analytics metrics
    const analytics = {
      total_events: events.length,
      event_types: {},
      daily_breakdown: {},
      error_rate: 0,
      avg_response_time: 0,
      regions: {},
      sdk_versions: {}
    }

    events.forEach(event => {
      // Event types count
      analytics.event_types[event.event_type] = (analytics.event_types[event.event_type] || 0) + 1

      // Daily breakdown
      const date = new Date(event.timestamp).toISOString().split('T')[0]
      analytics.daily_breakdown[date] = (analytics.daily_breakdown[date] || 0) + 1

      // Region distribution
      analytics.regions[event.region] = (analytics.regions[event.region] || 0) + 1

      // SDK version distribution
      if (event.sdk_version) {
        analytics.sdk_versions[event.sdk_version] = (analytics.sdk_versions[event.sdk_version] || 0) + 1
      }

      // Response time aggregation
      if (event.response_time_ms) {
        analytics.avg_response_time += event.response_time_ms
      }
    })

    // Calculate error rate
    const errorCount = analytics.event_types['error'] || 0
    analytics.error_rate = events.length > 0 ? (errorCount / events.length) * 100 : 0

    // Calculate average response time
    const responseTimes = events.filter(e => e.response_time_ms).length
    if (responseTimes > 0) {
      analytics.avg_response_time = analytics.avg_response_time / responseTimes
    }

    return new Response(JSON.stringify({
      license_id: license.id,
      period_days: days_back,
      analytics,
      sample_events: events.slice(0, 10) // Include recent sample events
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Analytics query error:', error)
    return respondWithError('Analytics query failed', 500)
  }
}

// Utility Functions

async function calculateErrorRate(supabase: any, license_id: string): Promise<number> {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { data: events } = await supabase
      .from('telemetry_events')
      .select('event_type')
      .eq('license_id', license_id)
      .gte('timestamp', oneDayAgo)

    if (!events || events.length === 0) return 0

    const errorCount = events.filter(e => e.event_type === 'error').length
    return (errorCount / events.length) * 100
  } catch {
    return 0
  }
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         req.headers.get('cf-connecting-ip') || // Cloudflare
         'unknown'
}

function respondWithError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}

// Advanced Features

async function detectAnomalies(supabase: any, license_id: string): Promise<any[]> {
  // Implement anomaly detection logic
  // - Unusual spike in API calls
  // - High error rates
  // - Suspicious geographic patterns
  // - Unusual timing patterns
  
  const anomalies = []
  
  try {
    // Check for usage spikes (simplified)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
    
    const { data: recentEvents } = await supabase
      .from('telemetry_events')
      .select('id')
      .eq('license_id', license_id)
      .gte('timestamp', oneDayAgo)

    const { data: previousEvents } = await supabase
      .from('telemetry_events')
      .select('id')
      .eq('license_id', license_id)
      .gte('timestamp', twoDaysAgo)
      .lt('timestamp', oneDayAgo)

    const recentCount = recentEvents?.length || 0
    const previousCount = previousEvents?.length || 0

    if (previousCount > 0 && recentCount > previousCount * 3) {
      anomalies.push({
        type: 'usage_spike',
        severity: 'medium',
        description: 'Usage increased by more than 300% compared to previous day',
        data: { recent: recentCount, previous: previousCount }
      })
    }

  } catch (error) {
    console.error('Anomaly detection error:', error)
  }
  
  return anomalies
}