import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Démo | Découvrez la plateforme ITAD en action",
  description:
    "Réservez une démonstration personnalisée de la plateforme GreenTechCycle. Découvrez le tableau de bord ITAD, la traçabilité blockchain et le comptes-rendus ESG en temps réel.",
  keywords: ["démo ITAD", "démonstration plateforme", "essai gratuit", "tableau de bord ITAD"],
  openGraph: {
    title: "Réservez une démo | GreenTechCycle",
    description: "Démonstration personnalisée de la plateforme ITAD avec traçabilité blockchain et comptes-rendus ESG.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réservez une démo | GreenTechCycle",
    description: "Découvrez la plateforme ITAD GreenTechCycle en action.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
