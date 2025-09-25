// Payout Simulations Engine (Weekly Uplift Forecast)
// Simulates weekly driver payouts and forecasts uplift

export type DriverPayout = {
  driverId: string;
  week: string;
  baseAmount: number;
  uplift: number;
};

export function simulateWeeklyPayouts(drivers: { driverId: string; baseAmount: number; upliftRate: number }[], week: string): DriverPayout[] {
  return drivers.map(d => ({
    driverId: d.driverId,
    week,
    baseAmount: d.baseAmount,
    uplift: d.baseAmount * d.upliftRate,
  }));
}
