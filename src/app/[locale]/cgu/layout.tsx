import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Conditions générales d'utilisation",
    description:
      "Conditions générales d'utilisation de la plateforme GreenTechCycle et du site web.",
  },
  en: {
    title: "Terms of use",
    description:
      "Terms of use of the GreenTechCycle platform and website.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/cgu", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
