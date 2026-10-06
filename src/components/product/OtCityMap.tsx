"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";

/**
 * Carte de ville codée (SVG) avec couches d'équipements OT activables + panneau de synthèse.
 * Toutes les valeurs sont ILLUSTRATIVES et étiquetées « Exemple » : elles montrent ce que
 * la vue de synthèse restitue, pas un parc réel (aucun client ni chiffre inventé).
 */

type LayerId = "cameras" | "lights" | "antennas" | "sensors";

interface Layer {
  id: LayerId;
  label: { fr: string; en: string };
  /** Total illustratif affiché dans la synthèse */
  total: number;
  /** Part illustrative arrivant en fin de support sous 24 mois */
  endOfSupportShare: number;
  shape: "circle" | "square" | "triangle" | "diamond";
}

const LAYERS: Layer[] = [
  { id: "cameras", label: { fr: "Caméras de vidéoprotection", en: "CCTV cameras" }, total: 1200, endOfSupportShare: 0.22, shape: "circle" },
  { id: "lights", label: { fr: "Contrôleurs de feux tricolores", en: "Traffic-light controllers" }, total: 1800, endOfSupportShare: 0.31, shape: "square" },
  { id: "antennas", label: { fr: "Antennes et équipements télécom", en: "Antennas & telecom equipment" }, total: 400, endOfSupportShare: 0.15, shape: "triangle" },
  { id: "sensors", label: { fr: "Capteurs IoT (air, bruit, trafic)", en: "IoT sensors (air, noise, traffic)" }, total: 3000, endOfSupportShare: 0.12, shape: "diamond" },
];

