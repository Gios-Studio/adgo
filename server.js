// server.js - AdGo proxy (impression/click/process-creative/pacing-check)
import express from "express";
import crypto from "crypto";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json({ limit: "2mb" }));

// ENV (create a .env and load with something like dotenv if you prefer)
const FN_BASE = process.env.ADGO_FN_BASE;           // e.g. https://<ref>.functions.supabase.co
const ORG_ID = process.env.ADGO_ORG_ID;             // your org UUID
const ORG_SECRET_HEX = process.env.ADGO_ORG_SECRET_HEX; // 64-char hex

function sign(body) {
  return crypto.createHmac("sha256", Buffer.from(ORG_SECRET_HEX, "hex"))
               .update(body)
               .digest("hex");
}

app.post("/api/adgo", async (req, res) => {
  try {
    const op = (req.query.op || "").toString().toLowerCase();
    // pacing-check is a GET, handle below
    if (!["impression", "click", "process-creative"].includes(op)) {
      return res.status(400).json({ error: "op must be impression|click|process-creative" });
    }

    const body = JSON.stringify(req.body ?? {});
    let url = `${FN_BASE}/${op}`;

    const headers = { "Content-Type": "application/json" };

    if (op === "impression" || op === "click") {
      headers["X-AdGo-Org"] = ORG_ID;
      headers["X-AdGo-Signature"] = sign(body);
      headers["Idempotency-Key"] = crypto.randomUUID();
    }

    const r = await fetch(url, { method: "POST", headers, body });
    const text = await r.text();
    res.status(r.status).type("application/json").send(text);
  } catch (e) {
    res.status(500).json({ error: "server_error", details: String(e) });
  }
});

app.get("/api/adgo", async (req, res) => {
  try {
    const op = (req.query.op || "").toString().toLowerCase();
    if (op !== "pacing-check") return res.status(400).json({ error: "unsupported op" });
    const campaign_id = req.query.campaign_id;
    if (!campaign_id) return res.status(400).json({ error: "campaign_id required" });

    const r = await fetch(`${FN_BASE}/pacing-check?campaign_id=${campaign_id}`);
    const text = await r.text();
    res.status(r.status).type("application/json").send(text);
  } catch (e) {
    res.status(500).json({ error: "server_error", details: String(e) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`[adgo-proxy] listening on http://localhost:${PORT}`));