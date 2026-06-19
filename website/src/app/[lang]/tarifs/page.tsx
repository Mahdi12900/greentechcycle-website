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
    title: dict.meta.pricing.title,
    description: dict.meta.pricing.description,
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.pricing;

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-muted max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Plans */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {t.plans.map(
              (plan: {
                name: string;
                price: string;
                description: string;
                features: string[];
                cta: string;
                popular: boolean;
              }) => (
                <div
                  key={plan.name}
                  className={`bg-surface rounded-xl border-2 p-8 relative ${
                    plan.popular
                      ? "border-primary shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">
                      {lang === "fr" ? "POPULAIRE" : "POPULAR"}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted mb-4">{plan.description}</p>
                  <div className="text-2xl font-bold text-primary mb-6">
                    {plan.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-primary mt-0.5">&#x2713;</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/${lang}/contact`}
                    className={`block text-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "border-2 border-primary text-primary hover:bg-green-50"
                    }`}
                  >
                    {plan.cta}
                  </a>
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
