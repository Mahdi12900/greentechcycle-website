"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ShieldCheck,
  Quote,
  Leaf,
  FileCheck,
  BatteryCharging,
  Cpu,
  Boxes,
  Users,
  BarChart3,
  CheckCircle2,
  XCircle,
  Sparkles,
  HeartHandshake,
  Star,
  Plus,
  Inbox,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type KPIItem = { value: number; suffix: string; label: string; source: string };
type PromiseItem = { label: string; title: string; body: string };
type PlanItem = {
  slug: string;
  name: string;
  audience: string;
  price: string;
  setupValue: string;
  engagementValue: string;
  tagline: string;
  features: string[];
};
type AddonItem = { slug: string; name: string; why: string; price: string };
type FaqItem = { q: string; a: string };

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function WakiBoxPage() {
  const t = useTranslations("wakiBox");

  const kpiItems = t.raw("kpis.items") as KPIItem[];
  const promiseItems = t.raw("promise.items") as PromiseItem[];
  const planItems = t.raw("plans.items") as PlanItem[];
  const pilotBullets = t.raw("pilot.bullets") as string[];
  const addonItems = t.raw("addons.items") as AddonItem[];
  const acceptedFlows = t.raw("flows.accepted") as string[];
  const excludedFlows = t.raw("flows.excluded") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const trustBadges = t.raw("finalCta.trustBadges") as string[];

  const planAccents = ["#0B3B2E", "#047857", "#B45309"];
  const promiseIcons = [FileCheck, ShieldCheck, BarChart3, Users, Leaf];
  const promiseAccents = ["#047857", "#0B3B2E", "#B45309", "#047857", "#0B3B2E"];
  const kpiIcons = [Boxes, FileCheck, BarChart3, Cpu];
  const kpiAccents = ["#047857", "#0B3B2E", "#B45309", "#047857"];

  return (
    <main className="overflow-hidden bg-white">
      {/* Urgency band */}
      <div className="bg-forest-900 text-white py-3 px-4 border-b border-ondark-line">
        <div className="mx-auto max-w-site flex items-center justify-center gap-3 text-sm font-medium text-center">
          <Sparkles className="h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
          <p className="text-xs leading-snug text-ondark-muted">{t("urgency")}</p>
          <Link
            href="/reserver?offre=waki-box-pilote"
            className="hidden sm:inline-flex items-center gap-1 text-leaf hover:text-leaf-300 font-semibold text-xs transition-colors"
          >
            {t("urgencyCta")}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          S1, HERO ÉDITORIAL · split dark
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-forest-900"
        aria-labelledby="waki-hero-title"
      >

        {/* Left content */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-muted uppercase text-eyebrow">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-leaf"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("hero.eyebrow")}
              </span>
            </div>

            <h1
              id="waki-hero-title"
              className="text-display-lg text-white mb-8"
            >
              {t("hero.headline")}
            </h1>

            <p className="text-ondark-muted text-base lg:text-body-lg max-w-xl mb-6">
              {t("hero.subtitle")}
            </p>
            <p className="text-muted text-base lg:text-body-lg max-w-xl mb-10">
              {t("hero.subtitleSecond")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-7 py-4 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-sm"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reserver?offre=waki-box-pilote"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-colors duration-150 text-sm"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <a
              href="#waki-plans"
              className="inline-flex items-center gap-2 text-ink-700 hover:text-ondark-muted uppercase transition-colors group text-eyebrow"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform"
                aria-hidden="true"
              />
              {t("hero.scrollCta")}
            </a>
          </FadeIn>
        </div>

        {/* Right photo */}
        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/ewaste-recycling.jpg"
            alt={t("hero.photoAlt")}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-ink/55" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S2, BANDEAU CHIFFRES XXL
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="bg-forest-900 relative overflow-hidden border-t border-ondark-line"
        aria-label="Chiffres clés Waki Box"
      >

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-ondark-line">
            {kpiItems.map((kpi, i) => {
              const KIcon = kpiIcons[i] ?? Boxes;
              const accent = kpiAccents[i] ?? "#047857";
              return (
                <StaggerItem key={i}>
                  <div className="px-5 lg:px-10 py-8 lg:py-10 text-center flex flex-col items-center">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-5"
                      style={{ backgroundColor: accent + "18" }}
                    >
                      <KIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                    </div>
                    <p
                      className="font-semibold leading-none mb-3 tabular-nums"
                      style={{
                        fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                        color: accent,
                      }}
                    >
                      <CountUp end={kpi.value} suffix={kpi.suffix} />
                    </p>
                    <p className="text-body-sm font-medium text-muted leading-snug max-w-[18ch] mx-auto mb-1.5">
                      {kpi.label}
                    </p>
                    <p className="text-caption text-ink-700 italic max-w-[20ch] mx-auto">
                      {kpi.source}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <p className="mt-4 text-center text-caption text-ink-700 italic max-w-3xl mx-auto">
            {t("kpis.footnote")}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S3, PROBLÈME ÉDITORIAL · prose
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-forest uppercase mb-6 text-center text-eyebrow">
                {t("problem.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink mb-10 text-center">
                {t("problem.title")}
              </h2>
              <p className="text-lg text-ink-700 mb-7">
                {t("problem.body")}
              </p>
              <p className="text-lg text-ink-700">
                {t("problem.bodySecond")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S4, PROMESSE 5 EN 1 · split clair avec photo
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-cream border-y border-line">
        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          {/* Photo left */}
          <div className="relative w-full lg:w-[40%] min-h-[52vw] lg:min-h-0 overflow-hidden flex-shrink-0">
            <Image
              src="/photos/impact-dashboard.jpg"
              alt={t("promise.photoAlt")}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-cream/40" />
          </div>

          {/* Content right */}
          <div className="relative w-full lg:flex-1 px-6 sm:px-10 lg:px-14 xl:px-18 py-16 lg:py-24">
            <FadeIn>
              <p className="text-muted uppercase mb-5 text-eyebrow">
                {t("promise.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink mb-5">
                {t("promise.title")}
              </h2>
              <p className="text-base text-ink-700 leading-relaxed mb-10 max-w-2xl">
                {t("promise.subtitle")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-5 max-w-3xl">
              {promiseItems.map((p, i) => {
                const PIcon = promiseIcons[i] ?? Leaf;
                const accent = promiseAccents[i] ?? "#047857";
                return (
                  <StaggerItem key={i}>
                    <div className="bg-white rounded-2xl p-6 border border-line h-full hover:shadow-card hover:border-line transition-colors duration-150">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: accent + "15" }}
                      >
                        <PIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                      </div>
                      <span
                        className="block uppercase mb-1.5 text-eyebrow"
                        style={{ color: accent }}
                      >
                        {p.label}
                      </span>
                      <h3 className="text-heading-md text-ink mb-2.5">
                        {p.title}
                      </h3>
                      <p className="text-body-sm text-ink-700 leading-relaxed">{p.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S5, LES 3 PLANS · composition verticale éditoriale
         ═══════════════════════════════════════════════════════════════ */}
      <section
        id="waki-plans"
        className="bg-white relative py-16 lg:py-24"
        aria-labelledby="plans-title"
      >
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-muted uppercase mb-4 text-eyebrow">
                {t("plans.eyebrow")}
              </p>
              <h2
                id="plans-title"
                className="text-display-md text-ink mb-5"
              >
                {t("plans.title")}
              </h2>
              <p className="text-ink-700 text-base lg:text-lg leading-relaxed">
                {t("plans.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
            {planItems.map((plan, i) => {
              const accent = planAccents[i] ?? "#047857";
              const isPopular = plan.slug === "waki-box-confort";
              const planNumber = String(i + 1).padStart(2, "0");
              return (
                <FadeIn key={plan.slug}>
                  <article
                    className={`relative rounded-2xl border overflow-hidden transition-colors duration-150 ${ isPopular ? "border-leaf/35" : "border-line hover:border-line hover:shadow-card" }`}
                    style={isPopular ? { backgroundColor: "#F1F8F4" } : { backgroundColor: "white" }}
                  >
                    {isPopular && (
                      <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-leaf text-white uppercase text-eyebrow">
                        <Star className="h-3 w-3" aria-hidden="true" />
                        {t("plans.popular")}
                      </div>
                    )}

                    <div className="grid lg:grid-cols-12 gap-0">
                      {/* Left rail · plan number + name */}
                      <div className="lg:col-span-4 p-8 lg:p-10 lg:border-r border-line flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                          <span
                            className="text-5xl font-semibold leading-none tabular-nums"
                            style={{ color: accent }}
                          >
                            {planNumber}
                          </span>
                          <span
                            className="flex-1 h-[1px] opacity-25"
                            style={{ backgroundColor: accent }}
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-heading-lg text-ink mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-body-sm text-muted mb-5 leading-snug">
                          {plan.audience}
                        </p>
                        <p className="text-sm text-ink-700 leading-relaxed font-medium">
                          {plan.tagline}
                        </p>

                        {/* Price block */}
                        <div className="mt-7 pt-6 border-t border-line">
                          <div className="flex items-baseline gap-1.5 mb-1">
                            <span
                              className="text-4xl lg:text-5xl font-semibold tabular-nums leading-none"
                              style={{ color: accent }}
                            >
                              {plan.price}
                            </span>
                            <span className="text-body-sm font-semibold text-muted">
                              {t("plans.monthly")}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 mt-3 text-caption text-muted">
                            <p>
                              <span className="font-semibold text-ink-700">{t("plans.setup")} :</span>{" "}
                              {plan.setupValue}
                            </p>
                            <p>
                              <span className="font-semibold text-ink-700">
                                {t("plans.engagement")} :
                              </span>{" "}
                              {plan.engagementValue}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right rail · features list + CTA */}
                      <div className="lg:col-span-8 p-8 lg:p-10 flex flex-col">
                        <ul className="space-y-3 mb-8 flex-1">
                          {plan.features.map((f, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle2
                                className="h-4.5 w-4.5 flex-shrink-0 mt-0.5"
                                style={{ color: accent, width: "18px", height: "18px" }}
                                aria-hidden="true"
                              />
                              <span className="text-body-sm text-ink-700 leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/reserver?offre=${plan.slug}`}
                          className={`inline-flex items-center justify-center gap-2 self-start font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 text-sm ${ isPopular ? "bg-leaf hover:bg-leaf-700 text-white" : "text-white hover:opacity-90" }`}
                          style={
                            isPopular
                              ? {}
                              : {
                                  backgroundColor: accent,
                                  boxShadow: `0 4px 16px ${accent}30`,
                                }
                          }
                        >
                          {t("plans.ctaReserve")}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

      {/* ═══════════════════════════════════════════════════════════════
          S6, PROGRAMME PILOTE · #047857 plein
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-leaf overflow-hidden py-16 lg:py-24">

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <p className="text-ondark-muted uppercase mb-4 text-center text-eyebrow">
                {t("pilot.eyebrow")}
              </p>
              <h2 className="text-display-md text-white mb-7 text-center">
                {t("pilot.title")}
              </h2>
              <p className="text-ondark text-base lg:text-lg mb-10 max-w-3xl mx-auto text-center">
                {t("pilot.body")}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
                {pilotBullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/12 border border-white/15 rounded-xl px-5 py-3.5"
                  >
                    <HeartHandshake
                      className="h-4 w-4 text-white flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-body-sm font-medium text-white leading-snug">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Link
                  href="/reserver?offre=waki-box-pilote"
                  className="inline-flex items-center gap-2 bg-white hover:bg-cream text-leaf font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:shadow-card text-base"
                >
                  {t("pilot.cta")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-7 text-center text-caption text-ondark-muted italic">
                {t("pilot.footnote")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S7, OPTIONS & ADD-ONS · tableau éditorial sobre
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-ochre uppercase mb-4 text-eyebrow">
                {t("addons.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink mb-5">
                {t("addons.title")}
              </h2>
              <p className="text-ink-700 text-base lg:text-lg leading-relaxed">
                {t("addons.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-line overflow-hidden">
            {/* Header row · desktop only */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-cream border-b border-line uppercase text-muted text-eyebrow">
              <div className="md:col-span-5">{t("addons.headerOption")}</div>
              <div className="md:col-span-4">{t("addons.headerWhy")}</div>
              <div className="md:col-span-2 text-right">{t("addons.headerPrice")}</div>
              <div className="md:col-span-1" />
            </div>

            <StaggerContainer>
              {addonItems.map((a, i) => (
                <StaggerItem key={a.slug}>
                  <div
                    className={`grid md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-cream transition-colors ${ i < addonItems.length - 1 ? "border-b border-line" : "" }`}
                  >
                    <div className="md:col-span-5 flex items-start gap-3">
                      <span
                        className="hidden sm:flex w-8 h-8 rounded-lg bg-ochre/12 items-center justify-center flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 text-ochre" aria-hidden="true" />
                      </span>
                      <p className="text-body-sm font-semibold text-ink leading-snug">
                        {a.name}
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-caption text-muted leading-relaxed">{a.why}</p>
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <p className="text-body-sm font-semibold text-ink tabular-nums">{a.price}</p>
                    </div>
                    <div className="md:col-span-1 md:text-right">
                      <Link
                        href={`/reserver?offre=${a.slug}`}
                        className="inline-flex items-center gap-1 text-leaf hover:text-leaf-700 text-caption font-semibold transition-colors group"
                      >
                        {t("addons.ctaReserve")}
                        <ArrowRight
                          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <FadeIn>
            <p className="mt-6 text-center text-caption text-muted italic max-w-2xl mx-auto">
              {t("addons.footnote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S8, FLUX ACCEPTÉS / EXCLUS · prose
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-forest uppercase mb-4 text-eyebrow">
                {t("flows.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink mb-7">
                {t("flows.title")}
              </h2>
              <p className="text-ink-700 text-base lg:text-lg">
                {t("flows.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <FadeIn direction="right">
              <div className="bg-leaf-50 border border-leaf/20 rounded-2xl p-7 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl bg-leaf-100 flex items-center justify-center flex-shrink-0">
                    <Inbox className="h-4 w-4 text-leaf" aria-hidden="true" />
                  </span>
                  <h3 className="text-heading-md text-ink">
                    {t("flows.acceptedTitle")}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {acceptedFlows.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="h-4 w-4 text-leaf flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-ink-700 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-ochre-100 border border-ochre/20 rounded-2xl p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl bg-ochre/15 flex items-center justify-center flex-shrink-0">
                    <BatteryCharging className="h-4 w-4 text-ochre" aria-hidden="true" />
                  </span>
                  <h3 className="text-heading-md text-ink">
                    {t("flows.excludedTitle")}
                  </h3>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {excludedFlows.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle
                        className="h-4 w-4 text-ochre flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-ink-700 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={t("flows.linkHref")}
                  className="inline-flex items-center gap-2 text-ink hover:text-forest font-semibold text-sm group transition-colors self-start"
                >
                  {t("flows.linkLabel")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S9, FAQ ÉDITORIALE
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-cream border-y border-line py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-muted uppercase mb-4 text-eyebrow">
                {t("faq.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink">
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {faqItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-line rounded-2xl p-7 h-full hover:border-leaf/30 hover:shadow-card transition-colors duration-150">
                  <div className="flex items-start gap-3 mb-4">
                    <span
                      className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg text-leaf text-sm font-semibold"
                      style={{ backgroundColor: "#047857" + "15" }}
                    >
                      Q{i + 1}
                    </span>
                    <h3 className="text-heading-md text-ink">
                      {item.q}
                    </h3>
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed pl-11">{item.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S10, CITATION MAGAZINE + CTA DOUBLE FINAL
         ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden py-16 lg:py-24">

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-muted uppercase mb-6 text-eyebrow">
                {t("finalQuote.eyebrow")}
              </p>

              <div
                className="w-10 h-[3px] bg-leaf mx-auto mb-12 rounded-full"
                aria-hidden="true"
              />

              <blockquote>
                <Quote className="h-8 w-8 text-leaf mx-auto mb-6" aria-hidden="true" />
                <p className="text-2xl md:text-3xl lg:text-[2.2rem] font-semibold text-ink tracking-tight mb-10">
                  &ldquo;{t("finalQuote.text")}&rdquo;
                </p>
                <footer className="flex items-center justify-center gap-5">
                  <div className="w-16 h-px bg-line" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-ink text-base leading-none">
                      {t("finalQuote.name")}
                    </p>
                    <p className="text-muted text-sm mt-1">{t("finalQuote.role")}</p>
                  </div>
                  <div className="w-16 h-px bg-line" aria-hidden="true" />
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final dual CTA · dark band */}
      <section
        className="relative overflow-hidden bg-forest-900 py-16 lg:py-24"
        aria-labelledby="waki-final-cta"
      >
        <Image
          src="/photos/hp-atelier-itad.jpg"
          alt="Atelier de tri et de valorisation GreenTechCycle"
          fill
          loading="lazy"
          className="object-cover opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-ink/96" />

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center text-white">
              <p className="text-muted uppercase mb-5 text-eyebrow">
                {t("finalCta.eyebrow")}
              </p>
              <h2
                id="waki-final-cta"
                className="text-display-md mb-6"
              >
                {t("finalCta.title")}
              </h2>
              <p className="text-muted text-base lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("finalCta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-white hover:text-leaf text-white font-semibold px-10 py-5 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("finalCta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=waki-box-pilote"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white text-white hover:text-ink border-2 border-white/25 hover:border-white font-semibold px-10 py-5 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("finalCta.cta2")}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <div className="pt-8 border-t border-ondark-line">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-ondark-muted">
                      <ShieldCheck
                        className="h-4 w-4 text-leaf flex-shrink-0"
                        aria-hidden="true"
                      />
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
