import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, FileDown, Calendar, TrendingUp, Users, DollarSign } from "lucide-react";
import { NavBar } from './NavBar';

interface AnalyticsData {
  totalAds: number;
  activeAds: number;
  totalViews: number;
  revenue: number;
  clients: number;
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const [analytics] = useState<AnalyticsData>({
    totalAds: 156,
    activeAds: 89,
    totalViews: 2847593,
    revenue: 45892.50,
    clients: 34
  });

  const generateReport = () => {
    toast({
      title: "Report Generated",
      description: "Revenue report has been generated and will be downloaded shortly.",
    });
  };

  const scheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: "Weekly report has been scheduled for next week.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Monitor performance and manage the ad platform</p>
        </div>

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
              <p className="text-blue-100 text-sm">+12% from last month</p>
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
                <CardTitle className="text-sm font-medium text-purple-100">Total Views</CardTitle>
                <Users className="w-5 h-5 text-purple-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalViews.toLocaleString()}</div>
              <p className="text-purple-100 text-sm">+8% from last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-orange-100">Revenue</CardTitle>
                <DollarSign className="w-5 h-5 text-orange-200" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${analytics.revenue.toLocaleString()}</div>
              <p className="text-orange-100 text-sm">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Ads */}
        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Recent Ad Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, client: "TechCorp", type: "Video", status: "pending", revenue: 1250 },
                { id: 2, client: "Fashion Brand", type: "GIF", status: "approved", revenue: 890 },
                { id: 3, client: "Food Delivery", type: "Text", status: "approved", revenue: 560 },
                { id: 4, client: "E-commerce", type: "Video", status: "rejected", revenue: 0 },
              ].map((ad) => (
                <div key={ad.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium">{ad.client.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{ad.client}</h3>
                      <p className="text-sm text-muted-foreground">{ad.type} Ad</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${ad.revenue}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <Badge 
                      className={
                        ad.status === 'approved' ? 'bg-green-100 text-green-800' :
                        ad.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }
                    >
                      {ad.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileDown className="w-5 h-5" />
                Generate Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Create detailed revenue and performance reports</p>
              <Button
                onClick={generateReport}
                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
              >
                Generate Revenue Report
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Set up automated weekly and monthly reports</p>
              <Button
                onClick={scheduleReport}
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
              >
                Schedule Weekly Report
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;