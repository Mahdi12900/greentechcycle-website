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
        <section className="relative bg-gradient-to-br from-[#047857] to-[#1E40AF] py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <Breadcrumbs items={breadcrumbs} dark />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Blog ITAD & Recyclage IT
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Guides, analyses et actualités sur la gestion responsable des actifs IT, la conformité réglementaire et l&apos;économie circulaire.
            </p>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogArticles.map((article) => (
                <article
                  key={article.slug}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
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
                        <span className="bg-[#047857] text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                      <h2 className="text-lg font-bold text-[#0F172A] mb-2 hover:text-[#047857] transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <Link
                      href={`/${locale}/blog/${article.slug}`}
                      className="inline-flex items-center gap-1 text-[#047857] font-semibold text-sm hover:text-[#047857] transition-colors"
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
