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
    ? "NIST 800-88 Certified Data Erasure | From €15 ex-VAT/device | GreenTechCycle"
    : "Effacement certifié NIST 800-88 | A partir de 15 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Certified data erasure NIST 800-88 / DoD 5220.22-M / IEEE 2883-2022. Individual eIDAS-signed certificate per asset, 10-year archive. From €15 ex-VAT/device."
    : "Effacement de données certifié NIST 800-88 / DoD 5220.22-M / IEEE 2883-2022. Certificat eIDAS signé par actif, archivage 10 ans. A partir de 15 € HT/poste.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/effacement-securise`,
      languages: {
        fr: `${SITE}/fr/services/effacement-securise`,
        en: `${SITE}/en/services/effacement-securise`,
        "x-default": `${SITE}/fr/services/effacement-securise`,
      },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function EffacementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
