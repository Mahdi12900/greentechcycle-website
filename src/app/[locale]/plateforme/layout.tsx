import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";

const SITE = "https://greentechcycle-website.vercel.app";

export const metadata: Metadata = {
  title: "Plateforme ITAD unifiee | Tableau de bord et tracabilite",
  description:
    "Plateforme SaaS ITAD unifiee : tableau de bord temps reel, tracabilite blockchain, comptes-rendus automatises et integration API pour la gestion de vos actifs IT en fin de vie.",
  keywords: ["plateforme ITAD", "SaaS", "tableau de bord", "tracabilite blockchain", "comptes-rendus automatises", "API"],
  openGraph: {
    title: "Plateforme ITAD unifiee | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps reel, tracabilite blockchain et comptes-rendus automatises.",
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
    title: "Plateforme ITAD unifiee | GreenTechCycle",
    description: "Plateforme SaaS ITAD : tableau de bord temps reel, tracabilite blockchain et comptes-rendus automatises.",
    images: [`${SITE}/photos/hp-datacenter-green.jpg`],
  },
};

const platformeSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plateforme GTC - ITAD SaaS",
  description:
    "Plateforme SaaS ITAD unifiee : tableau de bord temps reel, tracabilite blockchain, comptes-rendus automatises CSRD/ESG et integration API pour la gestion responsable des actifs IT en fin de vie.",
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
    "Tableau de bord temps reel multi-sites",
    "Tracabilite blockchain certificats de destruction",
    "Comptes-rendus CSRD ESRS E5 automatises",
    "Integration API REST",
    "Effacement certifie NIST 800-88",
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
