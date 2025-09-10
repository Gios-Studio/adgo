import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const BUCKET: Record<string, { count: number; until: number }> = {};
const WINDOW_MS = 60_000; // 1 minute
const LIMIT = 10;         // max requests per IP per window

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/api/sdk/")) {
    return NextResponse.next();
  }

  // Pull IP from headers (falls back to "unknown")
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const slot = BUCKET[ip] ?? { count: 0, until: now + WINDOW_MS };

  if (now > slot.until) {
    slot.count = 0;
    slot.until = now + WINDOW_MS;
  }

  slot.count += 1;
  BUCKET[ip] = slot;

  if (slot.count > LIMIT) {
    return new NextResponse(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/sdk/:path*"],
};