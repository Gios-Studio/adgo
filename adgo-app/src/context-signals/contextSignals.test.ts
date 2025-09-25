import { getContextSignals } from './index';

describe('getContextSignals', () => {
  it('should return default context signals', () => {
    const signals = getContextSignals();
    expect(signals).toHaveProperty('time');
    expect(signals).toHaveProperty('geo');
    expect(signals).toHaveProperty('venueDensity');
    expect(signals).toHaveProperty('events');
    expect(signals).toHaveProperty('weather');
  });
});
