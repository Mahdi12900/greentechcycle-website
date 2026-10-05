"use client";

import { useLocale } from "next-intl";
import { Ban, Bot, FlaskConical, Lock, Mail, ShieldAlert, Users } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Pictogram from "@/components/ui/Pictogram";
import { SECTORS } from "@/data/sectors";
import { getSectorName } from "@/data/sectors-i18n";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { EMAILS, PREFILL, mailtoHref } from "@/lib/contact";
import {
  LAB_AI_RULES,
  LAB_BRICKS,
  LAB_DATA_LEVELS,
  LAB_DOMAINS,
  LAB_HYBRID_PRINCIPLES,
  LAB_METHOD,
  LAB_MISSION,
  LAB_PIPELINE,
  LAB_PROGRAMMES,
  LAB_PROOF_DIMENSIONS,
  LAB_RED_LINES,
  LAB_SECTOR_PILOTS,
  LAB_REFUSAL_CASES,
} from "@/content/lab";

/**
 * /lab — « GreenTechCycle Lab » (2026-10-04).
 * Laboratoire de R&D appliquée de GreenTechCycle. Tout est au futur / « en recherche » :
 * aucun programme n'est présenté comme une fonctionnalité livrée, aucun niveau de maturité
 * ni aucune date n'est affiché, aucune certification n'est revendiquée.
 * Contenu : src/content/lab.ts (source : manuel maître du Lab v1.0 + revue du 2026-10-04).
 * Visuels construits en code (pas de photo).
 */
