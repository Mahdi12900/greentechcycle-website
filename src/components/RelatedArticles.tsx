"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { blogArticles, type BlogArticle } from "@/lib/blog-data";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useLocale } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

interface RelatedArticlesProps {
  /** Filter by one or more categories (exact match on BlogArticle.category). */
  categories?: string[];
  /** Filter by slug keywords (article matched if its slug contains any keyword). */
  keywords?: string[];
  /** Max items to show. */
  limit?: number;
  /** Override heading. */
  title?: string;
  /** Override subtitle. */
  subtitle?: string;
  /** Background tone. */
  tone?: "white" | "light" | "primary";
  /** Eyebrow label. */
  eyebrow?: string;
  className?: string;
}

export default function RelatedArticles({
  categories,
  keywords,
  limit = 3,
  title = "Articles liés à consulter",
  subtitle = "Approfondissez le sujet avec nos analyses sur la décarbonisation, la gestion des actifs IT et la cybersécurité.",
  tone = "light",
  eyebrow = "Ressources",
  className = "",
}: RelatedArticlesProps) {
  const isEn = useLocale() === "en";
  let articles: BlogArticle[] = blogArticles;

  if (categories && categories.length > 0) {
    articles = articles.filter((a) => categories.includes(a.category));
  }
  if (keywords && keywords.length > 0) {
    articles = articles.filter((a) =>
      keywords.some(
        (k) =>
          a.slug.toLowerCase().includes(k.toLowerCase()) ||
          a.title.toLowerCase().includes(k.toLowerCase()) ||
          a.keywords.some((kw) => kw.toLowerCase().includes(k.toLowerCase())),
      ),
    );
  }
  // Fallback: if filters wiped everything, show most recent.
  if (articles.length === 0) articles = blogArticles;

  articles = articles.slice(0, limit);

  const bgClass = tone === "light" ? "bg-cream" : "bg-paper";

  return (
    <section className={`py-16 lg:py-24 ${bgClass} ${className}`}>
      <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-12">
            <div>
              <p className="mb-3 text-eyebrow uppercase text-muted">{eyebrow}</p>
              <h2 className="max-w-[24ch] text-display-md text-ink">{title}</h2>
              <p className="mt-4 max-w-[65ch] text-body-lg text-ink-700">{subtitle}</p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex flex-shrink-0 items-center gap-1 text-body-sm font-medium text-leaf hover:text-leaf-700"
            >
              {isEn ? "See all articles" : "Voir tous les articles"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem key={article.slug} className="h-full">
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper transition-[border-color,box-shadow] duration-150 hover:border-ink/20 hover:shadow-card"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-flex h-7 w-fit items-center rounded-full bg-leaf-100 px-3 text-caption font-semibold text-forest">
                    {article.category}
                  </span>
                  <div className="mb-3 flex items-center gap-4 text-caption text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                      {new Date(article.publishedAt).toLocaleDateString(isEn ? "en-GB" : "fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {article.readingTime}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-heading-md text-ink transition-colors group-hover:text-leaf">
                    {article.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-body-sm text-ink-700">{article.description}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-body-sm font-medium text-leaf">
                    {isEn ? "Read the article" : "Lire l'article"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
