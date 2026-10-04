"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { VolumeX } from "lucide-react";
import { SLOT_VIDEOS } from "@/content/media-slots";

/**
 * VideoPlayer — vidéo avec voix off anglaise (DESIGN.md v2 §7.3, décision du 2026-10-04).
 * - Lecture au clic uniquement, contrôles natifs, `preload="none"` + poster : rien n'est
 *   téléchargé avant la lecture (pas de lecture automatique, donc rien à couper en
 *   mouvement réduit).
 * - Muette par défaut ; bouton « Activer le son » / « Unmute » visible tant qu'elle l'est.
 * - Pas de sous-titres (décision utilisateur) : titre accessible (`aria-label`) et
 *   description masquée visuellement reliée par `aria-describedby`.
 * Sans vidéo déclarée dans le registre : affiche `fallback`.
 */
export default function VideoPlayer({ id, fallback }: { id: string; fallback?: ReactNode }) {
  const isEn = useLocale() === "en";
  const lang = isEn ? "en" : "fr";
  const spec = SLOT_VIDEOS[id];
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const descId = useId();

  if (!spec || spec.kind !== "player") return <>{fallback ?? null}</>;

  const unmute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <div data-media-slot={id} data-video-ready className="absolute inset-0 bg-bg">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        controls
        muted={muted}
        playsInline
        preload="none"
        poster={spec.poster}
        aria-label={spec.title?.[lang]}
        aria-describedby={spec.description ? descId : undefined}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
      >
        {spec.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      {spec.description && (
        <p id={descId} className="sr-only">
          {spec.description[lang]}
        </p>
      )}
      {muted && (
        <button
          type="button"
          onClick={unmute}
          className="absolute right-3 top-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-track bg-bg/90 px-4 text-body-sm font-medium text-fg backdrop-blur transition-colors hover:border-emerald hover:text-emerald"
        >
          <VolumeX className="h-4 w-4" aria-hidden="true" />
          {isEn ? "Unmute" : "Activer le son"}
          {spec.title && <span className="sr-only">: {spec.title[lang]}</span>}
        </button>
      )}
    </div>
  );
}

/** Bloc vidéo prêt à poser dans une page : cadre 16/9 + légende courte (durée, langue). */
export function VideoFigure({ id, className = "" }: { id: string; className?: string }) {
  const isEn = useLocale() === "en";
  const spec = SLOT_VIDEOS[id];
  if (!spec || spec.kind !== "player") return null;
  const secs = spec.duration ? Math.round(spec.duration) : null;
  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-track shadow-float">
        <VideoPlayer id={id} />
      </div>
      <figcaption className="mt-3 text-caption text-fg-muted">
        {spec.title?.[isEn ? "en" : "fr"]}
        {secs ? ` · ${secs} s` : ""} · {isEn ? "English voice-over" : "voix off en anglais"}
      </figcaption>
    </figure>
  );
}
