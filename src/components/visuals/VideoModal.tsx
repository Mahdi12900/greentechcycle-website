"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { Play, X } from "lucide-react";
import { SLOT_VIDEOS } from "@/content/media-slots";
import { formatDuration } from "./VideoPlayer";

/**
 * Bouton « Voir la présentation (25 s) » + fenêtre modale (<dialog> natif : focus piégé,
 * Échap pour fermer). La vidéo existe dès le rendu (`preload="none"`) : au clic, la modale
 * s'ouvre et `play()` est appelé dans le geste utilisateur, avec le son. Fermeture = pause.
 */
export default function VideoModal({ id, className = "" }: { id: string; className?: string }) {
  const isEn = useLocale() === "en";
  const lang = isEn ? "en" : "fr";
  const spec = SLOT_VIDEOS[id];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  if (!spec || spec.kind !== "player") return null;
  const dur = spec.duration ? Math.round(spec.duration) : null;
  const title = spec.title?.[lang] ?? "";

  const open = () => {
    const d = dialogRef.current;
    const v = videoRef.current;
    if (!d || !v) return;
    d.showModal();
    v.currentTime = 0;
    v.muted = false;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className={`group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-track bg-bg/70 py-1.5 pl-1.5 pr-5 text-body-sm font-semibold text-fg backdrop-blur transition-colors hover:border-emerald ${className}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-bg transition-transform group-hover:scale-110">
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
        </span>
        {isEn ? `Watch the ${dur ?? ""}-second presentation` : `Voir la présentation de ${dur ?? ""} secondes`}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => videoRef.current?.pause()}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="w-[min(1100px,calc(100vw-2rem))] max-w-none overflow-visible rounded-2xl border border-track bg-bg p-0 text-fg shadow-float backdrop:bg-bg/85 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <p className="text-body-sm font-semibold text-fg">
            {title}
            {spec.duration ? <span className="ml-2 font-mono text-caption text-fg-muted">{formatDuration(spec.duration)}</span> : null}
          </p>
          <button
            type="button"
            onClick={close}
            aria-label={isEn ? "Close the video" : "Fermer la vidéo"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-b-2xl bg-bg">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="none"
            poster={spec.poster}
            aria-label={title}
          >
            {spec.sources.map((s) => (
              <source key={s.src} src={s.src} type={s.type} />
            ))}
          </video>
        </div>
        {spec.description && <p className="sr-only">{spec.description[lang]}</p>}
      </dialog>
    </>
  );
}
