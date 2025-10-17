/**
 * AdGo Platform - Dynamic Chart Components
 * Optimized for bundle splitting and performance
 */

import dynamic from "next/dynamic";

// Dynamic imports for Recharts chart containers to reduce bundle size
export const DynamicAreaChart = dynamic(
  () => import("recharts").then((mod) => ({ default: mod.AreaChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicLineChart = dynamic(
  () => import("recharts").then((mod) => ({ default: mod.LineChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicBarChart = dynamic(
  () => import("recharts").then((mod) => ({ default: mod.BarChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicPieChart = dynamic(
  () => import("recharts").then((mod) => ({ default: mod.PieChart })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicResponsiveContainer = dynamic(
  () =>
    import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })),
  {
    ssr: false,
    loading: () => <div className="h-[300px] bg-muted animate-pulse rounded" />,
  },
);

// Dynamic Analytics Dashboard
export const DynamicAnalyticsDashboard = dynamic(
  () =>
    import("@/components/AnalyticsDashboard").then((mod) => ({
      default: mod.AnalyticsDashboard,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        <div className="h-[400px] bg-muted animate-pulse rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[200px] bg-muted animate-pulse rounded" />
          <div className="h-[200px] bg-muted animate-pulse rounded" />
        </div>
      </div>
    ),
  },
);

// Other heavy components
export const DynamicConsumerTrends = dynamic(
  () =>
    import("@/components/ConsumerTrends").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false,
    loading: () => <div className="h-[400px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicDemoPreview = dynamic(
  () =>
    import("@/components/DemoPreview").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false,
    loading: () => <div className="h-[400px] bg-muted animate-pulse rounded" />,
  },
);

export const DynamicAdminDashboard = dynamic(
  () =>
    import("@/components/AdminDashboard").then((mod) => ({
      default: mod.default,
    })),
  {
    ssr: false,
    loading: () => <div className="h-[400px] bg-muted animate-pulse rounded" />,
  },
);
