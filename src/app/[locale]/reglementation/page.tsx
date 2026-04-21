"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Scale,
  AlertTriangle,
  Shield,
  Brain,
  Calendar,
  CheckCircle2,
  Clock,
  FileWarning,
  Building2,
  Server,
  Landmark,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";


const regulations = [
  {
    id: "csrd",
    name: "CSRD",
    fullName: "Corporate Sustainability Reporting Directive",
    date: "Janvier 2024",
    status: "active" as const,
    icon: Building2,
    description:
      "La directive européenne sur le reporting de durabilité des entreprises impose aux grandes entreprises et PME cotées de publier des informations détaillées sur leur impact environnemental, social et de gouvernance (ESG).",
    itadImpact:
      "Obligation de reporter les émissions carbone liées au matériel IT (Scope 3), le taux de réemploi des équipements, et la gestion des déchets électroniques. GreenTechCycle fournit les données certifiées nécessaires.",
    sanctions:
      "Amendes pouvant atteindre 75 000 € pour défaut de publication ou informations inexactes. Risque réputationnel majeur auprès des investisseurs.",
    keyDates: [
      "Jan 2024 : Grandes entreprises (>500 salariés)",
      "Jan 2025 : Entreprises >250 salariés",
      "Jan 2026 : PME cotées",
    ],
  },
  {
    id: "nis2",
    name: "NIS2",
    fullName: "Network and Information Security Directive 2",
    date: "Octobre 2024",
    status: "active" as const,
    icon: Shield,
    description:
      "NIS2 renforce les exigences de cybersécurité pour les entités essentielles et importantes dans l'UE. Elle élargit considérablement le périmètre des organisations concernées.",
    itadImpact:
      "Exigence de destruction certifiée des données sur tous les supports en fin de vie. Traçabilité complète de la chain of custody. Notification obligatoire en cas d'incident lié aux actifs décommissionnés.",
    sanctions:
      "Jusqu'à 10 M€ ou 2% du CA mondial pour les entités essentielles. Responsabilité personnelle des dirigeants avec possibilité d'interdiction d'exercer.",
    keyDates: [
      "Oct 2024 : Transposition nationale obligatoire",
      "Avr 2025 : Liste des entités essentielles",
      "Oct 2025 : Première notification d'audit",
    ],
  },
  {
    id: "dora",
    name: "DORA",
    fullName: "Digital Operational Resilience Act",
    date: "Janvier 2025",
    status: "upcoming" as const,
    icon: Server,
    description:
      "DORA établit un cadre réglementaire unifié pour la résilience opérationnelle numérique du secteur financier européen : banques, assurances, fintechs et prestataires ICT critiques.",
    itadImpact:
      "Gestion rigoureuse du cycle de vie des actifs ICT critiques. Tests de résilience incluant les processus de décommissionnement. Exigences de traçabilité pour les prestataires tiers (dont ITAD).",
    sanctions:
      "Astreintes journalières jusqu'à 1% du CA quotidien mondial. Retrait d'agrément possible. Sanctions pénales selon les transpositions nationales.",
    keyDates: [
      "Jan 2025 : Entrée en application",
      "Mar 2025 : Standards techniques (RTS/ITS)",
      "Sep 2025 : Registre des prestataires ICT",
    ],
  },
  {
    id: "ai-act",
    name: "AI Act",
    fullName: "Artificial Intelligence Act",
    date: "Août 2025",
    status: "upcoming" as const,
    icon: Brain,
    description:
      "Le règlement européen sur l'intelligence artificielle classe les systèmes IA par niveau de risque et impose des obligations proportionnelles. Premier cadre juridique complet au monde sur l'IA.",
    itadImpact:
      "Obligations de conservation et destruction sécurisée des données d'entraînement. Traçabilité des composants matériels dédiés à l'IA (GPU, TPU). Gestion des modèles embarqués sur les équipements en fin de vie.",
    sanctions:
      "Jusqu'à 35 M€ ou 7% du CA mondial pour les infractions les plus graves (systèmes interdits). 15 M€ ou 3% pour non-conformité aux obligations des systèmes à haut risque.",
    keyDates: [
      "Fév 2025 : Interdiction des pratiques prohibées",
      "Août 2025 : Obligations de transparence",
      "Août 2026 : Obligations systèmes à haut risque",
    ],
  },
];

export default function RegulationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-secondary to-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Scale className="w-4 h-4" />
                Conformité réglementaire
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Anticipez les{" "}
                <span className="text-accent">obligations réglementaires</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                CSRD, NIS2, DORA, AI Act : les réglementations européennes
                transforment la gestion des actifs IT. Restez conforme avec
                GreenTechCycle.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline Header */}
      <section className="py-12 bg-light border-b border-gray-200">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {regulations.map((reg) => (
                <a
                  key={reg.id}
                  href={`#${reg.id}`}
                  className="flex items-center gap-3 group"
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      reg.status === "active" ? "bg-accent" : "bg-orange-400"
                    }`}
                  />
                  <span className="font-semibold text-dark group-hover:text-primary transition-colors">
                    {reg.name}
                  </span>
                  <span className="text-sm text-gray-500">{reg.date}</span>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      reg.status === "active"
                        ? "bg-accent/10 text-accent"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {reg.status === "active" ? "En vigueur" : "À venir"}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Regulation Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <StaggerContainer className="space-y-16 max-w-5xl mx-auto">
            {regulations.map((reg) => (
              <StaggerItem key={reg.id}>
                <div
                  id={reg.id}
                  className="scroll-mt-24 bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Card Header */}
                  <div
                    className={`px-8 py-6 border-b ${
                      reg.status === "active"
                        ? "bg-gradient-to-r from-accent/5 to-transparent border-accent/20"
                        : "bg-gradient-to-r from-orange-50 to-transparent border-orange-200/50"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          reg.status === "active"
                            ? "bg-accent/10"
                            : "bg-orange-100"
                        }`}
                      >
                        <reg.icon
                          className={`w-6 h-6 ${
                            reg.status === "active"
                              ? "text-accent"
                              : "text-orange-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-2xl font-bold text-dark">
                            {reg.name}
                          </h3>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              reg.status === "active"
                                ? "bg-accent/10 text-accent border border-accent/20"
                                : "bg-orange-100 text-orange-600 border border-orange-200"
                            }`}
                          >
                            {reg.status === "active" ? "En vigueur" : "À venir"}
                          </span>
                        </div>
                        <p className="text-gray-500 text-sm">
                          {reg.fullName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {reg.date}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <p className="text-gray-700 leading-relaxed mb-8">
                      {reg.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* ITAD Impact */}
                      <div className="bg-primary/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <h4 className="font-semibold text-dark">
                            Impact ITAD
                          </h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {reg.itadImpact}
                        </p>
                      </div>

                      {/* Sanctions */}
                      <div className="bg-red-50 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <h4 className="font-semibold text-dark">Sanctions</h4>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {reg.sanctions}
                        </p>
                      </div>
                    </div>

                    {/* Key Dates */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-5 h-5 text-secondary" />
                        <h4 className="font-semibold text-dark">
                          Dates clés
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {reg.keyDates.map((date, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">
                              {date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
                Assurez votre conformité dès maintenant
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Nos experts réglementaires vous accompagnent dans la mise en
                conformité de votre gestion IT. Audit gratuit de votre situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25"
                >
                  Audit de conformité gratuit
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/methodologie"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
                >
                  Guides réglementaires
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
