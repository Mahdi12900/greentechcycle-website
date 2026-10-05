/**
 * URL publique du site — réglage unique (audit final du 2026-10-04, bloquant B1).
 *
 * Utilisée partout où une URL absolue est nécessaire : sitemap.xml, robots.txt, metadataBase,
 * balises canonical et hreflang, images Open Graph / Twitter, JSON-LD, flux RSS, fil d'Ariane.
 *
 * - `NEXT_PUBLIC_SITE_URL` : URL de production, sans barre finale. Défaut : https://www.greentechcycle.fr
 *   (hôte canonique réel depuis le go-live du 2026-10-05 : `greentechcycle-website` sert le site sur
 *   `www.greentechcycle.fr`, l'apex `greentechcycle.fr` redirige en 301 vers `www` via un service
 *   CloudStation dédié — voir reports/go-live-gtc.md §15-16. Avant ce changement, le défaut était
 *   https://greentechcycle.fr, l'apex étant alors l'hôte servant réellement le contenu).
 *   Lue au moment du build (préfixe NEXT_PUBLIC_) : changer la valeur impose un rebuild.
 * - `SITE_NOINDEX=true` : robots.txt interdit l'indexation (à poser uniquement sur un
 *   environnement de préproduction dédié). Absent ou toute autre valeur : indexation autorisée.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.greentechcycle.fr").trim().replace(/\/+$/, "");

/** URL absolue à partir d'un chemin (« /fr/tarifs ») */
export function absoluteUrl(path = ""): string {
  if (!path) return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Balises canonical + hreflang (fr, en, x-default → fr) pour un chemin sans préfixe de langue (« /tarifs ») */
export function localeAlternates(locale: string, path = "") {
  return {
    canonical: absoluteUrl(`/${locale}${path}`),
    languages: {
      fr: absoluteUrl(`/fr${path}`),
      en: absoluteUrl(`/en${path}`),
      "x-default": absoluteUrl(`/fr${path}`),
    },
  };
}

export const SITE_NOINDEX = process.env.SITE_NOINDEX === "true";
