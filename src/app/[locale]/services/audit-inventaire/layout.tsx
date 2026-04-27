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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function AuditInventaireLayout({ children }: { children: React.ReactNode }) {
  return children;
}
