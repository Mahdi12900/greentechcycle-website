"use client";

/**
 * /tarifs — liste de prix publique complète (publiée le 2026-10-06), présentation inspirée de JFrog.
 * Source unique : src/content/pricing.ts (reports/price-book-gtc.xlsx, feuilles Liste_publique,
 * Tarif_par_tranche, Collecte_valeur). Ordre de la feuille Page_Tarifs :
 *
 *   En-tête + essai gratuit
 *   Onglet Plateforme   : éditions + bascule Annuel/Mensuel, tarif par tranche, exemples, calculateur,
 *                         matrice fonctionnelle, modules à la carte, Pack Conformité et crédits IA
 *   Onglet Services ITAD: niveaux E1/E2/E3, prix par catégorie et tranche, frais, configurateur,
 *                         preuve P1–P4, reporting, collecte (règle de valeur, C1–C4, options)
 *   Onglet Waki Box     : plans, mise en service par borne, offre pilote, options, bundles
 *   Commun              : support & SLA, Customer Success, services professionnels, conditions,
 *                         contacter les ventes, FAQ
 */

import { useLocale } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Mail } from "lucide-react";
import { track } from "@/lib/analytics";

import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";
import FilterTabs from "@/components/ui/FilterTabs";
import ItadConfigurator from "@/components/product/ItadConfigurator";
import {
  BandTable,
  BillingToggle,
  FeatureMatrix,
  Mark,
  PlatformCalculator,
  PriceList,
  withBilling,
  type Billing,
} from "@/components/pricing/PricingBlocks";
import {
  AI_CREDITS,
  COLLECTION_CLASSES,
  COLLECTION_EXTRAS,
  COLLECTION_VALUE_RULE,
  COMPLIANCE_CONTENTS,
  COMPLIANCE_PACKS,
  CSM_TIERS,
  DAY_RATES,
  EDITIONS,
  ERASURE_LEVELS,
  EXAMPLE_QUANTITIES,
  FREE_TIER,
  ITAD_FEES,
  ITAD_GROUPS,
  MODULES,
  MULTI_YEAR_DISCOUNT,
  ONBOARDING_GUARDRAILS,
  OT_BANDS,
  OT_MIN_ASSETS,
  PARCEL_OPTION,
  PROOF_LEVELS,
  PS_PACKAGES,
  REPORTING,
  SERVICE_CREDITS,
  SEVERITY_MATRIX,
  SUPPORT_TIERS,
  TRIAL,
  WAKI_ADDONS,
  WAKI_BUNDLES,
  WAKI_EXTRA_KIOSK,
  WAKI_PLANS,
  WAKI_SETUP_BANDS,
  editionMonthly,
  eur,
  graduatedTotal,
  itadLine,
  num,
  otMonthly,
  type EditionId,
} from "@/content/pricing";
import { PRICING_FAQ } from "@/content/pricing-faq";

const LAB_PILOT = PS_PACKAGES.find((p) => p.id === "lab")!;

/* ── Onglets produit + liens profonds ─────────────────────────────────────── */
const PRODUCT_TAB_IDS = ["plateforme", "service-itad", "waki-box"] as const;
type ProductTabId = (typeof PRODUCT_TAB_IDS)[number];
/** Ancres (historiques et nouvelles) qui vivent dans un onglet : elles le sélectionnent. */
const HASH_TO_TAB: Record<string, ProductTabId> = {
  "sur-devis": "plateforme",
  editions: "plateforme",
  "tarif-par-tranche": "plateforme",
  modules: "plateforme",
  conformite: "plateforme",
  configurateur: "service-itad",
  "prix-itad": "service-itad",
  preuve: "service-itad",
  collecte: "service-itad",
  plans: "waki-box",
};
function tabFromHash(hash: string): ProductTabId | null {
  const h = hash.replace("#", "");
  if ((PRODUCT_TAB_IDS as readonly string[]).includes(h)) return h as ProductTabId;
  return HASH_TO_TAB[h] ?? null;
}

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-body-sm text-fg-strong">
    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald" aria-hidden="true" />
    <span>{children}</span>
  </li>
);

