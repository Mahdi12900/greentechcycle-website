import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#065F46",
          700: "#064E3B",
          800: "#022C22",
          900: "#011D17",
        },
        secondary: {
          DEFAULT: "#0EA5E9",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#0EA5E9",
          600: "#1E3A8A",
          700: "#1B2F73",
          800: "#17255C",
          900: "#131B45",
        },
        accent: {
          DEFAULT: "#10B981",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#065F46",
          700: "#064E3B",
          800: "#022C22",
          900: "#011D17",
        },
        gtc: {
          forest: "#10B981",
          ink: "#022C22",
          steel: "#0EA5E9",
          cyan: "#F59E0B",
          mint: "#6EE7B7",
          deep: "#0F172A",
        },
        dark: "#0F172A",
        light: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
