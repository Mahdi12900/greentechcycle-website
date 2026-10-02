"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  ScaleIn,
} from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  Quote,
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Zap,
  Radio,
  GraduationCap,
  Users,
  Euro,
  Server,
  Cloud,
  Shield,
  BarChart3,
  TrendingUp,
} from "lucide-react";

type Metric = { value: string; suffix: string; label: string };
type CaseResult = {
  slug: string;
  sector: string;
  icon: string;
  title: string;
  highlights: string[];
  quote: string;
  quoteName: string;
  quoteRole: string;
};

export default function ResultatsClientsPage() {
  const t = useTranslations("ResultatsClients");

  const globalMetrics = t.raw("metrics") as Metric[];
  const cases = t.raw("cases") as CaseResult[];
  const trustBadges = t.raw("trustBadges") as string[];

  const iconMap: Record<string, typeof Building2> = {
    building: Building2,
    heartPulse: HeartPulse,
    factory: Factory,
    landmark: Landmark,
    shoppingBag: ShoppingBag,
    zap: Zap,
    radio: Radio,
    graduationCap: GraduationCap,
  };

  const metricIcons = [Users, Server, Euro, Cloud];
  const metricAccents = ["#047857", "#0B3B2E", "#B45309", "#0B3B2E"];

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-ondark-muted uppercase mb-4 text-eyebrow">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-display-lg text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-ondark-muted mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-base"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Global metrics */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-muted uppercase mb-3 text-eyebrow">
                {t("metricsSection.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink">
                {t("metricsSection.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {globalMetrics.map((m, i) => {
              const MIcon = metricIcons[i] || BarChart3;
              return (
                <StaggerItem key={i}>
                  <ScaleIn delay={i * 0.05}>
                    <div className="border border-line rounded-2xl p-7 h-full flex flex-col items-center text-center hover:shadow-card transition-colors duration-150 bg-cream">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${metricAccents[i]}15` }}
                      >
                        <MIcon className="h-6 w-6" style={{ color: metricAccents[i] }} aria-hidden="true" />
                      </div>
                      <p
                        className="text-4xl md:text-5xl font-semibold tracking-tight mb-2 leading-none"
                        style={{ color: metricAccents[i] }}
                      >
                        <CountUp end={parseInt(m.value)} suffix={m.suffix} />
                      </p>
                      <p className="text-ink-700 text-sm font-medium leading-snug">
                        {m.label}
                      </p>
                    </div>
                  </ScaleIn>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Case results grid */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-muted uppercase mb-3 text-eyebrow">
                {t("casesSection.eyebrow")}
              </p>
              <h2 className="text-display-md text-ink mb-5">
                {t("casesSection.title")}
              </h2>
              <p className="text-ink-700 text-lg leading-relaxed">
                {t("casesSection.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {cases.map((c, i) => {
              const CIcon = iconMap[c.icon] || Building2;
              const accents = ["#0B3B2E", "#047857", "#B45309", "#0B3B2E", "#0B3B2E", "#047857"];
              const accent = accents[i % accents.length];
              return (
                <StaggerItem key={c.slug}>
                  <div className="bg-white border border-line rounded-2xl p-7 h-full flex flex-col hover:shadow-card hover:border-leaf/30 transition-colors duration-150">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${accent}15` }}
                      >
                        <CIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="uppercase text-eyebrow" style={{ color: accent }}>
                          {c.sector}
                        </span>
                        <h3 className="text-heading-md text-ink">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5 flex-1">
                      {c.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-ink-700 leading-snug">
                          <CheckCircle2 className="h-4 w-4 text-leaf flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-cream border border-line rounded-xl p-4 mb-5">
                      <Quote className="h-5 w-5 text-leaf mb-2" aria-hidden="true" />
                      <p className="text-xs text-ink-700 italic leading-relaxed mb-2">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                      <p className="text-caption font-semibold text-ink">{c.quoteName}</p>
                      <p className="text-caption text-muted">{c.quoteRole}</p>
                    </div>

                    <Link
                      href={`/cas-usages#${c.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-leaf hover:text-leaf-700 group"
                    >
                      {t("casesSection.readMore")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="relative overflow-hidden bg-ink py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="h-10 w-10 text-leaf-300 mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-display-md text-white mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-ondark-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-base"
                >
                  {t("cta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("cta.cta2")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-ondark">
                    <Shield className="h-4 w-4 text-leaf-300" aria-hidden="true" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