export default function TarifsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }
  const e = (n: number) => eur(n, lang);
  const HT = tx("HT", "ex-VAT");

  /* ── Onglets : valeur initiale identique au rendu serveur (pas d'écart d'hydratation) ── */
  const [activeTab, setActiveTab] = useState<ProductTabId>("plateforme");
  const pendingAnchor = useRef<string | null>(null);
  const [anchorTick, setAnchorTick] = useState(0);
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const next = tabFromHash(window.location.hash);
      if (next) setActiveTab(next);
      // La cible n'est visible qu'après le rendu de l'onglet ; le routeur remet aussi le défilement
      // en haut après l'hydratation : on refait le saut une fois la cible affichée.
      if (!(PRODUCT_TAB_IDS as readonly string[]).includes(id)) pendingAnchor.current = id;
      setAnchorTick((n) => n + 1);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    const id = pendingAnchor.current;
    if (!id) return;
    const el = document.getElementById(id);
    if (!el || el.offsetParent === null) return;
    pendingAnchor.current = null;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 120);
    return () => window.clearTimeout(t);
  }, [activeTab, anchorTick]);
  const selectTab = useCallback((id: string) => {
    setActiveTab(id as ProductTabId);
    if (typeof window !== "undefined") window.history.replaceState(null, "", `#${id}`);
  }, []);
  // tab_view : l'onglet affiché au chargement (deep link ou défaut) compte aussi comme une vue.
  const trackedTab = useRef<string | null>(null);
  useEffect(() => {
    if (trackedTab.current === activeTab) return;
    trackedTab.current = activeTab;
    track("tab_view", { tab: activeTab, page: "tarifs" });
  }, [activeTab]);

  const [billing, setBilling] = useState<Billing>("annual");
  const perMonth = tx("/mois", "/month");

  /* ── Éditions : contenu cumulatif (Bon / Mieux / Meilleur) ─────────────── */
  const editionCards: Record<EditionId, { audience: string; cumulative: string | null; bullets: string[]; cta: string; href: string }> = {
    essentials: {
      audience: tx("Inventaire et fin de support, jusqu'à 2 000 actifs", "Inventory and end-of-support, up to 2,000 assets"),
      cumulative: null,
      bullets: tx(
        ["Inventaire IT : postes, serveurs, réseau, mobiles", "Import CSV / API générique", "Indicateurs âge et fin de support (EoL / EoS)", "5 utilisateurs nommés", "Résidence des données dans l'UE", "Support Standard et CSM mutualisé inclus"],
        ["IT inventory: endpoints, servers, network, mobile", "CSV import / generic API", "Age and end-of-life / end-of-support indicators", "5 named users", "EU data residency", "Standard support and pooled CSM included"]
      ),
      cta: tx("Démarrer l'essai gratuit", "Start the free trial"),
      href: "/reserver?offre=essai-asset-management",
    },
    professional: {
      audience: tx("Renouvellements et intégration ERP / ITSM", "Renewals and ERP / ITSM integration"),
      cumulative: tx("Tout Essentials, plus :", "Everything in Essentials, plus:"),
      bullets: tx(
        ["Planification des renouvellements", "1 connecteur natif SAP, Oracle ou ServiceNow inclus", "25 utilisateurs nommés, SSO SAML", "Export du journal d'audit vers votre SIEM", "Jusqu'à 50 000 actifs"],
        ["Renewal planning", "1 native SAP, Oracle or ServiceNow connector included", "25 named users, SAML SSO", "Audit log export to your SIEM", "Up to 50,000 assets"]
      ),
      cta: tx("Parler à un commercial", "Talk to sales"),
      href: "/reserver?offre=plateforme-professional",
    },
    enterprise: {
      audience: tx("Grands parcs, prévision et gouvernance", "Large fleets, forecasting and governance"),
      cumulative: tx("Tout Professional, plus :", "Everything in Professional, plus:"),
      bullets: tx(
        ["Risque de panne et prévision budgétaire", "Jusqu'à 5 connecteurs natifs inclus", "Utilisateurs illimités, SSO + SCIM", "Environnement sandbox", "Localisation contractuelle des données", "CSM dédié inclus si ARR ≥ 60 000 €"],
        ["Failure risk and budget forecasting", "Up to 5 native connectors included", "Unlimited users, SSO + SCIM", "Sandbox environment", "Contractual data location", "Dedicated CSM included if ARR ≥ €60,000"]
      ),
      cta: tx("Parler à un commercial", "Talk to sales"),
      href: "/reserver?offre=plateforme-enterprise",
    },
  };
  const editionMeta = (id: EditionId) =>
    ({
      essentials: tx("Minimum 100 actifs facturés · plafond 2 000 actifs", "Minimum 100 assets billed · capped at 2,000 assets"),
      professional: tx("Minimum 2 500 € HT/mois · jusqu'à 50 000 actifs", "Minimum €2,500 ex-VAT/month · up to 50,000 assets"),
      enterprise: tx("Minimum 2 000 actifs facturés · au-delà de 50 000 : nous contacter", "Minimum 2,000 assets billed · above 50,000: contact us"),
    })[id];
  const editionExample = (id: EditionId) => {
    const q = id === "enterprise" ? 2000 : id === "professional" ? 500 : 200;
    const m = editionMonthly(id, q)!;
    return tx(`${num(q, lang)} actifs : ${e(Math.round(withBilling(m, billing)))} HT/mois`, `${num(q, lang)} assets: ${e(Math.round(withBilling(m, billing)))} ex-VAT/month`);
  };

  /* ── Exemples de totaux mensuels ───────────────────────────────────────── */
  const exampleRows = EXAMPLE_QUANTITIES.map((q) => {
    const cell = (v: number | null) => (v == null ? <span className="text-fg-muted">—</span> : e(Math.round(withBilling(v, billing))));
    const ess = editionMonthly("essentials", q);
    const pro = editionMonthly("professional", q);
    const ent = q >= 2000 ? editionMonthly("enterprise", q) : null;
    const otv = q >= OT_MIN_ASSETS ? otMonthly(q) : null;
    const ws = graduatedTotal(q, itadLine("ws-e1").bands)!;
    return [
      num(q, lang),
      cell(ess),
      cell(pro),
      cell(ent),
      cell(otv),
      <span key="ws" className="whitespace-nowrap">
        {e(ws)} <span className="text-caption text-fg-muted">({eur(ws / q, lang, { decimals: true })}/{tx("poste", "device")})</span>
      </span>,
    ];
  });

  /* ── Waki Box ──────────────────────────────────────────────────────────── */
  const wakiFeatures: Record<string, string[]> = {
    essentiel: tx(
      ["1 borne Waki Box installée et configurée", "Plateforme de suivi, 1 utilisateur", "Rapport trimestriel de flux DEEE", "Support par courriel"],
      ["1 Waki Box kiosk installed and configured", "Monitoring platform, 1 user", "Quarterly WEEE flow report", "Email support"]
    ),
    confort: tx(
      ["2 bornes Waki Box incluses", "Plateforme complète, 5 utilisateurs", "Rapport mensuel + export CSRD ESRS E5", "Alertes de remplissage en temps réel"],
      ["2 Waki Box kiosks included", "Full platform, 5 users", "Monthly report + CSRD ESRS E5 export", "Real-time fill alerts"]
    ),
    premium: tx(
      ["4 bornes incluses, multi-sites", "Intégration ERP / SIRH par API", "Responsable de compte dédié", "Mise en service dégressive dès 5 bornes"],
      ["4 kiosks included, multi-site", "ERP / HRIS integration via API", "Dedicated account manager", "Setup price decreases from 5 kiosks"]
    ),
  };
  const wakiAudience: Record<string, string> = {
    essentiel: tx("TPE / PME, un site", "Small business, one site"),
    confort: tx("PME / ETI, un ou deux espaces", "Mid-market, one or two areas"),
    premium: tx("ETI / grands comptes, multi-sites", "Enterprise, multi-site"),
  };

  /* ── FAQ (src/content/pricing-faq.ts, partagée avec le JSON-LD) ───────── */
  const faqItems = PRICING_FAQ[lang];

  const tabItems = [
    { id: "plateforme", label: tx("Plateforme", "Platform") },
    { id: "service-itad", label: tx("Services ITAD et collecte", "ITAD services and pick-up") },
    { id: "waki-box", label: "Waki Box" },
  ];
  const quickLinks = [
    { href: "#editions", label: tx("Éditions", "Editions") },
    { href: "#modules", label: tx("Modules", "Modules") },
    { href: "#prix-itad", label: tx("Services ITAD", "ITAD services") },
    { href: "#collecte", label: tx("Collecte", "Pick-up") },
    { href: "#plans", label: "Waki Box" },
    { href: "#support", label: tx("Support et SLA", "Support & SLA") },
    { href: "#services-pro", label: tx("Services pro", "Professional services") },
    { href: "#faq", label: "FAQ" },
  ];

  const subHead = (eyebrow: string, title: string, intro?: string, id?: string) => (
    <div className="mb-6">
      <p className="text-eyebrow uppercase text-emerald">{eyebrow}</p>
      <h3 id={id} className="mt-2 max-w-[32ch] font-display text-display-sm text-fg">
        {title}
      </h3>
      {intro && <p className="mt-3 max-w-[70ch] text-body text-fg-strong">{intro}</p>}
    </div>
  );

  return (
    <div>
      {/* ═══════════ EN-TÊTE + ESSAI GRATUIT ═══════════ */}
      <section className="border-b border-track bg-bg-card py-12 lg:py-16" aria-labelledby="tarifs-hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Tag variant="brand">{tx("Liste de prix publique", "Public price list")}</Tag>
                <Tag variant="neutral">{tx("Prix HT, engagement annuel", "Ex-VAT, annual commitment")}</Tag>
              </div>
              <h1 id="tarifs-hero-title" className="mt-6 max-w-[20ch] text-display-lg text-fg">
                {tx("Des prix publics pour chaque brique.", "Public prices for every building block.")}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">
                {tx(
                  "Plateforme d'asset management au prix par actif, dégressif sur 9 tranches. Services ITAD au prix par appareil et par niveau d'effacement. Collecte selon la taille du lot, offerte quand la valeur de vos équipements la finance. Waki Box par borne. Le devis reprend ces lignes, sans surprise.",
                  "Asset management platform priced per asset, graduated over 9 bands. ITAD services priced per device and erasure level. Pick-up priced by lot size, free when your equipment's value covers it. Waki Box per kiosk. The quote uses these same lines, no surprises."
                )}
              </p>
              <nav aria-label={tx("Aller à une section des tarifs", "Jump to a pricing section")} className="mt-6">
                <ul className="flex flex-wrap gap-2">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="inline-flex min-h-[40px] items-center rounded-full border border-track px-3.5 text-body-sm font-medium text-fg-strong transition-colors hover:border-track-strong hover:text-fg"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Essai gratuit Asset Management */}
            <aside aria-labelledby="trial-title" className="rounded-2xl border border-emerald-line bg-bg p-6 lg:col-span-5 lg:p-8">
              <Tag variant="brand">{tx("Gratuit, sans carte bancaire", "Free, no credit card")}</Tag>
              <h2 id="trial-title" className="mt-4 font-display text-display-sm text-fg">
                {tx(`Essai gratuit Asset Management : ${TRIAL.days} jours`, `Free Asset Management trial: ${TRIAL.days} days`)}
              </h2>
              <ul className="mt-5 space-y-2">
                <Bullet>{tx(`Jusqu'à ${TRIAL.maxAssets} actifs IT et ${TRIAL.users} utilisateurs`, `Up to ${TRIAL.maxAssets} IT assets and ${TRIAL.users} users`)}</Bullet>
                <Bullet>{tx("Import CSV + 1 connecteur générique ; SAP, Oracle et ServiceNow en démonstration", "CSV import + 1 generic connector; SAP, Oracle and ServiceNow in demo")}</Bullet>
                <Bullet>{tx(`Une prolongation de ${TRIAL.extensionDays} jours possible`, `One ${TRIAL.extensionDays}-day extension available`)}</Bullet>
                <Bullet>{tx("Support par e-mail en heures ouvrées", "Email support in business hours")}</Bullet>
              </ul>
              <p className="mt-5 border-t border-track pt-4 text-body-sm text-fg-strong">
                <strong className="font-semibold text-fg">{tx("Ensuite : palier gratuit permanent.", "Then: permanent free tier.")}</strong>{" "}
                {tx(
                  `${FREE_TIER.assets} actifs, ${FREE_TIER.users} utilisateur, lecture seule — ou passez à une édition.`,
                  `${FREE_TIER.assets} assets, ${FREE_TIER.users} user, read-only — or move to an edition.`
                )}
              </p>
              <p className="mt-2 text-caption text-fg-muted">
                {tx("Hors essai : OT/IoT, Pack Conformité, CSRD et IA.", "Not in the trial: OT/IoT, Compliance pack, CSRD and AI.")}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/reserver?offre=essai-asset-management" size="lg" fullWidth>
                  {tx("Démarrer l'essai gratuit", "Start the free trial")}
                </ButtonLink>
                <ButtonLink href="/reserver?offre=demo-conseil" variant="secondary" size="lg" fullWidth>
                  {tx("Parler à un commercial", "Talk to sales")}
                </ButtonLink>
              </div>
            </aside>
          </div>
          <CertificationStrip className="mt-12 border-t border-track pt-6" />
        </div>
      </section>

      {/* ═══════════ ONGLETS PRODUIT ═══════════ */}
      <div className="bg-bg pt-8 lg:pt-10">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FilterTabs items={tabItems} active={activeTab} onChange={selectTab} label={tx("Offres GreenTechCycle", "GreenTechCycle offers")} />
        </div>
      </div>

      {/* ═══════════ ONGLET PLATEFORME ═══════════ */}
      <div id="panel-plateforme" role="tabpanel" aria-labelledby="tab-plateforme" hidden={activeTab !== "plateforme"}>
        <Section id="editions" tone="paper" className="scroll-mt-24">
          <span id="sur-devis" className="block scroll-mt-24" aria-hidden="true" />
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              className="!mb-0"
              eyebrow={tx("Plateforme GTC · Asset Management", "GTC Platform · Asset Management")}
              title={tx("Trois éditions. Un prix par actif qui baisse avec le volume.", "Three editions. A per-asset price that falls with volume.")}
              intro={tx(
                "Prix par actif IT et par mois, sur 9 tranches progressives, en engagement annuel. En facturation mensuelle sans engagement : +20 %.",
                "Price per IT asset per month, over 9 graduated bands, on an annual commitment. Monthly billing with no commitment: +20%."
              )}
            />
            <BillingToggle billing={billing} onChange={setBilling} lang={lang} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {EDITIONS.map((ed) => {
              const card = editionCards[ed.id];
              const first = ed.bands[0]!;
              const last = [...ed.bands].reverse().find((b) => b != null)!;
              return (
                <article
                  key={ed.id}
                  aria-labelledby={`edition-${ed.id}`}
                  className={`relative flex h-full flex-col rounded-xl border bg-bg p-6 lg:p-8 ${ed.recommended ? "border-emerald" : "border-track"}`}
                >
                  {ed.recommended && (
                    <span className="absolute -top-3 left-6 rounded-full bg-emerald px-3 py-1 text-caption font-semibold text-bg">{tx("Recommandé", "Recommended")}</span>
                  )}
                  <h3 id={`edition-${ed.id}`} className="font-display text-display-sm text-fg">
                    {ed.name}
                  </h3>
                  <p className="mt-1 text-caption text-fg-muted">{card.audience}</p>
                  <p className="mt-5 font-display text-display-md tabular-nums text-emerald">
                    {eur(withBilling(first, billing), lang, { decimals: true })}
                    <span className="ml-1 font-sans text-body-sm text-fg-muted">
                      {HT} / {tx("actif", "asset")}
                      {perMonth}
                    </span>
                  </p>
                  <p className="mt-1 text-body-sm text-fg-strong">
                    {tx("de 1 à 50 actifs, puis jusqu'à", "for 1–50 assets, then down to")} {eur(withBilling(last, billing), lang, { decimals: true })}
                  </p>
                  <p className="mt-3 rounded-lg border border-track px-3 py-2 text-caption text-fg-strong">
                    {tx("Exemple", "Example")} · {editionExample(ed.id)}
                  </p>
                  <p className="mt-2 text-caption text-fg-muted">{editionMeta(ed.id)}</p>
                  {card.cumulative && <p className="mt-6 text-eyebrow uppercase text-fg-muted">{card.cumulative}</p>}
                  <ul className={`flex-1 space-y-2 ${card.cumulative ? "mt-3" : "mt-6"}`}>
                    {card.bullets.map((b) => (
                      <Bullet key={b}>{b}</Bullet>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={card.href} variant={ed.recommended ? "primary" : "secondary"} fullWidth>
                      {card.cta}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Tarif par tranche */}
          <div id="tarif-par-tranche" className="mt-14 scroll-mt-24">
            {subHead(
              tx("Tarif par tranche", "Banded pricing"),
              tx("Plus le parc est grand, moins l'actif coûte.", "The bigger the fleet, the less each asset costs."),
              tx(
                "Chaque tranche est facturée à son propre prix, comme un barème d'impôt : jamais d'effet de seuil. Exemple Essentials à 500 actifs : 50 × 8,50 + 100 × 7,00 + 100 × 5,50 + 250 × 3,30 = 2 500 € HT/mois.",
                "Each band is billed at its own price, like a tax scale: never a threshold effect. Example, Essentials at 500 assets: 50 × €8.50 + 100 × €7.00 + 100 × €5.50 + 250 × €3.30 = €2,500 ex-VAT/month."
              )
            )}
            <BandTable
              caption={tx("Prix par actif et par mois, par tranche (€ HT)", "Price per asset per month, by band (€ ex-VAT)")}
              firstColLabel={tx("€ HT / actif / mois", "€ ex-VAT / asset / month")}
              lang={lang}
              billing={billing}
              rows={[
                ...EDITIONS.map((ed) => ({
                  label: ed.name,
                  bands: ed.bands,
                  note: editionMeta(ed.id),
                })),
                {
                  label: tx("Module OT/IoT Visibility", "OT/IoT Visibility module"),
                  bands: OT_BANDS,
                  note: tx("Par actif OT ; minimum 500 actifs OT", "Per OT asset; minimum 500 OT assets"),
                },
              ]}
            />

            <h4 className="mt-10 text-heading-lg text-fg">{tx("Exemples de totaux mensuels", "Example monthly totals")}</h4>
            <p className="mt-2 max-w-[70ch] text-body-sm text-fg-muted">
              {billing === "monthly"
                ? tx("Plateforme en facturation mensuelle sans engagement (+20 %) ; services ITAD en une fois.", "Platform billed monthly with no commitment (+20%); ITAD services one-off.")
                : tx("Plateforme en engagement annuel, prix par mois ; services ITAD en une fois.", "Platform on annual commitment, price per month; ITAD services one-off.")}
            </p>
            <Table
              className="mt-4"
              caption={tx("Exemples de totaux au prix liste", "Example totals at list price")}
              head={[
                tx("Quantité", "Quantity"),
                "Essentials",
                "Professional",
                "Enterprise",
                "OT/IoT",
                tx("Postes E1, une fois", "E1 devices, one-off"),
              ]}
              numeric={[0, 1, 2, 3, 4, 5]}
              emphasis={[2]}
              rows={exampleRows}
            />
            <p className="mt-3 text-caption text-fg-muted">
              {tx(
                "— : hors périmètre de l'édition (Essentials plafonné à 2 000 actifs ; Enterprise à partir de 2 000 actifs ; OT/IoT à partir de 500 actifs). Professional : minimum 2 500 € HT/mois.",
                "— : outside the edition's range (Essentials capped at 2,000 assets; Enterprise from 2,000 assets; OT/IoT from 500 assets). Professional: minimum €2,500 ex-VAT/month."
              )}
            </p>

            <h4 className="mt-10 text-heading-lg text-fg">{tx("Calculez votre total", "Work out your total")}</h4>
            <div className="mt-4">
              <PlatformCalculator lang={lang} billing={billing} idPrefix="tarifs-calc" />
            </div>
          </div>

          {/* Matrice fonctionnelle */}
          <div className="mt-14">
            {subHead(tx("Comparatif", "Comparison"), tx("Ce que contient chaque édition.", "What each edition includes."))}
            <FeatureMatrix lang={lang} caption={tx("Comparatif fonctionnel des éditions", "Edition feature comparison")} />
          </div>
        </Section>

        {/* Modules à la carte */}
        <Section id="modules" tone="cream" className="scroll-mt-24">
          <SectionHeader
            eyebrow={tx("Modules à la carte", "Add-on modules")}
            title={tx("Ajoutez seulement ce dont vous avez besoin.", "Add only what you need.")}
            intro={tx("Chaque module se greffe sur n'importe quelle édition, avec sa propre métrique.", "Each module plugs into any edition, with its own metric.")}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <li key={m.id} className="flex flex-col rounded-xl border border-track bg-bg p-5">
                <p className="text-heading-md text-fg">{m.name[lang]}</p>
                <p className="mt-3 font-display text-display-sm tabular-nums text-emerald">
                  {m.id === "ot" ? `${tx("dès", "from")} ` : ""}
                  {eur(m.amount!, lang)}
                  <span className="ml-1 font-sans text-caption text-fg-muted">{HT}</span>
                </p>
                <p className="text-caption text-fg-muted">{m.unit[lang]}</p>
                {m.note && <p className="mt-3 text-body-sm text-fg-strong">{m.note[lang]}</p>}
              </li>
            ))}
            <li className="flex flex-col rounded-xl border border-track bg-bg p-5">
              <p className="text-heading-md text-fg">{tx("Pilote GreenTechCycle Lab", "GreenTechCycle Lab pilot")}</p>
              <p className="mt-3 font-display text-display-sm tabular-nums text-emerald">
                {e(LAB_PILOT.amount!)}
                <span className="ml-1 font-sans text-caption text-fg-muted">{HT}</span>
              </p>
              <p className="text-caption text-fg-muted">{tx("forfait, 8 semaines", "fixed fee, 8 weeks")}</p>
              <p className="mt-3 text-body-sm text-fg-strong">
                {tx("Pilote encadré d'un programme de R&D GTC, sans déploiement automatique de code de recherche.", "Supervised pilot of a GTC R&D programme, with no automatic deployment of research code.")}
              </p>
            </li>
          </ul>

          {/* Pack Conformité + IA */}
          <div id="conformite" className="mt-14 scroll-mt-24">
            {subHead(
              tx("Pack Conformité et assistant IA", "Compliance pack and AI assistant"),
              tx("Vos preuves prêtes pour l'auditeur, crédits IA inclus.", "Your evidence auditor-ready, AI credits included."),
              tx(
                "L'IA a un coût réel : chaque édition inclut un volume de crédits, le dépassement est facturé au crédit. 1 crédit = 1 question d'audit traitée avec citation des preuves.",
                "AI has a real cost: each edition includes a volume of credits, and overage is billed per credit. 1 credit = 1 audit question handled with the evidence cited."
              )
            )}
            <div className="grid gap-6 lg:grid-cols-12 [&>*]:min-w-0">
              <div className="lg:col-span-4">
                <p className="text-eyebrow uppercase text-fg-muted">{tx("Dans chaque pack", "In every pack")}</p>
                <ul className="mt-3 space-y-2">
                  {COMPLIANCE_CONTENTS.map((c) => (
                    <Bullet key={c.fr}>{c[lang]}</Bullet>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 lg:col-span-8">
                <Table
                  caption={tx("Éditions du Pack Conformité", "Compliance pack editions")}
                  head={[tx("Édition", "Edition"), "Essentials", "Professional", "Enterprise"]}
                  emphasis={[2]}
                  rows={[
                    [
                      tx("Prix", "Price"),
                      ...COMPLIANCE_PACKS.map((p) =>
                        p.amount != null ? (
                          <span key={p.id} className="whitespace-nowrap font-semibold text-emerald">
                            {e(p.amount)} {HT}/{tx("an", "yr")}
                          </span>
                        ) : (
                          <a key={p.id} href="#contact-ventes" className="font-semibold text-emerald underline-offset-4 hover:underline">
                            {tx("Nous contacter", "Contact us")}
                          </a>
                        )
                      ),
                    ],
                    [tx("Crédits IA inclus / an", "AI credits included / yr"), ...COMPLIANCE_PACKS.map((p) => (p.aiCredits != null ? num(p.aiCredits, lang) : tx("Sur mesure", "Custom")))],
                    [tx("Entités", "Entities"), ...COMPLIANCE_PACKS.map((p) => p.entities[lang])],
                    [tx("Référentiels", "Frameworks"), ...COMPLIANCE_PACKS.map((p) => p.frameworks[lang])],
                    [tx("Sièges auditeur", "Auditor seats"), ...COMPLIANCE_PACKS.map((p) => p.auditorSeats[lang])],
                    [tx("Modèles de politiques", "Policy templates"), ...COMPLIANCE_PACKS.map((p) => p.templates[lang])],
                    [tx("Exports de preuves", "Evidence exports"), ...COMPLIANCE_PACKS.map((p) => p.exports[lang])],
                    [tx("Revue consultant", "Consultant review"), ...COMPLIANCE_PACKS.map((p) => <Mark key={p.id} value={p.review[lang]} lang={lang} />)],
                  ]}
                />
                <div className="mt-4 rounded-xl border border-track bg-bg p-4">
                  <p className="text-body-sm text-fg">
                    <strong className="font-semibold">{tx("Crédits IA supplémentaires", "Additional AI credits")}</strong> :{" "}
                    <span className="font-semibold tabular-nums text-emerald">
                      {e(AI_CREDITS.overagePer1000)} {HT}
                    </span>{" "}
                    {tx("par 1 000 crédits", "per 1,000 credits")} ·{" "}
                    {tx(
                      `packs prépayés −${AI_CREDITS.prepaidDiscounts[0] * 100} % / −${AI_CREDITS.prepaidDiscounts[1] * 100} %`,
                      `prepaid packs −${AI_CREDITS.prepaidDiscounts[0] * 100}% / −${AI_CREDITS.prepaidDiscounts[1] * 100}%`
                    )}
                  </p>
                  <p className="mt-1 text-caption text-fg-muted">
                    {tx("Crédits annuels non reportables ; alerte à 80 % de consommation ; chaque réponse est un brouillon à valider.", "Annual credits do not roll over; alert at 80% usage; every answer is a draft for you to approve.")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* ═══════════ ONGLET SERVICES ITAD ET COLLECTE ═══════════ */}
      <div id="panel-service-itad" role="tabpanel" aria-labelledby="tab-service-itad" hidden={activeTab !== "service-itad"}>
        <Section id="prix-itad" tone="paper" className="scroll-mt-24">
          <SectionHeader
            eyebrow={tx("Services ITAD", "ITAD services")}
            title={tx("Un prix par appareil, par niveau d'effacement, dégressif.", "A price per device, per erasure level, graduated.")}
            intro={tx(
              "Effacement en atelier, certificat par numéro de série et preuve numérique P1 inclus. La tranche se lit sur la quantité de la catégorie commandée, avec la même tarification progressive que la plateforme.",
              "Workshop erasure, certificate per serial number and P1 digital proof included. The band is read from the quantity ordered in the category, with the same graduated pricing as the platform."
            )}
          />

          <ul className="grid gap-4 md:grid-cols-3">
            {ERASURE_LEVELS.map((lv) => (
              <li key={lv.id} className="rounded-xl border border-track bg-bg-card p-5">
                <p className="font-mono text-caption uppercase tracking-[0.08em] text-emerald">{lv.id}</p>
                <p className="mt-1 text-heading-md text-fg">{lv.name[lang]}</p>
                <p className="mt-2 text-body-sm text-fg-strong">{lv.desc[lang]}</p>
                <p className="mt-3 border-t border-track pt-3 text-caption text-fg-muted">
                  {tx("Pour", "For")} : {lv.when[lang]}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-8">
            {ITAD_GROUPS.map((g) => (
              <div key={g.title.fr}>
                <h3 className="mb-3 text-heading-lg text-fg">{g.title[lang]}</h3>
                <BandTable
                  caption={`${g.title[lang]} — ${tx("prix par appareil et par tranche (€ HT)", "price per device by band (€ ex-VAT)")}`}
                  firstColLabel={tx("€ HT / unité", "€ ex-VAT / unit")}
                  lang={lang}
                  rows={g.lines.map((l) => ({ label: l.name[lang], bands: l.bands, note: `${tx("par", "per")} ${l.unit[lang]}` }))}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                t: tx("Frais d'ouverture de lot", "Lot opening fee"),
                p: e(ITAD_FEES.smallLot),
                d: tx(`Lot de moins de ${ITAD_FEES.smallLotThreshold} appareils ; offert au-delà`, `Lot under ${ITAD_FEES.smallLotThreshold} devices; waived above`),
              },
              {
                t: tx("Journée d'effacement sur site", "On-site erasure day"),
                p: e(ITAD_FEES.onsiteDay),
                d: tx("Par jour, 2 techniciens, en plus du prix par appareil ; aucun support ne quitte le site avant effacement", "Per day, 2 technicians, on top of the per-device price; no media leaves the site before erasure"),
              },
              {
                t: tx("Mobilisation destruction sur site", "On-site destruction mobilisation"),
                p: e(ITAD_FEES.e3Mobilisation),
                d: tx("Par intervention de broyage E3 chez vous", "Per E3 shredding intervention at your site"),
              },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-track bg-bg p-5">
                <p className="text-body-sm font-medium text-fg">{f.t}</p>
                <p className="mt-2 font-display text-display-sm tabular-nums text-emerald">
                  {f.p} <span className="font-sans text-caption text-fg-muted">{HT}</span>
                </p>
                <p className="mt-1 text-caption text-fg-muted">{f.d}</p>
              </div>
            ))}
          </div>

          {/* Configurateur */}
          <div id="configurateur" className="mt-14 scroll-mt-24 border-t border-track pt-10">
            {subHead(
              tx("Configurateur", "Configurator"),
              tx("Composez votre projet, voyez le prix ligne par ligne.", "Build your project, see the price line by line."),
              tx(
                "Prix liste HT, tarification progressive par catégorie. Téléchargez le récapitulatif ou envoyez-le pour recevoir le devis détaillé.",
                "Ex-VAT list prices, graduated per category. Download the summary or send it to get the detailed quote."
              )
            )}
            <ItadConfigurator idPrefix="tarifs-cfg" />
          </div>
        </Section>

        {/* Preuve P1–P4 + reporting */}
        <Section id="preuve" tone="cream" className="scroll-mt-24">
          <SectionHeader
            eyebrow={tx("Niveaux de preuve", "Proof levels")}
            title={tx("Du certificat numérique au constat d'un officier public.", "From a digital certificate to a public officer's statement.")}
            intro={tx(
              "P1 est inclus dans chaque prix ITAD. Montez d'un niveau quand votre auditeur, votre régulateur ou un litige potentiel l'exige.",
              "P1 is included in every ITAD price. Step up a level when your auditor, your regulator or a potential dispute requires it."
            )}
          />
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {PROOF_LEVELS.map((p) => (
              <li key={p.id} className={`flex flex-col rounded-xl border bg-bg p-5 ${p.id === "P3" ? "border-emerald-line" : "border-track"}`}>
                <p className="text-heading-md text-fg">{p.name[lang]}</p>
                <p className="mt-3 font-display text-display-sm tabular-nums text-emerald">
                  {p.amount != null ? (
                    <>
                      {e(p.amount)} <span className="font-sans text-caption text-fg-muted">{HT}</span>
                    </>
                  ) : p.id === "P4" ? (
                    <a href="#contact-ventes" className="underline-offset-4 hover:underline">
                      {p.priceText![lang]}
                    </a>
                  ) : (
                    p.priceText![lang]
                  )}
                </p>
                <p className="text-caption text-fg-muted">{p.unit[lang]}</p>
                {p.note && <p className="mt-1 text-caption text-fg-muted">{p.note[lang]}</p>}
                <p className="mt-3 flex-1 text-body-sm text-fg-strong">{p.includes[lang]}</p>
                <p className="mt-3 border-t border-track pt-3 text-caption text-fg-muted">
                  {tx("Pour", "For")} : {p.when[lang]}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Reporting", "Reporting")}</p>
              <PriceList items={REPORTING} lang={lang} />
            </div>
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Combinaisons recommandées", "Recommended combinations")}</p>
              <ul className="divide-y divide-track rounded-xl border border-track bg-bg text-body-sm">
                {[
                  [tx("ETI / PME standard", "Standard mid-market"), "E1 · P1 · N1 · R1"],
                  [tx("Données sensibles (RH, santé, juridique)", "Sensitive data (HR, health, legal)"), "E2 · P2 · N2 · R1 + R3"],
                  [tx("Banque, assurance, secteur régulé", "Banking, insurance, regulated"), "E2 (+ E3) · P3 · N2 · R3"],
                  [tx("Défense / OIV", "Defence / vital operators"), tx("E3 sur site · P4 · N3 · R3", "E3 on site · P4 · N3 · R3")],
                ].map(([who, combo]) => (
                  <li key={who} className="flex flex-wrap justify-between gap-x-4 gap-y-1 px-4 py-3">
                    <span className="text-fg-strong">{who}</span>
                    <span className="font-mono text-caption text-emerald">{combo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Collecte */}
        <Section id="collecte" tone="paper" className="scroll-mt-24">
          <SectionHeader
            eyebrow={tx("Collecte", "Pick-up")}
            title={tx("Collecte offerte quand la valeur de vos équipements la finance.", "Free pick-up when your equipment's value covers it.")}
            intro={tx(
              "Le prix d'une collecte dépend de trois choses : la valeur du matériel repris, la taille du lot (le véhicule et l'équipe) et le niveau de service (sécurité, distance, délai). D'où des prix « à partir de », détaillés ci-dessous.",
              "A pick-up price depends on three things: the value of the equipment taken back, the lot size (vehicle and crew) and the service level (security, distance, lead time). Hence \"from\" prices, detailed below."
            )}
          />
          <ol className="grid gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: tx("Nous estimons valeur et frais", "We estimate value and fees"),
                d: tx("Au devis : valeur de rachat selon catégorie et état, frais de collecte selon lot, niveau, zone et délai.", "In the quote: buyback value by category and condition, pick-up fees by lot, level, zone and lead time."),
              },
              {
                n: "02",
                t: tx(`Valeur ≥ ${num(COLLECTION_VALUE_RULE.ratio, lang)} × frais : offerte`, `Value ≥ ${num(COLLECTION_VALUE_RULE.ratio, lang)} × fees: free`),
                d: tx("Les frais sont déduits du rachat (rachat net de frais) ; vous recevez le solde. Jamais refacturée après audit.", "Fees are deducted from the buyback (buyback net of fees); you receive the balance. Never re-billed after audit."),
              },
              {
                n: "03",
                t: tx("Sinon : prix liste", "Otherwise: list price"),
                d: tx("La collecte est facturée selon la grille ci-dessous et le rachat vous est payé après audit.", "The pick-up is billed per the grid below and the buyback is paid to you after audit."),
              },
            ].map((s) => (
              <li key={s.n} className="rounded-xl border border-track bg-bg-card p-5">
                <p className="font-mono text-caption text-emerald">{s.n}</p>
                <p className="mt-1 text-heading-md text-fg">{s.t}</p>
                <p className="mt-2 text-body-sm text-fg-strong">{s.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl border border-emerald-line bg-emerald-dim px-4 py-3 text-body-sm text-fg">
            {tx(
              `Règle simple : en Île-de-France, collecte standard offerte sans calcul dès ${COLLECTION_VALUE_RULE.simpleRuleDevices} appareils en bon état (grade A/B) par enlèvement. Appareils de moins de ${COLLECTION_VALUE_RULE.minDeviceValue} € : pas de crédit (recyclage).`,
              `Simple rule: in Île-de-France, standard pick-up is free with no calculation from ${COLLECTION_VALUE_RULE.simpleRuleDevices} devices in good condition (grade A/B) per collection. Devices worth under €${COLLECTION_VALUE_RULE.minDeviceValue}: no credit (recycling).`
            )}
          </p>

          <h3 className="mt-10 text-heading-lg text-fg">
            {tx("Sinon, à partir de", "Otherwise, from")} {e(COLLECTION_CLASSES[0].z1Planned)} {HT} {tx("par intervention", "per intervention")}
          </h3>
          <p className="mt-2 max-w-[70ch] text-body-sm text-fg-muted">
            {tx(
              "Niveau N1 Standard : véhicule et équipe GTC dimensionnés sur le lot, audit et inventaire sur place, conditionnement, chargement. Planifiée = J+10, prioritaire = J+3, urgente = J+1.",
              "N1 Standard level: GTC vehicle and crew sized to the lot, on-site audit and inventory, packing, loading. Planned = D+10, priority = D+3, urgent = D+1."
            )}
          </p>
          <Table
            className="mt-4"
            caption={tx("Intervention de collecte par classe de lot (€ HT)", "Pick-up intervention by lot class (€ ex-VAT)")}
            head={[
              tx("Classe de lot", "Lot class"),
              tx("Véhicule et équipe", "Vehicle and crew"),
              tx("IDF planifiée", "Île-de-France planned"),
              tx("IDF prioritaire", "Île-de-France priority"),
              tx("IDF urgente", "Île-de-France urgent"),
              "200–500 km",
              tx("500–1 000 km", "500–1,000 km"),
            ]}
            numeric={[2, 3, 4, 5, 6]}
            emphasis={[2]}
            rows={COLLECTION_CLASSES.map((c) => [
              <span key="c" className="block min-w-[150px]">
                {c.id} · {c.name[lang]}
                <span className="block text-caption font-normal text-fg-muted">
                  ≤ {c.pallets} {tx("palettes", "pallets")}
                </span>
              </span>,
              <span key="v" className="block min-w-[170px]">
                {c.crew[lang]}
              </span>,
              e(c.z1Planned),
              e(c.z1Priority),
              e(c.z1Urgent),
              e(c.z2a),
              e(c.z2b),
            ])}
          />
          <p className="mt-3 text-caption text-fg-muted">
            {tx("Au-delà de 36 palettes : une journée C4 de plus par tranche de 36 palettes. Distances depuis l'Île-de-France, collecte planifiée.", "Beyond 36 pallets: one more C4 day per 36 pallets. Distances from Île-de-France, planned pick-up.")}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Niveau de service et éléments par palette", "Service level and per-pallet items")}</p>
              <PriceList items={COLLECTION_EXTRAS} lang={lang} />
            </div>
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Option messagerie — palettes préparées par vous", "Carrier option — pallets prepared by you")}</p>
              <Table
                caption={tx("Option messagerie, prix par palette (€ HT)", "Carrier option, price per pallet (€ ex-VAT)")}
                head={[tx("Zone", "Zone"), tx("1re palette", "1st pallet"), tx("Dès la 11e", "From the 11th"), tx("Prioritaire", "Priority"), tx("Urgente", "Urgent")]}
                numeric={[1, 2, 3, 4]}
                emphasis={[1]}
                rows={PARCEL_OPTION.zones.map((z) => [z.name[lang], e(z.first), e(z.floor), e(z.priority), e(z.urgent)])}
              />
              <p className="mt-3 text-caption text-fg-muted">
                {tx(
                  `+ forfait d'expédition ${e(PARCEL_OPTION.shipmentFee)} HT par envoi. ≤ 200 km : ${PARCEL_OPTION.zones[0].steps!.fr}. Prioritaire et urgente : prix de la 1re palette. Pour les petits lots éloignés, quand c'est moins cher qu'une intervention.`,
                  `+ shipping fee ${e(PARCEL_OPTION.shipmentFee)} ex-VAT per shipment. ≤ 200 km: ${PARCEL_OPTION.zones[0].steps!.en}. Priority and urgent: 1st-pallet price. For small, distant lots, when cheaper than an intervention.`
                )}
              </p>
            </div>
          </div>
          <p className="mt-6 text-body-sm text-fg-strong">
            {tx("Intervention dédiée en Europe, Afrique du Sud ou pays du Golfe :", "Dedicated intervention in Europe, South Africa or the Gulf:")}{" "}
            <a href="#contact-ventes" className="font-medium text-emerald underline-offset-4 hover:underline">
              {tx("nous contacter", "contact us")}
            </a>
            .
          </p>
        </Section>
      </div>

      {/* ═══════════ ONGLET WAKI BOX ═══════════ */}
      <div id="panel-waki-box" role="tabpanel" aria-labelledby="tab-waki-box" hidden={activeTab !== "waki-box"}>
        <Section id="plans" tone="paper" className="scroll-mt-24">
          <SectionHeader
            eyebrow="Waki Box"
            title={tx("Suivi DEEE connecté, au prix par borne.", "Connected WEEE tracking, priced per kiosk.")}
            intro={tx(
              "Bornes connectées, pesée, alertes et reporting prêt pour la CSRD. Prix final, sans « à partir de ».",
              "Connected kiosks, weighing, alerts and CSRD-ready reporting. Final prices, no \"from\"."
            )}
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {WAKI_PLANS.map((p) => {
              const popular = p.id === "confort";
              return (
                <article key={p.id} aria-labelledby={`waki-${p.id}`} className={`flex h-full flex-col rounded-xl border bg-bg p-6 lg:p-8 ${popular ? "border-emerald" : "border-track"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-eyebrow uppercase text-fg-muted">{wakiAudience[p.id]}</p>
                    {popular && <Tag variant="brand">{tx("Le plus choisi", "Most chosen")}</Tag>}
                  </div>
                  <h3 id={`waki-${p.id}`} className="mt-2 font-display text-display-sm text-fg">
                    Waki Box {p.name}
                  </h3>
                  <p className="mt-4 font-display text-display-md tabular-nums text-emerald">
                    {e(p.monthly)}
                    <span className="ml-1 font-sans text-body-sm text-fg-muted">
                      {HT}
                      {perMonth}
                    </span>
                  </p>
                  <dl className="mt-4 grid grid-cols-3 gap-3 border-y border-track py-4 text-body-sm">
                    <div>
                      <dt className="text-caption text-fg-muted">{tx("Bornes", "Kiosks")}</dt>
                      <dd className="font-semibold text-fg">{p.kiosks}</dd>
                    </div>
                    <div>
                      <dt className="text-caption text-fg-muted">{tx("Mise en service", "Setup")}</dt>
                      <dd className="font-semibold tabular-nums text-fg">
                        {p.setup != null ? e(p.setup) : `${e(WAKI_SETUP_BANDS[0].price)}/${tx("borne", "kiosk")}`}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-caption text-fg-muted">{tx("Engagement", "Commitment")}</dt>
                      <dd className="font-semibold text-fg">
                        {p.commitmentMonths} {tx("mois", "months")}
                      </dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex-1 space-y-2">
                    {wakiFeatures[p.id].map((f) => (
                      <Bullet key={f}>{f}</Bullet>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <ButtonLink href={`/reserver?offre=waki-box-${p.id}`} variant={popular ? "primary" : "secondary"} fullWidth>
                      {tx("Réserver Waki Box", "Book Waki Box")} {p.name}
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Bornes additionnelles et mise en service", "Additional kiosks and setup")}</p>
              <Table
                caption={tx("Mise en service par borne selon le nombre de bornes posées en une intervention", "Setup per kiosk by number of kiosks installed in one visit")}
                head={[tx("Bornes posées en une intervention", "Kiosks installed in one visit"), tx("Mise en service / borne", "Setup / kiosk")]}
                numeric={[1]}
                emphasis={[1]}
                rows={WAKI_SETUP_BANDS.map((b) => [b.max == null ? `${b.min}+` : `${b.min}–${b.max}`, e(b.price)])}
              />
              <p className="mt-3 text-caption text-fg-muted">
                {tx(
                  `Borne additionnelle : ${e(WAKI_EXTRA_KIOSK.monthly)} HT/mois, mise en service ${e(WAKI_EXTRA_KIOSK.setup)} HT. Grille de mise en service : Premium et bornes additionnelles. L'abonnement par borne n'est pas dégressif.`,
                  `Additional kiosk: ${e(WAKI_EXTRA_KIOSK.monthly)} ex-VAT/month, setup ${e(WAKI_EXTRA_KIOSK.setup)} ex-VAT. Setup grid: Premium and additional kiosks. The per-kiosk subscription is not tiered.`
                )}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-line bg-emerald-dim p-6">
              <p className="text-eyebrow uppercase text-emerald">{tx("Offre pilote", "Pilot offer")}</p>
              <p className="mt-2 font-display text-display-sm text-fg">
                {tx(`1er mois offert sur Essentiel, puis ${e(WAKI_PLANS[0].monthly)} HT/mois.`, `1st month free on Essentiel, then ${e(WAKI_PLANS[0].monthly)} ex-VAT/month.`)}
              </p>
              <p className="mt-3 text-body-sm text-fg-strong">
                {tx(
                  "Installez une première borne dans un site pilote, mesurez vos flux DEEE, puis choisissez le plan qui vous convient.",
                  "Install a first kiosk at a pilot site, measure your WEEE flows, then choose the plan that suits you."
                )}
              </p>
              <div className="mt-5">
                <ButtonLink href="/reserver?offre=pilote-waki-box">{tx("Démarrer le pilote", "Start the pilot")}</ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Options", "Options")}</p>
              <PriceList items={WAKI_ADDONS} lang={lang} />
            </div>
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Bundles", "Bundles")}</p>
              <ul className="space-y-4">
                {WAKI_BUNDLES.map((b) => (
                  <li key={b.id} className="rounded-xl border border-track bg-bg p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-heading-md text-fg">{b.name[lang]}</p>
                      <p className="font-display text-display-sm tabular-nums text-emerald">
                        {e(b.amount)} <span className="font-sans text-caption text-fg-muted">{HT}</span>
                      </p>
                    </div>
                    <p className="mt-1 text-body-sm text-fg-strong">{b.contents[lang]}</p>
                    <p className="mt-2 text-caption text-fg-muted">
                      {tx(`Au lieu de ${e(b.components)} HT séparément`, `Instead of ${e(b.components)} ex-VAT separately`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      {/* ═══════════ SUPPORT & SLA ═══════════ */}
      <Section id="support" tone="cream" className="scroll-mt-24">
        <SectionHeader
          eyebrow={tx("Support et SLA", "Support & SLA")}
          title={tx("Trois niveaux de support, des engagements écrits.", "Three support levels, written commitments.")}
          intro={tx(
            "Standard est inclus dans chaque édition. Premium et Enterprise sont facturés en pourcentage de l'abonnement logiciel annuel, avec disponibilité garantie et crédits de service.",
            "Standard is included in every edition. Premium and Enterprise are billed as a percentage of the annual software subscription, with guaranteed availability and service credits."
          )}
        />
        <Table
          caption={tx("Niveaux de support", "Support levels")}
          head={["", ...SUPPORT_TIERS.map((s) => s.name)]}
          emphasis={[2]}
          rows={[
            [tx("Prix", "Price"), ...SUPPORT_TIERS.map((s) => <span key={s.id} className="font-semibold text-emerald">{s.price[lang]}</span>)],
            [tx("Canaux", "Channels"), ...SUPPORT_TIERS.map((s) => s.channels[lang])],
            [tx("Horaires (heure de Paris)", "Hours (Paris time)"), ...SUPPORT_TIERS.map((s) => s.hours[lang])],
            [tx("Disponibilité mensuelle", "Monthly availability"), ...SUPPORT_TIERS.map((s) => s.availability[lang])],
            [tx("Contact nommé", "Named contact"), ...SUPPORT_TIERS.map((s) => <Mark key={s.id} value={s.contact[lang]} lang={lang} />)],
            [tx("Revue de service", "Service review"), ...SUPPORT_TIERS.map((s) => <Mark key={s.id} value={s.review[lang]} lang={lang} />)],
          ]}
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Matrice de sévérité : première réponse · contournement", "Severity matrix: first response · workaround")}</p>
            <Table
              caption={tx("Délais par sévérité et niveau de support", "Response times by severity and support level")}
              head={[tx("Sévérité", "Severity"), ...SUPPORT_TIERS.map((s) => s.name.split(" /")[0])]}
              rows={SEVERITY_MATRIX.map((r) => [<span key="l" className="block min-w-[160px]">{r.label[lang]}</span>, ...r.values.map((v) => v[lang])])}
            />
          </div>
          <div className="min-w-0 lg:col-span-4">
            <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Crédits de service", "Service credits")}</p>
            <Table
              caption={tx("Crédits de service selon la disponibilité mensuelle", "Service credits by monthly availability")}
              head={[tx("Disponibilité", "Availability"), "Premium", "Enterprise"]}
              numeric={[1, 2]}
              rows={SERVICE_CREDITS.map((r) => [r.label[lang], ...r.values.map((v, i) => <Mark key={i} value={v[lang]} lang={lang} />)])}
            />
            <p className="mt-3 text-caption text-fg-muted">
              {tx("En % de la redevance mensuelle, plafonnés à 50 %, imputés sur la facture suivante.", "As % of the monthly fee, capped at 50%, credited on the next invoice.")}
            </p>
          </div>
        </div>
      </Section>

      {/* ═══════════ CUSTOMER SUCCESS ═══════════ */}
      <Section tone="paper" aria-labelledby="csm-title">
        <SectionHeader
          id="csm-title"
          eyebrow="Customer Success"
          title={tx("Un accompagnement qui grandit avec votre contrat.", "Success support that grows with your contract.")}
        />
        <ul className="grid gap-4 md:grid-cols-3">
          {CSM_TIERS.map((c) => (
            <li key={c.id} className="flex flex-col rounded-xl border border-track bg-bg-card p-5">
              <p className="text-heading-md text-fg">{c.name[lang]}</p>
              <p className="mt-2 text-body-sm font-semibold text-emerald">{c.price[lang]}</p>
              <p className="text-caption text-fg-muted">{c.threshold[lang]}</p>
              <p className="mt-3 text-body-sm text-fg-strong">{c.contents[lang]}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ═══════════ SERVICES PROFESSIONNELS ═══════════ */}
      <Section id="services-pro" tone="cream" className="scroll-mt-24">
        <SectionHeader
          eyebrow={tx("Services professionnels", "Professional services")}
          title={tx("Onboarding inclus, avec des garde-fous écrits.", "Onboarding included, with written guardrails.")}
          intro={tx(
            "Chaque édition inclut un onboarding guidé. Au-delà, des forfaits au prix fixe et des tarifs journaliers publics.",
            "Every edition includes guided onboarding. Beyond that, fixed-price packages and public day rates."
          )}
        />
        <div className="grid gap-8 lg:grid-cols-12 [&>*]:min-w-0">
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-emerald-line bg-bg p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-heading-md text-fg">{tx("Onboarding inclus", "Included onboarding")}</p>
                <Tag variant="brand">{tx("0 €", "€0")}</Tag>
              </div>
              <dl className="mt-4 divide-y divide-track text-body-sm">
                {ONBOARDING_GUARDRAILS.map((g) => (
                  <div key={g.label.fr} className="grid gap-1 py-2.5 sm:grid-cols-[110px_1fr] sm:gap-3">
                    <dt className="text-fg-muted">{g.label[lang]}</dt>
                    <dd className="text-fg-strong">{g.value[lang]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="min-w-0 space-y-6 lg:col-span-7">
            <div id="pilote" className="scroll-mt-24">
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Forfaits", "Packages")}</p>
              <PriceList items={PS_PACKAGES} lang={lang} />
            </div>
            <div>
              <p className="mb-3 text-eyebrow uppercase text-fg-muted">{tx("Tarifs journaliers", "Day rates")}</p>
              <PriceList items={DAY_RATES} lang={lang} />
              <p className="mt-3 text-caption text-fg-muted">
                {tx("Déplacements inclus en Île-de-France ; ailleurs au réel + 10 %.", "Travel included in Île-de-France; elsewhere at cost + 10%.")}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ CONDITIONS + CONTACTER LES VENTES ═══════════ */}
      <Section tone="paper" aria-labelledby="conditions-title">
        <div className="grid gap-8 lg:grid-cols-2 [&>*]:min-w-0">
          <div>
            <p className="text-eyebrow uppercase text-fg-muted">{tx("Conditions", "Terms")}</p>
            <h2 id="conditions-title" className="mt-2 font-display text-display-sm text-fg">
              {tx("Remises et conditions, sans astérisque.", "Discounts and terms, no asterisks.")}
            </h2>
            <ul className="mt-5 space-y-2">
              <Bullet>{tx("Engagement annuel par défaut ; mensuel sans engagement : +20 %", "Annual commitment by default; monthly with no commitment: +20%")}</Bullet>
              <Bullet>
                {tx(
                  `Engagement 2 ans : −${MULTI_YEAR_DISCOUNT.twoYears * 100} % · 3 ans : −${MULTI_YEAR_DISCOUNT.threeYears * 100} % sur les abonnements`,
                  `2-year commitment: −${MULTI_YEAR_DISCOUNT.twoYears * 100}% · 3 years: −${MULTI_YEAR_DISCOUNT.threeYears * 100}% on subscriptions`
                )}
              </Bullet>
              <Bullet>{tx("Indexation annuelle plafonnée à 3 %", "Annual indexation capped at 3%")}</Bullet>
              <Bullet>{tx("Prix HT ; TVA 20 % en France métropolitaine", "Prices ex-VAT; 20% VAT in mainland France")}</Bullet>
              <Bullet>{tx("Déplacements hors Île-de-France au réel + 10 %", "Travel outside Île-de-France at cost + 10%")}</Bullet>
            </ul>
          </div>
          <div id="contact-ventes" className="scroll-mt-24 rounded-2xl border border-track bg-bg-card p-6 lg:p-8">
            <p className="text-eyebrow uppercase text-emerald">{tx("Contacter les ventes", "Contact sales")}</p>
            <h2 className="mt-2 font-display text-display-sm text-fg">{tx("Les cas qui méritent un échange.", "Cases that deserve a conversation.")}</h2>
            <ul className="mt-5 space-y-2">
              <Bullet>{tx("Plus de 50 000 actifs", "More than 50,000 assets")}</Bullet>
              <Bullet>{tx("Secteur public et appels d'offres", "Public sector and tenders")}</Bullet>
              <Bullet>{tx("International : Europe, Afrique du Sud, pays du Golfe", "International: Europe, South Africa, the Gulf")}</Bullet>
              <Bullet>{tx("Partenaires et revendeurs", "Partners and resellers")}</Bullet>
              <Bullet>{tx("Preuve P4 défense / classifié (via partenaire habilité)", "P4 defence / classified proof (via a cleared partner)")}</Bullet>
              <Bullet>{tx("Transport dédié en Europe ; Pack Conformité Enterprise", "Dedicated transport in Europe; Compliance pack Enterprise")}</Bullet>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/reserver?offre=demo-conseil">{tx("Parler à un commercial", "Talk to sales")}</ButtonLink>
              <ButtonLink href="/contact?sujet=commercial" variant="secondary" arrow={false}>
                <Mail className="h-4 w-4" aria-hidden="true" />
                {tx("Écrire à l'équipe", "Email the team")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════ FAQ ═══════════ */}
      <Section id="faq" tone="cream" className="scroll-mt-24">
        <div className="mx-auto max-w-[760px]">
          <SectionHeader eyebrow={tx("Questions fréquentes", "Frequently asked questions")} title={tx("Comprendre nos tarifs.", "Understanding our pricing.")} />
          <Accordion defaultOpen={null} items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
          <div className="mt-6">
            <TextLink href="/plateforme">{tx("Découvrir la plateforme", "Discover the platform")}</TextLink>
          </div>
        </div>
      </Section>

      <CtaSection
        title={tx("Commencez gratuitement, sur votre propre parc.", "Start free, on your own fleet.")}
        subtitle={tx(
          `Essai de ${TRIAL.days} jours sans carte bancaire, ou un devis détaillé ligne par ligne sous 48 heures ouvrées.`,
          `${TRIAL.days}-day trial with no credit card, or a detailed line-by-line quote within 48 business hours.`
        )}
        primaryLabel={tx("Démarrer l'essai gratuit", "Start the free trial")}
        primaryHref="/reserver?offre=essai-asset-management"
        secondaryLabel={tx("Demander un devis", "Request a quote")}
        secondaryHref="/reserver?offre=demo-conseil"
        reassurance={[tx("Prix HT publics", "Public ex-VAT prices"), tx("NDA signé sur demande", "NDA signed on request"), tx("Aucun engagement avant signature", "No commitment before signing")].join(" · ")}
      />
    </div>
  );
}
