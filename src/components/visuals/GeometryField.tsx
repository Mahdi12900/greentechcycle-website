import type { LucideIcon } from "lucide-react";

/**
 * GeometryField — géométrie sombre/émeraude (DESIGN.md v2 §7.2) : grille
 * isométrique `track`, anneaux concentriques, 2–3 segments émeraude, grille
 * de points ; pictogramme optionnel au centre. Dérive lente par parallax CSS
 * (`.parallax-slow`, ≤ 40 px), immobile en mouvement réduit.
 */
export default function GeometryField({
  icon: Icon,
  label,
  className = "",
}: {
  icon?: LucideIcon;
  /** Description pour les lecteurs d'écran (sinon purement décoratif) */
  label?: string;
  className?: string;
}) {
  const iso: string[] = [];
  for (let i = -8; i <= 16; i++) {
    iso.push(`M ${i * 50} 0 L ${i * 50 + 400} 400`);
    iso.push(`M ${i * 50} 400 L ${i * 50 + 400} 0`);
  }
  return (
    <div className={`relative h-full w-full overflow-hidden bg-bg-card ${className}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <div className="fx-dots pointer-events-none absolute inset-0" />
      <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" className="parallax-slow absolute inset-0 h-full w-full">
        <path d={iso.join(" ")} className="fill-none stroke-track" strokeWidth="0.6" opacity="0.6" />
        {[60, 105, 150, 195].map((r) => (
          <circle key={r} cx="200" cy="200" r={r} className="fill-none stroke-track" strokeWidth="1" />
        ))}
        <path d="M 200 50 A 150 150 0 0 1 341 151" pathLength={1} className="draw-on-scroll fill-none stroke-emerald" strokeWidth="2" strokeLinecap="round" />
        <path d="M 95 305 A 150 150 0 0 1 60 200" className="fill-none stroke-emerald" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        <path d="M 290 287 A 105 105 0 0 1 200 305" className="fill-none stroke-emerald-line" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="341" cy="151" r="3.5" className="fill-emerald" />
      </svg>
      <div className="fx-vignette pointer-events-none absolute inset-0" />
      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-line bg-bg-card text-emerald shadow-glow-dot">
            <Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
      )}
    </div>
  );
}
