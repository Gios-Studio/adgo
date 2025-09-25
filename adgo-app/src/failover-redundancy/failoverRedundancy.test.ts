import { deliverWithFailover, Endpoint } from './index';

describe('deliverWithFailover', () => {
  it('should succeed on first endpoint', async () => {
    const endpoints: Endpoint[] = [
      { name: 'A', requestFn: () => Promise.resolve('ok') },
      { name: 'B', requestFn: () => Promise.resolve('ok') },
    ];
    const result = await deliverWithFailover(endpoints);
    expect(result.success).toBe(true);
    expect(result.endpoint).toBe('A');
    expect(result.attempts).toBe(1);
  });

  it('should failover to next endpoint if first fails', async () => {
    const endpoints: Endpoint[] = [
      { name: 'A', requestFn: () => Promise.reject('fail') },
      { name: 'B', requestFn: () => Promise.resolve('ok') },
    ];
    const result = await deliverWithFailover(endpoints);
    expect(result.success).toBe(true);
    expect(result.endpoint).toBe('B');
    expect(result.attempts).toBe(2);
  });

  it('should fail if all endpoints fail', async () => {
    const endpoints: Endpoint[] = [
      { name: 'A', requestFn: () => Promise.reject('fail') },
      { name: 'B', requestFn: () => Promise.reject('fail') },
    ];
    const result = await deliverWithFailover(endpoints);
    expect(result.success).toBe(false);
    expect(result.endpoint).toBe('');
    expect(result.attempts).toBe(2);
  });
});
