/**
 * AdGo Platform - AI Moderation Edge Function
 * 
 * Copyright (c) 2025 AdGo Solutions Limited.
 * All rights reserved.
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ModerationRequest {
  adId: string
  title: string
  description: string
  mediaUrl?: string
}

interface ModerationResult {
  flagged: boolean
  categories: string[]
  category_scores: Record<string, number>
  confidence: number
  reasons: string[]
}

// Prohibited keywords by category
const MODERATION_RULES = {
  fraud: ['scam', 'fraud', 'fake', 'ponzi', 'pyramid scheme', 'get rich quick', 'guaranteed money'],
  adult: ['nsfw', 'adult', 'xxx', 'porn', 'sex', 'nude', 'naked'],
  violence: ['violence', 'violent', 'kill', 'murder', 'weapon', 'gun', 'bomb', 'terrorist'],
  hate: ['hate', 'nazi', 'racist', 'discrimination', 'genocide', 'supremacist'],
  illegal: ['drugs', 'cocaine', 'heroin', 'marijuana', 'illegal', 'contraband', 'stolen'],
  gambling: ['gambling', 'casino', 'poker', 'blackjack', 'lottery', 'betting', 'wager'],
  crypto: ['bitcoin', 'cryptocurrency', 'crypto', 'trading signals', 'forex guaranteed'],
  medical: ['miracle cure', 'cancer cure', 'lose weight fast', 'prescription', 'medical advice'],
  spam: ['click here', 'limited time', 'act now', 'urgent', 'winner', 'congratulations', 'free money']
}

// Calculate moderation score
function moderateContent(text: string): ModerationResult {
  const lowerText = text.toLowerCase()
  const flaggedCategories: string[] = []
  const categoryScores: Record<string, number> = {}
  const reasons: string[] = []

  // Check each category
  for (const [category, keywords] of Object.entries(MODERATION_RULES)) {
    const foundKeywords = keywords.filter(keyword => lowerText.includes(keyword))
    
    if (foundKeywords.length > 0) {
      flaggedCategories.push(category)
      categoryScores[category] = Math.min(foundKeywords.length / keywords.length, 1.0)
      reasons.push(`${category.toUpperCase()}: Contains "${foundKeywords.join('", "')}"`)
    }
  }

  // Calculate overall confidence
  const maxScore = Math.max(...Object.values(categoryScores), 0)
  const avgScore = Object.values(categoryScores).length > 0 
    ? Object.values(categoryScores).reduce((a, b) => a + b, 0) / Object.values(categoryScores).length
    : 0

  const confidence = Math.max(maxScore, avgScore)
  const flagged = confidence > 0.3 || flaggedCategories.length > 0

  return {
    flagged,
    categories: flaggedCategories,
    category_scores: categoryScores,
    confidence: Math.round(confidence * 100) / 100,
    reasons
  }
}

// Advanced content analysis
function analyzeContent(title: string, description: string): ModerationResult {
  const fullText = `${title} ${description}`
  
  // Run basic keyword moderation
  const result = moderateContent(fullText)
  
  // Additional heuristics
  const suspiciousPatterns = [
    /\$\d+.*per.*day/gi,                    // Money per time promises
    /\d+%.*guaranteed/gi,                   // Percentage guarantees
    /click.*link.*bio/gi,                   // Suspicious link requests
    /dm.*me.*for/gi,                        // DM requests
    /whatsapp.*\+\d+/gi,                    // Phone number sharing
    /limited.*spots?.*available/gi,         // Urgency tactics
    /doctors.*hate.*this/gi,                // Clickbait medical
    /secret.*method/gi,                     // Secret method claims
  ]

  const patternMatches = suspiciousPatterns.filter(pattern => pattern.test(fullText))
  
  if (patternMatches.length > 0) {
    result.flagged = true
    result.confidence = Math.max(result.confidence, 0.6)
    result.categories.push('suspicious_patterns')
    result.reasons.push(`PATTERN: Detected ${patternMatches.length} suspicious pattern(s)`)
  }

  // Length-based analysis
  if (title.length < 10) {
    result.confidence += 0.1
    result.reasons.push('QUALITY: Title too short')
  }

  if (description.length < 20) {
    result.confidence += 0.1
    result.reasons.push('QUALITY: Description too short')
  }

  // Excessive capitalization
  const capsRatio = (fullText.match(/[A-Z]/g) || []).length / fullText.length
  if (capsRatio > 0.5) {
    result.flagged = true
    result.confidence += 0.2
    result.categories.push('spam')
    result.reasons.push('SPAM: Excessive capitalization detected')
  }

  return result
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request
    const { adId, title, description, mediaUrl }: ModerationRequest = await req.json()

    console.log(`🤖 Moderating ad ${adId}: "${title}"`)

    // Perform content moderation
    const moderationResult = analyzeContent(title, description)

    // Log moderation result
    console.log(`📊 Moderation result:`, {
      adId,
      flagged: moderationResult.flagged,
      confidence: moderationResult.confidence,
      categories: moderationResult.categories,
      reasonCount: moderationResult.reasons.length
    })

    // Store moderation log in database
    const { error: logError } = await supabase
      .from('ad_moderation')
      .insert({
        ad_id: adId,
        action: 'ai_moderation',
        ai_confidence: moderationResult.confidence,
        ai_categories: moderationResult.categories,
        ai_reasons: moderationResult.reasons,
        flagged: moderationResult.flagged,
        created_at: new Date().toISOString()
      })

    if (logError) {
      console.error('Failed to log moderation:', logError)
    }

    // Return moderation result
    return new Response(
      JSON.stringify(moderationResult),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Moderation error:', error)
    
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error.message
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})