import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ALL_SECTOR_SLUGS, getSectorDef } from "@/data/sectors";
import type { SectorSlug } from "@/data/sectors";
import { getSectorContent } from "@/data/sectors-i18n";
import SectorDetailPage from "./SectorDetailPage";

/* ─────────────────────────────────────────────────────────────────────────────
   Static params - generate all 16 slugs
───────────────────────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return ALL_SECTOR_SLUGS.map((slug) => ({ slug }));
}

/* ─────────────────────────────────────────────────────────────────────────────
   Metadata
───────────────────────────────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = getSectorContent(locale, slug as SectorSlug);
  if (!content) return {};

  const title = `${content.hero.title} | ITAD GreenTechCycle`;
  const description = content.hero.subtitle;

  const SITE = "https://greentechcycle-website.vercel.app";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE}/${locale}/secteurs/${slug}`,
      languages: {
        fr: `${SITE}/fr/secteurs/${slug}`,
        en: `${SITE}/en/secteurs/${slug}`,
        "x-default": `${SITE}/fr/secteurs/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Page, pass only the slug string (not the full sectorDef which contains
   React component functions that cannot be serialized to client components)
───────────────────────────────────────────────────────────────────────────── */
export default async function SectorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const sectorDef = getSectorDef(slug);
  if (!sectorDef) notFound();

  return <SectorDetailPage slug={slug as SectorSlug} />;
}
