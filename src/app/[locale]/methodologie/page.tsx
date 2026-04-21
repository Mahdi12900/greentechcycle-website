"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  TrendingUp,
  Flame,
  Magnet,
  HardDrive,
  Cpu,
  Monitor,
  Server,
  Smartphone,
  CheckCircle2,
  Award,
  BarChart3,
  Layers,
  Target,
  Zap,
  BookOpen,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";


const scopes = [
  {
    name: "Scope 1",
    title: "Émissions directes",
    description:
      "Émissions des véhicules de collecte et des équipements de destruction physique opérés par GreenTechCycle.",
    percentage: "5%",
    color: "bg-primary",
  },
  {
    name: "Scope 2",
    title: "Énergie indirecte",
    description:
      "Consommation électrique des centres de traitement, serveurs d'effacement et infrastructure de reconditionnement.",
    percentage: "15%",
    color: "bg-secondary",
  },
  {
    name: "Scope 3",
    title: "Chaîne de valeur",
    description:
      "Carbone embarqué dans les équipements (fabrication), transport amont/aval et fin de vie des composants non valorisables.",
    percentage: "80%",
    color: "bg-accent",
  },
];

const erasureLevels = [
  {
    level: "Clear",
    nistRef: "NIST SP 800-88r1 - Clear",
    icon: HardDrive,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    description:
      "Écrasement logique des données par un ou plusieurs passages d'écriture. Protège contre les techniques de récupération non-invasives.",
    useCases: [
      "Réaffectation interne",
      "Équipements sans données sensibles",
      "Supports non défectueux",
    ],
    method:
      "Overwrite complet avec vérification. Données irrécupérables par outils logiciels standard.",
    certifiable: true,
  },
  {
    level: "Purge",
    nistRef: "NIST SP 800-88r1 - Purge",
    icon: Magnet,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    description:
      "Techniques avancées rendant les données irrécupérables même avec des équipements de laboratoire. Inclut la démagnétisation et le cryptographic erase.",
    useCases: [
      "Données confidentielles",
      "Supports SSD/NVMe",
      "Conformité RGPD art. 17",
    ],
    method:
      "Cryptographic erase (ATA Secure Erase Enhanced), démagnétisation pour supports magnétiques.",
    certifiable: true,
  },
  {
    level: "Destroy",
    nistRef: "NIST SP 800-88r1 - Destroy",
    icon: Flame,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    description:
      "Destruction physique irréversible du support de stockage. Le média est réduit à un état ne permettant aucune récupération, même partielle.",
    useCases: [
      "Données classifiées / défense",
      "Supports défectueux",
      "Exigences réglementaires strictes",
    ],
    method:
      "Broyage mécanique (particules < 2mm), incinération contrôlée ou désintégration. Certificat avec photos.",
    certifiable: true,
  },
];

const gradingCriteria = [
  {
    grade: "A",
    label: "Excellent",
    color: "bg-accent text-white",
    criteria: [
      "Aucun défaut cosmétique visible",
      "Batterie > 85% de capacité",
      "Toutes fonctions opérationnelles",
      "Moins de 2 ans d'âge",
    ],
    valorisation: "60-75% de la valeur neuf",
  },
  {
    grade: "B",
    label: "Bon état",
    color: "bg-primary text-white",
    criteria: [
      "Micro-rayures légères",
      "Batterie > 70% de capacité",
      "Toutes fonctions opérationnelles",
      "2 à 4 ans d'âge",
    ],
    valorisation: "35-55% de la valeur neuf",
  },
  {
    grade: "C",
    label: "Correct",
    color: "bg-secondary text-white",
    criteria: [
      "Traces d'usure visibles",
      "Batterie > 50% de capacité",
      "Fonctions principales OK",
      "4 à 6 ans d'âge",
    ],
    valorisation: "15-30% de la valeur neuf",
  },
  {
    grade: "D",
    label: "Recyclage",
    color: "bg-gray-600 text-white",
    criteria: [
      "Dommages significatifs",
      "Batterie défaillante",
      "Composants défectueux",
      "Plus de 6 ans ou obsolète",
    ],
    valorisation: "Valeur matière uniquement",
  },
];

