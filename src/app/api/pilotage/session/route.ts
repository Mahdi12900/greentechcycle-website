import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/pilotage/session — sonde d'authentification du tableau de bord.
 * 200 {ok:true} si le cookie httpOnly « gtc_admin » correspond à ADMIN_TOKEN,
 * 401 {ok:false} sinon. Sert de defense-in-depth CÔTÉ CLIENT : le tableau de
 * bord (/pilotage) vérifie cette route au chargement et renvoie vers
 * /pilotage/login si la session est absente — même si une vieille copie
 * servie par un cache intermédiaire se présentait un jour, elle se
 * neutralise toute seule. Aucun secret dans la réponse.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = process.env.ADMIN_TOKEN;
  const cookie = request.cookies.get("gtc_admin")?.value;
  const ok = !!token && cookie === token;
  return NextResponse.json(
    { ok },
    {
      status: ok ? 200 : 401,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        "CDN-Cache-Control": "no-store",
      },
    }
  );
}
