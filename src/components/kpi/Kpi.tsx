"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { CountUp } from "@/components/motion";
import { Stat } from "@/components/ui/Stat";
import { KPIS, type Kpi, type KpiId, type Locale } from "@/content/kpis";

/**
 * Blocs KPI animés branchés sur le registre unique `src/content/kpis.ts`.
 * DESIGN.md v2 §8 : la valeur finale est dans le HTML servi ; l'animation
 * (compteur, arc, barre) se joue au défilement et disparaît en mouvement réduit.
 * `data-kpi` / `data-kpi-to-validate` servent au contrôle qualité (non affichés).
 */

function useKpi(id: KpiId): { k: Kpi; lang: Locale } {
  const lang = (useLocale() === "en" ? "en" : "fr") as Locale;
  return { k: KPIS[id], lang };
}

/** Compteur + libellé + source · période (remplace les Stat codés en dur). */
export function KpiStat({
  id,
  accent = false,
  label,
  className = "",
}: {
  id: KpiId;
  accent?: boolean;
  /** Libellé spécifique à l'emplacement (sinon celui du registre) */
  label?: ReactNode;
  className?: string;
}) {
  const { k, lang } = useKpi(id);
  return (
    <div data-kpi={id} data-kpi-to-validate={k.toValidate || undefined} className={className}>
      <Stat
        accent={accent}
        value={<CountUp end={k.value} decimals={k.decimals ?? 0} suffix={k.unit[lang]} />}
        label={label ?? k.label[lang]}
        source={`${k.source[lang]} · ${k.period[lang]}`}
      />
    </div>
  );
}

/**
 * Jauge circulaire pour un pourcentage (0–100). L'arc final est rendu côté
 * serveur ; `.gauge-fill` le fait croître de 0 à sa valeur au défilement.
 */
export function Gauge({
  value,
  display,
  label,
  source,
  size = 132,
}: {
  value: number;
  /** Valeur affichée au centre (compteur) */
  display: ReactNode;
  label: ReactNode;
  source?: ReactNode;
  size?: number;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <figure className="flex flex-col items-start">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="52" pathLength={100} className="fill-none stroke-track" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="52"
            pathLength={100}
            strokeDasharray={`${v} 100`}
            strokeLinecap="round"
            className="gauge-fill fill-none stroke-emerald"
            strokeWidth="8"
            style={{ ["--gauge-v" as string]: v }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-heading-lg text-fg">{display}</span>
      </div>
      <figcaption className="mt-4 max-w-[28ch]">
        <span className="block text-body-sm text-fg-strong">{label}</span>
        {source && <span className="mt-1 block text-caption text-fg-muted">{source}</span>}
      </figcaption>
    </figure>
  );
}

/** Jauge branchée sur un KPI du registre (unité « % »). */
export function KpiGauge({ id, label }: { id: KpiId; label?: ReactNode }) {
  const { k, lang } = useKpi(id);
  return (
    <div data-kpi={id} data-kpi-to-validate={k.toValidate || undefined}>
      <Gauge
        value={k.value}
        display={<CountUp end={k.value} decimals={k.decimals ?? 0} suffix={k.unit[lang]} />}
        label={label ?? k.label[lang]}
        source={`${k.source[lang]} · ${k.period[lang]}`}
      />
    </div>
  );
}

/** Barre de progression horizontale (pourcentage réel, piste `track`). */
export function KpiBar({ value, className = "" }: { value: number; className?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-track ${className}`} aria-hidden="true">
      <div className="bar-fill h-full rounded-full bg-emerald" style={{ width: `${v}%` }} />
    </div>
  );
}
