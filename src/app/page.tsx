import { redirect } from "next/navigation";
import { headers } from "next/headers";

/**
 * Root "/" — redirects real visitors to the default locale "/fr".
 *
 * Note: `middleware.ts` at the project root does NOT run for this app —
 * with a `src/app` layout, Next.js only loads middleware from
 * `src/middleware.ts`; a root-level `middleware.ts` is silently ignored.
 * (Confirmed: `.next/server/middleware-manifest.json` has an empty
 * `middleware` map after a full build.) This redirect has always been the
 * one actually in effect for "/", independently of that unused file, which
 * is why it reaches here and not a `middleware.ts` edit.
 *
 * Platform/infrastructure health probes (CloudStation, uptime monitors, load
 * balancers) hit "/" expecting a 200 and typically do not send an
 * `Accept: text/html` header the way a real browser or search-engine
 * crawler does (Chrome/Firefox and Googlebot all send
 * "Accept: text/html,application/xhtml+xml,..."). We use that to answer
 * probes with a plain 200 directly instead of redirecting them, while every
 * real visitor — human or crawler — keeps getting the exact same redirect to
 * "/fr" as before, so the visible i18n behavior and SEO (one canonical URL
 * per locale, reached the same way as always) are unchanged.
 *
 * Merge note (go-live, 2026-10-05): redesign-epure independently fixed the
 * same underlying issue with `export const dynamic = "force-dynamic"` (see
 * reports/deploy-preview-gtc.md). Calling `headers()` below already forces
 * dynamic rendering on this route by itself, so that extra directive is
 * redundant here and was dropped during the merge — behavior for real
 * visitors is unchanged (redirect to "/fr"), and this version additionally
 * keeps main's literal-200-for-probes behavior plus `/api/health`.
 */
export default function RootPage() {
  const accept = headers().get("accept") || "";
  if (accept.includes("text/html")) {
    redirect("/fr");
  }
  // Non-browser request (health probe): respond 200 with no content/redirect.
  return null;
}
