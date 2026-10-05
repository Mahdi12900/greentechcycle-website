import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Politique de confidentialité",
    description:
      "Politique de confidentialité de GreenTechCycle : traitement des données personnelles, droits RGPD et cookies.",
  },
  en: {
    title: "Privacy policy",
    description:
      "GreenTechCycle privacy policy: personal data processing, GDPR rights and cookies.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/confidentialite", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
