// Multi-Location Campaigns Engine
// Enables campaigns to target multiple locations with flexible rules

export type Location = {
  id: string;
  lat: number;
  lng: number;
};

export type MultiLocationCampaignConfig = {
  campaignId: string;
  locations: Location[];
  radiusMeters: number;
};

export function isLocationEligible(
  config: MultiLocationCampaignConfig,
  userLocation: Location
): boolean {
  for (const loc of config.locations) {
    const dist = Math.sqrt(
      Math.pow(userLocation.lat - loc.lat, 2) +
      Math.pow(userLocation.lng - loc.lng, 2)
    );
    // Approximate conversion: 1 deg lat/lng ~ 111km
    if (dist * 111000 <= config.radiusMeters) return true;
  }
  return false;
}
