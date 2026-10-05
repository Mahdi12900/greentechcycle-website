"use client";

import GeometryField from "@/components/visuals/GeometryField";
import LifecycleDiagram from "@/components/visuals/LifecycleDiagram";
import MediaSlot from "@/components/visuals/MediaSlot";
import { useLocale, useTranslations } from "next-intl";
import { CountUp } from "@/components/motion";
import { Gauge } from "@/components/kpi/Kpi";
import { ArrowDown, Check, ShieldCheck, Leaf, Users, Eye, Award, UserRound, Globe } from "lucide-react";
import { SERVICE_AREAS } from "@/lib/contact";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import { Stat } from "@/components/ui/Stat";

/**
 * /pourquoi-gtc — DESIGN.md §10.7 : hero paper, manifeste (cream), fondateur
 * (forest), 5 convictions en liste à filets, engagements (night), citation,
 * CTA unique. Ancres conservées.
 */
export default function PourquoiGtcPage() {
  const t = useTranslations("WhyGTC");
  const isEn = useLocale() === "en";

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
  const figureMatch = t("hero.figure").match(/^(\d+)(\s.+)$/);
  const heroFigure = figureMatch ? { n: parseInt(figureMatch[1], 10), rest: figureMatch[2] } : null;

  return (
    <div>
      {/* ═══ HERO manifeste (paper) — bandeau d'urgence → notice ═══ */}
      <section className="bg-bg py-12 lg:py-16" aria-labelledby="why-hero">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="brand" icon={<Leaf className="h-3.5 w-3.5" aria-hidden="true" />}>{t("urgency.text")}</Tag>
              <p className="mt-6 text-eyebrow uppercase text-fg-muted">{t("hero.eyebrow")}</p>
              <h1 id="why-hero" className="mt-3 max-w-[20ch] text-display-lg text-fg">
                <span className="block text-display-xl text-emerald">
                  {/* « 50 millions » : le nombre monte au défilement, le texte reste lisible sans JS */}
                  {heroFigure ? (
                    <>
                      <CountUp end={heroFigure.n} />
                      {heroFigure.rest}
                    </>
                  ) : (
                    t("hero.figure")
                  )}
                </span>
                <span className="mt-2 block">{t("hero.title")}</span>
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserver?offre=audit-decommissionnement" size="lg">{t("hero.cta1")}</ButtonLink>
                <ButtonLink href="#manifeste" variant="secondary" size="lg">{t("hero.cta2")}</ButtonLink>
              </div>
              <p className="mt-6 max-w-[65ch] text-caption italic text-fg-muted">{t("hero.source")}</p>
              {/* Zones d'intervention (décision utilisateur, 2026-10-05) : src/lib/contact.ts */}
              <p className="mt-3 flex items-center gap-2 text-caption text-fg-muted">
                <Globe className="h-3.5 w-3.5 flex-shrink-0 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                {SERVICE_AREAS.text[isEn ? "en" : "fr"]}
              </p>
              <a href="#manifeste" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-fg-muted hover:text-fg">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("hero.scrollLabel")}
              </a>
            </div>
            <div className="reveal lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                <MediaSlot fill id="pourquoi-hero" alt="Équipe GreenTechCycle en atelier de tri et reconditionnement, lumière naturelle" fallback={<LifecycleDiagram />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTE (cream) ═══ */}
      <div id="expertise" aria-hidden="true" className="sr-only" />
      <Section id="manifeste" tone="cream" bordered>
        <div className="reveal">
          <SectionHeader eyebrow={t("manifesto.eyebrow")} title={t("manifesto.title")}>
            <div className="mt-6 max-w-[65ch] space-y-4 text-body-lg text-fg-strong">
              <p>{t("manifesto.body1")}</p>
              <p>{t("manifesto.body2")}</p>
              <p>{t("manifesto.body3")}</p>
            </div>
          </SectionHeader>
        </div>
      </Section>

      {/* ═══ MOT DU FONDATEUR (forest) ═══ */}
      <Section id="fondateur" tone="forest">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
              <MediaSlot fill id="pourquoi-fondateur" alt="Portrait éditorial du fondateur de GreenTechCycle" fallback={<GeometryField icon={UserRound} />} />
            </div>
          </div>
          <div className="reveal lg:col-span-7">
            <SectionHeader tone="dark" eyebrow={t("founder.eyebrow")} title={t("founder.title")} />
            <figure>
              <blockquote className="font-display text-display-sm text-fg">&laquo;&nbsp;{t("founder.quote")}&nbsp;&raquo;</blockquote>
              <figcaption className="mt-6 text-caption text-fg-muted">
                <span className="font-semibold text-fg">{t("founder.name")}</span> · {t("founder.role")}
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      {/* ═══ 5 CONVICTIONS (paper, liste à filets) ═══ */}
      <div id="ethique" aria-hidden="true" className="sr-only" />
      <section className="bg-bg py-12 lg:py-16" aria-label={t("manifesto.eyebrow")}>
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <ol className="divide-y divide-track border-y border-track">
            {convictions.map((c, index) => {
              const Icon = convictionIcons[index] ?? Leaf;
              const photoRight = index % 2 === 0;
              return (
                <li key={c.slug} id={c.slug} aria-labelledby={`conv-${c.slug}`} className="py-12 lg:py-16">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className={`lg:col-span-6 ${photoRight ? "" : "lg:order-2"}`}>
                      <div className="flex items-center gap-3">
                        <Pictogram icon={Icon} />
                        <p className="text-eyebrow uppercase text-fg-muted">{String(index + 1).padStart(2, "0")} · {c.eyebrow}</p>
                      </div>
                      <h2 id={`conv-${c.slug}`} className="mt-4 max-w-[24ch] text-display-md text-fg">{c.title}</h2>
                      <p className="mt-4 max-w-[65ch] text-body text-fg-strong">{c.body}</p>
                      <div className="mt-6 border-t border-track pt-6">
                        <Stat value={c.proofValue} label={c.proofLabel} source={c.proofDetail} />
                      </div>
                      <ul className="mt-6 space-y-2">
                        {c.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-body-sm text-fg-strong">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`lg:col-span-6 ${photoRight ? "" : "lg:order-1"}`}>
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-track">
                        <MediaSlot fill id={`pourquoi-${c.slug}`} alt={c.photoAlt} fallback={<GeometryField icon={convictionIcons[index] ?? Leaf} />} />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ═══ ENGAGEMENTS CHIFFRÉS (night) ═══ */}
      <Section id="engagement" tone="night">
        <div className="reveal">
          <SectionHeader tone="dark" eyebrow={t("commitments.eyebrow")} title={t("commitments.title")} />
        </div>
        {/* Engagements : les pourcentages deviennent des jauges qui se remplissent au
            défilement (valeur finale dans le HTML) ; les autres restent des compteurs. */}
        <div className="reveal-stagger grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {commitments.map((c, i) => {
            // « 99,2 » → 99.2 (virgule décimale française)
            const numericValue = parseFloat(c.metric.replace(/\s/g, "").replace(",", "."));
            const decimals = /[,.]/.test(c.metric) ? 1 : 0;
            const isNumber = !Number.isNaN(numericValue);
            const isPercent = isNumber && c.suffix.trim() === "%";
            return (
              <div key={i} className="reveal">
                {isPercent ? (
                  <Gauge
                    value={numericValue}
                    display={<CountUp end={numericValue} decimals={decimals} suffix={c.suffix} />}
                    label={c.label}
                    source={c.source}
                  />
                ) : (
                  <Stat
                    tone="dark"
                    value={
                      isNumber && numericValue > 0 ? (
                        <>
                          <CountUp end={numericValue} decimals={decimals} />
                          <span className="ml-1 font-sans text-body text-fg-muted">{c.suffix}</span>
                        </>
                      ) : (
                        <>
                          {c.metric}
                          <span className="ml-1 font-sans text-body text-fg-muted">{c.suffix}</span>
                        </>
                      )
                    }
                    label={c.label}
                    source={c.source}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══ CITATION (paper) ═══ */}
      <Section tone="paper">
        <div className="reveal">
          <figure className="max-w-[65ch] border-l-2 border-emerald pl-6">
            <blockquote className="font-display text-display-sm text-fg">&laquo;&nbsp;{t("editorialQuote.quote")}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-6 text-caption text-fg-muted">
              <span className="font-semibold text-fg-strong">{t("editorialQuote.name")}</span> · {t("editorialQuote.role")}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ═══ CTA UNIQUE ═══ */}
      <CtaSection
        eyebrow={t("conversion.eyebrow")}
        title={t("conversion.title")}
        subtitle={t("conversion.subtitle")}
        primaryLabel={t("conversion.cta1")}
        primaryHref="/reserver?offre=audit-decommissionnement"
        secondaryLabel={t("conversion.cta2")}
        secondaryHref="/cas-usages"
      />
    </div>
  );
}
