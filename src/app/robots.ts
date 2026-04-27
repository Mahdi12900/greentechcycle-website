import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/reserver/merci"],
    },
    sitemap: "https://greentechcycle-website.vercel.app/sitemap.xml",
  };
}
