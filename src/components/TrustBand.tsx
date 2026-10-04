"use client";

import { useTranslations } from "next-intl";
import ClientWordmarks from "@/components/ClientWordmarks";

/**
 * Bandeau de confiance de l'accueil (DESIGN.md v2) : « Ils nous font confiance » / « Trusted by »,
 * noms des clients en wordmarks typographiques (registre src/content/clients.ts).
 * Remplace les libellés anonymisés à pictogrammes. Les études de cas, elles, restent anonymisées.
 */
export default function TrustBand() {
  const t = useTranslations("Home.trustBand");
  return (
    <section className="border-y border-track bg-bg py-12 lg:py-16" aria-labelledby="clients-band-label">
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <ClientWordmarks variant="band" />
        <p className="mx-auto mt-8 max-w-[65ch] text-center text-caption text-fg-muted">{t("note")}</p>
      </div>
    </section>
  );
}
