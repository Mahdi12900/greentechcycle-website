"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUpRight,
  ClipboardList,
  ShieldCheck,
  RefreshCcw,
  Recycle,
  Shield,
  Cpu,
  CheckCircle2,
  Quote,
  Award,
  FileCheck,
  Leaf,
  Users,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   /services, page hub éditoriale premium
   Inspiration directe : home + cas-usages (refonte 2026).
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
  accent: string;
  pricingNote?: string;
  pricingHref?: string;
};

export default function ServicesPage() {
  const locale = useLocale();
  const isEn = locale === "en";
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
      accent: "#10B981",
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
        "NIST 800-88, DoD 5220.22-M, IEEE 2883-2022 selon le support et la sensibilité. Chaque actif reçoit un certificat individuel signé eIDAS, archivé dix ans. Un audit interne est déclenché sur chaque lot, pas besoin de vérifier seul.",
        "NIST 800-88, DoD 5220.22-M, IEEE 2883-2022 depending on the medium and sensitivity. Every asset gets an eIDAS-signed individual certificate, archived ten years. An internal audit is triggered on every batch, no need to check alone."
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
      accent: "#0EA5E9",
      pricingNote: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
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
        { value: "72", unit: "%", label: tx("taux de réemploi", "reuse rate") },
      ],
      accent: "#F59E0B",
      pricingNote: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
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
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      imageAlt: tx(
        "Carte électronique en gros plan prête au démantèlement DEEE",
        "Close-up of an electronic board ready for WEEE dismantling"
      ),
      bookLabel: tx("Réserver une collecte", "Book a collection"),
      proof: [
        { value: "98,1", unit: "%", label: tx("matière valorisée", "material recovery") },
        { value: "0", unit: "%", label: tx("mise en décharge", "landfill rate") },
      ],
      accent: "#10B981",
      pricingNote: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
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
        "Procès-verbal d'huissier, scellés numérotés, suivi GPS, vidéosurveillance archivée dix ans, registre signé eIDAS. Huit contrôles imbriqués, un dossier opposable devant un tribunal.",
        "Bailiff report, numbered seals, GPS tracking, video surveillance archived ten years, eIDAS-signed register. Eight interlocked controls, a court-admissible dossier."
      ),
      badge: tx("Niveau Défense", "Defence-grade"),
      icon: Shield,
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      imageAlt: tx(
        "Console cryptographique de supervision cybersécurité",
        "Cryptographic supervision console for cybersecurity"
      ),
      bookLabel: tx("Réserver un audit sécurité", "Book a security review"),
      proof: [
        { value: "100", unit: "%", label: tx("intervenants vérifiés", "verified operators") },
        { value: "10", unit: tx("ans", "yrs"), label: tx("archivage des preuves", "evidence archival") },
      ],
      accent: "#0EA5E9",
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
      accent: "#F59E0B",
      pricingNote: tx("À partir de 39 € HT/mois", "From €39 ex-VAT/month"),
      pricingHref: "/tarifs",
    },
  ];

  const heroFigures = [
    { v: "38 000+", l: tx("certificats NIST 800-88 émis", "NIST 800-88 certificates issued"), color: "#10B981" },
    { v: "6 200", unit: "tCO₂e", l: tx("évitées en quatre ans", "avoided in four years"), color: "#0EA5E9" },
    { v: "72 h", l: tx("réponse audit garantie", "guaranteed audit response"), color: "#F59E0B" },
  ];

  const trustBadges = [
    { icon: Award, label: "R2v3" },
    { icon: ShieldCheck, label: "ISO 27001" },
    { icon: Leaf, label: "ISO 14001" },
    { icon: FileCheck, label: "NIST 800-88" },
    { icon: Shield, label: "eIDAS" },
  ];

  return (
    <main className="overflow-hidden bg-white">

      {/* Bandeau d'urgence */}
      <div className="bg-[#0F172A] text-white py-3 px-4 border-b border-white/5">
        <div className="container mx-auto flex items-center justify-center gap-3 text-sm font-medium text-center">
          <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#10B981]" aria-hidden="true" />
          <p className="text-xs leading-snug text-gray-300">
            {tx(
              <>
                <span className="font-semibold text-white">Six services intégrés</span>, un seul interlocuteur, {" "}
                <span className="font-semibold text-white">une chaîne de preuves opposable</span>
              </>,
              <>
                <span className="font-semibold text-white">Six integrated services</span>, one point of contact, {" "}
                <span className="font-semibold text-white">an admissible evidence chain</span>
              </>
            )}
          </p>
          <Link
            href="/reserver"
            className="hidden sm:inline-flex items-center gap-1 text-[#10B981] hover:text-[#34D399] font-semibold text-xs transition-colors"
          >
            {tx("Réserver", "Book")} <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S1 (HERO ÉDITORIAL) split sombre, content gauche, photo droite
         ════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full min-h-[88vh] flex flex-col lg:flex-row overflow-hidden bg-[#0F172A]"
        aria-labelledby="services-hero-title"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 12% 18%, rgba(16,185,129,0.18) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 88% 88%, rgba(14,165,233,0.12) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-16 lg:py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-[11px] font-semibold tracking-[0.1em] text-gray-400 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                  style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
                />
                {tx("Six services, une seule chaîne", "Six services, one chain")}
              </span>
            </div>

            <h1
              id="services-hero-title"
              className="text-white font-black tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.75rem)", lineHeight: 1.02 }}
            >
              {tx(
                <>L'ITAD n'est pas <span className="text-[#10B981]">un produit</span>.<br/>C'est une chaîne de preuves.</>,
                <>ITAD is not <span className="text-[#10B981]">a product</span>.<br/>It is a chain of evidence.</>
              )}
            </h1>

            <p className="text-gray-300 text-base lg:text-[1.12rem] leading-[1.72] max-w-xl mb-10">
              {tx(
                "Audit, effacement, reconditionnement, recyclage, sécurité, collecte connectée. Six métiers, un seul interlocuteur, une seule donnée, versée jour après jour à votre rapport CSRD et à votre dossier RSSI.",
                "Audit, erasure, refurbishment, recycling, security, connected collection. Six trades, one point of contact, one dataset, fed day after day into your CSRD report and your CISO file."
              )}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 pb-10 border-b border-white/8">
              {heroFigures.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span
                    className="text-3xl lg:text-4xl font-black tracking-tight leading-none tabular-nums"
                    style={{ color: item.color }}
                  >
                    {item.v}
                    {item.unit && (
                      <span className="text-base ml-1 font-semibold opacity-80">
                        {item.unit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 mt-1.5 font-medium">{item.l}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/reserver"
                className="inline-flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-7 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
              >
                {tx("Réserver un créneau", "Book a slot")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/cas-usages"
                className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 text-white border border-white/20 hover:border-white/35 font-semibold px-7 py-4 rounded-xl transition-all duration-300 text-sm"
              >
                {tx("Voir les cas clients", "See client cases")}
              </Link>
            </div>

            <a
              href="#services-grille"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-300 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors group"
            >
              <ArrowDown
                className="h-4 w-4 transition-transform group-hover:translate-y-1"
                aria-hidden="true"
              />
              {tx("Découvrir les six métiers", "Discover the six trades")}
            </a>
          </FadeIn>
        </div>

        <div className="relative w-full lg:w-[45%] min-h-[52vh] lg:min-h-0 overflow-hidden flex-shrink-0">
          <Image
            src="/photos/hp-atelier-itad.jpg"
            alt={tx(
              "Atelier ITAD GreenTechCycle : équipe en intervention sur du matériel informatique",
              "GreenTechCycle ITAD workshop, team operating on IT equipment"
            )}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/85 via-[#0F172A]/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0F172A]/55 to-transparent" />

          {/* Floating quote card */}
          <div className="absolute bottom-8 right-5 sm:right-8 max-w-[280px] bg-white/96 backdrop-blur-lg rounded-2xl p-5 shadow-2xl ring-1 ring-gray-100 hidden sm:block">
            <Quote className="h-6 w-6 text-[#0EA5E9] mb-3" aria-hidden="true" />
            <p className="text-[12px] text-[#0F172A] leading-snug font-medium mb-3">
              {tx(
                "« Six prestataires devenus un seul. Notre comité d'audit a soufflé. »",
                "« Six vendors became one. Our audit committee finally exhaled. »"
              )}
            </p>
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <div className="w-7 h-7 rounded-full bg-[#0EA5E9]/12 flex items-center justify-center flex-shrink-0">
                <Users className="h-3.5 w-3.5 text-[#0EA5E9]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#0F172A] leading-none">Sophie L.</p>
                <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">
                  {tx("DSI, groupe industriel coté", "CIO, listed industrial group")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2 (BANDEAU CERTIFICATIONS) fond #0F172A
         ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0F172A] py-10 border-t border-white/5">
        <div className="container mx-auto px-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 text-center mb-6">
            {tx("Certifications et référentiels appliqués", "Applied certifications and frameworks")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                <Icon className="h-4 w-4 text-[#6EE7B7]" aria-hidden="true" />
                <span className="text-xs font-semibold tracking-wide">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S2b (PILOTE GTC — PORTE D'ENTRÉE SENIOR 3 JOURS)
         ════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F8FAFC] py-12 lg:py-14 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-6xl mx-auto rounded-2xl bg-white border border-[#10B981]/30 shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#10B981]/15 flex items-center justify-center">
                <ClipboardList className="h-6 w-6 text-[#10B981]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="inline-flex px-2.5 py-1 rounded-full bg-[#10B981]/12 text-[#047857] text-[10px] font-bold uppercase tracking-wider">
                    {tx("Porte d'entrée senior", "Senior entry point")}
                  </span>
                  <span className="text-[#10B981] text-base font-black tabular-nums">
                    {tx("2 900 € HT / 3 jours", "€2,900 ex-VAT / 3 days")}
                  </span>
                </div>
                <h2 className="text-[#0F172A] text-xl font-bold tracking-tight mb-2">
                  {tx("Pilote GTC - Audit & démarrage 3 jours", "GTC Pilot - Audit & 3-day kickoff")}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                  {tx(
                    "Diagnostic parc IT, plan ITAD priorisé et démarrage Plateforme. Mission senior conduite par notre équipe ITAM, carbone et cyber. Pilote remboursé sur la 1re année de Plateforme si signature dans les 90 jours apres la restitution.",
                    "IT fleet diagnostic, prioritised ITAD action plan and Platform kickoff. Senior engagement by our ITAM, carbon and cyber team. Pilot refunded on Year 1 Platform subscription if signed within 90 days of debrief."
                  )}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/reserver?offre=pilote-audit-3j"
                  className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10B981]/25 text-sm whitespace-nowrap"
                >
                  {tx("Réserver le Pilote", "Book the Pilot")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <p className="text-[11px] text-gray-400 text-center mt-2">
                  <Link href="/tarifs#pilote" className="underline hover:text-[#047857] transition-colors">
                    {tx("Détails et garantie remboursement", "Details and refund guarantee")}
                  </Link>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S3 (GRILLE ÉDITORIALE 6 SERVICES) alternance fond/photo
         ════════════════════════════════════════════════════════════════ */}
      <div id="services-grille">
        {services.map((s, i) => {
          const photoOnLeft = i % 2 === 0;
          const isDark = i === 2 || i === 5;
          let bgStyle: string;
          if (isDark) bgStyle = "bg-[#0F172A]";
          else if (i % 2 === 1) bgStyle = "bg-[#F8FAFC]";
          else bgStyle = "bg-white";

          const textColor = isDark ? "text-white" : "text-[#0F172A]";
          const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
          const Icon = s.icon;

          return (
            <section
              key={s.slug}
              id={`service-${s.slug}`}
              className={`relative w-full overflow-hidden ${bgStyle}`}
              aria-labelledby={`service-title-${s.slug}`}
            >
              <div
                className={`flex flex-col lg:flex-row min-h-[78vh] ${
                  !photoOnLeft ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Photo */}
                <div className="relative w-full lg:w-[46%] min-h-[50vw] lg:min-h-0 overflow-hidden flex-shrink-0">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-[1400ms] hover:scale-[1.04]"
                    sizes="(max-width: 1024px) 100vw, 46vw"
                  />
                  <div
                    className={`absolute inset-0 ${
                      isDark
                        ? photoOnLeft
                          ? "bg-gradient-to-r from-transparent via-transparent to-[#0F172A]/70"
                          : "bg-gradient-to-l from-transparent via-transparent to-[#0F172A]/70"
                        : photoOnLeft
                        ? "bg-gradient-to-r from-transparent to-white/15"
                        : "bg-gradient-to-l from-transparent to-white/15"
                    }`}
                  />
                  {/* Ghost number */}
                  <div
                    className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
                    style={{
                      fontSize: "clamp(8rem, 22vw, 18rem)",
                      color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)",
                      right: photoOnLeft ? "0.5rem" : "auto",
                      left: photoOnLeft ? "auto" : "0.5rem",
                      bottom: "-0.1em",
                    }}
                    aria-hidden="true"
                  >
                    {s.num}
                  </div>
                  {/* Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/92 backdrop-blur-sm shadow-lg">
                    <Icon className="h-3.5 w-3.5 text-[#0F172A]" aria-hidden="true" />
                    <span className="text-[11px] font-semibold text-[#0F172A] tracking-wide uppercase">
                      {s.eyebrow}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full lg:flex-1 flex items-center px-6 sm:px-10 lg:px-14 xl:px-18 py-14 lg:py-20">
                  <div
                    className="absolute top-0 left-0 w-[3px] h-full"
                    style={{ backgroundColor: s.accent }}
                    aria-hidden="true"
                  />

                  <div className="max-w-xl w-full">
                    <FadeIn>
                      <div className="flex items-center gap-4 mb-6">
                        <span
                          className="text-5xl lg:text-6xl font-black leading-none tracking-tighter tabular-nums"
                          style={{ color: s.accent }}
                        >
                          {s.num}
                        </span>
                        <span
                          className="flex-1 h-[1px] opacity-25"
                          style={{ backgroundColor: s.accent }}
                          aria-hidden="true"
                        />
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-[0.15em] ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {s.badge}
                        </span>
                      </div>

                      <h2
                        id={`service-title-${s.slug}`}
                        className={`text-3xl sm:text-4xl lg:text-[2.5rem] font-bold leading-[1.1] tracking-tight mb-4 ${textColor}`}
                      >
                        {s.title}
                      </h2>

                      <p
                        className={`text-[1.05rem] lg:text-[1.1rem] font-medium italic mb-5 ${
                          isDark ? "text-gray-200" : "text-gray-600"
                        }`}
                      >
                        {s.pitch}
                      </p>

                      <p className={`text-[1rem] lg:text-[1.02rem] leading-[1.78] mb-8 ${subTextColor}`}>
                        {s.body}
                      </p>

                      {/* Proof */}
                      <div
                        className={`grid grid-cols-2 gap-4 mb-8 pb-8 border-b ${
                          isDark ? "border-white/10" : "border-gray-200"
                        }`}
                      >
                        {s.proof.map((p, j) => (
                          <div key={j} className="flex flex-col gap-1">
                            <span
                              className="text-2xl lg:text-[1.9rem] font-black tracking-tight leading-none tabular-nums"
                              style={{ color: s.accent }}
                            >
                              {p.value}
                              {p.unit && (
                                <span className="text-sm ml-1 font-semibold opacity-80">
                                  {p.unit}
                                </span>
                              )}
                            </span>
                            <span
                              className={`text-[11px] leading-snug ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {p.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing note */}
                      {s.pricingNote && (
                        <div className={`mb-8 pb-8 border-b ${isDark ? "border-white/10" : "border-gray-200"}`}>
                          <Link
                            href={s.pricingHref ?? "/tarifs"}
                            className="inline-flex items-center gap-3 group"
                          >
                            <span
                              className="text-xl lg:text-2xl font-black tracking-tight tabular-nums"
                              style={{ color: s.accent }}
                            >
                              {s.pricingNote}
                            </span>
                            <span
                              className={`text-sm font-medium underline underline-offset-4 decoration-1 transition-opacity group-hover:opacity-80 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              {tx("Voir les tarifs", "View pricing")}
                            </span>
                          </Link>
                        </div>
                      )}

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                        <Link
                          href={`/reserver?offre=${s.slug}`}
                          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                            isDark
                              ? "bg-white text-[#0F172A] hover:bg-gray-100 hover:shadow-white/20"
                              : "text-white hover:opacity-90"
                          }`}
                          style={
                            isDark
                              ? {}
                              : {
                                  backgroundColor: s.accent,
                                  boxShadow: `0 4px 16px ${s.accent}30`,
                                }
                          }
                        >
                          {s.bookLabel}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                        <Link
                          href={s.href}
                          className={`text-sm font-medium underline underline-offset-4 decoration-1 transition-opacity hover:opacity-80 inline-flex items-center gap-1 ${
                            isDark ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {tx("Lire la fiche complète", "Read the full sheet")}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    </FadeIn>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          S4 (CITATION MAGAZINE) fond #022C22
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#022C22] py-20 lg:py-28">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16,185,129,0.10) 0%, transparent 65%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-10 w-10 text-[#10B981] mx-auto mb-8" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-6">
                {tx("Témoignage RSSI", "CISO testimonial")}
              </p>
              <blockquote
                className="text-white font-medium italic mb-10"
                style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.4 }}
              >
                {tx(
                  "« GreenTechCycle a transformé notre ITAD en ligne de défense. Quand l'inspection ACPR est arrivée, j'ai posé un seul PDF sur la table. Quinze minutes plus tard, le sujet était clos. »",
                  "« GreenTechCycle turned our ITAD into a line of defence. When the regulatory inspection arrived, I put a single PDF on the table. Fifteen minutes later, the topic was closed. »"
                )}
              </blockquote>
              <footer className="text-sm text-gray-300">
                <span className="font-semibold text-white">Marc B.</span>
                <span className="mx-2 text-gray-500">·</span>
                <span className="italic text-gray-400">{tx("RSSI, banque CAC 40", "CISO, CAC 40 bank")}</span>
              </footer>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S5 (POURQUOI UN INTERLOCUTEUR UNIQUE) fond clair, ghost 07
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-white py-20 lg:py-28">
        <div
          className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            color: "rgba(0,0,0,0.035)",
            right: "0.5rem",
            bottom: "-0.1em",
          }}
          aria-hidden="true"
        >
          07
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-4">
                {tx("Pourquoi un seul interlocuteur change tout", "Why a single point of contact changes everything")}
              </p>
              <h2
                className="text-[#0F172A] font-bold tracking-tight mb-8"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "Six prestataires éparpillés, c'est six dossiers à recoller au moindre audit.",
                  "Six scattered vendors means six dossiers to reassemble at the slightest audit."
                )}
              </h2>
              <p className="text-gray-700 text-[1.02rem] lg:text-[1.1rem] leading-[1.78] mb-10 max-w-3xl">
                {tx(
                  "La plupart de nos clients arrivaient avec un assemblage hérité : un transporteur ici, un broyeur là, un brocanteur de matériel reconditionné, un cabinet pour le rapport carbone. Quand l'autorité demande la chaîne complète, plus personne n'arrive à recoller les bordereaux. GreenTechCycle a été conçu pour produire une preuve unique, la même donnée nourrit la console DSI, le dossier RSSI et le rapport CSRD.",
                  "Most of our clients arrived with an inherited patchwork: a carrier here, a shredder there, a refurbished hardware reseller, an external firm for the carbon report. When the regulator asks for the full chain, nobody can put the slips back together. GreenTechCycle was built to produce a single proof, the same data feeds the CIO console, the CISO file and the CSRD report."
                )}
              </p>
            </FadeIn>

            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
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
              ].map((b, i) => (
                <StaggerItem key={i}>
                  <div className="bg-[#F8FAFC] rounded-2xl p-7 border border-gray-100 h-full hover:border-[#047857]/30 transition-colors">
                    <div className="w-11 h-11 rounded-xl bg-[#047857]/10 flex items-center justify-center mb-5">
                      <b.icon className="h-5 w-5 text-[#047857]" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] mb-3 tracking-tight">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-[1.7]">{b.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          S6 (ENCART CONVERSION) fond #10B981
         ════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#10B981]">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(255,255,255,0.25) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute select-none pointer-events-none font-black tracking-tighter leading-none"
          style={{
            fontSize: "clamp(8rem, 22vw, 18rem)",
            color: "rgba(255,255,255,0.06)",
            right: "0.5rem",
            bottom: "-0.1em",
          }}
          aria-hidden="true"
        >
          08
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
                {tx("Passer à l'action", "Take the next step")}
              </p>
              <h2
                className="text-white font-black tracking-tight mb-6"
                style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)", lineHeight: 1.08 }}
              >
                {tx(
                  "Trente minutes avec un expert senior. Un plan d'action chiffré sous 48 heures.",
                  "Thirty minutes with a senior expert. A quoted action plan within 48 hours."
                )}
              </h2>
              <p className="text-white/90 text-[1.05rem] lg:text-[1.15rem] leading-[1.65] max-w-2xl mb-10">
                {tx(
                  "Pas d'appel commercial scripté, pas de questionnaire en ligne. Un échange direct avec un ingénieur qui a déjà piloté une mission équivalente, banque, santé, distribution, industrie ou administration.",
                  "No scripted sales call, no online form maze. A direct conversation with an engineer who has already run an equivalent mission, banking, healthcare, retail, industry or public administration."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/reserver"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F172A] hover:bg-[#022C22] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  {tx("Réserver un créneau", "Book a slot")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/cas-usages"
                  className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/40 hover:border-white/60 font-semibold px-8 py-4 rounded-xl transition-all duration-300 text-sm"
                >
                  {tx("Voir les cas clients", "See client cases")}
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-12 text-white/80 text-xs">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("Réponse sous 24 heures ouvrées", "Response within 24 business hours")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("NDA signé sur demande", "NDA signed on request")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  {tx("Aucun engagement", "No commitment")}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
