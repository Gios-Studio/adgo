import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testExactAPICall() {
  try {
    console.log('🔍 Testing exact API call data...');
    
    // This is exactly what the API sends
    const testData = {
      campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
      ad_id: '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c',
      event_type: 'click',
      device_id: 'test_device_001',
      region: 'post-ride',
      ride_id: '10614cf7-4002-455f-af25-918c0b97641e',
      meta: { test: true },
      occurred_at: new Date().toISOString()
    };
    
    console.log('📤 Testing with API data:', testData);
    
    const { data, error } = await supabase
      .from('analytics_events')
      .insert(testData)
      .select()
      .single();
      
    if (error) {
      console.error('❌ API data insert failed:', error);
    } else {
      console.log('✅ API data insert successful:', data);
      
      // Clean up
      await supabase
        .from('analytics_events')
        .delete()
        .eq('id', data.id);
      console.log('🗑️ Cleaned up test record');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testExactAPICall();