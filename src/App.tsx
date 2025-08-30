import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// PAGES / COMPONENTS
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import Landing from "./pages/Landing";
import AuthForm from "./components/AuthForm";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdDisplayScreen from "./components/AdDisplayScreen";
import AdUploadFlow from "./components/AdUploadFlow";
import PaymentProcessor from "./components/PaymentProcessor";
import CampaignCalendar from "./components/CampaignCalendar";

import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

// ✅ Supabase client (make sure this file exists)
import { supabase } from "./lib/supabaseClient";

const queryClient = new QueryClient();

function RootLayout({ children }: { children: React.ReactNode }) {
  // 🔎 Supabase smoke test: checks SDK wiring & envs are readable
  useEffect(() => {
    (async () => {
      try {
        // quick no-op auth call
        const { data, error } = await supabase.auth.getSession();
        console.log("Supabase smoke test → getSession()", { data, error });

        // optional: log env presence (don’t log secrets)
        console.log("ENV present?", {
          hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
          hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
        });
      } catch (e) {
        console.error("Supabase smoke test error:", e);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          {children}
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <RootLayout>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/index" element={<Index />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/display" element={<AdDisplayScreen />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AdvertiserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <AdUploadFlow />
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

          {/* Redirects & 404 */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RootLayout>
  );
}