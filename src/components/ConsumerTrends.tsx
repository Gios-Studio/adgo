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
 * Generated: 2025-10-15 04:38:34 UTC
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Eye, Clock, Smartphone, Monitor, Tablet } from 'lucide-react';

const trendData = [
  { month: 'Jan', engagement: 65, purchases: 45, searches: 120, socialMedia: 85 },
  { month: 'Feb', engagement: 72, purchases: 52, searches: 135, socialMedia: 92 },
  { month: 'Mar', engagement: 68, purchases: 48, searches: 128, socialMedia: 88 },
  { month: 'Apr', engagement: 78, purchases: 61, searches: 145, socialMedia: 105 },
  { month: 'May', engagement: 82, purchases: 67, searches: 156, socialMedia: 112 },
  { month: 'Jun', engagement: 85, purchases: 73, searches: 168, socialMedia: 118 },
];

const demographicData = [
  { ageGroup: '18-24', percentage: 28, growth: 12.5 },
  { ageGroup: '25-34', percentage: 35, growth: 8.3 },
  { ageGroup: '35-44', percentage: 22, growth: -2.1 },
  { ageGroup: '45-54', percentage: 10, growth: -5.4 },
  { ageGroup: '55+', percentage: 5, growth: 3.2 },
];

const deviceTrends = [
  { device: 'Mobile', usage: 68, trend: 'up', change: 15.2 },
  { device: 'Desktop', usage: 25, trend: 'down', change: -8.7 },
  { device: 'Tablet', usage: 7, trend: 'up', change: 2.4 },
];

const interestCategories = [
  { category: 'Technology', interest: 78, growth: 12.3 },
  { category: 'Fashion', interest: 65, growth: 8.7 },
  { category: 'Health & Wellness', interest: 71, growth: 15.8 },
  { category: 'Travel', interest: 42, growth: -12.4 },
  { category: 'Food & Dining', interest: 56, growth: 5.2 },
  { category: 'Entertainment', interest: 69, growth: 9.1 },
];

const ConsumerTrends = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('engagement');

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return Smartphone;
      case 'Desktop': return Monitor;
      case 'Tablet': return Tablet;
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Consumer Trends</h2>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement">Engagement</SelectItem>
              <SelectItem value="purchases">Purchases</SelectItem>
              <SelectItem value="searches">Searches</SelectItem>
              <SelectItem value="socialMedia">Social Media</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Engagement</p>
                <p className="text-2xl font-bold">75.2%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Purchase Intent</p>
                <p className="text-2xl font-bold">42.8%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Session Duration</p>
                <p className="text-2xl font-bold">3.4m</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  <span className="text-sm text-red-600">-2.1%</span>
                </div>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">28.7K</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+15.7%</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle>Consumer Behavior Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Device Usage */}
      <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle>Device Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deviceTrends.map((device) => {
              const IconComponent = getDeviceIcon(device.device);
              return (
                <div key={device.device} className="text-center p-4 bg-muted/50 rounded-lg">
                  <IconComponent className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold">{device.device}</h3>
                  <p className="text-2xl font-bold">{device.usage}%</p>
                  <div className="flex items-center justify-center mt-2">
                    {device.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${device.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {device.change > 0 ? '+' : ''}{device.change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interest Categories */}
      <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur">
        <CardHeader>
          <CardTitle>Interest Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interestCategories.map((category) => (
              <div key={category.category} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{category.category}</h3>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${category.interest}%` }}
                      />
                    </div>
                    <span className="ml-3 text-sm font-medium">{category.interest}%</span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <Badge variant={category.growth > 0 ? 'default' : 'secondary'}>
                    {category.growth > 0 ? '+' : ''}{category.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerTrends;