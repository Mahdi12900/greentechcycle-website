import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Méthodologie | Approche documentée pour l'ITAD",
    description:
      "Notre méthodologie ITAD : effacement selon NIST SP 800-88, traçabilité horodatée (SHA-256) et comptes-rendus conformes aux standards internationaux.",
  },
  en: {
    title: "Methodology | A documented approach to ITAD",
    description:
      "Our ITAD methodology: NIST SP 800-88 erasure, timestamped traceability (SHA-256) and reporting aligned with international standards.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/methodologie", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
