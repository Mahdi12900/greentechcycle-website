"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Shield,
} from "lucide-react";

type SectorKey = "finance" | "sante" | "industrie" | "public" | "energie" | "retail";

const allSectors: { key: SectorKey; label: string; href: string }[] = [
  { key: "finance", label: "Banque & Finance", href: "/secteurs/finance" },
  { key: "sante", label: "Sante", href: "/secteurs/sante" },
  { key: "industrie", label: "Industrie", href: "/secteurs/industrie" },
  { key: "public", label: "Secteur public", href: "/secteurs/public" },
  { key: "energie", label: "Energie", href: "/secteurs/energie" },
  { key: "retail", label: "Retail", href: "/secteurs/retail" },
];

const sectorImages: Record<SectorKey, { src: string; alt: string }> = {
  finance: { src: "/images/servers.jpg", alt: "Infrastructure serveur pour le secteur financier" },
  sante: { src: "/images/hospital.jpg", alt: "Environnement hospitalier et gestion IT sante" },
  industrie: { src: "/images/industry.jpg", alt: "Site industriel et gestion des actifs technologiques" },
  public: { src: "/images/office.jpg", alt: "Administration publique et conformite IT" },
  energie: { src: "/images/datacenter.jpg", alt: "Infrastructure critique energetique et systemes OT" },
  retail: { src: "/photos/sector-retail.jpg", alt: "Point de vente retail et gestion des actifs IT" },
};

export default function SectorPageContent({ sector }: { sector: SectorKey }) {
  const t = useTranslations(`Sectors.${sector}`);
  const tc = useTranslations("Sectors.common");

  const regulations = t.raw("regulations.items") as string[];
  const challenges = t.raw("challenges.items") as string[];
  const solutions = t.raw("solution.items") as string[];
  const otherSectors = allSectors
    .filter((s) => s.key !== sector)
    .slice(0, 4)
    .map((s) => ({ label: s.label, href: s.href }));

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary py-24 lg:py-32 overflow-hidden">
        <Image
          src={sectorImages[sector].src}
          alt={sectorImages[sector].alt}
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
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

      {/* Context */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
              <FadeIn>
                <h2 className="text-3xl font-bold text-dark mb-6">
                  {t("context.title")}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("context.description")}
                </p>
              </FadeIn>
              <FadeIn direction="right">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={sectorImages[sector].src}
                    alt={sectorImages[sector].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="py-20 lg:py-28 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-dark">
                  {t("regulations.title")}
                </h2>
              </div>
            </FadeIn>
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regulations.map((reg, index) => (
                <StaggerItem key={index}>
                  <div className="bg-white rounded-xl px-5 py-4 border border-gray-200 shadow-sm flex items-center gap-3">
                    <Shield className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium text-dark">{reg}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Challenges */}
              <FadeIn>
                <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">
                      {t("challenges.title")}
                    </h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100"
                      >
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Solutions */}
              <FadeIn>
                <div className="bg-white rounded-2xl border-2 border-accent/30 overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-accent to-green-400 px-6 py-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">
                      {t("solution.title")}
                    </h3>
                  </div>
                  <div className="p-6 space-y-3">
                    {solutions.map((solution, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Other Sectors */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-dark">
                {tc("otherSectors")}
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {otherSectors.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-dark font-medium hover:border-accent hover:text-accent transition-colors duration-200 shadow-sm"
                >
                  {s.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
              <Link
                href="/cas-usages"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-dark font-medium hover:border-accent hover:text-accent transition-colors duration-200 shadow-sm"
              >
                {tc("backToUseCases")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {t("cta.title")}
              </h2>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                {t("cta.button")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
