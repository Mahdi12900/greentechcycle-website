"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { FileDown, Minus, Plus } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { KPIS } from "@/content/kpis";
import {
  COLLECTION_CLASSES,
  COLLECTION_VALUE_RULE,
  ITAD_FEES,
  MODULES,
  PROOF_LEVELS,
  bandIndex,
  bandLabel,
  BANDS,
  eur as fmtEur,
  graduatedTotal,
  itadLine,
  type ItadLineId,
} from "@/content/pricing";

/**
 * Configurateur ITAD — prix liste publics (src/content/pricing.ts, liste du 2026-10-06).
 *
 * - Prix par catégorie d'appareil et par tranche, tarification progressive : la tranche se lit
 *   sur la quantité de la catégorie (ex. 120 postes : 50 au prix 1–50, 70 au prix 51–150).
 * - Niveau d'effacement selon la sensibilité : Standard → E1 Clear ; Sensibles / Très sensibles →
 *   E2 Purge vérifiée (smartphones toujours en E2). Supports à détruire : E3 atelier, ou sur site
 *   (+ mobilisation) si l'effacement sur site est choisi.
 * - Frais d'ouverture de lot si la commande compte moins de 50 appareils.
 * - Collecte : jamais ajoutée au total — offerte quand la valeur de rachat couvre 1,5 × les frais,
 *   sinon à partir du prix C1 Île-de-France ; le devis la chiffre selon lot, niveau, zone et délai.
 * - CO₂ évité par équipement réemployé : 150 kgCO₂e/poste ; serveur 1 350 et smartphone 51 kgCO₂e
 *   (facteurs ADEME/Boavizta du simulateur /impact) ; autres catégories non estimées.
 * - Réemploi : taux moyen validé src/content/kpis.ts.
 */

type CatId = "workstations" | "servers" | "drives" | "storage" | "netSmall" | "netCore" | "smartphones" | "ot" | "screens" | "destroy";
type Age = "lt3" | "3to5" | "gt5";
type Sensitivity = "standard" | "sensitive" | "high";
type Proof = "P1" | "P2" | "P3";

const REUSE = KPIS.reuse.value / 100;
const CSRD = MODULES.find((m) => m.id === "csrd-ess")!.amount!;
const P2 = PROOF_LEVELS.find((p) => p.id === "P2")!.amount!;
const P3 = PROOF_LEVELS.find((p) => p.id === "P3")!.amount!;
/** P2 : par lot de 200 actifs, + 0,50 € par actif au-delà */
const P2_LOT = 200;
const P2_EXTRA = 0.5;
const COLLECTION_FROM = COLLECTION_CLASSES[0].z1Planned;

interface Cat {
  id: CatId;
  label: { fr: string; en: string };
  /** Ligne de prix selon le niveau d'effacement retenu */
  line: (e2: boolean, onsite: boolean) => ItadLineId;
  /** kgCO₂e évités par équipement réemployé, ou null = non estimé ou non réemployé */
  co2: number | null;
  /** Compté dans le réemploi (les supports détruits et les disques ne le sont pas) */
  reusable: boolean;
}

const CATS: Cat[] = [
  { id: "workstations", label: { fr: "Postes (portables et fixes)", en: "Workstations (laptops, desktops)" }, line: (e2) => (e2 ? "ws-e2" : "ws-e1"), co2: 150, reusable: true },
  { id: "servers", label: { fr: "Serveurs (≤ 4 disques)", en: "Servers (≤ 4 drives)" }, line: (e2) => (e2 ? "srv-e2" : "srv-e1"), co2: 1350, reusable: true },
  { id: "drives", label: { fr: "Disques supplémentaires", en: "Additional drives" }, line: () => "drive", co2: null, reusable: false },
  { id: "storage", label: { fr: "Baies de stockage / NAS", en: "Storage arrays / NAS" }, line: () => "storage", co2: null, reusable: true },
  { id: "netSmall", label: { fr: "Petits équipements réseau", en: "Small network devices" }, line: () => "net-small", co2: null, reusable: true },
  { id: "netCore", label: { fr: "Cœur de réseau", en: "Core network" }, line: () => "net-core", co2: null, reusable: true },
  { id: "smartphones", label: { fr: "Smartphones et tablettes", en: "Smartphones and tablets" }, line: () => "mobile", co2: 51, reusable: true },
  { id: "ot", label: { fr: "Équipements OT / IoT", en: "OT / IoT devices" }, line: () => "ot", co2: null, reusable: true },
  { id: "screens", label: { fr: "Écrans", en: "Screens" }, line: () => "screen", co2: null, reusable: true },
  { id: "destroy", label: { fr: "Supports à détruire (E3)", en: "Media to destroy (E3)" }, line: (_e2, onsite) => (onsite ? "e3-site" : "e3-atelier"), co2: null, reusable: false },
];

