import type { Metadata } from "next";
import { pageMetadata, videoObjectSchema, type LocaleParams, type PageCopy } from "@/lib/seo";
import SchemaOrg from "@/components/SchemaOrg";
import { SLOT_VIDEOS } from "@/content/media-slots";

const META_COPY: PageCopy = {
  fr: {
    title: "Cas d'usage | Solutions ITAD par secteur",
    description:
      "Nos cas d'usage ITAD : migration de data center, renouvellement de parc, conformité RGPD, reporting CSRD, avec leur contexte et leurs résultats.",
  },
  en: {
    title: "Use cases | ITAD solutions by sector and need",
    description:
      "Our ITAD use cases: data-centre migration, fleet renewal, GDPR compliance, CSRD reporting. Each engagement described with its context and results.",
  },
};

/* Métadonnées par langue (audit final B3) : titre, description, canonical, hreflang, Open Graph */
export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/cas-usages", META_COPY);
}

/* VideoObject des 4 vidéos cas client affichées sur cette page (plan SEO du 2026-10-05) */
const CASE_VIDEO_IDS = ["case-banque", "case-chu", "case-tf1", "case-energie"] as const;

export default async function Layout({ children, params }: { children: React.ReactNode } & LocaleParams) {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "fr";
  return (
    <>
      {CASE_VIDEO_IDS.map((id) => {
        const spec = SLOT_VIDEOS[id];
        return spec ? <SchemaOrg key={id} data={videoObjectSchema(spec, lang)} /> : null;
      })}
      {children}
    </>
  );
}
