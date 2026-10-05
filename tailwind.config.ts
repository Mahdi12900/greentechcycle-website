import type { Config } from "tailwindcss";

/* ─────────────────────────────────────────────────────────────────────────────
   Tokens — source de vérité : DESIGN.md v2 « Dark Tech » (§2–5).
   bg / bg-card / track / bar / fg / emerald / amber (palette imposée) — les
   tokens v1 « Épuré » (forest, leaf, ochre, ink, cream…) ont été supprimés.
───────────────────────────────────────────────────────────────────────────── */
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

        danger: "#F87171", // erreurs de formulaire (7.2:1 sur bg)
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
        stat: ["clamp(2rem, 1.2rem + 3.4vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" }],
      },
      /* Ombres — DESIGN.md §5 : uniquement cartes cliquables (hover) et flottants */
      boxShadow: {
        float: "0 16px 48px -16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.4), 0 0 24px rgba(16,185,129,0.35)",
        "glow-dot": "0 0 12px rgba(16,185,129,0.6)",
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
