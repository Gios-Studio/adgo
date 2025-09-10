import { useState } from "react";

export default function EventsTest() {
  const [campaignId, setCampaignId] = useState("3aeff106-1335-4121-844f-846addcb29f9");
  const [rideId, setRideId] = useState("ride-demo-123");
  const [resp, setResp] = useState<any>(null);

  async function emit(type: "impression" | "click") {
    const r = await fetch("/api/sdk/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaign_id: campaignId, ride_id: rideId, event_type: type })
    });
    setResp(await r.json());
  }

  async function fetchCtr() {
    const r = await fetch(`/api/metrics/ctr?campaign_id=${campaignId}`);
    setResp(await r.json());
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <input className="border p-2 rounded" value={campaignId} onChange={e=>setCampaignId(e.target.value)} />
        <input className="border p-2 rounded" value={rideId} onChange={e=>setRideId(e.target.value)} />
      </div>
      <div className="flex gap-2">
        <button className="border rounded px-3 py-2" onClick={()=>emit("impression")}>Emit Impression</button>
        <button className="border rounded px-3 py-2" onClick={()=>emit("click")}>Emit Click</button>
        <button className="border rounded px-3 py-2" onClick={fetchCtr}>Fetch CTR</button>
      </div>
      <pre className="border rounded p-3 text-xs overflow-auto">{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
}