import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réglementation ITAD | CSRD, RGPD, NIS2, DEEE",
  description:
    "Guide complet des réglementations applicables à l'ITAD : CSRD, RGPD, NIS2, directive DEEE, R2v3. Restez conforme avec GreenTechCycle.",
  keywords: ["réglementation ITAD", "CSRD", "RGPD", "NIS2", "DEEE", "R2v3", "conformité IT"],
  openGraph: {
    title: "Réglementation ITAD | GreenTechCycle",
    description: "Guide des réglementations ITAD : CSRD, RGPD, NIS2, DEEE. Conformité simplifiée.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Réglementation ITAD | GreenTechCycle",
    description: "Guide des réglementations ITAD : CSRD, RGPD, NIS2, DEEE.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
