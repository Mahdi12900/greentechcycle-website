"use client";

import { useState } from "react";
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
  ArrowDown,
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Zap,
  Radio,
  GraduationCap,
  Quote,
  Shield,
  ShieldCheck,
  FileCheck,
  Leaf,
  Euro,
  Server,
  Send,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Award,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type KPIItem = { label: string; value: string; detail: string };
type CaseItem = {
  slug: string;
  sector: string;
  badgeColor: string;
  photo: string;
  photoAlt: string;
  title: string;
  subtitle: string;
  metrics: KPIItem[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  quoteSector: string;
};
type MatrixRow = string[];

/* ─────────────────────────────────────────────────────────────────────────────
   Per-case sector icons
───────────────────────────────────────────────────────────────────────────── */
const CASE_ICONS = [
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Zap,
  Radio,
  GraduationCap,
] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Layout logic per case index
   index 0 → white bg,     photo left
   index 1 → #F8FAFC,      photo right
   index 2 → #0F172A dark, photo left
   index 3 → white bg,     photo right
   index 4 → #F8FAFC,      photo left
   index 5 → white bg,     photo right
   index 6 → #0F172A dark, photo left
   index 7 → #F8FAFC,      photo right
───────────────────────────────────────────────────────────────────────────── */
function getCaseLayout(index: number) {
  const photoOnLeft = index % 2 === 0;
  const isDark = index === 2 || index === 6;
  let bgStyle: string;
  if (isDark) {
    bgStyle = "bg-[#0F172A]";
  } else if (index % 2 === 1) {
    bgStyle = "bg-[#F8FAFC]";
  } else {
    bgStyle = "bg-white";
  }
  return { photoOnLeft, isDark, bgStyle };
}

/* ─────────────────────────────────────────────────────────────────────────────
   CaseSection — intra-page component
───────────────────────────────────────────────────────────────────────────── */
function CaseSection({
  c,
  index,
  editorialBody,
}: {
  c: CaseItem;
  index: number;
  editorialBody: string;
}) {
  const { photoOnLeft, isDark, bgStyle } = getCaseLayout(index);
  const caseNumber = String(index + 1).padStart(2, "0");
  const CaseIcon = CASE_ICONS[index] ?? Building2;
  const accentColor = c.badgeColor;

  const kpis = c.metrics.slice(0, 3);

  const textColor = isDark ? "text-white" : "text-[#0F172A]";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const borderColor = isDark ? "border-white/10" : "border-gray-100";
  const kpiLabelColor = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <section
      id={`cas-${c.slug}`}
      className={`relative w-full overflow-hidden ${bgStyle}`}
      aria-labelledby={`case-title-${c.slug}`}
    >
      <div
        className={`flex flex-col lg:flex-row min-h-[85vh] ${
          !photoOnLeft ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* ── Photo panel ── */}
        <div className="relative w-full lg:w-[48%] min-h-[56vw] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src={c.photo}
            alt={c.photoAlt}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
            sizes="(max-width: 1024px) 100vw, 48vw"
          />
          {/* Gradient overlay — blend with content panel */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? photoOnLeft
                  ? "bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/70"
                  : "bg-gradient-to-l from-transparent via-transparent to-[#0F172A]/70"
                : photoOnLeft
                ? "bg-gradient-to-r from-transparent to-white/15"
                : "bg-gradient-to-l from-transparent to-white/15"
            }`}
          />
          {/* Bottom fade */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1/4 ${
              isDark
                ? "bg-gradient-to-t from-[#0F172A]/50 to-transparent"
                : "bg-gradient-to-t from-black/20 to-transparent"
            }`}
          />

          {/* Ghost case number watermark — bleeds off bottom */}
          <div
            className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
            style={{
              fontSize: "clamp(8rem, 22vw, 18rem)",
              color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
              right: photoOnLeft ? "0.5rem" : "auto",
              left: photoOnLeft ? "auto" : "0.5rem",
              bottom: "-0.1em",
            }}
            aria-hidden="true"
          >
            {caseNumber}
          </div>

          {/* Sector badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-sm shadow-lg">
            <CaseIcon className="h-3.5 w-3.5 text-[#0F172A]" aria-hidden="true" />
            <span className="text-[11px] font-semibold text-[#0F172A] tracking-wide uppercase">
              {c.sector}
            </span>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20">
          {/* Left accent bar */}
          <div
            className="absolute top-0 left-0 w-[3px] h-full"
            style={{ backgroundColor: accentColor }}
            aria-hidden="true"
          />

          <div className="max-w-xl w-full">
            <FadeIn>
              {/* Case number + accent line */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-5xl lg:text-6xl font-black leading-none tracking-tighter tabular-nums"
                  style={{ color: accentColor }}
                >
                  {caseNumber}
                </span>
                <span
                  className="flex-1 h-[1px] opacity-25"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h2
                id={`case-title-${c.slug}`}
                className={`text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-5 ${textColor}`}
              >
                {c.title}
              </h2>

              {/* Editorial body — prose, no bullet points */}
              <p className={`text-[1.0rem] lg:text-[1.05rem] leading-[1.78] mb-8 ${subTextColor}`}>
                {editorialBody}
              </p>

              {/* 3 KPIs horizontal */}
              <div
                className={`grid grid-cols-3 gap-3 mb-8 pb-8 border-b ${borderColor}`}
              >
                {kpis.map((kpi, j) => (
                  <div key={j} className="flex flex-col gap-1">
                    <span
                      className="text-2xl lg:text-[1.9rem] font-black tracking-tight leading-none tabular-nums"
                      style={{ color: accentColor }}
                    >
                      {kpi.value}
                    </span>
                    <span
                      className={`text-[11px] font-semibold leading-tight mt-1 ${
                        isDark ? "text-gray-300" : "text-[#0F172A]"
                      }`}
                    >
                      {kpi.label}
                    </span>
                    <span className={`text-[10px] leading-snug ${kpiLabelColor}`}>
                      {kpi.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Client quote */}
              <blockquote
                className="mb-8 pl-4 border-l-[3px]"
                style={{ borderLeftColor: accentColor + "55" }}
              >
                <p
                  className={`italic text-base lg:text-[1.05rem] leading-relaxed mb-3 ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  &ldquo;{c.quote}&rdquo;
                </p>
                <footer
                  className={`text-xs font-semibold not-italic ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  — {c.quoteName}, {c.quoteRole},{" "}
                  <span className="italic font-normal">{c.quoteSector}</span>
                </footer>
              </blockquote>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                <Link
                  href={`/contact?cas=${c.slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    isDark
                      ? "bg-white text-[#0F172A] hover:bg-gray-100 hover:shadow-white/20"
                      : "text-white hover:opacity-90"
                  }`}
                  style={
                    isDark
                      ? {}
                      : {
                          backgroundColor: accentColor,
                          boxShadow: `0 4px 16px ${accentColor}30`,
                        }
                  }
                >
                  Discuter d&apos;un cas similaire
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={`#cas-${c.slug}`}
                  className={`text-sm font-medium underline underline-offset-4 decoration-1 transition-opacity hover:opacity-80 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Voir les détails
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ComparativeBar — animated progress bar
───────────────────────────────────────────────────────────────────────────── */
function ComparativeBar({
  label,
  pct,
  value,
  accentColor,
}: {
  label: string;
  pct: number;
  value: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 flex-shrink-0 text-right">
        <span className="text-[12px] font-semibold text-[#0F172A] leading-tight">
          {label}
        </span>
      </div>
      <div className="flex-1 relative h-7 bg-[#F1F5F9] rounded-lg overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full rounded-lg"
          style={{
            width: `${pct}%`,
            backgroundColor: accentColor,
            opacity: 0.82,
          }}
        />
        <div className="absolute inset-0 flex items-center pl-3">
          <span className="text-[11px] font-bold text-white drop-shadow-sm">
            {pct}%
          </span>
        </div>
      </div>
      <div className="w-20 flex-shrink-0 text-left">
        <span className="text-[12px] font-semibold text-[#0F172A] tabular-nums">
          {value}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main page — CasUsagesPage
───────────────────────────────────────────────────────────────────────────── */
export default function CasUsagesPage() {
  const t = useTranslations("casUsages");

  const cases = t.raw("cases.items") as CaseItem[];
  const kpiItems = t.raw("kpis.items") as Array<{
    value: number;
    suffix: string;
    label: string;
    source: string;
  }>;
  const editorialBodies = t.raw("editorialBodies") as Record<string, string>;
  const matrixRows = t.raw("matrix.rows") as MatrixRow[];
  const trustBadges = t.raw("finalCta.trustBadges") as string[];

  const [formData, setFormData] = useState({
    company: "",
    sector: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Bar colors cycling per case
  const barColors = [
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#0EA5E9",
    "#10B981",
    "#F59E0B",
    "#0EA5E9",
    "#10B981",
  ];

  const comparativeData = matrixRows.map((row, i) => ({
    label: row[0] ?? "",
    recovery: parseInt((row[5] ?? "97").replace("%", "").trim()) || 97,
    value: row[1] ?? "",
    co2: row[2] ?? "",
    conformite: row[3] ?? "",
    duree: row[4] ?? "",
    accentColor: barColors[i] ?? "#10B981",
  }));

  return (
    <main className="overflow-hidden bg-white">

      {/* Urgency band — same pattern as home */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium text-center">
          <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="text-xs leading-snug text-gray-300">
            <span className="font-semibold text-white">38 000+</span> certificats NIST 800-88 émis ·{" "}
            <span className="font-semibold text-white">6 200 tCO2e</span> évitées · Réponse audit sous{" "}
            <span className="font-semibold text-white">72h</span>
          </p>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1 text-[#10B981] hover:text-[#34D399] font-semibold text-xs transition-colors"
          >
            Demander un audit <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 — HERO ÉDITORIAL FEATURED
          Full-viewport split dark: content LEFT (55%) + photo RIGHT (45%)
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="hero-editorial-title"
      >
        {/* Ambient glow layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 10% 10%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 90% 90%, rgba(14,165,233,0.12) 0%, transparent 55%)",
          }}
        />

        {/* ── Left content column (55%) ── */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            {/* Featured badge */}
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("editorialHero.featuredLabel")}
              </span>
            </div>

            {/* Main headline — XXL editorial */}
            <h1
              id="hero-editorial-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {t("editorialHero.headline")}
            </h1>

            {/* Sub-title prose */}
            <p className="text-gray-300 text-base lg:text-[1.1rem] leading-[1.72] max-w-xl mb-10">
              {t("editorialHero.subtitle")}
            </p>

            {/* Proof strip — 3 key figures */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {[
                { v: "1 850", unit: "tCO₂e", l: "évitées en 4 ans", color: "#10B981" },
                { v: "638 k€", unit: "", l: "valeur récupérée", color: "#0EA5E9" },
                { v: "4 jours", unit: "", l: "audit ACPR réussi", color: "#F59E0B" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.v}
                    {item.unit && (
                      <span className="text-base ml-1 font-semibold opacity-80">
                        {item.unit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium">{item.l}</span>
                </div>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {t("editorialHero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {t("editorialHero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Scroll anchor */}
            <a
              href="#cas-banque-cac40"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
              {t("editorialHero.scrollCta")}
            </a>
          </FadeIn>
        </div>

        {/* ── Right photo column (45%) ── */}
        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/case-banque.jpg"
            alt="Infrastructure IT d'une banque CAC40 lors d'une mission de décommissionnement GreenTechCycle"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          {/* Left blend gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />

          {/* Floating testimonial card */}
          <div className="absolute bottom-8 right-5 sm:right-8 max-w-[270px] bg-white/96 backdrop-blur-lg rounded-2xl p-5 shadow-2xl ring-1 ring-gray-100 hidden sm:block">
            <Quote className="h-6 w-6 text-[#0EA5E9] mb-3" aria-hidden="true" />
            <p className="text-[12px] text-[#0F172A] leading-snug font-medium mb-3">
              &ldquo;GTC a transformé notre contrainte réglementaire en avantage compétitif concret.&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0EA5E9]/12 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0F172A] leading-none">Marc B.</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                  {t("editorialHero.featuredMeta")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 — BANDEAU CHIFFRES XXVL — fond #0F172A
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="bg-[#0F172A] relative overflow-hidden border-t border-white/5"
        aria-label="Chiffres clés GreenTechCycle"
      >
        {/* Ambient radial */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.09) 0%, transparent 65%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-20">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {kpiItems.map((kpi, i) => {
              const KIcon = [Leaf, Euro, FileCheck, Server][i] ?? Leaf;
              const accentColors = ["#10B981", "#0EA5E9", "#F59E0B", "#10B981"];
              const accent = accentColors[i] ?? "#10B981";
              const isMillions = kpi.value >= 1000000;
              return (
                <StaggerItem key={i}>
                  <div className="px-5 lg:px-10 py-8 lg:py-10 text-center flex flex-col items-center">
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                      style={{ backgroundColor: accent + "18" }}
                    >
                      <KIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                    </div>

                    {/* Giant CountUp number */}
                    <p
                      className="font-black tracking-tighter leading-none mb-3 tabular-nums"
                      style={{
                        fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                        color: accent,
                      }}
                    >
                      {isMillions ? (
                        <CountUp end={kpi.value / 1000000} decimals={1} suffix=" M€" />
                      ) : (
                        <CountUp end={kpi.value} suffix={kpi.suffix} />
                      )}
                    </p>

                    <p className="text-[13px] font-medium text-gray-400 leading-snug max-w-[15ch] mx-auto mb-1.5">
                      {kpi.label}
                    </p>
                    <p className="text-[10px] text-gray-600 italic">{kpi.source}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <p className="mt-4 text-center text-[11px] text-gray-600 italic max-w-3xl mx-auto">
            {t("kpis.footnote")}
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2b — TROIS DIFFÉRENCIATEURS ÉDITORIAUX — fond #F8FAFC
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-gray-100">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                accent: "#10B981",
                tag: "Sécurité irréprochable",
                title: "Traçabilité end-to-end certifiée",
                body: "Chaque support traité reçoit un certificat NIST 800-88 r2 individuel, horodaté, avec hash SHA-256. Piste d'audit exploitable immédiatement par vos auditeurs ACPR, Big 4 ou DPO.",
              },
              {
                icon: Euro,
                accent: "#0EA5E9",
                tag: "ROI démontrable",
                title: "Valeur récupérée bien au-delà des estimations",
                body: "Notre réseau d'acheteurs qualifiés en secondaire international permet de récupérer en moyenne 3× la valeur estimée en interne. Le ROI de chaque mission est documenté à J+30.",
              },
              {
                icon: Leaf,
                accent: "#F59E0B",
                tag: "Impact mesurable",
                title: "Scope 3 audit-ready, première itération",
                body: "Nos bilans CO₂ suivent la méthodologie Boavizta/ADEME, exportables directement au format GRI/ESRS E5. Validés sans réserve par les cabinets Big 4 dès la première publication CSRD.",
              },
            ].map((d, i) => {
              const DIcon = d.icon;
              return (
                <StaggerItem key={i}>
                  <div className="bg-white rounded-2xl p-7 border border-gray-100 h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: d.accent + "15" }}
                      >
                        <DIcon
                          className="h-5 w-5"
                          style={{ color: d.accent }}
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <span
                          className="inline-block text-[10px] font-bold uppercase tracking-[0.1em] mb-1"
                          style={{ color: d.accent }}
                        >
                          {d.tag}
                        </span>
                        <h3 className="text-base font-bold text-[#0F172A] leading-snug tracking-tight">
                          {d.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{d.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 — INTRODUCTION ÉDITORIALE — fond blanc
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-6">
                {t("cases.eyebrow")}
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-8 tracking-tight leading-[1.1]">
                {t("editorialIntro.headline")}
              </h2>

              <p className="text-lg lg:text-xl text-gray-500 leading-[1.82] mb-10 font-light max-w-2xl mx-auto">
                {t("editorialIntro.text")}
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group transition-colors"
              >
                {t("editorialIntro.cta")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>

          {/* Sector anchor nav — desktop only */}
          <div className="hidden lg:block mt-16 pt-10 border-t border-gray-100">
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase text-center mb-6">
              {t("nav.label")}
            </p>
            <nav
              className="flex flex-wrap justify-center gap-3"
              aria-label="Navigation par cas sectoriel"
            >
              {cases.map((c, i) => {
                const NavIcon = CASE_ICONS[i] ?? Building2;
                return (
                  <a
                    key={c.slug}
                    href={`#cas-${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white hover:border-[#10B981]/50 hover:bg-[#10B981]/4 text-[12px] font-semibold text-gray-600 hover:text-[#0F172A] transition-all duration-200 group"
                  >
                    <NavIcon
                      className="h-3.5 w-3.5 text-gray-400 group-hover:text-[#10B981] transition-colors"
                      aria-hidden="true"
                    />
                    {c.sector}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3b — PARTENAIRES & CERTIFICATIONS — bandeau discret fond blanc
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <p className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase text-center mb-8">
              {t("partners.eyebrow")}
            </p>
          </FadeIn>
          <StaggerContainer className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
            {(t.raw("partners.items") as string[]).map((p, i) => (
              <StaggerItem key={i}>
                <div className="px-5 py-2.5 rounded-lg border border-gray-150 bg-[#F8FAFC] hover:border-[#10B981]/30 transition-colors">
                  <span className="text-[13px] font-semibold text-gray-600">{p}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn>
            <p className="mt-6 text-center text-[11px] text-gray-400 italic max-w-xl mx-auto">
              {t("partners.note")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S4 → S11 — 8 CAS SECTORIELS EN SECTIONS PLEINE LARGEUR ALTERNÉES
         ════════════════════════════════════════════════════════════════ */}
      {cases.map((c, i) => (
        <CaseSection
          key={c.slug}
          c={c}
          index={i}
          editorialBody={editorialBodies[c.slug] ?? c.subtitle}
        />
      ))}

      {/* ════════════════════════════════════════════════════════════════
          S12 — SECTION COMPARATIVE VISUELLE
          Liste éditoriale avec barres de progression — pas de tableau
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white"
        aria-labelledby="comparative-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0EA5E9] uppercase mb-4">
                {t("matrix.eyebrow")}
              </p>
              <h2
                id="comparative-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]"
              >
                {t("matrix.title")}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                {t("matrix.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12">

              {/* Left — Recovery rate bars */}
              <FadeIn direction="right">
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                    <TrendingUp className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.12em]">
                      Taux de récupération actifs
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {comparativeData.map((row, i) => (
                      <ComparativeBar
                        key={i}
                        label={row.label}
                        pct={row.recovery}
                        value={`${row.recovery}%`}
                        accentColor={row.accentColor}
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] text-gray-400 italic">
                    Actifs récupérés (revente + reconditionnement + recyclage) vs total traité
                  </p>
                </div>
              </FadeIn>

              {/* Right — Value + CO2 card list */}
              <FadeIn direction="left">
                <div>
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                    <BarChart3 className="h-4 w-4 text-[#0EA5E9]" aria-hidden="true" />
                    <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.12em]">
                      Valeur récupérée &amp; impact CO₂
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {comparativeData.map((row, i) => (
                      <a
                        key={i}
                        href={`#cas-${cases[i]?.slug ?? ""}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F8FAFC] hover:bg-[#EFF6FF] transition-colors group cursor-pointer"
                      >
                        <span
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-black text-white"
                          style={{ backgroundColor: row.accentColor }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-semibold text-[#0F172A] truncate group-hover:text-[#0EA5E9] transition-colors">
                            {row.label}
                          </p>
                        </div>
                        <div className="flex items-center gap-5 flex-shrink-0">
                          <div className="text-right">
                            <p
                              className="text-[13px] font-black leading-none tabular-nums"
                              style={{ color: row.accentColor }}
                            >
                              {row.value}
                            </p>
                            <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">
                              économies
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-black text-[#10B981] leading-none tabular-nums">
                              {row.co2}
                            </p>
                            <p className="text-[9px] text-gray-400 mt-0.5 uppercase tracking-wider">
                              tCO2e
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Bottom — Compliance matrix */}
            <FadeIn>
              <div className="bg-[#F8FAFC] rounded-2xl p-6 lg:p-8 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                  <h3 className="text-[11px] font-bold text-[#0F172A] uppercase tracking-[0.12em]">
                    Conformités réglementaires atteintes
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {comparativeData.map((row, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl px-4 py-3.5 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <span
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
                          style={{ backgroundColor: row.accentColor }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[11px] font-bold text-[#0F172A] truncate leading-none">
                          {row.label}
                        </p>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed">
                        {row.conformite}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1.5 font-medium">
                        {row.duree}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[10px] text-gray-400 italic text-center leading-relaxed">
                  {t("matrix.footnote")}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S12b — TÉMOIGNAGES 4 PERSONAS — fond sombre #0F172A
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-[#0F172A] relative overflow-hidden"
        aria-labelledby="testimonials-title"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("testimonials.eyebrow")}
              </p>
              <h2
                id="testimonials-title"
                className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.1]"
              >
                {t("testimonials.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(t.raw("testimonials.items") as Array<{
              quote: string;
              name: string;
              role: string;
              sector: string;
            }>).map((item, i) => {
              const TIcon = CASE_ICONS[i] ?? Building2;
              const accentColors = ["#0EA5E9", "#10B981", "#F59E0B", "#0EA5E9"];
              const accent = accentColors[i] ?? "#10B981";
              return (
                <StaggerItem key={i}>
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300">
                    <Quote
                      className="h-7 w-7 mb-4 flex-shrink-0"
                      style={{ color: accent }}
                      aria-hidden="true"
                    />
                    <blockquote className="flex-1 mb-5">
                      <p className="text-[13px] text-gray-300 leading-relaxed italic">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </blockquote>
                    <footer className="flex items-center gap-3 pt-4 border-t border-white/8">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: accent + "20" }}
                      >
                        <TIcon
                          className="h-4 w-4"
                          style={{ color: accent }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[12px] font-bold text-white leading-none truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                          {item.role} · {item.sector}
                        </p>
                      </div>
                    </footer>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn>
            <p className="mt-8 text-center text-[11px] text-gray-600 italic">
              {t("testimonials.consentNote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S12c — FAQ DSI/RSSI — fond blanc
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24 lg:py-32 bg-white"
        aria-labelledby="faq-cas-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("faq.eyebrow")}
              </p>
              <h2
                id="faq-cas-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]"
              >
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {(t.raw("faq.items") as Array<{ q: string; a: string }>).map(
              (item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-7 h-full hover:border-[#10B981]/30 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3 mb-4">
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#10B981] text-sm font-bold"
                        style={{ backgroundColor: "#10B981" + "15" }}
                      >
                        Q{i + 1}
                      </span>
                      <h3 className="font-bold text-[#0F172A] text-[15px] leading-snug tracking-tight">
                        {item.q}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed pl-11">
                      {item.a}
                    </p>
                  </div>
                </StaggerItem>
              )
            )}
          </StaggerContainer>

          <FadeIn>
            <div className="mt-12 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group transition-colors"
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

      {/* ════════════════════════════════════════════════════════════════
          S13 — ENCART CONVERSION — fond #10B981 pleine largeur
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="py-20 lg:py-28 bg-[#10B981] relative overflow-hidden"
        aria-labelledby="conversion-title"
      >
        {/* Ambient */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
          style={{ background: "white" }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(5,150,105,0.5)" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/65 uppercase mb-4">
                  {t("conversion.eyebrow")}
                </p>
                <h2
                  id="conversion-title"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1]"
                >
                  {t("conversion.title")}
                </h2>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                  {t("conversion.subtitle")}
                </p>
              </div>
            </FadeIn>

            {submitted ? (
              <FadeIn>
                <div className="bg-white rounded-2xl p-10 text-center max-w-md mx-auto shadow-2xl">
                  <CheckCircle2
                    className="h-14 w-14 text-[#10B981] mx-auto mb-5"
                    aria-hidden="true"
                  />
                  <h3 className="text-2xl font-bold text-[#0F172A] mb-3">
                    {t("conversion.successTitle")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {t("conversion.successBody")}
                  </p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-6 lg:p-8 shadow-2xl shadow-[#0F172A]/15 max-w-2xl mx-auto"
                  noValidate
                >
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      {
                        id: "conv-company",
                        label: t("conversion.fields.company"),
                        placeholder: "Votre entreprise",
                        key: "company" as const,
                      },
                      {
                        id: "conv-sector",
                        label: t("conversion.fields.sector"),
                        placeholder: "Banque, Santé, Retail…",
                        key: "sector" as const,
                      },
                      {
                        id: "conv-challenge",
                        label: t("conversion.fields.challenge"),
                        placeholder: "CSRD, NIS2, valeur…",
                        key: "challenge" as const,
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-[10px] font-bold text-[#0F172A] mb-2 uppercase tracking-[0.12em]"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type="text"
                          value={formData[field.key]}
                          onChange={(e) =>
                            setFormData((d) => ({
                              ...d,
                              [field.key]: e.target.value,
                            }))
                          }
                          placeholder={field.placeholder}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#F8FAFC] text-[#0F172A] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] transition"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-[10px] text-gray-400 italic leading-snug max-w-[28ch]">
                      {t("conversion.privacy")}
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm whitespace-nowrap flex-shrink-0"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t("conversion.cta")}
                    </button>
                  </div>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S14 — CITATION FINALE LARGE — magazine-style
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-40 bg-white relative overflow-hidden">
        {/* Enormous ghost quote mark background */}
        <div
          className="absolute inset-x-0 top-0 flex justify-center overflow-hidden pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-gray-50 font-black leading-none"
            style={{ fontSize: "clamp(14rem, 38vw, 32rem)" }}
          >
            &ldquo;
          </span>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              {/* Green accent bar */}
              <div
                className="w-10 h-[3px] bg-[#10B981] mx-auto mb-12 rounded-full"
                aria-hidden="true"
              />

              <blockquote>
                <p className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-[#0F172A] leading-[1.38] tracking-tight mb-10">
                  &ldquo;{t("editorialFinalQuote.text")}&rdquo;
                </p>
                <footer className="flex items-center justify-center gap-5">
                  <div className="w-16 h-px bg-gray-200" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-[#0F172A] text-base leading-none">
                      {t("editorialFinalQuote.name")}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      {t("editorialFinalQuote.role")}
                    </p>
                  </div>
                  <div className="w-16 h-px bg-gray-200" aria-hidden="true" />
                </footer>
              </blockquote>

              <p className="mt-8 text-[11px] text-gray-400 italic">
                {t("editorialFinalQuote.consentNote")}
              </p>

              <div className="mt-10">
                <Link
                  href="#cas-banque-cac40"
                  className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group transition-colors"
                >
                  Voir le cas Banque CAC40 complet
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S15 — CTA FINAL DOUBLE + BANDEAU CONFIANCE
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-28 lg:py-32 overflow-hidden bg-[#0F172A]"
        aria-labelledby="final-cta-title"
      >
        {/* Background photo — very subtle */}
        <Image
          src="/photos/hp-atelier-itad.jpg"
          alt="Atelier de reconditionnement GreenTechCycle — chaîne d'effacement certifiée"
          fill
          loading="lazy"
          className="object-cover opacity-15"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/96 via-[#0F172A]/92 to-[#0F172A]/88" />
        {/* Green radial accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 75% 20%, rgba(16,185,129,0.16) 0%, transparent 55%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center text-white">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-5">
                {t("finalCta.eyebrow")}
              </p>

              <h2
                id="final-cta-title"
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.05]"
              >
                {t("finalCta.title")}
              </h2>

              <p className="text-gray-400 text-base lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("finalCta.subtitle")}
              </p>

              {/* Process — 4 quick steps */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { n: "01", l: "Audit flash 72h" },
                  { n: "02", l: "Effacement certifié NIST" },
                  { n: "03", l: "Valorisation marché" },
                  { n: "04", l: "Rapport CSRD prêt" },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/8 border border-white/12"
                  >
                    <span className="text-[11px] font-black text-[#10B981]">{step.n}</span>
                    <span className="text-[12px] font-semibold text-white/80">{step.l}</span>
                    {i < 3 && (
                      <ChevronRight className="h-3 w-3 text-white/25 ml-1" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-white hover:text-[#10B981] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-[#10B981]/25 hover:-translate-y-0.5 text-base"
                >
                  {t("finalCta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white text-white hover:text-[#0F172A] border-2 border-white/25 hover:border-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 text-base"
                >
                  {t("finalCta.cta2")}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 mb-5 font-semibold">
                  Garanties contractuelles
                </p>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/75">
                      <Shield className="h-4 w-4 text-[#10B981] flex-shrink-0" aria-hidden="true" />
                      <span className="font-medium">{badge}</span>
                      {i < trustBadges.length - 1 && (
                        <span
                          className="hidden sm:inline w-px h-4 bg-white/12 ml-3"
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
