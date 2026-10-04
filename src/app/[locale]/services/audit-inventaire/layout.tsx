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
    ? "IT Fleet Audit and Inventory | GreenTechCycle"
    : "Audit et inventaire de parc IT | GreenTechCycle";

  const description = isEn
    ? "Comprehensive IT fleet audit and inventory: exhaustive asset mapping, condition grading, regulatory compliance check and CSRD reporting."
    : "Audit et inventaire exhaustif de parc IT : cartographie des actifs, cotation de l'état, vérification réglementaire et reporting CSRD.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/audit-inventaire`,
      languages: {
        fr: `${SITE}/fr/services/audit-inventaire`,
        en: `${SITE}/en/services/audit-inventaire`,
        "x-default": `${SITE}/fr/services/audit-inventaire`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/audit-inventaire`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function AuditInventaireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
