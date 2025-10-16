-- AdGo Platform - Daily Reports Database Schema
-- Copyright (c) 2025 AdGo Solutions Limited.
-- SQL migration for daily reports functionality

-- Create daily_reports table for tracking generated reports
CREATE TABLE IF NOT EXISTS daily_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    report_date DATE NOT NULL,
    csv_url TEXT,
    pdf_url TEXT,
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one report per partner per date
    UNIQUE(partner_id, report_date)
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_daily_reports_partner_date ON daily_reports(partner_id, report_date);
CREATE INDEX IF NOT EXISTS idx_daily_reports_date ON daily_reports(report_date);

-- Add RLS (Row Level Security)
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;

-- Policy: Partners can only see their own reports
CREATE POLICY "Partners can view own reports" ON daily_reports
    FOR SELECT USING (
        partner_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'super_admin')
        )
    );

-- Policy: Only system can insert reports (service role)
CREATE POLICY "System can insert reports" ON daily_reports
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Policy: System can update reports (service role)
CREATE POLICY "System can update reports" ON daily_reports
    FOR UPDATE USING (auth.role() = 'service_role');

-- Create reports storage bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('reports', 'reports', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Public read access to reports
CREATE POLICY IF NOT EXISTS "Public read access for reports" ON storage.objects
    FOR SELECT USING (bucket_id = 'reports');

-- Policy: Service role can upload reports
CREATE POLICY IF NOT EXISTS "Service role can upload reports" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'reports' AND 
        auth.role() = 'service_role'
    );

-- Create report_generation_log table for monitoring
CREATE TABLE IF NOT EXISTS report_generation_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_date DATE NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL CHECK (status IN ('running', 'completed', 'failed')),
    partners_processed INTEGER DEFAULT 0,
    reports_generated INTEGER DEFAULT 0,
    emails_sent INTEGER DEFAULT 0,
    error_message TEXT,
    execution_time_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for monitoring queries
CREATE INDEX IF NOT EXISTS idx_report_log_date_status ON report_generation_log(execution_date, status);

-- Add updated_at trigger for daily_reports
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_daily_reports_updated_at 
    BEFORE UPDATE ON daily_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE daily_reports IS 'Stores information about generated daily KPI reports for partners';
COMMENT ON COLUMN daily_reports.partner_id IS 'Reference to the partner profile';
COMMENT ON COLUMN daily_reports.report_date IS 'Date the report covers (previous day)';
COMMENT ON COLUMN daily_reports.csv_url IS 'Public URL to the CSV report file';
COMMENT ON COLUMN daily_reports.pdf_url IS 'Public URL to the PDF report file';
COMMENT ON COLUMN daily_reports.email_sent IS 'Whether the report email has been sent';

COMMENT ON TABLE report_generation_log IS 'Logs each execution of the daily report generation process';
COMMENT ON COLUMN report_generation_log.execution_date IS 'Date when the report generation ran';
COMMENT ON COLUMN report_generation_log.status IS 'Status of the report generation process';
COMMENT ON COLUMN report_generation_log.execution_time_seconds IS 'Total time taken to generate all reports';