import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { loading, session } = useAuth();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  // defer one tick so we never redirect during the same paint
  useEffect(() => { if (!loading) setReady(true); }, [loading]);

  if (!ready) return null; // or spinner
  if (!session) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth?next=${next}`} replace />;
  }
  return <>{children}</>;
}