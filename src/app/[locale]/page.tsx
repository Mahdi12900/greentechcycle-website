"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, CountUp, ScaleIn } from "@/components/motion";
import { ArrowRight, Shield, Truck, FileCheck, BarChart3, Link2, Box, ChevronRight, AlertTriangle, CheckCircle2, Quote, Newspaper, Play, X } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("Home");

  const steps = t.raw("howItWorks.steps") as Array<{ title: string; desc: string }>;
  const testimonials = t.raw("testimonials.items") as Array<{ quote: string; name: string; role: string; company: string }>;
  const pressOutlets = t.raw("press.outlets") as string[];

  const stepIcons = [FileCheck, Truck, Shield, BarChart3];

  return (
    <main className="overflow-hidden">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 animate-pulse" />
          <p>{t("urgency.text")}</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <Image
          src="/images/hero-dashboard.jpg"
          alt="Tableau de bord GreenTechCycle pour la gestion ITAD"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D503C]/90 via-[#1E3A5F]/85 to-[#0F172A]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),_transparent_50%)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#10B981]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1E3A5F]/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <FadeIn>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:bg-white/5"
                >
                  {t("hero.cta2")}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-[#F8FAFC] border-y border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="h-6 w-6 text-[#0D503C]" />
                <span className="text-sm font-medium">{t("trust.text")}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t("stats.title")}</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-3xl md:text-4xl font-bold text-[#0D503C] mb-2">{t("stats.items.stat1.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat1.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-3xl md:text-4xl font-bold text-[#0D503C] mb-2">{t("stats.items.stat2.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat2.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-3xl md:text-4xl font-bold text-[#0D503C] mb-2">{t("stats.items.stat3.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat3.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-3xl md:text-4xl font-bold text-[#0D503C] mb-2">{t("stats.items.stat4.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat4.label")}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t("howItWorks.title")}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
            </div>
          </FadeIn>
          <div className="relative max-w-4xl mx-auto">
            {/* Dashed connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#10B981]/30 hidden md:block" />

            <StaggerContainer className="space-y-12">
              {steps.map((step, i) => {
                const Icon = stepIcons[i] || FileCheck;
                return (
                  <StaggerItem key={i}>
                    <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#0D503C] text-white shadow-lg shadow-[#0D503C]/25">
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        <Icon className="h-7 w-7" />
                      </div>
                      <div className="flex-1" />
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Testimonials */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">{t("testimonials.title")}</h2>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 max-w-6xl mx-auto items-start">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300">
                    <Quote className="h-8 w-8 text-[#10B981]/30 absolute top-6 right-6" aria-hidden="true" />
                    <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0D503C] to-[#10B981] flex items-center justify-center text-white font-bold text-lg">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0F172A]">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.role}, {item.company}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeIn direction="right" className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4]">
                <Image
                  src="/images/team.jpg"
                  alt="L'équipe GreenTechCycle en action"
                  fill
                  className="object-cover"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D503C]/60 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-20 bg-gradient-to-br from-[#0D503C] to-[#1E3A5F]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("counters.title")}</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CountUp end={parseInt(t("counters.items.companies.value"))} suffix={t("counters.items.companies.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.companies.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CountUp end={parseInt(t("counters.items.equipment.value"))} suffix={t("counters.items.equipment.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.equipment.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CountUp end={parseInt(t("counters.items.satisfaction.value"))} suffix={t("counters.items.satisfaction.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.satisfaction.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <CountUp end={parseInt(t("counters.items.co2.value"))} suffix={t("counters.items.co2.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.co2.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 bg-[#F8FAFC] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Newspaper className="h-5 w-5 text-[#0D503C]" />
                <h3 className="text-lg font-semibold text-[#0F172A]">{t("press.title")}</h3>
              </div>
            </div>
          </FadeIn>
          <div className="overflow-hidden">
            <div className="flex items-center gap-12 animate-[scroll_20s_linear_infinite] whitespace-nowrap">
              {[...pressOutlets, ...pressOutlets].map((outlet, i) => (
                <span key={i} className="text-gray-400 font-bold text-xl tracking-wide uppercase flex-shrink-0">
                  {outlet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <Image
          src="/images/meeting.jpg"
          alt="Réunion de planification pour la gestion des actifs IT"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0F172A]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t("finalCTA.title")}</h2>
              <p className="text-gray-300 text-lg mb-10">{t("finalCTA.subtitle")}</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-lg"
              >
                {t("finalCTA.cta")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

/** Embedded YouTube video section with thumbnail + lightbox */
function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Découvrez GreenTechCycle en action
            </h2>
            <p className="text-gray-600 text-lg">
              Une plateforme complète pour gérer le cycle de vie de vos actifs IT en toute conformité.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setOpen(true)}
              className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#10B981]/40"
              aria-label="Lire la vidéo de présentation GreenTechCycle"
            >
              <Image
                src="/images/hero-dashboard.jpg"
                alt="Aperçu vidéo de la plateforme GreenTechCycle"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-[#0F172A]/40 group-hover:bg-[#0F172A]/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg shadow-[#10B981]/40 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" aria-hidden="true" />
                </div>
              </div>
            </button>
          </div>
        </FadeIn>
      </div>

      {/* Video Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Vidéo de présentation"
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Fermer la vidéo"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="Présentation GreenTechCycle"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
}
