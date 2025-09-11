// src/types/partners.ts
export interface Partner {
  id: string;
  tenant_id: string;
  name: string;
  api_key: string | null;
  created_at: string;
}