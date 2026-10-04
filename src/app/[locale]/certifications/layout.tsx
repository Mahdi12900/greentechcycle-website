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
    ? "Certifications & compliance | R2v3, ISO 14001, ISO 27001 in progress | GreenTechCycle"
    : "Certifications & conformité | R2v3, ISO 14001, ISO 27001 en cours | GreenTechCycle";

  const description = isEn
    ? "Status of every GreenTechCycle certification and method: R2v3, ISO 14001, ISO 9001, e-Stewards, ISO 27001 in progress, NIST SP 800-88, SHA-256 timestamped proofs."
    : "Statut de chaque certification et méthode GreenTechCycle : R2v3, ISO 14001, ISO 9001, e-Stewards, ISO 27001 en cours, NIST SP 800-88, preuves horodatées SHA-256.";

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
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
