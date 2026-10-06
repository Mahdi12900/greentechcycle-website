"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CLIENTS } from "@/content/clients";
import { TRUST_SECTORS } from "@/content/trust-sectors";
import { KPIS } from "@/content/kpis";
import { CountUp } from "@/components/motion";

/**
 * Bandeau de confiance de l'accueil (JFrog-inspired, reports/revue-section-gtc.md,
 * option C) : chiffre d'ouverture (152 ETI clientes) + liste sectorielle synchronisée
 * avec un texte qualitatif à droite — remplace la liste à plat de noms sans hiérarchie.
 * Pattern ARIA tabs, orientation verticale. Aucun témoignage n'est attribué
 * nominativement à un client sauf quand un texte nominatif est déjà publié ailleurs
 * sur le site (Médias / TF1, src/content/trust-sectors.ts).
 */
export default function TrustBand() {
  const t = useTranslations("Home.trustBand");
  const locale = useLocale();
  const lang = locale === "en" ? "en" : "fr";
  const isEn = locale === "en";

  const [active, setActive] = useState(TRUST_SECTORS[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const activeSector = TRUST_SECTORS.find((s) => s.id === active) ?? TRUST_SECTORS[0];
  const activeClients = activeSector.clientIds
    .map((id) => CLIENTS.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === "ArrowDown") next = (idx + 1) % TRUST_SECTORS.length;
    else if (e.key === "ArrowUp") next = (idx - 1 + TRUST_SECTORS.length) % TRUST_SECTORS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TRUST_SECTORS.length - 1;
    else return;
    e.preventDefault();
    const id = TRUST_SECTORS[next].id;
    setActive(id);
    refs.current[id]?.focus();
  };

  return (
    <section className="border-y border-track bg-bg py-12 lg:py-16" aria-labelledby="clients-band-label">
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <p id="clients-band-label" className="text-center text-eyebrow uppercase text-fg-muted">
          {isEn ? "Trusted by" : "Ils nous font confiance"}
        </p>
        <p className="mx-auto mt-4 max-w-[48ch] text-center font-display text-display-md text-fg">
          <span className="text-emerald">
            <CountUp end={KPIS.clients.value} />
          </span>{" "}
          {KPIS.clients.label[lang]}
        </p>
        <p className="mx-auto mt-2 max-w-[55ch] text-center text-body-sm text-fg-muted">{KPIS.clients.period[lang]}</p>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label={isEn ? "Sectors" : "Secteurs"}
            aria-orientation="vertical"
            className="flex flex-row gap-1 overflow-x-auto border-b border-track pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6"
          >
            {TRUST_SECTORS.map((s, idx) => {
              const selected = s.id === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    refs.current[s.id] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`trust-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`trust-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  className={`flex-shrink-0 whitespace-nowrap px-3 py-3 text-left text-body-sm font-medium transition-colors lg:whitespace-normal lg:border-l-2 lg:px-4 ${
                    selected
                      ? "text-fg underline decoration-emerald decoration-2 underline-offset-8 lg:border-emerald lg:text-fg lg:no-underline"
                      : "text-fg-muted hover:text-fg lg:border-transparent"
                  }`}
                >
                  {s.label[lang]}
                </button>
              );
            })}
          </div>

          <div
            id={`trust-panel-${activeSector.id}`}
            role="tabpanel"
            aria-labelledby={`trust-tab-${activeSector.id}`}
            className="lg:col-span-8"
          >
            <p className="text-body-lg text-fg-strong">{activeSector.text[lang]}</p>
            <p className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-track pt-6">
              <span className="text-eyebrow uppercase text-fg-muted">
                {isEn ? "Clients in this sector:" : "Clients de ce secteur :"}
              </span>
              {activeClients.map((c) => (
                <span key={c.id} className="font-semibold text-fg">
                  {c.name}
                </span>
              ))}
            </p>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-[65ch] text-center text-caption text-fg-muted">{t("note")}</p>
      </div>
    </section>
  );
}
