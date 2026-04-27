"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Quote,
  ShieldCheck,
  Leaf,
  Users,
  Eye,
  Award,
  CheckCircle2,
} from "lucide-react";

/**
 * /pourquoi-gtc, refonte éditoriale (vague 4)
 * Registre manifeste fondateur. Hero narratif provocant, sections alternées,
 * numéros XXL ghost, prose narrative, citations magazine, conversion verte.
 */
export default function PourquoiGtcPage() {
  const t = useTranslations("WhyGTC");

  type Conviction = {
    slug: string;
    eyebrow: string;
    title: string;
    body: string;
    proofValue: string;
    proofLabel: string;
    proofDetail: string;
    photo: string;
    photoAlt: string;
    bullets: string[];
  };

  const convictions = t.raw("convictions") as Conviction[];

  const commitments = t.raw("commitments.items") as {
    metric: string;
    suffix: string;
    label: string;
    source: string;
  }[];

  const convictionIcons = [Leaf, ShieldCheck, Users, Eye, Award];

  return (
    <main className="overflow-hidden bg-white">
      {/* ═══════════════ Bandeau urgence ═══════════════ */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-center">
          <Leaf className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="leading-snug text-gray-300">{t("urgency.text")}</p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO MANIFESTE) sombre, provocation chiffrée 50 millions de tonnes
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="why-hero"
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
              "radial-gradient(ellipse 60% 50% at 88% 90%, rgba(34,197,94,0.10) 0%, transparent 55%)",
          }}
        />

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
              id="why-hero"
              className="text-white font-black tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              <span
                className="block text-[#10B981] mb-2"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              >
                {t("hero.figure")}
              </span>
              <span className="block">{t("hero.title")}</span>
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.1rem] leading-[1.72] max-w-xl mb-10">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver?offre=audit-decommissionnement"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#manifeste"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-[11px] text-gray-500 italic max-w-xl mb-6">
              {t("hero.source")}
            </p>

            <a
              href="#manifeste"
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

        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/team-workshop.jpg"
            alt="Équipe GreenTechCycle en atelier de tri et reconditionnement, lumière naturelle"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 (MANIFESTE PROSE) fond clair
         ════════════════════════════════════════════════════════════════ */}
      <div id="expertise" aria-hidden="true" className="sr-only" />
      <section className="py-24 lg:py-28 bg-white" id="manifeste">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("manifesto.eyebrow")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight leading-[1.05] mb-8"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)" }}
              >
                {t("manifesto.title")}
              </h2>
              <div className="space-y-5">
                <p className="text-gray-700 text-lg leading-[1.78]">
                  {t("manifesto.body1")}
                </p>
                <p className="text-gray-700 text-lg leading-[1.78]">
                  {t("manifesto.body2")}
                </p>
                <p className="text-gray-700 text-lg leading-[1.78]">
                  {t("manifesto.body3")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 (LE MOT DU FONDATEUR) section split sombre, photo + citation magazine
         ════════════════════════════════════════════════════════════════ */}
      <section id="fondateur" className="relative w-full overflow-hidden bg-[#0F172A]">
        <div className="flex flex-col lg:flex-row min-h-[80vh]">
          <div className="relative w-full lg:w-[42%] min-h-[50vw] lg:min-h-0 overflow-hidden flex-shrink-0">
            <Image
              src="/photos/founder-portrait.jpg"
              alt="Portrait éditorial du fondateur de GreenTechCycle"
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/70" />
            <div
              className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
              style={{
                fontSize: "clamp(8rem, 22vw, 18rem)",
                color: "rgba(255,255,255,0.04)",
                right: "0.5rem",
                bottom: "-0.1em",
              }}
              aria-hidden="true"
            >
              00
            </div>
          </div>

          <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20 text-white">
            <div className="max-w-xl w-full">
              <FadeIn>
                <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-4">
                  {t("founder.eyebrow")}
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-8">
                  {t("founder.title")}
                </h2>
                <Quote
                  className="h-10 w-10 text-[#10B981] mb-5 opacity-80"
                  aria-hidden="true"
                />
                <blockquote className="text-xl lg:text-2xl text-white leading-[1.45] font-medium mb-8">
                  &ldquo;{t("founder.quote")}&rdquo;
                </blockquote>
                <div className="border-l-4 border-[#10B981] pl-5 mb-6">
                  <p className="font-bold text-white text-base leading-tight">
                    {t("founder.name")}
                  </p>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {t("founder.role")}
                  </p>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {t("founder.bio")}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <div id="ethique" aria-hidden="true" className="sr-only" />
      {/* ════════════════════════════════════════════════════════════════
          S4 (LES 5 CONVICTIONS) sections alternées
         ════════════════════════════════════════════════════════════════ */}
      {convictions.map((c, index) => {
        const photoOnLeft = index % 2 === 0;
        const isDark = index === 2;
        const number = String(index + 1).padStart(2, "0");
        const Icon = convictionIcons[index] ?? Leaf;
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
        if (isDark) bg = "bg-[#022C22] text-white";
        else if (index % 2 === 1) bg = "bg-[#F8FAFC]";

        const textColor = isDark ? "text-white" : "text-[#0F172A]";
        const subText = isDark ? "text-gray-300" : "text-gray-600";
        const border = isDark ? "border-white/10" : "border-gray-100";

        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`relative w-full overflow-hidden ${bg}`}
            aria-labelledby={`conv-${c.slug}`}
          >
            <div
              className={`flex flex-col lg:flex-row min-h-[78vh] ${
                !photoOnLeft ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="relative w-full lg:w-[48%] min-h-[56vw] lg:min-h-0 overflow-hidden flex-shrink-0">
                <Image
                  src={c.photo}
                  alt={c.photoAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div
                  className={`absolute inset-0 ${
                    isDark
                      ? photoOnLeft
                        ? "bg-gradient-to-r from-transparent via-transparent to-[#022C22]/70"
                        : "bg-gradient-to-l from-transparent via-transparent to-[#022C22]/70"
                      : photoOnLeft
                      ? "bg-gradient-to-r from-transparent to-white/15"
                      : "bg-gradient-to-l from-transparent to-white/15"
                  }`}
                />
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
                    {c.eyebrow}
                  </span>
                </div>
              </div>

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
                      id={`conv-${c.slug}`}
                      className={`text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-5 ${textColor}`}
                    >
                      {c.title}
                    </h2>

                    <p
                      className={`text-[1.0rem] lg:text-[1.05rem] leading-[1.78] mb-8 ${subText}`}
                    >
                      {c.body}
                    </p>

                    <div className={`pb-6 mb-6 border-b ${border}`}>
                      <p
                        className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums mb-1"
                        style={{ color: accent }}
                      >
                        {c.proofValue}
                      </p>
                      <p
                        className={`text-[12px] font-semibold uppercase tracking-wider ${
                          isDark ? "text-gray-300" : "text-[#0F172A]"
                        }`}
                      >
                        {c.proofLabel}
                      </p>
                      <p
                        className={`text-[11px] mt-1 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {c.proofDetail}
                      </p>
                    </div>

                    <ul className="space-y-2.5">
                      {c.bullets.map((b, i) => (
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
          S5 (ENGAGEMENTS CHIFFRÉS) bandeau preuves
         ════════════════════════════════════════════════════════════════ */}
      <section id="engagement" className="bg-[#0F172A] relative overflow-hidden border-t border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(16,185,129,0.09) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-20">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#10B981] uppercase mb-3">
                {t("commitments.eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                {t("commitments.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {commitments.map((c, i) => {
              const accents = [
                "#10B981",
                "#0EA5E9",
                "#F59E0B",
                "#10B981",
                "#0EA5E9",
                "#F59E0B",
              ];
              const accent = accents[i % accents.length];
              const numericValue = parseFloat(c.metric.replace(/[^0-9.]/g, ""));
              const showCount = !Number.isNaN(numericValue) && numericValue > 0;
              return (
                <StaggerItem key={i}>
                  <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 backdrop-blur-sm hover:bg-white/[0.07] transition-all">
                    <p
                      className="font-black tracking-tighter leading-none mb-3 tabular-nums"
                      style={{
                        fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                        color: accent,
                      }}
                    >
                      {showCount ? (
                        <>
                          <CountUp
                            end={numericValue}
                            decimals={c.metric.includes(",") || c.metric.includes(".") ? 1 : 0}
                          />
                          <span className="text-base ml-1 font-semibold opacity-80">
                            {c.suffix}
                          </span>
                        </>
                      ) : (
                        c.metric
                      )}
                    </p>
                    <p className="text-sm text-gray-300 leading-snug mb-3">
                      {c.label}
                    </p>
                    <p className="text-[10px] text-gray-500 italic leading-snug">
                      {c.source}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (CITATION MAGAZINE) fond sombre intercalé
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-28 bg-[#022C22] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/photos/diverse-team.jpg"
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
          S7, CONVERSION FOND VERT PLEIN
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
                  href="/reserver?offre=audit-decommissionnement"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] hover:bg-[#F8FAFC] font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 text-sm"
                >
                  {t("conversion.cta1")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold px-7 py-4 rounded-xl transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  {t("conversion.cta2")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
