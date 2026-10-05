"use client";

import DashboardMock from "@/components/visuals/DashboardMock";
import MediaSlot from "@/components/visuals/MediaSlot";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  ArrowRight,
  ArrowDownRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Database,
  Download,
  Factory,
  FileText,
  Gauge,
  Globe,
  Layers,
  Leaf,
  LineChart,
  Recycle,
  Shield,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { Stat, StatRow } from "@/components/ui/Stat";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaOrg from "@/components/SchemaOrg";
import CarbonCalculator from "@/components/CarbonCalculator";
import { SITE_URL } from "@/lib/site";

// ---------------------------------------------------------------------------
// Type helpers (mirroring messages/*.json structure for the Impact namespace)
// ---------------------------------------------------------------------------

type Kpi = { value: string; label: string; source: string };

type WeightStat = {
  value: string;
  title: string;
  desc: string;
  source: string;
};

type Scope = { code: string; title: string; desc: string };

type Framework = { name: string; desc: string };

type Indicator = { label: string; unit: string; desc: string };

type ComparisonRow = {
  category: string;
  newCo2: string;
  refurbCo2: string;
  savings: string;
  water: string;
  weee: string;
};

type EsrsRow = {
  code: string;
  name: string;
  evidence: string;
  format: string;
  deadline: string;
};

type Method = { name: string; desc: string };

type EcosystemEntry = { name: string; desc: string };

type CaseItem = {
  sector: string;
  scope: string;
  metric: string;
  money: string;
  context: string;
  ctaLabel: string;
  ctaHref: string;
};

