import { verifyOfflineRedemption, RedemptionRecord } from './index';

describe('verifyOfflineRedemption', () => {
  it('should mark record as verified if backend returns true', async () => {
    const record: RedemptionRecord = {
      redemptionId: 'R1',
      userId: 'U1',
      campaignId: 'C1',
      timestamp: new Date(),
      verified: false,
    };
    const backendVerifyFn = async () => true;
    const result = await verifyOfflineRedemption(record, backendVerifyFn);
    expect(result.verified).toBe(true);
  });

  it('should mark record as not verified if backend returns false', async () => {
    const record: RedemptionRecord = {
      redemptionId: 'R2',
      userId: 'U2',
      campaignId: 'C2',
      timestamp: new Date(),
      verified: false,
    };
    const backendVerifyFn = async () => false;
    const result = await verifyOfflineRedemption(record, backendVerifyFn);
    expect(result.verified).toBe(false);
  });
});
