"use client";

/**
 * /tarifs — Refonte premium : tarifs chiffrés Waki Box + services ITAD sur devis
 *
 * Architecture :
 *   S1  Hero split sombre
 *   S2  Plans Waki Box (Essentiel · Confort · Premium) — prose asymétrique
 *   S3  Programme pilote — encart #10B981
 *   S4  Tableau comparatif Waki Box — 10 critères
 *   S5  Modules complémentaires Waki Box — liste éditoriale
 *   ──  Séparation visuelle nette
 *   S6  Services ITAD — sur devis, sans prix
 *   S7  FAQ tarifaire — 8 questions
 *   S8  CTA double final
 */

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  HelpCircle,
  ChevronDown,
  Rocket,
  Users,
  Building2,
  ClipboardList,
  Sparkles,
  ShieldCheck,
  FileCheck,
  Leaf,
  Award,
  X,
  Search,
  RefreshCcw,
  Recycle,
  Lock,
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

/* ── Check / Cross cell ──────────────────────────────────────────────────── */
function CellCheck({ ok, label }: { ok: boolean | string; label?: string }) {
  if (typeof ok === "string")
    return (
      <span className="text-sm font-semibold text-[#0F172A]">{ok}</span>
    );
  return ok ? (
    <CheckCircle2 className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
  ) : (
    <X className="h-5 w-5 text-gray-300" aria-hidden="true" />
  );
}

