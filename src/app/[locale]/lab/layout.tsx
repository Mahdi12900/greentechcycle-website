import type { Metadata } from "next";
import { SITE_URL as SITE } from "@/lib/site";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn
    ? "GreenTechCycle Lab | Applied R&D"
    : "GreenTechCycle Lab | R&D appliquée";

  const description = isEn
    ? "GreenTechCycle's applied R&D lab: eight research programmes, data and AI governance, and pilot programmes by sector."
    : "Le laboratoire de R&D appliquée de GreenTechCycle : huit programmes de recherche, gouvernance des données et de l'IA, programmes pilotes par secteur.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/lab`,
      languages: {
        fr: `${SITE}/fr/lab`,
        en: `${SITE}/en/lab`,
        "x-default": `${SITE}/fr/lab`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/lab`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
