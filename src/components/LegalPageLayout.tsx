"use client";

import { ReactNode } from "react";

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
      <section className="border-b border-track bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
              { label: breadcrumbLabel, href: `/${locale}` },
            ]}
          />
          <div className="reveal">
            {icon && <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-dim text-emerald">{icon}</span>}
            <h1 className="max-w-[18ch] text-display-lg text-fg">{title}</h1>
            {subtitle && <p className="mt-4 max-w-[65ch] text-body-lg text-fg-strong">{subtitle}</p>}
            {updatedAt && (
              <p className="mt-4 text-caption text-fg-muted">
                {isEn ? "Last updated: " : "Dernière mise à jour : "}
                {updatedAt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contenu — colonne de lecture 720 px */}
      <section className="bg-bg py-12 lg:py-16">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">{children}</div>
      </section>
    </>
  );
}
