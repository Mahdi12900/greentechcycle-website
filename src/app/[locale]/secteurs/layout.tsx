import type { Metadata } from "next";

const SITE = "https://greentechcycle-website.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const titleStr = isEn
    ? "Sector-specific ITAD expertise, 16 sectors covered | GreenTechCycle"
    : "Expertise ITAD sectorielle, 16 secteurs couverts | GreenTechCycle";

  const description = isEn
    ? "Detailed ITAD use cases by industry sector: banking, healthcare, manufacturing, retail, energy, media, transport and 9 more. Unified platform for critical IT fleets."
    : "Cas d'usage ITAD détaillés par secteur d'activité : banque, santé, industrie, retail, énergie, médias, transport et 9 autres. Plateforme unifiée pour parcs IT critiques.";

  return {
    title: { absolute: titleStr },
    description,
    alternates: {
      canonical: `${SITE}/${locale}/secteurs`,
      languages: {
        fr: `${SITE}/fr/secteurs`,
        en: `${SITE}/en/secteurs`,
        "x-default": `${SITE}/fr/secteurs`,
      },
    },
    openGraph: {
      title: titleStr,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description,
    },
  };
}

export default function SecteursLayout({ children }: { children: React.ReactNode }) {
  return children;
}
