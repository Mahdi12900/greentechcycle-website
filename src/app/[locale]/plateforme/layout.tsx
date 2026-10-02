import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";

const SITE = "https://cst-greentechcycle--979dplvl.cloud-station.app";

export const metadata: Metadata = {
  title: "Plateforme ITAD unifiée | Tableau de bord et traçabilité",
  description:
    "Plateforme SaaS ITAD unifiée : tableau de bord temps réel, traçabilité blockchain, comptes-rendus automatisés et intégration API pour la gestion de vos actifs IT en fin de vie.",
  keywords: ["plateforme ITAD", "SaaS", "tableau de bord", "traçabilité blockchain", "comptes-rendus automatisés", "API"],
  openGraph: {
    title: "Plateforme ITAD unifiée | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps réel, traçabilité blockchain et comptes-rendus automatisés.",
    type: "website",
    images: [
      {
        url: `${SITE}/photos/hp-datacenter-green.jpg`,
        width: 1200,
        height: 630,
        alt: "GreenTechCycle - Plateforme ITAD SaaS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plateforme ITAD unifiée | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps réel, traçabilité blockchain et comptes-rendus automatisés.",
    images: [`${SITE}/photos/hp-datacenter-green.jpg`],
  },
};

const platformeSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plateforme GTC - ITAD SaaS",
  description:
    "Plateforme SaaS ITAD unifiée : tableau de bord temps réel, traçabilité blockchain, comptes-rendus automatisés CSRD/ESG et intégration API pour la gestion responsable des actifs IT en fin de vie.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://greentechcycle.fr/fr/plateforme",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "2500",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "2500",
      priceCurrency: "EUR",
      unitText: "mois",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitText: "mois" },
    },
    availability: "https://schema.org/InStock",
    url: "https://greentechcycle.fr/fr/reserver?offre=audit-decommissionnement",
  },
  featureList: [
    "Tableau de bord temps réel multi-sites",
    "Traçabilité blockchain certificats de destruction",
    "Comptes-rendus CSRD ESRS E5 automatisés",
    "Intégration API REST",
    "Effacement certifié NIST 800-88",
    "Reporting carbone actifs IT",
  ],
  provider: {
    "@type": "Organization",
    name: "GreenTechCycle",
    url: "https://greentechcycle.fr",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg data={platformeSchema} />
      {children}
    </>
  );
}
