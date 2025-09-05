-- Create storage buckets for ad assets and user avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('ad-assets', 'ad-assets', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('user-avatars', 'user-avatars', true);

-- Create storage policies for ad-assets bucket
CREATE POLICY "Users can view ad assets" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'ad-assets');

CREATE POLICY "Users can upload ad assets to their organization folder" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'ad-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own ad assets" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'ad-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own ad assets" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'ad-assets' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create storage policies for user-avatars bucket
CREATE POLICY "Avatar images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'user-avatars');

CREATE POLICY "Users can upload their own avatar" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'user-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'user-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'user-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  organization_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  budget_total NUMERIC(12,2),
  budget_daily NUMERIC(12,2),
  target_audience JSONB,
  status TEXT NOT NULL DEFAULT 'draft',
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS for campaigns
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Create campaigns policies
CREATE POLICY "Users can view campaigns in their organization" 
ON public.campaigns 
FOR SELECT 
USING (organization_id IN (
  SELECT user_roles.organization_id
  FROM user_roles
  WHERE user_roles.user_id = auth.uid() AND user_roles.is_active = true
));

CREATE POLICY "Users can create campaigns for their organization" 
ON public.campaigns 
FOR INSERT 
WITH CHECK (
  organization_id IN (
    SELECT user_roles.organization_id
    FROM user_roles
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('org_admin', 'client') 
    AND user_roles.is_active = true
  ) AND created_by = auth.uid()
);

CREATE POLICY "Users can update campaigns they created or org admins can update" 
ON public.campaigns 
FOR UPDATE 
USING (
  created_by = auth.uid() OR 
  organization_id IN (
    SELECT user_roles.organization_id
    FROM user_roles
    WHERE user_roles.user_id = auth.uid() 
    AND user_roles.role IN ('org_admin', 'super_admin') 
    AND user_roles.is_active = true
  )
);

-- Add campaign_id to ads table
ALTER TABLE public.ads ADD COLUMN campaign_id UUID REFERENCES public.campaigns(id);

-- Create ad_analytics table
CREATE TABLE public.ad_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_id UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,
  cost NUMERIC(12,4) NOT NULL DEFAULT 0,
  revenue NUMERIC(12,4) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ad_id, date)
);

-- Enable RLS for ad_analytics
ALTER TABLE public.ad_analytics ENABLE ROW LEVEL SECURITY;

-- Create ad_analytics policies
CREATE POLICY "Users can view analytics for their organization" 
ON public.ad_analytics 
FOR SELECT 
USING (organization_id IN (
  SELECT user_roles.organization_id
  FROM user_roles
  WHERE user_roles.user_id = auth.uid() AND user_roles.is_active = true
));

CREATE POLICY "System can insert analytics data" 
ON public.ad_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "System can update analytics data" 
ON public.ad_analytics 
FOR UPDATE 
USING (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_campaigns_updated_at
BEFORE UPDATE ON public.campaigns
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ad_analytics_updated_at
BEFORE UPDATE ON public.ad_analytics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_campaigns_organization_id ON public.campaigns(organization_id);
CREATE INDEX idx_campaigns_created_by ON public.campaigns(created_by);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_ad_analytics_ad_id ON public.ad_analytics(ad_id);
CREATE INDEX idx_ad_analytics_organization_id ON public.ad_analytics(organization_id);
CREATE INDEX idx_ad_analytics_date ON public.ad_analytics(date);
CREATE INDEX idx_ads_campaign_id ON public.ads(campaign_id);