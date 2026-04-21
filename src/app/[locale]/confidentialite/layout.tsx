import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de GreenTechCycle : traitement des données personnelles, droits RGPD et cookies.",
  openGraph: { title: "Confidentialité | GreenTechCycle", description: "Politique de confidentialité de GreenTechCycle.", type: "website" },
  twitter: { card: "summary", title: "Confidentialité | GreenTechCycle", description: "Politique de confidentialité." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
