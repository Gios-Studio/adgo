import { FlagsPanel } from "@/components/FlagsPanel";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">Settings</h1>
      <FlagsPanel />
    </div>
  );
}