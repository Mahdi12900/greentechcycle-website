"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { SectorSlug } from "@/data/sectors";
import { SECTORS, getSectorDef } from "@/data/sectors";
import { getSectorContent, getSectorName, getSectorTagline } from "@/data/sectors-i18n";
import ClientReference from "@/components/ClientReference";
import SectionNav from "@/components/SectionNav";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";

/* ─────────────────────────────────────────────────────────────────────────────
   Sticky nav anchor IDs and labels
───────────────────────────────────────────────────────────────────────────── */
const anchors = {
  fr: [
    { id: "profil", label: "Profil" },
    { id: "douleurs", label: "Douleurs" },
    { id: "cas-usage", label: "Cas d'usage" },
    { id: "roi", label: "ROI" },
    { id: "personas", label: "Décideurs" },
    { id: "argumentaire", label: "Argumentaire" },
    { id: "objections", label: "Objections" },
  ],
  en: [
    { id: "profil", label: "Profile" },
    { id: "douleurs", label: "Pain points" },
    { id: "cas-usage", label: "Use cases" },
    { id: "roi", label: "ROI" },
    { id: "personas", label: "Decision makers" },
    { id: "argumentaire", label: "Value prop" },
    { id: "objections", label: "Objections" },
  ],
};

/* ─────────────────────────────────────────────────────────────────────────────
   Fiche secteur — DESIGN.md §10.3
   forest (hero) → onglets → paper (profil) → [forest référence TF1]
   → night (#douleurs) → paper (#cas-usage) → cream (#roi) → paper (#personas)
   → forest (#argumentaire) → paper (#objections) → cream (autres secteurs)
   → forest (CTA unique) → night (footer)
───────────────────────────────────────────────────────────────────────────── */
export default function SectorDetailPage({ slug }: { slug: SectorSlug }) {
  const locale = useLocale();
  const sectorDef = getSectorDef(slug)!;
  const content = getSectorContent(locale, slug);
  const anchorList = anchors[locale as "fr" | "en"] ?? anchors.fr;
  const isFr = locale === "fr";
  const number = String(sectorDef.number).padStart(2, "0");
  const name = getSectorName(locale, slug);

  /* Autres secteurs (6 chips) */
  const otherSectors = SECTORS.filter((s) => s.slug !== sectorDef.slug).slice(0, 6);

  const priceAnchors = [
    {
      label: isFr ? "Plateforme GTC SaaS" : "GTC SaaS Platform",
      price: isFr ? "À partir de 2 500 € HT/mois" : "Starting at €2,500 HT/month",
      note: isFr ? "Base 500 postes, étude personnalisée" : "Base 500 devices, bespoke study",
    },
    {
      label: "Waki Box",
      price: isFr ? "Dès 39 € HT/mois" : "From €39 HT/month",
      note: isFr ? "3 plans publics, pilote 1er mois offert" : "3 public plans, pilot 1st month free",
    },
    {
      label: isFr ? "Service ITAD" : "ITAD Service",
      price: isFr ? "À partir de 15 € HT/poste" : "Starting at €15 HT/device",
      note: isFr ? "Effacement NIST 800-88, devis sous 48 h" : "NIST 800-88 erasure, quote in 48 h",
    },
  ];

  return (
    <div>
      {/* 1. HERO forest */}
      <section className="relative overflow-hidden bg-forest py-16 text-ondark lg:py-24" aria-labelledby="sector-title">
        {sectorDef.image && (
          <>
            <Image src={sectorDef.image} alt="" fill priority className="object-cover opacity-20" sizes="100vw" />
            <div className="absolute inset-0 bg-forest/60" aria-hidden="true" />
          </>
        )}
        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            dark
            items={[
              { label: isFr ? "Accueil" : "Home", href: `/${locale}` },
              { label: isFr ? "Secteurs" : "Sectors", href: `/${locale}/secteurs` },
              { label: name, href: `/${locale}/secteurs/${slug}` },
            ]}
          />
          <FadeIn>
            <Tag variant="dark">
              {isFr ? "Secteur" : "Sector"} {number}/16
            </Tag>
            <h1 id="sector-title" className="mt-6 max-w-[22ch] text-display-lg text-ondark">
              {content.hero.title}
            </h1>
            <p className="mt-4 max-w-[65ch] text-body-lg text-ondark-muted">{content.hero.subtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* 2. ONGLETS (règle un-seul-sticky) */}
      <SectionNav anchors={anchorList} label={isFr ? "Sections de la fiche secteur" : "Sector page sections"} />

      {/* 3. PROFIL */}
      <Section id="profil" tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_400px]">
          <FadeIn>
            <SectionHeader eyebrow={isFr ? "Profil" : "Profile"} title={isFr ? "Profil du secteur" : "Sector profile"} />
            <p className="max-w-[65ch] text-body-lg text-ink-700">{content.profile.description}</p>
            <div className="mt-8 rounded-xl border border-line bg-cream p-6">
              <h3 className="text-eyebrow uppercase text-muted">{isFr ? "Cadre réglementaire" : "Regulatory framework"}</h3>
              <p className="mt-3 text-body text-ink-700">{content.profile.regulations}</p>
            </div>
          </FadeIn>
          <FadeIn>
            {sectorDef.image ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src={sectorDef.image}
                  alt={content.hero.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            ) : (
              /* Panneau d'identité (pas de photo « à peu près » — §7) */
              <div className="rounded-2xl border border-line bg-forest p-8 text-ondark">
                <Pictogram icon={sectorDef.icon} size="lg" tone="dark" />
                <p className="mt-6 text-eyebrow uppercase text-ondark-muted">
                  {isFr ? "Secteur" : "Sector"} {number}/16
                </p>
                <p className="mt-2 font-display text-display-sm text-ondark">{name}</p>
                <p className="mt-2 text-body-sm text-ondark-muted">{getSectorTagline(locale, slug)}</p>
                <dl className="mt-6 grid grid-cols-3 border-t border-ondark-line pt-6">
                  {[
                    { n: content.painPoints.length, l: isFr ? "douleurs" : "pain points" },
                    { n: content.useCases.length, l: isFr ? "cas d'usage" : "use cases" },
                    { n: content.personas.length, l: isFr ? "décideurs" : "decision makers" },
                  ].map((f, i) => (
                    <div key={f.l} className={i > 0 ? "border-l border-ondark-line pl-4" : ""}>
                      <dt className="sr-only">{f.l}</dt>
                      <dd className="font-display text-display-sm tabular-nums text-leaf-300">{f.n}</dd>
                      <dd className="text-caption text-ondark-muted">{f.l}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </FadeIn>
        </div>
      </Section>

      {/* 4. RÉFÉRENCE CLIENT (médias uniquement) */}
      {content.tf1Reference && (
        <ClientReference
          eyebrow={isFr ? "Référence client · TF1" : "Client reference · TF1"}
          quote={content.tf1Reference}
          meta={isFr ? "Contrat annuel récurrent, parc IT et broadcast" : "Recurring annual contract, IT and broadcast fleet"}
        />
      )}

      {/* 5. DOULEURS — night */}
      <Section id="douleurs" tone="night">
        <FadeIn>
          <SectionHeader
            tone="dark"
            alert
            eyebrow={isFr ? "Douleurs" : "Pain points"}
            title={isFr ? "Douleurs spécifiques" : "Specific pain points"}
            intro={isFr ? "Les défis que vous rencontrez au quotidien" : "The challenges you face every day"}
          />
        </FadeIn>
        <StaggerContainer className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {content.painPoints.map((point, i) => (
            <StaggerItem key={i}>
              <div className="border-t border-ondark-line pt-6">
                <p className="text-eyebrow uppercase text-ondark-muted">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 max-w-[65ch] text-body text-ondark">{point}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 6. CAS D'USAGE — liste à filets */}
      <Section id="cas-usage" tone="paper">
        <FadeIn>
          <SectionHeader eyebrow={isFr ? "Cas d'usage" : "Use cases"} title={isFr ? "Cas d'usage prioritaires" : "Priority use cases"} />
        </FadeIn>
        <ol className="divide-y divide-line border-y border-line">
          {content.useCases.map((uc, i) => (
            <li key={i} className="grid gap-4 py-8 md:grid-cols-[80px_1fr]">
              <p className="text-eyebrow uppercase text-muted">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-heading-lg text-ink">{uc.title}</h3>
                <p className="mt-3 max-w-[65ch] text-body text-ink-700">{uc.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 7. ROI — tableau sur cream */}
      <Section id="roi" tone="cream">
        <FadeIn>
          <SectionHeader eyebrow="ROI" title={isFr ? "ROI attendu" : "Expected ROI"} />
        </FadeIn>
        <FadeIn>
          <Table
            caption={isFr ? "ROI attendu" : "Expected ROI"}
            head={[isFr ? "Levier de valeur" : "Value lever", isFr ? "Économie / gain typique" : "Typical savings / gain"]}
            rows={content.roi.map((row) => [row.lever, row.gain])}
            emphasis={[1]}
          />
        </FadeIn>
      </Section>

      {/* 8. DÉCIDEURS */}
      <Section id="personas" tone="paper">
        <FadeIn>
          <SectionHeader eyebrow={isFr ? "Décideurs" : "Decision makers"} title={isFr ? "Personas décideurs" : "Decision-maker personas"} />
        </FadeIn>
        <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.personas.map((p, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="h-full rounded-xl border border-line bg-paper p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-100 text-body-sm font-semibold text-forest" aria-hidden="true">
                  {p.role.charAt(0)}
                </span>
                <h3 className="mt-4 text-heading-md text-ink">{p.role}</h3>
                <p className="mt-2 text-body-sm text-ink-700">{p.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* 9. ARGUMENTAIRE — citation sur forest */}
      <Section id="argumentaire" tone="forest">
        <FadeIn>
          <figure className="max-w-[65ch]">
            <p className="text-eyebrow uppercase text-ondark-muted">{isFr ? "Argumentaire" : "Value proposition"}</p>
            <blockquote className="mt-4 font-display text-display-sm text-ondark">&laquo;&nbsp;{content.quote}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-6 text-caption text-ondark-muted">GreenTechCycle</figcaption>
          </figure>
        </FadeIn>
      </Section>

      {/* 10. OBJECTIONS — accordéon */}
      <Section id="objections" tone="paper">
        <div className="max-w-[720px]">
          <FadeIn>
            <SectionHeader
              eyebrow={isFr ? "Objections" : "Objections"}
              title={isFr ? "Objections fréquentes et réponses" : "Common objections and answers"}
            />
          </FadeIn>
          <Accordion
            items={content.objections.map((o) => ({
              question: <>&laquo;&nbsp;{o.question}&nbsp;&raquo;</>,
              answer: o.answer,
            }))}
          />
        </div>
      </Section>

      {/* 11. AUTRES SECTEURS — chips */}
      <section className="border-t border-line bg-cream py-12 lg:py-16" aria-labelledby="other-sectors">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <h2 id="other-sectors" className="font-sans text-heading-lg text-ink">
            {isFr ? "Découvrir les autres secteurs" : "Explore other sectors"}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {otherSectors.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/secteurs/${s.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line bg-paper px-4 text-body-sm font-medium text-ink-700 transition-colors hover:border-ink/30 hover:text-ink"
                >
                  <s.icon className="h-4 w-4 text-forest" strokeWidth={1.75} aria-hidden="true" />
                  {getSectorName(locale, s.slug)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/secteurs"
                className="group inline-flex min-h-[44px] items-center gap-1 px-4 text-body-sm font-medium text-leaf hover:text-leaf-700"
              >
                {isFr ? "Tous les secteurs" : "All sectors"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* 12. CTA FINAL UNIQUE — absorbe bandeau tarifaire, encart pilote et bandeau confiance */}
      <CtaSection
        title={content.cta.title}
        primaryLabel={content.cta.button}
        primaryHref="/reserver?offre=demo-conseil"
        secondaryLabel={isFr ? "Tester Waki Box — 1er mois offert" : "Try Waki Box — 1st month free"}
        secondaryHref="/reserver?offre=pilote-waki-box"
        reassurance={
          isFr
            ? "Pilote Waki Box : 1er mois offert, puis 39 € HT/mois. Collecte, inventaire automatisé et attestation inclus. Résiliable à tout moment."
            : "Waki Box pilot: 1st month free, then €39 ex-VAT/month. Collection, automated inventory and certificate included. Cancel anytime."
        }
        footnote={
          <div className="mx-auto mt-6 max-w-[880px]">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-ondark-line bg-ondark-line text-left sm:grid-cols-3">
              {priceAnchors.map((p) => (
                <li key={p.label} className="bg-forest p-4">
                  <p className="text-eyebrow uppercase text-ondark-muted">{p.label}</p>
                  <p className="mt-1 text-body-sm font-semibold tabular-nums text-ondark">{p.price}</p>
                  <p className="mt-1 text-caption text-ondark-muted">{p.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <Link href="/tarifs" className="font-medium text-leaf-300 hover:text-ondark">
                {isFr ? "Grille tarifaire complète →" : "Full pricing grid →"}
              </Link>
              <Link href="/cas-usages" className="font-medium text-leaf-300 hover:text-ondark">
                {isFr ? "Voir les cas d'usages →" : "See use cases →"}
              </Link>
            </p>
            <p className="mt-4">R2v3 · ISO 14001 · NIST 800-88 · RGPD · CSRD</p>
          </div>
        }
      />
    </div>
  );
}
