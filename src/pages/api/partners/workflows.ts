/**
 * AdGo Platform - Partner Integration API Endpoints
 * RESTful API for partner integration workflow management
 */

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';
import { PartnerIntegrationGenerator, PartnerProfile, IntegrationWorkflow } from '../../../utils/partner-integration';

interface PartnerIntegrationRequest extends NextApiRequest {
  body: {
    partnerProfile?: PartnerProfile;
    workflowId?: string;
    itemId?: string;
    status?: string;
    customizations?: any;
  };
}

/**
 * Partner Integration Workflow API Handler
 * 
 * Endpoints:
 * POST /api/partners/workflows - Create new workflow
 * GET /api/partners/workflows - List workflows
 * GET /api/partners/workflows/:id - Get specific workflow
 * PUT /api/partners/workflows/:id - Update workflow
 * DELETE /api/partners/workflows/:id - Archive workflow
 * POST /api/partners/workflows/:id/items/:itemId - Update checklist item
 * POST /api/partners/workflows/:id/validate - Validate workflow
 * POST /api/partners/workflows/:id/export - Export workflow
 * POST /api/partners/workflows/:id/automate - Run automated checks
 */
export default async function handler(req: PartnerIntegrationRequest, res: NextApiResponse) {
  try {
    // Initialize generator
    const generator = PartnerIntegrationGenerator.getInstance();

    // Route based on method and path
    const { method, query } = req;
    const { workflowId, action } = query;

    switch (method) {
      case 'GET':
        if (workflowId) {
          return await getWorkflow(req, res, workflowId as string);
        } else {
          return await listWorkflows(req, res);
        }

      case 'POST':
        if (workflowId && action) {
          return await handleWorkflowAction(req, res, workflowId as string, action as string);
        } else if (workflowId) {
          return await updateWorkflowItem(req, res, workflowId as string);
        } else {
          return await createWorkflow(req, res);
        }

      case 'PUT':
        if (workflowId) {
          return await updateWorkflow(req, res, workflowId as string);
        }
        break;

      case 'DELETE':
        if (workflowId) {
          return await archiveWorkflow(req, res, workflowId as string);
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }

    return res.status(400).json({ error: 'Invalid request' });
  } catch (error) {
    console.error('Partner Integration API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Create new partner integration workflow
 */
async function createWorkflow(req: PartnerIntegrationRequest, res: NextApiResponse) {
  const { partnerProfile } = req.body;

  if (!partnerProfile) {
    return res.status(400).json({ error: 'Partner profile is required' });
  }

  try {
    // Validate partner profile
    const validationResult = validatePartnerProfile(partnerProfile);
    if (!validationResult.valid) {
      return res.status(400).json({ 
        error: 'Invalid partner profile',
        issues: validationResult.issues
      });
    }

    // Generate workflow
    const generator = PartnerIntegrationGenerator.getInstance();
    const workflow = generator.generateWorkflow(partnerProfile);

    // Store in database
    const { data: dbWorkflow, error: dbError } = await supabase
      .from('partner_workflows')
      .insert({
        id: workflow.id,
        partner_profile: workflow.partnerProfile,
        checklist: workflow.checklist,
        timeline: workflow.timeline,
        milestones: workflow.milestones,
        risk_assessment: workflow.riskAssessment,
        success_criteria: workflow.successCriteria,
        contact_points: workflow.contactPoints,
        completion_percentage: workflow.completionPercentage,
        estimated_completion_date: workflow.estimatedCompletionDate,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to create workflow' });
    }

    // Log activity
    await logWorkflowActivity(workflow.id, 'workflow_created', {
      partnerName: partnerProfile.name,
      partnerType: partnerProfile.type
    });

    return res.status(201).json({
      success: true,
      workflow,
      message: `Integration workflow created for ${partnerProfile.name}`
    });
  } catch (error) {
    console.error('Create workflow error:', error);
    return res.status(500).json({ 
      error: 'Failed to create workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * List all partner integration workflows
 */
async function listWorkflows(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { status = 'active', page = 1, limit = 50 } = req.query;

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let query = supabase
      .from('partner_workflows')
      .select(`
        id,
        partner_profile,
        completion_percentage,
        estimated_completion_date,
        status,
        created_at,
        updated_at
      `)
      .order('updated_at', { ascending: false });

    if (status !== 'all') {
      query = query.eq('status', status);
    }

    const { data: workflows, error: dbError, count } = await query
      .range(offset, offset + parseInt(limit as string) - 1);

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to fetch workflows' });
    }

    return res.status(200).json({
      workflows: workflows || [],
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: count || 0,
        totalPages: Math.ceil((count || 0) / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('List workflows error:', error);
    return res.status(500).json({ 
      error: 'Failed to list workflows',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Get specific workflow by ID
 */
async function getWorkflow(req: NextApiRequest, res: NextApiResponse, workflowId: string) {
  try {
    const { data: workflow, error: dbError } = await supabase
      .from('partner_workflows')
      .select('*')
      .eq('id', workflowId)
      .single();

    if (dbError || !workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    return res.status(200).json({ workflow });
  } catch (error) {
    console.error('Get workflow error:', error);
    return res.status(500).json({ 
      error: 'Failed to get workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Update workflow item status
 */
async function updateWorkflowItem(req: PartnerIntegrationRequest, res: NextApiResponse, workflowId: string) {
  const { itemId, status } = req.body;

  if (!itemId || !status) {
    return res.status(400).json({ error: 'Item ID and status are required' });
  }

  try {
    // Get current workflow
    const { data: workflow, error: fetchError } = await supabase
      .from('partner_workflows')
      .select('*')
      .eq('id', workflowId)
      .single();

    if (fetchError || !workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Update item status
    const generator = PartnerIntegrationGenerator.getInstance();
    const validStatuses = ['pending', 'in-progress', 'completed', 'blocked', 'skipped'] as const;
    if (!validStatuses.includes(status as any)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const success = generator.updateItemStatus(workflowId, itemId, status as any);

    if (!success) {
      return res.status(400).json({ error: 'Failed to update item status' });
    }

    // Get updated workflow
    const updatedWorkflow = generator.getWorkflow(workflowId);
    if (!updatedWorkflow) {
      return res.status(500).json({ error: 'Failed to retrieve updated workflow' });
    }

    // Update database
    const { error: updateError } = await supabase
      .from('partner_workflows')
      .update({
        checklist: updatedWorkflow.checklist,
        completion_percentage: updatedWorkflow.completionPercentage,
        updated_at: new Date().toISOString()
      })
      .eq('id', workflowId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return res.status(500).json({ error: 'Failed to update workflow in database' });
    }

    // Log activity
    const item = updatedWorkflow.checklist.find(item => item.id === itemId);
    await logWorkflowActivity(workflowId, 'item_status_updated', {
      itemId,
      itemTitle: item?.title,
      newStatus: status,
      completionPercentage: updatedWorkflow.completionPercentage
    });

    return res.status(200).json({
      success: true,
      workflow: updatedWorkflow,
      message: `Updated ${item?.title} to ${status}`
    });
  } catch (error) {
    console.error('Update workflow item error:', error);
    return res.status(500).json({ 
      error: 'Failed to update workflow item',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Handle workflow actions (validate, export, automate)
 */
async function handleWorkflowAction(req: PartnerIntegrationRequest, res: NextApiResponse, workflowId: string, action: string) {
  const generator = PartnerIntegrationGenerator.getInstance();

  try {
    switch (action) {
      case 'validate':
        return await validateWorkflow(req, res, workflowId, generator);
      
      case 'export':
        return await exportWorkflow(req, res, workflowId, generator);
      
      case 'automate':
        return await runAutomatedChecks(req, res, workflowId, generator);
      
      case 'report':
        return await generateProgressReport(req, res, workflowId, generator);
      
      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (error) {
    console.error(`Workflow action ${action} error:`, error);
    return res.status(500).json({ 
      error: `Failed to execute ${action}`,
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Validate workflow compliance and integrity
 */
async function validateWorkflow(req: NextApiRequest, res: NextApiResponse, workflowId: string, generator: PartnerIntegrationGenerator) {
  const validationResult = generator.validateCompliance(workflowId);
  
  // Log validation activity
  await logWorkflowActivity(workflowId, 'workflow_validated', {
    validationResult,
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    workflowId,
    validation: validationResult,
    message: validationResult.valid ? 'Workflow validation passed' : 'Workflow validation failed'
  });
}

/**
 * Export workflow in requested format
 */
async function exportWorkflow(req: NextApiRequest, res: NextApiResponse, workflowId: string, generator: PartnerIntegrationGenerator) {
  const { format = 'pdf' } = req.query;

  let exportContent: string;
  let contentType: string;
  let filename: string;

  switch (format) {
    case 'pdf':
      exportContent = generator.exportToPDF(workflowId);
      contentType = 'application/pdf';
      filename = `workflow-${workflowId}.pdf`;
      break;
    
    case 'excel':
      exportContent = generator.exportToExcel(workflowId);
      contentType = 'text/csv';
      filename = `workflow-${workflowId}.csv`;
      break;
    
    case 'json': {
      const workflow = generator.getWorkflow(workflowId);
      exportContent = JSON.stringify(workflow, null, 2);
      contentType = 'application/json';
      filename = `workflow-${workflowId}.json`;
      break;
    }
    
    default:
      return res.status(400).json({ error: 'Invalid export format. Supported: pdf, excel, json' });
  }

  // Log export activity
  await logWorkflowActivity(workflowId, 'workflow_exported', {
    format,
    timestamp: new Date().toISOString()
  });

  // Set headers for file download
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  
  return res.status(200).send(exportContent);
}

/**
 * Run automated compliance and technical checks
 */
async function runAutomatedChecks(req: NextApiRequest, res: NextApiResponse, workflowId: string, generator: PartnerIntegrationGenerator) {
  try {
    const results = await generator.runAutomatedChecks(workflowId);
    
    // Update database with results
    const { error: updateError } = await supabase
      .from('partner_workflows')
      .update({
        updated_at: new Date().toISOString()
      })
      .eq('id', workflowId);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    // Log automation activity
    await logWorkflowActivity(workflowId, 'automated_checks_run', {
      results,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      workflowId,
      automationResults: results,
      message: `Automated checks completed: ${results.passed} passed, ${results.failed} failed`
    });
  } catch (error) {
    console.error('Automated checks error:', error);
    return res.status(500).json({ 
      error: 'Automated checks failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Generate comprehensive progress report
 */
async function generateProgressReport(req: NextApiRequest, res: NextApiResponse, workflowId: string, generator: PartnerIntegrationGenerator) {
  const report = generator.generateProgressReport(workflowId);
  
  // Log report generation
  await logWorkflowActivity(workflowId, 'progress_report_generated', {
    timestamp: new Date().toISOString()
  });

  return res.status(200).json({
    workflowId,
    report,
    generatedAt: new Date().toISOString()
  });
}

/**
 * Update workflow configuration
 */
async function updateWorkflow(req: PartnerIntegrationRequest, res: NextApiResponse, workflowId: string) {
  const { customizations } = req.body;

  if (!customizations) {
    return res.status(400).json({ error: 'Customizations are required' });
  }

  try {
    const generator = PartnerIntegrationGenerator.getInstance();
    const success = generator.customizeWorkflow(workflowId, customizations);

    if (!success) {
      return res.status(404).json({ error: 'Workflow not found or update failed' });
    }

    const updatedWorkflow = generator.getWorkflow(workflowId);

    // Update database
    const { error: updateError } = await supabase
      .from('partner_workflows')
      .update({
        checklist: updatedWorkflow?.checklist,
        timeline: updatedWorkflow?.timeline,
        updated_at: new Date().toISOString()
      })
      .eq('id', workflowId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return res.status(500).json({ error: 'Failed to update workflow in database' });
    }

    // Log activity
    await logWorkflowActivity(workflowId, 'workflow_customized', {
      customizations,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      workflow: updatedWorkflow,
      message: 'Workflow updated successfully'
    });
  } catch (error) {
    console.error('Update workflow error:', error);
    return res.status(500).json({ 
      error: 'Failed to update workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Archive workflow (soft delete)
 */
async function archiveWorkflow(req: NextApiRequest, res: NextApiResponse, workflowId: string) {
  try {
    const { error: updateError } = await supabase
      .from('partner_workflows')
      .update({
        status: 'archived',
        archived_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', workflowId);

    if (updateError) {
      console.error('Database update error:', updateError);
      return res.status(500).json({ error: 'Failed to archive workflow' });
    }

    // Log activity
    await logWorkflowActivity(workflowId, 'workflow_archived', {
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Workflow archived successfully'
    });
  } catch (error) {
    console.error('Archive workflow error:', error);
    return res.status(500).json({ 
      error: 'Failed to archive workflow',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Validate partner profile data
 */
function validatePartnerProfile(profile: PartnerProfile): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!profile.name || profile.name.trim().length === 0) {
    issues.push('Partner name is required');
  }

  if (!profile.type) {
    issues.push('Partner type is required');
  }

  if (!profile.region) {
    issues.push('Partner region is required');
  }

  if (!profile.size) {
    issues.push('Partner size is required');
  }

  const validTypes = ['advertiser', 'publisher', 'agency', 'technology', 'data', 'analytics'];
  if (profile.type && !validTypes.includes(profile.type)) {
    issues.push(`Invalid partner type. Valid options: ${validTypes.join(', ')}`);
  }

  const validRegions = ['global', 'americas', 'europe', 'africa', 'asia', 'middle-east'];
  if (profile.region && !validRegions.includes(profile.region)) {
    issues.push(`Invalid region. Valid options: ${validRegions.join(', ')}`);
  }

  const validSizes = ['startup', 'small', 'medium', 'enterprise', 'fortune500'];
  if (profile.size && !validSizes.includes(profile.size)) {
    issues.push(`Invalid size. Valid options: ${validSizes.join(', ')}`);
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Log workflow activity for audit and analytics
 */
async function logWorkflowActivity(workflowId: string, activityType: string, metadata: any) {
  try {
    await supabase
      .from('partner_workflow_activities')
      .insert({
        workflow_id: workflowId,
        activity_type: activityType,
        metadata,
        created_at: new Date().toISOString()
      });
  } catch (error) {
    console.error('Activity logging error:', error);
    // Don't throw - logging should not break main functionality
  }
}