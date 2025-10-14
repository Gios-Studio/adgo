#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

// Load environment variables  
const SUPABASE_URL = 'https://rkonwkggxaohpmxmzmfn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ5OTQwNCwiZXhwIjoyMDczMDc1NDA0fQ.uBSaejYhSj0HRX20KcfhHQKcDTGe6171bd-X4fFQ-b0';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

console.log('\n🔍 Checking Missing AdGo Backend Tables...\n');

const ADGO_BACKEND_TABLES = [
  // From adgo_be.sql - these might be missing
  { schema: 'adgo', table: 'orgs', description: 'Organization management' },
  { schema: 'adgo', table: 'org_secrets', description: 'HMAC secrets per org' },
  { schema: 'adgo', table: 'event_dedupe', description: 'Idempotency keys' },
  { schema: 'adgo', table: 'events_raw', description: 'Raw events (impressions/clicks)' },
  { schema: 'adgo', table: 'metrics_hourly', description: 'Aggregated hourly metrics' },
  { schema: 'adgo', table: 'metrics_daily', description: 'Aggregated daily metrics' },
  { schema: 'adgo', table: 'campaign_spend_cache', description: 'Spending reconciliation cache' },
  { schema: 'adgo', table: 'creatives', description: 'Creative assets' },
  { schema: 'adgo', table: 'flight_windows', description: 'Campaign scheduling windows' },
  
  // Check if main tables are properly named
  { schema: 'public', table: 'flight_windows', description: 'Campaign flight windows (public schema)' },
];

for (const table of ADGO_BACKEND_TABLES) {
  try {
    const { data, error } = await supabase
      .from(table.table)
      .select('*', { count: 'exact', head: true })
      .limit(1);
    
    if (error) {
      console.log(`❌ MISSING: ${table.schema}.${table.table} - ${table.description}`);
      console.log(`   Error: ${error.message}`);
    } else {
      console.log(`✅ EXISTS: ${table.schema}.${table.table} - ${table.description}`);
    }
  } catch (err) {
    console.log(`❌ ERROR: ${table.schema}.${table.table} - ${err.message}`);
  }
}

// Check for schema namespaces
console.log('\n🗂️ Checking Schema Namespaces...');
try {
  const { data, error } = await supabase.rpc('pg_namespace')
    .select('nspname');
  
  if (!error && data) {
    const schemas = data.map(d => d.nspname);
    console.log(`✅ Schemas found: ${schemas.join(', ')}`);
    
    if (schemas.includes('adgo')) {
      console.log('✅ AdGo schema namespace exists');
    } else {
      console.log('❌ AdGo schema namespace missing - need to run adgo_be.sql');
    }
  }
} catch (err) {
  console.log('📋 Schema check skipped (requires admin access)');
}

// Test critical functions
console.log('\n🧪 Testing Critical Functions...');

const CRITICAL_FUNCTIONS = [
  { name: 'can_serve', description: 'Budget/pacing guards' },
  { name: 'refresh_metrics_hourly', description: 'Hourly metrics refresh' },
  { name: 'refresh_metrics_daily', description: 'Daily metrics refresh' },
  { name: 'cleanup_dedupe', description: 'Deduplication cleanup' },
  { name: 'reconcile_spend_daily', description: 'Daily spend reconciliation' },
  { name: 'is_admin', description: 'Admin role checker' },
];

for (const func of CRITICAL_FUNCTIONS) {
  try {
    // Try to call the function with safe parameters
    const { data, error } = await supabase.rpc(func.name, {});
    
    if (error && !error.message.includes('permission denied')) {
      console.log(`❌ MISSING: ${func.name}() - ${func.description}`);
    } else {
      console.log(`✅ EXISTS: ${func.name}() - ${func.description}`);
    }
  } catch (err) {
    console.log(`📋 Function ${func.name}() exists but needs parameters`);
  }
}

console.log('\n🔧 Missing Tables/Functions Analysis Complete.\n');