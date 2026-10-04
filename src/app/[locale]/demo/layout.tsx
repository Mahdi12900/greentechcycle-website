import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Démo | La plateforme ITAD en action",
    description:
      "Réservez une démonstration de la plateforme GreenTechCycle et regardez le film de 2:54 : tableau de bord ITAD, traçabilité horodatée, reporting CSRD.",
  },
  en: {
    title: "Demo | The ITAD platform in action",
    description:
      "Book a demo of the GreenTechCycle platform and watch the 2:54 film: ITAD dashboard, timestamped traceability, CSRD reporting.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/demo", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
