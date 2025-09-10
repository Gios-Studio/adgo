"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Fetch profile with role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role_type")
        .eq("id", user.id)
        .single();

      if (!profile) {
        router.push("/dashboard"); // fallback
        return;
      }

      switch (profile.role_type) {
        case "advertiser":
          router.push("/dashboard/advertiser");
          break;
        case "partner":
          router.push("/dashboard/partner");
          break;
        case "driver":
          router.push("/dashboard/driver");
          break;
        default:
          router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  return <p className="p-6">Redirecting…</p>;
}