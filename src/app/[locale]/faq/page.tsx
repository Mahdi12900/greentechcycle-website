"use client";

import { useTranslations } from "next-intl";

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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-bg-card py-12 lg:py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="reveal">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-emerald" />
              </div>
              <h1 className="text-display-lg text-fg mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-lg md:text-xl text-fg">
                {t("hero.subtitle")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Accordion */}
      <section className="bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 max-w-4xl">
          {/* Tab Navigation */}
          <div className="reveal">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {TABS.map((tab) => {
                const TabIcon = tabIcons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`inline-flex items-center gap-2 px-5 md:px-6 py-3 rounded-full font-medium text-sm md:text-base transition-colors ${ activeTab === tab ? "bg-emerald text-bg" : "bg-bg-card text-fg-strong hover:bg-emerald/5 hover:text-emerald border border-track" }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion */}
          <div className="reveal-stagger">
            <div className="space-y-3">
              {questions.map((item, index) => (
                <div key={`${activeTab}-${index}`} className="reveal">
                  <div className="bg-bg-card rounded-xl border border-track overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="font-medium text-fg pr-4 text-sm md:text-base">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-emerald shrink-0 transition-transform duration-150 ${ openIndex === index ? "rotate-180" : "" }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-colors duration-150 ${ openIndex === index ? "max-h-96" : "max-h-0" }`}
                    >
                      <div className="px-5 md:px-6 pb-5 md:pb-6 text-fg-strong text-sm md:text-base leading-relaxed border-t border-track pt-4">
                        {item.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles
        title={{ fr: "Articles recommandés", en: "Recommended articles" }}
        subtitle={{ fr: "Approfondissez vos questions avec nos guides sur la conformité, la sécurité et l'économie circulaire IT.", en: "Dig deeper with our guides on compliance, security and the circular IT economy." }}
        limit={3}
        tone="light"
      />

      <CtaSection
        title="Votre question n'est pas dans la FAQ ?"
        subtitle="Notre équipe d'experts ITAD répond sous 24h à toutes vos questions spécifiques."
        primaryLabel="Réserver ma démo (30 min)"
        primaryHref="/demo"
        secondaryLabel="Demander l'audit gratuit"
        secondaryHref="/contact"
        variant="contact"
        tone="dark"
      />
    </div>
  );
}
