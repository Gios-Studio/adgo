import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Plus, Play, Pause, Trophy, TrendingUp, Users, Eye, MousePointer, Target } from 'lucide-react';
import { toast } from 'sonner';

interface ABTest {
  id: string;
  name: string;
  description: string;
  campaign_id?: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  variants: {
    A: { name: string; description: string; traffic: number };
    B: { name: string; description: string; traffic: number };
  };
  traffic_split: { A: number; B: number };
  start_date?: string;
  end_date?: string;
  winner_variant?: string;
  statistical_significance?: number;
  metrics: {
    A: { impressions: number; clicks: number; conversions: number; ctr: number; conversionRate: number };
    B: { impressions: number; clicks: number; conversions: number; ctr: number; conversionRate: number };
  };
  created_at: string;
}

const abTestData: ABTest[] = [
  {
    id: '1',
    name: 'Header CTA Test',
    description: 'Testing different call-to-action buttons in the header',
    status: 'running',
    variants: {
      A: { name: 'Blue Button', description: 'Blue "Get Started" button', traffic: 50 },
      B: { name: 'Green Button', description: 'Green "Start Free Trial" button', traffic: 50 },
    },
    traffic_split: { A: 50, B: 50 },
    start_date: '2024-01-10',
    statistical_significance: 82.5,
    metrics: {
      A: { impressions: 25000, clicks: 1250, conversions: 75, ctr: 5.0, conversionRate: 6.0 },
      B: { impressions: 25000, clicks: 1375, conversions: 96, ctr: 5.5, conversionRate: 7.0 },
    },
    created_at: '2024-01-10',
  },
  {
    id: '2',
    name: 'Landing Page Layout',
    description: 'Comparing single-column vs two-column layout',
    status: 'completed',
    variants: {
      A: { name: 'Single Column', description: 'Traditional single-column layout', traffic: 50 },
      B: { name: 'Two Column', description: 'Modern two-column layout', traffic: 50 },
    },
    traffic_split: { A: 50, B: 50 },
    start_date: '2024-01-01',
    end_date: '2024-01-08',
    winner_variant: 'B',
    statistical_significance: 95.2,
    metrics: {
      A: { impressions: 35000, clicks: 1400, conversions: 84, ctr: 4.0, conversionRate: 6.0 },
      B: { impressions: 35000, clicks: 1750, conversions: 140, ctr: 5.0, conversionRate: 8.0 },
    },
    created_at: '2024-01-01',
  },
  {
    id: '3',
    name: 'Email Subject Lines',
    description: 'Testing personalized vs generic subject lines',
    status: 'draft',
    variants: {
      A: { name: 'Generic', description: 'Standard product announcement', traffic: 50 },
      B: { name: 'Personalized', description: 'Personalized with user name', traffic: 50 },
    },
    traffic_split: { A: 50, B: 50 },
    metrics: {
      A: { impressions: 0, clicks: 0, conversions: 0, ctr: 0, conversionRate: 0 },
      B: { impressions: 0, clicks: 0, conversions: 0, ctr: 0, conversionRate: 0 },
    },
    created_at: '2024-01-15',
  },
];

const performanceData = [
  { day: 'Day 1', variantA: 4.2, variantB: 4.8 },
  { day: 'Day 2', variantA: 4.5, variantB: 5.1 },
  { day: 'Day 3', variantA: 4.8, variantB: 5.3 },
  { day: 'Day 4', variantA: 4.6, variantB: 5.5 },
  { day: 'Day 5', variantA: 5.0, variantB: 5.4 },
  { day: 'Day 6', variantA: 4.9, variantB: 5.6 },
  { day: 'Day 7', variantA: 5.1, variantB: 5.8 },
];

