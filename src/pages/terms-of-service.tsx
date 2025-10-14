import React from 'react';
import { NavBar } from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="mb-4">
                Welcome to AdGo Kenya Limited ("AdGo," "we," "us," or "our"). These Terms of Service ("Terms") govern your use of our mobile advertising platform and related services (the "Services").
              </p>
              <p className="mb-4">
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                These Terms constitute a legally binding agreement between you and AdGo Kenya Limited. By creating an account, accessing our platform, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <p className="mb-4">
                If you are using our Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="mb-4">
                AdGo provides a mobile advertising platform that connects advertisers with ride-sharing drivers and passengers in Kenya. Our Services include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Ad campaign creation and management tools</li>
                <li>Mobile advertising display solutions</li>
                <li>Analytics and reporting dashboard</li>
                <li>Payment processing for advertisers and drivers</li>
                <li>Audience targeting and optimization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Eligibility</h2>
              <p className="mb-4">To use our Services, you must:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Be at least 18 years old</li>
                <li>Be legally able to enter into binding contracts</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Account Registration and Security</h2>
              <p className="mb-4">
                When you create an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide true, accurate, and complete information</li>
                <li>Keep your account information up to date</li>
                <li>Maintain the confidentiality of your login credentials</li>
                <li>Notify us immediately of any unauthorized use</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Advertiser Terms</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.1 Campaign Requirements</h3>
              <p className="mb-4">Advertisers must ensure that all advertising content:</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Complies with Kenya's advertising standards and laws</li>
                <li>Does not contain illegal, harmful, or offensive material</li>
                <li>Respects intellectual property rights</li>
                <li>Includes accurate and truthful information</li>
                <li>Meets our content guidelines and quality standards</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">5.2 Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Campaigns require pre-payment or approved credit terms</li>
                <li>Fees are based on agreed pricing models (CPM, CPC, etc.)</li>
                <li>Refunds are subject to our refund policy</li>
                <li>All fees are exclusive of applicable taxes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Driver Terms</h2>
              
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.1 Participation Requirements</h3>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Valid driver's license and commercial vehicle registration</li>
                <li>Active ride-sharing platform participation</li>
                <li>Installation and proper use of AdGo display equipment</li>
                <li>Compliance with road safety regulations</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-900 mb-2">6.2 Earnings and Payments</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Earnings based on ad displays and passenger interactions</li>
                <li>Payments processed weekly via mobile money or bank transfer</li>
                <li>Minimum payout thresholds apply</li>
                <li>Tax obligations are the driver's responsibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Prohibited Uses</h2>
              <p className="mb-4">You may not use our Services to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violate any laws, regulations, or third-party rights</li>
                <li>Upload malicious code, viruses, or harmful content</li>
                <li>Interfere with or disrupt our Services or servers</li>
                <li>Attempt unauthorized access to our systems</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Spam or send unsolicited communications</li>
                <li>Harvest or collect user information without consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="mb-4">
                AdGo retains all rights to our platform, software, trademarks, and proprietary content. You are granted a limited, non-exclusive license to use our Services for their intended purpose.
              </p>
              <p className="mb-4">
                You retain ownership of your advertising content but grant us a license to display, distribute, and analyze it as necessary to provide our Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Privacy and Data Protection</h2>
              <p className="mb-4">
                Our collection and use of personal information is governed by our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>, which is incorporated into these Terms by reference.
              </p>
              <p>
                We comply with the Kenya Data Protection Act 2019 and applicable international data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Service Availability</h2>
              <p className="mb-4">
                While we strive for high availability, we do not guarantee uninterrupted access to our Services. We may:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Perform scheduled maintenance and updates</li>
                <li>Temporarily suspend Services for technical issues</li>
                <li>Modify or discontinue features with reasonable notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="mb-4">
                To the fullest extent permitted by law, AdGo shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.
              </p>
              <p className="mb-4">
                Our total liability for any claims arising from these Terms or your use of our Services shall not exceed the amount paid by you to AdGo in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless AdGo and its officers, directors, employees, and agents from any claims, damages, losses, and expenses arising from your use of our Services, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Termination</h2>
              <p className="mb-4">
                Either party may terminate these Terms at any time with or without cause. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your access to our Services will cease</li>
                <li>Outstanding payments will be settled according to our policies</li>
                <li>Provisions relating to liability and intellectual property will survive</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">14. Governing Law and Dispute Resolution</h2>
              <p className="mb-4">
                These Terms are governed by the laws of Kenya. Any disputes arising from these Terms or your use of our Services shall be resolved through:
              </p>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Good faith negotiation between the parties</li>
                <li>Mediation by a mutually agreed mediator</li>
                <li>Final resolution by the courts of Kenya</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">15. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these Terms from time to time. We will notify users of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Email notification to registered users</li>
                <li>Prominent notice on our platform</li>
                <li>In-app notifications</li>
              </ul>
              <p className="mt-4">
                Continued use of our Services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <div className="space-y-2">
                <p><strong>AdGo Kenya Limited</strong></p>
                <p>Email: <a href="mailto:legal@adgo.co.ke" className="text-blue-600 hover:underline">legal@adgo.co.ke</a></p>
                <p>Phone: +254 700 000 000</p>
                <p>Address: Nairobi, Kenya</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">17. Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}