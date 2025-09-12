// src/App.tsx
import React from "react";
import { AuthProvider } from "@/hooks/useAuth";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* Global layout wrappers can go here if needed */}
      {children}
    </AuthProvider>
  );
}