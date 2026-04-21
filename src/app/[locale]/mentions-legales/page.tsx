"use client";

import { useTranslations } from "next-intl";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";

export default function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {

  return <MentionsLegalesContent />;
}

function MentionsLegalesContent() {
  const t = useTranslations("Legal.mentions");

  const sections = ["editor", "hosting", "ip", "liability"] as const;

  return (
    <section className="section-padding">
      <div className="container-max max-w-4xl">
        <FadeIn>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>
        </FadeIn>

        <StaggerContainer className="space-y-8">
          {sections.map((section) => (
            <StaggerItem key={section}>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(`content.${section}.title`)}
                </h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {t(`content.${section}.text`)}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
