import type { Metadata } from "next";
import { absoluteUrl, localeAlternates } from "@/lib/site";
import type { SlotVideoSpec } from "@/content/media-slots";

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

/** Durée en secondes → ISO 8601 (ex. 174.3 → « PT2M54S ») pour `VideoObject.duration` */
export function isoDuration(seconds: number): string {
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  let out = "PT";
  if (h) out += `${h}H`;
  if (m) out += `${m}M`;
  if (s || (!h && !m)) out += `${s}S`;
  return out;
}

/**
 * Donnée structurée `VideoObject` (plan SEO du 2026-10-05, `reports/seo-plan-gtc.md` §2.2.3) :
 * le film de marque (accueil, /demo) et les vidéos cas client (/cas-usages, fiches secteur)
 * n'avaient aucune donnée structurée, donc aucune chance d'apparaître dans Google Vidéos.
 * Les vidéos sont toutes en voix off anglaise (décision du 2026-10-04) : `inLanguage: "en"`,
 * quelle que soit la langue de la page qui les affiche. `uploadDate` est la date de mise en
 * ligne du nouveau site (2026-10-05) — la date de tournage réelle n'est pas connue, elle
 * n'est pas inventée. `name`/`description` suivent la langue de la page (fr ou en).
 */
export function videoObjectSchema(spec: SlotVideoSpec, lang: "fr" | "en") {
  const mp4 = spec.sources.find((s) => s.type === "video/mp4")?.src ?? spec.sources[0]?.src;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: spec.title?.[lang] ?? "GreenTechCycle",
    description: spec.description?.[lang] ?? spec.title?.[lang] ?? "GreenTechCycle",
    thumbnailUrl: [absoluteUrl(spec.poster)],
    uploadDate: "2026-10-05",
    ...(spec.duration ? { duration: isoDuration(spec.duration) } : {}),
    contentUrl: absoluteUrl(mp4),
    inLanguage: "en",
  };
}
