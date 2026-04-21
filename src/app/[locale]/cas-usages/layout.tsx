import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cas d'usage | Solutions ITAD par secteur et besoin",
  description:
    "Découvrez nos cas d'usage ITAD : migration data center, renouvellement parc, conformité RGPD, reporting CSRD. Solutions adaptées à chaque secteur d'activité.",
  keywords: ["cas usage ITAD", "migration data center", "renouvellement parc IT", "conformité RGPD", "solutions sectorielles"],
  openGraph: {
    title: "Cas d'usage ITAD | GreenTechCycle",
    description: "Solutions ITAD adaptées : migration, renouvellement, conformité RGPD et reporting CSRD.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cas d'usage ITAD | GreenTechCycle",
    description: "Solutions ITAD par secteur et besoin.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
