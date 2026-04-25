import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Réserver | GreenTechCycle · Waki Box & ITAD",
  description:
    "Réservez une démo Waki Box, un plan de souscription ou candidatez au programme pilote. Réponse personnalisée sous 24 heures ouvrées.",
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
