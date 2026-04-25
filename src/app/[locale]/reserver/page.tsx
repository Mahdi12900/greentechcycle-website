"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion";
import ReservationForm from "@/components/reservation/ReservationForm";
import { ChevronLeft, ShieldCheck, Clock, Mail } from "lucide-react";

const KNOWN_OFFERS = new Set([
  "waki-box-essentiel",
  "waki-box-confort",
  "waki-box-premium",
  "waki-box-pilote",
  "box-supplementaire",
  "collecte-urgence",
  "animation-semaine-recyclage",
  "rapport-csrd-dedie",
  "kit-comm-customise",
  "audit-deee",
  "formation-equipes",
]);

function ReserverInner() {
  const t = useTranslations("reserver");
  const sp = useSearchParams();
  const rawOffer = sp?.get("offre") ?? null;
  const offerSlug = rawOffer && KNOWN_OFFERS.has(rawOffer) ? rawOffer : null;

  let eyebrow = t("hero.eyebrowDefault");
  let headline = t("hero.headlineDefault");
  let subtitle = t("hero.subtitleDefault");

  if (offerSlug) {
    const offerLabel = t(`offers.${offerSlug}`);
    if (offerSlug === "waki-box-pilote") {
      headline = t("hero.pilotHeadline");
      subtitle = t("hero.pilotSubtitle");
    } else if (offerSlug.startsWith("waki-box-")) {
      headline = `${t("hero.headlinePrefix")}${offerLabel}.`;
    } else {
      headline = t("hero.addonHeadline");
      subtitle = t("hero.addonSubtitle");
    }
  }

  const offerLabelDisplay = offerSlug ? t(`offers.${offerSlug}`) : t("summary.noOffer");

  return (
    <main className="overflow-hidden bg-white">
      {/* Hero · sombre court */}
      <section className="relative bg-[#0F172A] overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(16,185,129,0.16) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 py-16 lg:py-24">
          <FadeIn>
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-gray-400 hover:text-white transition-colors mb-7"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                GreenTechCycle
              </Link>

              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-300 uppercase mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {eyebrow}
              </span>

              <h1
                className="text-white font-black tracking-tight mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.05 }}
              >
                {headline}
              </h1>
              <p className="text-gray-300 text-base lg:text-lg leading-[1.7] max-w-2xl">
                {subtitle}
              </p>

              {offerSlug && (
                <div className="mt-7 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10B981]/12 border border-[#10B981]/30 text-[12px] text-[#6EE7B7] font-medium">
                  <span className="text-[#6EE7B7] font-bold">{t("summary.offerLabel")} :</span>
                  <span>{offerLabelDisplay}</span>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="bg-[#F8FAFC] py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ReservationForm offerSlug={offerSlug} />

          {/* Reassurance bar */}
          <div className="max-w-3xl mx-auto mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { icon: Clock, label: t("reassurance.responseTime") },
              { icon: ShieldCheck, label: t("reassurance.dataLocation") },
              { icon: Mail, label: t("reassurance.confirmation") },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100"
                >
                  <Icon className="h-4 w-4 text-[#10B981] flex-shrink-0" aria-hidden="true" />
                  <span className="text-[12px] font-medium text-gray-600">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ReserverPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-[#F8FAFC]" />}>
      <ReserverInner />
    </Suspense>
  );
}
