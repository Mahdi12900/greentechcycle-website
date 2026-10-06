"use client";

import DashboardMock, { type DashboardState } from "@/components/visuals/DashboardMock";
import GeometryField from "@/components/visuals/GeometryField";
import MediaSlot from "@/components/visuals/MediaSlot";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
  UserRound,
} from "lucide-react";
import { CountUp } from "@/components/motion";
import VideoBackground from "@/components/visuals/VideoBackground";
import FilmModal from "@/components/visuals/FilmModal";
import FilmSection from "@/components/FilmSection";
import SchemaOrg from "@/components/SchemaOrg";
import { videoObjectSchema } from "@/lib/seo";
import { SLOT_VIDEOS } from "@/content/media-slots";
import { KpiStat, KpiBar } from "@/components/kpi/Kpi";
import { KPIS } from "@/content/kpis";
import TrustBand from "@/components/TrustBand";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Card, { CardLink } from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import Pictogram from "@/components/ui/Pictogram";
import { StatRow } from "@/components/ui/Stat";
import Accordion from "@/components/ui/Accordion";
import FilterTabs from "@/components/ui/FilterTabs";

/**
 * Accueil — architecture « Épuré » (DESIGN.md §10.1).
 * paper (hero) → paper (enjeux, confiance) → cream (problème) → paper (solution)
 * → night (chaîne de valeur) → cream (preuves) → paper (calendrier)
 * → cream (différenciateurs) → forest (témoignage) → paper (tarifs)
 * → cream (ROI) → paper (FAQ) → forest (CTA) → night (footer).
 * Tous les ids d'ancre historiques sont conservés.
 */
