"use client";

import { ReactNode } from "react";
import { FadeIn } from "@/components/motion";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const isEn = locale === "en";
  return (
    <>
      {/* Hero court, cream (DESIGN.md §10.7) */}
      <section className="border-b border-line bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
              { label: breadcrumbLabel, href: `/${locale}` },
            ]}
          />
          <FadeIn>
            {icon && <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-leaf-100 text-forest">{icon}</span>}
            <h1 className="max-w-[18ch] text-display-lg text-ink">{title}</h1>
            {subtitle && <p className="mt-4 max-w-[65ch] text-body-lg text-ink-700">{subtitle}</p>}
            {updatedAt && (
              <p className="mt-4 text-caption text-muted">
                {isEn ? "Last updated: " : "Dernière mise à jour : "}
                {updatedAt}
              </p>
            )}
          </FadeIn>
        </div>
      </section>

      {/* Contenu — colonne de lecture 720 px */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">{children}</div>
      </section>
    </>
  );
}