export default function TarifsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }

  /* ── Plans data ────────────────────────────────────────────────────────── */
  const plans = [
    {
      slug: "waki-box-essentiel",
      num: "01",
      name: "Essentiel",
      icon: Rocket,
      audience: tx(
        "TPE / PME — 10 à 50 collaborateurs",
        "SMB — 10 to 50 employees"
      ),
      price: "39",
      setup: "150",
      engagement: tx("12 mois", "12 months"),
      tagline: tx(
        "Une seule box, une seule console, un premier pas vers la traçabilité DEEE sans complexité.",
        "One box, one console, a first step toward WEEE traceability without complexity."
      ),
      features: tx(
        [
          "1 borne WakiBox installée et configurée",
          "Plateforme de suivi basique — 1 utilisateur",
          "Rapport trimestriel de flux DEEE",
          "Support par courriel — J+2",
        ],
        [
          "1 WakiBox kiosk installed and configured",
          "Basic monitoring platform — 1 user",
          "Quarterly WEEE flow report",
          "Email support — D+2",
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
        "PME / ETI — 50 à 300 collaborateurs",
        "Mid-market — 50 to 300 employees"
      ),
      price: "79",
      setup: "290",
      engagement: tx("12 mois", "12 months"),
      tagline: tx(
        "Jusqu'à trois bornes, cinq utilisateurs, des alertes temps réel et un export CSRD prêt à signer — le plan que choisissent huit clients sur dix.",
        "Up to three kiosks, five users, real-time alerts and a CSRD export ready to sign — the plan eight out of ten clients choose."
      ),
      features: tx(
        [
          "Jusqu'à 3 bornes WakiBox",
          "Plateforme complète — 5 utilisateurs",
          "Rapport mensuel + export CSRD ESRS E5",
          "Alertes de remplissage en temps réel",
          "Support prioritaire — J+1",
        ],
        [
          "Up to 3 WakiBox kiosks",
          "Full platform — 5 users",
          "Monthly report + CSRD ESRS E5 export",
          "Real-time fill alerts",
          "Priority support — D+1",
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
        "ETI / grands comptes — 300+ collaborateurs",
        "Enterprise — 300+ employees"
      ),
      price: tx("dès 149", "from 149"),
      setup: tx("490 / borne", "490 / kiosk"),
      engagement: tx("24 mois", "24 months"),
      tagline: tx(
        "Bornes illimitées, multi-sites, un responsable de compte dédié, une intégration ERP/SIRH par API et un SLA de collecte à 48 heures — pour les organisations qui ne transigent pas.",
        "Unlimited kiosks, multi-site, a dedicated account manager, ERP/HRIS integration via API and a 48-hour collection SLA — for organisations that don't compromise."
      ),
      features: tx(
        [
          "Bornes illimitées, multi-sites",
          "Responsable de compte dédié",
          "Intégration ERP / SIRH par API",
          "SLA collecte 48 h garanti",
          "Support dédié — SLA 4 h",
        ],
        [
          "Unlimited kiosks, multi-site",
          "Dedicated account manager",
          "ERP / HRIS integration via API",
          "48h collection SLA guaranteed",
          "Dedicated support — 4h SLA",
        ]
      ),
      accent: "#F59E0B",
    },
  ];

  /* ── Comparison table ──────────────────────────────────────────────────── */
  const comparisonRows: {
    label: string;
    essentiel: boolean | string;
    confort: boolean | string;
    premium: boolean | string;
  }[] = tx(
    [
      { label: "Bornes WakiBox incluses", essentiel: "1", confort: "Jusqu'à 3", premium: "Illimitées" },
      { label: "Collectes planifiées / mois", essentiel: "1", confort: "2", premium: "Illimité" },
      { label: "Utilisateurs plateforme", essentiel: "1", confort: "5", premium: "Illimité" },
      { label: "Télémétrie LoRaWAN temps réel", essentiel: false, confort: true, premium: true },
      { label: "Alertes de remplissage", essentiel: false, confort: true, premium: true },
      { label: "Rapports CSRD ESRS E5", essentiel: false, confort: true, premium: true },
      { label: "Intégration ERP / SIRH par API", essentiel: false, confort: false, premium: true },
      { label: "Responsable de compte dédié", essentiel: false, confort: false, premium: true },
      { label: "SLA collecte 48 h garanti", essentiel: false, confort: false, premium: true },
      { label: "Support", essentiel: "Courriel J+2", confort: "Prioritaire J+1", premium: "Dédié SLA 4 h" },
    ],
    [
      { label: "WakiBox kiosks included", essentiel: "1", confort: "Up to 3", premium: "Unlimited" },
      { label: "Scheduled collections / month", essentiel: "1", confort: "2", premium: "Unlimited" },
      { label: "Platform users", essentiel: "1", confort: "5", premium: "Unlimited" },
      { label: "Real-time LoRaWAN telemetry", essentiel: false, confort: true, premium: true },
      { label: "Fill-level alerts", essentiel: false, confort: true, premium: true },
      { label: "CSRD ESRS E5 reports", essentiel: false, confort: true, premium: true },
      { label: "ERP / HRIS integration via API", essentiel: false, confort: false, premium: true },
      { label: "Dedicated account manager", essentiel: false, confort: false, premium: true },
      { label: "48h collection SLA guaranteed", essentiel: false, confort: false, premium: true },
      { label: "Support", essentiel: "Email D+2", confort: "Priority D+1", premium: "Dedicated 4h SLA" },
    ]
  );

  /* ── Add-ons ───────────────────────────────────────────────────────────── */
  const addons = [
    {
      slug: "box-supplementaire",
      name: tx("Box supplémentaire", "Additional box"),
      desc: tx(
        "Étendez votre maillage avec une borne supplémentaire, installée et connectée à votre plateforme existante.",
        "Expand your coverage with an additional kiosk, installed and connected to your existing platform."
      ),
      price: tx("29 € HT/mois", "€29 ex-VAT/month"),
    },
    {
      slug: "collecte-urgence",
      name: tx("Collecte d'urgence", "Emergency collection"),
      desc: tx(
        "Intervention sous 24 heures ouvrées pour un enlèvement non planifié — idéal en cas de déménagement ou de fermeture de site.",
        "Intervention within 24 business hours for an unplanned pickup — ideal for relocations or site closures."
      ),
      price: tx("90 € HT", "€90 ex-VAT"),
    },
    {
      slug: "animation-semaine-recyclage",
      name: tx("Animation Semaine du recyclage", "Recycling Week facilitation"),
      desc: tx(
        "Un animateur certifié sur site pour sensibiliser vos équipes avec ateliers pratiques et supports personnalisés.",
        "A certified facilitator on-site to raise awareness among your teams with hands-on workshops and custom materials."
      ),
      price: tx("350 € HT/jour", "€350 ex-VAT/day"),
    },
    {
      slug: "rapport-csrd-dedie",
      name: tx("Rapport CSRD dédié", "Dedicated CSRD report"),
      desc: tx(
        "Un rapport annuel ESRS E5 clé en main, aligné avec les exigences de la CSRD, prêt à intégrer dans votre déclaration extra-financière.",
        "A turnkey annual ESRS E5 report, aligned with CSRD requirements, ready to include in your non-financial statement."
      ),
      price: tx("490 € HT/an", "€490 ex-VAT/year"),
    },
    {
      slug: "kit-comm-customise",
      name: tx("Kit communication personnalisé", "Custom communications kit"),
      desc: tx(
        "Affiches, stickers et signalétique aux couleurs de votre entreprise pour maximiser l'adoption de la borne.",
        "Posters, stickers and signage in your company colours to maximise kiosk adoption."
      ),
      price: tx("290 € HT", "€290 ex-VAT"),
    },
    {
      slug: "audit-deee",
      name: tx("Audit DEEE complet", "Full WEEE audit"),
      desc: tx(
        "Cartographie exhaustive de vos flux de déchets électroniques, identification des gisements et recommandations d'optimisation.",
        "Comprehensive mapping of your e-waste flows, identification of deposits and optimisation recommendations."
      ),
      price: tx("1 500 € HT/jour", "€1,500 ex-VAT/day"),
    },
    {
      slug: "formation-equipes",
      name: tx("Formation équipes", "Team training"),
      desc: tx(
        "Session de deux heures pour vos référents internes : bonnes pratiques de tri, réglementation DEEE, utilisation optimale de la plateforme.",
        "Two-hour session for your internal champions: sorting best practices, WEEE regulations, optimal platform usage."
      ),
      price: tx("450 € HT / 2 h", "€450 ex-VAT / 2h"),
    },
  ];

  /* ── ITAD services ─────────────────────────────────────────────────────── */
  const itadServices = [
    {
      slug: "audit-inventaire",
      icon: Search,
      name: tx("Audit et inventaire de parc", "Fleet audit and inventory"),
      desc: tx(
        "Cartographie complète de vos actifs informatiques — serveurs, postes, périphériques — avec évaluation de l'état, de la valeur résiduelle et des risques de non-conformité.",
        "Complete mapping of your IT assets — servers, workstations, peripherals — with condition assessment, residual value evaluation and non-compliance risk analysis."
      ),
    },
    {
      slug: "effacement-securise",
      icon: Lock,
      name: tx("Effacement sécurisé certifié", "Certified secure erasure"),
      desc: tx(
        "Destruction logique des données conforme NIST 800-88 avec certificat unitaire par support. Traçabilité garantie, conformité RGPD et NIS 2.",
        "Logical data destruction compliant with NIST 800-88 with per-media certificate. Guaranteed traceability, GDPR and NIS 2 compliance."
      ),
    },
    {
      slug: "reconditionnement-valorisation",
      icon: RefreshCcw,
      name: tx("Reconditionnement et valorisation", "Refurbishment and value recovery"),
      desc: tx(
        "Remise en état, tests fonctionnels et revente sur les marchés secondaires. Maximisation de la valeur résiduelle et allongement de la durée de vie des équipements.",
        "Restoration, functional testing and resale on secondary markets. Residual value maximisation and equipment lifespan extension."
      ),
    },
    {
      slug: "recyclage-deee",
      icon: Recycle,
      name: tx("Recyclage DEEE réglementaire", "Regulatory WEEE recycling"),
      desc: tx(
        "Collecte, tri et recyclage conforme à la directive européenne DEEE. Bordereaux de suivi des déchets et certificats de destruction fournis.",
        "Collection, sorting and recycling compliant with the European WEEE directive. Waste tracking slips and destruction certificates provided."
      ),
    },
    {
      slug: "cybersecurite",
      icon: ShieldCheck,
      name: tx("Cybersécurité ITAD", "ITAD cybersecurity"),
      desc: tx(
        "Audit de vos processus de décommissionnement, identification des failles de sécurité et mise en place de protocoles conformes aux standards ISO 27001.",
        "Audit of your decommissioning processes, identification of security gaps and implementation of ISO 27001-compliant protocols."
      ),
    },
  ];

  /* ── FAQ ────────────────────────────────────────────────────────────────── */
  const faqItems = tx(
    [
      { q: "Les prix affichés sont-ils HT ou TTC ?", a: "Tous les prix sont exprimés hors taxes (HT). La TVA applicable en France métropolitaine est de 20 %. Les factures mentionnent le montant HT, la TVA et le total TTC." },
      { q: "Puis-je résilier avant la fin de mon engagement ?", a: "L'engagement initial (12 ou 24 mois selon le plan) est ferme. Au-delà, le contrat est reconduit tacitement par période de 12 mois, résiliable avec un préavis de 3 mois avant chaque échéance." },
      { q: "Les tarifs sont-ils indexés ?", a: "Une indexation annuelle est prévue, plafonnée à 3 % et basée sur l'indice INSEE des prix à la consommation. Toute révision est notifiée 60 jours avant application." },
      { q: "Quels modes de paiement acceptez-vous ?", a: "Prélèvement SEPA (recommandé), carte bancaire et virement. Le prélèvement SEPA est mis en place lors de la signature du contrat pour un règlement automatique mensuel." },
      { q: "Existe-t-il des remises pour les grands volumes ?", a: "Oui. Le plan Premium intègre des conditions tarifaires dégressives à partir de dix bornes. Contactez-nous pour un devis personnalisé incluant la volumétrie exacte." },
      { q: "Le programme pilote engage-t-il au-delà de 6 mois ?", a: "Non. À l'issue des 6 mois au tarif pilote, vous basculez sur le plan Essentiel ou Confort aux conditions standard. Aucun engagement supplémentaire n'est imposé automatiquement." },
      { q: "Pourquoi les services ITAD sont-ils sur devis ?", a: "Chaque mission ITAD dépend du volume d'équipements, du type de matériel, du niveau de sécurité exigé et des contraintes réglementaires spécifiques. Un tarif forfaitaire ne refléterait pas la réalité de votre besoin. Nous préférons vous remettre un devis ajusté sous 48 heures." },
      { q: "Puis-je combiner Waki Box et services ITAD ?", a: "Absolument. De nombreux clients associent un plan Waki Box pour la collecte au quotidien avec des missions ITAD ponctuelles (audit de parc, effacement certifié, reconditionnement). Les deux s'articulent dans une seule relation contractuelle." },
    ],
    [
      { q: "Are prices shown ex-VAT or inc-VAT?", a: "All prices are shown excluding VAT (ex-VAT). The applicable VAT rate in mainland France is 20%. Invoices detail the ex-VAT amount, VAT and total inc-VAT." },
      { q: "Can I cancel before the end of my commitment?", a: "The initial commitment (12 or 24 months depending on plan) is firm. After that, the contract auto-renews for 12-month periods, cancellable with 3 months' notice before each renewal date." },
      { q: "Are prices indexed?", a: "Annual indexation is capped at 3%, based on the INSEE consumer price index. Any revision is notified 60 days before application." },
      { q: "What payment methods do you accept?", a: "SEPA direct debit (recommended), credit card and wire transfer. SEPA direct debit is set up at contract signing for automatic monthly billing." },
      { q: "Are volume discounts available?", a: "Yes. The Premium plan includes tiered pricing from ten kiosks upward. Contact us for a custom quote with your exact volume." },
      { q: "Does the pilot programme commit me beyond 6 months?", a: "No. At the end of the 6-month pilot rate, you switch to the standard Essentiel or Confort plan. No additional commitment is imposed automatically." },
      { q: "Why are ITAD services quoted individually?", a: "Each ITAD engagement depends on equipment volume, hardware type, required security level and specific regulatory constraints. A flat rate wouldn't reflect the reality of your needs. We prefer to deliver a tailored quote within 48 hours." },
      { q: "Can I combine Waki Box and ITAD services?", a: "Absolutely. Many clients pair a Waki Box plan for day-to-day collection with one-off ITAD engagements (fleet audit, certified erasure, refurbishment). Both fit within a single contractual relationship." },
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
          S1 — HERO ÉDITORIAL — split sombre #0F172A
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[72vh] flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
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

        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                {tx("Tarifs Waki Box", "Waki Box pricing")}
              </span>
            </div>

            <h1
              id="tarifs-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {tx(
                <>Tarifs transparents,<br /><span className="text-[#10B981]">sans engagement caché.</span></>,
                <>Transparent pricing,<br /><span className="text-[#10B981]">no hidden commitment.</span></>
              )}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.12rem] leading-[1.72] max-w-xl mb-10">
              {tx(
                "Trois plans adaptés à votre taille, un programme pilote pour démarrer en douceur et sept modules complémentaires à la carte. Services ITAD chiffrés sur devis.",
                "Three plans tailored to your size, a pilot programme to get started smoothly and seven à la carte add-on modules. ITAD services quoted individually."
              )}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {[
                { v: "3", l: tx("plans Waki Box", "Waki Box plans"), color: "#10B981" },
                { v: "1", l: tx("programme pilote", "pilot programme"), color: "#0EA5E9" },
                { v: "7", l: tx("modules complémentaires", "add-on modules"), color: "#F59E0B" },
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
                {tx("Voir les tarifs", "View pricing")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#itad"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {tx("Services ITAD — sur devis", "ITAD services — custom quote")}
              </a>
            </div>
          </FadeIn>
        </div>

        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/service-wakibox.jpg"
            alt={tx(
              "Borne WakiBox de collecte connectée en entreprise",
              "WakiBox connected collection kiosk in a workplace"
            )}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />
        </div>
      </section>

      {/* Certifications band */}
      <section className="bg-[#0F172A] py-8 border-t border-white/5">
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
          S2 — 3 PLANS WAKI BOX — composition éditoriale asymétrique
         ════════════════════════════════════════════════════════════════ */}
      <div id="plans">
        {plans.map((plan, i) => {
          const isDark = i === 1;
          const bgClass = isDark ? "bg-[#0F172A]" : i === 2 ? "bg-[#F8FAFC]" : "bg-white";
          const textColor = isDark ? "text-white" : "text-[#0F172A]";
          const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
          const Icon = plan.icon;

          return (
            <section
              key={plan.slug}
              className={`relative w-full overflow-hidden ${bgClass} py-20 lg:py-28`}
              aria-labelledby={`plan-title-${plan.slug}`}
            >
              <GhostNumber n={plan.num} isDark={isDark} align={i % 2 === 0 ? "right" : "left"} />

              <div className="container mx-auto px-4 relative z-10">
                <div className={`max-w-4xl ${i % 2 !== 0 ? "ml-auto" : ""}`}>
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

                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${plan.accent}18` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: plan.accent }} aria-hidden="true" />
                      </div>
                      <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {plan.audience}
                      </span>
                    </div>

                    <h2
                      id={`plan-title-${plan.slug}`}
                      className={`font-bold tracking-tight mb-4 ${textColor}`}
                      style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
                    >
                      {plan.name}
                    </h2>

                    <p className={`text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-8 max-w-3xl ${subTextColor}`}>
                      {plan.tagline}
                    </p>

                    {/* Prix */}
                    <div className={`flex flex-wrap items-end gap-8 mb-8 pb-8 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
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
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                          {tx("Mise en service", "Installation")}
                        </span>
                        <span className={`text-xl font-bold ${textColor}`}>
                          {plan.setup} <span className="text-sm font-medium opacity-70">€ HT</span>
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
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
                      {tx("Réserver ce plan", "Book this plan")}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </FadeIn>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S3 — PROGRAMME PILOTE — fond #10B981
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
          <FadeIn>
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-5 w-5 text-white/80" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
                  {tx("Programme pilote", "Pilot programme")}
                </span>
              </div>

              <h2
                className="text-white font-black tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "19 € HT/mois pendant 6 mois. Mise en service offerte.",
                  "€19 ex-VAT/month for 6 months. Installation included."
                )}
              </h2>

              <p className="text-white/90 text-[1.05rem] lg:text-[1.15rem] leading-[1.65] max-w-2xl mb-6">
                {tx(
                  "Réservé aux trois premiers signataires. Une borne installée, la plateforme complète, six mois pour mesurer l'impact avant de s'engager sur un plan standard.",
                  "Reserved for the first three signers. One installed kiosk, the full platform, six months to measure the impact before committing to a standard plan."
                )}
              </p>

              <ul className="space-y-2 mb-10">
                {tx(
                  [
                    "Mise en service offerte (valeur 150 €)",
                    "19 € HT/mois au lieu de 39 € pendant 6 mois",
                    "Bascule automatique vers le plan Essentiel ou Confort à l'issue",
                    "Aucun engagement supplémentaire",
                  ],
                  [
                    "Free installation (worth €150)",
                    "€19 ex-VAT/month instead of €39 for 6 months",
                    "Automatic switch to Essentiel or Confort plan afterwards",
                    "No additional commitment",
                  ]
                ).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/95 text-[15px] leading-snug">
                    <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/reserver?offre=waki-box-pilote"
                className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                {tx("Lancer un pilote", "Start a pilot")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S4 — TABLEAU COMPARATIF WAKI BOX — fond #F8FAFC
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#F8FAFC] py-20 lg:py-28">
        <GhostNumber n="05" isDark={false} align="left" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Comparatif détaillé", "Detailed comparison")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Quel plan pour votre organisation ?", "Which plan for your organisation?")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Dix critères essentiels pour comparer en un coup d'œil les trois plans Waki Box.",
                  "Ten key criteria to compare the three Waki Box plans at a glance."
                )}
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="max-w-5xl overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 pr-4 text-sm font-semibold text-gray-500 w-[40%]">
                      {tx("Critère", "Criteria")}
                    </th>
                    <th className="text-center py-4 px-3 w-[20%]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0EA5E9]">Essentiel</span>
                      <span className="block text-lg font-black text-[#0F172A] mt-0.5">39 €</span>
                    </th>
                    <th className="text-center py-4 px-3 w-[20%] relative">
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                        <Sparkles className="h-2.5 w-2.5" aria-hidden="true" />
                        {tx("Le plus choisi", "Most chosen")}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#10B981]">Confort</span>
                      <span className="block text-lg font-black text-[#0F172A] mt-0.5">79 €</span>
                    </th>
                    <th className="text-center py-4 px-3 w-[20%]">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Premium</span>
                      <span className="block text-lg font-black text-[#0F172A] mt-0.5">{tx("dès 149 €", "from €149")}</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-gray-200/80 ${idx % 2 === 0 ? "bg-white/50" : ""}`}
                    >
                      <td className="py-4 pr-4 text-sm font-medium text-[#0F172A]">{row.label}</td>
                      <td className="py-4 px-3 text-center">
                        <div className="flex justify-center">
                          <CellCheck ok={row.essentiel} />
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center bg-[#10B981]/[0.04]">
                        <div className="flex justify-center">
                          <CellCheck ok={row.confort} />
                        </div>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <div className="flex justify-center">
                          <CellCheck ok={row.premium} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="pt-6" />
                    <td className="pt-6 px-3 text-center">
                      <Link
                        href="/reserver?offre=waki-box-essentiel"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0EA5E9] hover:bg-[#0284C7] transition-colors"
                      >
                        {tx("Réserver", "Book")}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                    <td className="pt-6 px-3 text-center">
                      <Link
                        href="/reserver?offre=waki-box-confort"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#10B981] hover:bg-[#0E9F6E] transition-colors"
                      >
                        {tx("Réserver", "Book")}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                    <td className="pt-6 px-3 text-center">
                      <Link
                        href="/reserver?offre=waki-box-premium"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#F59E0B] hover:bg-[#D97706] transition-colors"
                      >
                        {tx("Réserver", "Book")}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 — MODULES COMPLÉMENTAIRES WAKI BOX — fond blanc
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
                {tx("Composez votre offre sur mesure.", "Build your custom offer.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Chaque module se greffe sur n'importe quel plan Waki Box. Facturation unitaire, sans engagement additionnel.",
                  "Each module plugs into any Waki Box plan. Unit billing, no additional commitment."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl space-y-4">
            {addons.map((addon, i) => (
              <FadeIn key={addon.slug}>
                <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-6 lg:px-8 hover:border-[#10B981]/30 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-gray-400 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-semibold text-[#0F172A] text-[15px]">{addon.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed pl-8">
                        {addon.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pl-8 lg:pl-0 flex-shrink-0">
                      <span className="text-lg font-bold text-[#047857] tabular-nums whitespace-nowrap">
                        {addon.price}
                      </span>
                      <Link
                        href={`/reserver?offre=${addon.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#047857]/10 text-[#047857] text-xs font-semibold hover:bg-[#047857]/20 transition-colors whitespace-nowrap"
                      >
                        {tx("Réserver", "Book")}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SÉPARATION VISUELLE — transition entre chiffré et devis
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-gradient-to-b from-white via-[#F1F5F9] to-[#0F172A] py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white shadow-lg shadow-gray-200/50 border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-sm font-semibold text-[#0F172A]">
                {tx(
                  "Ci-dessus : tarifs chiffrés Waki Box — Ci-dessous : services ITAD sur devis",
                  "Above: Waki Box fixed pricing — Below: ITAD services quoted individually"
                )}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 — SERVICES ITAD — SUR DEVIS — fond #0F172A
         ════════════════════════════════════════════════════════════════ */}
      <section id="itad" className="relative w-full overflow-hidden bg-[#0F172A] py-20 lg:py-28">
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
            <div className="max-w-3xl mb-14">
              <div className="flex items-center gap-3 mb-6">
                <ClipboardList className="h-5 w-5 text-[#6EE7B7]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7]">
                  {tx("Services ITAD — sur devis", "ITAD services — custom quote")}
                </span>
              </div>

              <h2
                className="text-white font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "Audit, effacement, reconditionnement, recyclage.",
                  "Audit, erasure, refurbishment, recycling."
                )}
              </h2>

              <p className="text-gray-300 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "La tarification de nos services ITAD est adaptée au volume, à la complexité et aux contraintes réglementaires de chaque mission. Un devis détaillé vous est remis sous 48 heures.",
                  "ITAD service pricing is tailored to the volume, complexity and regulatory constraints of each engagement. A detailed quote is delivered within 48 hours."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl space-y-5">
            {itadServices.map((svc) => {
              const SvcIcon = svc.icon;
              return (
                <FadeIn key={svc.slug}>
                  <div className="bg-white/[0.06] hover:bg-white/[0.09] border border-white/10 hover:border-[#10B981]/30 rounded-2xl p-6 lg:px-8 transition-all duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#10B981]/15 flex-shrink-0">
                        <SvcIcon className="h-5 w-5 text-[#6EE7B7]" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-[16px] mb-2">{svc.name}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{svc.desc}</p>
                        <Link
                          href={`/contact?offre=${svc.slug}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors border border-white/15 hover:border-white/25"
                        >
                          {tx("Demander un devis", "Request a quote")}
                          <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S7 — FAQ TARIFAIRE — fond blanc
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
                {tx("Facturation, engagement, paiement : tout est clair.", "Billing, commitment, payment: everything is clear.")}
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
          S8 — CTA DOUBLE FINAL — fond #10B981
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
                  "Trente minutes avec un expert senior. Un plan d'action chiffré sous 48 heures.",
                  "Thirty minutes with a senior expert. A quoted action plan within 48 hours."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/reserver?offre=waki-box-confort"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {tx("Réserver Waki Box", "Book Waki Box")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact?offre=audit-inventaire"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {tx("Demander un devis ITAD", "Request an ITAD quote")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 mt-12 text-white/80 text-xs">
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
