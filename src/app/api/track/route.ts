import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/track — balise de mesure first-party (page vue → table `site_events`).
 *
 * Ne stocke AUCUNE donnée personnelle : pas d'IP, pas de cookie, session_id
 * aléatoire fourni par le navigateur. Filtre : pages internes (/admin, /api,
 * /_next, assets) et user-agents de robots/monitors. Non bloquant : répond
 * toujours 204, même en cas d'échec d'insert (journalisé).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SKIP_PATH = /^\/(admin|api|_next)(\/|$)|\.(svg|ico|png|jpg|webp|css|js|xml|txt|json)$/i;
const BOT_UA = /bot|crawler|spider|uptime|monitor|pingdom|statuscake|headless|lighthouse|pagespeed/i;

function trunc(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

export async function POST(request: NextRequest) {
  try {
    const ua = request.headers.get("user-agent") ?? "";
    if (BOT_UA.test(ua)) return new NextResponse(null, { status: 204 });

    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      return new NextResponse(null, { status: 204 });
    }

    const page = trunc(body.page, 500);
    if (!page || SKIP_PATH.test(page)) return new NextResponse(null, { status: 204 });

    if (!SUPABASE_URL || !SERVICE_KEY) {
      console.error("[track] Supabase non configuré (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
      return new NextResponse(null, { status: 204 });
    }

    const record = {
      session_id: trunc(body.session_id, 64),
      page,
      referrer: trunc(body.referrer, 500),
      user_agent: trunc(ua, 300),
      utm_source: trunc(body.utm_source, 200),
      utm_medium: trunc(body.utm_medium, 200),
      utm_campaign: trunc(body.utm_campaign, 200),
    };

    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_events`, {
      method: "POST",
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error("[track] insert site_events failed", res.status, (await res.text()).slice(0, 200));
    }
  } catch (err) {
    console.error("[track] exception", err);
  }
  return new NextResponse(null, { status: 204 });
}
