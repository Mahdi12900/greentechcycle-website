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
    ? "NIST 800-88 Data Erasure | €24.50 to €18 ex-VAT per device | GreenTechCycle"
    : "Effacement selon NIST 800-88 | De 24,50 € à 18 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Data erasure per NIST 800-88 / DoD 5220.22-M / IEEE 2883-2022. Individual timestamped certificate (SHA-256 fingerprint) per asset, 10-year archive. €24.50 to €18 ex-VAT per device."
    : "Effacement de données selon NIST 800-88 / DoD 5220.22-M / IEEE 2883-2022. Certificat horodaté (empreinte SHA-256) par actif, archivage 10 ans. De 24,50 € à 18 € HT/poste.";

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
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/effacement-securise`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function EffacementLayout({ children }: { children: React.ReactNode }) {
  return children;
}
