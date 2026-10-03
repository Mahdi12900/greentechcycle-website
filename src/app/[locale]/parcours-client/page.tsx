"use client";

import { useTranslations } from "next-intl";
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

  const steps = t.raw("steps") as {
    number: string;
    title: string;
    description: string;
    duration: string;
  }[];

  const stepIcons = [Phone, FileSearch, Settings, Rocket, HeadphonesIcon];
  // Une seule couleur pour toutes les étapes (§2.3 : pas de couleur par item)
  const stepColors = ["bg-forest", "bg-forest", "bg-forest", "bg-forest", "bg-forest"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-forest py-16 text-ondark lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-4xl ">
              <h1 className="text-display-lg text-ondark mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-ondark leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <div className="reveal-stagger">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-16 left-[10%] right-[10%] h-1 rounded-full bg-leaf" />

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
                            <span className="text-ondark-muted text-sm font-medium">
                              {step.number}
                            </span>
                            <Icon className="w-10 h-10 text-white mt-1" />
                          </div>

                          {/* Content */}
                          <div className="bg-white rounded-2xl p-6 border border-line w-full">
                            <h3 className="text-heading-md text-ink mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-ink-700 mb-4 leading-relaxed">
                              {step.description}
                            </p>
                            <div className="inline-flex items-center gap-1.5 bg-leaf-100 text-leaf px-3 py-1.5 rounded-full text-xs font-semibold">
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
                <div className="absolute top-0 bottom-0 left-8 w-1 rounded-full bg-leaf" />

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
                            <Icon className="w-7 h-7 text-white" />
                          </div>

                          {/* Content Card */}
                          <div className="flex-1 bg-white rounded-2xl p-5 border border-line">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-ink-700 uppercase text-eyebrow">
                                {step.number}
                              </span>
                              <div className="inline-flex items-center gap-1 bg-leaf-100 text-leaf px-2 py-0.5 rounded-full text-xs font-semibold ml-auto">
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </div>
                            </div>
                            <h3 className="text-heading-md text-ink mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-sm text-ink-700 leading-relaxed">
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
        title="Ressources pour votre parcours"
        subtitle="Articles pratiques pour préparer chaque étape : audit, sécurité des données, comptes-rendus ESG et conformité."
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Prêt à démarrer votre parcours ?"
        subtitle="Notre équipe vous accompagne à chaque étape, de l'audit initial à la restitution finale de votre projet ITAD."
        primaryLabel="Planifier un appel"
        primaryHref="/contact"
        secondaryLabel="Demander une démo"
        secondaryHref="/demo"
        variant="call"
        tone="dark"
      />
    </div>
  );
}
