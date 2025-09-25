// Driver Gamification Engine
// Tracks driver achievements, points, and rewards

export type DriverAchievement = {
  driverId: string;
  achievement: string;
  points: number;
  timestamp: Date;
};

export function calculateTotalPoints(achievements: DriverAchievement[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const a of achievements) {
    totals[a.driverId] = (totals[a.driverId] || 0) + a.points;
  }
  return totals;
}
