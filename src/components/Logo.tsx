/**
 * Logo — marque GreenTechCycle en vectoriel inline (DESIGN.md v2 §1, §7.4).
 * Boucle orbitale en émeraude + mot-symbole Geist « GreenTech » (fg) et
 * « Cycle » (emerald). Remplace `logo-mono-white.svg` (680×140) qui devenait
 * illisible à 28 px. À remplacer par le SVG officiel « boucle émeraude »
 * quand le client le fournira.
 */
export default function Logo({
  className = "",
  size = "md",
  markOnly = false,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Symbole seul (barre de section, 404) */
  markOnly?: boolean;
}) {
  const mark =
    size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const word = size === "lg" ? "text-[22px]" : "text-[19px]";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="-64 -64 128 128"
        className={`${mark} flex-shrink-0 text-emerald`}
        aria-hidden="true"
      >
        {[0, 60, -60].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <ellipse
              rx="54"
              ry="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle cx="54" r="7" fill="currentColor" />
          </g>
        ))}
        <circle r="13" className="fill-fg" />
      </svg>
      {!markOnly && (
        <span
          className={`${word} font-semibold leading-none tracking-[-0.03em] text-fg`}
        >
          GreenTech<span className="text-emerald">Cycle</span>
        </span>
      )}
    </span>
  );
}
