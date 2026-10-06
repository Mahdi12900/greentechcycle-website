"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { FileDown, Minus, Plus } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { KPIS } from "@/content/kpis";
import { ITAD_TIERS } from "@/content/pricing";

/**
 * Configurateur ITAD (refonte v4) — remplace le « calculateur express ».
 *
 * Aucun prix ni facteur inventé :
 * - prix publics src/content/pricing.ts : 19 € HT/poste (fixe ou portable), 55 € HT/unité
 *   (serveur, baie, équipement complexe) ; Reporting CSRD ESRS E5 990 € HT/an (/tarifs) ;
 *   tout le reste (smartphones, OT/IoT, collecte, effacement sur site) : « sur devis » ;
 * - CO₂ évité par équipement réemployé : 150 kgCO₂e/poste (accueil) ; serveur 1 350 et
 *   smartphone 51 kgCO₂e (facteurs ADEME/Boavizta affichés dans le simulateur /impact) ;
 *   réseau, stockage, OT/IoT non estimés ;
 * - réemploi : taux moyen validé src/content/kpis.ts (73 %).
 */

type CatId = "desktops" | "laptops" | "servers" | "network" | "storage" | "ot" | "smartphones";
type Age = "lt3" | "3to5" | "gt5";
type Sensitivity = "standard" | "sensitive" | "high";

const POSTE = ITAD_TIERS.find((t) => t.id === "poste")?.amount ?? 19;
const COMPLEX = ITAD_TIERS.find((t) => t.id === "complexe")?.amount ?? 55;
const CSRD_REPORTING = 990;
const REUSE = KPIS.reuse.value / 100;

interface Cat {
  id: CatId;
  label: { fr: string; en: string };
  /** Prix unitaire public « à partir de », ou null = sur devis */
  unit: number | null;
  /** kgCO₂e évités par équipement réemployé, ou null = non estimé */
  co2: number | null;
}

const CATS: Cat[] = [
  { id: "desktops", label: { fr: "Postes fixes", en: "Desktops" }, unit: POSTE, co2: 150 },
  { id: "laptops", label: { fr: "Portables", en: "Laptops" }, unit: POSTE, co2: 150 },
  { id: "servers", label: { fr: "Serveurs", en: "Servers" }, unit: COMPLEX, co2: 1350 },
  { id: "network", label: { fr: "Équipements réseau", en: "Network equipment" }, unit: COMPLEX, co2: null },
  { id: "storage", label: { fr: "Baies de stockage", en: "Storage arrays" }, unit: COMPLEX, co2: null },
  { id: "ot", label: { fr: "Équipements OT / IoT", en: "OT / IoT devices" }, unit: null, co2: null },
  { id: "smartphones", label: { fr: "Smartphones et tablettes", en: "Smartphones and tablets" }, unit: null, co2: 51 },
];

