"use client";

/**
 * /cas-usages — Page bibliothèque de cas sectoriels GreenTechCycle
 *
 * 10 sections :
 *   S1  Hero grille sectorielle 8 tuiles cliquables
 *   S2  KPIs agrégés CountUp (4 chiffres)
 *   S3  Navigation sticky 8 ancres sectorielles
 *   S4  Les 8 cas sectoriels (structure homogène premium)
 *   S5  Tableau comparatif 8 × 6
 *   S6  Encart conversion formulaire
 *   S7  Témoignages croisés 4 verbatims
 *   S8  Écosystème partenaires
 *   S9  FAQ 6 questions accordion
 *   S10 CTA final double
 *
 * Cible : DSI / RSSI / RSE / DAF grandes entreprises et ETI cotées.
 * Design : palette #10B981 / #0EA5E9 / #F59E0B sur fond clair.
 * Tech  : Next.js 14 · next-intl · framer-motion · lucide-react · Tailwind.
 */

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  ScaleIn,
} from "@/components/motion";
import {
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingCart,
  Zap,
  Radio,
  GraduationCap,
  CheckCircle2,
  Quote,
  Shield,
  ShieldCheck,
  FileCheck,
  Euro,
  Recycle,
  BarChart3,
  Server,
  Target,
  TrendingUp,
  Lock,
  Clock,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

type SectorTile = {
  slug: string;
  label: string;
  kpi: string;
};

type KpiItem = {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  source: string;
};

type NavItem = {
  slug: string;
  label: string;
};

type CaseMetric = {
  label: string;
  value: string;
  detail: string;
};

type UseCase = {
  slug: string;
  sector: string;
  badgeColor: string;
  photo: string;
  photoAlt: string;
  title: string;
  subtitle: string;
  context: string[];
  solution: string[];
  results: string[];
  metrics: CaseMetric[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  quoteSector: string;
  seeAlso: string;
  seeAlsoLabel: string;
};

type MatrixTranslations = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footnote: string;
  headers: string[];
  rows: string[][];
};

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
  sector: string;
};

type FaqItem = {
  q: string;
  a: string;
};

type ConversionFields = Record<string, string>;

// ─────────────────────────────────────────────────────────────────────────────
// STATIC MAPPINGS — sector icon & accent colour per slug / index
// ─────────────────────────────────────────────────────────────────────────────

/** Icon per sector slug */
const SECTOR_ICONS: Record<string, React.ElementType> = {
  "banque-cac40": Building2,
  "chu-sante": HeartPulse,
  "industriel-csrd": Factory,
  "ministere-collectivite": Landmark,
  "retail-wakibox": ShoppingCart,
  "energie-dora": Zap,
  "telco-datacenter": Radio,
  "universite-ess": GraduationCap,
};

/** Alternating accent colours for the 8 sectors */
const SECTOR_ACCENTS: string[] = [
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#0EA5E9",
  "#10B981",
  "#F59E0B",
  "#0EA5E9",
  "#10B981",
];

/** Icons for the 4 metric cards inside each case block */
const METRIC_ICONS: React.ElementType[] = [Euro, Recycle, Clock, BarChart3];

/** Icons for the 4 aggregated KPIs */
const KPI_ICONS: React.ElementType[] = [Recycle, Euro, FileCheck, Server];

/** Sector icons as ordered array (for matrix table) */
const ORDERED_SECTOR_ICONS: React.ElementType[] = [
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingCart,
  Zap,
  Radio,
  GraduationCap,
];

