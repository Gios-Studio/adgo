'use server';

import { supabase, supabaseAdmin } from '@/lib/supabase';
import { CopilotTask, CopilotOutput, TaskStatus, OutputType } from '@/types/copilot';

function throwIfError<T>(data: T | null, error: any, ctx: string): T {
  if (error) { console.error(`[Copilot:${ctx}]`, error); throw new Error(error?.message || `Supabase error in ${ctx}`); }
  if (!data) throw new Error(`No data in ${ctx}`);
  return data;
}

export async function createTaskForSelf(args: {
  title: string; description?: string; priority?: number; dueDate?: string;
  city?: string; tags?: string[]; kpiTargets?: Record<string, unknown>; roiTag?: Record<string, unknown>;
}): Promise<CopilotTask> {
  const { data, error } = await supabase.rpc('create_task', {
    p_title: args.title, p_description: args.description ?? null, p_priority: args.priority ?? 3,
    p_due_date: args.dueDate ?? null, p_city: args.city ?? null, p_tags: args.tags ?? [],
    p_kpi_targets: args.kpiTargets ?? null, p_roi_tag: args.roiTag ?? null,
  });
  return throwIfError<CopilotTask>(data, error, 'createTaskForSelf');
}

export async function createTaskForOwner(ownerUserId: string, args: {
  title: string; description?: string; priority?: number; dueDate?: string;
  city?: string; tags?: string[]; kpiTargets?: Record<string, unknown>; roiTag?: Record<string, unknown>;
}): Promise<CopilotTask> {
  const { data, error } = await supabaseAdmin.from('copilot_tasks').insert([{
    title: args.title, description: args.description ?? null, priority: args.priority ?? 3,
    due_date: args.dueDate ?? null, city: args.city ?? null, tags: args.tags ?? [],
    kpi_targets: args.kpiTargets ?? null, roi_tag: args.roiTag ?? null,
    owner: ownerUserId, created_by: ownerUserId,
  }]).select().single();
  return throwIfError<CopilotTask>(data, error, 'createTaskForOwner');
}

export async function logOutput(args: {
  taskId?: string; type: OutputType; title?: string; content?: string; data?: Record<string, unknown>; fileUrl?: string;
}): Promise<CopilotOutput> {
  const { data, error } = await supabase.rpc('log_output', {
    p_task_id: args.taskId ?? null, p_type: args.type, p_title: args.title ?? null,
    p_content: args.content ?? null, p_data: args.data ?? null, p_file_url: args.fileUrl ?? null,
  });
  return throwIfError<CopilotOutput>(data, error, 'logOutput');
}

export async function approveTask(taskId: string, isApproved: boolean): Promise<CopilotTask> {
  const { data, error } = await supabase.rpc('approve_task', { p_task_id: taskId, p_is_approved: isApproved });
  return throwIfError<CopilotTask>(data, error, 'approveTask');
}

export async function setTaskStatus(taskId: string, newStatus: TaskStatus, approved?: boolean): Promise<CopilotTask> {
  const { data, error } = await supabase.rpc('update_task_status', {
    p_task_id: taskId, p_new_status: newStatus, p_approved: approved ?? null,
  });
  return throwIfError<CopilotTask>(data, error, 'setTaskStatus');
}

export async function getMyTasks(params?: { status?: TaskStatus | null; city?: string | null; }): Promise<CopilotTask[]> {
  const { data, error } = await supabase.rpc('get_my_tasks', {
    p_status: params?.status ?? null, p_city: params?.city ?? null,
  });
  return throwIfError<CopilotTask[]>(data, error, 'getMyTasks');
}
