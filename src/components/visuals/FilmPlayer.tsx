"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useId, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { CalendarCheck, Mail, MessageCircle, Play, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SLOT_VIDEOS } from "@/content/media-slots";
import { EMAILS, PREFILL, mailtoHref, whatsappHref } from "@/lib/contact";
import { track } from "@/lib/analytics";
import { formatDuration } from "./VideoPlayer";

export interface FilmPlayerHandle {
  /** Lance (ou reprend) la lecture avec le son — à appeler DANS un geste utilisateur */
  play: () => void;
  /** Saute au temps `t` (s) puis lit */
  playFrom: (t: number) => void;
  pause: () => void;
}

type FilmState = "idle" | "playing" | "paused" | "ended";

const MILESTONES = [25, 50, 75] as const;

/**
 * FilmPlayer — lecteur du film de marque (2026-10-04), utilisé dans la modale du hero,
 * dans la section « le film » de l'accueil et sur /demo.
 * - Au repos : poster (aucun octet vidéo chargé, `preload="none"`) + grand bouton lecture.
 * - Lecture avec le son, `play()` appelé dans le geste utilisateur ; repli muet si refusé.
 * - Chapitres cliquables sous l'image (registre `chapters`), progression par chapitre.
 * - Pause ou fin : écran d'appel à l'action (réserver une démo, WhatsApp, e-mail commercial)
 *   par-dessus l'image, avec « Reprendre » / « Revoir ».
 * - Mesure GA4 (src/lib/analytics.ts, consentement requis) : video_start, video_progress
 *   (25/50/75), video_complete — chacun avec `video_title` et `chapter` — puis cta_click
 *   (ou whatsapp_click / email_click pour les deux canaux de contact de l'écran de pause),
 *   avec `placement`.
 * - Pas de sous-titres (décision utilisateur) : description accessible masquée visuellement.
 */
