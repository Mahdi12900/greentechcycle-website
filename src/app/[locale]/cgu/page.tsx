"use client";

import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function CguPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return <CguContent />;
}

function CguContent() {
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
    <section className="section-padding">
      <div className="container-max max-w-4xl">
        <FadeIn>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>
        </FadeIn>

        <StaggerContainer className="space-y-8">
          {articles.map((article) => (
            <StaggerItem key={article}>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(`content.${article}.title`)}
                </h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {t(`content.${article}.text`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
