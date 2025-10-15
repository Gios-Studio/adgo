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

// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔑 Using Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("🔑 Using Supabase Key (first 6 chars):", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 6));

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ Login error:", error.message);
        setError(error.message);
      } else {
        console.log("✅ Login successful:", data);
        router.push("/Dashboard");
      }
    } catch (err: any) {
      console.error("⚠️ Unexpected login error:", err);
      setError("Unexpected error occurred. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/Dashboard` },
      });

      if (error) setError(error.message);
      else alert("Check your inbox to confirm sign-up!");
    } catch (err: any) {
      console.error("⚠️ Signup error:", err);
      setError("Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">AdGo Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          id="password"
          autoComplete="current-password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gray-200 text-gray-700 p-2 rounded hover:bg-gray-300"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}