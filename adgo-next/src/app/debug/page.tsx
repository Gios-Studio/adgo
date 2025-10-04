"use client";

import { supabase } from "../../lib/supabaseClient";

export default function DebugPage() {
  async function testAuth() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        alert("Auth error: " + error.message);
      } else {
        alert("Auth OK. Session: " + JSON.stringify(data));
      }
    } catch (err: any) {
      alert("Client error: " + err.message);
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Supabase Debug</h1>
      <p className="mt-2">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <p>Anon Key (first 15 chars): {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 15)}...</p>
      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={testAuth}
      >
        Test Supabase Auth
      </button>
    </main>
  );
}