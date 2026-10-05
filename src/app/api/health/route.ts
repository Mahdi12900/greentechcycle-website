import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────────
   GET /api/health
   Dedicated health-check endpoint for platform probes (CloudStation, uptime
   monitors, load balancers). Always returns 200 with no i18n/locale routing
   involved — this path is outside the next-intl middleware matcher
   (middleware.ts config.matcher only covers "/" and "/(fr|en)/:path*"), so it
   is never redirected and never passes through next-intl.
───────────────────────────────────────────────────────────────────────────── */
export async function GET() {
  return NextResponse.json(
    { status: "ok", service: "greentechcycle-website" },
    { status: 200 },
  );
}
