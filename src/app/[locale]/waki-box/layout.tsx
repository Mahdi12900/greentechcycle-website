import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Waki Box | Le suivi DEEE connecté, prêt CSRD ESRS E5",
    description:
      "Waki Box : suivi DEEE connecté en temps réel. Bornes avec capteurs, alertes de remplissage, pesée par flux et exports ESRS E5. Trois plans dès 39 € HT/mois et un programme pilote.",
  },
  en: {
    title: "Waki Box | Connected WEEE tracking, CSRD ESRS E5 ready",
    description:
      "Waki Box: real-time connected WEEE tracking. Kiosks with sensors, fill alerts, per-stream weighing and ESRS E5 exports. Three plans from €39 ex-VAT/month and a pilot programme.",
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
