import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITAD Secteur Industrie | Gestion des actifs IT industriels",
  description:
    "Solutions ITAD pour l'industrie : décommissionnement d'équipements OT/IT, effacement sécurisé, gestion des DEEE industriels et comptes-rendus environnementaux.",
  keywords: ["ITAD industrie", "OT/IT", "DEEE industriels", "décommissionnement", "comptes-rendus environnementaux"],
  openGraph: {
    title: "ITAD Secteur Industrie | GreenTechCycle",
    description: "Solutions ITAD pour le secteur industriel.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "ITAD Industrie | GreenTechCycle", description: "Solutions ITAD pour l'industrie." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