export default function ItadConfigurator({ idPrefix = "cfg" }: { idPrefix?: string }) {
  const lang = useLocale() === "en" ? "en" : "fr";
  const isEn = lang === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const nf = new Intl.NumberFormat(isEn ? "en-GB" : "fr-FR");
  const eur = (n: number) => (isEn ? `€${nf.format(n)}` : `${nf.format(n)} €`);

  // Exemple pré-rempli : le résultat et les CTA sont visibles dès l'arrivée
  const [qty, setQty] = useState<Record<CatId, number>>({
    desktops: 60,
    laptops: 40,
    servers: 4,
    network: 0,
    storage: 0,
    ot: 0,
    smartphones: 0,
  });
  const [age, setAge] = useState<Age>("3to5");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("sensitive");
  const [options, setOptions] = useState({ pickup: true, onsite: false, csrd: false });

  const setCat = (id: CatId, v: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(100000, Math.round(v) || 0)) }));

  const ageLabel: Record<Age, string> = { lt3: tx("Moins de 3 ans", "Under 3 years"), "3to5": tx("3 à 5 ans", "3 to 5 years"), gt5: tx("Plus de 5 ans", "Over 5 years") };
  const sensLabel: Record<Sensitivity, string> = {
    standard: tx("Standard", "Standard"),
    sensitive: tx("Sensibles (RGPD)", "Sensitive (GDPR)"),
    high: tx("Très sensibles (santé, défense, IP)", "Highly sensitive (health, defence, IP)"),
  };
  const method: Record<Sensitivity, string> = {
    standard: tx("Effacement NIST 800-88 (Clear), certificat par actif", "NIST 800-88 (Clear) erasure, per-asset certificate"),
    sensitive: tx("Effacement NIST 800-88 (Purge), certificat par actif", "NIST 800-88 (Purge) erasure, per-asset certificate"),
    high: tx("Purge avec vérification renforcée ; destruction physique sur devis", "Purge with enhanced verification; physical destruction on quote"),
  };

  const calc = useMemo(() => {
    const lines = CATS.filter((c) => qty[c.id] > 0).map((c) => ({
      cat: c,
      n: qty[c.id],
      subtotal: c.unit != null ? c.unit * qty[c.id] : null,
    }));
    const priced = lines.reduce((s, l) => s + (l.subtotal ?? 0), 0) + (options.csrd ? CSRD_REPORTING : 0);
    const onQuote = lines.some((l) => l.subtotal == null) || options.pickup || options.onsite || sensitivity === "high";
    const units = lines.reduce((s, l) => s + l.n, 0);
    const reused = lines.reduce((s, l) => s + Math.round(l.n * REUSE), 0);
    const co2Kg = lines.reduce((s, l) => s + (l.cat.co2 != null ? Math.round(l.n * REUSE) * l.cat.co2 : 0), 0);
    const co2Partial = lines.some((l) => l.cat.co2 == null);
    return { lines, priced, onQuote, units, reused, co2Kg, co2Partial };
  }, [qty, options, sensitivity]);

  const onQuoteLabel = tx("Sur devis", "On quote");

  const summaryText = useMemo(() => {
    const L: string[] = [tx("Configuration ITAD (estimation indicative)", "ITAD configuration (indicative estimate)")];
    calc.lines.forEach((l) => L.push(`- ${l.cat.label[lang]} : ${l.n}${l.subtotal != null ? ` → ${tx("dès", "from")} ${eur(l.subtotal)} HT` : ` → ${onQuoteLabel}`}`));
    L.push(`- ${tx("Âge du parc", "Fleet age")} : ${ageLabel[age]}`);
    L.push(`- ${tx("Sensibilité des données", "Data sensitivity")} : ${sensLabel[sensitivity]}`);
    const opts = [
      options.pickup && tx("collecte", "pick-up"),
      options.onsite && tx("effacement sur site", "on-site erasure"),
      options.csrd && tx("reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"),
    ].filter(Boolean);
    if (opts.length) L.push(`- Options : ${opts.join(", ")}`);
    L.push(`${tx("Total indicatif", "Indicative total")} : ${tx("à partir de", "from")} ${eur(calc.priced)} HT${calc.onQuote ? ` + ${tx("éléments sur devis", "items on quote")}` : ""}`);
    return L.join("\n");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calc, age, sensitivity, options, lang]);

  const quoteHref = `/contact?sujet=commercial&config=${encodeURIComponent(summaryText)}`;

  function printSummary() {
    const w = window.open("", "_blank", "width=820,height=900");
    if (!w) return;
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
    const rows = calc.lines
      .map((l) => `<tr><td>${esc(l.cat.label[lang])}</td><td style="text-align:right">${l.n}</td><td style="text-align:right">${l.subtotal != null ? `${esc(tx("dès", "from"))} ${esc(eur(l.subtotal))}` : esc(onQuoteLabel)}</td></tr>`)
      .join("");
    w.document.write(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>GreenTechCycle — ${esc(tx("Récapitulatif ITAD", "ITAD summary"))}</title>
<style>body{font-family:system-ui,sans-serif;color:#111;margin:40px;max-width:720px}h1{font-size:20px}table{width:100%;border-collapse:collapse;margin:16px 0}td,th{border-bottom:1px solid #ddd;padding:6px 4px;font-size:13px;text-align:left}p,li{font-size:13px;line-height:1.5}.small{color:#555;font-size:12px}</style></head><body>
<h1>GreenTechCycle — ${esc(tx("Récapitulatif de configuration ITAD", "ITAD configuration summary"))}</h1>
<p class="small">${esc(new Date().toLocaleDateString(isEn ? "en-GB" : "fr-FR"))} · ${esc(tx("Estimation indicative, prix HT", "Indicative estimate, prices ex-VAT"))}</p>
<table><thead><tr><th>${esc(tx("Catégorie", "Category"))}</th><th style="text-align:right">${esc(tx("Quantité", "Quantity"))}</th><th style="text-align:right">${esc(tx("Prix indicatif", "Indicative price"))}</th></tr></thead><tbody>${rows}${options.csrd ? `<tr><td>${esc(tx("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"))}</td><td></td><td style="text-align:right">${esc(eur(CSRD_REPORTING))} / ${esc(tx("an", "year"))}</td></tr>` : ""}</tbody></table>
<p><strong>${esc(tx("Total indicatif", "Indicative total"))} :</strong> ${esc(tx("à partir de", "from"))} ${esc(eur(calc.priced))} HT${calc.onQuote ? ` + ${esc(tx("éléments sur devis", "items on quote"))}` : ""}</p>
<p>${esc(tx("Âge du parc", "Fleet age"))} : ${esc(ageLabel[age])} · ${esc(tx("Sensibilité", "Sensitivity"))} : ${esc(sensLabel[sensitivity])} — ${esc(method[sensitivity])}</p>
<p>${esc(tx("Réemploi estimé", "Estimated reuse"))} : ${calc.reused} ${esc(tx("équipements", "devices"))} (${KPIS.reuse.value} % ${esc(tx("taux moyen 2025", "2025 average rate"))}) · CO₂ ${esc(tx("évité estimé", "avoided (est.)"))} : ${(calc.co2Kg / 1000).toFixed(1)} tCO₂e</p>
<p class="small">${esc(tx("Estimation indicative fondée sur les prix publics et les facteurs ADEME/Boavizta cités sur greentechcycle.fr. Le devis détaillé, remis sous 48 heures ouvrées après un cadrage de 30 minutes, fait foi.", "Indicative estimate based on public prices and the ADEME/Boavizta factors cited on greentechcycle.fr. The detailed quote, delivered within 48 business hours after a 30-minute scoping call, is binding."))}</p>
</body></html>`);
    w.document.close();
    w.focus();
    w.print();
  }

  const segBtn = (on: boolean) =>
    `min-h-[44px] rounded-lg border px-3 py-2 text-left text-body-sm transition-colors ${on ? "border-emerald bg-emerald-dim text-fg" : "border-track bg-bg text-fg-strong hover:border-track-strong"}`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
      {/* ── Paramètres ── */}
      <div className="space-y-8 rounded-2xl border border-track bg-bg-card p-5 sm:p-6 lg:col-span-7">
        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("1 · Mix d'équipements", "1 · Device mix")}</legend>
          <ul className="mt-3 divide-y divide-track rounded-xl border border-track bg-bg">
            {CATS.map((c) => {
              const id = `${idPrefix}-${c.id}`;
              return (
                <li key={c.id} className="flex flex-wrap items-center gap-3 px-3 py-2.5 sm:flex-nowrap">
                  <label htmlFor={id} className="min-w-0 flex-1">
                    <span className="block text-body-sm font-medium text-fg">{c.label[lang]}</span>
                    <span className="block text-caption text-fg-muted">
                      {c.unit != null ? `${tx("dès", "from")} ${eur(c.unit)} HT / ${tx("unité", "unit")}` : onQuoteLabel}
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
                      className="h-10 w-20 rounded-lg border border-track bg-bg-card px-2 text-center text-body-sm tabular-nums text-fg focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25"
                    />
                    <button type="button" onClick={() => setCat(c.id, qty[c.id] + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-track text-fg-strong hover:text-fg" aria-label={`${tx("Ajouter un", "Add one")} — ${c.label[lang]}`}>
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
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
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("3 · Sensibilité des données", "3 · Data sensitivity")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3" role="radiogroup" aria-label={tx("Sensibilité des données", "Data sensitivity")}>
            {(Object.keys(sensLabel) as Sensitivity[]).map((s) => (
              <button key={s} type="button" role="radio" aria-checked={sensitivity === s} onClick={() => setSensitivity(s)} className={segBtn(sensitivity === s)}>
                {sensLabel[s]}
              </button>
            ))}
          </div>
          <p className="mt-2 text-caption text-fg-muted">{method[sensitivity]}</p>
        </fieldset>

        <fieldset>
          <legend className="text-eyebrow uppercase text-fg-muted">{tx("4 · Options", "4 · Options")}</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["pickup", tx("Collecte sécurisée", "Secure pick-up"), onQuoteLabel],
                ["onsite", tx("Effacement sur site", "On-site erasure"), onQuoteLabel],
                ["csrd", tx("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"), `${eur(CSRD_REPORTING)} HT / ${tx("an", "year")}`],
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
                    {l.cat.label[lang]} <span className="text-fg-muted">× {nf.format(l.n)}</span>
                  </th>
                  <td className="py-2 text-right tabular-nums text-fg">{l.subtotal != null ? eur(l.subtotal) : <span className="text-fg-muted">{onQuoteLabel}</span>}</td>
                </tr>
              ))}
              {options.pickup && (
                <tr className="border-b border-track">
                  <th scope="row" className="py-2 text-left font-normal text-fg-strong">{tx("Collecte sécurisée", "Secure pick-up")}</th>
                  <td className="py-2 text-right text-fg-muted">{onQuoteLabel}</td>
                </tr>
              )}
              {options.onsite && (
                <tr className="border-b border-track">
                  <th scope="row" className="py-2 text-left font-normal text-fg-strong">{tx("Effacement sur site", "On-site erasure")}</th>
                  <td className="py-2 text-right text-fg-muted">{onQuoteLabel}</td>
                </tr>
              )}
              {options.csrd && (
                <tr className="border-b border-track">
                  <th scope="row" className="py-2 text-left font-normal text-fg-strong">{tx("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting")}</th>
                  <td className="py-2 text-right tabular-nums text-fg">{eur(CSRD_REPORTING)} / {tx("an", "yr")}</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="text-caption text-fg-muted">
              {tx("Total indicatif HT", "Indicative total ex-VAT")}
              {calc.onQuote && <span className="block">{tx("+ éléments sur devis", "+ items on quote")}</span>}
            </p>
            <p className="font-display text-display-sm tabular-nums text-emerald">
              <span className="mr-1 font-sans text-caption text-fg-muted">{tx("dès", "from")}</span>
              {eur(calc.priced)}
            </p>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-track pt-4">
            <div>
              <dt className="text-caption text-fg-muted">{tx("Réemploi estimé", "Estimated reuse")}</dt>
              <dd className="mt-1 text-heading-md tabular-nums text-fg">
                {nf.format(calc.reused)} <span className="text-caption text-fg-muted">/ {nf.format(calc.units)}</span>
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
              `Réemploi au taux moyen constaté (${KPIS.reuse.value} %, 2025). CO₂ : facteurs ADEME/Boavizta cités sur le site${calc.co2Partial ? " ; réseau, stockage et OT/IoT non estimés" : ""}.`,
              `Reuse at the observed average rate (${KPIS.reuse.value}%, 2025). CO₂: ADEME/Boavizta factors cited on this site${calc.co2Partial ? "; network, storage and OT/IoT not estimated" : ""}.`
            )}
          </p>
        </div>

        <div className="mt-5 border-t border-track pt-4">
          <p className="text-eyebrow uppercase text-fg-muted">{tx("Déroulé", "Timeline")}</p>
          <ol className="mt-2 space-y-1.5 text-body-sm text-fg-strong">
            <li><span className="text-emerald">01</span> {tx("Cadrage de 30 min → devis détaillé sous 48 h ouvrées", "30-min scoping → detailed quote within 48 business hours")}</li>
            <li><span className="text-emerald">02</span> {tx("Audit flash du parc : 72 h", "Flash fleet audit: 72h")}</li>
            <li><span className="text-emerald">03</span> {tx("Intervention planifiée selon volumes et sites", "Intervention scheduled by volume and sites")}</li>
          </ol>
          <p className="mt-4 text-eyebrow uppercase text-fg-muted">{tx("Livrables", "Deliverables")}</p>
          <ul className="mt-2 space-y-1.5 text-body-sm text-fg-strong">
            <li>· {tx("Certificat d'effacement par actif (SHA-256, vérifiable par QR)", "Per-asset erasure certificate (SHA-256, QR-verifiable)")}</li>
            <li>· {tx("Journal d'audit chaîné et bordereaux de suivi DEEE", "Chained audit log and WEEE tracking slips")}</li>
            <li>· {tx("Bilan réemploi / recyclage et carbone", "Reuse / recycling and carbon summary")}{options.csrd ? tx(" + reporting ESRS E5", " + ESRS E5 reporting") : ""}</li>
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
            "Estimation indicative fondée sur nos prix publics HT. Le devis détaillé fait foi.",
            "Indicative estimate based on our public ex-VAT prices. The detailed quote is binding."
          )}
        </p>
      </aside>
    </div>
  );
}
