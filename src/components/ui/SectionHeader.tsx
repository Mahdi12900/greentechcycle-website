import type { ReactNode } from "react";

/**
 * En-tête de section (DESIGN.md §6.4) : eyebrow → H2 Geist → chapô.
 * Aligné à gauche par défaut ; centré seulement pour les CTA.
 * `alert` passe l'eyebrow en ochre (sections « risque »).
 */
export default function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  alert = false,
  align = "left",
  as: Tag = "h2",
  size = "md",
  id,
  className = "",
  children,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  alert?: boolean;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md" | "sm";
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  void tone; // v2 : un seul rendu (sombre)
  const eyebrowColor = alert ? "text-amber" : "text-fg-muted";
  const titleSize = { xl: "text-display-xl max-w-[18ch]", lg: "text-display-lg max-w-[18ch]", md: "text-display-md max-w-[24ch]", sm: "text-display-sm max-w-[32ch]" }[size];
  const centered = align === "center";
  return (
    <div className={`mb-10 lg:mb-12 ${centered ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className={`mb-3 text-eyebrow uppercase ${eyebrowColor}`}>{eyebrow}</p>}
      <Tag id={id} className={`${titleSize} ${centered ? "mx-auto" : ""} font-display text-fg`}>
        {title}
      </Tag>
      {intro && (
        <div className={`mt-4 max-w-[65ch] text-body-lg ${centered ? "mx-auto" : ""} text-fg-muted`}>
          {intro}
        </div>
      )}
      {children}
    </div>
  );
}
