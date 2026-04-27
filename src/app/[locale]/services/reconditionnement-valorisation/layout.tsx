import type { Metadata } from "next";

const SITE = "https://greentechcycle-website.vercel.app";

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
    ? "Certified IT equipment refurbishment and value recovery. Resale, donation or responsible recycling. R2v3 certified, CSRD reporting included."
    : "Reconditionnement certifié et valorisation du matériel IT en fin de vie. Revente, don ou recyclage responsable. Certifié R2v3, reporting CSRD inclus.";

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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function ReconditionnementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
