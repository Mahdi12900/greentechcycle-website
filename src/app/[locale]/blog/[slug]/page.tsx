import type { Metadata } from "next";
import GeometryField from "@/components/visuals/GeometryField";
import MediaSlot from "@/components/visuals/MediaSlot";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogArticles, getArticleBySlug, getAllSlugs } from "@/lib/blog-data";
import { getArticleContent } from "@/lib/blog-content";
import { Calendar, Clock, ArrowLeft, Share2, User } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaOrg from "@/components/SchemaOrg";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const SITE = "https://cst-greentechcycle--979dplvl.cloud-station.app";

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    alternates: {
      canonical: `${SITE}/${locale}/blog/${slug}`,
      languages: {
        fr: `${SITE}/fr/blog/${slug}`,
        en: `${SITE}/en/blog/${slug}`,
        "x-default": `${SITE}/fr/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = getArticleContent(slug);

  const breadcrumbs = [
    { label: "Accueil", href: `/${locale}` },
    { label: "Blog", href: `/${locale}/blog` },
    { label: article.title, href: `/${locale}/blog/${slug}` },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `https://greentechcycle.fr${article.image}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: "GreenTechCycle",
      url: "https://greentechcycle.fr",
    },
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
      url: "https://greentechcycle.fr",
      logo: {
        "@type": "ImageObject",
        url: "https://greentechcycle.fr/logo/logo-primary.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://greentechcycle.fr/${locale}/blog/${slug}`,
    },
  };

  // Related articles (excluding current)
  const related = blogArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <>
      <SchemaOrg data={schemaData} />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-bg-card py-16 lg:py-24">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={breadcrumbs} dark />
            <div className="max-w-3xl">
              <span className="inline-block bg-emerald text-bg text-sm font-semibold px-4 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-display-lg text-fg mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-fg-muted text-sm">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} de lecture
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-bg-card py-12 lg:py-16">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10">
                <MediaSlot fill id={`blog-${slug}`} alt={article.imageAlt} fallback={<GeometryField />} />
              </div>

              {/* Content */}
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Share & Back */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-track">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-emerald font-semibold hover:text-emerald transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour au blog
                </Link>
                <button
                  className="inline-flex items-center gap-2 text-fg-muted hover:text-emerald transition-colors"
                  aria-label="Partager cet article"
                >
                  <Share2 className="h-4 w-4" />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="bg-bg-card py-12 lg:py-16">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
            <h2 className="text-display-md text-fg mb-8">Articles connexes</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/blog/${rel.slug}`}
                  className="bg-bg-card rounded-xl p-6 border border-track hover:border-track-strong transition-shadow"
                >
                  <span className="text-xs font-semibold text-emerald">{rel.category}</span>
                  <h3 className="text-heading-md text-fg mt-2 line-clamp-2">{rel.title}</h3>
                  <p className="text-sm text-fg-strong mt-2 line-clamp-2">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
