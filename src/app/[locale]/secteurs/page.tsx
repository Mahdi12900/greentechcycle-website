"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Star,
  Sparkles,
  Box,
  Monitor,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { SECTORS } from "@/data/sectors";
import type { SectorDef } from "@/data/sectors";
import { getHubLabels, getMatrixData, getPhases, getSectorName } from "@/data/sectors-i18n";
import type { PhaseData } from "@/data/sectors-i18n";

/* ─────────────────────────────────────────────────────────────────────────────
   Magazine grid layout, asymmetric, editorial, NOT a flat 3-column grid
───────────────────────────────────────────────────────────────────────────── */
function SectorCard({ sector, locale, labels, size }: { sector: SectorDef; locale: string; labels: ReturnType<typeof getHubLabels>; size: "lg" | "md" | "sm" }) {
  const Icon = sector.icon;
  const name = getSectorName(locale, sector.slug);
  const isMedias = sector.slug === "medias-audiovisuel";

  const heights: Record<string, string> = {
    lg: "aspect-[16/10]",
    md: "aspect-[16/9]",
    sm: "aspect-[16/8]",
  };

  return (
    <Link
      href={`/secteurs/${sector.slug}`}
      className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`relative ${heights[size]} w-full`}>
        <Image
          src={sector.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={size === "lg" ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Ghost number */}
        <div className="absolute top-3 right-4 select-none pointer-events-none">
          <span className={`font-black text-white/[0.08] leading-none ${size === "lg" ? "text-7xl" : "text-5xl"}`}>
            {String(sector.number).padStart(2, "0")}
          </span>
        </div>

        {/* TF1 badge */}
        {isMedias && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500 text-white text-xs font-bold shadow-lg">
              <Star className="w-3.5 h-3.5" />
              {labels.tf1Badge}
            </span>
          </div>
        )}

        {/* Icon + priority */}
        {!isMedias && (
          <div className="absolute top-4 left-4">
            <div className={`w-10 h-10 rounded-xl ${sector.color} flex items-center justify-center backdrop-blur-sm bg-white/90`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-white/50 font-medium">
              {String(sector.number).padStart(2, "0")}
            </span>
            {sector.priority === 1 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                <Sparkles className="w-3 h-3" /> {locale === "fr" ? "Prioritaire" : "Priority"}
              </span>
            )}
          </div>
          <h3 className={`font-bold text-white leading-tight ${size === "lg" ? "text-2xl" : "text-lg"}`}>
            {name}
          </h3>
          <span className="inline-flex items-center gap-1 text-sm text-white/70 mt-2 group-hover:text-accent transition-colors">
            {labels.viewSector}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hub Page
───────────────────────────────────────────────────────────────────────────── */
export default function SecteursHubPage() {
  const locale = useLocale();
  const labels = getHubLabels(locale);
  const matrix = getMatrixData(locale);
  const phases = getPhases(locale);

  return (
    <div className="min-h-screen">
      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0F1115] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        {/* Ghost numbers */}
        <div className="absolute top-6 left-8 select-none pointer-events-none">
          <span className="text-[10rem] lg:text-[16rem] font-black text-white/[0.02] leading-none">16</span>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/70 mb-6">
                ITAD · {locale === "fr" ? "Sécurité" : "Security"} · {locale === "fr" ? "Plateforme unifiée" : "Unified platform"}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {labels.heroTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed">
                {labels.heroSubtitle}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW TO READ
      ════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
              {labels.howToReadTitle}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {labels.howToReadBricks.map((brick, i) => {
              const icons = [Monitor, Box, Wrench];
              const IconComp = icons[i];
              return (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <IconComp className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{brick.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{brick.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MAGAZINE GRID, 16 SECTORS
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
              {labels.sectorGridTitle}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {locale === "fr"
                ? "Cliquez sur un secteur pour accéder à sa fiche complète : profil, douleurs, cas d'usage, ROI, personas et objections."
                : "Click a sector to access its full profile: overview, pain points, use cases, ROI, personas and objections."}
            </p>
          </FadeIn>
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Row 1: Medias (lg) + Finance (md) */}
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <SectorCard sector={SECTORS[8]} locale={locale} labels={labels} size="lg" />
              <SectorCard sector={SECTORS[0]} locale={locale} labels={labels} size="md" />
            </div>
            {/* Row 2: Industrie + Retail + Tech */}
            <div className="grid md:grid-cols-3 gap-6">
              <SectorCard sector={SECTORS[2]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[3]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[7]} locale={locale} labels={labels} size="sm" />
            </div>
            {/* Row 3: Conseil (md) + Santé (lg) */}
            <div className="grid md:grid-cols-[1fr_2fr] gap-6">
              <SectorCard sector={SECTORS[9]} locale={locale} labels={labels} size="md" />
              <SectorCard sector={SECTORS[1]} locale={locale} labels={labels} size="lg" />
            </div>
            {/* Row 4: Énergie + Transport + Public */}
            <div className="grid md:grid-cols-3 gap-6">
              <SectorCard sector={SECTORS[4]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[5]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[6]} locale={locale} labels={labels} size="sm" />
            </div>
            {/* Row 5: Pharma + Telecom */}
            <div className="grid md:grid-cols-2 gap-6">
              <SectorCard sector={SECTORS[10]} locale={locale} labels={labels} size="md" />
              <SectorCard sector={SECTORS[15]} locale={locale} labels={labels} size="md" />
            </div>
            {/* Row 6: BTP + HoReCa + Éducation + Agro */}
            <div className="grid md:grid-cols-4 gap-6">
              <SectorCard sector={SECTORS[11]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[12]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[13]} locale={locale} labels={labels} size="sm" />
              <SectorCard sector={SECTORS[14]} locale={locale} labels={labels} size="sm" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ANNEXE 1, MATRICE DE PRIORISATION
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              {labels.annexe1Title}
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              {locale === "fr"
                ? "Évaluation comparative des 16 secteurs selon la taille de deal, la vélocité commerciale et la priorité stratégique."
                : "Comparative assessment of 16 sectors by deal size, commercial velocity and strategic priority."}
            </p>
          </FadeIn>
          <FadeIn>
            <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0F1115] text-white">
                      {labels.annexe1Cols.map((col, i) => (
                        <th key={i} className="text-left px-5 py-4 text-sm font-bold uppercase tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((row, i) => {
                      const sectorName = getSectorName(locale, row.slug);
                      const starColor = row.stars === 3 ? "text-accent" : row.stars === 2 ? "text-amber-500" : "text-gray-400";
                      return (
                        <tr
                          key={row.slug}
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/50"}`}
                        >
                          <td className="px-5 py-3.5">
                            <Link href={`/secteurs/${row.slug}`} className="text-gray-900 font-medium hover:text-primary transition-colors">
                              {sectorName}
                            </Link>
                          </td>
                          <td className="px-5 py-3.5 text-sm text-gray-600">{row.dealSize}</td>
                          <td className="px-5 py-3.5 text-sm text-gray-600">{row.velocity}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-0.5 font-semibold text-sm ${starColor}`}>
                              {Array.from({ length: row.stars }).map((_, j) => (
                                <Star key={j} className="w-4 h-4 fill-current" />
                              ))}
                              <span className="ml-1.5 text-gray-600">{row.priority}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ANNEXE 2, SÉQUENCEMENT
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 bg-[#0F1115]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              {labels.annexe2Title}
            </h2>
            <p className="text-white/50 text-center mb-16 max-w-2xl mx-auto">
              {locale === "fr"
                ? "Trois phases pour construire un portefeuille sectoriel solide et durable."
                : "Three phases to build a solid, sustainable sector portfolio."}
            </p>
          </FadeIn>
          <div className="max-w-5xl mx-auto">
            <StaggerContainer className="space-y-8">
              {phases.map((phase: PhaseData, i: number) => (
                <StaggerItem key={i}>
                  <div className="flex gap-6 items-start">
                    {/* Phase number */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
                      <span className="text-2xl font-black text-accent">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-sm text-white/60 font-medium">
                          {phase.period}
                        </span>
                      </div>
                      <p className="text-white/60 mb-4 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="space-y-2">
                        {phase.sectors.map((s: string, j: number) => (
                          <div key={j} className="flex items-center gap-2 text-white/80">
                            <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-sm">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA DOUBLE + TRUST BANNER
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {labels.ctaTitle}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                {labels.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/reserver?offre=demo-conseil"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
                >
                  {labels.ctaPrimary}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
                >
                  {labels.ctaSecondary}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust banner */}
      <section className="py-8 bg-[#0F1115]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            {labels.trustItems.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-white/40">
                <Shield className="w-4 h-4 text-accent/60" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
