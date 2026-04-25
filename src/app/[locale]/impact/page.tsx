"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import {
  Leaf,
  Recycle,
  TrendingUp,
  Globe,
  Calculator,
  BarChart3,
  FileText,
  CheckCircle2,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";

export default function ImpactPage() {
  const t = useTranslations("Impact");
  const [equipmentCount, setEquipmentCount] = useState<number>(0);

  const co2Saved = (equipmentCount * 0.09).toFixed(2);
  const reuseRate = 72;
  const estimatedValue = (equipmentCount * 45).toLocaleString("fr-FR");

  const metricItems = t.raw("metrics.items") as Array<{ value: string; label: string }>;
  const csrdFeatures = t.raw("csrd.features") as string[];

  const metricIcons = [Leaf, Recycle, TrendingUp, Globe];

  return (
    <main className="min-h-screen bg-light">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-accent/80 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dark/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-16">
              {t("metrics.title")}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricItems.map((metric, index) => {
              const Icon = metricIcons[index] || Leaf;
              return (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all text-center h-full">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-dark mb-2">
                      {metric.value}
                    </div>
                    <p className="text-dark/60 font-medium">{metric.label}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-4">
              {t("calculator.title")}
            </h2>
            <p className="text-center text-dark/60 mb-12 max-w-2xl mx-auto">
              {t("calculator.subtitle")}
            </p>
          </FadeIn>

          <ScaleIn>
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-accent/20">
              <div className="flex flex-col items-center mb-10">
                <label className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-accent" />
                  {t("calculator.equipmentLabel")}
                </label>
                <input
                  type="number"
                  min="0"
                  value={equipmentCount || ""}
                  onChange={(e) => setEquipmentCount(Number(e.target.value))}
                  placeholder={t("calculator.equipmentPlaceholder")}
                  className="w-full max-w-xs px-6 py-4 text-center text-2xl font-bold text-dark rounded-xl border-2 border-accent/30 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-white"
                />
              </div>

              {equipmentCount > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                    <Leaf className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="text-3xl font-bold text-dark mb-1">{co2Saved}</div>
                    <p className="text-sm text-dark/60">{t("calculator.results.co2")}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                    <Recycle className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-dark mb-1">{reuseRate}%</div>
                    <p className="text-sm text-dark/60">{t("calculator.results.reuse")}</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                    <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-dark mb-1">{estimatedValue} &euro;</div>
                    <p className="text-sm text-dark/60">{t("calculator.results.value")}</p>
                  </div>
                </div>
              )}

              <p className="text-xs text-dark/40 text-center mt-6">{t("calculator.note")}</p>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* CSRD Reporting */}
      <section className="py-20 px-6 bg-gradient-to-b from-light to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                {t("csrd.title")}
              </h2>
              <p className="text-dark/60 mb-8 text-lg">
                {t("csrd.subtitle")}
              </p>
              <ul className="space-y-4">
                {csrdFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-dark/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn>
              <div className="bg-dark rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-accent" />
                  <span className="text-white font-semibold">{t("csrd.title")}</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60 text-sm">CO2</span>
                      <span className="text-accent font-bold">-89%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[89%] bg-gradient-to-r from-accent to-primary rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60 text-sm">Reuse</span>
                      <span className="text-accent font-bold">72%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-[72%] bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/60 text-sm">Compliance</span>
                      <span className="text-accent font-bold">100%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-gradient-to-r from-accent to-yellow-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <RelatedArticles
        keywords={["CSRD", "économie circulaire", "DEEE", "carbone"]}
        title="Décarbonisation & économie circulaire"
        subtitle="Nos analyses pour intégrer l'ITAD dans votre stratégie ESG, CSRD et économie circulaire."
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Calculez votre impact en 10 minutes"
        subtitle="Obtenez un bilan personnalisé : tonnes de CO₂eq évitées, valeur résiduelle récupérée et équivalents sociaux."
        primaryLabel="Lancer la simulation"
        primaryHref="/contact"
        secondaryLabel="Télécharger le rapport ESG"
        secondaryHref="/demo"
        variant="download"
        tone="gradient"
      />
    </main>
  );
}
