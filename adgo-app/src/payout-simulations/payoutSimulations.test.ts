import { simulateWeeklyPayouts, DriverPayout } from './index';

describe('simulateWeeklyPayouts', () => {
  it('should calculate uplift for each driver', () => {
    const drivers = [
      { driverId: 'D1', baseAmount: 100, upliftRate: 0.2 },
      { driverId: 'D2', baseAmount: 200, upliftRate: 0.1 },
    ];
    const week = '2025-W39';
    const payouts = simulateWeeklyPayouts(drivers, week);
    expect(payouts.length).toBe(2);
    expect(payouts[0]).toEqual({ driverId: 'D1', week, baseAmount: 100, uplift: 20 });
    expect(payouts[1]).toEqual({ driverId: 'D2', week, baseAmount: 200, uplift: 20 });
  });
});
