-- Fix security warnings by setting search_path on functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  default_org_id UUID;
BEGIN
  -- Get the default organization ID
  SELECT id INTO default_org_id 
  FROM public.organizations 
  WHERE slug = 'default-org' 
  LIMIT 1;
  
  -- Create profile
  INSERT INTO public.profiles (user_id, display_name, organization_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', NEW.email),
    default_org_id
  );
  
  -- Assign default client role
  INSERT INTO public.user_roles (user_id, role, organization_id)
  VALUES (NEW.id, 'client', default_org_id);
  
  RETURN NEW;
END;
$$;

-- Fix the get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(org_id uuid DEFAULT NULL::uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Fix the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;