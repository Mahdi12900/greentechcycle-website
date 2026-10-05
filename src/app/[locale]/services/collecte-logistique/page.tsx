"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, FileCheck, Lock, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import LifecycleDiagram from "@/components/visuals/LifecycleDiagram";
import MediaSlot from "@/components/visuals/MediaSlot";

/**
 * /services/collecte-logistique — Collecte & logistique (phase 3, 2026-10-04).
 * Page sans texte nouveau sur le fond : tout est lu dans les contenus GTC existants
 * (Services.items[collecte], Process.steps, Security.chainOfCustody, Home.faq,
 * wakiBox.faq). Seuls les titres de section sont propres à la page.
 */
export default function CollecteLogistiquePage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const tServices = useTranslations("Services");
  const tProcess = useTranslations("Process");
  const tSec = useTranslations("Security");
  const tHome = useTranslations("Home");
  const tWaki = useTranslations("wakiBox");

  type ServiceItem = { id: string; title: string; subtitle: string; engagement: string; description: string; features: string[] };
  const services = tServices.raw("items") as ServiceItem[];
  const collecte = services.find((s) => s.id === "collecte" || s.id === "collection") as ServiceItem;
  const steps = (tProcess.raw("steps") as { number: string; title: string; description: string }[]).slice(1, 3);
  const custody = tSec.raw("chainOfCustody.steps") as string[];
  const defenseFaq = tHome.raw("faq.items.1") as { q: string; a: string };
  const collectionDayFaq = tWaki.raw("faq.items.0") as { q: string; a: string };
  const deliverables = tProcess.raw("steps.6") as { title: string; description: string };

  const featureIcons = [Truck, ShieldCheck, Lock, FileCheck, PackageCheck, ShieldCheck];

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-bg py-12 lg:py-16" aria-labelledby="collecte-title">
        <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="fx-dots fx-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            dark
            items={[
              { label: tx("Accueil", "Home"), href: `/${locale}` },
              { label: tx("Services", "Services"), href: `/${locale}/services` },
              { label: tx("Collecte & logistique", "Collection & logistics"), href: `/${locale}/services/collecte-logistique` },
            ]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="dark" icon={<Truck className="h-3.5 w-3.5" aria-hidden="true" />}>
                {collecte.subtitle}
              </Tag>
              <h1 id="collecte-title" className="mt-6 max-w-[22ch] text-display-lg text-fg">
                {collecte.title}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{collecte.description}</p>
              <p className="mt-6 inline-flex items-center gap-2 font-mono text-caption uppercase tracking-[0.08em] text-emerald">
                <span className="h-2 w-2 rounded-full bg-emerald shadow-glow-dot" aria-hidden="true" />
                {collecte.engagement}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact?offre=audit-decommissionnement" size="lg">
                  {tx("Planifier une collecte", "Schedule a collection")}
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg">
                  {tx("Tous les services", "All services")}
                </ButtonLink>
              </div>
            </div>
            <div className="reveal-scale lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-track shadow-float">
                <MediaSlot
                  fill
                  id="collecte-hero"
                  alt={tx("Collecte sécurisée sous scellés", "Secure collection under seal")}
                  fallback={<LifecycleDiagram active={0} />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ENGAGEMENTS LOGISTIQUES ═══ */}
      <Section id="engagements" tone="cream">
        <div className="reveal">
          <SectionHeader eyebrow={tx("Logistique", "Logistics")} title={tx("Six garanties à chaque enlèvement.", "Six guarantees on every pickup.")} />
        </div>
        <ul className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collecte.features.map((f, i) => {
            const Icon = featureIcons[i] ?? Check;
            return (
              <li key={f} className="reveal h-full">
                <div className="flex h-full items-start gap-4 rounded-xl border border-track bg-bg p-5">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <p className="text-body-sm text-fg">{f}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ═══ DÉROULÉ ═══ */}
      <Section id="deroule" tone="paper">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <SectionHeader eyebrow={tx("Déroulé", "How it works")} title={tx("De vos locaux à notre plateau de traitement.", "From your premises to our processing floor.")} />
            <ol className="space-y-6">
              {steps.map((s) => (
                <li key={s.number} className="border-l-2 border-emerald pl-5">
                  <p className="font-mono text-caption text-fg-muted">{s.number}</p>
                  <h3 className="mt-1 text-heading-lg text-fg">{s.title}</h3>
                  <p className="mt-2 text-body-sm text-fg-strong">{s.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="reveal">
            <p className="text-eyebrow uppercase text-fg-muted">{tSec("chainOfCustody.title")}</p>
            <p className="mt-2 text-body-sm text-fg-strong">{tSec("chainOfCustody.subtitle")}</p>
            <ol className="mt-6 space-y-3 border-l border-track pl-6">
              {custody.map((step, i) => (
                <li key={step} className="relative text-body-sm text-fg">
                  <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-emerald shadow-glow-dot" aria-hidden="true" />
                  <span className="mr-2 font-mono text-caption text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ═══ CAS PARTICULIERS ═══ */}
      <Section id="cas-particuliers" tone="night">
        <div className="reveal">
          <SectionHeader tone="dark" eyebrow={tx("Cas particuliers", "Special cases")} title={tx("Sites sensibles et collecte de proximité.", "Sensitive sites and local collection.")} />
        </div>
        <div className="reveal-stagger grid gap-4 lg:grid-cols-3">
          {[defenseFaq, collectionDayFaq].map((f) => (
            <div key={f.q} className="reveal h-full">
              <article className="h-full rounded-xl border border-track bg-bg-card p-6">
                <h3 className="text-heading-md text-fg">{f.q}</h3>
                <p className="mt-3 text-body-sm text-fg-strong">{f.a}</p>
              </article>
            </div>
          ))}
          <div className="reveal h-full">
            <article className="h-full rounded-xl border border-track bg-bg-card p-6">
              <h3 className="text-heading-md text-fg">{deliverables.title}</h3>
              <p className="mt-3 text-body-sm text-fg-strong">{deliverables.description}</p>
              <div className="mt-4 flex flex-col gap-2">
                <TextLink href="/services/wakibox" tone="dark">
                  {tx("Collecte connectée WakiBox", "WakiBox connected collection")}
                </TextLink>
                <TextLink href="/certifications" tone="dark">
                  {tx("Conformité & démarche", "Compliance & approach")}
                </TextLink>
              </div>
            </article>
          </div>
        </div>
      </Section>

      <CtaSection
        eyebrow={tx("Collecte", "Collection")}
        title={tx("Une intervention sur site à planifier ?", "An on-site intervention to plan?")}
        secondaryHref="/contact"
      />
    </div>
  );
}
