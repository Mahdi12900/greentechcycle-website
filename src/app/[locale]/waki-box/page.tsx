"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem, CountUp } from "@/components/motion";
import {
  ArrowDown,
  ShieldCheck,
  Leaf,
  FileCheck,
  BatteryCharging,
  Users,
  BarChart3,
  Check,
  Minus,
  XCircle,
  Plus,
  Inbox,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";
import { Stat, StatRow } from "@/components/ui/Stat";

/* ─────────────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────────────── */
type KPIItem = { value: number; suffix: string; label: string; source: string };
type PromiseItem = { label: string; title: string; body: string };
type PlanItem = {
  slug: string;
  name: string;
  audience: string;
  price: string;
  setupValue: string;
  engagementValue: string;
  tagline: string;
  features: string[];
};
type AddonItem = { slug: string; name: string; why: string; price: string };
type FaqItem = { q: string; a: string };

/* ─────────────────────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────────────────────── */
export default function WakiBoxPage() {
  const t = useTranslations("wakiBox");

  const kpiItems = t.raw("kpis.items") as KPIItem[];
  const promiseItems = t.raw("promise.items") as PromiseItem[];
  const planItems = t.raw("plans.items") as PlanItem[];
  const pilotBullets = t.raw("pilot.bullets") as string[];
  const addonItems = t.raw("addons.items") as AddonItem[];
  const acceptedFlows = t.raw("flows.accepted") as string[];
  const excludedFlows = t.raw("flows.excluded") as string[];
  const faqItems = t.raw("faq.items") as FaqItem[];
  const trustBadges = t.raw("finalCta.trustBadges") as string[];

  const promiseIcons = [FileCheck, ShieldCheck, BarChart3, Users, Leaf];

  return (
    <div>
      {/* ═══ HERO paper — bandeau d'urgence → notice ═══ */}
      <section className="bg-paper py-16 lg:py-24" aria-labelledby="waki-hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="min-w-0 lg:col-span-7">
              <Link
                href="/reserver?offre=waki-box-pilote"
                className="inline-flex min-h-[28px] max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-lg bg-leaf-100 px-3 py-1 text-caption font-semibold text-forest hover:text-ink sm:rounded-full"
              >
                <Inbox className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                <span>{t("urgency")}</span>
                <span className="whitespace-nowrap underline-offset-2 hover:underline">{t("urgencyCta")}</span>
              </Link>
              <p className="mt-6 text-eyebrow uppercase text-muted">{t("hero.eyebrow")}</p>
              <h1 id="waki-hero-title" className="mt-3 max-w-[20ch] text-display-lg text-ink">{t("hero.headline")}</h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-ink-700">{t("hero.subtitle")}</p>
              <p className="mt-4 max-w-[65ch] text-body text-ink-700">{t("hero.subtitleSecond")}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserver" size="lg">{t("hero.cta1")}</ButtonLink>
                <ButtonLink href="/reserver?offre=waki-box-pilote" variant="secondary" size="lg">{t("hero.cta2")}</ButtonLink>
              </div>
              <a href="#waki-plans" className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-muted hover:text-ink">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {t("hero.scrollCta")}
              </a>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image src="/photos/ewaste-recycling.jpg" alt={t("hero.photoAlt")} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ KPI (night) ═══ */}
      <Section tone="night" spacing="dense">
        <StatRow tone="dark">
          {kpiItems.map((kpi, i) => (
            <Stat key={i} tone="dark" value={<CountUp end={kpi.value} suffix={kpi.suffix} />} label={kpi.label} source={kpi.source} />
          ))}
        </StatRow>
        <p className="mt-8 max-w-[65ch] text-caption italic text-ondark-muted">{t("kpis.footnote")}</p>
      </Section>

      {/* ═══ PROBLÈME (paper) ═══ */}
      <Section tone="paper">
        <FadeIn>
          <SectionHeader alert eyebrow={t("problem.eyebrow")} title={t("problem.title")}>
            <div className="mt-4 max-w-[65ch] space-y-4 text-body-lg text-ink-700">
              <p>{t("problem.body")}</p>
              <p>{t("problem.bodySecond")}</p>
            </div>
          </SectionHeader>
        </FadeIn>
      </Section>

      {/* ═══ PROMESSE (cream) ═══ */}
      <Section tone="cream" bordered>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FadeIn>
              <SectionHeader eyebrow={t("promise.eyebrow")} title={t("promise.title")} intro={t("promise.subtitle")} />
            </FadeIn>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {promiseItems.map((p, i) => (
                <StaggerItem key={i} className="h-full">
                  <div className="h-full rounded-xl border border-line bg-paper p-6">
                    <Pictogram icon={promiseIcons[i] ?? Leaf} />
                    <p className="mt-4 text-eyebrow uppercase text-muted">{p.label}</p>
                    <h3 className="mt-2 text-heading-md text-ink">{p.title}</h3>
                    <p className="mt-2 text-body-sm text-ink-700">{p.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line lg:sticky lg:top-24">
              <Image src="/photos/impact-dashboard.jpg" alt={t("promise.photoAlt")} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ 3 PLANS #waki-plans (paper) ═══ */}
      <section id="waki-plans" className="bg-paper py-16 lg:py-24" aria-labelledby="plans-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader id="plans-title" eyebrow={t("plans.eyebrow")} title={t("plans.title")} intro={t("plans.subtitle")} />
          </FadeIn>
          <StaggerContainer className="grid gap-6 lg:grid-cols-3">
            {planItems.map((plan, i) => {
              const isPopular = plan.slug === "waki-box-confort";
              return (
                <StaggerItem key={plan.slug} className="h-full">
                  <article className={`flex h-full flex-col rounded-xl border bg-paper p-6 lg:p-8 ${isPopular ? "border-leaf" : "border-line"}`}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-eyebrow uppercase text-muted">{String(i + 1).padStart(2, "0")}</p>
                      {isPopular && <Tag variant="brand">{t("plans.popular")}</Tag>}
                    </div>
                    <h3 className="mt-3 font-display text-display-sm text-ink">{plan.name}</h3>
                    <p className="mt-1 text-caption text-muted">{plan.audience}</p>
                    <p className="mt-3 text-body-sm text-ink-700">{plan.tagline}</p>
                    <dl className="mt-6 border-y border-line py-4">
                      <div className="flex flex-col-reverse justify-end">
                        <dt className="text-caption text-muted">{t("plans.monthly")}</dt>
                        <dd className="font-display text-display-md tabular-nums text-forest">{plan.price}</dd>
                      </div>
                      <div className="mt-3 flex justify-between gap-4 text-body-sm">
                        <dt className="text-muted">{t("plans.setup")}</dt>
                        <dd className="font-semibold tabular-nums text-ink">{plan.setupValue}</dd>
                      </div>
                      <div className="mt-1 flex justify-between gap-4 text-body-sm">
                        <dt className="text-muted">{t("plans.engagement")}</dt>
                        <dd className="font-semibold text-ink">{plan.engagementValue}</dd>
                      </div>
                    </dl>
                    <ul className="mt-6 flex-1 space-y-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-body-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <ButtonLink href={`/reserver?offre=${plan.slug}`} variant={isPopular ? "primary" : "secondary"} fullWidth>
                        {t("plans.ctaReserve")}
                      </ButtonLink>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ PILOTE (leaf-100) ═══ */}
      <Section tone="mint">
        <FadeIn>
          <SectionHeader eyebrow={t("pilot.eyebrow")} title={t("pilot.title")} intro={t("pilot.body")} />
          <ul className="max-w-[65ch] space-y-2">
            {pilotBullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-body-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/reserver?offre=waki-box-pilote" size="lg">{t("pilot.cta")}</ButtonLink>
          </div>
          <p className="mt-4 max-w-[65ch] text-caption text-ink-700">{t("pilot.footnote")}</p>
        </FadeIn>
      </Section>

      {/* ═══ OPTIONS — tableau ═══ */}
      <Section tone="paper">
        <FadeIn>
          <SectionHeader eyebrow={t("addons.eyebrow")} title={t("addons.title")} intro={t("addons.subtitle")} />
        </FadeIn>
        <Table
          caption={t("addons.title")}
          head={[t("addons.headerOption"), t("addons.headerWhy"), t("addons.headerPrice"), <span key="a" className="sr-only">Action</span>]}
          numeric={[2]}
          emphasis={[2]}
          rows={addonItems.map((a) => [
            <span key="n" className="flex items-center gap-2"><Plus className="h-4 w-4 text-forest" aria-hidden="true" />{a.name}</span>,
            <span key="w" className="block min-w-[220px]">{a.why}</span>,
            <span key="p" className="whitespace-nowrap">{a.price}</span>,
            <Link key="c" href={`/reserver?offre=${a.slug}`} className="inline-flex min-h-[44px] items-center whitespace-nowrap font-medium text-leaf hover:text-leaf-700" aria-label={`${t("addons.ctaReserve")} : ${a.name}`}>
              {t("addons.ctaReserve")} →
            </Link>,
          ])}
        />
        <p className="mt-4 max-w-[65ch] text-caption italic text-muted">{t("addons.footnote")}</p>
      </Section>

      {/* ═══ FLUX ACCEPTÉS / EXCLUS (cream) ═══ */}
      <Section tone="cream">
        <FadeIn>
          <SectionHeader eyebrow={t("flows.eyebrow")} title={t("flows.title")} intro={t("flows.intro")} />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-paper p-6">
            <h3 className="flex items-center gap-2 text-heading-md text-ink">
              <BatteryCharging className="h-5 w-5 text-forest" strokeWidth={1.75} aria-hidden="true" />
              {t("flows.acceptedTitle")}
            </h3>
            <ul className="mt-4 space-y-2">
              {acceptedFlows.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-paper p-6">
            <h3 className="flex items-center gap-2 text-heading-md text-ink">
              <XCircle className="h-5 w-5 text-ochre" strokeWidth={1.75} aria-hidden="true" />
              {t("flows.excludedTitle")}
            </h3>
            <ul className="mt-4 space-y-2">
              {excludedFlows.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                  <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <TextLink href={t("flows.linkHref")}>{t("flows.linkLabel")}</TextLink>
        </div>
      </Section>

      {/* ═══ FAQ (paper) ═══ */}
      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <FadeIn>
            <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} />
          </FadeIn>
          <Accordion items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </Section>

      {/* ═══ CITATION (night) ═══ */}
      <Section tone="night">
        <FadeIn>
          <figure className="max-w-[65ch]">
            <p className="text-eyebrow uppercase text-ondark-muted">{t("finalQuote.eyebrow")}</p>
            <blockquote className="mt-4 font-display text-display-sm text-ondark">&laquo;&nbsp;{t("finalQuote.text")}&nbsp;&raquo;</blockquote>
            <figcaption className="mt-6 text-caption text-ondark-muted">
              <span className="font-semibold text-ondark">{t("finalQuote.name")}</span> · {t("finalQuote.role")}
            </figcaption>
          </figure>
        </FadeIn>
      </Section>

      {/* ═══ CTA UNIQUE ═══ */}
      <CtaSection
        id="waki-final-cta"
        eyebrow={t("finalCta.eyebrow")}
        title={t("finalCta.title")}
        subtitle={t("finalCta.subtitle")}
        primaryLabel={t("finalCta.cta1")}
        primaryHref="/reserver"
        secondaryLabel={t("finalCta.cta2")}
        secondaryHref="/reserver?offre=waki-box-pilote"
        reassurance={trustBadges.join(" · ")}
      />
    </div>
  );
}
