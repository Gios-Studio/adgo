// src/components/AuthForm.tsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

type Mode = "signin" | "signup";

export default function AuthForm() {
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const router = useRouter();
  const next = "/dashboard";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setInfo(null);
    if (!email || !password) return setErr("Email and password are required.");
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase!.auth.signInWithPassword({ email, password });
        if (error) return setErr(pretty(error.message));
        router.push(next);
      } else {
        const { error } = await supabase!.auth.signUp({ email, password });
        if (error) return setErr(pretty(error.message));
        setInfo("Account created. If confirmations are ON, check your email; otherwise, click Sign In.");
        setMode("signin");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4 border rounded-xl">
      <h1 className="text-xl font-semibold">{mode === "signin" ? "Sign in" : "Create an account"}</h1>
      {err && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{err}</div>}
      {info && <div className="p-3 rounded bg-green-50 text-green-700 text-sm">{info}</div>}

      <form className="space-y-3" onSubmit={submit}>
        <div>
          <label className="block text-sm">Email</label>
          <input className="border rounded w-full p-2" type="email" value={email}
                 onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input className="border rounded w-full p-2" type="password" value={password}
                 onChange={(e) => setPassword(e.target.value)} placeholder="Passw0rd!" />
        </div>
        <button className="w-full border rounded py-2 disabled:opacity-60" disabled={loading} type="submit">
          {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Sign Up"}
        </button>
      </form>

      <div className="text-sm text-neutral-600">
        {mode === "signin" ? (
          <>Don’t have an account?{" "}
            <button className="underline" onClick={() => { setMode("signup"); setErr(null); setInfo(null); }}>
              Sign up
            </button>
          </>
        ) : (
          <>Already have an account?{" "}
            <button className="underline" onClick={() => { setMode("signin"); setErr(null); setInfo(null); }}>
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function pretty(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return "Invalid email or password.";
  if (m.includes("email not confirmed")) return "Email not confirmed (turn off confirmations for local dev).";
  if (m.includes("signup disabled")) return "Sign ups are disabled in project settings.";
  return msg;
}