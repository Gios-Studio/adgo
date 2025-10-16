-- AdGo Platform - Schema Updates for SDK Compatibility
-- Copyright (c) 2025 AdGo Solutions Limited.
-- Fixes for UUID alignment and parameter validation

-- Update analytics_events table to handle flexible ride_id formats
-- Add constraints and indexes for better performance

-- 1. Update analytics_events table structure
DO $$ 
BEGIN
    -- Add index for ride_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'analytics_events' 
        AND indexname = 'idx_analytics_events_ride_id'
    ) THEN
        CREATE INDEX idx_analytics_events_ride_id ON analytics_events(ride_id);
    END IF;
    
    -- Add index for campaign_id + event_type combination
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'analytics_events' 
        AND indexname = 'idx_analytics_events_campaign_event'
    ) THEN
        CREATE INDEX idx_analytics_events_campaign_event ON analytics_events(campaign_id, event_type);
    END IF;
    
    -- Add index for created_at for time-based queries
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'analytics_events' 
        AND indexname = 'idx_analytics_events_created_at'
    ) THEN
        CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
    END IF;
END $$;

-- 2. Create or update campaign_ctr materialized view for better performance
DROP MATERIALIZED VIEW IF EXISTS campaign_ctr;

CREATE MATERIALIZED VIEW campaign_ctr AS
SELECT 
    c.id as campaign_id,
    c.name as campaign_name,
    c.partner_id,
    COALESCE(impressions.count, 0) as impressions,
    COALESCE(clicks.count, 0) as clicks,
    CASE 
        WHEN COALESCE(impressions.count, 0) > 0 
        THEN ROUND((COALESCE(clicks.count, 0)::decimal / impressions.count) * 100, 2)
        ELSE 0
    END as ctr,
    COALESCE(conversions.count, 0) as conversions,
    CASE 
        WHEN COALESCE(clicks.count, 0) > 0 
        THEN ROUND((COALESCE(conversions.count, 0)::decimal / clicks.count) * 100, 2)
        ELSE 0
    END as conversion_rate,
    NOW() as last_updated
FROM campaigns c
LEFT JOIN (
    SELECT 
        campaign_id, 
        COUNT(*) as count
    FROM analytics_events 
    WHERE event_type = 'impression'
    GROUP BY campaign_id
) impressions ON c.id = impressions.campaign_id
LEFT JOIN (
    SELECT 
        campaign_id, 
        COUNT(*) as count
    FROM analytics_events 
    WHERE event_type = 'click'
    GROUP BY campaign_id
) clicks ON c.id = clicks.campaign_id
LEFT JOIN (
    SELECT 
        campaign_id, 
        COUNT(*) as count
    FROM analytics_events 
    WHERE event_type = 'conversion'
    GROUP BY campaign_id
) conversions ON c.id = conversions.campaign_id
WHERE c.status = 'active';

-- Create index on the materialized view
CREATE UNIQUE INDEX idx_campaign_ctr_campaign_id ON campaign_ctr(campaign_id);
CREATE INDEX idx_campaign_ctr_partner_id ON campaign_ctr(partner_id);

-- 3. Create function to refresh campaign_ctr automatically
CREATE OR REPLACE FUNCTION refresh_campaign_ctr()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY campaign_ctr;
    -- Log the refresh
    INSERT INTO system_logs (event_type, message, created_at)
    VALUES ('ctr_refresh', 'Campaign CTR materialized view refreshed', NOW())
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 4. Create system_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL,
    message TEXT,
    meta JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_system_logs_event_type ON system_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON system_logs(created_at);

-- 5. Update analytics_events to add better validation
-- Add check constraint for event_type values
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'analytics_events_event_type_check'
    ) THEN
        ALTER TABLE analytics_events 
        ADD CONSTRAINT analytics_events_event_type_check 
        CHECK (event_type IN ('impression', 'click', 'conversion', 'test_sync'));
    END IF;
