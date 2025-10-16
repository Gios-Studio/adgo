import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getValidIds() {
  try {
    console.log('🔍 Getting valid campaign and ad IDs...');
    
    // Get existing campaigns
    const { data: campaigns, error: campaignsError } = await supabase
      .from('campaigns')
      .select('id')
      .limit(5);
      
    if (campaignsError) {
      console.error('❌ Campaigns error:', campaignsError.message);
    } else {
      console.log('📊 Available campaigns:', campaigns.map(c => c.id));
    }
    
    // Get existing ads
    const { data: ads, error: adsError } = await supabase
      .from('ads')
      .select('id, campaign_id')
      .limit(5);
      
    if (adsError) {
      console.error('❌ Ads error:', adsError.message);  
    } else {
      console.log('📊 Available ads:', ads.map(a => ({ id: a.id, campaign_id: a.campaign_id })));
    }
    
  } catch (error) {
    console.error('❌ Failed:', error.message);
  }
}

getValidIds();