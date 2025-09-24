import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export function RequireAnon({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const next = router.query.next as string || "/wallet";

  useEffect(() => { if (!loading) setReady(true); }, [loading]);

  useEffect(() => {
    if (ready && session) {
      router.replace(next);
    }
  }, [ready, session, next, router]);

  if (!ready) return null;
  if (session) return null; // redirect is handled in useEffect
  return <>{children}</>;
}