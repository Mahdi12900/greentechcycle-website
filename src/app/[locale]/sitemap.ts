import type { MetadataRoute } from "next";
import { blogArticles } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://greentechcycle.fr";
  const locales = ["fr", "en"];

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/processus-itad", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/plateforme", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/pourquoi-gtc", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/parcours-client", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ecosysteme", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/reglementation", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/methodologie", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/demo", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/securite", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/impact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/carrieres", priority: 0.6, changeFrequency: "weekly" as const },
    { path: "/cas-usages", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/secteurs/finance", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/secteurs/sante", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/secteurs/industrie", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/secteurs/public", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cgu", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticPages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    }))
  );

  const blogPages = locales.flatMap((locale) =>
    blogArticles.map((article) => ({
      url: `${base}/${locale}/blog/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...blogPages];
}
