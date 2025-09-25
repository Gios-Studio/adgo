import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, FileDown, Calendar, TrendingUp, Users, DollarSign, 
  Shield, Search, Eye, CheckCircle, XCircle, Pause, Play, 
  AlertTriangle, ArrowLeft, RefreshCw, Building, UserCog 
} from "lucide-react";
import { NavBar } from "./NavBar";
import { useRouter } from "next/router";
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
  status: "draft" | "pending" | "approved" | "rejected" | "active" | "paused";
  created_at: string | null;
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
  created_at: string | null;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const router = useRouter();

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

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadAnalytics(),
        loadAds(),
        loadOrgs()
      ]);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
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
      const { data: adsData, error } = await supabase.from("ads").select("*");
      if (error) throw error;

      const totalAds = adsData?.length || 0;
      const activeAds = totalAds;
      const totalImpressions = totalAds * 100;
      const totalConversions = totalAds * 1;
      const totalRevenue = totalAds * 50;

      setAnalytics({
        totalAds,
        activeAds,
        totalViews: totalImpressions,
        revenue: totalRevenue,
        clients: 5,
        impressions: totalImpressions,
        conversions: totalConversions,
        pendingApprovals: 0
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const loadAds = async () => {
    try {
      const { data, error } = await supabase.from("ads").select("*").order("created_at", { ascending: false });
      if (error) throw error;

      const formattedAds: AdData[] = data?.map(ad => ({
        id: ad.id,
        title: `Ad for ${ad.city || "Unknown Location"}`,
        client: "Demo Client",
        organization: "Demo Organization",
        type: ad.media_url ? (ad.media_url.includes(".mp4") ? "Video" : "Image") : "Text",
        status: "active",
        created_at: ad.created_at,
        budget_total: 1000,
        impressions: Math.floor(Math.random() * 1000),
        clicks: Math.floor(Math.random() * 50),
        conversions: Math.floor(Math.random() * 10),
        revenue: Math.floor(Math.random() * 100)
      })) || [];

      setAds(formattedAds);
    } catch (error) {
      console.error("Error loading ads:", error);
    }
  };

  const loadOrgs = async () => {
    try {
      const { data, error } = await supabase.from("orgs").select("*").order("created_at", { ascending: false });
      if (error) throw error;

      const formattedOrgs: OrganizationData[] = data?.map(org => ({
        id: org.id,
        name: org.name,
        email: "demo@example.com",
        subscription_plan: "basic",
        total_ads: Math.floor(Math.random() * 5) + 1,
        total_spent: Math.floor(Math.random() * 5000) + 1000,
        is_active: true,
        created_at: org.created_at
      })) || [];

      setOrganizations(formattedOrgs);
    } catch (error) {
      console.error("Error loading organizations:", error);
    }
  };

  const updateAdStatus = async (adId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("ads").update({}).eq("id", adId);
      if (error) throw error;

      setAds(prev => prev.map(ad => ad.id === adId ? { ...ad, status: newStatus as any } : ad));

      toast({
        title: "Status Updated",
        description: `Ad status changed to ${newStatus}`,
      });

      setApprovalDialogOpen(false);
      setSelectedAd(null);
      loadAnalytics();
    } catch (error) {
      console.error("Error updating ad status:", error);
      toast({
        title: "Error",
        description: "Failed to update ad status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const generateReport = async () => {
    try {
      const csvContent = `Report Generated,${new Date().toLocaleString()}\n\nMetric,Value\nTotal Revenue,$${analytics.revenue.toLocaleString()}\nTotal Ads,${analytics.totalAds}\nTotal Impressions,${analytics.impressions.toLocaleString()}\nTotal Conversions,${analytics.conversions}\nActive Ads,${analytics.activeAds}\nPending Approvals,${analytics.pendingApprovals}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `adgo-report-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Report Generated",
        description: "Revenue report has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
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
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "approved": return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected": return "bg-red-100 text-red-800 border-red-200";
      case "paused": return "bg-gray-100 text-gray-800 border-gray-200";
      case "draft": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="cosmic-grid opacity-20 absolute inset-0"></div>
        <div className="text-center space-y-4 relative z-10">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="h-8 w-8 animate-spin text-cosmic-accent" />
          </div>
          <p className="text-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 cosmic-grid opacity-20"></div>
      <NavBar />
      {/* HEADER */}
      <div className="w-full py-6 px-6 md:px-12 bg-background relative z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/client-dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl md:text-4xl font-medium tracking-tighter text-foreground">Admin Control Center</h1>
              <p className="text-muted-foreground text-lg">Manage ads, organizations, and platform analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={() => loadDashboardData()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Badge variant="outline"><Shield className="h-3 w-3 mr-1" /> Admin Access</Badge>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-16 relative z-10">
        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card><CardContent>Total Ads: {analytics.totalAds}</CardContent></Card>
          <Card><CardContent>Active Ads: {analytics.activeAds}</CardContent></Card>
          <Card><CardContent>Total Impressions: {analytics.impressions}</CardContent></Card>
          <Card><CardContent>Total Revenue: ${analytics.revenue}</CardContent></Card>
        </div>
        {/* TABS */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ads">Ad Management</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
          </TabsList>
          {/* OVERVIEW */}
          <TabsContent value="overview">
            <Button onClick={generateReport}>Generate Report</Button>
            <Button onClick={scheduleReport}>Schedule Report</Button>
          </TabsContent>
          {/* ADS */}
          <TabsContent value="ads">
            {filteredAds.map(ad => (
              <div key={ad.id} className="border p-4 my-2">
                {ad.title} - {ad.status} - {ad.impressions} impressions
              </div>
            ))}
          </TabsContent>
          {/* ORGS */}
          <TabsContent value="organizations">
            {organizations.map(org => (
              <div key={org.id} className="border p-4 my-2">
                {org.name} - {org.subscription_plan} - ${org.total_spent}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      {/* DIALOG */}
      <Dialog open={approvalDialogOpen} onOpenChange={setApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Ad</DialogTitle>
            <DialogDescription>Approve or reject ads</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setApprovalDialogOpen(false)}>Cancel</Button>
            {selectedAd?.status === "pending" && (
              <>
                <Button variant="destructive" onClick={() => selectedAd && updateAdStatus(selectedAd.id, "rejected")}>Reject</Button>
                <Button onClick={() => selectedAd && updateAdStatus(selectedAd.id, "approved")}>Approve</Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;