"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  Monitor,
  ShieldAlert,
  FileBarChart,
  Building2,
  Banknote,
  Lock,
  Cpu,
  Users,
  CheckCircle2,
  X,
  Lightbulb,
} from "lucide-react";

const caseIcons = [Monitor, ShieldAlert, FileBarChart, Building2, Banknote, Lock, Cpu];
const caseColors = [
  "bg-blue-500/10 text-blue-600",
  "bg-red-500/10 text-red-600",
  "bg-emerald-500/10 text-emerald-600",
  "bg-purple-500/10 text-purple-600",
  "bg-amber-500/10 text-amber-600",
  "bg-indigo-500/10 text-indigo-600",
  "bg-teal-500/10 text-teal-600",
];

export default function UseCasesPage() {
  const t = useTranslations("UseCases");
  const ts = useTranslations("Sectors.common");

  const cases = t.raw("cases") as Array<{
    id: string;
    tag: string;
    title: string;
    scenario: string;
    stakeholders: string;
    solution: string;
  }>;

  const comparisonRows = t.raw("unified.comparison.rows") as Array<{
    criteria: string;
    fragmented: string;
    gtc: string;
  }>;

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            {cases.map((useCase, index) => {
              const Icon = caseIcons[index] || Monitor;
              const color = caseColors[index] || caseColors[0];
              return (
                <FadeIn key={useCase.id}>
                  <div
                    id={useCase.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
                            {useCase.tag}
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold text-dark">
                            {useCase.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 space-y-6">
                      {/* Scenario */}
                      <div>
                        <h3 className="text-sm font-semibold text-dark/50 uppercase tracking-wider mb-2">
                          {ts("scenarioLabel")}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {useCase.scenario}
                        </p>
                      </div>

                      {/* Stakeholders */}
                      <div>
                        <h3 className="text-sm font-semibold text-dark/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {ts("stakeholders")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {useCase.stakeholders.split(", ").map((s, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/5 text-secondary text-sm font-medium border border-secondary/10"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Solution */}
                      <div className="bg-accent/5 rounded-xl p-6 border border-accent/10">
                        <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Avec GreenTechCycle
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {useCase.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unified Platform Comparison */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {t("unified.title")}
              </h2>
              <p className="text-xl text-dark/60">
                {t("unified.subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                {/* Table header */}
                <div className="grid grid-cols-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="px-6 py-4 font-semibold text-dark text-sm">
                    {t("unified.comparison.headers.criteria")}
                  </div>
                  <div className="px-6 py-4 font-semibold text-red-600 text-sm text-center bg-red-50/50">
                    {t("unified.comparison.headers.fragmented")}
                  </div>
                  <div className="px-6 py-4 font-semibold text-accent text-sm text-center bg-accent/5">
                    {t("unified.comparison.headers.gtc")}
                  </div>
                </div>

                {/* Table rows */}
                {comparisonRows.map((row, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 ${index < comparisonRows.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="px-6 py-4 text-sm font-medium text-dark">
                      {row.criteria}
                    </div>
                    <div className="px-6 py-4 text-sm text-red-600/80 text-center bg-red-50/30 flex items-center justify-center gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span>{row.fragmented}</span>
                    </div>
                    <div className="px-6 py-4 text-sm text-accent text-center bg-accent/5 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>{row.gtc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-white/80 text-lg mb-8">
                {t("cta.subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                {t("cta.button")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
