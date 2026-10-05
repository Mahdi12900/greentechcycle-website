"use client";

import { KPIS, formatKpi, formatKpiValue } from "@/content/kpis";
import GeometryField from "@/components/visuals/GeometryField";
import LifecycleDiagram from "@/components/visuals/LifecycleDiagram";
import MediaSlot from "@/components/visuals/MediaSlot";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

import {
  ArrowDown,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  RefreshCcw,
  Recycle,
  Shield,
  Cpu,
  FileCheck,
  Users,
} from "lucide-react";
import CertificationStrip from "@/components/CertificationStrip";
import CtaSection from "@/components/CtaSection";
import { ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Pictogram from "@/components/ui/Pictogram";
import Tag from "@/components/ui/Tag";

/* ─────────────────────────────────────────────────────────────────────────────
   /services — DESIGN.md §10.7 : hero split paper, CertificationStrip, grille
   régulière 2×3, citation forest, pilote + conversion fusionnés en un CTA.
───────────────────────────────────────────────────────────────────────────── */

type ServiceCard = {
  slug: string;
  href: string;
  num: string;
  eyebrow: string;
  title: string;
  pitch: string;
  body: string;
  badge: string;
  icon: typeof ClipboardList;
  image: string;
  imageAlt: string;
  bookLabel: string;
  proof: { value: string; unit?: string; label: string }[];
  pricingNote?: string;
  pricingHref?: string;
};

export default function ServicesPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const lang = isEn ? "en" : "fr";
  function tx<T>(fr: T, en: T): T {
    return isEn ? en : fr;
  }

  const services: ServiceCard[] = [
    {
      slug: "audit-inventaire",
      href: "/services/audit-inventaire",
      num: "01",
      eyebrow: tx("Cartographier", "Mapping"),
      title: tx("Audit et inventaire IT", "IT audit and inventory"),
      pitch: tx(
        "Avant de décider, il faut voir clair.",
        "Before deciding, see clearly."
      ),
      body: tx(
        "Nos techniciens passent sur site, scannent, photographient et qualifient chaque actif. Vous repartez avec un référentiel signé, une notation à trois axes et une estimation chiffrée de la valeur résiduelle. Cinq jours, pas un de plus.",
        "Our technicians come on site, scan, photograph and qualify every asset. You leave with a signed reference, three-axis scoring and a quantified residual value. Five days, not one more."
      ),
      badge: tx("Livré en 5 jours", "Delivered in 5 days"),
      icon: ClipboardList,
      image: "/photos/service-audit.jpg",
      imageAlt: tx(
        "Audit physique d'un parc IT par GreenTechCycle",
        "Physical IT estate audit by GreenTechCycle"
      ),
      bookLabel: tx("Réserver un audit", "Book an audit"),
      proof: [
        { value: "5", unit: tx("jours", "days"), label: tx("livrable garanti", "guaranteed delivery") },
        { value: "99,2", unit: "%", label: tx("précision moyenne", "average accuracy") },
      ],
    },
    {
      slug: "effacement-securise",
      href: "/services/effacement-securise",
      num: "02",
      eyebrow: tx("Sécuriser", "Securing"),
      title: tx("Effacement sécurisé", "Secure data erasure"),
      pitch: tx(
        "Ce n'est pas la machine qui inquiète, ce sont les fichiers.",
        "It isn't the machine that worries you, it's the files."
      ),
      body: tx(
        "NIST 800-88, DoD 5220.22-M, IEEE 2883-2022 selon le support et la sensibilité. Chaque actif reçoit un certificat individuel horodaté (empreinte SHA-256), archivé dix ans. Un audit interne est déclenché sur chaque lot, pas besoin de vérifier seul.",
        "NIST 800-88, DoD 5220.22-M, IEEE 2883-2022 depending on the medium and sensitivity. Every asset gets a timestamped individual certificate (SHA-256 fingerprint), archived ten years. An internal audit is triggered on every batch, no need to check alone."
      ),
      badge: tx("Certificat sous 24 h", "Certificate within 24h"),
      icon: ShieldCheck,
      image: "/photos/service-effacement.jpg",
      imageAlt: tx(
        "Effacement de disques selon NIST 800-88 en zone sécurisée",
        "Disk erasure to NIST 800-88 in a secure zone"
      ),
      bookLabel: tx("Réserver une mission", "Book a mission"),
      proof: [
        { value: "24", unit: "h", label: tx("certificat délivré", "certificate delivered") },
        { value: "99,97", unit: "%", label: tx("réussite mesurée", "measured success rate") },
      ],
      pricingNote: tx("À partir de 19 € HT/poste", "From €19 ex-VAT/device"),
      pricingHref: "/tarifs",
    },
    {
      slug: "reconditionnement-valorisation",
      href: "/services/reconditionnement-valorisation",
      num: "03",
      eyebrow: tx("Valoriser", "Recovering"),
      title: tx("Reconditionnement et valorisation", "Refurbishment and recovery"),
      pitch: tx(
        "Un poste de quatre ans n'est pas un déchet, c'est un budget mal lu.",
        "A four-year-old laptop isn't waste, it's a misread budget."
      ),
      body: tx(
        "Diagnostic, remise en état, notation A/B/C, revente entre professionnels, boutique interne ou cession solidaire. La part de valeur résiduelle reversée est fixée contractuellement, pas de mauvaise surprise au bilan.",
        "Diagnostic, restoration, A/B/C grading, business resale, internal store or charitable transfer. The share of residual value returned is contractually fixed, no surprise at year end."
      ),
      badge: tx("+40 % de valeur récupérée", "+40% recovered value"),
      icon: RefreshCcw,
      image: "/photos/service-reconditionnement.jpg",
      imageAlt: tx(
        "Atelier de reconditionnement d'ordinateurs portables",
        "Laptop refurbishment workshop"
      ),
      bookLabel: tx("Réserver une cession", "Book a transfer"),
      proof: [
        { value: "+40", unit: "%", label: tx("valeur récupérée", "recovered value") },
        { value: String(KPIS.reuse.value), unit: "%", label: tx("taux de réemploi", "reuse rate") },
      ],
      pricingNote: tx("À partir de 19 € HT/poste", "From €19 ex-VAT/device"),
      pricingHref: "/tarifs",
    },
    {
      slug: "recyclage-deee",
      href: "/services/recyclage-deee",
      num: "04",
      eyebrow: tx("Recycler", "Recycling"),
      title: tx("Recyclage responsable des DEEE", "Responsible WEEE recycling"),
      pitch: tx(
        "Pour ce qui ne peut plus servir, la rigueur du bordereau.",
        "For what can no longer serve, the rigour of the slip."
      ),
      body: tx(
        "Conformité DEEE et REP intégrale, traçabilité matière par matière, bilan carbone évité calculé automatiquement. Les exports ESRS E5 alimentent votre rapport CSRD sans aucune ressaisie.",
        "Full WEEE and EPR compliance, material-by-material traceability, automatically computed avoided carbon. ESRS E5 exports feed your CSRD report with zero re-entry."
      ),
      badge: tx("100 % traçable", "100% traceable"),
      icon: Recycle,
      image:
        "/photos/tech-datacenter.jpg",
      imageAlt: tx(
        "Carte électronique en gros plan prête au démantèlement DEEE",
        "Close-up of an electronic board ready for WEEE dismantling"
      ),
      bookLabel: tx("Réserver une collecte", "Book a collection"),
      proof: [
        { value: "98,1", unit: "%", label: tx("matière valorisée", "material recovery") },
        { value: "0", unit: "%", label: tx("mise en décharge", "landfill rate") },
      ],
      pricingNote: tx("À partir de 19 € HT/poste", "From €19 ex-VAT/device"),
      pricingHref: "/tarifs",
    },
    {
      slug: "cybersecurite-itad",
      href: "/services/cybersecurite",
      num: "05",
      eyebrow: tx("Protéger", "Protecting"),
      title: tx("Cybersécurité ITAD", "ITAD cybersecurity"),
      pitch: tx(
        "Si la donnée fuit en chemin, c'est votre nom qui apparaît.",
        "If data leaks in transit, it's your name that hits the press."
      ),
      body: tx(
        "Procès-verbal d'huissier, scellés numérotés, suivi GPS, vidéosurveillance archivée dix ans, registre horodaté chaîné (SHA-256). Huit contrôles imbriqués, un dossier opposable devant un tribunal.",
        "Bailiff report, numbered seals, GPS tracking, video surveillance archived ten years, timestamped chained register (SHA-256). Eight interlocked controls, a court-admissible dossier."
      ),
      badge: tx("Niveau Défense", "Defence-grade"),
      icon: Shield,
      image:
        "/photos/hp-atelier-itad.jpg",
      imageAlt: tx(
        "Console cryptographique de supervision cybersécurité",
        "Cryptographic supervision console for cybersecurity"
      ),
      bookLabel: tx("Réserver un audit sécurité", "Book a security review"),
      proof: [
        { value: "100", unit: "%", label: tx("intervenants vérifiés", "verified operators") },
        { value: "10", unit: tx("ans", "yrs"), label: tx("archivage des preuves", "evidence archival") },
      ],
    },
    {
      slug: "wakibox",
      href: "/services/wakibox",
      num: "06",
      eyebrow: tx("Collecter", "Collecting"),
      title: "WakiBox",
      pitch: tx(
        "Une borne dans le hall, et la collecte se fait toute seule.",
        "A kiosk in the lobby, and collection happens on its own."
      ),
      body: tx(
        "Détection automatique par RFID, pesée intégrée, alerte de remplissage en temps réel, animation interne entre services. Trois fois plus efficace qu'un bac passif.",
        "Automatic RFID detection, integrated weighing, real-time fill alerts, friendly engagement between teams. Three times more effective than a passive bin."
      ),
      badge: tx("Supervision temps réel", "Real-time monitoring"),
      icon: Cpu,
      image: "/photos/service-wakibox.jpg",
      imageAlt: tx(
        "Borne WakiBox de collecte connectée",
        "WakiBox connected collection kiosk"
      ),
      bookLabel: tx("Réserver une démonstration", "Book a demo"),
      proof: [
        { value: "x3", label: tx("vs bacs passifs", "vs passive bins") },
        { value: "99,5", unit: "%", label: tx("disponibilité borne", "kiosk uptime") },
      ],
      pricingNote: tx("À partir de 39 € HT/mois", "From €39 ex-VAT/month"),
      pricingHref: "/tarifs",
    },
  ];

  const heroFigures = [
    // Registre unique src/content/kpis.ts
    { v: formatKpi("assets", lang), l: KPIS.assets.label[lang] },
    { v: formatKpiValue("carbon", lang), unit: "tCO₂e", l: KPIS.carbon.label[lang] },
    { v: "72 h", l: tx("réponse audit garantie", "guaranteed audit response") },
  ];

  const singleContact = [
    {
      icon: FileCheck,
      title: tx("Un seul contrat", "A single contract"),
      body: tx(
        "Cadre légal unique, prix unique, responsabilité unique. Les avenants tiennent en deux pages.",
        "Single legal framework, single price, single responsibility. Amendments fit on two pages."
      ),
    },
    {
      icon: ShieldCheck,
      title: tx("Une seule preuve", "A single proof"),
      body: tx(
        "Le bordereau de collecte, le certificat d'effacement et le rapport CSRD partagent la même empreinte.",
        "The collection slip, erasure certificate and CSRD report share the same footprint."
      ),
    },
    {
      icon: Users,
      title: tx("Une équipe nommée", "A named team"),
      body: tx(
        "Trois interlocuteurs habilités : ingénieur d'affaires, chef de projet, référent RSSI. Pas de standard.",
        "Three named experts: account engineer, project lead, CISO contact. No call centre."
      ),
    },
  ];

  return (
    <div>
      {/* ═══════════ HERO split (paper) — l'ancien bandeau d'urgence devient une notice ═══════════ */}
      <section className="bg-bg py-12 lg:py-16" aria-labelledby="services-hero-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="reveal min-w-0 lg:col-span-7">
              <Tag variant="brand">
                {tx(
                  "Six services intégrés, un seul interlocuteur, une chaîne de preuves opposable",
                  "Six integrated services, one point of contact, an admissible evidence chain"
                )}
              </Tag>
              <p className="mt-6 text-eyebrow uppercase text-fg-muted">{tx("Six services, une seule chaîne", "Six services, one chain")}</p>
              <h1 id="services-hero-title" className="mt-3 max-w-[20ch] text-display-lg text-fg">
                {tx(
                  <>
                    L&apos;ITAD n&apos;est pas un produit. <br className="hidden sm:block" />
                    C&apos;est une chaîne de preuves.
                  </>,
                  <>
                    ITAD is not a product. <br className="hidden sm:block" />
                    It is a chain of evidence.
                  </>
                )}
              </h1>
              <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">
                {tx(
                  "Audit, effacement, reconditionnement, recyclage, sécurité, collecte connectée. Six métiers, un seul interlocuteur, une seule donnée, versée jour après jour à votre rapport CSRD et à votre dossier RSSI.",
                  "Audit, erasure, refurbishment, recycling, security, connected collection. Six trades, one point of contact, one dataset, fed day after day into your CSRD report and your CISO file."
                )}
              </p>
              <dl className="mt-8 grid max-w-[560px] grid-cols-3 border-y border-track py-6">
                {heroFigures.map((item, i) => (
                  <div key={i} className={`flex flex-col-reverse justify-end ${i > 0 ? "border-l border-track pl-4" : "pr-4"}`}>
                    <dt className="mt-1 text-caption text-fg-muted">{item.l}</dt>
                    <dd className="font-display text-display-sm tabular-nums text-emerald">
                      {item.v}
                      {item.unit && <span className="ml-1 font-sans text-body-sm text-fg-strong">{item.unit}</span>}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/reserver" size="lg">
                  {tx("Réserver un créneau", "Book a slot")}
                </ButtonLink>
                <ButtonLink href="/cas-usages" variant="secondary" size="lg">
                  {tx("Voir les cas clients", "See client cases")}
                </ButtonLink>
              </div>
              <a
                href="#services-grille"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-caption font-medium uppercase tracking-[0.12em] text-fg-muted hover:text-fg"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
                {tx("Découvrir les six métiers", "Discover the six trades")}
              </a>
            </div>
            <div className="reveal lg:col-span-5">
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-track">
                  <MediaSlot fill id="services-hero" alt={tx(
                      "Atelier ITAD GreenTechCycle : équipe en intervention sur du matériel informatique",
                      "GreenTechCycle ITAD workshop, team operating on IT equipment"
                    )} fallback={<LifecycleDiagram />} />
                </div>
                <figcaption className="mt-6 border-l-2 border-emerald pl-4">
                  <p className="text-body-sm text-fg">
                    {tx(
                      "« Six prestataires devenus un seul. Notre comité d'audit a soufflé. »",
                      "« Six vendors became one. Our audit committee finally exhaled. »"
                    )}
                  </p>
                  <p className="mt-2 text-caption text-fg-muted">
                    <span className="font-semibold text-fg-strong">Sophie L.</span> · {tx("DSI, groupe industriel coté", "CIO, listed industrial group")}
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
          <CertificationStrip className="mt-12 border-t border-track pt-6" />
        </div>
      </section>

      {/* ═══════════ GRILLE 6 SERVICES (2 × 3 régulière) ═══════════ */}
      <section id="services-grille" className="border-t border-track bg-bg-card py-12 lg:py-16" aria-labelledby="services-grille-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <SectionHeader
              id="services-grille-title"
              eyebrow={tx("Six métiers", "Six trades")}
              title={tx("Audit, effacement, valorisation, recyclage, sécurité, collecte.", "Audit, erasure, recovery, recycling, security, collection.")}
            />
          </div>
          <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.slug} className="reveal h-full">
                  <article
                    id={`service-${s.slug}`}
                    aria-labelledby={`service-title-${s.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-track bg-bg"
                  >
                    <div className="relative aspect-[16/10] border-b border-track">
                      <MediaSlot fill id={`services-${s.slug}`} alt={s.imageAlt} fallback={<GeometryField icon={s.icon} />} />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 text-eyebrow uppercase text-fg-muted">
                          <Icon className="h-4 w-4 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                          {s.num} · {s.eyebrow}
                        </span>
                        <Tag variant="brand">{s.badge}</Tag>
                      </div>
                      <h2 id={`service-title-${s.slug}`} className="mt-4 font-sans text-heading-lg text-fg">
                        {s.title}
                      </h2>
                      <p className="mt-2 text-body-sm italic text-fg">{s.pitch}</p>
                      <p className="mt-3 flex-1 text-body-sm text-fg-strong">{s.body}</p>
                      <dl className="mt-6 grid grid-cols-2 border-t border-track pt-4">
                        {s.proof.map((p, j) => (
                          <div key={j} className={`flex flex-col-reverse justify-end ${j > 0 ? "border-l border-track pl-4" : "pr-4"}`}>
                            <dt className="text-caption text-fg-muted">{p.label}</dt>
                            <dd className="font-display text-display-sm tabular-nums text-emerald">
                              {p.value}
                              {p.unit && <span className="ml-1 font-sans text-body-sm text-fg-strong">{p.unit}</span>}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      {s.pricingNote && (
                        <p className="mt-4 text-body-sm">
                          <span className="font-semibold tabular-nums text-emerald">{s.pricingNote}</span>{" "}
                          <Link href={s.pricingHref ?? "/tarifs"} className="text-emerald underline underline-offset-4 hover:text-emerald-hover">
                            {tx("Voir les tarifs", "View pricing")}
                          </Link>
                        </p>
                      )}
                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <ButtonLink href={`/reserver?offre=${s.slug}`} variant="secondary">
                          {s.bookLabel}
                        </ButtonLink>
                        <Link href={s.href} className="group inline-flex min-h-[44px] items-center gap-1 text-body-sm font-medium text-emerald hover:text-emerald-hover">
                          {tx("Lire la fiche complète", "Read the full sheet")}
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CITATION (forest) ═══════════ */}
      <Section tone="forest">
        <div className="reveal">
          <figure className="max-w-[65ch]">
            <p className="text-eyebrow uppercase text-fg-muted">{tx("Témoignage RSSI", "CISO testimonial")}</p>
            <blockquote className="mt-4 font-display text-display-sm text-fg">
              {tx(
                "« GreenTechCycle a transformé notre ITAD en ligne de défense. Quand l'inspection ACPR est arrivée, j'ai posé un seul PDF sur la table. Quinze minutes plus tard, le sujet était clos. »",
                "« GreenTechCycle turned our ITAD into a line of defence. When the regulatory inspection arrived, I put a single PDF on the table. Fifteen minutes later, the topic was closed. »"
              )}
            </blockquote>
            <figcaption className="mt-6 text-caption text-fg-muted">
              <span className="font-semibold text-fg">Marc B.</span> · {tx("RSSI, banque CAC 40", "CISO, CAC 40 bank")}
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ═══════════ POURQUOI UN INTERLOCUTEUR UNIQUE ═══════════ */}
      <Section tone="paper">
        <div className="reveal">
          <SectionHeader
            eyebrow={tx("Pourquoi un seul interlocuteur change tout", "Why a single point of contact changes everything")}
            title={tx(
              "Six prestataires éparpillés, c'est six dossiers à recoller au moindre audit.",
              "Six scattered vendors means six dossiers to reassemble at the slightest audit."
            )}
            intro={tx(
              "La plupart de nos clients arrivaient avec un assemblage hérité : un transporteur ici, un broyeur là, un brocanteur de matériel reconditionné, un cabinet pour le rapport carbone. Quand l'autorité demande la chaîne complète, plus personne n'arrive à recoller les bordereaux. GreenTechCycle a été conçu pour produire une preuve unique, la même donnée nourrit la console DSI, le dossier RSSI et le rapport CSRD.",
              "Most of our clients arrived with an inherited patchwork: a carrier here, a shredder there, a refurbished hardware reseller, an external firm for the carbon report. When the regulator asks for the full chain, nobody can put the slips back together. GreenTechCycle was built to produce a single proof, the same data feeds the CIO console, the CISO file and the CSRD report."
            )}
          />
        </div>
        <div className="reveal-stagger grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {singleContact.map((b) => (
            <div key={b.title} className="reveal h-full">
              <div className="h-full rounded-xl border border-track bg-bg p-6">
                <Pictogram icon={b.icon} />
                <h3 className="mt-4 text-heading-md text-fg">{b.title}</h3>
                <p className="mt-2 text-body-sm text-fg-strong">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ═══════════ CTA UNIQUE (S2b pilote + S6 conversion fusionnés) ═══════════ */}
      <CtaSection
        eyebrow={tx("Passer à l'action", "Take the next step")}
        title={tx(
          "Trente minutes avec un expert senior. Un plan d'action chiffré sous 48 heures.",
          "Thirty minutes with a senior expert. A quoted action plan within 48 hours."
        )}
        subtitle={tx(
          "Pas d'appel commercial scripté, pas de questionnaire en ligne. Un échange direct avec un ingénieur qui a déjà piloté une mission équivalente, banque, santé, distribution, industrie ou administration.",
          "No scripted sales call, no online form maze. A direct conversation with an engineer who has already run an equivalent mission, banking, healthcare, retail, industry or public administration."
        )}
        primaryLabel={tx("Réserver un créneau", "Book a slot")}
        primaryHref="/reserver"
        secondaryLabel={tx("Réserver le Pilote 3 jours", "Book the 3-day Pilot")}
        secondaryHref="/reserver?offre=pilote-audit-3j"
        reassurance={[
          tx("Réponse sous 24 heures ouvrées", "Response within 24 business hours"),
          tx("NDA signé sur demande", "NDA signed on request"),
          tx("Aucun engagement", "No commitment"),
        ].join(" · ")}
        footnote={
          <div className="mx-auto max-w-[65ch]">
            <p>
              <span className="font-semibold text-fg">
                {tx("Pilote GTC - Audit & démarrage 3 jours", "GTC Pilot - Audit & 3-day kickoff")} · {tx("2 900 € HT / 3 jours", "€2,900 ex-VAT / 3 days")}
              </span>{" "}
              {tx(
                "Diagnostic parc IT, plan ITAD priorisé et démarrage Plateforme. Mission senior conduite par notre équipe ITAM, carbone et cyber. Pilote remboursé sur la 1re année de Plateforme si signature dans les 90 jours après la restitution.",
                "IT fleet diagnostic, prioritised ITAD action plan and Platform kickoff. Senior engagement by our ITAM, carbon and cyber team. Pilot refunded on Year 1 Platform subscription if signed within 90 days of debrief."
              )}
            </p>
            <p className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/tarifs#pilote" className="font-medium text-emerald hover:text-fg">
                {tx("Détails et garantie remboursement", "Details and refund guarantee")} →
              </Link>
              <Link href="/cas-usages" className="font-medium text-emerald hover:text-fg">
                {tx("Voir les cas clients", "See client cases")} →
              </Link>
            </p>
          </div>
        }
      />
    </div>
  );
}
