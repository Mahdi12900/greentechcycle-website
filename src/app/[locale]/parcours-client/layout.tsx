import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Parcours client | De l'audit à la valorisation de vos actifs IT",
    description:
      "Suivez le parcours client GreenTechCycle : audit initial, planification, collecte sécurisée, traitement attesté et restitution. Un accompagnement de bout en bout.",
  },
  en: {
    title: "Client journey | From audit to IT asset value recovery",
    description:
      "Follow the GreenTechCycle client journey: initial audit, planning, secure collection, attested processing and reporting. End-to-end support.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/parcours-client", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
