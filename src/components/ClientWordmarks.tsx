"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { CLIENTS } from "@/content/clients";

/**
 * Bandeau « Ils nous font confiance » / « Trusted by » (DESIGN.md v2) :
 * noms des clients en wordmarks typographiques monochromes (`fg-muted` → `fg` au survol),
 * ou logo officiel s'il est renseigné dans src/content/clients.ts.
 * - `band`    : bandeau de section (accueil), titre centré ;
 * - `compact` : rangée sous un en-tête de page (/cas-usages, /resultats-clients).
 */
export default function ClientWordmarks({
  variant = "band",
  className = "",
}: {
  variant?: "band" | "compact";
  className?: string;
}) {
  const isEn = useLocale() === "en";
  const title = isEn ? "Trusted by" : "Ils nous font confiance";
  const compact = variant === "compact";

  return (
    <div className={className}>
      <p
        className={`text-eyebrow uppercase text-fg-muted ${compact ? "mb-4" : "mb-8 text-center"}`}
        id={compact ? undefined : "clients-band-label"}
      >
        {title}
      </p>
      <ul
        aria-label={title}
        className={`flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-10 ${compact ? "" : "justify-center lg:gap-x-12"}`}
      >
        {CLIENTS.map((c) => (
          <li key={c.id} className="flex items-center">
            {c.logo ? (
              <Image
                src={c.logo}
                alt={c.name}
                width={140}
                height={32}
                className="h-7 w-auto opacity-70 grayscale transition-opacity duration-200 hover:opacity-100"
              />
            ) : (
              <span
                className={`whitespace-nowrap font-semibold tracking-[-0.02em] text-fg-muted transition-colors duration-200 hover:text-fg ${
                  compact ? "text-body" : "text-heading-md sm:text-heading-lg"
                }`}
              >
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
