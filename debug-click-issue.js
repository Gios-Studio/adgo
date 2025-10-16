import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function investigateClickIdIssue() {
  try {
    console.log('🔍 Investigating click_id column issue...');
    
    // Check analytics_events table structure
    const { data: events, error: eventsError } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(1);
      
    if (eventsError) {
      console.error('❌ Analytics events error:', eventsError.message);
    } else if (events && events.length > 0) {
      console.log('📊 Analytics events columns:', Object.keys(events[0]));
    }
    
    // Check driver_wallet table structure
    const { data: wallets, error: walletsError } = await supabase
      .from('driver_wallet')
      .select('*')
      .limit(1);
      
    if (walletsError) {
      console.error('💰 Driver wallet error:', walletsError.message);
    } else if (wallets && wallets.length > 0) {
      console.log('💰 Driver wallet columns:', Object.keys(wallets[0]));
    } else {
      console.log('💰 No driver wallet records found');
    }
    
    // Check transactions table 
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .limit(1);
      
    if (txError) {
      console.error('💸 Transactions error:', txError.message);
    } else if (transactions && transactions.length > 0) {
      console.log('💸 Transactions columns:', Object.keys(transactions[0]));
    } else {
      console.log('💸 No transaction records found');
    }
    
    // Try to simulate the exact insert that's failing
    console.log('\n🧪 Testing event insertion...');
    const testData = {
      campaign_id: 'ace29fa0-5765-4ce0-b856-074b3abad5e7',
      ad_id: '88c0a93e-493c-499a-8a0a-eaa2cdba6a2c',
      event_type: 'click',
      device_id: 'test_device_debug',
      region: 'post-ride',
      ride_id: '10614cf7-4002-455f-af25-918c0b97641e',
      meta: {},
      occurred_at: new Date().toISOString()
    };
    
    console.log('📤 Attempting insert with data:', testData);
    
    const { data: insertResult, error: insertError } = await supabase
      .from('analytics_events')
      .insert(testData)
      .select();
      
    if (insertError) {
      console.error('❌ Insert failed:', insertError);
    } else {
      console.log('✅ Insert successful:', insertResult);
      
      // Clean up
      if (insertResult && insertResult[0]) {
        await supabase
          .from('analytics_events')
          .delete()
          .eq('id', insertResult[0].id);
      }
    }
    
  } catch (error) {
    console.error('❌ Investigation failed:', error.message);
  }
}

investigateClickIdIssue();