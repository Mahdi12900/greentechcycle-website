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
    ? "Professional WEEE Recycling | €24.50 to €18 ex-VAT per device | GreenTechCycle"
    : "Recyclage DEEE professionnel | De 24,50 € à 18 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Regulatory WEEE recycling. Tracking slips, CSRD reporting, sovereign traceability. €24.50 to €18 ex-VAT per device."
    : "Recyclage DEEE réglementaire. Bordereaux de suivi, reporting CSRD, traçabilité souveraine. De 24,50 € à 18 € HT/poste.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/recyclage-deee`,
      languages: {
        fr: `${SITE}/fr/services/recyclage-deee`,
        en: `${SITE}/en/services/recyclage-deee`,
        "x-default": `${SITE}/fr/services/recyclage-deee`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/recyclage-deee`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function RecyclageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
