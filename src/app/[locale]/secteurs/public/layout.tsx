import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITAD Secteur Public | Conformité et transparence",
  description:
    "Solutions ITAD pour le secteur public : conformité réglementaire, transparence des processus, marchés publics, gestion des données sensibles et comptes-rendus ESG.",
  keywords: ["ITAD secteur public", "administration", "collectivités", "marchés publics", "transparence ITAD"],
  openGraph: {
    title: "ITAD Secteur Public | GreenTechCycle",
    description: "Solutions ITAD conformes pour le secteur public.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "ITAD Secteur Public | GreenTechCycle", description: "Solutions ITAD pour le secteur public." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
