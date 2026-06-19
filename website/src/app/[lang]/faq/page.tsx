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
    title: dict.meta.faq.title,
    description: dict.meta.faq.description,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.faq;

  // Show first 3 blog articles in FAQ page
  const blogArticles = dict.blog.articles.slice(0, 3);

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-muted max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {t.items.map(
              (item: { question: string; answer: string }, index: number) => (
                <details
                  key={index}
                  className="bg-surface rounded-xl border border-gray-200 group"
                >
                  <summary className="p-6 cursor-pointer font-semibold flex items-center justify-between list-none">
                    <span>{item.question}</span>
                    <span className="text-muted ml-4 shrink-0 text-xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-muted text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              )
            )}
          </div>
        </div>
      </section>

      {/* Blog Section — M3 fix: fully translated */}
      <section className="py-12 bg-surface border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{t.blogSection.title}</h2>
            <a
              href={`/${lang}/blog`}
              className="text-primary font-medium text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1"
            >
              {t.blogSection.seeAll}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogArticles.map(
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
                  className="bg-background rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-50 h-32 flex items-center justify-center">
                    <span className="text-3xl opacity-50">
                      {article.category === "regulation"
                        ? "📜"
                        : article.category === "security"
                          ? "🔒"
                          : article.category === "compliance"
                            ? "✅"
                            : "🌱"}
                    </span>
                  </div>
                  <div className="p-5">
                    <span className="bg-green-50 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full border border-green-200">
                      {dict.blog.categories[article.category as keyof typeof dict.blog.categories]}
                    </span>
                    <h3 className="text-base font-semibold mt-3 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <a
                      href="#"
                      className="text-primary font-medium text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1"
                    >
                      {dict.blog.readArticle}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section — M3 fix: translated CTAs */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">{dict.home.cta.title}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${lang}/contact`}
              className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              {t.ctaSection.askQuestion}
            </a>
            <a
              href={`/${lang}/contact`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t.ctaSection.scheduleDemo}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
