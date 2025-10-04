// Simple Supabase auth hook

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';


// Use Supabase's User type if available, otherwise define a minimal type
// import type { User } from '@supabase/supabase-js';
type SupabaseUser = {
  id: string;
  email?: string;
};

export function useAuth() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
