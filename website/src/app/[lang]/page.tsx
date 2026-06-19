import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.home;

  const frameworks = [
    "NIST 800-88",
    "ISO 27001",
    "RGPD / GDPR",
    "CSRD",
    "DORA",
    "NIS2",
    "ISO 14001",
    "SOC 2",
    "R2",
    "e-Stewards",
    "WEEE",
    "Basel Convention",
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </h1>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${lang}/contact`}
              className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              {t.hero.cta}
            </a>
            <a
              href="#features"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              {t.hero.learnMore}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[t.stats.erasure, t.stats.assets, t.stats.frameworks, t.stats.carbon].map(
              (stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted mt-1">{stat.label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* KPI Cards — M2 fix: properly translated */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">{t.kpi.title}</h2>
          <p className="text-center text-muted max-w-2xl mx-auto mb-12">
            {t.kpi.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[t.kpi.speed, t.kpi.value, t.kpi.compliance, t.kpi.carbon].map(
              (kpi) => (
                <div
                  key={kpi.label}
                  className="bg-surface rounded-xl p-6 border border-gray-200 text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">
                    {kpi.value}
                  </div>
                  <div className="text-xs font-semibold text-muted tracking-wider mb-2">
                    {kpi.label}
                  </div>
                  <div className="text-sm text-muted">{kpi.detail}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t.features.title}
          </h2>
          <p className="text-center text-muted max-w-2xl mx-auto mb-16">
            {t.features.subtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map(
              (f: { icon: string; title: string; desc: string }) => (
                <div
                  key={f.title}
                  className="bg-surface rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted text-sm">{f.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section
        id="modules"
        className="bg-surface py-20 border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            {t.modules.title}
          </h2>
          <p className="text-center text-muted max-w-2xl mx-auto mb-16">
            {t.modules.subtitle}
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.modules.items.map(
              (m: { icon: string; title: string; list: string[] }) => (
                <div
                  key={m.title}
                  className="bg-background rounded-xl p-6 border border-gray-200"
                >
                  <div className="text-2xl mb-3">{m.icon}</div>
                  <h3 className="font-semibold mb-3">{m.title}</h3>
                  <ul className="text-sm text-muted space-y-1">
                    {m.list.map((item: string) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-primary">&#x2713;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Social Proof / Sectors */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.proof.title}</h2>
          <p className="text-muted max-w-2xl mx-auto mb-10">
            {t.proof.subtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.proof.sectors.map((sector: string) => (
              <div
                key={sector}
                className="bg-surface rounded-lg p-4 border border-gray-200 text-sm font-medium text-muted"
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.compliance.title}</h2>
          <p className="text-muted max-w-2xl mx-auto mb-12">
            {t.compliance.subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {frameworks.map((fw) => (
              <span
                key={fw}
                className="bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium border border-green-200"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-green-800 to-emerald-700 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-green-100 mb-8">{t.cta.subtitle}</p>
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
