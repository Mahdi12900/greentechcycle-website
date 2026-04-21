"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { ArrowRight, ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart } from "lucide-react";

export default function ProcessITADPage() {
  const t = useTranslations("Process");

  const stepsData = t.raw("steps") as Array<{ number: string; title: string; description: string }>;

  const stepIcons = [ClipboardList, Truck, ScanLine, HardDrive, RefreshCcw, Recycle, FileBarChart];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D503C] via-[#1E3A5F] to-[#0F172A]" />
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
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] via-[#0D503C] to-[#1E3A5F] hidden md:block transform -translate-x-1/2" />
            {/* Mobile vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] via-[#0D503C] to-[#1E3A5F] md:hidden" />

            <StaggerContainer className="space-y-12 md:space-y-16">
              {stepsData.map((step, i) => {
                const Icon = stepIcons[i] || ClipboardList;
                return (
                  <StaggerItem key={i}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Mobile: Number circle on left */}
                      <div className="flex-shrink-0 md:hidden relative z-10">
                        <div className="w-12 h-12 rounded-full bg-[#0D503C] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#0D503C]/20">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content left/right */}
                      <div className="flex-1 md:pr-12 md:text-right hidden md:block">
                        {i % 2 === 0 ? (
                          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center justify-end gap-3 mb-4">
                              <h3 className="text-xl font-bold text-[#0F172A]">{step.title}</h3>
                              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-[#10B981]" />
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
                        <div className="w-14 h-14 rounded-full bg-[#0D503C] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#0D503C]/25 border-4 border-[#F8FAFC]">
                          {step.number}
                        </div>
                      </div>

                      {/* Desktop: Content right/left */}
                      <div className="flex-1 md:pl-12 hidden md:block">
                        {i % 2 === 1 ? (
                          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                                <Icon className="h-5 w-5 text-[#10B981]" />
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
                            <div className="w-9 h-9 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                              <Icon className="h-4 w-4 text-[#10B981]" />
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

      {/* CTA Section */}
      <section className="py-24 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("hero.title")}
              </h2>
              <p className="text-gray-400 text-lg mb-10">
                {t("hero.subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-lg"
              >
                Demander un audit gratuit
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
