import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testEventTypeConstraint() {
  try {
    console.log('🔍 Testing event type constraint...');
    
    // Test inserting with 'test_sync' event type
    const testEvent = {
      campaign_id: '00000000-0000-0000-0000-000000000010',
      ad_id: '00000000-0000-0000-0000-000000000011', 
      event_type: 'test_sync',
      device_id: 'test-device',
      ride_id: '00000000-0000-0000-0000-000000000300',
      meta: { test: true },
      occurred_at: new Date().toISOString(),
      created_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('analytics_events')
      .insert(testEvent)
      .select();
      
    if (error) {
      console.log('⚠️  Constraint error:', error.message);
      
      // Try with a standard event type
      console.log('🔄 Trying with impression event type...');
      
      const impressionEvent = {
        ...testEvent,
        event_type: 'impression'
      };
      
      const { data: data2, error: error2 } = await supabase
        .from('analytics_events')
        .insert(impressionEvent)
        .select();
        
      if (error2) {
        console.log('❌ Still failed with impression:', error2.message);
      } else {
        console.log('✅ Impression event worked:', data2);
        
        // Clean up
        await supabase
          .from('analytics_events')
          .delete()
          .eq('id', data2[0].id);
      }
      
    } else {
      console.log('✅ test_sync event worked:', data);
      
      // Clean up 
      await supabase
        .from('analytics_events') 
        .delete()
        .eq('id', data[0].id);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testEventTypeConstraint();