"use client";

import { useTranslations } from "next-intl";
import { Landmark, Tv, HeartPulse, Factory, Building2, Store, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = { Landmark, Tv, HeartPulse, Factory, Building2, Store };

export interface TrustClient {
  name: string;
  metric: string;
  icon: string;
}

/**
 * Bandeau de confiance (DESIGN.md §6.7) — donneurs d'ordre anonymisés,
 * composés comme des données : pictogramme sectoriel + nom + métrique,
 * séparés par des filets verticaux, sans boîtes. TF1 (référence publique)
 * est mis en avant par la taille du nom, pas par un logo tiers.
 */
export default function TrustBand() {
  const t = useTranslations("Home.trustBand");
  const clients = t.raw("clients") as TrustClient[];

  return (
    <section className="border-y border-line bg-paper py-12" aria-labelledby="trust-band-label">
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <p id="trust-band-label" className="mb-8 text-center text-eyebrow uppercase text-muted">
          {t("label")}
        </p>
        <ul className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((c, i) => {
            const Icon = ICONS[c.icon] ?? Building2;
            const isPublicRef = c.name === "TF1";
            return (
              <li
                key={c.name}
                className={`flex flex-col items-center px-4 text-center ${
                  i % 2 === 1 ? "border-l border-line" : ""
                } ${i % 3 !== 0 ? "sm:border-l sm:border-line" : "sm:border-l-0"} ${
                  i !== 0 ? "lg:border-l lg:border-line" : "lg:border-l-0"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-leaf-100">
                  <Icon className="h-5 w-5 text-forest" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className={`mt-3 font-semibold text-ink ${isPublicRef ? "text-heading-md" : "text-body-sm"}`}>
                  {c.name}
                </span>
                {c.metric && <span className="mt-1 text-caption text-muted">{c.metric}</span>}
              </li>
            );
          })}
        </ul>
        <p className="mx-auto mt-8 max-w-[65ch] text-center text-caption text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