END $$;

-- 6. Create helper function for UUID generation and validation
CREATE OR REPLACE FUNCTION generate_test_uuid(input_text TEXT)
RETURNS UUID AS $$
BEGIN
    -- If input is already a valid UUID, return it
    BEGIN
        RETURN input_text::UUID;
    EXCEPTION WHEN invalid_text_representation THEN
        -- Generate a deterministic UUID based on input text
        -- This ensures consistent UUIDs for the same test inputs
        RETURN md5(input_text || 'adgo_test_salt')::UUID;
    END;
END;
$$ LANGUAGE plpgsql;

-- 7. Create view for real-time analytics dashboard
CREATE OR REPLACE VIEW analytics_dashboard AS
SELECT 
    DATE_TRUNC('hour', created_at) as hour,
    event_type,
    region,
    COUNT(*) as event_count,
    COUNT(DISTINCT ride_id) as unique_rides,
    COUNT(DISTINCT device_id) as unique_devices
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', created_at), event_type, region
ORDER BY hour DESC, event_type;

-- 8. Add RLS policies for better security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Policy for service role (full access)
CREATE POLICY IF NOT EXISTS "Service role has full access to analytics_events" 
ON analytics_events FOR ALL 
USING (auth.role() = 'service_role');

-- Policy for partners (can only see their own campaign events)
CREATE POLICY IF NOT EXISTS "Partners can see own campaign events" 
ON analytics_events FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM campaigns 
        WHERE campaigns.id = analytics_events.campaign_id 
        AND campaigns.partner_id = auth.uid()
    )
);

-- 9. Create trigger to automatically refresh campaign_ctr
CREATE OR REPLACE FUNCTION trigger_refresh_campaign_ctr()
RETURNS trigger AS $$
BEGIN
    -- Refresh the materialized view after analytics events changes
    PERFORM pg_notify('refresh_ctr', NEW.campaign_id::text);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'analytics_events_refresh_ctr'
    ) THEN
        CREATE TRIGGER analytics_events_refresh_ctr
        AFTER INSERT OR UPDATE OR DELETE ON analytics_events
        FOR EACH ROW EXECUTE FUNCTION trigger_refresh_campaign_ctr();
    END IF;
END $$;

-- 10. Grant necessary permissions
GRANT SELECT ON campaign_ctr TO authenticated;
GRANT SELECT ON analytics_dashboard TO authenticated;
GRANT EXECUTE ON FUNCTION generate_test_uuid(TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION refresh_campaign_ctr() TO service_role;

-- 11. Insert sample data for testing (only if tables are empty)
DO $$
BEGIN
    -- Check if we need sample data
    IF NOT EXISTS (SELECT 1 FROM profiles WHERE role = 'partner' LIMIT 1) THEN
        -- Insert test partner
        INSERT INTO profiles (id, full_name, email, role) VALUES
        ('123e4567-e89b-12d3-a456-426614174099', 'SDK Test Partner', 'sdk-test@adgosolutions.com', 'partner')
        ON CONFLICT (id) DO NOTHING;
        
        -- Insert test campaign
        INSERT INTO campaigns (id, name, partner_id, status, budget_cents) VALUES
        ('123e4567-e89b-12d3-a456-426614174000', 'SDK Test Campaign', '123e4567-e89b-12d3-a456-426614174099', 'active', 100000)
        ON CONFLICT (id) DO NOTHING;
        
        -- Insert test ad
        INSERT INTO ads (id, campaign_id, title, status, media_url) VALUES
        ('123e4567-e89b-12d3-a456-426614174001', '123e4567-e89b-12d3-a456-426614174000', 'Test Ad', 'active', 'https://via.placeholder.com/300x200')
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- 12. Refresh the materialized view
SELECT refresh_campaign_ctr();

-- Success message
SELECT 'SDK schema updates completed successfully' as status;