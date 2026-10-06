import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import SchemaOrg from "@/components/SchemaOrg";
import { SITE_URL as SITE } from "@/lib/site";
import { itadLine } from "@/content/pricing";

const WS_E1 = itadLine("ws-e1").bands;


const META_COPY: PageCopy = {
  fr: {
    title: "Services ITAD | Effacement, collecte",
    description:
      "Nos services ITAD : effacement selon NIST 800-88, collecte sécurisée, reconditionnement et reporting CSRD pour vos actifs IT.",
  },
  en: {
    title: "ITAD services | Erasure, collection",
    description:
      "Our ITAD services: NIST 800-88 erasure, secure collection, refurbishment and CSRD reporting for your IT assets.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/services", META_COPY);
}

const servicesItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services ITAD GreenTechCycle",
  description: "Liste des services ITAD proposés par GreenTechCycle pour la gestion responsable des actifs IT en fin de vie.",
  url: `${SITE}/fr/services`,
  numberOfItems: 5,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Audit et inventaire de parc IT",
        description: "Cartographie exhaustive de vos actifs IT, cotation de l'état, vérification réglementaire et reporting CSRD.",
        url: `${SITE}/fr/services/audit-inventaire`,
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Effacement sécurisé",
        description: "Effacement selon NIST 800-88, DoD 5220.22-M, avec attestation de destruction opposable.",
        url: `${SITE}/fr/services/effacement-securise`,
        provider: { "@type": "Organization", name: "GreenTechCycle" },
        offers: {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: String(WS_E1[0]),
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(WS_E1[0]),
            minPrice: String(WS_E1[WS_E1.length - 1]),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
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
        description: "Reconditionnement, tests et valorisation des équipements IT avec traçabilité des flux.",
        url: `${SITE}/fr/services/reconditionnement-valorisation`,
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Recyclage DEEE réglementaire",
        description: "Recyclage des déchets d'équipements électriques et électroniques conforme à la directive DEEE et AGEC.",
        url: `${SITE}/fr/services/recyclage-deee`,
        provider: { "@type": "Organization", name: "GreenTechCycle" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Cybersécurité ITAD",
        description: "Sécurisation des données en fin de vie : destruction attestée des supports, audit de risques et conformité RGPD.",
        url: `${SITE}/fr/services/cybersecurite`,
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
