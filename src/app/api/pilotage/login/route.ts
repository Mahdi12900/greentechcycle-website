import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

/**
 * POST /api/pilotage/login — authentification du tableau de bord /pilotage (déplacé depuis /api/admin/login).
 * Le token (env ADMIN_TOKEN, saisi par le fondateur dans l'onglet Variables
 * CloudStation) est comparé en temps constant ; en cas de succès un cookie
 * httpOnly « gtc_admin » est posé (7 jours). Aucun secret dans le code.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * 303 avec Location RELATIF : derrière le reverse proxy CloudStation, request.url
 * vaut http://0.0.0.0:3000/... (adresse interne du conteneur). Un Location absolu
 * construit dessus renverrait le navigateur du fondateur vers 0.0.0.0:3000
 * (connexion impossible). Un en-tête Location relatif (/pilotage/...) est
 * conforme RFC 7231 et résolu par le navigateur contre l'hôte public.
 */
function seeOther(location: string): NextResponse {
  const res = new NextResponse(null, { status: 303 });
  res.headers.set("Location", location);
  return res;
}

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
        return timingSafeEqual(Buffer.from(given), Buffer.from(token));
      } catch {
        return false;
      }
    })();

  if (!ok) {
    return seeOther("/pilotage/login?error=1");
  }
  const res = seeOther("/pilotage");
  res.cookies.set("gtc_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
