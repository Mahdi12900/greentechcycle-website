import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours client | De l'audit à la valorisation de vos actifs IT",
  description:
    "Suivez le parcours client GreenTechCycle : audit initial, planification, collecte sécurisée, traitement certifié et restitution. Un accompagnement de bout en bout.",
  keywords: ["parcours client ITAD", "accompagnement IT", "audit parc informatique", "collecte sécurisée"],
  openGraph: {
    title: "Parcours client | GreenTechCycle",
    description: "De l'audit à la valorisation : un accompagnement ITAD de bout en bout.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parcours client | GreenTechCycle",
    description: "Accompagnement ITAD de bout en bout.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
