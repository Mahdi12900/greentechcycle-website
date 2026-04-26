"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion";
import ReservationForm from "@/components/reservation/ReservationForm";
import { ChevronLeft, ShieldCheck, Clock, Mail } from "lucide-react";

const KNOWN_OFFERS = new Set([
  // Plans Waki Box
  "waki-box-essentiel",
  "waki-box-confort",
  "waki-box-premium",
  "waki-box-pilote",
  // Options Waki Box (slugs historiques)
  "box-supplementaire",
  "collecte-urgence",
  "animation-semaine-recyclage",
  "rapport-csrd-dedie",
  "kit-comm-customise",
  "audit-deee",
  "formation-equipes",
  // Options Waki Box (slugs canoniques whitelist agent)
  "waki-box-addon-collecte",
  "waki-box-addon-animation",
  "waki-box-addon-csrd",
  "waki-box-addon-kit",
  "waki-box-addon-audit",
  "waki-box-addon-formation",
  // Services ITAD
  "audit-inventaire",
  "effacement-securise",
  "reconditionnement-valorisation",
  "recyclage-deee",
  "cybersecurite",
  "cybersecurite-itad",
  "wakibox",
  // Plateforme et contact
  "plateforme-demo",
  "demo-plateforme",
  "contact-general",
  // Slugs historiques (impact, pourquoi-gtc)
  "audit-decommissionnement",
  "methodologie-csrd",
  "esrs-pack",
  "csrd-pack",
  "audit-blanc-itad",
  "plateforme-info",
]);

type OfferPricing = {
  price: { fr: string; en: string };
  setup?: { fr: string; en: string };
  engagement?: { fr: string; en: string };
};

const OFFER_PRICING: Record<string, OfferPricing> = {
  "waki-box-essentiel": {
    price: { fr: "39 € HT/mois", en: "€39 ex-VAT/month" },
    setup: { fr: "150 € HT", en: "€150 ex-VAT" },
    engagement: { fr: "12 mois", en: "12 months" },
  },
  "waki-box-confort": {
    price: { fr: "79 € HT/mois", en: "€79 ex-VAT/month" },
    setup: { fr: "290 € HT", en: "€290 ex-VAT" },
    engagement: { fr: "12 mois", en: "12 months" },
  },
  "waki-box-premium": {
    price: { fr: "dès 149 € HT/mois", en: "from €149 ex-VAT/month" },
    setup: { fr: "490 € HT par borne", en: "€490 ex-VAT per kiosk" },
    engagement: { fr: "24 mois", en: "24 months" },
  },
  "waki-box-pilote": {
    price: { fr: "19 € HT/mois pendant 6 mois", en: "€19 ex-VAT/month for 6 months" },
    setup: { fr: "Mise en service offerte", en: "Setup waived" },
  },
  "waki-box-addon-collecte": {
    price: { fr: "90 € HT par intervention", en: "€90 ex-VAT per intervention" },
  },
  "collecte-urgence": {
    price: { fr: "90 € HT par intervention", en: "€90 ex-VAT per intervention" },
  },
  "waki-box-addon-animation": {
    price: { fr: "350 € HT par jour", en: "€350 ex-VAT per day" },
  },
  "animation-semaine-recyclage": {
    price: { fr: "350 € HT par jour", en: "€350 ex-VAT per day" },
  },
  "waki-box-addon-csrd": {
    price: { fr: "490 € HT par an", en: "€490 ex-VAT per year" },
  },
  "rapport-csrd-dedie": {
    price: { fr: "490 € HT par an", en: "€490 ex-VAT per year" },
  },
  "waki-box-addon-kit": {
    price: { fr: "290 € HT (one-shot)", en: "€290 ex-VAT (one-off)" },
  },
  "kit-comm-customise": {
    price: { fr: "290 € HT (one-shot)", en: "€290 ex-VAT (one-off)" },
  },
  "waki-box-addon-audit": {
    price: { fr: "1 500 € HT par jour", en: "€1,500 ex-VAT per day" },
  },
  "audit-deee": {
    price: { fr: "1 500 € HT par jour", en: "€1,500 ex-VAT per day" },
  },
  "waki-box-addon-formation": {
    price: { fr: "450 € HT pour 2 heures", en: "€450 ex-VAT for 2 hours" },
  },
  "formation-equipes": {
    price: { fr: "450 € HT pour 2 heures", en: "€450 ex-VAT for 2 hours" },
  },
  "box-supplementaire": {
    price: { fr: "29 € HT/mois par borne", en: "€29 ex-VAT/month per kiosk" },
  },
  "audit-inventaire": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "effacement-securise": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "reconditionnement-valorisation": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "recyclage-deee": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "cybersecurite": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "cybersecurite-itad": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "wakibox": {
    price: { fr: "Sur devis selon volume", en: "Custom quote based on volume" },
  },
  "cadre-media": {
    price: { fr: "65 000 € HT/an (contrat-cadre)", en: "€65,000 ex-VAT/yr (framework contract)" },
    setup: { fr: "Audit initial inclus", en: "Initial audit included" },
    engagement: { fr: "12 mois renouvelable", en: "12 months renewable" },
  },
};

const PLAN_SLUGS = new Set([
  "waki-box-essentiel",
  "waki-box-confort",
  "waki-box-premium",
]);

function ReserverInner() {
  const t = useTranslations("reserver");
  const locale = useLocale();
  const isEn = locale === "en";
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
    } else if (PLAN_SLUGS.has(offerSlug)) {
      headline = `${t("hero.headlinePrefix")}${offerLabel}.`;
    } else {
      headline = t("hero.addonHeadline");
      subtitle = t("hero.addonSubtitle");
    }
  }

  const offerLabelDisplay = offerSlug ? t(`offers.${offerSlug}`) : t("summary.noOffer");
  const pricing = offerSlug ? OFFER_PRICING[offerSlug] : undefined;
  const lang = isEn ? "en" : "fr";
  const labels = {
    price: isEn ? "Price" : "Tarif",
    setup: isEn ? "Setup" : "Mise en service",
    engagement: isEn ? "Commitment" : "Engagement",
  };

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
                <div className="mt-7 max-w-xl rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30 p-4 lg:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#6EE7B7] font-medium mb-3">
                    <span className="text-[#6EE7B7] font-bold uppercase tracking-wider text-[10px]">
                      {t("summary.offerLabel")}
                    </span>
                    <span className="text-white text-[13px] font-semibold">{offerLabelDisplay}</span>
                  </div>
                  {pricing && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[12px]">
                      <div className="flex flex-col">
                        <dt className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">
                          {labels.price}
                        </dt>
                        <dd className="text-white font-bold tabular-nums">{pricing.price[lang]}</dd>
                      </div>
                      {pricing.setup && (
                        <div className="flex flex-col">
                          <dt className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">
                            {labels.setup}
                          </dt>
                          <dd className="text-white font-bold tabular-nums">{pricing.setup[lang]}</dd>
                        </div>
                      )}
                      {pricing.engagement && (
                        <div className="flex flex-col">
                          <dt className="text-gray-400 uppercase tracking-wider text-[10px] font-semibold">
                            {labels.engagement}
                          </dt>
                          <dd className="text-white font-bold">{pricing.engagement[lang]}</dd>
                        </div>
                      )}
                    </dl>
                  )}
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
