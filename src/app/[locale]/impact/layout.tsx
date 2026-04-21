import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact environnemental | Bilan carbone IT et économie circulaire",
  description:
    "Mesurez et réduisez l'impact environnemental de votre parc IT. Bilan carbone automatisé, tonnes de CO2 évitées et indicateurs d'économie circulaire pour votre reporting ESG.",
  keywords: ["impact environnemental IT", "bilan carbone", "économie circulaire", "CO2 évité", "reporting ESG", "CSRD"],
  openGraph: {
    title: "Impact environnemental | GreenTechCycle",
    description: "Bilan carbone IT automatisé et indicateurs d'économie circulaire pour votre reporting ESG.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Impact environnemental | GreenTechCycle",
    description: "Bilan carbone IT automatisé et indicateurs d'économie circulaire.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
