import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrières | Rejoignez l'équipe GreenTechCycle",
  description:
    "Rejoignez GreenTechCycle et participez à la révolution de l'IT responsable. Découvrez nos offres d'emploi dans l'ITAD, le développement durable et la tech.",
  keywords: ["carrières GreenTechCycle", "emploi ITAD", "recrutement IT durable", "offres emploi recyclage IT"],
  openGraph: {
    title: "Carrières | GreenTechCycle",
    description: "Rejoignez l'équipe GreenTechCycle et participez à la révolution de l'IT responsable.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrières | GreenTechCycle",
    description: "Rejoignez l'équipe GreenTechCycle.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