export default function LabPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  const tx = (fr: string, en: string) => (isEn ? en : fr);
  const labMail = mailtoHref(PREFILL[lang].labSubject, "", EMAILS.lab);
  const inResearch = tx("En recherche", "In research");

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden bg-bg py-16 lg:py-24" aria-labelledby="lab-title">
        <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="fx-dots fx-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <Breadcrumbs
            dark
            items={[
              { label: tx("Accueil", "Home"), href: `/${locale}` },
              { label: "GreenTechCycle Lab", href: `/${locale}/lab` },
            ]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="dark" icon={<FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />}>
                GreenTechCycle Lab · {tx("R&D appliquée", "Applied R&D")}
              </Tag>
              <h1 id="lab-title" className="mt-6 max-w-[22ch] text-display-lg text-fg">
                {tx("Le laboratoire qui construit la prochaine couche de preuve.", "The lab building the next layer of proof.")}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">
                {tx(
                  "GreenTechCycle Lab est le laboratoire de recherche et développement appliqué de GreenTechCycle. Ses programmes sont en recherche : rien de ce qui est décrit sur cette page n'est encore une fonctionnalité de la plateforme.",
                  "GreenTechCycle Lab is GreenTechCycle's applied research and development lab. Its programmes are in research: nothing described on this page is a platform feature yet."
                )}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="#pilotes" size="lg">
                  {tx("Rejoindre un programme pilote", "Join a pilot programme")}
                </ButtonLink>
                <ButtonLink href="#programmes" variant="secondary" size="lg" arrow={false}>
                  {tx("Voir les 8 programmes", "See the 8 programmes")}
                </ButtonLink>
              </div>
            </div>

            {/* Visuel code : la charte du Lab sous forme de manifeste */}
            <div className="reveal-scale min-w-0 lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-track bg-bg-card shadow-float">
                <div className="flex items-center gap-2 border-b border-track px-4 py-3" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-track-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-track-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-track-strong" />
                  <span className="ml-2 font-mono text-caption text-fg-muted">lab/charter.yml</span>
                </div>
                <dl className="space-y-3 p-5 font-mono text-caption sm:text-body-sm">
                  <div>
                    <dt className="text-emerald">mission:</dt>
                    <dd className="pl-4 text-fg-strong">{tx("concevoir · expérimenter · documenter · transférer", "design · test · document · transfer")}</dd>
                  </div>
                  <div>
                    <dt className="text-emerald">scope:</dt>
                    <dd className="pl-4 text-fg-strong">
                      {LAB_DOMAINS.map((d) => (
                        <span key={d.en} className="block">
                          - {d[lang]}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-emerald">programmes:</dt>
                    <dd className="pl-4 text-fg-strong">GTCL-01 … GTCL-08</dd>
                  </div>
                  <div>
                    <dt className="text-emerald">status:</dt>
                    <dd className="pl-4 text-amber">&quot;{inResearch.toLowerCase()}&quot;</dd>
                  </div>
                  <div>
                    <dt className="text-emerald">principle:</dt>
                    <dd className="pl-4 text-fg-strong">{tx("« un refus documenté est une fonction de sécurité »", "“a documented refusal is a security feature”")}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MISSION & VISION (p. 3) ═══ */}
      <Section id="mission" tone="cream">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <SectionHeader eyebrow="Mission" title={tx("Des technologies de confiance pour tout le cycle de vie des actifs numériques.", "Trusted technologies for the whole lifecycle of digital assets.")} />
            <p className="max-w-[65ch] text-body-lg text-fg-strong">{LAB_MISSION[lang]}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={tx("Domaines de recherche", "Research domains")}>
              {LAB_DOMAINS.map((d) => (
                <li key={d.en}>
                  <Tag variant="neutral">{d[lang]}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <SectionHeader
              eyebrow="Vision"
              title={tx("Un ensemble cohérent de briques plutôt qu'un produit isolé.", "A coherent set of building blocks rather than a single product.")}
              intro={tx(
                "Chaque brique pourra être utilisée seule ; c'est leur combinaison qui fera la différence. Ce sont des objectifs de recherche.",
                "Each block will be usable on its own; their combination is what will make the difference. These are research goals."
              )}
            />
            <ol className="space-y-2">
              {LAB_BRICKS.map((b, i) => (
                <li key={b.en} className="flex items-center gap-4 rounded-lg border border-track bg-bg px-4 py-3">
                  <span className="font-mono text-caption text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body-sm text-fg">{b[lang]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ═══ LIGNES ROUGES (p. 3) ═══ */}
      <Section id="lignes-rouges" tone="paper">
        <div className="reveal">
          <SectionHeader
            alert
            eyebrow={tx("Lignes rouges", "Red lines")}
            title={tx("Ce que le Lab s'interdit, par principe.", "What the Lab rules out, on principle.")}
            intro={tx(
              "Le Lab fera de la recherche, des prototypes de laboratoire, des pilotes encadrés et des transferts contrôlés vers un produit. Avec quatre limites non négociables :",
              "The Lab will do research, lab prototypes, supervised pilots and controlled transfers into a product. With four non-negotiable limits:"
            )}
          />
        </div>
        <ul className="reveal-stagger grid gap-4 md:grid-cols-2">
          {LAB_RED_LINES.map((r) => (
            <li key={r.en} className="reveal h-full">
              <div className="flex h-full gap-4 rounded-xl border border-track bg-bg-card p-6">
                <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber" strokeWidth={1.75} aria-hidden="true" />
                <p className="text-body text-fg">{r[lang]}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ═══ CINQ DIMENSIONS DE LA PREUVE (p. 6) ═══ */}
      <Section id="preuve" tone="night">
        <div className="reveal">
          <SectionHeader
            tone="dark"
            eyebrow={tx("Le plus grand défi : la preuve", "The biggest challenge: proof")}
            title={tx("Les cinq dimensions de la preuve.", "The five dimensions of proof.")}
            intro={tx(
              "Dans l'ITAD, la valeur ne vient pas seulement de l'exécution : elle vient de la capacité à prouver ce qui s'est passé. Le Lab travaillera chacune de ces cinq questions.",
              "In ITAD, value doesn't come from execution alone: it comes from being able to prove what happened. The Lab will work on each of these five questions."
            )}
          />
        </div>
        <ol className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LAB_PROOF_DIMENSIONS.map((d, i) => (
            <li key={d.key} className="reveal h-full">
              <article className="flex h-full flex-col rounded-xl border border-track bg-bg p-5">
                <p className="font-mono text-caption text-emerald">
                  {String(i + 1).padStart(2, "0")} · proof.{d.key}
                </p>
                <h3 className="mt-3 text-heading-lg text-fg">{d.name[lang]}</h3>
                <p className="mt-2 text-body-sm text-fg-strong">{d.question[lang]}</p>
                <p className="mt-auto border-t border-track pt-3 text-caption text-fg-muted">
                  <span className="sr-only">{tx("Artefact : ", "Artefact: ")}</span>
                  {d.artefact[lang]}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {/* ═══ POLITIQUE DE REFUS (p. 6) ═══ */}
      <Section id="refus" tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <SectionHeader
              eyebrow={tx("Politique de refus", "Refusal policy")}
              title={tx("Un refus documenté est une fonction de sécurité.", "A documented refusal is a security feature.")}
              intro={tx(
                "Le système devra refuser, ou dégrader son niveau de confiance, plutôt que produire une preuve fragile. Un refus documenté est une preuve de maturité, pas un échec commercial.",
                "The system will have to refuse, or lower its confidence level, rather than produce weak proof. A documented refusal is a sign of maturity, not a commercial failure."
              )}
            />
          </div>
          <div className="reveal min-w-0 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-track bg-bg-card">
              <p className="border-b border-track px-5 py-3 font-mono text-caption text-fg-muted">
                {tx("refuser si…", "refuse if…")}
              </p>
              <ul className="divide-y divide-track">
                {LAB_REFUSAL_CASES.map((c) => (
                  <li key={c.code} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <span className="flex items-center gap-3 text-body-sm text-fg">
                      <ShieldAlert className="h-4 w-4 flex-shrink-0 text-amber" strokeWidth={1.75} aria-hidden="true" />
                      {c.label[lang]}
                    </span>
                    <code className="break-all pl-7 font-mono text-caption text-fg-muted sm:pl-0">{c.code}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ═══ GOUVERNANCE DES DONNÉES (p. 7, 9) ═══ */}
      <Section id="donnees" tone="cream">
        <div className="reveal">
          <SectionHeader
            eyebrow={tx("Gouvernance des données", "Data governance")}
            title={tx("Cinq niveaux de sensibilité, un traitement par niveau.", "Five sensitivity levels, one handling rule per level.")}
            intro={tx(
              "Le Lab adoptera une architecture hybride contrôlée : chaque donnée sera classée de D0 à D4 avant tout traitement.",
              "The Lab will run a controlled hybrid architecture: every piece of data will be classified from D0 to D4 before any processing."
            )}
          />
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <ol className="reveal min-w-0 space-y-2 lg:col-span-7" aria-label={tx("Classification D0 à D4", "D0 to D4 classification")}>
            {LAB_DATA_LEVELS.map((d) => (
              <li
                key={d.level}
                className={`grid grid-cols-[3rem_1fr] items-center gap-4 rounded-lg border bg-bg px-4 py-3 sm:grid-cols-[3rem_9rem_1fr] ${d.strict ? "border-emerald/60" : "border-track"}`}
              >
                <span className={`font-mono text-heading-lg ${d.strict ? "text-emerald" : "text-fg"}`}>{d.level}</span>
                <span className="text-body-sm font-semibold text-fg">{d.name[lang]}</span>
                <span className="col-start-2 text-body-sm text-fg-strong sm:col-start-auto">
                  {d.strict && <Lock className="mr-1.5 inline h-3.5 w-3.5 text-emerald" aria-hidden="true" />}
                  {d.handling[lang]}
                </span>
              </li>
            ))}
          </ol>
          <div className="reveal min-w-0 lg:col-span-5">
            <p className="text-eyebrow uppercase text-fg-muted">{tx("Chaîne obligatoire pour toute donnée", "Mandatory path for all data")}</p>
            <ol className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-caption">
              {LAB_PIPELINE.map((s, i) => (
                <li key={s.en} className="inline-flex items-center gap-1">
                  <span className="rounded-md border border-track bg-bg px-2 py-1 text-fg">{s[lang]}</span>
                  {i < LAB_PIPELINE.length - 1 && (
                    <span className="text-fg-muted" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <ul className="mt-8 space-y-3">
              {LAB_HYBRID_PRINCIPLES.map((p) => (
                <li key={p.en} className="flex gap-3 text-body-sm text-fg-strong">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald" aria-hidden="true" />
                  {p[lang]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ═══ GOUVERNANCE IA (p. 11) ═══ */}
      <Section id="ia" tone="paper">
        <div className="reveal">
          <SectionHeader
            eyebrow={tx("Gouvernance de l'IA", "AI governance")}
            title={tx("L'humain dans la boucle : cinq règles.", "Human in the loop: five rules.")}
            intro={tx(
              "Les agents IA du Lab ne seront pas une armée autonome : ce sera une chaîne d'assistance supervisée, qui accélère la rédaction, les tests et l'analyse sans retirer la validation humaine.",
              "The Lab's AI agents will not be an autonomous army: they will be a supervised assistance chain that speeds up writing, testing and analysis without removing human sign-off."
            )}
          />
        </div>
        <ol className="reveal-stagger grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {LAB_AI_RULES.map((r, i) => (
            <li key={r.title.en} className="reveal h-full">
              <article className="flex h-full flex-col rounded-xl border border-track bg-bg-card p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-dim text-emerald">
                    <Bot className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-caption text-fg-muted">
                    {tx("Règle", "Rule")} {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-heading-md text-fg">{r.title[lang]}</h3>
                <p className="mt-2 text-body-sm text-fg-strong">{r.body[lang]}</p>
              </article>
            </li>
          ))}
        </ol>
      </Section>

      {/* ═══ PROGRAMMES GTCL-01 … 08 (p. 12–14) ═══ */}
      <Section id="programmes" tone="night">
        <div className="reveal">
          <SectionHeader
            tone="dark"
            eyebrow={tx("Feuille de route de recherche", "Research roadmap")}
            title={tx("Huit programmes, tous en recherche.", "Eight programmes, all in research.")}
            intro={tx(
              "Premier chantier : GTCL Proof, qui réunira inventaire du support, décision documentée, procédure contrôlée, journal d'événements, rapport signé, vérificateur indépendant et limites explicites. Aucun de ces programmes n'est une fonctionnalité de la plateforme aujourd'hui.",
              "First workstream: GTCL Proof, bringing together media inventory, documented decision, controlled procedure, event log, signed report, independent verifier and explicit limits. None of these programmes is a platform feature today."
            )}
          />
        </div>
        <ul className="reveal-stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LAB_PROGRAMMES.map((p) => (
            <li key={p.id} className="reveal h-full">
              <article className="flex h-full flex-col rounded-xl border border-track bg-bg p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-body-sm text-emerald">{p.id}</span>
                  <Tag variant="alert" icon={<FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />}>
                    {inResearch}
                  </Tag>
                </div>
                <h3 className="mt-4 text-heading-md text-fg">{p.name[lang]}</h3>
                <p className="mt-2 text-body-sm text-fg-strong">{p.summary[lang]}</p>
              </article>
            </li>
          ))}
        </ul>
        <div className="reveal mt-10 rounded-xl border border-track bg-bg p-5">
          <p className="text-eyebrow uppercase text-fg-muted">{tx("Même discipline pour chaque programme", "Same discipline for every programme")}</p>
          <ol className="mt-3 flex flex-wrap gap-2">
            {LAB_METHOD.map((m, i) => (
              <li key={m.en} className="rounded-md border border-track px-3 py-1.5 text-body-sm text-fg">
                <span className="mr-2 font-mono text-caption text-fg-muted">{i + 1}</span>
                {m[lang]}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ═══ PROGRAMMES PILOTES PAR SECTEUR (correction utilisateur 2026-10-04 : appel aux futurs clients) ═══ */}
      <Section id="pilotes" tone="forest">
        <div className="fx-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <div className="reveal">
            <Tag variant="brand" icon={<Users className="h-3.5 w-3.5" aria-hidden="true" />}>
              {tx("Programmes pilotes", "Pilot programmes")}
            </Tag>
            <h2 className="mt-6 max-w-[24ch] text-display-md text-fg">
              {tx("Rejoignez nos programmes pilotes.", "Join our pilot programmes.")}
            </h2>
            <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">
              {tx(
                "Le Lab cherche des organisations prêtes à tester ses programmes de recherche sur un périmètre borné, avec des critères de succès définis d'avance. Pour chaque secteur, voici les programmes qui pourraient s'appliquer : ce sont des pistes de pilote, pas des résultats.",
                "The Lab is looking for organisations ready to test its research programmes on a bounded scope, with success criteria set upfront. For each sector, here are the programmes that could apply: these are pilot leads, not results."
              )}
            </p>
          </div>
          <ul className="reveal-stagger mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...SECTORS]
              .sort((x, y) => x.number - y.number)
              .map((sector) => {
                const pilot = LAB_SECTOR_PILOTS.find((p) => p.slug === sector.slug);
                if (!pilot) return null;
                const name = getSectorName(locale, sector.slug);
                return (
                  <li key={sector.slug} className="reveal h-full">
                    <article className="flex h-full flex-col rounded-xl border border-track bg-bg-card p-5">
                      <div className="flex items-center gap-3">
                        <Pictogram icon={sector.icon} />
                        <h3 className="text-heading-md text-fg">{name}</h3>
                      </div>
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={tx("Programmes concernés", "Relevant programmes")}>
                        {pilot.programmes.map((id) => (
                          <li key={id} className="rounded-md border border-track px-2 py-0.5 font-mono text-caption text-emerald">
                            {id}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 flex-1 text-body-sm text-fg-strong">{pilot.why[lang]}</p>
                      <TextLink href={`/contact?sujet=lab&secteur=${sector.slug}`} className="mt-4">
                        <span>
                          {tx("Candidater au pilote", "Apply for the pilot")}
                          <span className="sr-only"> · {name}</span>
                        </span>
                      </TextLink>
                    </article>
                  </li>
                );
              })}
          </ul>
          <div className="reveal mt-10 flex flex-col gap-4 rounded-xl border border-track bg-bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[65ch] text-body-sm text-fg-strong">
              {tx(
                "Votre secteur n'est pas listé, ou vous voulez discuter d'un programme précis ? Écrivez au Lab.",
                "Your sector isn't listed, or you want to discuss a specific programme? Write to the Lab."
              )}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact?sujet=lab" size="md">
                {tx("Contacter le Lab", "Contact the Lab")}
              </ButtonLink>
              {labMail && (
                <ButtonLink href={labMail} variant="secondary" size="md" arrow={false}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {EMAILS.lab}
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
