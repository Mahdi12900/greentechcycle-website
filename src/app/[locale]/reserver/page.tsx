"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import ReservationForm from "@/components/reservation/ReservationForm";
import { ChevronLeft, ShieldCheck, Clock, Mail } from "lucide-react";
import {
  COLLECTION_CLASSES,
  EDITIONS,
  MODULES,
  PS_PACKAGES,
  TRIAL,
  WAKI_ADDONS,
  WAKI_EXTRA_KIOSK,
  WAKI_PLANS,
  WAKI_SETUP_BANDS,
  eur,
  itadLine,
  type Lang,
} from "@/content/pricing";

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
  "essai-asset-management",
  "plateforme-essentials",
  "plateforme-professional",
  "plateforme-enterprise",
  "plateforme-demo",
  "demo-plateforme",
  "contact-general",
  // Secteurs, audits et contrats
  "audit-sectoriel",
  "audit-finance",
  "audit-sante",
  "audit-industrie",
  "audit-retail",
  "audit-energie",
  "audit-transport",
  "audit-public",
  "audit-tech",
  "audit-medias-audiovisuel",
  "audit-conseil",
  "audit-pharma",
  "audit-btp",
  "audit-horeca",
  "audit-education",
  "audit-agroalimentaire",
  "audit-telecom",
  "media-cadre",
  "demo-conseil",
  // Slugs historiques (impact, pourquoi-gtc)
  "audit-decommissionnement",
  "methodologie-csrd",
  "esrs-pack",
  "csrd-pack",
  "audit-blanc-itad",
  "plateforme-info",
  // Nouvelles portes d'entrée + bundles (Passe 2)
  "pilote-waki-box",
  "pilote-audit-3j",
  "diagnostic-flash",
  "intervention-urgence",
  "animation-rse",
  "rapport-csrd-esrs",
  "kit-signaletique-rse",
  "audit-terrain-deee",
  "formation-collaborateurs",
]);

type OfferPricing = {
  price: { fr: string; en: string };
  setup?: { fr: string; en: string };
  engagement?: { fr: string; en: string };
};

/* Prix lus dans la liste publique src/content/pricing.ts (2026-10-06) : aucun montant écrit ici. */
const W = (id: string) => WAKI_PLANS.find((p) => p.id === id)!;
const both = (f: (lang: Lang) => string) => ({ fr: f("fr"), en: f("en") });
const perMonth = (n: number) => both((l) => (l === "en" ? `${eur(n, l)} ex-VAT/month` : `${eur(n, l)} HT/mois`));
const flat = (n: number, suffix?: { fr: string; en: string }) =>
  both((l) => `${eur(n, l)} ${l === "en" ? "ex-VAT" : "HT"}${suffix ? ` ${suffix[l]}` : ""}`);
const months = (n: number) => ({ fr: `${n} mois`, en: `${n} months` });
const addon = (id: string) => WAKI_ADDONS.find((a) => a.id === id)!;
const pilot3 = PS_PACKAGES.find((p) => p.id === "pilote-3j")!;
const csrd = MODULES.find((m) => m.id === "csrd-ess")!;
const kioskPilot = {
  price: both((l) => (l === "en" ? `1st month free, then ${eur(W("essentiel").monthly, l)} ex-VAT/month` : `1er mois offert, puis ${eur(W("essentiel").monthly, l)} HT/mois`)),
  setup: flat(W("essentiel").setup!, { fr: "(mise en service Essentiel)", en: "(Essentiel setup)" }),
  engagement: months(W("essentiel").commitmentMonths),
};
const urgentPickup = {
  price: both((l) =>
    l === "en"
      ? `Free if the buyback value covers it; otherwise urgent (D+1) Île-de-France from ${eur(COLLECTION_CLASSES[0].z1Urgent, l)} ex-VAT`
      : `Offerte si le rachat la finance ; sinon urgente (J+1) Île-de-France dès ${eur(COLLECTION_CLASSES[0].z1Urgent, l)} HT`
  ),
};
const perDay = { fr: "par jour", en: "per day" };
const edition = (id: "essentials" | "professional" | "enterprise") => {
  const e = EDITIONS.find((x) => x.id === id)!;
  return {
    price: both((l) => (l === "en" ? `From ${eur(e.bands[0]!, l)} to ${eur([...e.bands].reverse().find((b) => b != null)!, l)} ex-VAT per asset/month, by band` : `De ${eur(e.bands[0]!, l)} à ${eur([...e.bands].reverse().find((b) => b != null)!, l)} HT par actif/mois, par tranche`)),
    engagement: { fr: "12 mois (mensuel sans engagement : +20 %)", en: "12 months (monthly, no commitment: +20%)" },
  };
};

