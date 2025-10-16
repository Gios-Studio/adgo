import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixConstraints() {
  try {
    console.log('🔧 Checking and fixing analytics_events constraints...');
    
    // Check current constraint
    const { data: constraints, error: constraintError } = await supabase
      .from('information_schema.check_constraints')
      .select('*')
      .ilike('constraint_name', '%analytics_events_event_type%');
      
    if (constraintError) {
      console.error('❌ Error checking constraints:', constraintError.message);
    } else {
      console.log('📊 Current constraints:', constraints);
    }
    
    // Let's try to check what event types are currently allowed
    console.log('🔍 Testing current event type validation...');
    
    // Try inserting a test_sync event to see what happens
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        ride_id: 'test-constraint-check',
        driver_id: '550e8400-e29b-41d4-a716-446655440000',
        campaign_id: '550e8400-e29b-41d4-a716-446655440001',
        event_type: 'test_sync',
        event_data: { test: true },
        created_at: new Date().toISOString()
      })
      .select();
      
    if (error) {
      console.log('⚠️  Expected constraint error:', error.message);
      
      // Try to get the current constraint definition
      const { data: pgConstraints } = await supabase
        .from('pg_constraint')
        .select('conname, consrc')
        .ilike('conname', '%event_type%');
        
      console.log('📋 PostgreSQL constraints:', pgConstraints);
    } else {
      console.log('✅ Test event inserted successfully:', data);
      
      // Clean up the test event
      await supabase
        .from('analytics_events')
        .delete()
        .eq('ride_id', 'test-constraint-check');
    }
    
  } catch (error) {
    console.error('❌ Constraint check failed:', error.message);
  }
}

fixConstraints();