export default function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-dark via-secondary to-primary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Transparence & rigueur
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Des méthodologies{" "}
                <span className="text-accent">certifiées et auditables</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Bilan carbone, effacement sécurisé, valorisation : chaque étape
                repose sur des référentiels reconnus et des processus
                vérifiables.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Carbon Methodology */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Leaf className="w-4 h-4" />
                Bilan carbone
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Méthodologie carbone
              </h2>
              <p className="text-lg text-gray-600">
                Notre calcul d'empreinte carbone s'appuie sur les bases de
                données Boavizta et les facteurs d'émission ADEME, garantissant
                des résultats conformes aux standards internationaux.
              </p>
            </div>
          </FadeIn>

          {/* References */}
          <div className="max-w-5xl mx-auto mb-16">
            <StaggerContainer className="grid md:grid-cols-2 gap-8">
              <StaggerItem>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5">
                    <BarChart3 className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">
                    Base Boavizta
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Données d'impact environnemental multi-critères pour les
                    équipements numériques. Couvre la fabrication, l'usage et la
                    fin de vie avec une granularité par composant.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Impact fabrication par composant (CPU, RAM, SSD...)",
                      "Facteurs d'émission par pays de production",
                      "Données ACV complètes et auditées",
                      "Mise à jour trimestrielle des données",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Layers className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3">
                    Facteurs ADEME
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Base Carbone officielle française pour les facteurs
                    d'émission. Référentiel obligatoire pour le bilan GES
                    réglementaire et le reporting CSRD.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Facteurs d'émission officiels France",
                      "Compatible bilan GES réglementaire",
                      "Conforme méthodologie GHG Protocol",
                      "Reconnu par les auditeurs CSRD",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>

          {/* Scopes */}
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <h3 className="text-2xl font-bold text-dark mb-8 text-center">
                Scopes du GHG Protocol
              </h3>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-3 gap-6">
              {scopes.map((scope) => (
                <StaggerItem key={scope.name}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full relative overflow-hidden">
                    <div
                      className={`absolute top-0 left-0 w-full h-1 ${scope.color}`}
                    />
                    <div className="flex items-center justify-between mb-4 mt-2">
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                        {scope.name}
                      </span>
                      <span className="text-2xl font-bold text-dark">
                        {scope.percentage}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-dark mb-2">
                      {scope.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {scope.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Erasure Methodology */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
                <ShieldCheck className="w-4 h-4" />
                Effacement sécurisé
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Niveaux d'effacement NIST 800-88
              </h2>
              <p className="text-lg text-gray-600">
                Trois niveaux de sanitisation conformes au standard NIST SP
                800-88 Rev. 1, adaptés à la sensibilité de vos données et aux
                exigences réglementaires.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="max-w-5xl mx-auto space-y-8">
            {erasureLevels.map((level, index) => (
              <StaggerItem key={level.level}>
                <div
                  className={`rounded-3xl border ${level.borderColor} ${level.bgColor} overflow-hidden`}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Level indicator */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center shadow-lg`}
                        >
                          <level.icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold text-dark">
                            Niveau {index + 1} : {level.level}
                          </h3>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${level.bgColor} ${level.textColor} border ${level.borderColor}`}
                          >
                            {level.nistRef}
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">
                          {level.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Method */}
                          <div>
                            <h4 className="font-semibold text-dark mb-2 flex items-center gap-2">
                              <Target className="w-4 h-4 text-gray-500" />
                              Méthode
                            </h4>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {level.method}
                            </p>
                          </div>

                          {/* Use cases */}
                          <div>
                            <h4 className="font-semibold text-dark mb-2 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-gray-500" />
                              Cas d'usage
                            </h4>
                            <ul className="space-y-1">
                              {level.useCases.map((useCase) => (
                                <li
                                  key={useCase}
                                  className="flex items-center gap-2 text-sm text-gray-600"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                                  {useCase}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {level.certifiable && (
                          <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-gray-200 text-sm">
                            <Award className="w-4 h-4 text-accent" />
                            <span className="text-gray-600">
                              Certificat individuel par support
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Valuation Methodology */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                Valorisation
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                Grille de valorisation
              </h2>
              <p className="text-lg text-gray-600">
                Chaque équipement est évalué selon une grille objective et
                transparente. Le grade détermine le canal de valorisation
                optimal : réemploi, revente ou recyclage.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {gradingCriteria.map((grade) => (
              <StaggerItem key={grade.grade}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                  {/* Grade Header */}
                  <div className={`${grade.color} px-6 py-5 text-center`}>
                    <span className="text-4xl font-black">{grade.grade}</span>
                    <p className="text-sm font-medium mt-1 opacity-90">
                      {grade.label}
                    </p>
                  </div>

                  {/* Criteria */}
                  <div className="p-6">
                    <ul className="space-y-3 mb-6">
                      {grade.criteria.map((criterion) => (
                        <li
                          key={criterion}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          {criterion}
                        </li>
                      ))}
                    </ul>

                    {/* Valorisation */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Valorisation
                      </p>
                      <p className="text-sm font-semibold text-dark">
                        {grade.valorisation}
                      </p>
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
                Besoin de précisions sur nos méthodes ?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Nos experts sont disponibles pour détailler nos processus et
                répondre aux exigences de vos auditeurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent/25"
                >
                  Échanger avec un expert
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border border-white/20"
                >
                  Télécharger le livre blanc
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
