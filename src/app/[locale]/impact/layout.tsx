import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const META_COPY: PageCopy = {
  fr: {
    title: "Bilan carbone IT et empreinte numérique | ESRS E5",
    description:
      "Calculez l'empreinte carbone de votre parc IT selon GHG Protocol, ADEME Bilan Carbone v8 et ISO 14064-1. Mapping CSRD ESRS E5 direct, comparatif neuf vs reconditionné, méthodologie auditable.",
  },
  en: {
    title: "IT carbon footprint and digital impact | ESRS E5",
    description:
      "Measure your IT fleet's carbon footprint with the GHG Protocol, ADEME Bilan Carbone v8 and ISO 14064-1. Direct CSRD ESRS E5 mapping, new vs refurbished comparison, auditable methodology.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/impact", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
