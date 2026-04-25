import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merci · Demande enregistrée | GreenTechCycle",
  description: "Votre demande de réservation a bien été enregistrée. Nous vous recontactons sous 24 heures ouvrées.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
