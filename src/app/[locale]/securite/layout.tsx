import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sécurité des données | Effacement selon NIST 800-88",
  description:
    "Sécurité maximale pour vos données en fin de vie : effacement selon NIST 800-88, traçabilité horodatée (SHA-256), chaîne de possession sécurisée et conformité RGPD garantie.",
  keywords: ["sécurité données", "effacement NIST 800-88", "RGPD", "traçabilité", "chaîne de possession", "destruction données"],
  openGraph: {
    title: "Sécurité des données | GreenTechCycle",
    description: "Effacement selon NIST 800-88, traçabilité horodatée (SHA-256) et conformité RGPD pour vos actifs IT.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sécurité des données | GreenTechCycle",
    description: "Effacement selon NIST 800-88, traçabilité horodatée (SHA-256) et conformité RGPD.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
