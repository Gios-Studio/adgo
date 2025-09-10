import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) await supabase.auth.signInAnonymously();
    })();
  }, []);
  return <Component {...pageProps} />;
}