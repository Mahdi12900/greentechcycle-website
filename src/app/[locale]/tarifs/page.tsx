"use client";

/**
 * Tarifs — Public pricing page mirroring the 3 Professional Services tiers
 * shipped in Sprint 3 (platform migration 025_pro_services.sql).
 *
 * Monthly / annual billing toggle + feature matrix + CTA links to the
 * in-app subscription flow at /platform/services.
 */

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Rocket,
  Star,
  Crown,
  Shield,
  Sparkles,
  Clock,
  UserCheck,
  TrendingUp,
  Infinity as InfinityIcon,
} from "lucide-react";

// ---------- i18n helper ----------
const useTx = () => {
  const locale = useLocale();
  return (fr: string, en: string) => (locale === "en" ? en : fr);
};

// ---------- Types ----------
type TierCode = "continuous" | "audit_plus" | "enterprise";

interface Tier {
  code: TierCode;
  name: string;
  tagline: string;
  monthly: [number, number] | null;
  annual: [number, number];
  slaHours: number;
  supportLevel: string;
  includedAuditorHours: number;
  maxScansMonth: number;
  maxOrgs: number;
  features: string[];
  ctaKey: "trial" | "contact" | "quote";
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  highlight?: boolean;
}

const TIERS: Tier[] = [
  {
    code: "continuous",
    name: "Continuous Audit",
    tagline: "fr=Scans IA continus + tableau de bord multi-axes",
    monthly: [500, 2000],
    annual: [5400, 21600],
    slaHours: 48,
    supportLevel: "basic",
    includedAuditorHours: 0,
    maxScansMonth: 200,
    maxOrgs: 1,
    features: [
      "continuous_scans",
      "multi_axis_dashboard",
      "ai_reports",
      "monthly_summary",
      "rgpd_essentials",
    ],
    ctaKey: "trial",
    icon: Rocket,
    gradient: "from-sky-500 to-emerald-500",
  },
  {
    code: "audit_plus",
    name: "Audit+",
    tagline: "fr=Validation humaine + rapport annuel signé + DPO 4h/mois",
    monthly: [5000, 15000],
    annual: [54000, 162000],
    slaHours: 24,
    supportLevel: "priority",
    includedAuditorHours: 4,
    maxScansMonth: 1000,
    maxOrgs: 3,
    features: [
      "continuous_scans",
      "multi_axis_dashboard",
      "ai_reports",
      "monthly_summary",
      "rgpd_essentials",
      "human_validation",
      "signed_annual_report",
      "dpo_consult_4h_month",
      "quarterly_review",
      "priority_support",
    ],
    ctaKey: "contact",
    icon: Star,
    gradient: "from-indigo-500 to-violet-500",
    highlight: true,
  },
  {
    code: "enterprise",
    name: "Enterprise",
    tagline: "fr=Pentest annuel + DPO-as-a-service + certification dédiée",
    monthly: null,
    annual: [50000, 150000],
    slaHours: 4,
    supportLevel: "dedicated",
    includedAuditorHours: 40,
    maxScansMonth: 10000,
    maxOrgs: 25,
    features: [
      "continuous_scans",
      "multi_axis_dashboard",
      "ai_reports",
      "monthly_summary",
      "rgpd_essentials",
      "human_validation",
      "signed_annual_report",
      "dpo_consult_4h_month",
      "quarterly_review",
      "priority_support",
      "annual_pentest",
      "dpo_aas",
      "custom_compliance_certification",
      "dedicated_auditor",
      "support_24_7",
    ],
    ctaKey: "quote",
    icon: Crown,
    gradient: "from-amber-500 to-rose-500",
  },
];

const FEATURE_LABEL_FR: Record<string, string> = {
  continuous_scans: "Scans continus IA (M1/M2/M3/M4)",
  multi_axis_dashboard: "Tableau de bord multi-axes (cyber/carbone/finance/cycle de vie)",
  ai_reports: "Rapports IA automatisés (exécutif/technique/compliance)",
  monthly_summary: "Synthèse mensuelle",
  rgpd_essentials: "Conformité RGPD Essentials",
  human_validation: "Validation humaine des constats critiques",
  signed_annual_report: "Rapport annuel signé eIDAS",
  dpo_consult_4h_month: "DPO externe — 4h / mois",
  quarterly_review: "Revue trimestrielle",
  priority_support: "Support prioritaire",
  annual_pentest: "Pentest annuel externe",
  dpo_aas: "DPO-as-a-Service",
  custom_compliance_certification: "Préparation certification sur-mesure",
  dedicated_auditor: "Auditeur dédié",
  support_24_7: "Support 24/7",
};

