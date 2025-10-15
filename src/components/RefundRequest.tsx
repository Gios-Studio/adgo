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

// components/RefundRequest.tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function RefundRequest({ campaignId, userId, tenantId }:
  { campaignId: string; userId: string; tenantId: string }) {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState(0);

  const requestRefund = async () => {
    await supabase.from("refunds").insert({
      tenant_id: tenantId,
      campaign_id: campaignId,
      user_id: userId,
      reason,
      amount,
    });
    alert("Refund requested");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="font-bold">Request Refund</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full my-2"
      />
      <textarea
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="border p-2 rounded w-full my-2"
      />
      <button onClick={requestRefund} className="bg-red-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}