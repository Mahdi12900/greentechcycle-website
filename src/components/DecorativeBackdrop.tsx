import { ReactNode } from "react";

interface DecorativeBackdropProps {
  /** Variant controls colour palette. */
  variant?: "primary" | "secondary" | "neutral";
  /** Whether to show a subtle grid overlay. */
  grid?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable decorative backdrop used on page heroes / section dividers.
 * Provides gradient blobs + optional grid pattern layered absolutely.
 * Wrap in a section with `relative overflow-hidden` to use.
 */
export default function DecorativeBackdrop({
  variant = "primary",
  grid = true,
  className = "",
  children,
}: DecorativeBackdropProps) {
  const palette =
    variant === "secondary"
      ? { blob1: "bg-secondary/20", blob2: "bg-accent/15", radial: "rgba(16,185,129,0.10)" }
      : variant === "neutral"
      ? { blob1: "bg-gray-200/40", blob2: "bg-primary/10", radial: "rgba(13,80,60,0.08)" }
      : { blob1: "bg-accent/15", blob2: "bg-secondary/20", radial: "rgba(16,185,129,0.12)" };

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at top right, ${palette.radial}, transparent 55%)`,
        }}
      />
      <div className={`absolute -top-24 -right-20 w-96 h-96 rounded-full blur-3xl animate-pulse-slow ${palette.blob1}`} />
      <div className={`absolute -bottom-24 -left-20 w-[28rem] h-[28rem] rounded-full blur-3xl animate-pulse-slower ${palette.blob2}`} />
      {grid && (
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="decor-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#decor-grid)" />
        </svg>
      )}
      {children}
    </div>
  );
}
