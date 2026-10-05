"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Fingerprint, Hourglass, QrCode, ScrollText, ShieldCheck, Wrench } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaSection from "@/components/CtaSection";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import CertificateCard from "@/components/visuals/CertificateCard";
import MediaSlot from "@/components/visuals/MediaSlot";
import { IN_PROGRESS, METHODS, PLATFORM_PROOFS, REGULATIONS, type ComplianceItem } from "@/content/certifications";

/**
 * /certifications — « Conformité & démarche » / « Compliance & approach » (2026-10-04).
 * GreenTechCycle ne détient AUCUNE certification à ce jour ; la démarche ISO 27001 est en cours.
 * La page présente : les méthodes appliquées (normes techniques, pas des certifications),
 * la démarche en cours, les preuves produites par la plateforme et le cadre réglementaire.
 * L'URL /certifications est conservée (menu, sitemap, liens existants).
 */
export default function CompliancePage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const tSec = useTranslations("Security");
  const custody = tSec.raw("chainOfCustody.steps") as string[];

  const card = (c: ComplianceItem) => (
    <li key={c.id} className="reveal h-full">
      <article data-item={c.id} className="flex h-full flex-col rounded-xl border border-track bg-bg-card p-6 transition-colors hover:border-track-strong">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-heading-lg text-fg">{c.name}</h3>
          {c.status === "inProgress" ? (
            <Tag variant="alert" icon={<Hourglass className="h-3.5 w-3.5" aria-hidden="true" />}>
              {tx("En cours", "In progress")}
            </Tag>
          ) : (
            <Tag variant="neutral" icon={<Wrench className="h-3.5 w-3.5" aria-hidden="true" />}>
              {tx("Méthode appliquée", "Applied method")}
            </Tag>
          )}
        </div>
        <p className="mt-3 text-body-sm text-fg-strong">{c.description[lang]}</p>
      </article>
    </li>
  );

  const proofIcons = [ScrollText, Fingerprint, ShieldCheck, QrCode];

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-bg py-12 lg:py-16" aria-labelledby="compliance-title">
        <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="fx-dots fx-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            dark
            items={[
              { label: tx("Accueil", "Home"), href: `/${locale}` },
              { label: tx("Conformité & démarche", "Compliance & approach"), href: `/${locale}/certifications` },
            ]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="dark" icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />}>
                {tx("Conformité & démarche", "Compliance & approach")}
              </Tag>
              <h1 id="compliance-title" className="mt-6 max-w-[22ch] text-display-lg text-fg">
                {tx("Des méthodes appliquées, des preuves vérifiables, une certification en cours.", "Applied methods, verifiable proof, a certification in progress.")}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">
                {tx(
                  "GreenTechCycle ne détient pas de certification à ce jour. Notre démarche ISO 27001 est en cours. Ce que nous pouvons montrer dès aujourd'hui : les méthodes d'effacement que nous appliquons et les preuves que la plateforme produit pour chaque actif.",
                  "GreenTechCycle does not hold any certification to date. Our ISO 27001 certification process is in progress. What we can show today: the erasure methods we apply and the proof the platform produces for every asset."
                )}
              </p>
            </div>
            <div className="reveal-scale lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-track shadow-float">
                <MediaSlot fill id="certifications-hero" alt={tx("Certificat d'effacement GreenTechCycle", "GreenTechCycle erasure certificate")} fallback={<CertificateCard />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MÉTHODES APPLIQUÉES ═══ */}
      <Section id="methodes" tone="cream">
        <div className="reveal">
          <SectionHeader
            eyebrow={tx("Méthodes appliquées", "Applied methods")}
            title={tx("Les normes techniques que nous appliquons à chaque mission.", "The technical standards we apply on every mission.")}
            intro={tx("Ce sont des méthodes d'effacement et de destruction, pas des certifications.", "These are erasure and destruction methods, not certifications.")}
          />
        </div>
        <ul className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{METHODS.map(card)}</ul>
      </Section>

      {/* ═══ DÉMARCHE EN COURS ═══ */}
      <Section id="demarche" tone="paper">
        <div className="reveal">
          <SectionHeader eyebrow={tx("Démarche en cours", "In progress")} title={tx("Certification visée.", "Certification we are working towards.")} />
        </div>
        <ul className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{IN_PROGRESS.map(card)}</ul>
      </Section>

      {/* ═══ PREUVES PRODUITES ═══ */}
      <Section id="preuves" tone="night">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <SectionHeader
              tone="dark"
              eyebrow={tx("Preuves produites", "Proofs produced")}
              title={tx("Ce que la plateforme délivre pour chaque actif.", "What the platform delivers for every asset.")}
            />
            <ul className="space-y-4">
              {PLATFORM_PROOFS[lang].map((p, i) => {
                const Icon = proofIcons[i] ?? ShieldCheck;
                return (
                  <li key={p} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-body text-fg">{p}</span>
                  </li>
                );
              })}
            </ul>
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

      {/* ═══ CADRE RÉGLEMENTAIRE ═══ */}
      <Section id="conformite" tone="paper">
        <div className="reveal">
          <SectionHeader
            eyebrow={tx("Cadre réglementaire", "Regulatory context")}
            title={tx("Les réglementations auxquelles la plateforme vous aide à répondre.", "The regulations the platform helps you meet.")}
          />
        </div>
        <ul className="reveal flex flex-wrap gap-2">
          {REGULATIONS.map((r) => (
            <li key={r}>
              <Link
                href="/reglementation"
                className="inline-flex min-h-[44px] items-center rounded-full border border-track bg-bg-card px-4 font-mono text-body-sm text-fg transition-colors hover:border-emerald hover:text-emerald"
              >
                {r}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection
        eyebrow={tx("Audit de conformité", "Compliance audit")}
        title={tx("Vérifions ensemble les exigences de votre secteur.", "Let's review your sector's requirements together.")}
        secondaryHref="/contact"
      />
    </div>
  );
}
