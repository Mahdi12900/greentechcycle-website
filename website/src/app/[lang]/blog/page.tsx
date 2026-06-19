import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.blog;

  const categoryKeys = ["regulation", "security", "compliance", "sustainability"] as const;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="text-sm text-muted">
            <a href={`/${lang}`} className="hover:text-primary-dark">
              {t.breadcrumbHome}
            </a>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">
              {t.breadcrumbBlog}
            </span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-muted max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3">
            <span className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer">
              {t.allCategories}
            </span>
            {categoryKeys.map((key) => (
              <span
                key={key}
                className="bg-gray-100 text-muted px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {t.categories[key]}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.articles.map(
              (article: {
                slug: string;
                category: string;
                title: string;
                excerpt: string;
                date: string;
                readTime: string;
              }) => (
                <article
                  key={article.slug}
                  className="bg-surface rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-50 h-40 flex items-center justify-center">
                    <span className="text-4xl opacity-50">
                      {article.category === "regulation"
                        ? "📜"
                        : article.category === "security"
                          ? "🔒"
                          : article.category === "compliance"
                            ? "✅"
                            : "🌱"}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-green-50 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                        {t.categories[article.category as keyof typeof t.categories]}
                      </span>
                      <span className="text-xs text-muted">
                        {article.date}
                      </span>
                      <span className="text-xs text-muted">
                        {article.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-muted text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <a
                      href="#"
                      className="text-primary font-medium text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                    >
                      {t.readArticle}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{dict.home.cta.title}</h2>
          <p className="text-green-100 mb-6">{dict.home.cta.subtitle}</p>
          <a
            href={`/${lang}/contact`}
            className="inline-block bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            {dict.nav.bookDemo}
          </a>
        </div>
      </section>
    </>
  );
}
