-- AdGo Platform - Partner Integration Database Schema
-- Comprehensive database structure for partner integration workflows

-- Partner Workflows table
CREATE TABLE IF NOT EXISTS partner_workflows (
    id TEXT PRIMARY KEY,
    partner_profile JSONB NOT NULL,
    checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    timeline JSONB,
    milestones JSONB DEFAULT '[]'::jsonb,
    risk_assessment JSONB,
    success_criteria JSONB DEFAULT '[]'::jsonb,
    contact_points JSONB DEFAULT '[]'::jsonb,
    completion_percentage DECIMAL(5,2) DEFAULT 0.00,
    estimated_completion_date DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'archived', 'cancelled')),
    priority TEXT DEFAULT 'standard' CHECK (priority IN ('low', 'standard', 'high', 'critical')),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    archived_at TIMESTAMPTZ,
    
    -- Indexes for performance
    CONSTRAINT valid_completion_percentage CHECK (completion_percentage >= 0 AND completion_percentage <= 100)
);

-- Partner Workflow Activities table for audit trail
CREATE TABLE IF NOT EXISTS partner_workflow_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES partner_workflows(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Activity types: workflow_created, item_status_updated, workflow_validated, 
    -- workflow_exported, automated_checks_run, progress_report_generated, etc.
    CONSTRAINT valid_activity_type CHECK (activity_type IN (
        'workflow_created', 'workflow_updated', 'workflow_archived', 'workflow_completed',
        'item_status_updated', 'item_added', 'item_removed', 'item_modified',
        'workflow_validated', 'workflow_exported', 'automated_checks_run',
        'progress_report_generated', 'milestone_reached', 'deadline_missed',
        'notification_sent', 'comment_added', 'file_uploaded', 'integration_tested'
    ))
);

-- Partner Integration Templates table
CREATE TABLE IF NOT EXISTS partner_integration_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    template_type TEXT NOT NULL CHECK (template_type IN ('technical', 'compliance', 'business', 'security', 'custom')),
    checklist_items JSONB NOT NULL DEFAULT '[]'::jsonb,
    default_timeline JSONB,
    target_regions TEXT[] DEFAULT ARRAY[]::TEXT[],
    target_partner_types TEXT[] DEFAULT ARRAY[]::TEXT[],
    complexity_level TEXT DEFAULT 'medium' CHECK (complexity_level IN ('low', 'medium', 'high')),
    is_active BOOLEAN DEFAULT true,
    version INTEGER DEFAULT 1,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner Integration Documents table
CREATE TABLE IF NOT EXISTS partner_integration_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES partner_workflows(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN (
        'contract', 'dpa', 'sla', 'technical_spec', 'test_report', 
        'compliance_certificate', 'onboarding_guide', 'api_documentation'
    )),
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT,
    file_size INTEGER,
    file_type TEXT,
    upload_status TEXT DEFAULT 'pending' CHECK (upload_status IN ('pending', 'processing', 'completed', 'failed')),
    is_required BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner Integration Notifications table
