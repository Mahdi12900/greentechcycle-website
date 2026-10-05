import type { ReactNode } from "react";

/** Tags / chips (DESIGN.md §6.15). Pas d'emoji, pas de Sparkles. */
export type TagVariant = "neutral" | "brand" | "alert" | "dark";

const VARIANTS: Record<TagVariant, string> = {
  neutral: "border border-track bg-bg-card text-fg-muted",
  brand: "bg-emerald-dim text-emerald",
  alert: "bg-amber-dim text-amber",
  dark: "border border-track bg-bg-card text-fg",
};

export default function Tag({
  children,
  variant = "neutral",
  className = "",
  icon,
}: {
  children: ReactNode;
  variant?: TagVariant;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <span className={`inline-flex min-h-[28px] items-center gap-2 rounded-full px-3 py-1 text-caption font-semibold ${VARIANTS[variant]} ${className}`}>
      {icon}
      {children}
    </span>
  );
}
