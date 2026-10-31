import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/admin/login — authentification du tableau de bord /admin.
 * Le token (env ADMIN_TOKEN, saisi par le fondateur dans l'onglet Variables
 * CloudStation) est comparé en temps constant ; en cas de succès un cookie
 * httpOnly « gtc_admin » est posé (7 jours). Aucun secret dans le code.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  const form = await request.formData();
  const given = typeof form.get("token") === "string" ? (form.get("token") as string) : "";

  const ok =
    !!token &&
    given.length === token.length &&
    // comparaison simple à coût constant (Node crypto.timingSafeEqual via Buffer)
    (() => {
      try {
        const { timingSafeEqual } = require("crypto");
        return timingSafeEqual(Buffer.from(given), Buffer.from(token));
      } catch {
        return false;
      }
    })();

  if (!ok) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  const res = NextResponse.redirect(new URL("/admin", request.url), 303);
  res.cookies.set("gtc_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
