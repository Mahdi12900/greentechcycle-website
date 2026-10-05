import type { Metadata } from "next";
import { LEGAL } from "@/lib/contact";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MobileActionBar from "@/components/MobileActionBar";
import ExitPopup from "@/components/ExitPopup";
import SchemaOrg from "@/components/SchemaOrg";
import SalesAssistantWidget from "@/components/SalesAssistantWidget";
import { fontDisplay, fontMono, fontSans } from "@/app/fonts";
import { SiteUiProvider } from "@/components/SiteUiContext";
import { SITE_URL as SITE } from "@/lib/site";


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return {
    title: {
      default: isEn
        ? "GreenTechCycle | Unified ITAD Platform"
        : "GreenTechCycle | Plateforme ITAD unifiée",
      template: "%s | GreenTechCycle",
    },
    description: isEn
      ? "GreenTechCycle, unified ITAD platform. Attested erasure, timestamped traceability (SHA-256), ESG/CSRD reporting and carbon footprint for responsible IT asset management."
      : "GreenTechCycle, plateforme ITAD unifiée. Effacement attesté, traçabilité horodatée (SHA-256), reporting ESG/CSRD et bilan carbone pour une gestion responsable de vos actifs IT.",
    icons: {
      icon: { url: "/favicon.svg", type: "image/svg+xml" },
      apple: "/icon.svg",
    },
    keywords: [
      "ITAD",
      "effacement NIST 800-88",
      "NIST 800-88",
      "traçabilité horodatée (SHA-256)",
      "reporting CSRD",
      "bilan carbone IT",
      "économie circulaire",
      "reconditionnement IT",
      "RGPD",
      "France",
      "recyclage IT",
      "DEEE",
      "NIS2",
      "gestion actifs IT",
    ],
    openGraph: {
      type: "website",
      locale: isEn ? "en_GB" : "fr_FR",
      siteName: "GreenTechCycle",
      title: isEn
        ? "GreenTechCycle | Unified ITAD Platform"
        : "GreenTechCycle | Plateforme ITAD unifiée",
      description: isEn
        ? "Attested erasure, timestamped traceability (SHA-256) and CSRD reporting. The platform that unifies your ITAD."
        : "Effacement attesté, traçabilité horodatée (SHA-256) et reporting CSRD. La plateforme qui unifie votre ITAD.",
      images: [
        {
          url: "/photos/team-collab.jpg",
          width: 1200,
          height: 630,
          alt: "GreenTechCycle - Plateforme ITAD unifiée",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isEn
        ? "GreenTechCycle | Unified ITAD Platform"
        : "GreenTechCycle | Plateforme ITAD unifiée",
      description: isEn
        ? "Attested erasure, timestamped traceability (SHA-256) and CSRD reporting. The platform that unifies your ITAD."
        : "Effacement attesté, traçabilité horodatée (SHA-256) et reporting CSRD. La plateforme qui unifie votre ITAD.",
      images: ["/photos/team-collab.jpg"],
    },
    robots: { index: true, follow: true },
    metadataBase: new URL(SITE),
    alternates: {
      canonical: `${SITE}/${locale}`,
      languages: {
        fr: `${SITE}/fr`,
        en: `${SITE}/en`,
        "x-default": `${SITE}/fr`,
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GreenTechCycle",
    url: `${SITE}`,
    logo: `${SITE}/logo/logo-primary.svg`,
    description:
      "Plateforme ITAD unifiée : effacement attesté, traçabilité horodatée (SHA-256), reporting ESG/CSRD et bilan carbone pour la gestion responsable des actifs IT.",
    // Entité légale : fiche Pappers lue le 2026-10-04 (src/lib/contact.ts)
    // Adresse du siège social volontairement omise (décision utilisateur, go-live 2026-10-05).
    legalName: LEGAL.name,
    identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: LEGAL.siren.replace(/\s/g, "") },
    sameAs: [
      "https://www.linkedin.com/company/greentechcycle",
      "https://twitter.com/greentechcycle",
      "https://github.com/greentechcycle",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      availableLanguage: ["French", "English"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GreenTechCycle",
    url: `${SITE}`,
    description:
      "Plateforme ITAD unifiée pour la gestion responsable des actifs IT en fin de vie.",
    inLanguage: ["fr", "en"],
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
    },
  };

  return (
    <html lang={locale} className={`dark ${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="font-sans">
        <SchemaOrg data={organizationSchema} />
        <SchemaOrg data={websiteSchema} />
        <NextIntlClientProvider messages={messages}>
          <SiteUiProvider>
          <Header />
          <main id="contenu" className="pt-16 pb-20 lg:pt-[72px] lg:pb-0">{children}</main>
          <Footer />
          <CookieBanner />
          <MobileActionBar />
          <ExitPopup />
          <SalesAssistantWidget />
          </SiteUiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
