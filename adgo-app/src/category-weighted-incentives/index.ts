// Category-Weighted Incentives Engine
// Calculates driver incentives based on category weights

export type IncentiveCategory = {
  category: string;
  weight: number;
  earnings: number;
};

export function calculateWeightedIncentive(categories: IncentiveCategory[]): number {
  let total = 0;
  for (const c of categories) {
    total += c.earnings * c.weight;
  }
  return total;
}
