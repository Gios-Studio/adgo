// Frequency & Fatigue Controls Engine
// Controls ad exposure frequency and user fatigue

export type FrequencyFatigueConfig = {
  maxImpressions: number;
  minIntervalMinutes: number;
  fatigueThreshold: number;
};

export type UserExposure = {
  userId: string;
  impressions: number;
  lastImpression: Date;
  fatigueScore: number;
};

export function checkExposure(
  config: FrequencyFatigueConfig,
  exposure: UserExposure
): boolean {
  const now = new Date();
  const interval = (now.getTime() - exposure.lastImpression.getTime()) / 60000;
  if (
    exposure.impressions >= config.maxImpressions ||
    interval < config.minIntervalMinutes ||
    exposure.fatigueScore >= config.fatigueThreshold
  ) {
    return false;
  }
  return true;
}
