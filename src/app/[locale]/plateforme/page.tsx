"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  ChevronRight,
  ShieldCheck,
  FileCheck,
  Quote,
  ScanLine,
  Database,
  Eraser,
  Send,
  Recycle,
  BarChart3,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

/**
 * /plateforme, refonte éditoriale (vague 4)
 * Storytelling parcours : ingestion → audit → décision → traçabilité → restitution.
 * Pas de grille de modules. Sections pleine largeur alternées, numéros XXL ghost.
 */
export default function PlateformePage() {
  const t = useTranslations("Platform");
  const locale = useLocale();
  const isEn = locale === "en";

  type Chapter = {
    slug: string;
    eyebrow: string;
    title: string;
    body: string;
    photo: string;
    photoAlt: string;
    proofLabel: string;
    proofValue: string;
    proofDetail: string;
    bullets: string[];
  };

  const chapters = t.raw("chapters") as Chapter[];

  const heroProofs = t.raw("hero.proofs") as {
    value: string;
    unit: string;
    label: string;
    color: string;
  }[];

  const offers = t.raw("offers.items") as {
    slug: string;
    name: string;
    pitch: string;
    duration: string;
    price: string;
  }[];

  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  const chapterIcons = [ScanLine, Database, Eraser, Send, BarChart3];

  return (
    <main className="overflow-hidden bg-white">
      {/* ═══════════════ Bandeau urgence ═══════════════ */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-center">
          <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="leading-snug text-gray-300">{t("urgency.text")}</p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO ÉDITORIAL) split sombre, photo plateau audit à droite
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="plateforme-hero"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 12% 10%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 88% 90%, rgba(14,165,233,0.12) 0%, transparent 55%)",
          }}
        />

        {/* Colonne contenu */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("hero.eyebrow")}
              </span>
            </div>

            <h1
              id="plateforme-hero"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {t("hero.title")}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.1rem] leading-[1.72] max-w-xl mb-10">
              {t("hero.subtitle")}
            </p>

            {/* Bandeau preuves chiffrées */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/10">
              {heroProofs.map((p, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums"
                    style={{ color: p.color }}
                  >
                    {p.value}
                    {p.unit && (
                      <span className="text-base ml-1 font-semibold opacity-80">
                        {p.unit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver?offre=demo-plateforme"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#parcours"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <a
              href="#parcours"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
              {t("hero.scrollLabel")}
            </a>
          </FadeIn>
        </div>

        {/* Colonne photo */}
        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/hp-dsi-strategy.jpg"
            alt="Tableau de bord GreenTechCycle consulté par une direction informatique en plein arbitrage de fin de vie d'actifs"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />

          {/* Carte preuve flottante */}
          <div className="absolute bottom-8 right-5 sm:right-8 max-w-[290px] bg-white/96 backdrop-blur-lg rounded-2xl p-5 shadow-2xl ring-1 ring-gray-100 hidden sm:block">
            <Quote className="h-6 w-6 text-[#0EA5E9] mb-3" aria-hidden="true" />
            <p className="text-[12px] text-[#0F172A] leading-snug font-medium mb-3">
              &ldquo;{t("hero.floatQuote")}&rdquo;
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0EA5E9]/12 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0F172A] leading-none">
                  {t("hero.floatName")}
                </p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                  {t("hero.floatRole")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2, PROMESSE NARRATIVE (transition vers le parcours)
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white" id="parcours">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("promise.eyebrow")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)" }}
              >
                {t("promise.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-[1.78] mb-4">
                {t("promise.body1")}
              </p>
              <p className="text-gray-600 text-lg leading-[1.78] mb-5">
                {t("promise.body2")}
              </p>
              <p className="text-base text-[#0F172A] font-medium leading-[1.78] max-w-2xl">
                {isEn ? (
                  <>
                    The GTC SaaS platform is accessible{" "}
                    <strong className="text-[#10B981]">starting at €2,500 HT/month</strong>{" "}
                    (base 500 devices, one module). Pricing adapts to your fleet, modules and maturity level.{" "}
                    <Link href="/tarifs" className="underline underline-offset-4 text-[#10B981] hover:text-[#0E9F6E] transition-colors font-semibold">
                      View pricing
                    </Link>{" "}
                    - or start with a{" "}
                    <Link href="/tarifs#pilote" className="underline underline-offset-4 text-[#10B981] hover:text-[#0E9F6E] transition-colors font-semibold">
                      3-day Pilot at €2,900 ex-VAT
                    </Link>
                    , refunded on Year 1 if signed within 90 days.
                  </>
                ) : (
                  <>
                    La plateforme GTC SaaS est accessible{" "}
                    <strong className="text-[#10B981]">à partir de 2 500 € HT/mois</strong>{" "}
                    (base 500 postes, un module). La tarification s&apos;affine selon votre parc, vos modules et votre maturité.{" "}
                    <Link href="/tarifs" className="underline underline-offset-4 text-[#10B981] hover:text-[#0E9F6E] transition-colors font-semibold">
                      Voir les tarifs
                    </Link>{" "}
                    - ou démarrez par un{" "}
                    <Link href="/tarifs#pilote" className="underline underline-offset-4 text-[#10B981] hover:text-[#0E9F6E] transition-colors font-semibold">
                      Pilote 3 j à 2 900 € HT
                    </Link>
                    , remboursé sur la 1re année si signature sous 90 j.
                  </>
                )}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3, LES 5 CHAPITRES DU PARCOURS
          Sections pleine largeur, alternance gauche/droite, alternance fond, numéro XXL ghost
         ════════════════════════════════════════════════════════════════ */}
      {chapters.map((chap, index) => {
        const photoOnLeft = index % 2 === 0;
        const isDark = index === 1 || index === 3;
        const number = String(index + 1).padStart(2, "0");
        const Icon = chapterIcons[index] ?? ScanLine;
        const accent =
          index === 0
            ? "#10B981"
            : index === 1
            ? "#0EA5E9"
            : index === 2
            ? "#F59E0B"
            : index === 3
            ? "#10B981"
            : "#0EA5E9";

        let bg = "bg-white";
        if (isDark) bg = "bg-[#0F172A]";
        else if (index % 2 === 1) bg = "bg-[#F8FAFC]";

        const textColor = isDark ? "text-white" : "text-[#0F172A]";
        const subText = isDark ? "text-gray-300" : "text-gray-600";
        const border = isDark ? "border-white/10" : "border-gray-100";

        return (
          <section
            key={chap.slug}
            id={chap.slug}
            className={`relative w-full overflow-hidden ${bg}`}
            aria-labelledby={`chap-${chap.slug}`}
          >
            <div
              className={`flex flex-col lg:flex-row min-h-[80vh] ${
                !photoOnLeft ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="relative w-full lg:w-[48%] min-h-[56vw] lg:min-h-0 overflow-hidden flex-shrink-0">
                <Image
                  src={chap.photo}
                  alt={chap.photoAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? photoOnLeft
                        ? "bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/70"
                        : "bg-gradient-to-l from-transparent via-transparent to-[#0F172A]/70"
                      : photoOnLeft
                      ? "bg-gradient-to-r from-transparent to-white/15"
                      : "bg-gradient-to-l from-transparent to-white/15"
                  }`}
                />
                {/* Numéro fantôme XXL */}
                <div
                  className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
                  style={{
                    fontSize: "clamp(8rem, 22vw, 18rem)",
                    color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
                    right: photoOnLeft ? "0.5rem" : "auto",
                    left: photoOnLeft ? "auto" : "0.5rem",
                    bottom: "-0.1em",
                  }}
                  aria-hidden="true"
                >
                  {number}
                </div>
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-sm shadow-lg">
                  <Icon className="h-3.5 w-3.5 text-[#0F172A]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-[#0F172A] tracking-wide uppercase">
                    {chap.eyebrow}
                  </span>
                </div>
              </div>

              {/* Contenu */}
              <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20">
                <div
                  className="absolute top-0 left-0 w-[3px] h-full"
                  style={{ backgroundColor: accent }}
                  aria-hidden="true"
                />
                <div className="max-w-xl w-full">
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="text-5xl lg:text-6xl font-black leading-none tracking-tighter tabular-nums"
                        style={{ color: accent }}
                      >
                        {number}
                      </span>
                      <span
                        className="flex-1 h-[1px] opacity-25"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      />
                    </div>

                    <h2
                      id={`chap-${chap.slug}`}
                      className={`text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-5 ${textColor}`}
                    >
                      {chap.title}
                    </h2>

                    <p
                      className={`text-[1.0rem] lg:text-[1.05rem] leading-[1.78] mb-8 ${subText}`}
                    >
                      {chap.body}
                    </p>

                    <div className={`pb-6 mb-6 border-b ${border}`}>
                      <p
                        className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums mb-1"
                        style={{ color: accent }}
                      >
                        {chap.proofValue}
                      </p>
                      <p
                        className={`text-[12px] font-semibold uppercase tracking-wider ${
                          isDark ? "text-gray-300" : "text-[#0F172A]"
                        }`}
                      >
                        {chap.proofLabel}
                      </p>
                      <p
                        className={`text-[11px] mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {chap.proofDetail}
                      </p>
                    </div>

                    <ul className="space-y-2.5">
                      {chap.bullets.map((b, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 text-[14px] leading-relaxed ${subText}`}
                        >
                          <CheckCircle2
                            className="h-4 w-4 flex-shrink-0 mt-0.5"
                            style={{ color: accent }}
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ════════════════════════════════════════════════════════════════
          S4 (CITATION MAGAZINE) fond sombre intercalé
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-[#022C22] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/photos/hp-atelier-itad.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#022C22]/95 via-[#022C22]/92 to-[#0F172A]/95" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <Quote
                className="h-12 w-12 text-[#10B981] mb-6 opacity-80"
                aria-hidden="true"
              />
              <blockquote
                className="text-white font-medium tracking-tight leading-[1.3] mb-8"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}
              >
                &ldquo;{t("editorialQuote.quote")}&rdquo;
              </blockquote>
              <div className="border-l-4 border-[#10B981] pl-5">
                <p className="font-bold text-white text-base leading-tight">
                  {t("editorialQuote.name")}
                </p>
                <p className="text-gray-400 text-sm mt-0.5">
                  {t("editorialQuote.role")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 (CHIFFRES D'EXPLOITATION) bandeau preuves
         ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0F172A] relative overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.09) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-20">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
            {(["assets", "value", "carbon", "audit"] as const).map((k, i) => {
              const accents = ["#10B981", "#0EA5E9", "#F59E0B", "#10B981"];
              const accent = accents[i] ?? "#10B981";
              const value = parseInt(t(`liveProofs.${k}.value`));
              return (
                <StaggerItem key={k}>
                  <div className="px-5 lg:px-10 py-8 lg:py-10 text-center flex flex-col items-center">
                    <p
                      className="font-black tracking-tighter leading-none mb-3 tabular-nums"
                      style={{
                        fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                        color: accent,
                      }}
                    >
                      <CountUp end={value} suffix={t(`liveProofs.${k}.suffix`)} />
                    </p>
                    <p className="text-[13px] font-medium text-gray-400 leading-snug max-w-[18ch] mx-auto mb-1.5">
                      {t(`liveProofs.${k}.label`)}
                    </p>
                    <p className="text-[10px] text-gray-600 italic">
                      {t(`liveProofs.${k}.source`)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (OFFRES D'ENTRÉE) 3 packs avec bouton Réserver
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("offers.eyebrow")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                {t("offers.title")}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {t("offers.subtitle")}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl">
            {offers.map((o) => (
              <StaggerItem key={o.slug}>
                <div className="relative bg-white border border-gray-100 rounded-2xl p-7 lg:p-8 h-full flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-5">
                    <CalendarCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                    <span className="text-[11px] font-semibold text-[#10B981] tracking-wider uppercase">
                      {o.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-tight tracking-tight">
                    {o.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                    {o.pitch}
                  </p>
                  <div className="border-t border-gray-100 pt-5 mb-5">
                    <p className="text-2xl font-black text-[#0F172A] tracking-tight leading-none">
                      {o.price}
                    </p>
                  </div>
                  <Link
                    href={`/reserver?offre=${o.slug}`}
                    className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-5 py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25 text-sm"
                  >
                    {t("offers.reserveLabel")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S7, FAQ COURTE
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("faq.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.1]">
                {t("faq.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
            {faqItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="bg-[#F8FAFC] border border-gray-100 rounded-2xl p-7 h-full hover:border-[#10B981]/40 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#10B981]/10 text-[#10B981] text-sm font-bold">
                      Q{i + 1}
                    </span>
                    <h3 className="font-bold text-[#0F172A] text-base leading-tight tracking-tight">
                      {item.q}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed pl-11">
                    {item.a}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S8, CONVERSION FOND VERT PLEIN
         ════════════════════════════════════════════════════════════════ */}
      <section className="py-20 lg:py-24 bg-[#10B981] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),_transparent_60%)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <p className="text-sm font-semibold tracking-[0.18em] text-white/80 uppercase mb-4">
                {t("conversion.eyebrow")}
              </p>
              <h2
                className="font-bold tracking-tight leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
              >
                {t("conversion.title")}
              </h2>
              <p className="text-white/85 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {t("conversion.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/reserver?offre=demo-plateforme"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] hover:bg-[#F8FAFC] font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
                >
                  {t("conversion.cta1")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact?offre=plateforme-info"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  {t("conversion.cta2")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S9, CTA FINAL avec photo atelier
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <Image
          src="/photos/hp-audit-signature.jpg"
          alt="Signature d'un certificat d'effacement après audit chez GreenTechCycle"
          fill
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/95 via-[#022C22]/85 to-[#0F172A]/95" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center text-white">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                {t("finalCta.eyebrow")}
              </p>
              <h2
                className="font-bold tracking-tight leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                {t("finalCta.title")}
              </h2>
              <p className="text-gray-200 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("finalCta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
                <Link
                  href="/reserver?offre=audit-decommissionnement"
                  className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/30 hover:-translate-y-0.5 text-sm"
                >
                  {t("finalCta.cta1")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-semibold px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  {t("finalCta.cta2")}
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-white/80 pt-6 border-t border-white/10">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  {t("finalCta.trust1")}
                </span>
                <span className="hidden sm:inline w-px h-3 bg-white/20" />
                <span className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  {t("finalCta.trust2")}
                </span>
                <span className="hidden sm:inline w-px h-3 bg-white/20" />
                <span className="flex items-center gap-2">
                  <Recycle className="h-4 w-4 text-[#10B981]" aria-hidden="true" />
                  {t("finalCta.trust3")}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
