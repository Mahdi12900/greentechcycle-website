import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Politique de cookies de GreenTechCycle : types de cookies utilisés, finalités et gestion de vos préférences.",
  openGraph: { title: "Cookies | GreenTechCycle", description: "Politique de cookies de GreenTechCycle.", type: "website" },
  twitter: { card: "summary", title: "Cookies | GreenTechCycle", description: "Politique de cookies." },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
