import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Processus ITAD | Cycle de vie des actifs IT",
  description:
    "Notre processus ITAD en 4 étapes : audit, collecte sécurisée, effacement certifié et valorisation. Traçabilité complète et conformité garantie pour vos équipements IT.",
  keywords: ["processus ITAD", "cycle de vie IT", "décommissionnement", "audit IT", "valorisation actifs"],
  openGraph: {
    title: "Processus ITAD | GreenTechCycle",
    description: "Processus ITAD en 4 étapes avec traçabilité complète et conformité garantie.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Processus ITAD | GreenTechCycle",
    description: "Processus ITAD en 4 étapes avec traçabilité complète et conformité garantie.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
