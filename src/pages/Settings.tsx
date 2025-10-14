import React from "react";
import Layout from "../../components/Layout";
import { FlagsPanel } from "@/components/FlagsPanel";

export default function SettingsPage() {
  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage feature flags and preferences here.</p>
        <FlagsPanel />
      </div>
    </Layout>
  );
}