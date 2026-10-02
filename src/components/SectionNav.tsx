"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useSiteUi } from "@/components/SiteUiContext";

/**
 * Barre d'onglets de sections (DESIGN.md §6.9) + règle « un seul sticky » (§6.2).
 *
 * - `sticky top-0`. Une sentinelle juste au-dessus est observée : quand elle
 *   passe sous le header, le header se retire et la barre prend le relais
 *   (avec la pastille logo à gauche). En remontant, le header revient.
 * - Actif = texte `ink` + soulignement 2 px `leaf` (plus de fond vert plein).
 * - Mobile : défilement horizontal avec masque d'indice (`scroll-hint`).
 * - Scroll-spy : IntersectionObserver `-30% 0px -60% 0px`.
 */
export default function SectionNav({
  anchors,
  label,
}: {
  anchors: { id: string; label: string }[];
  label: string;
}) {
  const { setHeaderHidden } = useSiteUi();
  const sentinelRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(anchors[0]?.id);

  /* Relais header ↔ onglets */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const headerH = () => (window.matchMedia("(min-width: 1024px)").matches ? 72 : 64);
    let io: IntersectionObserver | null = null;
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(
        ([entry]) => {
          const passed = !entry.isIntersecting && entry.boundingClientRect.top < headerH();
          setStuck(passed);
          setHeaderHidden(passed);
        },
        { rootMargin: `-${headerH()}px 0px 0px 0px`, threshold: 0 }
      );
      io.observe(el);
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      io?.disconnect();
      window.removeEventListener("resize", observe);
      setHeaderHidden(false);
    };
  }, [setHeaderHidden]);

  /* Scroll-spy */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    for (const a of anchors) {
      const el = document.getElementById(a.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [anchors]);

  /* Garde l'onglet actif visible horizontalement + masque d'indice */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const item = scroller.querySelector<HTMLElement>(`[data-anchor="${active}"]`);
    if (item) {
      const left = item.offsetLeft - 16;
      const right = item.offsetLeft + item.offsetWidth - scroller.clientWidth + 48;
      if (scroller.scrollLeft > left) scroller.scrollTo({ left, behavior: "smooth" });
      else if (scroller.scrollLeft < right) scroller.scrollTo({ left: right, behavior: "smooth" });
    }
  }, [active]);

  const onScroll = () => {
    const s = scrollerRef.current;
    if (!s) return;
    setAtEnd(s.scrollLeft + s.clientWidth >= s.scrollWidth - 4);
  };
  useEffect(onScroll, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <nav aria-label={label} className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="container-max flex items-center px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label="GreenTechCycle — accueil"
            tabIndex={stuck ? 0 : -1}
            className={`flex-shrink-0 overflow-hidden transition-all duration-200 ${stuck ? "mr-3 w-6 opacity-100" : "w-0 opacity-0"}`}
          >
            <Image src="/logo/icon-only.svg" alt="" width={24} height={24} className="h-6 w-6" />
          </Link>
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className={`scrollbar-hide scroll-hint -mx-3 flex h-12 snap-x items-center overflow-x-auto pr-12 ${atEnd ? "is-end" : ""}`}
          >
            {anchors.map((a) => {
              const isActive = active === a.id;
              return (
                <a
                  key={a.id}
                  href={`#${a.id}`}
                  data-anchor={a.id}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex h-12 snap-start items-center whitespace-nowrap px-3 text-body-sm font-medium transition-colors ${
                    isActive
                      ? "text-ink after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-leaf"
                      : "text-ink-700 hover:text-ink"
                  }`}
                >
                  {a.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
