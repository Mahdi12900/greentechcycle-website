import type { ReactNode } from "react";

/**
 * Stat / KPI (DESIGN.md §6.17) : valeur en Fraunces `stat` (tabulaire),
 * libellé body-sm, source en légende. Rangée 2 → 4 colonnes à filets.
 */
export function Stat({
  value,
  label,
  source,
  tone = "light",
  accent = false,
  className = "",
}: {
  value: ReactNode;
  label: ReactNode;
  source?: ReactNode;
  tone?: "light" | "dark";
  accent?: boolean;
  className?: string;
}) {
  void tone;
  const valueColor = accent ? "text-emerald" : "text-fg";
  return (
    <div className={className}>
      <p className={`text-stat ${valueColor}`}>{value}</p>
      <p className={`mt-3 text-body-sm text-fg-muted`}>{label}</p>
      {source && <p className={`mt-1 text-caption text-fg-muted`}>{source}</p>}
    </div>
  );
}

export function StatRow({
  children,
  tone = "light",
  cols = 4,
  className = "",
}: {
  children: ReactNode[];
  tone?: "light" | "dark";
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const grid = { 2: "grid-cols-2", 3: "grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }[cols];
  void tone;
  const line = "border-track";
  return (
    <div className={`grid gap-y-8 ${grid} ${className}`}>
      {children.map((child, i) => (
        <div key={i} className={`px-4 first:pl-0 lg:px-6 ${i % 2 === 1 ? `border-l ${line}` : ""} ${i % cols !== 0 ? `lg:border-l ${line}` : "lg:border-l-0 lg:pl-0"}`}>
          {child}
        </div>
      ))}
    </div>
  );
}
