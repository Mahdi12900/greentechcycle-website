import { NextRequest, NextResponse } from "next/server";

/**
 * Garde /admin au niveau MIDDLEWARE (2026-11-01).
 *
 * Pourquoi : la vérification cookie vivait uniquement dans la page
 * (redirect() dans le server component). Une navigation navigateur reçoit
 * bien un 307, mais une requête « RSC » (header RSC: 1, prefetch Next)
 * recevait 200 + payload flight — la redirection était alors portée par le
 * JS client, invisible pour toute sonde HTTP. Le middleware intercepte
 * TOUTES les requêtes vers /admin et répond 307 avant le routage,
 * indépendamment des en-têtes. La vérification cookie côté page reste en
 * défense en profondeur.
 *
 * Auth : cookie httpOnly « gtc_admin » comparé à ADMIN_TOKEN (variable
 * CloudStation, jamais dans le code). /admin/login reste public.
 */

const PUBLIC_PATHS = ["/admin/login"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const token = process.env.ADMIN_TOKEN;
  const cookie = req.cookies.get("gtc_admin")?.value;

  if (!token || cookie !== token) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
