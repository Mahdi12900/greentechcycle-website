"use client";

import { useLocale, useTranslations } from "next-intl";

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
        icon={<Scale className="h-7 w-7 text-emerald" />}
      >
        <div className="reveal-stagger grid sm:grid-cols-2 gap-6">
          {sections.map(({ key, icon: Icon }) => (
            <div key={key} className="reveal">
              <div className="h-full bg-bg-card rounded-2xl p-6 md:p-7 border border-track hover:border-track-strong transition-colors duration-150">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-dim text-emerald border border-emerald/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-display-md text-fg mb-3">
                  {t(`content.${key}.title`)}
                </h2>
                <p className="text-sm text-fg-strong whitespace-pre-line leading-relaxed">
                  {t(`content.${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
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
