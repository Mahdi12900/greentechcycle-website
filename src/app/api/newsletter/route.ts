import { NextRequest, NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────────────
   Email format validation (RFC-5322 subset)
───────────────────────────────────────────────────────────────────────────── */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/* ─────────────────────────────────────────────────────────────────────────────
   POST /api/newsletter
   Body : { email: string, locale?: "fr" | "en" }
   Returns : 200 OK | 400 Bad Request

   Integrations (graceful fallback when env vars absent):
   - Supabase: upserts into newsletter_subscribers via REST API
   - Resend: sends confirmation email via REST API
───────────────────────────────────────────────────────────────────────────── */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("email" in body) ||
    typeof (body as Record<string, unknown>).email !== "string"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid email field" },
      { status: 400 }
    );
  }

  const email = ((body as Record<string, unknown>).email as string).trim();
  const locale = (body as Record<string, unknown>).locale ?? "fr";

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  /* ── Supabase integration via REST (no npm package required) ────────────── */
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          email,
          locale,
          subscribed_at: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("[newsletter] Supabase insert failed:", err);
      // Non-blocking
    }
  } else {
    /* Fallback: log subscription. No Supabase configured in this environment.
       Configure NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY to persist. */
    console.log(
      `[newsletter] FALLBACK — email=${email} locale=${locale} — not persisted (no Supabase config)`
    );
  }

  /* ── Resend confirmation email via REST API ─────────────────────────────── */
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const subject =
        locale === "en"
          ? "You are subscribed to GreenTechCycle news"
          : "Votre inscription à la newsletter GreenTechCycle est confirmée";
      const html =
        locale === "en"
          ? "<p>Thank you for subscribing to GreenTechCycle news.</p>"
          : "<p>Merci de votre inscription à la newsletter GreenTechCycle.</p>";

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "GreenTechCycle <newsletter@greentechcycle.fr>",
          to: email,
          subject,
          html,
        }),
      });
    } catch (err) {
      console.error("[newsletter] Resend send failed:", err);
      // Non-blocking
    }
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
