import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Demandez un devis ITAD gratuit",
  description:
    "Contactez GreenTechCycle pour un devis ITAD personnalisé. Audit gratuit de votre parc IT, estimation de la valeur résiduelle et accompagnement conformité CSRD/RGPD.",
  keywords: ["contact ITAD", "devis gratuit", "audit parc IT", "estimation valeur résiduelle", "accompagnement CSRD"],
  openGraph: {
    title: "Contactez-nous | GreenTechCycle",
    description: "Demandez un devis ITAD personnalisé. Audit gratuit et estimation de la valeur résiduelle de votre parc IT.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactez-nous | GreenTechCycle",
    description: "Demandez un devis ITAD personnalisé. Audit gratuit de votre parc IT.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
