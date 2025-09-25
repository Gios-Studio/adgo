import { recordConsent, recordAuditLog, ConsentReceipt, AuditLog } from './index';

describe('Consent Receipts & Audit Logs', () => {
  it('should append new consent receipts', () => {
    const c1: ConsentReceipt = { receiptId: 'R1', userId: 'U1', consentType: 'marketing', timestamp: new Date() };
    const c2: ConsentReceipt = { receiptId: 'R2', userId: 'U2', consentType: 'analytics', timestamp: new Date() };
    const receipts = recordConsent([c1], c2);
    expect(receipts.length).toBe(2);
    expect(receipts[1]).toEqual(c2);
  });

  it('should append new audit logs', () => {
    const l1: AuditLog = { logId: 'L1', action: 'login', userId: 'U1', timestamp: new Date() };
    const l2: AuditLog = { logId: 'L2', action: 'logout', userId: 'U1', timestamp: new Date() };
    const logs = recordAuditLog([l1], l2);
    expect(logs.length).toBe(2);
    expect(logs[1]).toEqual(l2);
  });
});
