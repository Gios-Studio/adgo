// Consent Receipts & Audit Logs Engine
// Records user consent receipts and audit logs for compliance

export type ConsentReceipt = {
  receiptId: string;
  userId: string;
  consentType: string;
  timestamp: Date;
};

export type AuditLog = {
  logId: string;
  action: string;
  userId: string;
  timestamp: Date;
};

export function recordConsent(consents: ConsentReceipt[], newConsent: ConsentReceipt): ConsentReceipt[] {
  return [...consents, newConsent];
}

export function recordAuditLog(logs: AuditLog[], newLog: AuditLog): AuditLog[] {
  return [...logs, newLog];
}
