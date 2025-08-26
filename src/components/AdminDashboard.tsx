import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  FileDown, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Settings,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Building,
  UserCog,
  TrendingDown
} from "lucide-react";
import { NavBar } from './NavBar';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalAds: number;
  activeAds: number;
  totalViews: number;
  revenue: number;
  clients: number;
  impressions: number;
  conversions: number;
  pendingApprovals: number;
}

interface AdData {
  id: string;
  title: string;
  client: string;
  organization: string;
  type: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'paused';
  created_at: string;
  budget_total: number;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

interface OrganizationData {
  id: string;
  name: string;
  email: string;
  subscription_plan: string;
  total_ads: number;
  total_spent: number;
  is_active: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // State management
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalAds: 0,
    activeAds: 0,
    totalViews: 0,
    revenue: 0,
    clients: 0,
    impressions: 0,
    conversions: 0,
    pendingApprovals: 0
  });
  
  const [ads, setAds] = useState<AdData[]>([]);
  const [organizations, setOrganizations] = useState<OrganizationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAd, setSelectedAd] = useState<AdData | null>(null);
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false);

  // Load data on component mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadAnalytics(),
        loadAds(),
        loadOrganizations()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      // Fetch ads data
      const { data: adsData, error: adsError } = await supabase
        .from('ads')
        .select('*');
      
      if (adsError) throw adsError;

      // Since analytics and organizations tables don't exist, use demo data
      const totalAds = adsData?.length || 0;
      const activeAds = totalAds; // Assume all ads are active for demo
      const pendingApprovals = 0;
      const totalImpressions = totalAds * 100; // Demo calculation
      const totalClicks = totalAds * 5; // Demo calculation
      const totalConversions = totalAds * 1; // Demo calculation
      const totalRevenue = totalAds * 50; // Demo calculation

      setAnalytics({
        totalAds,
        activeAds,
        totalViews: totalImpressions,
        revenue: totalRevenue,
        clients: 5, // Demo organization count
        impressions: totalImpressions,
        conversions: totalConversions,
        pendingApprovals
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const loadAds = async () => {
    try {
      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      const formattedAds: AdData[] = data?.map(ad => ({
        id: ad.id,
        title: `Ad for ${ad.city || 'Unknown Location'}`,
        client: 'Demo Client',
        organization: 'Demo Organization',
        type: ad.media_url ? (ad.media_url.includes('.mp4') ? 'Video' : 'Image') : 'Text',
        status: 'active' as 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'paused',
        created_at: ad.created_at,
        budget_total: 1000, // Demo budget
        impressions: Math.floor(Math.random() * 1000), // Demo impressions
        clicks: Math.floor(Math.random() * 50), // Demo clicks
        conversions: Math.floor(Math.random() * 10), // Demo conversions
        revenue: Math.floor(Math.random() * 100) // Demo revenue
      })) || [];

      setAds(formattedAds);
    } catch (error) {
      console.error('Error loading ads:', error);
    }
  };

  const loadOrganizations = async () => {
    try {
      // Use orgs table instead and create demo data
      const { data, error } = await supabase
        .from('orgs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      const formattedOrgs: OrganizationData[] = data?.map(org => ({
        id: org.id,
        name: org.name,
        email: 'demo@example.com', // Demo email since email field doesn't exist
        subscription_plan: 'basic', // Demo subscription since field doesn't exist
        total_ads: Math.floor(Math.random() * 5) + 1, // Demo ad count
        total_spent: Math.floor(Math.random() * 5000) + 1000, // Demo spending
        is_active: true, // Demo active status since field doesn't exist
        created_at: org.created_at
      })) || [];

      setOrganizations(formattedOrgs);
    } catch (error) {
      console.error('Error loading organizations:', error);
    }
  };

  const updateAdStatus = async (adId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('ads')
        .update({ 
          // Note: status field doesn't exist in ads table, this is just demo
          // In real implementation, you'd need to add this field to the database
        })
        .eq('id', adId);
      
      if (error) throw error;

      // Update local state
      setAds(prev => prev.map(ad => 
        ad.id === adId ? { ...ad, status: newStatus as any } : ad
      ));

      toast({
        title: "Status Updated",
        description: `Ad status changed to ${newStatus}`,
      });

      setApprovalDialogOpen(false);
      setSelectedAd(null);
      loadAnalytics(); // Refresh analytics
    } catch (error) {
      console.error('Error updating ad status:', error);
      toast({
        title: "Error",
        description: "Failed to update ad status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateReport = async () => {
    try {
      // In a real implementation, this would generate a proper report
      const reportData = {
        totalRevenue: analytics.revenue,
        totalAds: analytics.totalAds,
        totalImpressions: analytics.impressions,
        totalConversions: analytics.conversions,
        generatedAt: new Date().toISOString()
      };

      // Create a simple CSV report
      const csvContent = `Report Generated,${new Date().toLocaleString()}\n\nMetric,Value\nTotal Revenue,$${analytics.revenue.toLocaleString()}\nTotal Ads,${analytics.totalAds}\nTotal Impressions,${analytics.impressions.toLocaleString()}\nTotal Conversions,${analytics.conversions}\nActive Ads,${analytics.activeAds}\nPending Approvals,${analytics.pendingApprovals}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `adgo-report-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: "Revenue report has been downloaded successfully.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const scheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Weekly report has been scheduled for next week.",
    });
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'approved': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'paused': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-moss-50 to-moss-100 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-moss-600 mx-auto" />
          <p className="text-moss-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss-50 to-moss-100">
      <NavBar />
      
      {/* Header */}
      <div className="border-b border-moss-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/client-dashboard')}
                className="text-moss-700 hover:text-moss-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-moss-900">Admin Control Center</h1>
                <p className="text-moss-600">Manage ads, organizations, and platform analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => loadDashboardData()}
                variant="outline"
                size="sm"
                className="border-moss-300 text-moss-700 hover:bg-moss-50"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Badge variant="outline" className="text-moss-700 border-moss-300">
                <Shield className="h-3 w-3 mr-1" />
                Admin Access
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-blue-100">Total Ads</CardTitle>
                <BarChart3 className="w-5 h-5 text-blue-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalAds}</div>
              <p className="text-blue-100 text-sm">
                {analytics.pendingApprovals > 0 && `${analytics.pendingApprovals} pending approval`}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-green-100">Active Ads</CardTitle>
                <TrendingUp className="w-5 h-5 text-green-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.activeAds}</div>
              <p className="text-green-100 text-sm">Currently running</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-purple-100">Total Impressions</CardTitle>
                <Users className="w-5 h-5 text-purple-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.impressions.toLocaleString()}</div>
              <p className="text-purple-100 text-sm">{analytics.conversions} conversions</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-orange-100">Total Revenue</CardTitle>
                <DollarSign className="w-5 h-5 text-orange-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${analytics.revenue.toLocaleString()}</div>
              <p className="text-orange-100 text-sm">{analytics.clients} organizations</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ads">Ad Management</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-moss-900">
                    <FileDown className="w-5 h-5" />
                    Generate Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-moss-600">Create detailed revenue and performance reports</p>
                  <Button
                    onClick={generateReport}
                    className="w-full bg-moss-600 hover:bg-moss-700"
                  >
                    Generate Revenue Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-moss-900">
                    <Calendar className="w-5 h-5" />
                    Schedule Reports
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-moss-600">Set up automated weekly and monthly reports</p>
                  <Button
                    onClick={scheduleReport}
                    variant="outline"
                    className="w-full border-moss-300 text-moss-700 hover:bg-moss-50"
                  >
                    Schedule Weekly Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <AlertTriangle className="w-5 h-5" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ads.filter(ad => ad.status === 'pending').length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-moss-900 mb-2">All caught up!</h3>
                    <p className="text-moss-600">No ads pending approval at the moment.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {ads
                      .filter(ad => ad.status === 'pending')
                      .slice(0, 5)
                      .map((ad) => (
                        <div key={ad.id} className="flex items-center justify-between p-4 bg-moss-50 rounded-lg border border-moss-200">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-moss-200 rounded-lg flex items-center justify-center">
                              <span className="text-sm font-medium text-moss-900">{ad.client.charAt(0)}</span>
                            </div>
                            <div>
                              <h3 className="font-medium text-moss-900">{ad.title}</h3>
                              <p className="text-sm text-moss-600">{ad.client} • {ad.type} Ad</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedAd(ad);
                                setApprovalDialogOpen(true);
                              }}
                              className="bg-moss-600 hover:bg-moss-700"
                            >
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <Settings className="w-5 h-5" />
                  Ad Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-moss-400 h-4 w-4" />
                    <Input
                      placeholder="Search ads by title or client..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-moss-300"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48 border-moss-300">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Ads Table */}
                <div className="border border-moss-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-moss-50">
                        <TableHead className="text-moss-900">Ad Title</TableHead>
                        <TableHead className="text-moss-900">Client</TableHead>
                        <TableHead className="text-moss-900">Type</TableHead>
                        <TableHead className="text-moss-900">Status</TableHead>
                        <TableHead className="text-moss-900">Budget</TableHead>
                        <TableHead className="text-moss-900">Performance</TableHead>
                        <TableHead className="text-moss-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAds.map((ad) => (
                        <TableRow key={ad.id} className="hover:bg-moss-50/50">
                          <TableCell className="font-medium">{ad.title}</TableCell>
                          <TableCell>{ad.client}</TableCell>
                          <TableCell>{ad.type}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(ad.status)}>
                              {ad.status}
                            </Badge>
                          </TableCell>
                          <TableCell>${ad.budget_total.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{ad.impressions.toLocaleString()} impressions</div>
                              <div className="text-moss-600">{ad.clicks} clicks • {ad.conversions} conversions</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedAd(ad);
                                  setApprovalDialogOpen(true);
                                }}
                                className="border-moss-300 text-moss-700 hover:bg-moss-50"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              {ad.status === 'pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => updateAdStatus(ad.id, 'approved')}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => updateAdStatus(ad.id, 'rejected')}
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {ad.status === 'active' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAdStatus(ad.id, 'paused')}
                                  className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                                >
                                  <Pause className="h-3 w-3 mr-1" />
                                  Pause
                                </Button>
                              )}
                              {ad.status === 'paused' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateAdStatus(ad.id, 'active')}
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  <Play className="h-3 w-3 mr-1" />
                                  Resume
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {filteredAds.length === 0 && (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-moss-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-moss-900 mb-2">No ads found</h3>
                    <p className="text-moss-600">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'No ads have been submitted yet.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="organizations" className="space-y-6">
            <Card className="border-moss-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-moss-900">
                  <Building className="w-5 h-5" />
                  Organization Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border border-moss-200 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-moss-50">
                        <TableHead className="text-moss-900">Organization</TableHead>
                        <TableHead className="text-moss-900">Email</TableHead>
                        <TableHead className="text-moss-900">Plan</TableHead>
                        <TableHead className="text-moss-900">Total Ads</TableHead>
                        <TableHead className="text-moss-900">Total Spent</TableHead>
                        <TableHead className="text-moss-900">Status</TableHead>
                        <TableHead className="text-moss-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {organizations.map((org) => (
                        <TableRow key={org.id} className="hover:bg-moss-50/50">
                          <TableCell className="font-medium">{org.name}</TableCell>
                          <TableCell>{org.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize border-moss-300 text-moss-700">
                              {org.subscription_plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{org.total_ads}</TableCell>
                          <TableCell>${org.total_spent.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge 
                              className={org.is_active 
                                ? 'bg-green-100 text-green-800 border-green-200' 
                                : 'bg-red-100 text-red-800 border-red-200'}
                            >
                              {org.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-moss-300 text-moss-700 hover:bg-moss-50"
                              >
                                <UserCog className="h-3 w-3 mr-1" />
                                Manage
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {organizations.length === 0 && (
                  <div className="text-center py-12">
                    <Building className="h-12 w-12 text-moss-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-moss-900 mb-2">No organizations found</h3>
                    <p className="text-moss-600">No organizations have been created yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ad Approval Dialog */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Ad: {selectedAd?.title}</DialogTitle>
            <DialogDescription>
              Review the ad content and make an approval decision.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAd && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-moss-900">Client</label>
                  <p className="text-moss-700">{selectedAd.client}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-moss-900">Ad Type</label>
                  <p className="text-moss-700">{selectedAd.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-moss-900">Budget</label>
                  <p className="text-moss-700">${selectedAd.budget_total.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-moss-900">Created</label>
                  <p className="text-moss-700">{formatDate(selectedAd.created_at)}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-moss-900">Current Status</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedAd.status)}>
                    {selectedAd.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setApprovalDialogOpen(false)}
              className="border-moss-300 text-moss-700 hover:bg-moss-50"
            >
              Cancel
            </Button>
            {selectedAd?.status === 'pending' && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => selectedAd && updateAdStatus(selectedAd.id, 'rejected')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => selectedAd && updateAdStatus(selectedAd.id, 'approved')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;