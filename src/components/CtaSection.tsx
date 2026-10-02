"use client";

import { useLocale } from "next-intl";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion";
import { ButtonLink } from "@/components/ui/Button";

/**
 * CTA de fin de page (DESIGN.md §6.12) — une seule variante visuelle :
 * section forest, centrée, H2 display-md, chapô, primaire + secondaire sur
 * sombre, ligne de réassurance. Une page = un seul CTA de fin.
 *
 * `tone`, `variant` et `icon` sont conservés dans la signature pour la
 * compatibilité des appels existants mais n'ont plus d'effet visuel.
 */
interface CtaSectionProps {
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
    <section id={id} className={`bg-forest py-16 text-ondark lg:py-24 ${className}`}>
      <div className="mx-auto max-w-site px-5 text-center sm:px-6 lg:px-8">
        <FadeIn>
          <h2 className="mx-auto max-w-[24ch] text-display-md text-ondark">{title}</h2>
          {subtitle && <p className="mx-auto mt-4 max-w-[65ch] text-body-lg text-ondark-muted">{subtitle}</p>}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={primaryHref} tone="dark" size="lg">
              {primary}
            </ButtonLink>
            {secondaryHref && secondary && (
              <ButtonLink href={secondaryHref} tone="dark" variant="secondary" size="lg">
                {secondary}
              </ButtonLink>
            )}
          </div>
          {reassure && <p className="mt-6 text-caption text-ondark-muted">{reassure}</p>}
          {footnote && <div className="mt-3 text-caption text-ondark-muted">{footnote}</div>}
        </FadeIn>
      </div>
    </section>
  );
}
