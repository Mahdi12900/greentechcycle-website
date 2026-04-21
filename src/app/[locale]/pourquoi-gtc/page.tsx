"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  ScaleIn,
} from "@/components/motion";
import {
  X,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Leaf,
} from "lucide-react";

export default function WhyGTCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("WhyGTC");

  const beforeItems = t.raw("before.items") as string[];
  const afterItems = t.raw("after.items") as string[];
  const benefitsItems = t.raw("benefits.items") as { title: string; desc: string }[];

  const benefitIcons = [TrendingUp, Clock, ShieldCheck, Leaf];
  const benefitColors = [
    "bg-accent/10 text-accent",
    "bg-blue-500/10 text-blue-500",
    "bg-purple-500/10 text-purple-500",
    "bg-green-600/10 text-green-600",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 lg:gap-8 items-stretch">
              {/* Before Column */}
              <FadeIn>
                <div className="bg-white rounded-2xl border-2 border-red-200 shadow-lg overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
                    <h3 className="text-xl font-bold text-white text-center">
                      {t("before.title")}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {beforeItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100"
                      >
                        <span className="text-dark/70 font-medium">{item}</span>
                        <X className="w-5 h-5 text-red-400 ml-auto flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Arrow/Transition */}
              <div className="flex items-center justify-center">
                <div className="hidden md:flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
                    <ArrowRight className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="md:hidden flex items-center justify-center py-4">
                  <div className="w-14 h-14 bg-gradient-to-b from-accent to-green-400 rounded-full flex items-center justify-center shadow-lg shadow-accent/30 rotate-90">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* After Column */}
              <FadeIn>
                <div className="bg-white rounded-2xl border-2 border-accent/30 shadow-lg overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-accent to-green-400 px-6 py-4">
                    <h3 className="text-xl font-bold text-white text-center">
                      {t("after.title")}
                    </h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {afterItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100"
                      >
                        <span className="text-dark/70 font-medium">{item}</span>
                        <CheckCircle className="w-5 h-5 text-accent ml-auto flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {t("benefits.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {benefitsItems.map((benefit, index) => {
                const Icon = benefitIcons[index] || TrendingUp;
                const color = benefitColors[index] || benefitColors[0];
                return (
                  <StaggerItem key={index}>
                    <div className="bg-light rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full">
                      <div
                        className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-dark mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-dark/60 leading-relaxed">
                        {benefit.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
