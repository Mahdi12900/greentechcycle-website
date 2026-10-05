"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import { Play, Volume2, VolumeX } from "lucide-react";
import { SLOT_VIDEOS } from "@/content/media-slots";

/** 33.7 → « 0:34 » */
export function formatDuration(s?: number) {
  if (!s) return "";
  const r = Math.round(s);
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, "0")}`;
}

function motionAllowed() {
  if (typeof window === "undefined") return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  return !reduce && !nav.connection?.saveData;
}

/**
 * VideoPlayer — vidéo avec voix off anglaise, qui SE VOIT comme une vidéo (correctif 2026-10-04) :
 * - Au repos : poster + grand bouton lecture émeraude centré, pastille de durée (« 0:34 »)
 *   et libellé « Voir la vidéo » / « Watch the video ». Tout le poster est cliquable
 *   (un vrai <button>, donc accessible au clavier).
 * - L'élément <video> est rendu dès le serveur (`preload="none"`) : au clic, `play()` est
 *   appelé DANS le geste utilisateur, avec le son (fiable sur Safari/Chrome mobiles,
 *   `playsInline`). Ensuite : contrôles natifs + bouton couper / remettre le son.
 * - `preview` (vidéos de cas) : quand le cadre entre à l'écran, aperçu muet en boucle sur
 *   les ~6 premières secondes, sauf `prefers-reduced-motion` ou Save-Data (poster seul).
 *   Rien n'est téléchargé tant que le cadre n'est pas visible.
 * - Pas de sous-titres (décision utilisateur) : titre accessible + description masquée.
 */
export default function VideoPlayer({
  id,
  fallback,
  preview = false,
}: {
  id: string;
  fallback?: ReactNode;
  preview?: boolean;
}) {
  const isEn = useLocale() === "en";
  const lang = isEn ? "en" : "fr";
  const spec = SLOT_VIDEOS[id];
  const ref = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "preview" | "playing">("idle");
  const [muted, setMuted] = useState(false);
  const descId = useId();

  // Aperçu muet à l'entrée dans le viewport (vidéos de cas)
  useEffect(() => {
    if (!preview || !spec || !motionAllowed()) return;
    const box = boxRef.current;
    const v = ref.current;
    if (!box || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (v.dataset.mode === "playing") return;
        if (e.isIntersecting) {
          v.dataset.mode = "preview";
          v.muted = true;
          v.loop = true;
          v.preload = "auto";
          v.play().then(() => setState((s) => (s === "playing" ? s : "preview"))).catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(box);
    return () => io.disconnect();
  }, [preview, spec]);

  if (!spec || spec.kind !== "player") return <>{fallback ?? null}</>;

  const title = spec.title?.[lang] ?? "";
  const dur = formatDuration(spec.duration);

  // Lecture complète, avec le son, dans le geste utilisateur
  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.dataset.mode = "playing";
    if (state === "preview") v.currentTime = 0;
    v.loop = false;
    v.muted = false;
    v.controls = true;
    setMuted(false);
    setState("playing");
    const p = v.play();
    if (p) p.catch(() => {
      // Si le son est refusé (politique navigateur), on relance en muet : l'image bouge quand même
      v.muted = true;
      setMuted(true);
      v.play().catch(() => {});
    });
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div ref={boxRef} data-media-slot={id} data-video-ready data-state={state} className="group absolute inset-0 bg-bg">
      {/* Poster réel en <img> (plan SEO du 2026-10-05, reports/seo-plan-gtc.md §2.2.4) : l'attribut
          `poster` du <video> n'est pas indexable par Google Images, cet <img> l'est. Masqué aux
          lecteurs d'écran : la vidéo porte déjà le même intitulé via aria-label/aria-describedby. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={spec.poster}
        alt={isEn ? `${title} — video preview` : `${title} — aperçu vidéo`}
        aria-hidden="true"
        decoding="async"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        preload="none"
        poster={spec.poster}
        aria-label={title}
        aria-describedby={spec.description ? descId : undefined}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          // Aperçu : boucle sur les 6 premières secondes
          if (v.dataset.mode === "preview" && v.currentTime > 6) v.currentTime = 0;
        }}
        onVolumeChange={(e) => state === "playing" && setMuted(e.currentTarget.muted)}
        onEnded={() => setState("playing")}
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

      {state !== "playing" && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-bg/80 via-bg/20 to-bg/10 text-fg transition-colors duration-200 hover:from-bg/70 hover:via-bg/10 hover:to-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-emerald"
          aria-label={`${isEn ? "Watch the video" : "Voir la vidéo"} : ${title}${dur ? ` (${dur})` : ""}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-bg shadow-glow-emerald transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-bg/80 px-3 py-1 text-body-sm font-semibold text-fg backdrop-blur">
            {isEn ? "Watch the video" : "Voir la vidéo"}
          </span>
          {dur && (
            <span className="absolute bottom-3 right-3 rounded-md bg-bg/85 px-2 py-0.5 font-mono text-caption text-fg backdrop-blur">
              {dur}
            </span>
          )}
          {state === "preview" && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-bg/85 px-2 py-0.5 font-mono text-caption text-fg-strong backdrop-blur">
              <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
              {isEn ? "Preview" : "Aperçu"}
            </span>
          )}
        </button>
      )}

      {state === "playing" && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-3 top-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-track bg-bg/90 px-4 text-body-sm font-medium text-fg backdrop-blur transition-colors hover:border-emerald hover:text-emerald"
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
          {muted ? (isEn ? "Unmute" : "Activer le son") : isEn ? "Mute" : "Couper le son"}
        </button>
      )}
    </div>
  );
}

/** Bloc vidéo prêt à poser : cadre 16/9 + légende (titre, durée, langue). */
export function VideoFigure({
  id,
  preview = false,
  className = "",
}: {
  id: string;
  preview?: boolean;
  className?: string;
}) {
  const isEn = useLocale() === "en";
  const spec = SLOT_VIDEOS[id];
  if (!spec || spec.kind !== "player") return null;
  const dur = formatDuration(spec.duration);
  return (
    <figure className={className}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-track shadow-float">
        <VideoPlayer id={id} preview={preview} />
      </div>
      <figcaption className="mt-3 text-caption text-fg-muted">
        {spec.title?.[isEn ? "en" : "fr"]}
        {dur ? ` · ${dur}` : ""} · {isEn ? "English voice-over" : "voix off en anglais"}
      </figcaption>
    </figure>
  );
}
