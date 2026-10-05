"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { Play } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import FilmPlayer, { type FilmPlayerHandle } from "@/components/visuals/FilmPlayer";
import { formatDuration } from "@/components/visuals/VideoPlayer";
import { SLOT_VIDEOS } from "@/content/media-slots";

/**
 * Section « Pourquoi GreenTechCycle — le film » (accueil, sous la ligne de flottaison).
 * Lecteur en ligne (poster seul tant qu'on ne clique pas) + 5 enseignements clés, un par
 * chapitre du film, chacun avec sa source et un bouton « voir à 1:05 » qui lance le film
 * au bon chapitre. Chiffres repris du script validé (reports/film-homepage-v3-script.md) :
 * ITU Global E-waste Monitor 2024, IEA Energy and AI 2025, IBM Cost of a Data Breach 2025.
 */
const TAKEAWAYS = [
  {
    chapter: 0,
    figure: { fr: "17,6 kg", en: "17.6 kg" },
    text: {
      fr: "de déchets électroniques par habitant et par an en Europe ; 42,8 % seulement sont collectés.",
      en: "of e-waste per person per year in Europe; only 42.8% is collected.",
    },
    source: "ITU, Global E-waste Monitor 2024",
  },
  {
    chapter: 1,
    figure: { fr: "62 Mt", en: "62 Mt" },
    text: {
      fr: "de déchets électroniques dans le monde en 2022, 22,3 % correctement recyclés ; 82 Mt attendues en 2030.",
      en: "of e-waste worldwide in 2022, 22.3% properly recycled; 82 Mt expected by 2030.",
    },
    source: "ITU, Global E-waste Monitor 2024",
  },
  {
    chapter: 2,
    figure: { fr: "≈ 945 TWh", en: "≈945 TWh" },
    text: {
      fr: "consommés par les datacenters en 2030, contre ≈ 415 TWh en 2024 : l'IA accélère la demande en GPU, mémoire et stockage.",
      en: "used by data centres by 2030, up from ≈415 TWh in 2024: AI is accelerating demand for GPUs, memory and storage.",
    },
    source: "IEA, Energy and AI, 2025",
  },
  {
    chapter: 3,
    figure: { fr: "4,44 M$", en: "$4.44M" },
    text: {
      fr: "coût moyen d'une fuite de données. Un matériel déclassé qu'on ne trace pas est une porte ouverte.",
      en: "average cost of a data breach. Decommissioned hardware you can't trace is an open door.",
    },
    source: "IBM, Cost of a Data Breach Report 2025",
  },
  {
    chapter: 4,
    figure: { fr: "1 chaîne", en: "1 chain" },
    text: {
      fr: "de garde scellée par actif : horodatée, empreinte SHA-256, du premier GPU au dernier portable.",
      en: "of custody per asset, sealed: timestamped, SHA-256 fingerprinted, from the first GPU to the last laptop.",
    },
    source: "GreenTechCycle",
  },
] as const;

export default function FilmSection({ id = "brand-film" }: { id?: string }) {
  const isEn = useLocale() === "en";
  const lang = isEn ? "en" : "fr";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const playerRef = useRef<FilmPlayerHandle>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const spec = SLOT_VIDEOS[id];
  const chapters = spec?.chapters ?? [];
  if (!spec) return null;

  const watchFrom = (t: number) => {
    playerRef.current?.playFrom(t);
    boxRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Section id="film" tone="night">
      <div className="reveal">
        <SectionHeader
          tone="dark"
          eyebrow={tx("Pourquoi GreenTechCycle — le film", "Why GreenTechCycle — the film")}
          title={tx(
            "De l'Europe au monde, de l'IA à la sécurité : pourquoi la fin de vie IT doit devenir traçable.",
            "From Europe to the world, from AI to security: why IT end-of-life has to become traceable."
          )}
          intro={tx(
            `${formatDuration(spec.duration)} · voix off en anglais. Cinq chapitres, cinq chiffres sourcés — cliquez sur un chapitre pour y aller directement.`,
            `${formatDuration(spec.duration)} · English voice-over. Five chapters, five sourced figures — click a chapter to jump straight to it.`
          )}
        />
      </div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div ref={boxRef} className="reveal min-w-0 lg:col-span-7">
          <FilmPlayer ref={playerRef} id={id} placement="home-section" />
        </div>
        <ol className="reveal-stagger min-w-0 space-y-3 lg:col-span-5">
          {TAKEAWAYS.map((k) => {
            const ch = chapters[k.chapter];
            return (
              <li key={k.chapter} className="reveal">
                <article className="rounded-xl border border-track bg-bg p-4 transition-colors hover:border-track-strong">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-eyebrow uppercase text-fg-muted">
                      <span className="mr-2 font-mono">{String(k.chapter + 1).padStart(2, "0")}</span>
                      {ch?.label[lang]}
                    </p>
                    {ch && (
                      <button
                        type="button"
                        onClick={() => watchFrom(ch.start)}
                        aria-label={tx(`Voir le chapitre ${ch.label.fr} dans le film`, `Watch the ${ch.label.en} chapter of the film`)}
                        className="-my-2 inline-flex min-h-[44px] flex-shrink-0 items-center gap-1.5 rounded-full px-2 font-mono text-caption text-emerald transition-colors hover:text-fg"
                      >
                        <Play className="h-3 w-3" fill="currentColor" aria-hidden="true" />
                        {formatDuration(ch.start) || "0:00"}
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-body-sm text-fg-strong">
                    <span className="mr-1.5 font-display text-heading-lg text-fg">{k.figure[lang]}</span>
                    {k.text[lang]}
                  </p>
                  <p className="mt-2 text-caption italic text-fg-muted">{tx("Source :", "Source:")} {k.source}</p>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
