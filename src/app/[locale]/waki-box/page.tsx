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

  const planAccents = ["#0EA5E9", "#10B981", "#F59E0B"];
  const promiseIcons = [FileCheck, ShieldCheck, BarChart3, Users, Leaf];
  const promiseAccents = ["#10B981", "#0EA5E9", "#F59E0B", "#10B981", "#0EA5E9"];
  const kpiIcons = [Boxes, FileCheck, BarChart3, Cpu];
  const kpiAccents = ["#10B981", "#0EA5E9", "#F59E0B", "#10B981"];

  return (
    <main className="overflow-hidden bg-white">
      {/* Urgency band */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium text-center">
          <Sparkles className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="text-xs leading-snug text-gray-300">{t("urgency")}</p>
          <Link
            href="/reserver?offre=waki-box-pilote"
            className="hidden sm:inline-flex items-center gap-1 text-[#10B981] hover:text-[#34D399] font-semibold text-xs transition-colors"
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
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="waki-hero-title"
      >
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

        {/* Left content */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("hero.eyebrow")}
              </span>
            </div>

            <h1
              id="waki-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {t("hero.headline")}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.1rem] leading-[1.72] max-w-xl mb-6">
              {t("hero.subtitle")}
            </p>
            <p className="text-gray-400 text-base lg:text-[1.05rem] leading-[1.72] max-w-xl mb-10">
              {t("hero.subtitleSecond")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/reserver?offre=waki-box-pilote"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <a
              href="#waki-plans"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S2, BANDEAU CHIFFRES XXL
         ═══════════════════════════════════════════════════════════════ */}
      <section
        className="bg-[#0F172A] relative overflow-hidden border-t border-white/5"
        aria-label="Chiffres clés Waki Box"
      >
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
              const KIcon = kpiIcons[i] ?? Boxes;
              const accent = kpiAccents[i] ?? "#10B981";
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
                      className="font-black tracking-tighter leading-none mb-3 tabular-nums"
                      style={{
                        fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                        color: accent,
                      }}
                    >
                      <CountUp end={kpi.value} suffix={kpi.suffix} />
                    </p>
                    <p className="text-[13px] font-medium text-gray-400 leading-snug max-w-[18ch] mx-auto mb-1.5">
                      {kpi.label}
                    </p>
                    <p className="text-[10px] text-gray-600 italic max-w-[20ch] mx-auto">
                      {kpi.source}
                    </p>
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

      {/* ═══════════════════════════════════════════════════════════════
          S3, PROBLÈME ÉDITORIAL · prose
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0EA5E9] uppercase mb-6 text-center">
                {t("problem.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-10 tracking-tight leading-[1.1] text-center">
                {t("problem.title")}
              </h2>
              <p className="text-lg text-gray-600 leading-[1.85] mb-7">
                {t("problem.body")}
              </p>
              <p className="text-lg text-gray-600 leading-[1.85]">
                {t("problem.bodySecond")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S4, PROMESSE 5 EN 1 · split clair avec photo
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#F8FAFC] border-y border-gray-100">
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
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F8FAFC]/40" />
          </div>

          {/* Content right */}
          <div className="relative w-full lg:flex-1 px-6 sm:px-10 lg:px-14 xl:px-18 py-16 lg:py-24">
            <FadeIn>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-5">
                {t("promise.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("promise.title")}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-10 max-w-2xl">
                {t("promise.subtitle")}
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-5 max-w-3xl">
              {promiseItems.map((p, i) => {
                const PIcon = promiseIcons[i] ?? Leaf;
                const accent = promiseAccents[i] ?? "#10B981";
                return (
                  <StaggerItem key={i}>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 h-full hover:shadow-md hover:border-gray-200 transition-all duration-300">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: accent + "15" }}
                      >
                        <PIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                      </div>
                      <span
                        className="block text-[10px] font-bold uppercase tracking-[0.1em] mb-1.5"
                        style={{ color: accent }}
                      >
                        {p.label}
                      </span>
                      <h3 className="text-base font-bold text-[#0F172A] leading-snug tracking-tight mb-2.5">
                        {p.title}
                      </h3>
                      <p className="text-[13px] text-gray-600 leading-relaxed">{p.body}</p>
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
        className="py-24 lg:py-32 bg-white relative"
        aria-labelledby="plans-title"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("plans.eyebrow")}
              </p>
              <h2
                id="plans-title"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]"
              >
                {t("plans.title")}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                {t("plans.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
            {planItems.map((plan, i) => {
              const accent = planAccents[i] ?? "#10B981";
              const isPopular = plan.slug === "waki-box-confort";
              const planNumber = String(i + 1).padStart(2, "0");
              return (
                <FadeIn key={plan.slug}>
                  <article
                    className={`relative rounded-3xl border overflow-hidden transition-all duration-300 ${
                      isPopular
                        ? "border-[#10B981]/35 shadow-2xl shadow-[#10B981]/10"
                        : "border-gray-150 hover:border-gray-200 hover:shadow-lg"
                    }`}
                    style={isPopular ? { backgroundColor: "#F0FDF9" } : { backgroundColor: "white" }}
                  >
                    {isPopular && (
                      <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold tracking-[0.1em] uppercase shadow-lg shadow-[#10B981]/30">
                        <Star className="h-3 w-3" aria-hidden="true" />
                        {t("plans.popular")}
                      </div>
                    )}

                    <div className="grid lg:grid-cols-12 gap-0">
                      {/* Left rail · plan number + name */}
                      <div className="lg:col-span-4 p-8 lg:p-10 lg:border-r border-gray-100 flex flex-col">
                        <div className="flex items-center gap-3 mb-5">
                          <span
                            className="text-5xl font-black leading-none tracking-tighter tabular-nums"
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
                        <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-[13px] text-gray-500 mb-5 leading-snug">
                          {plan.audience}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                          {plan.tagline}
                        </p>

                        {/* Price block */}
                        <div className="mt-7 pt-6 border-t border-gray-100">
                          <div className="flex items-baseline gap-1.5 mb-1">
                            <span
                              className="text-4xl lg:text-5xl font-black tracking-tighter tabular-nums leading-none"
                              style={{ color: accent }}
                            >
                              {plan.price}
                            </span>
                            <span className="text-[13px] font-semibold text-gray-500">
                              {t("plans.monthly")}
                            </span>
                          </div>
                          <div className="flex flex-col gap-1 mt-3 text-[11px] text-gray-500">
                            <p>
                              <span className="font-semibold text-gray-700">{t("plans.setup")} :</span>{" "}
                              {plan.setupValue}
                            </p>
                            <p>
                              <span className="font-semibold text-gray-700">
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
                              <span className="text-[14px] text-gray-700 leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={`/reserver?offre=${plan.slug}`}
                          className={`inline-flex items-center justify-center gap-2 self-start font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm ${
                            isPopular
                              ? "bg-[#10B981] hover:bg-[#0E9F6E] text-white shadow-lg shadow-[#10B981]/25"
                              : "text-white hover:opacity-90"
                          }`}
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
          S6, PROGRAMME PILOTE · #10B981 plein
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 bg-[#10B981] overflow-hidden">
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
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/65 uppercase mb-4 text-center">
                {t("pilot.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-7 tracking-tight leading-[1.1] text-center">
                {t("pilot.title")}
              </h2>
              <p className="text-white/85 text-base lg:text-lg leading-[1.78] mb-10 max-w-3xl mx-auto text-center">
                {t("pilot.body")}
              </p>

              <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
                {pilotBullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-white/12 backdrop-blur-sm border border-white/15 rounded-xl px-5 py-3.5"
                  >
                    <HeartHandshake
                      className="h-4 w-4 text-white flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-[13px] font-medium text-white leading-snug">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Link
                  href="/reserver?offre=waki-box-pilote"
                  className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#10B981] font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 text-base"
                >
                  {t("pilot.cta")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <p className="mt-7 text-center text-[11px] text-white/65 italic">
                {t("pilot.footnote")}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S7, OPTIONS & ADD-ONS · tableau éditorial sobre
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F59E0B] uppercase mb-4">
                {t("addons.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("addons.title")}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                {t("addons.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            {/* Header row · desktop only */}
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-[#F8FAFC] border-b border-gray-100 text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500">
              <div className="md:col-span-5">{t("addons.headerOption")}</div>
              <div className="md:col-span-4">{t("addons.headerWhy")}</div>
              <div className="md:col-span-2 text-right">{t("addons.headerPrice")}</div>
              <div className="md:col-span-1" />
            </div>

            <StaggerContainer>
              {addonItems.map((a, i) => (
                <StaggerItem key={a.slug}>
                  <div
                    className={`grid md:grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-[#F8FAFC] transition-colors ${
                      i < addonItems.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="md:col-span-5 flex items-start gap-3">
                      <span
                        className="hidden sm:flex w-8 h-8 rounded-lg bg-[#F59E0B]/12 items-center justify-center flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                      </span>
                      <p className="text-[14px] font-semibold text-[#0F172A] leading-snug">
                        {a.name}
                      </p>
                    </div>
                    <div className="md:col-span-4">
                      <p className="text-[12px] text-gray-500 leading-relaxed">{a.why}</p>
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <p className="text-[13px] font-bold text-[#0F172A] tabular-nums">{a.price}</p>
                    </div>
                    <div className="md:col-span-1 md:text-right">
                      <Link
                        href={`/reserver?offre=${a.slug}`}
                        className="inline-flex items-center gap-1 text-[#10B981] hover:text-[#0E9F6E] text-[12px] font-semibold transition-colors group"
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
            <p className="mt-6 text-center text-[11px] text-gray-400 italic max-w-2xl mx-auto">
              {t("addons.footnote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S8, FLUX ACCEPTÉS / EXCLUS · prose
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#0EA5E9] uppercase mb-4">
                {t("flows.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-7 tracking-tight leading-[1.1]">
                {t("flows.title")}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-[1.78]">
                {t("flows.intro")}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            <FadeIn direction="right">
              <div className="bg-[#F0FDF9] border border-[#10B981]/20 rounded-2xl p-7 h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl bg-[#10B981]/15 flex items-center justify-center flex-shrink-0">
                    <Inbox className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight leading-snug">
                    {t("flows.acceptedTitle")}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {acceptedFlows.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-[13px] text-gray-700 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-[#FEF3F2] border border-[#F59E0B]/20 rounded-2xl p-7 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0">
                    <BatteryCharging className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                  </span>
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight leading-snug">
                    {t("flows.excludedTitle")}
                  </h3>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {excludedFlows.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <XCircle
                        className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-[13px] text-gray-700 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={t("flows.linkHref")}
                  className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#0EA5E9] font-semibold text-sm group transition-colors self-start"
                >
                  {t("flows.linkLabel")}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
      <section className="py-24 lg:py-32 bg-[#F8FAFC] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("faq.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {faqItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full hover:border-[#10B981]/30 hover:shadow-md transition-all duration-300">
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
                  <p className="text-sm text-gray-600 leading-relaxed pl-11">{item.a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          S10, CITATION MAGAZINE + CTA DOUBLE FINAL
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 lg:py-36 bg-white relative overflow-hidden">
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
              <p className="text-[11px] font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-6">
                {t("finalQuote.eyebrow")}
              </p>

              <div
                className="w-10 h-[3px] bg-[#10B981] mx-auto mb-12 rounded-full"
                aria-hidden="true"
              />

              <blockquote>
                <Quote className="h-8 w-8 text-[#10B981]/40 mx-auto mb-6" aria-hidden="true" />
                <p className="text-2xl md:text-3xl lg:text-[2.2rem] font-bold text-[#0F172A] leading-[1.38] tracking-tight mb-10">
                  &ldquo;{t("finalQuote.text")}&rdquo;
                </p>
                <footer className="flex items-center justify-center gap-5">
                  <div className="w-16 h-px bg-gray-200" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-[#0F172A] text-base leading-none">
                      {t("finalQuote.name")}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{t("finalQuote.role")}</p>
                  </div>
                  <div className="w-16 h-px bg-gray-200" aria-hidden="true" />
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final dual CTA · dark band */}
      <section
        className="relative py-24 lg:py-32 overflow-hidden bg-[#0F172A]"
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/96 via-[#0F172A]/92 to-[#0F172A]/88" />
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
                id="waki-final-cta"
                className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.05]"
              >
                {t("finalCta.title")}
              </h2>
              <p className="text-gray-400 text-base lg:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("finalCta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-white hover:text-[#10B981] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-[#10B981]/25 hover:-translate-y-0.5 text-base"
                >
                  {t("finalCta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=waki-box-pilote"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white text-white hover:text-[#0F172A] border-2 border-white/25 hover:border-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 text-base"
                >
                  {t("finalCta.cta2")}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <div className="pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {trustBadges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-white/75">
                      <ShieldCheck
                        className="h-4 w-4 text-[#10B981] flex-shrink-0"
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
