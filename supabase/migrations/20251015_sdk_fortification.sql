-- AdGo Platform - Database Schema & Migrations
-- 
-- Copyright (c) 2025 AdGo Solutions Limited.
-- All rights reserved.
-- 
-- This database schema is proprietary and confidential.
-- Unauthorized access, copying, or modification is strictly prohibited.
-- 
-- Build: 20251015_073830

-- AdGo SDK Enterprise Database Schema Enhancement
-- Migration: 20251015_sdk_fortification.sql
-- Purpose: Add enterprise-grade licensing, telemetry, and audit capabilities

-- =============================================
-- 1. ENHANCE LICENSES TABLE
-- =============================================

-- Add enterprise licensing fields to existing licenses table
ALTER TABLE licenses 
ADD COLUMN IF NOT EXISTS plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'enterprise')),
ADD COLUMN IF NOT EXISTS usage_count BIGINT NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS usage_limit BIGINT NOT NULL DEFAULT 1000, -- Daily limit based on plan
ADD COLUMN IF NOT EXISTS region TEXT NOT NULL DEFAULT 'global' CHECK (region IN ('global', 'eu', 'africa', 'asia', 'americas')),
ADD COLUMN IF NOT EXISTS last_used TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'expired', 'revoked')),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_licenses_plan ON licenses(plan);
CREATE INDEX IF NOT EXISTS idx_licenses_region ON licenses(region);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_last_used ON licenses(last_used);
CREATE INDEX IF NOT EXISTS idx_licenses_partner_id ON licenses(partner_id);

-- Update usage limits based on plan
UPDATE licenses SET 
  usage_limit = CASE 
    WHEN plan = 'starter' THEN 1000
    WHEN plan = 'pro' THEN 10000
    WHEN plan = 'enterprise' THEN 999999999
    ELSE 1000
  END
WHERE usage_limit = 1000; -- Only update if still default

-- =============================================
-- 2. SDK BUILDS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS sdk_builds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sdk_name TEXT NOT NULL, -- 'js', 'dart', 'python', 'go'
  version TEXT NOT NULL,
  build_hash TEXT NOT NULL, -- SHA256 of build
  build_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  build_size BIGINT, -- Build size in bytes
  minified BOOLEAN DEFAULT FALSE,
  obfuscated BOOLEAN DEFAULT FALSE,
  source_map_url TEXT,
  download_url TEXT,
  integrity_check TEXT, -- For subresource integrity
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(sdk_name, version)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_sdk_builds_name_version ON sdk_builds(sdk_name, version);
CREATE INDEX IF NOT EXISTS idx_sdk_builds_date ON sdk_builds(build_date DESC);

-- Insert current SDK builds (placeholders for existing versions)
INSERT INTO sdk_builds (sdk_name, version, build_hash, build_size, minified) VALUES
('js', '1.0.0', '4f7b8c9e2d1a3b5f6e8c9a1d2f4b7e9c', 15432, true),
('dart', '1.0.0', '9e8d7c6b5a4f3e2d1c9b8a7f6e5d4c3b', 23187, true),
('python', '1.0.0', '2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d', 8945, false),
('go', '1.0.0', '8f9e0d1c2b3a4f5e6d7c8b9a0f1e2d3c', 12678, false)
ON CONFLICT (sdk_name, version) DO NOTHING;

