/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://ykqsavtoqrhrimvwjubz.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcXNhdnRvcXJocmltdndqdWJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMjMyMTAsImV4cCI6MjA3MTY5OTIxMH0._CtaS4TH3v4ic0miHeVzaaZOT6n6Mk2gGaEUq4l0dN4'
  }
}

module.exports = nextConfig
