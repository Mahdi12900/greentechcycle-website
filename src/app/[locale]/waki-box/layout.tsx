import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waki Box | La box DEEE connectée prête CSRD ESRS E5",
  description:
    "Waki Box : box de collecte DEEE intelligente avec capteurs, conformité REP DEEE garantie, mapping ESRS E5 et données mesurées au gramme. Trois plans, programme pilote et options à la carte.",
  keywords: [
    "Waki Box",
    "box DEEE connectee",
    "REP DEEE",
    "CSRD ESRS E5",
    "collecte piles batteries",
    "RSE bureaux",
  ],
  openGraph: {
    title: "Waki Box | La box DEEE qui pense à votre place",
    description:
      "Conformité REP DEEE, sécurité batteries lithium, mapping ESRS E5 mesuré au gramme. Trois plans, programme pilote, options à la carte.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waki Box | La box DEEE connectée",
    description:
      "Conformité REP DEEE, mapping ESRS E5, sécurité batteries lithium. Réservez une démo ou candidatez au pilote.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
