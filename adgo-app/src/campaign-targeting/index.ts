// Campaign Targeting by Venue/Time-of-Day Engine
// Selects campaigns based on venue and time-of-day criteria

export type CampaignTargetingConfig = {
  campaignId: string;
  venues: string[];
  timeRanges: { start: number; end: number }[]; // 0-23
};

export function isCampaignEligible(
  config: CampaignTargetingConfig,
  venue: string,
  hour: number
): boolean {
  if (!config.venues.includes(venue)) return false;
  for (const range of config.timeRanges) {
    if (hour >= range.start && hour < range.end) return true;
  }
  return false;
}
