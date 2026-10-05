"use client";

import { useLocale, useTranslations } from "next-intl";

import { Cookie, ShieldCheck, BarChart3, Sparkles, Megaphone } from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";
import CtaSection from "@/components/CtaSection";

export default function CookiesPage() {
  const locale = useLocale();
  return <CookiesContent locale={locale} />;
}

function CookiesContent({ locale }: { locale: string }) {
  const t = useTranslations("Legal.cookies");

  const categories = [
    { key: "necessary", icon: ShieldCheck, color: "bg-white/[0.03] text-emerald border-emerald-line" },
    { key: "analytics", icon: BarChart3, color: "bg-white/[0.03] text-emerald border-track" },
    { key: "functional", icon: Sparkles, color: "bg-amber-dim text-amber border-amber/40" },
    { key: "marketing", icon: Megaphone, color: "bg-white/[0.03] text-emerald border-track" },
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Transparence sur les cookies déposés par GreenTechCycle : finalités, durées et outils de gestion de vos préférences."
        breadcrumbLabel="Cookies"
        icon={<Cookie className="h-7 w-7 text-emerald" />}
      >
        <div className="space-y-10">
          {/* Intro */}
          <div className="reveal">
            <div className="bg-bg-card rounded-2xl p-6 md:p-8 border border-track">
              <h2 className="text-display-md text-fg mb-3">
                {t("content.intro.title")}
              </h2>
              <p className="text-fg-strong whitespace-pre-line leading-relaxed">
                {t("content.intro.text")}
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="reveal">
            <div>
              <h2 className="text-display-md text-fg mb-6">
                {t("content.categories.title")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {categories.map(({ key, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="bg-bg-card rounded-2xl p-6 border border-track hover:border-track-strong transition-colors duration-150"
                  >
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-heading-md text-fg mb-2">
                      {t(`content.categories.${key}.title`)}
                    </h3>
                    <p className="text-sm text-fg-strong whitespace-pre-line leading-relaxed">
                      {t(`content.categories.${key}.text`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Management */}
          <div className="reveal">
            <div className="rounded-2xl p-6 md:p-8 border border-emerald/10 bg-white/[0.03]">
              <h2 className="text-display-md text-fg mb-3">
                {t("content.management.title")}
              </h2>
              <p className="text-fg-strong whitespace-pre-line leading-relaxed">
                {t("content.management.text")}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="reveal">
            <div className="bg-bg-card rounded-2xl p-6 md:p-8 border border-track">
              <h2 className="text-display-md text-fg mb-3">
                {t("content.duration.title")}
              </h2>
              <p className="text-fg-strong whitespace-pre-line leading-relaxed">
                {t("content.duration.text")}
              </p>
            </div>
          </div>
        </div>
      </LegalPageLayout>

      <CtaSection
        title="Reprenez le contrôle de vos préférences"
        subtitle="Vous pouvez à tout moment modifier vos choix de cookies ou contacter notre DPO pour toute question sur le traitement de vos données."
        primaryLabel="Nous contacter"
        primaryHref="/contact"
        secondaryLabel="Voir la politique de confidentialité"
        secondaryHref="/confidentialite"
        variant="contact"
        tone="dark"
      />
    </>
  );
}
