"use client";

import { useLocale } from "next-intl";

/**
 * Tableau de bord « santé du parc / legacy » : âge, statut de support, risque de panne,
 * planification du renouvellement par famille d'actifs IT et OT.
 * Valeurs ILLUSTRATIVES, étiquetées « Exemple » (aucun parc client réel).
 */

type Support = "ok" | "ending" | "out";

export default function LegacyHealthPanel({ className = "" }: { className?: string }) {
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const q = (n: number, y: string) => `${isEn ? "Q" : "T"}${n} ${y}`;

  const rows: { family: string; kind: "IT" | "OT"; age: string; support: Support; risk: number; renewal: string }[] = [
    { family: tx("Postes de travail", "Workstations"), kind: "IT", age: tx("4,1 ans", "4.1 yrs"), support: "ok", risk: 22, renewal: q(3, "2027") },
    { family: tx("Serveurs", "Servers"), kind: "IT", age: tx("6,3 ans", "6.3 yrs"), support: "out", risk: 74, renewal: q(1, "2027") },
    { family: tx("Équipements réseau", "Network equipment"), kind: "IT", age: tx("7,0 ans", "7.0 yrs"), support: "ending", risk: 58, renewal: q(2, "2027") },
    { family: tx("Caméras IP", "IP cameras"), kind: "OT", age: tx("5,4 ans", "5.4 yrs"), support: "ending", risk: 46, renewal: q(4, "2027") },
    { family: tx("Contrôleurs de feux", "Traffic-light controllers"), kind: "OT", age: tx("9,2 ans", "9.2 yrs"), support: "out", risk: 81, renewal: q(1, "2027") },
    { family: tx("Capteurs IoT", "IoT sensors"), kind: "OT", age: tx("2,8 ans", "2.8 yrs"), support: "ok", risk: 14, renewal: "2029" },
  ];

  const supportLabel: Record<Support, string> = {
    ok: tx("En support", "Supported"),
    ending: tx("Fin annoncée", "End announced"),
    out: tx("Hors support", "Out of support"),
  };
  const supportClass: Record<Support, string> = {
    ok: "border border-track text-fg-muted",
    ending: "bg-amber-dim text-amber",
    out: "bg-amber text-bg",
  };
  const riskLabel = (r: number) => (r >= 60 ? tx("Élevé", "High") : r >= 35 ? tx("Moyen", "Medium") : tx("Faible", "Low"));

  // Renouvellements planifiés par trimestre (illustratif)
  const plan = [
    { q: q(1, "27"), v: 92 },
    { q: q(2, "27"), v: 48 },
    { q: q(3, "27"), v: 64 },
    { q: q(4, "27"), v: 36 },
    { q: "2028", v: 28 },
  ];

  return (
    <figure className={`overflow-hidden rounded-2xl border border-track bg-bg-card ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-track px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">GTC.APP / {tx("Santé du parc", "Fleet health")}</p>
        <span className="rounded-full border border-track px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
          {tx("Exemple illustratif", "Illustrative example")}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-caption">
          <caption className="sr-only">
            {tx("Exemple de suivi des familles d'actifs : âge, support, risque de panne, renouvellement", "Example asset-family tracking: age, support, failure risk, renewal")}
          </caption>
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
              <th scope="col" className="px-4 py-2 font-medium">{tx("Famille", "Family")}</th>
              <th scope="col" className="px-2 py-2 font-medium">{tx("Âge moyen", "Avg. age")}</th>
              <th scope="col" className="px-2 py-2 font-medium">Support</th>
              <th scope="col" className="px-2 py-2 font-medium">{tx("Risque de panne", "Failure risk")}</th>
              <th scope="col" className="px-4 py-2 text-right font-medium">{tx("Renouvellement", "Renewal")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.family} className="border-t border-track">
                <th scope="row" className="px-4 py-2.5 text-left font-medium text-fg">
                  <span className="mr-2 rounded border border-track px-1 font-mono text-[10px] text-fg-muted">{r.kind}</span>
                  {r.family}
                </th>
                <td className="px-2 py-2.5 tabular-nums text-fg-strong">{r.age}</td>
                <td className="px-2 py-2.5">
                  <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${supportClass[r.support]}`}>
                    {supportLabel[r.support]}
                  </span>
                </td>
                <td className="px-2 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-bar" aria-hidden="true">
                      <div className={`h-full rounded-full ${r.risk >= 60 ? "bg-amber" : "bg-emerald"}`} style={{ width: `${r.risk}%` }} />
                    </div>
                    <span className="text-fg-strong">{riskLabel(r.risk)}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums text-fg-strong">{r.renewal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-track px-4 py-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{tx("Renouvellements planifiés (actifs)", "Planned renewals (assets)")}</p>
        <div className="mt-3 flex h-20 items-end gap-3" role="img" aria-label={tx("Exemple de planification des renouvellements par trimestre", "Example renewal plan by quarter")}>
          {plan.map((p) => (
            <div key={p.q} className="flex flex-1 flex-col items-center gap-1">
              <span className="font-mono text-[10px] tabular-nums text-fg-strong">{p.v}</span>
              <div className="w-full rounded-t bg-emerald/70" style={{ height: `${(p.v / 92) * 48}px` }} />
              <span className="font-mono text-[10px] text-fg-muted">{p.q}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
