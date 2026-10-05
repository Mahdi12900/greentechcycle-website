"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/**
 * ScrollStory — section scénarisée « comme Apple » (DESIGN.md v2 §8.2, §8.5).
 * lg+ : le texte des étapes défile à gauche, le visuel reste épinglé à droite
 * (sticky) et change d'état (fondu d'opacité) selon l'étape courante.
 * < lg : chaque étape est suivie de son propre visuel (rien d'épinglé).
 * Sans JS : toutes les étapes sont lisibles, le visuel montre l'état 0.
 */
export interface StoryStep {
  id?: string;
  /** Ancres supplémentaires posées sur l'étape (ex. #governance) */
  extraIds?: string[];
  /** id du titre (pour un aria-labelledby externe) */
  titleId?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  body: ReactNode;
}

export default function ScrollStory({
  steps,
  renderVisual,
  headingLevel = 3,
  className = "",
}: {
  steps: StoryStep[];
  renderVisual: (index: number) => ReactNode;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)));
    setActive((prev) => (prev === i ? prev : i));
  });
  const H = `h${headingLevel}` as "h2" | "h3";

  return (
    <div ref={ref} className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${className}`}>
      <ol className="min-w-0">
        {steps.map((s, i) => (
          <li
            key={i}
            id={s.id}
            // Distance de défilement par étape resserrée le 2026-10-05 (70vh → 50vh,
            // reports/espacement-sections-gtc.md) : moins de défilement "mort" entre deux états.
            className={`relative py-10 lg:flex lg:min-h-[50vh] lg:items-center lg:py-0 ${i > 0 ? "border-t border-track lg:border-t-0" : ""}`}
          >
            {(s.extraIds ?? []).map((x) => (
              <span key={x} id={x} className="absolute top-0" aria-hidden="true" />
            ))}
            <div>
              <span
                className={`mb-4 hidden h-0.5 w-10 rounded-full transition-colors duration-500 lg:block ${active === i ? "bg-emerald" : "bg-track"}`}
                aria-hidden="true"
              />
              {s.eyebrow && <p className="text-eyebrow uppercase text-fg-muted">{s.eyebrow}</p>}
              <H id={s.titleId} className="mt-3 max-w-[24ch] text-display-md text-fg">{s.title}</H>
              <div className="mt-4 max-w-[65ch] text-body text-fg-strong">{s.body}</div>
              <div className="mt-8 lg:hidden">{renderVisual(i)}</div>
            </div>
          </li>
        ))}
      </ol>
      <div className="relative hidden lg:block">
        <div className="sticky top-[88px] h-[min(640px,calc(100vh-120px))] will-change-transform">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                active === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={active !== i}
            >
              {renderVisual(i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
