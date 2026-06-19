"use client";

import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import { ChevronDown, HelpCircle, Sparkles, Users, TrendingUp, Shield } from "lucide-react";
import { useState } from "react";
import RelatedArticles from "@/components/RelatedArticles";
import CtaSection from "@/components/CtaSection";

const TABS = ["dsi", "rse", "daf", "compliance"] as const;

type TabKey = (typeof TABS)[number];

export default function FAQPage() {
  const t = useTranslations("FAQ");
  const [activeTab, setActiveTab] = useState<TabKey>("dsi");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tabLabels: Record<TabKey, string> = {
    dsi: t("tabs.dsi"),
    rse: t("tabs.rse"),
    daf: t("tabs.daf"),
    compliance: t("tabs.compliance"),
  };

  const tabIcons: Record<TabKey, typeof Users> = {
    dsi: Users,
    rse: Sparkles,
    daf: TrendingUp,
    compliance: Shield,
  };

  const questions = t.raw(activeTab) as Array<{ q: string; a: string }>;

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    setOpenIndex(null);
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-dark py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-white/80">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tabs + Accordion */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Tab Navigation */}
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {TABS.map((tab) => {
                const TabIcon = tabIcons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`inline-flex items-center gap-2 px-5 md:px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all ${
                      activeTab === tab
                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                        : "bg-white text-dark/70 hover:bg-primary/5 hover:text-primary border border-gray-200"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Accordion */}
          <StaggerContainer>
            <div className="space-y-3">
              {questions.map((item, index) => (
                <StaggerItem key={`${activeTab}-${index}`}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-dark pr-4 text-sm md:text-base">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === index ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-dark/70 text-sm md:text-base leading-relaxed border-t border-gray-100 pt-4">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <RelatedArticles
        title="Articles recommandés"
        subtitle="Approfondissez vos questions avec nos guides sur la conformité, la sécurité et l'économie circulaire IT."
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Votre question n'est pas dans la FAQ ?"
        subtitle="Notre équipe d'experts ITAD répond sous 24h à toutes vos questions spécifiques."
        primaryLabel="Poser ma question"
        primaryHref="/contact"
        secondaryLabel="Planifier une démo"
        secondaryHref="/demo"
        variant="contact"
        tone="dark"
      />
    </main>
  );
}
