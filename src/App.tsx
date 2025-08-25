import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Waitlist from "./pages/Waitlist";
import Landing from "./pages/Landing";
import AuthForm from "./components/AuthForm";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdDisplayScreen from "./components/AdDisplayScreen";
import DemoPreview from "./components/DemoPreview";
import PaymentProcessor from "./components/PaymentProcessor";
import CampaignCalendar from "./components/CampaignCalendar";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/waitlist" element={<Waitlist />} />
      <Route 
        path="/" 
        element={user ? <Navigate to="/client-dashboard" replace /> : <Landing />} 
      />
      <Route path="/login" element={<AuthForm />} />
      <Route 
        path="/client-dashboard" 
        element={
          <ProtectedRoute>
            <AdvertiserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/ad-display" element={<AdDisplayScreen />} />
      <Route path="/demo" element={<DemoPreview />} />
      <Route path="/payment" element={<PaymentProcessor />} />
      <Route path="/calendar" element={<CampaignCalendar />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
