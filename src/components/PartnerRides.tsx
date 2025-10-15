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

export default function PartnerRides({ rides }: { rides: any[] }) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="px-4 py-2">Ride ID</th>
          <th className="px-4 py-2">Campaign</th>
          <th className="px-4 py-2">Attribution</th>
        </tr>
      </thead>
      <tbody>
        {rides.map((r) => (
          <tr key={r.id}>
            <td className="border px-4 py-2">{r.id}</td>
            <td className="border px-4 py-2">{r.campaign_id}</td>
            <td className="border px-4 py-2">{r.attribution}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}