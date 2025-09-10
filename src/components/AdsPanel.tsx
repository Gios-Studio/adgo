// src/components/AdsPanel.tsx
import { isMuted } from "@/lib/mute";
import UtilityAd from "@/components/UtilityAd";

type Ad = { id: string; title: string; body: string; category: string };
export default function AdsPanel({ rideId, allAds }: { rideId: string; allAds: Ad[] }) {
  const eligibleAds = allAds.filter(a => !isMuted(a.category)); // <- your line

  if (eligibleAds.length === 0) return null;

  // render the first eligible (frequency cap will still gate it)
  const ad = eligibleAds[0];
  return <UtilityAd rideId={rideId} ad={ad} />;
}