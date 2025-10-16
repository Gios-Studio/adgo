import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugDriverWallet() {
  try {
    console.log('🔍 Testing driver wallet operations...');
    
    const driverId = '00000000-0000-0000-0000-000000000002';
    
    // Check if driver wallet exists
    const { data: wallet, error: walletError } = await supabase
      .from('driver_wallet')
      .select('*')
      .eq('driver_id', driverId);
      
    if (walletError) {
      console.error('❌ Wallet query error:', walletError);
    } else {
      console.log('💰 Driver wallet:', wallet);
    }
    
    // Try to update/insert driver wallet
    if (!wallet || wallet.length === 0) {
      console.log('💳 Creating driver wallet...');
      const { data: newWallet, error: createError } = await supabase
        .from('driver_wallet')
        .insert({
          driver_id: driverId,
          balance_cents: 10,
          ad_earnings: 10
        })
        .select();
        
      if (createError) {
        console.error('❌ Create wallet error:', createError);
      } else {
        console.log('✅ Created wallet:', newWallet);
      }
    } else {
      console.log('💸 Updating existing wallet...');
      const { data: updatedWallet, error: updateError } = await supabase
        .from('driver_wallet')
        .update({
          balance_cents: (wallet[0].balance_cents || 0) + 10,
          ad_earnings: (wallet[0].ad_earnings || 0) + 10
        })
        .eq('driver_id', driverId)
        .select();
        
      if (updateError) {
        console.error('❌ Update wallet error:', updateError);
      } else {
        console.log('✅ Updated wallet:', updatedWallet);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error.message);
  }
}

debugDriverWallet();