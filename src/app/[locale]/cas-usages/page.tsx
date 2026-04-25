"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  Building2,
  Heart,
  Factory,
  Landmark,
  ShoppingCart,
  Zap,
  Radio,
  GraduationCap,
  Users,
  Quote,
  Target,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import type { ComponentType } from "react";

type CaseData = {
  id: string;
  sectorBadge: string;
  regulation: string;
  title: string;
  context: string;
  problem: string;
  stakeholders: string;
  solution: string;
  results: string;
  testimonialQuote: string;
  testimonialRole: string;
  ctaSlug: string;
};

const caseIcons: ComponentType<{ className?: string }>[] = [
  Building2, Heart, Factory, Landmark, ShoppingCart, Zap, Radio, GraduationCap,
];

const caseColors = [
  "bg-blue-500/10 text-blue-600 border-blue-200",
  "bg-red-500/10 text-red-600 border-red-200",
  "bg-amber-500/10 text-amber-600 border-amber-200",
  "bg-purple-500/10 text-purple-600 border-purple-200",
  "bg-teal-500/10 text-teal-600 border-teal-200",
  "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  "bg-pink-500/10 text-pink-600 border-pink-200",
];

// One unique sectoral photo per case (no duplicates across the site)
const caseImages: { src: string; alt: string }[] = [
  { src: "/photos/case-banque.jpg", alt: "Salle de marche bancaire avec ecrans de trading" },
  { src: "/photos/case-hopital.jpg", alt: "Couloir hospitalier et infrastructure IT medicale" },
  { src: "/photos/case-industrie.jpg", alt: "Ligne de production industrielle avec systemes OT" },
  { src: "/photos/case-administration.jpg", alt: "Batiment administratif et secteur public" },
  { src: "/photos/case-retail.jpg", alt: "Point de vente retail multi-sites" },
  { src: "/photos/case-energie.jpg", alt: "Installations energetiques et reseau de distribution" },
  { src: "/photos/case-telco.jpg", alt: "Datacenter telco avec baies serveurs" },
  { src: "/photos/case-universite.jpg", alt: "Etudiants equipes de laptops sur un campus" },
];

export default function UseCasesPage() {
  const t = useTranslations("UseCases");

  const cases = t.raw("cases") as CaseData[];
  const labels = {
    sector: t("labels.sector"),
    regulation: t("labels.regulation"),
    context: t("labels.context"),
    problem: t("labels.problem"),
    stakeholders: t("labels.stakeholders"),
    solution: t("labels.solution"),
    results: t("labels.results"),
    testimonial: t("labels.testimonial"),
    discussCase: t("labels.discussCase"),
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/photos/team-workshop.jpg"
          alt="Workshop GreenTechCycle analysant des cas d'usages ITAD sectoriels"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857]/90 via-[#047857]/85 to-[#1E40AF]/90" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-10">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#047857] font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all"
                >
                  {t("hero.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact?ref=usecase-unlisted"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                >
                  {t("hero.ctaSecondary")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {cases.map((useCase, index) => {
              const Icon = caseIcons[index % caseIcons.length];
              const color = caseColors[index % caseColors.length];
              return (
                <FadeIn key={useCase.id}>
                  <article
                    id={useCase.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Sectoral cover photo (unique per case) */}
                    <div className="relative w-full aspect-[16/7] bg-gray-100">
                      <Image
                        src={caseImages[index % caseImages.length].src}
                        alt={caseImages[index % caseImages.length].alt}
                        fill
                        loading="lazy"
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" aria-hidden="true" />
                    </div>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-6 md:px-8 py-5 border-b border-gray-100">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl ${color.split(" ").slice(0, 2).join(" ")} flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {useCase.sectorBadge}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                          {useCase.regulation}
                        </span>
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-[#0F172A]">
                        {useCase.title}
                      </h2>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                      {/* Context */}
                      <div>
                        <h3 className="text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          {labels.context}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {useCase.context}
                        </p>
                      </div>

                      {/* Problem */}
                      <div className="bg-red-50/50 rounded-xl p-5 border border-red-100">
                        <h3 className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          {labels.problem}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {useCase.problem}
                        </p>
                      </div>

                      {/* Stakeholders */}
                      <div>
                        <h3 className="text-xs font-semibold text-[#0F172A]/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {labels.stakeholders}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {useCase.stakeholders.split(", ").map((s, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/5 text-secondary text-xs font-medium border border-secondary/10"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="bg-accent/5 rounded-xl p-5 border border-accent/10">
                        <h3 className="text-xs font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {labels.solution}
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                          {useCase.solution}
                        </p>
                      </div>

                      {/* Results */}
                      <div className="bg-[#047857]/5 rounded-xl p-5 border border-[#047857]/15">
                        <h3 className="text-xs font-semibold text-[#047857] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          {labels.results}
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {useCase.results.split(" · ").map((r, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#047857] flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700 font-medium">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      {useCase.testimonialQuote && (
                        <div className="relative bg-[#F8FAFC] rounded-xl p-5 border border-gray-100">
                          <Quote className="h-6 w-6 text-[#047857]/20 absolute top-4 right-4" aria-hidden="true" />
                          <p className="text-gray-700 italic leading-relaxed text-sm mb-3">
                            &ldquo;{useCase.testimonialQuote}&rdquo;
                          </p>
                          <p className="text-xs text-gray-500 font-medium">
                            -- {useCase.testimonialRole}
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="pt-2">
                        <Link
                          href={`/contact?ref=usecase-${useCase.ctaSlug}`}
                          className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm"
                        >
                          {labels.discussCase}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={t("cta.title")}
        subtitle={t("cta.subtitle")}
        primaryLabel={t("cta.button")}
        primaryHref="/contact?ref=usecase-custom"
        secondaryLabel={t("cta.secondaryButton")}
        secondaryHref="/demo"
        variant="contact"
        tone="dark"
      />
    </main>
  );
}
