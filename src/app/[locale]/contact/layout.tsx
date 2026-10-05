import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Contact | Demandez un devis ITAD",
    description:
      "Contactez GreenTechCycle pour un devis ITAD personnalisé, une question de support ou un projet avec le GreenTechCycle Lab, par formulaire, WhatsApp ou e-mail.",
  },
  en: {
    title: "Contact | Request an ITAD quote",
    description:
      "Contact GreenTechCycle for a tailored ITAD quote, a support question or a GreenTechCycle Lab project, via form, WhatsApp or email.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
