import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSchema() {
  try {
    console.log('🔍 Checking actual database schema...');
    
    // List all tables
    const { data: tables, error: tableError } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
      
    if (tableError) {
      console.error('❌ Error listing tables:', tableError.message);
    } else {
      console.log('📊 Available tables:', tables.map(t => t.tablename));
    }
    
    // Check analytics_events structure
    console.log('🔍 Checking analytics_events table...');
    
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(1);
      
    if (eventsError) {
      console.error('❌ analytics_events error:', eventsError.message);
    } else {
      console.log('✅ analytics_events sample:', events);
      if (events.length > 0) {
        console.log('📋 Column names:', Object.keys(events[0]));
      }
    }
    
    // Check campaigns table  
    console.log('🔍 Checking campaigns table...');
    
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('*')
      .limit(1);
      
    if (campaignsError) {
      console.error('❌ campaigns error:', campaignsError.message);
    } else {
      console.log('✅ campaigns sample:', campaigns);
      if (campaigns.length > 0) {
        console.log('📋 Column names:', Object.keys(campaigns[0]));
      }
    }
    
    // Check ads table
    console.log('🔍 Checking ads table...');
    
    const { data: ads, error: adsError } = await supabase
      .from('ads')
      .select('*')
      .limit(1);
      
    if (adsError) {
      console.error('❌ ads error:', adsError.message);
    } else {
      console.log('✅ ads sample:', ads);
      if (ads.length > 0) {
        console.log('📋 Column names:', Object.keys(ads[0]));
      }
    }
    
  } catch (error) {
    console.error('❌ Schema check failed:', error.message);
  }
}

checkSchema();