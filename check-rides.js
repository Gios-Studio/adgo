import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRides() {
  try {
    console.log('🔍 Checking rides table...');
    
    // Check if rides table exists and get sample data
    const { data: rides, error: ridesError } = await supabase
      .from('rides')
      .select('*')
      .limit(5);
      
    if (ridesError) {
      console.error('❌ Rides table error:', ridesError.message);
      
      // Check what ride_ids exist in analytics_events
      console.log('🔍 Checking existing ride_ids in analytics_events...');
      const { data: events, error: eventsError } = await supabase
        .from('analytics_events')
        .select('ride_id')
        .limit(10);
        
      if (eventsError) {
        console.error('❌ Events error:', eventsError.message);
      } else {
        const uniqueRideIds = [...new Set(events.map(e => e.ride_id))];
        console.log('📊 Existing ride_ids:', uniqueRideIds);
      }
    } else {
      console.log('✅ Rides table exists:', rides);
      if (rides.length > 0) {
        console.log('📋 Sample ride IDs:', rides.map(r => r.id || r.ride_id));
      }
    }
    
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }
}

checkRides();