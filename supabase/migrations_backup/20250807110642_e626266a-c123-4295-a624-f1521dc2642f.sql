-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'org_admin', 'client', 'viewer');

-- Update user_roles table with proper role structure
ALTER TABLE public.user_roles 
DROP COLUMN IF EXISTS role,
ADD COLUMN role app_role NOT NULL DEFAULT 'client',
ADD COLUMN organization_id UUID REFERENCES public.organizations(id),
ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- Create unique constraint
ALTER TABLE public.user_roles 
ADD CONSTRAINT unique_user_org_role UNIQUE (user_id, organization_id, role);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role, org_id UUID DEFAULT NULL)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (org_id IS NULL OR organization_id = org_id)
      AND is_active = true
  )
$$;

-- Update get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(org_id UUID DEFAULT NULL)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM public.user_roles
  WHERE user_id = auth.uid()
    AND (org_id IS NULL OR organization_id = org_id)
    AND is_active = true
  ORDER BY 
    CASE role
      WHEN 'super_admin' THEN 1
      WHEN 'org_admin' THEN 2
      WHEN 'client' THEN 3
      WHEN 'viewer' THEN 4
    END
  LIMIT 1;
  
  RETURN COALESCE(user_role, 'viewer');
END;
$$;

-- Create reports table
CREATE TABLE public.reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('performance', 'analytics', 'campaign', 'audience')),
  parameters JSONB,
  schedule_cron TEXT,
  is_scheduled BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for reports
CREATE POLICY "Users can view their organization reports" 
ON public.reports 
FOR SELECT 
USING (
  auth.uid() = user_id OR
  public.has_role(auth.uid(), 'org_admin', organization_id) OR
  public.has_role(auth.uid(), 'super_admin')
);

CREATE POLICY "Users can create reports for their organization" 
ON public.reports 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  (organization_id IS NULL OR public.has_role(auth.uid(), 'client', organization_id))
);

-- Create audiences table for target audience management
CREATE TABLE public.audiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  name TEXT NOT NULL,
  description TEXT,
  demographics JSONB,
  interests JSONB,
  behaviors JSONB,
  size_estimate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audiences
ALTER TABLE public.audiences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for audiences
CREATE POLICY "Users can manage their organization audiences" 
ON public.audiences 
FOR ALL 
USING (
  auth.uid() = user_id OR
  public.has_role(auth.uid(), 'org_admin', organization_id) OR
  public.has_role(auth.uid(), 'super_admin')
);

-- Create ab_tests table
CREATE TABLE public.ab_tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  campaign_id UUID REFERENCES public.campaigns(id),
  name TEXT NOT NULL,
  description TEXT,
  variants JSONB NOT NULL,
  traffic_split JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed')),
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  winner_variant TEXT,
  statistical_significance NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on ab_tests
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ab_tests
CREATE POLICY "Users can manage their organization A/B tests" 
ON public.ab_tests 
FOR ALL 
USING (
  auth.uid() = user_id OR
  public.has_role(auth.uid(), 'org_admin', organization_id) OR
  public.has_role(auth.uid(), 'super_admin')
);

-- Create competitor_analysis table
CREATE TABLE public.competitor_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  competitor_name TEXT NOT NULL,
  analysis_data JSONB,
  insights JSONB,
  analysis_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on competitor_analysis
ALTER TABLE public.competitor_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for competitor_analysis
CREATE POLICY "Users can manage their organization competitor analysis" 
ON public.competitor_analysis 
FOR ALL 
USING (
  auth.uid() = user_id OR
  public.has_role(auth.uid(), 'org_admin', organization_id) OR
  public.has_role(auth.uid(), 'super_admin')
);

-- Add triggers for updated_at
CREATE TRIGGER update_reports_updated_at
BEFORE UPDATE ON public.reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_audiences_updated_at
BEFORE UPDATE ON public.audiences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ab_tests_updated_at
BEFORE UPDATE ON public.ab_tests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competitor_analysis_updated_at
BEFORE UPDATE ON public.competitor_analysis
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();