"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { CountUp } from "@/components/motion";
import {
  ArrowDown,
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Zap,
  Radio,
  GraduationCap,
  ShieldCheck,
  Leaf,
  Euro,
  Send,
  CheckCircle2,
  MonitorPlay,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import { Button, ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";
import { Stat, StatRow } from "@/components/ui/Stat";

/**
 * /cas-usages — DESIGN.md §10.7.
 * hero (paper) → chiffres (night) → intro + différenciateurs + partenaires (paper)
 * → cas phare TF1 #cas-tf1-media (forest) → 8 cas en grille 2 colonnes (cream)
 * → comparatif en tableau (paper) → témoignages (night) → FAQ (paper)
 * → passerelle secteurs (cream) → CTA unique (forest, avec mini-formulaire).
 * Ids conservés : #cas-<slug>, #cas-tf1-media. Alias ajoutés pour les liens
 * entrants existants (accueil, résultats clients) qui pointaient dans le vide.
 */
/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type KPIItem = { label: string; value: string; detail: string };
type CaseItem = {
  slug: string;
  sector: string;
  badgeColor: string;
  photo: string;
  photoAlt: string;
  title: string;
  subtitle: string;
  metrics: KPIItem[];
  quote: string;
  quoteName: string;
  quoteRole: string;
  quoteSector: string;
};
type MatrixRow = string[];

/* ─────────────────────────────────────────────────────────────────────────────
   Per-case sector icons
───────────────────────────────────────────────────────────────────────────── */
const CASE_ICONS = [
  Building2,
  HeartPulse,
  Factory,
  Landmark,
  ShoppingBag,
  Zap,
  Radio,
  GraduationCap,
] as const;

/* ─────────────────────────────────────────────────────────────────────────────
   Mapping cas → fiche secteur (slug du nouveau hub /secteurs)
───────────────────────────────────────────────────────────────────────────── */
const CASE_TO_SECTOR: Record<string, { slug: string; labelFr: string; labelEn: string }> = {
  "banque-cac40": { slug: "finance", labelFr: "Banque, assurance et services financiers", labelEn: "Banking, insurance and financial services" },
  "chu-sante": { slug: "sante", labelFr: "Santé et hôpitaux", labelEn: "Healthcare and hospitals" },
  "industriel-csrd": { slug: "industrie", labelFr: "Industrie et manufacturing", labelEn: "Industry and manufacturing" },
  "ministere-collectivite": { slug: "public", labelFr: "Secteur public et collectivités", labelEn: "Public sector and local authorities" },
  "retail-wakibox": { slug: "retail", labelFr: "Retail et grande distribution", labelEn: "Retail and large-scale distribution" },
  "energie-dora": { slug: "energie", labelFr: "Énergie et utilities", labelEn: "Energy and utilities" },
  "telco-datacenter": { slug: "telecom", labelFr: "Télécom et opérateurs", labelEn: "Telecom and operators" },
  "universite-ess": { slug: "education-recherche", labelFr: "Éducation et recherche", labelEn: "Education and research" },
};


/* Alias d'ancre : slugs utilisés par /[locale] et /resultats-clients */
const CASE_ALIASES: Record<string, string[]> = {
  "banque-cac40": ["banque-cac40-windows11-nis2"],
  "chu-sante": ["chu-public-rgpd-sante"],
  "industriel-csrd": ["industriel-csrd-esrs-e5", "industrie-automobile-csrd"],
  "ministere-collectivite": ["collectivite-territoriale"],
  "retail-wakibox": ["retail-fermeture-sites"],
  "energie-dora": ["energie-dora-compliance"],
};

/* ─────────────────────────────────────────────────────────────────────────────
   Carte de cas — grille régulière 2 colonnes
───────────────────────────────────────────────────────────────────────────── */
function CaseCard({ c, index, editorialBody, isFr }: { c: CaseItem; index: number; editorialBody: string; isFr: boolean }) {
  const sectorLink = CASE_TO_SECTOR[c.slug];
  const CaseIcon = CASE_ICONS[index] ?? Building2;
  return (
    <article id={`cas-${c.slug}`} aria-labelledby={`case-title-${c.slug}`} className="relative flex h-full flex-col overflow-hidden rounded-xl border border-track bg-bg">
      {(CASE_ALIASES[c.slug] ?? []).map((a) => (
        <span key={a} id={a} className="absolute top-0" aria-hidden="true" />
      ))}
      <div className="relative aspect-[16/10] border-b border-track">
        <Image src={c.photo} alt={c.photoAlt} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <div className="flex items-center gap-3">
          <Pictogram icon={CaseIcon} />
          <Tag variant="brand">{c.sector}</Tag>
        </div>
        <p className="mt-6 text-eyebrow uppercase text-fg-muted">{String(index + 1).padStart(2, "0")}</p>
        <h2 id={`case-title-${c.slug}`} className="mt-2 font-display text-display-sm text-fg">{c.title}</h2>
        <p className="mt-3 text-body-sm text-fg-strong">{editorialBody}</p>
        <dl className="mt-6 grid grid-cols-3 border-y border-track py-4">
          {c.metrics.slice(0, 3).map((kpi, j) => (
            <div key={j} className={`flex flex-col-reverse justify-end ${j > 0 ? "border-l border-track pl-3" : "pr-3"}`}>
              <dt className="mt-1 text-caption text-fg-strong">
                <span className="block font-semibold text-fg">{kpi.label}</span>
                <span className="text-fg-muted">{kpi.detail}</span>
              </dt>
              <dd className="font-display text-display-sm tabular-nums text-emerald">{kpi.value}</dd>
            </div>
          ))}
        </dl>
        <figure className="mt-6 flex-1 border-l-2 border-emerald pl-4">
          <blockquote className="text-body-sm italic text-fg">&laquo;&nbsp;{c.quote}&nbsp;&raquo;</blockquote>
          <figcaption className="mt-2 text-caption text-fg-muted">
            <span className="font-semibold text-fg-strong">{c.quoteName}</span> · {c.quoteRole} · {c.quoteSector}
          </figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href={`/contact?cas=${c.slug}`} variant="secondary">
            {isFr ? "Discuter d'un cas similaire" : "Discuss a similar case"}
          </ButtonLink>
          {sectorLink && (
            <TextLink href={`/secteurs/${sectorLink.slug}`}>
              {isFr ? "Fiche secteur" : "Sector profile"} : {sectorLink[isFr ? "labelFr" : "labelEn"]}
            </TextLink>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function CasUsagesPage() {
  const t = useTranslations("casUsages");
  const locale = useLocale();
  const isFr = locale === "fr";
  const tx = (fr: string, en: string) => (isFr ? fr : en);

  const cases = t.raw("cases.items") as CaseItem[];
  const kpiItems = t.raw("kpis.items") as Array<{ value: number; suffix: string; label: string; source: string }>;
  const editorialBodies = t.raw("editorialBodies") as Record<string, string>;
  const matrixHeaders = t.raw("matrix.headers") as string[];
  const matrixRows = t.raw("matrix.rows") as MatrixRow[];
  const trustBadges = t.raw("finalCta.trustBadges") as string[];
  const testimonials = t.raw("testimonials.items") as Array<{ quote: string; name: string; role: string; sector: string }>;
  const faqItems = t.raw("faq.items") as Array<{ q: string; a: string }>;
  const tf1 = t.raw("featuredTf1") as {
    eyebrow: string; badge: string; title: string; subtitle: string; body: string; photo: string; photoAlt: string;
    metrics: KPIItem[]; quote: string; quoteName: string; quoteRole: string; quoteSector: string;
    cta: string; ctaHref: string; ctaSecondary: string; scrollTarget: string;
  };

  const [formData, setFormData] = useState({ company: "", sector: "", challenge: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const differentiators = [
    {
      icon: ShieldCheck,
      tag: tx("Sécurité irréprochable", "Flawless security"),
      title: tx("Traçabilité end-to-end certifiée", "Certified end-to-end traceability"),
      body: tx(
        "Chaque support traité reçoit un certificat NIST 800-88 r2 individuel, horodaté, avec hash SHA-256. Piste d'audit exploitable immédiatement par vos auditeurs ACPR, Big 4 ou DPO.",
        "Every processed medium receives an individual, timestamped NIST 800-88 r2 certificate with a SHA-256 hash. An audit trail your ACPR, Big 4 or DPO auditors can use immediately."
      ),
    },
    {
      icon: Euro,
      tag: tx("ROI démontrable", "Demonstrable ROI"),
      title: tx("Valeur récupérée bien au-delà des estimations", "Value recovered well beyond estimates"),
      body: tx(
        "Notre réseau d'acheteurs qualifiés en secondaire international permet de récupérer en moyenne 3× la valeur estimée en interne. Le ROI de chaque mission est documenté à J+30.",
        "Our network of qualified international secondary-market buyers recovers on average 3× the internally estimated value. The ROI of every mission is documented at D+30."
      ),
    },
    {
      icon: Leaf,
      tag: tx("Impact mesurable", "Measurable impact"),
      title: tx("Scope 3 audit-ready, première itération", "Audit-ready Scope 3, first iteration"),
      body: tx(
        "Nos bilans CO₂ suivent la méthodologie Boavizta/ADEME, exportables directement au format GRI/ESRS E5. Validés sans réserve par les cabinets Big 4 dès la première publication CSRD.",
        "Our CO₂ assessments follow the Boavizta/ADEME methodology, exportable directly in GRI/ESRS E5 format. Approved without reservation by Big 4 firms from the first CSRD publication."
      ),
    },
  ];

  const sectorCatalogue = (Object.values(CASE_TO_SECTOR) as Array<{ slug: string; labelFr: string; labelEn: string }>).concat([
    { slug: "medias-audiovisuel", labelFr: "Médias et audiovisuel", labelEn: "Media and broadcast" },
    { slug: "tech", labelFr: "Tech et services numériques", labelEn: "Tech and digital services" },
    { slug: "conseil", labelFr: "Conseil, audit et services pro", labelEn: "Consulting, audit and pro services" },
    { slug: "transport-logistique", labelFr: "Transport et logistique", labelEn: "Transport and logistics" },
    { slug: "pharma-biotech", labelFr: "Pharmaceutique et biotech", labelEn: "Pharma and biotech" },
    { slug: "btp", labelFr: "Construction et BTP", labelEn: "Construction" },
    { slug: "horeca", labelFr: "Hôtellerie et tourisme", labelEn: "Hospitality and tourism" },
    { slug: "agroalimentaire", labelFr: "Agroalimentaire", labelEn: "Food industry" },
  ]);

  const field =
    "mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <div>
      {/* ═══ HERO paper ═══ */}
      <section className="bg-bg py-16 lg:py-24" aria-labelledby="hero-editorial-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="brand" icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />}>
                {tx(
                  "38 000+ certificats NIST 800-88 émis · 6 200 tCO2e évitées · Réponse audit sous 72h",
                  "38,000+ NIST 800-88 certificates issued · 6,200 tCO2e avoided · Audit response within 72h"
                )}
              </Tag>
              <p className="mt-6 text-eyebrow uppercase text-fg-muted">{t("editorialHero.featuredLabel")}</p>
              <h1 id="hero-editorial-title" className="mt-3 max-w-[22ch] text-display-lg text-fg">{t("editorialHero.headline")}</h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("editorialHero.subtitle")}</p>
              <dl className="mt-8 grid max-w-[600px] grid-cols-3 border-y border-track py-6">
                {[
                  { v: "1 850", unit: "tCO₂e", l: tx("évitées en 4 ans", "avoided in 4 years") },
                  { v: "638 k€", unit: "", l: tx("valeur récupérée", "value recovered") },
                  { v: tx("4 jours", "4 days"), unit: "", l: tx("audit ACPR réussi", "ACPR audit passed") },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col-reverse justify-end ${i > 0 ? "border-l border-track pl-4" : "pr-4"}`}>
                    <dt className="mt-1 text-caption text-fg-muted">{item.l}</dt>
                    <dd className="font-display text-display-sm tabular-nums text-emerald">
                      {item.v}
                      {item.unit && <span className="ml-1 font-sans text-body-sm text-fg-strong">{item.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">{t("editorialHero.cta1")}</ButtonLink>
                <ButtonLink href="/demo" variant="secondary" size="lg">{t("editorialHero.cta2")}</ButtonLink>
              </div>
              <a href="#cas-banque-cac40" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-fg-muted hover:text-fg">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("editorialHero.scrollCta")}
              </a>
            </div>
            <div className="reveal lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                  <Image
                    src="/photos/case-banque.jpg"
                    alt={tx(
                      "Infrastructure IT d'une banque CAC40 lors d'une mission de décommissionnement GreenTechCycle",
                      "IT infrastructure of a CAC40 bank during a GreenTechCycle decommissioning mission"
                    )}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <figcaption className="mt-6 border-l-2 border-emerald pl-4">
                  <p className="text-body-sm text-fg">
                    &laquo;&nbsp;{tx("GTC a transformé notre contrainte réglementaire en avantage compétitif concret.", "GTC turned our regulatory constraint into a concrete competitive advantage.")}&nbsp;&raquo;
                  </p>
                  <p className="mt-2 text-caption text-fg-muted">
                    <span className="font-semibold text-fg-strong">Marc B.</span> · {t("editorialHero.featuredMeta")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHIFFRES CLÉS (night) ═══ */}
      <Section tone="night" spacing="dense" aria-label={tx("Chiffres clés GreenTechCycle", "GreenTechCycle key figures")}>
        <StatRow tone="dark">
          {kpiItems.map((kpi, i) => (
            <Stat
              key={i}
              tone="dark"
              value={kpi.value >= 1000000 ? <CountUp end={kpi.value / 1000000} decimals={1} suffix=" M€" /> : <CountUp end={kpi.value} suffix={kpi.suffix} />}
              label={kpi.label}
              source={kpi.source}
            />
          ))}
        </StatRow>
        <p className="mt-8 max-w-[65ch] text-caption italic text-fg-muted">{t("kpis.footnote")}</p>
      </Section>

      {/* ═══ INTRO + DIFFÉRENCIATEURS + PARTENAIRES (paper) ═══ */}
      <Section tone="paper">
        <div className="reveal">
          <SectionHeader eyebrow={t("cases.eyebrow")} title={t("editorialIntro.headline")} intro={t("editorialIntro.text")}>
            <div className="mt-6">
              <TextLink href="/contact">{t("editorialIntro.cta")}</TextLink>
            </div>
          </SectionHeader>
        </div>
        <div className="reveal-stagger grid gap-6 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <div key={i} className="reveal h-full">
              <div className="h-full rounded-xl border border-track bg-bg p-6">
                <Pictogram icon={d.icon} />
                <p className="mt-4 text-eyebrow uppercase text-fg-muted">{d.tag}</p>
                <h3 className="mt-2 text-heading-md text-fg">{d.title}</h3>
                <p className="mt-2 text-body-sm text-fg-strong">{d.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-track pt-10 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow uppercase text-fg-muted">{t("nav.label")}</p>
            <nav aria-label={tx("Navigation par cas sectoriel", "Navigation by sector case")} className="mt-4 flex flex-wrap gap-2">
              <a href="#cas-tf1-media" className="inline-flex min-h-[44px] items-center rounded-lg border border-track px-4 text-body-sm font-medium text-fg-strong hover:border-track-strong hover:text-fg">TF1</a>
              {cases.map((c, i) => {
                const NavIcon = CASE_ICONS[i] ?? Building2;
                return (
                  <a key={c.slug} href={`#cas-${c.slug}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-track px-4 text-body-sm font-medium text-fg-strong hover:border-track-strong hover:text-fg">
                    <NavIcon className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                    {c.sector}
                  </a>
                );
              })}
            </nav>
          </div>
          <div>
            <p className="text-eyebrow uppercase text-fg-muted">{t("partners.eyebrow")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {(t.raw("partners.items") as string[]).map((p, i) => (
                <li key={i}><Tag variant="neutral">{p}</Tag></li>
              ))}
            </ul>
            <p className="mt-4 text-caption italic text-fg-muted">{t("partners.note")}</p>
          </div>
        </div>
      </Section>

      {/* ═══ CAS PHARE TF1 (forest, featured) ═══ */}
      <section id="cas-tf1-media" className="bg-bg-card py-16 text-fg lg:py-24" aria-labelledby="tf1-featured-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Tag variant="dark" icon={<MonitorPlay className="h-3.5 w-3.5" aria-hidden="true" />}>{tf1.badge}</Tag>
                <Tag variant="dark">{tf1.eyebrow}</Tag>
              </div>
              <h2 id="tf1-featured-title" className="mt-6 max-w-[24ch] text-display-md text-fg">{tf1.title}</h2>
              <p className="mt-4 text-eyebrow uppercase text-fg-muted">{tf1.subtitle}</p>
              <p className="mt-4 max-w-[65ch] text-body-lg text-fg-muted">{tf1.body}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-track py-6">
                {tf1.metrics.map((kpi, j) => (
                  <div key={j} className="flex flex-col-reverse justify-end">
                    <dt className="mt-1 text-caption text-fg-muted">
                      <span className="block font-semibold text-fg">{kpi.label}</span>
                      {kpi.detail}
                    </dt>
                    <dd className="font-display text-display-sm tabular-nums text-emerald">{kpi.value}</dd>
                  </div>
                ))}
              </dl>
              <figure className="mt-8 border-l-2 border-emerald pl-4">
                <blockquote className="font-display text-display-sm text-fg">&laquo;&nbsp;{tf1.quote}&nbsp;&raquo;</blockquote>
                <figcaption className="mt-3 text-caption text-fg-muted">
                  <span className="font-semibold text-fg">{tf1.quoteName}</span> · {tf1.quoteRole} · {tf1.quoteSector}
                </figcaption>
              </figure>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={tf1.ctaHref} tone="dark" size="lg">{tf1.cta}</ButtonLink>
                <ButtonLink href={tf1.scrollTarget} tone="dark" variant="secondary" size="lg" arrow={false}>{tf1.ctaSecondary}</ButtonLink>
              </div>
            </div>
            <div className="reveal lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                <Image src={tf1.photo} alt={tf1.photoAlt} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 8 CAS SECTORIELS — grille régulière 2 colonnes ═══ */}
      <section className="bg-bg-card py-16 lg:py-24" aria-label={tx("Cas clients sectoriels", "Sector client cases")}>
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {cases.map((c, i) => (
              <CaseCard key={c.slug} c={c} index={i} editorialBody={editorialBodies[c.slug] ?? c.subtitle} isFr={isFr} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPARATIF — tableau §6.13 ═══ */}
      <Section tone="paper" aria-labelledby="comparative-title">
        <div className="reveal">
          <SectionHeader id="comparative-title" eyebrow={t("matrix.eyebrow")} title={t("matrix.title")} intro={t("matrix.subtitle")} />
        </div>
        <div className="reveal">
          <Table
            caption={t("matrix.title")}
            head={matrixHeaders}
            numeric={[1, 2, 5]}
            emphasis={[1, 5]}
            rows={matrixRows.map((row, i) => [
              cases[i] ? (
                <a key="l" href={`#cas-${cases[i].slug}`} className="text-fg hover:text-emerald">{row[0]}</a>
              ) : (
                row[0]
              ),
              row[1],
              row[2],
              row[3],
              row[4],
              row[5],
            ])}
          />
          <p className="mt-4 max-w-[65ch] text-caption italic text-fg-muted">
            {tx(
              "Taux de récupération : actifs récupérés (revente + reconditionnement + recyclage) vs total traité.",
              "Recovery rate: assets recovered (resale + refurbishment + recycling) vs total processed."
            )}{" "}
            {t("matrix.footnote")}
          </p>
        </div>
      </Section>

      {/* ═══ TÉMOIGNAGES + CITATION FINALE (night) ═══ */}
      <Section tone="night" aria-labelledby="testimonials-title">
        <div className="reveal">
          <figure className="max-w-[65ch]">
            <blockquote className="font-display text-display-sm text-fg">&laquo;&nbsp;{t("editorialFinalQuote.text")}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-4 text-caption text-fg-muted">
              <span className="font-semibold text-fg">{t("editorialFinalQuote.name")}</span> · {t("editorialFinalQuote.role")}
            </figcaption>
            <p className="mt-3 text-caption italic text-fg-muted">{t("editorialFinalQuote.consentNote")}</p>
            <div className="mt-4">
              <TextLink href="#cas-banque-cac40" tone="dark">{tx("Voir le cas Banque CAC40 complet", "See the full CAC40 bank case")}</TextLink>
            </div>
          </figure>
        </div>
        <div className="mt-16 border-t border-track pt-10">
          <SectionHeader tone="dark" id="testimonials-title" eyebrow={t("testimonials.eyebrow")} title={t("testimonials.title")} size="sm" />
          <div className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((item, i) => (
              <div key={i} className="reveal h-full">
                <figure className="flex h-full flex-col rounded-xl border border-track bg-bg p-6">
                  <blockquote className="flex-1 text-body-sm text-fg">&laquo;&nbsp;{item.quote}&nbsp;&raquo;</blockquote>
                  <figcaption className="mt-6 border-t border-track pt-4 text-caption text-fg-muted">
                    <span className="font-semibold text-fg">{item.name}</span> · {item.role} · {item.sector}
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          <p className="mt-6 text-caption italic text-fg-muted">{t("testimonials.consentNote")}</p>
        </div>
      </Section>

      {/* ═══ FAQ (paper) ═══ */}
      <Section tone="paper" aria-labelledby="faq-cas-title">
        <div className="mx-auto max-w-[720px]">
          <div className="reveal">
            <SectionHeader id="faq-cas-title" eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          </div>
          <Accordion items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
          <div className="mt-8">
            <TextLink href="/faq">{t("faq.allQuestionsLink")}</TextLink>
          </div>
        </div>
      </Section>

      {/* ═══ PASSERELLE 16 SECTEURS (cream) — fusion S12d + S14b ═══ */}
      <Section tone="cream" aria-labelledby="cross-secteurs-title">
        <div className="reveal">
          <SectionHeader
            id="cross-secteurs-title"
            eyebrow={tx("Au-delà des 8 cas chiffrés · Catalogue sectoriel complet", "Beyond the 8 quantified cases · Full sector catalogue")}
            title={tx("16 fiches sectorielles complètes, de la banque au broadcast.", "16 complete sector profiles, from banking to broadcast.")}
            intro={tx(
              "Chaque secteur dispose d'une fiche complète : profil réglementaire, douleurs spécifiques, cas d'usage prioritaires, ROI attendu, personas décideurs et objections. Le hub /secteurs synthétise les 16 marchés que nous couvrons en France et en Europe, y compris la référence broadcast TF1.",
              "Each sector has a complete profile: regulatory framework, specific pain points, priority use cases, expected ROI, decision-maker personas and objections. The /secteurs hub synthesises the 16 markets we cover in France and Europe, including the TF1 broadcast reference."
            )}
          />
        </div>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {sectorCatalogue.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/secteurs/${s.slug}`}
                className="group flex min-h-[44px] items-center justify-between gap-2 rounded-lg border border-track bg-bg px-4 py-3 text-body-sm font-medium text-fg transition-colors hover:border-track-strong hover:text-emerald"
              >
                {isFr ? s.labelFr : s.labelEn}
                {s.slug === "medias-audiovisuel" && <Tag variant="brand">TF1</Tag>}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/secteurs" variant="secondary">{tx("Voir les 16 fiches secteurs", "View the 16 sector profiles")}</ButtonLink>
          <TextLink href="/secteurs/medias-audiovisuel" className="min-h-[44px]">{tx("Voir la fiche TF1 / Médias", "See the TF1 / Media profile")}</TextLink>
        </div>
      </Section>

      {/* ═══ CTA UNIQUE (+ mini-formulaire de conversion) ═══ */}
      <CtaSection
        eyebrow={t("finalCta.eyebrow")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        primaryLabel={t("finalCta.cta1")}
        primaryHref="/contact"
        secondaryLabel={t("finalCta.cta2")}
        secondaryHref="/demo"
        reassurance={
          <>
            <span className="sr-only">{tx("Garanties contractuelles : ", "Contractual guarantees: ")}</span>
            {trustBadges.join(" · ")}
          </>
        }
        footnote={
          <div className="mx-auto mt-8 max-w-[720px] text-left">
            <ol className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-caption text-fg-muted">
              {[
                tx("Audit flash 72h", "72h flash audit"),
                tx("Effacement certifié NIST", "NIST certified erasure"),
                tx("Valorisation marché", "Market value recovery"),
                tx("Rapport CSRD prêt", "CSRD report ready"),
              ].map((l, i) => (
                <li key={i}>
                  <span className="font-semibold text-emerald">{String(i + 1).padStart(2, "0")}</span> {l}
                </li>
              ))}
            </ol>
            <div className="mt-8 rounded-xl bg-bg p-6 text-fg lg:p-8" aria-labelledby="conversion-title">
              <p className="text-eyebrow uppercase text-fg-muted">{t("conversion.eyebrow")}</p>
              <h3 id="conversion-title" className="mt-2 font-display text-display-sm text-fg">{t("conversion.title")}</h3>
              <p className="mt-2 text-body-sm text-fg-strong">{t("conversion.subtitle")}</p>
              {submitted ? (
                <div className="mt-6 flex items-start gap-3" role="status">
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-emerald" aria-hidden="true" />
                  <div>
                    <p className="text-heading-md text-fg">{t("conversion.successTitle")}</p>
                    <p className="mt-1 text-body-sm text-fg-strong">{t("conversion.successBody")}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6" noValidate>
                  <div className="grid gap-4 md:grid-cols-3">
                    {[
                      { id: "conv-company", label: t("conversion.fields.company"), placeholder: tx("Votre entreprise", "Your company"), key: "company" as const },
                      { id: "conv-sector", label: t("conversion.fields.sector"), placeholder: tx("Banque, Santé, Retail…", "Banking, Healthcare, Retail…"), key: "sector" as const },
                      { id: "conv-challenge", label: t("conversion.fields.challenge"), placeholder: tx("CSRD, NIS2, valeur…", "CSRD, NIS2, value…"), key: "challenge" as const },
                    ].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-body-sm font-medium text-fg">{f.label}</label>
                        <input
                          id={f.id}
                          type="text"
                          required
                          value={formData[f.key]}
                          onChange={(e) => setFormData((d) => ({ ...d, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className={field}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="max-w-[40ch] text-caption italic text-fg-muted">{t("conversion.privacy")}</p>
                    <Button type="submit">
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t("conversion.cta")}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        }
      />
    </div>
  );
}
