"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Accordéon (DESIGN.md §6.14) : liste `divide-y line`, sans cartes ;
 * un seul panneau ouvert à la fois (le premier par défaut).
 */
export interface AccordionItem {
  question: ReactNode;
  answer: ReactNode;
  id?: string;
}

export default function Accordion({
  items,
  defaultOpen = 0,
  tone = "light",
  headingLevel = 3,
  className = "",
}: {
  items: AccordionItem[];
  /** index ouvert au départ (null = tout fermé) */
  defaultOpen?: number | null;
  tone?: "light" | "dark";
  headingLevel?: 2 | 3 | 4;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  void tone;
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <div className={`divide-y divide-track border-y border-track ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-b${i}`;
        const panelId = `${uid}-p${i}`;
        return (
          <div key={i} id={item.id}>
            <H className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`flex w-full items-start justify-between gap-6 py-5 text-left text-heading-md text-fg`}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 flex-shrink-0 transition-transform duration-150 text-fg-muted ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </H>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className={`pb-6 text-body ${typeof item.answer === "string" ? "max-w-[65ch]" : ""} text-fg-strong`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
