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
          DEFAULT: "#0D503C",
          50: "#E8F5F0",
          100: "#D1EBE1",
          200: "#A3D7C3",
          300: "#75C3A5",
          400: "#47AF87",
          500: "#0D503C",
          600: "#0B4633",
          700: "#093C2B",
          800: "#073222",
          900: "#05281A",
        },
        secondary: {
          DEFAULT: "#1E3A5F",
          50: "#E8EDF3",
          100: "#D1DBE7",
          200: "#A3B7CF",
          300: "#7593B7",
          400: "#476F9F",
          500: "#1E3A5F",
          600: "#1A3253",
          700: "#162A47",
          800: "#12223B",
          900: "#0E1A2F",
        },
        accent: {
          DEFAULT: "#10B981",
          50: "#E6F9F1",
          100: "#CCF3E3",
          200: "#99E7C7",
          300: "#66DBAB",
          400: "#33CF8F",
          500: "#10B981",
          600: "#0EA874",
          700: "#0C9767",
          800: "#0A865A",
          900: "#08754D",
        },
        dark: "#0F172A",
        light: "#F8FAFC",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
