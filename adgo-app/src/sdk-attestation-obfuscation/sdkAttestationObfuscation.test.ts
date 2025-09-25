import { attestSDK, obfuscatePayload } from './index';

describe('SDK Attestation & Obfuscation', () => {
  it('should attest SDK if hash is valid', () => {
    const attestation = attestSDK('1.0.0', 'abc123', ['abc123', 'def456']);
    expect(attestation.attested).toBe(true);
  });

  it('should not attest SDK if hash is invalid', () => {
    const attestation = attestSDK('1.0.0', 'zzz999', ['abc123', 'def456']);
    expect(attestation.attested).toBe(false);
  });

  it('should obfuscate payload using base64', () => {
    const payload = 'secret';
    const obfuscated = obfuscatePayload(payload);
    expect(obfuscated).toBe(Buffer.from(payload).toString('base64'));
  });
});
