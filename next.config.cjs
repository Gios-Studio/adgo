/** @type {import('next').NextConfig} */
/** Ensures Next.js uses /src/pages directory **/
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  experimental: { appDir: false },
  webpack: (config) => {
    config.module.rules.push({
      test: /supabase[\\/]functions[\\/].*\.ts$/,
      loader: "ignore-loader",
    });
    return config;
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://rkonwkggxaohpmxmzmfn.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrb253a2dneGFvaHBteG16bWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0OTk0MDQsImV4cCI6MjA3MzA3NTQwNH0.F8dsonOXlKqViCP-Jz5CpxS4ObXIbWoTHGLB3udjRqo",
  },
};

export default nextConfig;