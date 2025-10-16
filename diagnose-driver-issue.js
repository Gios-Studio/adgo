import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function diagnoseDriverProfileIssue() {
  try {
    console.log('🔍 Diagnosing driver profile constraint issue...');
    
    // Get the specific driver_id from our test ride
    const testRideId = '10614cf7-4002-455f-af25-918c0b97641e';
    
    const { data: rideData, error: rideError } = await supabase
      .from('rides')
      .select('driver_id, *')
      .eq('id', testRideId)
      .single();
      
    if (rideError) {
      console.error('❌ Error getting ride:', rideError.message);
      return;
    }
    
    console.log('📊 Ride data:', rideData);
    console.log('📋 Driver ID:', rideData.driver_id);
    
    // Check if this driver exists in profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', rideData.driver_id);
      
    if (profileError) {
      console.error('❌ Error checking profiles:', profileError.message);
    } else {
      console.log('👤 Profile exists:', profileData.length > 0 ? 'Yes' : 'No');
      if (profileData.length > 0) {
        console.log('👤 Profile data:', profileData[0]);
      }
    }
    
    // Check driver_wallet table structure and constraints
    const { data: walletData, error: walletError } = await supabase
      .from('driver_wallet')
      .select('*')
      .eq('driver_id', rideData.driver_id);
      
    if (walletError) {
      console.error('💰 Wallet error:', walletError.message);
    } else {
      console.log('💰 Wallet exists:', walletData.length > 0 ? 'Yes' : 'No');
      if (walletData.length > 0) {
        console.log('💰 Wallet data:', walletData[0]);
      }
    }
    
    // Check what profiles do exist
    console.log('🔍 Checking existing profiles...');
    const { data: allProfiles, error: allProfilesError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .limit(5);
      
    if (allProfilesError) {
      console.error('❌ Error getting all profiles:', allProfilesError.message);
    } else {
      console.log('👥 Available profiles:', allProfiles);
    }
    
  } catch (error) {
    console.error('❌ Diagnosis failed:', error.message);
  }
}

diagnoseDriverProfileIssue();