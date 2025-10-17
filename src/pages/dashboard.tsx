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
 */

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Layout from "../../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  MousePointer,
  Users,
  Target,
  Download,
  RefreshCw,
  Calendar,
  MapPin,
  Wallet,
  BarChart3,
  PieChart as PieChartIcon,
  FileSpreadsheet,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

interface DashboardData {
  partner: {
    campaigns: number;
    impressions: number;
    clicks: number;
    ctr: number;
    revenue: number;
    activeDrivers: number;
  };
  advertiser: {
    adSpend: number;
    impressions: number;
    clicks: number;
    ctr: number;
    conversions: number;
    roi: number;
    activeCampaigns: number;
  };
  driver: {
    earnings: number;
    walletBalance: number;
    adViews: number;
    tripsToday: number;
    hoursOnline: number;
    avgEarningsPerTrip: number;
  };
  charts: {
    performanceData: Array<{
      date: string;
      impressions: number;
      clicks: number;
      revenue: number;
      spend: number;
    }>;
    regionData: Array<{
      region: string;
      value: number;
      fill: string;
    }>;
    timeData: Array<{
      hour: string;
      activity: number;
    }>;
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [userRole, setUserRole] = useState<
    "partner" | "advertiser" | "driver" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setRefreshing(true);

      // Get current user and role
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Fetch user profile to determine role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setUserRole(profile?.role || "advertiser");

      // Generate mock data for different roles (in production, fetch from actual tables)
      const mockData: DashboardData = {
        partner: {
          campaigns: 45,
          impressions: 125000,
          clicks: 4500,
          ctr: 3.6,
          revenue: 8750,
          activeDrivers: 230,
        },
        advertiser: {
          adSpend: 5200,
          impressions: 89000,
          clicks: 3200,
          ctr: 3.6,
          conversions: 145,
          roi: 2.3,
          activeCampaigns: 8,
        },
        driver: {
          earnings: 1250,
          walletBalance: 780,
          adViews: 145,
          tripsToday: 12,
          hoursOnline: 7.5,
          avgEarningsPerTrip: 104,
        },
        charts: {
          performanceData: Array.from({ length: 30 }, (_, i) => ({
            date: format(
              new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
              "MMM dd",
            ),
            impressions: Math.floor(Math.random() * 5000) + 2000,
            clicks: Math.floor(Math.random() * 200) + 50,
            revenue: Math.floor(Math.random() * 500) + 100,
            spend: Math.floor(Math.random() * 300) + 80,
          })),
          regionData: [
            { region: "Nairobi", value: 45, fill: COLORS[0] },
            { region: "Mombasa", value: 25, fill: COLORS[1] },
            { region: "Kisumu", value: 15, fill: COLORS[2] },
            { region: "Nakuru", value: 10, fill: COLORS[3] },
            { region: "Other", value: 5, fill: COLORS[4] },
          ],
          timeData: Array.from({ length: 24 }, (_, i) => ({
            hour: `${i}:00`,
            activity: Math.floor(Math.random() * 100) + 20,
          })),
        },
      };

      setData(mockData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Export data functions
  const exportToCSV = () => {
    if (!data) return;

    const csvData = data.charts.performanceData
      .map(
        (row) =>
          `${row.date},${row.impressions},${row.clicks},${row.revenue},${row.spend}`,
      )
      .join("\n");

    const csvContent = `Date,Impressions,Clicks,Revenue,Spend\n${csvData}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `adgo-analytics-${format(new Date(), "yyyy-MM-dd")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success("CSV exported successfully");
  };

  const exportToPDF = async () => {
    toast("PDF export feature coming soon", { icon: "📄" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p>Loading dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="text-center py-8">
          <p className="text-red-500">Failed to load dashboard data</p>
        </div>
      </Layout>
    );
  }

  // Partner Dashboard
  const PartnerDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold">
                  ${data.partner.revenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline h-3 w-3" /> +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Campaigns
                </p>
                <p className="text-2xl font-bold">{data.partner.campaigns}</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-xs text-blue-600 mt-1">
              <TrendingUp className="inline h-3 w-3" /> +5 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Drivers
                </p>
                <p className="text-2xl font-bold">
                  {data.partner.activeDrivers}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <p className="text-xs text-purple-600 mt-1">
              CTR: {data.partner.ctr}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.charts.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.charts.regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ region, value }) => `${region}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.charts.regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Advertiser Dashboard
  const AdvertiserDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Ad Spend</p>
                <p className="text-2xl font-bold">
                  ${data.advertiser.adSpend.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Impressions</p>
                <p className="text-2xl font-bold">
                  {data.advertiser.impressions.toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Clicks</p>
                <p className="text-2xl font-bold">
                  {data.advertiser.clicks.toLocaleString()}
                </p>
              </div>
              <MousePointer className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ROI</p>
                <p className="text-2xl font-bold">{data.advertiser.roi}x</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.charts.performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="#8884d8"
                name="Impressions"
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#82ca9d"
                name="Clicks"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  // Driver Dashboard
  const DriverDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Today's Earnings
                </p>
                <p className="text-2xl font-bold">
                  KES {data.driver.earnings.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Wallet Balance
                </p>
                <p className="text-2xl font-bold">
                  KES {data.driver.walletBalance.toLocaleString()}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Ad Views Today
                </p>
                <p className="text-2xl font-bold">{data.driver.adViews}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.charts.timeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="activity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userRole === "partner" && "Partner Dashboard"}
              {userRole === "advertiser" && "Advertiser Dashboard"}
              {userRole === "driver" && "Driver Dashboard"}
            </h1>
            <p className="text-gray-500">
              Real-time analytics and performance metrics
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={fetchDashboardData}
              variant="outline"
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>

            <Button onClick={exportToCSV} variant="outline">
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              CSV
            </Button>

            <Button onClick={exportToPDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 text-sm text-green-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live data • Auto-refreshes every 10 seconds</span>
          <Badge variant="outline" className="text-xs">
            Last updated: {format(new Date(), "HH:mm:ss")}
          </Badge>
        </div>

        {/* Role-based Dashboard Content */}
        <Tabs
          value={userRole || "advertiser"}
          onValueChange={(value) => setUserRole(value as any)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="partner">Partner</TabsTrigger>
            <TabsTrigger value="advertiser">Advertiser</TabsTrigger>
            <TabsTrigger value="driver">Driver</TabsTrigger>
          </TabsList>

          <TabsContent value="partner">
            <PartnerDashboard />
          </TabsContent>

          <TabsContent value="advertiser">
            <AdvertiserDashboard />
          </TabsContent>

          <TabsContent value="driver">
            <DriverDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

// Incremental Static Regeneration for dashboard
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
    revalidate: 60, // Revalidate every minute
  };
}
