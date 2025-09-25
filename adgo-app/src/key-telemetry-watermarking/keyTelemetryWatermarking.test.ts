import { storeKey, watermarkTelemetry, KeyRecord } from './index';

describe('Key Management & Telemetry Watermarking', () => {
  it('should store new keys securely', () => {
    const k1: KeyRecord = { keyId: 'K1', value: 'secret1', created: new Date() };
    const k2: KeyRecord = { keyId: 'K2', value: 'secret2', created: new Date() };
    const keys = storeKey([k1], k2);
    expect(keys.length).toBe(2);
    expect(keys[1]).toEqual(k2);
  });

  it('should watermark telemetry payloads', () => {
    const payload = 'data';
    const watermark = 'wm123';
    const result = watermarkTelemetry(payload, watermark);
    expect(result).toBe('data::wm123');
  });
});
