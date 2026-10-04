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
    ? "Compliance & approach | ISO 27001 in progress, NIST SP 800-88 erasure"
    : "Conformité & démarche | ISO 27001 en cours, effacement NIST SP 800-88";

  const description = isEn
    ? "GreenTechCycle does not hold any certification to date; ISO 27001 certification is in progress. Applied methods (NIST SP 800-88, IEEE 2883, HMG IS5), SHA-256 proof per asset, regulatory context."
    : "GreenTechCycle ne détient pas de certification à ce jour ; la démarche ISO 27001 est en cours. Méthodes appliquées (NIST SP 800-88, IEEE 2883, HMG IS5), preuve SHA-256 par actif, cadre réglementaire.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/certifications`,
      languages: {
        fr: `${SITE}/fr/certifications`,
        en: `${SITE}/en/certifications`,
        "x-default": `${SITE}/fr/certifications`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/certifications`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
