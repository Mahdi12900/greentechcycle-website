import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Bilan carbone IT, calculateur empreinte numérique entreprise | ESRS E5",
  description:
    "Calculez l'empreinte carbone de votre parc IT selon GHG Protocol, ADEME Bilan Carbone v8 et ISO 14064-1. Mapping CSRD ESRS E5 direct, comparatif neuf vs reconditionné, méthodologie auditable.",
  keywords: [
    "bilan carbone IT",
    "calculateur empreinte numérique entreprise",
    "ESRS E5",
    "CSRD numérique",
    "GHG Protocol Scope 3",
    "ADEME Bilan Carbone",
    "ISO 14064-1",
    "Boavizta",
    "économie circulaire IT",
    "reconditionné vs neuf",
    "facteurs émission ADEME",
    "Scope 3 catégorie 11",
    "rapport extra-financier",
    "bilan carbone numérique",
    "DSI RSE CSRD",
    "audit carbone IT",
  ],
  alternates: {
    canonical: "https://greentechcycle.fr/impact",
    languages: {
      "fr-FR": "https://greentechcycle.fr/fr/impact",
      "en-US": "https://greentechcycle.fr/en/impact",
    },
  },
  openGraph: {
    title:
      "Bilan carbone IT & calculateur empreinte numérique | GreenTechCycle",
    description:
      "Méthodologie GHG Protocol + ADEME + ISO 14064-1. Calculateur ROI carbone, mapping CSRD ESRS E5, comparatif neuf vs reconditionné chiffré.",
    type: "website",
    url: "https://greentechcycle.fr/impact",
    siteName: "GreenTechCycle",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bilan carbone IT & calculateur empreinte numérique | GreenTechCycle",
    description:
      "Méthodologie GHG Protocol + ADEME + ISO 14064-1. Calculateur ROI carbone et mapping CSRD ESRS E5.",
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
