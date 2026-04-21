import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITAD Secteur Santé | Données patients et conformité HDS",
  description:
    "Solutions ITAD pour le secteur de la santé : effacement conforme HDS, gestion sécurisée des données patients, traçabilité et conformité RGPD santé.",
  keywords: ["ITAD santé", "HDS", "données patients", "hôpital", "conformité RGPD santé", "effacement médical"],
  openGraph: {
    title: "ITAD Secteur Santé | GreenTechCycle",
    description: "Solutions ITAD conformes HDS pour le secteur de la santé.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "ITAD Santé | GreenTechCycle", description: "Solutions ITAD pour le secteur santé." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
