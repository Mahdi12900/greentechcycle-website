import type { LucideIcon } from "lucide-react";

/**
 * Pastille pictogramme (DESIGN.md §6.5, §7) : Lucide strokeWidth 1.75,
 * 20 px dans 40 px (md) ou 24 px dans 48 px (lg), forest sur leaf-100
 * (leaf-300 sur forest-700 en sombre ; ochre pour les alertes).
 */
export default function Pictogram({
  icon: Icon,
  size = "md",
  tone = "light",
  alert = false,
  className = "",
}: {
  icon: LucideIcon;
  size?: "md" | "lg";
  tone?: "light" | "dark";
  alert?: boolean;
  className?: string;
}) {
  const box = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  const ico = size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const colors = alert
    ? tone === "dark"
      ? "bg-white/10 text-ochre-300"
      : "bg-ochre-100 text-ochre-800"
    : tone === "dark"
      ? "bg-forest-700 text-leaf-300"
      : "bg-leaf-100 text-forest";
  return (
    <span className={`inline-flex flex-shrink-0 items-center justify-center rounded-full ${box} ${colors} ${className}`}>
      <Icon className={ico} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
