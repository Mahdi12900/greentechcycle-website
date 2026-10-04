"use client";

import DashboardMock, { type DashboardState } from "@/components/visuals/DashboardMock";
import ScrollStory from "@/components/visuals/ScrollStory";
import MediaSlot from "@/components/visuals/MediaSlot";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { KpiStat } from "@/components/kpi/Kpi";
import { ArrowDown, CalendarCheck, Check } from "lucide-react";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import { Stat, StatRow } from "@/components/ui/Stat";
import Accordion from "@/components/ui/Accordion";

/**
 * /plateforme — architecture « Épuré » (DESIGN.md §10.4).
 * paper (hero) → paper/cream (#parcours, 5 chapitres) → forest (citation)
 * → night (chiffres) → cream (offres) → paper (FAQ) → forest (CTA unique).
 * Ancres : #parcours, #modules (parcours), #governance (chapitre Décision),
 * #mobile (chapitre Ingestion — scan terrain), + ids historiques des chapitres.
 */
/* État du tableau de bord codé affiché pour chaque chapitre du parcours */
const CHAPTER_STATE: Record<string, DashboardState> = {
  ingestion: "inventory",
  audit: "inventory",
  decision: "erasure",
  tracabilite: "erasure",
  restitution: "reporting",
};

const EXTRA_ANCHORS: Record<string, string> = {
  ingestion: "mobile",
  decision: "governance",
};

