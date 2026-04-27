"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  Target,
  TrendingUp,
  Users,
  Quote,
  MessageCircleQuestion,
  ChevronDown,
  ChevronUp,
  Star,
  Sparkles,
} from "lucide-react";
import type { SectorSlug } from "@/data/sectors";
import { SECTORS, getSectorDef } from "@/data/sectors";
import { getSectorContent, getSectorName } from "@/data/sectors-i18n";

/* ─────────────────────────────────────────────────────────────────────────────
   Sticky nav anchor IDs and labels
───────────────────────────────────────────────────────────────────────────── */
const anchors = {
  fr: [
    { id: "profil", label: "Profil" },
    { id: "douleurs", label: "Douleurs" },
    { id: "cas-usage", label: "Cas d'usage" },
    { id: "roi", label: "ROI" },
    { id: "personas", label: "Décideurs" },
    { id: "argumentaire", label: "Argumentaire" },
    { id: "objections", label: "Objections" },
  ],
  en: [
    { id: "profil", label: "Profile" },
    { id: "douleurs", label: "Pain points" },
    { id: "cas-usage", label: "Use cases" },
    { id: "roi", label: "ROI" },
    { id: "personas", label: "Decision makers" },
    { id: "argumentaire", label: "Value prop" },
    { id: "objections", label: "Objections" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────────────────────────── */
export default function SectorDetailPage({
  slug,
}: {
  slug: SectorSlug;
}) {
  const locale = useLocale();
  const sectorDef = getSectorDef(slug)!;
  const content = getSectorContent(locale, slug);
  const anchorList = anchors[locale as "fr" | "en"] ?? anchors.fr;
  const isFr = locale === "fr";

  const [activeAnchor, setActiveAnchor] = useState(anchorList[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Scroll spy */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const a of anchorList) {
      const el = document.getElementById(a.id);
      if (el) observerRef.current.observe(el);
    }
    return () => observerRef.current?.disconnect();
  }, [anchorList]);

  /* Other sectors for navigation */
  const otherSectors = SECTORS.filter((s) => s.slug !== sectorDef.slug).slice(0, 5);

  return (
    <div className="min-h-screen">
      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative bg-[#0F1115] py-24 lg:py-32 overflow-hidden">
        <Image
          src={sectorDef.image}
          alt={content.hero.title}
          fill
          priority
          className="object-cover opacity-15"
          sizes="100vw"
        />
        {/* Ghost number */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-16 select-none pointer-events-none">
          <span className="text-[8rem] lg:text-[12rem] font-black text-white/[0.04] leading-none">
            {String(sectorDef.number).padStart(2, "0")}
          </span>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/70 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {isFr ? "Secteur" : "Sector"} {String(sectorDef.number).padStart(2, "0")}/16
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl">
                {content.hero.subtitle}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STICKY NAV
      ════════════════════════════════════════════ */}
      <nav className="sticky top-16 lg:top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4">
            {anchorList.map((a) => (
              <a
                key={a.id}
                href={`#${a.id}`}
                aria-current={activeAnchor === a.id ? "true" : undefined}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeAnchor === a.id
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ════════════════════════════════════════════
          1. PROFIL DU SECTEUR
      ════════════════════════════════════════════ */}
      <section id="profil" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {isFr ? "Profil du secteur" : "Sector profile"}
                </h2>
              </div>
            </FadeIn>
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
              <FadeIn>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {content.profile.description}
                </p>
                <div className="bg-[#F8FAFC] border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    {isFr ? "Cadre réglementaire" : "Regulatory framework"}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {content.profile.regulations}
                  </p>
                </div>
              </FadeIn>
              <FadeIn direction="right">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={sectorDef.image}
                    alt={content.hero.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TF1 REFERENCE (medias-audiovisuel only)
      ════════════════════════════════════════════ */}
      {content.tf1Reference && (
        <section className="py-12 bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Star className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-semibold text-white mb-3">
                    <Sparkles className="w-4 h-4" />
                    {isFr ? "Référence client" : "Client reference"} : TF1
                  </div>
                  <p className="text-white text-lg leading-relaxed">
                    {content.tf1Reference}
                  </p>
                  <p className="text-white/80 text-sm mt-3 font-medium">
                    {isFr
                      ? "Contrat annuel récurrent, parc IT et broadcast"
                      : "Recurring annual contract, IT and broadcast fleet"}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          2. DOULEURS SPECIFIQUES
      ════════════════════════════════════════════ */}
      <section id="douleurs" className="py-20 lg:py-28 bg-[#0F1115]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">
                  {isFr ? "Douleurs spécifiques" : "Specific pain points"}
                </h2>
              </div>
              <p className="text-white/50 mb-12 ml-[60px]">
                {isFr
                  ? "Les défis que vous rencontrez au quotidien"
                  : "The challenges you face every day"}
              </p>
            </FadeIn>
            <StaggerContainer className="space-y-6">
              {content.painPoints.map((point, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center mt-1">
                      <span className="text-sm font-bold text-white/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {point}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. CAS D USAGE PRIORITAIRES
      ════════════════════════════════════════════ */}
      <section id="cas-usage" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-gray-900 mb-12">
                {isFr ? "Cas d'usage prioritaires" : "Priority use cases"}
              </h2>
            </FadeIn>
            <div className="space-y-8">
              {content.useCases.map((uc, i) => {
                const isOdd = i % 2 !== 0;
                return (
                  <FadeIn key={i}>
                    <div
                      className={`rounded-2xl border border-gray-200 overflow-hidden ${
                        isOdd ? "bg-[#F8FAFC]" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-6 p-8">
                        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-black text-primary/60">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {uc.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {uc.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. ROI ATTENDU
      ════════════════════════════════════════════ */}
      <section id="roi" className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {isFr ? "ROI attendu" : "Expected ROI"}
                </h2>
              </div>
            </FadeIn>
            <FadeIn>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                          {isFr ? "Levier de valeur" : "Value lever"}
                        </th>
                        <th className="text-left px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                          {isFr ? "Économie / gain typique" : "Typical savings / gain"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.roi.map((row, i) => (
                        <tr
                          key={i}
                          className={`border-b border-gray-100 ${
                            i % 2 === 0 ? "" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4 text-gray-900 font-medium">
                            {row.lever}
                          </td>
                          <td className="px-6 py-4 text-accent font-semibold">
                            {row.gain}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. PERSONAS DECIDEURS
      ════════════════════════════════════════════ */}
      <section id="personas" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {isFr ? "Personas décideurs" : "Decision-maker personas"}
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.personas.map((p, i) => (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-gray-100 h-full">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                      <span className="text-sm font-bold text-indigo-600">
                        {p.role.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {p.role}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. ARGUMENTAIRE (QUOTE)
      ════════════════════════════════════════════ */}
      <section id="argumentaire" className="py-20 lg:py-28 bg-[#0F1115]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Quote className="w-12 h-12 text-accent/40 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug">
                {content.quote}
              </blockquote>
              <div className="mt-8 text-accent font-semibold">
                GreenTechCycle
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          7. OBJECTIONS ET REPONSES
      ════════════════════════════════════════════ */}
      <section id="objections" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-12">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <MessageCircleQuestion className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {isFr
                    ? "Objections fréquentes et réponses"
                    : "Common objections and answers"}
                </h2>
              </div>
            </FadeIn>
            <ObjectionList objections={content.objections} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          OTHER SECTORS
      ════════════════════════════════════════════ */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900">
                {isFr ? "Découvrir les autres secteurs" : "Explore other sectors"}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {otherSectors.map((s) => (
                <Link
                  key={s.slug}
                  href={`/secteurs/${s.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 font-medium hover:border-accent hover:text-accent transition-colors shadow-sm"
                >
                  {getSectorName(locale, s.slug)}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <Link
                href="/secteurs"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                {isFr ? "Tous les secteurs" : "All sectors"}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {content.cta.title}
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/reserver?offre=demo-conseil"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
                >
                  {content.cta.button}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
                >
                  {isFr ? "Voir les cas d'usages" : "See use cases"}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BANDEAU TARIFAIRE
      ════════════════════════════════════════════ */}
      <section className="py-14 lg:py-16 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6EE7B7] mb-3 text-center">
                {isFr ? "Grille tarifaire GreenTechCycle" : "GreenTechCycle pricing"}
              </p>
              <h3
                className="text-white font-bold text-center mb-10"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.12 }}
              >
                {isFr
                  ? "Découvrez la grille tarifaire complète"
                  : "Explore the full pricing grid"}
              </h3>
              <div className="grid md:grid-cols-3 gap-5 mb-10">
                {[
                  {
                    label: isFr ? "Plateforme GTC SaaS" : "GTC SaaS Platform",
                    price: isFr ? "À partir de 2 500 € HT/mois" : "Starting at €2,500 HT/month",
                    note: isFr ? "Base 500 postes, étude personnalisée" : "Base 500 devices, bespoke study",
                    accent: "#0EA5E9",
                  },
                  {
                    label: "Waki Box",
                    price: isFr ? "Dès 39 € HT/mois" : "From €39 HT/month",
                    note: isFr ? "3 plans publics, pilote 1er mois offert" : "3 public plans, pilot 1st month free",
                    accent: "#10B981",
                    featured: true,
                  },
                  {
                    label: isFr ? "Service ITAD" : "ITAD Service",
                    price: isFr ? "À partir de 15 € HT/poste" : "Starting at €15 HT/device",
                    note: isFr ? "Effacement NIST 800-88, devis sous 48 h" : "NIST 800-88 erasure, quote in 48 h",
                    accent: "#F59E0B",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-5 border transition-all ${
                      card.featured
                        ? "bg-[#10B981]/10 border-[#10B981]/40 ring-1 ring-[#10B981]/30"
                        : "bg-white/[0.04] border-white/10"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2" style={{ color: card.accent }}>
                      {card.label}
                    </p>
                    <p className="text-base font-black text-white mb-1" style={{ color: card.accent }}>
                      {card.price}
                    </p>
                    <p className="text-[12px] text-gray-400 leading-snug">{card.note}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/tarifs"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 text-sm"
                >
                  {isFr ? "Voir tous les tarifs" : "See all pricing"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=demo-conseil"
                  className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/14 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
                >
                  {isFr ? "Réserver une démo" : "Book a demo"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Waki Box pilote encart */}
      <section className="py-10 lg:py-12 bg-[#F0FDF4] border-t border-[#10B981]/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#10B981]/30 shadow-sm p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.1em] text-[#10B981] uppercase mb-1">
                  {isFr ? "Pilote sans engagement" : "Risk-free pilot"}
                </p>
                <p className="font-bold text-[#0F172A] text-base leading-snug">
                  {isFr
                    ? "Testez Waki Box - 1er mois offert, puis 39 EUR HT/mois"
                    : "Try Waki Box - 1st month free, then EUR 39 ex-VAT/month"}
                </p>
                <p className="text-sm text-gray-600 mt-1 leading-snug">
                  {isFr
                    ? "Collecte, inventaire automatise et attestation inclus. Resiliable a tout moment."
                    : "Collection, automated inventory and certificate included. Cancel anytime."}
                </p>
              </div>
            </div>
            <Link
              href="/reserver?offre=pilote-waki-box"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm flex-shrink-0 whitespace-nowrap"
            >
              {isFr ? "Demarrer le pilote" : "Start the pilot"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="py-8 bg-[#0F1115] border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            {["R2v3", "ISO 14001", "NIST 800-88", "RGPD", "CSRD"].map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent/60" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Objection accordion
───────────────────────────────────────────────────────────────────────────── */
function ObjectionList({
  objections,
}: {
  objections: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {objections.map((obj, i) => {
        const isOpen = openIndex === i;
        return (
          <FadeIn key={i}>
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-semibold text-gray-900">
                  &laquo; {obj.question} &raquo;
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {obj.answer}
                  </p>
                </div>
              )}
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