export default function ItadConfigurator({ idPrefix = "cfg" }: { idPrefix?: string }) {
  const lang = useLocale() === "en" ? "en" : "fr";
  const isEn = lang === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const nf = new Intl.NumberFormat(isEn ? "en-GB" : "fr-FR");
  const eur = (n: number) => fmtEur(n, lang);

  // Exemple pré-rempli : le résultat et les CTA sont visibles dès l'arrivée
  const [qty, setQty] = useState<Record<CatId, number>>({
    workstations: 100,
    servers: 4,
    drives: 0,
    storage: 0,
    netSmall: 0,
    netCore: 0,
    smartphones: 0,
    ot: 0,
    screens: 0,
    destroy: 0,
  });
  const [age, setAge] = useState<Age>("3to5");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("sensitive");
  const [proof, setProof] = useState<Proof>("P1");
  const [options, setOptions] = useState({ pickup: true, onsite: false, csrd: false });

  const setCat = (id: CatId, v: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(100000, Math.round(v) || 0)) }));

  const ageLabel: Record<Age, string> = { lt3: tx("Moins de 3 ans", "Under 3 years"), "3to5": tx("3 à 5 ans", "3 to 5 years"), gt5: tx("Plus de 5 ans", "Over 5 years") };
  const sensLabel: Record<Sensitivity, string> = {
    standard: tx("Standard", "Standard"),
    sensitive: tx("Sensibles (RGPD)", "Sensitive (GDPR)"),
    high: tx("Très sensibles (santé, finance, IP)", "Highly sensitive (health, finance, IP)"),
  };
  const method: Record<Sensitivity, string> = {
    standard: tx("E1 — NIST 800-88 Clear, certificat par numéro de série", "E1 — NIST 800-88 Clear, certificate per serial number"),
    sensitive: tx("E2 — NIST 800-88 Purge vérifiée, certificat par numéro de série", "E2 — verified NIST 800-88 Purge, certificate per serial number"),
    high: tx("E2 — Purge vérifiée ; supports défectueux en E3 ; preuve P2 ou P3 recommandée", "E2 — verified Purge; faulty media E3; P2 or P3 proof recommended"),
  };
  const proofLabel: Record<Proof, string> = {
    P1: tx("P1 numérique (inclus)", "P1 digital (included)"),
    P2: tx(`P2 témoin GTC (${eur(P2)} / 200 actifs)`, `P2 GTC witness (${eur(P2)} / 200 assets)`),
    P3: tx(`P3 commissaire de justice (${eur(P3)})`, `P3 court officer (${eur(P3)})`),
  };

  const calc = useMemo(() => {
    const e2 = sensitivity !== "standard";
    const lines = CATS.filter((c) => qty[c.id] > 0).map((c) => {
      const line = itadLine(c.line(e2, options.onsite));
      const n = qty[c.id];
      const subtotal = graduatedTotal(n, line.bands) ?? 0;
      return { cat: c, line, n, subtotal, band: BANDS[bandIndex(n)] };
    });
    const units = lines.reduce((s, l) => s + (l.cat.id === "drives" ? 0 : l.n), 0);
    const extras: { label: string; amount: number; note?: string }[] = [];
    if (units > 0 && units < ITAD_FEES.smallLotThreshold)
      extras.push({ label: tx("Frais d'ouverture de lot", "Lot opening fee"), amount: ITAD_FEES.smallLot, note: tx("lot < 50 appareils", "lot < 50 devices") });
    if (options.onsite) extras.push({ label: tx("Effacement sur site (1 jour, 2 techniciens)", "On-site erasure (1 day, 2 technicians)"), amount: ITAD_FEES.onsiteDay, note: tx("par jour ; durée fixée au devis", "per day; duration set in the quote") });
    if (options.onsite && qty.destroy > 0) extras.push({ label: tx("Mobilisation destruction sur site", "On-site destruction mobilisation"), amount: ITAD_FEES.e3Mobilisation });
    if (proof === "P2" && units > 0) {
      extras.push({ label: tx("Preuve P2 — témoin GTC", "P2 proof — GTC witness"), amount: P2 + Math.max(0, units - P2_LOT) * P2_EXTRA });
    }
    if (proof === "P3") extras.push({ label: tx("Preuve P3 — constat par commissaire de justice (≤ 3 h)", "P3 proof — court officer statement (≤ 3 h)"), amount: P3 });
    const oneOff = lines.reduce((s, l) => s + l.subtotal, 0) + extras.reduce((s, x) => s + x.amount, 0);
    const reused = lines.reduce((s, l) => s + (l.cat.reusable ? Math.round(l.n * REUSE) : 0), 0);
    const reusableUnits = lines.reduce((s, l) => s + (l.cat.reusable ? l.n : 0), 0);
    const co2Kg = lines.reduce((s, l) => s + (l.cat.co2 != null ? Math.round(l.n * REUSE) * l.cat.co2 : 0), 0);
    const co2Partial = lines.some((l) => l.cat.reusable && l.cat.co2 == null);
    return { lines, extras, oneOff, units, reused, reusableUnits, co2Kg, co2Partial };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qty, options, sensitivity, proof, lang]);

  const collectionText = tx(
    `Offerte si la valeur de rachat ≥ ${nf.format(COLLECTION_VALUE_RULE.ratio)} × frais, sinon dès ${eur(COLLECTION_FROM)}`,
    `Free if buyback value ≥ ${nf.format(COLLECTION_VALUE_RULE.ratio)} × fees, otherwise from ${eur(COLLECTION_FROM)}`
  );

  const summaryText = useMemo(() => {
    const L: string[] = [tx("Configuration ITAD (prix liste HT)", "ITAD configuration (ex-VAT list prices)")];
    calc.lines.forEach((l) => L.push(`- ${l.line.name[lang]} × ${l.n} → ${eur(l.subtotal)} HT`));
    calc.extras.forEach((x) => L.push(`- ${x.label} → ${eur(x.amount)} HT`));
    L.push(`- ${tx("Âge du parc", "Fleet age")} : ${ageLabel[age]}`);
    L.push(`- ${tx("Sensibilité des données", "Data sensitivity")} : ${sensLabel[sensitivity]}`);
    if (options.pickup) L.push(`- ${tx("Collecte", "Pick-up")} : ${collectionText}`);
    if (options.csrd) L.push(`- ${tx("Carbone et CSRD Essentials", "Carbon & CSRD Essentials")} : ${eur(CSRD)} HT / ${tx("an", "year")}`);
    L.push(`${tx("Total ITAD (une fois)", "ITAD total (one-off)")} : ${eur(calc.oneOff)} HT`);
    return L.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc, age, sensitivity, options, lang]);

  const quoteHref = `/contact?sujet=commercial&config=${encodeURIComponent(summaryText)}`;

  function printSummary() {
    const w = window.open("", "_blank", "width=820,height=900");
    if (!w) return;
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
    const rows =
      calc.lines.map((l) => `<tr><td>${esc(l.line.name[lang])}</td><td style="text-align:right">${l.n}</td><td style="text-align:right">${esc(eur(l.subtotal))}</td></tr>`).join("") +
      calc.extras.map((x) => `<tr><td>${esc(x.label)}</td><td></td><td style="text-align:right">${esc(eur(x.amount))}</td></tr>`).join("");
    w.document.write(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>GreenTechCycle — ${esc(tx("Récapitulatif ITAD", "ITAD summary"))}</title>
<style>body{font-family:system-ui,sans-serif;color:#111;margin:40px;max-width:720px}h1{font-size:20px}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border-bottom:1px solid #ddd;padding:6px 4px;font-size:13px;text-align:left}p,li{font-size:13px;line-height:1.5}.small{color:#555;font-size:12px}</style></head><body>
<h1>GreenTechCycle — ${esc(tx("Récapitulatif de configuration ITAD", "ITAD configuration summary"))}</h1>
<p class="small">${esc(new Date().toLocaleDateString(isEn ? "en-GB" : "fr-FR"))} · ${esc(tx("Prix liste HT, tarification progressive par tranche", "Ex-VAT list prices, graduated by band"))}</p>
<table><thead><tr><th>${esc(tx("Ligne", "Line"))}</th><th style="text-align:right">${esc(tx("Quantité", "Quantity"))}</th><th style="text-align:right">${esc(tx("Prix HT", "Price ex-VAT"))}</th></tr></thead><tbody>${rows}</tbody></table>
<p><strong>${esc(tx("Total ITAD (une fois)", "ITAD total (one-off)"))} :</strong> ${esc(eur(calc.oneOff))} HT</p>
${options.pickup ? `<p>${esc(tx("Collecte", "Pick-up"))} : ${esc(collectionText)}</p>` : ""}
${options.csrd ? `<p>${esc(tx("Carbone et CSRD Essentials", "Carbon & CSRD Essentials"))} : ${esc(eur(CSRD))} HT / ${esc(tx("an", "year"))}</p>` : ""}
<p>${esc(tx("Âge du parc", "Fleet age"))} : ${esc(ageLabel[age])} · ${esc(tx("Sensibilité", "Sensitivity"))} : ${esc(sensLabel[sensitivity])} — ${esc(method[sensitivity])}</p>
<p>${esc(tx("Réemploi estimé", "Estimated reuse"))} : ${calc.reused} ${esc(tx("équipements", "devices"))} (${KPIS.reuse.value} % ${esc(tx("taux moyen 2025", "2025 average rate"))}) · CO₂ ${esc(tx("évité estimé", "avoided (est.)"))} : ${(calc.co2Kg / 1000).toFixed(1)} tCO₂e</p>
<p class="small">${esc(tx("Estimation fondée sur la liste de prix publique et les facteurs ADEME/Boavizta cités sur greentechcycle.fr. Le devis détaillé, remis sous 48 heures ouvrées après un cadrage de 30 minutes, fait foi.", "Estimate based on the public price list and the ADEME/Boavizta factors cited on greentechcycle.fr. The detailed quote, delivered within 48 business hours after a 30-minute scoping call, is binding."))}</p>
</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  const segBtn = (on: boolean) =>
    `min-h-[44px] rounded-lg border px-3 py-2 text-left text-body-sm transition-colors ${on ? "border-emerald bg-emerald-dim text-fg" : "border-track bg-bg text-fg-strong hover:border-track-strong"}`;
  const e2 = sensitivity !== "standard";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ── Paramètres ── */}
      <div className="space-y-8 rounded-2xl border border-track bg-bg-card p-5 sm:p-6 lg:col-span-7">
        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("1 · Mix d'équipements", "1 · Device mix")}</legend>
          <ul className="mt-3 divide-y divide-track rounded-xl border border-track bg-bg">
            {CATS.map((c) => {
              const id = `${idPrefix}-${c.id}`;
              const line = itadLine(c.line(e2, options.onsite));
              const n = qty[c.id];
              const unitNow = line.bands[bandIndex(Math.max(n, 1))]!;
              return (
                <li key={c.id} className="flex flex-wrap items-center gap-3 px-3 py-2.5 sm:flex-nowrap">
                  <label htmlFor={id} className="min-w-0 flex-1 basis-full sm:basis-auto">
                    <span className="block text-body-sm font-medium text-fg">{c.label[lang]}</span>
                    <span className="block text-caption text-fg-muted">
                      {line.level ? `${line.level} · ` : ""}
                      {n > 0
                        ? `${eur(unitNow)} HT ${tx("dans la tranche", "in band")} ${bandLabel(BANDS[bandIndex(n)], lang)}`
                        : `${eur(line.bands[0]!)} → ${eur(line.bands[8]!)} HT / ${line.unit[lang]}`}
                    </span>
                  </label>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setCat(c.id, qty[c.id] - 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-track text-fg-strong hover:text-fg" aria-label={`${tx("Retirer un", "Remove one")} — ${c.label[lang]}`}>
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <input
                      id={id}
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={qty[c.id]}
                      onChange={(e) => setCat(c.id, Number(e.target.value))}
                      className="h-10 w-16 rounded-lg border border-track bg-bg-card px-1 text-center text-body-sm tabular-nums text-fg focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
                    />
                    <button type="button" onClick={() => setCat(c.id, qty[c.id] + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-track text-fg-strong hover:text-fg" aria-label={`${tx("Ajouter un", "Add one")} — ${c.label[lang]}`}>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-caption text-fg-muted">
            {tx(
              "Tarification progressive : chaque tranche de quantité est facturée à son propre prix (1–50, 51–150, 151–250…).",
              "Graduated pricing: each quantity band is billed at its own price (1–50, 51–150, 151–250…)."
            )}
          </p>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("2 · Âge moyen du parc", "2 · Average fleet age")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={tx("Âge moyen du parc", "Average fleet age")}>
            {(Object.keys(ageLabel) as Age[]).map((a) => (
              <button key={a} type="button" role="radio" aria-checked={age === a} onClick={() => setAge(a)} className={segBtn(age === a)}>
                {ageLabel[a]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-caption text-fg-muted">{tx("L'âge oriente la valeur de rachat estimée au devis, pas le prix du service.", "Age drives the buyback value estimated in the quote, not the service price.")}</p>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("3 · Sensibilité des données", "3 · Data sensitivity")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={tx("Sensibilité des données", "Data sensitivity")}>
            {(Object.keys(sensLabel) as Sensitivity[]).map((sv) => (
              <button key={sv} type="button" role="radio" aria-checked={sensitivity === sv} onClick={() => setSensitivity(sv)} className={segBtn(sensitivity === sv)}>
                {sensLabel[sv]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-caption text-fg-muted">{method[sensitivity]}</p>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("4 · Niveau de preuve", "4 · Proof level")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={tx("Niveau de preuve", "Proof level")}>
            {(Object.keys(proofLabel) as Proof[]).map((pv) => (
              <button key={pv} type="button" role="radio" aria-checked={proof === pv} onClick={() => setProof(pv)} className={segBtn(proof === pv)}>
                {proofLabel[pv]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("5 · Options", "5 · Options")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["pickup", tx("Collecte", "Pick-up"), tx(`Offerte si la valeur la finance, sinon dès ${eur(COLLECTION_FROM)}`, `Free if the value covers it, otherwise from ${eur(COLLECTION_FROM)}`)],
                ["onsite", tx("Effacement sur site", "On-site erasure"), `${eur(ITAD_FEES.onsiteDay)} HT / ${tx("jour", "day")}`],
                ["csrd", tx("Carbone et CSRD", "Carbon & CSRD"), `${eur(CSRD)} HT / ${tx("an", "year")}`],
              ] as const
            ).map(([key, label, price]) => (
              <label key={key} className={`flex cursor-pointer items-start gap-3 ${segBtn(options[key])}`}>
                <input
                  type="checkbox"
                  checked={options[key]}
                  onChange={(e) => setOptions((o) => ({ ...o, [key]: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 flex-shrink-0 accent-emerald"
                />
                <span>
                  <span className="block">{label}</span>
                  <span className="block text-caption text-fg-muted">{price}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ── Panneau de résultat (en direct) ── */}
      <aside className="rounded-2xl border border-emerald-line bg-bg-card p-5 sm:p-6 lg:sticky lg:top-24 lg:col-span-5" aria-label={tx("Estimation en direct", "Live estimate")}>
        <p className="text-eyebrow uppercase text-fg-muted">{tx("Estimation en direct", "Live estimate")}</p>
        <div aria-live="polite">
          <table className="mt-3 w-full text-body-sm">
            <caption className="sr-only">{tx("Détail ligne par ligne", "Line-by-line breakdown")}</caption>
            <tbody>
              {calc.lines.length === 0 && (
                <tr>
                  <td className="py-2 text-fg-muted">{tx("Ajoutez des équipements pour commencer.", "Add devices to start.")}</td>
                </tr>
              )}
              {calc.lines.map((l) => (
                <tr key={l.cat.id} className="border-b border-track">
                  <th scope="row" className="py-2 pr-2 text-left font-normal text-fg-strong">
                    {l.line.name[lang]} <span className="text-fg-muted">× {nf.format(l.n)}</span>
                  </th>
                  <td className="py-2 text-right tabular-nums text-fg">{eur(l.subtotal)}</td>
                </tr>
              ))}
              {calc.extras.map((x) => (
                <tr key={x.label} className="border-b border-track">
                  <th scope="row" className="py-2 pr-2 text-left font-normal text-fg-strong">
                    {x.label}
                    {x.note && <span className="block text-caption text-fg-muted">{x.note}</span>}
                  </th>
                  <td className="py-2 text-right tabular-nums text-fg">{eur(x.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="text-caption text-fg-muted">{tx("Total ITAD HT, une fois", "ITAD total ex-VAT, one-off")}</p>
            <p className="font-display text-display-sm tabular-nums text-emerald">{eur(calc.oneOff)}</p>
          </div>
          {(options.pickup || options.csrd) && (
            <dl className="mt-3 space-y-1.5 border-t border-track pt-3 text-caption">
              {options.pickup && (
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-strong">{tx("Collecte", "Pick-up")}</dt>
                  <dd className="text-right text-fg-muted">{collectionText}</dd>
                </div>
              )}
              {options.csrd && (
                <div className="flex justify-between gap-4">
                  <dt className="text-fg-strong">{tx("Carbone et CSRD Essentials", "Carbon & CSRD Essentials")}</dt>
                  <dd className="text-right tabular-nums text-fg">
                    {eur(CSRD)} / {tx("an", "yr")}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-track pt-4">
            <div>
              <dt className="text-caption text-fg-muted">{tx("Réemploi estimé", "Estimated reuse")}</dt>
              <dd className="mt-1 text-heading-md tabular-nums text-fg">
                {nf.format(calc.reused)} <span className="text-caption text-fg-muted">/ {nf.format(calc.reusableUnits)}</span>
              </dd>
            </div>
            <div>
              <dt className="text-caption text-fg-muted">{tx("CO₂ évité estimé", "CO₂ avoided (est.)")}</dt>
              <dd className="mt-1 text-heading-md tabular-nums text-emerald">
                {(calc.co2Kg / 1000).toLocaleString(isEn ? "en-GB" : "fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} tCO₂e
              </dd>
            </div>
          </dl>
          <p className="mt-2 text-caption text-fg-muted">
            {tx(
              `Réemploi au taux moyen constaté (${KPIS.reuse.value} %, 2025). CO₂ : facteurs ADEME/Boavizta cités sur le site${calc.co2Partial ? " ; réseau, stockage, OT/IoT et écrans non estimés" : ""}.`,
              `Reuse at the observed average rate (${KPIS.reuse.value}%, 2025). CO₂: ADEME/Boavizta factors cited on this site${calc.co2Partial ? "; network, storage, OT/IoT and screens not estimated" : ""}.`
            )}
          </p>
        </div>

        <div className="mt-5 border-t border-track pt-4">
          <p className="text-eyebrow uppercase text-fg-muted">{tx("Livrables inclus", "Included deliverables")}</p>
          <ul className="mt-2 space-y-1.5 text-body-sm text-fg-strong">
            <li>· {tx("Certificat d'effacement par actif (SHA-256, vérifiable par QR)", "Per-asset erasure certificate (SHA-256, QR-verifiable)")}</li>
            <li>· {tx("Journal d'audit chaîné et rapport ITAD standard (R1)", "Chained audit log and standard ITAD report (R1)")}</li>
            <li>· {tx("Bilan réemploi / recyclage et carbone", "Reuse / recycling and carbon summary")}</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <ButtonLink href={quoteHref} size="lg" fullWidth>
            {tx("Recevoir un devis", "Get a quote")}
          </ButtonLink>
          <Button variant="secondary" size="lg" fullWidth onClick={printSummary} arrow={false}>
            <FileDown className="h-4 w-4" aria-hidden="true" />
            {tx("Télécharger le récapitulatif (PDF)", "Download the summary (PDF)")}
          </Button>
        </div>
        <p className="mt-4 text-caption italic text-fg-muted">
          {tx(
            "Estimation au prix liste HT. Le devis détaillé, remis sous 48 heures ouvrées, fait foi.",
            "Estimate at ex-VAT list price. The detailed quote, delivered within 48 business hours, is binding."
          )}
        </p>
      </aside>
    </div>
  );
}
