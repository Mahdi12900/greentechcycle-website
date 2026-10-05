import type { Metadata } from "next";
import { absoluteUrl, localeAlternates } from "@/lib/site";

/**
 * Métadonnées de page par langue (audit final du 2026-10-04, bloquant B3).
 *
 * Remplace les `export const metadata` figés en français : chaque layout appelle
 * `pageMetadata(locale, chemin, COPY)` depuis `generateMetadata`, ce qui donne un titre et une
 * description dans la langue de la page, la canonical et les hreflang (fr, en, x-default)
 * sur NEXT_PUBLIC_SITE_URL, et les balises Open Graph / Twitter correspondantes.
 * Le titre ne porte pas « | GreenTechCycle » : le gabarit du layout racine l'ajoute.
 */
export type PageCopy = Record<"fr" | "en", { title: string; description: string }>;

export function pageMetadata(locale: string, path: string, copy: PageCopy, extra: Partial<Metadata> = {}): Metadata {
  const lang = locale === "en" ? "en" : "fr";
  const { title, description } = copy[lang];
  const social = `${title} | GreenTechCycle`;
  return {
    title,
    description,
    alternates: localeAlternates(lang, path),
    openGraph: {
      title: social,
      description,
      type: "website",
      url: absoluteUrl(`/${lang}${path}`),
      siteName: "GreenTechCycle",
      locale: lang === "en" ? "en_GB" : "fr_FR",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: social }],
    },
    twitter: { card: "summary_large_image", title: social, description, images: [DEFAULT_OG_IMAGE] },
    ...extra,
  };
}

/** Image de partage par défaut (même image que le layout racine), rendue absolue via metadataBase */
export const DEFAULT_OG_IMAGE = "/photos/team-collab.jpg";

/** Signature commune des `generateMetadata` de layout */
export type LocaleParams = { params: Promise<{ locale: string }> };
