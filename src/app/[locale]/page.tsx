"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  AlertTriangle,
  Euro,
  Cloud,
  Server,
  ShieldCheck,
  BarChart3,
  Recycle,
  Scale,
  Award,
  LineChart,
  Users,
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  Check,
  Minus,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/motion";
import TrustBand from "@/components/TrustBand";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card, { CardLink } from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Pictogram from "@/components/ui/Pictogram";
import { Stat, StatRow } from "@/components/ui/Stat";
import Accordion from "@/components/ui/Accordion";

/**
 * Accueil — architecture « Épuré » (DESIGN.md §10.1).
 * paper (hero) → paper (enjeux, confiance) → cream (problème) → paper (solution)
 * → night (chaîne de valeur) → cream (preuves) → paper (calendrier)
 * → cream (différenciateurs) → forest (témoignage) → paper (tarifs)
 * → cream (ROI) → paper (FAQ) → forest (CTA) → night (footer).
 * Tous les ids d'ancre historiques sont conservés.
 */
export default function HomePage() {
  const t = useTranslations("Home");

  const problemItems = t.raw("problem.items") as Array<{
    tag: string;
    title: string;
    body: string;
    source: string;
  }>;
  const solutionPillars = t.raw("solution.pillars") as Array<{
    label: string;
    desc: string;
  }>;
  const valueSteps = t.raw("valueChain.steps") as Array<{
    n: string;
    title: string;
    desc: string;
    kpi: string;
  }>;
  const cases = t.raw("cases.items") as Array<{
    slug: string;
    sector: string;
    regulation: string;
    title: string;
    results: string[];
  }>;
  const differentiators = t.raw("differentiators.items") as Array<{
    title: string;
    body: string;
    stat: string;
  }>;
  const trustBadges = t.raw("finalCTA.trustBadges") as string[];

  const regEvents = t.raw("regTimeline.events") as Array<{
    date: string;
    label: string;
    body: string;
    penalty: string;
  }>;
  const beforeItems = t.raw("comparison.before.items") as string[];
  const afterItems = t.raw("comparison.after.items") as string[];
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const sectorTrustItems = t.raw("sectorTrust.sectors") as Array<{
    icon: string;
    label: string;
    detail: string;
  }>;
  const testimonials = t.raw("testimonials.items") as Array<{
    quote: string;
    name: string;
    role: string;
    company: string;
  }>;
  const enjeuCards = t.raw("enjeuCards.cards") as Array<{
    title: string;
    desc: string;
    href: string;
    icon: string;
  }>;

  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const numberLocale = isEn ? "en-GB" : "fr-FR";

  // ROI calculator state
  const [fleetSize, setFleetSize] = useState("");
  const fleet = parseInt(fleetSize) || 0;

  // « 78 % » isolé en chiffre-argument (display-xl), le reste en texte courant.
  const proof = t("hero.proofStat");
  const proofMatch = proof.match(/^(\d+\s?%)\s*(.*)$/);
  const heroStat = proofMatch?.[1];
  const heroStatText = proofMatch?.[2] ?? proof;

  const problemIcons = [AlertTriangle, Euro, Cloud];
  const pillarIcons = [Server, ShieldCheck, BarChart3, Recycle];
  const diffIcons = [Scale, Award, LineChart, Users];
  const sectorIconMap: Record<string, typeof Building2> = {
    building: Building2,
    heartPulse: HeartPulse,
    factory: Factory,
    landmark: Landmark,
  };
  const casePhotos = ["/photos/case-banque.jpg", "/photos/case-hopital.jpg", "/photos/case-industrie.jpg"];

  const plans = t.raw("pricingTeaser.plans") as Array<{
    name: string;
    price: string;
    setup: string;
    pitch: string;
    slug: string;
    popular?: boolean;
  }>;

  return (
    <div className="bg-paper">
      {/* ==========================================================
          1–2. HERO — notice CSRD intégrée, split 7/5, preuve chiffrée
         ========================================================== */}
      <section className="bg-paper py-16 lg:py-32" aria-labelledby="hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="min-w-0 lg:col-span-7">
              <Link
                href="/reglementation"
                className="inline-flex min-h-[28px] max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-ochre-100 sm:rounded-full px-3 py-1 text-caption font-semibold text-ochre-800 transition-colors hover:text-ink"
              >
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{t("urgency.text")}</span>
                <span className="whitespace-nowrap underline-offset-2 hover:underline">{t("urgency.cta")}</span>
              </Link>

              <div className="mt-6">
                <Tag variant="neutral">{t("hero.eyebrow")}</Tag>
              </div>

              <h1 id="hero-title" className="mt-6 max-w-[22ch] text-display-lg text-ink">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-[65ch] text-body-lg text-ink-700">{t("hero.subtitle")}</p>

              {heroStat && (
                <div className="mt-8 flex max-w-[65ch] items-start gap-6 border-l-2 border-leaf pl-6">
                  <p className="whitespace-nowrap text-display-xl leading-none text-forest">{heroStat.replace(" ", "\u00a0")}</p>
                  <p className="text-body-sm text-ink-700">{heroStatText}</p>
                </div>
              )}
              {!heroStat && <p className="mt-6 max-w-[65ch] text-body-sm text-ink-700">{proof}</p>}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo" size="lg">
                  {t("hero.cta1")}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  {t("hero.cta2")}
                </ButtonLink>
              </div>

              <p className="mt-6 max-w-[65ch] text-caption italic text-muted">{t("hero.source")}</p>
            </FadeIn>

            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/photos/hp-atelier-itad.jpg"
                  alt={tx(
                    "Atelier de reconditionnement GreenTechCycle, chaîne d'effacement et de tri certifiée",
                    "GreenTechCycle refurbishment workshop, certified erasure and sorting line"
                  )}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="mt-6 grid grid-cols-2 border-t border-line pt-6">
                <div className="pr-4">
                  <p className="text-eyebrow uppercase text-muted">Audit ACPR</p>
                  <p className="mt-2 font-display text-display-sm text-forest">{tx("4 jours", "4 days")}</p>
                  <p className="mt-1 text-caption text-muted">{tx("vs 3 semaines en moyenne", "vs 3 weeks on average")}</p>
                </div>
                <div className="border-l border-line pl-4">
                  <p className="text-eyebrow uppercase text-muted">{tx("Valeur récupérée", "Value recovered")}</p>
                  <p className="mt-2 font-display text-display-sm text-forest">638 k€</p>
                  <p className="mt-1 text-caption text-muted">{tx("moyenne / mission grand compte", "average / key-account mission")}</p>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-caption text-ink-700">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-forest" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust1")}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-forest" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust2")}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-forest" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust3")}
            </span>
          </div>
          <CertificationStrip className="mt-3" />
        </div>
      </section>

      {/* ==========================================================
          3. ENJEUX — condensés en une ligne de 4 liens texte
         ========================================================== */}
      <section className="border-t border-line bg-paper py-8" aria-labelledby="enjeux-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[200px_1fr] lg:items-start">
            <div>
              <p className="text-eyebrow uppercase text-muted">{t("enjeuCards.eyebrow")}</p>
              <h2 id="enjeux-title" className="sr-only">
                {t("enjeuCards.title")}
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {enjeuCards.map((card) => (
                <li key={card.title}>
                  <TextLink href={card.href}>{card.title}</TextLink>
                  <p className="mt-1 text-caption text-muted">{card.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ==========================================================
          5. BANDEAU DE CONFIANCE — pictogrammes sectoriels
         ========================================================== */}
      <TrustBand />

      {/* ==========================================================
          6. PROBLÈME — le coût caché, 3 risques chiffrés
         ========================================================== */}
      <Section tone="cream">
        <FadeIn>
          <SectionHeader alert eyebrow={t("problem.eyebrow")} title={t("problem.title")} intro={t("problem.subtitle")} />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {problemItems.map((item, i) => (
            <StaggerItem key={i} className="h-full">
              <Card className="flex h-full flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <Pictogram icon={problemIcons[i] || AlertTriangle} alert />
                  <span className="text-eyebrow uppercase text-ochre">{item.tag}</span>
                </div>
                <h3 className="mb-3 text-heading-lg text-ink">{item.title}</h3>
                <p className="mb-4 flex-1 text-body-sm text-ink-700">{item.body}</p>
                <p className="border-t border-line pt-3 text-caption italic text-muted">{item.source}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ==========================================================
          7. SOLUTION #solution — 4 piliers + avant/après condensé
         ========================================================== */}
      <Section id="solution" tone="paper">
        <FadeIn>
          <SectionHeader eyebrow={t("solution.eyebrow")} title={t("solution.title")} intro={t("solution.body")} />
        </FadeIn>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-eyebrow uppercase text-muted">{t("solution.diagramCenter")}</p>
            <p className="mt-2 text-body-sm text-ink-700">{t("solution.diagramCenterSub")}</p>
            <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2">
              {solutionPillars.map((p, i) => (
                <StaggerItem key={i} className="h-full">
                  <Card pad="sm" className="h-full">
                    <Pictogram icon={pillarIcons[i] || Server} />
                    <p className="mt-4 text-heading-md text-ink">{p.label}</p>
                    <p className="mt-1 text-body-sm text-ink-700">{p.desc}</p>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <FadeIn className="min-w-0 lg:col-span-7">
            <p className="text-eyebrow uppercase text-muted">{t("comparison.eyebrow")}</p>
            <h3 className="mt-2 text-display-sm text-ink">{t("comparison.title")}</h3>
            <p className="mt-2 max-w-[65ch] text-body-sm text-ink-700">{t("comparison.subtitle")}</p>
            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <table className="w-full border-collapse text-body-sm">
                <caption className="sr-only">{t("comparison.title")}</caption>
                <thead>
                  <tr className="bg-cream">
                    <th scope="col" className="w-1/2 px-4 py-3 text-left text-eyebrow uppercase text-muted">
                      {t("comparison.before.label")}
                    </th>
                    <th scope="col" className="w-1/2 border-l border-line px-4 py-3 text-left text-eyebrow uppercase text-forest">
                      {t("comparison.after.label")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {beforeItems.map((before, i) => (
                    <tr key={i} className={`border-t border-line ${i % 2 === 1 ? "bg-leaf-50" : ""}`}>
                      <td className="px-4 py-3 align-top text-ink-700">
                        <span className="flex gap-2">
                          <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" aria-hidden="true" />
                          {before}
                        </span>
                      </td>
                      <td className="border-l border-line px-4 py-3 align-top font-medium text-ink">
                        <span className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                          {afterItems[i]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <TextLink href="/plateforme">{tx("Voir la plateforme en détail", "See the platform in detail")}</TextLink>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* ==========================================================
          8. CHAÎNE DE VALEUR — 5 étapes numérotées (night)
         ========================================================== */}
      <Section tone="night">
        <FadeIn>
          <SectionHeader tone="dark" eyebrow={t("valueChain.eyebrow")} title={t("valueChain.title")} intro={t("valueChain.subtitle")} />
        </FadeIn>
        <StaggerContainer className="grid gap-px overflow-hidden rounded-xl border border-ondark-line bg-ondark-line sm:grid-cols-2 lg:grid-cols-5">
          {valueSteps.map((step, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="flex h-full flex-col bg-forest-900 p-6">
                <p className="text-eyebrow uppercase text-ondark-muted">{step.n}</p>
                <h3 className="mt-3 text-heading-md text-ondark">{step.title}</h3>
                <p className="mt-3 flex-1 text-body-sm text-ondark-muted">{step.desc}</p>
                <div className="mt-6 border-t border-ondark-line pt-4">
                  <p className="text-eyebrow uppercase text-ondark-muted">SLA / KPI</p>
                  <p className="mt-1 text-body-sm font-semibold text-leaf-300">{step.kpi}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ==========================================================
          9. PREUVES #cases — KPI mesurés + 3 cas clients (fusion)
         ========================================================== */}
      <Section id="cases" tone="cream">
        <FadeIn>
          <SectionHeader eyebrow={t("proof.eyebrow")} title={t("proof.title")} />
        </FadeIn>
        <StatRow>
          {(["clients", "assets", "value", "carbon"] as const).map((k) => (
            <Stat
              key={k}
              value={<CountUp end={parseInt(t(`proof.items.${k}.value`))} suffix={t(`proof.items.${k}.suffix`)} />}
              label={t(`proof.items.${k}.label`)}
              source={t(`proof.items.${k}.source`)}
            />
          ))}
        </StatRow>
        <p className="mt-8 max-w-[65ch] text-caption italic text-muted">{t("proof.footnote")}</p>

        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-eyebrow uppercase text-muted">{t("cases.eyebrow")}</p>
            <h3 className="max-w-[24ch] text-display-sm text-ink">{t("cases.title")}</h3>
            <p className="mt-3 max-w-[65ch] text-body text-ink-700">{t("cases.subtitle")}</p>
          </div>
          <TextLink href="/cas-usages" className="flex-shrink-0">
            {t("cases.discoverAll")}
          </TextLink>
        </div>
        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <StaggerItem key={c.slug} className="h-full">
              <CardLink href={`/cas-usages#${c.slug}`} pad="none" cta={t("cases.cardCta")}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl border-b border-line">
                  <Image
                    src={casePhotos[i]}
                    alt={tx(`Photo sectorielle illustrant le cas ${c.sector}`, `Sector photo illustrating the ${c.sector} case`)}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col px-6 pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="brand">{c.sector}</Tag>
                    <Tag variant="alert">{c.regulation}</Tag>
                  </div>
                  <h4 className="mt-4 text-heading-md text-ink transition-colors group-hover:text-leaf">{c.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {c.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-sm text-ink-700">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardLink>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ==========================================================
          10. CALENDRIER RÉGLEMENTAIRE #compliance — timeline verticale
         ========================================================== */}
      <Section id="compliance" tone="paper">
        <div className="grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <SectionHeader alert eyebrow={t("regTimeline.eyebrow")} title={t("regTimeline.title")} intro={t("regTimeline.subtitle")} />
          </FadeIn>
          <ol className="relative border-l border-line lg:col-span-7">
            {regEvents.map((evt, i) => (
              <li key={i} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full ${i < 2 ? "bg-ochre" : "bg-forest"}`}
                  aria-hidden="true"
                />
                <p className={`text-eyebrow uppercase tabular-nums ${i < 2 ? "text-ochre" : "text-muted"}`}>{evt.date}</p>
                <h3 className="mt-2 text-heading-lg text-ink">{evt.label}</h3>
                <p className="mt-2 max-w-[65ch] text-body-sm text-ink-700">{evt.body}</p>
                <p className="mt-3 text-caption text-muted">
                  <span className="font-semibold text-ink-700">{tx("Sanction max", "Maximum penalty")}</span> · {evt.penalty}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ==========================================================
          11. POURQUOI GREENTECHCYCLE #differentiators
         ========================================================== */}
      <Section id="differentiators" tone="cream">
        <FadeIn>
          <SectionHeader eyebrow={t("differentiators.eyebrow")} title={t("differentiators.title")} intro={t("differentiators.subtitle")} />
        </FadeIn>
        <StaggerContainer className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <StaggerItem key={i}>
              <div className="flex gap-4">
                <Pictogram icon={diffIcons[i] || Award} />
                <div>
                  <p className="text-eyebrow uppercase text-leaf">{d.stat}</p>
                  <h3 className="mt-2 text-heading-lg text-ink">{d.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-body-sm text-ink-700">{d.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-16 border-t border-line pt-10">
          <p className="text-eyebrow uppercase text-muted">{t("sectorTrust.label")}</p>
          <h3 className="mt-2 max-w-[32ch] text-display-sm text-ink">{t("sectorTrust.title")}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {sectorTrustItems.map((sector, i) => {
              const SIcon = sectorIconMap[sector.icon] || Building2;
              return (
                <li key={i} className={`flex gap-3 pr-4 ${i % 2 === 1 ? "border-l border-line pl-4" : ""} ${i === 2 ? "lg:border-l lg:border-line lg:pl-4" : ""}`}>
                  <Pictogram icon={SIcon} />
                  <div>
                    <p className="text-body-sm font-semibold text-ink">{sector.label}</p>
                    <p className="mt-1 text-caption text-muted">{sector.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* ==========================================================
          12. TÉMOIGNAGE — citation principale + verbatims (forest)
         ========================================================== */}
      <Section tone="forest">
        <FadeIn>
          <figure className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-ondark-line lg:h-48 lg:w-48">
              <Image
                src="/photos/hp-dsi-strategy.jpg"
                alt={tx(
                  "Décideur RSSI grand compte arbitrant un dossier ITAD (visage anonymisé)",
                  "Key-account CISO reviewing an ITAD file (face anonymised)"
                )}
                fill
                loading="lazy"
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="max-w-[65ch]">
              <p className="text-eyebrow uppercase text-ondark-muted">{t("bigQuote.eyebrow")}</p>
              <blockquote className="mt-4 font-display text-display-sm text-ondark">&laquo;&nbsp;{t("bigQuote.quote")}&nbsp;&raquo;</blockquote>
              <figcaption className="mt-6 text-caption text-ondark-muted">
                <span className="font-semibold text-ondark">{t("bigQuote.name")}</span> · {t("bigQuote.role")} · {t("bigQuote.company")}
              </figcaption>
              <p className="mt-4 text-caption text-ondark-muted">
                <span className="font-semibold text-ondark">{tx("Contexte :", "Context:")}</span> {t("bigQuote.context")}
              </p>
              <div className="mt-6">
                <TextLink href="/cas-usages#banque-cac40-windows11-nis2" tone="dark">
                  {t("bigQuote.ctaLabel")}
                </TextLink>
              </div>
              <p className="mt-6 text-caption italic text-ondark-muted">{t("bigQuote.consentNote")}</p>
            </div>
          </figure>
        </FadeIn>

        <div className="mt-16 border-t border-ondark-line pt-10">
          <p className="text-eyebrow uppercase text-ondark-muted">{t("testimonials.eyebrow")}</p>
          <h2 className="mt-2 max-w-[24ch] text-display-sm text-ondark">{t("testimonials.title")}</h2>
          <StaggerContainer className="mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <StaggerItem key={i} className="h-full">
                <figure className="flex h-full flex-col rounded-xl border border-ondark-line bg-forest-700 p-6">
                  <blockquote className="flex-1 text-body-sm text-ondark">&laquo;&nbsp;{item.quote}&nbsp;&raquo;</blockquote>
                  <figcaption className="mt-6 border-t border-ondark-line pt-4 text-caption text-ondark-muted">
                    <span className="font-semibold text-ondark">{item.name}</span> · {item.role} · {item.company}
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <p className="mt-6 max-w-[65ch] text-caption italic text-ondark-muted">{t("testimonials.disclaimer")}</p>
        </div>
      </Section>

      {/* ==========================================================
          13. TARIFS #pricing — 3 plans Waki Box + pilotes + ancres
         ========================================================== */}
      <Section id="pricing" tone="paper">
        <FadeIn>
          <SectionHeader eyebrow={t("pricingTeaser.eyebrow")} title={t("pricingTeaser.title")} intro={t("pricingTeaser.subtitle")} />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <StaggerItem key={plan.slug} className="h-full">
              <div className={`flex h-full flex-col rounded-xl border bg-paper p-6 ${plan.popular ? "border-leaf" : "border-line"}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-heading-lg text-ink">{plan.name}</h3>
                  {plan.popular && <Tag variant="brand">{t("pricingTeaser.popularLabel")}</Tag>}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-display-md tabular-nums text-forest">{plan.price}</span>
                  <span className="text-body-sm text-muted">€ HT/{tx("mois", "month")}</span>
                </p>
                <p className="mt-1 text-caption text-muted">
                  {t("pricingTeaser.setupLabel")} {plan.setup} € HT
                </p>
                <p className="mt-4 flex-1 text-body-sm text-ink-700">{plan.pitch}</p>
                <div className="mt-6">
                  <ButtonLink href={`/reserver?offre=${plan.slug}`} variant={plan.popular ? "primary" : "secondary"} fullWidth>
                    {t("pricingTeaser.bookCta")}
                  </ButtonLink>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ul className="mt-10 divide-y divide-line border-y border-line">
          <li className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-eyebrow uppercase text-muted">{t("pricingTeaser.piloteAudit.label")}</p>
              <p className="mt-2 text-heading-md text-ink">{t("pricingTeaser.piloteAudit.headline")}</p>
              <p className="mt-1 max-w-[65ch] text-body-sm text-ink-700">{t("pricingTeaser.piloteAudit.subline")}</p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="text-body font-semibold tabular-nums text-forest">{t("pricingTeaser.piloteAudit.price")}</p>
              <TextLink href="/reserver?offre=pilote-audit-3j">{t("pricingTeaser.piloteAudit.cta")}</TextLink>
            </div>
          </li>
          <li className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-eyebrow uppercase text-muted">{t("pricingTeaser.pilot.label")}</p>
              <p className="mt-2 text-heading-md text-ink">{t("pricingTeaser.pilot.headline")}</p>
            </div>
            <TextLink href="/reserver?offre=waki-box-pilote">{t("pricingTeaser.pilot.cta")}</TextLink>
          </li>
          <li className="grid gap-4 py-6 md:grid-cols-2">
            <div>
              <p className="text-eyebrow uppercase text-muted">{t("pricingTeaser.platformBrick")}</p>
              <p className="mt-2 text-heading-md tabular-nums text-forest">{t("pricingTeaser.platformAnchor")}</p>
              <p className="mt-1 text-body-sm text-ink-700">{t("pricingTeaser.platformDesc")}</p>
              <TextLink href="/tarifs" className="mt-3">{t("pricingTeaser.platformCta")}</TextLink>
            </div>
            <div className="md:border-l md:border-line md:pl-6">
              <p className="text-eyebrow uppercase text-muted">{t("pricingTeaser.itadBrick")}</p>
              <p className="mt-2 text-heading-md tabular-nums text-forest">{t("pricingTeaser.itadAnchor")}</p>
              <p className="mt-1 text-body-sm text-ink-700">{t("pricingTeaser.itadDesc")}</p>
              <TextLink href="/tarifs" className="mt-3">{t("pricingTeaser.itadCta")}</TextLink>
            </div>
          </li>
        </ul>
        <div className="mt-8">
          <TextLink href="/tarifs">{t("pricingTeaser.allPricingLink")}</TextLink>
        </div>
      </Section>

      {/* ==========================================================
          14. CALCULATEUR ROI #fleet-size — carte unique sur cream
         ========================================================== */}
      <Section tone="cream">
        <div className="mx-auto max-w-[720px]">
          <FadeIn>
            <SectionHeader eyebrow={t("roiCalculator.eyebrow")} title={t("roiCalculator.title")} />
            <Card pad="lg">
              <label htmlFor="fleet-size" className="block text-body-sm font-medium text-ink">
                {t("roiCalculator.inputLabel")}
              </label>
              <input
                id="fleet-size"
                type="number"
                min="1"
                inputMode="numeric"
                value={fleetSize}
                onChange={(e) => setFleetSize(e.target.value)}
                placeholder={t("roiCalculator.inputPlaceholder")}
                className="mt-2 h-12 w-full rounded-lg border border-line bg-paper px-3 text-body-lg tabular-nums text-ink placeholder:text-muted focus:border-leaf focus:outline-none focus:ring-2 focus:ring-leaf/20"
              />

              {fleet > 0 && (
                <div className="mt-8" aria-live="polite">
                  <p className="text-eyebrow uppercase text-muted">{t("roiCalculator.resultTitle")}</p>
                  <dl className="mt-3 divide-y divide-line border-y border-line">
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-ink-700">{t("roiCalculator.riskLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-ochre">{(fleet * 820).toLocaleString(numberLocale)} €</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-ink-700">{t("roiCalculator.valueLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-leaf">{(fleet * 412).toLocaleString(numberLocale)} €</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-ink-700">{t("roiCalculator.carbonLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-forest">
                        {((fleet * 150) / 1000).toLocaleString(numberLocale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} tCO₂e
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-6">
                    <ButtonLink href="/demo" size="lg" fullWidth>
                      {t("roiCalculator.cta")}
                    </ButtonLink>
                  </div>
                </div>
              )}
              <p className="mt-4 text-caption italic text-muted">{t("roiCalculator.disclaimer")}</p>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ==========================================================
          15. FAQ — accordéon
         ========================================================== */}
      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <FadeIn>
            <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          </FadeIn>
          <Accordion items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
          <div className="mt-8">
            <TextLink href="/faq">{tx("Voir les 24 questions de la FAQ technique", "See the 24 questions of the technical FAQ")}</TextLink>
          </div>
        </div>
      </Section>

      {/* ==========================================================
          16. CTA FINAL — un seul bloc
         ========================================================== */}
      <CtaSection
        eyebrow={t("finalCTA.eyebrow")}
        title={t("finalCTA.title")}
        subtitle={t("finalCTA.subtitle")}
        primaryLabel={t("finalCTA.cta1")}
        primaryHref="/demo"
        secondaryLabel={t("finalCTA.cta2")}
        secondaryHref="/contact"
        reassurance={
          <>
            <span className="sr-only">{tx("Garanties contractuelles : ", "Contractual guarantees: ")}</span>
            {trustBadges.join(" · ")}
          </>
        }
      />
    </div>
  );
}
