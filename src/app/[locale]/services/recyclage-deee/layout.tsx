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
    ? "Professional WEEE Recycling | From €15 ex-VAT/device | GreenTechCycle"
    : "Recyclage DEEE professionnel | À partir de 15 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Regulatory WEEE recycling. Tracking slips, CSRD reporting, sovereign traceability. From €15 ex-VAT/device."
    : "Recyclage DEEE réglementaire. Bordereaux de suivi, reporting CSRD, traçabilité souveraine. À partir de 15 € HT/poste.";

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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function RecyclageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
