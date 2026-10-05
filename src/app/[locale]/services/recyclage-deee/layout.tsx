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
    ? "Professional WEEE Recycling | From €19 ex-VAT/device | GreenTechCycle"
    : "Recyclage DEEE professionnel | À partir de 19 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Regulatory WEEE recycling. Tracking slips, CSRD reporting, sovereign traceability. From €19 ex-VAT/device."
    : "Recyclage DEEE réglementaire. Bordereaux de suivi, reporting CSRD, traçabilité souveraine. À partir de 19 € HT/poste.";

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
