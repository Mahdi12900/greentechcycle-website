"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Heart,
  Factory,
  Landmark,
  Zap,
  ShoppingCart,
} from "lucide-react";
import CtaSection from "@/components/CtaSection";
import type { ComponentType } from "react";

type SectorDef = {
  key: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  image: string;
  color: string;
};

const sectorDefs: SectorDef[] = [
  { key: "finance", href: "/secteurs/finance", icon: Building2, image: "/images/servers.jpg", color: "bg-blue-500/10 text-blue-600" },
  { key: "sante", href: "/secteurs/sante", icon: Heart, image: "/images/hospital.jpg", color: "bg-red-500/10 text-red-600" },
  { key: "industrie", href: "/secteurs/industrie", icon: Factory, image: "/images/industry.jpg", color: "bg-amber-500/10 text-amber-600" },
  { key: "public", href: "/secteurs/public", icon: Landmark, image: "/photos/case-administration.jpg", color: "bg-purple-500/10 text-purple-600" },
  { key: "energie", href: "/secteurs/energie", icon: Zap, image: "/images/datacenter.jpg", color: "bg-emerald-500/10 text-emerald-600" },
  { key: "retail", href: "/secteurs/retail", icon: ShoppingCart, image: "/photos/sector-retail.jpg", color: "bg-teal-500/10 text-teal-600" },
];

function SectorCard({ sector }: { sector: SectorDef }) {
  const st = useTranslations(`Sectors.${sector.key}`);
  const Icon = sector.icon;
  return (
    <Link
      href={sector.href}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={sector.image}
          alt={st("hero.title")}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <div className={`w-10 h-10 rounded-xl ${sector.color} flex items-center justify-center backdrop-blur-sm bg-white/90`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
          {st("hero.title")}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4 flex-1">
          {st("hero.subtitle")}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
          Voir le secteur
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}

export default function SecteursIndexPage() {
  const t = useTranslations("Sectors.index");

  return (
    <main className="min-h-screen">
      {/* Hero */}
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

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
              {t("intro")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sectorDefs.map((sector) => (
              <StaggerItem key={sector.key}>
                <SectorCard sector={sector} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        title={t("ctaTitle")}
        subtitle={t("ctaSubtitle")}
        primaryLabel={t("ctaButton")}
        primaryHref="/contact"
        secondaryLabel="Voir les cas d'usages"
        secondaryHref="/cas-usages"
        variant="contact"
        tone="dark"
      />
    </main>
  );
}
