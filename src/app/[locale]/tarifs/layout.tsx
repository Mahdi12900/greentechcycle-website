import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";

const SITE = "https://greentechcycle-website.vercel.app";

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
    ? "Public Waki Box pricing (from €39 ex-VAT/month), GTC Platform (from €2,500 ex-VAT/month) and ITAD Service (from €15 ex-VAT/device). Personalised studies available."
    : "Tarifs publics Waki Box (a partir de 39 € HT/mois), Plateforme GTC (a partir de 2 500 € HT/mois) et Service ITAD (a partir de 15 € HT/poste). Etudes personnalisees disponibles.";

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
    "Borne de collecte IT intelligente plan Essentiel : 1 borne, inventaire automatise, attestation de collecte mensuelle.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: "https://greentechcycle.fr/fr/tarifs#waki-box",
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
    url: "https://greentechcycle.fr/fr/reserver?offre=pilote-waki-box",
  },
};

const wakiBoxConfortSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Waki Box Confort",
  description:
    "Plan Confort Waki Box : 1 a 2 bornes, reporting mensuel RSE, module CSRD inclus, support prioritaire.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: "https://greentechcycle.fr/fr/tarifs#waki-box",
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
    url: "https://greentechcycle.fr/fr/reserver?offre=pilote-waki-box",
  },
};

const wakiBoxPremiumSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Waki Box Premium",
  description:
    "Plan Premium Waki Box : bornes illimitees, compte-rendu CSRD ESRS E5, API, gestionnaire dedie.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: "https://greentechcycle.fr/fr/tarifs#waki-box",
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
    url: "https://greentechcycle.fr/fr/reserver?offre=pilote-waki-box",
  },
};

const piloteAuditSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Pilote GTC Audit 3 jours",
  description:
    "Mission d'audit ITAD 3 jours sur site : diagnostic parc, cartographie risques, livraison rapport actionnable. Rembourse sur la 1re annee Plateforme si signature sous 90 jours.",
  brand: { "@type": "Brand", name: "GreenTechCycle" },
  url: "https://greentechcycle.fr/fr/tarifs#pilote",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "2900",
    availability: "https://schema.org/InStock",
    url: "https://greentechcycle.fr/fr/reserver?offre=pilote-audit-3j",
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Waki Box affiche des tarifs complets, Plateforme et ITAD des ancres : quelle difference ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Waki Box est une offre packagee et standardisee : le tarif affiche est le tarif final, sans variable cachee. Pour la Plateforme GTC SaaS et le Service ITAD, nous affichons des ancres de depart (2 500 EUR HT/mois et 15 EUR HT/poste) qui permettent de calibrer les budgets. Le devis detaille, remis sous 48 heures, affine ces ancres selon votre parc, vos modules et vos contraintes reglementaires.",
      },
    },
    {
      "@type": "Question",
      name: "Les prix Waki Box affiches sont-ils HT ou TTC ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tous les prix sont exprimes hors taxes (HT). La TVA applicable en France metropolitaine est de 20 %. Les factures mentionnent le montant HT, la TVA et le total TTC.",
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
      name: "Le Pilote GTC a 2 900 EUR HT est-il vraiment rembourse si je signe la Plateforme ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Si vous signez un abonnement Plateforme GTC SaaS dans les 90 jours suivant la restitution ecrite du Pilote, les 2 900 EUR HT sont automatiquement deduits de votre premiere facture annuelle. Cette garantie est inscrite dans le contrat Pilote.",
      },
    },
    {
      "@type": "Question",
      name: "Sous quel delai recevrai-je un devis Plateforme ou ITAD ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "48 heures ouvrées apres un echange initial de cadrage de 30 minutes. Le devis detaille le perimetre, les hypotheses retenues, les options et la grille de prix unitaire, pas de chiffrage opaque.",
      },
    },
    {
      "@type": "Question",
      name: "Les tarifs Waki Box sont-ils indexes ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une indexation annuelle est prevue, plafonnee a 3 % et basee sur l'indice INSEE des prix a la consommation. Toute revision est notifiee 60 jours avant application.",
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
      <SchemaOrg data={faqPageSchema} />
      {children}
    </>
  );
}
