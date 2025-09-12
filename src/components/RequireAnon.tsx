import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export function RequireAnon({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();
  const [params] = useSearchParams();
  const [ready, setReady] = useState(false);
  const next = params.get("next") || "/wallet";

  useEffect(() => { if (!loading) setReady(true); }, [loading]);

  if (!ready) return null;
  if (session) return <Navigate to={next} replace />;
  return <>{children}</>;
}