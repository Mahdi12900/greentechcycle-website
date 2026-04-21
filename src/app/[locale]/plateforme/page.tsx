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
  BarChart3,
  Recycle,
  Truck,
  Users,
  FileText,
  Shield,
  MapPin,
  Bell,
  Settings,
  Database,
  Leaf,
  Scale,
  ClipboardList,
  Zap,
  Globe,
  Smartphone,
  CheckCircle,
  FileDown,
  FileSpreadsheet,
  FileType,
  Code2,
} from "lucide-react";

const moduleIcons = [
  BarChart3,
  Recycle,
  Truck,
  Users,
  FileText,
  Shield,
  MapPin,
  Bell,
  Settings,
  Database,
  Leaf,
  Scale,
  ClipboardList,
  Zap,
  Globe,
];

export default function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = useTranslations("Platform");

  const modules = t.raw("modules.items") as string[];

  const governanceFeatures = t.raw("governance.features") as string[];

  const reportingFormats = t.raw("reporting.formats") as string[];

  const mobileFeatures = t.raw("mobile.features") as string[];

  const reportFormatIcons = [
    { icon: FileDown, color: "bg-red-500/10 text-red-500" },
    { icon: FileType, color: "bg-blue-500/10 text-blue-500" },
    { icon: FileSpreadsheet, color: "bg-green-500/10 text-green-500" },
    { icon: Code2, color: "bg-purple-500/10 text-purple-500" },
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

      {/* 15 Modules Grid */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {t("modules.title")}
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
              {modules.map((moduleName, index) => {
                const Icon = moduleIcons[index] || Globe;
                return (
                  <StaggerItem key={index}>
                    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 text-center">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      <h3 className="text-sm font-semibold text-dark">
                        {moduleName}
                      </h3>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Governance Section */}
      <section id="governance" className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                  {t("governance.title")}
                </h2>
                <p className="text-lg text-dark/60 mb-8">
                  {t("governance.subtitle")}
                </p>
                <ul className="space-y-4">
                  {governanceFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-dark/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <ScaleIn>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded w-32 mb-2" />
                        <div className="h-2 bg-gray-200 rounded w-20" />
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded w-28 mb-2" />
                        <div className="h-2 bg-gray-200 rounded w-24" />
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="h-3 bg-gray-300 rounded w-36 mb-2" />
                        <div className="h-2 bg-gray-200 rounded w-16" />
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* Reporting Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {t("reporting.title")}
              </h2>
              <p className="text-lg text-dark/60 max-w-2xl mx-auto">
                {t("reporting.subtitle")}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {reportingFormats.map((format, index) => {
                const iconData = reportFormatIcons[index] || reportFormatIcons[0];
                const Icon = iconData.icon;
                return (
                  <StaggerItem key={index}>
                    <div className="bg-light rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${iconData.color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <p className="text-sm text-dark/70 mt-2">
                        {format}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Mobile PWA Section */}
      <section id="mobile" className="py-20 lg:py-28 bg-gradient-to-br from-primary to-secondary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Smartphone className="w-4 h-4" />
                  PWA
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {t("mobile.title")}
                </h2>
                <p className="text-lg text-white/70 mb-8">
                  {t("mobile.subtitle")}
                </p>
                <ul className="space-y-4">
                  {mobileFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <ScaleIn>
              <div className="flex justify-center">
                {/* Phone Mockup */}
                <div className="relative w-72 h-[580px]">
                  <div className="absolute inset-0 bg-dark rounded-[3rem] shadow-2xl border-4 border-gray-700 overflow-hidden">
                    {/* Status Bar */}
                    <div className="h-12 bg-dark flex items-center justify-center">
                      <div className="w-20 h-5 bg-gray-800 rounded-full" />
                    </div>
                    {/* App Content */}
                    <div className="px-4 py-3 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-white/20 rounded w-24" />
                        <div className="w-8 h-8 bg-accent/30 rounded-full" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-accent/20 rounded-xl p-3 h-20" />
                        <div className="bg-blue-500/20 rounded-xl p-3 h-20" />
                      </div>
                      <div className="bg-gray-800 rounded-xl p-4 space-y-3">
                        <div className="h-3 bg-gray-700 rounded w-3/4" />
                        <div className="h-3 bg-gray-700 rounded w-full" />
                        <div className="h-3 bg-gray-700 rounded w-2/3" />
                      </div>
                      <div className="bg-gray-800 rounded-xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-accent/30 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-3 bg-gray-700 rounded w-2/3 mb-2" />
                            <div className="h-2 bg-gray-700 rounded w-1/2" />
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-yellow-500/30 rounded-lg" />
                          <div className="flex-1">
                            <div className="h-3 bg-gray-700 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-gray-700 rounded w-1/3" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Bottom Nav */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-around px-6">
                      <div className="w-6 h-6 bg-accent/50 rounded" />
                      <div className="w-6 h-6 bg-gray-700 rounded" />
                      <div className="w-6 h-6 bg-gray-700 rounded" />
                      <div className="w-6 h-6 bg-gray-700 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>
    </main>
  );
}
