"use client";

import { ReactNode } from "react";
import { FadeIn } from "@/components/motion";
import DecorativeBackdrop from "@/components/DecorativeBackdrop";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ShieldCheck } from "lucide-react";

interface LegalPageLayoutProps {
  title: string;
  subtitle?: string;
  locale: string;
  icon?: ReactNode;
  breadcrumbLabel: string;
  children: ReactNode;
  updatedAt?: string;
}

export default function LegalPageLayout({
  title,
  subtitle,
  locale,
  icon,
  breadcrumbLabel,
  children,
  updatedAt,
}: LegalPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#047857] via-[#0F172A] to-[#1E40AF] text-white">
        <DecorativeBackdrop variant="primary" grid />
        <div className="container-max mx-auto px-4 relative z-10">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: `/${locale}` },
              { label: breadcrumbLabel, href: `/${locale}` },
            ]}
            dark
          />
          <FadeIn>
            <div className="flex flex-col items-start gap-5 max-w-3xl mt-6">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                {icon ?? <ShieldCheck className="h-7 w-7 text-accent" />}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl">
                  {subtitle}
                </p>
              )}
              {updatedAt && (
                <p className="text-sm text-gray-300/80">Dernière mise à jour : {updatedAt}</p>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="absolute top-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-max max-w-4xl mx-auto px-4 relative z-10">{children}</div>
      </section>
    </>
  );
}
