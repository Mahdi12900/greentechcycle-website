import type { ReactNode } from "react";

/**
 * Section de page (DESIGN.md §4.3) : fond (paper / cream / night / forest / mint)
 * + rythme vertical normalisé + conteneur 1200 px.
 * Règle d'alternance : jamais deux `cream` ni deux `night` consécutifs.
 */
export type SectionTone = "paper" | "cream" | "night" | "forest" | "mint";
export type SectionSpacing = "standard" | "dense" | "hero" | "hero-home" | "none";

const TONES: Record<SectionTone, string> = {
  paper: "bg-paper text-ink",
  cream: "bg-cream text-ink",
  night: "bg-forest-900 text-ondark",
  forest: "bg-forest text-ondark",
  mint: "bg-leaf-100 text-ink",
};

const SPACING: Record<SectionSpacing, string> = {
  standard: "py-16 lg:py-24",
  dense: "py-12 lg:py-16",
  hero: "py-16 lg:py-24",
  "hero-home": "py-16 lg:py-32",
  none: "",
};

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
  children: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={`${TONES[tone]} ${SPACING[spacing]} ${bordered ? "border-y border-line" : ""} ${className}`}
    >
      <Container narrow={narrow} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
