import type { Metadata } from "next";
import { pageMetadata, videoObjectSchema, type LocaleParams, type PageCopy } from "@/lib/seo";
import SchemaOrg from "@/components/SchemaOrg";
import { SLOT_VIDEOS } from "@/content/media-slots";

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

/* VideoObject du film de marque (plan SEO du 2026-10-05) : /demo le joue en entier */
export default async function Layout({ children, params }: { children: React.ReactNode } & LocaleParams) {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "fr";
  const spec = SLOT_VIDEOS["brand-film"];
  return (
    <>
      {spec && <SchemaOrg data={videoObjectSchema(spec, lang)} />}
      {children}
    </>
  );
}
