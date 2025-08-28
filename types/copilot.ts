export type TaskStatus = 'pending'|'approved'|'in_progress'|'blocked'|'done'|'archived';
export type OutputType =
  | 'email_pack' | 'sme_starter_pack' | 'kpi_sheet' | 'pr_draft' | 'driver_copy'
  | 'contract_draft' | 'risk_report' | 'sprint_plan' | 'other';

export interface CopilotTask {
  id: string; title: string; description: string|null;
  status: TaskStatus; priority: number;
  owner: string; created_by: string|null;
  due_date: string|null; city: string|null; tags: string[]|null;
  kpi_targets: Record<string, unknown>|null; roi_tag: Record<string, unknown>|null;
  approved: boolean; external_links: Record<string, unknown>|null;
  created_at: string; updated_at: string;
}

export interface CopilotOutput {
  id: string; task_id: string|null; type: OutputType;
  title: string|null; content: string|null; data: Record<string, unknown>|null;
  file_url: string|null; created_by: string|null; approved: boolean;
  created_at: string; updated_at: string;
}
