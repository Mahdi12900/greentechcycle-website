"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { Play, X } from "lucide-react";
import { SLOT_VIDEOS } from "@/content/media-slots";
import { track } from "@/lib/analytics";
import FilmPlayer, { type FilmPlayerHandle } from "./FilmPlayer";
import { formatDuration } from "./VideoPlayer";

/**
 * Bouton « Voir le film (2:54) » + fenêtre modale plein écran (<dialog> natif : focus piégé,
 * Échap pour fermer, clic sur le fond pour fermer). Au clic, la modale s'ouvre et la lecture
 * démarre AVEC le son dans le même geste utilisateur. Fermeture = pause (l'écran d'appel à
 * l'action réapparaît à la réouverture si le film n'est pas relancé).
 */
export default function FilmModal({ id, placement, className = "" }: { id: string; placement: string; className?: string }) {
  const isEn = useLocale() === "en";
  const lang = isEn ? "en" : "fr";
  const spec = SLOT_VIDEOS[id];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const playerRef = useRef<FilmPlayerHandle>(null);
  if (!spec || spec.kind !== "player") return null;
  const dur = formatDuration(spec.duration);
  const title = spec.title?.[lang] ?? "";
  const titleId = `${id}-modal-title`;

  const open = () => {
    dialogRef.current?.showModal();
    track("film_open", { film: id, placement });
    playerRef.current?.play();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={`group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-track bg-bg/70 py-1.5 pl-1.5 pr-5 text-body-sm font-semibold text-fg backdrop-blur transition-colors hover:border-emerald ${className}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald text-bg transition-transform group-hover:scale-110">
          <Play className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true" />
        </span>
        {isEn ? "Watch the film" : "Voir le film"}
        <span className="font-mono text-caption text-fg-muted">({dur})</span>
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={() => playerRef.current?.pause()}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="max-h-none w-[min(1200px,calc(100vw-2rem),calc((100dvh-9rem)*1.7778))] min-w-[min(320px,calc(100vw-2rem))] max-w-none overflow-visible rounded-2xl border border-track bg-bg p-0 text-fg shadow-float backdrop:bg-bg/90 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2">
          <p id={titleId} className="text-body-sm font-semibold text-fg">
            {title}
            <span className="ml-2 font-mono text-caption text-fg-muted">
              {dur} · {isEn ? "English voice-over" : "voix off en anglais"}
            </span>
          </p>
          <button
            type="button"
            onClick={close}
            aria-label={isEn ? "Close the film" : "Fermer le film"}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <FilmPlayer ref={playerRef} id={id} placement={placement} frameClassName="" className="px-0 pb-3 [&>ol]:px-4" />
      </dialog>
    </>
  );
}
