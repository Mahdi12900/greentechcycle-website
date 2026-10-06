"use client";

import { useState, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import Table from "@/components/ui/Table";
import {
  BANDS,
  EDITIONS,
  EDITION_FEATURES,
  MONTHLY_BILLING_UPLIFT,
  OT_MIN_ASSETS,
  bandIndex,
  bandLabel,
  editionMonthly,
  eur,
  num,
  otMonthly,
  type BandPrices,
  type EditionId,
  type L,
  type Lang,
} from "@/content/pricing";

/**
 * Blocs réutilisables de la page /tarifs (liste de prix publique, src/content/pricing.ts).
 * Aucun prix n'est écrit ici : tout est lu depuis le registre.
 */

export type Billing = "annual" | "monthly";

/** Applique la majoration de facturation mensuelle sans engagement (+20 %). */
export function withBilling(amount: number, billing: Billing): number {
  return billing === "monthly" ? Math.round(amount * (1 + MONTHLY_BILLING_UPLIFT) * 100) / 100 : amount;
}

/** Cellule ✓ / — accessible, sinon texte. */
export function Mark({ value, lang }: { value: string; lang: Lang }) {
  if (value === "✓")
    return (
      <>
        <Check className="h-4 w-4 text-emerald" aria-hidden="true" />
        <span className="sr-only">{lang === "en" ? "Included" : "Inclus"}</span>
      </>
    );
  if (value === "—")
    return (
      <>
        <Minus className="h-4 w-4 text-fg-muted" aria-hidden="true" />
        <span className="sr-only">{lang === "en" ? "Not included" : "Non inclus"}</span>
      </>
    );
  return <>{value}</>;
}

/** Bascule Annuel / Mensuel (radiogroup). */
export function BillingToggle({ billing, onChange, lang }: { billing: Billing; onChange: (b: Billing) => void; lang: Lang }) {
  const tx = (fr: string, en: string) => (lang === "en" ? en : fr);
  return (
    <div role="radiogroup" aria-label={tx("Facturation", "Billing")} className="inline-flex rounded-lg border border-track bg-bg-card p-1">
      {(["annual", "monthly"] as const).map((b) => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={billing === b}
          onClick={() => onChange(b)}
          className={`inline-flex min-h-[40px] items-center gap-2 rounded-md px-4 text-body-sm font-semibold transition-colors ${
            billing === b ? "bg-bg text-fg shadow-float" : "text-fg-strong hover:text-fg"
          }`}
        >
          {b === "annual" ? tx("Annuel", "Annual") : tx("Mensuel sans engagement", "Monthly, no commitment")}
          {b === "monthly" && <span className="rounded bg-amber-dim px-1.5 text-caption font-semibold text-amber">+20 %</span>}
        </button>
      ))}
    </div>
  );
}

/** Tableau « Tarif par tranche » : une ligne par offre, une colonne par tranche. */
export function BandTable({
  caption,
  rows,
  lang,
  billing = "annual",
  firstColLabel,
}: {
  caption: string;
  rows: { label: ReactNode; bands: BandPrices; note?: ReactNode }[];
  lang: Lang;
  billing?: Billing;
  firstColLabel: string;
}) {
  return (
    <Table
      caption={caption}
      head={[firstColLabel, ...BANDS.map((b) => bandLabel(b, lang))]}
      numeric={BANDS.map((_, i) => i + 1)}
      rows={rows.map((r) => [
        <span key="l" className="block min-w-[180px]">
          {r.label}
          {r.note && <span className="mt-0.5 block text-caption font-normal text-fg-muted">{r.note}</span>}
        </span>,
        ...r.bands.map((p, i) =>
          p == null ? (
            <span key={i} className="text-fg-muted">
              —
            </span>
          ) : (
            <span key={i} className="whitespace-nowrap">
              {eur(withBilling(p, billing), lang, { decimals: true })}
            </span>
          )
        ),
      ])}
    />
  );
}

