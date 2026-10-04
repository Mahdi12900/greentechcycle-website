import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import SchemaOrg from "@/components/SchemaOrg";
import { SITE_URL as SITE } from "@/lib/site";


const META_COPY: PageCopy = {
  fr: {
    title: "Plateforme ITAD unifiée | Tableau de bord et traçabilité",
    description:
      "Plateforme SaaS ITAD unifiée : tableau de bord temps réel, traçabilité horodatée (SHA-256), comptes-rendus automatisés et intégration API pour la gestion de vos actifs IT en fin de vie.",
  },
  en: {
    title: "Unified ITAD platform | Dashboard and traceability",
    description:
      "Unified ITAD SaaS platform: real-time dashboard, timestamped traceability (SHA-256), automated reporting and API integration to manage your end-of-life IT assets.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/plateforme", META_COPY);
}

const platformeSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Plateforme GTC - ITAD SaaS",
  description:
    "Plateforme SaaS ITAD unifiée : tableau de bord temps réel, traçabilité horodatée (SHA-256), comptes-rendus automatisés CSRD/ESG et intégration API pour la gestion responsable des actifs IT en fin de vie.",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE}/fr/plateforme`,
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
    url: `${SITE}/fr/reserver?offre=audit-decommissionnement`,
  },
  featureList: [
    "Tableau de bord temps réel multi-sites",
    "Traçabilité SHA-256 des certificats de destruction",
    "Comptes-rendus CSRD ESRS E5 automatisés",
    "Intégration API REST",
    "Effacement selon NIST 800-88",
    "Reporting carbone actifs IT",
  ],
  provider: {
    "@type": "Organization",
    name: "GreenTechCycle",
    url: `${SITE}`,
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
