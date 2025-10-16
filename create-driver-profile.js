import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProfilesStructure() {
  try {
    console.log('🔍 Checking profiles table structure...');
    
    // Get sample profile to see structure
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (profilesError) {
      console.error('❌ Profiles error:', profilesError.message);
    } else {
      console.log('👤 Sample profile:', profiles);
      if (profiles.length > 0) {
        console.log('📋 Profile columns:', Object.keys(profiles[0]));
      }
    }
    
    // Try to create the missing driver profile
    const missingDriverId = '134d5bac-3a07-4f4d-b6ca-6dc808e52f0c';
    
    console.log('\n🔧 Creating missing driver profile...');
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: missingDriverId,
        role: 'driver',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
      
    if (createError) {
      console.error('❌ Create profile error:', createError.message);
      
      // Try with minimal data
      console.log('🔄 Trying with minimal profile data...');
      const { data: minProfile, error: minError } = await supabase
        .from('profiles')
        .insert({
          id: missingDriverId
        })
        .select();
        
      if (minError) {
        console.error('❌ Minimal profile error:', minError.message);
      } else {
        console.log('✅ Created minimal profile:', minProfile);
      }
    } else {
      console.log('✅ Created profile:', newProfile);
    }
    
  } catch (error) {
    console.error('❌ Structure check failed:', error.message);
  }
}

checkProfilesStructure();