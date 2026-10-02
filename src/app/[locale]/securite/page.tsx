"use client";

import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  FileCheck,
  Truck,
  Warehouse,
  HardDrive,
  ClipboardCheck,
  PackageCheck,
  Award,
  Server,
  ChevronRight,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";

export default function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("Security");

  const levelItems = t.raw("levels.items") as Array<{
    level: string;
    name: string;
    desc: string;
    norm: string;
  }>;

  const custodySteps = t.raw("chainOfCustody.steps") as string[];
  const certificationItems = t.raw("certifications.items") as string[];
  const architectureItems = t.raw("architecture.items") as string[];

  const levelStyles = [
    { color: "from-ochre to-ochre", bg: "bg-ochre-100", border: "border-ochre-100", icon: Shield },
    { color: "from-ochre to-ochre", bg: "bg-ochre-100", border: "border-ochre-100", icon: Shield },
    { color: "from-ochre to-ochre", bg: "bg-ochre-100", border: "border-ochre-100", icon: ShieldCheck },
    { color: "from-forest to-forest", bg: "bg-leaf-50", border: "border-line", icon: ShieldAlert },
    { color: "from-forest to-ochre", bg: "bg-leaf-100", border: "border-line", icon: Lock },
  ];

  const custodyIcons = [ClipboardCheck, Truck, Warehouse, HardDrive, FileCheck, PackageCheck, Award];

  return (
    <main className="min-h-screen bg-light">
      {/* Hero */}
      <section className="relative px-6 overflow-hidden bg-secondary py-16 lg:py-24">
        <div className="absolute inset-0 opacity-10">
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1 className="text-display-lg text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-ondark-muted max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Erasure Levels */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-display-md text-dark text-center mb-16">
              {t("levels.title")}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {levelItems.map((item, index) => {
              const style = levelStyles[index] || levelStyles[0];
              const Icon = style.icon;
              return (
                <StaggerItem key={index}>
                  <div className={`${style.bg} ${style.border} border rounded-2xl p-6 h-full flex flex-col items-center text-center hover:shadow-card transition-shadow`}>
                    <div className={`w-14 h-14 rounded-xl ${style.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-3xl font-semibold text-dark mb-2">Niveau {item.level}</div>
                    <h3 className="text-sm font-semibold text-dark mb-1">{item.name}</h3>
                    <p className="text-xs text-ink-700 mb-2">{item.desc}</p>
                    <span className="text-xs text-accent font-medium">{item.norm}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Chain of Custody */}
      <section className="px-6 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-display-md text-dark text-center mb-4">
              {t("chainOfCustody.title")}
            </h2>
            <p className="text-center text-ink-700 mb-16 max-w-2xl mx-auto">
              {t("chainOfCustody.subtitle")}
            </p>
          </FadeIn>
          <FadeIn>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
              {custodySteps.map((step, index) => {
                const Icon = custodyIcons[index] || ClipboardCheck;
                return (
                  <div key={index} className="flex items-center gap-2 md:gap-4">
                    <div className="flex flex-col items-center gap-3 w-28 md:w-32">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-primary">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-ink text-center leading-tight">
                        {step}
                      </span>
                    </div>
                    {index < custodySteps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-accent shrink-0 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 bg-light py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-display-md text-dark text-center mb-16">
              {t("certifications.title")}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {certificationItems.map((cert, index) => (
              <StaggerItem key={index}>
                <div className="bg-white rounded-2xl p-6 border border-line hover:shadow-card transition-colors h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-leaf-100 flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-dark">{cert}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 bg-dark py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-display-md text-white text-center mb-16">
              {t("architecture.title")}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureItems.map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-white/5 border border-ondark-line rounded-2xl p-6 hover:bg-white/10 transition-colors h-full">
                  <Server className="w-10 h-10 text-accent mb-4" />
                  <p className="text-sm text-ondark">{item}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <RelatedArticles
        categories={["Sécurité", "Conformité"]}
        title="Analyses cybersécurité & conformité"
        subtitle="NIS2, effacement NIST 800-88, RGPD : approfondissez les sujets clés de la sécurité des données en fin de vie IT."
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Protégez vos données jusqu'à la dernière étape"
        subtitle="Audit de sécurité gratuit, certificats d'effacement conformes NIST 800-88, traçabilité complète. Parlons de votre besoin."
        primaryLabel="Télécharger le guide sécurité"
        primaryHref="/contact"
        secondaryLabel="Demander un audit"
        secondaryHref="/demo"
        variant="download"
        tone="dark"
      />
    </main>
  );
}
