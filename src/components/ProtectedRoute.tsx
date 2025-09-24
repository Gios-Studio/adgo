import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // defer one tick so we never redirect during the same paint
  useEffect(() => { if (!loading) setReady(true); }, [loading]);

  useEffect(() => {
    if (ready && !session) {
      const next = encodeURIComponent(router.asPath);
      router.replace(`/auth?next=${next}`);
    }
  }, [ready, session, router]);

  if (!ready) return null; // or spinner
  if (!session) return null; // redirect is handled in useEffect
  return <>{children}</>;
}