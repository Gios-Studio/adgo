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
 * Generated: 2025-10-15 04:38:36 UTC
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get client IP from various possible headers
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const clientIP = req.connection?.remoteAddress || req.socket?.remoteAddress;

  let ip = 'unknown';
  
  if (typeof forwarded === 'string') {
    ip = forwarded.split(',')[0].trim();
  } else if (typeof realIP === 'string') {
    ip = realIP;
  } else if (clientIP) {
    ip = clientIP;
  }

  // Handle IPv6 localhost
  if (ip === '::1') {
    ip = '127.0.0.1';
  }

  res.status(200).json({ ip });
}