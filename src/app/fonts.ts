/**
 * Polices auto-hébergées (next/font/local) — DESIGN.md v2 §3.
 * Aucun CDN : fichiers woff2 (sous-ensemble latin, variables) dans src/fonts/.
 *  - Geist (titres, corps, UI) — axe wght 100–900
 *  - Geist Mono (eyebrows, labels de données, unités, code) — axe wght 100–900
 * Licence SIL OFL 1.1 (src/fonts/LICENSE.Geist*.txt).
 *
 * `--font-display` et `--font-sans` pointent tous deux sur Geist : les
 * composants qui utilisent `font-display` (hérité de la v1) basculent sans
 * modification. `--font-mono` → Geist Mono.
 */
import localFont from "next/font/local";

export const fontSans = localFont({
  src: "../fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});

export const fontMono = localFont({
  src: "../fonts/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: false,
});

/** Alias : la police display est Geist (même fichier), exposée sous `--font-display`. */
export const fontDisplay = localFont({
  src: "../fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