CREATE TABLE IF NOT EXISTS partner_integration_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES partner_workflows(id) ON DELETE CASCADE,
    notification_type TEXT NOT NULL CHECK (notification_type IN (
        'milestone_reached', 'deadline_approaching', 'item_completed', 'item_blocked',
        'workflow_completed', 'validation_failed', 'document_required', 'escalation'
    )),
    recipient_type TEXT NOT NULL CHECK (recipient_type IN ('partner', 'internal', 'both')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    channel TEXT NOT NULL CHECK (channel IN ('email', 'slack', 'teams', 'in_app', 'sms')),
    recipient_email TEXT,
    webhook_url TEXT,
    send_status TEXT DEFAULT 'pending' CHECK (send_status IN ('pending', 'sent', 'failed', 'cancelled')),
    scheduled_for TIMESTAMPTZ DEFAULT NOW(),
    sent_at TIMESTAMPTZ,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner Integration Comments table
CREATE TABLE IF NOT EXISTS partner_integration_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES partner_workflows(id) ON DELETE CASCADE,
    checklist_item_id TEXT,
    comment_text TEXT NOT NULL,
    comment_type TEXT DEFAULT 'general' CHECK (comment_type IN ('general', 'question', 'issue', 'resolution', 'note')),
    is_internal BOOLEAN DEFAULT false,
    is_resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES auth.users(id),
    resolved_at TIMESTAMPTZ,
    attachments JSONB DEFAULT '[]'::jsonb,
    mentioned_users UUID[] DEFAULT ARRAY[]::UUID[],
    parent_comment_id UUID REFERENCES partner_integration_comments(id),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partner Integration Metrics table
CREATE TABLE IF NOT EXISTS partner_integration_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id TEXT NOT NULL REFERENCES partner_workflows(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(15,4) NOT NULL,
    metric_unit TEXT DEFAULT 'count',
    metric_category TEXT DEFAULT 'general' CHECK (metric_category IN (
        'progress', 'performance', 'quality', 'timeline', 'compliance', 'engagement'
    )),
    measurement_date DATE DEFAULT CURRENT_DATE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Ensure uniqueness per workflow per metric per date
    UNIQUE(workflow_id, metric_name, measurement_date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partner_workflows_status ON partner_workflows(status);
CREATE INDEX IF NOT EXISTS idx_partner_workflows_priority ON partner_workflows(priority);
CREATE INDEX IF NOT EXISTS idx_partner_workflows_created_at ON partner_workflows(created_at);
CREATE INDEX IF NOT EXISTS idx_partner_workflows_completion ON partner_workflows(completion_percentage);

-- Partner profile indexes (GIN for JSONB)
CREATE INDEX IF NOT EXISTS idx_partner_workflows_profile_name ON partner_workflows USING GIN ((partner_profile->>'name'));
CREATE INDEX IF NOT EXISTS idx_partner_workflows_profile_type ON partner_workflows USING GIN ((partner_profile->>'type'));
CREATE INDEX IF NOT EXISTS idx_partner_workflows_profile_region ON partner_workflows USING GIN ((partner_profile->>'region'));

CREATE INDEX IF NOT EXISTS idx_workflow_activities_workflow_id ON partner_workflow_activities(workflow_id);
CREATE INDEX IF NOT EXISTS idx_workflow_activities_type ON partner_workflow_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_workflow_activities_created_at ON partner_workflow_activities(created_at);

CREATE INDEX IF NOT EXISTS idx_integration_templates_type ON partner_integration_templates(template_type);
CREATE INDEX IF NOT EXISTS idx_integration_templates_active ON partner_integration_templates(is_active);

CREATE INDEX IF NOT EXISTS idx_integration_documents_workflow_id ON partner_integration_documents(workflow_id);
CREATE INDEX IF NOT EXISTS idx_integration_documents_type ON partner_integration_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_integration_documents_status ON partner_integration_documents(upload_status);

CREATE INDEX IF NOT EXISTS idx_integration_notifications_workflow_id ON partner_integration_notifications(workflow_id);
CREATE INDEX IF NOT EXISTS idx_integration_notifications_status ON partner_integration_notifications(send_status);
CREATE INDEX IF NOT EXISTS idx_integration_notifications_scheduled ON partner_integration_notifications(scheduled_for);

CREATE INDEX IF NOT EXISTS idx_integration_comments_workflow_id ON partner_integration_comments(workflow_id);
CREATE INDEX IF NOT EXISTS idx_integration_comments_item_id ON partner_integration_comments(checklist_item_id);
CREATE INDEX IF NOT EXISTS idx_integration_comments_created_at ON partner_integration_comments(created_at);

CREATE INDEX IF NOT EXISTS idx_integration_metrics_workflow_id ON partner_integration_metrics(workflow_id);
CREATE INDEX IF NOT EXISTS idx_integration_metrics_name ON partner_integration_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_integration_metrics_date ON partner_integration_metrics(measurement_date);

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE partner_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_workflow_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integration_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integration_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integration_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integration_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integration_metrics ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies for authenticated users
-- Note: In production, you would want more granular policies based on roles and permissions

CREATE POLICY "Authenticated users can read partner workflows" ON partner_workflows
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert partner workflows" ON partner_workflows
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update partner workflows" ON partner_workflows
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read workflow activities" ON partner_workflow_activities
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert workflow activities" ON partner_workflow_activities
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read templates" ON partner_integration_templates
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read documents" ON partner_integration_documents
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert documents" ON partner_integration_documents
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read notifications" ON partner_integration_notifications
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert notifications" ON partner_integration_notifications
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read comments" ON partner_integration_comments
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert comments" ON partner_integration_comments
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read metrics" ON partner_integration_metrics
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert metrics" ON partner_integration_metrics
    FOR INSERT TO authenticated WITH CHECK (true);

-- Functions for automated workflow management

-- Function to update workflow completion percentage
CREATE OR REPLACE FUNCTION update_workflow_completion()
RETURNS TRIGGER AS $$
DECLARE
    total_items INTEGER;
    completed_items INTEGER;
    new_percentage DECIMAL(5,2);
BEGIN
    -- Count total and completed items in the checklist
    SELECT 
        jsonb_array_length(NEW.checklist),
        (SELECT COUNT(*) FROM jsonb_array_elements(NEW.checklist) AS item WHERE item->>'status' = 'completed')
    INTO total_items, completed_items;
    
    -- Calculate new percentage
    IF total_items > 0 THEN
        new_percentage := (completed_items::DECIMAL / total_items::DECIMAL) * 100;
    ELSE
        new_percentage := 0;
    END IF;
    
    -- Update the completion percentage
    NEW.completion_percentage := new_percentage;
    NEW.updated_at := NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update completion percentage
CREATE TRIGGER trigger_update_workflow_completion
    BEFORE UPDATE OF checklist ON partner_workflows
    FOR EACH ROW
    EXECUTE FUNCTION update_workflow_completion();

-- Function to log workflow changes
CREATE OR REPLACE FUNCTION log_workflow_changes()
RETURNS TRIGGER AS $$
BEGIN
    -- Log significant changes
    IF TG_OP = 'INSERT' THEN
        INSERT INTO partner_workflow_activities (workflow_id, activity_type, description, metadata)
        VALUES (NEW.id, 'workflow_created', 'New partner integration workflow created', 
                jsonb_build_object('partner_name', NEW.partner_profile->>'name', 'partner_type', NEW.partner_profile->>'type'));
    ELSIF TG_OP = 'UPDATE' THEN
        -- Log completion percentage changes
        IF OLD.completion_percentage != NEW.completion_percentage THEN
            INSERT INTO partner_workflow_activities (workflow_id, activity_type, description, metadata)
            VALUES (NEW.id, 'progress_updated', 'Workflow progress updated', 
                    jsonb_build_object('old_percentage', OLD.completion_percentage, 'new_percentage', NEW.completion_percentage));
        END IF;
        
        -- Log status changes
        IF OLD.status != NEW.status THEN
            INSERT INTO partner_workflow_activities (workflow_id, activity_type, description, metadata)
            VALUES (NEW.id, 'status_changed', 'Workflow status changed', 
                    jsonb_build_object('old_status', OLD.status, 'new_status', NEW.status));
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger to log workflow changes
CREATE TRIGGER trigger_log_workflow_changes
    AFTER INSERT OR UPDATE ON partner_workflows
    FOR EACH ROW
    EXECUTE FUNCTION log_workflow_changes();

-- Function to calculate average completion time
CREATE OR REPLACE FUNCTION calculate_average_completion_time(partner_type_filter TEXT DEFAULT NULL)
RETURNS INTERVAL AS $$
DECLARE
    avg_days DECIMAL;
BEGIN
    SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))/86400)
    INTO avg_days
    FROM partner_workflows
    WHERE status = 'completed'
    AND (partner_type_filter IS NULL OR partner_profile->>'type' = partner_type_filter);
    
    RETURN MAKE_INTERVAL(days => COALESCE(avg_days, 0));