/** Générateur pseudo-aléatoire déterministe (même rendu serveur/client). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Marker({ shape, x, y, eol }: { shape: Layer["shape"]; x: number; y: number; eol: boolean }) {
  const cls = eol ? "fill-amber" : "fill-emerald";
  switch (shape) {
    case "square":
      return <rect x={x - 2.6} y={y - 2.6} width={5.2} height={5.2} className={cls} />;
    case "triangle":
      return <polygon points={`${x},${y - 3.4} ${x + 3.2},${y + 2.6} ${x - 3.2},${y + 2.6}`} className={cls} />;
    case "diamond":
      return <polygon points={`${x},${y - 3.2} ${x + 3.2},${y} ${x},${y + 3.2} ${x - 3.2},${y}`} className={cls} />;
    default:
      return <circle cx={x} cy={y} r={2.8} className={cls} />;
  }
}

function LegendShape({ shape }: { shape: Layer["shape"] }) {
  return (
    <svg viewBox="0 0 10 10" className="h-3 w-3 flex-shrink-0" aria-hidden="true">
      <Marker shape={shape} x={5} y={5} eol={false} />
    </svg>
  );
}

export default function OtCityMap({ className = "" }: { className?: string }) {
  const lang = useLocale() === "en" ? "en" : "fr";
  const tx = (fr: string, en: string) => (lang === "en" ? en : fr);
  const nf = new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR");
  const [active, setActive] = useState<Record<LayerId, boolean>>({ cameras: true, lights: true, antennas: true, sensors: false });

  // Positions d'échantillon par couche (pas le parc complet : un point ≈ un lot d'équipements)
  const points = useMemo(() => {
    const out: Record<LayerId, { x: number; y: number; eol: boolean }[]> = { cameras: [], lights: [], antennas: [], sensors: [] };
    LAYERS.forEach((layer, li) => {
      const rnd = seeded(17 + li * 101);
      const n = 26;
      for (let i = 0; i < n; i++) {
        // aligne les feux sur les carrefours de la trame, les autres sont libres
        const gx = layer.id === "lights" ? 40 + Math.floor(rnd() * 8) * 45 : 20 + rnd() * 360;
        const gy = layer.id === "lights" ? 30 + Math.floor(rnd() * 5) * 50 : 18 + rnd() * 244;
        out[layer.id].push({ x: gx, y: gy, eol: rnd() < layer.endOfSupportShare });
      }
    });
    return out;
  }, []);

  const visible = LAYERS.filter((l) => active[l.id]);
  const totalVisible = visible.reduce((s, l) => s + l.total, 0);
  const eolVisible = visible.reduce((s, l) => s + Math.round(l.total * l.endOfSupportShare), 0);

  return (
    <figure className={`overflow-hidden rounded-2xl border border-track bg-bg-card ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-track px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">
          GTC.APP / {tx("Parc IT & OT", "IT & OT fleet")}
        </p>
        <span className="rounded-full border border-track px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
          {tx("Exemple illustratif · ville type", "Illustrative example · typical city")}
        </span>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_260px]">
        {/* Carte */}
        <div className="relative border-b border-track p-3 lg:border-b-0 lg:border-r">
          <svg
            viewBox="0 0 400 280"
            className="h-auto w-full"
            role="img"
            aria-label={tx(
              "Carte illustrative d'une ville avec les équipements OT des couches sélectionnées ; en ambre, les équipements en fin de support sous 24 mois.",
              "Illustrative city map showing the OT equipment of the selected layers; amber marks equipment reaching end of support within 24 months."
            )}
          >
            {/* îlots */}
            {Array.from({ length: 8 }).map((_, c) =>
              Array.from({ length: 5 }).map((__, r) => (
                <rect key={`${c}-${r}`} x={c * 45 + 46} y={r * 50 + 36} width={34} height={38} rx={3} className="fill-bg" />
              ))
            )}
            {/* fleuve */}
            <path d="M0 150 C 70 120, 120 190, 200 160 S 330 110, 400 140" className="fill-none stroke-track" strokeWidth={10} strokeLinecap="round" />
            {/* axes principaux */}
            <path d="M0 80 L400 80 M0 230 L400 230 M130 0 L130 280 M265 0 L265 280" className="stroke-bar" strokeWidth={1.2} />
            {visible.map((layer) =>
              points[layer.id].map((p, i) => <Marker key={`${layer.id}-${i}`} shape={layer.shape} x={p.x} y={p.y} eol={p.eol} />)
            )}
          </svg>
          <p className="mt-2 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald" aria-hidden="true" /> {tx("En support", "Supported")}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber" aria-hidden="true" /> {tx("Fin de support < 24 mois", "End of support < 24 months")}
            </span>
          </p>
        </div>

        {/* Couches + synthèse */}
        <div className="flex flex-col p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">{tx("Couches", "Layers")}</p>
          <ul className="mt-2 space-y-1.5">
            {LAYERS.map((layer) => (
              <li key={layer.id}>
                <button
                  type="button"
                  aria-pressed={active[layer.id]}
                  onClick={() => setActive((a) => ({ ...a, [layer.id]: !a[layer.id] }))}
                  className={`flex min-h-[40px] w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-left text-caption transition-colors ${
                    active[layer.id] ? "border-emerald-line bg-emerald-dim text-fg" : "border-track text-fg-muted hover:text-fg"
                  }`}
                >
                  <LegendShape shape={layer.shape} />
                  <span className="flex-1">{layer.label[lang]}</span>
                  <span className="tabular-nums text-fg-strong">{nf.format(layer.total)}</span>
                </button>
              </li>
            ))}
          </ul>
          <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-track pt-4">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{tx("Équipements", "Devices")}</dt>
              <dd className="mt-1 font-display text-heading-lg tabular-nums text-fg">{nf.format(totalVisible)}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-fg-muted">{tx("À anticiper", "To anticipate")}</dt>
              <dd className="mt-1 font-display text-heading-lg tabular-nums text-amber">{nf.format(eolVisible)}</dd>
            </div>
          </dl>
          <p className="mt-2 text-caption text-fg-muted">
            {tx("Fin de support sous 24 mois, sur les couches affichées.", "End of support within 24 months, on the displayed layers.")}
          </p>
        </div>
      </div>
      <figcaption className="sr-only">
        {tx("Exemple illustratif, valeurs fictives.", "Illustrative example, fictitious values.")}
      </figcaption>
    </figure>
  );
}
