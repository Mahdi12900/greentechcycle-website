"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Plug,
  Code2,
  ShieldCheck,
  Lock,
  KeyRound,
  Users,
  Webhook,
  FileJson,
  Zap,
  RefreshCw,
  Database,
} from "lucide-react";

import RelatedArticles from "@/components/RelatedArticles";


const integrations = [
  {
    name: "ServiceNow",
    icon: Plug,
    description:
      "Synchronisation bidirectionnelle des tickets ITAD, création automatique d'incidents et suivi du cycle de vie des actifs.",
    features: ["CMDB sync", "Ticket automation", "Asset lifecycle"],
  },
  {
    name: "GLPI",
    icon: Database,
    description:
      "Import/export automatique de votre inventaire, mise à jour des statuts en temps réel et gestion centralisée.",
    features: ["Inventory sync", "Status tracking", "Bulk operations"],
  },
  {
    name: "Microsoft Intune",
    icon: RefreshCw,
    description:
      "Détection automatique des appareils en fin de vie, désenrôlement sécurisé et comptes-rendus de conformité.",
    features: ["Device detection", "Auto-unenroll", "Compliance reports"],
  },
  {
    name: "JAMF",
    icon: Zap,
    description:
      "Gestion du cycle de vie Apple : identification des appareils éligibles, effacement distant et traçabilité complète.",
    features: ["Apple lifecycle", "Remote wipe", "Full traceability"],
  },
  {
    name: "SAP",
    icon: FileJson,
    description:
      "Intégration ERP native : valorisation comptable, amortissements, sorties d'actifs et rapports financiers automatisés.",
    features: ["Asset valuation", "Depreciation", "Financial reports"],
  },
];

const apiFeatures = [
  "RESTful API avec documentation OpenAPI 3.0",
  "Webhooks en temps réel pour chaque événement",
  "SDK disponibles en Python, Node.js et Java",
  "Rate limiting intelligent avec file d'attente",
  "Sandbox de test avec données fictives",
  "Versioning sémantique et rétrocompatibilité",
];

const authFeatures = [
  {
    icon: Lock,
    title: "SSO / SAML 2.0",
    description:
      "Connexion unique via votre IdP : Azure AD, Okta, Google Workspace, OneLogin.",
  },
  {
    icon: KeyRound,
    title: "OAuth 2.0 + PKCE",
    description:
      "Authentification sécurisée pour vos applications tierces avec tokens à durée de vie limitée.",
  },
  {
    icon: ShieldCheck,
    title: "MFA obligatoire",
    description:
      "Authentification multi-facteurs par TOTP, SMS ou clé physique FIDO2 pour tous les accès sensibles.",
  },
  {
    icon: Users,
    title: "SCIM Provisioning",
    description:
      "Provisionnement automatique des utilisateurs depuis votre annuaire d'entreprise.",
  },
];

const codeSnippet = `// Exemple : créer une demande ITAD
const response = await fetch(
  "https://api.greentechcycle.com/v2/requests",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer \${API_KEY}",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "erasure",
      assets: ["SN-001", "SN-002"],
      priority: "standard",
      callback_url: "https://your-app.com/webhook"
    }),
  }
);

const { request_id, status } = await response.json();
// → { request_id: "req_abc123", status: "pending" }`;

