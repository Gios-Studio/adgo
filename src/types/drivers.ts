// src/types/drivers.ts
export interface Driver {
  id: string;
  tenant_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  created_at: string;
}