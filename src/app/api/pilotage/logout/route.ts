import { NextRequest, NextResponse } from "next/server";

/** GET /api/pilotage/logout — efface le cookie du tableau de bord (déplacé depuis /api/admin/logout). */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Location RELATIF (voir login/route.ts) : request.url reflète l'adresse
 * interne 0.0.0.0:3000 du conteneur, injoignable pour le navigateur du
 * fondateur ; un Location relatif est résolu contre l'hôte public.
 */
export async function GET(_request: NextRequest) {
  const res = new NextResponse(null, { status: 303 });
  res.headers.set("Location", "/pilotage/login");
  res.cookies.set("gtc_admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
