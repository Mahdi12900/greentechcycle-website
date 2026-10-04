import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import GeometryField from "@/components/visuals/GeometryField";
import MediaSlot from "@/components/visuals/MediaSlot";
import Link from "next/link";
import { blogArticles, localizeArticle } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaOrg from "@/components/SchemaOrg";
import { SITE_URL } from "@/lib/site";

const META_COPY: PageCopy = {
  fr: {
    title: "Blog ITAD & recyclage IT",
    description:
      "Articles et guides sur l'ITAD, le recyclage IT, la conformité CSRD/NIS2, la sécurité des données et l'économie circulaire pour les entreprises.",
  },
  en: {
    title: "ITAD & IT recycling blog",
    description:
      "Articles and guides on ITAD, IT recycling, CSRD/NIS2 compliance, data security and the circular economy for businesses.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/blog", META_COPY);
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEn = locale === "en";

  const breadcrumbs = [
    { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
    { label: "Blog", href: `/${locale}/blog` },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog GreenTechCycle",
    description: "Articles sur l'ITAD, le recyclage IT et la conformité réglementaire",
    url: `${SITE_URL}/${locale}/blog`,
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
      url: `${SITE_URL}`,
    },
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { "@type": "Organization", name: "GreenTechCycle" },
      url: `${SITE_URL}/${locale}/blog/${article.slug}`,
    })),
  };

  return (
    <>
      <SchemaOrg data={schemaData} />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-bg-card overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0">
            <MediaSlot fill id="blog-hero" alt={isEn ? "IT consulting and data analysis" : "Consultation IT et analyse de données"} fallback={<GeometryField />} />
          </div>
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={breadcrumbs} dark />
            <h1 className="text-display-lg text-fg mb-6">
              {isEn ? "ITAD & IT recycling blog" : "Blog ITAD & Recyclage IT"}
            </h1>
            <p className="text-xl text-fg-muted max-w-2xl">
              {isEn
                ? "Guides, analyses and news on responsible IT asset management, regulatory compliance and the circular economy. Articles are written in French."
                : "Guides, analyses et actualités sur la gestion responsable des actifs IT, la conformité réglementaire et l'économie circulaire."}
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-bg-card py-12 lg:py-16">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((a) => localizeArticle(a, locale)).map((article) => (
                <article
                  key={article.slug}
                  className="bg-bg-card rounded-2xl overflow-hidden hover:border-track-strong transition-shadow duration-150 border border-track"
                >
                  <Link href={`/${locale}/blog/${article.slug}`}>
                    <div className="relative aspect-[16/9]">
                      <MediaSlot fill id={`blog-card-${article.slug}`} alt={article.imageAlt} fallback={<GeometryField />} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-emerald text-bg text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-fg-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString(isEn ? "en-GB" : "fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime}
                      </span>
                      {isEn && <span>Article in French</span>}
                    </div>
                    <Link href={`/${locale}/blog/${article.slug}`}>
                      <h2 className="text-display-md text-fg mb-2 hover:text-emerald transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-fg-strong text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <Link
                      href={`/${locale}/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-emerald font-semibold text-sm hover:text-emerald transition-colors"
                    >
                      {isEn ? "Read the article" : "Lire l'article"}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