// ─────────────────────────────────────────────────────────────────────────────
// INLINE SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Single KPI metric card inside each case block */
function MetricCard({
  metric,
  accent,
  index,
}: {
  metric: CaseMetric;
  accent: string;
  index: number;
}) {
  const Icon = METRIC_ICONS[index] ?? BarChart3;
  return (
    <div
      className="rounded-2xl p-5 border text-center flex flex-col items-center"
      style={{
        backgroundColor: `${accent}08`,
        borderColor: `${accent}28`,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ backgroundColor: `${accent}18` }}
      >
        <Icon className="h-4 w-4" style={{ color: accent }} aria-hidden="true" />
      </div>
      <p
        className="text-2xl font-bold tracking-tight mb-1 leading-none"
        style={{ color: accent }}
      >
        {metric.value}
      </p>
      <p className="text-xs font-semibold text-[#0F172A] mb-1 leading-tight">
        {metric.label}
      </p>
      <p className="text-[11px] text-gray-500 leading-snug">{metric.detail}</p>
    </div>
  );
}

/** Three-column case body: Contexte | Solution | Résultats */
function CaseColumns({
  cas,
  accent,
  contextLabel,
  solutionLabel,
  resultsLabel,
}: {
  cas: UseCase;
  accent: string;
  contextLabel: string;
  solutionLabel: string;
  resultsLabel: string;
}) {
  type ColDef = {
    label: string;
    items: string[];
    icon: React.ElementType;
    iconColor: string;
    bulletColor: string;
    useDot: boolean;
  };

  const columns: ColDef[] = [
    {
      label: contextLabel,
      items: cas.context,
      icon: Target,
      iconColor: "#F59E0B",
      bulletColor: "#F59E0B",
      useDot: true,
    },
    {
      label: solutionLabel,
      items: cas.solution,
      icon: CheckCircle2,
      iconColor: "#10B981",
      bulletColor: "#10B981",
      useDot: false,
    },
    {
      label: resultsLabel,
      items: cas.results,
      icon: TrendingUp,
      iconColor: accent,
      bulletColor: accent,
      useDot: true,
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-10">
      {columns.map((col) => {
        const ColIcon = col.icon;
        return (
          <div key={col.label}>
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${col.iconColor}18` }}
              >
                <ColIcon
                  className="h-4 w-4"
                  style={{ color: col.iconColor }}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-bold text-[#0F172A] text-xs tracking-[0.12em] uppercase">
                {col.label}
              </h3>
            </div>
            <ul className="space-y-2.5">
              {col.items.map((item, j) =>
                col.useDot ? (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ backgroundColor: col.bulletColor }}
                    />
                    {item}
                  </li>
                ) : (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 flex-shrink-0 mt-0.5"
                      style={{ color: col.iconColor }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/** Full case block — photo banner + 3-col body + KPI cards + quote + CTA */
function CaseBlock({
  cas,
  idx,
  t,
}: {
  cas: UseCase;
  idx: number;
  t: ReturnType<typeof useTranslations>;
}) {
  const SectorIcon = SECTOR_ICONS[cas.slug] ?? Building2;
  const accent = SECTOR_ACCENTS[idx];

  return (
    <div
      id={`cas-${cas.slug}`}
      className="scroll-mt-20 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl transition-shadow duration-500"
    >
      {/* ── Banner: photo + overlay + sector badge + title ────────── */}
      <div className="relative aspect-[21/6] lg:aspect-[21/5] overflow-hidden">
        <Image
          src={cas.photo}
          alt={cas.photoAlt}
          fill
          loading={idx === 0 ? "eager" : "lazy"}
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 1200px"
        />
        {/* Dark gradient overlay — left-heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/60 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="px-8 lg:px-12 w-full max-w-4xl">
            {/* Sector badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wider uppercase mb-4"
              style={{ backgroundColor: `${accent}CC` }}
            >
              <SectorIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {cas.sector}
            </div>

            {/* Case title */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight mb-2">
              {cas.title}
            </h2>

            {/* Client subtitle */}
            <p className="text-sm text-gray-300 font-medium">{cas.subtitle}</p>
          </div>
        </div>
      </div>

      {/* ── Case body ─────────────────────────────────────────────── */}
      <div className="p-6 lg:p-10">
        {/* Three-column Contexte | Solution | Résultats */}
        <CaseColumns
          cas={cas}
          accent={accent}
          contextLabel={t("cases.contextLabel")}
          solutionLabel={t("cases.solutionLabel")}
          resultsLabel={t("cases.resultsLabel")}
        />

        {/* ── Métriques clés — 4 KPI cards ───────────────────────── */}
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase mb-5">
            {t("cases.metricsLabel")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cas.metrics.map((metric, j) => (
              <MetricCard key={j} metric={metric} accent={accent} index={j} />
            ))}
          </div>
        </div>

        {/* ── Citation client anonymisée ─────────────────────────── */}
        <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 lg:p-8 mb-8">
          <Quote
            className="h-8 w-8 mb-4 opacity-40"
            style={{ color: accent }}
            aria-hidden="true"
          />
          <blockquote className="text-base md:text-lg text-[#0F172A] font-medium leading-relaxed mb-5 italic max-w-3xl">
            &ldquo;{cas.quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            {/* Avatar initiale */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
              style={{ backgroundColor: accent }}
            >
              {cas.quoteName.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-[#0F172A] text-sm leading-tight">
                {cas.quoteName}
              </p>
              <p className="text-xs text-gray-500 italic">
                {cas.quoteRole} &middot; {cas.quoteSector}
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA + liaison croisée ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-100">
          {/* Primary CTA */}
          <Link
            href={`/contact?ref=usecase-${cas.slug}`}
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-sm whitespace-nowrap"
            style={{ backgroundColor: accent }}
          >
            {t("cases.ctaBtn")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Cross-link to related case */}
          <a
            href={`#cas-${cas.seeAlso}`}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#10B981] font-medium transition-colors group"
          >
            <span className="text-xs text-gray-400">
              {t("cases.seeAlsoLabel")} :
            </span>
            <span className="group-hover:underline underline-offset-2">
              {cas.seeAlsoLabel}
            </span>
            <ChevronRight
              className="h-3.5 w-3.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function CasUsagesPage() {
  const t = useTranslations("casUsages");

  // ── Translation-driven data ─────────────────────────────────────────────
  const sectorTiles = t.raw("hero.sectors") as SectorTile[];
  const kpiItems = t.raw("kpis.items") as KpiItem[];
  const navItems = t.raw("nav.items") as NavItem[];
  const cases = t.raw("cases.items") as UseCase[];
  const matrixData = t.raw("matrix") as MatrixTranslations;
  const testimonials = t.raw("testimonials.items") as TestimonialItem[];
  const partnerItems = t.raw("partners.items") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const trustBadges = t.raw("finalCta.trustBadges") as string[];
  const convFields = t.raw("conversion.fields") as ConversionFields;

  // ── Local state ─────────────────────────────────────────────────────────
  const [activeNav, setActiveNav] = useState<string>("");
  const [stickyVisible, setStickyVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    company: "",
    sector: "",
    parkSize: "",
    challenge: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroRef = useRef<HTMLElement>(null);

  // ── Sticky nav + active anchor tracking via scroll ──────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? 0;
      setStickyVisible(window.scrollY > heroHeight + 80);

      // Walk reversed: find deepest section whose top is above the fold
      for (const nav of [...navItems].reverse()) {
        const el = document.getElementById(`cas-${nav.slug}`);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveNav(nav.slug);
          return;
        }
      }
      setActiveNav("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // ── Form handler ────────────────────────────────────────────────────────
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Field entries for form rendering
  const fieldEntries = Object.entries(convFields);

  // ───────────────────────────────────────────────────────────────────────
  return (
    <main className="overflow-hidden bg-white">

      {/* ══════════════════════════════════════════════════════════════════
          S1 — HERO : grille sectorielle 8 tuiles cliquables
          "8 cas réels, 8 secteurs, des résultats chiffrés."
          Double CTA : audit + cas non listé
         ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center bg-gradient-to-br from-white via-[#F8FAFC] to-[#ECFDF5] overflow-hidden py-20 lg:py-28"
        aria-labelledby="hero-cas-title"
      >
        {/* Ambient decorative blobs */}
        <div
          className="absolute -top-32 -right-32 w-[36rem] h-[36rem] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-32 w-[32rem] h-[32rem] bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.06),_transparent_55%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10 w-full">
          <FadeIn>
            {/* Eyebrow trust badge */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#0F172A] text-xs font-semibold tracking-wider uppercase mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              {t("hero.eyebrow")}
            </span>

            {/* H1 — provocation chiffrée */}
            <h1
              id="hero-cas-title"
              className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-[#0F172A] tracking-tight leading-[1.05] mb-6 max-w-4xl"
            >
              {t("hero.title")}
            </h1>

            {/* Sub-heading with CTA-oriented text */}
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </FadeIn>

          {/* 8-tile sector grid */}
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {sectorTiles.map((tile, i) => {
              const Icon = SECTOR_ICONS[tile.slug] ?? Building2;
              const accent = SECTOR_ACCENTS[i];
              return (
                <StaggerItem key={tile.slug}>
                  <a
                    href={`#cas-${tile.slug}`}
                    className="group block bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#10B981]/30 h-full"
                    aria-label={`Aller au cas secteur ${tile.label}`}
                  >
                    {/* Sector icon */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accent}15` }}
                    >
                      <Icon
                        className="h-6 w-6"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Sector label */}
                    <p className="font-bold text-[#0F172A] text-base mb-2 leading-tight tracking-tight">
                      {tile.label}
                    </p>

                    {/* Mini-KPI accroche */}
                    <p className="text-xs text-gray-500 leading-snug font-medium mb-3">
                      {tile.kpi}
                    </p>

                    {/* Hover arrow */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span
                        className="text-[11px] font-semibold"
                        style={{ color: accent }}
                      >
                        Voir le cas
                      </span>
                      <ChevronRight
                        className="h-3 w-3"
                        style={{ color: accent }}
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Dual CTA + trust strip */}
          <FadeIn delay={0.25}>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 hover:-translate-y-0.5 text-base"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href="#conversion"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] border-2 border-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>

            {/* Inline certifications trust strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-gray-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck
                  className="h-4 w-4 text-[#10B981]"
                  aria-hidden="true"
                />
                <span>R2v3 · ISO 14001 · ISO 27001</span>
              </div>
              <span
                className="hidden sm:inline w-px h-4 bg-gray-200"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                <span>NIST 800-88 rev2 · HMG IS5</span>
              </div>
              <span
                className="hidden sm:inline w-px h-4 bg-gray-200"
                aria-hidden="true"
              />
              <div className="flex items-center gap-1.5">
                <FileCheck
                  className="h-4 w-4 text-[#10B981]"
                  aria-hidden="true"
                />
                <span>RGPD · NIS2 · DORA · CSRD ESRS E5</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S2 — KPIs AGRÉGÉS : 4 chiffres CountUp animés
          fond dark navy · animation framer-motion
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#0F172A] relative overflow-hidden">
        {/* Ambient glows */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 bg-[#0EA5E9]/08 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("kpis.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                {t("kpis.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {kpiItems.map((item, i) => {
              const KIcon = KPI_ICONS[i] ?? BarChart3;
              const accent = i % 2 === 0 ? "#10B981" : "#0EA5E9";
              return (
                <StaggerItem key={i}>
                  <ScaleIn delay={i * 0.07}>
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${accent}22` }}
                      >
                        <KIcon
                          className="h-5 w-5"
                          style={{ color: accent }}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Animated value */}
                      <p
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-none"
                        style={{ color: accent }}
                      >
                        <CountUp
                          end={item.value}
                          suffix={item.suffix}
                          prefix={item.prefix ?? ""}
                          duration={2.2}
                        />
                      </p>

                      {/* Label */}
                      <p className="text-gray-300 text-sm font-medium leading-snug mb-3 flex-1">
                        {item.label}
                      </p>

                      {/* Source */}
                      <p className="text-[11px] text-gray-500 italic border-t border-white/10 pt-3 leading-snug">
                        {item.source}
                      </p>
                    </div>
                  </ScaleIn>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="mt-10 text-center text-xs text-gray-500 italic max-w-3xl mx-auto leading-relaxed">
              {t("kpis.footnote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S3 — NAVIGATION STICKY : 8 ancres sectorielles
          Apparaît après le défilement du hero. Active highlight au scroll.
         ══════════════════════════════════════════════════════════════════ */}
      <nav
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-500 ${
          stickyVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        aria-label={t("nav.label")}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase mr-3 whitespace-nowrap flex-shrink-0">
              {t("nav.label")} :
            </span>
            {navItems.map((item, i) => {
              const Icon = SECTOR_ICONS[item.slug] ?? Building2;
              const accent = SECTOR_ACCENTS[i];
              const isActive = activeNav === item.slug;
              return (
                <a
                  key={item.slug}
                  href={`#cas-${item.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                    isActive
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "text-gray-600 hover:text-[#0F172A] hover:bg-gray-50"
                  }`}
                  aria-current={isActive ? "location" : undefined}
                >
                  <Icon
                    className="h-3.5 w-3.5"
                    style={{ color: isActive ? "#10B981" : accent }}
                    aria-hidden="true"
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════
          S4 — LES 8 CAS SECTORIELS
          Chaque cas : banner photo · badge secteur · 3 cols · KPIs · quote · CTA
          id="cas-{slug}" pour ancrage sticky nav
         ══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8FAFC]" aria-labelledby="cases-title">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("cases.eyebrow")}
              </p>
              <h2
                id="cases-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-5"
              >
                {t("cases.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("cases.subtitle")}
              </p>
            </div>
          </FadeIn>

          {/* 8 case blocks stacked vertically */}
          <div className="space-y-20">
            {cases.map((cas, idx) => (
              <FadeIn key={cas.slug} delay={0.04}>
                <CaseBlock cas={cas} idx={idx} t={t} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S5 — TABLEAU COMPARATIF : 8 lignes × 6 colonnes
          Secteur / € économisés / tCO2e évitées / Conformité / Durée / Taux
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="matrix-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {matrixData.eyebrow}
              </p>
              <h2
                id="matrix-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]"
              >
                {matrixData.title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {matrixData.subtitle}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm min-w-[680px]">
                <thead>
                  <tr className="bg-[#0F172A] text-white">
                    {matrixData.headers.map((header, i) => (
                      <th
                        key={i}
                        scope="col"
                        className={`px-5 py-4 text-left text-xs font-semibold tracking-wider uppercase whitespace-nowrap ${
                          i === 0 ? "rounded-tl-2xl" : ""
                        } ${
                          i === matrixData.headers.length - 1
                            ? "rounded-tr-2xl"
                            : ""
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrixData.rows.map((row, i) => {
                    const accent = SECTOR_ACCENTS[i];
                    const SIcon = ORDERED_SECTOR_ICONS[i] ?? Building2;
                    const isLast = i === matrixData.rows.length - 1;
                    return (
                      <tr
                        key={i}
                        className={`border-b transition-colors hover:bg-[#ECFDF5]/50 ${
                          isLast ? "border-b-0" : "border-gray-100"
                        } ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]/60"}`}
                      >
                        {/* Sector column — with icon + anchor link */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${accent}18` }}
                            >
                              <SIcon
                                className="h-4 w-4"
                                style={{ color: accent }}
                                aria-hidden="true"
                              />
                            </div>
                            <a
                              href={`#cas-${navItems[i]?.slug ?? ""}`}
                              className="font-semibold text-[#0F172A] text-xs leading-tight hover:text-[#10B981] transition-colors underline-offset-2 hover:underline"
                            >
                              {row[0]}
                            </a>
                          </div>
                        </td>

                        {/* Data columns */}
                        {row.slice(1).map((cell, j) => (
                          <td
                            key={j}
                            className="px-5 py-4 text-gray-600 text-xs leading-snug"
                          >
                            {j === 0 ? (
                              /* € économisés — bold accent colour */
                              <span
                                className="font-bold text-sm"
                                style={{ color: accent }}
                              >
                                {cell}
                              </span>
                            ) : j === 1 ? (
                              /* tCO2e évitées — semi-bold */
                              <span className="font-semibold text-[#0F172A]">
                                {cell}
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {matrixData.footnote && (
              <p className="mt-4 text-[11px] text-gray-400 italic leading-relaxed">
                {matrixData.footnote}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S6 — ENCART CONVERSION
          "Votre cas n'est pas listé ?" — formulaire 4 champs
          Réponse cas comparable + ROI estimé sous 48h
         ══════════════════════════════════════════════════════════════════ */}
      <section
        id="conversion"
        className="py-20 lg:py-24 bg-[#F8FAFC] scroll-mt-20"
        aria-labelledby="conversion-title"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-12">
                <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                  {t("conversion.eyebrow")}
                </p>
                <h2
                  id="conversion-title"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]"
                >
                  {t("conversion.title")}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  {t("conversion.subtitle")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              <div className="bg-white border border-gray-100 rounded-3xl p-8 lg:p-12 shadow-sm">
                {formSubmitted ? (
                  /* ── Success state ──────────────────────────────── */
                  <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2
                        className="h-8 w-8 text-[#10B981]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                      {t("conversion.successTitle")}
                    </h3>
                    <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                      {t("conversion.successBody")}
                    </p>
                  </div>
                ) : (
                  /* ── Form ─────────────────────────────────────── */
                  <form onSubmit={handleFormSubmit} noValidate>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      {fieldEntries.map(([key, label]) => (
                        <div key={key}>
                          <label
                            htmlFor={`conv-${key}`}
                            className="block text-sm font-semibold text-[#0F172A] mb-2"
                          >
                            {label}
                            <span
                              className="text-[#F59E0B] ml-0.5"
                              aria-hidden="true"
                            >
                              *
                            </span>
                          </label>
                          <input
                            id={`conv-${key}`}
                            type="text"
                            value={formData[key] ?? ""}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                              }))
                            }
                            placeholder={label}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] text-sm text-[#0F172A] placeholder:text-gray-400 transition-all bg-[#F8FAFC] focus:bg-white"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 hover:-translate-y-0.5 text-sm whitespace-nowrap"
                      >
                        {t("conversion.cta")}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <p className="text-xs text-gray-500 leading-relaxed italic">
                        {t("conversion.privacy")}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S7 — TÉMOIGNAGES CROISÉS : 4 verbatims, 4 personas DSI/RSSI/RSE/DAF
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="testimonials-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("testimonials.eyebrow")}
              </p>
              <h2
                id="testimonials-title"
                className="text-3xl md:text-4xl font-bold text-[#0F172A] tracking-tight leading-[1.1]"
              >
                {t("testimonials.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((item, i) => {
              const accent = SECTOR_ACCENTS[i];
              return (
                <StaggerItem key={i}>
                  <figure className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 h-full flex flex-col hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    {/* Open quote icon */}
                    <Quote
                      className="h-6 w-6 mb-4 opacity-35"
                      style={{ color: accent }}
                      aria-hidden="true"
                    />

                    {/* Verbatim */}
                    <blockquote className="text-sm text-gray-700 leading-relaxed italic flex-1 mb-5">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    {/* Attribution */}
                    <figcaption className="border-t border-gray-100 pt-4 flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      >
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-[#0F172A] text-xs leading-tight">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-gray-500 italic">
                          {item.role} &middot; {item.sector}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-center text-[11px] text-gray-400 italic max-w-2xl mx-auto leading-relaxed">
              {t("testimonials.consentNote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S8 — ÉCOSYSTÈME PARTENAIRES : bandeau monochrome sobres
          ServiceNow · SAP · Microsoft 365 · Boavizta · ADEME
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-16 bg-[#F8FAFC] border-y border-gray-100"
        aria-labelledby="partners-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase mb-2">
                {t("partners.eyebrow")}
              </p>
              <p
                id="partners-title"
                className="text-xl font-bold text-[#0F172A]"
              >
                {t("partners.title")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {partnerItems.map((partner, i) => (
              <StaggerItem key={i}>
                <div className="px-7 py-3.5 bg-white rounded-xl border border-gray-200 text-gray-500 font-semibold text-sm tracking-wide hover:text-[#0F172A] hover:border-gray-300 hover:shadow-sm transition-all duration-200 cursor-default select-none">
                  {partner}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <p className="mt-8 text-center text-xs text-gray-400 italic">
              {t("partners.note")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S9 — FAQ COURTE : 6 questions accordion
          "Comment chiffrez-vous le ROI ?" / "Mes données quittent-elles l'UE ?"
          / "Quels SLA ?" / "Sites classifiés ?" / "Certifier auditeurs ?"
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-24 bg-white"
        aria-labelledby="faq-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("faq.eyebrow")}
              </p>
              <h2
                id="faq-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]"
              >
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <FadeIn key={i} delay={i * 0.04}>
                  <div
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-[#10B981]/40 shadow-md"
                        : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Question row — click to toggle */}
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-[#F8FAFC] transition-colors"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#10B981]/10 text-[#10B981] text-xs font-bold">
                          Q{i + 1}
                        </span>
                        <span className="font-semibold text-[#0F172A] text-sm leading-tight">
                          {item.q}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp
                          className="h-4 w-4 text-[#10B981] flex-shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDown
                          className="h-4 w-4 text-gray-400 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {/* Answer — shown when open */}
                    {isOpen && (
                      <div
                        id={`faq-answer-${i}`}
                        className="px-6 pb-6 bg-white border-t border-gray-50"
                        role="region"
                        aria-label={`Réponse à : ${item.q}`}
                      >
                        <p className="text-sm text-gray-600 leading-relaxed pt-4 pl-10">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-12 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group"
              >
                {t("faq.allQuestionsLink")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S10 — CTA FINAL DOUBLE
          "Demander un audit" (vert #10B981)
          "Réserver une démo 30 min" (bleu #0EA5E9)
          + bandeau confiance : RGPD · SecNumCloud · ISO 27001 · 24h
         ══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 lg:py-32 overflow-hidden"
        aria-labelledby="final-cta-title"
      >
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-[#1a2f4a]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.22),_transparent_58%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.14),_transparent_55%)] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-10 right-10 w-72 h-72 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-10 left-10 w-72 h-72 bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center text-white">
              {/* Eyebrow */}
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("finalCta.eyebrow")}
              </p>

              {/* H2 */}
              <h2
                id="final-cta-title"
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.05]"
              >
                {t("finalCta.title")}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("finalCta.subtitle")}
              </p>

              {/* Dual CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                {/* Primary — audit — vert */}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-white hover:text-[#10B981] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-[#10B981]/30 hover:-translate-y-0.5 text-base"
                >
                  {t("finalCta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>

                {/* Secondary — démo — bleu */}
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-[#0EA5E9]/20 hover:bg-[#0EA5E9] text-white border-2 border-[#0EA5E9]/60 hover:border-[#0EA5E9] font-semibold px-10 py-5 rounded-xl transition-all duration-300 backdrop-blur-sm text-base"
                >
                  {t("finalCta.cta2")}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust badges row */}
              <div className="pt-8 border-t border-white/15">
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 mb-5 font-semibold">
                  Garanties contractuelles
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {trustBadges.map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-white/90"
                    >
                      <Shield
                        className="h-4 w-4 text-[#10B981] flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-medium">{badge}</span>
                      {i < trustBadges.length - 1 && (
                        <span
                          className="hidden sm:inline w-px h-4 bg-white/20 ml-3"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
