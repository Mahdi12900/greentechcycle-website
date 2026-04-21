import type { Metadata } from "next";
import Image from "next/image";
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
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: article.author }],
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
        url: "https://greentechcycle.fr/images/logo.png",
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
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0D503C] to-[#1E3A5F] py-20 md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={breadcrumbs} dark />
            <div className="max-w-3xl">
              <span className="inline-block bg-[#10B981] text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Featured Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              {/* Content */}
              <div
                className="prose prose-lg prose-slate max-w-none prose-headings:text-[#0F172A] prose-headings:font-bold prose-a:text-[#0D503C] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#0F172A] prose-li:text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Share & Back */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 text-[#0D503C] font-semibold hover:text-[#10B981] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour au blog
                </Link>
                <button
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-[#0D503C] transition-colors"
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
        <section className="py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-8">Articles connexes</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/blog/${rel.slug}`}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-xs font-semibold text-[#10B981]">{rel.category}</span>
                  <h3 className="text-lg font-bold text-[#0F172A] mt-2 line-clamp-2">{rel.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{rel.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
