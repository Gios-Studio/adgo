import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

const FN_BASE = process.env.ADGO_FN_BASE!;            // e.g. https://<ref>.functions.supabase.co
const ORG_ID = process.env.ADGO_ORG_ID!;              // your org UUID
const ORG_SECRET_HEX = process.env.ADGO_ORG_SECRET_HEX!; // 64-char hex secret

function assertEnv() {
  const missing = [
    !FN_BASE && "ADGO_FN_BASE",
    !ORG_ID && "ADGO_ORG_ID",
    !ORG_SECRET_HEX && "ADGO_ORG_SECRET_HEX",
  ].filter(Boolean);
  if (missing.length) {
    throw new Error(`Missing env: ${missing.join(", ")}`);
  }
}

function sign(body: string) {
  return crypto
    .createHmac("sha256", Buffer.from(ORG_SECRET_HEX, "hex"))
    .update(body)
    .digest("hex");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    assertEnv();
    const op = String(req.query.op || "").toLowerCase();

    // --- GET pacing-check ---
    if (req.method === "GET" && op === "pacing-check") {
      const campaign_id = req.query.campaign_id;
      if (!campaign_id) return res.status(400).json({ error: "campaign_id required" });
      const r = await fetch(`${FN_BASE}/pacing-check?campaign_id=${campaign_id}`);
      const text = await r.text();
      // functions return JSON already
      res.status(r.status).setHeader("Content-Type", "application/json").send(text);
      return;
    }

    // --- POST impression / click (HMAC + idempotency) ---
    if (req.method === "POST" && (op === "impression" || op === "click")) {
      // IMPORTANT: sign exactly what you forward
      const body = JSON.stringify(req.body ?? {});
      const sig = sign(body);
      const r = await fetch(`${FN_BASE}/${op}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-AdGo-Org": ORG_ID,
          "X-AdGo-Signature": sig,
          "Idempotency-Key": crypto.randomUUID(),
        },
        body,
      });
      const text = await r.text();
      res
        .status(r.status)
        .setHeader("Content-Type", "application/json")
        .send(text);
      return;
    }

    // --- POST process-creative (no HMAC) ---
    if (req.method === "POST" && op === "process-creative") {
      const body = JSON.stringify(req.body ?? {});
      const r = await fetch(`${FN_BASE}/process-creative`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const text = await r.text();
      res
        .status(r.status)
        .setHeader("Content-Type", "application/json")
        .send(text);
      return;
    }

    // Fallback
    res.status(405).json({
      error: "Unsupported route",
      usage: {
        post_impression: "/api/adgo?op=impression",
        post_click: "/api/adgo?op=click",
        post_process_creative: "/api/adgo?op=process-creative",
        get_pacing_check: "/api/adgo?op=pacing-check&campaign_id=<uuid>",
      },
    });
  } catch (e: any) {
    res.status(500).json({ error: "server_error", details: String(e?.message || e) });
  }
}