export default function EcosystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-bg-card py-16 text-fg lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-4xl ">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-track text-emerald text-sm font-medium mb-6">
                <Plug className="w-4 h-4" />
                Intégrations & API
              </span>
              <h1 className="text-display-lg text-fg mb-6">
                Un écosystème ouvert,{" "}
                <span className="text-emerald">connecté à votre SI</span>
              </h1>
              <p className="text-xl text-fg-muted mb-8 max-w-2xl">
                Connecteurs natifs, API REST documentée et authentification
                enterprise-grade. GreenTechCycle s&apos;intègre sans friction à votre
                environnement existant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald hover:bg-emerald/90 text-bg font-semibold rounded-xl transition-colors duration-150"
                >
                  Demander une démo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#api"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-fg font-semibold rounded-xl transition-colors duration-150 border border-white/20"
                >
                  <Code2 className="w-5 h-5" />
                  Explorer l&apos;API
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Native Integrations */}
      <section className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="text-center mb-16">
              <h2 className="text-display-md text-fg mb-4">
                Intégrations natives
              </h2>
              <p className="text-lg text-fg-strong max-w-2xl mx-auto">
                Connectez GreenTechCycle à vos outils en quelques clics.
                Configuration guidée, synchronisation temps réel.
              </p>
            </div>
          </div>

          <div className="reveal-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {integrations.map((integration) => (
              <div key={integration.name} className="reveal">
                <div className="group bg-bg-card rounded-2xl p-8 hover:border-track-strong transition-colors duration-150 border border-track hover:border-emerald/30 h-full">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-150 bg-emerald/10">
                    <integration.icon className="w-7 h-7 text-emerald" />
                  </div>
                  <h3 className="text-heading-lg text-fg mb-3">
                    {integration.name}
                  </h3>
                  <p className="text-fg-strong mb-5 leading-relaxed">
                    {integration.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-white/[0.03] text-emerald text-xs font-medium rounded-full border border-emerald/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open API Section */}
      <section id="api" className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal min-w-0">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-dim text-emerald text-sm font-medium mb-4">
                  <Webhook className="w-4 h-4" />
                  API ouverte
                </span>
                <h2 className="text-display-md text-fg mb-6">
                  Une API pensée pour les développeurs
                </h2>
                <p className="text-lg text-fg-strong mb-8">
                  Automatisez vos processus ITAD avec notre API REST complète.
                  Documentation interactive, SDKs multi-langages et
                  environnement de test dédié.
                </p>
                <div className="reveal-stagger space-y-3">
                  {apiFeatures.map((feature) => (
                    <div key={feature} className="reveal">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-dim flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald" />
                        </div>
                        <span className="text-fg-strong">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal-scale min-w-0">
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl blur-xl bg-emerald/5" />
                <div className="relative bg-bg-card rounded-2xl p-6 overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-amber" />
                    <div className="w-3 h-3 rounded-full bg-amber" />
                    <div className="w-3 h-3 rounded-full bg-emerald" />
                    <span className="ml-3 text-fg-muted text-sm font-mono">
                      api-example.ts
                    </span>
                  </div>
                  <pre className="text-sm text-fg-muted overflow-x-auto font-mono leading-relaxed">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SSO / Auth Section */}
      <section className="bg-bg-card py-16 lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <div className="text-center mb-16">
              <h2 className="text-display-md text-fg mb-4">
                Sécurité & Authentification
              </h2>
              <p className="text-lg text-fg-strong max-w-2xl mx-auto">
                Authentification enterprise-grade avec SSO, MFA et
                provisionnement automatique. Conforme aux exigences les plus
                strictes.
              </p>
            </div>
          </div>

          <div className="reveal-stagger grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {authFeatures.map((feature) => (
              <div key={feature.title} className="reveal">
                <div className="bg-bg-card rounded-2xl p-8 border border-track hover:border-track-strong transition-shadow duration-150">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-bg/10">
                    <feature.icon className="w-6 h-6 text-emerald" />
                  </div>
                  <h3 className="text-heading-md text-fg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-fg-strong leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-bg-card py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
        </div>
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-display-md text-fg mb-6">
                Prêt à connecter votre SI ?
              </h2>
              <p className="text-xl text-fg-muted mb-8">
                Notre équipe technique vous accompagne dans l&apos;intégration.
                Planifiez une session de découverte de 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-emerald hover:bg-emerald/90 text-bg font-semibold rounded-xl transition-colors duration-150"
                >
                  Planifier un appel
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-fg font-semibold rounded-xl transition-colors duration-150 border border-white/20"
                >
                  Voir les solutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles
        keywords={["nis2", "cybersécurité", "sécurité"]}
        title="Écosystème & cybersécurité : aller plus loin"
        subtitle="Les intégrations IT impliquent de nouveaux défis de sécurité. Découvrez nos analyses NIS2, RGPD et effacement certifié."
        limit={3}
        tone="light"
      />
    </div>
  );
}
