"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { Target, Eye, Award, Lightbulb, Mail, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const t = useTranslations("Careers");

  const values = [
    { icon: Target, color: "bg-primary/10 text-primary" },
    { icon: Eye, color: "bg-accent/10 text-accent" },
    { icon: Award, color: "bg-secondary/10 text-secondary" },
    { icon: Lightbulb, color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-dark py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container-max mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container-max mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-8">
                {t("mission.title")}
              </h2>
              <p className="text-lg md:text-xl text-dark/70 leading-relaxed">
                {t("mission.description")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-light">
        <div className="container-max mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-dark">{t("values.title")}</h2>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <StaggerItem key={index}>
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow h-full">
                      <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-dark mb-3">
                        {t(`values.items.${index}.title`)}
                      </h3>
                      <p className="text-dark/60 text-sm leading-relaxed">
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
      <section className="py-20 bg-white">
        <div className="container-max mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <ScaleIn>
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mail className="w-10 h-10 text-accent" />
                </div>
              </ScaleIn>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                {t("spontaneous.title")}
              </h2>
              <p className="text-dark/70 text-lg mb-8 leading-relaxed">
                {t("spontaneous.description")}
              </p>
              <a
                href={`mailto:${t("spontaneous.email")}`}
                className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg shadow-accent/25"
              >
                <Mail className="w-5 h-5" />
                {t("spontaneous.cta")}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container-max mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t("hero.title")}
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all shadow-lg"
            >
              {t("spontaneous.cta")}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
