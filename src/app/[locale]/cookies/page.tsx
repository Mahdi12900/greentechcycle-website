"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion";

export default function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return <CookiesContent />;
}

function CookiesContent() {
  const t = useTranslations("Legal.cookies");

  const categories = [
    "necessary",
    "analytics",
    "functional",
    "marketing",
  ] as const;

  return (
    <section className="section-padding">
      <div className="container-max max-w-4xl">
        <FadeIn>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>
        </FadeIn>

        <div className="space-y-8">
          <FadeIn delay={0.1}>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("content.intro.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {t("content.intro.text")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("content.categories.title")}
              </h2>

              <div className="space-y-4 pl-4">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {t(`content.categories.${category}.title`)}
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {t(`content.categories.${category}.text`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("content.management.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {t("content.management.text")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                {t("content.duration.title")}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {t("content.duration.text")}
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
