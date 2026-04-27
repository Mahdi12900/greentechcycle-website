import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import CookieBanner from "@/components/CookieBanner";
import StickyCTA from "@/components/StickyCTA";
import ExitPopup from "@/components/ExitPopup";
import SchemaOrg from "@/components/SchemaOrg";
import SalesAssistantWidget from "@/components/SalesAssistantWidget";

const SITE = "https://greentechcycle-website.vercel.app";

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
      ? "GreenTechCycle, unified ITAD platform. Certified erasure, blockchain traceability, ESG/CSRD reporting and carbon footprint for responsible IT asset management."
      : "GreenTechCycle, plateforme ITAD unifiée. Effacement certifié, traçabilité blockchain, reporting ESG/CSRD et bilan carbone pour une gestion responsable de vos actifs IT.",
    icons: {
      icon: { url: "/favicon.svg", type: "image/svg+xml" },
      apple: "/icon.svg",
    },
    keywords: [
      "ITAD",
      "effacement certifié",
      "NIST 800-88",
      "traçabilité blockchain",
      "reporting CSRD",
      "bilan carbone IT",
      "économie circulaire",
      "reconditionnement IT",
      "R2v3",
      "ISO 14001",
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
        ? "Certified erasure, blockchain traceability and CSRD reporting. The platform that unifies your ITAD."
        : "Effacement certifié, traçabilité blockchain et reporting CSRD. La plateforme qui unifie votre ITAD.",
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
        ? "Certified erasure, blockchain traceability and CSRD reporting. The platform that unifies your ITAD."
        : "Effacement certifié, traçabilité blockchain et reporting CSRD. La plateforme qui unifie votre ITAD.",
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
    url: "https://greentechcycle.fr",
    logo: "https://greentechcycle.fr/logo/logo-primary.svg",
    description:
      "Plateforme ITAD unifiée : effacement certifié, traçabilité blockchain, reporting ESG/CSRD et bilan carbone pour la gestion responsable des actifs IT.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
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
    url: "https://greentechcycle.fr",
    description:
      "Plateforme ITAD unifiée pour la gestion responsable des actifs IT en fin de vie.",
    inLanguage: ["fr", "en"],
    publisher: {
      "@type": "Organization",
      name: "GreenTechCycle",
    },
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="font-sans">
        <SchemaOrg data={organizationSchema} />
        <SchemaOrg data={websiteSchema} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <TrustBar />
          <main className="pt-[calc(4rem+1.75rem)] lg:pt-[calc(5rem+1.75rem)]">{children}</main>
          <Footer />
          <CookieBanner />
          <StickyCTA />
          <ExitPopup />
          <SalesAssistantWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
