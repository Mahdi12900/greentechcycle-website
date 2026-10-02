"use client";

import { useLocale, useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion";
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
    { key: "necessary", icon: ShieldCheck, color: "bg-leaf-50 text-leaf border-leaf-100" },
    { key: "analytics", icon: BarChart3, color: "bg-leaf-50 text-forest border-line" },
    { key: "functional", icon: Sparkles, color: "bg-ochre-100 text-ochre border-ochre-100" },
    { key: "marketing", icon: Megaphone, color: "bg-leaf-50 text-forest border-line" },
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Transparence sur les cookies déposés par GreenTechCycle : finalités, durées et outils de gestion de vos préférences."
        breadcrumbLabel="Cookies"
        icon={<Cookie className="h-7 w-7 text-leaf" />}
      >
        <div className="space-y-10">
          {/* Intro */}
          <FadeIn delay={0.05}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-line">
              <h2 className="text-display-md text-ink mb-3">
                {t("content.intro.title")}
              </h2>
              <p className="text-ink-700 whitespace-pre-line leading-relaxed">
                {t("content.intro.text")}
              </p>
            </div>
          </FadeIn>

          {/* Categories */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-display-md text-ink mb-6">
                {t("content.categories.title")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {categories.map(({ key, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="bg-white rounded-2xl p-6 border border-line hover:shadow-card transition-colors duration-150"
                  >
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-heading-md text-ink mb-2">
                      {t(`content.categories.${key}.title`)}
                    </h3>
                    <p className="text-sm text-ink-700 whitespace-pre-line leading-relaxed">
                      {t(`content.categories.${key}.text`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Management */}
          <FadeIn delay={0.2}>
            <div className="rounded-2xl p-6 md:p-8 border border-leaf/10 bg-leaf-50">
              <h2 className="text-display-md text-ink mb-3">
                {t("content.management.title")}
              </h2>
              <p className="text-ink-700 whitespace-pre-line leading-relaxed">
                {t("content.management.text")}
              </p>
            </div>
          </FadeIn>

          {/* Duration */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-line">
              <h2 className="text-display-md text-ink mb-3">
                {t("content.duration.title")}
              </h2>
              <p className="text-ink-700 whitespace-pre-line leading-relaxed">
                {t("content.duration.text")}
              </p>
            </div>
          </FadeIn>
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
