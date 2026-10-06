import type { Metadata } from "next";
import SchemaOrg from "@/components/SchemaOrg";
import { BANDS, EDITIONS, ITAD_LINES, PS_PACKAGES, TRIAL, WAKI_PLANS, type BandPrices } from "@/content/pricing";
import { PRICING_FAQ } from "@/content/pricing-faq";
import { SITE_URL as SITE } from "@/lib/site";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const titleStr = isEn
    ? "Pricing: Platform, ITAD, Pick-up and Waki Box | GreenTechCycle"
    : "Tarifs : Plateforme, ITAD, collecte et Waki Box | GreenTechCycle";

  const description = isEn
    ? "Full public price list: free 90-day trial, Platform from €8.50 ex-VAT per asset per month over 9 graduated bands, ITAD from €18 ex-VAT per device, pick-up free when the buyback value covers it, Waki Box from €40 ex-VAT/month."
    : "Liste de prix publique complète : essai gratuit 90 jours, Plateforme dès 8,50 € HT par actif et par mois sur 9 tranches dégressives, ITAD dès 18 € HT par appareil, collecte offerte quand le rachat la finance, Waki Box dès 40 € HT/mois.";

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

/* ── JSON-LD schemas — générés depuis src/content/pricing.ts (liste publique) ── */

const brand = { "@type": "Brand", name: "GreenTechCycle" };

/** Une UnitPriceSpecification par tranche (eligibleQuantity = bornes de la tranche). */
const bandSpecs = (bands: BandPrices, unitText: string) =>
  bands.flatMap((p, i) =>
    p == null
      ? []
      : [
          {
            "@type": "UnitPriceSpecification",
            price: String(p),
            priceCurrency: "EUR",
            valueAddedTaxIncluded: false,
            unitText,
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              minValue: BANDS[i].min,
              ...(BANDS[i].max != null ? { maxValue: BANDS[i].max } : {}),
            },
          },
        ]
  );

const platformSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Plateforme GTC — Asset Management",
  description:
    "Inventaire IT et OT, indicateurs de fin de support, planification des renouvellements, connecteurs SAP / Oracle / ServiceNow. Prix par actif et par mois sur 9 tranches progressives, engagement annuel.",
  brand,
  url: `${SITE}/fr/tarifs#editions`,
  offers: [
    {
      "@type": "Offer",
      name: `Essai gratuit Asset Management (${TRIAL.days} jours, ${TRIAL.maxAssets} actifs)`,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE}/fr/reserver?offre=essai-asset-management`,
    },
    ...EDITIONS.map((e) => ({
      "@type": "Offer",
      name: e.name,
      price: String(e.bands[0]),
      priceCurrency: "EUR",
      priceSpecification: bandSpecs(e.bands, "actif/mois"),
      availability: "https://schema.org/InStock",
      url: `${SITE}/fr/tarifs#editions`,
    })),
  ],
};

const itadSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Services ITAD GreenTechCycle",
  description:
    "Effacement NIST 800-88 (E1 Clear, E2 Purge vérifiée), destruction physique (E3), certificat par numéro de série et preuve numérique inclus. Prix par appareil sur 9 tranches progressives.",
  provider: { "@type": "Organization", name: "GreenTechCycle" },
  url: `${SITE}/fr/tarifs#prix-itad`,
  offers: ITAD_LINES.map((l) => ({
    "@type": "Offer",
    name: l.name.fr,
    price: String(l.bands[0]),
    priceCurrency: "EUR",
    priceSpecification: bandSpecs(l.bands, l.unit.fr),
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/tarifs#prix-itad`,
  })),
};

const wakiSchemas = WAKI_PLANS.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `Waki Box ${p.name}`,
  description: `Suivi DEEE connecté, plan ${p.name} : ${p.kiosks} borne${p.kiosks > 1 ? "s" : ""}, engagement ${p.commitmentMonths} mois.`,
  brand,
  url: `${SITE}/fr/tarifs#plans`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: String(p.monthly),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(p.monthly),
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
      unitText: "mois",
    },
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=waki-box-${p.id}`,
  },
}));

const pilot = PS_PACKAGES.find((p) => p.id === "pilote-3j")!;
const piloteAuditSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Pilote GTC 3 jours",
  description: "Mission de 3 jours : audit de parc, plan d'action ITAD, démarrage de la plateforme. Déductible d'un contrat Plateforme signé sous 90 jours.",
  brand,
  url: `${SITE}/fr/tarifs#pilote`,
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: String(pilot.amount),
    availability: "https://schema.org/InStock",
    url: `${SITE}/fr/reserver?offre=pilote-audit-3j`,
  },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQ.fr.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function TarifsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SchemaOrg data={platformSchema} />
      <SchemaOrg data={itadSchema} />
      {wakiSchemas.map((s) => (
        <SchemaOrg key={s.name} data={s} />
      ))}
      <SchemaOrg data={piloteAuditSchema} />
      <SchemaOrg data={faqPageSchema} />
      {children}
    </>
  );
}
