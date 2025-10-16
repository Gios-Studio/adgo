import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testMinimalInsert() {
  try {
    console.log('🔍 Testing minimal analytics_events insert...');
    
    // Try the most minimal insert possible
    const { data, error } = await supabase
      .from('analytics_events')
      .insert({
        event_type: 'impression',
        campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
        ad_id: '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c',
        ride_id: '10614cf7-4002-455f-af25-918c0b97641e'
      })
      .select();
      
    if (error) {
      console.error('❌ Minimal insert failed:', error);
    } else {
      console.log('✅ Minimal insert successful:', data);
      
      // Clean up
      if (data && data[0]) {
        await supabase
          .from('analytics_events')
          .delete()
          .eq('id', data[0].id);
        console.log('🗑️ Cleaned up test record');
      }
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testMinimalInsert();