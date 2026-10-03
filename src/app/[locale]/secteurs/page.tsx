"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import { ArrowRight, Box, Monitor, Wrench } from "lucide-react";
import { SECTORS } from "@/data/sectors";
import type { SectorDef } from "@/data/sectors";
import { getHubLabels, getMatrixData, getPhases, getSectorName, getSectorTagline } from "@/data/sectors-i18n";
import type { PhaseData } from "@/data/sectors-i18n";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";

/* ─────────────────────────────────────────────────────────────────────────────
   Carte secteur — grille régulière, sans photo (DESIGN.md §6.6)
   pictogramme · numéro · nom · 1 ligne d'angle · lien « Voir la fiche »
───────────────────────────────────────────────────────────────────────────── */
function SectorCard({
  sector,
  locale,
  labels,
}: {
  sector: SectorDef;
  locale: string;
  labels: ReturnType<typeof getHubLabels>;
}) {
  const name = getSectorName(locale, sector.slug);
  const isMedias = sector.slug === "medias-audiovisuel";
  const isFr = locale === "fr";

  return (
    <Link
      href={`/secteurs/${sector.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-paper p-6 transition-[border-color,box-shadow] duration-150 hover:border-ink/20 hover:shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <Pictogram icon={sector.icon} />
        {isMedias ? (
          <Tag variant="brand">{labels.tf1Badge}</Tag>
        ) : (
          sector.priority === 1 && <Tag variant="brand">{isFr ? "Prioritaire" : "Priority"}</Tag>
        )}
      </div>
      <p className="mt-6 text-eyebrow uppercase text-muted">{String(sector.number).padStart(2, "0")}</p>
      <h3 className="mt-2 text-heading-md text-ink transition-colors group-hover:text-leaf">{name}</h3>
      <p className="mt-2 flex-1 text-body-sm text-muted">{getSectorTagline(locale, sector.slug)}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-body-sm font-medium text-leaf">
        {labels.viewSector}
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page hub des secteurs — DESIGN.md §10.2
───────────────────────────────────────────────────────────────────────────── */
export default function SecteursHubPage() {
  const locale = useLocale();
  const isFr = locale === "fr";
  const labels = getHubLabels(locale);
  const matrix = getMatrixData(locale);
  const phases = getPhases(locale);
  const readIcons = [Monitor, Box, Wrench];
  const ordered = [...SECTORS].sort((a, b) => a.number - b.number);

  const priorityTag = (stars: number, label: string) => (
    <Tag variant={stars === 3 ? "brand" : stars === 2 ? "alert" : "neutral"}>{label}</Tag>
  );

  return (
    <div>
      {/* 1. HERO clair */}
      <section className="border-b border-line bg-cream py-16 lg:py-24" aria-labelledby="secteurs-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <p className="mb-3 text-eyebrow uppercase text-muted">
              ITAD · {isFr ? "Sécurité" : "Security"} · {isFr ? "Plateforme unifiée" : "Unified platform"}
            </p>
            <h1 id="secteurs-title" className="max-w-[18ch] text-display-lg text-ink">
              {labels.heroTitle}
            </h1>
            <p className="mt-4 max-w-[65ch] text-body-lg text-ink-700">{labels.heroSubtitle}</p>
          </div>

          {/* 2. « Comment lire » condensé en une ligne de 3 items */}
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="font-sans text-eyebrow uppercase tracking-[0.12em] text-muted">{labels.howToReadTitle}</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-3">
              {labels.howToReadBricks.map((brick, i) => {
                const Icon = readIcons[i];
                return (
                  <li key={brick.title} className="flex gap-3">
                    <Pictogram icon={Icon} />
                    <div>
                      <p className="text-body-sm font-semibold text-ink">{brick.title}</p>
                      <p className="mt-1 text-caption text-muted">{brick.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <CertificationStrip className="mt-10" />
        </div>
      </section>

      {/* 3. GRILLE RÉGULIÈRE 16 SECTEURS (01 → 16) */}
      <Section tone="paper">
        <div className="reveal">
          <SectionHeader
            title={labels.sectorGridTitle}
            intro={
              isFr
                ? "Cliquez sur un secteur pour accéder à sa fiche complète : profil, douleurs, cas d'usage, ROI, personas et objections."
                : "Click a sector to access its full profile: overview, pain points, use cases, ROI, personas and objections."
            }
          />
        </div>
        <div className="reveal-stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((sector) => (
            <div key={sector.slug} className="reveal h-full">
              <SectorCard sector={sector} locale={locale} labels={labels} />
            </div>
          ))}
        </div>

        {/* 4. Annexes démotées en accordéons fermés */}
        <div className="mt-16">
          <Accordion
            defaultOpen={null}
            items={[
              {
                id: "annexe-matrice",
                question: (
                  <span className="block">
                    <span className="block text-heading-lg text-ink">{labels.annexe1Title}</span>
                    <span className="mt-1 block text-caption font-normal text-muted">
                      {isFr ? "Annexe interne de lecture" : "Internal reading appendix"}
                    </span>
                  </span>
                ),
                answer: (
                  <div>
                    <p className="mb-6 text-body text-ink-700">
                      {isFr
                        ? "Évaluation comparative des 16 secteurs selon la taille de deal, la vélocité commerciale et la priorité stratégique."
                        : "Comparative assessment of 16 sectors by deal size, commercial velocity and strategic priority."}
                    </p>
                    <Table
                      caption={labels.annexe1Title}
                      head={labels.annexe1Cols}
                      rows={matrix.map((row) => [
                        <Link key="n" href={`/secteurs/${row.slug}`} className="text-ink hover:text-leaf">
                          {getSectorName(locale, row.slug)}
                        </Link>,
                        row.dealSize,
                        row.velocity,
                        priorityTag(row.stars, row.priority),
                      ])}
                    />
                  </div>
                ),
              },
              {
                id: "annexe-sequencement",
                question: (
                  <span className="block">
                    <span className="block text-heading-lg text-ink">{labels.annexe2Title}</span>
                    <span className="mt-1 block text-caption font-normal text-muted">
                      {isFr ? "Annexe interne de lecture" : "Internal reading appendix"}
                    </span>
                  </span>
                ),
                answer: (
                  <div>
                    <p className="mb-6 text-body text-ink-700">
                      {isFr
                        ? "Trois phases pour construire un portefeuille sectoriel solide et durable."
                        : "Three phases to build a solid, sustainable sector portfolio."}
                    </p>
                    <ol className="divide-y divide-line border-y border-line">
                      {phases.map((phase: PhaseData, i: number) => (
                        <li key={i} className="grid gap-4 py-6 md:grid-cols-[120px_1fr]">
                          <div>
                            <p className="text-eyebrow uppercase text-muted">Phase {String(i + 1).padStart(2, "0")}</p>
                            <p className="mt-1 text-caption text-muted">{phase.period}</p>
                          </div>
                          <div>
                            <h3 className="text-heading-md text-ink">{phase.title}</h3>
                            <p className="mt-2 text-body-sm text-ink-700">{phase.description}</p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {phase.sectors.map((s: string, j: number) => (
                                <li key={j}>
                                  <Tag variant="neutral">{s}</Tag>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Section>

      {/* 5. CTA unique */}
      <CtaSection
        title={labels.ctaTitle}
        subtitle={labels.ctaSubtitle}
        primaryLabel={labels.ctaPrimary}
        primaryHref="/reserver?offre=demo-conseil"
        secondaryLabel={labels.ctaSecondary}
        secondaryHref="/cas-usages"
        reassurance={labels.trustItems.join(" · ")}
      />
    </div>
  );
}
