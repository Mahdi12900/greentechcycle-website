import type { Config } from "tailwindcss";

/* ─────────────────────────────────────────────────────────────────────────────
   Tokens du système de design « Épuré » — source de vérité : DESIGN.md (§2–5).
   2 verts (forest, leaf) + neutres chauds + 1 accent (ochre).
───────────────────────────────────────────────────────────────────────────── */
const forest = {
  DEFAULT: "#0B3B2E", // vert profond : surfaces marque, titres alternatifs
  700: "#0E4A3A",     // hover / bordure sur forest
  900: "#0F1F1A",     // "night" : surface sombre principale
  950: "#122621",     // cartes sur night
};

const leaf = {
  DEFAULT: "#047857", // vert d'action (= vert du logo) : boutons, liens, focus
  50: "#F1F8F4",      // survol léger, zebra
  100: "#E3F3EB",     // "mint" : fond de tag, pastille icône, encart léger
  200: "#C7E6D6",     // sélection, bordure d'encart
  300: "#7BE0B3",     // accent SUR fond sombre uniquement
  400: "#2FA77A",     // réservé (graphiques)
  500: "#047857",
  600: "#06694D",
  700: "#065F46",     // hover du bouton primaire
  800: "#0B3B2E",
  900: "#0F1F1A",
};

const ochre = {
  DEFAULT: "#B45309", // texte d'alerte / eyebrow « risque » sur clair
  100: "#FBEFD9",     // fond d'alerte
  300: "#F2B35B",     // alerte sur sombre
  800: "#9A4A0B",     // texte sur fond ochre-100
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Tokens cibles ─────────────────────────────────────────────── */
        forest,
        leaf,
        ochre,
        ink: { DEFAULT: "#1C1917", 700: "#44403C" },
        muted: "#6B6560",
        line: "#E7E2DA",
        sand: "#EFEBE3",
        cream: "#F7F5F0",
        paper: "#FFFFFF",
        ondark: {
          DEFAULT: "#F5F2EC",
          muted: "#A3B3AA",
          line: "rgba(255,255,255,0.10)",
        },
        danger: "#B42318", // messages d'erreur de formulaire uniquement

      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "Times New Roman", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "Courier New", "monospace"],
      },
      /* Échelle typographique — DESIGN.md §3.2 (mobile → ≥ lg via clamp) */
      fontSize: {
        "display-xl": ["clamp(2.75rem, 2rem + 2.5vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-lg": ["clamp(2.25rem, 1.75rem + 1.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "500" }],
        "display-md": ["clamp(1.875rem, 1.6rem + 0.8vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "500" }],
        "display-sm": ["clamp(1.5rem, 1.35rem + 0.5vw, 1.75rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "500" }],
        "heading-lg": ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-md": ["1.0625rem", { lineHeight: "1.5rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.8125rem", { lineHeight: "1rem" }],
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.12em", fontWeight: "600" }],
        stat: ["clamp(2.5rem, 2rem + 1.6vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "500" }],
      },
      /* Ombres — DESIGN.md §5 : uniquement cartes cliquables (hover) et flottants */
      boxShadow: {
        card: "0 1px 2px rgba(28,25,23,0.06), 0 1px 3px rgba(28,25,23,0.04)",
        pop: "0 8px 24px -8px rgba(28,25,23,0.18), 0 2px 6px rgba(28,25,23,0.06)",
      },
      maxWidth: {
        site: "1200px",
        prose: "720px",
        measure: "65ch",
      },
      height: {
        header: "4rem",
        "header-lg": "4.5rem",
      },
      spacing: {
        header: "4rem",
        "header-lg": "4.5rem",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
