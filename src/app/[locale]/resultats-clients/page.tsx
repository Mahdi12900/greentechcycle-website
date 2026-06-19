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
  const metricAccents = ["#10B981", "#0EA5E9", "#F59E0B", "#8B5CF6"];

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.08]">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 text-base"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
                >
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Global metrics */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("metricsSection.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
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
                    <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                        style={{ backgroundColor: `${metricAccents[i]}15` }}
                      >
                        <MIcon className="h-6 w-6" style={{ color: metricAccents[i] }} aria-hidden="true" />
                      </div>
                      <p
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-2 leading-none"
                        style={{ color: metricAccents[i] }}
                      >
                        <CountUp end={parseInt(m.value)} suffix={m.suffix} />
                      </p>
                      <p className="text-gray-700 text-sm font-medium leading-snug">
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
      <section className="py-20 lg:py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("casesSection.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight leading-[1.1]">
                {t("casesSection.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("casesSection.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {cases.map((c, i) => {
              const CIcon = iconMap[c.icon] || Building2;
              const accents = ["#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#14B8A6"];
              const accent = accents[i % accents.length];
              return (
                <StaggerItem key={c.slug}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col hover:shadow-xl hover:border-[#10B981]/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${accent}15` }}
                      >
                        <CIcon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: accent }}>
                          {c.sector}
                        </span>
                        <h3 className="text-base font-bold text-[#0F172A] leading-tight tracking-tight">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5 flex-1">
                      {c.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 leading-snug">
                          <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 mb-5">
                      <Quote className="h-5 w-5 text-[#10B981]/40 mb-2" aria-hidden="true" />
                      <p className="text-xs text-gray-600 italic leading-relaxed mb-2">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                      <p className="text-[11px] font-semibold text-[#0F172A]">{c.quoteName}</p>
                      <p className="text-[10px] text-gray-500">{c.quoteRole}</p>
                    </div>

                    <Link
                      href={`/cas-usages#${c.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#10B981] hover:text-[#0E9F6E] group"
                    >
                      {t("casesSection.readMore")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#0F172A] to-[#1E293B] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="h-10 w-10 text-[#10B981] mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                {t("cta.title")}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 text-base"
                >
                  {t("cta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-base"
                >
                  {t("cta.cta2")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <Shield className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
