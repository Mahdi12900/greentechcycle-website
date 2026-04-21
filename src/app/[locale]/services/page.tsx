"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import Image from "next/image";
import { ArrowRight, Monitor, HardDrive, Smartphone, Server, Recycle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations("Services");

  const items = t.raw("items") as Array<{
    id: string;
    title: string;
    subtitle: string;
    engagement: string;
    description: string;
    features: string[];
  }>;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    effacement: HardDrive,
    collecte: Monitor,
    reporting: Server,
    carbone: Recycle,
    blockchain: ShieldCheck,
    wakibox: Smartphone,
  };

  const imageMap: Record<string, { src: string; alt: string }> = {
    effacement: { src: "/images/cybersecurity.jpg", alt: "Effacement sécurisé des données certifié NIST" },
    collecte: { src: "/images/recycling.jpg", alt: "Collecte et recyclage d'équipements IT" },
    reporting: { src: "/images/datacenter.jpg", alt: "Centre de données pour le reporting en temps réel" },
    carbone: { src: "/images/recycling.jpg", alt: "Bilan carbone et économie circulaire" },
    blockchain: { src: "/images/cybersecurity.jpg", alt: "Traçabilité blockchain pour la sécurité des données" },
    wakibox: { src: "/images/servers.jpg", alt: "WakiBox - Solution mobile de gestion IT" },
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D503C] via-[#1E3A5F] to-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.1),_transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {items.map((item, i) => {
              const Icon = iconMap[item.id] || Monitor;
              return (
                <div key={item.id} id={item.id}>
                  <FadeIn>
                    <div className={`flex flex-col ${i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}>
                      {/* Service Image */}
                      <div className="flex-1 w-full">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group">
                          <Image
                            src={imageMap[item.id]?.src || "/images/datacenter.jpg"}
                            alt={imageMap[item.id]?.alt || item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0D503C]/30 to-transparent" />
                          <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                            <Icon className="h-6 w-6 text-[#0D503C]" aria-hidden="true" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#0D503C]/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-[#0D503C]" />
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold">
                            {item.engagement}
                          </span>
                        </div>

                        <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                          {item.title}
                        </h2>
                        <p className="text-lg text-[#1E3A5F] font-medium mb-4">
                          {item.subtitle}
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {item.description}
                        </p>

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {item.features.map((feature, j) => (
                            <StaggerItem key={j}>
                              <div className="flex items-start gap-2">
                                <CheckCircle2 className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700">{feature}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 text-[#0D503C] font-semibold hover:text-[#10B981] transition-colors duration-200"
                        >
                          En savoir plus
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0D503C] to-[#1E3A5F]">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t("hero.title")}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {t("hero.subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5"
              >
                Demander une démo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
