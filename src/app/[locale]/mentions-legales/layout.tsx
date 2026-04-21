import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de GreenTechCycle : informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
  openGraph: { title: "Mentions légales | GreenTechCycle", description: "Mentions légales de GreenTechCycle.", type: "website" },
  twitter: { card: "summary", title: "Mentions légales | GreenTechCycle", description: "Mentions légales de GreenTechCycle." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
