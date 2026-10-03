import type { ReactNode } from "react";

/**
 * KpiTile — tuile KPI autonome (DESIGN.md v2 §7.2) : libellé mono, valeur
 * Geist tabulaire, unité mono, variation optionnelle en émeraude.
 */
export default function KpiTile({
  label,
  value,
  unit,
  delta,
  accent = false,
  className = "",
}: {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  delta?: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={`min-w-0 rounded-xl border border-track bg-bg p-3 ${className}`}>
      <p className="truncate font-mono text-[11px] uppercase leading-4 tracking-[0.08em] text-fg-muted">{label}</p>
      <p className={`mt-2 flex items-baseline gap-1 text-heading-lg tabular-nums ${accent ? "text-emerald" : "text-fg"}`}>
        <span className="truncate">{value}</span>
        {unit && <span className="font-mono text-caption text-fg-muted">{unit}</span>}
      </p>
      {delta && <p className="mt-1 font-mono text-[11px] leading-4 text-emerald">{delta}</p>}
    </div>
  );
}
