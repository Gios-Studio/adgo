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
 * AdGo SDK License Verification & Metering Edge Function
 * Handles enterprise-grade license validation with JWT signing and usage tracking
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-adgo-sig, x-adgo-region',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

// JWT Configuration
const JWT_SECRET = Deno.env.get('SUPABASE_JWT_SECRET')!
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(JWT_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"]
)

interface LicenseVerificationResponse {
  valid: boolean
  license?: {
    id: string
    plan: string
    region: string
    usage_count: number
    usage_limit: number
    remaining: number
    expires_at?: string
    metadata?: any
  }
  token?: string
  error?: string
  rate_limited?: boolean
}

interface MeteringResponse {
  allowed: boolean
  remaining: number
  usage_count: number
  usage_limit: number
  plan: string
  reset_time?: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const pathname = url.pathname
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Route handling
    switch (pathname) {
      case '/sdk/verify':
        return await handleVerifyLicense(req, supabase)
      case '/sdk/meter':
        return await handleMeterUsage(req, supabase)
      case '/sdk/rotate':
        return await handleRotateKey(req, supabase)
      case '/sdk/revoke':
        return await handleRevokeKey(req, supabase)
      case '/sdk/ping':
        return await handlePingLicense(req, supabase)
      case '/sdk/health':
        return await handleHealthCheck(req, supabase)
      default:
        return new Response(
          JSON.stringify({ error: 'Not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('SDK Function Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function handleVerifyLicense(req: Request, supabase: any): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const { license_key, sdk_version, region } = await req.json()
  
  if (!license_key) {
    return respondWithError('License key is required', 400)
  }

  try {
    // Verify HMAC signature if present
    const signature = req.headers.get('x-adgo-sig')
    if (signature && !await verifyHMACSignature(req, signature)) {
      await logTelemetry(supabase, null, 'verify_key', { 
        error: 'invalid_signature', 
        ip: getClientIP(req),
        user_agent: req.headers.get('user-agent') 
      })
      return respondWithError('Invalid signature', 401)
    }

    // Query license with usage information
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .eq('status', 'active')
      .single()

    if (error || !license) {
      await logTelemetry(supabase, null, 'verify_key', { 
        error: 'license_not_found',
        license_key: license_key.substring(0, 8) + '...',
        ip: getClientIP(req)
      })
      return respondWithError('Invalid license key', 401)
    }

    // Check expiration
    if (license.expires_at && new Date(license.expires_at) < new Date()) {
      await logTelemetry(supabase, license.id, 'verify_key', { 
        error: 'license_expired',
        expires_at: license.expires_at,
        ip: getClientIP(req)
      })
      return respondWithError('License expired', 401)
    }

    // Update last_used timestamp
    await supabase
      .from('licenses')
      .update({ 
        last_used: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', license.id)

    // Generate JWT token for client-side caching (24h expiry)
    const payload = {
      license_id: license.id,
      partner_id: license.partner_id,
      plan: license.plan,
      region: license.region,
      iat: getNumericDate(new Date()),
      exp: getNumericDate(new Date(Date.now() + 24 * 60 * 60 * 1000)), // 24 hours
    }

    const token = await create({ alg: "HS256", typ: "JWT" }, payload, key)

    // Log successful verification
    await logTelemetry(supabase, license.id, 'verify_key', {
      success: true,
      sdk_version,
      region: region || license.region,
      ip: getClientIP(req),
      user_agent: req.headers.get('user-agent')
    })

    const response: LicenseVerificationResponse = {
      valid: true,
      license: {
        id: license.id,
        plan: license.plan,
        region: license.region,
        usage_count: license.usage_count,
        usage_limit: license.usage_limit,
        remaining: license.usage_limit - license.usage_count,
        expires_at: license.expires_at,
        metadata: license.metadata
      },
      token
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('License verification error:', error)
    await logTelemetry(supabase, null, 'error', { 
      error: 'verification_failed',
      message: error.message,
      ip: getClientIP(req)
    })
    return respondWithError('Verification failed', 500)
  }
}

async function handleMeterUsage(req: Request, supabase: any): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const { license_key, calls = 1 } = await req.json()
  
  if (!license_key) {
    return respondWithError('License key is required', 400)
  }

  try {
    // Use atomic function to increment usage
    const { data, error } = await supabase
      .rpc('increment_license_usage', { license_key_param: license_key })

    if (error) {
      throw error
    }

    const result = data[0]
    if (!result) {
      return respondWithError('License not found', 404)
    }

    // Log metering event
    const { data: license } = await supabase
      .from('licenses')
      .select('id, plan')
      .eq('license_key', license_key)
      .single()

    if (license) {
      await logTelemetry(supabase, license.id, 'api_call', {
        usage_count: result.usage_count,
        remaining: result.remaining,
        calls_increment: calls,
        ip: getClientIP(req)
      })
    }

    const response: MeteringResponse = {
      allowed: result.allowed,
      remaining: result.remaining,
      usage_count: result.usage_count,
      usage_limit: result.usage_limit,
      plan: license?.plan || 'unknown',
      reset_time: getNextResetTime()
    }

    const statusCode = result.allowed ? 200 : 429
    return new Response(JSON.stringify(response), {
      status: statusCode,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Usage metering error:', error)
    return respondWithError('Metering failed', 500)
  }
}

async function handleRotateKey(req: Request, supabase: any): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const { license_key } = await req.json()
  
  if (!license_key) {
    return respondWithError('License key is required', 400)
  }

  try {
    // Generate new license key
    const newLicenseKey = generateLicenseKey()

    // Update the license key
    const { data: license, error } = await supabase
      .from('licenses')
      .update({ 
        license_key: newLicenseKey,
        updated_at: new Date().toISOString()
      })
      .eq('license_key', license_key)
      .select()
      .single()

    if (error || !license) {
      return respondWithError('License not found or rotation failed', 404)
    }

    // Log rotation event
    await logTelemetry(supabase, license.id, 'rotate_key', {
      old_key: license_key.substring(0, 8) + '...',
      new_key: newLicenseKey.substring(0, 8) + '...',
      ip: getClientIP(req)
    })

    return new Response(JSON.stringify({ 
      success: true, 
      new_license_key: newLicenseKey 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Key rotation error:', error)
    return respondWithError('Key rotation failed', 500)
  }
}

async function handleRevokeKey(req: Request, supabase: any): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const { license_key } = await req.json()
  
  if (!license_key) {
    return respondWithError('License key is required', 400)
  }

  try {
    const { data: license, error } = await supabase
      .from('licenses')
      .update({ 
        status: 'revoked',
        updated_at: new Date().toISOString()
      })
      .eq('license_key', license_key)
      .select()
      .single()

    if (error || !license) {
      return respondWithError('License not found', 404)
    }

    // Log revocation
    await logTelemetry(supabase, license.id, 'revoke_key', {
      license_key: license_key.substring(0, 8) + '...',
      ip: getClientIP(req)
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Key revocation error:', error)
    return respondWithError('Key revocation failed', 500)
  }
}

async function handlePingLicense(req: Request, supabase: any): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders })
  }

  const { license_key, sdk_version, health_data } = await req.json()
  
  if (!license_key) {
    return respondWithError('License key is required', 400)
  }

  try {
    // Verify license exists and is active
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', license_key)
      .eq('status', 'active')
      .single()

    if (error || !license) {
      return respondWithError('Invalid license', 401)
    }

    // Update last_used
    await supabase
      .from('licenses')
      .update({ last_used: new Date().toISOString() })
      .eq('id', license.id)

    // Log heartbeat
    await logTelemetry(supabase, license.id, 'heartbeat', {
      sdk_version,
      health_data,
      ip: getClientIP(req)
    })

    return new Response(JSON.stringify({ 
      success: true, 
      server_time: new Date().toISOString(),
      license_status: 'active'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Ping error:', error)
    return respondWithError('Ping failed', 500)
  }
}

async function handleHealthCheck(req: Request, supabase: any): Promise<Response> {
  const { sdk_name, version } = new URL(req.url).searchParams

  try {
    // Get SDK build information for integrity check
    let buildInfo = null
    if (sdk_name && version) {
      const { data } = await supabase
        .from('sdk_builds')
        .select('*')
        .eq('sdk_name', sdk_name)
        .eq('version', version)
        .single()
      
      buildInfo = data
    }

    // Get system status
    const { data: analytics } = await supabase
      .rpc('get_license_analytics', { days_back: 1 })

    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      region: Deno.env.get('DENO_REGION') || 'global',
      sdk_build: buildInfo,
      system_stats: analytics?.[0] || null
    }

    return new Response(JSON.stringify(healthStatus), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Health check error:', error)
    return new Response(JSON.stringify({ 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

// Utility Functions

async function logTelemetry(supabase: any, license_id: string | null, event_type: string, event_data: any) {
  try {
    await supabase
      .from('telemetry_events')
      .insert({
        license_id,
        event_type,
        event_data,
        timestamp: new Date().toISOString(),
        region: Deno.env.get('DENO_REGION') || 'global'
      })
  } catch (error) {
    console.error('Telemetry logging failed:', error)
  }
}

async function verifyHMACSignature(req: Request, signature: string): Promise<boolean> {
  try {
    const body = await req.clone().text()
    const hmacKey = Deno.env.get('ADGO_HMAC_SECRET')
    if (!hmacKey) return false

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(hmacKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const signatureBuffer = new Uint8Array(signature.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
    const bodyBuffer = new TextEncoder().encode(body)

    return await crypto.subtle.verify('HMAC', key, signatureBuffer, bodyBuffer)
  } catch {
    return false
  }
}

function generateLicenseKey(): string {
  const prefix = 'adgo_'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = prefix
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0] || 
         req.headers.get('x-real-ip') || 
         'unknown'
}

function getNextResetTime(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(0, 0, 0, 0)
  return tomorrow.toISOString()
}

function respondWithError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
}