const FEATURE_LABEL_EN: Record<string, string> = {
  continuous_scans: "AI continuous scans (M1/M2/M3/M4)",
  multi_axis_dashboard: "Multi-axis dashboard (cyber/carbon/finance/lifecycle)",
  ai_reports: "AI automated reports (exec/technical/compliance)",
  monthly_summary: "Monthly summary",
  rgpd_essentials: "GDPR Essentials compliance",
  human_validation: "Human validation of critical findings",
  signed_annual_report: "Signed annual report (eIDAS)",
  dpo_consult_4h_month: "Outsourced DPO — 4h / month",
  quarterly_review: "Quarterly review",
  priority_support: "Priority support",
  annual_pentest: "External annual pentest",
  dpo_aas: "DPO-as-a-Service",
  custom_compliance_certification: "Bespoke certification preparation",
  dedicated_auditor: "Dedicated auditor",
  support_24_7: "24/7 support",
};

function formatRange(min: number | null, max: number | null, suffix: string): string {
  if (min == null && max == null) return "—";
  if (min != null && max != null) {
    return `${min.toLocaleString()} – ${max.toLocaleString()} ${suffix}`;
  }
  return `${(min ?? max)?.toLocaleString()} ${suffix}`;
}

export default function TarifsPage() {
  const locale = useLocale();
  const tx = useTx();
  const [mode, setMode] = useState<"monthly" | "annual">("monthly");

  const featureMatrix = useMemo(() => {
    const all = new Set<string>();
    for (const t of TIERS) for (const f of t.features) all.add(f);
    const features = Array.from(all);
    const support: Record<TierCode, boolean[]> = {
      continuous: [],
      audit_plus: [],
      enterprise: [],
    };
    for (const t of TIERS) {
      support[t.code] = features.map((f) => t.features.includes(f));
    }
    return { features, support };
  }, []);

  const label = locale === "en" ? FEATURE_LABEL_EN : FEATURE_LABEL_FR;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-dark py-24 md:py-32 overflow-hidden">
        <div className="container-max mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {tx("Services Professionnels", "Professional Services")}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {tx("Tarifs transparents, sans surprise", "Transparent pricing, no surprises")}
            </h1>
            <p className="text-lg md:text-xl text-white/80">
              {tx(
                "Choisissez le plan adapté à votre taille — 3 paliers, essai gratuit, sans engagement pendant 14 jours.",
                "Pick the plan that fits your size — 3 tiers, free trial, no commitment for 14 days.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Billing toggle */}
      <section className="py-8 bg-white">
        <div className="container-max mx-auto px-4 flex justify-center">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-gray-100 border border-gray-200">
            <button
              onClick={() => setMode("monthly")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                mode === "monthly" ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              {tx("Mensuel", "Monthly")}
            </button>
            <button
              onClick={() => setMode("annual")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                mode === "annual" ? "bg-white shadow text-gray-900" : "text-gray-500"
              }`}
            >
              {tx("Annuel (-10%)", "Annual (-10%)")}
            </button>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="py-10 bg-white">
        <div className="container-max mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TIERS.map((tier) => {
              const Icon = tier.icon;
              const monthlyDisplay = tier.monthly
                ? formatRange(tier.monthly[0], tier.monthly[1], "€/mois")
                : tx("Sur devis", "Custom quote");
              const annualDisplay = formatRange(tier.annual[0], tier.annual[1], "€/an");
              const price = mode === "monthly" ? monthlyDisplay : annualDisplay;
              const ctaLabel =
                tier.ctaKey === "trial"
                  ? tx("Démarrer un essai", "Start trial")
                  : tier.ctaKey === "contact"
                  ? tx("Contacter les ventes", "Contact sales")
                  : tx("Devis sur-mesure", "Custom quote");
              const taglineFr = tier.tagline.replace(/^fr=/, "");
              const taglineEn =
                tier.code === "continuous"
                  ? "AI continuous scans + multi-axis dashboard"
                  : tier.code === "audit_plus"
                  ? "Human validation + signed annual report + DPO 4h/month"
                  : "Annual pentest + DPO-as-a-service + dedicated certification";
              return (
                <div
                  key={tier.code}
                  className={`relative rounded-2xl bg-white border ${
                    tier.highlight
                      ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                      : "border-gray-200 shadow-lg"
                  } p-6 flex flex-col`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs px-3 py-1 rounded-full">
                      {tx("Plus populaire", "Most popular")}
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {tx(taglineFr, taglineEn)}
                  </p>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{price}</div>
                  {mode === "monthly" && tier.monthly && (
                    <div className="text-xs text-gray-400 mb-4">
                      {tx("Facturé mensuellement", "Billed monthly")}
                    </div>
                  )}
                  {(mode === "annual" || !tier.monthly) && (
                    <div className="text-xs text-gray-400 mb-4">
                      {tx("Facturé annuellement", "Billed annually")}
                    </div>
                  )}
                  <ul className="space-y-2 text-sm text-gray-700 mb-6">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-500" />
                      SLA {tier.slaHours} h
                    </li>
                    <li className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-indigo-500" />
                      {tier.includedAuditorHours > 0
                        ? `${tier.includedAuditorHours} h ${tx("auditeur incluses", "auditor included")}`
                        : tx("Support de base", "Basic support")}
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      {tx("Support", "Support")} {tier.supportLevel}
                    </li>
                    <li className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                      {tier.maxScansMonth.toLocaleString()} {tx("scans/mois", "scans/month")}
                    </li>
                  </ul>

                  <div className="mt-auto space-y-3">
                    <div className="border-t border-gray-100 pt-3 space-y-1.5">
                      {tier.features.slice(0, 6).map((f) => (
                        <div key={f} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{label[f] ?? f.replace(/_/g, " ")}</span>
                        </div>
                      ))}
                      {tier.features.length > 6 && (
                        <div className="text-xs text-gray-400 italic pl-6">
                          + {tier.features.length - 6} {tx("autres avantages", "more benefits")}
                        </div>
                      )}
                    </div>

                    <Link
                      href={
                        tier.ctaKey === "trial"
                          ? "/plateforme"
                          : "/contact"
                      }
                      className={`block w-full text-center rounded-xl px-4 py-3 font-semibold text-white bg-gradient-to-r ${tier.gradient} hover:opacity-95 transition`}
                    >
                      {ctaLabel}
                      <ArrowRight className="inline w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature matrix */}
      <section className="py-16 bg-light">
        <div className="container-max mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
              {tx("Matrice détaillée des fonctionnalités", "Detailed feature matrix")}
            </h2>
            <p className="text-center text-gray-500 mb-8">
              {tx(
                "Tous les plans incluent la plateforme SaaS + tableaux de bord ESG/cyber/carbone.",
                "All plans include the SaaS platform + ESG/cyber/carbon dashboards.",
              )}
            </p>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      {tx("Fonctionnalité", "Feature")}
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Continuous</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Audit+</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {featureMatrix.features.map((f, i) => (
                    <tr key={f}>
                      <td className="px-4 py-3 text-gray-700">{label[f] ?? f.replace(/_/g, " ")}</td>
                      {(["continuous", "audit_plus", "enterprise"] as TierCode[]).map((code) => (
                        <td key={code} className="px-4 py-3 text-center">
                          {featureMatrix.support[code][i] ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                          ) : (
                            <XCircle className="w-4 h-4 text-gray-300 inline" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="py-16 bg-gradient-to-br from-primary to-dark">
        <div className="container-max mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {tx("Prêt à industrialiser votre audit continu ?", "Ready to scale your continuous audit?")}
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            {tx(
              "Démarrez votre essai gratuit de 14 jours ou contactez-nous pour un devis Enterprise.",
              "Start your free 14-day trial or contact us for an Enterprise quote.",
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/plateforme"
              className="inline-flex items-center justify-center rounded-xl bg-white text-primary px-6 py-3 font-semibold hover:bg-white/90 transition"
            >
              {tx("Accéder à la plateforme", "Go to the platform")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/50 text-white px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              {tx("Contacter les ventes", "Contact sales")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
