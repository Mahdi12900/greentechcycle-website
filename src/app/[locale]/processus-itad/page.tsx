"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { ArrowRight, ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart, Sparkles } from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";

export default function ProcessITADPage() {
  const t = useTranslations("Process");

  const stepsData = t.raw("steps") as Array<{ number: string; title: string; description: string }>;

  const stepIcons = [ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-leaf" />
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-display-lg text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-ondark-muted leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 hidden md:block transform -translate-x-1/2 bg-leaf" />
            {/* Mobile vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 md:hidden bg-leaf" />

            <StaggerContainer className="space-y-12 md:space-y-16">
              {stepsData.map((step, i) => {
                const Icon = stepIcons[i] || ClipboardList;
                return (
                  <StaggerItem key={i}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Mobile: Number circle on left */}
                      <div className="flex-shrink-0 md:hidden relative z-10">
                        <div className="w-12 h-12 rounded-full bg-leaf text-white flex items-center justify-center font-semibold text-lg">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content left/right */}
                      <div className="flex-1 md:pr-12 md:text-right hidden md:block">
                        {i % 2 === 0 ? (
                          <div className="bg-white rounded-2xl p-8 border border-line hover:shadow-card transition-shadow duration-150">
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <h3 className="text-heading-lg text-ink">{step.title}</h3>
                              <div className="w-10 h-10 rounded-lg bg-leaf-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-leaf" />
                              </div>
                            </div>
                            <p className="text-ink-700 leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Desktop: Center number circle */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-14 h-14 rounded-full bg-leaf text-white flex items-center justify-center font-semibold text-lg border-4 border-cream">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content right/left */}
                      <div className="flex-1 md:pl-12 hidden md:block">
                        {i % 2 === 1 ? (
                          <div className="bg-white rounded-2xl p-8 border border-line hover:shadow-card transition-shadow duration-150">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-leaf-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-leaf" />
                              </div>
                              <h3 className="text-heading-lg text-ink">{step.title}</h3>
                            </div>
                            <p className="text-ink-700 leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Mobile: Content */}
                      <div className="flex-1 md:hidden">
                        <div className="bg-white rounded-2xl p-6 border border-line">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-leaf-100 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-4 w-4 text-leaf" />
                            </div>
                            <h3 className="text-heading-md text-ink">{step.title}</h3>
                          </div>
                          <p className="text-ink-700 text-sm leading-relaxed">{step.description}</p>
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

      <RelatedArticles
        categories={["Réglementation", "Sécurité", "Durabilité"]}
        title="Aller plus loin sur l'ITAD"
        subtitle="Conformité DEEE, sécurité des données, économie circulaire : explorez les sujets adjacents à notre processus certifié."
        limit={3}
        tone="light"
      />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-ink py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-leaf text-white mb-6">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="text-display-md text-white mb-5">
                Lancez votre projet ITAD
              </h2>
              <p className="text-ondark-muted text-lg mb-10 leading-relaxed">
                Audit gratuit en 48h : inventaire, estimation de valeur résiduelle et plan de décommissionnement personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-600 text-white font-semibold px-10 py-4 rounded-xl transition-colors duration-150 hover:shadow-card text-lg"
                >
                  Demander un audit gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-4 rounded-xl transition-colors hover:bg-white/10 text-lg"
                >
                  Voir une démo
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
