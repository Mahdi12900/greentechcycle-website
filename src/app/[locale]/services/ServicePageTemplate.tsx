"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { ArrowDown, Check, ShieldCheck } from "lucide-react";
import type { ComponentType } from "react";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Accordion from "@/components/ui/Accordion";

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
   ServicePageTemplate — DESIGN.md §10.7
   hero split (paper) → pourquoi + bénéfices (cream) → méthodologie (night)
   → livrables / SLA / certifications (paper) → citation (forest)
   → FAQ accordéon (paper) → CTA unique (forest)
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
    <div>
      {/* HERO split paper */}
      <section className="bg-paper py-16 lg:py-24" aria-labelledby="service-hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2">
                <Tag variant="brand" icon={<Icon className="h-3.5 w-3.5" aria-hidden="true" />}>{data.badge}</Tag>
              </div>
              <p className="mt-6 text-eyebrow uppercase text-muted">{data.eyebrow}</p>
              <h1 id="service-hero-title" className="mt-3 max-w-[20ch] text-display-lg text-ink">{data.title}</h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-ink-700">{data.subtitle}</p>
              <dl className={`mt-8 grid max-w-[600px] border-y border-line py-6 ${data.proof.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {data.proof.map((kpi, i) => (
                  <div key={i} className={`flex flex-col-reverse justify-end ${i > 0 ? "border-l border-line pl-4" : "pr-4"}`}>
                    <dt className="mt-1 text-caption text-muted">{kpi.label}</dt>
                    <dd className="font-display text-display-sm tabular-nums text-forest">
                      {kpi.value}
                      {kpi.unit && <span className="ml-1 font-sans text-body-sm text-ink-700">{kpi.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              {data.pricingAnchor && (
                <p className="mt-6 text-body-sm">
                  <span className="font-semibold tabular-nums text-forest">{data.pricingAnchor}</span>{" "}
                  <Link href={data.pricingHref ?? "/tarifs"} className="text-leaf underline underline-offset-4 hover:text-leaf-700">
                    {isEn ? "See pricing" : "Voir les tarifs"}
                  </Link>
                </p>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={reserverHref} size="lg">{L.bookCta}</ButtonLink>
                <ButtonLink href={data.ctaSecondaryHref} variant="secondary" size="lg">{data.ctaSecondaryLabel}</ButtonLink>
              </div>
              <a href="#methodologie" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-muted hover:text-ink">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {L.scrollCta}
              </a>
            </div>
            <div className="reveal lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image src={data.image} alt={data.imageAlt} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI (cream) */}
      <Section tone="cream" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-7">
            <SectionHeader eyebrow={L.pourquoi} title={data.title} intro={data.description} />
            <p className="text-eyebrow uppercase text-muted">{L.benefits}</p>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {data.benefits.map((b, j) => (
                <li key={j} className="flex items-start gap-2 text-body-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image src={data.imageSecondary} alt={data.imageSecondaryAlt} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </Section>

      {/* MÉTHODOLOGIE (night) */}
      <Section id="methodologie" tone="night">
        <div className="reveal">
          <SectionHeader tone="dark" eyebrow={L.methodology} title={data.methodology.title} intro={data.narrative} />
        </div>
        <ol className="grid gap-px overflow-hidden rounded-xl border border-ondark-line bg-ondark-line md:grid-cols-2">
          {data.methodology.steps.map((step, i) => (
            <li key={i} className="bg-forest-900 p-6 lg:p-8">
              <p className="text-eyebrow uppercase text-ondark-muted">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-heading-lg text-ondark">{step.title}</h3>
              <p className="mt-2 text-body-sm text-ondark-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* LIVRABLES / SLA / CERTIFICATIONS (paper) */}
      <Section tone="paper">
        <div className="reveal">
          <SectionHeader
            eyebrow={L.deliverables}
            title={isEn ? "What lands in your hands." : "Ce qui arrive entre vos mains."}
            intro={data.deliveryNarrative}
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-paper p-6">
            <h3 className="text-eyebrow uppercase text-muted">{L.deliverables}</h3>
            <ul className="mt-4 space-y-3">
              {data.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-cream p-6">
            <h3 className="text-eyebrow uppercase text-muted">{L.sla}</h3>
            <dl className="mt-4 divide-y divide-line">
              {data.sla.map((s, i) => (
                <div key={i} className="flex flex-col-reverse justify-end py-3 first:pt-0">
                  <dt className="mt-1 text-caption text-muted">{s.metric}</dt>
                  <dd className="font-display text-display-sm tabular-nums text-forest">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-xl border border-line bg-paper p-6">
            <h3 className="text-eyebrow uppercase text-muted">{L.certifications}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.certifications.map((c, i) => (
                <li key={i}>
                  <Tag variant="brand" icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />}>{c}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CITATION (forest) */}
      <Section tone="forest">
        <div className="reveal">
          <figure className="max-w-[65ch]">
            <p className="text-eyebrow uppercase text-ondark-muted">{L.quoteEyebrow}</p>
            <blockquote className="mt-4 font-display text-display-sm text-ondark">&laquo;&nbsp;{data.quote.text}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-6 text-caption text-ondark-muted">
              <span className="font-semibold text-ondark">{data.quote.name}</span> · {data.quote.role}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* FAQ (paper) */}
      {data.faq.length > 0 && (
        <Section tone="paper">
          <div className="mx-auto max-w-[720px]">
            <div className="reveal">
              <SectionHeader eyebrow={L.faqTitle} title={isEn ? "Straight answers, no fine print." : "Des réponses directes, sans astérisque."} />
            </div>
            <Accordion items={data.faq.map((f) => ({ question: f.q, answer: f.a }))} />
          </div>
        </Section>
      )}

      {/* CTA unique */}
      <CtaSection
        eyebrow={isEn ? "Take the next step" : "Passer à l'action"}
        title={L.ctaTitle}
        subtitle={L.ctaSubtitle}
        primaryLabel={L.bookCta}
        primaryHref={reserverHref}
        secondaryLabel={data.ctaSecondaryLabel}
        secondaryHref={data.ctaSecondaryHref}
      />
    </div>
  );
}
