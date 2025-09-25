import { handleAdRequest, LatencyConfig } from './index';

describe('handleAdRequest', () => {
  const config: LatencyConfig = { maxLatencyMs: 100 };

  it('should resolve with success if request finishes within latency', async () => {
    const requestFn = () => new Promise((res) => setTimeout(() => res('ok'), 50));
    const fallbackFn = () => Promise.resolve('fallback');
    const result = await handleAdRequest(config, requestFn, fallbackFn);
    expect(result.success).toBe(true);
    expect(result.fallbackUsed).toBe(false);
    expect(result.latencyMs).toBeLessThanOrEqual(100);
  });

  it('should use fallback if request exceeds latency', async () => {
    const requestFn = () => new Promise((res) => setTimeout(() => res('ok'), 200));
    const fallbackFn = () => Promise.resolve('fallback');
    const result = await handleAdRequest(config, requestFn, fallbackFn);
    expect(result.success).toBe(true);
    expect(result.fallbackUsed).toBe(true);
    expect(result.latencyMs).toBeGreaterThanOrEqual(100);
  });
});
