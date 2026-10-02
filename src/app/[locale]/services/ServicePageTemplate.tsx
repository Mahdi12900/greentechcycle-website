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
    <div className="border-b border-line py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left group"
      >
        <span className="font-semibold text-ink text-body leading-snug">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${ open ? "rotate-180 text-leaf" : "" }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="mt-4 text-body-sm text-ink-700 pr-8">
          {a}
        </p>
      )}
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
   S8, Encart conversion fond #047857 plein
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
          S1 (HERO ÉDITORIAL SPLIT) fond #1C1917, photo droite
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[88vh] flex flex-col lg:flex-row overflow-hidden bg-forest-900"
        aria-labelledby="service-hero-title"
      >
        {/* Ambient glow layers */}

        {/* Left content */}
        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-muted uppercase text-eyebrow">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-leaf"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {data.eyebrow}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 text-caption font-semibold text-white border border-white/15">
                <Icon className="h-3.5 w-3.5 text-leaf-300" aria-hidden="true" />
                {data.badge}
              </span>
            </div>

            <h1
              id="service-hero-title"
              className="text-display-lg text-white mb-8"
            >
              {data.title}
            </h1>

            <p className="text-ondark-muted text-base lg:text-body-lg max-w-xl mb-10">
              {data.subtitle}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {data.proof.map((kpi, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-semibold tracking-tight leading-none tabular-nums"
                    style={{ color: kpi.color ?? "#047857" }}
                  >
                    {kpi.value}
                    {kpi.unit && (
                      <span className="text-base ml-1 font-semibold opacity-80">
                        {kpi.unit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-muted mt-1.5 font-medium">
                    {kpi.label}
                  </span>
                </div>
              ))}
            </div>

            {data.pricingAnchor && (
              <div className="mb-8">
                <Link
                  href={data.pricingHref ?? "/tarifs"}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-ochre/15 border border-ochre/30 hover:bg-ochre/25 transition-colors group"
                >
                  <span className="text-xl lg:text-2xl font-semibold text-ochre tabular-nums tracking-tight">
                    {data.pricingAnchor}
                  </span>
                  <span className="text-sm font-medium text-ondark-muted underline underline-offset-4 decoration-1 group-hover:text-white transition-colors">
                    {isEn ? "See pricing" : "Voir les tarifs"}
                  </span>
                  <ArrowRight className="h-4 w-4 text-ochre" aria-hidden="true" />
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href={reserverHref}
                className="inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-700 text-white font-semibold px-7 py-4 rounded-xl transition-colors duration-150 hover:shadow-card hover: text-sm"
              >
                {L.bookCta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href={data.ctaSecondaryHref}
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-colors duration-150 text-sm"
              >
                {data.ctaSecondaryLabel}
              </Link>
            </div>

            <a
              href="#methodologie"
              className="inline-flex items-center gap-2 text-ink-700 hover:text-ondark-muted uppercase transition-colors group text-eyebrow"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform"
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
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-ink/55" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 (POURQUOI) fond blanc, photo gauche, ghost number 01
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white border-t border-line">
        <div className="flex flex-col lg:flex-row min-h-[72vh]">
          <div className="relative w-full lg:w-[44%] min-h-[48vw] lg:min-h-0 overflow-hidden flex-shrink-0">
            <Image
              src={data.imageSecondary}
              alt={data.imageSecondaryAlt}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-150"
              sizes="(max-width: 1024px) 100vw, 44vw"
            />
            <div className="absolute inset-0 bg-paper/15" />
          </div>

          <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-24">
            <div className="absolute top-0 left-0 w-[3px] h-full bg-leaf" aria-hidden="true" />

            <div className="max-w-2xl">
              <FadeIn>
                <div className="flex items-center gap-4 mb-7">
                  <span className="text-5xl lg:text-6xl font-semibold leading-none text-leaf tabular-nums">
                    01
                  </span>
                  <span className="flex-1 h-[1px] bg-leaf/25" aria-hidden="true" />
                </div>

                <p className="uppercase text-muted mb-4 text-eyebrow">
                  {L.pourquoi}
                </p>

                <h2
                  className="text-display-md text-ink mb-7"
                >
                  {data.title}
                </h2>

                <p className="text-ink-700 text-body lg:text-body-lg mb-10">
                  {data.description}
                </p>

                <p className="uppercase text-muted mb-5 text-eyebrow">
                  {L.benefits}
                </p>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
                  {data.benefits.map((b, j) => (
                    <StaggerItem key={j}>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-leaf flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-body-sm text-ink-700 leading-snug">{b}</span>
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
          S3 (MÉTHODOLOGIE) fond #1C1917, ghost number 02, étapes alternées
         ════════════════════════════════════════════════════════════════ */}
      <section
        id="methodologie"
        className="relative w-full overflow-hidden bg-forest-900 py-16 lg:py-24"
      >

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="uppercase text-ondark-muted mb-4 text-eyebrow">
                {L.methodology}
              </p>
              <h2
                className="text-display-md text-white mb-6"
              >
                {data.methodology.title}
              </h2>
              <p className="text-ondark-muted text-body lg:text-body-lg">
                {data.narrative}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="max-w-5xl space-y-5">
            {data.methodology.steps.map((step, i) => (
              <StaggerItem key={i}>
                <div className="group flex flex-col sm:flex-row gap-6 items-start p-7 lg:p-9 rounded-2xl bg-white/[0.04] border border-ondark-line hover:bg-white/[0.07] hover:border-white/20 transition-colors">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-leaf-100 text-leaf-300 font-semibold text-xl tabular-nums border border-leaf/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-heading-lg text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted text-body-sm lg:text-body">
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
          S4 (LIVRABLES / SLA / CERTIFS) fond #F7F5F0, ghost number 03
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-cream py-16 lg:py-24">

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="uppercase text-muted mb-4 text-eyebrow">
                {L.deliverables}
              </p>
              <h2
                className="text-display-md text-ink mb-6"
              >
                {isEn ? "What lands in your hands." : "Ce qui arrive entre vos mains."}
              </h2>
              <p className="text-ink-700 text-body lg:text-body-lg">
                {data.deliveryNarrative}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-6 max-w-6xl">
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 border border-line h-full">
                <h3 className="uppercase text-muted mb-6 text-eyebrow">
                  {L.deliverables}
                </h3>
                <ul className="space-y-4">
                  {data.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-leaf flex-shrink-0 mt-1" aria-hidden="true" />
                      <span className="text-body-sm text-ink-700 leading-snug">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-forest-900 rounded-2xl p-8 h-full relative overflow-hidden">
                <h3 className="relative uppercase text-ondark-muted mb-6 text-eyebrow">
                  {L.sla}
                </h3>
                <ul className="relative space-y-5">
                  {data.sla.map((s, i) => (
                    <li key={i} className="border-b border-ondark-line pb-4 last:border-0 last:pb-0">
                      <p className="text-3xl font-semibold text-white tabular-nums tracking-tight leading-none">
                        {s.value}
                      </p>
                      <p className="text-xs text-muted mt-2 leading-snug">
                        {s.metric}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="bg-white rounded-2xl p-8 border border-line h-full">
                <h3 className="uppercase text-muted mb-6 text-eyebrow">
                  {L.certifications}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-leaf-100 text-leaf text-xs font-semibold border border-leaf/20"
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
          S5 (CITATION MAGAZINE) fond #0B3B2E, pleine largeur
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-forest py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-10 w-10 text-leaf mx-auto mb-8" aria-hidden="true" />
              <p className="uppercase text-ondark-muted mb-6 text-eyebrow">
                {L.quoteEyebrow}
              </p>
              <blockquote
                className="text-white font-medium italic mb-10"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.4 }}
              >
                &ldquo;{data.quote.text}&rdquo;
              </blockquote>
              <footer className="text-sm text-ondark-muted">
                <span className="font-semibold text-white">{data.quote.name}</span>
                <span className="mx-2 text-muted">·</span>
                <span className="italic text-muted">{data.quote.role}</span>
              </footer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (FAQ) fond blanc
         ════════════════════════════════════════════════════════════════ */}
      {data.faq.length > 0 && (
        <section className="relative w-full overflow-hidden bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
            <FadeIn>
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-leaf" aria-hidden="true" />
                  <p className="uppercase text-muted text-eyebrow">
                    {L.faqTitle}
                  </p>
                </div>
                <h2
                  className="text-display-md text-ink mb-12"
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
          S7 (ENCART CONVERSION) fond #047857 plein
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-leaf">

        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="uppercase text-ondark mb-5 text-eyebrow">
                {isEn ? "Take the next step" : "Passer à l'action"}
              </p>
              <h2
                className="text-display-md text-white mb-6"
              >
                {L.ctaTitle}
              </h2>
              <p className="text-ondark text-body-lg lg:text-body-lg max-w-2xl mb-10">
                {L.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={reserverHref}
                  className="inline-flex items-center justify-center gap-2 bg-forest-900 hover:bg-forest text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-150 hover:shadow-card text-sm"
                >
                  {L.bookCta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href={data.ctaSecondaryHref}
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-colors duration-150 text-sm"
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