END;
$$ LANGUAGE plpgsql;

-- Function to get workflow analytics
CREATE OR REPLACE FUNCTION get_workflow_analytics(
    start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
    end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE(
    total_workflows INTEGER,
    completed_workflows INTEGER,
    average_completion_percentage DECIMAL,
    average_completion_days DECIMAL,
    workflows_by_status JSONB,
    workflows_by_type JSONB,
    workflows_by_region JSONB
) AS $$
BEGIN
    RETURN QUERY
    WITH workflow_stats AS (
        SELECT 
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE status = 'completed') as completed,
            AVG(completion_percentage) as avg_completion,
            AVG(EXTRACT(EPOCH FROM (COALESCE(updated_at, NOW()) - created_at))/86400) as avg_days,
            jsonb_object_agg(status, COUNT(*)) as status_breakdown,
            jsonb_object_agg(partner_profile->>'type', COUNT(*)) as type_breakdown,
            jsonb_object_agg(partner_profile->>'region', COUNT(*)) as region_breakdown
        FROM partner_workflows
        WHERE created_at::date BETWEEN start_date AND end_date
    )
    SELECT 
        total::INTEGER,
        completed::INTEGER,
        ROUND(avg_completion, 2),
        ROUND(avg_days, 2),
        status_breakdown,
        type_breakdown,
        region_breakdown
    FROM workflow_stats;
END;
$$ LANGUAGE plpgsql;

