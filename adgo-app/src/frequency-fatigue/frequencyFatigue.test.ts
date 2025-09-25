import { checkExposure, FrequencyFatigueConfig, UserExposure } from './index';

describe('checkExposure', () => {
  const config: FrequencyFatigueConfig = {
    maxImpressions: 5,
    minIntervalMinutes: 10,
    fatigueThreshold: 3,
  };
  const baseExposure: UserExposure = {
    userId: 'user1',
    impressions: 2,
    lastImpression: new Date(Date.now() - 20 * 60000),
    fatigueScore: 1,
  };

  it('should allow exposure if below limits', () => {
    expect(checkExposure(config, baseExposure)).toBe(true);
  });

  it('should block if maxImpressions reached', () => {
    const exposure = { ...baseExposure, impressions: 5 };
    expect(checkExposure(config, exposure)).toBe(false);
  });

  it('should block if interval too short', () => {
    const exposure = { ...baseExposure, lastImpression: new Date() };
    expect(checkExposure(config, exposure)).toBe(false);
  });

  it('should block if fatigue threshold reached', () => {
    const exposure = { ...baseExposure, fatigueScore: 3 };
    expect(checkExposure(config, exposure)).toBe(false);
  });
});
