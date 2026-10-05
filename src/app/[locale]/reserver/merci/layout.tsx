import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Merci · Demande enregistrée",
    description:
      "Votre demande de réservation a bien été enregistrée. Nous vous recontactons sous 24 heures ouvrées.",
  },
  en: {
    title: "Thank you · Request received",
    description:
      "Your booking request has been received. We will get back to you within 24 business hours.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/reserver/merci", META_COPY, { robots: { index: false, follow: false } });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
