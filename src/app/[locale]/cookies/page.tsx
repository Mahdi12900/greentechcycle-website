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
    { key: "necessary", icon: ShieldCheck, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { key: "analytics", icon: BarChart3, color: "bg-blue-50 text-blue-600 border-blue-100" },
    { key: "functional", icon: Sparkles, color: "bg-amber-50 text-amber-600 border-amber-100" },
    { key: "marketing", icon: Megaphone, color: "bg-rose-50 text-rose-600 border-rose-100" },
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Transparence sur les cookies déposés par GreenTechCycle : finalités, durées et outils de gestion de vos préférences."
        breadcrumbLabel="Cookies"
        icon={<Cookie className="h-7 w-7 text-accent" />}
      >
        <div className="space-y-10">
          {/* Intro */}
          <FadeIn delay={0.05}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {t("content.intro.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {t("content.intro.text")}
              </p>
            </div>
          </FadeIn>

          {/* Categories */}
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 tracking-tight">
                {t("content.categories.title")}
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {categories.map(({ key, icon: Icon, color }) => (
                  <div
                    key={key}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border mb-4 ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t(`content.categories.${key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                      {t(`content.categories.${key}.text`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Management */}
          <FadeIn delay={0.2}>
            <div className="bg-gradient-to-br from-primary-50 to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/10">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {t("content.management.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {t("content.management.text")}
              </p>
            </div>
          </FadeIn>

          {/* Duration */}
          <FadeIn delay={0.3}>
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                {t("content.duration.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
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
