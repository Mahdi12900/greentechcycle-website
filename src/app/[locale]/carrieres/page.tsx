"use client";

import { useLocale, useTranslations } from "next-intl";
import { EMAILS, PREFILL } from "@/lib/contact";
import { Link } from "@/i18n/navigation";

import { Target, Eye, Award, Lightbulb, Mail, ArrowRight, Sparkles, Heart, Rocket } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export default function CareersPage() {
  const t = useTranslations("Careers");
  const isEn = useLocale() === "en";

  const values = [
    { icon: Target, color: "bg-emerald-dim text-emerald" },
    { icon: Eye, color: "bg-emerald-dim text-emerald" },
    { icon: Award, color: "bg-bg/10 text-emerald" },
    { icon: Lightbulb, color: "bg-amber-dim text-amber" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-bg-card py-12 text-fg lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-3xl ">
              <span className="block mb-6 text-eyebrow uppercase text-fg-muted">
                Nous recrutons
              </span>
              <h1 className="text-display-lg text-fg mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-fg leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-md text-fg mb-8">
                {t("mission.title")}
              </h2>
              <p className="text-lg md:text-xl text-fg-strong leading-relaxed">
                {t("mission.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="text-center mb-14">
              <h2 className="text-display-md text-fg">{t("values.title")}</h2>
            </div>
          </div>

          <div className="reveal-stagger">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="reveal">
                    <div className="bg-bg-card rounded-2xl p-8 text-center hover:border-track-strong transition-shadow h-full">
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-heading-md text-fg mb-3">
                        {t(`values.items.${index}.title`)}
                      </h3>
                      <p className="text-fg-strong text-sm leading-relaxed">
                        {t(`values.items.${index}.desc`)}
                      </p>
                      {/* Valeur « Innovation » : contact du lab R&D / partenariats (lab.rd@) */}
                      {index === 3 && (
                        <a
                          href={`mailto:${EMAILS.lab}?subject=${encodeURIComponent(isEn ? PREFILL.en.labSubject : PREFILL.fr.labSubject)}`}
                          className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-caption font-semibold text-emerald underline-offset-4 hover:underline"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          {isEn ? "R&D lab or partnership: " : "Lab R&D ou partenariat : "}
                          {EMAILS.lab}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="max-w-3xl mx-auto text-center">
              <div className="reveal-scale">
                <div className="w-20 h-20 bg-emerald-dim rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10 text-emerald" />
                </div>
              </div>
              <h2 className="text-display-md text-fg mb-6">
                {t("spontaneous.title")}
              </h2>
              <p className="text-fg-strong text-lg mb-8 leading-relaxed">
                {t("spontaneous.description")}
              </p>
              <a
                href={`mailto:${t("spontaneous.email")}`}
                className="inline-flex items-center gap-3 bg-emerald hover:bg-emerald/90 text-bg font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t("spontaneous.cta")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles
        title={{ fr: "Explorez notre vision", en: "Explore our vision" }}
        subtitle={{ fr: "Nos publications sur la décarbonisation IT, l'économie circulaire et la conformité reflètent la culture GreenTechCycle.", en: "Our publications on IT decarbonisation, the circular economy and compliance reflect the GreenTechCycle culture." }}
        limit={3}
        tone="light"
      />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="reveal">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald text-bg mb-6">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="text-display-md text-fg mb-4">
              {t("hero.title")}
            </h2>
            <p className="text-fg-muted max-w-2xl mx-auto mb-8">
              {isEn
                ? "Join a committed team turning IT asset management into a lever for decarbonisation."
                : "Rejoignez une équipe engagée pour transformer la gestion des actifs IT en levier de décarbonisation."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${t("spontaneous.email")}`}
                className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Mail className="h-5 w-5" />
                {t("spontaneous.cta")}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-fg font-semibold px-8 py-4 rounded-xl transition-colors hover:bg-white/10"
              >
                <Sparkles className="h-5 w-5" />
                Contacter les RH
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
