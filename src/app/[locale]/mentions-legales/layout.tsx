import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Mentions légales",
    description:
      "Mentions légales de GreenTechCycle : informations sur l'éditeur, l'hébergeur et les conditions d'utilisation du site.",
  },
  en: {
    title: "Legal notice",
    description:
      "GreenTechCycle legal notice: publisher, hosting provider and website terms of use.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/mentions-legales", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
