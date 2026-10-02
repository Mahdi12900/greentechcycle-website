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
      <div className="bg-forest-900 text-white py-3 px-4 border-b border-ondark-line">
        <div className="mx-auto max-w-site flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-center">
          <Leaf className="h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
          <p className="leading-snug text-ondark-muted">{t("urgency.text")}</p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO MANIFESTE) sombre, provocation chiffrée 50 millions de tonnes
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-forest-900"
        aria-labelledby="why-hero"
      >

        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-muted uppercase text-eyebrow">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-leaf"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {t("hero.eyebrow")}
              </span>
            </div>

            <h1
              id="why-hero"
              className="text-display-lg text-white mb-6"
            >
              <span
                className="block text-leaf mb-2"
                style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
              >
                {t("hero.figure")}
              </span>
              <span className="block">{t("hero.title")}</span>
            </h1>

            <p className="text-ondark-muted text-base lg:text-body-lg max-w-xl mb-10">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver?offre=audit-decommissionnement"
                className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-7 py-4 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-sm"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="#manifeste"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-colors duration-150 text-sm"
              >
                {t("hero.cta2")}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <p className="text-caption text-muted italic max-w-xl mb-6">
              {t("hero.source")}
            </p>

            <a
              href="#manifeste"
              className="inline-flex items-center gap-2 text-ink-700 hover:text-ondark-muted uppercase transition-colors group text-eyebrow"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform"
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
          <div className="absolute inset-0 bg-ink/85" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 (MANIFESTE PROSE) fond clair
         ════════════════════════════════════════════════════════════════ */}
      <div id="expertise" aria-hidden="true" className="sr-only" />
      <section className="bg-white py-16 lg:py-24" id="manifeste">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-muted uppercase mb-3 text-eyebrow">
                {t("manifesto.eyebrow")}
              </p>
              <h2
                className="text-display-md text-ink mb-8"
              >
                {t("manifesto.title")}
              </h2>
              <div className="space-y-5">
                <p className="text-ink-700 text-lg">
                  {t("manifesto.body1")}
                </p>
                <p className="text-ink-700 text-lg">
                  {t("manifesto.body2")}
                </p>
                <p className="text-ink-700 text-lg">
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
      <section id="fondateur" className="relative w-full overflow-hidden bg-forest-900">
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
            <div className="absolute inset-0 bg-ink/70" />
          </div>

          <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20 text-white">
            <div className="max-w-xl w-full">
              <FadeIn>
                <p className="text-muted uppercase mb-4 text-eyebrow">
                  {t("founder.eyebrow")}
                </p>
                <h2 className="text-display-md mb-8">
                  {t("founder.title")}
                </h2>
                <Quote
                  className="h-10 w-10 text-leaf mb-5 opacity-80"
                  aria-hidden="true"
                />
                <blockquote className="text-xl lg:text-2xl text-white font-medium mb-8">
                  &ldquo;{t("founder.quote")}&rdquo;
                </blockquote>
                <div className="border-l-4 border-leaf pl-5 mb-6">
                  <p className="font-semibold text-white text-base leading-tight">
                    {t("founder.name")}
                  </p>
                  <p className="text-muted text-sm mt-0.5">
                    {t("founder.role")}
                  </p>
                </div>
                <p className="text-sm text-ondark-muted leading-relaxed">
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
            ? "#047857"
            : index === 1
            ? "#0B3B2E"
            : index === 2
            ? "#B45309"
            : index === 3
            ? "#047857"
            : "#0B3B2E";

        let bg = "bg-white";
        if (isDark) bg = "bg-forest text-white";
        else if (index % 2 === 1) bg = "bg-cream";

        const textColor = isDark ? "text-white" : "text-ink";
        const subText = isDark ? "text-ondark-muted" : "text-ink-700";
        const border = isDark ? "border-ondark-line" : "border-line";

        return (
          <section
            key={c.slug}
            id={c.slug}
            className={`relative w-full overflow-hidden ${bg}`}
            aria-labelledby={`conv-${c.slug}`}
          >
            <div
              className={`flex flex-col lg:flex-row min-h-[78vh] ${ !photoOnLeft ? "lg:flex-row-reverse" : "" }`}
            >
              <div className="relative w-full lg:w-[48%] min-h-[56vw] lg:min-h-0 overflow-hidden flex-shrink-0">
                <Image
                  src={c.photo}
                  alt={c.photoAlt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-150"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div
                  className={`absolute inset-0 ${ isDark ? photoOnLeft ? "bg-gradient-to-r from-transparent via-transparent to-forest/70" : "bg-gradient-to-l from-transparent via-transparent to-forest/70" : photoOnLeft ? "bg-gradient-to-r from-transparent to-white/15" : "bg-gradient-to-l from-transparent to-white/15" }`}
                />
                <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/92">
                  <Icon className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
                  <span className="text-ink uppercase text-eyebrow">
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
                        className="text-5xl lg:text-6xl font-semibold leading-none tabular-nums"
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
                      className={`text-display-md mb-5 ${textColor}`}
                    >
                      {c.title}
                    </h2>

                    <p
                      className={`text-body lg:text-body-lg mb-8 ${subText}`}
                    >
                      {c.body}
                    </p>

                    <div className={`pb-6 mb-6 border-b ${border}`}>
                      <p
                        className="text-3xl lg:text-4xl font-semibold tracking-tight leading-none tabular-nums mb-1"
                        style={{ color: accent }}
                      >
                        {c.proofValue}
                      </p>
                      <p
                        className={`uppercase text-eyebrow ${ isDark ? "text-ondark-muted" : "text-ink" }`}
                      >
                        {c.proofLabel}
                      </p>
                      <p
                        className={`text-caption mt-1 ${ isDark ? "text-muted" : "text-muted" }`}
                      >
                        {c.proofDetail}
                      </p>
                    </div>

                    <ul className="space-y-2.5">
                      {c.bullets.map((b, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 text-body-sm leading-relaxed ${subText}`}
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
      <section id="engagement" className="bg-forest-900 relative overflow-hidden border-t border-ondark-line">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-20">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-muted uppercase mb-3 text-eyebrow">
                {t("commitments.eyebrow")}
              </p>
              <h2 className="text-display-md text-white">
                {t("commitments.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {commitments.map((c, i) => {
              const accents = [
                "#047857",
                "#0B3B2E",
                "#B45309",
                "#047857",
                "#0B3B2E",
                "#B45309",
              ];
              const accent = accents[i % accents.length];
              const numericValue = parseFloat(c.metric.replace(/[^0-9.]/g, ""));
              const showCount = !Number.isNaN(numericValue) && numericValue > 0;
              return (
                <StaggerItem key={i}>
                  <div className="bg-white/[0.04] border border-ondark-line rounded-2xl p-7 hover:bg-white/[0.07] transition-colors">
                    <p
                      className="font-semibold leading-none mb-3 tabular-nums"
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
                    <p className="text-sm text-ondark-muted leading-snug mb-3">
                      {c.label}
                    </p>
                    <p className="text-caption text-muted italic leading-snug">
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
      <section className="relative bg-forest text-white overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/photos/diverse-team.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-forest/95" />
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <Quote
                className="h-12 w-12 text-leaf mb-6 opacity-80"
                aria-hidden="true"
              />
              <blockquote
                className="text-white font-medium tracking-tight mb-8"
                style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}
              >
                &ldquo;{t("editorialQuote.quote")}&rdquo;
              </blockquote>
              <div className="border-l-4 border-leaf pl-5">
                <p className="font-semibold text-white text-base leading-tight">
                  {t("editorialQuote.name")}
                </p>
                <p className="text-muted text-sm mt-0.5">
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
      <section className="bg-leaf text-white relative overflow-hidden py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <p className="text-ondark uppercase mb-4 text-eyebrow">
                {t("conversion.eyebrow")}
              </p>
              <h2
                className="text-display-md mb-5"
              >
                {t("conversion.title")}
              </h2>
              <p className="text-ondark text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                {t("conversion.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/reserver?offre=audit-decommissionnement"
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink hover:bg-cream font-semibold px-7 py-4 rounded-xl transition-colors duration-150 text-sm"
                >
                  {t("conversion.cta1")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 font-semibold px-7 py-4 rounded-xl transition-colors duration-150 text-sm"
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
