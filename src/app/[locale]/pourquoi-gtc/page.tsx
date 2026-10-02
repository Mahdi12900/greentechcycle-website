"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FadeIn, CountUp } from "@/components/motion";
import { ArrowDown, Check, ShieldCheck, Leaf, Users, Eye, Award } from "lucide-react";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import { Stat, StatRow } from "@/components/ui/Stat";

/**
 * /pourquoi-gtc — DESIGN.md §10.7 : hero paper, manifeste (cream), fondateur
 * (forest), 5 convictions en liste à filets, engagements (night), citation,
 * CTA unique. Ancres conservées.
 */
export default function PourquoiGtcPage() {
  const t = useTranslations("WhyGTC");

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

  return (
    <div>
      {/* ═══ HERO manifeste (paper) — bandeau d'urgence → notice ═══ */}
      <section className="bg-paper py-16 lg:py-24" aria-labelledby="why-hero">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="min-w-0 lg:col-span-7">
              <Tag variant="brand" icon={<Leaf className="h-3.5 w-3.5" aria-hidden="true" />}>{t("urgency.text")}</Tag>
              <p className="mt-6 text-eyebrow uppercase text-muted">{t("hero.eyebrow")}</p>
              <h1 id="why-hero" className="mt-3 max-w-[20ch] text-display-lg text-ink">
                <span className="block text-display-xl text-forest">{t("hero.figure")}</span>
                <span className="mt-2 block">{t("hero.title")}</span>
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-ink-700">{t("hero.subtitle")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserver?offre=audit-decommissionnement" size="lg">{t("hero.cta1")}</ButtonLink>
                <ButtonLink href="#manifeste" variant="secondary" size="lg">{t("hero.cta2")}</ButtonLink>
              </div>
              <p className="mt-6 max-w-[65ch] text-caption italic text-muted">{t("hero.source")}</p>
              <a href="#manifeste" className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-muted hover:text-ink">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("hero.scrollLabel")}
              </a>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/photos/team-workshop.jpg"
                  alt="Équipe GreenTechCycle en atelier de tri et reconditionnement, lumière naturelle"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ MANIFESTE (cream) ═══ */}
      <div id="expertise" aria-hidden="true" className="sr-only" />
      <Section id="manifeste" tone="cream" bordered>
        <FadeIn>
          <SectionHeader eyebrow={t("manifesto.eyebrow")} title={t("manifesto.title")}>
            <div className="mt-6 max-w-[65ch] space-y-4 text-body-lg text-ink-700">
              <p>{t("manifesto.body1")}</p>
              <p>{t("manifesto.body2")}</p>
              <p>{t("manifesto.body3")}</p>
            </div>
          </SectionHeader>
        </FadeIn>
      </Section>

      {/* ═══ MOT DU FONDATEUR (forest) ═══ */}
      <Section id="fondateur" tone="forest">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ondark-line">
              <Image src="/photos/founder-portrait.jpg" alt="Portrait éditorial du fondateur de GreenTechCycle" fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
          <FadeIn className="lg:col-span-7">
            <SectionHeader tone="dark" eyebrow={t("founder.eyebrow")} title={t("founder.title")} />
            <figure>
              <blockquote className="font-display text-display-sm text-ondark">&laquo;&nbsp;{t("founder.quote")}&nbsp;&raquo;</blockquote>
              <figcaption className="mt-6 text-caption text-ondark-muted">
                <span className="font-semibold text-ondark">{t("founder.name")}</span> · {t("founder.role")}
              </figcaption>
            </figure>
            <p className="mt-6 max-w-[65ch] text-body-sm text-ondark-muted">{t("founder.bio")}</p>
          </FadeIn>
        </div>
      </Section>

      {/* ═══ 5 CONVICTIONS (paper, liste à filets) ═══ */}
      <div id="ethique" aria-hidden="true" className="sr-only" />
      <section className="bg-paper py-16 lg:py-24" aria-label={t("manifesto.eyebrow")}>
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <ol className="divide-y divide-line border-y border-line">
            {convictions.map((c, index) => {
              const Icon = convictionIcons[index] ?? Leaf;
              const photoRight = index % 2 === 0;
              return (
                <li key={c.slug} id={c.slug} aria-labelledby={`conv-${c.slug}`} className="py-12 lg:py-16">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    <div className={`lg:col-span-6 ${photoRight ? "" : "lg:order-2"}`}>
                      <div className="flex items-center gap-3">
                        <Pictogram icon={Icon} />
                        <p className="text-eyebrow uppercase text-muted">{String(index + 1).padStart(2, "0")} · {c.eyebrow}</p>
                      </div>
                      <h2 id={`conv-${c.slug}`} className="mt-4 max-w-[24ch] text-display-md text-ink">{c.title}</h2>
                      <p className="mt-4 max-w-[65ch] text-body text-ink-700">{c.body}</p>
                      <div className="mt-6 border-t border-line pt-6">
                        <Stat value={c.proofValue} label={c.proofLabel} source={c.proofDetail} />
                      </div>
                      <ul className="mt-6 space-y-2">
                        {c.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`lg:col-span-6 ${photoRight ? "" : "lg:order-1"}`}>
                      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line">
                        <Image src={c.photo} alt={c.photoAlt} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
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
        <FadeIn>
          <SectionHeader tone="dark" eyebrow={t("commitments.eyebrow")} title={t("commitments.title")} />
        </FadeIn>
        <StatRow tone="dark" cols={3}>
          {commitments.map((c, i) => {
            const numericValue = parseFloat(c.metric.replace(/[^0-9.]/g, ""));
            const showCount = !Number.isNaN(numericValue) && numericValue > 0;
            return (
              <Stat
                key={i}
                tone="dark"
                value={
                  showCount ? (
                    <>
                      <CountUp end={numericValue} decimals={c.metric.includes(",") || c.metric.includes(".") ? 1 : 0} />
                      <span className="ml-1 font-sans text-body text-ondark-muted">{c.suffix}</span>
                    </>
                  ) : (
                    c.metric
                  )
                }
                label={c.label}
                source={c.source}
              />
            );
          })}
        </StatRow>
      </Section>

      {/* ═══ CITATION (paper) ═══ */}
      <Section tone="paper">
        <FadeIn>
          <figure className="max-w-[65ch] border-l-2 border-leaf pl-6">
            <blockquote className="font-display text-display-sm text-ink">&laquo;&nbsp;{t("editorialQuote.quote")}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-6 text-caption text-muted">
              <span className="font-semibold text-ink-700">{t("editorialQuote.name")}</span> · {t("editorialQuote.role")}
            </figcaption>
          </figure>
        </FadeIn>
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
