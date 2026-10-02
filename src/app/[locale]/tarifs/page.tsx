"use client";

/**
 * /tarifs — architecture « Épuré » (DESIGN.md §10.5).
 *
 *   1  Hero cream : « Tarifs Waki Box, la seule brique GTC à prix public. »
 *   2  3 briques GTC + « trois portes d'entrée » (fusion du doublon S6d)
 *   3  3 plans Waki Box #plans — grille régulière, comparatif intégré aux cartes
 *   4  Programme pilote Waki Box — section leaf-100
 *   6  Modules complémentaires — tableau
 *   7  Comparateur interactif — carte unique
 *   8  Bundles RSE — 2 cartes
 *   9  Pilote GTC 3 jours #pilote — carte unique (ancre conservée : liée depuis /plateforme)
 *  11  Sur devis #sur-devis — night, 2 cartes éditoriales
 *  12  FAQ — accordéon
 *  13  CTA unique
 */

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  Check,
  Minus,
  Rocket,
  Users,
  Building2,
  ShieldCheck,
  FileCheck,
  Search,
  RefreshCcw,
  Recycle,
  Lock,
  Box,
  Monitor,
  Wrench,
  Star,
  Zap,
  Megaphone,
  GraduationCap,
  Microscope,
  Clock,
} from "lucide-react";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Accordion from "@/components/ui/Accordion";