/** Calculateur du total mensuel (éditions + OT/IoT), tarification progressive. */
export function PlatformCalculator({ lang, billing, idPrefix = "calc" }: { lang: Lang; billing: Billing; idPrefix?: string }) {
  const tx = (fr: string, en: string) => (lang === "en" ? en : fr);
  const [assets, setAssets] = useState(500);
  const [ot, setOt] = useState(0);
  const clamp = (v: number) => Math.max(0, Math.min(1_000_000, Math.round(v) || 0));
  const band = BANDS[bandIndex(Math.max(assets, 1))];
  const otTotal = ot > 0 ? withBilling(otMonthly(ot), billing) : 0;

  return (
    <div className="rounded-2xl border border-track bg-bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor={`${idPrefix}-assets`} className="block">
          <span className="block text-eyebrow uppercase text-fg-muted">{tx("Actifs IT gérés", "Managed IT assets")}</span>
          <input
            id={`${idPrefix}-assets`}
            type="number"
            inputMode="numeric"
            min={0}
            value={assets}
            onChange={(e) => setAssets(clamp(Number(e.target.value)))}
            className="mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body tabular-nums text-fg focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
          />
          <span className="mt-1 block text-caption text-fg-muted">
            {tx("Tranche atteinte", "Band reached")} : {bandLabel(band, lang)}
          </span>
        </label>
        <label htmlFor={`${idPrefix}-ot`} className="block">
          <span className="block text-eyebrow uppercase text-fg-muted">{tx("Actifs OT / IoT (option)", "OT / IoT assets (add-on)")}</span>
          <input
            id={`${idPrefix}-ot`}
            type="number"
            inputMode="numeric"
            min={0}
            value={ot}
            onChange={(e) => setOt(clamp(Number(e.target.value)))}
            className="mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body tabular-nums text-fg focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
          />
          <span className="mt-1 block text-caption text-fg-muted">
            {tx(`Minimum ${num(OT_MIN_ASSETS, lang)} actifs OT facturés`, `Minimum ${num(OT_MIN_ASSETS, lang)} OT assets billed`)}
          </span>
        </label>
      </div>

      <div aria-live="polite" className="mt-5 grid gap-3 sm:grid-cols-3">
        {EDITIONS.map((e) => {
          const base = editionMonthly(e.id as EditionId, assets);
          const total = base == null ? null : withBilling(base, billing) + otTotal;
          const perAsset = base == null || assets === 0 ? null : withBilling(base, billing) / assets;
          // Essentials plafonne à 2 000 actifs ; Professional (> 50 000) et Enterprise (> 50 000) : nous contacter
          const contact = e.id !== "essentials" && assets > 50000;
          return (
            <div key={e.id} className={`rounded-xl border p-4 ${e.recommended ? "border-emerald-line bg-emerald-dim" : "border-track bg-bg"}`}>
              <p className="text-eyebrow uppercase text-fg-muted">{e.name}</p>
              {total == null || contact ? (
                <p className="mt-2 text-body-sm text-fg-strong">
                  {contact
                    ? tx("Au-delà de 50 000 actifs : nous contacter", "Above 50,000 assets: contact us")
                    : tx("Plafond de 2 000 actifs : passez en Professional", "Capped at 2,000 assets: move to Professional")}
                </p>
              ) : (
                <>
                  <p className="mt-2 font-display text-display-sm tabular-nums text-emerald">
                    {eur(Math.round(total), lang)}
                    <span className="ml-1 font-sans text-caption text-fg-muted">{tx("HT/mois", "ex-VAT/mo")}</span>
                  </p>
                  {perAsset != null && (
                    <p className="mt-1 text-caption text-fg-muted">
                      {tx("soit", "i.e.")} {eur(perAsset, lang, { decimals: true })} {tx("par actif", "per asset")}
                      {otTotal > 0 ? tx(" (hors OT)", " (excl. OT)") : ""}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
      {otTotal > 0 && (
        <p className="mt-3 text-caption text-fg-muted">
          {tx("Dont OT/IoT Visibility", "Including OT/IoT Visibility")} : {eur(Math.round(otTotal), lang)} {tx("HT/mois", "ex-VAT/mo")}
          {tx(" (collecteur OT par site en sus)", " (OT collector per site extra)")}
        </p>
      )}
      <p className="mt-3 text-caption text-fg-muted">
        {tx(
          "Minimums appliqués : Essentials 100 actifs, Professional 2 500 €/mois, Enterprise 2 000 actifs. " +
            (billing === "monthly" ? "Facturation mensuelle sans engagement (+20 %)." : "Engagement annuel."),
          "Minimums applied: Essentials 100 assets, Professional €2,500/month, Enterprise 2,000 assets. " +
            (billing === "monthly" ? "Monthly billing, no commitment (+20%)." : "Annual commitment.")
        )}
      </p>
    </div>
  );
}

/** Matrice fonctionnelle Bon / Mieux / Meilleur, groupée. */
export function FeatureMatrix({ lang, caption }: { lang: Lang; caption: string }) {
  return (
    <div tabIndex={0} role="region" aria-label={caption} className="relative overflow-x-auto rounded-xl border border-track md:overflow-visible">
      <table className="w-full min-w-[560px] border-collapse text-body-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="sticky top-16 z-10 bg-bg-card xl:top-[72px]">
          <tr>
            <th scope="col" className="w-[40%] px-4 py-3 text-left text-eyebrow uppercase text-fg-muted">
              {lang === "en" ? "Feature" : "Fonction"}
            </th>
            {EDITIONS.map((e) => (
              <th
                key={e.id}
                scope="col"
                className={`border-l border-track px-4 py-3 text-left text-eyebrow uppercase ${e.recommended ? "bg-emerald-dim text-emerald" : "text-fg-muted"}`}
              >
                {e.name}
              </th>
            ))}
          </tr>
        </thead>
        {EDITION_FEATURES.map((g) => (
          <tbody key={g.title.fr}>
            <tr className="border-t border-track bg-bg">
              <th scope="colgroup" colSpan={4} className="px-4 pb-2 pt-5 text-left text-eyebrow uppercase text-emerald">
                {g.title[lang]}
              </th>
            </tr>
            {g.rows.map((row) => (
              <tr key={row.label.fr} className="border-t border-track">
                <th scope="row" className="px-4 py-2.5 text-left align-top font-normal text-fg-strong">
                  {row.label[lang]}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className={`border-l border-track px-4 py-2.5 align-top ${EDITIONS[i].recommended ? "bg-white/[0.02] text-fg" : "text-fg-strong"}`}>
                    <Mark value={v[lang]} lang={lang} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

/** Ligne de prix « nom · métrique · prix » sous forme de liste de définitions compacte. */
export function PriceList({
  items,
  lang,
}: {
  items: { name: L; amount: number | null; priceText?: L; unit: L; note?: L }[];
  lang: Lang;
}) {
  return (
    <ul className="divide-y divide-track rounded-xl border border-track bg-bg">
      {items.map((it) => (
        <li key={it.name.fr} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-4 py-3">
          <span className="min-w-0 flex-1 basis-full sm:basis-auto">
            <span className="block text-body-sm font-medium text-fg">{it.name[lang]}</span>
            {it.note && <span className="block text-caption text-fg-muted">{it.note[lang]}</span>}
          </span>
          <span className="text-right">
            <span className="block whitespace-nowrap text-body-sm font-semibold tabular-nums text-emerald">
              {it.amount != null ? eur(it.amount, lang) : it.priceText?.[lang]}
            </span>
            <span className="block text-caption text-fg-muted">{it.unit[lang]}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
