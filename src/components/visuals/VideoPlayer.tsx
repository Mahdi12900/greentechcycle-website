"use client";

import { useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { VolumeX } from "lucide-react";
import { SLOT_VIDEOS } from "@/content/media-slots";

/**
 * VideoPlayer — vidéo avec voix off (phase vidéo, DESIGN.md v2 §7.3).
 * - Contrôles natifs, `preload="none"` + poster : rien n'est téléchargé avant la lecture.
 * - Muette par défaut (pas de son imposé) ; bouton « Activer le son » visible tant que muette.
 * - Sous-titres WebVTT fr/en, piste de la langue de la page activée par défaut.
 * - Jamais de lecture automatique (donc rien à couper en mouvement réduit).
 * Sans vidéo déclarée dans le registre : affiche `fallback`.
 */
export default function VideoPlayer({
  id,
  title,
  fallback,
}: {
  id: string;
  /** Libellé accessible de la vidéo */
  title: string;
  fallback: ReactNode;
}) {
  const isEn = useLocale() === "en";
  const spec = SLOT_VIDEOS[id];
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  if (!spec || spec.kind !== "player") return <>{fallback}</>;

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
        aria-label={title}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
      >
        {spec.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
        {spec.captions && (
          <>
            <track kind="captions" src={spec.captions.fr} srcLang="fr" label="Français" default={!isEn} />
            <track kind="captions" src={spec.captions.en} srcLang="en" label="English" default={isEn} />
          </>
        )}
      </video>
      {muted && (
        <button
          type="button"
          onClick={unmute}
          className="absolute right-3 top-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-track bg-bg/90 px-4 text-body-sm font-medium text-fg backdrop-blur transition-colors hover:border-emerald hover:text-emerald"
        >
          <VolumeX className="h-4 w-4" aria-hidden="true" />
          {isEn ? "Turn sound on" : "Activer le son"}
        </button>
      )}
    </div>
  );
}
