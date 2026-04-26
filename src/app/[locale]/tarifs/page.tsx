"use client";

/**
 * /tarifs — Grille tarifaire Waki Box + services ITAD
 * 3 plans (Essentiel, Confort, Premium) + programme pilote + add-ons + renvoi ITAD + FAQ
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

export default function TarifsPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }

  /* ── Data ─────────────────────────────────────────────────────────────── */
  const plans = [
    {
      slug: "waki-box-essentiel",
      num: "01",
      name: "Essentiel",
      icon: Rocket,
      audience: tx("TPE / PME — 10 à 50 collaborateurs", "SMB — 10 to 50 employees"),
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
      audience: tx("PME / ETI — 50 à 300 collaborateurs", "Mid-market — 50 to 300 employees"),
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
      audience: tx("ETI / grands comptes — 300+ collaborateurs", "Enterprise — 300+ employees"),
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

  const addons = [
    { slug: "box-supplementaire", name: tx("Box supplémentaire", "Additional box"), price: "29 € HT/mois" },
    { slug: "collecte-urgence", name: tx("Collecte d'urgence", "Emergency collection"), price: "90 € HT" },
    { slug: "animation-recyclage", name: tx("Animation Semaine du recyclage", "Recycling Week facilitation"), price: tx("350 € HT/jour", "€350 ex-VAT/day") },
    { slug: "rapport-csrd", name: tx("Rapport CSRD dédié", "Dedicated CSRD report"), price: tx("490 € HT/an", "€490 ex-VAT/year") },
    { slug: "kit-comm", name: tx("Kit communication personnalisé", "Custom communications kit"), price: "290 € HT" },
    { slug: "audit-deee", name: tx("Audit DEEE complet", "Full WEEE audit"), price: tx("1 500 € HT/jour", "€1,500 ex-VAT/day") },
    { slug: "formation", name: tx("Formation équipes", "Team training"), price: tx("450 € HT / 2 h", "€450 ex-VAT / 2h") },
  ];

  const faqItems = tx(
    [
      { q: "Les prix affichés sont-ils HT ou TTC ?", a: "Tous les prix sont exprimés hors taxes (HT). La TVA applicable en France métropolitaine est de 20 %. Les factures mentionnent le montant HT, la TVA et le total TTC." },
      { q: "Puis-je résilier avant la fin de mon engagement ?", a: "L'engagement initial (12 ou 24 mois selon le plan) est ferme. Au-delà, le contrat est reconduit tacitement par période de 12 mois, résiliable avec un préavis de 3 mois avant chaque échéance." },
      { q: "Les tarifs sont-ils indexés ?", a: "Une indexation annuelle est prévue, plafonnée à 3 % et basée sur l'indice INSEE des prix à la consommation. Toute révision est notifiée 60 jours avant application." },
      { q: "Quels modes de paiement acceptez-vous ?", a: "Prélèvement SEPA (recommandé), carte bancaire et virement. Le prélèvement SEPA est mis en place lors de la signature du contrat pour un règlement automatique mensuel." },
      { q: "Existe-t-il des remises pour les grands volumes ?", a: "Oui. Le plan Premium intègre des conditions tarifaires dégressives à partir de dix bornes. Contactez-nous pour un devis personnalisé incluant la volumétrie exacte." },
      { q: "Le programme pilote engage-t-il au-delà de 6 mois ?", a: "Non. À l'issue des 6 mois au tarif pilote, vous basculez sur le plan Essentiel ou Confort aux conditions standard. Aucun engagement supplémentaire n'est imposé automatiquement." },
    ],
    [
      { q: "Are prices shown ex-VAT or inc-VAT?", a: "All prices are shown excluding VAT (ex-VAT). The applicable VAT rate in mainland France is 20%. Invoices detail the ex-VAT amount, VAT and total inc-VAT." },
      { q: "Can I cancel before the end of my commitment?", a: "The initial commitment (12 or 24 months depending on plan) is firm. After that, the contract auto-renews for 12-month periods, cancellable with 3 months' notice before each renewal date." },
      { q: "Are prices indexed?", a: "Annual indexation is capped at 3%, based on the INSEE consumer price index. Any revision is notified 60 days before application." },
      { q: "What payment methods do you accept?", a: "SEPA direct debit (recommended), credit card and wire transfer. SEPA direct debit is set up at contract signing for automatic monthly billing." },
      { q: "Are volume discounts available?", a: "Yes. The Premium plan includes tiered pricing from ten kiosks upward. Contact us for a custom quote with your exact volume." },
      { q: "Does the pilot programme commit me beyond 6 months?", a: "No. At the end of the 6-month pilot rate, you switch to the standard Essentiel or Confort plan. No additional commitment is imposed automatically." },
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
                {tx("Tarification WakiBox", "WakiBox pricing")}
              </span>
            </div>

            <h1
              id="tarifs-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {tx(
                <>Tarifs transparents.<br /><span className="text-[#10B981]">Engagement clair.</span></>,
                <>Transparent pricing.<br /><span className="text-[#10B981]">Clear commitment.</span></>
              )}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.12rem] leading-[1.72] max-w-xl mb-10">
              {tx(
                "Trois plans adaptés à votre taille, un programme pilote pour les premiers signataires, et des options à la carte. Tous les prix sont en euros HT.",
                "Three plans tailored to your size, a pilot programme for early signers, and à la carte options. All prices in euros ex-VAT."
              )}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {[
                { v: tx("dès 39 €", "from €39"), l: tx("HT / mois", "ex-VAT / month"), color: "#10B981" },
                { v: tx("3 plans", "3 plans"), l: tx("Essentiel · Confort · Premium", "Essentiel · Confort · Premium"), color: "#0EA5E9" },
                { v: tx("0 € mise en service", "€0 setup"), l: tx("programme pilote", "pilot programme"), color: "#F59E0B" },
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
              <Link
                href="/reserver?offre=waki-box-confort"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {tx("Réserver une démonstration", "Book a demo")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#plans"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {tx("Voir les plans", "See plans")}
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
          S2 — 3 PLANS — composition éditoriale verticale avec ghost numbers
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
                <div className="max-w-4xl">
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
                      {("popular" in plan && plan.popular) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#10B981] text-white text-[11px] font-semibold uppercase tracking-wider">
                          <Sparkles className="h-3 w-3" aria-hidden="true" />
                          {tx("Le plus populaire", "Most popular")}
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
                          {tx("Mise en service", "Setup")}
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
                      {tx("Réserver", "Book now")}
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
                  "€19 ex-VAT/month for 6 months. Setup free."
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
                    "Free setup (worth €150)",
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
                {tx("Candidater au pilote", "Apply for the pilot")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S4 — ADD-ONS — fond blanc, ghost number 05
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <GhostNumber n="05" isDark={false} align="right" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Options à la carte", "À la carte options")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx("Composez votre offre.", "Build your offer.")}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.08rem] leading-[1.78]">
                {tx(
                  "Chaque option se greffe sur n'importe quel plan. Facturation unitaire, sans engagement additionnel.",
                  "Each option plugs into any plan. Unit billing, no additional commitment."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl">
            <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 overflow-hidden">
              {addons.map((addon, i) => (
                <div
                  key={addon.slug}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 lg:px-8 py-5 ${
                    i < addons.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#0F172A] text-[15px]">{addon.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-[#047857] tabular-nums whitespace-nowrap">
                      {addon.price}
                    </span>
                    <Link
                      href={`/reserver?offre=waki-box-addon-${addon.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#047857]/10 text-[#047857] text-xs font-semibold hover:bg-[#047857]/20 transition-colors"
                    >
                      {tx("Réserver", "Book")}
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 — SERVICES ITAD — fond #0F172A, renvoi vers /services
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#0F172A] py-20 lg:py-28">
        <GhostNumber n="06" isDark={true} align="left" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 30%, rgba(16,185,129,0.10) 0%, transparent 60%)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <ClipboardList className="h-5 w-5 text-[#6EE7B7]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7]">
                  {tx("Services ITAD", "ITAD services")}
                </span>
              </div>

              <h2
                className="text-white font-bold tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "Et pour l'audit, l'effacement ou le reconditionnement ?",
                  "What about audit, erasure or refurbishment?"
                )}
              </h2>

              <p className="text-gray-300 text-[1.02rem] lg:text-[1.08rem] leading-[1.78] mb-8">
                {tx(
                  "Nos services ITAD (audit de parc, effacement certifié NIST 800-88, reconditionnement, recyclage DEEE, cybersécurité) sont chiffrés sur devis selon le volume, le type de matériel et le niveau de sécurité requis. Un plan d'action détaillé vous est remis sous 48 heures.",
                  "Our ITAD services (fleet audit, NIST 800-88 certified erasure, refurbishment, WEEE recycling, cybersecurity) are priced on a per-quote basis depending on volume, equipment type and required security level. A detailed action plan is delivered within 48 hours."
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reserver?offre=audit-inventaire"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0F172A] font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {tx("Demander un devis", "Request a quote")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {tx("Voir tous les services ITAD", "View all ITAD services")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 — FAQ TARIFAIRE — fond blanc
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <GhostNumber n="07" isDark={false} align="left" />
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
          S7 — CTA DOUBLE FINAL — fond #10B981
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
                  {tx("Réserver une démonstration", "Book a demo")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/reserver?offre=waki-box-pilote"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {tx("Candidater au pilote", "Apply for the pilot")}
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
