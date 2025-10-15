/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:35 UTC
 */

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