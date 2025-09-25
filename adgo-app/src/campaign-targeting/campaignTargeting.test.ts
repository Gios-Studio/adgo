import { isCampaignEligible, CampaignTargetingConfig } from './index';

describe('isCampaignEligible', () => {
  const config: CampaignTargetingConfig = {
    campaignId: 'C1',
    venues: ['V1', 'V2'],
    timeRanges: [
      { start: 8, end: 12 },
      { start: 18, end: 22 },
    ],
  };

  it('should allow campaign for eligible venue and time', () => {
    expect(isCampaignEligible(config, 'V1', 9)).toBe(true);
    expect(isCampaignEligible(config, 'V2', 19)).toBe(true);
  });

  it('should block campaign for ineligible venue', () => {
    expect(isCampaignEligible(config, 'V3', 9)).toBe(false);
  });

  it('should block campaign for ineligible time', () => {
    expect(isCampaignEligible(config, 'V1', 13)).toBe(false);
  });
});
