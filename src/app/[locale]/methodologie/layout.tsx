import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Méthodologie | Approche certifiée pour l'ITAD",
  description:
    "Notre méthodologie ITAD certifiée : processus qualité ISO 14001, effacement NIST 800-88, traçabilité blockchain et reporting conforme aux standards internationaux.",
  keywords: ["méthodologie ITAD", "ISO 14001", "NIST 800-88", "processus qualité", "standards internationaux"],
  openGraph: {
    title: "Méthodologie ITAD | GreenTechCycle",
    description: "Approche certifiée ISO 14001, effacement NIST 800-88 et traçabilité blockchain.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Méthodologie ITAD | GreenTechCycle",
    description: "Approche certifiée ISO 14001 et NIST 800-88.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
