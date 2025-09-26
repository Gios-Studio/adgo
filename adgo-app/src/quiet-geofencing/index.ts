// Quiet Hours & Geofencing Engine
// Suppresses ads during quiet hours and outside geofenced areas

export type QuietGeofencingConfig = {
  quietHours: { start: number; end: number }; // 0-23
  geofence: { lat: number; lng: number; radiusMeters: number };
};

export type UserLocation = {
  lat: number;
  lng: number;
};

export function isAdAllowed(
  config: QuietGeofencingConfig,
  userLocation: UserLocation,
  now: Date
): boolean {
  const hour = now.getHours();
  if (hour >= config.quietHours.start && hour < config.quietHours.end) {
    return false;
  }
  const dist = Math.sqrt(
    Math.pow(userLocation.lat - config.geofence.lat, 2) +
    Math.pow(userLocation.lng - config.geofence.lng, 2)
  );
  // Approximate conversion: 1 deg lat/lng ~ 111km
  if (dist * 111000 > config.geofence.radiusMeters) {
    return false;
  }
  return true;
}
