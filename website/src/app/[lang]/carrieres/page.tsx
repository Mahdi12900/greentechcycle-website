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
    title: dict.meta.careers.title,
    description: dict.meta.careers.description,
  };
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.careers;

  return (
    <>
      {/* Header with badge — m2 fix: translated badge */}
      <section className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-bold tracking-wider px-4 py-1.5 rounded-full mb-6 uppercase">
            {t.badge}
          </span>
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-green-100 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">
            {t.values.title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.values.items.map(
              (v: { icon: string; title: string; desc: string }) => (
                <div
                  key={v.title}
                  className="bg-surface rounded-xl p-6 border border-gray-200 text-center"
                >
                  <div className="text-3xl mb-3">{v.icon}</div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-muted text-sm">{v.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-surface border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">
            {t.positions.title}
          </h2>
          <div className="space-y-4">
            {t.positions.items.map(
              (p: {
                title: string;
                type: string;
                location: string;
                desc: string;
              }) => (
                <div
                  key={p.title}
                  className="bg-background rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <span className="text-xs bg-green-50 text-green-800 px-2.5 py-1 rounded-full border border-green-200 font-medium">
                        {p.type}
                      </span>
                      <span className="text-xs text-muted">{p.location}</span>
                    </div>
                  </div>
                  <p className="text-muted text-sm">{p.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-800 to-emerald-700 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-green-100 mb-6">{t.cta.subtitle}</p>
          <a
            href={`/${lang}/contact`}
            className="inline-block bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
          >
            {t.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
