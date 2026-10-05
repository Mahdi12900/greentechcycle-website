import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Résultats clients | Des preuves mesurables",
    description:
      "Les résultats des missions GreenTechCycle : actifs traités, tCO₂e évitées, taux de réemploi et cas clients détaillés, avec la période et la source de chaque chiffre.",
  },
  en: {
    title: "Client results | Measurable proof",
    description:
      "Results from GreenTechCycle engagements: assets processed, tCO₂e avoided, reuse rate and detailed client cases, with the period and source of every figure.",
  },
};

/* Métadonnées par langue (audit final B3) : la page n'en avait aucune et héritait de la canonical de l'accueil */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/resultats-clients", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
