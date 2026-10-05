import type { MetadataRoute } from "next";
import { ALL_SECTOR_SLUGS } from "@/data/sectors";
import { blogArticles } from "@/lib/blog-data";

import { SITE_URL as BASE } from "@/lib/site";
const LOCALES = ["fr", "en"] as const;
const NOW = new Date();

/* ─────────────────────────────────────────────────────────────────────────────
   Static pages with [path, changeFrequency, priority]
───────────────────────────────────────────────────────────────────────────── */
const STATIC_PAGES: [string, MetadataRoute.Sitemap[number]["changeFrequency"], number][] = [
  ["", "weekly", 1.0],
  ["/pourquoi-gtc", "monthly", 0.9],
  ["/plateforme", "monthly", 0.9],
  ["/tarifs", "monthly", 0.9],
  ["/waki-box", "monthly", 0.9],
  ["/cas-usages", "monthly", 0.9],
  ["/reserver", "weekly", 0.9],
  ["/contact", "monthly", 0.8],
  ["/blog", "weekly", 0.8],
  ["/secteurs", "monthly", 0.9],
  ["/services", "monthly", 0.9],
  ["/faq", "monthly", 0.7],
  ["/carrieres", "weekly", 0.6],
  ["/securite", "monthly", 0.8],
  ["/reglementation", "monthly", 0.8],
  ["/processus-itad", "monthly", 0.8],
  ["/methodologie", "monthly", 0.7],
  ["/parcours-client", "monthly", 0.7],
  ["/ecosysteme", "monthly", 0.7],
  ["/impact", "monthly", 0.8],
  ["/demo", "weekly", 0.9],
  ["/lab", "monthly", 0.7],
  ["/certifications", "monthly", 0.8],
  ["/resultats-clients", "monthly", 0.7],
  // Services sub-pages
  ["/services/effacement-securise", "monthly", 0.8],
  ["/services/recyclage-deee", "monthly", 0.8],
  ["/services/reconditionnement-valorisation", "monthly", 0.8],
  ["/services/cybersecurite", "monthly", 0.8],
  ["/services/audit-inventaire", "monthly", 0.8],
  ["/services/wakibox", "monthly", 0.8],
  ["/services/collecte-logistique", "monthly", 0.8],
  // Legal
  ["/cgu", "yearly", 0.3],
  ["/confidentialite", "yearly", 0.3],
  ["/cookies", "yearly", 0.3],
  ["/mentions-legales", "yearly", 0.3],
];

/**
 * hreflang par URL du sitemap (plan SEO du 2026-10-05, reports/seo-plan-gtc.md §2.2.8) :
 * en plus des balises `<link rel="alternate" hreflang>` déjà posées dans le `<head>` de chaque
 * page, Next.js peut générer les mêmes équivalences directement dans sitemap.xml
 * (`<xhtml:link>`). Ce n'est pas indispensable pour Google (l'un des deux canaux suffit), mais
 * c'est une bonne pratique de robustesse à faible effort, explicitement recommandée par le plan.
 */
function alternates(path: string) {
  return {
    languages: {
      fr: `${BASE}/fr${path}`,
      en: `${BASE}/en${path}`,
      "x-default": `${BASE}/fr${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* Static pages (FR + EN mirror) */
  const staticEntries = LOCALES.flatMap((locale) =>
    STATIC_PAGES.map(([path, changeFrequency, priority]) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: NOW,
      changeFrequency,
      priority,
      alternates: alternates(path),
    }))
  );

  /* 16 sector detail pages (FR + EN mirror) */
  const sectorEntries = LOCALES.flatMap((locale) =>
    ALL_SECTOR_SLUGS.map((slug) => ({
      url: `${BASE}/${locale}/secteurs/${slug}`,
      lastModified: NOW,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: alternates(`/secteurs/${slug}`),
    }))
  );

  /* Blog articles (FR + EN mirror) */
  const blogEntries = LOCALES.flatMap((locale) =>
    blogArticles.map((article) => ({
      url: `${BASE}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: alternates(`/blog/${article.slug}`),
    }))
  );

  return [...staticEntries, ...sectorEntries, ...blogEntries];
}