const ITAD_FROM = both((l) =>
  l === "en"
    ? `Per device, by band: workstation from ${eur(itadLine("ws-e1").bands[8]!, l)} ex-VAT (${eur(itadLine("ws-e1").bands[0]!, l)} for 1–50)`
    : `Par appareil, par tranche : poste dès ${eur(itadLine("ws-e1").bands[8]!, l)} HT (${eur(itadLine("ws-e1").bands[0]!, l)} de 1 à 50)`
);

const OFFER_PRICING: Record<string, OfferPricing> = {
  "essai-asset-management": {
    price: { fr: `Gratuit — ${TRIAL.days} jours, ${TRIAL.maxAssets} actifs, ${TRIAL.users} utilisateurs`, en: `Free — ${TRIAL.days} days, ${TRIAL.maxAssets} assets, ${TRIAL.users} users` },
    setup: { fr: "Sans carte bancaire", en: "No credit card" },
  },
  "plateforme-essentials": edition("essentials"),
  "plateforme-professional": edition("professional"),
  "plateforme-enterprise": edition("enterprise"),
  "waki-box-essentiel": { price: perMonth(W("essentiel").monthly), setup: flat(W("essentiel").setup!), engagement: months(W("essentiel").commitmentMonths) },
  "waki-box-confort": { price: perMonth(W("confort").monthly), setup: flat(W("confort").setup!), engagement: months(W("confort").commitmentMonths) },
  "waki-box-premium": {
    price: perMonth(W("premium").monthly),
    setup: flat(WAKI_SETUP_BANDS[0].price, { fr: "par borne (dégressif dès 5 bornes)", en: "per kiosk (lower from 5 kiosks)" }),
    engagement: months(W("premium").commitmentMonths),
  },
  "waki-box-pilote": kioskPilot,
  "pilote-waki-box": kioskPilot,
  "pilote-audit-3j": {
    price: flat(pilot3.amount!),
    setup: { fr: "Mission de 3 jours", en: "3-day engagement" },
    engagement: { fr: "Déductible d'un contrat Plateforme signé sous 90 jours", en: "Deductible from a Platform contract signed within 90 days" },
  },
  "diagnostic-flash": {
    price: { fr: "Gratuit - 2 minutes", en: "Free - 2 minutes" },
  },
  "waki-box-addon-collecte": urgentPickup,
  "collecte-urgence": urgentPickup,
  "intervention-urgence": urgentPickup,
  "waki-box-addon-animation": { price: flat(addon("animation-rse").amount!, perDay) },
  "animation-semaine-recyclage": { price: flat(addon("animation-rse").amount!, perDay) },
  "animation-rse": { price: flat(addon("animation-rse").amount!, perDay) },
  "waki-box-addon-csrd": { price: flat(csrd.amount!, { fr: "par entité et par an", en: "per entity per year" }) },
  "rapport-csrd-dedie": { price: flat(csrd.amount!, { fr: "par entité et par an", en: "per entity per year" }) },
  "rapport-csrd-esrs": { price: flat(csrd.amount!, { fr: "par entité et par an", en: "per entity per year" }) },
  "waki-box-addon-kit": { price: flat(addon("kit").amount!, { fr: "par kit", en: "per kit" }) },
  "kit-comm-customise": { price: flat(addon("kit").amount!, { fr: "par kit", en: "per kit" }) },
  "kit-signaletique-rse": { price: flat(addon("kit").amount!, { fr: "par kit", en: "per kit" }) },
  "waki-box-addon-audit": { price: flat(addon("audit").amount!, perDay) },
  "audit-deee": { price: flat(addon("audit").amount!, perDay) },
  "audit-terrain-deee": { price: flat(addon("audit").amount!, perDay) },
  "waki-box-addon-formation": { price: flat(addon("formation").amount!, { fr: "par session de 2 h", en: "per 2-hour session" }) },
  "formation-equipes": { price: flat(addon("formation").amount!, { fr: "par session de 2 h", en: "per 2-hour session" }) },
  "formation-collaborateurs": { price: flat(addon("formation").amount!, { fr: "par session de 2 h", en: "per 2-hour session" }) },
  "box-supplementaire": {
    price: perMonth(WAKI_EXTRA_KIOSK.monthly),
    setup: flat(WAKI_EXTRA_KIOSK.setup),
  },
  "audit-inventaire": {
    price: ITAD_FROM,
  },
  "effacement-securise": {
    price: ITAD_FROM,
  },
  "reconditionnement-valorisation": {
    price: ITAD_FROM,
  },
  "recyclage-deee": {
    price: ITAD_FROM,
  },
  "cybersecurite": {
    price: ITAD_FROM,
  },
  "cybersecurite-itad": {
    price: ITAD_FROM,
  },
  "wakibox": {
    price: both((l) => (l === "en" ? `From ${eur(W("essentiel").monthly, l)} ex-VAT/month` : `Dès ${eur(W("essentiel").monthly, l)} HT/mois`)),
  },
  "cadre-media": {
    price: { fr: "Sur devis (contrat-cadre)", en: "Custom quote (framework contract)" },
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
  // ?secteur=<slug> (CTA des pages secteur) : dimension GA4 « sector » du lead généré.
  const sector = sp?.get("secteur") ?? null;

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
    <div className="overflow-hidden bg-bg-card">
      {/* Hero · sombre court */}
      <section className="relative bg-bg-card overflow-hidden border-b border-track">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-16">
          <div className="reveal">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-caption font-medium text-fg-muted hover:text-fg transition-colors mb-7"
              >
                <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                GreenTechCycle
              </Link>

              <span className="block mb-6 text-eyebrow uppercase text-fg-muted">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {eyebrow}
              </span>

              <h1
                className="text-display-lg text-fg mb-5"
              >
                {headline}
              </h1>
              <p className="text-fg-muted text-base lg:text-lg max-w-2xl">
                {subtitle}
              </p>

              {offerSlug && (
                <div className="mt-7 max-w-xl rounded-2xl bg-emerald-dim border border-emerald/30 p-4 lg:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-caption text-emerald font-medium mb-3">
                    <span className="text-fg-muted uppercase text-eyebrow">
                      {t("summary.offerLabel")}
                    </span>
                    <span className="text-fg text-body-sm font-semibold">{offerLabelDisplay}</span>
                  </div>
                  {pricing && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-caption">
                      <div className="flex flex-col">
                        <dt className="text-fg-muted uppercase text-eyebrow">
                          {labels.price}
                        </dt>
                        <dd className="text-fg font-semibold tabular-nums">{pricing.price[lang]}</dd>
                      </div>
                      {pricing.setup && (
                        <div className="flex flex-col">
                          <dt className="text-fg-muted uppercase text-eyebrow">
                            {labels.setup}
                          </dt>
                          <dd className="text-fg font-semibold tabular-nums">{pricing.setup[lang]}</dd>
                        </div>
                      )}
                      {pricing.engagement && (
                        <div className="flex flex-col">
                          <dt className="text-fg-muted uppercase text-eyebrow">
                            {labels.engagement}
                          </dt>
                          <dd className="text-fg font-semibold">{pricing.engagement[lang]}</dd>
                        </div>
                      )}
                    </dl>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-bg-card py-12 lg:py-16">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <ReservationForm offerSlug={offerSlug} sector={sector} />

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
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-card border border-track"
                >
                  <Icon className="h-4 w-4 text-emerald flex-shrink-0" aria-hidden="true" />
                  <span className="text-caption font-medium text-fg-strong">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ReserverPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-bg-card" />}>
      <ReserverInner />
    </Suspense>
  );
}
