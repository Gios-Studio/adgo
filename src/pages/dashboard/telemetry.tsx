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

import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  Users,
  AlertTriangle,
  TrendingUp,
  Globe,
  Shield,
  Clock,
  Database,
} from "lucide-react";

interface TelemetryData {
  license_usage_summary: any[];
  analytics: any;
  recent_events: any[];
  system_health: any;
}

export default function TelemetryDashboard() {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    fetchTelemetryData();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTelemetryData, 30000);
    return () => clearInterval(interval);
  }, [selectedPeriod, selectedRegion]);

  const fetchTelemetryData = async () => {
    try {
      setLoading(true);

      // Fetch license usage summary
      const { data: licenseData, error: licenseError } = await supabase
        .from("license_usage_summary")
        .select("*")
        .order("usage_percentage", { ascending: false });

      if (licenseError) throw licenseError;

      // Fetch system analytics
      const { data: analyticsData, error: analyticsError } = await supabase.rpc(
        "get_license_analytics",
        { days_back: parseInt(selectedPeriod) },
      );

      if (analyticsError) throw analyticsError;

      // Fetch recent telemetry events
      let eventsQuery = supabase
        .from("telemetry_events")
        .select(
          `
          *,
          licenses(license_key, plan, region)
        `,
        )
        .order("timestamp", { ascending: false })
        .limit(100);

      if (selectedRegion !== "all") {
        eventsQuery = eventsQuery.eq("region", selectedRegion);
      }

      const { data: eventsData, error: eventsError } = await eventsQuery;

      if (eventsError) throw eventsError;

      // Fetch system health metrics
      const { data: healthData } = await supabase
        .from("telemetry_events")
        .select("event_type, timestamp")
        .gte(
          "timestamp",
          new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        );

      setData({
        license_usage_summary: licenseData || [],
        analytics: analyticsData?.[0] || {},
        recent_events: eventsData || [],
        system_health: healthData || [],
      });
    } catch (error) {
      console.error("Error fetching telemetry data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatUsageData = () => {
    if (!data) return [];

    return data.license_usage_summary.map((license) => ({
      license_key: license.license_key.substring(0, 12) + "...",
      usage_percentage: license.usage_percentage,
      plan: license.plan,
      region: license.region,
      health: license.health_status,
    }));
  };

  const formatEventsByDay = () => {
    if (!data) return [];

    const eventsByDay = {};
    data.recent_events.forEach((event) => {
      const day = new Date(event.timestamp).toLocaleDateString();
      eventsByDay[day] = (eventsByDay[day] || 0) + 1;
    });

    return Object.entries(eventsByDay)
      .map(([day, count]) => ({
        day,
        events: count,
      }))
      .slice(-7);
  };

  const formatEventTypes = () => {
    if (!data) return [];

    const eventTypes = {};
    data.recent_events.forEach((event) => {
      eventTypes[event.event_type] = (eventTypes[event.event_type] || 0) + 1;
    });

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];
    return Object.entries(eventTypes).map(([type, count], index) => ({
      name: type,
      value: count,
      color: colors[index % colors.length],
    }));
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "exceeded":
        return "bg-red-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            SDK Telemetry Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time monitoring of AdGo SDK usage, performance, and health
            metrics
          </p>
        </div>

        <div className="flex gap-4">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="eu">Europe</SelectItem>
              <SelectItem value="africa">Africa</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
              <SelectItem value="americas">Americas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last 24h</SelectItem>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={fetchTelemetryData} variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Licenses
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.analytics?.active_licenses || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +
              {(
                ((data?.analytics?.active_licenses || 0) /
                  Math.max(data?.analytics?.total_licenses || 1, 1)) *
                100
              ).toFixed(1)}
              % active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total API Usage
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.analytics?.total_usage?.toLocaleString() || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Avg: {data?.analytics?.avg_usage_per_license?.toFixed(1) || 0} per
              license
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.analytics?.error_rate?.toFixed(2) || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Last {selectedPeriod} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Region</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {data?.analytics?.top_region || "Global"}
            </div>
            <p className="text-xs text-muted-foreground">Most active region</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Events Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Events Timeline
            </CardTitle>
            <CardDescription>
              Daily event volume over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formatEventsByDay()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="events"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Event Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Event Types Distribution
            </CardTitle>
            <CardDescription>
              Breakdown of event types in selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={formatEventTypes()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatEventTypes().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* License Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            License Usage Overview
          </CardTitle>
          <CardDescription>
            Usage statistics and health status for all active licenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={formatUsageData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="license_key" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage_percentage" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* License Status Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            License Status Details
          </CardTitle>
          <CardDescription>
            Detailed view of license usage, limits, and health status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    License Key
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Plan
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Region
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Usage
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-right">
                    Remaining
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Health
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Last Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.license_usage_summary
                  ?.slice(0, 20)
                  .map((license, index) => (
                    <tr
                      key={license.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                        {license.license_key.substring(0, 16)}...
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Badge
                          variant={
                            license.plan === "enterprise"
                              ? "default"
                              : license.plan === "pro"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {license.plan}
                        </Badge>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 capitalize">
                        {license.region}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {license.usage_count.toLocaleString()} /{" "}
                        {license.usage_limit.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {license.remaining_calls.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <div
                          className={`inline-block w-3 h-3 rounded-full ${getHealthStatusColor(license.health_status)}`}
                        ></div>
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        {license.last_used
                          ? new Date(license.last_used).toLocaleDateString()
                          : "Never"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Telemetry Events</CardTitle>
          <CardDescription>
            Latest events from all SDK instances (max 50 shown)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {data?.recent_events?.slice(0, 50).map((event, index) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      event.event_type === "error" ? "destructive" : "outline"
                    }
                  >
                    {event.event_type}
                  </Badge>
                  <span className="text-sm font-mono">
                    {event.licenses?.license_key?.substring(0, 12)}...
                  </span>
                  <span className="text-sm text-muted-foreground capitalize">
                    {event.region}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(event.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Incremental Static Regeneration for telemetry
export async function getStaticProps() {
  return {
    props: {
      timestamp: new Date().toISOString(),
    },
    revalidate: 60, // Revalidate every minute
  };
}
