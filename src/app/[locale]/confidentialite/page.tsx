"use client";

import { useLocale, useTranslations } from "next-intl";
import { StaggerContainer, StaggerItem, FadeIn } from "@/components/motion";
import {
  Lock,
  Info,
  UserCheck,
  Database,
  Target,
  Gavel,
  Clock,
  ShieldCheck,
  Cookie,
  Globe2,
  RefreshCcw,
} from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";
import CtaSection from "@/components/CtaSection";

export default function ConfidentialitePage() {
  const locale = useLocale();
  return <ConfidentialiteContent locale={locale} />;
}

function ConfidentialiteContent({ locale }: { locale: string }) {
  const t = useTranslations("Legal.privacy");

  const sections = [
    { key: "intro", icon: Info },
    { key: "controller", icon: UserCheck },
    { key: "data", icon: Database },
    { key: "purpose", icon: Target },
    { key: "legal", icon: Gavel },
    { key: "retention", icon: Clock },
    { key: "rights", icon: ShieldCheck },
    { key: "cookies", icon: Cookie },
    { key: "transfers", icon: Globe2 },
    { key: "update", icon: RefreshCcw },
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Votre confiance est notre priorité. Découvrez comment GreenTechCycle traite, protège et sécurise vos données personnelles conformément au RGPD."
        breadcrumbLabel="Confidentialité"
        icon={<Lock className="h-7 w-7 text-accent" />}
      >
        {/* Table of contents */}
        <FadeIn>
          <div className="mb-10 bg-gradient-to-br from-primary-50 to-white rounded-2xl p-6 md:p-7 border border-primary/10">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              Sommaire
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {sections.map(({ key }, i) => (
                <a
                  key={key}
                  href={`#section-${key}`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors py-1"
                >
                  <span className="text-xs font-mono text-primary/60 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(`content.${key}.title`)}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        <StaggerContainer className="space-y-6">
          {sections.map(({ key, icon: Icon }, i) => (
            <StaggerItem key={key}>
              <div
                id={`section-${key}`}
                className="scroll-mt-24 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-primary/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
                        {t(`content.${key}.title`)}
                      </h2>
                    </div>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {t(`content.${key}.text`)}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </LegalPageLayout>

      <CtaSection
        title="Exercer vos droits RGPD"
        subtitle="Accès, rectification, suppression, portabilité... Contactez notre DPO pour toute demande relative au traitement de vos données."
        primaryLabel="Contacter le DPO"
        primaryHref="/contact"
        secondaryLabel="Voir les cookies utilisés"
        secondaryHref="/cookies"
        variant="contact"
        tone="dark"
      />
    </>
  );
}
