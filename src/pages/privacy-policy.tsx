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

import React from "react";
import { NavBar } from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-8 text-gray-700">
            <section>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="mb-4">
                AdGo Solutions Limited ("AdGo," "we," "us," or "our") respects
                your privacy and is committed to protecting your personal data.
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our mobile advertising
                platform and related services.
              </p>
              <p className="mb-4">
                This policy complies with the Kenya Data Protection Act 2019
                (DPA) and the General Data Protection Regulation (GDPR) where
                applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                1.1 Personal Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Contact information (name, email, phone number)</li>
                <li>Account credentials and profile information</li>
                <li>Payment and billing information</li>
                <li>Identity verification documents (as required by law)</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                1.2 Technical Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>
                  Device information (IP address, browser type, operating
                  system)
                </li>
                <li>Usage data (pages visited, time spent, click patterns)</li>
                <li>Location data (with your explicit consent)</li>
                <li>Cookies and tracking technologies</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                1.3 Advertising Data
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Ad interaction data (views, clicks, conversions)</li>
                <li>Campaign performance metrics</li>
                <li>Audience insights and demographics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and maintain our advertising services</li>
                <li>Process payments and manage accounts</li>
                <li>Personalize and optimize ad delivery</li>
                <li>Analyze platform performance and user behavior</li>
                <li>Communicate with you about our services</li>
                <li>Comply with legal obligations and prevent fraud</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                3. Legal Basis for Processing (GDPR)
              </h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Contract:</strong> Processing necessary to perform our
                  services
                </li>
                <li>
                  <strong>Consent:</strong> Marketing communications and
                  non-essential cookies
                </li>
                <li>
                  <strong>Legitimate Interest:</strong> Analytics, security, and
                  service improvement
                </li>
                <li>
                  <strong>Legal Obligation:</strong> Compliance with applicable
                  laws
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                4. Information Sharing
              </h2>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers and business partners</li>
                <li>Payment processors and financial institutions</li>
                <li>Legal authorities when required by law</li>
                <li>Business successors in case of merger or acquisition</li>
              </ul>
              <p className="mt-4">
                <strong>
                  We do not sell your personal data to third parties.
                </strong>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                5. Data Storage and Security
              </h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures
                to protect your data:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encryption in transit and at rest</li>
                <li>Access controls and authentication</li>
                <li>Regular security assessments</li>
                <li>Staff training on data protection</li>
              </ul>
              <p className="mt-4">
                Data is stored on secure servers within Kenya and the European
                Union.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                6. Your Rights
              </h2>
              <p className="mb-4">
                Under the Kenya DPA and GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate information
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion of your data
                </li>
                <li>
                  <strong>Portability:</strong> Transfer your data to another
                  service
                </li>
                <li>
                  <strong>Restriction:</strong> Limit how we process your data
                </li>
                <li>
                  <strong>Objection:</strong> Object to certain processing
                  activities
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Revoke consent at any time
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{" "}
                <a
                  href="mailto:privacy@adgosolutions.com"
                  className="text-blue-600 hover:underline"
                >
                  privacy@adgosolutions.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                7. Cookies and Tracking
              </h2>
              <p className="mb-4">
                We use cookies and similar technologies to enhance your
                experience. You can manage cookie preferences through our
                consent banner or browser settings.
              </p>
              <p className="mb-4">
                For detailed information, see our{" "}
                <a
                  href="/cookie-policy"
                  className="text-blue-600 hover:underline"
                >
                  Cookie Policy
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                8. Data Retention
              </h2>
              <p className="mb-4">
                We retain your personal data only as long as necessary for:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Providing our services to you</li>
                <li>Complying with legal obligations</li>
                <li>Resolving disputes and enforcing agreements</li>
              </ul>
              <p className="mt-4">
                Marketing data is retained for up to 3 years unless you withdraw
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                9. International Transfers
              </h2>
              <p className="mb-4">
                If we transfer your data outside Kenya or the EU, we ensure
                adequate protection through:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>European Commission adequacy decisions</li>
                <li>Standard contractual clauses</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                10. Children's Privacy
              </h2>
              <p>
                Our services are not intended for individuals under 18 years
                old. We do not knowingly collect personal information from
                minors. If you believe we have collected information from a
                minor, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                11. Changes to This Policy
              </h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically. We will notify
                you of significant changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our website</li>
                <li>In-app notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                12. Contact Information
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>AdGo Solutions Limited</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:privacy@adgosolutions.com"
                    className="text-blue-600 hover:underline"
                  >
                    privacy@adgosolutions.com
                  </a>
                </p>
                <p>Phone: +254 700 000 000</p>
                <p>Address: Nairobi, Kenya</p>
              </div>

              <div className="mt-6 space-y-2">
                <p>
                  <strong>Data Protection Officer (DPO)</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:dpo@adgosolutions.com"
                    className="text-blue-600 hover:underline"
                  >
                    dpo@adgosolutions.com
                  </a>
                </p>
              </div>

              <div className="mt-6 space-y-2">
                <p>
                  <strong>Supervisory Authority (Kenya)</strong>
                </p>
                <p>Office of the Data Protection Commissioner</p>
                <p>
                  Website:{" "}
                  <a
                    href="https://www.odpc.go.ke"
                    className="text-blue-600 hover:underline"
                  >
                    www.odpc.go.ke
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Static Site Generation for policy pages
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 86400, // Revalidate once per day
  };
}