const SOLUTION_STATES: DashboardState[] = ["inventory", "erasure", "reporting"];

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
  const lang = isEn ? "en" : "fr";
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
  // Pictogrammes des 3 cas (banque, hôpital, industrie) — visuels codés à la place des photos
  const caseIcons = [Landmark, HeartPulse, Factory];

  const plans = t.raw("pricingTeaser.plans") as Array<{
    name: string;
    price: string;
    setup: string;
    pitch: string;
    slug: string;
    popular?: boolean;
  }>;

  // Donnée structurée VideoObject du film de marque (plan SEO du 2026-10-05) : exposée une
  // fois pour toute la page (hero + section « le film » jouent la même vidéo "brand-film").
  const brandFilmSpec = SLOT_VIDEOS["brand-film"];

  /* Onglets de la section Solution (JFrog-inspired, reports/revue-section-gtc.md §5) */
  const solutionSteps = [
    { id: "inventory", title: tx("Inventorier", "Inventory"), pillars: [0] },
    { id: "erasure", title: tx("Effacer & certifier", "Erase & certify"), pillars: [1] },
    { id: "reporting", title: tx("Valoriser & reporter", "Recover value & report"), pillars: [2, 3] },
  ];
  const [activeSolutionStep, setActiveSolutionStep] = useState(solutionSteps[0].id);
  const activeSolutionIndex = Math.max(0, solutionSteps.findIndex((s) => s.id === activeSolutionStep));
  const currentSolutionStep = solutionSteps[activeSolutionIndex];

  return (
    <div className="bg-bg">
      {brandFilmSpec && <SchemaOrg data={videoObjectSchema(brandFilmSpec, lang)} />}
      {/* ==========================================================
          1–2. HERO — notice CSRD intégrée, split 7/5, preuve chiffrée
         ========================================================== */}
      {/* Padding resserré le 2026-10-05 : 128px → 80px desktop (reports/espacement-sections-gtc.md) */}
      <section className="relative overflow-hidden bg-bg py-14 lg:py-20" aria-labelledby="hero-title">
        {/* Fond vidéo : teaser muet 10 s du film v3 (registre SLOT_VIDEOS) ; poster rendu côté
            serveur (LCP), vidéo chargée après `load`, poster seul en mouvement réduit / Save-Data */}
        <VideoBackground id="home-hero-background" />
        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Link
                href="/reglementation"
                className="inline-flex min-h-[28px] max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-amber-dim sm:rounded-full px-3 py-1 text-caption font-semibold text-amber transition-colors hover:text-fg"
              >
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{t("urgency.text")}</span>
                <span className="whitespace-nowrap underline-offset-2 hover:underline">{t("urgency.cta")}</span>
              </Link>

              <div className="mt-6">
                <Tag variant="neutral">{t("hero.eyebrow")}</Tag>
              </div>

              <h1 id="hero-title" className="mt-6 max-w-[22ch] text-display-lg text-fg">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>

              {heroStat && (
                <div className="mt-8 flex max-w-[65ch] items-start gap-6 border-l-2 border-emerald pl-6">
                  <p className="whitespace-nowrap text-display-xl leading-none text-emerald" data-kpi="manufacturing">
                    <CountUp end={KPIS.manufacturing.value} suffix={KPIS.manufacturing.unit[lang].replace(" ", "\u00a0")} />
                  </p>
                  <p className="text-body-sm text-fg-strong">{heroStatText}</p>
                </div>
              )}
              {!heroStat && <p className="mt-6 max-w-[65ch] text-body-sm text-fg-strong">{proof}</p>}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/demo" size="lg">
                  {t("hero.cta1")}
                </ButtonLink>
                <ButtonLink href="/contact" variant="secondary" size="lg">
                  {t("hero.cta2")}
                </ButtonLink>
              </div>
              {/* Film de marque v3 (2:54, voix off anglaise) en modale plein écran, lecture avec le son */}
              <FilmModal id="brand-film" placement="home-hero" className="mt-4" />

              <p className="mt-6 max-w-[65ch] text-caption italic text-fg-muted">{t("hero.source")}</p>
            </div>

            <div className="reveal lg:col-span-5">
              <div className="parallax-slow relative aspect-[4/5] overflow-hidden rounded-2xl border border-track shadow-float">
                <MediaSlot fill id="home-hero" alt={tx(
                    "Atelier de reconditionnement GreenTechCycle, chaîne d'effacement et de tri",
                    "GreenTechCycle refurbishment workshop, erasure and sorting line"
                  )} fallback={<DashboardMock state="inventory" />} />
              </div>
              <div className="mt-6 grid grid-cols-2 border-t border-track pt-6">
                <div className="pr-4">
                  <p className="text-eyebrow uppercase text-fg-muted">Audit ACPR</p>
                  <p className="mt-2 font-display text-display-sm text-emerald">{tx("4 jours", "4 days")}</p>
                  <p className="mt-1 text-caption text-fg-muted">{tx("vs 3 semaines en moyenne", "vs 3 weeks on average")}</p>
                </div>
                {/* Ancienne tuile « Valeur récupérée 638 k€ » retirée (aucun montant publié, décision 2026-10-04) */}
                <div className="border-l border-track pl-4" data-kpi="reuse">
                  <p className="text-eyebrow uppercase text-fg-muted">{tx("Réemploi", "Reuse")}</p>
                  <p className="mt-2 font-display text-display-sm text-emerald">
                    <CountUp end={KPIS.reuse.value} suffix={KPIS.reuse.unit[lang]} />
                  </p>
                  <KpiBar value={KPIS.reuse.value} className="mt-3" />
                  <p className="mt-2 text-caption text-fg-muted">{KPIS.reuse.label[lang]} · {KPIS.reuse.period[lang]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-track pt-6 text-caption text-fg-strong">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust1")}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust2")}
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald" strokeWidth={1.75} aria-hidden="true" />
              {t("hero.trust3")}
            </span>
          </div>
          <CertificationStrip className="mt-3" />
        </div>
      </section>

      {/* ==========================================================
          3. ENJEUX — condensés en une ligne de 4 liens texte
         ========================================================== */}
      <section className="border-t border-track bg-bg py-8" aria-labelledby="enjeux-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[200px_1fr] lg:items-start">
            <div>
              <p className="text-eyebrow uppercase text-fg-muted">{t("enjeuCards.eyebrow")}</p>
              <h2 id="enjeux-title" className="sr-only">
                {t("enjeuCards.title")}
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {enjeuCards.map((card) => (
                <li key={card.title}>
                  <TextLink href={card.href}>{card.title}</TextLink>
                  <p className="mt-1 text-caption text-fg-muted">{card.desc}</p>
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
          5 bis. LE FILM — lecteur chapitré + 5 enseignements sourcés
         ========================================================== */}
      <FilmSection id="brand-film" />

      {/* ==========================================================
          6. PROBLÈME — le coût caché, 3 risques chiffrés
         ========================================================== */}
      <Section tone="cream">
        <div className="reveal">
          <SectionHeader alert eyebrow={t("problem.eyebrow")} title={t("problem.title")} intro={t("problem.subtitle")} />
        </div>
        <div className="reveal-stagger grid gap-6 md:grid-cols-3">
          {problemItems.map((item, i) => (
            <div key={i} className="reveal h-full">
              <Card className="flex h-full flex-col">
                <div className="mb-6 flex items-center gap-3">
                  <Pictogram icon={problemIcons[i] || AlertTriangle} alert />
                  <span className="text-eyebrow uppercase text-amber">{item.tag}</span>
                </div>
                <h3 className="mb-3 text-heading-lg text-fg">{item.title}</h3>
                <p className="mb-4 flex-1 text-body-sm text-fg-strong">{item.body}</p>
                <p className="border-t border-track pt-3 text-caption italic text-fg-muted">{item.source}</p>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* ==========================================================
          7. SOLUTION #solution — 4 piliers + avant/après condensé
         ========================================================== */}
      <Section id="solution" tone="paper">
        <div className="reveal">
          <SectionHeader eyebrow={t("solution.eyebrow")} title={t("solution.title")} intro={t("solution.body")} />
        </div>
        <p className="text-eyebrow uppercase text-fg-muted">
          {t("solution.diagramCenter")} · <span className="text-fg-strong">{t("solution.diagramCenterSub")}</span>
        </p>
        {/* Onglets de services cliquables (JFrog-inspired, reports/revue-section-gtc.md §5) :
            remplace le scroll épinglé par une sélection directe, même contenu existant. */}
        <div className="mt-6">
          <FilterTabs
            items={solutionSteps.map((s) => ({ id: s.id, label: s.title }))}
            active={activeSolutionStep}
            onChange={setActiveSolutionStep}
            label={t("solution.title")}
          />
        </div>
        <div
          id={`panel-${currentSolutionStep.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentSolutionStep.id}`}
          className="mt-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="reveal lg:col-span-6">
            <p className="text-eyebrow uppercase text-fg-muted">{`0${activeSolutionIndex + 1}`}</p>
            <ul className="mt-4 space-y-4">
              {currentSolutionStep.pillars.map((i) => (
                <li key={i} className="flex gap-4">
                  <Pictogram icon={pillarIcons[i] || Server} />
                  <div>
                    <p className="text-heading-md text-fg">{solutionPillars[i]?.label}</p>
                    <p className="mt-1 text-body-sm text-fg-strong">{solutionPillars[i]?.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal lg:col-span-6">
            <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-track shadow-float">
              <DashboardMock state={SOLUTION_STATES[activeSolutionIndex]} />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="reveal min-w-0 lg:col-span-10 lg:col-start-2">
            <p className="text-eyebrow uppercase text-fg-muted">{t("comparison.eyebrow")}</p>
            <h3 className="mt-2 text-display-sm text-fg">{t("comparison.title")}</h3>
            <p className="mt-2 max-w-[65ch] text-body-sm text-fg-strong">{t("comparison.subtitle")}</p>
            <div className="mt-6 overflow-hidden rounded-xl border border-track">
              <table className="w-full border-collapse text-body-sm">
                <caption className="sr-only">{t("comparison.title")}</caption>
                <thead>
                  <tr className="bg-bg-card">
                    <th scope="col" className="w-1/2 px-4 py-3 text-left text-eyebrow uppercase text-fg-muted">
                      {t("comparison.before.label")}
                    </th>
                    <th scope="col" className="w-1/2 border-l border-track px-4 py-3 text-left text-eyebrow uppercase text-emerald">
                      {t("comparison.after.label")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {beforeItems.map((before, i) => (
                    <tr key={i} className={`border-t border-track ${i % 2 === 1 ? "bg-white/[0.03]" : ""}`}>
                      <td className="px-4 py-3 align-top text-fg-strong">
                        <span className="flex gap-2">
                          <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-fg-muted" aria-hidden="true" />
                          {before}
                        </span>
                      </td>
                      <td className="border-l border-track px-4 py-3 align-top font-medium text-fg">
                        <span className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
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
          </div>
        </div>
      </Section>

      {/* ==========================================================
          8. CHAÎNE DE VALEUR — 5 étapes numérotées (night)
         ========================================================== */}
      <Section tone="night">
        <div className="reveal">
          <SectionHeader tone="dark" eyebrow={t("valueChain.eyebrow")} title={t("valueChain.title")} intro={t("valueChain.subtitle")} />
        </div>
        <div className="reveal-stagger grid gap-px overflow-hidden rounded-xl border border-track bg-track sm:grid-cols-2 lg:grid-cols-5">
          {valueSteps.map((step, i) => (
            <div key={i} className="reveal h-full">
              <div className="flex h-full flex-col bg-bg-card p-6">
                <p className="text-eyebrow uppercase text-fg-muted">{step.n}</p>
                <h3 className="mt-3 text-heading-md text-fg">{step.title}</h3>
                <p className="mt-3 flex-1 text-body-sm text-fg-muted">{step.desc}</p>
                <div className="mt-6 border-t border-track pt-4">
                  <p className="text-eyebrow uppercase text-fg-muted">SLA / KPI</p>
                  <p className="mt-1 text-body-sm font-semibold text-emerald">{step.kpi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ==========================================================
          9. PREUVES #cases — KPI mesurés + 3 cas clients (fusion)
         ========================================================== */}
      <Section id="cases" tone="cream">
        <div className="reveal">
          <SectionHeader eyebrow={t("proof.eyebrow")} title={t("proof.title")} />
        </div>
        {/* Chiffres lus dans le registre unique src/content/kpis.ts (plus de montant en euros) */}
        <StatRow>
          {(["clients", "assets", "reuse", "carbon"] as const).map((k) => (
            <KpiStat key={k} id={k} />
          ))}
        </StatRow>
        <p className="mt-8 max-w-[65ch] text-caption italic text-fg-muted">{t("proof.footnote")}</p>

        <div className="mt-16 flex flex-col gap-6 border-t border-track pt-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-eyebrow uppercase text-fg-muted">{t("cases.eyebrow")}</p>
            <h3 className="max-w-[24ch] text-display-sm text-fg">{t("cases.title")}</h3>
            <p className="mt-3 max-w-[65ch] text-body text-fg-strong">{t("cases.subtitle")}</p>
          </div>
          <TextLink href="/cas-usages" className="flex-shrink-0">
            {t("cases.discoverAll")}
          </TextLink>
        </div>
        <div className="reveal-stagger mt-10 grid gap-6 md:grid-cols-3">
          {cases.map((c, i) => (
            <div key={c.slug} className="reveal h-full">
              <CardLink href={`/cas-usages#${c.slug}`} pad="none" cta={t("cases.cardCta")}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl border-b border-track">
                  <MediaSlot fill id={`home-case-${c.slug}`} alt={tx(`Photo sectorielle illustrant le cas ${c.sector}`, `Sector photo illustrating the ${c.sector} case`)} fallback={<GeometryField icon={caseIcons[i]} />} />
                </div>
                <div className="flex flex-1 flex-col px-6 pt-6">
                  <div className="flex flex-wrap gap-2">
                    <Tag variant="brand">{c.sector}</Tag>
                    <Tag variant="alert">{c.regulation}</Tag>
                  </div>
                  <h4 className="mt-4 text-heading-md text-fg transition-colors group-hover:text-emerald">{c.title}</h4>
                  <ul className="mt-4 space-y-2">
                    {c.results.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-body-sm text-fg-strong">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardLink>
            </div>
          ))}
        </div>
      </Section>

      {/* ==========================================================
          10. CALENDRIER RÉGLEMENTAIRE #compliance — timeline verticale
         ========================================================== */}
      <Section id="compliance" tone="paper">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <SectionHeader alert eyebrow={t("regTimeline.eyebrow")} title={t("regTimeline.title")} intro={t("regTimeline.subtitle")} />
          </div>
          <ol className="relative border-l border-track lg:col-span-7">
            {regEvents.map((evt, i) => (
              <li key={i} className="relative pb-10 pl-8 last:pb-0">
                <span
                  className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full ${i < 2 ? "bg-amber" : "bg-bg-card"}`}
                  aria-hidden="true"
                />
                <p className={`text-eyebrow uppercase tabular-nums ${i < 2 ? "text-amber" : "text-fg-muted"}`}>{evt.date}</p>
                <h3 className="mt-2 text-heading-lg text-fg">{evt.label}</h3>
                <p className="mt-2 max-w-[65ch] text-body-sm text-fg-strong">{evt.body}</p>
                <p className="mt-3 text-caption text-fg-muted">
                  <span className="font-semibold text-fg-strong">{tx("Sanction max", "Maximum penalty")}</span> · {evt.penalty}
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
        <div className="reveal">
          <SectionHeader eyebrow={t("differentiators.eyebrow")} title={t("differentiators.title")} intro={t("differentiators.subtitle")} />
        </div>
        <div className="reveal-stagger grid gap-x-12 gap-y-10 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <div key={i} className="reveal">
              <div className="flex gap-4">
                <Pictogram icon={diffIcons[i] || Award} />
                <div>
                  <p className="text-eyebrow uppercase text-emerald">{d.stat}</p>
                  <h3 className="mt-2 text-heading-lg text-fg">{d.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-body-sm text-fg-strong">{d.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-track pt-10">
          <p className="text-eyebrow uppercase text-fg-muted">{t("sectorTrust.label")}</p>
          <h3 className="mt-2 max-w-[32ch] text-display-sm text-fg">{t("sectorTrust.title")}</h3>
          <ul className="mt-8 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {sectorTrustItems.map((sector, i) => {
              const SIcon = sectorIconMap[sector.icon] || Building2;
              return (
                <li key={i} className={`flex gap-3 pr-4 ${i % 2 === 1 ? "border-l border-track pl-4" : ""} ${i === 2 ? "lg:border-l lg:border-track lg:pl-4" : ""}`}>
                  <Pictogram icon={SIcon} />
                  <div>
                    <p className="text-body-sm font-semibold text-fg">{sector.label}</p>
                    <p className="mt-1 text-caption text-fg-muted">{sector.detail}</p>
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
        <div className="reveal">
          <figure className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <div className="relative h-40 w-40 overflow-hidden rounded-2xl border border-track lg:h-48 lg:w-48">
              <MediaSlot fill id="home-testimonial" alt={tx(
                  "Décideur RSSI grand compte arbitrant un dossier ITAD (visage anonymisé)",
                  "Key-account CISO reviewing an ITAD file (face anonymised)"
                )} fallback={<GeometryField icon={UserRound} />} />
            </div>
            <div className="max-w-[65ch]">
              <p className="text-eyebrow uppercase text-fg-muted">{t("bigQuote.eyebrow")}</p>
              <blockquote className="mt-4 font-display text-display-sm text-fg">&laquo;&nbsp;{t("bigQuote.quote")}&nbsp;&raquo;</blockquote>
              <figcaption className="mt-6 text-caption text-fg-muted">
                <span className="font-semibold text-fg">{t("bigQuote.name")}</span> · {t("bigQuote.role")} · {t("bigQuote.company")}
              </figcaption>
              <p className="mt-4 text-caption text-fg-muted">
                <span className="font-semibold text-fg">{tx("Contexte :", "Context:")}</span> {t("bigQuote.context")}
              </p>
              <div className="mt-6">
                <TextLink href="/cas-usages#banque-cac40-windows11-nis2" tone="dark">
                  {t("bigQuote.ctaLabel")}
                </TextLink>
              </div>
              <p className="mt-6 text-caption italic text-fg-muted">{t("bigQuote.consentNote")}</p>
            </div>
          </figure>
        </div>

        <div className="mt-16 border-t border-track pt-10">
          <p className="text-eyebrow uppercase text-fg-muted">{t("testimonials.eyebrow")}</p>
          <h2 className="mt-2 max-w-[24ch] text-display-sm text-fg">{t("testimonials.title")}</h2>
          <div className="reveal-stagger mt-8 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <div key={i} className="reveal h-full">
                <figure className="flex h-full flex-col rounded-xl border border-track bg-emerald-dim p-6">
                  <blockquote className="flex-1 text-body-sm text-fg">&laquo;&nbsp;{item.quote}&nbsp;&raquo;</blockquote>
                  <figcaption className="mt-6 border-t border-track pt-4 text-caption text-fg-muted">
                    <span className="font-semibold text-fg">{item.name}</span> · {item.role} · {item.company}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-[65ch] text-caption italic text-fg-muted">{t("testimonials.disclaimer")}</p>
        </div>
      </Section>

      {/* ==========================================================
          13. TARIFS #pricing — 3 plans Waki Box + pilotes + ancres
         ========================================================== */}
      {/* Même fond que la section forest précédente, sans bordure : padding haut retiré */}
      <Section id="pricing" tone="paper" collapseTop>
        <div className="reveal">
          <SectionHeader eyebrow={t("pricingTeaser.eyebrow")} title={t("pricingTeaser.title")} intro={t("pricingTeaser.subtitle")} />
        </div>
        <div className="reveal-stagger grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.slug} className="reveal h-full">
              <div className={`flex h-full flex-col rounded-xl border bg-bg p-6 ${plan.popular ? "border-emerald" : "border-track"}`}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-heading-lg text-fg">{plan.name}</h3>
                  {plan.popular && <Tag variant="brand">{t("pricingTeaser.popularLabel")}</Tag>}
                </div>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-display-md tabular-nums text-emerald">{plan.price}</span>
                  <span className="text-body-sm text-fg-muted">€ HT/{tx("mois", "month")}</span>
                </p>
                <p className="mt-1 text-caption text-fg-muted">
                  {t("pricingTeaser.setupLabel")} {plan.setup} € HT
                </p>
                <p className="mt-4 flex-1 text-body-sm text-fg-strong">{plan.pitch}</p>
                <div className="mt-6">
                  <ButtonLink href={`/reserver?offre=${plan.slug}`} variant={plan.popular ? "primary" : "secondary"} fullWidth>
                    {t("pricingTeaser.bookCta")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ul className="mt-10 divide-y divide-track border-y border-track">
          <li className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-eyebrow uppercase text-fg-muted">{t("pricingTeaser.piloteAudit.label")}</p>
              <p className="mt-2 text-heading-md text-fg">{t("pricingTeaser.piloteAudit.headline")}</p>
              <p className="mt-1 max-w-[65ch] text-body-sm text-fg-strong">{t("pricingTeaser.piloteAudit.subline")}</p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="text-body font-semibold tabular-nums text-emerald">{t("pricingTeaser.piloteAudit.price")}</p>
              <TextLink href="/reserver?offre=pilote-audit-3j">{t("pricingTeaser.piloteAudit.cta")}</TextLink>
            </div>
          </li>
          <li className="grid gap-4 py-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-eyebrow uppercase text-fg-muted">{t("pricingTeaser.pilot.label")}</p>
              <p className="mt-2 text-heading-md text-fg">{t("pricingTeaser.pilot.headline")}</p>
            </div>
            <TextLink href="/reserver?offre=waki-box-pilote">{t("pricingTeaser.pilot.cta")}</TextLink>
          </li>
          <li className="grid gap-4 py-6 md:grid-cols-2">
            <div>
              <p className="text-eyebrow uppercase text-fg-muted">{t("pricingTeaser.platformBrick")}</p>
              <p className="mt-2 text-heading-md tabular-nums text-emerald">{t("pricingTeaser.platformAnchor")}</p>
              <p className="mt-1 text-body-sm text-fg-strong">{t("pricingTeaser.platformDesc")}</p>
              <TextLink href="/tarifs" className="mt-3">{t("pricingTeaser.platformCta")}</TextLink>
            </div>
            <div className="md:border-l md:border-track md:pl-6">
              <p className="text-eyebrow uppercase text-fg-muted">{t("pricingTeaser.itadBrick")}</p>
              <p className="mt-2 text-heading-md tabular-nums text-emerald">{t("pricingTeaser.itadAnchor")}</p>
              <p className="mt-1 text-body-sm text-fg-strong">{t("pricingTeaser.itadDesc")}</p>
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
          <div className="reveal">
            <SectionHeader eyebrow={t("roiCalculator.eyebrow")} title={t("roiCalculator.title")} />
            <Card pad="lg">
              <label htmlFor="fleet-size" className="block text-body-sm font-medium text-fg">
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
                className="mt-2 h-12 w-full rounded-lg border border-track bg-bg px-3 text-body-lg tabular-nums text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
              />

              {fleet > 0 && (
                <div className="mt-8" aria-live="polite">
                  <p className="text-eyebrow uppercase text-fg-muted">{t("roiCalculator.resultTitle")}</p>
                  <dl className="mt-3 divide-y divide-track border-y border-track">
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-fg-strong">{t("roiCalculator.riskLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-amber">{(fleet * 820).toLocaleString(numberLocale)} €</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-fg-strong">{t("roiCalculator.valueLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-emerald">{(fleet * 412).toLocaleString(numberLocale)} €</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-body-sm text-fg-strong">{t("roiCalculator.carbonLabel")}</dt>
                      <dd className="text-heading-md tabular-nums text-emerald">
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
              <p className="mt-4 text-caption italic text-fg-muted">{t("roiCalculator.disclaimer")}</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* ==========================================================
          15. FAQ — accordéon
         ========================================================== */}
      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <div className="reveal">
            <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          </div>
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
