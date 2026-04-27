"use client";

/**
 * /tarifs : Refonte v4 (avril 2026)
 *
 * Repositionnement explicite : seule la brique Waki Box est à tarif public.
 * Plateforme GTC SaaS et Service ITAD restent sur devis personnalisé.
 *
 * Architecture :
 *   S1  Hero clarifié, « Tarifs Waki Box, la seule brique GTC à prix public »
 *   S2  Bandeau 3 briques GTC (pédagogie, Waki Box mise en avant)
 *   S3  Trois plans Waki Box, composition asymétrique avec photos
 *   S4  Programme pilote, fond #10B981 + illustration
 *   S5  Comparatif Waki Box, visualisation par barres
 *   S6  Modules complémentaires, card-grid asymétrique
 *   S7  Plateforme & ITAD, sur devis (deux grandes cartes éditoriales)
 *   S8  FAQ tarifaire, accordéon magazine
 *   S9  CTA double + bandeau confiance + cross-link /cas-usages /secteurs
 */

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Rocket,
  Users,
  Building2,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Leaf,
  Award,
  Search,
  RefreshCcw,
  Recycle,
  Lock,
  Box,
  Monitor,
  Wrench,
  Layers,
  Star,
  Zap,
  Clock,
  Gift,
  Package,
  Megaphone,
  GraduationCap,
  ClipboardList,
  ToggleLeft,
  ToggleRight,
  Microscope,
} from "lucide-react";
import { useState } from "react";

/* ── FAQ accordion ───────────────────────────────────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#0F172A] text-[15px] leading-snug">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            open ? "rotate-180 text-[#047857]" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <p className="mt-4 text-[14.5px] text-gray-600 leading-[1.78] pr-8">
          {a}
        </p>
      )}
    </div>
  );
}

/* ── Ghost number ────────────────────────────────────────────────────────── */
function GhostNumber({
  n,
  isDark,
  align = "right",
}: {
  n: string;
  isDark: boolean;
  align?: "left" | "right";
}) {
  return (
    <div
      className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
      style={{
        fontSize: "clamp(8rem, 22vw, 18rem)",
        color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
        [align === "right" ? "right" : "left"]: "-0.05em",
        bottom: "-0.12em",
      }}
      aria-hidden="true"
    >
      {n}
    </div>
  );
}

