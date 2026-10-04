import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Sécurité des données | Effacement selon NIST 800-88",
    description:
      "Effacement selon NIST 800-88, traçabilité horodatée (empreinte SHA-256), chaîne de possession documentée et conformité RGPD pour vos données en fin de vie.",
  },
  en: {
    title: "Data security | NIST 800-88 erasure",
    description:
      "NIST 800-88 erasure, timestamped traceability (SHA-256 fingerprint), a documented chain of custody and GDPR compliance for your end-of-life data.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/securite", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
