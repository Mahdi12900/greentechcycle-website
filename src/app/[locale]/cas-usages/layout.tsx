import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Cas d'usage | Solutions ITAD par secteur et besoin",
    description:
      "Nos cas d'usage ITAD : migration de data center, renouvellement de parc, conformité RGPD, reporting CSRD. Chaque mission décrite avec son contexte et ses résultats.",
  },
  en: {
    title: "Use cases | ITAD solutions by sector and need",
    description:
      "Our ITAD use cases: data-centre migration, fleet renewal, GDPR compliance, CSRD reporting. Each engagement described with its context and results.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/cas-usages", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
