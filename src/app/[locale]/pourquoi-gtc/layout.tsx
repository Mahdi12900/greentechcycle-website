import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Pourquoi GreenTechCycle | Avantages ITAD",
    description:
      "Pourquoi choisir GreenTechCycle ? Plateforme ITAD unifiée, conformité CSRD automatisée, effacement attesté et valorisation de vos actifs IT.",
  },
  en: {
    title: "Why GreenTechCycle | ITAD benefits",
    description:
      "Why choose GreenTechCycle? A unified ITAD platform, automated CSRD compliance, attested erasure and value recovery for your IT assets.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/pourquoi-gtc", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
