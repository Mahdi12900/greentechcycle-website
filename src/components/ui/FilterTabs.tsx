"use client";

import { useRef } from "react";

export interface FilterTabItem {
  id: string;
  label: string;
}

/**
 * Onglets qui FILTRENT le contenu (masquent les panneaux inactifs) — à ne pas confondre
 * avec `SectionNav` (ancre + scroll-spy, tout le contenu reste visible, DESIGN.md §6.8).
 * Pattern WAI-ARIA Tabs (activation automatique) : flèches/Home/End déplacent le focus
 * et activent l'onglet ciblé. Non collant (règle « un seul élément collant en haut »,
 * DESIGN.md §6.2, déjà occupée par le header) : positionné une fois, pas de sticky au scroll.
 */
export default function FilterTabs({
  items,
  active,
  onChange,
  label,
}: {
  items: FilterTabItem[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    const id = items[next].id;
    onChange(id);
    refs.current[id]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="scrollbar-hide flex gap-1 overflow-x-auto border-b border-track"
    >
      {items.map((item, idx) => {
        const selected = active === item.id;
        return (
          <button
            key={item.id}
            ref={(el) => {
              refs.current[item.id] = el;
            }}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={selected}
            aria-controls={`panel-${item.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            className={`relative flex h-12 flex-shrink-0 items-center whitespace-nowrap px-4 text-body-sm font-semibold transition-colors ${
              selected
                ? "text-fg after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:bg-emerald"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
