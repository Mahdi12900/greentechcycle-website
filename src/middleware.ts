import { NextRequest, NextResponse } from "next/server";

/**
 * Garde /admin au niveau MIDDLEWARE (2026-11-01, renforcé 2e tour).
 *
 * 1) Auth : le middleware intercepte TOUTES les requêtes "/admin/:path*"
 *    avant le routage et répond 307 → /admin/login si le cookie httpOnly
 *    « gtc_admin » ne correspond pas à ADMIN_TOKEN. /admin/login reste
 *    public. La vérification côté page reste en défense en profondeur.
 * 2) Anti-cache bordure : chaque réponse de la branche /admin (307 comme
 *    200 authentifié, login inclus) porte Cache-Control: no-store /
 *    CDN-Cache-Control: no-store. Objectif : aucun intermédiaire
 *    (proxy plateforme, edge CDN) ne doit conserver une copie d'une
 *    réponse /admin — l'ancienne page catch-all 200 était servie avec
 *    s-maxage=31536000 et a pu être stockée par un cache intermédiaire.
 */

const NO_STORE = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  "CDN-Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Expires": "0",
};

function withNoStore(res: NextResponse): NextResponse {
  for (const [k, v] of Object.entries(NO_STORE)) res.headers.set(k, v);
  return res;
}

const PUBLIC_PATHS = ["/admin/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return withNoStore(NextResponse.next());
  }

  const token = process.env.ADMIN_TOKEN;
  const cookie = req.cookies.get("gtc_admin")?.value;

  if (!token || cookie !== token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return withNoStore(NextResponse.redirect(url, 307));
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