type ResourceItem = {
  title: string;
  desc: string;
  label: string;
  href: string;
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ImpactPage() {
  const t = useTranslations("Impact");

  // Hero
  const heroChips = t.raw("hero.chips") as string[];
  const heroKpis = t.raw("hero.kpis") as Kpi[];

  // S2 : Weight
  const weightStats = t.raw("weight.stats") as WeightStat[];

  // S3 : Methodology
  const scopes = t.raw("methodology.scopes") as Scope[];
  const frameworks = t.raw("methodology.frameworks") as Framework[];
  const indicators = t.raw("methodology.indicators") as Indicator[];

  // S5 : Comparison
  const comparisonHeaders = t.raw("comparison.headers") as string[];
  const comparisonRows = t.raw("comparison.rows") as ComparisonRow[];
  const comparisonSources = t.raw("comparison.sources") as string[];

  // S6 : ESRS
  const esrsHeaders = t.raw("esrs.headers") as string[];
  const esrsRows = t.raw("esrs.rows") as EsrsRow[];

  // S7 : Proof
  const methods = t.raw("proof.methods") as Method[];
  const ecosystem = t.raw("proof.ecosystem") as EcosystemEntry[];

  // S8 : Cases
  const caseItems = t.raw("cases.items") as CaseItem[];

  // S9 : Resources
  const resources = t.raw("resources.items") as ResourceItem[];

  // JSON-LD WebPage + Breadcrumb
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("hero.title"),
    description: t("hero.subtitle"),
    url: `${SITE_URL}/impact`,
    inLanguage: "fr-FR",
    about: [
      { "@type": "Thing", name: "Bilan carbone IT" },
      { "@type": "Thing", name: "CSRD ESRS E5" },
      { "@type": "Thing", name: "GHG Protocol Scope 3" },
      { "@type": "Thing", name: "Économie circulaire numérique" },
    ],
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
      url: `${SITE_URL}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.current"),
        item: `${SITE_URL}/impact`,
      },
    ],
  };

  return (
    <div className="bg-bg-card">
      <SchemaOrg data={pageSchema} />
      <SchemaOrg data={breadcrumbSchema} />

      {/* =====================================================================
          SECTION 1 (HERO ÉDITORIAL) split sombre + photo droite
          ===================================================================== */}
      <section className="bg-bg py-12 lg:py-16" aria-labelledby="impact-hero">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.current"), href: "/impact" },
            ]}
          />
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <p className="text-eyebrow uppercase text-fg-muted">{t("hero.eyebrow")}</p>
              <h1 id="impact-hero" className="mt-3 max-w-[20ch] text-display-lg text-fg">{t("hero.title")}</h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <li key={chip}><Tag variant="neutral">{chip}</Tag></li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#calculator" size="lg">{t("hero.ctaPrimary")}</ButtonLink>
                <ButtonLink href="/reserver?offre=methodologie-csrd" variant="secondary" size="lg">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t("hero.ctaSecondary")}
                </ButtonLink>
              </div>
            </div>
            <div className="reveal lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                <MediaSlot fill id="impact-hero" alt="Forêt et infrastructure énergétique, symbole de la décarbonation du numérique d'entreprise" fallback={<DashboardMock state="reporting" />} />
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-track pt-8">
            <StatRow>
              {heroKpis.map((kpi, i) => (
                <Stat key={i} value={kpi.value} label={kpi.label} source={kpi.source} />
              ))}
            </StatRow>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2, WEIGHT OF DIGITAL
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("weight.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("weight.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("weight.lead")}
            </p>
          </div>

          <div className="reveal-stagger mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {weightStats.map((stat, i) => (
              <div key={i} className="reveal">
                <div className="h-full rounded-2xl p-7 border border-track hover:border-track-strong transition-shadow bg-bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl md:text-5xl font-semibold text-emerald leading-none">
                      {stat.value}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-dim flex items-center justify-center text-emerald">
                      {i === 0 && <Factory className="w-5 h-5" />}
                      {i === 1 && <Recycle className="w-5 h-5" />}
                      {i === 2 && <LineChart className="w-5 h-5" />}
                    </div>
                  </div>
                  <h3 className="text-heading-md text-fg mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-fg-strong leading-relaxed mb-4">
                    {stat.desc}
                  </p>
                  <p className="text-caption text-fg-strong italic border-t border-track pt-3">
                    Source : {stat.source}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal">
            <div className="mt-10 bg-bg/5 border-l-4 border-emerald rounded-r-xl p-6 md:p-8">
              <h3 className="text-heading-md text-fg flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald" />
                {t("weight.analogy.title")}
              </h3>
              <p className="text-fg-strong leading-relaxed">
                {t("weight.analogy.desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3, METHODOLOGY
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("methodology.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("methodology.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("methodology.lead")}
            </p>
          </div>

          {/* Scopes */}
          <div className="mt-14">
            <div className="reveal">
              <h3 className="text-heading-lg text-fg flex items-center gap-2 mb-3">
                <Layers className="w-5 h-5 text-emerald" />
                {t("methodology.scopeTitle")}
              </h3>
              <p className="text-fg-strong leading-relaxed max-w-3xl">
                {t("methodology.scopeIntro")}
              </p>
            </div>
            <div className="reveal-stagger mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {scopes.map((scope, i) => (
                <div key={i} className="reveal">
                  <div className="h-full bg-bg-card rounded-2xl p-6 border border-track">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald text-bg text-xs font-semibold mb-4">
                      {scope.code}
                    </div>
                    <h4 className="text-lg font-semibold text-fg mb-2">
                      {scope.title}
                    </h4>
                    <p className="text-sm text-fg-strong leading-relaxed">
                      {scope.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="mt-16">
            <div className="reveal">
              <h3 className="text-heading-lg text-fg flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-emerald" />
                {t("methodology.frameworksTitle")}
              </h3>
            </div>
            <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-4">
              {frameworks.map((fw, i) => (
                <div key={i} className="reveal">
                  <div className="h-full bg-bg-card rounded-xl p-5 border border-track hover:border-emerald/30 transition-colors flex gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-dim flex items-center justify-center text-emerald">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-fg text-sm mb-1">
                        {fw.name}
                      </h4>
                      <p className="text-xs text-fg-strong leading-relaxed">
                        {fw.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Boundary */}
          <div className="reveal">
            <div className="mt-14 bg-bg-card text-fg rounded-2xl p-7 md:p-10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-heading-lg flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-emerald" />
                  {t("methodology.boundaryTitle")}
                </h3>
                <p className="text-fg leading-relaxed max-w-4xl">
                  {t("methodology.boundaryDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="mt-16">
            <div className="reveal">
              <h3 className="text-heading-lg text-fg flex items-center gap-2 mb-6">
                <Gauge className="w-5 h-5 text-emerald" />
                {t("methodology.indicatorsTitle")}
              </h3>
            </div>
            <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {indicators.map((ind, i) => (
                <div key={i} className="reveal">
                  <div className="h-full bg-bg-card rounded-xl p-5 border border-track text-center">
                    <div className="text-fg-muted uppercase mb-1 text-eyebrow">
                      {ind.unit}
                    </div>
                    <h4 className="text-sm font-semibold text-fg mb-2">
                      {ind.label}
                    </h4>
                    <p className="text-xs text-fg-strong leading-snug">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4, CALCULATOR
          ===================================================================== */}
      <section
        id="calculator"
        className="px-6 bg-bg-card scroll-mt-24 py-12 lg:py-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("calculator.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("calculator.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("calculator.subtitle")}
            </p>
          </div>

          <div className="reveal-scale">
            <div className="mt-10">
              <CarbonCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MID-PAGE CTA (after calculator)
          ===================================================================== */}
      <section className="border-y border-track bg-bg py-12 lg:py-16" aria-label={t("midCta.title")}>
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-heading-lg text-fg">{t("midCta.title")}</h3>
              <p className="mt-2 max-w-[65ch] text-body text-fg-strong">{t("midCta.subtitle")}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/demo" variant="secondary">{t("midCta.primary")}</ButtonLink>
              <ButtonLink href="/reserver?offre=esrs-pack" variant="ghost">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("midCta.secondary")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5, COMPARISON NEW vs REFURBISHED
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-amber">
              {t("comparison.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("comparison.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("comparison.lead")}
            </p>
          </div>

          <div className="reveal">
            <div className="mt-10 overflow-x-auto bg-bg-card rounded-2xl border border-track" tabIndex={0} role="region" aria-label={`${t("comparison.title")} (tableau)`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-card text-fg">
                    {comparisonHeaders.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 md:px-6 py-4 text-left font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={i}
                      className={`${ i % 2 === 0 ? "bg-bg-card" : "bg-bg-card" } border-b border-track last:border-0`}
                    >
                      <td className="px-4 md:px-6 py-4 font-semibold text-fg whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-fg-strong tabular-nums">
                        {row.newCo2}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-emerald font-semibold tabular-nums">
                        {row.refurbCo2}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-dim text-emerald text-xs font-semibold">
                          <ArrowDownRight className="w-3 h-3" />
                          {row.savings}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-fg-strong tabular-nums">
                        {row.water}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-fg-strong tabular-nums">
                        {row.weee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="reveal">
              <div className="h-full bg-bg-card rounded-2xl p-6 border border-track">
                <h3 className="text-heading-md text-fg flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-emerald" />
                  {t("comparison.footnoteTitle")}
                </h3>
                <p className="text-sm text-fg-strong leading-relaxed">
                  {t("comparison.footnoteBody")}
                </p>
              </div>
            </div>
            <div className="reveal">
              <div className="h-full bg-bg-card rounded-2xl p-6 border border-track">
                <h3 className="text-heading-md text-fg flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-emerald" />
                  {t("comparison.sourcesTitle")}
                </h3>
                <ul className="space-y-2">
                  {comparisonSources.map((src, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-fg-strong leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{src}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6, ESRS E5 MAPPING
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("esrs.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("esrs.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("esrs.lead")}
            </p>
          </div>

          <div className="reveal">
            <div className="mt-10 overflow-x-auto bg-bg-card rounded-2xl border border-track" tabIndex={0} role="region" aria-label={`${t("esrs.title")} (tableau)`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-bg-card text-fg">
                    {esrsHeaders.map((h, i) => (
                      <th
                        key={i}
                        className="px-4 md:px-5 py-4 text-left font-semibold whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {esrsRows.map((row, i) => (
                    <tr
                      key={i}
                      className="bg-bg-card border-b border-track last:border-0 hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="px-4 md:px-5 py-4 align-top">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-bg-card text-fg text-xs font-semibold">
                          {row.code}
                        </span>
                      </td>
                      <td className="px-4 md:px-5 py-4 align-top font-semibold text-fg">
                        {row.name}
                      </td>
                      <td className="px-4 md:px-5 py-4 align-top text-fg-strong leading-snug">
                        {row.evidence}
                      </td>
                      <td className="px-4 md:px-5 py-4 align-top text-fg-strong whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs font-mono bg-bg-card px-2 py-1 rounded">
                          {row.format}
                        </span>
                      </td>
                      <td className="px-4 md:px-5 py-4 align-top whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-amber/10 text-amber text-xs font-semibold">
                          {row.deadline}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="reveal">
            <div className="mt-8 rounded-2xl p-6 md:p-8 border border-track grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center bg-bg/5">
              <div>
                <h3 className="text-heading-md text-fg flex items-center gap-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-emerald" />
                  {t("esrs.exportTitle")}
                </h3>
                <p className="text-sm text-fg-strong leading-relaxed">
                  {t("esrs.exportDesc")}
                </p>
              </div>
              <Link
                href="/reserver?offre=esrs-pack"
                className="inline-flex items-center justify-center gap-2 bg-bg-card hover:bg-bg/90 text-fg font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                {t("esrs.exportLink")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7, PROOF & CERTIFICATIONS
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("proof.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("proof.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("proof.lead")}
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <div className="reveal">
                <h3 className="text-heading-lg text-fg flex items-center gap-2 mb-6">
                  <Shield className="w-5 h-5 text-emerald" />
                  {t("proof.methodsTitle")}
                </h3>
              </div>
              <div className="reveal-stagger space-y-3">
                {methods.map((m, i) => (
                  <div key={i} className="reveal">
                    <div className="bg-bg-card rounded-xl p-5 border border-track flex gap-4 hover:border-emerald/30 transition-colors">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-emerald-dim flex items-center justify-center text-emerald">
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-fg text-sm mb-1">
                          {m.name}
                        </h4>
                        <p className="text-xs text-fg-strong leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="reveal">
                <h3 className="text-heading-lg text-fg flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-emerald" />
                  {t("proof.ecosystemTitle")}
                </h3>
              </div>
              <div className="reveal-stagger space-y-3">
                {ecosystem.map((e, i) => (
                  <div key={i} className="reveal">
                    <div className="bg-bg-card rounded-xl p-5 border border-track flex gap-4 hover:border-track-strong transition-colors">
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-bg/10 flex items-center justify-center text-emerald">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-fg text-sm mb-1">
                          {e.name}
                        </h4>
                        <p className="text-xs text-fg-strong leading-relaxed">
                          {e.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8, CASES
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-amber">
              {t("cases.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("cases.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("cases.lead")}
            </p>
          </div>

          <div className="reveal-stagger mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {caseItems.map((c, i) => (
              <div key={i} className="reveal">
                <div className="h-full rounded-2xl p-7 border border-track hover:border-track-strong transition-colors flex flex-col bg-bg-card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald text-bg flex items-center justify-center">
                      {i === 0 && <Target className="w-4 h-4" />}
                      {i === 1 && <Leaf className="w-4 h-4" />}
                      {i === 2 && <ClipboardCheck className="w-4 h-4" />}
                    </div>
                    <span className="uppercase text-fg-muted text-eyebrow">
                      {c.sector}
                    </span>
                  </div>
                  <p className="text-xs text-fg-strong mb-3">{c.scope}</p>
                  <p className="text-2xl md:text-3xl font-semibold text-fg leading-tight">
                    {c.metric}
                  </p>
                  {c.money ? <p className="text-sm font-semibold text-emerald mt-1 mb-4">{c.money}</p> : <div className="mb-4" />}
                  <p className="text-sm text-fg-strong leading-relaxed flex-1">
                    {c.context}
                  </p>
                  <Link
                    href={c.ctaHref}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-hover transition-colors"
                  >
                    {c.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9, RESOURCES
          ===================================================================== */}
      <section className="px-6 bg-bg-card py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <span className="block text-eyebrow uppercase text-fg-muted">
              {t("resources.eyebrow")}
            </span>
            <h2 className="text-display-md mt-4 text-fg max-w-4xl">
              {t("resources.title")}
            </h2>
            <p className="mt-5 text-lg text-fg-strong max-w-3xl leading-relaxed">
              {t("resources.lead")}
            </p>
          </div>

          <div className="reveal-stagger mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r, i) => (
              <div key={i} className="reveal">
                <div className="h-full bg-bg-card rounded-2xl p-6 border border-track hover:border-emerald/30 hover:border-track-strong transition-colors flex flex-col">
                  <div className="w-10 h-10 rounded-lg bg-emerald-dim text-emerald flex items-center justify-center mb-4">
                    {i === 0 && <FileText className="w-5 h-5" />}
                    {i === 1 && <Database className="w-5 h-5" />}
                    {i === 2 && <BookOpen className="w-5 h-5" />}
                    {i === 3 && <BarChart3 className="w-5 h-5" />}
                    {i === 4 && <Sparkles className="w-5 h-5" />}
                  </div>
                  <h3 className="text-heading-md text-fg mb-2">
                    {r.title}
                  </h3>
                  <p className="text-sm text-fg-strong leading-relaxed flex-1">
                    {r.desc}
                  </p>
                  <Link
                    href={r.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-hover transition-colors"
                  >
                    {r.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related blog articles (existing component, reused) */}
      <RelatedArticles
        keywords={["CSRD", "économie circulaire", "DEEE", "carbone", "ESG"]}
        title={t("relatedTitle")}
        subtitle={t("relatedSubtitle")}
        limit={3}
        tone="light"
      />

      {/* =====================================================================
          SECTION 10, FINAL CTA
          ===================================================================== */}
      <CtaSection
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        primaryLabel={t("finalCta.primary")}
        primaryHref="/reserver?offre=audit-decommissionnement"
        secondaryLabel={t("finalCta.secondary")}
        secondaryHref="/reserver?offre=csrd-pack"
        variant="audit"
        tone="gradient"
      />
    </div>
  );
}
