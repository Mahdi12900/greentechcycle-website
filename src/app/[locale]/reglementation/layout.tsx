import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Réglementation ITAD | CSRD, RGPD, NIS2, DEEE",
    description:
      "Guide complet des réglementations applicables à l'ITAD : CSRD, RGPD, NIS2, directive DEEE. Restez conforme avec GreenTechCycle.",
  },
  en: {
    title: "ITAD regulation | CSRD, GDPR, NIS2, WEEE",
    description:
      "A complete guide to the regulations that apply to ITAD: CSRD, GDPR, NIS2 and the WEEE directive. Stay compliant with GreenTechCycle.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/reglementation", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
