import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation de la plateforme GreenTechCycle et du site web.",
  openGraph: { title: "CGU | GreenTechCycle", description: "Conditions générales d'utilisation de GreenTechCycle.", type: "website" },
  twitter: { card: "summary", title: "CGU | GreenTechCycle", description: "CGU de GreenTechCycle." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
