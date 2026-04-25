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
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857] via-[#1E40AF] to-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#047857] via-[#047857] to-[#1E40AF] hidden md:block transform -translate-x-1/2" />
            {/* Mobile vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#047857] via-[#047857] to-[#1E40AF] md:hidden" />

            <StaggerContainer className="space-y-12 md:space-y-16">
              {stepsData.map((step, i) => {
                const Icon = stepIcons[i] || ClipboardList;
                return (
                  <StaggerItem key={i}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Mobile: Number circle on left */}
                      <div className="flex-shrink-0 md:hidden relative z-10">
                        <div className="w-12 h-12 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#047857]/20">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content left/right */}
                      <div className="flex-1 md:pr-12 md:text-right hidden md:block">
                        {i % 2 === 0 ? (
                          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <h3 className="text-xl font-bold text-[#0F172A]">{step.title}</h3>
                              <div className="w-10 h-10 rounded-lg bg-[#047857]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-[#047857]" />
                              </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Desktop: Center number circle */}
                      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                        <div className="w-14 h-14 rounded-full bg-[#047857] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#047857]/25 border-4 border-[#F8FAFC]">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content right/left */}
                      <div className="flex-1 md:pl-12 hidden md:block">
                        {i % 2 === 1 ? (
                          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-[#047857]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-[#047857]" />
                              </div>
                              <h3 className="text-xl font-bold text-[#0F172A]">{step.title}</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        ) : (
                          <div />
                        )}
                      </div>

                      {/* Mobile: Content */}
                      <div className="flex-1 md:hidden">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-[#047857]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-4 w-4 text-[#047857]" />
                            </div>
                            <h3 className="text-lg font-bold text-[#0F172A]">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
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
      <section className="py-20 md:py-24 bg-gradient-to-br from-[#0F172A] via-primary to-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08),_transparent_70%)]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-3xl animate-pulse-slower" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-white mb-6 shadow-lg shadow-accent/30">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
                Lancez votre projet ITAD
              </h2>
              <p className="text-gray-300 text-lg mb-10 leading-relaxed">
                Audit gratuit en 48h : inventaire, estimation de valeur résiduelle et plan de décommissionnement personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-600 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 text-lg"
                >
                  Demander un audit gratuit
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-4 rounded-xl transition-all hover:bg-white/10 backdrop-blur-sm text-lg"
                >
                  Voir une démo
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
