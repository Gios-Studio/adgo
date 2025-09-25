import { isAdAllowed, QuietGeofencingConfig, UserLocation } from './index';

describe('isAdAllowed', () => {
  const config: QuietGeofencingConfig = {
    quietHours: { start: 22, end: 6 },
    geofence: { lat: 40.7128, lng: -74.006, radiusMeters: 1000 },
  };
  const userLocation: UserLocation = { lat: 40.713, lng: -74.006 };

  it('should block ads during quiet hours', () => {
    const now = new Date('2025-09-25T23:00:00Z');
    expect(isAdAllowed(config, userLocation, now)).toBe(false);
  });

  it('should allow ads outside quiet hours and inside geofence', () => {
    const now = new Date('2025-09-25T12:00:00Z');
    expect(isAdAllowed(config, userLocation, now)).toBe(true);
  });

  it('should block ads outside geofence', () => {
    const farLocation: UserLocation = { lat: 41.0, lng: -74.006 };
    const now = new Date('2025-09-25T12:00:00Z');
    expect(isAdAllowed(config, farLocation, now)).toBe(false);
  });
});
