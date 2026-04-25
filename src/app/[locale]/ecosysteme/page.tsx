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
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";
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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <Image
          src="/photos/server-technician.jpg"
          alt="Technicien GreenTechCycle intégrant la plateforme au data center client"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A]/92 via-[#1E40AF]/88 to-[#047857]/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Plug className="w-4 h-4" />
                Intégrations & API
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Un écosystème ouvert,{" "}
                <span className="text-accent">connecté à votre SI</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Connecteurs natifs, API REST documentée et authentification
                enterprise-grade. GreenTechCycle s'intègre sans friction à votre
                environnement existant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25"
                >
                  Demander une démo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#api"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
                >
                  <Code2 className="w-5 h-5" />
                  Explorer l'API
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Native Integrations */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Intégrations natives
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connectez GreenTechCycle à vos outils en quelques clics.
                Configuration guidée, synchronisation temps réel.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {integrations.map((integration) => (
              <StaggerItem key={integration.name}>
                <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/30 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <integration.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">
                    {integration.name}
                  </h3>
                  <p className="text-gray-600 mb-5 leading-relaxed">
                    {integration.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {integration.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-accent/5 text-accent text-xs font-medium rounded-full border border-accent/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Open API Section */}
      <section id="api" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Webhook className="w-4 h-4" />
                  API ouverte
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                  Une API pensée pour les développeurs
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Automatisez vos processus ITAD avec notre API REST complète.
                  Documentation interactive, SDKs multi-langages et
                  environnement de test dédié.
                </p>
                <StaggerContainer className="space-y-3">
                  {apiFeatures.map((feature) => (
                    <StaggerItem key={feature}>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </FadeIn>

            <ScaleIn>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-3xl blur-xl" />
                <div className="relative bg-dark rounded-2xl p-6 shadow-2xl overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="ml-3 text-gray-400 text-sm font-mono">
                      api-example.ts
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* SSO / Auth Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Sécurité & Authentification
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Authentification enterprise-grade avec SSO, MFA et
                provisionnement automatique. Conforme aux exigences les plus
                strictes.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {authFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à connecter votre SI ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Notre équipe technique vous accompagne dans l'intégration.
                Planifiez une session de découverte de 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25"
                >
                  Planifier un appel
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
                >
                  Voir les solutions
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedArticles
        keywords={["nis2", "cybersécurité", "sécurité"]}
        title="Écosystème & cybersécurité : aller plus loin"
        subtitle="Les intégrations IT impliquent de nouveaux défis de sécurité. Découvrez nos analyses NIS2, RGPD et effacement certifié."
        limit={3}
        tone="light"
      />
    </main>
  );
}
