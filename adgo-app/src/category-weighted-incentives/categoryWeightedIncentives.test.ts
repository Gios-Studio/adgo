import { calculateWeightedIncentive, IncentiveCategory } from './index';

describe('calculateWeightedIncentive', () => {
  it('should calculate total incentive based on weights', () => {
    const categories: IncentiveCategory[] = [
      { category: 'A', weight: 1.2, earnings: 100 },
      { category: 'B', weight: 0.8, earnings: 200 },
    ];
    const total = calculateWeightedIncentive(categories);
    expect(total).toBeCloseTo(100 * 1.2 + 200 * 0.8);
  });
});
