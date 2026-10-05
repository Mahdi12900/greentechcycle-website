import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Waki Box | Suivi DEEE connecté, ESRS E5",
    description:
      "Waki Box : suivi DEEE connecté en temps réel, alertes de remplissage et exports ESRS E5. Dès 39 € HT/mois.",
  },
  en: {
    title: "Waki Box | Connected WEEE tracking, ESRS E5",
    description:
      "Waki Box: real-time connected WEEE tracking, fill alerts and ESRS E5 exports. From €39 ex-VAT/month.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/waki-box", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
