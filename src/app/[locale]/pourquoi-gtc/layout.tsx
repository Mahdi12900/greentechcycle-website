import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pourquoi GreenTechCycle | Avantages de notre solution ITAD",
  description:
    "Pourquoi choisir GreenTechCycle ? Plateforme ITAD unifiée, conformité CSRD automatisée, effacement certifié, traçabilité blockchain et valorisation maximale de vos actifs IT.",
  keywords: ["pourquoi GreenTechCycle", "avantages ITAD", "plateforme unifiée", "conformité automatisée", "valorisation IT"],
  openGraph: {
    title: "Pourquoi GreenTechCycle | Solution ITAD",
    description: "Plateforme ITAD unifiée avec conformité automatisée et valorisation maximale de vos actifs IT.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pourquoi GreenTechCycle | Solution ITAD",
    description: "Plateforme ITAD unifiée avec conformité automatisée et valorisation maximale.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
