"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Leaf,
  Quote,
  Globe,
  Scale,
  Heart,
  Eye,
  Award,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";
import type { ComponentType } from "react";

export default function WhyGTCPage() {
  const t = useTranslations("WhyGTC");

  const missionParagraphs = t.raw("mission.paragraphs") as string[];
  const valuesItems = t.raw("values.items") as { title: string; desc: string }[];
  const commitments = t.raw("commitments.items") as { metric: string; label: string }[];
  const benefitsItems = t.raw("benefits.items") as { title: string; desc: string }[];

  const valueIcons: ComponentType<{ className?: string }>[] = [Globe, Scale, Heart, Eye, Award];
  const valueColors = [
    "bg-blue-500/10 text-blue-600",
    "bg-emerald-500/10 text-emerald-600",
    "bg-pink-500/10 text-pink-600",
    "bg-amber-500/10 text-amber-600",
    "bg-purple-500/10 text-purple-600",
  ];

  const benefitIcons: ComponentType<{ className?: string }>[] = [TrendingUp, Clock, ShieldCheck, Leaf];
  const benefitColors = [
    "bg-accent/10 text-accent",
    "bg-blue-500/10 text-blue-500",
    "bg-purple-500/10 text-purple-500",
    "bg-green-600/10 text-green-600",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/photos/team-workshop.jpg"
          alt="Atelier collaboratif GreenTechCycle sur la transformation ITAD responsable"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/90" />
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

      {/* Section 1: Mission / Raison d'etre */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                {t("mission.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 tracking-tight">
                {t("mission.title")}
              </h2>
              <div className="space-y-6">
                {missionParagraphs.map((p, i) => (
                  <p key={i} className="text-lg text-gray-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 2: Founder */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                {t("founder.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8 tracking-tight">
                {t("founder.title")}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden grid md:grid-cols-[220px_1fr] gap-0">
                <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-gray-100">
                  <Image
                    src="/photos/founder-portrait.jpg"
                    alt="Portrait du fondateur de GreenTechCycle"
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 220px"
                  />
                </div>
                <div className="p-8 md:p-10">
                  <div className="relative mb-6">
                    <Quote className="h-10 w-10 text-[#047857]/15 absolute -top-2 -left-2" aria-hidden="true" />
                    <p className="text-xl md:text-2xl text-[#0F172A] font-medium leading-relaxed italic pl-8">
                      {t("founder.quote")}
                    </p>
                  </div>
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-600 leading-relaxed">
                      {t("founder.bio")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 3: Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                {t("values.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight">
                {t("values.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {valuesItems.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              const color = valueColors[index % valueColors.length];
              return (
                <StaggerItem key={index}>
                  <div className="bg-[#F8FAFC] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {value.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: Commitments (chiffres) */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#047857] to-[#1E40AF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60 mb-3">
                {t("commitments.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {t("commitments.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {commitments.map((c, index) => (
              <StaggerItem key={index}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:bg-white/15 transition-all">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {c.metric}
                  </p>
                  <p className="text-white/70 text-sm leading-snug">
                    {c.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 5: Benefits */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
                {t("benefits.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefitsItems.map((benefit, index) => {
                const Icon = benefitIcons[index % benefitIcons.length];
                const color = benefitColors[index % benefitColors.length];
                return (
                  <StaggerItem key={index}>
                    <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <RelatedArticles
        title="Pourquoi choisir un partenaire certifie ?"
        subtitle="Nos dernieres analyses sur la conformite, la securite et la circularite IT."
        limit={3}
        tone="white"
      />

      <CtaSection
        title="Faites le choix d'un ITAD a forte valeur ajoutee"
        subtitle="Discutons de votre parc IT : notre equipe propose un audit gratuit et un plan de decommissionnement sous 48h."
        primaryLabel="Demander un audit gratuit"
        primaryHref="/contact"
        secondaryLabel="Voir notre demo"
        secondaryHref="/demo"
        variant="audit"
        tone="dark"
      />
    </main>
  );
}