-- =============================================
-- 3. TELEMETRY EVENTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS telemetry_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
  partner_id UUID REFERENCES auth.users(id),
  event_type TEXT NOT NULL CHECK (event_type IN ('init', 'verify_key', 'api_call', 'error', 'heartbeat', 'feature_used')),
  event_data JSONB DEFAULT '{}',
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  region TEXT NOT NULL DEFAULT 'global',
  sdk_version TEXT,
  sdk_name TEXT,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  error_code TEXT,
  response_time_ms INTEGER,
  
  -- Partitioning ready
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for telemetry queries
CREATE INDEX IF NOT EXISTS idx_telemetry_license_timestamp ON telemetry_events(license_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_event_type ON telemetry_events(event_type);
CREATE INDEX IF NOT EXISTS idx_telemetry_region ON telemetry_events(region);
CREATE INDEX IF NOT EXISTS idx_telemetry_partner_timestamp ON telemetry_events(partner_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_created_at ON telemetry_events(created_at);

-- =============================================
-- 4. IMMUTABLE AUDIT LOG TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id),
  partner_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL, -- 'create', 'revoke', 'rotate', 'suspend', 'activate', 'update'
  resource_type TEXT NOT NULL, -- 'license', 'sdk', 'partner'
  resource_id TEXT NOT NULL,
  old_values JSONB,
  new_values JSONB,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  performed_by UUID REFERENCES auth.users(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Immutable constraint - no updates or deletes allowed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for audit queries
CREATE INDEX IF NOT EXISTS idx_audit_license_timestamp ON audit_log(license_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_log(action);
CREATE INDEX IF NOT EXISTS idx_audit_resource ON audit_log(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_audit_performed_by ON audit_log(performed_by, timestamp DESC);

-- =============================================
-- 5. LICENSE USAGE SUMMARY VIEW
-- =============================================

CREATE OR REPLACE VIEW license_usage_summary AS
SELECT 
  l.id,
  l.license_key,
  l.partner_id,
  l.plan,
  l.usage_count,
  l.usage_limit,
  l.region,
  l.status,
  l.last_used,
  l.expires_at,
  
  -- Usage statistics
  ROUND((l.usage_count::DECIMAL / l.usage_limit) * 100, 2) AS usage_percentage,
  l.usage_limit - l.usage_count AS remaining_calls,
  
  -- Telemetry aggregations (last 30 days)
  COUNT(te.id) FILTER (WHERE te.timestamp >= NOW() - INTERVAL '30 days') AS events_30d,
  COUNT(te.id) FILTER (WHERE te.event_type = 'error' AND te.timestamp >= NOW() - INTERVAL '30 days') AS errors_30d,
  
  -- Last activity
  MAX(te.timestamp) AS last_telemetry_event,
  
  -- Health indicators
  CASE 
    WHEN l.usage_count >= l.usage_limit THEN 'exceeded'
    WHEN l.usage_count >= l.usage_limit * 0.9 THEN 'warning'
    WHEN l.last_used < NOW() - INTERVAL '7 days' THEN 'inactive'
    ELSE 'healthy'
  END AS health_status
  
FROM licenses l
LEFT JOIN telemetry_events te ON te.license_id = l.id
GROUP BY l.id, l.license_key, l.partner_id, l.plan, l.usage_count, l.usage_limit, 
         l.region, l.status, l.last_used, l.expires_at;

-- =============================================
-- 6. RLS POLICIES FOR NEW TABLES
-- =============================================

-- SDK Builds - Public read access for integrity checks
ALTER TABLE sdk_builds ENABLE ROW LEVEL SECURITY;
CREATE POLICY "SDK builds are publicly readable" ON sdk_builds FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Only admin can manage SDK builds" ON sdk_builds FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Telemetry Events - Partners can only see their own data
ALTER TABLE telemetry_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Partners can view their telemetry" ON telemetry_events FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);
CREATE POLICY "System can insert telemetry" ON telemetry_events FOR INSERT TO authenticated USING (true);

-- Audit Log - Read-only for partners, full access for admins
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Partners can view their audit logs" ON audit_log FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);
CREATE POLICY "System can insert audit logs" ON audit_log FOR INSERT TO authenticated USING (true);
-- NO UPDATE OR DELETE POLICIES - Audit log is immutable

-- =============================================
-- 7. UTILITY FUNCTIONS
-- =============================================

-- Function to increment usage count atomically
CREATE OR REPLACE FUNCTION increment_license_usage(license_key_param TEXT)
RETURNS TABLE(allowed BOOLEAN, remaining BIGINT, usage_count BIGINT, usage_limit BIGINT) AS $$
DECLARE
  license_record licenses%ROWTYPE;
BEGIN
  -- Lock and get license record
  SELECT * INTO license_record 
  FROM licenses 
  WHERE license_key = license_key_param 
  FOR UPDATE;
  
  IF NOT FOUND THEN
    -- License not found
    RETURN QUERY SELECT false, 0::BIGINT, 0::BIGINT, 0::BIGINT;
    RETURN;
  END IF;
  
  -- Check if license is active and not expired
  IF license_record.status != 'active' OR 
     (license_record.expires_at IS NOT NULL AND license_record.expires_at < NOW()) THEN
    RETURN QUERY SELECT false, 0::BIGINT, license_record.usage_count, license_record.usage_limit;
    RETURN;
  END IF;
  
  -- Check usage limit
  IF license_record.usage_count >= license_record.usage_limit THEN
    RETURN QUERY SELECT false, 0::BIGINT, license_record.usage_count, license_record.usage_limit;
    RETURN;
  END IF;
  
  -- Increment usage and update last_used
  UPDATE licenses 
  SET usage_count = usage_count + 1,
      last_used = NOW(),
      updated_at = NOW()
  WHERE id = license_record.id;
  
  -- Return success with updated counts
  RETURN QUERY SELECT 
    true, 
    (license_record.usage_limit - license_record.usage_count - 1)::BIGINT,
    (license_record.usage_count + 1)::BIGINT,
    license_record.usage_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset daily usage counts (for cron job)
CREATE OR REPLACE FUNCTION reset_daily_usage_counts()
RETURNS INTEGER AS $$
DECLARE
  reset_count INTEGER;
BEGIN
  UPDATE licenses 
  SET usage_count = 0,
      updated_at = NOW()
  WHERE usage_count > 0;
  
  GET DIAGNOSTICS reset_count = ROW_COUNT;
  
  -- Log the reset action
  INSERT INTO audit_log (action, resource_type, resource_id, metadata, performed_by)
  VALUES ('reset_usage', 'system', 'daily_reset', 
          jsonb_build_object('reset_count', reset_count, 'reset_time', NOW()),
          NULL);
  
  RETURN reset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate license analytics
CREATE OR REPLACE FUNCTION get_license_analytics(days_back INTEGER DEFAULT 30)
RETURNS TABLE(
  total_licenses BIGINT,
  active_licenses BIGINT,
  total_usage BIGINT,
  avg_usage_per_license NUMERIC,
  top_region TEXT,
  error_rate NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH stats AS (
    SELECT 
      COUNT(*) AS total_licenses,
      COUNT(*) FILTER (WHERE status = 'active') AS active_licenses,
      SUM(usage_count) AS total_usage,
      AVG(usage_count) AS avg_usage_per_license
    FROM licenses
  ),
  region_stats AS (
    SELECT region, COUNT(*) as count
    FROM licenses 
    WHERE status = 'active'
    GROUP BY region
    ORDER BY count DESC
    LIMIT 1
  ),
  error_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE event_type = 'error') AS error_count,
      COUNT(*) AS total_events
    FROM telemetry_events
    WHERE timestamp >= NOW() - INTERVAL '1 day' * days_back
  )
  SELECT 
    s.total_licenses,
    s.active_licenses,
    s.total_usage,
    s.avg_usage_per_license,
    COALESCE(r.region, 'unknown') AS top_region,
    CASE 
      WHEN e.total_events > 0 THEN (e.error_count::NUMERIC / e.total_events * 100)
      ELSE 0
    END AS error_rate
  FROM stats s
  CROSS JOIN region_stats r
  CROSS JOIN error_stats e;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 8. TRIGGERS FOR AUDIT LOGGING
-- =============================================

-- Trigger function to log license changes
CREATE OR REPLACE FUNCTION log_license_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO audit_log (license_id, action, resource_type, resource_id, new_values, performed_by)
    VALUES (NEW.id, 'create', 'license', NEW.license_key, to_jsonb(NEW), NEW.created_by);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_log (license_id, action, resource_type, resource_id, old_values, new_values, performed_by)
    VALUES (NEW.id, 'update', 'license', NEW.license_key, to_jsonb(OLD), to_jsonb(NEW), NEW.created_by);
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO audit_log (license_id, action, resource_type, resource_id, old_values, performed_by)
    VALUES (OLD.id, 'delete', 'license', OLD.license_key, to_jsonb(OLD), NULL);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS licenses_audit_trigger ON licenses;
CREATE TRIGGER licenses_audit_trigger
  AFTER INSERT OR UPDATE OR DELETE ON licenses
  FOR EACH ROW EXECUTE FUNCTION log_license_changes();

-- =============================================
-- 9. SAMPLE DATA FOR TESTING
-- =============================================

-- Insert sample enterprise licenses for testing
INSERT INTO licenses (license_key, partner_id, plan, usage_limit, region, status, expires_at, metadata)
SELECT 
  'ent_' || substr(gen_random_uuid()::text, 1, 16),
  (SELECT id FROM auth.users LIMIT 1),
  'enterprise',
  999999999,
  'global',
  'active',
  NOW() + INTERVAL '1 year',
  jsonb_build_object('features', array['unlimited_calls', 'priority_support', 'custom_regions'])
WHERE NOT EXISTS (SELECT 1 FROM licenses WHERE plan = 'enterprise')
LIMIT 1;

-- Insert sample pro licenses
INSERT INTO licenses (license_key, partner_id, plan, usage_limit, region, status, expires_at)
SELECT 
  'pro_' || substr(gen_random_uuid()::text, 1, 16),
  (SELECT id FROM auth.users LIMIT 1),
  'pro',
  10000,
  'africa',
  'active',
  NOW() + INTERVAL '1 year'
WHERE NOT EXISTS (SELECT 1 FROM licenses WHERE plan = 'pro')
LIMIT 3;

-- =============================================
-- 10. PERFORMANCE OPTIMIZATIONS
-- =============================================

-- Create partial indexes for common queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_licenses_active_usage 
ON licenses(usage_count, last_used) 
WHERE status = 'active';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_telemetry_recent 
ON telemetry_events(timestamp DESC, event_type) 
WHERE timestamp >= NOW() - INTERVAL '30 days';

-- Analyze tables for query planning
ANALYZE licenses;
ANALYZE telemetry_events;
ANALYZE audit_log;
ANALYZE sdk_builds;

-- =============================================
-- MIGRATION COMPLETE
-- =============================================

-- =============================================
-- 11. SECURITY MONITORING TABLES
-- =============================================

-- Create security violations table
CREATE TABLE IF NOT EXISTS security_violations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL,
    details TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_agent TEXT,
    url TEXT,
    build_hash TEXT,
    ip_address INET,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for security violations
CREATE INDEX IF NOT EXISTS idx_security_violations_type ON security_violations(type);
CREATE INDEX IF NOT EXISTS idx_security_violations_severity ON security_violations(severity);
CREATE INDEX IF NOT EXISTS idx_security_violations_ip ON security_violations(ip_address);
CREATE INDEX IF NOT EXISTS idx_security_violations_timestamp ON security_violations(timestamp DESC);

-- Enable RLS on security_violations
ALTER TABLE security_violations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin can view all security violations" ON security_violations FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);
CREATE POLICY "System can insert security violations" ON security_violations FOR INSERT TO authenticated USING (true);

-- Create security alerts table
CREATE TABLE IF NOT EXISTS security_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    violation_type TEXT NOT NULL,
    ip_address INET,
    details TEXT,
    severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'false_positive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for security alerts
CREATE INDEX IF NOT EXISTS idx_security_alerts_status ON security_alerts(status);
CREATE INDEX IF NOT EXISTS idx_security_alerts_severity ON security_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_security_alerts_created ON security_alerts(created_at DESC);

-- Enable RLS on security_alerts
ALTER TABLE security_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin can manage security alerts" ON security_alerts FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- Create IP reputation table
CREATE TABLE IF NOT EXISTS ip_reputation (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_address INET UNIQUE NOT NULL,
    reputation_score INTEGER DEFAULT 100 CHECK (reputation_score >= 0 AND reputation_score <= 100),
    violation_count INTEGER DEFAULT 0,
    last_violation TIMESTAMP WITH TIME ZONE,
    is_blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for IP reputation
CREATE INDEX IF NOT EXISTS idx_ip_reputation_address ON ip_reputation(ip_address);
CREATE INDEX IF NOT EXISTS idx_ip_reputation_score ON ip_reputation(reputation_score);
CREATE INDEX IF NOT EXISTS idx_ip_reputation_blocked ON ip_reputation(is_blocked);

-- Enable RLS on ip_reputation
ALTER TABLE ip_reputation ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin can manage IP reputation" ON ip_reputation FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

-- =============================================
-- 12. SECURITY UTILITY FUNCTIONS
-- =============================================

-- Function to update IP reputation based on violations
CREATE OR REPLACE FUNCTION update_ip_reputation(
  ip_address_param INET,
  violation_type_param TEXT,
  severity_param TEXT
) RETURNS VOID AS $$
DECLARE
  score_penalty INTEGER;
  current_score INTEGER;
BEGIN
  -- Determine score penalty based on severity
  score_penalty := CASE severity_param
    WHEN 'critical' THEN 50
    WHEN 'high' THEN 30
    WHEN 'medium' THEN 15
    WHEN 'low' THEN 5
    ELSE 10
  END;
  
  -- Insert or update IP reputation
  INSERT INTO ip_reputation (ip_address, reputation_score, violation_count, last_violation)
  VALUES (ip_address_param, 100 - score_penalty, 1, NOW())
  ON CONFLICT (ip_address) DO UPDATE SET
    reputation_score = GREATEST(0, ip_reputation.reputation_score - score_penalty),
    violation_count = ip_reputation.violation_count + 1,
    last_violation = NOW(),
    is_blocked = (GREATEST(0, ip_reputation.reputation_score - score_penalty) <= 20),
    updated_at = NOW();
    
  -- Log reputation update
  INSERT INTO audit_log (action, resource_type, resource_id, metadata)
  VALUES ('update_reputation', 'ip_reputation', ip_address_param::text, 
          jsonb_build_object(
            'violation_type', violation_type_param,
            'severity', severity_param,
            'score_penalty', score_penalty
          ));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get security status
CREATE OR REPLACE FUNCTION get_security_status()
RETURNS TABLE(
  health TEXT,
  active_alerts BIGINT,
  blocked_ips BIGINT,
  violations_24h BIGINT,
  critical_violations_24h BIGINT
) AS $$
BEGIN
  RETURN QUERY
  WITH alert_stats AS (
    SELECT COUNT(*) AS active_count
    FROM security_alerts 
    WHERE status = 'active'
  ),
  ip_stats AS (
    SELECT COUNT(*) AS blocked_count
    FROM ip_reputation 
    WHERE is_blocked = true
  ),
  violation_stats AS (
    SELECT 
      COUNT(*) AS total_24h,
      COUNT(*) FILTER (WHERE severity = 'critical') AS critical_24h
    FROM security_violations 
    WHERE created_at >= NOW() - INTERVAL '24 hours'
  )
  SELECT 
    CASE 
      WHEN v.critical_24h > 10 THEN 'critical'
      WHEN v.total_24h > 100 THEN 'warning'
      WHEN a.active_count > 5 THEN 'degraded'
      ELSE 'healthy'
    END AS health,
    a.active_count AS active_alerts,
    i.blocked_count AS blocked_ips,
    v.total_24h AS violations_24h,
    v.critical_24h AS critical_violations_24h
  FROM alert_stats a
  CROSS JOIN ip_stats i
  CROSS JOIN violation_stats v;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- 13. BILLING & PARTNER MANAGEMENT TABLES
-- =============================================

-- Create partner billing configuration table
CREATE TABLE IF NOT EXISTS partner_billing (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES auth.users(id) UNIQUE NOT NULL,
    plan TEXT NOT NULL CHECK (plan IN ('starter', 'pro', 'enterprise')),
    billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'quarterly', 'annual')),
    currency TEXT DEFAULT 'USD',
    balance DECIMAL(12,4) DEFAULT 0.0,
    billing_threshold DECIMAL(12,4) DEFAULT 100.0,
    next_billing_date TIMESTAMP WITH TIME ZONE,
    payment_method_id TEXT,
    payment_method_type TEXT CHECK (payment_method_type IN ('card', 'bank', 'crypto')),
    payment_method_details JSONB DEFAULT '{}',
    auto_billing BOOLEAN DEFAULT true,
    billing_email TEXT,
    tax_rate DECIMAL(5,4) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for partner billing
CREATE INDEX IF NOT EXISTS idx_partner_billing_partner ON partner_billing(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_billing_next_date ON partner_billing(next_billing_date);
CREATE INDEX IF NOT EXISTS idx_partner_billing_plan ON partner_billing(plan);

-- Create billing events table
CREATE TABLE IF NOT EXISTS billing_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES auth.users(id) NOT NULL,
    license_id UUID REFERENCES licenses(id),
    event_type TEXT NOT NULL CHECK (event_type IN ('usage', 'subscription', 'payment', 'refund', 'upgrade', 'downgrade')),
    amount DECIMAL(12,4) NOT NULL,
    currency TEXT NOT NULL,
    original_amount DECIMAL(12,4),
    pricing_tier TEXT,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for billing events
CREATE INDEX IF NOT EXISTS idx_billing_events_partner ON billing_events(partner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_events_type ON billing_events(event_type);
CREATE INDEX IF NOT EXISTS idx_billing_events_processed ON billing_events(processed);
CREATE INDEX IF NOT EXISTS idx_billing_events_license ON billing_events(license_id);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES auth.users(id) NOT NULL,
    invoice_number TEXT UNIQUE,
    period_start TIMESTAMP WITH TIME ZONE NOT NULL,
    period_end TIMESTAMP WITH TIME ZONE NOT NULL,
    items JSONB NOT NULL DEFAULT '[]',
    subtotal DECIMAL(12,4) NOT NULL,
    tax DECIMAL(12,4) DEFAULT 0.0,
    total DECIMAL(12,4) NOT NULL,
    currency TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'paid', 'overdue', 'cancelled')),
    due_date TIMESTAMP WITH TIME ZONE,
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_intent_id TEXT,
    stripe_invoice_id TEXT,
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for invoices
CREATE INDEX IF NOT EXISTS idx_invoices_partner ON invoices(partner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_number ON invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);

-- Create payment events table
CREATE TABLE IF NOT EXISTS payment_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES auth.users(id) NOT NULL,
    invoice_id UUID REFERENCES invoices(id),
    event_type TEXT NOT NULL CHECK (event_type IN ('payment_success', 'payment_failure', 'refund', 'chargeback')),
    amount DECIMAL(12,4) NOT NULL,
    currency TEXT NOT NULL,
    payment_intent_id TEXT,
    payment_method_type TEXT,
    failure_reason TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for payment events
CREATE INDEX IF NOT EXISTS idx_payment_events_partner ON payment_events(partner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_events_invoice ON payment_events(invoice_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_type ON payment_events(event_type);
CREATE INDEX IF NOT EXISTS idx_payment_events_intent ON payment_events(payment_intent_id);

-- Create billing alerts table
CREATE TABLE IF NOT EXISTS billing_alerts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    partner_id UUID REFERENCES auth.users(id) NOT NULL,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('threshold_reached', 'payment_failed', 'invoice_overdue', 'balance_low')),
    message TEXT,
    metadata JSONB DEFAULT '{}',
    resolved BOOLEAN DEFAULT false,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for billing alerts
CREATE INDEX IF NOT EXISTS idx_billing_alerts_partner ON billing_alerts(partner_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_billing_alerts_type ON billing_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_billing_alerts_resolved ON billing_alerts(resolved);

-- Enable RLS on billing tables
ALTER TABLE partner_billing ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for billing tables
CREATE POLICY "Partners can view their billing info" ON partner_billing FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Partners can update their billing info" ON partner_billing FOR UPDATE TO authenticated USING (
  partner_id = auth.uid()
);

CREATE POLICY "System can manage partner billing" ON partner_billing FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Partners can view their billing events" ON billing_events FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "System can insert billing events" ON billing_events FOR INSERT TO authenticated USING (true);

CREATE POLICY "Partners can view their invoices" ON invoices FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "System can manage invoices" ON invoices FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "Partners can view their payment events" ON payment_events FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "System can insert payment events" ON payment_events FOR INSERT TO authenticated USING (true);

CREATE POLICY "Partners can view their billing alerts" ON billing_alerts FOR SELECT TO authenticated USING (
  partner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin')
);

CREATE POLICY "System can manage billing alerts" ON billing_alerts FOR ALL TO authenticated USING (true);

-- =============================================
-- 14. BILLING UTILITY FUNCTIONS
-- =============================================

-- Function to update partner balance atomically
CREATE OR REPLACE FUNCTION update_partner_balance(
  partner_id_param UUID,
  amount_param DECIMAL,
  currency_param TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO partner_billing (partner_id, currency, balance)
  VALUES (partner_id_param, currency_param, amount_param)
  ON CONFLICT (partner_id) DO UPDATE SET
    balance = partner_billing.balance + amount_param,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to credit partner balance
CREATE OR REPLACE FUNCTION credit_partner_balance(
  partner_id_param UUID,
  amount_param DECIMAL,
  currency_param TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE partner_billing 
  SET balance = balance + amount_param,
      updated_at = NOW()
  WHERE partner_id = partner_id_param;
  
  -- Create payment event
  INSERT INTO payment_events (partner_id, event_type, amount, currency)
  VALUES (partner_id_param, 'payment_success', amount_param, currency_param);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number() RETURNS TEXT AS $$
DECLARE
  year_month TEXT;
  sequence_num INTEGER;
BEGIN
  year_month := TO_CHAR(NOW(), 'YYYYMM');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 8) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM invoices 
  WHERE invoice_number LIKE 'INV-' || year_month || '%';
  
  RETURN 'INV-' || year_month || '-' || LPAD(sequence_num::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-generate invoice numbers
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER invoices_set_number_trigger
  BEFORE INSERT ON invoices
  FOR EACH ROW EXECUTE FUNCTION set_invoice_number();

-- Function to calculate billing metrics
CREATE OR REPLACE FUNCTION get_billing_metrics(partner_id_param UUID DEFAULT NULL, days_back INTEGER DEFAULT 30)
RETURNS TABLE(
  total_revenue DECIMAL,
  active_partners BIGINT,
  avg_revenue_per_partner DECIMAL,
  payment_success_rate DECIMAL,
  outstanding_invoices BIGINT,
  overdue_amount DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  WITH revenue_stats AS (
    SELECT 
      SUM(amount) FILTER (WHERE event_type = 'payment') AS total_rev,
      COUNT(DISTINCT partner_id) AS active_count,
      AVG(amount) FILTER (WHERE event_type = 'payment') AS avg_rev
    FROM billing_events
    WHERE (partner_id_param IS NULL OR partner_id = partner_id_param)
      AND created_at >= NOW() - INTERVAL '1 day' * days_back
  ),
  payment_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE event_type = 'payment_success') AS success_count,
      COUNT(*) FILTER (WHERE event_type IN ('payment_success', 'payment_failure')) AS total_count
    FROM payment_events
    WHERE (partner_id_param IS NULL OR partner_id = partner_id_param)
      AND created_at >= NOW() - INTERVAL '1 day' * days_back
  ),
  invoice_stats AS (
    SELECT 
      COUNT(*) FILTER (WHERE status IN ('pending', 'overdue')) AS outstanding,
      SUM(total) FILTER (WHERE status = 'overdue') AS overdue_amt
    FROM invoices
    WHERE (partner_id_param IS NULL OR partner_id = partner_id_param)
  )
  SELECT 
    COALESCE(r.total_rev, 0) AS total_revenue,
    COALESCE(r.active_count, 0) AS active_partners,
    COALESCE(r.avg_rev, 0) AS avg_revenue_per_partner,
    CASE 
      WHEN p.total_count > 0 THEN (p.success_count::DECIMAL / p.total_count * 100)
      ELSE 0
    END AS payment_success_rate,
    COALESCE(i.outstanding, 0) AS outstanding_invoices,
    COALESCE(i.overdue_amt, 0) AS overdue_amount
  FROM revenue_stats r
  CROSS JOIN payment_stats p
  CROSS JOIN invoice_stats i;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Log successful migration
INSERT INTO audit_log (action, resource_type, resource_id, metadata)
VALUES ('migrate', 'database', 'sdk_fortification', 
        jsonb_build_object(
          'migration_date', NOW(),
          'version', '20251015_sdk_fortification',
          'tables_created', array['sdk_builds', 'telemetry_events', 'audit_log', 'security_violations', 'security_alerts', 'ip_reputation', 'partner_billing', 'billing_events', 'invoices', 'payment_events', 'billing_alerts'],
          'views_created', array['license_usage_summary'],
          'functions_created', array['increment_license_usage', 'reset_daily_usage_counts', 'get_license_analytics', 'update_ip_reputation', 'get_security_status', 'update_partner_balance', 'credit_partner_balance', 'generate_invoice_number', 'get_billing_metrics']
        ));

COMMIT;