import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  Eye, 
  MousePointer, 
  DollarSign,
  MapPin,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Play,
  Pause,
  Edit,
  Plus,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  ChevronRight,
  Activity,
  Zap,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { NavBar } from './NavBar';

interface DashboardStats {
  totalImpressions: number;
  totalClicks: number;
  totalSpend: number;
  activeCampaigns: number;
  ctr: number;
  cpc: number;
  roas: number;
  conversionRate: number;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  impressions: number;
  clicks: number;
  spend: number;
  budget: number;
  ctr: number;
  startDate: string;
  endDate: string;
  targetLocations: string[];
}

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
}

const AdvertiserDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalImpressions: 127450,
    totalClicks: 8943,
    totalSpend: 2847.50,
    activeCampaigns: 12,
    ctr: 7.02,
    cpc: 0.32,
    roas: 4.2,
    conversionRate: 12.4
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Holiday Sale Campaign',
      status: 'active',
      impressions: 45230,
      clicks: 3201,
      spend: 892.50,
      budget: 1500,
      ctr: 7.08,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      targetLocations: ['New York', 'Los Angeles', 'Chicago']
    },
    {
      id: '2', 
      name: 'Spring Collection Launch',
      status: 'active',
      impressions: 32100,
      clicks: 2547,
      spend: 634.20,
      budget: 1000,
      ctr: 7.94,
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      targetLocations: ['San Francisco', 'Seattle', 'Portland']
    },
    {
      id: '3',
      name: 'Brand Awareness Drive',
      status: 'paused',
      impressions: 28750,
      clicks: 1842,
      spend: 423.80,
      budget: 800,
      ctr: 6.41,
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      targetLocations: ['Miami', 'Atlanta', 'Dallas']
    }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Budget Alert',
      message: 'Holiday Sale Campaign is at 85% of budget',
      timestamp: '2 hours ago'
    },
    {
      id: '2', 
      type: 'success',
      title: 'Performance Milestone',
      message: 'Spring Collection achieved 300% ROAS target',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'info',
      title: 'Optimization Suggestion',
      message: 'Consider increasing budget for top-performing ads',
      timestamp: '6 hours ago'
    }
  ]);

  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/10 text-primary';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'info':
        return <Bell className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Enhanced Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/2832d142-026e-456c-88e4-dbacf37c22e7.png" 
                alt="AdGo Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AdGo
              </span>
              <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary">
                Advertiser
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/demo')}
                className="hover:bg-primary/10"
              >
                Demo
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => router.push('/ad-display')}
                className="hover:bg-primary/10"
              >
                Ad Display
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.email?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{user?.email}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSignOut}
                  className="border-primary/20 hover:bg-primary/5"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground">
              Monitor your campaign performance and optimize for better results
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Button 
              onClick={() => router.push('/calendar')}
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Campaign
            </Button>
            <Button 
              onClick={() => router.push('/ad-upload')}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Ad
            </Button>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Impressions
              </CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.totalImpressions.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
              <MousePointer className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats.totalClicks.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Spend
              </CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                ${stats.totalSpend.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +5.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Campaigns
              </CardTitle>
              <Activity className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {stats.activeCampaigns}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Zap className="h-3 w-3 mr-1" />
                2 optimizing
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CTR</p>
                  <p className="text-2xl font-bold text-primary">{stats.ctr}%</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CPC</p>
                  <p className="text-2xl font-bold text-accent">${stats.cpc}</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <MousePointer className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ROAS</p>
                  <p className="text-2xl font-bold text-primary">{stats.roas}x</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold text-accent">{stats.conversionRate}%</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Campaigns */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-primary">Active Campaigns</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-primary/20 hover:bg-primary/5"
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {campaigns.slice(0, 3).map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{campaign.name}</h3>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          {campaign.status === 'active' ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Impressions</p>
                        <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">CTR</p>
                        <p className="font-semibold text-primary">{campaign.ctr}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Spend</p>
                        <p className="font-semibold">${campaign.spend}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Budget Usage</span>
                        <span>{Math.round((campaign.spend / campaign.budget) * 100)}%</span>
                      </div>
                      <Progress 
                        value={(campaign.spend / campaign.budget) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {campaign.targetLocations.join(', ')}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Geo-Targeting Heatmap */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Geographic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-8 grid-rows-6 h-full gap-1 p-4">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div 
                          key={i} 
                          className={`rounded ${
                            i % 3 === 0 ? 'bg-primary' : 
                            i % 5 === 0 ? 'bg-accent' : 
                            'bg-primary/30'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <div className="relative z-10 text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-3" />
                    <p className="text-lg font-semibold text-primary">Interactive Geo-Heatmap</p>
                    <p className="text-sm text-muted-foreground">
                      Real-time performance across target locations
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Top Region</p>
                    <p className="font-semibold text-primary">New York</p>
                    <p className="text-xs text-green-600">+15% CTR</p>
                  </div>
                  <div className="text-center p-3 bg-accent/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Emerging</p>
                    <p className="font-semibold text-accent">Seattle</p>
                    <p className="text-xs text-blue-600">+8% Growth</p>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">Optimize</p>
                    <p className="font-semibold text-primary">Miami</p>
                    <p className="text-xs text-yellow-600">Low CTR</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts & Quick Actions */}
          <div className="space-y-6">
            {/* Alerts & Notifications */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                        <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-primary/20 hover:bg-primary/5"
                >
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => router.push('/ad-upload')}
                  className="w-full justify-start bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Campaign
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start border-primary/20 hover:bg-primary/5"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start border-primary/20 hover:bg-primary/5"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Audience Insights
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full justify-start border-primary/20 hover:bg-primary/5"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Campaign
                </Button>
              </CardContent>
            </Card>

            {/* Device Performance */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary">Device Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-primary" />
                    <span className="text-sm">Mobile</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">64%</p>
                    <p className="text-xs text-green-600">+5.2%</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-accent" />
                    <span className="text-sm">Desktop</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">36%</p>
                    <p className="text-xs text-blue-600">Stable</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Mobile CTR</span>
                    <span className="text-primary font-semibold">7.8%</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Desktop CTR</span>
                    <span className="text-accent font-semibold">6.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiserDashboard;