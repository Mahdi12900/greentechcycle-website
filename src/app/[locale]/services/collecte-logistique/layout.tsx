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
    ? "Secure collection & logistics | Seals, GPS, handover report | GreenTechCycle"
    : "Collecte & logistique sécurisées | Scellés, GPS, PV | GreenTechCycle";

  const description = isEn
    ? "Secure on-site collection: intervention within 48h, GPS-tracked vehicles, numbered seals, handover report, timestamped chain of custody."
    : "Collecte sécurisée sur site : intervention sous 48 h, véhicules suivis GPS, scellés numérotés, PV de prise en charge, chaîne de garde horodatée.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/services/collecte-logistique`,
      languages: {
        fr: `${SITE}/fr/services/collecte-logistique`,
        en: `${SITE}/en/services/collecte-logistique`,
        "x-default": `${SITE}/fr/services/collecte-logistique`,
      },
    },
    openGraph: { title, description, type: "website", url: `${SITE}/${locale}/services/collecte-logistique`, images: [DEFAULT_OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [DEFAULT_OG_IMAGE] },
  };
}

export default function CollecteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
