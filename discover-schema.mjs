#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rkonwkggxaohpmxmzmfn.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NzQ5OTQwNCwiZXhwIjoyMDczMDc1NDA0fQ.uBSaejYhSj0HRX20KcfhHQKcDTGe6171bd-X4fFQ-b0';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

console.log('\n🔍 Schema Discovery - Checking Actual Table Structures\n');

const TABLES_TO_CHECK = [
  'profiles', 'campaigns', 'ads', 'campaign_ads', 
  'wallets', 'analytics_events', 'media_assets'
];

for (const tableName of TABLES_TO_CHECK) {
  console.log(`📋 Table: ${tableName}`);
  
  try {
    // Get a sample row to see actual columns
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
      continue;
    }
    
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log(`   ✅ Columns: ${columns.join(', ')}`);
    } else {
      // Table exists but is empty - try to get columns from schema
      console.log(`   📝 Table exists but is empty`);
    }
    
    // Get row count
    const { count, error: countError } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`   📊 Row count: ${count}`);
    }
    
  } catch (err) {
    console.log(`   💥 Exception: ${err.message}`);
  }
  
  console.log('');
}

console.log('🔍 Schema discovery complete.\n');