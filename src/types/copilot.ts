// src/types/copilot.ts

export type TaskStatus = "pending" | "in_progress" | "completed" | "failed";

export type OutputType =
  | "contract_draft"
  | "driver_copy"
  | "email_pack"
  | "kpi_sheet"
  | "other"
  | "pr_draft"
  | "risk_report"
  | "sme_starter_pack"
  | "sprint_plan";

export interface CopilotTask {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  created_at: string;
  updated_at?: string;
}

export interface CopilotOutput {
  id: string;
  task_id: string;
  type: OutputType;
  payload: Record<string, any>;
  created_at: string;
}