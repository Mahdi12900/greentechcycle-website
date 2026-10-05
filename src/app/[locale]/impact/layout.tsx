import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const META_COPY: PageCopy = {
  fr: {
    title: "Bilan carbone IT | ESRS E5",
    description:
      "Calculez l'empreinte carbone de votre parc IT selon GHG Protocol et ADEME. Mapping CSRD ESRS E5, comparatif neuf vs reconditionné.",
  },
  en: {
    title: "IT carbon footprint | ESRS E5",
    description:
      "Measure your IT fleet's carbon footprint with the GHG Protocol and ADEME. CSRD ESRS E5 mapping, new vs refurbished comparison.",
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
