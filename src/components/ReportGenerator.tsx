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
 * Generated: 2025-10-15 04:38:35 UTC
 */

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FileText, Download, Calendar as CalendarIcon, Clock, BarChart3, Users, Target, Play } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Report {
  id: string;
  name: string;
  type: 'performance' | 'analytics' | 'campaign' | 'audience';
  status: 'pending' | 'generating' | 'completed' | 'failed';
  is_scheduled: boolean;
  schedule_cron?: string;
  file_url?: string;
  created_at: string;
}

const reportTypes = [
  { value: 'performance', label: 'Performance Report', icon: BarChart3 },
  { value: 'analytics', label: 'Analytics Report', icon: BarChart3 },
  { value: 'campaign', label: 'Campaign Report', icon: Target },
  { value: 'audience', label: 'Audience Report', icon: Users },
];

const scheduleOptions = [
  { value: '0 9 * * 1', label: 'Weekly (Mondays at 9 AM)' },
  { value: '0 9 1 * *', label: 'Monthly (1st day at 9 AM)' },
  { value: '0 9 * * *', label: 'Daily (9 AM)' },
  { value: '0 9 1 1,4,7,10 *', label: 'Quarterly' },
];

const ReportGenerator = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  
  // Form state
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isScheduled, setIsScheduled] = useState(false);
  const [schedulePattern, setSchedulePattern] = useState('');

  useEffect(() => {
    fetchReports();
  }, [user]);

  const fetchReports = async () => {
    if (!user) return;

    // Demo data for reports
    const demoReports: Report[] = [
      {
        id: '1',
        name: 'Monthly Performance Report',
        type: 'performance',
        status: 'completed',
        is_scheduled: true,
        schedule_cron: '0 9 1 * *',
        file_url: '#',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Campaign Analytics Q4',
        type: 'campaign',
        status: 'generating',
        is_scheduled: false,
        created_at: new Date().toISOString(),
      },
      {
        id: '3',
        name: 'Audience Insights Report',
        type: 'audience',
        status: 'pending',
        is_scheduled: false,
        created_at: new Date().toISOString(),
      },
    ];
    
    setReports(demoReports);
  };

  const generateReport = async () => {
    if (!reportName || !reportType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      // Demo implementation
      toast.success(`Report "${reportName}" generation started`);
      setIsDialogOpen(false);
      resetForm();
      await fetchReports();
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (reportId: string, reportName: string) => {
    try {
      // Demo implementation
      toast.success(`Downloading "${reportName}"`);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  const resetForm = () => {
    setReportName('');
    setReportType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setIsScheduled(false);
    setSchedulePattern('');
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'generating': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-500/10 text-red-700 border-red-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Report Generator</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Generate New Report</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Report Name</label>
                  <Input
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Start Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {startDate ? format(startDate, 'PPP') : 'Pick date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">End Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {endDate ? format(endDate, 'PPP') : 'Pick date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <Button onClick={generateReport} disabled={loading} className="w-full">
                  {loading ? 'Generating...' : 'Generate Report'}
                </Button>
              </TabsContent>
              
              <TabsContent value="schedule" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Report Name</label>
                  <Input
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Schedule Pattern</label>
                  <Select value={schedulePattern} onValueChange={setSchedulePattern}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={() => {
                    setIsScheduled(true);
                    generateReport();
                  }} 
                  disabled={loading} 
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {reports.map((report) => {
          const ReportIcon = reportTypes.find(t => t.value === report.type)?.icon || FileText;
          
          return (
            <Card key={report.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ReportIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {reportTypes.find(t => t.value === report.type)?.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Created: {format(new Date(report.created_at), 'PPP')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.toUpperCase()}
                    </Badge>
                    {report.is_scheduled && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
                        <Clock className="w-3 h-3 mr-1" />
                        Scheduled
                      </Badge>
                    )}
                    {report.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadReport(report.id, report.name)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {reports.length === 0 && (
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No reports generated yet</h3>
            <p className="text-muted-foreground mb-4">
              Generate your first report to get insights into your advertising performance.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Generate First Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportGenerator;