# AdGo Daily Report System

Automated KPI report generation and distribution system for AdGo platform partners.

## Features

- **Daily KPI Reports**: Automated generation at 02:00 UTC
- **Multi-format Output**: PDF and CSV reports
- **Partner Distribution**: Email delivery to all partners
- **Cloud Storage**: Reports stored in Supabase Storage
- **Database Logging**: Report generation tracking
- **Weekly Summaries**: Monday 03:00 UTC aggregated reports

## Installation

```bash
cd /Users/gio/Documents/adgo/scripts
npm install
```

## Environment Variables

Create a `.env` file in the scripts directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key  # For production email
```

## Usage

### One-time Report Generation
```bash
npm run dev
```

### Start Cron Scheduler
```bash
npm run build
npm start
```

### Development Mode
```bash
npm run dev
```

## Report Structure

### Daily KPI Reports Include:
- Partner metrics (impressions, clicks, CTR, revenue)
- Campaign performance breakdown
- Regional performance data
- Active drivers and campaigns count
- Conversion rates and CPM data

### File Outputs:
- `{partner_id}_kpi_report.pdf` - Formatted PDF report
- `{partner_id}_kpi_report.csv` - Raw data CSV export

## Database Schema

Reports require the following Supabase tables:
- `profiles` - Partner information
- `campaigns` - Campaign data
- `analytics_events` - Event tracking
- `daily_reports` - Report generation log

## Cron Schedule

- **Daily Reports**: `0 2 * * *` (02:00 UTC daily)
- **Weekly Summary**: `0 3 * * 1` (03:00 UTC Mondays)

## Architecture

```
AdGo Platform
├── KPI Data Fetching (Supabase)
├── Report Generation (PDF + CSV)
├── Cloud Storage (Supabase Storage)
├── Email Distribution (Resend API)
└── Audit Logging (Database)
```

## Production Deployment

1. Install dependencies: `npm install`
2. Build TypeScript: `npm run build`
3. Set up environment variables
4. Start scheduler: `npm start`
5. Monitor logs for successful execution

## Monitoring

The system logs all activities including:
- Report generation status
- Partner processing completion
- Error handling and recovery
- Email delivery confirmations

For production monitoring, integrate with:
- Error tracking (Sentry)
- Log aggregation (DataDog)
- Uptime monitoring (StatusCake)

## Support

For technical issues or feature requests:
- Email: tech@adgosolutions.com
- Documentation: https://docs.adgosolutions.com/reports