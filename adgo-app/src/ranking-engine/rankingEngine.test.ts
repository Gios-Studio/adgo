import { rankCampaigns, RankingInput } from './index';

describe('rankCampaigns', () => {
  it('should rank campaigns by total score', () => {
    const inputs: RankingInput[] = [
      { campaignId: 'A', contextScore: 5, targetingScore: 4, performanceScore: 3 },
      { campaignId: 'B', contextScore: 2, targetingScore: 5, performanceScore: 5 },
      { campaignId: 'C', contextScore: 4, targetingScore: 3, performanceScore: 4 },
    ];
    const ranked = rankCampaigns(inputs);
    expect(ranked[0].campaignId).toBe('A');
    expect(ranked[1].campaignId).toBe('C');
    expect(ranked[2].campaignId).toBe('B');
    expect(ranked[0].rank).toBe(1);
    expect(ranked[1].rank).toBe(2);
    expect(ranked[2].rank).toBe(3);
  });
});
