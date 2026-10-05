"use client";

import { useLocale } from "next-intl";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/Button";

/**
 * CTA de fin de page (DESIGN.md v2 §6.12) — section `bg` + halo + points,
 * centrée, H2 display-md, chapô fg-muted, boutons hero (pilule) primaire +
 * secondaire, ligne de réassurance. Une page = un seul CTA de fin.
 *
 * `tone`, `variant` et `icon` sont conservés dans la signature pour la
 * compatibilité des appels existants mais n'ont plus d'effet visuel.
 */
interface CtaSectionProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Ligne de réassurance ; `false` pour la masquer. */
  reassurance?: ReactNode | false;
  /** Contenu additionnel sous les boutons (ex. lien grille tarifaire). */
  footnote?: ReactNode;
  id?: string;
  className?: string;
  /** @deprecated sans effet */
  variant?: string;
  /** @deprecated sans effet */
  tone?: string;
  /** @deprecated sans effet */
  icon?: ReactNode;
}

export default function CtaSection({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/demo",
  secondaryLabel,
  secondaryHref = "/contact",
  reassurance,
  footnote,
  id,
  className = "",
}: CtaSectionProps) {
  const isEn = useLocale() === "en";
  const primary = primaryLabel ?? (isEn ? "Book my demo (30 min)" : "Réserver ma démo (30 min)");
  const secondary = secondaryLabel ?? (isEn ? "Request the free audit" : "Demander l'audit gratuit");
  const reassure =
    reassurance === undefined
      ? isEn
        ? "Reply within 48 h · No commitment"
        : "Réponse sous 48 h · Sans engagement"
      : reassurance;

  return (
    <section id={id} className={`relative overflow-hidden border-t border-track bg-bg py-16 text-fg lg:py-24 ${className}`}>
      {/* Section « lumineuse » (§5.1, §6.12) : halo émeraude + grille de points */}
      <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="fx-dots pointer-events-none absolute inset-0 fx-fade" aria-hidden="true" />
      <div className="relative mx-auto max-w-site px-5 text-center sm:px-6 lg:px-8">
        <div className="reveal">
          {eyebrow && <p className="mb-3 text-eyebrow uppercase text-fg-muted">{eyebrow}</p>}
          <h2 className="mx-auto max-w-[24ch] text-display-md text-fg">{title}</h2>
          {subtitle && <p className="mx-auto mt-4 max-w-[65ch] text-body-lg text-fg-muted">{subtitle}</p>}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryHref} size="lg" pill>
              {primary}
            </ButtonLink>
            {secondaryHref && secondary && (
              <ButtonLink href={secondaryHref} variant="secondary" size="lg" pill>
                {secondary}
              </ButtonLink>
            )}
          </div>
          {reassure && <p className="mt-6 text-caption text-fg-muted">{reassure}</p>}
          {footnote && <div className="mt-3 text-caption text-fg-muted">{footnote}</div>}
        </div>
      </div>
    </section>
  );
}
