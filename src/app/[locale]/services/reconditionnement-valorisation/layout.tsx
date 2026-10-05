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
    ? "IT Equipment Refurbishment and Value Recovery | GreenTechCycle"
    : "Reconditionnement et valorisation matériel IT | GreenTechCycle";

  const description = isEn
    ? "IT equipment refurbishment and value recovery. Resale, donation or responsible recycling. CSRD reporting included."
    : "Reconditionnement et valorisation du matériel IT en fin de vie. Revente, don ou recyclage responsable. Reporting CSRD inclus.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/reconditionnement-valorisation`,
      languages: {
        fr: `${SITE}/fr/services/reconditionnement-valorisation`,
        en: `${SITE}/en/services/reconditionnement-valorisation`,
        "x-default": `${SITE}/fr/services/reconditionnement-valorisation`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/reconditionnement-valorisation`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function ReconditionnementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
