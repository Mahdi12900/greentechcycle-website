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
        icon={<FileText className="h-7 w-7 text-leaf" />}
      >
        <div className="reveal-stagger space-y-6 md:space-y-8">
          {articles.map((article, idx) => (
            <div key={article} className="reveal">
              <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-line hover:shadow-card transition-colors duration-150">
                <div className="absolute -left-[3px] top-6 w-1 h-12 rounded-full bg-leaf" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-leaf-50 border border-leaf/10 flex items-center justify-center text-leaf font-semibold text-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-display-md text-ink mb-3">
                      {t(`content.${article}.title`)}
                    </h2>
                    <p className="text-ink-700 whitespace-pre-line leading-relaxed">
                      {t(`content.${article}.text`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="mt-12 border border-leaf/10 rounded-2xl p-6 md:p-8 flex items-start gap-5 bg-leaf-50">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-leaf text-white flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-heading-md text-ink mb-1">Besoin d&apos;éclaircissements ?</h3>
              <p className="text-sm text-ink-700">
                Notre équipe juridique répond sous 48h aux questions contractuelles.{" "}
                <a href={`/${locale}/contact`} className="text-leaf font-semibold hover:text-leaf underline underline-offset-2">
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
