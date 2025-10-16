import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createMissingDriver() {
  try {
    const missingDriverId = '134d5bac-3a07-4f4d-b6ca-6dc808e52f0c';
    
    console.log('🔍 Checking if we can use a different driver...');
    
    // Get existing profiles to see what driver IDs are available
    const { data: existingProfiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('role', 'driver');
      
    if (profilesError) {
      console.error('❌ Error getting driver profiles:', profilesError.message);
    } else {
      console.log('👥 Existing driver profiles:', existingProfiles);
    }
    
    // If we have existing drivers, let's use one of them instead
    if (existingProfiles && existingProfiles.length > 0) {
      const validDriverId = existingProfiles[0].id;
      console.log(`✅ Using existing driver: ${validDriverId}`);
      
      // Update our test ride to use the valid driver
      const { data: updateResult, error: updateError } = await supabase
        .from('rides')
        .update({ driver_id: validDriverId })
        .eq('id', '10614cf7-4002-455f-af25-918c0b97641e')
        .select();
        
      if (updateError) {
        console.error('❌ Error updating ride:', updateError.message);
      } else {
        console.log('✅ Updated ride with valid driver:', updateResult);
      }
    } else {
      // Try a different approach - create in auth.users first, then profile
      console.log('🔧 No existing drivers found. Checking auth table...');
      
      // Let's see what the foreign key constraint references
      const { data: authUsers, error: authError } = await supabase
        .from('auth.users')
        .select('id')
        .limit(5);
        
      if (authError) {
        console.log('❌ Cannot access auth.users:', authError.message);
        
        // Alternative: just use an existing profile ID and update its role
        const { data: anyProfile, error: anyError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1)
          .single();
          
        if (anyError) {
          console.error('❌ Cannot get any profile:', anyError.message);
        } else {
          console.log(`🔄 Using existing profile as driver: ${anyProfile.id}`);
          
          // Update this profile to be a driver
          const { data: roleUpdate, error: roleError } = await supabase
            .from('profiles')
            .update({ role: 'driver' })
            .eq('id', anyProfile.id)
            .select();
            
          if (roleError) {
            console.error('❌ Role update error:', roleError.message);
          } else {
            console.log('✅ Updated profile role to driver:', roleUpdate);
            
            // Update ride to use this driver
            const { data: rideUpdate, error: rideError } = await supabase
              .from('rides')
              .update({ driver_id: anyProfile.id })
              .eq('id', '10614cf7-4002-455f-af25-918c0b97641e')
              .select();
              
            if (rideError) {
              console.error('❌ Ride update error:', rideError.message);
            } else {
              console.log('✅ Updated ride with valid driver ID:', rideUpdate);
            }
          }
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to create driver:', error.message);
  }
}

createMissingDriver();