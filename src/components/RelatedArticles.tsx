"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { blogArticles, type BlogArticle } from "@/lib/blog-data";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
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

  const bgClass =
    tone === "white"
      ? "bg-white"
      : tone === "primary"
      ? "bg-gradient-to-br from-primary-50 via-white to-accent/5"
      : "bg-[#F8FAFC]";

  return (
    <section className={`relative py-20 md:py-24 overflow-hidden ${bgClass} ${className}`}>
      {/* Subtle decorative shape */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max mx-auto px-4 relative z-10">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <BookOpen className="h-3.5 w-3.5" />
                {eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                {title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">{subtitle}</p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group shrink-0"
            >
              Voir tous les articles
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {articles.map((article) => (
            <StaggerItem key={article.slug}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      <Tag className="h-3 w-3" />
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                    {article.description}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                    Lire l&apos;article
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
