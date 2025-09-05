// src/pages/CampaignCalendar.tsx
export default function CampaignCalendar() {
  return (
    <div className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Campaign Calendar</h1>
      <p className="text-neutral-600">
        Coming soon: schedule campaigns, set flight dates, frequency caps, and preview screen allocations.
      </p>
      <div className="border rounded-lg p-4">
        <p className="text-sm">Tip: seed a couple of campaigns in Supabase to visualize ranges here.</p>
      </div>
    </div>
  );
}