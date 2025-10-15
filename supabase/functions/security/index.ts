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
 * AdGo Security Violation Monitoring Edge Function
 * Handles security event reporting and threat detection
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-adgo-security',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

interface SecurityViolation {
  type: string;
  details: string;
  timestamp: number;
  userAgent: string;
  url: string;
  buildHash: string;
  ipAddress?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ThreatPattern {
  pattern: RegExp;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

const THREAT_PATTERNS: ThreatPattern[] = [
  {
    pattern: /sql|union|select|insert|delete|drop|create|alter/i,
    severity: 'high',
    description: 'SQL injection attempt detected'
  },
  {
    pattern: /<script|javascript:|vbscript:|onload=|onerror=/i,
    severity: 'high',
    description: 'XSS attempt detected'
  },
  {
    pattern: /\.\.\/|\.\.\\|\/etc\/passwd|\/proc\/|c:\\/i,
    severity: 'critical',
    description: 'Path traversal attempt detected'
  },
  {
    pattern: /eval\(|function\(.*\)\s*{|setTimeout\s*\(.*function/i,
    severity: 'medium',
    description: 'Code injection attempt detected'
  }
];

const RATE_LIMITS = {
  violations_per_hour: 10,
  violations_per_day: 50
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const url = new URL(req.url);
    const method = req.method;
    const path = url.pathname;

    // Get client IP address
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                    req.headers.get('x-real-ip') || 
                    'unknown';

    switch (path) {
      case '/api/security/violation':
        if (method === 'POST') {
          return await handleViolationReport(req, supabase, clientIP);
        }
        break;

      case '/api/security/threats':
        if (method === 'GET') {
          return await handleThreatAnalysis(supabase);
        }
        break;

      case '/api/security/status':
        if (method === 'GET') {
          return await handleSecurityStatus(supabase);
        }
        break;

      default:
        return new Response('Not Found', { status: 404, headers: corsHeaders });
    }

    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });

  } catch (error) {
    console.error('Security monitoring error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

/**
 * Handle security violation reports
 */
async function handleViolationReport(req: Request, supabase: any, clientIP: string) {
  try {
    const violation: SecurityViolation = await req.json();
    
    // Validate build hash
    const securityHeader = req.headers.get('x-adgo-security');
    if (!securityHeader || securityHeader !== violation.buildHash) {
      return new Response(
        JSON.stringify({ error: 'Invalid security header' }), 
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limits
    const isRateLimited = await checkRateLimit(supabase, clientIP);
    if (isRateLimited) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }), 
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Analyze threat patterns
    const severity = analyzeThreatSeverity(violation);
    
    // Store violation in database
    const { error: insertError } = await supabase
      .from('security_violations')
      .insert({
        type: violation.type,
        details: violation.details,
        timestamp: new Date(violation.timestamp),
        user_agent: violation.userAgent,
        url: violation.url,
        build_hash: violation.buildHash,
        ip_address: clientIP,
        severity: severity,
        created_at: new Date()
      });

    if (insertError) {
      console.error('Failed to store violation:', insertError);
    }

    // Trigger alerts for critical violations
    if (severity === 'critical') {
      await triggerSecurityAlert(supabase, violation, clientIP);
    }

    // Update threat intelligence
    await updateThreatIntelligence(supabase, violation, clientIP);

    return new Response(
      JSON.stringify({ 
        success: true, 
        severity,
        message: 'Violation reported successfully' 
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Violation reporting error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process violation report' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Analyze threat severity based on patterns
 */
function analyzeThreatSeverity(violation: SecurityViolation): 'low' | 'medium' | 'high' | 'critical' {
  const content = `${violation.type} ${violation.details} ${violation.url}`;
  
  for (const pattern of THREAT_PATTERNS) {
    if (pattern.pattern.test(content)) {
      return pattern.severity;
    }
  }

  // Default severity based on violation type
  switch (violation.type) {
    case 'build_integrity':
    case 'source_map':
      return 'critical';
    case 'debug_attempt':
      return 'medium';
    case 'context_menu':
    case 'keyboard_shortcut':
      return 'low';
    default:
      return 'medium';
  }
}

/**
 * Check rate limits for security violations
 */
async function checkRateLimit(supabase: any, clientIP: string): Promise<boolean> {
  try {
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Check hourly rate limit
    const { count: hourlyCount } = await supabase
      .from('security_violations')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', hourAgo.toISOString());

    if (hourlyCount >= RATE_LIMITS.violations_per_hour) {
      return true;
    }

    // Check daily rate limit
    const { count: dailyCount } = await supabase
      .from('security_violations')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIP)
      .gte('created_at', dayAgo.toISOString());

    return dailyCount >= RATE_LIMITS.violations_per_day;

  } catch (error) {
    console.error('Rate limit check error:', error);
    return false; // Allow on error
  }
}

/**
 * Trigger security alerts for critical violations
 */
async function triggerSecurityAlert(supabase: any, violation: SecurityViolation, clientIP: string) {
  try {
    // Store alert in database
    await supabase
      .from('security_alerts')
      .insert({
        violation_type: violation.type,
        ip_address: clientIP,
        details: violation.details,
        severity: 'critical',
        status: 'active',
        created_at: new Date()
      });

    // TODO: Send to external monitoring systems (PagerDuty, Slack, etc.)
    console.warn('CRITICAL SECURITY ALERT:', {
      type: violation.type,
      ip: clientIP,
      details: violation.details
    });

  } catch (error) {
    console.error('Failed to trigger security alert:', error);
  }
}

/**
 * Update threat intelligence data
 */
async function updateThreatIntelligence(supabase: any, violation: SecurityViolation, clientIP: string) {
  try {
    // Update IP reputation
    await supabase.rpc('update_ip_reputation', {
      ip_address: clientIP,
      violation_type: violation.type,
      severity: analyzeThreatSeverity(violation)
    });

  } catch (error) {
    console.error('Failed to update threat intelligence:', error);
  }
}

/**
 * Handle threat analysis requests
 */
async function handleThreatAnalysis(supabase: any) {
  try {
    const { data: threats, error } = await supabase
      .from('security_violations')
      .select(`
        type,
        severity,
        ip_address,
        created_at,
        COUNT(*) as count
      `)
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .group('type, severity, ip_address, created_at')
      .order('count', { ascending: false })
      .limit(100);

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        threats: threats || [],
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Threat analysis error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to analyze threats' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Handle security status requests
 */
async function handleSecurityStatus(supabase: any) {
  try {
    const { data: status, error } = await supabase
      .rpc('get_security_status');

    if (error) throw error;

    return new Response(
      JSON.stringify({ 
        status: status || { health: 'unknown' },
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Security status error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to get security status' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}