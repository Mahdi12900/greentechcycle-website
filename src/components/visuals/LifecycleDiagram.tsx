"use client";

import { useLocale } from "next-intl";
import { Truck, ShieldCheck, RefreshCcw, Recycle, type LucideIcon } from "lucide-react";

/**
 * LifecycleDiagram — boucle « Cycle » à 4 nœuds (DESIGN.md v2 §7.2) :
 * Collecte → Effacement → Reconditionnement → Recyclage. Piste `track`,
 * trait émeraude dessiné au défilement (`.draw-on-scroll`, CSS scroll-driven),
 * nœud `active` mis en lumière (glow-dot). Sans support CSS : trait complet.
 */
export default function LifecycleDiagram({
  active,
  className = "",
}: {
  /** 0 Collecte · 1 Effacement · 2 Reconditionnement · 3 Recyclage */
  active?: number;
  className?: string;
}) {
  const isEn = useLocale() === "en";
  // Nœuds posés sur l'anneau (rayon ≈ 36 % du cadre) : haut, droite, bas, gauche
  const nodes: { icon: LucideIcon; label: string; left: string; top: string }[] = [
    { icon: Truck, label: isEn ? "Collection" : "Collecte", left: "50%", top: "14%" },
    { icon: ShieldCheck, label: isEn ? "Erasure" : "Effacement", left: "86%", top: "50%" },
    { icon: RefreshCcw, label: isEn ? "Refurbishment" : "Reconditionnement", left: "50%", top: "86%" },
    { icon: Recycle, label: isEn ? "Recycling" : "Recyclage", left: "14%", top: "50%" },
  ];

  return (
    <div className={`relative flex h-full w-full items-center justify-center bg-bg-card p-6 ${className}`}>
      <div className="fx-dots fx-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <p className="sr-only">
        {isEn
          ? "Asset lifecycle loop: collection, erasure, refurbishment, recycling."
          : "Boucle du cycle de vie des actifs : collecte, effacement, reconditionnement, recyclage."}
      </p>
      <div aria-hidden="true" className="relative aspect-square w-full max-w-[420px]">
        <svg viewBox="0 0 400 400" className="absolute inset-[12%] h-[76%] w-[76%]">
          <circle cx="200" cy="200" r="190" className="fill-none stroke-track" strokeWidth="2" />
          <circle
            cx="200"
            cy="200"
            r="190"
            pathLength={1}
            transform="rotate(-90 200 200)"
            className="draw-on-scroll fill-none stroke-emerald"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="200" cy="200" r="120" className="fill-none stroke-track" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-fg-muted">GreenTech</span>
          <span className="text-display-sm text-emerald">Cycle</span>
        </div>
        {nodes.map((n, i) => {
          const on = active === i;
          return (
            <div
              key={n.label}
              className="absolute flex -translate-x-1/2 -translate-y-6 flex-col items-center gap-2"
              style={{ left: n.left, top: n.top }}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full border bg-bg-card ${
                  on ? "border-emerald text-emerald shadow-glow-dot" : "border-track text-emerald"
                }`}
              >
                <n.icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <span className={`whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] ${on ? "text-fg" : "text-fg-muted"}`}>
                {n.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
