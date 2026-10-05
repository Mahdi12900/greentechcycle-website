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
    ? "IT Fleet Cybersecurity, NIS2 and DORA | GreenTechCycle"
    : "Cybersécurité du parc IT, NIS2 et DORA | GreenTechCycle";

  const description = isEn
    ? "ITAD cybersecurity: secure decommissioning, NIS2 and DORA compliance, attested erasure and timestamped traceability (SHA-256) for critical IT infrastructure."
    : "Cybersécurité ITAD : décommissionnement sécurisé, conformité NIS2 et DORA, effacement attesté et traçabilité horodatée (SHA-256) pour les infrastructures IT critiques.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/cybersecurite`,
      languages: {
        fr: `${SITE}/fr/services/cybersecurite`,
        en: `${SITE}/en/services/cybersecurite`,
        "x-default": `${SITE}/fr/services/cybersecurite`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/cybersecurite`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function CybersecuriteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
