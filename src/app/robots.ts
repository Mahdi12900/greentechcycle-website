import type { MetadataRoute } from "next";
import { SITE_NOINDEX, absoluteUrl } from "@/lib/site";

/**
 * robots.txt — indexation autorisée en production ; tout est interdit si SITE_NOINDEX=true
 * (préproduction dédiée). Le sitemap pointe toujours vers NEXT_PUBLIC_SITE_URL (src/lib/site.ts).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: SITE_NOINDEX
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: ["/api/", "/reserver/merci"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
