// Ranking Engine
// Ranks ads/campaigns based on context, targeting, and performance

export type RankingInput = {
  campaignId: string;
  contextScore: number;
  targetingScore: number;
  performanceScore: number;
};

export type RankedCampaign = {
  campaignId: string;
  rank: number;
  totalScore: number;
};

export function rankCampaigns(inputs: RankingInput[]): RankedCampaign[] {
  // Simple weighted sum ranking
  return inputs
    .map((input) => ({
      campaignId: input.campaignId,
      totalScore:
        0.4 * input.contextScore +
        0.3 * input.targetingScore +
        0.3 * input.performanceScore,
    }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((c, i) => ({ ...c, rank: i + 1 }));
}
