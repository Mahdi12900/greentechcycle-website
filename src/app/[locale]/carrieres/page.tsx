"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { Target, Eye, Award, Lightbulb, Mail, ArrowRight, Sparkles, Heart, Rocket } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export default function CareersPage() {
  const t = useTranslations("Careers");

  const values = [
    { icon: Target, color: "bg-leaf-100 text-leaf" },
    { icon: Eye, color: "bg-leaf-100 text-leaf" },
    { icon: Award, color: "bg-forest/10 text-forest" },
    { icon: Lightbulb, color: "bg-ochre-100 text-ochre" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <span className="block mb-6 text-eyebrow uppercase text-ondark-muted">
                <Rocket className="h-4 w-4 text-leaf-300" />
                Nous recrutons
              </span>
              <h1 className="text-display-lg text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-ondark leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-display-md text-ink mb-8">
                {t("mission.title")}
              </h2>
              <p className="text-lg md:text-xl text-ink-700 leading-relaxed">
                {t("mission.description")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-display-md text-ink">{t("values.title")}</h2>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={index}>
                    <div className="bg-white rounded-2xl p-8 text-center hover:shadow-card transition-shadow h-full">
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-heading-md text-ink mb-3">
                        {t(`values.items.${index}.title`)}
                      </h3>
                      <p className="text-ink-700 text-sm leading-relaxed">
                        {t(`values.items.${index}.desc`)}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Spontaneous Application */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <ScaleIn>
                <div className="w-20 h-20 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10 text-leaf" />
                </div>
              </ScaleIn>
              <h2 className="text-display-md text-ink mb-6">
                {t("spontaneous.title")}
              </h2>
              <p className="text-ink-700 text-lg mb-8 leading-relaxed">
                {t("spontaneous.description")}
              </p>
              <a
                href={`mailto:${t("spontaneous.email")}`}
                className="inline-flex items-center gap-3 bg-leaf hover:bg-leaf/90 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5" />
                {t("spontaneous.cta")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedArticles
        title="Explorez notre vision"
        subtitle="Nos publications sur la décarbonisation IT, l'économie circulaire et la conformité reflètent la culture GreenTechCycle."
        limit={3}
        tone="light"
      />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-forest py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-leaf text-white mb-6">
              <Heart className="h-7 w-7" />
            </div>
            <h2 className="text-display-md text-white mb-4">
              {t("hero.title")}
            </h2>
            <p className="text-ondark-muted max-w-2xl mx-auto mb-8">
              Rejoignez une équipe engagée pour transformer la gestion des actifs IT en levier de décarbonisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${t("spontaneous.email")}`}
                className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-600 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                <Mail className="h-5 w-5" />
                {t("spontaneous.cta")}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-8 py-4 rounded-xl transition-colors hover:bg-white/10"
              >
                <Sparkles className="h-5 w-5" />
                Contacter les RH
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
