/**
 * AdGo Platform - Cron Job Scheduler
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 * 
 * Schedules and manages automated daily report generation
 * Runs daily at 02:00 UTC
 */

import cron from 'node-cron'
import KPIReportGenerator from './export-reports'

class ReportScheduler {
  private generator: KPIReportGenerator

  constructor() {
    this.generator = new KPIReportGenerator()
  }

  // Start the cron job scheduler
  start(): void {
    console.log('🕒 Starting AdGo Report Scheduler...')
    console.log('📅 Daily reports scheduled for 02:00 UTC')

    // Schedule daily report generation at 02:00 UTC
    cron.schedule('0 2 * * *', async () => {
      console.log(`🚀 [${new Date().toISOString()}] Starting scheduled daily report generation`)
      
      try {
        await this.generator.generateAndDistribute()
        console.log(`✅ [${new Date().toISOString()}] Daily reports completed successfully`)
      } catch (error) {
        console.error(`❌ [${new Date().toISOString()}] Daily report generation failed:`, error)
        // In production, send error notification to admin team
        await this.handleError(error)
      }
    }, {
      scheduled: true,
      timezone: "UTC"
    })

    // Schedule weekly summary at 03:00 UTC on Mondays
    cron.schedule('0 3 * * 1', async () => {
      console.log(`📊 [${new Date().toISOString()}] Starting weekly summary generation`)
      try {
        await this.generateWeeklySummary()
        console.log(`✅ [${new Date().toISOString()}] Weekly summary completed`)
      } catch (error) {
        console.error(`❌ [${new Date().toISOString()}] Weekly summary failed:`, error)
      }
    }, {
      scheduled: true,
      timezone: "UTC"
    })

    console.log('✅ Report scheduler started successfully')
    console.log('📋 Active schedules:')
    console.log('   - Daily reports: Every day at 02:00 UTC')
    console.log('   - Weekly summaries: Mondays at 03:00 UTC')
  }

  // Handle errors (send to monitoring service)
  private async handleError(error: any): Promise<void> {
    try {
      // Log to file or monitoring service
      console.error('Report generation error details:', {
        timestamp: new Date().toISOString(),
        error: error.message,
        stack: error.stack
      })

      // In production, integrate with error tracking service
      // e.g., Sentry, DataDog, or custom notification system
      
    } catch (logError) {
      console.error('Failed to log error:', logError)
    }
  }

  // Generate weekly summary report
  private async generateWeeklySummary(): Promise<void> {
    console.log('📊 Generating weekly summary (placeholder)')
    // Implement weekly summary logic here
    // This could aggregate daily reports into a weekly overview
  }

  // Graceful shutdown
  stop(): void {
    console.log('🛑 Stopping report scheduler...')
    cron.getTasks().forEach((task) => {
      task.stop()
    })
    console.log('✅ Report scheduler stopped')
  }
}

// Create and start scheduler
const scheduler = new ReportScheduler()

// Handle process signals for graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT signal')
  scheduler.stop()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM signal')
  scheduler.stop()
  process.exit(0)
})

// Start the scheduler
scheduler.start()

// Keep process alive
console.log('🎯 AdGo Report Scheduler is running...')
console.log('💡 Press Ctrl+C to stop')

export default ReportScheduler