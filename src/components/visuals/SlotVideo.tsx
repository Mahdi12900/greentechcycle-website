"use client";

import { useEffect, useRef, useState } from "react";

type Source = { src: string; type: string };

/**
 * Vidéo d'ambiance de slot (DESIGN.md v2 §7.3) : muette, en boucle, inline, sans contrôle.
 * - Le poster est TOUJOURS rendu côté serveur (<img>) : contenu visible sans JS, et c'est
 *   lui qui compte pour le LCP. La vidéo n'est ajoutée qu'après l'événement `load`
 *   (puis temps mort du navigateur), en `preload="metadata"`.
 * - Poster seul si `prefers-reduced-motion: reduce` ou Save-Data.
 * - Mise en pause hors écran (IntersectionObserver) pour épargner batterie et CPU.
 */
export default function SlotVideo({
  sources,
  src,
  poster,
  className = "",
}: {
  sources?: Source[];
  /** Compatibilité : source MP4 unique */
  src?: string;
  poster: string;
  className?: string;
}) {
  const list: Source[] = sources ?? (src ? [{ src, type: "video/mp4" }] : []);
  const [play, setPlay] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (reduce || nav.connection?.saveData || list.length === 0) return;
    let idle: number | undefined;
    const start = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
      idle = ric ? ric(() => setPlay(true)) : window.setTimeout(() => setPlay(true), 200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (idle !== undefined) {
        const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
        if (cic) cic(idle);
        else window.clearTimeout(idle);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!play || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [play]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" aria-hidden="true" decoding="async" className={`absolute inset-0 h-full w-full object-cover ${className}`} />
      {play && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover ${className}`}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          {list.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>
      )}
    </>
  );
}
