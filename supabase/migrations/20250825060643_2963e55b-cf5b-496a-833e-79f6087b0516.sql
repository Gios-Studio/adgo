-- Create a default organization for new users
INSERT INTO public.organizations (name, slug, email, subscription_plan) 
VALUES ('Default Organization', 'default-org', 'admin@example.com', 'basic')
ON CONFLICT (slug) DO NOTHING;

-- Update the handle_new_user function to create better default setup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
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

-- Create trigger if it doesn't exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();