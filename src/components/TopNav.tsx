// src/components/TopNav.tsx
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function TopNav() {
  return (
    <nav className="border-b p-3 flex gap-3 items-center">
      <Link to="/" className="font-semibold">AdGo</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/my-ads">My Ads</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/analytics">Analytics</Link>
      <div className="ml-auto">
        <button
          className="border rounded px-3 py-1.5"
          onClick={async () => { await supabase!.auth.signOut(); location.href = "/"; }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}