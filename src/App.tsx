// src/App.tsx
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
// <<agent:imports>>

import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { RequireAnon } from "@/components/RequireAnon";
import AuthForm from "@/components/AuthForm";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import MyAds from "@/pages/MyAds";
import CampaignCalendar from "@/pages/CampaignCalendar";
import Wallet from "@/pages/Wallet";
import Analytics from "@/pages/Analytics";

import { supabase } from "@/lib/supabaseClient";

export default function App() {
  // Optional smoke test so you can see session on load
  useEffect(() => {
    (async () => {
      const { data } = await supabase?.auth.getSession();
      console.log("Supabase smoke test → getSession()", data);
    })();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <TopNav />
          <main className="flex-1">
            <Routes>
              {/* Public landing */}
              <Route path="/" element={<Home />} />

              {/* Auth page (keeps signed-in users out) */}
              <Route
                path="/auth"
                element={
                  <RequireAnon>
                    <AuthForm />
                  </RequireAnon>
                }
              />

              {/* Post-login core */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-ads"
                element={
                  <ProtectedRoute>
                    <MyAds />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/calendar"
                element={
                  <ProtectedRoute>
                    <CampaignCalendar />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <Wallet />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                }
              />

              {/* Agent will inject extra protected routes here if needed */}
              {/* <<agent:routes>> */}

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

/**
 * Minimal top nav so you can click around after login.
 * Remove or style as you like.
 */
function TopNav() {
  return (
    <nav className="border-b p-3 flex items-center gap-3">
      <Link to="/" className="font-semibold">AdGo</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/my-ads">My Ads</Link>
      <Link to="/calendar">Calendar</Link>
      <Link to="/wallet">Wallet</Link>
      <Link to="/analytics">Analytics</Link>
      <div className="ml-auto">
        <button
          className="border rounded px-3 py-1.5"
          onClick={async () => {
            try {
              await supabase?.auth.signOut();
            } finally {
              // Hard redirect clears any stale state
              location.href = "/";
            }
          }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
}