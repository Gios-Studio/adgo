-- Add shadow column for partner-provided ride identifiers
-- This allows core ride_id to remain UUID while preserving partner references

ALTER TABLE analytics_events ADD COLUMN IF NOT EXISTS ride_ref TEXT;

-- Add index for ride_ref lookups
CREATE INDEX IF NOT EXISTS idx_analytics_events_ride_ref ON analytics_events (ride_ref);

-- Add comment for documentation
COMMENT ON COLUMN analytics_events.ride_ref IS 'Partner-provided ride identifier (shadow column for non-UUID references)';