"use client";

import { useLocale } from "next-intl";
import KpiTile from "./KpiTile";

/**
 * DashboardMock — tableau de bord ITAD dessiné en code (DESIGN.md v2 §7.2).
 * Remplace les photos « écran / bureau » : 4 tuiles KPI, graphique « IT assets »
 * (barres inactives `bar`, actives `emerald`), radar de risque avec UN point
 * ambre, ligne de flux des certificats, fil d'activité.
 * 3 états : inventory → erasure → reporting (commutés par ScrollStory).
 * Visuel décoratif : aria-hidden + description sr-only.
 */
export type DashboardState = "inventory" | "erasure" | "reporting";

const STATES: DashboardState[] = ["inventory", "erasure", "reporting"];
const BARS = [38, 52, 44, 61, 70, 58, 77, 66, 84, 72, 90, 81];
const ACTIVE: Record<DashboardState, number> = { inventory: 4, erasure: 8, reporting: 12 };

export default function DashboardMock({
  state = "inventory",
  compact = false,
  className = "",
}: {
  state?: DashboardState;
  compact?: boolean;
  className?: string;
}) {
  const isEn = useLocale() === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const tabs: Record<DashboardState, string> = {
    inventory: tx("Inventaire", "Inventory"),
    erasure: tx("Effacement", "Erasure"),
    reporting: tx("Reporting", "Reporting"),
  };
  const kpis: Record<DashboardState, { label: string; value: string; unit?: string; delta?: string }[]> = {
    inventory: [
      { label: tx("Actifs tracés", "Assets tracked"), value: "12 412", delta: "+318" },
      { label: tx("Sites", "Sites"), value: "4" },
      { label: tx("Valeur estimée", "Est. value"), value: "638", unit: "k€" },
      { label: tx("Risque données", "Data risk"), value: "27", unit: "%" },
    ],
    erasure: [
      { label: tx("Certificats émis", "Certificates"), value: "9 806", delta: "+1 204" },
      { label: "NIST 800-88", value: "99,97", unit: "%" },
      { label: tx("Délai certificat", "Cert. delay"), value: "24", unit: "h" },
      { label: tx("Écarts", "Exceptions"), value: "0" },
    ],
    reporting: [
      { label: tx("CO₂e évité", "CO₂e avoided"), value: "1 850", unit: "t" },
      { label: tx("Valeur récupérée", "Value recovered"), value: "638", unit: "k€" },
      { label: "ESRS E5", value: "11/16" },
      { label: tx("Réemploi", "Reuse"), value: "72", unit: "%" },
    ],
  };
  const feed: Record<DashboardState, string[]> = {
    inventory: ["SCAN  LT-0412  Lyon-2  OK", "SCAN  SRV-0093  DC-Nord  OK", "CMDB  sync ServiceNow  ✓"],
    erasure: ["CERT  GTC-ER-04812  Purge  ✓", "CERT  GTC-ER-04813  Clear  ✓", "SHA256  9f2c…e41a"],
    reporting: ["ESRS  E5-5  export XBRL  ✓", "CO2e  scope 3.1  −150 kg/u", "PDF  rapport COMEX  prêt"],
  };
  const active = ACTIVE[state];
  const k = compact ? kpis[state].slice(0, 2) : kpis[state];

  return (
    <div className={`relative flex h-full w-full flex-col gap-3 overflow-hidden bg-bg-card p-4 text-fg sm:p-5 ${className}`}>
      <p className="sr-only">
        {tx(
          `Tableau de bord GreenTechCycle, vue ${tabs[state]} : indicateurs clés, graphique des actifs IT et fil d'activité.`,
          `GreenTechCycle dashboard, ${tabs[state]} view: key indicators, IT assets chart and activity feed.`
        )}
      </p>
      <div aria-hidden="true" className="flex h-full flex-col gap-3">
        {/* Barre d'application */}
        <div className="flex items-center justify-between gap-3 border-b border-track pb-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-emerald shadow-glow-dot" />
            <span className="truncate font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">gtc.app / {tabs[state]}</span>
          </div>
          {!compact && (
            <div className="hidden gap-3 sm:flex">
              {STATES.map((s) => (
                <span
                  key={s}
                  className={`pb-1 font-mono text-[11px] uppercase tracking-[0.08em] ${
                    s === state ? "border-b-2 border-emerald text-fg" : "text-fg-muted"
                  }`}
                >
                  {tabs[s]}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* KPI */}
        <div className={`grid gap-2 ${compact ? "grid-cols-2" : "grid-cols-2 xl:grid-cols-4"}`}>
          {k.map((x, i) => (
            <KpiTile key={x.label} label={x.label} value={x.value} unit={x.unit} delta={x.delta} accent={i === 0} />
          ))}
        </div>

        {/* Graphique + radar */}
        <div className={`grid min-h-0 flex-1 gap-2 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-[1.6fr_1fr]"}`}>
          <div className="flex min-h-[120px] flex-col rounded-xl border border-track bg-bg p-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">IT assets</p>
            <svg viewBox="0 0 240 100" preserveAspectRatio="none" className="viz-grow mt-2 h-full min-h-[80px] w-full flex-1">
              {[25, 50, 75].map((y) => (
                <line key={y} x1="0" x2="240" y1={y} y2={y} className="stroke-track" strokeWidth="0.5" />
              ))}
              {BARS.map((h, i) => (
                <rect
                  key={i}
                  x={i * 20 + 4}
                  y={100 - h}
                  width="12"
                  height={h}
                  rx="2"
                  className={`viz-bar ${i < active ? "fill-emerald" : "fill-bar"}`}
                  style={{ transition: "fill 400ms cubic-bezier(.22,1,.36,1)" }}
                />
              ))}
            </svg>
          </div>
          {!compact && (
            <div className="flex min-h-[120px] flex-col rounded-xl border border-track bg-bg p-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{tx("Risque", "Risk")}</p>
              <svg viewBox="0 0 100 100" className="mx-auto mt-1 h-full max-h-[140px] w-full flex-1">
                {[40, 28, 16].map((r) => (
                  <polygon
                    key={r}
                    points={[0, 1, 2, 3, 4, 5].map((j) => `${50 + r * Math.sin((j * Math.PI) / 3)},${50 - r * Math.cos((j * Math.PI) / 3)}`).join(" ")}
                    className="fill-none stroke-track"
                    strokeWidth="0.75"
                  />
                ))}
                <polygon
                  points={[36, 22, 30, 18, 33, 26].map((r, j) => `${50 + r * Math.sin((j * Math.PI) / 3)},${50 - r * Math.cos((j * Math.PI) / 3)}`).join(" ")}
                  className="fill-emerald-dim stroke-emerald"
                  strokeWidth="1"
                />
                {/* Le seul point ambre de l'écran (§1.1) */}
                <circle cx={50 + 36 * Math.sin(0)} cy={50 - 36} r="2.5" className="fill-amber" />
              </svg>
            </div>
          )}
        </div>

        {/* Flux de certificats + activité */}
        {!compact && (
          <div className="grid gap-2 sm:grid-cols-[1fr_1.2fr]">
            <div className="rounded-xl border border-track bg-bg p-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{tx("Flux certificats", "Certificate flow")}</p>
              <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="mt-2 h-10 w-full">
                <path d="M0 30 C 30 30, 40 10, 70 14 S 120 34, 150 18 S 190 8, 200 10" className="fill-none stroke-track" strokeWidth="1.5" />
                <path
                  d="M0 30 C 30 30, 40 10, 70 14 S 120 34, 150 18 S 190 8, 200 10"
                  pathLength={1}
                  className="draw-on-scroll fill-none stroke-emerald"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <ul className="space-y-1 rounded-xl border border-track bg-bg p-3">
              {feed[state].map((l) => (
                <li key={l} className="truncate font-mono text-[11px] leading-5 text-fg-muted">
                  <span className="text-emerald">›</span> {l}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
