import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ITAD Secteur Finance | Conformité et sécurité bancaire",
  description:
    "Solutions ITAD pour le secteur financier : effacement certifié conforme DORA, traçabilité bancaire, gestion sécurisée des actifs IT et reporting réglementaire.",
  keywords: ["ITAD finance", "banque", "DORA", "conformité bancaire", "sécurité données financières"],
  openGraph: {
    title: "ITAD Secteur Finance | GreenTechCycle",
    description: "Solutions ITAD conformes DORA pour le secteur financier.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "ITAD Finance | GreenTechCycle", description: "Solutions ITAD pour le secteur financier." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
