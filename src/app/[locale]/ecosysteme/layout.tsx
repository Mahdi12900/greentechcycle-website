import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Écosystème de partenaires | Réseau ITAD",
  description:
    "Notre écosystème de partenaires : centres de traitement, transporteurs, reconditionneurs et éco-organismes pour une ITAD responsable.",
  keywords: ["écosystème ITAD", "partenaires ITAD", "réseau recyclage IT", "éco-organismes"],
  openGraph: {
    title: "Écosystème partenaires | GreenTechCycle",
    description: "Réseau de partenaires ITAD : centres de traitement, transporteurs et reconditionneurs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Écosystème partenaires | GreenTechCycle",
    description: "Réseau de partenaires ITAD.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
