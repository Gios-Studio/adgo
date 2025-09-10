// src/components/UtilityAd.tsx
import { useEffect, useState } from "react";
import { canShowAd, markAdShown } from "@/lib/useAdFrequencyCap";
import { recordEvent } from "@/lib/adEvents";

type Ad = { id?: string; title: string; body: string; category?: string; campaign_id?: string; zone?: string };

await recordEvent({
  ride_id: "ride-demo-1",
  event_type: "impression",
  campaign_id: "3aeff106-1335-4121-844f-846addcb29f9",
  ad_id: "d303e9d3-bf0c-4852-bab3-95ab47a7d87a",
  zone: "post-ride",
  meta: {}
});

export default function UtilityAd({ rideId, ad }: { rideId: string; ad: Ad }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rideId && canShowAd(rideId)) {
      setVisible(true);

      // fire-and-forget impression
      recordEvent({
        ride_id: rideId,
        event_type: "impression",
        ad_id: ad.id ?? null,
        campaign_id: ad.campaign_id ?? null,
        zone: ad.zone ?? "post-ride",
        meta: { title: ad.title },
      }).catch(console.error);
    }
  }, [rideId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  async function onClick() {
    try {
      await recordEvent({
        ride_id: rideId,
        event_type: "click",
        ad_id: ad.id ?? null,
        campaign_id: ad.campaign_id ?? null,
        zone: ad.zone ?? "post-ride",
        meta: { title: ad.title },
      });
    } catch (e) {
      console.error(e);
    } finally {
      markAdShown(rideId);
      setVisible(false);
    }
  }

  return (
    <div className="rounded-md border p-3">
      <strong>{ad.title}</strong>
      <p>{ad.body}</p>
      <button onClick={onClick} className="mt-2 border rounded px-3 py-2">
        Learn more
      </button>
    </div>
  );
}