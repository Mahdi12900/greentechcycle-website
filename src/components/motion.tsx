"use client";

import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";

/* Mouvement calmé — DESIGN.md §8 : y 12 px, 0.45 s, une seule fois, -40 px.
   prefers-reduced-motion : aucune animation (contenu affiché tel quel). */
const EASE = [0.22, 1, 0.36, 1] as const;
const OFFSET = 12;

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  // Même balisage serveur/client (pas de mismatch d'hydratation) ; en mouvement
  // réduit, la transition est instantanée.
  const reduce = useReducedMotion();
  const directions = {
    up: { y: OFFSET, x: 0 },
    down: { y: -OFFSET, x: 0 },
    left: { x: OFFSET, y: 0 },
    right: { x: -OFFSET, y: 0 },
    none: { x: 0, y: 0 },
  };
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.06,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduce ? 0 : staggerDelay } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: OFFSET },
        visible: { opacity: 1, y: 0, transition: reduce ? { duration: 0 } : { duration: 0.45, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * CountUp — anime un nombre de 0 à `end` à l'entrée dans le viewport (1.6 s).
 * Sans mouvement réduit : valeur finale affichée directement.
 */
export function CountUp({
  end,
  duration = 1.6,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  // Séparateur de milliers selon la langue du document (fr : espace fine, en : virgule).
  const format = (v: number) => {
    const lang = typeof document !== "undefined" ? document.documentElement.lang || "fr" : "fr";
    return v.toLocaleString(lang === "en" ? "en-GB" : "fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };
  const rounded = useTransform(count, format);
  const [display, setDisplay] = useState<string>(format(0));

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(format(end));
      return;
    }
    const controls = animate(count, end, { duration, ease: EASE });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, end, duration, count, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Ancien « ScaleIn » : désormais un simple fondu (pas de scale — §8). */
export function ScaleIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <FadeIn delay={delay} direction="none" className={className}>
      {children}
    </FadeIn>
  );
}
