import type { ReactNode } from "react";

/**
 * Section de page — DESIGN.md v2 §2.2 / §4.3 / §5.1.
 * Deux surfaces seulement : `bg` et `bg-card`. Les anciens noms de ton (v1)
 * sont conservés comme alias pour ne pas toucher aux appels :
 *   paper → bg ; cream / night / mint → bg-card bordé ; forest → bg + halo
 *   (section « lumineuse » : marque, citation, conversion).
 */
export type SectionTone = "paper" | "cream" | "night" | "forest" | "mint";
export type SectionSpacing = "standard" | "dense" | "hero" | "hero-home" | "none";

const TONES: Record<SectionTone, string> = {
  paper: "bg-bg text-fg",
  cream: "bg-bg-card text-fg border-y border-track",
  night: "bg-bg-card text-fg border-y border-track",
  forest: "relative overflow-hidden bg-bg text-fg",
  mint: "bg-bg-card text-fg border-y border-track",
};

/**
 * Espacement resserré le 2026-10-05 (reports/espacement-sections-gtc.md) : py-16 lg:py-24
 * → py-12 lg:py-16 partout, pour couper de moitié le vide cumulé à chaque frontière entre
 * sections. `noTop` sert à `collapseTop` ci-dessous : quand deux sections de même fond se
 * suivent sans bordure, la deuxième peut retirer son padding haut (le bas de la précédente
 * suffit à les séparer), au lieu d'additionner les deux paddings.
 */
const SPACING: Record<SectionSpacing, { all: string; noTop: string }> = {
  standard: { all: "py-12 lg:py-16", noTop: "pb-12 lg:pb-16" },
  dense: { all: "py-12 lg:py-16", noTop: "pb-12 lg:pb-16" },
  hero: { all: "py-12 lg:py-16", noTop: "pb-12 lg:pb-16" },
  "hero-home": { all: "py-14 lg:py-20", noTop: "pb-14 lg:pb-20" },
  none: { all: "", noTop: "" },
};

/** v2 : tout est sombre ; conservé pour compatibilité. */
export function isDarkTone(tone: SectionTone) {
  return tone === "night" || tone === "forest";
}

export function Container({ children, className = "", narrow = false }: { children: ReactNode; className?: string; narrow?: boolean }) {
  return (
    <div className={`mx-auto px-5 sm:px-6 lg:px-8 ${narrow ? "max-w-[calc(720px+4rem)]" : "max-w-site"} ${className}`}>
      {children}
    </div>
  );
}

export default function Section({
  id,
  tone = "paper",
  spacing = "standard",
  className = "",
  containerClassName = "",
  narrow = false,
  bordered = false,
  collapseTop = false,
  children,
  "aria-labelledby": labelledBy,
  "aria-label": label,
}: {
  id?: string;
  tone?: SectionTone;
  spacing?: SectionSpacing;
  className?: string;
  containerClassName?: string;
  narrow?: boolean;
  bordered?: boolean;
  /** Retire le padding haut (la section précédente, même fond et sans bordure, fournit déjà l'espace) */
  collapseTop?: boolean;
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`${TONES[tone]} ${collapseTop ? SPACING[spacing].noTop : SPACING[spacing].all} ${bordered ? "border-y border-track" : ""} ${className}`}
    >
      {tone === "forest" && <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />}
      <Container narrow={narrow} className={`relative ${containerClassName}`}>
        {children}
      </Container>
    </section>
  );
}
