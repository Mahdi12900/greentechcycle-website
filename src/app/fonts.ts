/**
 * Polices auto-hébergées (next/font/local) — voir DESIGN.md §3.
 * Aucun CDN : les fichiers woff2 (sous-ensemble latin, variables) vivent dans src/fonts/.
 *  - Fraunces (display : H1/H2, chiffres-arguments, citations) — axes wght 100–900, opsz 9–144
 *  - Inter (texte & UI) — axes wght 100–900, opsz 14–32
 * Les deux sont sous licence SIL OFL 1.1 (src/fonts/LICENSE.*.txt).
 */
import localFont from "next/font/local";

export const fontDisplay = localFont({
  src: "../fonts/fraunces-latin-opsz-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const fontSans = localFont({
  src: "../fonts/inter-latin-opsz-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: "Arial",
});
