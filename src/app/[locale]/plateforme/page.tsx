"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  ClipboardList,
  Gauge,
  GitBranch,
  ShieldCheck,
  FileBarChart,
  Activity,
  CheckCircle2,
  X,
  Shield,
  Lock,
  Scale,
  Leaf,
  QrCode,
  Bell,
  WifiOff,
  ListChecks,
  Recycle,
  TrendingUp,
  Coins,
  Cpu,
  Database,
  FileDown,
  FileSpreadsheet,
  FileType,
  Code2,
  BadgeCheck,
  Sparkles,
  Smartphone,
  Apple,
  Play,
  Workflow,
  Zap,
  Layers,
} from "lucide-react";

// ---------- Types ----------
type WorkflowStep = {
  number: string;
  title: string;
  description: string;
  highlights: string[];
};

type Pillar = {
  title: string;
  description: string;
  features: string[];
};

type FlowStep = { title: string; description: string };
type Kpi = { value: string; label: string };
type UseCase = {
  role: string;
  title: string;
  description: string;
  metrics: string[];
};
type MobileFeature = { title: string; description: string };

// ---------- Page ----------
export default function PlatformPage() {
  const t = useTranslations("Platform");

  const heroBadges = t.raw("hero.badges") as string[];
  const beforeItems = t.raw("unified.before.items") as string[];
  const afterItems = t.raw("unified.after.items") as string[];
  const unifiedKpis = t.raw("unified.kpis") as Kpi[];
  const workflowSteps = t.raw("workflow.steps") as WorkflowStep[];
  const securityPillars = t.raw("security.pillars") as Pillar[];
  const certifications = t.raw("security.certifications") as string[];
  const timelineSteps = t.raw("security.timeline.steps") as string[];
  const recyclingFlow = t.raw("recycling.flow") as FlowStep[];
  const recyclingKpis = t.raw("recycling.kpis") as Kpi[];
  const useCases = t.raw("reporting.useCases") as UseCase[];
  const reportFormats = t.raw("reporting.formats") as string[];
  const mobileFeatures = t.raw("mobile.features") as MobileFeature[];

  const workflowIcons = [
    ClipboardList,
    Gauge,
    GitBranch,
    ShieldCheck,
    FileBarChart,
    Activity,
  ];

  const securityIcons = [Shield, Lock, Scale, Leaf];

  const recyclingIcons = [TrendingUp, Cpu, Coins, Recycle];

  const mobileFeatureIcons = [QrCode, ListChecks, Bell, WifiOff];

  const reportFormatIcons = [
    { icon: FileDown, color: "bg-red-500/10 text-red-600" },
    { icon: FileType, color: "bg-blue-500/10 text-blue-600" },
    { icon: FileSpreadsheet, color: "bg-emerald-500/10 text-emerald-600" },
    { icon: Code2, color: "bg-purple-500/10 text-purple-600" },
  ];

  const useCaseColors = [
    "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-700",
    "from-blue-500/10 to-blue-500/5 border-blue-500/20 text-blue-700",
    "from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-700",
    "from-violet-500/10 to-violet-500/5 border-violet-500/20 text-violet-700",
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-secondary py-24 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/unsplash/tech-datacenter.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-secondary/95" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <FadeIn className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                {t("hero.eyebrow")}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-2xl">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5"
                >
                  {t("hero.ctaPrimary")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#workflow"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  <Play className="w-4 h-4" />
                  {t("hero.ctaSecondary")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                {heroBadges.map((badge, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full"
                  >
                    <BadgeCheck className="w-3.5 h-3.5 text-accent" />
                    {badge}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Hero mini-schema: unified platform hub */}
            <ScaleIn className="lg:col-span-5">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Hub */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-accent to-accent-700 shadow-2xl shadow-accent/40 flex items-center justify-center z-20 border border-white/20">
                    <Layers className="w-14 h-14 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Orbiting modules */}
                {[
                  { icon: ClipboardList, pos: "top-0 left-1/2 -translate-x-1/2" },
                  { icon: Shield, pos: "top-1/2 right-0 -translate-y-1/2" },
                  { icon: Recycle, pos: "bottom-0 left-1/2 -translate-x-1/2" },
                  { icon: FileBarChart, pos: "top-1/2 left-0 -translate-y-1/2" },
                  { icon: Smartphone, pos: "top-[15%] right-[15%]" },
                  { icon: Leaf, pos: "bottom-[15%] right-[15%]" },
                  { icon: Database, pos: "bottom-[15%] left-[15%]" },
                  { icon: Gauge, pos: "top-[15%] left-[15%]" },
                ].map(({ icon: Icon, pos }, i) => (
                  <div
                    key={i}
                    className={`absolute ${pos} w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center z-10 shadow-lg hover:bg-white/15 transition-colors`}
                  >
                    <Icon className="w-6 h-6 text-white/90" strokeWidth={1.8} />
                  </div>
                ))}
                {/* Connecting lines via SVG */}
                <svg
                  className="absolute inset-0 w-full h-full z-0"
                  viewBox="0 0 400 400"
                  fill="none"
                  aria-hidden
                >
                  <circle
                    cx="200"
                    cy="200"
                    r="140"
                    stroke="white"
                    strokeOpacity="0.1"
                    strokeDasharray="4 6"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="100"
                    stroke="white"
                    strokeOpacity="0.06"
                    strokeDasharray="2 4"
                  />
                </svg>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ============ UNIFIED PLATFORM (Before / After) ============ */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                {t("unified.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-5 tracking-tight">
                {t("unified.title")}
              </h2>
              <p className="text-lg text-dark/60 leading-relaxed">
                {t("unified.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto mb-16">
            {/* Before */}
            <FadeIn direction="left">
              <div className="relative h-full bg-white border border-gray-200 rounded-3xl p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-dark/70">
                    {t("unified.before.title")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {beforeItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-dark/60 py-2 border-b border-dashed border-gray-200 last:border-0"
                    >
                      <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-sm line-through decoration-red-300/60 decoration-1">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -top-3 left-8 bg-red-500 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                  Silos
                </div>
              </div>
            </FadeIn>

            {/* After */}
            <FadeIn direction="right">
              <div className="relative h-full bg-gradient-to-br from-primary to-primary-700 text-white rounded-3xl p-8 lg:p-10 shadow-2xl shadow-primary/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t("unified.after.title")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {afterItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 py-2 border-b border-white/10 last:border-0"
                    >
                      <div className="w-5 h-5 rounded bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-sm text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -top-3 left-8 bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded">
                  Plateforme unifiée
                </div>
              </div>
            </FadeIn>
          </div>

          {/* KPI strip */}
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {unifiedKpis.map((kpi, i) => (
                <StaggerItem key={i}>
                  <div className="text-center bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    <div className="text-4xl font-bold text-accent mb-1 tracking-tight">
                      {kpi.value}
                    </div>
                    <div className="text-sm text-dark/60">{kpi.label}</div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ============ WORKFLOW (connected) ============ */}
      <section
        id="workflow"
        className="relative py-20 lg:py-32 bg-dark text-white overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-3xl opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                {t("workflow.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
                {t("workflow.title")}
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                {t("workflow.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="max-w-6xl mx-auto space-y-4 lg:space-y-6">
              {workflowSteps.map((step, i) => {
                const Icon = workflowIcons[i] || Workflow;
                const isLast = i === workflowSteps.length - 1;
                return (
                  <StaggerItem key={i}>
                    <div className="relative">
                      <div className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 lg:p-8 transition-all backdrop-blur-sm">
                        <div className="grid lg:grid-cols-12 gap-6 items-center">
                          {/* Step number + icon */}
                          <div className="lg:col-span-3 flex items-center gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-700 flex items-center justify-center shadow-lg shadow-accent/30">
                                <Icon
                                  className="w-7 h-7 text-white"
                                  strokeWidth={1.8}
                                />
                              </div>
                              <div className="absolute -top-2 -right-2 bg-white text-dark text-[10px] font-black px-1.5 py-0.5 rounded-md shadow-md">
                                {step.number}
                              </div>
                            </div>
                            <div className="lg:hidden">
                              <h3 className="text-lg font-bold">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          {/* Title + description */}
                          <div className="lg:col-span-6">
                            <h3 className="hidden lg:block text-xl lg:text-2xl font-bold mb-2 text-white">
                              {step.title}
                            </h3>
                            <p className="text-sm lg:text-base text-white/65 leading-relaxed">
                              {step.description}
                            </p>
                          </div>

                          {/* Highlights */}
                          <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-2">
                            {step.highlights.map((h, j) => (
                              <span
                                key={j}
                                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-300 bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full"
                              >
                                <Zap className="w-3 h-3" />
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Connector arrow */}
                      {!isLast && (
                        <div className="flex justify-center py-2">
                          <div className="w-px h-6 bg-gradient-to-b from-accent/60 to-transparent relative">
                            <ArrowDown className="absolute -left-2 top-4 w-5 h-5 text-accent/80" />
                          </div>
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ============ GOVERNANCE & SECURITY ============ */}
      <section
        id="security"
        className="py-20 lg:py-32 bg-gradient-to-b from-light to-white"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                <ShieldCheck className="w-4 h-4" />
                {t("security.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-5 tracking-tight">
                {t("security.title")}
              </h2>
              <p className="text-lg text-dark/60 leading-relaxed">
                {t("security.subtitle")}
              </p>
            </div>
          </FadeIn>

          {/* Pillars grid */}
          <StaggerContainer>
            <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
              {securityPillars.map((pillar, i) => {
                const Icon = securityIcons[i] || Shield;
                return (
                  <StaggerItem key={i}>
                    <div className="group h-full bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary-700 flex items-center justify-center flex-shrink-0 shadow-md">
                          <Icon
                            className="w-6 h-6 text-white"
                            strokeWidth={1.8}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-dark mb-2">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-dark/60 leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2.5 pt-4 border-t border-gray-100">
                        {pillar.features.map((f, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2.5 text-sm text-dark/75"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>

          {/* Timeline + certifications */}
          <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            <FadeIn className="lg:col-span-3">
              <div className="bg-gradient-to-br from-secondary to-dark text-white rounded-3xl p-8 lg:p-10 h-full shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold">
                    {t("security.timeline.title")}
                  </h3>
                </div>
                <ol className="relative border-l-2 border-accent/30 ml-4 space-y-6 pt-2">
                  {timelineSteps.map((step, i) => (
                    <li key={i} className="pl-6 relative">
                      <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-accent ring-4 ring-accent/20 flex items-center justify-center text-[10px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="text-sm text-white/85">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-2" delay={0.1}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full shadow-sm">
                <h3 className="text-base font-bold text-dark mb-5 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-accent" />
                  Certifications & référentiels
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-light border border-gray-100 rounded-lg px-3 py-2 text-xs font-semibold text-dark/80 hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============ RECYCLING & VALUE RECOVERY ============ */}
      <section
        id="recycling"
        className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-primary to-primary-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/unsplash/ewaste-recycling.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/92 to-primary-800/95" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent-300 mb-3">
                <Recycle className="w-4 h-4" />
                {t("recycling.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
                {t("recycling.title")}
              </h2>
              <p className="text-lg text-white/75 leading-relaxed">
                {t("recycling.subtitle")}
              </p>
            </div>
          </FadeIn>

          {/* Flow horizontal */}
          <StaggerContainer>
            <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
              {recyclingFlow.map((step, i) => {
                const Icon = recyclingIcons[i] || Recycle;
                const isLast = i === recyclingFlow.length - 1;
                return (
                  <StaggerItem key={i}>
                    <div className="relative h-full">
                      <div className="h-full bg-white/[0.06] backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/[0.1] transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/25 border border-accent/30 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-accent-300" />
                          </div>
                          <span className="text-3xl font-bold text-white/20">
                            0{i + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                        <p className="text-sm text-white/70 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {!isLast && (
                        <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/40">
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>

          {/* KPI row */}
          <StaggerContainer>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {recyclingKpis.map((kpi, i) => (
                <StaggerItem key={i}>
                  <div className="bg-white/[0.08] border border-white/15 backdrop-blur-sm rounded-2xl p-6 text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-accent-300 mb-1 tracking-tight">
                      {kpi.value}
                    </div>
                    <div className="text-xs text-white/70 leading-snug">
                      {kpi.label}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="text-center">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white px-6 py-3 rounded-lg font-semibold shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5"
            >
              {t("recycling.cta")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ REPORTING ============ */}
      <section className="py-20 lg:py-32 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
                <FileBarChart className="w-4 h-4" />
                {t("reporting.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-5 tracking-tight">
                {t("reporting.title")}
              </h2>
              <p className="text-lg text-dark/60 leading-relaxed">
                {t("reporting.subtitle")}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto mb-12">
            {/* Use cases */}
            <StaggerContainer className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-4">
                {useCases.map((uc, i) => (
                  <StaggerItem key={i}>
                    <div
                      className={`h-full bg-gradient-to-br ${useCaseColors[i] || useCaseColors[0]} border rounded-2xl p-6`}
                    >
                      <div className="text-[11px] font-bold tracking-wider uppercase mb-2 opacity-80">
                        {uc.role}
                      </div>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        {uc.title}
                      </h3>
                      <p className="text-sm text-dark/65 leading-relaxed mb-4">
                        {uc.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dark/10">
                        {uc.metrics.map((m, j) => (
                          <span
                            key={j}
                            className="text-[10px] font-semibold bg-white/70 backdrop-blur-sm text-dark/70 px-2 py-1 rounded-md"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>

            {/* Dashboard mockup */}
            <ScaleIn className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Browser top */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-light/50">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 h-5 bg-gray-100 rounded mx-2 flex items-center px-2 text-[9px] text-gray-400">
                      app.greentechcycle.com/reports
                    </div>
                  </div>
                  {/* Dashboard content */}
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-semibold text-dark">
                          {t("reporting.dashboardTitle")}
                        </div>
                        <div className="text-[10px] text-dark/50">
                          {t("reporting.dashboardSubtitle")}
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-1 bg-accent text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md">
                        <FileDown className="w-3 h-3" />
                        {t("reporting.exportLabel")}
                      </button>
                    </div>

                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-accent/10 rounded-lg p-2.5">
                        <div className="text-[9px] text-dark/50 mb-1">
                          Actifs traités
                        </div>
                        <div className="text-sm font-bold text-accent">
                          1 248
                        </div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-2.5">
                        <div className="text-[9px] text-dark/50 mb-1">
                          Scope 3 évité
                        </div>
                        <div className="text-sm font-bold text-blue-600">
                          38,2 T
                        </div>
                      </div>
                      <div className="bg-amber-500/10 rounded-lg p-2.5">
                        <div className="text-[9px] text-dark/50 mb-1">
                          Valeur
                        </div>
                        <div className="text-sm font-bold text-amber-600">
                          124 k€
                        </div>
                      </div>
                    </div>

                    {/* Fake chart */}
                    <div className="bg-light rounded-lg p-3">
                      <div className="flex items-end gap-1 h-20">
                        {[40, 65, 52, 78, 60, 88, 72, 95, 80, 72, 90, 85].map(
                          (h, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gradient-to-t from-accent to-accent-400 rounded-sm"
                              style={{ height: `${h}%` }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    {/* Rows */}
                    <div className="space-y-1.5">
                      {[
                        { role: "DSI", color: "bg-emerald-500" },
                        { role: "RSSI", color: "bg-blue-500" },
                        { role: "RSE", color: "bg-amber-500" },
                        { role: "DAF", color: "bg-violet-500" },
                      ].map((r, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between bg-light rounded-md px-2.5 py-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${r.color}`}
                            />
                            <span className="text-[10px] font-medium text-dark/80">
                              Rapport {r.role}
                            </span>
                          </div>
                          <FileDown className="w-3 h-3 text-dark/40" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>

          {/* Formats strip */}
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {reportFormats.map((format, i) => {
                const d = reportFormatIcons[i] || reportFormatIcons[0];
                const Icon = d.icon;
                return (
                  <StaggerItem key={i}>
                    <div className="bg-white border border-gray-100 rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                      <div
                        className={`w-12 h-12 mx-auto mb-3 rounded-xl ${d.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-dark">
                        {format}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ============ MOBILE APP ============ */}
      <section
        id="mobile"
        className="relative py-20 lg:py-32 bg-gradient-to-br from-dark via-secondary to-dark text-white overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/40 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
            <FadeIn className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-accent-300 mb-3">
                <Smartphone className="w-4 h-4" />
                {t("mobile.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
                {t("mobile.title")}
              </h2>
              <p className="text-lg text-white/70 leading-relaxed mb-8">
                {t("mobile.subtitle")}
              </p>

              <StaggerContainer>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {mobileFeatures.map((f, i) => {
                    const Icon = mobileFeatureIcons[i] || QrCode;
                    return (
                      <StaggerItem key={i}>
                        <div className="flex items-start gap-3 bg-white/[0.05] border border-white/10 rounded-xl p-4 hover:bg-white/[0.08] transition-colors">
                          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-5 h-5 text-accent-300" />
                          </div>
                          <div>
                            <div className="text-sm font-bold mb-1">
                              {f.title}
                            </div>
                            <div className="text-xs text-white/60 leading-relaxed">
                              {f.description}
                            </div>
                          </div>
                        </div>
                      </StaggerItem>
                    );
                  })}
                </div>
              </StaggerContainer>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-white text-dark px-4 py-2.5 rounded-lg hover:-translate-y-0.5 transition-transform">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-[9px] opacity-60 leading-none mb-0.5">
                      {t("mobile.storeApple")}
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      App Store
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-white text-dark px-4 py-2.5 rounded-lg hover:-translate-y-0.5 transition-transform">
                  <Play className="w-5 h-5 fill-dark" />
                  <div className="text-left">
                    <div className="text-[9px] opacity-60 leading-none mb-0.5">
                      {t("mobile.storeGoogle")}
                    </div>
                    <div className="text-sm font-bold leading-tight">
                      Google Play
                    </div>
                  </div>
                </div>
                <div className="text-xs text-white/60 ml-2">
                  {t("mobile.tagline")}
                </div>
              </div>
            </FadeIn>

            {/* Phone mockup */}
            <ScaleIn className="lg:col-span-5">
              <div className="relative flex justify-center">
                <div
                  className="relative"
                  style={{
                    transform: "rotate(-8deg) perspective(1200px) rotateY(8deg)",
                  }}
                >
                  {/* Phone frame */}
                  <div className="relative w-[280px] h-[580px] bg-gradient-to-br from-gray-900 to-black rounded-[48px] shadow-2xl border-[10px] border-gray-800 overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-20" />

                    {/* Screen content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-700 to-secondary pt-9">
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-5 py-2 text-[10px] text-white/90 font-semibold">
                        <span>09:41</span>
                        <span>•••</span>
                      </div>

                      <div className="px-4 py-2 space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-[9px] text-white/60">
                              Bonjour
                            </div>
                            <div className="text-sm font-bold text-white">
                              Julien · Technicien
                            </div>
                          </div>
                          <div className="w-9 h-9 rounded-full bg-accent/30 border-2 border-accent/40 flex items-center justify-center">
                            <Bell className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Scan CTA */}
                        <div className="bg-accent rounded-2xl p-4 shadow-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                              <QrCode className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-[10px] text-white/80">
                                Action rapide
                              </div>
                              <div className="text-sm font-bold text-white">
                                Scanner un actif
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-[9px] text-white/60 mb-1">
                              Aujourd&apos;hui
                            </div>
                            <div className="text-lg font-bold text-white">
                              24
                            </div>
                            <div className="text-[9px] text-accent-300">
                              actifs scannés
                            </div>
                          </div>
                          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                            <div className="text-[9px] text-white/60 mb-1">
                              SLA
                            </div>
                            <div className="text-lg font-bold text-white">
                              98%
                            </div>
                            <div className="text-[9px] text-accent-300">
                              conformité
                            </div>
                          </div>
                        </div>

                        {/* Interventions list */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] font-bold text-white">
                              Interventions
                            </div>
                            <div className="text-[9px] text-accent-300">
                              3 actives
                            </div>
                          </div>
                          {[
                            {
                              label: "Collecte · Site Paris",
                              tag: "En cours",
                              c: "bg-accent",
                            },
                            {
                              label: "Effacement · Lot 204",
                              tag: "Attente",
                              c: "bg-amber-400",
                            },
                            {
                              label: "Reprise · Rennes",
                              tag: "Ok",
                              c: "bg-emerald-400",
                            },
                          ].map((it, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between bg-white/5 rounded-lg px-2.5 py-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${it.c}`}
                                />
                                <span className="text-[10px] text-white/90">
                                  {it.label}
                                </span>
                              </div>
                              <span className="text-[9px] text-white/50">
                                {it.tag}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom nav */}
                      <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-dark/80 backdrop-blur-md border-t border-white/10 flex items-center justify-around">
                        <Gauge className="w-5 h-5 text-accent" />
                        <ListChecks className="w-5 h-5 text-white/40" />
                        <QrCode className="w-5 h-5 text-white/40" />
                        <Bell className="w-5 h-5 text-white/40" />
                      </div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -left-8 bg-white text-dark rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 rotate-6">
                    <WifiOff className="w-4 h-4 text-secondary" />
                    <span className="text-[10px] font-bold">Mode hors-ligne</span>
                  </div>
                  <div className="absolute -bottom-3 -right-10 bg-accent text-white rounded-xl shadow-xl px-3 py-2 flex items-center gap-2 -rotate-6">
                    <QrCode className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Scan · 2 sec</span>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-5xl mx-auto relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-10 lg:p-16 overflow-hidden shadow-2xl">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 80% 20%, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
                    {t("cta.title")}
                  </h2>
                  <p className="text-lg text-white/75 leading-relaxed">
                    {t("cta.subtitle")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:justify-center">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-600 text-white px-6 py-3.5 rounded-lg font-semibold shadow-xl shadow-accent/30 transition-all hover:-translate-y-0.5"
                  >
                    {t("cta.primary")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white px-6 py-3.5 rounded-lg font-semibold transition-all"
                  >
                    {t("cta.secondary")}
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
