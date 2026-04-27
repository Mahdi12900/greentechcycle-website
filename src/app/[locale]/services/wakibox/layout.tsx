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
    ? "Waki Box, Connected Professional WEEE Collection Kiosk | From €39 ex-VAT/month | GreenTechCycle"
    : "Waki Box, box DEEE professionnelle connectée | A partir de 39 € HT/mois | GreenTechCycle";

  const description = isEn
    ? "Waki Box: connected WEEE collection kiosk for the workplace. Real-time monitoring, fill alerts, CSRD ESRS E5 reporting. Three plans from €39 ex-VAT/month."
    : "Waki Box : borne de collecte DEEE connectée pour l'entreprise. Suivi temps réel, alertes de remplissage, reporting CSRD ESRS E5. Trois plans à partir de 39 € HT/mois.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/wakibox`,
      languages: {
        fr: `${SITE}/fr/services/wakibox`,
        en: `${SITE}/en/services/wakibox`,
        "x-default": `${SITE}/fr/services/wakibox`,
      },
    },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function WakiboxLayout({ children }: { children: React.ReactNode }) {
  return children;
}
