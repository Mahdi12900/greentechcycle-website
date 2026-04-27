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
    ? "Professional R2v3 WEEE Recycling | From €15 ex-VAT/device | GreenTechCycle"
    : "Recyclage DEEE professionnel R2v3 | A partir de 15 € HT/poste | GreenTechCycle";

  const description = isEn
    ? "Regulatory WEEE recycling certified R2v3 and ISO 14001. Tracking slips, CSRD reporting, sovereign traceability. From €15 ex-VAT/device."
    : "Recyclage DEEE réglementaire certifié R2v3 et ISO 14001. Bordereaux de suivi, reporting CSRD, traçabilité souveraine. A partir de 15 € HT/poste.";

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
