import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Processus ITAD | Cycle de vie des actifs IT",
    description:
      "Notre processus ITAD en 4 étapes : audit, collecte sécurisée, effacement attesté et valorisation, avec une traçabilité complète pour vos équipements IT.",
  },
  en: {
    title: "ITAD process | IT asset lifecycle",
    description:
      "Our 4-step ITAD process: audit, secure collection, attested erasure and value recovery, with full traceability for your IT equipment.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/processus-itad", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
