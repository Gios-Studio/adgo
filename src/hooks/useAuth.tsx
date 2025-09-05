import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type AuthCtx = {
  loading: boolean;
  session: Session | null;
  user: User | null;
};

const Ctx = createContext<AuthCtx>({ loading: true, session: null, user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    // initial fetch
    supabase?.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    // subscribe once
    const sub = supabase?.auth.onAuthStateChange((_event, s) => {
      setSession(s ?? null);
    });

    return () => {
      mounted = false;
      sub?.data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthCtx>(() => ({
    loading,
    session,
    user: session?.user ?? null,
  }), [loading, session]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}