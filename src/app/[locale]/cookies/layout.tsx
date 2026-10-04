import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Politique de cookies",
    description:
      "Politique de cookies de GreenTechCycle : types de cookies utilisés, finalités et gestion de vos préférences.",
  },
  en: {
    title: "Cookie policy",
    description:
      "GreenTechCycle cookie policy: cookie types used, purposes and how to manage your preferences.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/cookies", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
