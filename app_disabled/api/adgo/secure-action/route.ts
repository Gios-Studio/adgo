import { NextResponse } from "next/server";
import { ADGO_ORG_SECRET_HEX } from "@/lib/env.server"; // server-only

export async function POST(req: Request) {
  const body = await req.json();

  // Authenticate using server-only secret (never expose to client)
  const ok = body?.secret === ADGO_ORG_SECRET_HEX; // or HMAC check here
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // ... privileged work ...
  return NextResponse.json({ ok: true });
}