const ABTestManager = () => {
  const [abTests, setAbTests] = useState<ABTest[]>(abTestData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<ABTest | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    campaign_id: '',
    variantA: { name: '', description: '' },
    variantB: { name: '', description: '' },
    trafficSplit: { A: 50, B: 50 },
  });

  const createABTest = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a test name');
      return;
    }

    // Demo implementation
    toast.success(`A/B test "${formData.name}" created successfully`);
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      campaign_id: '',
      variantA: { name: '', description: '' },
      variantB: { name: '', description: '' },
      trafficSplit: { A: 50, B: 50 },
    });
  };

  const startTest = async (testId: string) => {
    toast.success('A/B test started');
  };

  const pauseTest = async (testId: string) => {
    toast.success('A/B test paused');
  };

  const declareWinner = async (testId: string, variant: string) => {
    toast.success(`Variant ${variant} declared as winner`);
  };

  const getStatusColor = (status: ABTest['status']) => {
    switch (status) {
      case 'running': return 'bg-green-500/10 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-500/10 text-blue-700 border-blue-200';
      case 'paused': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200';
      case 'draft': return 'bg-gray-500/10 text-gray-700 border-gray-200';
      default: return 'bg-gray-500/10 text-gray-700 border-gray-200';
    }
  };

  const calculateImprovement = (metricA: number, metricB: number) => {
    if (metricA === 0) return 0;
    return ((metricB - metricA) / metricA) * 100;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">A/B Test Manager</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Create A/B Test
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New A/B Test</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create">Basic Info</TabsTrigger>
                <TabsTrigger value="variants">Variants</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Test Name</label>
                  <Input
                    placeholder="Enter test name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe what you're testing"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Campaign (Optional)</label>
                  <Select value={formData.campaign_id} onValueChange={(value) => setFormData(prev => ({ ...prev, campaign_id: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="campaign1">Summer Sale 2024</SelectItem>
                      <SelectItem value="campaign2">Brand Awareness Q4</SelectItem>
                      <SelectItem value="campaign3">Holiday Promotion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              
              <TabsContent value="variants" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Variant A (Control)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          placeholder="Variant A name"
                          value={formData.variantA.name}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            variantA: { ...prev.variantA, name: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Describe variant A"
                          value={formData.variantA.description}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            variantA: { ...prev.variantA, description: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3">Variant B (Test)</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          placeholder="Variant B name"
                          value={formData.variantB.name}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            variantB: { ...prev.variantB, name: e.target.value }
                          }))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Describe variant B"
                          value={formData.variantB.description}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            variantB: { ...prev.variantB, description: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Traffic Split</label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="text-xs text-muted-foreground">Variant A</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.trafficSplit.A}
                          onChange={(e) => {
                            const valueA = parseInt(e.target.value) || 0;
                            const valueB = 100 - valueA;
                            setFormData(prev => ({
                              ...prev,
                              trafficSplit: { A: valueA, B: valueB }
                            }));
                          }}
                        />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Variant B</label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={formData.trafficSplit.B}
                          onChange={(e) => {
                            const valueB = parseInt(e.target.value) || 0;
                            const valueA = 100 - valueB;
                            setFormData(prev => ({
                              ...prev,
                              trafficSplit: { A: valueA, B: valueB }
                            }));
                          }}
                        />
                        <span className="text-sm">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={createABTest} className="w-full">
                  Create A/B Test
                </Button>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Overview Chart */}
      <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle>A/B Test Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="variantA" stroke="hsl(var(--primary))" strokeWidth={2} name="Variant A" />
              <Line type="monotone" dataKey="variantB" stroke="hsl(var(--accent))" strokeWidth={2} name="Variant B" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* A/B Tests List */}
      <div className="grid gap-6">
        {abTests.map((test) => (
          <Card key={test.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{test.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{test.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className={getStatusColor(test.status)}>
                      {test.status.toUpperCase()}
                    </Badge>
                    {test.statistical_significance && (
                      <Badge variant="outline">
                        {test.statistical_significance}% confidence
                      </Badge>
                    )}
                    {test.winner_variant && (
                      <Badge className="bg-green-500/10 text-green-700 border-green-200">
                        <Trophy className="w-3 h-3 mr-1" />
                        Winner: {test.winner_variant}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {test.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startTest(test.id)}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {test.status === 'running' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => pauseTest(test.id)}
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => declareWinner(test.id, 'B')}
                      >
                        <Trophy className="w-4 h-4 mr-1" />
                        Declare Winner
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Traffic Split */}
              <div className="mb-6">
                <h4 className="font-medium mb-2">Traffic Split</h4>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Variant A: {test.variants.A.name}</span>
                      <span>{test.traffic_split.A}%</span>
                    </div>
                    <Progress value={test.traffic_split.A} className="h-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Variant B: {test.variants.B.name}</span>
                      <span>{test.traffic_split.B}%</span>
                    </div>
                    <Progress value={test.traffic_split.B} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              {test.status !== 'draft' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Variant A */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center">
                      <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                      Variant A: {test.variants.A.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Impressions</p>
                        <p className="font-bold">{test.metrics.A.impressions.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <MousePointer className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">CTR</p>
                        <p className="font-bold">{test.metrics.A.ctr}%</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <Target className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <p className="font-bold">{test.metrics.A.conversions}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Conv. Rate</p>
                        <p className="font-bold">{test.metrics.A.conversionRate}%</p>
                      </div>
                    </div>
                  </div>

                  {/* Variant B */}
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center">
                      <div className="w-3 h-3 bg-accent rounded mr-2"></div>
                      Variant B: {test.variants.B.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Impressions</p>
                        <p className="font-bold">{test.metrics.B.impressions.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <MousePointer className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">CTR</p>
                        <p className="font-bold">{test.metrics.B.ctr}%</p>
                        <div className="flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">
                            +{calculateImprovement(test.metrics.A.ctr, test.metrics.B.ctr).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <Target className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <p className="font-bold">{test.metrics.B.conversions}</p>
                        <div className="flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">
                            +{calculateImprovement(test.metrics.A.conversions, test.metrics.B.conversions).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Conv. Rate</p>
                        <p className="font-bold">{test.metrics.B.conversionRate}%</p>
                        <div className="flex items-center justify-center mt-1">
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">
                            +{calculateImprovement(test.metrics.A.conversionRate, test.metrics.B.conversionRate).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {abTests.length === 0 && (
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <Target className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No A/B tests created yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first A/B test to optimize your campaigns.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Create First A/B Test
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ABTestManager;