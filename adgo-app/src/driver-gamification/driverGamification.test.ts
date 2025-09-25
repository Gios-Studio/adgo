import { calculateTotalPoints, DriverAchievement } from './index';

describe('calculateTotalPoints', () => {
  it('should sum points for each driver', () => {
    const achievements: DriverAchievement[] = [
      { driverId: 'D1', achievement: 'A1', points: 10, timestamp: new Date() },
      { driverId: 'D1', achievement: 'A2', points: 20, timestamp: new Date() },
      { driverId: 'D2', achievement: 'A1', points: 15, timestamp: new Date() },
    ];
    const totals = calculateTotalPoints(achievements);
    expect(totals['D1']).toBe(30);
    expect(totals['D2']).toBe(15);
  });
});
