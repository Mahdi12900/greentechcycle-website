"use client";

import { useEffect, useState } from "react";

/**
 * Vidéo de slot (DESIGN.md v2 §7.3) : muette, en boucle, inline, sans contrôle.
 * Désactivée (poster seul) si `prefers-reduced-motion` ou `saveData`.
 */
export default function SlotVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const [allowMotion, setAllowMotion] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    setAllowMotion(!reduce && !nav.connection?.saveData);
  }, []);

  if (!allowMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt="" className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      aria-hidden="true"
    />
  );
}
