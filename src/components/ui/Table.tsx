"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Tableau (DESIGN.md §6.13) : filets `line`, en-tête cream en eyebrow, zebra
 * leaf-50, colonnes numériques tabulaires alignées à droite. Mobile :
 * défilement horizontal avec masque d'indice (comme §6.9).
 */
export default function Table({
  head,
  rows,
  numeric = [],
  emphasis = [],
  caption,
  className = "",
  sticky = false,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  /** index des colonnes numériques (alignées à droite, tabular-nums) */
  numeric?: number[];
  /** index des colonnes « clé » (ink 600) */
  emphasis?: number[];
  caption?: ReactNode;
  className?: string;
  /** En-tête collant au scroll sur desktop (défilement horizontal réservé au mobile, bug fix §2) */
  sticky?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      setOverflow(el.scrollWidth > el.clientWidth + 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    check();
    window.addEventListener("resize", check);
    // Un tableau monté dans un onglet masqué mesure 0 : on remesure quand il devient visible.
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(check) : null;
    ro?.observe(el);
    return () => {
      window.removeEventListener("resize", check);
      ro?.disconnect();
    };
  }, []);

  const align = (i: number) => (numeric.includes(i) ? "text-right tabular-nums" : "text-left");

  return (
    <div className={`overflow-hidden rounded-xl border border-track bg-bg ${className}`}>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
        }}
        className={`relative overflow-x-auto ${sticky ? "md:overflow-visible" : ""} ${overflow ? `scroll-hint ${atEnd ? "is-end" : ""}` : ""}`}
        tabIndex={overflow ? 0 : undefined}
        role={overflow ? "region" : undefined}
        aria-label={overflow && typeof caption === "string" ? `${caption} (tableau défilant)` : undefined}
      >
        <table className="w-full border-collapse text-body-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className={sticky ? "sticky top-16 z-10 xl:top-[72px]" : undefined}>
            <tr className="bg-bg-card">
              {head.map((h, i) => (
                <th key={i} scope="col" className={`whitespace-nowrap px-4 py-3 text-eyebrow uppercase text-fg-muted lg:px-6 ${align(i)}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className={`border-t border-track ${r % 2 === 1 ? "bg-white/[0.02]" : ""}`}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className={`px-4 py-4 font-medium text-fg lg:px-6 ${align(i)}`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className={`px-4 py-4 lg:px-6 ${align(i)} ${emphasis.includes(i) ? "font-semibold text-emerald" : "text-fg-strong"}`}>
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
