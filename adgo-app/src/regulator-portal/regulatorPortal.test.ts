import { handleRegulatorRequest, RegulatorRequest } from './index';

describe('handleRegulatorRequest', () => {
  it('should handle view action', () => {
    const req: RegulatorRequest = {
      regulatorId: 'reg-001',
      action: 'view',
      target: 'campaign-123',
      timestamp: Date.now(),
    };
    const res = handleRegulatorRequest(req);
    expect(res.status).toBe('success');
    expect(res.data?.info).toBe('Sample data for viewing.');
  });

  it('should handle audit action', () => {
    const req: RegulatorRequest = {
      regulatorId: 'reg-002',
      action: 'audit',
      target: 'driver-456',
      timestamp: Date.now(),
    };
    const res = handleRegulatorRequest(req);
    expect(res.status).toBe('success');
    expect(res.data?.audit).toBe('Audit log data.');
  });

  it('should handle export action', () => {
    const req: RegulatorRequest = {
      regulatorId: 'reg-003',
      action: 'export',
      target: 'wallet-789',
      timestamp: Date.now(),
    };
    const res = handleRegulatorRequest(req);
    expect(res.status).toBe('success');
    expect(res.data?.export).toBe('Exported data.');
  });

  it('should handle unknown action', () => {
    const req: RegulatorRequest = {
      regulatorId: 'reg-004',
      action: 'unknown' as any,
      target: 'unknown',
      timestamp: Date.now(),
    };
    const res = handleRegulatorRequest(req);
    expect(res.status).toBe('error');
    expect(res.message).toBe('Unknown action');
  });
});
