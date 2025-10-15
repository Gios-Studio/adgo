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
 * Generated: 2025-10-15 04:38:34 UTC
 */

import React from 'react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 md:px-12 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <Logo />
            <p className="text-muted-foreground max-w-xs">
              Kenya's premier mobile advertising platform connecting brands with drivers and passengers for impactful, location-based marketing.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/advertiser" className="hover:text-foreground transition-colors">For Advertisers</a></li>
              <li><a href="/driver" className="hover:text-foreground transition-colors">For Drivers</a></li>
              <li><a href="/analytics" className="hover:text-foreground transition-colors">Analytics</a></li>
              <li><a href="/campaigns" className="hover:text-foreground transition-colors">Campaign Manager</a></li>
              <li><a href="/sdk" className="hover:text-foreground transition-colors">SDK Integration</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-foreground transition-colors">About AdGo</a></li>
              <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="/careers" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="/press" className="hover:text-foreground transition-colors">Press Kit</a></li>
              <li><a href="/partners" className="hover:text-foreground transition-colors">Partner Program</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-foreground mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/help" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="/status" className="hover:text-foreground transition-colors">System Status</a></li>
              <li><a href="mailto:support@adgosolutions.com" className="hover:text-foreground transition-colors">Email Support</a></li>
              <li><a href="tel:+254700000000" className="hover:text-foreground transition-colors">+254 700 000 000</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AdGo Solutions Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/cookie-policy" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;