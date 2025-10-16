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
 * Generated: 2025-10-15 04:38:33 UTC
 */

/**
 * AdGo Business Billing Integration Edge Function
 * Handles billing operations, invoice generation, and partner portal integration
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-adgo-billing',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

interface BillingEvent {
  partnerId: string;
  licenseId?: string;
  eventType: 'usage' | 'subscription' | 'payment' | 'refund' | 'upgrade' | 'downgrade';
  amount: number;
  currency: string;
  metadata: Record<string, any>;
}

interface Invoice {
  id: string;
  partnerId: string;
  period: {
    start: string;
    end: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  metadata?: Record<string, any>;
}

interface PartnerBilling {
  partnerId: string;
  plan: string;
  billingCycle: 'monthly' | 'quarterly' | 'annual';
  nextBilling: string;
  paymentMethod?: {
    type: 'card' | 'bank' | 'crypto';
    last4?: string;
    brand?: string;
  };
  balance: number;
  currency: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    const method = req.method;

    // Extract partner ID from JWT or header
    const partnerId = await extractPartnerId(req, supabase);
    if (!partnerId) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    switch (path) {
      case '/billing/usage':
        if (method === 'POST') {
          return await handleUsageBilling(req, supabase, partnerId);
        } else if (method === 'GET') {
          return await getUsageReport(supabase, partnerId);
        }
        break;

      case '/billing/invoices':
        if (method === 'GET') {
          return await getInvoices(supabase, partnerId);
        } else if (method === 'POST') {
          return await generateInvoice(supabase, partnerId);
        }
        break;

      case '/billing/payment':
        if (method === 'POST') {
          return await processPayment(req, supabase, partnerId);
        }
        break;

      case '/billing/subscription':
        if (method === 'GET') {
          return await getSubscription(supabase, partnerId);
        } else if (method === 'PUT') {
          return await updateSubscription(req, supabase, partnerId);
        }
        break;

      case '/billing/balance':
        if (method === 'GET') {
          return await getBalance(supabase, partnerId);
        } else if (method === 'POST') {
          return await addBalance(req, supabase, partnerId);
        }
        break;

      case '/billing/webhooks/stripe':
        return await handleStripeWebhook(req, supabase);

      case '/billing/webhooks/paypal':
        return await handlePayPalWebhook(req, supabase);

      default:
        return new Response('Not Found', { status: 404, headers: corsHeaders });
    }

  } catch (error) {
    console.error('Billing service error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

/**
 * Extract partner ID from JWT token or header
 */
async function extractPartnerId(req: Request, supabase: any): Promise<string | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return null;
    }

    return user.id;
  } catch (error) {
    console.error('Auth extraction error:', error);
    return null;
  }
}

/**
 * Handle usage-based billing events
 */
