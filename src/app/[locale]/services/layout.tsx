import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services ITAD | Effacement, Collecte, Reconditionnement",
  description:
    "Découvrez nos services ITAD complets : effacement certifié NIST 800-88, collecte sécurisée, reconditionnement, reporting CSRD et traçabilité blockchain pour vos actifs IT.",
  keywords: ["services ITAD", "effacement certifié", "collecte IT", "reconditionnement", "reporting CSRD", "traçabilité blockchain"],
  openGraph: {
    title: "Services ITAD | GreenTechCycle",
    description: "Services ITAD complets : effacement certifié, collecte sécurisée, reconditionnement et reporting CSRD.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services ITAD | GreenTechCycle",
    description: "Services ITAD complets : effacement certifié, collecte sécurisée, reconditionnement et reporting CSRD.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
