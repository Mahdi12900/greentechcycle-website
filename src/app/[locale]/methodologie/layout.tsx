import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Méthodologie | Approche documentée pour l'ITAD",
  description:
    "Notre méthodologie ITAD : effacement selon NIST SP 800-88, traçabilité horodatée (SHA-256) et comptes-rendus conformes aux standards internationaux.",
  keywords: ["méthodologie ITAD", "NIST 800-88", "processus qualité", "standards internationaux"],
  openGraph: {
    title: "Méthodologie ITAD | GreenTechCycle",
    description: "Effacement selon NIST SP 800-88 et traçabilité horodatée (SHA-256).",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Méthodologie ITAD | GreenTechCycle",
    description: "Effacement selon NIST SP 800-88, preuves horodatées.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
