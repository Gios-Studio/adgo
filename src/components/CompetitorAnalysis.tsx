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

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { Search, Plus, TrendingUp, TrendingDown, Eye, Target, Users, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface Competitor {
  id: string;
  name: string;
  website: string;
  marketShare: number;
  adSpend: number;
  engagement: number;
  reach: number;
  sentiment: number;
  strengths: string[];
  weaknesses: string[];
  lastAnalyzed: string;
}

const competitorData: Competitor[] = [
  {
    id: '1',
    name: 'AdMax Pro',
    website: 'admaxpro.com',
    marketShare: 25.4,
    adSpend: 2400000,
    engagement: 78,
    reach: 5200000,
    sentiment: 72,
    strengths: ['Strong brand recognition', 'Premium positioning', 'High-quality content'],
    weaknesses: ['High price point', 'Limited targeting options'],
    lastAnalyzed: '2024-01-15',
  },
  {
    id: '2',
    name: 'QuickAds',
    website: 'quickads.io',
    marketShare: 18.7,
    adSpend: 1800000,
    engagement: 65,
    reach: 3800000,
    sentiment: 68,
    strengths: ['Affordable pricing', 'Easy setup', 'Good customer support'],
    weaknesses: ['Limited features', 'Basic analytics'],
    lastAnalyzed: '2024-01-14',
  },
  {
    id: '3',
    name: 'MediaBoost',
    website: 'mediaboost.net',
    marketShare: 22.1,
    adSpend: 2100000,
    engagement: 82,
    reach: 4600000,
    sentiment: 75,
    strengths: ['Advanced analytics', 'AI-powered optimization', 'Multi-platform'],
    weaknesses: ['Complex interface', 'Steep learning curve'],
    lastAnalyzed: '2024-01-13',
  },
];

const performanceData = [
  { metric: 'Engagement', our: 85, competitor1: 78, competitor2: 65, competitor3: 82 },
  { metric: 'Reach', our: 88, competitor1: 92, competitor2: 67, competitor3: 84 },
  { metric: 'Sentiment', our: 79, competitor1: 72, competitor2: 68, competitor3: 75 },
  { metric: 'Innovation', our: 91, competitor1: 75, competitor2: 60, competitor3: 88 },
  { metric: 'Price', our: 82, competitor1: 65, competitor2: 90, competitor3: 70 },
];

const marketTrendData = [
  { month: 'Jan', our: 15.2, admaxpro: 25.4, quickads: 18.7, mediaboost: 22.1 },
  { month: 'Feb', our: 16.1, admaxpro: 25.1, quickads: 18.9, mediaboost: 21.8 },
  { month: 'Mar', our: 17.3, admaxpro: 24.8, quickads: 19.2, mediaboost: 21.5 },
  { month: 'Apr', our: 18.7, admaxpro: 24.5, quickads: 19.5, mediaboost: 21.2 },
  { month: 'May', our: 19.8, admaxpro: 24.2, quickads: 19.8, mediaboost: 20.9 },
  { month: 'Jun', our: 21.2, admaxpro: 23.9, quickads: 20.1, mediaboost: 20.6 },
];

const CompetitorAnalysis = () => {
  const [competitors, setCompetitors] = useState<Competitor[]>(competitorData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  const addCompetitor = async () => {
    if (!newCompetitor.trim()) {
      toast.error('Please enter a competitor name or website');
      return;
    }

    // Demo implementation
    toast.success(`Analysis started for "${newCompetitor}"`);
    setIsDialogOpen(false);
    setNewCompetitor('');
  };

  const analyzeCompetitor = async (competitorId: string) => {
    // Demo implementation
    toast.success('Competitor analysis updated');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Competitive Analysis</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary-glow">
              <Plus className="w-4 h-4 mr-2" />
              Add Competitor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Competitor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Competitor Name or Website</label>
                <Input
                  placeholder="Enter competitor name or website URL"
                  value={newCompetitor}
                  onChange={(e) => setNewCompetitor(e.target.value)}
                />
              </div>
              <Button onClick={addCompetitor} className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Analyze Competitor
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Radar Chart */}
      <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle>Competitive Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar 
                name="Our Platform" 
                dataKey="our" 
                stroke="hsl(var(--primary))" 
                fill="hsl(var(--primary))" 
                fillOpacity={0.2} 
                strokeWidth={2}
              />
              <Radar 
                name="AdMax Pro" 
                dataKey="competitor1" 
                stroke="hsl(var(--accent))" 
                fill="hsl(var(--accent))" 
                fillOpacity={0.1} 
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Share Trends */}
      <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle>Market Share Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={marketTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="our" stroke="hsl(var(--primary))" strokeWidth={3} name="Our Platform" />
              <Line type="monotone" dataKey="admaxpro" stroke="#ef4444" strokeWidth={2} name="AdMax Pro" />
              <Line type="monotone" dataKey="quickads" stroke="#f59e0b" strokeWidth={2} name="QuickAds" />
              <Line type="monotone" dataKey="mediaboost" stroke="#8b5cf6" strokeWidth={2} name="MediaBoost" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Competitor Details */}
      <div className="grid gap-6">
        {competitors.map((competitor) => (
          <Card key={competitor.id} className="shadow-elegant border-0 bg-card/95 backdrop-blur">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{competitor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{competitor.website}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last analyzed: {competitor.lastAnalyzed}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => analyzeCompetitor(competitor.id)}
                >
                  <Search className="w-4 h-4 mr-1" />
                  Reanalyze
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <Target className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Market Share</p>
                  <p className="text-lg font-bold">{competitor.marketShare}%</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <DollarSign className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <p className="text-xs text-muted-foreground">Ad Spend</p>
                  <p className="text-lg font-bold">${(competitor.adSpend / 1000000).toFixed(1)}M</p>
                </div>
                <div className="text-center p-3 bg-primary/5 rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs text-muted-foreground">Engagement</p>
                  <p className="text-lg font-bold">{competitor.engagement}%</p>
                </div>
                <div className="text-center p-3 bg-accent/5 rounded-lg">
                  <Eye className="w-5 h-5 mx-auto mb-1 text-accent" />
                  <p className="text-xs text-muted-foreground">Reach</p>
                  <p className="text-lg font-bold">{(competitor.reach / 1000000).toFixed(1)}M</p>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                    Strengths
                  </h4>
                  <div className="space-y-2">
                    {competitor.strengths.map((strength, index) => (
                      <Badge key={index} variant="outline" className="bg-green-500/10 text-green-700 border-green-200">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <TrendingDown className="w-4 h-4 mr-2 text-red-600" />
                    Weaknesses
                  </h4>
                  <div className="space-y-2">
                    {competitor.weaknesses.map((weakness, index) => (
                      <Badge key={index} variant="outline" className="bg-red-500/10 text-red-700 border-red-200">
                        {weakness}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {competitors.length === 0 && (
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No competitors analyzed yet</h3>
            <p className="text-muted-foreground mb-4">
              Add competitors to start analyzing their performance and strategies.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              Add First Competitor
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompetitorAnalysis;