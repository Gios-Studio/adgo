import { isLocationEligible, MultiLocationCampaignConfig, Location } from './index';

describe('isLocationEligible', () => {
  const config: MultiLocationCampaignConfig = {
    campaignId: 'C2',
    locations: [
      { id: 'L1', lat: 40.7128, lng: -74.006 },
      { id: 'L2', lat: 34.0522, lng: -118.2437 },
    ],
    radiusMeters: 1000,
  };

  it('should allow user within radius of any location', () => {
    const userLocation: Location = { id: 'U1', lat: 40.713, lng: -74.006 };
    expect(isLocationEligible(config, userLocation)).toBe(true);
  });

  it('should block user outside radius of all locations', () => {
    const userLocation: Location = { id: 'U2', lat: 41.0, lng: -74.006 };
    expect(isLocationEligible(config, userLocation)).toBe(false);
  });
});
