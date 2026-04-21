import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plateforme ITAD unifiée | Tableau de bord et traçabilité",
  description:
    "Plateforme SaaS ITAD unifiée : tableau de bord temps réel, traçabilité blockchain, reporting automatisé et intégration API pour la gestion de vos actifs IT en fin de vie.",
  keywords: ["plateforme ITAD", "SaaS", "tableau de bord", "traçabilité blockchain", "reporting automatisé", "API"],
  openGraph: {
    title: "Plateforme ITAD unifiée | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps réel, traçabilité blockchain et reporting automatisé.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plateforme ITAD unifiée | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps réel, traçabilité blockchain et reporting automatisé.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
