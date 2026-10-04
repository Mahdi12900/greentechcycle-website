import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import { ITAD_TIERS, PLATFORM_TIERS, type PriceTier } from "@/content/pricing";
import { SITE_URL as SITE } from "@/lib/site";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const titleStr = isEn
    ? "Waki Box, Platform and ITAD Service Pricing | GreenTechCycle"
    : "Tarifs Waki Box, Plateforme et Service ITAD | GreenTechCycle";

  const description = isEn
    ? "Public, transparent pricing: Waki Box from €39 ex-VAT/month, GTC Platform from €1,400 ex-VAT/month (up to 200 assets), ITAD Service from €19 ex-VAT/device and €55 ex-VAT/unit for servers and racks."
    : "Prix publics et transparents : Waki Box dès 39 € HT/mois, Plateforme GTC dès 1 400 € HT/mois (jusqu'à 200 actifs), Service ITAD dès 19 € HT/poste et 55 € HT/unité pour les serveurs et baies.";

  return {
    title: { absolute: titleStr },
    description,
    alternates: {
      canonical: `${SITE}/${locale}/tarifs`,
      languages: {
        fr: `${SITE}/fr/tarifs`,
        en: `${SITE}/en/tarifs`,
        "x-default": `${SITE}/fr/tarifs`,
      },
    },
    openGraph: {
      title: titleStr,
      description,
      type: "website",
      images: [
        {
          url: `${SITE}/photos/hp-rssi-boardroom.jpg`,
          width: 1200,
          height: 630,
          alt: "GreenTechCycle - Tarifs ITAD et Waki Box",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description,
      images: [`${SITE}/photos/hp-rssi-boardroom.jpg`],
    },
  };
}

/* ── JSON-LD schemas ──────────────────────────────────────────────────────── */

const wakiBoxEssentielSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Waki Box Essentiel",
  description:
    "Suivi DEEE connecté, plan Essentiel : 1 borne Waki Box installée, plateforme de suivi (1 utilisateur), rapport trimestriel de flux DEEE.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#waki-box`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "39",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "39",
      priceCurrency: "EUR",
      unitText: "mois",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitText: "mois" },
    },
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=pilote-waki-box`,
  },
};

const wakiBoxConfortSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Waki Box Confort",
  description:
    "Suivi DEEE connecté, plan Confort : jusqu'à 3 bornes, plateforme complète (5 utilisateurs), alertes de remplissage en temps réel, rapport mensuel et export CSRD ESRS E5.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#waki-box`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "79",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "79",
      priceCurrency: "EUR",
      unitText: "mois",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitText: "mois" },
    },
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=pilote-waki-box`,
  },
};

const wakiBoxPremiumSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Waki Box Premium",
  description:
    "Suivi DEEE connecté, plan Premium : bornes illimitées multi-sites, intégration ERP/SIRH par API, responsable de compte dédié, délai de collecte de 48 h garanti.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#waki-box`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "149",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "149",
      priceCurrency: "EUR",
      unitText: "mois",
      referenceQuantity: { "@type": "QuantitativeValue", value: "1", unitText: "mois" },
    },
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=pilote-waki-box`,
  },
};

const piloteAuditSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Pilote GTC Audit 3 jours",
  description:
    "Mission d'audit ITAD 3 jours sur site : diagnostic parc, cartographie risques, livraison rapport actionnable. Rembourse sur la 1re annee Plateforme si signature sous 90 jours.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#pilote`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "2900",
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=pilote-audit-3j`,
  },
};

/* Plateforme et Service ITAD : une Offer par palier, générée depuis src/content/pricing.ts */
const tierOffer = (t: PriceTier, url: string) => ({
  "@type": "Offer",
  name: t.name.fr,
  description: `${t.scope.fr} — ${t.price.fr}`,
  priceCurrency: "EUR",
  price: String(t.amount),
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price: String(t.amount),
    priceCurrency: "EUR",
    valueAddedTaxIncluded: false,
    unitText: t.unitText,
    ...(t.from ? { minPrice: String(t.amount) } : {}),
  },
  availability: "https://schema.org/InStock",
  url,
});

const platformSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Plateforme GTC SaaS",
  description:
    "Console unifiée d'inventaire, d'audit, d'effacement et de reporting CSRD. Trois paliers selon le nombre d'actifs gérés.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#sur-devis`,
  offers: PLATFORM_TIERS.map((t) => tierOffer(t, `${SITE}/fr/reserver?offre=demo-conseil&brique=plateforme`)),
};

const itadSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Service ITAD GreenTechCycle",
  description:
    "Audit de parc, effacement selon NIST 800-88, reconditionnement et recyclage DEEE réglementaire. Prix unitaire par poste ou par équipement complexe.",
  provider: { "@type": "Organization", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#sur-devis`,
  offers: ITAD_TIERS.map((t) => tierOffer(t, `${SITE}/fr/reserver?offre=demo-conseil&brique=itad`)),
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Pourquoi certains prix sont-ils indiqués « à partir de » ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waki Box est une offre packagée : le tarif affiché est le tarif final. La Plateforme GTC SaaS et le Service ITAD ont aussi une grille publique : Plateforme Essentiel à 1 400 EUR HT/mois jusqu'à 200 actifs, Standard à partir de 2 500 EUR HT/mois de 201 à 2 000 actifs, Grand compte à partir de 4,20 EUR HT/actif/mois au-delà ; ITAD à partir de 19 EUR HT/poste et 55 EUR HT/unité pour les serveurs, baies et équipements complexes. « À partir de » signifie que le prix peut évoluer selon les modules, les connecteurs, le SLA ou la logistique : le devis détaillé, remis sous 48 heures, le précise ligne par ligne.",
      },
    },
    {
      "@type": "Question",
      name: "Les prix Waki Box affichés sont-ils HT ou TTC ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tous les prix sont exprimés hors taxes (HT). La TVA applicable en France métropolitaine est de 20 %. Les factures mentionnent le montant HT, la TVA et le total TTC.",
      },
    },
    {
      "@type": "Question",
      name: "Puis-je combiner Waki Box, Plateforme GTC et services ITAD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. De nombreux clients associent un plan Waki Box pour la collecte au quotidien avec un abonnement Plateforme pour le pilotage parc et des missions ITAD ponctuelles. Les trois briques s'articulent dans une seule relation contractuelle.",
      },
    },
    {
      "@type": "Question",
      name: "Le Pilote GTC à 2 900 EUR HT est-il vraiment remboursé si je signe la Plateforme ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Si vous signez un abonnement Plateforme GTC SaaS dans les 90 jours suivant la restitution écrite du Pilote, les 2 900 EUR HT sont automatiquement déduits de votre première facture annuelle. Cette garantie est inscrite dans le contrat Pilote.",
      },
    },
    {
      "@type": "Question",
      name: "Sous quel délai recevrai-je un devis Plateforme ou ITAD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "48 heures ouvrées après un échange initial de cadrage de 30 minutes. Le devis détaille le périmètre, les hypothèses retenues, les options et la grille de prix unitaire, pas de chiffrage opaque.",
      },
    },
    {
      "@type": "Question",
      name: "Les tarifs Waki Box sont-ils indexés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une indexation annuelle est prévue, plafonnée à 3 % et basée sur l'indice INSEE des prix à la consommation. Toute révision est notifiée 60 jours avant application.",
      },
    },
  ],
};

export default async function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SchemaOrg data={wakiBoxEssentielSchema} />
      <SchemaOrg data={wakiBoxConfortSchema} />
      <SchemaOrg data={wakiBoxPremiumSchema} />
      <SchemaOrg data={piloteAuditSchema} />
      <SchemaOrg data={platformSchema} />
      <SchemaOrg data={itadSchema} />
      <SchemaOrg data={faqPageSchema} />
      {children}
    </>
  );
}