/* ── Plan Comparator Interactive ───────────────────────────────────────────── */
function PlanComparator({ isEn }: { isEn: boolean }) {
  function tx<T>(fr: T, en: T): T { return isEn ? en : fr; }

  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"essentiel" | "confort" | "premium">("confort");
  const [checkedAddons, setCheckedAddons] = useState<Set<string>>(new Set());

  const plans = {
    essentiel: { price: 39, setup: 150, name: "Essentiel", accent: "#0EA5E9" },
    confort: { price: 79, setup: 290, name: "Confort", accent: "#10B981" },
    premium: { price: 149, setup: 490, name: "Premium", accent: "#F59E0B" },
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
      if (next.has(slug)) next.delete(slug); else next.add(slug);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Billing toggle */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <button
          onClick={() => setBilling("monthly")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            billing === "monthly"
              ? "bg-[#10B981] text-white shadow-lg shadow-[#10B981]/25"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {tx("Mensuel", "Monthly")}
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            billing === "annual"
              ? "bg-[#10B981] text-white shadow-lg shadow-[#10B981]/25"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {tx("Annuel", "Annual")}
          <span className="ml-1 px-1.5 py-0.5 rounded bg-[#F59E0B] text-white text-[10px] font-bold">-15%</span>
        </button>
      </div>

      {/* Plan selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {(Object.entries(plans) as [keyof typeof plans, typeof plans[keyof typeof plans]][]).map(([key, p]) => {
          const isSelected = selectedPlan === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected
                  ? "ring-2 shadow-lg"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
              style={isSelected ? { borderColor: p.accent, boxShadow: `0 8px 24px ${p.accent}20` } : {}}
            >
              {isSelected && key === "confort" && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold mb-2">
                  <Sparkles className="h-2.5 w-2.5" />
                  {tx("Le plus choisi", "Most chosen")}
                </div>
              )}
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: p.accent }}>
                {tx("Plan", "Plan")} {p.name}
              </p>
              <p className="text-2xl font-black" style={{ color: isSelected ? p.accent : "#0F172A" }}>
                {billing === "annual" ? Math.round(p.price * 0.85) : p.price}
                <span className="text-sm font-semibold ml-1 opacity-70">€ HT{tx("/mois", "/mo")}</span>
              </p>
              {billing === "annual" && (
                <p className="text-[11px] text-gray-400 mt-1">
                  {tx(`soit ${Math.round(p.price * 0.85 * 12)} € HT/an`, `i.e. €${Math.round(p.price * 0.85 * 12)} ex-VAT/year`)}
                </p>
              )}
              <p className="text-[11px] text-gray-500 mt-2">
                {tx("Mise en service", "Setup")} : {p.setup} € HT
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Add-ons checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">
            {tx("Modules à ajouter (optionnel)", "Add-on modules (optional)")}
          </p>
          <div className="space-y-3">
            {addonList.map((addon) => {
              const checked = checkedAddons.has(addon.slug);
              return (
                <label
                  key={addon.slug}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    checked
                      ? "bg-[#F0FDF9] border-[#10B981]/40"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddon(addon.slug)}
                    className="mt-0.5 h-4 w-4 rounded accent-[#10B981] cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#0F172A] leading-snug">{addon.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      <span className="font-bold text-[#047857]">{addon.price.toLocaleString("fr-FR")} € HT</span>
                      {addon.recurrence !== "one-shot" && <span className="ml-1">{addon.recurrence}</span>}
                      {addon.recurrence === "one-shot" && <span className="ml-1 italic">{tx("one-shot", "one-time")}</span>}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Total dynamique */}
        <div className="space-y-4">
          <div className="bg-[#0F172A] rounded-2xl p-6 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 mb-4">
              {tx("Estimation mensuelle", "Monthly estimate")}
            </p>
            <div className="space-y-2 mb-4 pb-4 border-b border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Waki Box {plans[selectedPlan].name}</span>
                <span className="font-semibold">{baseMonthly} € HT{tx("/mois", "/mo")}</span>
              </div>
              {addonMonthlyContrib > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{tx("Modules récurrents", "Recurring modules")}</span>
                  <span className="font-semibold">+{addonMonthlyContrib} € HT{tx("/mois", "/mo")}</span>
                </div>
              )}
            </div>
            <div className="flex items-end justify-between">
              <p className="text-[11px] text-gray-500">{tx("Total récurrent", "Recurring total")}</p>
              <p className="text-3xl font-black tabular-nums text-[#10B981]">
                {totalMonthly} <span className="text-base font-semibold opacity-80">€ HT{tx("/mois", "/mo")}</span>
              </p>
            </div>
            {billing === "annual" && (
              <p className="text-[11px] text-gray-500 mt-2 text-right">
                {tx("soit", "i.e.")} {totalAnnual.toLocaleString("fr-FR")} € HT{tx("/an", "/year")}
              </p>
            )}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{tx("Mise en service (one-shot)", "Setup (one-time)")}</span>
                <span className="text-gray-300">{plan.setup} € HT</span>
              </div>
            </div>
          </div>

          {/* Bundle suggestion */}
          {bundle && (
            <div className="bg-gradient-to-br from-[#F0FDF9] to-[#ECFDF5] border border-[#10B981]/30 rounded-2xl p-5">
              <div className="flex items-start gap-2 mb-3">
                <Gift className="h-5 w-5 text-[#047857] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#047857] mb-1">
                    {tx("Bundle suggéré", "Suggested bundle")}
                  </p>
                  <p className="text-[14px] font-bold text-[#0F172A] leading-snug">{bundle.name}</p>
                </div>
              </div>
              <p className="text-2xl font-black text-[#047857] mb-1">
                {bundle.price.toLocaleString("fr-FR")} € HT
                <span className="text-sm font-semibold opacity-70 ml-1">one-shot</span>
              </p>
              <p className="text-[12px] text-[#047857] font-semibold">
                {tx(`Économie : ${bundle.saving} €`, `Saving: €${bundle.saving}`)} (-{Math.round((bundle.saving / (bundle.price + bundle.saving)) * 100)}%)
              </p>
            </div>
          )}

          {/* CTA */}
          <Link
            href={`/reserver?offre=waki-box-${selectedPlan}`}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10B981]/25 text-sm"
          >
            {tx("Réserver Waki Box", "Book Waki Box")} {plans[selectedPlan].name}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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
      accent: "#0EA5E9",
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
      accent: "#10B981",
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
      accent: "#F59E0B",
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
      accent: "#0EA5E9",
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
      accent: "#10B981",
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
      accent: "#F59E0B",
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
      accent: "#0EA5E9",
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
      accent: "#F59E0B",
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
      { q: "Le Pilote GTC à 2 900 € HT est-il vraiment remboursé si je signe la Plateforme ?", a: "Oui. Si vous signez un abonnement Plateforme GTC SaaS dans les 90 jours suivant la restitution écrite du Pilote, les 2 900 € HT sont automatiquement déduits de votre premiere facture annuelle. Cette garantie est inscrite dans le contrat Pilote. Aucune démarche supplémentaire n'est nécessaire de votre côté." },
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

  const trustBadges = [
    { icon: Award, label: "R2v3" },
    { icon: ShieldCheck, label: "ISO 27001" },
    { icon: Leaf, label: "ISO 14001" },
    { icon: FileCheck, label: "NIST 800-88" },
  ];

  return (
    <main className="overflow-hidden bg-white">

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO ÉDITORIAL) split sombre #0F1115 (aligné /secteurs)
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[78vh] flex flex-col lg:flex-row overflow-hidden bg-[#0F1115]"
        aria-labelledby="tarifs-hero-title"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 12% 18%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 92% 88%, rgba(14,165,233,0.12) 0%, transparent 55%)",
          }}
        />

        {/* Ghost watermark XXL */}
        <div
          className="absolute select-none pointer-events-none font-black tracking-tighter leading-none text-white/[0.025]"
          style={{
            fontSize: "clamp(10rem, 28vw, 24rem)",
            right: "-0.05em",
            bottom: "-0.15em",
          }}
          aria-hidden="true"
        >
          39€
        </div>

        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                {tx("Tarifs Waki Box", "Waki Box pricing")}
              </span>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0EA5E9]/30 bg-[#0EA5E9]/10 text-[11px] font-semibold tracking-[0.1em] text-[#67E8F9] uppercase">
                <Layers className="w-3 h-3" aria-hidden="true" />
                {tx("Plateforme dès 2 500 €/mois · ITAD dès 15 €/poste", "Platform from €2,500/month · ITAD from €15/device")}
              </span>
            </div>

            <h1
              id="tarifs-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {tx(
                <>Tarifs Waki Box,<br /><span className="text-[#10B981]">la seule brique GTC à prix public.</span></>,
                <>Waki Box pricing,<br /><span className="text-[#10B981]">the only GTC brick with public rates.</span></>
              )}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.12rem] leading-[1.72] max-w-xl mb-10">
              {tx(
                "Trois ancres tarifaires claires : Waki Box dès 39 € HT/mois, Plateforme GTC SaaS à partir de 2 500 € HT/mois, Service ITAD à partir de 15 € HT/poste. Trois plans Waki Box et un programme pilote ci-dessous.",
                "Three clear pricing anchors: Waki Box from €39 HT/month, GTC SaaS Platform starting at €2,500 HT/month, ITAD Service starting at €15 HT/device. Three Waki Box plans and one pilot programme below."
              )}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {[
                { v: "3", l: tx("plans Waki Box publics", "public Waki Box plans"), color: "#10B981" },
                { v: "1", l: tx("programme pilote, 1er mois offert", "pilot: 1st month free"), color: "#0EA5E9" },
                { v: "48 h", l: tx("devis Plateforme & ITAD", "Platform & ITAD quote"), color: "#F59E0B" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.v}
                  </span>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium">{item.l}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {tx("Voir les plans Waki Box", "See Waki Box plans")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#sur-devis"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {tx("Plateforme et ITAD, étude personnalisée", "Platform and ITAD, bespoke study")}
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/service-wakibox.jpg"
            alt={tx(
              "Borne Waki Box de collecte connectée installée en entreprise",
              "Waki Box connected collection kiosk installed at a workplace"
            )}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115]/85 via-[#0F1115]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F1115]/55 to-transparent" />
        </div>
      </section>

      {/* Certifications band */}
      <section className="bg-[#0F1115] py-8 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                <Icon className="h-4 w-4 text-[#6EE7B7]" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2, BANDEAU PÉDAGOGIQUE : LES 3 BRIQUES GTC
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-24">
        <GhostNumber n="01" isDark={false} align="left" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Comment lire nos tarifs", "How to read our pricing")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Trois briques GTC. Trois ancres tarifaires.", "Three GTC bricks. Three pricing anchors.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Trois briques complémentaires, trois ancres tarifaires. Waki Box affiche ses plans complets (dès 39 € HT/mois). La Plateforme GTC SaaS part de 2 500 € HT/mois, le Service ITAD de 15 € HT/poste : des ancres de départ affinées sur mesure selon votre parc et vos contraintes.",
                  "Three complementary bricks, three pricing anchors. Waki Box shows its full plans (from €39 HT/month). The GTC SaaS Platform starts at €2,500 HT/month, the ITAD Service at €15 HT/device: starting anchors refined to your fleet and constraints."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-7 max-w-6xl">
            {briques.map((b, i) => {
              const Icon = b.icon;
              const isFeatured = "featured" in b && b.featured;
              const isExternalAnchor = b.ctaHref.startsWith("#");
              return (
                <StaggerItem key={i}>
                  <div
                    className={`relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                      isFeatured
                        ? "ring-2 ring-[#10B981] shadow-xl shadow-[#10B981]/15 lg:scale-[1.03]"
                        : "ring-1 ring-gray-100 hover:ring-gray-200 shadow-sm"
                    }`}
                  >
                    {isFeatured && (
                      <div className="absolute top-0 left-0 right-0 z-20 bg-[#10B981] text-white text-center text-[11px] font-bold uppercase tracking-[0.15em] py-1.5">
                        {tx("Tarifs publics ci-dessous", "Public pricing below")}
                      </div>
                    )}

                    {/* Photo */}
                    <div className={`relative aspect-[16/9] overflow-hidden ${isFeatured ? "mt-7" : ""}`}>
                      <Image
                        src={b.photo}
                        alt={b.photoAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                      <div
                        className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md"
                        style={{ backgroundColor: `${b.accent}E6` }}
                      >
                        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <span
                        className="absolute top-3 right-3 select-none pointer-events-none font-black leading-none text-white/[0.18]"
                        style={{ fontSize: "4rem" }}
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="bg-white p-6 lg:p-7">
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                        style={{ color: b.accent }}
                      >
                        {b.tag}
                      </p>
                      <h3 className="text-2xl font-bold text-[#0F172A] mb-3 tracking-tight leading-tight">
                        {b.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">
                        {b.pitch}
                      </p>
                      <div className="flex items-center justify-between gap-3 pt-5 border-t border-gray-100">
                        <div className="flex flex-col gap-0.5">
                          <span
                            className="text-base font-black tracking-tight"
                            style={{ color: b.accent }}
                          >
                            {b.price}
                          </span>
                          {"subline" in b && b.subline && (
                            <span className="text-[10.5px] text-gray-500 leading-snug max-w-[22ch]">
                              {b.subline as string}
                            </span>
                          )}
                        </div>
                        {isExternalAnchor ? (
                          <a
                            href={b.ctaHref}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                            style={{ color: b.accent }}
                          >
                            {b.ctaLabel}
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </a>
                        ) : (
                          <Link
                            href={b.ctaHref}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                            style={{ color: b.accent }}
                          >
                            {b.ctaLabel}
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 (3 PLANS WAKI BOX) composition asymétrique éditoriale
         ════════════════════════════════════════════════════════════════ */}
      <div id="plans">
        {plans.map((plan, i) => {
          const isDark = i === 1;
          const bgClass = isDark ? "bg-[#0F1115]" : i === 2 ? "bg-[#F8FAFC]" : "bg-white";
          const textColor = isDark ? "text-white" : "text-[#0F172A]";
          const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
          const Icon = plan.icon;
          const photoOnRight = i === 1; // Confort photo right
          const isPhotoLeft = i === 0 || i === 2;

          return (
            <section
              key={plan.slug}
              className={`relative w-full overflow-hidden ${bgClass}`}
              aria-labelledby={`plan-title-${plan.slug}`}
            >
              <GhostNumber n={plan.num} isDark={isDark} align={i % 2 === 0 ? "right" : "left"} />

              <div
                className={`flex flex-col lg:flex-row ${photoOnRight ? "" : "lg:flex-row-reverse"} min-h-[80vh]`}
              >
                {/* Photo panel */}
                <div className="relative w-full lg:w-[45%] min-h-[44vw] lg:min-h-0 overflow-hidden flex-shrink-0">
                  <Image
                    src={plan.photo}
                    alt={plan.photoAlt}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? isPhotoLeft
                          ? "bg-gradient-to-r from-transparent via-transparent to-[#0F1115]/70"
                          : "bg-gradient-to-l from-transparent via-transparent to-[#0F1115]/70"
                        : isPhotoLeft
                        ? "bg-gradient-to-r from-transparent to-white/10"
                        : "bg-gradient-to-l from-transparent to-white/10"
                    }`}
                  />
                  <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                    <Icon className="h-3.5 w-3.5" style={{ color: plan.accent }} aria-hidden="true" />
                    <span className="text-[11px] font-semibold text-[#0F172A] tracking-wide uppercase">
                      {plan.audience.split(",")[0]?.trim() ?? plan.name}
                    </span>
                  </div>
                </div>

                {/* Content panel */}
                <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-24">
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full"
                    style={{ backgroundColor: plan.accent }}
                    aria-hidden="true"
                  />

                  <div className="max-w-xl w-full relative z-10">
                    <FadeIn>
                      <div className="flex items-center gap-4 mb-6">
                        <span
                          className="text-5xl lg:text-6xl font-black leading-none tracking-tighter tabular-nums"
                          style={{ color: plan.accent }}
                        >
                          {plan.num}
                        </span>
                        <span
                          className="flex-1 h-[1px] opacity-25"
                          style={{ backgroundColor: plan.accent }}
                          aria-hidden="true"
                        />
                        {"popular" in plan && plan.popular && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981] text-white text-[11px] font-semibold uppercase tracking-wider">
                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                            {tx("Le plus choisi", "Most chosen")}
                          </span>
                        )}
                      </div>

                      <p className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {plan.audience}
                      </p>

                      <h2
                        id={`plan-title-${plan.slug}`}
                        className={`font-bold tracking-tight mb-5 ${textColor}`}
                        style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.04 }}
                      >
                        Waki Box {plan.name}
                      </h2>

                      <p className={`text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-8 ${subTextColor}`}>
                        {plan.tagline}
                      </p>

                      {/* Prix */}
                      <div className={`flex flex-wrap items-end gap-7 mb-8 pb-8 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {tx("Abonnement mensuel", "Monthly subscription")}
                          </span>
                          <span
                            className="text-4xl lg:text-5xl font-black tracking-tight leading-none tabular-nums"
                            style={{ color: plan.accent }}
                          >
                            {plan.price} <span className="text-lg font-semibold opacity-80">€ HT/mois</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {tx("Mise en service", "Installation")}
                          </span>
                          <span className={`text-xl font-bold ${textColor}`}>
                            {plan.setup} <span className="text-sm font-medium opacity-70">€ HT</span>
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                            {tx("Engagement", "Commitment")}
                          </span>
                          <span className={`text-xl font-bold ${textColor}`}>
                            {plan.engagement}
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className={`flex items-start gap-3 text-[15px] leading-snug ${subTextColor}`}>
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: plan.accent }} aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={`/reserver?offre=${plan.slug}`}
                        className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                          isDark
                            ? "bg-white text-[#0F172A] hover:bg-gray-100"
                            : "text-white"
                        }`}
                        style={isDark ? {} : { backgroundColor: plan.accent, boxShadow: `0 4px 16px ${plan.accent}30` }}
                      >
                        {tx("Réserver Waki Box", "Book Waki Box")} {plan.name}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S4 (PROGRAMME PILOTE) fond #10B981 + illustration
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#10B981]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(255,255,255,0.25) 0%, transparent 55%)",
          }}
        />
        <GhostNumber n="04" isDark={true} align="right" />

        <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-5 w-5 text-white/80" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                    {tx("Programme pilote (3 places", "Pilot programme) 3 spots")}
                  </span>
                </div>

                <h2
                  className="text-white font-black tracking-tight mb-6"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
                >
                  {tx(
                    <>Premier mois offert,<br />puis 39 € HT/mois.</>,
                    <>First month free,<br />then €39 HT/month.</>
                  )}
                </h2>

                <p className="text-white/90 text-[1.05rem] lg:text-[1.15rem] leading-[1.65] max-w-2xl mb-8">
                  {tx(
                    "Installez votre première box dans un site pilote, testez la collecte connectée, mesurez votre impact sur 3 mois. Désengagement à tout moment.",
                    "Install your first kiosk at a pilot site, test connected collection, measure your impact over 3 months. Cancel anytime."
                  )}
                </p>

                <ul className="space-y-2 mb-10">
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
                    <li key={i} className="flex items-start gap-3 text-white/95 text-[15px] leading-snug">
                      <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/reserver?offre=pilote-waki-box"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F1115] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {tx("Démarrer le pilote", "Start a pilot")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden ring-4 ring-white/15 shadow-2xl shadow-black/30">
                <Image
                  src="/photos/hp-audit-signature.jpg"
                  alt={tx(
                    "Signature d'un programme pilote Waki Box",
                    "Signing a Waki Box pilot programme"
                  )}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F1115]/30 via-transparent to-[#10B981]/10" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl px-5 py-4 shadow-lg">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#047857] mb-1">
                    {tx("Offre pilote", "Pilot offer")}
                  </p>
                  <p className="text-3xl font-black text-[#0F172A] leading-none tabular-nums">
                    {tx("1er mois offert", "1st month free")}
                    <span className="text-sm font-semibold text-gray-500 block mt-1">{tx("puis 39 € HT/mois", "then €39 HT/month")}</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 (COMPARATIF WAKI BOX) visualisation par barres
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
        <GhostNumber n="05" isDark={false} align="left" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Comparatif Waki Box", "Waki Box comparison")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Quel plan pour votre organisation ?", "Which plan for your organisation?")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Quatre critères chiffrés visualisés en barres, plus six fonctions clés en mode présence/absence. Une lecture en dix secondes.",
                  "Four numeric criteria visualised as bars, plus six key features as presence/absence. A ten-second read."
                )}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="max-w-5xl bg-white rounded-3xl shadow-sm ring-1 ring-gray-100 p-6 lg:p-10">
              {/* Plan headers */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 lg:gap-6 pb-5 mb-6 border-b-2 border-gray-100 items-end">
                <div />
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#0EA5E9]">Essentiel</span>
                  <span className="block text-xl font-black text-[#0F172A] mt-1 tabular-nums">39 €</span>
                </div>
                <div className="text-center relative">
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                    <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                    {tx("Le plus choisi", "Most chosen")}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#10B981]">Confort</span>
                  <span className="block text-xl font-black text-[#0F172A] mt-1 tabular-nums">79 €</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#F59E0B]">Premium</span>
                  <span className="block text-xl font-black text-[#0F172A] mt-1 tabular-nums">{tx("dès 149 €", "from €149")}</span>
                </div>
              </div>

              {/* Numeric bars */}
              <div className="space-y-7 mb-10">
                {comparisonRows.map((row) => (
                  <div key={row.label}>
                    <p className="text-[12px] font-bold text-[#0F172A] uppercase tracking-[0.1em] mb-3">
                      {row.label}
                    </p>
                    <div className="grid grid-cols-3 gap-3 lg:gap-6">
                      {[
                        { ...row.essentiel, accent: "#0EA5E9" },
                        { ...row.confort, accent: "#10B981" },
                        { ...row.premium, accent: "#F59E0B" },
                      ].map((cell, j) => (
                        <div key={j} className="flex flex-col gap-2">
                          <div className="relative h-7 bg-[#F1F5F9] rounded-lg overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-lg"
                              style={{
                                width: `${cell.pct}%`,
                                backgroundColor: cell.accent,
                                opacity: 0.85,
                              }}
                            />
                          </div>
                          <span className="text-[12px] font-semibold text-[#0F172A] tabular-nums">
                            {cell.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature matrix */}
              <div className="border-t border-gray-100 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-5">
                  {tx("Fonctions avancées", "Advanced features")}
                </p>
                <div className="space-y-3">
                  {featureMatrix.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 lg:gap-6 items-center py-2.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-[13px] font-medium text-[#0F172A]">{row.label}</span>
                      {[row.essentiel, row.confort, row.premium].map((ok, k) => {
                        const accent = k === 0 ? "#0EA5E9" : k === 1 ? "#10B981" : "#F59E0B";
                        return (
                          <div key={k} className="flex justify-center">
                            {ok ? (
                              <CheckCircle2 className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
                            ) : (
                              <span className="text-gray-300 text-xl" aria-hidden="true">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 lg:gap-6 pt-8 mt-8 border-t-2 border-gray-100">
                <div />
                <Link
                  href="/reserver?offre=waki-box-essentiel"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[11px] lg:text-xs font-semibold text-white bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors"
                >
                  {tx("Réserver", "Book")}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=waki-box-confort"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[11px] lg:text-xs font-semibold text-white bg-[#10B981] hover:bg-[#0E9F6E] transition-colors"
                >
                  {tx("Réserver", "Book")}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=waki-box-premium"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-[11px] lg:text-xs font-semibold text-white bg-[#F59E0B] hover:bg-[#D97706] transition-colors"
                >
                  {tx("Réserver", "Book")}
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (MODULES COMPLÉMENTAIRES WAKI BOX) card-grid asymétrique
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <GhostNumber n="06" isDark={false} align="right" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Modules complémentaires", "Add-on modules")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Composez votre offre Waki Box sur mesure.", "Build your Waki Box offer to fit.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Sept modules à la carte, chacun se greffe sur n'importe quel plan. Facturation unitaire, sans engagement supplémentaire.",
                  "Seven à la carte modules, each plugs into any plan. Unit billing, no additional commitment."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 max-w-6xl">
            {addons.map((addon, i) => {
              const AddonIcon = addon.icon;
              const isLarge = i === 0 || i === 5;
              return (
                <StaggerItem
                  key={addon.slug}
                  className={isLarge ? "md:col-span-2 lg:col-span-2" : ""}
                >
                  <div className="group h-full bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 lg:p-7 hover:border-[#10B981]/40 hover:shadow-lg transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                          <AddonIcon className="h-5 w-5 text-[#047857]" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-gray-400 tabular-nums tracking-wider">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="inline-flex px-1.5 py-0.5 rounded bg-[#10B981]/10 text-[10px] font-semibold text-[#047857] tracking-wide">
                              {addon.recurrence}
                            </span>
                          </div>
                          <h3 className="font-bold text-[#0F172A] text-base leading-tight">{addon.name}</h3>
                        </div>
                      </div>
                      <p className="text-[13.5px] text-gray-600 leading-relaxed mb-5 flex-1">
                        {addon.desc}
                      </p>
                      <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                        <span className="text-base font-black text-[#047857] tabular-nums whitespace-nowrap">
                          {addon.price}
                        </span>
                        <Link
                          href={`/reserver?offre=${addon.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#047857]/10 text-[#047857] text-xs font-semibold hover:bg-[#047857]/20 transition-colors whitespace-nowrap group-hover:bg-[#10B981] group-hover:text-white"
                        >
                          {tx("Réserver", "Book")}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6b (COMPARATEUR INTERACTIF)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
        <GhostNumber n="06" isDark={false} align="left" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Composez votre offre", "Build your offer")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Calculez votre budget en temps réel.", "Calculate your budget in real time.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Choisissez un plan, cochez les modules que vous souhaitez ajouter. Le total mensuel se met à jour instantanément, avec ou sans remise annuelle.",
                  "Choose a plan, tick the modules you want to add. The monthly total updates instantly, with or without the annual discount."
                )}
              </p>
            </div>
          </FadeIn>
          <FadeIn>
            <PlanComparator isEn={isEn} />
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6c (BUNDLES RSE)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <GhostNumber n="07" isDark={false} align="right" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Bundles clés en main", "Turnkey bundles")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Deux bundles pour aller plus vite.", "Two bundles to move faster.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Des packs tout-en-un pensés pour des organisations qui veulent lancer ou consolider leur démarche DEEE et CSRD en un seul contrat, avec une économie immédiate.",
                  "All-in-one packs designed for organisations that want to launch or consolidate their WEEE and CSRD approach in a single contract, with an immediate saving."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl">
            {/* Bundle Confort RSE Essentiel */}
            <FadeIn>
              <article className="relative h-full rounded-2xl border border-[#10B981]/25 bg-gradient-to-br from-[#F0FDF9] to-white p-7 lg:p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 mb-5">
                  <Gift className="h-4 w-4 text-[#047857]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#047857]">
                    {tx("Bundle Confort RSE Essentiel", "Essential RSE Comfort Bundle")}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#047857] mb-1">
                  {tx("Avec plan Confort (79 € HT/mois)", "With Comfort plan (€79 HT/month)")}
                </p>
                <p className="text-4xl font-black text-[#0F172A] mb-2 tabular-nums">
                  990 <span className="text-xl font-semibold opacity-70">€ HT one-shot</span>
                </p>
                <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#047857] bg-[#10B981]/10 px-2.5 py-1 rounded-full mb-6">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {tx("Économie 150 € vs séparé", "Saving €150 vs separate")}
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-6 italic">
                  {tx(
                    "Lancez votre démarche DEEE en 30 jours, clés en main.",
                    "Launch your WEEE approach in 30 days, turnkey."
                  )}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tx(
                    [
                      "Kit signalétique RSE : 350 € HT (inclus)",
                      "Formation collaborateurs 2 h : 590 € HT (inclus)",
                      "Diagnostic DEEE Flash : offert",
                    ],
                    [
                      "RSE signage kit: €350 HT (included)",
                      "Employee training 2h: €590 HT (included)",
                      "WEEE Flash diagnostic: free",
                    ]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13.5px] text-gray-700 leading-snug">
                      <CheckCircle2 className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/reserver?offre=waki-box-confort&bundle=confort-rse-essentiel"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10B981]/25 text-sm"
                >
                  {tx("Choisir ce bundle", "Choose this bundle")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </FadeIn>

            {/* Bundle Premium Conformité */}
            <FadeIn>
              <article className="relative h-full rounded-2xl border-2 border-[#F59E0B]/40 bg-gradient-to-br from-[#FFFBEB] to-white p-7 lg:p-8 shadow-lg shadow-[#F59E0B]/10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 mb-5">
                  <Package className="h-4 w-4 text-[#D97706]" aria-hidden="true" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D97706]">
                    {tx("Bundle Premium Conformité", "Premium Compliance Bundle")}
                  </span>
                </div>
                <p className="text-[13px] font-semibold text-[#D97706] mb-1">
                  {tx("Avec plan Premium (dès 149 € HT/mois)", "With Premium plan (from €149 HT/month)")}
                </p>
                <p className="text-4xl font-black text-[#0F172A] mb-2 tabular-nums">
                  2 990 <span className="text-xl font-semibold opacity-70">€ HT one-shot</span>
                </p>
                <p className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#D97706] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full mb-6">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {tx("Économie 740 € (-20 %) vs séparé", "Saving €740 (-20%) vs separate")}
                </p>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-6 italic">
                  {tx(
                    "Conformité CSRD et DEEE auditée, documentée, formée, en un seul contrat.",
                    "CSRD and WEEE compliance audited, documented, trained, in a single contract."
                  )}
                </p>
                <ul className="space-y-2.5 mb-8">
                  {tx(
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
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13.5px] text-gray-700 leading-snug">
                      <CheckCircle2 className="h-4 w-4 text-[#F59E0B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/reserver?offre=waki-box-premium&bundle=premium-conformite"
                  className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F59E0B]/25 text-sm"
                >
                  {tx("Choisir ce bundle", "Choose this bundle")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6d (TROIS PORTES D'ENTRÉE)
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0F1115] py-20 lg:py-28">
        <GhostNumber n="08" isDark={true} align="left" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(16,185,129,0.09) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-4">
                {tx("Première étape", "First step")}
              </p>
              <h2
                className="text-white font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Trois portes d'entrée.", "Three entry points.")}
              </h2>
              <p className="text-gray-300 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Choisissez la première étape qui colle à votre calendrier. Chaque parcours commence par une réservation. Nous validons le périmètre ensemble avant le moindre engagement contractuel.",
                  "Choose the first step that fits your calendar. Each journey starts with a booking. We validate the scope together before any contractual commitment."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl">
            {/* 1. Diagnostic DEEE Flash */}
            <FadeIn>
              <article className="h-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#10B981]/40 rounded-2xl p-6 lg:p-7 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 flex items-center justify-center mb-5">
                  <Microscope className="h-6 w-6 text-[#10B981]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#10B981]/15 text-[#6EE7B7] text-[10px] font-bold uppercase tracking-wider">
                    {tx("Gratuit", "Free")}
                  </span>
                  <span className="text-gray-500 text-[11px]">{tx("2 minutes", "2 minutes")}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {tx("Diagnostic DEEE Flash", "WEEE Flash Diagnostic")}
                </h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed mb-5 flex-1">
                  {tx(
                    "Évaluez la maturité DEEE de votre organisation en 5 questions. Vous repartez avec un score, une recommandation de formule, et un point d'entrée pour aller plus loin.",
                    "Assess your organisation's WEEE maturity in 5 questions. You leave with a score, a formula recommendation, and a starting point to go further."
                  )}
                </p>
                <div className="pt-4 border-t border-white/8">
                  <p className="text-[11px] text-gray-500 mb-4 italic">
                    {tx("Sans inscription. Résultat instantané.", "No sign-up. Instant result.")}
                  </p>
                  <Link
                    href="/reserver?offre=diagnostic-flash"
                    className="inline-flex items-center gap-2 text-[#10B981] hover:text-[#34D399] font-semibold text-sm transition-colors group"
                  >
                    {tx("Lancer le diagnostic", "Start the diagnostic")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </FadeIn>

            {/* 2. Démo conseil (highlighted) */}
            <FadeIn>
              <article className="h-full bg-[#10B981]/10 hover:bg-[#10B981]/15 border-2 border-[#10B981]/50 rounded-2xl p-6 lg:p-7 transition-all duration-300 flex flex-col ring-1 ring-[#10B981]/20">
                <div className="w-12 h-12 rounded-xl bg-[#10B981]/25 flex items-center justify-center mb-5">
                  <Clock className="h-6 w-6 text-[#10B981]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider">
                    {tx("Recommandé", "Recommended")}
                  </span>
                  <span className="text-gray-400 text-[11px]">{tx("30 minutes", "30 minutes")}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {tx("Démo conseil", "Advisory demo")}
                </h3>
                <p className="text-gray-300 text-[13.5px] leading-relaxed mb-5 flex-1">
                  {tx(
                    "Un appel avec un expert GreenTechCycle pour cadrer votre besoin, identifier les leviers de valeur, et vous proposer un plan d'action concret.",
                    "A call with a GreenTechCycle expert to frame your need, identify value levers, and provide a concrete action plan."
                  )}
                </p>
                <div className="pt-4 border-t border-[#10B981]/20">
                  <p className="text-[11px] text-gray-400 mb-4 italic">
                    {tx("Aucun engagement. Restitution écrite envoyée après l'appel.", "No commitment. Written summary sent after the call.")}
                  </p>
                  <Link
                    href="/reserver?offre=demo-conseil"
                    className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10B981]/25 text-sm w-full justify-center"
                  >
                    {tx("Réserver la démo", "Book the demo")}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </FadeIn>

            {/* 3. Pilote Waki Box */}
            <FadeIn>
              <article className="h-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-[#0EA5E9]/40 rounded-2xl p-6 lg:p-7 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/15 flex items-center justify-center mb-5">
                  <Rocket className="h-6 w-6 text-[#0EA5E9]" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#0EA5E9]/15 text-[#67E8F9] text-[10px] font-bold uppercase tracking-wider">
                    {tx("1er mois offert", "1st month free")}
                  </span>
                  <span className="text-gray-500 text-[11px]">{tx("puis 39 € HT/mois", "then €39 HT/mo")}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-snug">
                  {tx("Pilote Waki Box", "Waki Box Pilot")}
                </h3>
                <p className="text-gray-400 text-[13.5px] leading-relaxed mb-5 flex-1">
                  {tx(
                    "Installez votre première box dans un site pilote, testez la collecte connectée, mesurez votre impact sur 3 mois. Désengagement à tout moment.",
                    "Install your first kiosk at a pilot site, test connected collection, measure your impact over 3 months. Cancel anytime."
                  )}
                </p>
                <div className="pt-4 border-t border-white/8">
                  <p className="text-[11px] text-gray-500 mb-4 italic">
                    {tx("Sans frais d'installation. Box installée sous 10 jours.", "No installation fee. Box installed within 10 days.")}
                  </p>
                  <Link
                    href="/reserver?offre=pilote-waki-box"
                    className="inline-flex items-center gap-2 text-[#0EA5E9] hover:text-[#38BDF8] font-semibold text-sm transition-colors group"
                  >
                    {tx("Démarrer le pilote", "Start the pilot")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6e (PILOTE GTC — AUDIT & DÉMARRAGE 3 JOURS)
         ════════════════════════════════════════════════════════════════ */}
      <section
        id="pilote"
        className="relative w-full overflow-hidden bg-[#F8FAFC] py-20 lg:py-28"
        aria-labelledby="pilote-title"
      >
        <GhostNumber n="04" isDark={false} align="right" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-start max-w-6xl">
            <FadeIn>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#047857]">
                    {tx("Porte d'entrée 4", "Entry point 4")}
                  </span>
                  <span className="h-px flex-1 bg-[#10B981]/30" aria-hidden="true" />
                </div>

                <h2
                  id="pilote-title"
                  className="text-[#0F172A] font-bold tracking-tight mb-6"
                  style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
                >
                  {tx(
                    "Pilote GTC - Audit & démarrage 3 jours.",
                    "GTC Pilot - Audit & 3-day kickoff."
                  )}
                </h2>

                <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-5">
                  {tx(
                    "Avant de s'engager sur douze mois, certaines organisations préfèrent mesurer concrètement la valeur GTC sur leur propre parc. Le Pilote GTC répond à ce besoin : trois jours, une équipe senior, un livrable structuré.",
                    "Before committing to twelve months, some organisations prefer to measure GTC's value concretely against their own fleet. The GTC Pilot meets that need: three days, a senior team, a structured deliverable."
                  )}
                </p>
                <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-5">
                  {tx(
                    "Le diagnostic couvre la découverte de parc (asset discovery et notation d'obsolescence), la rédaction d'un plan d'action ITAD priorisé, le lancement de la Plateforme (paramétrage de la premiere branche), et une restitution écrite. Mission conduite par notre équipe ITAM, carbone et cyber.",
                    "The diagnostic covers fleet discovery (asset discovery and obsolescence scoring), drafting a prioritised ITAD action plan, Platform kickoff (first branch configuration), and a written debrief. Delivered by our ITAM, carbon and cyber team."
                  )}
                </p>
                <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-8">
                  {tx(
                    "Le Pilote se déroule sur site ou en hybride selon la taille du parc. A l'issue des trois jours, vous disposez d'une feuille de route signée, prête à présenter en comité de direction.",
                    "The Pilot takes place on site or in hybrid mode depending on fleet size. After three days, you have a signed roadmap, ready to present to your executive committee."
                  )}
                </p>

                {/* Livrables */}
                <div className="mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-4">
                    {tx("Inclus dans la mission", "Included in the engagement")}
                  </p>
                  <ul className="space-y-3">
                    {tx(
                      [
                        "Audit inventaire : asset discovery + notation d'obsolescence",
                        "Plan d'action ITAD personnalise et priorisé",
                        "Démarrage Plateforme : paramétrage de la premiere branche",
                        "Restitution écrite remise sous 5 jours ouvrés",
                      ],
                      [
                        "Inventory audit: asset discovery + obsolescence scoring",
                        "Personalised and prioritised ITAD action plan",
                        "Platform kickoff: first branch configuration",
                        "Written debrief delivered within 5 business days",
                      ]
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-gray-700 leading-snug">
                        <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prix + CTA */}
                <div className="flex flex-wrap items-end gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      {tx("Mission forfaitaire", "Fixed-fee engagement")}
                    </span>
                    <span className="text-4xl lg:text-5xl font-black tracking-tight leading-none tabular-nums text-[#10B981]">
                      2 900 <span className="text-lg font-semibold opacity-80">€ HT</span>
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      {tx("pour 3 jours", "for 3 days")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      {tx("Paiement", "Payment")}
                    </span>
                    <span className="text-xl font-bold text-[#0F172A]">
                      {tx("100 % a la signature", "100% on signing")}
                    </span>
                  </div>
                </div>

                <Link
                  href="/reserver?offre=pilote-audit-3j"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
                >
                  {tx("Réserver le Pilote 3 jours", "Book the 3-day Pilot")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="space-y-5 lg:pt-16">
                {/* Encart remboursement vert */}
                <div className="rounded-2xl bg-[#10B981] p-6 lg:p-7 text-white">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
                      {tx("Garantie de valeur", "Value guarantee")}
                    </p>
                  </div>
                  <p className="text-white font-bold text-[1.1rem] leading-snug mb-3">
                    {tx(
                      "Pilote remboursé sur la 1re année de Plateforme si signature dans les 90 jours après la restitution.",
                      "Pilot fully refunded on Year 1 Platform subscription if signed within 90 days of debrief."
                    )}
                  </p>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {tx(
                      "2 900 € HT déduits automatiquement de la premiere facture annuelle Plateforme. Aucune démarche supplémentaire.",
                      "€2,900 ex-VAT automatically deducted from the first annual Platform invoice. No extra steps needed."
                    )}
                  </p>
                </div>

                {/* Sous-titre mission senior */}
                <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6 lg:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 mb-3">
                    {tx("Composition de la mission", "Engagement composition")}
                  </p>
                  <p className="text-[14.5px] text-gray-600 leading-[1.78]">
                    {tx(
                      "Jour 1 : Audit inventaire et notation d'obsolescence. Jour 2 : Plan ITAD priorisé + kick-off Plateforme. Jour 3 : Restitution orale et remise du livrable écrit. Equipe : un senior ITAM, un expert carbone, un consultant cyber.",
                      "Day 1: Inventory audit and obsolescence scoring. Day 2: Prioritised ITAD plan + Platform kickoff. Day 3: Oral debrief and written deliverable handover. Team: one senior ITAM, one carbon expert, one cyber consultant."
                    )}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SÉPARATION VISUELLE, transition vers sur-devis
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-gradient-to-b from-white via-[#F1F5F9] to-[#0F1115] py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-sm font-semibold text-[#0F172A]">
                {tx(
                  "Au-delà de Waki Box : Plateforme et Service ITAD, étude personnalisée",
                  "Beyond Waki Box: Platform and ITAD Service, bespoke study"
                )}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S7 (PLATEFORME & ITAD SUR DEVIS) fond #0F1115, cartes éditoriales
         ════════════════════════════════════════════════════════════════ */}
      <section
        id="sur-devis"
        className="relative w-full overflow-hidden bg-[#0F1115] py-20 lg:py-28"
      >
        <GhostNumber n="07" isDark={true} align="left" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(16,185,129,0.10) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-4">
                {tx("Étude personnalisée, ancres établies", "Bespoke study, anchors established")}
              </p>
              <h2
                className="text-white font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "Plateforme et Service ITAD, étude personnalisée.",
                  "Platform and ITAD Service, bespoke study."
                )}
              </h2>
              <p className="text-gray-300 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Ancres de départ : Plateforme à partir de 2 500 € HT/mois (base 500 postes), ITAD à partir de 15 € HT/poste. Trente minutes de cadrage pour caler le devis sur votre parc et vos contraintes, livré sous 48 heures.",
                  "Starting anchors: Platform from €2,500 HT/month (base 500 devices), ITAD from €15 HT/device. Thirty minutes to scope the quote to your fleet and constraints, delivered within 48 hours."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl">
            {devisCards.map((card) => {
              const CardIcon = card.icon;
              return (
                <FadeIn key={card.slug}>
                  <article className="group relative h-full bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300">
                    {/* Photo */}
                    <div className="relative aspect-[16/8] overflow-hidden">
                      <Image
                        src={card.photo}
                        alt={card.photoAlt}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115]/85 via-[#0F1115]/40 to-transparent" />
                      <div
                        className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
                        style={{ backgroundColor: `${card.accent}E6` }}
                      >
                        <CardIcon className="h-4 w-4 text-white" aria-hidden="true" />
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                          {card.kicker}
                        </span>
                      </div>
                      <span
                        className="absolute top-5 right-5 px-3 py-1.5 rounded-full backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider"
                        style={{ backgroundColor: `${card.accent}CC`, border: `1px solid ${card.accent}` }}
                      >
                        {card.priceBadge}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 lg:p-8">
                      <h3 className="text-2xl lg:text-[1.7rem] font-bold text-white tracking-tight leading-tight mb-3">
                        {card.title}
                      </h3>
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-sm font-bold"
                        style={{ color: card.accent, backgroundColor: `${card.accent}18`, border: `1px solid ${card.accent}40` }}
                      >
                        {card.anchorNote}
                      </div>
                      <p className="text-gray-300 text-[14.5px] leading-[1.78] mb-6">
                        {card.body}
                      </p>

                      <ul className="space-y-2.5 mb-8 pb-8 border-b border-white/10">
                        {card.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-3 text-[13.5px] text-gray-400 leading-snug">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: card.accent }} aria-hidden="true" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          href={card.ctaHref}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                          style={{ backgroundColor: card.accent, boxShadow: `0 4px 16px ${card.accent}30` }}
                        >
                          {card.ctaLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          href={card.secondaryHref}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 transition-colors"
                        >
                          {card.secondaryLabel}
                        </Link>
                      </div>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {/* ITAD service quick nav */}
          <FadeIn>
            <div className="mt-14 max-w-6xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
                {tx("Cinq missions ITAD couvertes", "Five ITAD engagements covered")}
              </p>
              <div className="flex flex-wrap gap-2">
                {itadServices.map((svc) => {
                  const SvcIcon = svc.icon;
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#10B981]/40 text-[12px] font-semibold text-gray-300 hover:text-white transition-all"
                    >
                      <SvcIcon className="h-3.5 w-3.5 text-[#6EE7B7]" aria-hidden="true" />
                      {svc.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S8 (FAQ TARIFAIRE) fond blanc
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <GhostNumber n="08" isDark={false} align="left" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-[#047857]" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857]">
                  {tx("Questions fréquentes", "Frequently asked questions")}
                </p>
              </div>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-12"
                style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", lineHeight: 1.1 }}
              >
                {tx(
                  "Tarifs publics, devis sur mesure, engagement clair.",
                  "Public pricing, tailored quotes, clear commitments."
                )}
              </h2>

              <div>
                {faqItems.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S9 (CTA DOUBLE FINAL + CROSS-LINKS) fond #10B981
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#10B981]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(255,255,255,0.25) 0%, transparent 55%)",
          }}
        />

        <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2
                className="text-white font-black tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Prêt à passer à l'action ?", "Ready to take the next step?")}
              </h2>
              <p className="text-white/90 text-[1.05rem] lg:text-[1.15rem] leading-[1.65] max-w-2xl mx-auto mb-10">
                {tx(
                  "Réservez Waki Box dès aujourd'hui, ou demandez un devis Plateforme / ITAD sous 48 heures.",
                  "Book Waki Box today, or request a Platform / ITAD quote within 48 hours."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/reserver?offre=waki-box-confort"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F1115] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {tx("Réserver Waki Box", "Book Waki Box")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=demo-conseil"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {tx("Demander un devis", "Request a quote")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Cross-links */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 mt-10 text-white/85 text-[13px]">
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center gap-1.5 hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {tx("Voir 8 cas clients chiffrés", "See 8 quantified client cases")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <span className="text-white/40" aria-hidden="true">·</span>
                <Link
                  href="/secteurs"
                  className="inline-flex items-center gap-1.5 hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {tx("Explorer 16 fiches sectorielles", "Explore 16 sector profiles")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <span className="text-white/40" aria-hidden="true">·</span>
                <Link
                  href="/plateforme"
                  className="inline-flex items-center gap-1.5 hover:text-white underline-offset-4 hover:underline transition-colors"
                >
                  {tx("Découvrir la plateforme", "Discover the platform")}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust line */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-10 text-white/80 text-xs">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("Réponse sous 24 heures ouvrées", "Response within 24 business hours")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("NDA signé sur demande", "NDA signed on request")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("Aucun engagement avant signature", "No commitment before signing")}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
