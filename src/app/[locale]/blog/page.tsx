import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogArticles } from "@/lib/blog-data";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  title: "Blog ITAD & Recyclage IT",
  description:
    "Articles et guides sur l'ITAD, le recyclage IT, la conformité CSRD/NIS2, la sécurité des données et l'économie circulaire pour les entreprises.",
  keywords: ["blog ITAD", "recyclage IT", "CSRD", "NIS2", "DEEE", "économie circulaire IT", "sécurité données"],
  openGraph: {
    title: "Blog ITAD & Recyclage IT | GreenTechCycle",
    description:
      "Articles et guides sur l'ITAD, le recyclage IT, la conformité et l'économie circulaire pour les entreprises.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog ITAD & Recyclage IT | GreenTechCycle",
    description:
      "Articles et guides sur l'ITAD, le recyclage IT, la conformité et l'économie circulaire pour les entreprises.",
  },
};

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const breadcrumbs = [
    { label: "Accueil", href: `/${locale}` },
    { label: "Blog", href: `/${locale}/blog` },
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog GreenTechCycle",
    description: "Articles sur l'ITAD, le recyclage IT et la conformité réglementaire",
    url: `https://greentechcycle.fr/${locale}/blog`,
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
      url: "https://greentechcycle.fr",
    },
    blogPost: blogArticles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { "@type": "Organization", name: "GreenTechCycle" },
      url: `https://greentechcycle.fr/${locale}/blog/${article.slug}`,
    })),
  };

  return (
    <>
      <SchemaOrg data={schemaData} />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative bg-forest-900 overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0">
            <Image
              src="/photos/blog-economie-circulaire.jpg"
              alt="Consultation IT et analyse de données"
              fill
              className="object-cover opacity-15"
              priority
            />
          </div>
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={breadcrumbs} dark />
            <h1 className="text-display-lg text-white mb-6">
              Blog ITAD & Recyclage IT
            </h1>
            <p className="text-xl text-ondark-muted max-w-2xl">
              Guides, analyses et actualités sur la gestion responsable des actifs IT, la conformité réglementaire et l&apos;économie circulaire.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-cream py-12 lg:py-16">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-card transition-shadow duration-150 border border-line"
                >
                  <Link href={`/${locale}/blog/${article.slug}`}>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-leaf text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(article.publishedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readingTime}
                      </span>
                    </div>
                    <Link href={`/${locale}/blog/${article.slug}`}>
                      <h2 className="text-display-md text-ink mb-2 hover:text-leaf transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-ink-700 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <Link
                      href={`/${locale}/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-leaf font-semibold text-sm hover:text-leaf transition-colors"
                    >
                      Lire l&apos;article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
