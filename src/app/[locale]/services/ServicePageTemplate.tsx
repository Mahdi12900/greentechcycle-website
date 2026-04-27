"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Quote,
  ShieldCheck,
} from "lucide-react";
import type { ComponentType } from "react";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Types, étoffés pour le registre éditorial premium
───────────────────────────────────────────────────────────────────────────── */
export type ProofKPI = {
  value: string;
  unit?: string;
  label: string;
  color?: string;
};

export type ServicePageData = {
  /** Slug technique de l'offre, utilisé pour /reserver?offre=<slug> */
  slug: string;
  eyebrow: string;
  title: string;
  /** Sous-titre court hero (1 phrase) */
  subtitle: string;
  /** Prose narrative 3-4 phrases, section « Pourquoi » */
  description: string;
  /** Prose narrative complémentaire, section méthodologie intro */
  narrative: string;
  /** Prose narrative, section livrables intro */
  deliveryNarrative: string;
  icon: ComponentType<{ className?: string }>;
  badge: string;
  image: string;
  imageAlt: string;
  /** Photo secondaire, section méthodologie ou livrables */
  imageSecondary: string;
  imageSecondaryAlt: string;
  benefits: string[];
  proof: ProofKPI[];
  methodology: {
    title: string;
    intro: string;
    steps: { title: string; desc: string }[];
  };
  deliverables: string[];
  sla: { metric: string; value: string }[];
  certifications: string[];
  quote: { text: string; name: string; role: string };
  faq: { q: string; a: string }[];
  /** Libellés des deux CTA finaux, le premier pointe vers /reserver?offre=<slug> */
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  /** Ancre tarifaire affichée dans le hero (optionnelle) */
  pricingAnchor?: string;
  pricingHref?: string;
  /** Locale active, nécessaire pour les libellés courts ('Réserver', 'Voir', etc.) */
  isEn: boolean;
};

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ accordion item
───────────────────────────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <span className="font-semibold text-[#0F172A] text-[15px] leading-snug">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180 text-[#047857]" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="mt-4 text-[14.5px] text-gray-600 leading-[1.78] pr-8">
          {a}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GhostNumber, watermark XXL en arrière-plan
───────────────────────────────────────────────────────────────────────────── */
function GhostNumber({
  n,
  isDark,
  align = "right",
}: {
  n: string;
  isDark: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
      style={{
        fontSize: "clamp(8rem, 22vw, 18rem)",
        color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
        [align === "right" ? "right" : "left"]: "-0.05em",
        bottom: "-0.12em",
      }}
      aria-hidden="true"
    >
      {n}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ServicePageTemplate, registre éditorial premium
   Structure :
   S1, Hero éditorial split (sombre, photo droite)
   S2, Bandeau preuve KPI (sombre)
   S3, « Pourquoi » prose + bénéfices (clair, photo gauche)
   S4, Méthodologie 4 étapes alternance fond clair/sombre + ghost numbers
   S5, Livrables / SLA / Certifications (clair)
   S6, Citation magazine (sombre, pleine largeur)
   S7, FAQ (clair)
   S8, Encart conversion fond #10B981 plein
───────────────────────────────────────────────────────────────────────────── */
export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const Icon = data.icon;
  const isEn = data.isEn;

  const reserverHref = `/reserver?offre=${data.slug}`;

  // Libellés ouverts à la traduction simple FR/EN
  const L = {
    pourquoi: isEn ? "Why this service" : "Pourquoi ce service",
    benefits: isEn ? "What changes for you" : "Ce qui change pour vous",
    methodology: isEn ? "Our methodology" : "Notre méthodologie",
    deliverables: isEn ? "Deliverables" : "Livrables",
    sla: isEn ? "Contractual commitments" : "Engagements contractuels",
    certifications: isEn ? "Certifications" : "Certifications",
    faqTitle: isEn ? "Frequently asked questions" : "Questions fréquentes",
    scrollCta: isEn ? "Read the methodology" : "Lire la méthodologie",
    bookCta: isEn ? "Book a slot" : "Réserver",
    ctaSubtitle: isEn
      ? "Book a 30-minute slot with a senior expert. We come back with a quoted action plan within 48 hours."
      : "Réservez un créneau de 30 minutes avec un expert senior. Nous revenons avec un plan d'action chiffré sous 48 heures.",
    ctaTitle: isEn ? "Ready to move?" : "Prêt à passer à l'action ?",
    quoteEyebrow: isEn ? "Client testimonial" : "Témoignage client",
  };

  return (
    <main className="overflow-hidden bg-white">

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO ÉDITORIAL SPLIT) fond #0F172A, photo droite
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[88vh] flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="service-hero-title"
      >
        {/* Ambient glow layers */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 12% 18%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 92% 88%, rgba(14,165,233,0.12) 0%, transparent 55%)",
          }}
        />

        {/* Left content */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {data.eyebrow}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 text-[11px] font-semibold text-white border border-white/15">
                <Icon className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                {data.badge}
              </span>
            </div>

            <h1
              id="service-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {data.title}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.12rem] leading-[1.72] max-w-xl mb-10">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {data.proof.map((kpi, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums"
                    style={{ color: kpi.color ?? "#10B981" }}
                  >
                    {kpi.value}
                    {kpi.unit && (
                      <span className="text-base ml-1 font-semibold opacity-80">
                        {kpi.unit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>

            {data.pricingAnchor && (
              <div className="mb-8">
                <Link
                  href={data.pricingHref ?? "/tarifs"}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 hover:bg-[#F59E0B]/25 transition-colors group"
                >
                  <span className="text-xl lg:text-2xl font-black text-[#F59E0B] tabular-nums tracking-tight">
                    {data.pricingAnchor}
                  </span>
                  <span className="text-sm font-medium text-gray-300 underline underline-offset-4 decoration-1 group-hover:text-white transition-colors">
                    {isEn ? "See pricing" : "Voir les tarifs"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[#F59E0B]" aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={reserverHref}
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {L.bookCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={data.ctaSecondaryHref}
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {data.ctaSecondaryLabel}
              </Link>
            </div>

            <a
              href="#methodologie"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
              {L.scrollCta}
            </a>
          </FadeIn>
        </div>

        {/* Right photo */}
        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 (POURQUOI) fond blanc, photo gauche, ghost number 01
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white border-t border-gray-100">
        <div className="flex flex-col lg:flex-row min-h-[72vh]">
          <div className="relative w-full lg:w-[44%] min-h-[48vw] lg:min-h-0 overflow-hidden flex-shrink-0">
            <Image
              src={data.imageSecondary}
              alt={data.imageSecondaryAlt}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-[1400ms] hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/15" />
            <GhostNumber n="01" isDark={false} align="right" />
          </div>

          <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-24">
            <div className="absolute top-0 left-0 w-[3px] h-full bg-[#047857]" aria-hidden="true" />

            <div className="max-w-2xl">
              <FadeIn>
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-5xl lg:text-6xl font-black leading-none tracking-tighter text-[#047857] tabular-nums">
                    01
                  </span>
                  <span className="flex-1 h-[1px] bg-[#047857]/25" aria-hidden="true" />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                  {L.pourquoi}
                </p>

                <h2
                  className="text-[#0F172A] font-bold tracking-tight mb-7"
                  style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.75rem)", lineHeight: 1.08 }}
                >
                  {data.title}
                </h2>

                <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-10">
                  {data.description}
                </p>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 mb-5">
                  {L.benefits}
                </p>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {data.benefits.map((b, j) => (
                    <StaggerItem key={j}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#047857] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-[14.5px] text-gray-700 leading-snug">{b}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 (MÉTHODOLOGIE) fond #0F172A, ghost number 02, étapes alternées
         ════════════════════════════════════════════════════════════════ */}
      <section
        id="methodologie"
        className="relative w-full overflow-hidden bg-[#0F172A] py-20 lg:py-28"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(16,185,129,0.10) 0%, transparent 60%)",
          }}
        />
        <GhostNumber n="02" isDark={true} align="left" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-4">
                {L.methodology}
              </p>
              <h2
                className="text-white font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {data.methodology.title}
              </h2>
              <p className="text-gray-300 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {data.narrative}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="max-w-5xl space-y-5">
            {data.methodology.steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="group flex flex-col sm:flex-row gap-6 items-start p-7 lg:p-9 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#10B981]/15 text-[#6EE7B7] font-black text-xl tabular-nums border border-[#10B981]/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg lg:text-xl mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-[14.5px] lg:text-[15px] leading-[1.78]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S4 (LIVRABLES / SLA / CERTIFS) fond #F8FAFC, ghost number 03
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
        <GhostNumber n="03" isDark={false} align="right" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {L.deliverables}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {isEn ? "What lands in your hands." : "Ce qui arrive entre vos mains."}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {data.deliveryNarrative}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl">
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#047857] mb-6">
                  {L.deliverables}
                </h3>
                <ul className="space-y-4">
                  {data.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#047857] flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-[14px] text-gray-700 leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-[#0F172A] rounded-2xl p-8 h-full shadow-sm relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 90% 70% at 30% 0%, rgba(16,185,129,0.18) 0%, transparent 60%)",
                  }}
                />
                <h3 className="relative text-sm font-bold uppercase tracking-[0.15em] text-[#6EE7B7] mb-6">
                  {L.sla}
                </h3>
                <ul className="relative space-y-5">
                  {data.sla.map((s, i) => (
                    <li key={i} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                      <p className="text-3xl font-black text-white tabular-nums tracking-tight leading-none">
                        {s.value}
                      </p>
                      <p className="text-xs text-gray-400 mt-2 leading-snug">
                        {s.metric}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 h-full shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#047857] mb-6">
                  {L.certifications}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#047857]/10 text-[#047857] text-xs font-semibold border border-[#047857]/20"
                    >
                      <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 (CITATION MAGAZINE) fond #022C22, pleine largeur
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#022C22] py-20 lg:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-10 w-10 text-[#10B981] mx-auto mb-8" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-6">
                {L.quoteEyebrow}
              </p>
              <blockquote
                className="text-white font-medium italic mb-10"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.4 }}
              >
                &ldquo;{data.quote.text}&rdquo;
              </blockquote>
              <footer className="text-sm text-gray-300">
                <span className="font-semibold text-white">{data.quote.name}</span>
                <span className="mx-2 text-gray-500">·</span>
                <span className="italic text-gray-400">{data.quote.role}</span>
              </footer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (FAQ) fond blanc
         ════════════════════════════════════════════════════════════════ */}
      {data.faq.length > 0 && (
        <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
          <GhostNumber n="04" isDark={false} align="left" />
          <div className="container mx-auto px-4 relative z-10">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-[#047857]" aria-hidden="true" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857]">
                    {L.faqTitle}
                  </p>
                </div>
                <h2
                  className="text-[#0F172A] font-bold tracking-tight mb-12"
                  style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", lineHeight: 1.1 }}
                >
                  {isEn ? "Straight answers, no fine print." : "Des réponses directes, sans astérisque."}
                </h2>

                <div>
                  {data.faq.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════
          S7 (ENCART CONVERSION) fond #10B981 plein
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#10B981]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(255,255,255,0.25) 0%, transparent 55%)",
          }}
        />
        <GhostNumber n="05" isDark={true} align="right" />

        <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
                {isEn ? "Take the next step" : "Passer à l'action"}
              </p>
              <h2
                className="text-white font-black tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {L.ctaTitle}
              </h2>
              <p className="text-white/90 text-[1.05rem] lg:text-[1.15rem] leading-[1.65] max-w-2xl mb-10">
                {L.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={reserverHref}
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {L.bookCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={data.ctaSecondaryHref}
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {data.ctaSecondaryLabel}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
