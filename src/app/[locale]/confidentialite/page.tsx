"use client";

import { useLocale, useTranslations } from "next-intl";

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
        icon={<Lock className="h-7 w-7 text-emerald" />}
      >
        {/* Table of contents */}
        <div className="reveal">
          <div className="mb-10 rounded-2xl p-6 md:p-7 border border-emerald/10 bg-white/[0.03]">
            <h2 className="text-display-md text-emerald uppercase mb-4">
              Sommaire
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {sections.map(({ key }, i) => (
                <a
                  key={key}
                  href={`#section-${key}`}
                  className="flex items-center gap-2 text-sm text-fg-strong hover:text-emerald transition-colors py-1"
                >
                  <span className="text-xs font-mono text-emerald w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(`content.${key}.title`)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="reveal-stagger space-y-6">
          {sections.map(({ key, icon: Icon }, i) => (
            <div key={key} className="reveal">
              <div
                id={`section-${key}`}
                className="scroll-mt-24 bg-bg-card rounded-2xl p-6 md:p-8 border border-track hover:border-track-strong transition-colors duration-150"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-dim border border-emerald/20 flex items-center justify-center text-emerald">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-emerald">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-display-md text-fg">
                        {t(`content.${key}.title`)}
                      </h2>
                    </div>
                    <p className="text-fg-strong whitespace-pre-line leading-relaxed">
                      {t(`content.${key}.text`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
