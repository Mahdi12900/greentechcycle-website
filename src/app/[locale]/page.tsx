"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, CountUp, ScaleIn } from "@/components/motion";
import { ArrowRight, Shield, Truck, FileCheck, BarChart3, ChevronRight, AlertTriangle, Quote, Newspaper, Play } from "lucide-react";

export default function HomePage() {
  const t = useTranslations("Home");

  const steps = t.raw("howItWorks.steps") as Array<{ title: string; desc: string }>;
  const testimonials = t.raw("testimonials.items") as Array<{ quote: string; name: string; role: string; company: string }>;
  const pressOutlets = t.raw("press.outlets") as string[];

  const stepIcons = [FileCheck, Truck, Shield, BarChart3];
  const stepImages = [
    { src: "/images/unsplash/two-engineers.jpg", alt: "Deux ingénieurs collaborant sur l'inventaire des actifs IT" },
    { src: "/images/unsplash/tech-datacenter.jpg", alt: "Technicien en data center pour la collecte sécurisée" },
    { src: "/images/unsplash/hands-electronics.jpg", alt: "Mains sur carte électronique pour l'effacement certifié" },
    { src: "/images/unsplash/corporate-meeting.jpg", alt: "Analyse et reporting ESG/CSRD en équipe" },
  ];

  return (
    <main className="overflow-hidden">
      {/* Urgency Banner — sober navy instead of red-orange */}
      <div className="bg-[#1E40AF] text-white py-3 px-4 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 text-[#F59E0B]" />
          <p>{t("urgency.text")}</p>
        </div>
      </div>

      {/* Hero Section — real team photo + overlay */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <Image
          src="/images/unsplash/team-collab.jpg"
          alt="Équipe GreenTechCycle collaborant sur la gestion responsable des actifs IT"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          style={{ objectPosition: "center 30%" }}
        />
        {/* Darker readable overlay — keeps text legible, lets image breathe */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857]/80 via-[#0F172A]/75 to-[#1E40AF]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_55%)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#047857]/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1E40AF]/20 rounded-full blur-3xl animate-pulse-slower" />

        <div className="container mx-auto px-4 relative z-10 py-24">
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse" />
                Plateforme ITAD certifiée R2v3
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#047857]/40 hover:-translate-y-0.5 text-base md:text-lg"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/plateforme"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:bg-white/10 text-base md:text-lg backdrop-blur-sm"
                >
                  {t("hero.cta2")}
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
              {/* Inline social proof */}
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#047857]" />
                  <span>150+ ETI équipées</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#047857]" />
                  <span>Certificat en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-[#047857]" />
                  <span>45T CO₂ évités en 2025</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section — more spacing + warmer tone */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#047857] uppercase mb-3">
                Le marché ITAD
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">{t("stats.title")}</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#047857] mb-2 tracking-tight">{t("stats.items.stat1.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat1.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#047857] mb-2 tracking-tight">{t("stats.items.stat2.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat2.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#047857] mb-2 tracking-tight">{t("stats.items.stat3.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat3.label")}</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-gradient-to-br from-[#F8FAFC] to-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <p className="text-4xl md:text-5xl font-bold text-[#047857] mb-2 tracking-tight">{t("stats.items.stat4.value")}</p>
                <p className="text-gray-600 text-sm">{t("stats.items.stat4.label")}</p>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works — now with human photos */}
      <section className="py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="text-sm font-semibold tracking-widest text-[#047857] uppercase mb-3">
                Notre méthodologie
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">{t("howItWorks.title")}</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("howItWorks.subtitle")}</p>
            </div>
          </FadeIn>
          <div className="relative max-w-6xl mx-auto">
            <StaggerContainer className="space-y-20">
              {steps.map((step, i) => {
                const Icon = stepIcons[i] || FileCheck;
                const img = stepImages[i] || stepImages[0];
                return (
                  <StaggerItem key={i}>
                    <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/30 to-transparent" />
                        <div className="absolute top-4 left-4 flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-[#047857] font-bold text-lg shadow-lg">
                          {i + 1}
                        </div>
                      </div>
                      <div>
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#047857] text-white shadow-lg shadow-[#047857]/25 mb-5">
                          <Icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-3 tracking-tight">{step.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Video Section — real corporate photo, no Rickroll */}
      <VideoSection />

      {/* Testimonials — with real team photo sidebar */}
      <section className="py-28 bg-white relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold tracking-widest text-[#047857] uppercase mb-3">
                Témoignages
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">{t("testimonials.title")}</h2>
            </div>
          </FadeIn>
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 max-w-6xl mx-auto items-start">
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-8 relative hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                    <Quote className="h-8 w-8 text-[#047857]/30 absolute top-6 right-6" aria-hidden="true" />
                    <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#047857] to-[#047857] flex items-center justify-center text-white font-bold text-lg shadow-md">
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
                  src="/images/unsplash/diverse-team.jpg"
                  alt="Équipe diverse GreenTechCycle"
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#047857]/70 via-[#047857]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-semibold tracking-wide uppercase mb-1 text-[#047857]">Notre équipe</p>
                  <p className="text-lg font-semibold leading-tight">Des experts ITAD à vos côtés</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-24 bg-gradient-to-br from-[#047857] to-[#1E40AF] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-[#047857] uppercase mb-3">
                Notre impact
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t("counters.title")}</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    <CountUp end={parseInt(t("counters.items.companies.value"))} suffix={t("counters.items.companies.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.companies.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    <CountUp end={parseInt(t("counters.items.equipment.value"))} suffix={t("counters.items.equipment.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.equipment.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    <CountUp end={parseInt(t("counters.items.satisfaction.value"))} suffix={t("counters.items.satisfaction.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.satisfaction.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
            <StaggerItem>
              <ScaleIn>
                <div className="text-center">
                  <p className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                    <CountUp end={parseInt(t("counters.items.co2.value"))} suffix={t("counters.items.co2.suffix")} />
                  </p>
                  <p className="text-gray-300 text-sm">{t("counters.items.co2.label")}</p>
                </div>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Press Section — marquee with proper CSS */}
      <section className="py-16 bg-[#F8FAFC] border-y border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Newspaper className="h-5 w-5 text-[#047857]" />
                <h3 className="text-lg font-semibold text-[#0F172A]">{t("press.title")}</h3>
              </div>
            </div>
          </FadeIn>
          <div className="overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex items-center gap-14 animate-marquee whitespace-nowrap">
              {[...pressOutlets, ...pressOutlets].map((outlet, i) => (
                <span key={i} className="text-gray-400 font-bold text-xl tracking-wide uppercase flex-shrink-0">
                  {outlet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — with real human photo */}
      <section className="py-28 relative overflow-hidden">
        <Image
          src="/images/unsplash/server-technician.jpg"
          alt="Technicien GreenTechCycle intervenant sur infrastructure serveur"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/90 via-[#047857]/80 to-[#1E40AF]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.18),_transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">{t("finalCTA.title")}</h2>
              <p className="text-gray-200 text-lg md:text-xl mb-12">{t("finalCTA.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#047857]/40 hover:-translate-y-0.5 text-lg"
                >
                  {t("finalCTA.cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/80 text-white font-semibold px-10 py-5 rounded-xl transition-all duration-300 hover:bg-white/10 text-lg backdrop-blur-sm"
                >
                  Voir la démo interactive
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

/**
 * Video Section — real corporate meeting photo as thumbnail.
 * Clicking goes to /demo (real internal page) instead of embedding an external video.
 */
function VideoSection() {
  return (
    <section className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-[#047857] uppercase mb-3">
              En pratique
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-4 tracking-tight">
              Découvrez GreenTechCycle en action
            </h2>
            <p className="text-gray-600 text-lg">
              Une plateforme complète pour gérer le cycle de vie de vos actifs IT en toute conformité.
            </p>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="max-w-4xl mx-auto">
            <Link
              href="/demo"
              className="group relative block w-full aspect-video rounded-2xl overflow-hidden shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#047857]/40"
              aria-label="Accéder à la démo GreenTechCycle"
            >
              <Image
                src="/images/unsplash/corporate-meeting.jpg"
                alt="Présentation de la plateforme GreenTechCycle en réunion"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/60 via-[#047857]/40 to-[#0F172A]/60 group-hover:from-[#0F172A]/50 group-hover:to-[#0F172A]/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#047857] rounded-full flex items-center justify-center shadow-lg shadow-[#047857]/40 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" aria-hidden="true" />
                </div>
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-semibold tracking-wide uppercase text-[#047857] mb-1">Démo produit</p>
                <p className="text-xl md:text-2xl font-bold">Réservez votre session de 20 minutes</p>
              </div>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
