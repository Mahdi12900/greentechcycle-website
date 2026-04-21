import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Écosystème de partenaires | Réseau ITAD certifié",
  description:
    "Notre écosystème de partenaires certifiés : centres de traitement R2v3, transporteurs agréés, reconditionneurs et éco-organismes pour une ITAD responsable.",
  keywords: ["écosystème ITAD", "partenaires certifiés", "R2v3", "réseau recyclage IT", "éco-organismes"],
  openGraph: {
    title: "Écosystème partenaires | GreenTechCycle",
    description: "Réseau de partenaires ITAD certifiés : centres R2v3, transporteurs et reconditionneurs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Écosystème partenaires | GreenTechCycle",
    description: "Réseau de partenaires ITAD certifiés.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
