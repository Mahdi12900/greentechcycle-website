"use client";

import { useLocale, useTranslations } from "next-intl";

import { FileText, ShieldCheck } from "lucide-react";
import LegalPageLayout from "@/components/LegalPageLayout";
import CtaSection from "@/components/CtaSection";

export default function CguPage() {
  const locale = useLocale();
  return <CguContent locale={locale} />;
}

function CguContent({ locale }: { locale: string }) {
  const t = useTranslations("Legal.cgu");

  const articles = [
    "object",
    "access",
    "account",
    "usage",
    "ip",
    "liability",
    "termination",
    "law",
  ] as const;

  return (
    <>
      <LegalPageLayout
        locale={locale}
        title={t("title")}
        subtitle="Conditions générales d'utilisation de la plateforme GreenTechCycle, engagements, responsabilités et cadre contractuel."
        breadcrumbLabel="CGU"
        icon={<FileText className="h-7 w-7 text-emerald" />}
      >
        <div className="reveal-stagger space-y-6 md:space-y-8">
          {articles.map((article, idx) => (
            <div key={article} className="reveal">
              <div className="group relative bg-bg-card rounded-2xl p-6 md:p-8 border border-track hover:border-track-strong transition-colors duration-150">
                <div className="absolute -left-[3px] top-6 w-1 h-12 rounded-full bg-emerald" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-emerald/10 flex items-center justify-center text-emerald font-semibold text-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-display-md text-fg mb-3">
                      {t(`content.${article}.title`)}
                    </h2>
                    <p className="text-fg-strong whitespace-pre-line leading-relaxed">
                      {t(`content.${article}.text`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="mt-12 border border-emerald/10 rounded-2xl p-6 md:p-8 flex items-start gap-5 bg-white/[0.03]">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald text-bg flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-heading-md text-fg mb-1">Besoin d&apos;éclaircissements ?</h3>
              <p className="text-sm text-fg-strong">
                Notre équipe juridique répond sous 48h aux questions contractuelles.{" "}
                <a href={`/${locale}/contact`} className="text-emerald font-semibold hover:text-emerald underline underline-offset-2">
                  Nous contacter
                </a>
              </p>
            </div>
          </div>
        </div>
      </LegalPageLayout>

      <CtaSection
        title="Une question sur nos conditions ?"
        subtitle="Notre équipe répond à vos interrogations juridiques et commerciales. Planifiez un échange avec un expert GreenTechCycle."
        primaryLabel="Planifier une démo"
        primaryHref="/demo"
        secondaryLabel="Nous contacter"
        secondaryHref="/contact"
        variant="demo"
        tone="dark"
      />
    </>
  );
}