export default function PlateformePage() {
  const t = useTranslations("Platform");
  const locale = useLocale();
  const isEn = locale === "en";

  type Chapter = {
    slug: string;
    eyebrow: string;
    title: string;
    body: string;
    photo: string;
    photoAlt: string;
    proofLabel: string;
    proofValue: string;
    proofDetail: string;
    bullets: string[];
  };

  const chapters = t.raw("chapters") as Chapter[];
  const heroProofs = t.raw("hero.proofs") as { value: string; unit: string; label: string }[];
  const offers = t.raw("offers.items") as { slug: string; name: string; pitch: string; duration: string; price: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <div>
      {/* ═══════════════ HERO split (paper) ═══════════════ */}
      <section className="bg-bg py-16 lg:py-24" aria-labelledby="plateforme-hero">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              {/* Ancien bandeau d'urgence → notice (§6.19) */}
              <Tag variant="brand" icon={<CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />}>
                {t("urgency.text")}
              </Tag>
              <p className="mt-6 text-eyebrow uppercase text-fg-muted">{t("hero.eyebrow")}</p>
              <h1 id="plateforme-hero" className="mt-3 max-w-[20ch] text-display-lg text-fg">
                {t("hero.title")}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>

              <dl className="mt-8 grid max-w-[560px] grid-cols-3 border-y border-track py-6">
                {heroProofs.map((p, i) => (
                  <div key={i} className={`flex flex-col-reverse justify-end ${i > 0 ? "border-l border-track pl-4" : "pr-4"}`}>
                    <dt className="mt-1 text-caption text-fg-muted">{p.label}</dt>
                    <dd className="font-display text-display-sm tabular-nums text-emerald">
                      {p.value}
                      {p.unit && <span className="ml-1 font-sans text-body text-fg-strong">{p.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserver?offre=demo-plateforme" size="lg">
                  {t("hero.cta1")}
                </ButtonLink>
                <ButtonLink href="#parcours" variant="secondary" size="lg">
                  {t("hero.cta2")}
                </ButtonLink>
              </div>
              <a
                href="#parcours"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-fg-muted hover:text-fg"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("hero.scrollLabel")}
              </a>
            </div>

            <div className="reveal lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                  <MediaSlot fill id="plateforme-hero" alt={
                      isEn
                        ? "GreenTechCycle dashboard reviewed by an IT department arbitrating asset end-of-life"
                        : "Tableau de bord GreenTechCycle consulté par une direction informatique en plein arbitrage de fin de vie d'actifs"
                    } fallback={<DashboardMock state="inventory" />} />
                </div>
                <figcaption className="mt-6 border-l-2 border-emerald pl-4">
                  <p className="text-body-sm text-fg">&laquo;&nbsp;{t("hero.floatQuote")}&nbsp;&raquo;</p>
                  <p className="mt-2 text-caption text-fg-muted">
                    <span className="font-semibold text-fg-strong">{t("hero.floatName")}</span> · {t("hero.floatRole")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
          <CertificationStrip className="mt-12 border-t border-track pt-6" />
        </div>
      </section>

      {/* ═══════════════ PARCOURS 5 CHAPITRES (#parcours / #modules) ═══════════════ */}
      <section id="parcours" className="border-t border-track bg-bg-card py-16 lg:py-24" aria-labelledby="parcours-title">
        <span id="modules" className="block" aria-hidden="true" />
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          {/* Ancienne S2 « promesse » condensée en en-tête du parcours */}
          <div className="reveal">
            <SectionHeader id="parcours-title" eyebrow={t("promise.eyebrow")} title={t("promise.title")}>
              <div className="mt-4 max-w-[65ch] space-y-4 text-body-lg text-fg-strong">
                <p>{t("promise.body1")}</p>
                <p>{t("promise.body2")}</p>
                <p className="text-body text-fg">
                  {isEn ? (
                    <>
                      The GTC SaaS platform is accessible <strong className="font-semibold text-emerald">from €1,400 ex-VAT/month</strong>{" "}
                      (Essential tier, up to 200 assets), then from €2,500 ex-VAT/month for 201 to 2,000 assets. Pricing adapts to your modules and SLA.{" "}
                      <Link href="/tarifs" className="font-semibold text-emerald underline underline-offset-4 hover:text-emerald-hover">
                        View pricing
                      </Link>{" "}
                      - or start with a{" "}
                      <Link href="/tarifs#pilote" className="font-semibold text-emerald underline underline-offset-4 hover:text-emerald-hover">
                        3-day Pilot at €2,900 ex-VAT
                      </Link>
                      , refunded on Year 1 if signed within 90 days.
                    </>
                  ) : (
                    <>
                      La plateforme GTC SaaS est accessible <strong className="font-semibold text-emerald">à partir de 1 400 € HT/mois</strong>{" "}
                      (palier Essentiel, jusqu&apos;à 200 actifs), puis à partir de 2 500 € HT/mois de 201 à 2 000 actifs. La tarification s&apos;affine selon vos modules et votre SLA.{" "}
                      <Link href="/tarifs" className="font-semibold text-emerald underline underline-offset-4 hover:text-emerald-hover">
                        Voir les tarifs
                      </Link>{" "}
                      - ou démarrez par un{" "}
                      <Link href="/tarifs#pilote" className="font-semibold text-emerald underline underline-offset-4 hover:text-emerald-hover">
                        Pilote 3 j à 2 900 € HT
                      </Link>
                      , remboursé sur la 1re année si signature sous 90 j.
                    </>
                  )}
                </p>
              </div>
            </SectionHeader>
          </div>

          {/* 5 chapitres scénarisés : visuel épinglé (lg+) qui change d'état */}
          <ScrollStory
            className="mt-4 border-t border-track"
            headingLevel={2}
            steps={chapters.map((chap, index) => ({
              id: chap.slug,
              extraIds: EXTRA_ANCHORS[chap.slug] ? [EXTRA_ANCHORS[chap.slug]] : undefined,
              titleId: `chap-${chap.slug}`,
              eyebrow: chap.eyebrow,
              title: chap.title,
              body: (
                <>
                  <p>{chap.body}</p>
                  <div className="mt-6 border-t border-track pt-6">
                    <Stat value={chap.proofValue} label={chap.proofLabel} source={chap.proofDetail} />
                  </div>
                  <ul className="mt-6 space-y-2">
                    {chap.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-body-sm text-fg-strong">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ),
            }))}
            renderVisual={(i) => (
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-track shadow-float">
                <MediaSlot
                  fill
                  id={`plateforme-${chapters[i].slug}`}
                  alt={chapters[i].photoAlt}
                  fallback={<DashboardMock state={CHAPTER_STATE[chapters[i].slug] ?? "inventory"} />}
                />
              </div>
            )}
          />
        </div>
      </section>

      {/* ═══════════════ CITATION (forest) ═══════════════ */}
      <Section tone="forest">
        <div className="reveal">
          <figure className="max-w-[65ch]">
            <blockquote className="font-display text-display-sm text-fg">
              &laquo;&nbsp;{t("editorialQuote.quote")}&nbsp;&raquo;
            </blockquote>
            <figcaption className="mt-6 text-caption text-fg-muted">
              <span className="font-semibold text-fg">{t("editorialQuote.name")}</span> · {t("editorialQuote.role")}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ═══════════════ CHIFFRES D'EXPLOITATION (night) ═══════════════ */}
      <Section tone="night" spacing="dense">
        {/* Chiffres d'exploitation : registre unique src/content/kpis.ts (aucun montant en euros) */}
        <StatRow tone="dark">
          {(["clients", "assets", "reuse", "carbon"] as const).map((k) => (
            <KpiStat key={k} id={k} />
          ))}
        </StatRow>
      </Section>

      {/* ═══════════════ OFFRES D'ENTRÉE (cream) ═══════════════ */}
      <Section tone="cream">
        <div className="reveal">
          <SectionHeader eyebrow={t("offers.eyebrow")} title={t("offers.title")} intro={t("offers.subtitle")} />
        </div>
        <div className="reveal-stagger grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <div key={o.slug} className="reveal h-full">
              <div className="flex h-full flex-col rounded-xl border border-track bg-bg p-6">
                <p className="text-eyebrow uppercase text-fg-muted">{o.duration}</p>
                <h3 className="mt-3 text-heading-lg text-fg">{o.name}</h3>
                <p className="mt-3 flex-1 text-body-sm text-fg-strong">{o.pitch}</p>
                <p className="mt-6 border-t border-track pt-4 font-display text-display-sm tabular-nums text-emerald">{o.price}</p>
                <div className="mt-6">
                  <ButtonLink href={`/reserver?offre=${o.slug}`} variant="secondary" fullWidth>
                    {t("offers.reserveLabel")}
                  </ButtonLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <div className="reveal">
            <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          </div>
          <Accordion items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </Section>

      {/* ═══════════════ CTA UNIQUE (S8 + S9 fusionnés) ═══════════════ */}
      <CtaSection
        eyebrow={t("finalCta.eyebrow")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        primaryLabel={t("finalCta.cta1")}
        primaryHref="/reserver?offre=audit-decommissionnement"
        secondaryLabel={t("conversion.cta1")}
        secondaryHref="/reserver?offre=demo-plateforme"
        reassurance={[t("finalCta.trust1"), t("finalCta.trust2"), t("finalCta.trust3")].join(" · ")}
        footnote={
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/contact?offre=plateforme-info" className="font-medium text-emerald hover:text-fg">
              {t("conversion.cta2")} →
            </Link>
            <Link href="/cas-usages" className="font-medium text-emerald hover:text-fg">
              {t("finalCta.cta2")} →
            </Link>
          </p>
        }
      />
    </div>
  );
}
