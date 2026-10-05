"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CountUp } from "@/components/motion";
import { KPIS } from "@/content/kpis";
import ClientWordmarks from "@/components/ClientWordmarks";
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

  // Chiffres globaux : registre unique src/content/kpis.ts (plus de montant en euros)
  const lang = useLocale() === "en" ? "en" : "fr";
  const globalMetrics: Metric[] = (["clients", "assets", "reuse", "carbon"] as const).map((id) => ({
    value: String(KPIS[id].value),
    suffix: KPIS[id].unit[lang],
    label: `${KPIS[id].label[lang]} · ${KPIS[id].period[lang]}`,
  }));
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

  return (
    <div className="overflow-hidden bg-bg-card">
      {/* Hero */}
      <section className="bg-bg-card py-16 text-fg lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-4xl ">
              <p className="text-fg-muted uppercase mb-4 text-eyebrow">
                {t("hero.eyebrow")}
              </p>
              <h1 className="text-display-lg text-fg mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-fg-muted mb-10 max-w-3xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <Link
                  href="/demo"
                  className="inline-flex items-center  gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:border-track-strong hover: text-base"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center  gap-2 bg-white/10 hover:bg-white/20 text-fg border border-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("hero.cta2")}
                </Link>
              </div>
            </div>
          </div>
          {/* Clients (registre src/content/clients.ts) — non rattachés aux résultats anonymisés */}
          <ClientWordmarks variant="compact" className="mt-12 border-t border-track pt-8" />
        </div>
      </section>

      {/* Global metrics */}
      <section className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-fg-muted uppercase mb-3 text-eyebrow">
                {t("metricsSection.eyebrow")}
              </p>
              <h2 className="text-display-md text-fg">
                {t("metricsSection.title")}
              </h2>
            </div>
          </div>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {globalMetrics.map((m, i) => {
              const MIcon = metricIcons[i] || BarChart3;
              return (
                <div key={i} className="reveal">
                  <div className="reveal-scale">
                    <div className="border border-track rounded-2xl p-7 h-full flex flex-col items-center text-center hover:border-track-strong transition-colors duration-150 bg-bg-card">
                      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                        <MIcon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <p className="mb-2 text-stat text-emerald">
                        <CountUp end={parseInt(m.value)} suffix={m.suffix} />
                      </p>
                      <p className="text-fg-strong text-sm font-medium leading-snug">
                        {m.label}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case results grid */}
      <section className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="max-w-3xl mb-14">
              <p className="text-fg-muted uppercase mb-3 text-eyebrow">
                {t("casesSection.eyebrow")}
              </p>
              <h2 className="text-display-md text-fg mb-5">
                {t("casesSection.title")}
              </h2>
              <p className="text-fg-strong text-lg leading-relaxed">
                {t("casesSection.subtitle")}
              </p>
            </div>
          </div>

          <div className="reveal-stagger grid md:grid-cols-2 gap-6 lg:gap-8">
            {cases.map((c, i) => {
              const CIcon = iconMap[c.icon] || Building2;
              return (
                <div key={c.slug} className="reveal">
                  <div className="bg-bg-card border border-track rounded-2xl p-7 h-full flex flex-col hover:border-track-strong hover:border-emerald/30 transition-colors duration-150">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                        <CIcon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div>
                        <span className="uppercase text-eyebrow text-fg-muted">
                          {c.sector}
                        </span>
                        <h3 className="text-heading-md text-fg">
                          {c.title}
                        </h3>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-5 flex-1">
                      {c.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-fg-strong leading-snug">
                          <CheckCircle2 className="h-4 w-4 text-emerald flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-bg-card border border-track rounded-xl p-4 mb-5">
                      <Quote className="h-5 w-5 text-emerald mb-2" aria-hidden="true" />
                      <p className="text-xs text-fg-strong italic leading-relaxed mb-2">
                        &ldquo;{c.quote}&rdquo;
                      </p>
                      <p className="text-caption font-semibold text-fg">{c.quoteName}</p>
                      <p className="text-caption text-fg-muted">{c.quoteRole}</p>
                    </div>

                    <Link
                      href={`/cas-usages#${c.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald hover:text-emerald-hover group"
                    >
                      {t("casesSection.readMore")}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="relative overflow-hidden bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-4xl mx-auto text-center">
              <TrendingUp className="h-10 w-10 text-emerald mx-auto mb-6" aria-hidden="true" />
              <h2 className="text-display-md text-fg mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-fg-muted text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("cta.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:border-track-strong hover: text-base"
                >
                  {t("cta.cta1")}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-fg border border-white/20 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-base"
                >
                  {t("cta.cta2")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {trustBadges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-fg">
                    <Shield className="h-4 w-4 text-emerald" aria-hidden="true" />
                    <span className="font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
