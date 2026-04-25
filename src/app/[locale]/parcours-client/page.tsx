"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";
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
  const stepColors = [
    "bg-accent",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-primary",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/images/unsplash/corporate-meeting.jpg"
          alt="Réunion de cadrage client GreenTechCycle"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857]/90 via-[#047857]/85 to-[#1E40AF]/90" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          {/* Desktop Timeline (Horizontal) */}
          <div className="hidden lg:block max-w-6xl mx-auto">
            <StaggerContainer>
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-16 left-[10%] right-[10%] h-1 bg-gradient-to-r from-accent via-blue-500 via-purple-500 via-orange-500 to-primary rounded-full" />

                <div className="grid grid-cols-5 gap-6 relative">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] || Phone;
                    const color = stepColors[index] || stepColors[0];
                    return (
                      <StaggerItem key={index}>
                        <div className="flex flex-col items-center text-center">
                          {/* Step Circle */}
                          <div
                            className={`relative z-10 w-32 h-32 ${color} rounded-full flex flex-col items-center justify-center shadow-xl mb-6`}
                          >
                            <span className="text-white/60 text-sm font-medium">
                              {step.number}
                            </span>
                            <Icon className="w-10 h-10 text-white mt-1" />
                          </div>

                          {/* Content */}
                          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 w-full">
                            <h3 className="text-lg font-bold text-dark mb-2">
                              {step.title}
                            </h3>
                            <p className="text-sm text-dark/60 mb-4 leading-relaxed">
                              {step.description}
                            </p>
                            <div className="inline-flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-full text-xs font-semibold">
                              <Clock className="w-3.5 h-3.5" />
                              {step.duration}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </div>
              </div>
            </StaggerContainer>
          </div>

          {/* Mobile Timeline (Vertical) */}
          <div className="lg:hidden max-w-lg mx-auto">
            <StaggerContainer>
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 left-8 w-1 bg-gradient-to-b from-accent via-blue-500 via-purple-500 via-orange-500 to-primary rounded-full" />

                <div className="space-y-8">
                  {steps.map((step, index) => {
                    const Icon = stepIcons[index] || Phone;
                    const color = stepColors[index] || stepColors[0];
                    return (
                      <StaggerItem key={index}>
                        <div className="flex gap-6 items-start">
                          {/* Step Circle */}
                          <div
                            className={`relative z-10 w-16 h-16 ${color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </div>

                          {/* Content Card */}
                          <div className="flex-1 bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-xs font-semibold text-dark/40 uppercase tracking-wider">
                                {step.number}
                              </span>
                              <div className="inline-flex items-center gap-1 bg-accent/10 text-accent px-2 py-0.5 rounded-full text-xs font-semibold ml-auto">
                                <Clock className="w-3 h-3" />
                                {step.duration}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-dark mb-1.5">
                              {step.title}
                            </h3>
                            <p className="text-sm text-dark/60 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </div>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      <RelatedArticles
        title="Ressources pour votre parcours"
        subtitle="Articles pratiques pour préparer chaque étape : audit, sécurité des données, reporting ESG et conformité."
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Prêt à démarrer votre parcours ?"
        subtitle="Notre équipe vous accompagne à chaque étape, de l'audit initial au reporting final de votre projet ITAD."
        primaryLabel="Planifier un appel"
        primaryHref="/contact"
        secondaryLabel="Demander une démo"
        secondaryHref="/demo"
        variant="call"
        tone="dark"
      />
    </main>
  );
}
