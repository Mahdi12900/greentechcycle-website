"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

/**
 * Mouvement v2 — DESIGN.md v2 §8.
 * Les entrées de contenu sont en CSS (`.reveal`, `.reveal-stagger`,
 * `.reveal-scale`, `.parallax-*` dans globals.css) : aucun `opacity: 0` dans
 * le HTML servi. Ce module ne garde que le compteur animé.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function formatNumber(v: number, decimals: number, lang: string) {
  return v.toLocaleString(lang === "en" ? "en-GB" : "fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * CountUp — la valeur finale est rendue côté serveur, formatée selon la langue
 * (lisible sans JS et par les robots). Côté client, si le compteur est encore hors écran au montage,
 * il repart de 0 et s'anime (1,6 s) à son entrée dans le viewport.
 * Mouvement réduit : valeur finale, sans animation.
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
  const lang = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState<string>(() => formatNumber(end, decimals, lang));
  const armed = useRef(false);

  // Au montage : formatage localisé ; si l'élément est sous la ligne de
  // flottaison, on « arme » le compteur (repart de 0) pour l'animer à l'entrée.
  useEffect(() => {
    setDisplay(formatNumber(end, decimals, lang));
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      armed.current = true;
      setDisplay(formatNumber(0, decimals, lang));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || !armed.current || reduce) return;
    armed.current = false;
    const controls = animate(0, end, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(formatNumber(v, decimals, lang)),
    });
    return () => controls.stop();
  }, [inView, end, duration, decimals, reduce, lang]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
