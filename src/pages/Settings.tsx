import React from "react";
import { FlagsPanel } from "@/components/FlagsPanel"; // move your code there if not already

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-600">Manage feature flags and preferences here.</p>
      <FlagsPanel />
    </div>
  );
}