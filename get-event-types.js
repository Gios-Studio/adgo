import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getEventTypes() {
  try {
    console.log('🔍 Checking allowed event types...');
    
    // Get distinct event types from existing data
    const { data, error } = await supabase
      .from('analytics_events')
      .select('event_type')
      .limit(1000);
      
    if (error) {
      console.error('❌ Error:', error.message);
    } else {
      const eventTypes = [...new Set(data.map(e => e.event_type))];
      console.log('📊 Existing event types:', eventTypes);
      
      // Try each event type to see what works
      for (const eventType of eventTypes) {
        console.log(`\n🔄 Testing ${eventType}...`);
        
        const testEvent = {
          campaign_id: '00000000-0000-0000-0000-000000000010',
          ad_id: '00000000-0000-0000-0000-000000000011',
          event_type: eventType,
          device_id: `test-${Date.now()}`,
          ride_id: `test-${Date.now()}`,
          meta: { test: true },
          occurred_at: new Date().toISOString()
        };
        
        const { data: insertData, error: insertError } = await supabase
          .from('analytics_events')
          .insert(testEvent)
          .select();
          
        if (insertError) {
          console.log(`❌ ${eventType} failed:`, insertError.message);
        } else {
          console.log(`✅ ${eventType} works!`);
          
          // Clean up
          await supabase
            .from('analytics_events')
            .delete()
            .eq('id', insertData[0].id);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }
}

getEventTypes();