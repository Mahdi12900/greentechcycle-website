import { redirect } from "next/navigation";

// Force dynamic rendering: statically prerendering this redirect produces a
// broken response (HTTP 307 with no Location header, serving the 404 shell)
// because middleware.ts already redirects "/" -> "/fr" at request time and
// should never let this component render. Keeping "/" fully static caused
// Next.js to bake the redirect() call into a static artifact that bypassed
// the middleware's real HTTP redirect. See reports/deploy-preview-gtc.md.
export const dynamic = "force-dynamic";

export default function RootPage() {
  redirect("/fr");
}
