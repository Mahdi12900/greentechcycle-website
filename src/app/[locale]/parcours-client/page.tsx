"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import {
  Phone,
  FileSearch,
  Settings,
  Rocket,
  HeadphonesIcon,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";

export default function ClientJourneyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("ClientJourney");
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const steps = t.raw("steps") as {
    number: string;
    title: string;
    description: string;
    duration: string;
  }[];

  const stepIcons = [Phone, FileSearch, Settings, Rocket, HeadphonesIcon];
  // Une seule couleur pour toutes les étapes (§2.3 : pas de couleur par item)
  const stepColors = ["bg-bg-card", "bg-bg-card", "bg-bg-card", "bg-bg-card", "bg-bg-card"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-bg-card py-16 text-fg lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-4xl ">
              <h1 className="text-display-lg text-fg mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-fg leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <h2 id="journey-steps-title" className="sr-only">{tx("Les étapes du parcours client", "The client journey steps")}</h2>
          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="reveal-stagger">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-16 left-[10%] right-[10%] h-1 rounded-full bg-emerald" />

                <div className="grid grid-cols-5 gap-6 relative">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] || Phone;
                    const color = stepColors[index] || stepColors[0];
                    return (
                      <div key={index} className="reveal">
                        <div className="flex flex-col items-center text-center">
                          {/* Step Circle */}
                          <div
                            className={`relative z-10 w-32 h-32 ${color} rounded-full flex flex-col items-center justify-center mb-6`}
                          >
                            <span className="text-fg-muted text-sm font-medium">
                              {step.number}
                            </span>
                            <Icon className="w-10 h-10 text-fg mt-1" />
                          </div>

                          {/* Content */}
                          <div className="bg-bg-card rounded-2xl p-6 border border-track w-full">
                            <h3 className="text-heading-md text-fg mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-fg-strong mb-4 leading-relaxed">
                              {step.description}
                            </p>
                            <div className="inline-flex items-center gap-1.5 bg-emerald-dim text-emerald px-3 py-1.5 rounded-full text-xs font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              {step.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="lg:hidden max-w-lg mx-auto">
            <div className="reveal-stagger">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 left-8 w-1 rounded-full bg-emerald" />

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] || Phone;
                    const color = stepColors[index] || stepColors[0];
                    return (
                      <div key={index} className="reveal">
                        <div className="flex gap-6 items-start">
                          {/* Step Circle */}
                          <div
                            className={`relative z-10 w-16 h-16 ${color} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <Icon className="w-7 h-7 text-fg" />
                          </div>

                          {/* Content Card */}
                          <div className="flex-1 bg-bg-card rounded-2xl p-5 border border-track">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-fg-strong uppercase text-eyebrow">
                                {step.number}
                              </span>
                              <div className="inline-flex items-center gap-1 bg-emerald-dim text-emerald px-2 py-0.5 rounded-full text-xs font-semibold ml-auto">
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </div>
                            </div>
                            <h3 className="text-heading-md text-fg mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-sm text-fg-strong leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles
        title={{ fr: "Ressources pour votre parcours", en: "Resources for your journey" }}
        subtitle={{ fr: "Articles pratiques pour préparer chaque étape : audit, sécurité des données, comptes-rendus ESG et conformité.", en: "Practical articles to prepare each step: audit, data security, ESG reporting and compliance." }}
        limit={3}
        tone="light"
      />

      <CtaSection
        title={tx("Prêt à démarrer votre parcours ?", "Ready to start your journey?")}
        subtitle={tx(
          "Notre équipe vous accompagne à chaque étape, de l'audit initial à la restitution finale de votre projet ITAD.",
          "Our team supports you at every step, from the initial audit to the final report of your ITAD project."
        )}
        primaryLabel={tx("Planifier un appel", "Schedule a call")}
        primaryHref="/contact"
        secondaryLabel={tx("Demander une démo", "Request a demo")}
        secondaryHref="/demo"
        variant="call"
        tone="dark"
      />
    </div>
  );
}
