"use client";

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
  AlertTriangle,
  Shield,
  ShieldCheck,
  FileCheck,
  Recycle,
  BarChart3,
  Lock,
  Building2,
  HeartPulse,
  Factory,
  Quote,
  Award,
  Users,
  LineChart,
  Scale,
  Euro,
  Cloud,
  Server,
  Workflow,
  Eraser,
  CheckCircle2,
  XCircle,
  CalendarClock,
  Gavel,
} from "lucide-react";

/**
 * Home — refonte vague 4 (avr. 2026)
 * Direction hero retenue : C — "Provocation chiffrée".
 * Cible : DSI, RSSI, RSE, DAF d'ETI cotées et grandes entreprises.
 * Structure narrative chaîne de valeur (problème → solution → preuve → cas → différenciateurs → action).
 */
export default function HomePage() {
  const t = useTranslations("Home");

  const trustClients = t.raw("trustBand.clients") as string[];
  const problemItems = t.raw("problem.items") as Array<{
    tag: string;
    title: string;
    body: string;
    source: string;
  }>;
  const solutionPillars = t.raw("solution.pillars") as Array<{
    label: string;
    desc: string;
  }>;
  const valueSteps = t.raw("valueChain.steps") as Array<{
    n: string;
    title: string;
    desc: string;
    kpi: string;
  }>;
  const cases = t.raw("cases.items") as Array<{
    slug: string;
    sector: string;
    regulation: string;
    title: string;
    results: string[];
  }>;
  const differentiators = t.raw("differentiators.items") as Array<{
    title: string;
    body: string;
    stat: string;
  }>;
  const trustBadges = t.raw("finalCTA.trustBadges") as string[];

  const regEvents = t.raw("regTimeline.events") as Array<{
    date: string;
    label: string;
    body: string;
    penalty: string;
  }>;
  const beforeItems = t.raw("comparison.before.items") as string[];
  const afterItems = t.raw("comparison.after.items") as string[];
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;

  // Icons for value chain steps — sober lucide outlines
  const valueStepIcons = [FileCheck, Eraser, Recycle, BarChart3, Lock];

  // Icons for the 3 client cases
  const caseIcons = [Building2, HeartPulse, Factory];

  // Icons for differentiators
  const diffIcons = [Scale, Award, LineChart, Users];

  // Icons for solution pillars (used inside hub-and-spoke diagram)
  const pillarIcons = [Server, ShieldCheck, BarChart3, Recycle];

  return (
    <main className="overflow-hidden bg-white">
      {/* ==========================================================
          1. URGENCY BAND — sober navy, calendrier régulateur précis
         ========================================================== */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium text-center">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[#F59E0B]" aria-hidden="true" />
          <p className="leading-snug">{t("urgency.text")}</p>
        </div>
      </div>

      {/* ==========================================================
          2. HERO — Direction "Provocation chiffrée"
             Split layout : argument à gauche, photo à droite.
             Chiffre choc 78% en grand, sub-titre angle GTC, dual CTA.
         ========================================================== */}
      <section
        className="relative min-h-[88vh] flex items-center bg-gradient-to-br from-white via-[#F8FAFC] to-[#ECFDF5] overflow-hidden"
        aria-labelledby="hero-title"
      >
        {/* Decorative ambient gradients (kept very low-key) */}
        <div className="absolute -top-32 -right-32 w-[36rem] h-[36rem] bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-32 w-[32rem] h-[32rem] bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.06),_transparent_55%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Argument column — 7/12 */}
            <FadeIn className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 text-[#0F172A] text-xs font-semibold tracking-wider uppercase mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                {t("hero.eyebrow")}
              </span>

              <h1
                id="hero-title"
                className="text-[#0F172A] mb-6 tracking-tight leading-[1.02]"
              >
                {/* Giant impact figure — primary green */}
                <span className="block text-[5.5rem] sm:text-[7rem] lg:text-[9rem] font-bold text-[#10B981] leading-none mb-2 tracking-tighter">
                  {t("hero.figure")}
                </span>
                <span className="block text-xl md:text-2xl lg:text-3xl font-semibold text-gray-500 mb-4 tracking-tight">
                  {t("hero.figureUnit")}
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight max-w-2xl">
                  {t("hero.title")}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 hover:-translate-y-0.5 text-base"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] border-2 border-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
                >
                  {t("hero.cta2")}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <p className="text-xs text-gray-500 italic mb-6 max-w-2xl">
                {t("hero.source")}
              </p>

              {/* Inline trust strip */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  <span>{t("hero.trust1")}</span>
                </div>
                <span className="hidden sm:inline w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  <span>{t("hero.trust2")}</span>
                </div>
                <span className="hidden sm:inline w-px h-4 bg-gray-300" />
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  <span>{t("hero.trust3")}</span>
                </div>
              </div>
            </FadeIn>

            {/* Visual column — 5/12 — boardroom photo + floating proof card */}
            <FadeIn delay={0.1} direction="left" className="lg:col-span-5">
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                  <Image
                    src="/photos/hp-rssi-boardroom.jpg"
                    alt="Comité de direction RSSI / DSI / RSE / DAF arbitrant le décommissionnement IT"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent" />
                </div>

                {/* Floating proof card top-right */}
                <div className="hidden md:block absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 w-56">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Audit ACPR
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A] leading-tight">4 jours</p>
                  <p className="text-xs text-gray-500 mt-1">vs 3 semaines en moyenne</p>
                </div>

                {/* Floating proof card bottom-left */}
                <div className="hidden md:block absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 border border-gray-100 w-56">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center">
                      <Euro className="h-5 w-5 text-[#0EA5E9]" aria-hidden="true" />
                    </div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Valeur récupérée
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-[#0F172A] leading-tight">638 k€</p>
                  <p className="text-xs text-gray-500 mt-1">moyenne / mission grand compte</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ==========================================================
          3. TRUST BAND — donneurs d'ordre anonymisés (sectoriels)
         ========================================================== */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase">
                {t("trustBand.label")}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {trustClients.map((client, i) => (
              <StaggerItem key={i}>
                <div className="flex items-center justify-center text-center px-3 py-4 rounded-lg border border-gray-100 bg-[#F8FAFC] h-full">
                  <p className="text-[13px] leading-tight font-semibold text-gray-700">
                    {client}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="mt-6 text-center text-xs text-gray-500 italic max-w-2xl mx-auto">
            {t("trustBand.note")}
          </p>
        </div>
      </section>

      {/* ==========================================================
          4. PROBLÈME — Coût caché, 3 risques chiffrés
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#F59E0B] uppercase mb-3">
                {t("problem.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("problem.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("problem.subtitle")}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {problemItems.map((item, i) => {
              const ProblemIcon = [AlertTriangle, Euro, Cloud][i] || AlertTriangle;
              return (
                <StaggerItem key={i}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                        <ProblemIcon className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider text-[#F59E0B] uppercase">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-snug tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                      {item.body}
                    </p>
                    <p className="text-[11px] text-gray-500 italic border-t border-gray-100 pt-3 leading-snug">
                      {item.source}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================================
          4-bis. CALENDRIER RÉGULATEUR — 4 échéances datées
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-3">
                <CalendarClock className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
                <p className="text-sm font-semibold tracking-[0.18em] text-[#F59E0B] uppercase">
                  {t("regTimeline.eyebrow")}
                </p>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("regTimeline.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("regTimeline.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal axis (decorative) */}
            <div
              className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-[#F59E0B] via-[#10B981] to-[#0EA5E9]"
              aria-hidden="true"
            />

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4">
              {regEvents.map((evt, i) => {
                const accent = i < 2 ? "#F59E0B" : i === 2 ? "#10B981" : "#0EA5E9";
                return (
                  <StaggerItem key={i}>
                    <div className="relative">
                      {/* Pin marker on axis */}
                      <div
                        className="hidden lg:flex absolute -top-1 left-6 w-4 h-4 rounded-full ring-4 ring-white items-center justify-center"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      />
                      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 mt-12 lg:mt-0 lg:pt-12 h-full flex flex-col">
                        <p
                          className="text-xs font-mono font-bold tracking-widest mb-1"
                          style={{ color: accent }}
                        >
                          {evt.date}
                        </p>
                        <h3 className="text-lg font-bold text-[#0F172A] mb-3 leading-tight tracking-tight">
                          {evt.label}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                          {evt.body}
                        </p>
                        <div className="border-t border-gray-100 pt-3 flex items-center gap-2">
                          <Gavel className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                          <p className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
                            Sanction max
                          </p>
                          <p className="text-[11px] text-gray-700 font-medium ml-auto">
                            {evt.penalty}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ==========================================================
          5. SOLUTION — Phrase puissante + Hub-and-spoke
         ========================================================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("solution.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-6 tracking-tight leading-[1.1]">
                {t("solution.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("solution.body")}
              </p>
            </div>
          </FadeIn>

          {/* Hub-and-spoke diagram */}
          <FadeIn>
            <div className="relative max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-14 items-center">
                {/* Left pillars */}
                <div className="space-y-5 order-2 lg:order-1">
                  {[0, 1].map((idx) => {
                    const PIcon = pillarIcons[idx];
                    const p = solutionPillars[idx];
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 lg:text-right lg:flex-row-reverse hover:border-[#10B981]/40 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <PIcon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A] text-base mb-1 leading-tight">
                            {p.label}
                          </p>
                          <p className="text-sm text-gray-600 leading-snug">{p.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Center hub */}
                <div className="flex justify-center order-1 lg:order-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-full blur-2xl opacity-30 scale-110" />
                    <div className="relative w-44 h-44 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-[#10B981] to-[#0EA5E9] text-white flex flex-col items-center justify-center text-center shadow-2xl ring-4 ring-white">
                      <Workflow className="h-7 w-7 mb-2 opacity-80" aria-hidden="true" />
                      <p className="font-bold text-lg lg:text-xl tracking-tight">
                        {t("solution.diagramCenter")}
                      </p>
                      <p className="text-xs opacity-80 mt-1 px-3">
                        {t("solution.diagramCenterSub")}
                      </p>
                    </div>
                    {/* Spokes connecting lines (decorative) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 -translate-x-full w-12 h-px bg-gradient-to-l from-[#10B981]/60 to-transparent" />
                    <div className="hidden lg:block absolute top-1/2 right-0 translate-x-full w-12 h-px bg-gradient-to-r from-[#10B981]/60 to-transparent" />
                  </div>
                </div>

                {/* Right pillars */}
                <div className="space-y-5 order-3">
                  {[2, 3].map((idx) => {
                    const PIcon = pillarIcons[idx];
                    const p = solutionPillars[idx];
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-4 bg-[#F8FAFC] border border-gray-100 rounded-xl p-5 hover:border-[#0EA5E9]/40 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <PIcon className="h-5 w-5 text-[#0EA5E9]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A] text-base mb-1 leading-tight">
                            {p.label}
                          </p>
                          <p className="text-sm text-gray-600 leading-snug">{p.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================================
          6. CHAÎNE DE VALEUR — 5 étapes horizontales
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("valueChain.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
                {t("valueChain.title")}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t("valueChain.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid lg:grid-cols-5 gap-5 lg:gap-4">
            {valueSteps.map((step, i) => {
              const StepIcon = valueStepIcons[i] || FileCheck;
              return (
                <StaggerItem key={i}>
                  <div className="relative bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col hover:bg-white/[0.05] hover:border-[#10B981]/40 transition-all duration-300">
                    {/* Step number ribbon */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-mono font-semibold tracking-widest text-[#10B981]">
                        {step.n}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center">
                        <StepIcon className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 tracking-tight leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-5">
                      {step.desc}
                    </p>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                        SLA / KPI
                      </p>
                      <p className="text-sm font-semibold text-[#10B981] leading-snug">
                        {step.kpi}
                      </p>
                    </div>
                    {/* Connector arrow (hidden on last) */}
                    {i < valueSteps.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-[#10B981] text-white shadow-lg">
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================================
          7. PREUVES & RÉSULTATS — 4 KPIs CountUp avec sources
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("proof.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                {t("proof.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {(["clients", "assets", "value", "carbon"] as const).map((k, i) => {
              const KIcon = [Users, Server, Euro, Cloud][i];
              const accent = i % 2 === 0 ? "#10B981" : "#0EA5E9";
              return (
                <StaggerItem key={k}>
                  <ScaleIn delay={i * 0.05}>
                    <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${accent}15` }}
                      >
                        <KIcon
                          className="h-5 w-5"
                          style={{ color: accent }}
                          aria-hidden="true"
                        />
                      </div>
                      <p
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-none"
                        style={{ color: accent }}
                      >
                        <CountUp
                          end={parseInt(t(`proof.items.${k}.value`))}
                          suffix={t(`proof.items.${k}.suffix`)}
                        />
                      </p>
                      <p className="text-gray-700 text-sm font-medium leading-snug mb-3 flex-1">
                        {t(`proof.items.${k}.label`)}
                      </p>
                      <p className="text-[11px] text-gray-500 italic border-t border-gray-100 pt-3 leading-snug">
                        {t(`proof.items.${k}.source`)}
                      </p>
                    </div>
                  </ScaleIn>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <p className="mt-10 text-center text-xs text-gray-500 italic max-w-3xl mx-auto leading-relaxed">
            {t("proof.footnote")}
          </p>
        </div>
      </section>

      {/* ==========================================================
          8. CAS CLIENTS — 3 mini-cas chiffrés liés à /cas-usages
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                  {t("cases.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                  {t("cases.title")}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  {t("cases.subtitle")}
                </p>
              </div>
              <Link
                href="/cas-usages"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold whitespace-nowrap text-sm group"
              >
                {t("cases.discoverAll")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {cases.map((c, i) => {
              const CIcon = caseIcons[i] || Building2;
              const photos = [
                "/photos/case-banque.jpg",
                "/photos/case-hopital.jpg",
                "/photos/case-industrie.jpg",
              ];
              return (
                <StaggerItem key={c.slug}>
                  <Link
                    href={`/cas-usages#${c.slug}`}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#10B981]/30"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={photos[i]}
                        alt={`Photo sectorielle illustrant le cas ${c.sector}`}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-md">
                        <CIcon className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                        <span className="text-[11px] font-semibold text-[#0F172A] tracking-wide">
                          {c.sector}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#F59E0B] text-[10px] font-semibold text-white uppercase tracking-wider">
                          {c.regulation}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-[#0F172A] mb-4 leading-snug tracking-tight">
                        {c.title}
                      </h3>
                      <ul className="space-y-2 mb-5 flex-1">
                        {c.results.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                            <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#10B981] group-hover:text-[#0E9F6E]">
                          {t("cases.cardCta")}
                        </span>
                        <ArrowRight className="h-4 w-4 text-[#10B981] transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================================
          9. POURQUOI GREENTECHCYCLE — 4 différenciateurs durs
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("differentiators.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("differentiators.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("differentiators.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
            {differentiators.map((d, i) => {
              const DIcon = diffIcons[i] || Award;
              return (
                <StaggerItem key={i}>
                  <div className="relative bg-gradient-to-br from-white to-[#F8FAFC] border border-gray-100 rounded-2xl p-7 lg:p-8 h-full hover:shadow-xl hover:border-[#10B981]/30 transition-all duration-300">
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#0EA5E9] flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-[#10B981]/20">
                        <DIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <span className="inline-block px-2.5 py-1 rounded-md bg-[#10B981]/10 text-[11px] font-semibold text-[#10B981] uppercase tracking-wider mb-3">
                          {d.stat}
                        </span>
                        <h3 className="text-xl font-bold text-[#0F172A] leading-tight tracking-tight">
                          {d.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{d.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ==========================================================
          9-bis. AVANT / APRÈS — comparaison synthétique
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("comparison.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("comparison.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("comparison.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5 lg:gap-8 max-w-5xl mx-auto">
            {/* BEFORE column */}
            <FadeIn>
              <div className="bg-white border border-gray-200 rounded-2xl p-7 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                      Avant
                    </p>
                    <p className="font-bold text-[#0F172A] text-lg leading-tight">
                      {t("comparison.before.label")}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {beforeItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                    >
                      <XCircle
                        className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* AFTER column */}
            <FadeIn delay={0.1}>
              <div className="bg-gradient-to-br from-[#10B981] to-[#0E9F6E] border border-[#10B981] rounded-2xl p-7 lg:p-8 h-full text-white shadow-2xl shadow-[#10B981]/30">
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/20">
                  <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider text-white/80 uppercase">
                      Après
                    </p>
                    <p className="font-bold text-white text-lg leading-tight">
                      {t("comparison.after.label")}
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {afterItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/95 leading-relaxed"
                    >
                      <CheckCircle2
                        className="h-4 w-4 text-white flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <div className="mt-10 text-center">
              <Link
                href="/plateforme"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group"
              >
                Voir la plateforme en détail
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================================
          10. TÉMOIGNAGE FORT — 1 grosse citation Marc B. RSSI
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.18),_transparent_70%)] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#0EA5E9]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-6 text-center">
                {t("bigQuote.eyebrow")}
              </p>

              <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center">
                {/* Visual — anonymized boardroom photo with mark */}
                <div className="relative w-48 h-48 lg:w-56 lg:h-56 mx-auto flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#10B981] to-[#0EA5E9] rounded-2xl rotate-3" />
                  <div className="relative w-full h-full rounded-2xl overflow-hidden ring-4 ring-white/10">
                    <Image
                      src="/photos/hp-dsi-strategy.jpg"
                      alt="Décideur RSSI grand compte arbitrant un dossier ITAD (visage anonymisé)"
                      fill
                      loading="lazy"
                      className="object-cover grayscale brightness-90"
                      sizes="224px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/40 to-transparent" />
                  </div>
                </div>

                <div>
                  <Quote className="h-12 w-12 text-[#10B981] mb-5 opacity-70" aria-hidden="true" />
                  <blockquote className="text-xl md:text-2xl lg:text-3xl text-white leading-[1.4] font-medium mb-8 tracking-tight">
                    &ldquo;{t("bigQuote.quote")}&rdquo;
                  </blockquote>
                  <div className="border-l-4 border-[#10B981] pl-5 mb-6">
                    <p className="font-bold text-white text-lg leading-tight">
                      {t("bigQuote.name")}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {t("bigQuote.role")} · {t("bigQuote.company")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">
                    <span className="font-semibold text-gray-300">Contexte :</span>{" "}
                    {t("bigQuote.context")}
                  </p>
                  <Link
                    href="/cas-usages#banque-cac40-windows11-nis2"
                    className="inline-flex items-center gap-2 text-[#10B981] hover:text-white font-semibold text-sm group"
                  >
                    {t("bigQuote.ctaLabel")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <p className="mt-10 text-center text-[11px] text-gray-500 italic max-w-2xl mx-auto leading-relaxed">
                {t("bigQuote.consentNote")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================================
          10-bis. FAQ DSI/RSSI — 4 objections frontales
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("faq.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {faqItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-7 h-full hover:border-[#10B981]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] text-sm font-bold">
                      Q{i + 1}
                    </span>
                    <h3 className="font-bold text-[#0F172A] text-base leading-tight tracking-tight">
                      {item.q}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-11">
                    {item.a}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="mt-12 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#0E9F6E] font-semibold text-sm group"
              >
                Voir les 24 questions de la FAQ technique
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================================
          10-ter. TARIFS WAKI BOX TEASER — 3 plans + pilote
         ========================================================== */}
      <section className="py-24 lg:py-28 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.12),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("pricingTeaser.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
                {t("pricingTeaser.title")}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t("pricingTeaser.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-10">
            {(t.raw("pricingTeaser.plans") as Array<{
              name: string;
              price: string;
              setup: string;
              pitch: string;
              slug: string;
              popular?: boolean;
            }>).map((plan, i) => {
              const accents = ["#0EA5E9", "#10B981", "#F59E0B"];
              return (
                <StaggerItem key={i}>
                  <div className={`relative bg-white/[0.04] border ${plan.popular ? "border-[#10B981]/60 shadow-xl shadow-[#10B981]/10" : "border-white/10"} backdrop-blur-sm rounded-2xl p-7 h-full flex flex-col hover:bg-white/[0.06] transition-all duration-300`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                        {t("pricingTeaser.popularLabel")}
                      </div>
                    )}
                    <h3 className="text-white text-xl font-bold mb-2 tracking-tight">{plan.name}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-3xl font-black tabular-nums" style={{ color: accents[i] }}>
                        {plan.price}
                      </span>
                      <span className="text-sm text-gray-400 mb-1">€ HT/mois</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Setup {plan.setup} € HT</p>
                    <p className="text-sm text-gray-300 leading-relaxed flex-1 mb-6">{plan.pitch}</p>
                    <Link
                      href={`/reserver?offre=${plan.slug}`}
                      className="block w-full text-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: accents[i] }}
                    >
                      {t("pricingTeaser.bookCta")}
                      <ArrowRight className="inline h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Pilote encart */}
          <FadeIn>
            <div className="max-w-6xl mx-auto bg-[#10B981]/15 border border-[#10B981]/30 rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6EE7B7] mb-2">
                  {t("pricingTeaser.pilot.label")}
                </p>
                <p className="text-white text-lg font-bold leading-snug">
                  {t("pricingTeaser.pilot.headline")}
                </p>
              </div>
              <Link
                href="/reserver?offre=waki-box-pilote"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm flex-shrink-0"
              >
                {t("pricingTeaser.pilot.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#6EE7B7] font-semibold text-sm group"
              >
                {t("pricingTeaser.allPricingLink")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==========================================================
          11. CTA FINAL DOUBLE — audit + démo + bandeau confiance
         ========================================================== */}
      <section className="relative py-28 lg:py-32 overflow-hidden">
        <Image
          src="/photos/hp-atelier-itad.jpg"
          alt="Atelier de reconditionnement GreenTechCycle — chaîne d'effacement et de tri certifiée"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#10B981]/85 to-[#0EA5E9]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.12),_transparent_60%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center text-white">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("finalCTA.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.05]">
                {t("finalCTA.title")}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t("finalCTA.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-white hover:text-[#10B981] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-[#10B981]/30 hover:-translate-y-0.5 text-base"
                >
                  {t("finalCTA.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white text-white hover:text-[#0F172A] border-2 border-white/40 hover:border-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 backdrop-blur-sm text-base"
                >
                  {t("finalCTA.cta2")}
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
                    <div key={i} className="flex items-center gap-2 text-sm text-white/90">
                      <Shield className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                      <span className="font-medium">{badge}</span>
                      {i < trustBadges.length - 1 && (
                        <span className="hidden sm:inline w-px h-4 bg-white/20 ml-3" />
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
