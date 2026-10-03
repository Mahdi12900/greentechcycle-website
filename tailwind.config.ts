import type { Config } from "tailwindcss";

/* ─────────────────────────────────────────────────────────────────────────────
   Tokens — source de vérité : DESIGN.md v2 « Dark Tech » (§2–5).
   v2 : bg / bg-card / track / bar / fg / emerald / amber (palette imposée).
   v1 (forest, leaf, ochre, ink, cream…) : conservés TEMPORAIREMENT pour les
   pages non migrées — à supprimer à l'étape 3 du plan v2.
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
        /* ── Tokens v2 « Dark Tech » (DESIGN.md v2 §2.1) ───────────────── */
        bg: { DEFAULT: "#08090B", card: "#0F1115" },
        track: { DEFAULT: "#2C2F36", strong: "#646973" },
        bar: "#363A42",
        fg: { DEFAULT: "#EDEDEF", muted: "#8A8F98", strong: "#C2C6CC" },
        emerald: {
          DEFAULT: "#10B981",
          hover: "#34D399",
          dim: "rgba(16,185,129,0.12)",
          line: "rgba(16,185,129,0.35)",
        },
        amber: { DEFAULT: "#F59E0B", dim: "rgba(245,158,11,0.12)" },

        /* ── Tokens v1 « Épuré » (legacy, migration en cours) ──────────── */
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
        danger: "#F87171", // erreurs de formulaire (7.2:1 sur bg) — v1 utilisait #B42318

      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      /* Échelle typographique — DESIGN.md §3.2 (mobile → ≥ lg via clamp) */
      fontSize: {
        /* Échelle v2 — DESIGN.md v2 §3.2 (Geist 600 serré, clamp 360 px → lg) */
        "display-xl": ["clamp(2.75rem, 1.6rem + 4vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "600" }],
        "display-lg": ["clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-md": ["clamp(1.875rem, 1.5rem + 1.3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-sm": ["clamp(1.5rem, 1.35rem + 0.5vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" }],
        "heading-lg": ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em", fontWeight: "600" }],
        "heading-md": ["1.0625rem", { lineHeight: "1.5rem", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        caption: ["0.8125rem", { lineHeight: "1rem" }],
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em", fontWeight: "500" }],
        stat: ["clamp(2.75rem, 1.8rem + 3vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" }],
      },
      /* Ombres — DESIGN.md §5 : uniquement cartes cliquables (hover) et flottants */
      boxShadow: {
        /* v2 */
        float: "0 16px 48px -16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.4), 0 0 24px rgba(16,185,129,0.35)",
        "glow-dot": "0 0 12px rgba(16,185,129,0.6)",
        /* v1 legacy */
        card: "0 1px 2px rgba(28,25,23,0.06), 0 1px 3px rgba(28,25,23,0.04)",
        pop: "0 8px 24px -8px rgba(28,25,23,0.18), 0 2px 6px rgba(28,25,23,0.06)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
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