async function handleUsageBilling(req: Request, supabase: any, partnerId: string) {
  try {
    const billingEvent: BillingEvent = await req.json();
    
    // Validate billing event
    if (!billingEvent.eventType || !billingEvent.amount || !billingEvent.currency) {
      return new Response(
        JSON.stringify({ error: 'Invalid billing event data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate pricing based on partner's plan
    const pricing = await calculateUsagePricing(supabase, partnerId, billingEvent);

    // Record billing event
    const { error: insertError } = await supabase
      .from('billing_events')
      .insert({
        partner_id: partnerId,
        license_id: billingEvent.licenseId,
        event_type: billingEvent.eventType,
        amount: pricing.amount,
        currency: billingEvent.currency,
        original_amount: billingEvent.amount,
        pricing_tier: pricing.tier,
        metadata: billingEvent.metadata,
        created_at: new Date()
      });

    if (insertError) {
      throw insertError;
    }

    // Update partner balance
    await updatePartnerBalance(supabase, partnerId, pricing.amount, billingEvent.currency);

    // Check for billing thresholds
    await checkBillingThresholds(supabase, partnerId);

    return new Response(
      JSON.stringify({
        success: true,
        charged: pricing.amount,
        currency: billingEvent.currency,
        tier: pricing.tier
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Usage billing error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process usage billing' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Calculate usage pricing based on partner plan and tiers
 */
async function calculateUsagePricing(supabase: any, partnerId: string, billingEvent: BillingEvent) {
  // Get partner's billing configuration
  const { data: partner, error } = await supabase
    .from('partner_billing')
    .select('*')
    .eq('partner_id', partnerId)
    .single();

  if (error || !partner) {
    throw new Error('Partner billing configuration not found');
  }

  // Pricing tiers based on plan
  const pricingTiers: Record<string, any> = {
    'starter': {
      api_calls: { rate: 0.001, threshold: 10000 },
      data_transfer: { rate: 0.01, threshold: 1000 }
    },
    'pro': {
      api_calls: { rate: 0.0008, threshold: 50000 },
      data_transfer: { rate: 0.008, threshold: 5000 }
    },
    'enterprise': {
      api_calls: { rate: 0.0005, threshold: 100000 },
      data_transfer: { rate: 0.005, threshold: 10000 }
    }
  };

  const planPricing = pricingTiers[partner.plan] || pricingTiers['starter'];
  const eventPricing = planPricing[billingEvent.eventType] || { rate: 0.001, threshold: 1000 };

  // Apply volume discounts
  let rate = eventPricing.rate;
  if (billingEvent.amount > eventPricing.threshold) {
    rate *= 0.8; // 20% discount for high volume
  }

  return {
    amount: billingEvent.amount * rate,
    tier: partner.plan,
    rate: rate
  };
}

/**
 * Update partner balance
 */
async function updatePartnerBalance(supabase: any, partnerId: string, amount: number, currency: string) {
  const { error } = await supabase.rpc('update_partner_balance', {
    partner_id: partnerId,
    amount: amount,
    currency: currency
  });

  if (error) {
    console.error('Failed to update partner balance:', error);
  }
}

/**
 * Check billing thresholds and trigger alerts
 */
async function checkBillingThresholds(supabase: any, partnerId: string) {
  const { data: balance } = await supabase
    .from('partner_billing')
    .select('balance, currency, billing_threshold')
    .eq('partner_id', partnerId)
    .single();

  if (balance && balance.balance >= balance.billing_threshold) {
    // Trigger billing notification
    await triggerBillingAlert(supabase, partnerId, 'threshold_reached', {
      balance: balance.balance,
      threshold: balance.billing_threshold,
      currency: balance.currency
    });
  }
}

/**
 * Generate invoice for partner
 */
async function generateInvoice(supabase: any, partnerId: string) {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Get billing events for the period
    const { data: events, error } = await supabase
      .from('billing_events')
      .select('*')
      .eq('partner_id', partnerId)
      .gte('created_at', startOfMonth.toISOString())
      .lte('created_at', endOfMonth.toISOString());

    if (error) throw error;

    // Group events by type and calculate totals
    const invoiceItems: InvoiceItem[] = [];
    const eventGroups = events.reduce((acc: any, event: any) => {
      const key = event.event_type;
      if (!acc[key]) {
        acc[key] = { quantity: 0, amount: 0 };
      }
      acc[key].quantity += 1;
      acc[key].amount += event.amount;
      return acc;
    }, {});

    Object.entries(eventGroups).forEach(([eventType, data]: [string, any]) => {
      invoiceItems.push({
        description: `${eventType.replace('_', ' ')} usage`,
        quantity: data.quantity,
        unitPrice: data.amount / data.quantity,
        total: data.amount
      });
    });

    const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax (should be calculated based on region)
    const total = subtotal + tax;

    // Create invoice record
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      partnerId,
      period: {
        start: startOfMonth.toISOString(),
        end: endOfMonth.toISOString()
      },
      items: invoiceItems,
      subtotal,
      tax,
      total,
      currency: 'USD', // Should be based on partner's currency
      status: 'pending'
    };

    // Store invoice in database
    const { error: insertError } = await supabase
      .from('invoices')
      .insert({
        id: invoice.id,
        partner_id: partnerId,
        period_start: invoice.period.start,
        period_end: invoice.period.end,
        items: invoice.items,
        subtotal: invoice.subtotal,
        tax: invoice.tax,
        total: invoice.total,
        currency: invoice.currency,
        status: invoice.status,
        created_at: new Date()
      });

    if (insertError) throw insertError;

    // Generate PDF invoice (would integrate with PDF generation service)
    const pdfUrl = await generateInvoicePDF(invoice);

    return new Response(
      JSON.stringify({
        invoice,
        pdf_url: pdfUrl
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Invoice generation error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate invoice' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Process payment via external payment processor
 */
async function processPayment(req: Request, supabase: any, partnerId: string) {
  try {
    const { amount, currency, payment_method, invoice_id } = await req.json();

    // Validate payment data
    if (!amount || !currency || !payment_method) {
      return new Response(
        JSON.stringify({ error: 'Invalid payment data' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Process payment with external provider (Stripe example)
    const paymentResult = await processStripePayment({
      amount: amount * 100, // Convert to cents
      currency,
      payment_method,
      metadata: {
        partner_id: partnerId,
        invoice_id
      }
    });

    if (paymentResult.success) {
      // Update invoice status
      if (invoice_id) {
        await supabase
          .from('invoices')
          .update({ 
            status: 'paid',
            paid_at: new Date(),
            payment_intent_id: paymentResult.payment_intent_id
          })
          .eq('id', invoice_id);
      }

      // Update partner balance
      await supabase.rpc('credit_partner_balance', {
        partner_id: partnerId,
        amount: amount,
        currency: currency
      });

      return new Response(
        JSON.stringify({
          success: true,
          payment_intent_id: paymentResult.payment_intent_id,
          status: 'paid'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error(paymentResult.error);
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    return new Response(
      JSON.stringify({ error: 'Payment processing failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Stripe payment processing (mock implementation)
 */
async function processStripePayment(paymentData: any) {
  // This would integrate with actual Stripe API
  console.log('Processing Stripe payment:', paymentData);
  
  // Mock successful payment
  return {
    success: true,
    payment_intent_id: 'pi_' + crypto.randomUUID().substring(0, 24)
  };
}

/**
 * Generate PDF invoice (mock implementation)
 */
async function generateInvoicePDF(invoice: Invoice): Promise<string> {
  // This would integrate with PDF generation service
  console.log('Generating PDF for invoice:', invoice.id);
  
  // Mock PDF URL
  return `https://adgo-invoices.s3.amazonaws.com/${invoice.id}.pdf`;
}

/**
 * Trigger billing alert
 */
async function triggerBillingAlert(supabase: any, partnerId: string, alertType: string, metadata: any) {
  await supabase
    .from('billing_alerts')
    .insert({
      partner_id: partnerId,
      alert_type: alertType,
      metadata,
      created_at: new Date()
    });
}

/**
 * Handle Stripe webhooks
 */
async function handleStripeWebhook(req: Request, supabase: any) {
  try {
    const event = await req.json();
    
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(supabase, event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(supabase, event.data.object);
        break;
      case 'invoice.payment_succeeded':
        await handleInvoicePayment(supabase, event.data.object);
        break;
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Stripe webhook error:', error);
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Handle payment success
 */
async function handlePaymentSuccess(supabase: any, paymentIntent: any) {
  const partnerId = paymentIntent.metadata?.partner_id;
  if (partnerId) {
    await supabase
      .from('payment_events')
      .insert({
        partner_id: partnerId,
        event_type: 'payment_success',
        amount: paymentIntent.amount_received / 100,
        currency: paymentIntent.currency,
        payment_intent_id: paymentIntent.id,
        created_at: new Date()
      });
  }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(supabase: any, paymentIntent: any) {
  const partnerId = paymentIntent.metadata?.partner_id;
  if (partnerId) {
    await supabase
      .from('payment_events')
      .insert({
        partner_id: partnerId,
        event_type: 'payment_failure',
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        payment_intent_id: paymentIntent.id,
        failure_reason: paymentIntent.last_payment_error?.message,
        created_at: new Date()
      });
  }
}

/**
 * Handle invoice payment
 */
async function handleInvoicePayment(supabase: any, invoice: any) {
  // Update invoice status in our system
  await supabase
    .from('invoices')
    .update({ 
      status: 'paid',
      paid_at: new Date()
    })
    .eq('stripe_invoice_id', invoice.id);
}

/**
 * Handle PayPal webhooks (placeholder)
 */
async function handlePayPalWebhook(req: Request, supabase: any) {
  // PayPal webhook implementation would go here
  return new Response(
    JSON.stringify({ received: true }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

/**
 * Get usage report
 */
async function getUsageReport(supabase: any, partnerId: string) {
  try {
    const { data: usage, error } = await supabase
      .from('billing_events')
      .select('*')
      .eq('partner_id', partnerId)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;

    return new Response(
      JSON.stringify({ usage }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get usage report' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Get invoices
 */
async function getInvoices(supabase: any, partnerId: string) {
  try {
    const { data: invoices, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('partner_id', partnerId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    return new Response(
      JSON.stringify({ invoices }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get invoices' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Get subscription details
 */
async function getSubscription(supabase: any, partnerId: string) {
  try {
    const { data: subscription, error } = await supabase
      .from('partner_billing')
      .select('*')
      .eq('partner_id', partnerId)
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ subscription }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get subscription' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Update subscription
 */
async function updateSubscription(req: Request, supabase: any, partnerId: string) {
  try {
    const updates = await req.json();

    const { error } = await supabase
      .from('partner_billing')
      .update({
        ...updates,
        updated_at: new Date()
      })
      .eq('partner_id', partnerId);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update subscription' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Get balance
 */
async function getBalance(supabase: any, partnerId: string) {
  try {
    const { data: balance, error } = await supabase
      .from('partner_billing')
      .select('balance, currency')
      .eq('partner_id', partnerId)
      .single();

    if (error) throw error;

    return new Response(
      JSON.stringify({ balance: balance.balance, currency: balance.currency }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to get balance' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

/**
 * Add balance (top-up)
 */
async function addBalance(req: Request, supabase: any, partnerId: string) {
  try {
    const { amount, currency, payment_method } = await req.json();

    // Process payment first
    const paymentResult = await processStripePayment({
      amount: amount * 100,
      currency,
      payment_method,
      metadata: { partner_id: partnerId, type: 'balance_topup' }
    });

    if (paymentResult.success) {
      // Add to balance
      await supabase.rpc('credit_partner_balance', {
        partner_id: partnerId,
        amount: amount,
        currency: currency
      });

      return new Response(
        JSON.stringify({ success: true, payment_intent_id: paymentResult.payment_intent_id }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      throw new Error('Payment failed');
    }

  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to add balance' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}