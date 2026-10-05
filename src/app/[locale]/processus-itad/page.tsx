"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { ArrowRight, ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart, Sparkles } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export default function ProcessITADPage() {
  const t = useTranslations("Process");
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const stepsData = t.raw("steps") as Array<{ number: string; title: string; description: string }>;

  const stepIcons = [ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-bg-card py-12 text-fg lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-3xl ">
              <h1 className="text-display-lg text-fg mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-fg-muted leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-bg-card py-12 lg:py-16" aria-labelledby="process-steps-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <h2 id="process-steps-title" className="sr-only">{tx("Les étapes du processus ITAD", "The ITAD process steps")}</h2>
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block transform -translate-x-1/2 bg-emerald" />
            {/* Mobile vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden bg-emerald" />

            <div className="reveal-stagger space-y-12 md:space-y-16">
              {stepsData.map((step, i) => {
                const Icon = stepIcons[i] || ClipboardList;
                return (
                  <div key={i} className="reveal">
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Mobile: Number circle on left */}
                      <div className="flex-shrink-0 md:hidden relative z-10">
                        <div className="w-12 h-12 rounded-full bg-emerald text-bg flex items-center justify-center font-semibold text-lg">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content left/right */}
                      <div className="flex-1 md:pr-12 md:text-right hidden md:block">
                        {i % 2 === 0 ? (
                          <div className="bg-bg-card rounded-2xl p-8 border border-track hover:border-track-strong transition-shadow duration-150">
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <h3 className="text-heading-lg text-fg">{step.title}</h3>
                              <div className="w-10 h-10 rounded-lg bg-emerald-dim flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-emerald" />
                              </div>
                            </div>
                            <p className="text-fg-strong leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Desktop: Center number circle */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-14 h-14 rounded-full bg-emerald text-bg flex items-center justify-center font-semibold text-lg border-4 border-track">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content right/left */}
                      <div className="flex-1 md:pl-12 hidden md:block">
                        {i % 2 === 1 ? (
                          <div className="bg-bg-card rounded-2xl p-8 border border-track hover:border-track-strong transition-shadow duration-150">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-emerald-dim flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-emerald" />
                              </div>
                              <h3 className="text-heading-lg text-fg">{step.title}</h3>
                            </div>
                            <p className="text-fg-strong leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Mobile: Content */}
                      <div className="flex-1 md:hidden">
                        <div className="bg-bg-card rounded-2xl p-6 border border-track">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-emerald-dim flex items-center justify-center flex-shrink-0">
                              <Icon className="h-4 w-4 text-emerald" />
                            </div>
                            <h3 className="text-heading-md text-fg">{step.title}</h3>
                          </div>
                          <p className="text-fg-strong text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles
        categories={["Réglementation", "Sécurité", "Durabilité"]}
        title={{ fr: "Aller plus loin sur l'ITAD", en: "Go further on ITAD" }}
        subtitle={{ fr: "Conformité DEEE, sécurité des données, économie circulaire : explorez les sujets adjacents à notre processus.", en: "WEEE compliance, data security, circular economy: explore the topics around our process." }}
        limit={3}
        tone="light"
      />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald text-bg mb-6">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="text-display-md text-fg mb-5">
                {tx("Lancez votre projet ITAD", "Launch your ITAD project")}
              </h2>
              <p className="text-fg-muted text-lg mb-10 leading-relaxed">
                {tx(
                  "Audit gratuit en 48h : inventaire, estimation de valeur résiduelle et plan de décommissionnement personnalisé.",
                  "Free audit within 48h: inventory, residual-value estimate and a tailored decommissioning plan."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-10 py-4 rounded-xl transition-colors duration-150 hover:border-track-strong text-lg"
                >
                  {tx("Demander un audit gratuit", "Request a free audit")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-fg font-semibold px-10 py-4 rounded-xl transition-colors hover:bg-white/10 text-lg"
                >
                  {tx("Voir une démo", "See a demo")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
