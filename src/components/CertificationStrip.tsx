"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";

/**
 * Bandeau de preuves (DESIGN.md §6.1) — méthodes et démarche, AUCUNE certification
 * (GTC n'en détient pas ; ISO 27001 en cours). Texte : messages TrustBar.text. — remplace l'ancien
 * TrustBar fixe. Placé en bas de hero (accueil, secteurs, plateforme, tarifs)
 * ou en pied de footer (variante sombre).
 */
export default function CertificationStrip({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const t = useTranslations("TrustBar");
  const items = t("text")
    .split("•")
    .map((s) => s.trim())
    .filter(Boolean);
  const dark = variant === "dark";

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-caption ${dark ? "text-fg-muted" : "text-fg-muted"} ${className}`}
      aria-label={t("text")}
    >
      {items.map((label) => (
        <li key={label} className="inline-flex items-center gap-2">
          <ShieldCheck
            className={`h-3.5 w-3.5 flex-shrink-0 ${dark ? "text-emerald" : "text-emerald"}`}
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}
