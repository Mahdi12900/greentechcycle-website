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
}: {
  head: ReactNode[];
  rows: ReactNode[][];
  /** index des colonnes numériques (alignées à droite, tabular-nums) */
  numeric?: number[];
  /** index des colonnes « clé » (ink 600) */
  emphasis?: number[];
  caption?: ReactNode;
  className?: string;
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
    return () => window.removeEventListener("resize", check);
  }, []);

  const align = (i: number) => (numeric.includes(i) ? "text-right tabular-nums" : "text-left");

  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-paper ${className}`}>
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
        }}
        className={`overflow-x-auto ${overflow ? `scroll-hint ${atEnd ? "is-end" : ""}` : ""}`}
        tabIndex={overflow ? 0 : undefined}
        role={overflow ? "region" : undefined}
        aria-label={overflow && typeof caption === "string" ? caption : undefined}
      >
        <table className="w-full border-collapse text-body-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr className="bg-cream">
              {head.map((h, i) => (
                <th key={i} scope="col" className={`whitespace-nowrap px-4 py-3 text-eyebrow uppercase text-muted lg:px-6 ${align(i)}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r} className={`border-t border-line ${r % 2 === 1 ? "bg-leaf-50" : ""}`}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className={`px-4 py-4 font-medium text-ink lg:px-6 ${align(i)}`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className={`px-4 py-4 lg:px-6 ${align(i)} ${emphasis.includes(i) ? "font-semibold text-ink" : "text-ink-700"}`}>
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
