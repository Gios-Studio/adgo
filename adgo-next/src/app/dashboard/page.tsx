"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Example: props could come from Supabase query in ClientDashboard
const mockKpis = {
  impressions: 0,
  clicks: 0,
  ctr: 0.0,
  ecpm: 0.0,
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Impressions</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mockKpis.impressions}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mockKpis.clicks}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CTR</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mockKpis.ctr.toFixed(2)}%
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>eCPM</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            ${mockKpis.ecpm.toFixed(2)}
          </CardContent>
        </Card>
      </div>

      {/* Campaigns list placeholder */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Campaigns</h2>
        <Card>
          <CardContent className="p-4">
            <p>No campaigns yet. Create one to get started 🚀</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}