import type { Metadata } from "next";

const SITE = "https://cst-greentechcycle--979dplvl.cloud-station.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn
    ? "GreenTechCycle Lab | Applied R&D for proof, security and circular IT"
    : "GreenTechCycle Lab | R&D appliquée : preuve, sécurité et IT circulaire";

  const description = isEn
    ? "GreenTechCycle Lab, GreenTechCycle's applied R&D lab: mission, red lines, the five dimensions of proof, refusal policy, data and AI governance, eight research programmes and a call for ITAD and refurbishing partners."
    : "GreenTechCycle Lab, le laboratoire de R&D appliquée de GreenTechCycle : mission, lignes rouges, cinq dimensions de la preuve, politique de refus, gouvernance des données et de l'IA, huit programmes de recherche et appel à partenaires ITAD et reconditionneurs.";

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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