/* ── Comparateur interactif (carte unique, §10.5-7) ─────────────────────── */
function PlanComparator({ isEn }: { isEn: boolean }) {
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }
  const numberLocale = isEn ? "en-GB" : "fr-FR";

  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"essentiel" | "confort" | "premium">("confort");
  const [checkedAddons, setCheckedAddons] = useState<Set<string>>(new Set());

  const plans = {
    essentiel: { price: 39, setup: 150, name: "Essentiel" },
    confort: { price: 79, setup: 290, name: "Confort" },
    premium: { price: 149, setup: 490, name: "Premium" },
  };

  const addonList = [
    { slug: "box-supplementaire", name: tx("Borne supplémentaire", "Additional kiosk"), price: 32, recurrence: tx("/mois", "/month"), monthlyContrib: 32 },
    { slug: "intervention-urgence", name: tx("Intervention urgence", "Emergency intervention"), price: 120, recurrence: tx("one-shot", "one-shot"), monthlyContrib: 0 },
    { slug: "animation-rse", name: tx("Animation événement RSE", "RSE event facilitation"), price: 750, recurrence: tx("/jour", "/day"), monthlyContrib: 0 },
    { slug: "rapport-csrd", name: tx("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"), price: 990, recurrence: tx("/an", "/year"), monthlyContrib: Math.round(990 / 12) },
    { slug: "kit-signaletique", name: tx("Kit signalétique RSE", "RSE signage kit"), price: 350, recurrence: tx("one-shot", "one-shot"), monthlyContrib: 0 },
    { slug: "audit-terrain", name: tx("Audit terrain DEEE", "WEEE field audit"), price: 1800, recurrence: tx("/jour", "/day"), monthlyContrib: 0 },
    { slug: "formation", name: tx("Formation collaborateurs 2 h", "Employees training 2h"), price: 590, recurrence: tx("one-shot", "one-shot"), monthlyContrib: 0 },
  ];

  const plan = plans[selectedPlan];
  const annualFactor = billing === "annual" ? 0.85 : 1;
  const baseMonthly = Math.round(plan.price * annualFactor);
  const addonMonthlyContrib = Array.from(checkedAddons).reduce((sum, slug) => {
    const a = addonList.find((x) => x.slug === slug);
    return sum + (a ? a.monthlyContrib : 0);
  }, 0);
  const totalMonthly = baseMonthly + addonMonthlyContrib;
  const totalAnnual = totalMonthly * 12;

  const bundle =
    selectedPlan === "premium"
      ? { name: tx("Bundle Premium Conformité", "Premium Compliance Bundle"), price: 2990, saving: 740 }
      : selectedPlan === "confort"
      ? { name: tx("Bundle Confort RSE Essentiel", "Essential RSE Comfort Bundle"), price: 990, saving: 150 }
      : null;

  const toggleAddon = (slug: string) => {
    setCheckedAddons((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const perMonth = tx("/mois", "/mo");

  return (
    <div className="rounded-xl border border-line bg-paper p-6 lg:p-8">
      {/* Facturation : contrôle segmenté */}
      <div role="radiogroup" aria-label={tx("Facturation", "Billing")} className="inline-flex rounded-lg border border-line bg-cream p-1">
        {(["monthly", "annual"] as const).map((b) => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={billing === b}
            onClick={() => setBilling(b)}
            className={`inline-flex h-10 items-center gap-2 rounded-md px-4 text-body-sm font-semibold transition-colors ${
              billing === b ? "bg-paper text-ink shadow-card" : "text-ink-700 hover:text-ink"
            }`}
          >
            {b === "monthly" ? tx("Mensuel", "Monthly") : tx("Annuel", "Annual")}
            {b === "annual" && <span className="rounded bg-ochre-100 px-2 text-caption font-semibold text-ochre-800">-15%</span>}
          </button>
        ))}
      </div>

      {/* Choix du plan */}
      <div role="radiogroup" aria-label={tx("Plan Waki Box", "Waki Box plan")} className="mt-6 grid gap-3 sm:grid-cols-3">
        {(Object.entries(plans) as [keyof typeof plans, (typeof plans)[keyof typeof plans]][]).map(([key, p]) => {
          const isSelected = selectedPlan === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelectedPlan(key)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                isSelected ? "border-leaf bg-leaf-50" : "border-line bg-paper hover:border-ink/20"
              }`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-eyebrow uppercase text-muted">Plan {p.name}</span>
                {key === "confort" && <Tag variant="brand">{tx("Le plus choisi", "Most chosen")}</Tag>}
              </span>
              <span className="mt-2 block font-display text-display-sm tabular-nums text-forest">
                {billing === "annual" ? Math.round(p.price * 0.85) : p.price}
                <span className="ml-1 font-sans text-body-sm text-muted">€ HT{perMonth}</span>
              </span>
              {billing === "annual" && (
                <span className="mt-1 block text-caption text-muted">
                  {tx(
                    `soit ${Math.round(p.price * 0.85 * 12).toLocaleString(numberLocale)} € HT/an`,
                    `i.e. €${Math.round(p.price * 0.85 * 12).toLocaleString(numberLocale)} ex-VAT/year`
                  )}
                </span>
              )}
              <span className="mt-1 block text-caption text-muted">
                {tx("Mise en service", "Setup")} : {p.setup} € HT
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Modules à cocher */}
        <fieldset>
          <legend className="text-eyebrow uppercase text-muted">{tx("Modules à ajouter (optionnel)", "Add-on modules (optional)")}</legend>
          <div className="mt-3 divide-y divide-line rounded-xl border border-line">
            {addonList.map((addon) => {
              const checked = checkedAddons.has(addon.slug);
              return (
                <label key={addon.slug} className={`flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors ${checked ? "bg-leaf-50" : "hover:bg-cream"}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddon(addon.slug)}
                    className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-leaf"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-body-sm font-medium text-ink">{addon.name}</span>
                    <span className="block text-caption text-muted">
                      <span className="font-semibold tabular-nums text-ink-700">{addon.price.toLocaleString(numberLocale)} € HT</span>{" "}
                      {addon.recurrence === "one-shot" ? <span className="italic">{tx("one-shot", "one-time")}</span> : addon.recurrence}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Total dynamique */}
        <div className="space-y-4">
          <div className="rounded-xl bg-forest-900 p-6 text-ondark" aria-live="polite">
            <p className="text-eyebrow uppercase text-ondark-muted">{tx("Estimation mensuelle", "Monthly estimate")}</p>
            <dl className="mt-4 space-y-2 border-b border-ondark-line pb-4 text-body-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-ondark-muted">Waki Box {plan.name}</dt>
                <dd className="tabular-nums">{baseMonthly} € HT{perMonth}</dd>
              </div>
              {addonMonthlyContrib > 0 && (
                <div className="flex justify-between gap-4">
                  <dt className="text-ondark-muted">{tx("Modules récurrents", "Recurring modules")}</dt>
                  <dd className="tabular-nums">+{addonMonthlyContrib} € HT{perMonth}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 flex items-end justify-between gap-4">
              <p className="text-caption text-ondark-muted">{tx("Total récurrent", "Recurring total")}</p>
              <p className="font-display text-display-sm tabular-nums text-leaf-300">
                {totalMonthly}
                <span className="ml-1 font-sans text-body-sm text-ondark-muted">€ HT{perMonth}</span>
              </p>
            </div>
            {billing === "annual" && (
              <p className="mt-1 text-right text-caption text-ondark-muted">
                {tx("soit", "i.e.")} {totalAnnual.toLocaleString(numberLocale)} € HT{tx("/an", "/year")}
              </p>
            )}
            <div className="mt-4 flex justify-between gap-4 border-t border-ondark-line pt-4 text-body-sm">
              <span className="text-ondark-muted">{tx("Mise en service (one-shot)", "Setup (one-time)")}</span>
              <span className="tabular-nums">{plan.setup} € HT</span>
            </div>
          </div>

          {bundle && (
            <div className="rounded-xl border border-line bg-leaf-50 p-4">
              <p className="text-eyebrow uppercase text-muted">{tx("Bundle suggéré", "Suggested bundle")}</p>
              <p className="mt-1 text-body-sm font-semibold text-ink">{bundle.name}</p>
              <p className="mt-2 text-heading-md tabular-nums text-forest">
                {bundle.price.toLocaleString(numberLocale)} € HT <span className="text-caption font-normal text-muted">one-shot</span>
              </p>
              <p className="mt-1 text-caption font-semibold text-leaf">
                {tx(`Économie : ${bundle.saving} €`, `Saving: €${bundle.saving}`)} (-{Math.round((bundle.saving / (bundle.price + bundle.saving)) * 100)}%)
              </p>
            </div>
          )}

          <ButtonLink href={`/reserver?offre=waki-box-${selectedPlan}`} size="lg" fullWidth>
            {tx("Réserver Waki Box", "Book Waki Box")} {plan.name}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export default function TarifsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }

  /* ── 3 briques GTC ─────────────────────────────────────────────────────── */
  const briques = [
    {
      icon: Monitor,
      tag: tx("Brique 1", "Brick 1"),
      name: tx("Plateforme GTC SaaS", "GTC SaaS Platform"),
      pitch: tx(
        "Console unifiée d'inventaire, audit, effacement et reporting CSRD. Tarification adaptée au volume d'actifs et au niveau d'intégration.",
        "Unified console for inventory, audit, erasure and CSRD reporting. Pricing scales with asset volume and integration depth."
      ),
      price: tx("À partir de 2 500 € HT/mois", "Starting at €2,500 HT/month"),
      subline: tx(
        "Base 500 postes, étude personnalisée selon votre parc, vos modules et vos volumes.",
        "Base 500 devices, bespoke study based on your fleet, modules and volumes."
      ),
      ctaLabel: tx("Voir la plateforme", "Explore the platform"),
      ctaHref: "/plateforme",
      accent: "#0B3B2E",
      photo: "/photos/hp-datacenter-green.jpg",
      photoAlt: tx(
        "Salle serveurs sécurisée : Plateforme GTC SaaS",
        "Secure server room : GTC SaaS platform"
      ),
    },
    {
      icon: Box,
      tag: tx("Brique 2 (tarif complet)", "Brick 2 (full pricing)"),
      name: "Waki Box",
      pitch: tx(
        "Bornes connectées de collecte DEEE en entreprise, plateforme de suivi, alertes temps réel. Trois plans publics, un programme pilote.",
        "Connected WEEE collection kiosks for the workplace, monitoring platform, real-time alerts. Three public plans, one pilot programme."
      ),
      price: tx("Dès 39 € HT/mois", "From €39 ex-VAT/month"),
      ctaLabel: tx("Voir les plans Waki Box", "See Waki Box plans"),
      ctaHref: "#plans",
      accent: "#047857",
      featured: true,
      photo: "/photos/ewaste-recycling.jpg",
      photoAlt: tx(
        "Collecte DEEE connectée en entreprise avec Waki Box",
        "Connected WEEE collection at a workplace with Waki Box"
      ),
    },
    {
      icon: Wrench,
      tag: tx("Brique 3", "Brick 3"),
      name: tx("Service ITAD", "ITAD Service"),
      pitch: tx(
        "Audit de parc, effacement certifié NIST 800-88, reconditionnement, recyclage DEEE réglementaire. Mission cadrée selon volume, sécurité et conformité.",
        "Fleet audit, NIST 800-88 certified erasure, refurbishment, regulatory WEEE recycling. Engagement scoped by volume, security and compliance."
      ),
      price: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
      subline: tx(
        "Effacement certifié NIST 800-88, prix dégressif selon volume et logistique.",
        "NIST 800-88 certified erasure, tiered pricing based on volume and logistics."
      ),
      ctaLabel: tx("Voir le service ITAD", "Explore the ITAD service"),
      ctaHref: "/services/recyclage-deee",
      accent: "#B45309",
      photo: "/photos/hp-atelier-itad.jpg",
      photoAlt: tx(
        "Atelier de reconditionnement et effacement certifié",
        "Refurbishment and certified erasure workshop"
      ),
    },
  ];

  /* ── Plans data ────────────────────────────────────────────────────────── */
  const plans = [
    {
      slug: "waki-box-essentiel",
      num: "01",
      name: "Essentiel",
      icon: Rocket,
      audience: tx(
        "TPE / PME, 10 à 50 collaborateurs",
        "SMB, 10 to 50 employees"
      ),
      price: "39",
      setup: "150",
      engagement: tx("12 mois", "12 months"),
      tagline: tx(
        "Une seule borne, une seule console, un premier pas vers la traçabilité DEEE sans complexité.",
        "One kiosk, one console, a first step toward WEEE traceability without complexity."
      ),
      photo: "/photos/server-technician.jpg",
      photoAlt: tx(
        "Technicien IT vérifiant un équipement, plan Essentiel",
        "IT technician checking equipment : Essential plan"
      ),
      features: tx(
        [
          "1 borne Waki Box installée et configurée",
          "Plateforme de suivi basique, 1 utilisateur",
          "Rapport trimestriel de flux DEEE",
          "Support par courriel : J+2",
        ],
        [
          "1 Waki Box kiosk installed and configured",
          "Basic monitoring platform, 1 user",
          "Quarterly WEEE flow report",
          "Email support : D+2",
        ]
      ),
      accent: "#0B3B2E",
    },
    {
      slug: "waki-box-confort",
      num: "02",
      name: "Confort",
      icon: Users,
      popular: true,
      audience: tx(
        "PME / ETI, 50 à 300 collaborateurs",
        "Mid-market, 50 to 300 employees"
      ),
      price: "79",
      setup: "290",
      engagement: tx("12 mois", "12 months"),
      tagline: tx(
        "Jusqu'à trois bornes, cinq utilisateurs, des alertes temps réel et un export CSRD prêt à signer, le plan que choisissent huit clients sur dix.",
        "Up to three kiosks, five users, real-time alerts and a CSRD export ready to sign, the plan eight out of ten clients choose."
      ),
      photo: "/photos/hp-dsi-strategy.jpg",
      photoAlt: tx(
        "DSI consulte la console Waki Box, plan Confort",
        "CIO reviewing the Waki Box console : Comfort plan"
      ),
      features: tx(
        [
          "Jusqu'à 3 bornes Waki Box",
          "Plateforme complète, 5 utilisateurs",
          "Rapport mensuel + export CSRD ESRS E5",
          "Alertes de remplissage en temps réel",
          "Support prioritaire : J+1",
        ],
        [
          "Up to 3 Waki Box kiosks",
          "Full platform, 5 users",
          "Monthly report + CSRD ESRS E5 export",
          "Real-time fill alerts",
          "Priority support : D+1",
        ]
      ),
      accent: "#047857",
    },
    {
      slug: "waki-box-premium",
      num: "03",
      name: "Premium",
      icon: Building2,
      audience: tx(
        "ETI / grands comptes, 300+ collaborateurs",
        "Enterprise, 300+ employees"
      ),
      price: tx("dès 149", "from 149"),
      setup: tx("490 / borne", "490 / kiosk"),
      engagement: tx("24 mois", "24 months"),
      tagline: tx(
        "Bornes illimitées, multi-sites, un responsable de compte dédié, une intégration ERP/SIRH par API et un délai de collecte garanti à 48 heures : pour les organisations qui ne transigent pas.",
        "Unlimited kiosks, multi-site, a dedicated account manager, ERP/HRIS integration via API and a 48-hour collection SLA, for organisations that don't compromise."
      ),
      photo: "/photos/tech-datacenter.jpg",
      photoAlt: tx(
        "Équipe IT pilotant un parc multi-sites, plan Premium",
        "IT team operating a multi-site fleet : Premium plan"
      ),
      features: tx(
        [
          "Bornes illimitées, multi-sites",
          "Responsable de compte dédié",
          "Intégration ERP / SIRH par API",
          "Délai de collecte 48 h garanti",
          "Support dédié, réponse 4 h",
        ],
        [
          "Unlimited kiosks, multi-site",
          "Dedicated account manager",
          "ERP / HRIS integration via API",
          "48h collection SLA guaranteed",
          "Dedicated support, 4h SLA",
        ]
      ),
      accent: "#B45309",
    },
  ];

  /* ── Comparison rows (number-driven bars) ──────────────────────────────── */
  const comparisonRows: {
    label: string;
    essentiel: { value: string; pct: number };
    confort: { value: string; pct: number };
    premium: { value: string; pct: number };
  }[] = tx(
    [
      {
        label: "Bornes incluses",
        essentiel: { value: "1", pct: 10 },
        confort: { value: "Jusqu'à 3", pct: 30 },
        premium: { value: "Illimitées", pct: 100 },
      },
      {
        label: "Utilisateurs plateforme",
        essentiel: { value: "1", pct: 5 },
        confort: { value: "5", pct: 25 },
        premium: { value: "Illimité", pct: 100 },
      },
      {
        label: "Collectes planifiées / mois",
        essentiel: { value: "1", pct: 10 },
        confort: { value: "2", pct: 20 },
        premium: { value: "Illimité", pct: 100 },
      },
      {
        label: "Délai de réponse support",
        essentiel: { value: "Courriel J+2", pct: 33 },
        confort: { value: "Prioritaire J+1", pct: 66 },
        premium: { value: "Dédié, 4 h", pct: 100 },
      },
    ],
    [
      {
        label: "Kiosks included",
        essentiel: { value: "1", pct: 10 },
        confort: { value: "Up to 3", pct: 30 },
        premium: { value: "Unlimited", pct: 100 },
      },
      {
        label: "Platform users",
        essentiel: { value: "1", pct: 5 },
        confort: { value: "5", pct: 25 },
        premium: { value: "Unlimited", pct: 100 },
      },
      {
        label: "Scheduled collections / month",
        essentiel: { value: "1", pct: 10 },
        confort: { value: "2", pct: 20 },
        premium: { value: "Unlimited", pct: 100 },
      },
      {
        label: "Support response time",
        essentiel: { value: "Email D+2", pct: 33 },
        confort: { value: "Priority D+1", pct: 66 },
        premium: { value: "Dedicated, 4h", pct: 100 },
      },
    ]
  );

  const featureMatrix = tx(
    [
      { label: "Télémétrie LoRaWAN temps réel", essentiel: false, confort: true, premium: true },
      { label: "Alertes de remplissage", essentiel: false, confort: true, premium: true },
      { label: "Rapports CSRD ESRS E5", essentiel: false, confort: true, premium: true },
      { label: "Intégration ERP / SIRH par API", essentiel: false, confort: false, premium: true },
      { label: "Responsable de compte dédié", essentiel: false, confort: false, premium: true },
      { label: "Délai de collecte 48 h garanti", essentiel: false, confort: false, premium: true },
    ],
    [
      { label: "Real-time LoRaWAN telemetry", essentiel: false, confort: true, premium: true },
      { label: "Fill-level alerts", essentiel: false, confort: true, premium: true },
      { label: "CSRD ESRS E5 reports", essentiel: false, confort: true, premium: true },
      { label: "ERP / HRIS integration via API", essentiel: false, confort: false, premium: true },
      { label: "Dedicated account manager", essentiel: false, confort: false, premium: true },
      { label: "48h collection SLA guaranteed", essentiel: false, confort: false, premium: true },
    ]
  );

  /* ── Add-ons ───────────────────────────────────────────────────────────── */
  const addons = [
    {
      slug: "box-supplementaire",
      icon: Box,
      recurrence: tx("mensuel", "monthly"),
      name: tx("Borne supplémentaire", "Additional kiosk"),
      desc: tx(
        "Box DEEE additionnelle pour étendre la couverture sur un site multi-bureaux ou un volume croissant. Sans engagement supplémentaire.",
        "Additional WEEE kiosk to extend coverage across a multi-office site or growing volume. No extra commitment."
      ),
      price: tx("32 € HT/mois", "€32 ex-VAT/month"),
    },
    {
      slug: "intervention-urgence",
      icon: Zap,
      recurrence: tx("one-shot", "one-time"),
      name: tx("Intervention urgence", "Emergency intervention"),
      desc: tx(
        "Collecte ponctuelle non programmée à la demande, dans un délai de 5 jours ouvrés. Idéal pour les pics d'activité ou les déménagements.",
        "Unscheduled on-demand collection, within 5 business days. Ideal for activity peaks or relocations."
      ),
      price: tx("120 € HT", "€120 ex-VAT"),
    },
    {
      slug: "animation-rse",
      icon: Megaphone,
      recurrence: tx("par jour", "per day"),
      name: tx("Animation événement RSE", "RSE event facilitation"),
      desc: tx(
        "Atelier de sensibilisation collaborateurs sur le tri DEEE et l'économie circulaire. Animé par un expert GreenTechCycle.",
        "Employee awareness workshop on WEEE sorting and the circular economy. Facilitated by a GreenTechCycle expert."
      ),
      price: tx("750 € HT/jour", "€750 ex-VAT/day"),
    },
    {
      slug: "rapport-csrd-esrs",
      icon: FileCheck,
      recurrence: tx("annuel", "annual"),
      name: tx("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"),
      desc: tx(
        "Export annuel prêt audit, conforme au standard ESRS E5 (économie circulaire et utilisation des ressources). Livrable prêt à intégrer au rapport groupe.",
        "Audit-ready annual export, compliant with ESRS E5 (circular economy and resource use). Deliverable ready for the group report."
      ),
      price: tx("990 € HT/an", "€990 ex-VAT/year"),
    },
    {
      slug: "kit-signaletique-rse",
      icon: Star,
      recurrence: tx("one-shot", "one-time"),
      name: tx("Kit signalétique RSE", "RSE signage kit"),
      desc: tx(
        "Pack one-shot d'affiches, stickers et supports de communication pour valoriser votre démarche auprès des collaborateurs et visiteurs.",
        "One-shot pack of posters, stickers and communication materials to promote your approach to employees and visitors."
      ),
      price: tx("350 € HT", "€350 ex-VAT"),
    },
    {
      slug: "audit-terrain-deee",
      icon: Search,
      recurrence: tx("par jour", "per day"),
      name: tx("Audit terrain DEEE", "WEEE field audit"),
      desc: tx(
        "Audit sur site par un consultant senior, analyse des flux DEEE, recommandations de mise en conformité, livrable structuré.",
        "On-site audit by a senior consultant, WEEE flow analysis, compliance recommendations, structured deliverable."
      ),
      price: tx("1 800 € HT/jour", "€1,800 ex-VAT/day"),
    },
    {
      slug: "formation-collaborateurs",
      icon: GraduationCap,
      recurrence: tx("par session", "per session"),
      name: tx("Formation collaborateurs", "Employee training"),
      desc: tx(
        "Session présentielle ou visio, jusqu'à 15 participants, certificat de présence, éligible OPCO. Durée : 2 heures.",
        "In-person or remote session, up to 15 participants, attendance certificate, OPCO-eligible. Duration: 2 hours."
      ),
      price: tx("590 € HT", "€590 ex-VAT"),
    },
  ];

  /* ── Plateforme + ITAD sur devis (cartes éditoriales) ──────────────────── */
  const devisCards = [
    {
      slug: "plateforme",
      kicker: tx("Plateforme GTC SaaS", "GTC SaaS Platform"),
      priceBadge: tx("Dès 2 500 € HT/mois", "From €2,500 HT/month"),
      anchorNote: tx("À partir de 2 500 € HT/mois", "Starting at €2,500 HT/month"),
      title: tx(
        "Une console unifiée, une intégration au cas par cas.",
        "A unified console, integrated case by case."
      ),
      body: tx(
        "Notre ancre tarifaire part de 2 500 € HT/mois (base 500 postes, un module). Le prix s'affine selon le nombre d'actifs gérés, les utilisateurs concurrents, les connecteurs ERP/SIRH activés et le niveau de SLA exigé.",
        "Our pricing anchor starts at €2,500 HT/month (base 500 devices, one module). The price adapts based on the number of managed assets, concurrent users, active ERP/HRIS connectors and required SLA."
      ),
      bullets: tx(
        [
          "Inventaire IT, jusqu'à 50 000 actifs unitaires",
          "Connecteurs ServiceNow, SAP, Workday, Octopus",
          "Disponibilité 99,9 %, hébergement souverain",
          "Conformité RGPD native, journal d'audit immuable",
        ],
        [
          "IT inventory, up to 50,000 individual assets",
          "ServiceNow, SAP, Workday, Octopus connectors",
          "99.9% availability, sovereign hosting",
          "Native GDPR compliance, tamper-proof audit log",
        ]
      ),
      photo: "/photos/hp-rssi-boardroom.jpg",
      photoAlt: tx(
        "Salle de décision stratégique : étude personnalisée Plateforme GTC",
        "Strategic decision room : bespoke GTC Platform study"
      ),
      icon: Monitor,
      accent: "#0B3B2E",
      ctaLabel: tx("Demander un devis Plateforme", "Request a Platform quote"),
      ctaHref: "/reserver?offre=demo-conseil&brique=plateforme",
      secondaryLabel: tx("Voir la plateforme", "Explore the platform"),
      secondaryHref: "/plateforme",
    },
    {
      slug: "itad",
      kicker: tx("Service ITAD", "ITAD Service"),
      priceBadge: tx("Dès 15 € HT/poste", "From €15 HT/device"),
      anchorNote: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
      title: tx(
        "Audit, effacement, valorisation, recyclage. Cadré sur mesure.",
        "Audit, erasure, value recovery, recycling. Scoped to fit."
      ),
      body: tx(
        "Notre ancre tarifaire part de 15 € HT/poste (effacement certifié NIST 800-88 r2). Chaque mission ITAD dépend du volume d'équipements, de leur typologie, du niveau de sécurité exigé et des contraintes réglementaires sectorielles. Un devis détaillé vous est remis sous 48 heures.",
        "Our pricing anchor starts at €15 HT/device (NIST 800-88 r2 certified erasure). Every ITAD engagement depends on equipment volume, hardware mix, required security level and sector-specific regulatory constraints. A detailed quote is delivered within 48 hours."
      ),
      bullets: tx(
        [
          "Audit et inventaire, cartographie exhaustive",
          "Effacement certifié NIST 800-88 r2 unitaire",
          "Reconditionnement et revente, valeur récupérée",
          "Recyclage DEEE réglementaire avec bordereaux",
        ],
        [
          "Audit and inventory, exhaustive mapping",
          "Per-unit NIST 800-88 r2 certified erasure",
          "Refurbishment and resale, value recovered",
          "Regulatory WEEE recycling with tracking slips",
        ]
      ),
      photo: "/photos/service-reconditionnement.jpg",
      photoAlt: tx(
        "Atelier de reconditionnement et valorisation ITAD",
        "ITAD refurbishment and value recovery workshop"
      ),
      icon: Wrench,
      accent: "#B45309",
      ctaLabel: tx("Demander un devis ITAD", "Request an ITAD quote"),
      ctaHref: "/reserver?offre=demo-conseil&brique=itad",
      secondaryLabel: tx("Voir le service ITAD", "Explore the ITAD service"),
      secondaryHref: "/services/recyclage-deee",
    },
  ];

  /* ── ITAD services list (preserved as quick navigation) ────────────────── */
  const itadServices = [
    { slug: "audit-inventaire", icon: Search, name: tx("Audit et inventaire de parc", "Fleet audit and inventory") },
    { slug: "effacement-securise", icon: Lock, name: tx("Effacement sécurisé certifié", "Certified secure erasure") },
    { slug: "reconditionnement-valorisation", icon: RefreshCcw, name: tx("Reconditionnement et valorisation", "Refurbishment and value recovery") },
    { slug: "recyclage-deee", icon: Recycle, name: tx("Recyclage DEEE réglementaire", "Regulatory WEEE recycling") },
    { slug: "cybersecurite", icon: ShieldCheck, name: tx("Cybersécurité ITAD", "ITAD cybersecurity") },
  ];

  /* ── FAQ ────────────────────────────────────────────────────────────────── */
  const faqItems = tx(
    [
      { q: "Waki Box affiche des tarifs complets, Plateforme et ITAD des ancres : quelle différence ?", a: "Waki Box est une offre packagée et standardisée : le tarif affiché est le tarif final, sans variable cachée. Pour la Plateforme GTC SaaS et le Service ITAD, nous affichons des ancres de départ (2 500 € HT/mois et 15 € HT/poste respectivement) qui permettent de calibrer les budgets. Le devis détaillé, remis sous 48 heures, affine ces ancres selon votre parc, vos modules et vos contraintes réglementaires." },
      { q: "Les prix Waki Box affichés sont-ils HT ou TTC ?", a: "Tous les prix sont exprimés hors taxes (HT). La TVA applicable en France métropolitaine est de 20 %. Les factures mentionnent le montant HT, la TVA et le total TTC." },
      { q: "Puis-je résilier avant la fin de mon engagement ?", a: "L'engagement initial (12 ou 24 mois selon le plan) est ferme. Au-delà, le contrat est reconduit tacitement par période de 12 mois, résiliable avec un préavis de 3 mois avant chaque échéance." },
      { q: "Les tarifs Waki Box sont-ils indexés ?", a: "Une indexation annuelle est prévue, plafonnée à 3 % et basée sur l'indice INSEE des prix à la consommation. Toute révision est notifiée 60 jours avant application." },
      { q: "Quels modes de paiement acceptez-vous ?", a: "Prélèvement SEPA (recommandé), carte bancaire et virement. Le prélèvement SEPA est mis en place lors de la signature du contrat pour un règlement automatique mensuel." },
      { q: "Existe-t-il des remises pour les grands volumes Waki Box ?", a: "Oui. Le plan Premium intègre des conditions tarifaires dégressives à partir de dix bornes. Contactez-nous pour un devis personnalisé incluant la volumétrie exacte." },
      { q: "Puis-je combiner Waki Box, Plateforme GTC et services ITAD ?", a: "Absolument. De nombreux clients associent un plan Waki Box pour la collecte au quotidien avec un abonnement Plateforme pour le pilotage parc et des missions ITAD ponctuelles. Les trois briques s'articulent dans une seule relation contractuelle." },
      { q: "Sous quel délai recevrai-je un devis Plateforme ou ITAD ?", a: "48 heures ouvrées après un échange initial de cadrage de 30 minutes. Le devis détaille le périmètre, les hypothèses retenues, les options et la grille de prix unitaire, pas de chiffrage opaque." },
      { q: "Le Pilote GTC à 2 900 € HT est-il vraiment remboursé si je signe la Plateforme ?", a: "Oui. Si vous signez un abonnement Plateforme GTC SaaS dans les 90 jours suivant la restitution écrite du Pilote, les 2 900 € HT sont automatiquement déduits de votre première facture annuelle. Cette garantie est inscrite dans le contrat Pilote. Aucune démarche supplémentaire n'est nécessaire de votre côté." },
    ],
    [
      { q: "Waki Box shows full pricing, Platform and ITAD show anchors: what is the difference?", a: "Waki Box is a standardised packaged offering: the displayed price is the final price, with no hidden variable. For the GTC SaaS Platform and the ITAD Service, we now show starting price anchors (€2,500 HT/month and €15 HT/device respectively) to help calibrate budgets. The detailed quote, delivered within 48 hours, refines those anchors based on your fleet, your modules and your regulatory constraints." },
      { q: "Are Waki Box prices shown ex-VAT or inc-VAT?", a: "All prices are shown excluding VAT (ex-VAT). The applicable VAT rate in mainland France is 20%. Invoices detail the ex-VAT amount, VAT and total inc-VAT." },
      { q: "Can I cancel before the end of my commitment?", a: "The initial commitment (12 or 24 months depending on plan) is firm. After that, the contract auto-renews for 12-month periods, cancellable with 3 months' notice before each renewal date." },
      { q: "Are Waki Box prices indexed?", a: "Annual indexation is capped at 3%, based on the INSEE consumer price index. Any revision is notified 60 days before application." },
      { q: "What payment methods do you accept?", a: "SEPA direct debit (recommended), credit card and wire transfer. SEPA direct debit is set up at contract signing for automatic monthly billing." },
      { q: "Are volume discounts available on Waki Box?", a: "Yes. The Premium plan includes tiered pricing from ten kiosks upward. Contact us for a custom quote with your exact volume." },
      { q: "Can I combine Waki Box, GTC Platform and ITAD services?", a: "Absolutely. Many clients pair a Waki Box plan for day-to-day collection with a Platform subscription for fleet management, plus one-off ITAD engagements. All three bricks fit within a single contractual relationship." },
      { q: "How quickly will I receive a Platform or ITAD quote?", a: "Within 48 business hours of a 30-minute scoping call. The quote details scope, assumptions, options and unit pricing, no opaque numbers." },
      { q: "Is the GTC Pilot at €2,900 ex-VAT truly refunded if I sign the Platform?", a: "Yes. If you sign a GTC SaaS Platform subscription within 90 days of the written debrief, the €2,900 ex-VAT is automatically deducted from your first annual invoice. This guarantee is written into the Pilot contract. No extra steps required on your side." },
    ]
  );


  const planKeys = ["essentiel", "confort", "premium"] as const;

  /* « Trois portes d'entrée » (ancienne S6d), fusionnées avec les 3 briques */
  const entryPoints = [
    {
      icon: Microscope,
      tag: tx("Gratuit", "Free"),
      meta: tx("2 minutes", "2 minutes"),
      title: tx("Diagnostic DEEE Flash", "WEEE Flash Diagnostic"),
      desc: tx(
        "Évaluez la maturité DEEE de votre organisation en 5 questions. Vous repartez avec un score, une recommandation de formule, et un point d'entrée pour aller plus loin.",
        "Assess your organisation's WEEE maturity in 5 questions. You leave with a score, a formula recommendation, and a starting point to go further."
      ),
      note: tx("Sans inscription. Résultat instantané.", "No sign-up. Instant result."),
      cta: tx("Lancer le diagnostic", "Start the diagnostic"),
      href: "/reserver?offre=diagnostic-flash",
    },
    {
      icon: Clock,
      tag: tx("Recommandé", "Recommended"),
      meta: tx("30 minutes", "30 minutes"),
      title: tx("Démo conseil", "Advisory demo"),
      desc: tx(
        "Un appel avec un expert GreenTechCycle pour cadrer votre besoin, identifier les leviers de valeur, et vous proposer un plan d'action concret.",
        "A call with a GreenTechCycle expert to frame your need, identify value levers, and provide a concrete action plan."
      ),
      note: tx("Aucun engagement. Restitution écrite envoyée après l'appel.", "No commitment. Written summary sent after the call."),
      cta: tx("Réserver la démo", "Book the demo"),
      href: "/reserver?offre=demo-conseil",
      featured: true,
    },
    {
      icon: Rocket,
      tag: tx("1er mois offert", "1st month free"),
      meta: tx("puis 39 € HT/mois", "then €39 HT/mo"),
      title: tx("Pilote Waki Box", "Waki Box Pilot"),
      desc: tx(
        "Installez votre première box dans un site pilote, testez la collecte connectée, mesurez votre impact sur 3 mois. Désengagement à tout moment.",
        "Install your first kiosk at a pilot site, test connected collection, measure your impact over 3 months. Cancel anytime."
      ),
      note: tx("Sans frais d'installation. Box installée sous 10 jours.", "No installation fee. Box installed within 10 days."),
      cta: tx("Démarrer le pilote", "Start the pilot"),
      href: "/reserver?offre=pilote-waki-box",
    },
  ];

  const bundles = [
    {
      name: tx("Bundle Confort RSE Essentiel", "Essential RSE Comfort Bundle"),
      plan: tx("Avec plan Confort (79 € HT/mois)", "With Comfort plan (€79 HT/month)"),
      price: "990",
      saving: tx("Économie 150 € vs séparé", "Saving €150 vs separate"),
      pitch: tx("Lancez votre démarche DEEE en 30 jours, clés en main.", "Launch your WEEE approach in 30 days, turnkey."),
      items: tx(
        ["Kit signalétique RSE : 350 € HT (inclus)", "Formation collaborateurs 2 h : 590 € HT (inclus)", "Diagnostic DEEE Flash : offert"],
        ["RSE signage kit: €350 HT (included)", "Employee training 2h: €590 HT (included)", "WEEE Flash diagnostic: free"]
      ),
      href: "/reserver?offre=waki-box-confort&bundle=confort-rse-essentiel",
    },
    {
      name: tx("Bundle Premium Conformité", "Premium Compliance Bundle"),
      plan: tx("Avec plan Premium (dès 149 € HT/mois)", "With Premium plan (from €149 HT/month)"),
      price: isEn ? "2,990" : "2 990",
      saving: tx("Économie 740 € (-20 %) vs séparé", "Saving €740 (-20%) vs separate"),
      pitch: tx(
        "Conformité CSRD et DEEE auditée, documentée, formée, en un seul contrat.",
        "CSRD and WEEE compliance audited, documented, trained, in a single contract."
      ),
      items: tx(
        [
          "Audit terrain DEEE : 1 800 € HT/jour (inclus)",
          "Reporting CSRD ESRS E5 : 990 € HT/an (inclus)",
          "Formation collaborateurs 2 h : 590 € HT (inclus)",
          "Kit signalétique RSE : 350 € HT (inclus)",
        ],
        [
          "WEEE field audit: €1,800 HT/day (included)",
          "CSRD ESRS E5 reporting: €990 HT/year (included)",
          "Employee training 2h: €590 HT (included)",
          "RSE signage kit: €350 HT (included)",
        ]
      ),
      href: "/reserver?offre=waki-box-premium&bundle=premium-conformite",
    },
  ];

  return (
    <div>
      {/* ═══════════ 1. HERO cream ═══════════ */}
      <section className="border-b border-line bg-cream py-16 lg:py-24" aria-labelledby="tarifs-hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <FadeIn className="min-w-0 lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Tag variant="brand">{tx("Tarifs Waki Box", "Waki Box pricing")}</Tag>
                <Tag variant="neutral">
                  {tx("Plateforme dès 2 500 €/mois · ITAD dès 15 €/poste", "Platform from €2,500/month · ITAD from €15/device")}
                </Tag>
              </div>
              <h1 id="tarifs-hero-title" className="mt-6 max-w-[20ch] text-display-lg text-ink">
                {tx(
                  <>
                    Tarifs Waki Box,{" "}
                    <br className="hidden sm:block" />
                    la seule brique GTC à prix public.
                  </>,
                  <>
                    Waki Box pricing,{" "}
                    <br className="hidden sm:block" />
                    the only GTC brick with public rates.
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-ink-700">
                {tx(
                  "Trois ancres tarifaires claires : Waki Box dès 39 € HT/mois, Plateforme GTC SaaS à partir de 2 500 € HT/mois, Service ITAD à partir de 15 € HT/poste. Trois plans Waki Box et un programme pilote ci-dessous.",
                  "Three clear pricing anchors: Waki Box from €39 HT/month, GTC SaaS Platform starting at €2,500 HT/month, ITAD Service starting at €15 HT/device. Three Waki Box plans and one pilot programme below."
                )}
              </p>
              <dl className="mt-8 grid max-w-[560px] grid-cols-3 border-y border-line py-6">
                {[
                  { v: "3", l: tx("plans Waki Box publics", "public Waki Box plans") },
                  { v: "1", l: tx("programme pilote, 1er mois offert", "pilot: 1st month free") },
                  { v: "48 h", l: tx("devis Plateforme & ITAD", "Platform & ITAD quote") },
                ].map((item, i) => (
                  <div key={i} className={`flex flex-col-reverse justify-end ${i > 0 ? "border-l border-line pl-4" : "pr-4"}`}>
                    <dt className="mt-1 text-caption text-muted">{item.l}</dt>
                    <dd className="font-display text-display-sm tabular-nums text-forest">{item.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#plans" size="lg">
                  {tx("Voir les plans Waki Box", "See Waki Box plans")}
                </ButtonLink>
                <ButtonLink href="#sur-devis" variant="secondary" size="lg">
                  {tx("Plateforme et ITAD, étude personnalisée", "Platform and ITAD, bespoke study")}
                </ButtonLink>
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/photos/service-wakibox.jpg"
                  alt={tx("Borne Waki Box de collecte connectée installée en entreprise", "Waki Box connected collection kiosk installed at a workplace")}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          </div>
          <CertificationStrip className="mt-12 border-t border-line pt-6" />
        </div>
      </section>

      {/* ═══════════ 2. 3 BRIQUES GTC + portes d'entrée ═══════════ */}
      <Section tone="paper">
        <FadeIn>
          <SectionHeader
            eyebrow={tx("Comment lire nos tarifs", "How to read our pricing")}
            title={tx("Trois briques GTC. Trois ancres tarifaires.", "Three GTC bricks. Three pricing anchors.")}
            intro={tx(
              "Trois briques complémentaires, trois ancres tarifaires. Waki Box affiche ses plans complets (dès 39 € HT/mois). La Plateforme GTC SaaS part de 2 500 € HT/mois, le Service ITAD de 15 € HT/poste : des ancres de départ affinées sur mesure selon votre parc et vos contraintes.",
              "Three complementary bricks, three pricing anchors. Waki Box shows its full plans (from €39 HT/month). The GTC SaaS Platform starts at €2,500 HT/month, the ITAD Service at €15 HT/device: starting anchors refined to your fleet and constraints."
            )}
          />
        </FadeIn>
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {briques.map((b) => {
            const isFeatured = "featured" in b && b.featured;
            return (
              <StaggerItem key={b.name} className="h-full">
                <div className={`flex h-full flex-col overflow-hidden rounded-xl border bg-paper ${isFeatured ? "border-leaf" : "border-line"}`}>
                  <div className="relative aspect-[16/10] border-b border-line">
                    <Image src={b.photo} alt={b.photoAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-eyebrow uppercase text-muted">{b.tag}</p>
                      {isFeatured && <Tag variant="brand">{tx("Tarifs publics ci-dessous", "Public pricing below")}</Tag>}
                    </div>
                    <h3 className="mt-3 text-heading-lg text-ink">{b.name}</h3>
                    <p className="mt-2 flex-1 text-body-sm text-ink-700">{b.pitch}</p>
                    <div className="mt-6 border-t border-line pt-4">
                      <p className="text-body font-semibold tabular-nums text-forest">{b.price}</p>
                      {"subline" in b && b.subline && <p className="mt-1 text-caption text-muted">{b.subline as string}</p>}
                      {b.ctaHref.startsWith("#") ? (
                        <a href={b.ctaHref} className="group mt-4 inline-flex items-center gap-1 text-body-sm font-medium text-leaf hover:text-leaf-700">
                          {b.ctaLabel}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <TextLink href={b.ctaHref} className="mt-4">
                          {b.ctaLabel}
                        </TextLink>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Trois portes d'entrée (fusion S6d) */}
        <div className="mt-16 border-t border-line pt-12">
          <p className="text-eyebrow uppercase text-muted">{tx("Première étape", "First step")}</p>
          <h3 className="mt-2 text-display-sm text-ink">{tx("Trois portes d'entrée.", "Three entry points.")}</h3>
          <p className="mt-3 max-w-[65ch] text-body text-ink-700">
            {tx(
              "Choisissez la première étape qui colle à votre calendrier. Chaque parcours commence par une réservation. Nous validons le périmètre ensemble avant le moindre engagement contractuel.",
              "Choose the first step that fits your calendar. Each journey starts with a booking. We validate the scope together before any contractual commitment."
            )}
          </p>
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {entryPoints.map((e) => (
              <li key={e.title} className={`flex flex-col rounded-xl border p-6 ${e.featured ? "border-leaf bg-leaf-50" : "border-line bg-paper"}`}>
                <div className="flex items-center gap-3">
                  <Pictogram icon={e.icon} />
                  <Tag variant={e.featured ? "brand" : "neutral"}>{e.tag}</Tag>
                  <span className="text-caption text-muted">{e.meta}</span>
                </div>
                <h4 className="mt-4 text-heading-md text-ink">{e.title}</h4>
                <p className="mt-2 flex-1 text-body-sm text-ink-700">{e.desc}</p>
                <p className="mt-4 border-t border-line pt-4 text-caption italic text-muted">{e.note}</p>
                <div className="mt-4">
                  {e.featured ? (
                    <ButtonLink href={e.href} fullWidth>
                      {e.cta}
                    </ButtonLink>
                  ) : (
                    <TextLink href={e.href}>{e.cta}</TextLink>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ═══════════ 3. 3 PLANS WAKI BOX #plans (+ comparatif intégré) ═══════════ */}
      <section id="plans" className="bg-cream py-16 lg:py-24" aria-labelledby="plans-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              id="plans-title"
              eyebrow={tx("Comparatif Waki Box", "Waki Box comparison")}
              title={tx("Quel plan pour votre organisation ?", "Which plan for your organisation?")}
              intro={tx(
                "Trois plans publics. Le prix affiché est le prix final ; les différences chiffrées et les fonctions avancées sont détaillées dans chaque carte.",
                "Three public plans. The displayed price is the final price; numeric differences and advanced features are detailed in each card."
              )}
            />
          </FadeIn>
          <StaggerContainer className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => {
              const key = planKeys[i];
              const popular = "popular" in plan && plan.popular;
              return (
                <StaggerItem key={plan.slug} className="h-full">
                  <article
                    aria-labelledby={`plan-title-${plan.slug}`}
                    className={`flex h-full flex-col rounded-xl border bg-paper p-6 lg:p-8 ${popular ? "border-leaf" : "border-line"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Pictogram icon={plan.icon} />
                      {popular && <Tag variant="brand">{tx("Le plus choisi", "Most chosen")}</Tag>}
                    </div>
                    <p className="mt-6 text-eyebrow uppercase text-muted">
                      {plan.num} · {plan.audience}
                    </p>
                    <h3 id={`plan-title-${plan.slug}`} className="mt-2 font-display text-display-sm text-ink">
                      Waki Box {plan.name}
                    </h3>
                    <p className="mt-3 text-body-sm text-ink-700">{plan.tagline}</p>

                    <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4">
                      <div className="col-span-3 flex flex-col-reverse justify-end">
                        <dt className="text-caption text-muted">{tx("Abonnement mensuel", "Monthly subscription")}</dt>
                        <dd className="font-display text-display-md tabular-nums text-forest">
                          {plan.price} <span className="font-sans text-body-sm text-muted">€ HT/{tx("mois", "month")}</span>
                        </dd>
                      </div>
                      <div className="col-span-2 flex flex-col-reverse justify-end">
                        <dt className="text-caption text-muted">{tx("Mise en service", "Installation")}</dt>
                        <dd className="text-body-sm font-semibold tabular-nums text-ink">{plan.setup} € HT</dd>
                      </div>
                      <div className="flex flex-col-reverse justify-end">
                        <dt className="text-caption text-muted">{tx("Engagement", "Commitment")}</dt>
                        <dd className="text-body-sm font-semibold text-ink">{plan.engagement}</dd>
                      </div>
                    </dl>

                    <ul className="mt-6 space-y-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-body-sm text-ink-700">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Comparatif (ex-barres) condensé dans la carte */}
                    <dl className="mt-6 divide-y divide-line border-t border-line text-body-sm">
                      {comparisonRows.map((row) => (
                        <div key={row.label} className="flex justify-between gap-4 py-2">
                          <dt className="text-muted">{row.label}</dt>
                          <dd className="text-right font-medium text-ink">{row[key].value}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-4 text-eyebrow uppercase text-muted">{tx("Fonctions avancées", "Advanced features")}</p>
                    <ul className="mt-2 flex-1 space-y-1 text-body-sm">
                      {featureMatrix.map((row) => {
                        const ok = row[key];
                        return (
                          <li key={row.label} className={`flex items-start gap-2 ${ok ? "text-ink-700" : "text-muted"}`}>
                            {ok ? (
                              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                            ) : (
                              <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" aria-hidden="true" />
                            )}
                            <span>
                              {row.label}
                              <span className="sr-only">{ok ? tx(" : inclus", ": included") : tx(" : non inclus", ": not included")}</span>
                            </span>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="mt-8">
                      <ButtonLink href={`/reserver?offre=${plan.slug}`} variant={popular ? "primary" : "secondary"} fullWidth>
                        {tx("Réserver Waki Box", "Book Waki Box")} {plan.name}
                      </ButtonLink>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════ 4. PROGRAMME PILOTE WAKI BOX (leaf-100) ═══════════ */}
      <Section tone="mint">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <p className="text-eyebrow uppercase text-forest">{tx("Programme pilote · 3 places", "Pilot programme · 3 spots")}</p>
            <h2 className="mt-3 max-w-[24ch] text-display-md text-forest">
              {tx(
                <>
                  Premier mois offert,{" "}
                  <br className="hidden sm:block" />
                  puis 39 € HT/mois.
                </>,
                <>
                  First month free,{" "}
                  <br className="hidden sm:block" />
                  then €39 HT/month.
                </>
              )}
            </h2>
            <p className="mt-4 max-w-[65ch] text-body-lg text-ink-700">
              {tx(
                "Installez votre première box dans un site pilote, testez la collecte connectée, mesurez votre impact sur 3 mois. Désengagement à tout moment.",
                "Install your first kiosk at a pilot site, test connected collection, measure your impact over 3 months. Cancel anytime."
              )}
            </p>
            <ul className="mt-6 space-y-2">
              {tx(
                [
                  "Sans frais d'installation (valeur 150 € offerts)",
                  "Box installée sous 10 jours ouvrés",
                  "Bascule vers le plan Essentiel, Confort ou Premium à l'issue",
                  "Désengagement à tout moment, sans pénalité",
                ],
                [
                  "No installation fee (€150 waived)",
                  "Box installed within 10 business days",
                  "Switch to Essentiel, Confort or Premium plan afterwards",
                  "Cancel anytime, no penalty",
                ]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-body-sm text-ink">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-forest" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/reserver?offre=pilote-waki-box" size="lg">
                {tx("Démarrer le pilote", "Start a pilot")}
              </ButtonLink>
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-5">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
                <Image
                  src="/photos/hp-audit-signature.jpg"
                  alt={tx("Signature d'un programme pilote Waki Box", "Signing a Waki Box pilot programme")}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-forest/20 pt-4">
                <span className="text-eyebrow uppercase text-forest">{tx("Offre pilote", "Pilot offer")}</span>
                <span className="text-body-sm font-semibold text-forest">
                  {tx("1er mois offert", "1st month free")} · {tx("puis 39 € HT/mois", "then €39 HT/month")}
                </span>
              </figcaption>
            </figure>
          </FadeIn>
        </div>
      </Section>

      {/* ═══════════ 6. MODULES COMPLÉMENTAIRES — tableau ═══════════ */}
      <Section tone="paper">
        <FadeIn>
          <SectionHeader
            eyebrow={tx("Modules complémentaires", "Add-on modules")}
            title={tx("Composez votre offre Waki Box sur mesure.", "Build your Waki Box offer to fit.")}
            intro={tx(
              "Sept modules à la carte, chacun se greffe sur n'importe quel plan. Facturation unitaire, sans engagement supplémentaire.",
              "Seven à la carte modules, each plugs into any plan. Unit billing, no additional commitment."
            )}
          />
        </FadeIn>
        <FadeIn>
          <Table
            caption={tx("Modules complémentaires Waki Box", "Waki Box add-on modules")}
            head={[
              tx("Module", "Module"),
              tx("Description", "Description"),
              tx("Récurrence", "Recurrence"),
              tx("Prix", "Price"),
              <span key="a" className="sr-only">{tx("Action", "Action")}</span>,
            ]}
            numeric={[3]}
            emphasis={[3]}
            rows={addons.map((addon) => [
              <span key="n" className="flex items-center gap-3">
                <addon.icon className="h-4 w-4 flex-shrink-0 text-forest" strokeWidth={1.75} aria-hidden="true" />
                {addon.name}
              </span>,
              <span key="d" className="block min-w-[240px] max-w-[52ch]">
                {addon.desc}
              </span>,
              <Tag key="r" variant="neutral">
                {addon.recurrence}
              </Tag>,
              <span key="p" className="whitespace-nowrap">
                {addon.price}
              </span>,
              <Link
                key="c"
                href={`/reserver?offre=${addon.slug}`}
                className="group inline-flex min-h-[44px] items-center gap-1 whitespace-nowrap font-medium text-leaf hover:text-leaf-700"
                aria-label={`${tx("Réserver", "Book")} : ${addon.name}`}
              >
                {tx("Réserver", "Book")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>,
            ])}
          />
        </FadeIn>
      </Section>

      {/* ═══════════ 7. COMPARATEUR INTERACTIF — carte unique ═══════════ */}
      <Section tone="cream">
        <FadeIn>
          <SectionHeader
            eyebrow={tx("Composez votre offre", "Build your offer")}
            title={tx("Calculez votre budget en temps réel.", "Calculate your budget in real time.")}
            intro={tx(
              "Choisissez un plan, cochez les modules que vous souhaitez ajouter. Le total mensuel se met à jour instantanément, avec ou sans remise annuelle.",
              "Choose a plan, tick the modules you want to add. The monthly total updates instantly, with or without the annual discount."
            )}
          />
        </FadeIn>
        <FadeIn>
          <PlanComparator isEn={isEn} />
        </FadeIn>
      </Section>

      {/* ═══════════ 8. BUNDLES RSE ═══════════ */}
      <Section tone="paper">
        <FadeIn>
          <SectionHeader
            eyebrow={tx("Bundles clés en main", "Turnkey bundles")}
            title={tx("Deux bundles pour aller plus vite.", "Two bundles to move faster.")}
            intro={tx(
              "Des packs tout-en-un pensés pour des organisations qui veulent lancer ou consolider leur démarche DEEE et CSRD en un seul contrat, avec une économie immédiate.",
              "All-in-one packs designed for organisations that want to launch or consolidate their WEEE and CSRD approach in a single contract, with an immediate saving."
            )}
          />
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-2">
          {bundles.map((b) => (
            <FadeIn key={b.name}>
              <article className="flex h-full flex-col rounded-xl border border-line bg-paper p-6 lg:p-8">
                <p className="text-eyebrow uppercase text-muted">{b.name}</p>
                <p className="mt-2 text-body-sm font-medium text-ink-700">{b.plan}</p>
                <p className="mt-4 font-display text-display-md tabular-nums text-forest">
                  {b.price} <span className="font-sans text-body-sm text-muted">€ HT one-shot</span>
                </p>
                <div className="mt-2">
                  <Tag variant="brand">{b.saving}</Tag>
                </div>
                <p className="mt-6 text-body-sm italic text-ink-700">{b.pitch}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {b.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ButtonLink href={b.href} variant="secondary">
                    {tx("Choisir ce bundle", "Choose this bundle")}
                  </ButtonLink>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ═══════════ 9. PILOTE GTC 3 JOURS #pilote — carte unique ═══════════ */}
      <section id="pilote" className="bg-cream py-16 lg:py-24" aria-labelledby="pilote-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <article className="grid gap-10 rounded-xl border border-line bg-paper p-6 lg:grid-cols-12 lg:gap-16 lg:p-10">
              <div className="lg:col-span-7">
                <p className="text-eyebrow uppercase text-muted">{tx("Porte d'entrée 4", "Entry point 4")}</p>
                <h2 id="pilote-title" className="mt-3 max-w-[24ch] text-display-md text-ink">
                  {tx("Pilote GTC - Audit & démarrage 3 jours.", "GTC Pilot - Audit & 3-day kickoff.")}
                </h2>
                <div className="mt-4 max-w-[65ch] space-y-4 text-body text-ink-700">
                  <p>
                    {tx(
                      "Avant de s'engager sur douze mois, certaines organisations préfèrent mesurer concrètement la valeur GTC sur leur propre parc. Le Pilote GTC répond à ce besoin : trois jours, une équipe senior, un livrable structuré.",
                      "Before committing to twelve months, some organisations prefer to measure GTC's value concretely against their own fleet. The GTC Pilot meets that need: three days, a senior team, a structured deliverable."
                    )}
                  </p>
                  <p>
                    {tx(
                      "Le diagnostic couvre la découverte de parc (asset discovery et notation d'obsolescence), la rédaction d'un plan d'action ITAD priorisé, le lancement de la Plateforme (paramétrage de la première branche), et une restitution écrite. Mission conduite par notre équipe ITAM, carbone et cyber.",
                      "The diagnostic covers fleet discovery (asset discovery and obsolescence scoring), drafting a prioritised ITAD action plan, Platform kickoff (first branch configuration), and a written debrief. Delivered by our ITAM, carbon and cyber team."
                    )}
                  </p>
                  <p>
                    {tx(
                      "Le Pilote se déroule sur site ou en hybride selon la taille du parc. À l'issue des trois jours, vous disposez d'une feuille de route signée, prête à présenter en comité de direction.",
                      "The Pilot takes place on site or in hybrid mode depending on fleet size. After three days, you have a signed roadmap, ready to present to your executive committee."
                    )}
                  </p>
                </div>
                <p className="mt-8 text-eyebrow uppercase text-muted">{tx("Inclus dans la mission", "Included in the engagement")}</p>
                <ul className="mt-3 space-y-2">
                  {tx(
                    [
                      "Audit inventaire : asset discovery + notation d'obsolescence",
                      "Plan d'action ITAD personnalisé et priorisé",
                      "Démarrage Plateforme : paramétrage de la première branche",
                      "Restitution écrite remise sous 5 jours ouvrés",
                    ],
                    [
                      "Inventory audit: asset discovery + obsolescence scoring",
                      "Personalised and prioritised ITAD action plan",
                      "Platform kickoff: first branch configuration",
                      "Written debrief delivered within 5 business days",
                    ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-body-sm text-ink-700">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6 lg:col-span-5">
                <dl className="grid grid-cols-2 gap-4 border-y border-line py-6">
                  <div className="flex flex-col-reverse justify-end">
                    <dt className="text-caption text-muted">
                      {tx("Mission forfaitaire", "Fixed-fee engagement")} · {tx("pour 3 jours", "for 3 days")}
                    </dt>
                    <dd className="font-display text-display-md tabular-nums text-forest">
                      {isEn ? "2,900" : "2 900"} <span className="font-sans text-body-sm text-muted">€ HT</span>
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse justify-end border-l border-line pl-4">
                    <dt className="text-caption text-muted">{tx("Paiement", "Payment")}</dt>
                    <dd className="text-heading-md text-ink">{tx("100 % à la signature", "100% on signing")}</dd>
                  </div>
                </dl>
                <div className="rounded-xl bg-leaf-100 p-6">
                  <p className="text-eyebrow uppercase text-forest">{tx("Garantie de valeur", "Value guarantee")}</p>
                  <p className="mt-2 text-heading-md text-forest">
                    {tx(
                      "Pilote remboursé sur la 1re année de Plateforme si signature dans les 90 jours après la restitution.",
                      "Pilot fully refunded on Year 1 Platform subscription if signed within 90 days of debrief."
                    )}
                  </p>
                  <p className="mt-2 text-body-sm text-ink-700">
                    {tx(
                      "2 900 € HT déduits automatiquement de la première facture annuelle Plateforme. Aucune démarche supplémentaire.",
                      "€2,900 ex-VAT automatically deducted from the first annual Platform invoice. No extra steps needed."
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-eyebrow uppercase text-muted">{tx("Composition de la mission", "Engagement composition")}</p>
                  <p className="mt-2 text-body-sm text-ink-700">
                    {tx(
                      "Jour 1 : Audit inventaire et notation d'obsolescence. Jour 2 : Plan ITAD priorisé + kick-off Plateforme. Jour 3 : Restitution orale et remise du livrable écrit. Équipe : un senior ITAM, un expert carbone, un consultant cyber.",
                      "Day 1: Inventory audit and obsolescence scoring. Day 2: Prioritised ITAD plan + Platform kickoff. Day 3: Oral debrief and written deliverable handover. Team: one senior ITAM, one carbon expert, one cyber consultant."
                    )}
                  </p>
                </div>
                <ButtonLink href="/reserver?offre=pilote-audit-3j" size="lg" fullWidth>
                  {tx("Réserver le Pilote 3 jours", "Book the 3-day Pilot")}
                </ButtonLink>
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ 11. SUR DEVIS #sur-devis — night ═══════════ */}
      <section id="sur-devis" className="bg-forest-900 py-16 text-ondark lg:py-24" aria-labelledby="sur-devis-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              id="sur-devis-title"
              tone="dark"
              eyebrow={tx(
                "Au-delà de Waki Box · Étude personnalisée, ancres établies",
                "Beyond Waki Box · Bespoke study, anchors established"
              )}
              title={tx("Plateforme et Service ITAD, étude personnalisée.", "Platform and ITAD Service, bespoke study.")}
              intro={tx(
                "Ancres de départ : Plateforme à partir de 2 500 € HT/mois (base 500 postes), ITAD à partir de 15 € HT/poste. Trente minutes de cadrage pour caler le devis sur votre parc et vos contraintes, livré sous 48 heures.",
                "Starting anchors: Platform from €2,500 HT/month (base 500 devices), ITAD from €15 HT/device. Thirty minutes to scope the quote to your fleet and constraints, delivered within 48 hours."
              )}
            />
          </FadeIn>
          <div className="grid gap-6 lg:grid-cols-2">
            {devisCards.map((card) => (
              <FadeIn key={card.slug}>
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-ondark-line bg-forest-950">
                  <div className="relative aspect-[16/8] border-b border-ondark-line">
                    <Image src={card.photo} alt={card.photoAlt} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag variant="dark" icon={<card.icon className="h-3.5 w-3.5" aria-hidden="true" />}>
                        {card.kicker}
                      </Tag>
                      <Tag variant="dark">{card.priceBadge}</Tag>
                    </div>
                    <h3 className="mt-4 font-display text-display-sm text-ondark">{card.title}</h3>
                    <p className="mt-2 text-body-sm font-semibold text-leaf-300">{card.anchorNote}</p>
                    <p className="mt-4 text-body-sm text-ondark-muted">{card.body}</p>
                    <ul className="mt-6 flex-1 space-y-2 border-t border-ondark-line pt-6">
                      {card.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-2 text-body-sm text-ondark-muted">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-leaf-300" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <ButtonLink href={card.ctaHref} tone="dark">
                        {card.ctaLabel}
                      </ButtonLink>
                      <ButtonLink href={card.secondaryHref} tone="dark" variant="secondary">
                        {card.secondaryLabel}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-eyebrow uppercase text-ondark-muted">{tx("Cinq missions ITAD couvertes", "Five ITAD engagements covered")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {itadServices.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-ondark-line px-4 text-body-sm font-medium text-ondark-muted transition-colors hover:border-white/30 hover:text-ondark"
                  >
                    <svc.icon className="h-4 w-4 text-leaf-300" strokeWidth={1.75} aria-hidden="true" />
                    {svc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════ 12. FAQ ═══════════ */}
      <Section tone="paper">
        <div className="mx-auto max-w-[720px]">
          <FadeIn>
            <SectionHeader
              eyebrow={tx("Questions fréquentes", "Frequently asked questions")}
              title={tx("Tarifs publics, devis sur mesure, engagement clair.", "Public pricing, tailored quotes, clear commitments.")}
            />
          </FadeIn>
          <Accordion defaultOpen={null} items={faqItems.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </Section>

      {/* ═══════════ 13. CTA UNIQUE ═══════════ */}
      <CtaSection
        title={tx("Prêt à passer à l'action ?", "Ready to take the next step?")}
        subtitle={tx(
          "Réservez Waki Box dès aujourd'hui, ou demandez un devis Plateforme / ITAD sous 48 heures.",
          "Book Waki Box today, or request a Platform / ITAD quote within 48 hours."
        )}
        primaryLabel={tx("Réserver Waki Box", "Book Waki Box")}
        primaryHref="/reserver?offre=waki-box-confort"
        secondaryLabel={tx("Demander un devis", "Request a quote")}
        secondaryHref="/reserver?offre=demo-conseil"
        reassurance={[
          tx("Réponse sous 24 heures ouvrées", "Response within 24 business hours"),
          tx("NDA signé sur demande", "NDA signed on request"),
          tx("Aucun engagement avant signature", "No commitment before signing"),
        ].join(" · ")}
        footnote={
          <p className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/cas-usages" className="font-medium text-leaf-300 hover:text-ondark">
              {tx("Voir 8 cas clients chiffrés", "See 8 quantified client cases")} →
            </Link>
            <Link href="/secteurs" className="font-medium text-leaf-300 hover:text-ondark">
              {tx("Explorer 16 fiches sectorielles", "Explore 16 sector profiles")} →
            </Link>
            <Link href="/plateforme" className="font-medium text-leaf-300 hover:text-ondark">
              {tx("Découvrir la plateforme", "Discover the platform")} →
            </Link>
          </p>
        }
      />
    </div>
  );
}
