import { NextRequest, NextResponse } from "next/server";

/**
 * Garde des tableaux de bord au niveau MIDDLEWARE (2026-11-01, 3e tour).
 *
 * Le tableau de bord vit désormais sous /pilotage (déplacé depuis /admin :
 * l'adresse /admin était empoisonnée par un cache intermédiaire servant
 * d'anciennes copies 200 malgré no-store — adresse neuve jamais cachée).
 *
 * 1) Auth : le middleware intercepte TOUTES les requêtes "/pilotage/:path*"
 *    (et "/admin/:path*" en redirection) avant le routage. Cookie httpOnly
 *    « gtc_admin » comparé à ADMIN_TOKEN ; sinon 307 → /pilotage/login.
 *    /pilotage/login reste public.
 * 2) /admin : plus aucune route applicative (le dossier a été déplacé) ;
 *    le middleware répond 307 → /pilotage pour toute la branche, avant
 *    tout routage. Une éventuelle copie stale 200 servie par un cache
 *    bordure en amont échappe à ce contrôle (limitation connue).
 * 3) Anti-cache bordure : chaque réponse (307 comme 200 authentifié,
 *    login inclus) porte Cache-Control/CDN-Cache-Control: no-store.
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

const PUBLIC_PATHS = ["/pilotage/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ancienne adresse : funnel vers la nouvelle (aucune route /admin restante).
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = req.nextUrl.clone();
    url.pathname = "/pilotage";
    return withNoStore(NextResponse.redirect(url, 307));
  }

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return withNoStore(NextResponse.next());
  }

  const token = process.env.ADMIN_TOKEN;
  const cookie = req.cookies.get("gtc_admin")?.value;

  if (!token || cookie !== token) {
    const url = req.nextUrl.clone();
    url.pathname = "/pilotage/login";
    return withNoStore(NextResponse.redirect(url, 307));
  }

  return withNoStore(NextResponse.next());
}

export const config = {
  matcher: ["/pilotage/:path*", "/admin/:path*"],
};
