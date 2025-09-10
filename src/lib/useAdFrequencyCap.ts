// Simple, per-ride cap using sessionStorage
export function canShowAd(rideId: string): boolean {
  if (!rideId) return false;
  const key = "adgo_shown_rides";
  const shown: Record<string, true> = JSON.parse(sessionStorage.getItem(key) || "{}");
  return !shown[rideId];
}

export function markAdShown(rideId: string): void {
  if (!rideId) return;
  const key = "adgo_shown_rides";
  const shown: Record<string, true> = JSON.parse(sessionStorage.getItem(key) || "{}");
  shown[rideId] = true;
  sessionStorage.setItem(key, JSON.stringify(shown));
}