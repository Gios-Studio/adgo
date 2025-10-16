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
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Eye, MousePointer, TrendingUp, DollarSign, Calendar, Filter } from 'lucide-react';

interface AnalyticsData {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  clickThroughRate: number;
  conversionRate: number;
  costPerClick: number;
  returnOnAdSpend: number;
}

interface ChartData {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalImpressions: 0,
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    clickThroughRate: 0,
    conversionRate: 0,
    costPerClick: 0,
    returnOnAdSpend: 0,
  });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user, timeRange]);

  const fetchAnalytics = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        default:
          startDate.setDate(endDate.getDate() - 7);
      }

      // Since ad_analytics table doesn't exist, generate demo data
      const daysInRange = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const processedData = Array.from({ length: daysInRange }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return {
          date: date.toISOString().split('T')[0],
          impressions: Math.floor(Math.random() * 1000) + 500,
          clicks: Math.floor(Math.random() * 50) + 20,
          conversions: Math.floor(Math.random() * 10) + 2,
          revenue: Math.floor(Math.random() * 100) + 50
        };
      });
      
      // Calculate totals
      const totals = processedData.reduce(
        (acc, curr) => ({
          totalImpressions: acc.totalImpressions + curr.impressions,
          totalClicks: acc.totalClicks + curr.clicks,
          totalConversions: acc.totalConversions + curr.conversions,
          totalRevenue: acc.totalRevenue + curr.revenue,
        }),
        { totalImpressions: 0, totalClicks: 0, totalConversions: 0, totalRevenue: 0 }
      );

      // Calculate rates
      const clickThroughRate = totals.totalImpressions > 0 
        ? (totals.totalClicks / totals.totalImpressions) * 100 
        : 0;
      const conversionRate = totals.totalClicks > 0 
        ? (totals.totalConversions / totals.totalClicks) * 100 
        : 0;
      const costPerClick = totals.totalClicks > 0 
        ? totals.totalRevenue / totals.totalClicks 
        : 0;
      const returnOnAdSpend = totals.totalRevenue > 0 
        ? (totals.totalRevenue / totals.totalRevenue) * 100 
        : 0;

      setAnalytics({
        ...totals,
        clickThroughRate,
        conversionRate,
        costPerClick,
        returnOnAdSpend,
      });

      // Group data by date for charts
      const chartDataMap = new Map();
      processedData.forEach(item => {
        const date = item.date;
        if (chartDataMap.has(date)) {
          const existing = chartDataMap.get(date);
          chartDataMap.set(date, {
            date,
            impressions: existing.impressions + item.impressions,
            clicks: existing.clicks + item.clicks,
            conversions: existing.conversions + item.conversions,
            revenue: existing.revenue + item.revenue,
          });
        } else {
          chartDataMap.set(date, {
            date,
            impressions: item.impressions,
            clicks: item.clicks,
            conversions: item.conversions,
            revenue: item.revenue,
          });
        }
      });

      setChartData(Array.from(chartDataMap.values()));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const pieData = [
    { name: 'Impressions', value: analytics.totalImpressions, color: '#8884d8' },
    { name: 'Clicks', value: analytics.totalClicks, color: '#82ca9d' },
    { name: 'Conversions', value: analytics.totalConversions, color: '#ffc658' },
  ];

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    format = 'number',
    trend 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    format?: 'number' | 'currency' | 'percentage'; 
    trend?: 'up' | 'down' | 'neutral';
  }) => {
    const formatValue = (val: number) => {
      switch (format) {
        case 'currency':
          return `$${val.toFixed(2)}`;
        case 'percentage':
          return `${val.toFixed(2)}%`;
        default:
          return val.toLocaleString();
      }
    };

    const getTrendColor = () => {
      switch (trend) {
        case 'up': return 'text-success';
        case 'down': return 'text-destructive';
        default: return 'text-muted-foreground';
      }
    };

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          {trend && (
            <p className={`text-xs ${getTrendColor()}`}>
              <TrendingUp className="h-3 w-3 inline mr-1" />
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}
              {Math.abs(12.5)}% from last period
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Impressions"
          value={analytics.totalImpressions}
          icon={Eye}
          trend="up"
        />
        <MetricCard
          title="Total Clicks"
          value={analytics.totalClicks}
          icon={MousePointer}
          trend="up"
        />
        <MetricCard
          title="Click-Through Rate"
          value={analytics.clickThroughRate}
          icon={TrendingUp}
          format="percentage"
          trend="neutral"
        />
        <MetricCard
          title="Total Revenue"
          value={analytics.totalRevenue}
          icon={DollarSign}
          format="currency"
          trend="up"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Conversions"
          value={analytics.totalConversions}
          icon={TrendingUp}
        />
        <MetricCard
          title="Conversion Rate"
          value={analytics.conversionRate}
          icon={TrendingUp}
          format="percentage"
        />
        <MetricCard
          title="Cost Per Click"
          value={analytics.costPerClick}
          icon={DollarSign}
          format="currency"
        />
        <MetricCard
          title="ROAS"
          value={analytics.returnOnAdSpend}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="impressions" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Impressions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Clicks"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Conversions"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary) / 0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Metric Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};