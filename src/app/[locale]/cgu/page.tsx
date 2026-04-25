"use client";

import { useLocale, useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
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
        subtitle="Conditions générales d'utilisation de la plateforme GreenTechCycle — engagements, responsabilités et cadre contractuel."
        breadcrumbLabel="CGU"
        icon={<FileText className="h-7 w-7 text-accent" />}
      >
        <StaggerContainer className="space-y-6 md:space-y-8">
          {articles.map((article, idx) => (
            <StaggerItem key={article}>
              <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute -left-[3px] top-6 w-1 h-12 bg-gradient-to-b from-accent to-primary rounded-full" />
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
                      {t(`content.${article}.title`)}
                    </h2>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {t(`content.${article}.text`)}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.2}>
          <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent/5 border border-primary/10 rounded-2xl p-6 md:p-8 flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Besoin d&apos;éclaircissements ?</h3>
              <p className="text-sm text-gray-600">
                Notre équipe juridique répond sous 48h aux questions contractuelles.{" "}
                <a href={`/${locale}/contact`} className="text-primary font-semibold hover:text-accent underline underline-offset-2">
                  Nous contacter
                </a>
              </p>
            </div>
          </div>
        </FadeIn>
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
