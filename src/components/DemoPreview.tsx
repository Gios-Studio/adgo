import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Monitor, Upload, BarChart3, Settings, Play, Pause, TrendingUp, Users, Eye, Clock, Calendar, DollarSign, Target, Search, FileText, Shield, TestTube } from 'lucide-react';
import RoleManager from './RoleManager';
import ReportGenerator from './ReportGenerator';
import ConsumerTrends from './ConsumerTrends';
import CompetitorAnalysis from './CompetitorAnalysis';
import AudienceManager from './AudienceManager';
import ABTestManager from './ABTestManager';

// Demo data
const campaignData = [
  { id: 1, name: "Summer Sale 2024", status: "active", budget: 5000, spent: 3200, impressions: 125000, clicks: 2400 },
  { id: 2, name: "Brand Awareness Q4", status: "paused", budget: 8000, spent: 4500, impressions: 89000, clicks: 1800 },
  { id: 3, name: "Holiday Promotion", status: "scheduled", budget: 12000, spent: 0, impressions: 0, clicks: 0 },
];

const analyticsData = [
  { date: "Jan", impressions: 65000, clicks: 1200, conversions: 48 },
  { date: "Feb", impressions: 75000, clicks: 1400, conversions: 62 },
  { date: "Mar", impressions: 85000, clicks: 1600, conversions: 71 },
  { date: "Apr", impressions: 95000, clicks: 1800, conversions: 89 },
  { date: "May", impressions: 105000, clicks: 2000, conversions: 96 },
  { date: "Jun", impressions: 125000, clicks: 2400, conversions: 112 },
];

const deviceData = [
  { name: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
  { name: 'Mobile', value: 35, color: 'hsl(var(--accent))' },
  { name: 'Tablet', value: 20, color: 'hsl(var(--primary-glow))' },
];

const DemoPreview = () => {
  const [activeTab, setActiveTab] = useState("campaigns");

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      {/* Header */}
      <div className="border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AdGo Platform Demo
              </h1>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-accent/20 to-primary/20">
              Demo Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9 mb-6">
            <TabsTrigger value="campaigns" className="flex items-center space-x-1">
              <Settings className="w-3 h-3" />
              <span className="hidden sm:inline">Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-1">
              <Upload className="w-3 h-3" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-1">
              <BarChart3 className="w-3 h-3" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center space-x-1">
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Display</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-1">
              <FileText className="w-3 h-3" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="competitors" className="flex items-center space-x-1">
              <Search className="w-3 h-3" />
              <span className="hidden sm:inline">Competitors</span>
            </TabsTrigger>
            <TabsTrigger value="audience" className="flex items-center space-x-1">
              <Target className="w-3 h-3" />
              <span className="hidden sm:inline">Audience</span>
            </TabsTrigger>
            <TabsTrigger value="abtest" className="flex items-center space-x-1">
              <TestTube className="w-3 h-3" />
              <span className="hidden sm:inline">A/B Tests</span>
            </TabsTrigger>
          </TabsList>

          {/* Campaign Manager Demo */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Campaign Manager</h2>
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                Create Campaign
              </Button>
            </div>
            
            <div className="grid gap-6">
              {campaignData.map((campaign) => (
                <Card key={campaign.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{campaign.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge 
                            variant={campaign.status === 'active' ? 'default' : campaign.status === 'paused' ? 'secondary' : 'outline'}
                            className={campaign.status === 'active' ? 'bg-green-500/10 text-green-700 border-green-200' : ''}
                          >
                            {campaign.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {campaign.status === 'active' ? (
                          <Button variant="outline" size="sm">
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Start
                          </Button>
                        )}
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="text-lg font-bold">${campaign.budget.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg">
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                        <p className="text-sm text-muted-foreground">Spent</p>
                        <p className="text-lg font-bold">${campaign.spent.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-primary/5 rounded-lg">
                        <Eye className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-sm text-muted-foreground">Impressions</p>
                        <p className="text-lg font-bold">{campaign.impressions.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-accent/5 rounded-lg">
                        <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                        <p className="text-sm text-muted-foreground">Clicks</p>
                        <p className="text-lg font-bold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* File Upload Demo */}
          <TabsContent value="upload" className="space-y-6">
            <h2 className="text-3xl font-bold">File Upload & Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardHeader>
                  <CardTitle>Upload Ad Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center bg-primary/5">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">Support for images, videos, and documents</p>
                    <Button className="mt-4 bg-gradient-to-r from-primary to-primary-glow">
                      Choose Files
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "summer-banner.jpg", size: "2.4 MB", type: "Image" },
                    { name: "product-video.mp4", size: "15.8 MB", type: "Video" },
                    { name: "campaign-brief.pdf", size: "890 KB", type: "Document" },
                  ].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.type} • {file.size}</p>
                      </div>
                      <Badge variant="outline">Uploaded</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Demo */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Impressions</p>
                      <p className="text-2xl font-bold">3.2M</p>
                      <p className="text-sm text-green-600">+12.5% from last month</p>
                    </div>
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Click-Through Rate</p>
                      <p className="text-2xl font-bold">2.8%</p>
                      <p className="text-sm text-green-600">+0.3% from last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-accent" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">4.6%</p>
                      <p className="text-sm text-green-600">+1.2% from last month</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="impressions" stroke="hsl(var(--primary))" strokeWidth={2} />
                      <Line type="monotone" dataKey="clicks" stroke="hsl(var(--accent))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Ad Display Demo */}
          <TabsContent value="display" className="space-y-6">
            <h2 className="text-3xl font-bold">Ad Display Screen</h2>
            
            <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-12 text-center">
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Summer Sale
                    </div>
                    <div className="text-2xl text-muted-foreground">
                      Up to 50% off all products
                    </div>
                    <div className="flex justify-center space-x-4">
                      <Clock className="w-6 h-6 text-primary" />
                      <span className="text-lg">Limited time offer</span>
                    </div>
                    <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary-glow">
                      Shop Now
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Campaign Duration</p>
                    <p className="font-medium">July 1 - July 31</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Eye className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="text-sm text-muted-foreground">Display Frequency</p>
                    <p className="font-medium">Every 30 seconds</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Monitor className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Screen Resolution</p>
                    <p className="font-medium">1920x1080</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Role Management Demo */}
          <TabsContent value="roles">
            <RoleManager />
          </TabsContent>

          {/* Report Generator Demo */}
          <TabsContent value="reports">
            <ReportGenerator />
          </TabsContent>

          {/* Consumer Trends Demo */}
          <TabsContent value="trends">
            <ConsumerTrends />
          </TabsContent>

          {/* Competitor Analysis Demo */}
          <TabsContent value="competitors">
            <CompetitorAnalysis />
          </TabsContent>

          {/* Audience Manager Demo */}
          <TabsContent value="audience">
            <AudienceManager />
          </TabsContent>

          {/* A/B Test Manager Demo */}
          <TabsContent value="abtest">
            <ABTestManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DemoPreview;