-- Insert default templates
INSERT INTO partner_integration_templates (name, description, template_type, checklist_items, target_partner_types) VALUES
(
    'Standard Technical Integration',
    'Basic technical integration checklist for most partners',
    'technical',
    '[
        {
            "id": "sdk-setup",
            "title": "SDK Installation and Setup",
            "category": "technical",
            "priority": "critical",
            "estimatedTime": "2-4 hours",
            "description": "Install and configure AdGo SDK in partner environment",
            "resources": [
                {"type": "documentation", "title": "SDK Installation Guide", "url": "/docs/sdk/installation"},
                {"type": "sdk", "title": "JavaScript SDK Package", "url": "https://www.npmjs.com/package/@adgo/sdk"}
            ],
            "validationCriteria": ["SDK successfully installed", "Basic initialization working", "License key authenticated"]
        },
        {
            "id": "api-integration",
            "title": "API Integration Testing", 
            "category": "technical",
            "priority": "high",
            "estimatedTime": "4-6 hours",
            "description": "Test core API endpoints and error handling",
            "resources": [
                {"type": "api", "title": "API Reference", "url": "/docs/api/overview"}
            ],
            "validationCriteria": ["Ad fetch requests working", "Impression tracking functional", "Click tracking working"]
        }
    ]'::jsonb,
    ARRAY['advertiser', 'publisher', 'agency', 'technology']
),
(
    'GDPR Compliance Workflow',
    'Compliance checklist for EU/GDPR requirements',
    'compliance', 
    '[
        {
            "id": "dpa-review",
            "title": "Data Processing Agreement Review",
            "category": "legal",
            "priority": "critical", 
            "estimatedTime": "1-2 weeks",
            "description": "Review and execute data processing agreement",
            "resources": [
                {"type": "template", "title": "Standard DPA Template", "description": "AdGo standard DPA"}
            ],
            "validationCriteria": ["DPA reviewed by legal", "Amendments negotiated", "Signed DPA received"]
        },
        {
            "id": "consent-management",
            "title": "Consent Management Implementation",
            "category": "compliance",
            "priority": "high",
            "estimatedTime": "3-5 days", 
            "description": "Implement GDPR consent mechanisms",
            "validationCriteria": ["Consent management working", "Data retention configured", "Erasure mechanism in place"]
        }
    ]'::jsonb,
    ARRAY['advertiser', 'publisher', 'agency']
),
(
    'Enterprise Security Review',
    'Security assessment for enterprise partners',
    'security',
    '[
        {
            "id": "security-assessment",
            "title": "Comprehensive Security Assessment",
            "category": "security",
            "priority": "critical",
            "estimatedTime": "1-2 weeks",
            "description": "Conduct security review and penetration testing",
            "validationCriteria": ["Security assessment passed", "Penetration testing completed", "Vulnerabilities remediated"]
        }
    ]'::jsonb,
    ARRAY['enterprise', 'fortune500']
) ON CONFLICT (name) DO NOTHING;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated, anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Create a view for workflow summary
CREATE OR REPLACE VIEW partner_workflow_summary AS
SELECT 
    pw.id,
    pw.partner_profile->>'name' as partner_name,
    pw.partner_profile->>'type' as partner_type,
    pw.partner_profile->>'region' as partner_region,
    pw.status,
    pw.priority,
    pw.completion_percentage,
    pw.estimated_completion_date,
    jsonb_array_length(pw.checklist) as total_items,
    (SELECT COUNT(*) FROM jsonb_array_elements(pw.checklist) AS item WHERE item->>'status' = 'completed') as completed_items,
    (SELECT COUNT(*) FROM jsonb_array_elements(pw.checklist) AS item WHERE item->>'status' = 'blocked') as blocked_items,
    pw.created_at,
    pw.updated_at,
    (SELECT COUNT(*) FROM partner_workflow_activities pwa WHERE pwa.workflow_id = pw.id) as activity_count
FROM partner_workflows pw
WHERE pw.status != 'archived';

COMMENT ON VIEW partner_workflow_summary IS 'Simplified view of partner workflows with key metrics';

-- Final verification
DO $$
BEGIN
    RAISE NOTICE 'AdGo Partner Integration database schema created successfully!';
    RAISE NOTICE 'Tables created: partner_workflows, partner_workflow_activities, partner_integration_templates';
    RAISE NOTICE 'Additional tables: partner_integration_documents, partner_integration_notifications';
    RAISE NOTICE 'Support tables: partner_integration_comments, partner_integration_metrics';
    RAISE NOTICE 'Indexes, triggers, and RLS policies configured';
    RAISE NOTICE 'Default templates inserted for technical, compliance, and security workflows';
END $$;