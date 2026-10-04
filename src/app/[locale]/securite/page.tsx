"use client";

import { useLocale, useTranslations } from "next-intl";

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
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

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
    { bg: "bg-amber-dim", border: "border-amber/40", icon: Shield },
    { bg: "bg-amber-dim", border: "border-amber/40", icon: Shield },
    { bg: "bg-amber-dim", border: "border-amber/40", icon: ShieldCheck },
    { bg: "bg-white/[0.03]", border: "border-track", icon: ShieldAlert },
    { bg: "bg-emerald-dim", border: "border-track", icon: Lock },
  ];

  const custodyIcons = [ClipboardCheck, Truck, Warehouse, HardDrive, FileCheck, PackageCheck, Award];

  return (
    <div className="min-h-screen bg-bg-card">
      {/* Hero */}
      <section className="bg-bg-card py-16 text-fg lg:py-24">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <h1 className="text-display-lg text-fg mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-fg-muted max-w-3xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Erasure Levels */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <h2 className="text-display-md text-fg text-center mb-16">
              {t("levels.title")}
            </h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {levelItems.map((item, index) => {
              const style = levelStyles[index] || levelStyles[0];
              const Icon = style.icon;
              return (
                <div key={index} className="reveal">
                  <div className="flex h-full flex-col rounded-xl border border-track bg-bg p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div className="mb-2 font-display text-display-sm text-fg">{tx("Niveau", "Level")} {item.level}</div>
                    <h3 className="text-sm font-semibold text-fg mb-1">{item.name}</h3>
                    <p className="text-xs text-fg-strong mb-2">{item.desc}</p>
                    <span className="text-xs text-emerald font-medium">{item.norm}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chain of Custody */}
      <section className="px-6 bg-bg-card py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="reveal">
            <h2 className="text-display-md text-fg text-center mb-4">
              {t("chainOfCustody.title")}
            </h2>
            <p className="text-center text-fg-strong mb-16 max-w-2xl mx-auto">
              {t("chainOfCustody.subtitle")}
            </p>
          </div>
          <div className="reveal">
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-2">
              {custodySteps.map((step, index) => {
                const Icon = custodyIcons[index] || ClipboardCheck;
                return (
                  <div key={index} className="flex items-center gap-2 md:gap-4">
                    <div className="flex flex-col items-center gap-3 w-28 md:w-32">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-emerald">
                        <Icon className="w-7 h-7 text-fg" />
                      </div>
                      <span className="text-xs md:text-sm font-medium text-fg text-center leading-tight">
                        {step}
                      </span>
                    </div>
                    {index < custodySteps.length - 1 && (
                      <ChevronRight className="w-5 h-5 text-emerald shrink-0 hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="px-6 bg-bg-card py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <h2 className="text-display-md text-fg text-center mb-16">
              {t("certifications.title")}
            </h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {certificationItems.map((cert, index) => (
              <div key={index} className="reveal">
                <div className="bg-bg-card rounded-2xl p-6 border border-track hover:border-track-strong transition-colors h-full flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-dim flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-emerald" />
                  </div>
                  <p className="text-sm font-medium text-fg">{cert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 bg-bg-card py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="reveal">
            <h2 className="text-display-md text-fg text-center mb-16">
              {t("architecture.title")}
            </h2>
          </div>
          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureItems.map((item, index) => (
              <div key={index} className="reveal">
                <div className="bg-white/5 border border-track rounded-2xl p-6 hover:bg-white/10 transition-colors h-full">
                  <Server className="w-10 h-10 text-emerald mb-4" />
                  <p className="text-sm text-fg">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedArticles
        categories={["Sécurité", "Conformité"]}
        title={{ fr: "Analyses cybersécurité & conformité", en: "Cybersecurity & compliance analyses" }}
        subtitle={{ fr: "NIS2, effacement NIST 800-88, RGPD : approfondissez les sujets clés de la sécurité des données en fin de vie IT.", en: "NIS2, NIST 800-88 erasure, GDPR: dig into the key topics of end-of-life IT data security." }}
        limit={3}
        tone="light"
      />

      <CtaSection
        title={tx("Protégez vos données jusqu'à la dernière étape", "Protect your data through to the very last step")}
        subtitle={tx(
          "Audit de sécurité gratuit, certificats d'effacement conformes NIST 800-88, traçabilité complète. Parlons de votre besoin.",
          "Free security audit, NIST 800-88 compliant erasure certificates, full traceability. Let's talk about your needs."
        )}
        primaryLabel={tx("Parler à un expert", "Talk to an expert")}
        primaryHref="/contact"
        secondaryLabel={tx("Demander un audit", "Request an audit")}
        secondaryHref="/demo"
        variant="download"
        tone="dark"
      />
    </div>
  );
}
