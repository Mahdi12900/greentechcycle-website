"use client";

import { useLocale, useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { Scale, Building2, Server, Copyright, AlertCircle } from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";
import CtaSection from "@/components/CtaSection";

export default function MentionsLegalesPage() {
  const locale = useLocale();
  return <MentionsLegalesContent locale={locale} />;
}

function MentionsLegalesContent({ locale }: { locale: string }) {
  const t = useTranslations("Legal.mentions");

  const sections = [
    { key: "editor", icon: Building2 },
    { key: "hosting", icon: Server },
    { key: "ip", icon: Copyright },
    { key: "liability", icon: AlertCircle },
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Informations légales de l'entreprise éditrice, de l'hébergeur et des droits associés à la plateforme GreenTechCycle."
        breadcrumbLabel="Mentions légales"
        icon={<Scale className="h-7 w-7 text-accent" />}
      >
        <StaggerContainer className="grid sm:grid-cols-2 gap-6">
          {sections.map(({ key, icon: Icon }) => (
            <StaggerItem key={key}>
              <div className="h-full bg-white rounded-2xl p-6 md:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary border border-primary/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                  {t(`content.${key}.title`)}
                </h2>
                <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                  {t(`content.${key}.text`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </LegalPageLayout>

      <CtaSection
        title="Une question sur nos informations légales ?"
        subtitle="Notre équipe est disponible pour toute demande concernant l'édition du site, les droits d'auteur ou des signalements."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Voir la FAQ"
        secondaryHref="/faq"
        variant="contact"
        tone="dark"
      />
    </>
  );
}
