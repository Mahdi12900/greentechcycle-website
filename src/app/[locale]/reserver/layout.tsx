import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Réserver | Waki Box & ITAD",
    description:
      "Réservez une démo Waki Box, un plan de souscription ou candidatez au programme pilote. Réponse personnalisée sous 24 heures ouvrées.",
  },
  en: {
    title: "Book | Waki Box & ITAD",
    description:
      "Book a Waki Box demo, a subscription plan or apply to the pilot programme. Personalised answer within 24 business hours.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/reserver", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
