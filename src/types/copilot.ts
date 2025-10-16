/**
 * AdGo Platform - Advanced Advertising Technology Suite
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, distribution, or use of this file,
 * via any medium, is strictly prohibited without explicit written consent.
 * 
 * For licensing information, please contact: legal@adgosolutions.com
 * 
 * Build: 20251015_073830
 * Generated: 2025-10-15 04:38:33 UTC
 */

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