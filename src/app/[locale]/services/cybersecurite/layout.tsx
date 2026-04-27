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
    ? "IT Fleet Cybersecurity, NIS2 and DORA | GreenTechCycle"
    : "Cybersécurité du parc IT, NIS2 et DORA | GreenTechCycle";

  const description = isEn
    ? "ITAD cybersecurity: secure decommissioning, NIS2 and DORA compliance, certified erasure and blockchain traceability for critical IT infrastructure."
    : "Cybersécurité ITAD : décommissionnement sécurisé, conformité NIS2 et DORA, effacement certifié et traçabilité blockchain pour les infrastructures IT critiques.";

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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CybersecuriteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
