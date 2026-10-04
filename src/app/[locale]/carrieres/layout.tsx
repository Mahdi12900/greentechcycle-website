import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Carrières | Rejoignez l'équipe GreenTechCycle",
    description:
      "Rejoignez GreenTechCycle et participez à l'IT responsable. Découvrez nos offres d'emploi dans l'ITAD, le développement durable et la tech.",
  },
  en: {
    title: "Careers | Join the GreenTechCycle team",
    description:
      "Join GreenTechCycle and help build responsible IT. Explore our openings in ITAD, sustainability and tech.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/carrieres", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
