import type { Metadata } from "next";
import { pageMetadata, type LocaleParams, type PageCopy } from "@/lib/seo";

const META_COPY: PageCopy = {
  fr: {
    title: "Écosystème & intégrations | API, SSO, connecteurs",
    description:
      "Connecteurs ServiceNow, GLPI, Intune, JAMF et SAP, API REST documentée et authentification SSO/MFA : GreenTechCycle s'intègre à votre système d'information.",
  },
  en: {
    title: "Ecosystem & integrations | API, SSO, connectors",
    description:
      "ServiceNow, GLPI, Intune, JAMF and SAP connectors, a documented REST API and SSO/MFA authentication: GreenTechCycle plugs into your IT systems.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/ecosysteme", META_COPY);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
