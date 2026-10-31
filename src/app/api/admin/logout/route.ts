import { NextRequest, NextResponse } from "next/server";

/** GET /api/admin/logout — efface le cookie du tableau de bord. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  res.cookies.set("gtc_admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