const FilmPlayer = forwardRef<FilmPlayerHandle, { id: string; placement: string; className?: string; frameClassName?: string }>(
  function FilmPlayer({ id, placement, className = "", frameClassName = "rounded-2xl border border-track shadow-float" }, ref) {
    const isEn = useLocale() === "en";
    const lang = isEn ? "en" : "fr";
    const spec = SLOT_VIDEOS[id];
    const boxRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const resumeRef = useRef<HTMLButtonElement>(null);
    const pendingSeek = useRef<number | null>(null);
    const fired = useRef(new Set<string>());
    const [state, setState] = useState<FilmState>("idle");
    const [time, setTime] = useState(0);
    const descId = useId();

    const duration = spec?.duration ?? 0;
    const chapters = spec?.chapters ?? [];
    const title = spec?.title?.[lang] ?? "";

    const once = (key: string, fn: () => void) => {
      if (fired.current.has(key)) return;
      fired.current.add(key);
      fn();
    };

    /** Chapitre atteint au temps `t` (toujours en anglais, cohérent avec la mesure). */
    const chapterAt = (t: number) => chapters.reduce((acc, c) => (t >= c.start ? c.label.en : acc), "");

    const playFrom = useCallback(
      (t: number | null) => {
        const v = videoRef.current;
        if (!v) return;
        if (t !== null) {
          // Avant le chargement des métadonnées, le saut est rejoué sur `loadedmetadata`
          if (v.readyState === 0) pendingSeek.current = t;
          v.currentTime = t;
        } else if (v.ended) {
          v.currentTime = 0;
        }
        v.muted = false;
        setState("playing");
        once("play", () =>
          track("video_start", { video_title: title, chapter: chapterAt(t ?? time), film: id, placement })
        );
        v.play().catch(() => {
          // Son refusé par le navigateur : on relance en muet, l'utilisateur garde les contrôles
          v.muted = true;
          v.play().catch(() => setState("paused"));
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [id, placement]
    );

    useImperativeHandle(
      ref,
      () => ({
        play: () => playFrom(null),
        playFrom: (t: number) => playFrom(t),
        pause: () => videoRef.current?.pause(),
      }),
      [playFrom]
    );

    // Gestion du focus : les contrôles natifs disparaissent en pause, le focus passe sur « Reprendre »
    useEffect(() => {
      const box = boxRef.current;
      const active = typeof document !== "undefined" ? document.activeElement : null;
      if ((state === "paused" || state === "ended") && box && active && box.contains(active)) {
        resumeRef.current?.focus();
      } else if (state === "playing" && (!active || active === document.body)) {
        videoRef.current?.focus();
      }
    }, [state]);

    if (!spec || spec.kind !== "player") return null;

    const current = chapters.reduce((acc, c, i) => (time >= c.start ? i : acc), 0);
    const ctaClick = (cta: string) => {
      if (cta === "whatsapp") track("whatsapp_click", { location: `${placement}_video_cta` });
      else if (cta === "email_sales") track("email_click", { location: `${placement}_video_cta` });
      else track("cta_click", { label: cta, location: placement });
    };
    const wa = whatsappHref(PREFILL[lang].whatsapp);
    const mail = mailtoHref(PREFILL[lang].subject, "", EMAILS.sales);
    const pill =
      "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-track-strong bg-bg/80 px-4 text-body-sm font-semibold text-fg transition-colors hover:border-emerald hover:text-emerald";

    return (
      <div ref={boxRef} data-film={id} data-state={state} className={className}>
        <div className={`group relative aspect-video overflow-hidden bg-bg ${frameClassName}`}>
          {/* Poster réel en <img> (plan SEO du 2026-10-05) : indexable par Google Images, contrairement
              à l'attribut `poster` seul. Masqué aux lecteurs d'écran : la vidéo porte déjà le même
              intitulé via aria-label/aria-describedby. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spec.poster}
            alt={isEn ? `${title} — film preview` : `${title} — aperçu du film`}
            aria-hidden="true"
            decoding="async"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            playsInline
            preload="none"
            controls={state === "playing"}
            poster={spec.poster}
            aria-label={title}
            aria-describedby={spec.description ? descId : undefined}
            onLoadedMetadata={(e) => {
              if (pendingSeek.current !== null) {
                e.currentTarget.currentTime = pendingSeek.current;
                pendingSeek.current = null;
              }
            }}
            onPlay={() => setState("playing")}
            onPause={(e) => !e.currentTarget.ended && setState("paused")}
            onEnded={() => {
              setState("ended");
              once("100", () =>
                track("video_complete", { video_title: title, chapter: chapters[current]?.label.en ?? "", percent: 100, film: id, placement })
              );
            }}
            onTimeUpdate={(e) => {
              const t = e.currentTarget.currentTime;
              setTime(t);
              if (!duration) return;
              const pct = (t / duration) * 100;
              for (const m of MILESTONES) {
                if (pct >= m)
                  once(String(m), () =>
                    track("video_progress", { video_title: title, chapter: chapterAt(t), percent: m, film: id, placement })
                  );
              }
            }}
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

          {state === "idle" && (
            <button
              type="button"
              onClick={() => playFrom(null)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-bg/80 via-bg/20 to-bg/10 text-fg transition-colors duration-200 hover:from-bg/70 hover:via-bg/10 hover:to-transparent focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-emerald"
              aria-label={`${isEn ? "Watch the film" : "Voir le film"}${isEn ? ":" : " :"} ${title} (${formatDuration(duration)})`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald text-bg shadow-glow-emerald transition-transform duration-200 group-hover:scale-110 sm:h-20 sm:w-20">
                <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true" />
              </span>
              <span className="rounded-full bg-bg/80 px-3 py-1 text-body-sm font-semibold text-fg backdrop-blur">
                {isEn ? "Watch the film" : "Voir le film"}
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-bg/85 px-2 py-0.5 font-mono text-caption text-fg backdrop-blur">
                {formatDuration(duration)}
              </span>
            </button>
          )}

          {(state === "paused" || state === "ended") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-bg/90 p-3 text-center backdrop-blur-sm sm:gap-4 sm:p-6">
              <p className="hidden max-w-[36ch] text-heading-lg text-fg sm:block">
                {state === "ended"
                  ? isEn
                    ? "See the proof chain on your own fleet."
                    : "Voyez la chaîne de preuve sur votre propre parc."
                  : isEn
                    ? "Want to see it on your fleet?"
                    : "Envie de le voir sur votre parc ?"}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  ref={resumeRef}
                  type="button"
                  onClick={() => playFrom(null)}
                  className={pill}
                >
                  {state === "ended" ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />}
                  {state === "ended" ? (isEn ? "Replay" : "Revoir le film") : isEn ? "Resume" : "Reprendre"}
                </button>
                <Link
                  href="/demo#demo-form"
                  onClick={() => ctaClick("book_demo")}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-emerald px-5 text-body-sm font-semibold text-bg transition-colors hover:bg-emerald/90"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  {isEn ? "Book a demo" : "Réserver une démo"}
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="hidden text-caption text-fg-muted sm:inline">{isEn ? "Talk to sales:" : "Parler à un commercial :"}</span>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" data-gtc-tracked onClick={() => ctaClick("whatsapp")} className={pill}>
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    WhatsApp
                    <span className="sr-only">{isEn ? "(opens in a new tab)" : "(nouvel onglet)"}</span>
                  </a>
                )}
                {mail && (
                  <a href={mail} data-gtc-tracked onClick={() => ctaClick("email_sales")} className={pill}>
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span className="sm:hidden">E-mail</span>
                    <span className="hidden sm:inline">{EMAILS.sales}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {chapters.length > 0 && (
          <ol className="mt-3 flex gap-1.5" aria-label={isEn ? "Film chapters" : "Chapitres du film"}>
            {chapters.map((c, i) => {
              const end = chapters[i + 1]?.start ?? duration;
              const fill = state === "idle" ? 0 : Math.min(100, Math.max(0, ((time - c.start) / (end - c.start)) * 100));
              const isCurrent = state !== "idle" && i === current;
              return (
                <li key={c.start} className="min-w-0 flex-auto">
                  <button
                    type="button"
                    onClick={() => playFrom(c.start)}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`${isEn ? "Chapter" : "Chapitre"} ${i + 1}${isEn ? ":" : " :"} ${c.label[lang]} (${formatDuration(c.start) || "0:00"})`}
                    className="block min-h-[44px] w-full rounded-md pt-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald"
                  >
                    <span className="block h-1 overflow-hidden rounded-full bg-track" aria-hidden="true">
                      <span className="block h-full bg-emerald transition-[width] duration-200" style={{ width: `${fill}%` }} />
                    </span>
                    <span className="mt-1.5 flex items-baseline gap-1.5" aria-hidden="true">
                      <span className={`whitespace-nowrap text-caption font-semibold ${isCurrent ? "text-emerald" : "text-fg"}`}>{c.label[lang]}</span>
                      <span className="hidden font-mono text-caption text-fg-muted sm:inline">{formatDuration(c.start) || "0:00"}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }
);

export default FilmPlayer;
