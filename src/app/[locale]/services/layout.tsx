import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";

const SITE = "https://greentechcycle-website.vercel.app";

export const metadata: Metadata = {
  title: "Services ITAD | Effacement, Collecte, Reconditionnement",
  description:
    "Decouvrez nos services ITAD complets : effacement certifie NIST 800-88, collecte securisee, reconditionnement, reporting CSRD et tracabilite blockchain pour vos actifs IT.",
  keywords: ["services ITAD", "effacement certifie", "collecte IT", "reconditionnement", "reporting CSRD", "tracabilite blockchain"],
  openGraph: {
    title: "Services ITAD | GreenTechCycle",
    description: "Services ITAD complets : effacement certifie, collecte securisee, reconditionnement et reporting CSRD.",
    type: "website",
    images: [
      {
        url: `${SITE}/photos/service-audit.jpg`,
        width: 1200,
        height: 630,
        alt: "GreenTechCycle - Services ITAD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services ITAD | GreenTechCycle",
    description: "Services ITAD complets : effacement certifie, collecte securisee, reconditionnement et reporting CSRD.",
    images: [`${SITE}/photos/service-audit.jpg`],
  },
};

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services ITAD GreenTechCycle",
  description: "Liste des services ITAD proposes par GreenTechCycle pour la gestion responsable des actifs IT en fin de vie.",
  url: "https://greentechcycle.fr/fr/services",
  numberOfItems: 5,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Audit et inventaire de parc IT",
        description: "Cartographie exhaustive de vos actifs IT, cotation de l'etat, verification reglementaire et reporting CSRD.",
        url: "https://greentechcycle.fr/fr/services/audit-inventaire",
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Effacement securise certifie",
        description: "Effacement certifie NIST 800-88, DoD 5220.22-M, avec attestation de destruction opposable.",
        url: "https://greentechcycle.fr/fr/services/effacement-securise",
        provider: { "@type": "Organization", name: "GreenTechCycle" },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "15",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "15",
            priceCurrency: "EUR",
            unitText: "poste",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Reconditionnement et valorisation",
        description: "Reconditionnement, recertification et valorisation des equipements IT avec traçabilite des flux.",
        url: "https://greentechcycle.fr/fr/services/reconditionnement-valorisation",
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Recyclage DEEE reglementaire",
        description: "Recyclage des dechets d'equipements electriques et electroniques conforme a la directive DEEE et AGEC.",
        url: "https://greentechcycle.fr/fr/services/recyclage-deee",
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Cybersecurite ITAD",
        description: "Securisation des donnees en fin de vie : destruction certifiee des supports, audit de risques et conformite RGPD.",
        url: "https://greentechcycle.fr/fr/services/cybersecurite",
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
  ],
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg data={servicesItemListSchema} />
      {children}
    </>
  );
}
