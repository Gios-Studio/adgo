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