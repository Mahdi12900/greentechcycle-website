"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  ShieldCheck,
  RefreshCcw,
  Recycle,
  Hammer,
  Gauge,
  Layers,
  CheckCircle2,
  LifeBuoy,
  Plug,
  CalendarDays,
  Clock,
  Users,
  Ticket,
  Bell,
  FileCheck2,
  UserCog,
  AlertTriangle,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Mail,
  Phone,
  Send,
  CheckCircle,
  CircleDot,
  Shield,
  Lock,
  Fingerprint,
  Eye,
  Camera,
  Gavel,
  UserCheck,
  Truck,
  MapPin,
  Video,
  ScrollText,
  Network,
  Server,
  Radar,
  KeyRound,
  Leaf,
  BarChart3,
  Database,
  HardDrive,
  Cpu,
  FileLock2,
  FileSignature,
  Siren,
  Binary,
  ClipboardCheck,
  FileBadge,
  ScanEye,
} from "lucide-react";

// ---------- i18n helper ----------
const useTx = () => {
  const locale = useLocale();
  return (fr: string, en: string) => (locale === "en" ? en : fr);
};

// ---------- Types ----------
type Service = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  ctaLabel: string;
};

// ---------- Mini gauge component ----------
function Gauge180({
  value,
  label,
  color,
  description,
}: {
  value: number; // 0-100
  label: string;
  color: string; // tailwind-compatible hex
  description: string;
}) {
  const radius = 52;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 80" className="w-full h-auto max-w-[220px]">
        <path
          d="M 18 70 A 52 52 0 0 1 122 70"
          stroke="#E2E8F0"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 18 70 A 52 52 0 0 1 122 70"
          stroke={color}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
        <text
          x="70"
          y="62"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
          fill="#0F172A"
        >
          {value}
        </text>
        <text
          x="70"
          y="76"
          textAnchor="middle"
          fontSize="8"
          fill="#64748B"
          letterSpacing="1"
        >
          / 100
        </text>
      </svg>
      <p className="mt-2 text-sm font-semibold text-slate-900">{label}</p>
      <p className="text-xs text-slate-500 text-center mt-0.5 max-w-[180px]">
        {description}
      </p>
    </div>
  );
}

// ---------- Component ----------
export default function ServicesPage() {
  const tx = useTx();
  const locale = useLocale();

  const services: Service[] = [
    {
      id: "audit",
      eyebrow: tx("01 · Cartographie", "01 · Mapping"),
      title: tx("Audit & Inventaire IT", "IT Audit & Inventory"),
      subtitle: tx(
        "Cartographie complète, scoring et valeur résiduelle",
        "Complete mapping, scoring and residual value"
      ),
      description: tx(
        "Nous auditons l'intégralité de votre parc informatique — serveurs, postes, équipements mobiles, IoT, licences — pour produire un inventaire exhaustif vérifié. Chaque asset est identifié, qualifié, photographié et scoré selon trois axes : criticité des données, état physique et valeur marchande. Cette cartographie devient le référentiel unique de vos décisions ITAD. Elle alimente la plateforme en temps réel via nos connecteurs (CMDB, MDM, Active Directory, Intune, Jamf) pour éviter toute double saisie. Vous récupérez en quelques jours ce que des équipes internes mettent des mois à obtenir, avec en prime une estimation précise de la valeur que vous pouvez récupérer en reconditionnement.",
        "We audit your entire IT fleet — servers, workstations, mobile devices, IoT, licenses — to produce an exhaustive, verified inventory. Each asset is identified, qualified, photographed and scored on three axes: data criticality, physical condition and market value. This mapping becomes the single source of truth for your ITAD decisions. It feeds the platform in real time via our connectors (CMDB, MDM, Active Directory, Intune, Jamf) to avoid duplicate data entry. You get in days what internal teams take months to produce, plus a precise estimate of the recoverable refurbishment value."
      ),
      benefits: [
        tx("Inventaire exhaustif du parc IT, OT et mobile", "Full inventory across IT, OT and mobile"),
        tx("Scoring 3-axes : donnée · état · valeur", "3-axis scoring: data · condition · value"),
        tx("Intégration CMDB, MDM, AD, Intune, Jamf", "CMDB, MDM, AD, Intune, Jamf integrations"),
        tx("Estimation de la valeur résiduelle chiffrée", "Quantified residual value estimation"),
        tx("Photos, numéros de série, hash de vérification", "Photos, serials, verification hash"),
        tx("Rapport exécutif PDF pour COMEX / DSI", "Exec-ready PDF report for CIO / COMEX"),
      ],
      image: "/images/unsplash/server-technician.jpg",
      imageAlt: tx(
        "Technicien réalisant l'audit d'un parc IT en data center",
        "Technician performing IT fleet audit in data center"
      ),
      icon: ClipboardList,
      badge: tx("Livrable sous 5 jours", "Delivered in 5 days"),
      ctaLabel: tx("Demander un audit", "Request an audit"),
    },
    {
      id: "erasure",
      eyebrow: tx("02 · Sécurité des données", "02 · Data security"),
      title: tx("Effacement Sécurisé", "Secure Data Erasure"),
      subtitle: tx(
        "Méthodologies NIST 800-88, DoD 5220.22-M, IEEE 2883",
        "NIST 800-88, DoD 5220.22-M, IEEE 2883 methodologies"
      ),
      description: tx(
        "Nous appliquons les trois méthodologies d'effacement reconnues mondialement selon la sensibilité de vos données et le type de média. NIST 800-88 (Clear / Purge / Destroy) pour la grande majorité des cas, DoD 5220.22-M pour les environnements historiquement sensibles, et IEEE 2883-2022 pour les SSD modernes où l'effacement classique ne suffit plus. Chaque opération est tracée, horodatée et génère un certificat signé avec hash SHA-256. Un audit de sécurité interne est déclenché automatiquement sur chaque lot : échantillonnage, vérification cryptographique, contrôle de bonne exécution. Rien n'est envoyé en reconditionnement avant validation.",
        "We apply the three globally recognized erasure methodologies based on data sensitivity and media type. NIST 800-88 (Clear / Purge / Destroy) for most cases, DoD 5220.22-M for historically sensitive environments, and IEEE 2883-2022 for modern SSDs where classic erasure is no longer sufficient. Each operation is logged, timestamped and generates a signed certificate with SHA-256 hash. An internal security audit is automatically triggered on every batch: sampling, cryptographic verification, execution check. Nothing moves to refurbishment before validation."
      ),
      benefits: [
        tx("Méthodologie NIST 800-88 (Clear · Purge · Destroy)", "NIST 800-88 methodology (Clear · Purge · Destroy)"),
        tx("Standard militaire DoD 5220.22-M 3 passes", "Military DoD 5220.22-M 3-pass standard"),
        tx("IEEE 2883-2022 pour SSD / NVMe modernes", "IEEE 2883-2022 for modern SSD / NVMe"),
        tx("Audit de sécurité interne sur chaque opération", "Internal security audit on every operation"),
        tx("Certificat signé + hash SHA-256 par asset", "Signed certificate + SHA-256 hash per asset"),
        tx("Destruction physique si irrécupérable", "Physical destruction if unrecoverable"),
      ],
      image: "/images/unsplash/hands-electronics.jpg",
      imageAlt: tx(
        "Opérateur effaçant un disque selon la méthodologie NIST 800-88",
        "Operator wiping a disk using NIST 800-88 methodology"
      ),
      icon: ShieldCheck,
      badge: tx("Certificat sous 24h", "Certificate within 24h"),
      ctaLabel: tx("Sécuriser mes données", "Secure my data"),
    },
    {
      id: "refurbishment",
      eyebrow: tx("03 · Valorisation", "03 · Value recovery"),
      title: tx("Reconditionnement & Valorisation", "Refurbishment & Resale"),
      subtitle: tx(
        "Maximiser la valeur récupérée sur chaque asset",
        "Maximize the recovered value on every asset"
      ),
      description: tx(
        "Chaque asset éligible passe par notre chaîne de reconditionnement : diagnostic, remise en état cosmétique, remplacement des composants défaillants, mise à jour firmware, tests fonctionnels 360°, grade qualité (A / B / C). Nous valorisons ensuite les équipements sur nos canaux de revente B2B (brokers, ESN, refurbishers partenaires), en dark store interne pour vos propres collaborateurs, ou en don à des associations éligibles (avec déduction fiscale). Vous récupérez une part significative de la valeur résiduelle, validée contractuellement en amont. Un rapport trimestriel détaille les flux, les prix obtenus et l'impact carbone évité par le réemploi.",
        "Every eligible asset goes through our refurbishment line: diagnostic, cosmetic restoration, faulty component replacement, firmware upgrade, 360° functional testing, quality grading (A / B / C). We then resell equipment on our B2B channels (brokers, MSPs, partner refurbishers), on an internal dark store for your own employees, or donate to eligible non-profits (with tax deduction). You recover a significant share of the residual value, contractually locked in advance. A quarterly report details flows, sale prices and avoided carbon impact through reuse."
      ),
      benefits: [
        tx("Grading qualité A / B / C normé", "Standardized A / B / C quality grading"),
        tx("Revente B2B + dark store interne + dons", "B2B resale + internal dark store + donations"),
        tx("Part de valeur résiduelle reversée au client", "Share of residual value returned to the client"),
        tx("Garantie 12 mois sur les équipements reconditionnés", "12-month warranty on refurbished equipment"),
        tx("Rapport trimestriel des flux et prix obtenus", "Quarterly report on flows and sale prices"),
        tx("Mesure du CO₂ évité par réemploi", "Measurement of CO₂ avoided through reuse"),
      ],
      image: "/images/unsplash/two-engineers.jpg",
      imageAlt: tx(
        "Ingénieurs inspectant des équipements IT avant reconditionnement",
        "Engineers inspecting IT equipment before refurbishment"
      ),
      icon: RefreshCcw,
      badge: tx("+40 % valeur récupérée", "+40% recovered value"),
      ctaLabel: tx("Valoriser mon parc", "Recover my value"),
    },
    {
      id: "recycling",
      eyebrow: tx("04 · Économie circulaire", "04 · Circular economy"),
      title: tx("Recyclage Responsable", "Responsible Recycling"),
      subtitle: tx(
        "DEEE · traçabilité bout-en-bout · bilan carbone",
        "WEEE · end-to-end traceability · carbon footprint"
      ),
      description: tx(
        "Pour les équipements non reconditionnables, nous orchestrons un recyclage 100 % conforme à la directive DEEE et à la responsabilité élargie du producteur. Notre réseau d'éco-organismes certifiés (Ecologic, Ecosystem) garantit une traçabilité bout-en-bout : chaque matière (métaux ferreux, non ferreux, plastiques, cartes électroniques) est pesée, tracée et valorisée en filière. Nous calculons en temps réel le bilan carbone évité et les matières premières secondaires réinjectées dans l'économie. Le tout alimente directement votre reporting CSRD (ESRS E5 — économie circulaire) sans aucune ressaisie manuelle.",
        "For non-refurbishable equipment, we orchestrate 100% WEEE-compliant recycling under extended producer responsibility. Our network of certified eco-organizations (Ecologic, Ecosystem) guarantees end-to-end traceability: each material (ferrous / non-ferrous metals, plastics, electronic boards) is weighed, tracked and valorized through dedicated channels. We compute in real time the avoided carbon footprint and the secondary raw materials returned to the economy. All of this feeds directly into your CSRD reporting (ESRS E5 — circular economy) with zero manual re-entry."
      ),
      benefits: [
        tx("Conformité DEEE / REP intégrale", "Full WEEE / EPR compliance"),
        tx("Réseau Ecologic + Ecosystem certifiés", "Certified Ecologic + Ecosystem network"),
        tx("Traçabilité matière par matière", "Material-by-material traceability"),
        tx("Bilan carbone évité calculé automatiquement", "Automatic avoided-carbon calculation"),
        tx("Alimentation automatique ESRS E5 / CSRD", "Automatic ESRS E5 / CSRD feed"),
        tx("Bordereau de suivi des déchets (BSD) numérisé", "Digital waste tracking slip (BSD)"),
      ],
      image: "/images/unsplash/ewaste-recycling.jpg",
      imageAlt: tx(
        "Recyclage d'équipements électroniques en filière DEEE certifiée",
        "Certified WEEE electronics recycling"
      ),
      icon: Recycle,
      badge: tx("100 % traçable", "100% traceable"),
      ctaLabel: tx("Recycler en conformité", "Recycle compliantly"),
    },
    {
      id: "destruction",
      eyebrow: tx("05 · Destruction certifiée", "05 · Certified destruction"),
      title: tx("Destruction Certifiée", "Certified Destruction"),
      subtitle: tx(
        "Broyage, démagnétisation, incinération tracée",
        "Shredding, degaussing, tracked incineration"
      ),
      description: tx(
        "Lorsque le risque de fuite de données l'exige — ou lorsque l'asset est irrécupérable — la destruction physique est la réponse. Nous opérons trois modes complémentaires : broyage industriel (particules < 6 mm), démagnétisation (gaussmètre ≥ 8000 Oe pour supports magnétiques), incinération contrôlée pour les supports très sensibles. Chaque étape est filmée, horodatée et attestée. Vous recevez un certificat de destruction nominatif par asset, opposable aux autorités et aux auditeurs (RGPD, NIS2, ANSSI). La destruction peut se faire sur site chez vous avec notre unité mobile, pour ne jamais laisser sortir les médias de vos locaux.",
        "When data-leak risk requires it — or when the asset is unrecoverable — physical destruction is the answer. We operate three complementary modes: industrial shredding (particles < 6 mm), degaussing (gaussmeter ≥ 8000 Oe for magnetic media), controlled incineration for highly sensitive media. Every step is filmed, timestamped and attested. You receive a named destruction certificate per asset, admissible by authorities and auditors (GDPR, NIS2, ANSSI). Destruction can happen on-site with our mobile unit, so media never leave your premises."
      ),
      benefits: [
        tx("Broyage industriel particules < 6 mm", "Industrial shredding to < 6 mm particles"),
        tx("Démagnétisation ≥ 8000 Oersted", "Degaussing ≥ 8000 Oersted"),
        tx("Unité mobile de destruction sur site", "Mobile on-site destruction unit"),
        tx("Vidéo horodatée de chaque destruction", "Timestamped video of every destruction"),
        tx("Certificat nominatif opposable", "Named legally admissible certificate"),
        tx("Conforme RGPD · NIS2 · ANSSI", "GDPR · NIS2 · ANSSI compliant"),
      ],
      image: "/images/unsplash/tech-datacenter.jpg",
      imageAlt: tx(
        "Opérateur supervisant une opération de destruction certifiée",
        "Operator supervising a certified destruction operation"
      ),
      icon: Hammer,
      badge: tx("Certificat nominatif", "Named certificate"),
      ctaLabel: tx("Commander une destruction", "Order destruction"),
    },
    {
      id: "scoring",
      eyebrow: tx("06 · Intelligence décisionnelle", "06 · Decision intelligence"),
      title: tx("Scoring & Visibilité", "Scoring & Visibility"),
      subtitle: tx(
        "Score de risque · valeur · reconditionnement par asset",
        "Risk · value · refurbishment score per asset"
      ),
      description: tx(
        "Chaque asset de votre parc reçoit trois scores calculés automatiquement par notre moteur : un score de risque (sensibilité des données, criticité métier, exposition), un score de valeur résiduelle (état, obsolescence, marché), et un score de reconditionnement (probabilité de remise en service réussie). Ces scores alimentent un tableau de bord de risque consolidé, filtrable par BU, site, catégorie d'asset. Vous voyez en un coup d'œil quels assets traiter en priorité, quels assets valoriser, quels assets détruire. Plus besoin d'arbitrer à l'aveugle : la plateforme recommande, vous validez.",
        "Every asset in your fleet receives three automatically computed scores: a risk score (data sensitivity, business criticality, exposure), a residual-value score (condition, obsolescence, market), and a refurbishment score (likelihood of successful return to service). These scores feed a consolidated risk dashboard, filterable by BU, site, asset category. You see at a glance which assets to prioritize, which to resell, which to destroy. No more blind arbitration: the platform recommends, you validate."
      ),
      benefits: [
        tx("3 scores par asset : risque · valeur · reconditionnement", "3 scores per asset: risk · value · refurb"),
        tx("Tableau de bord de risque consolidé", "Consolidated risk dashboard"),
        tx("Filtres BU, site, catégorie, ancienneté", "Filters by BU, site, category, age"),
        tx("Recommandation automatique par asset", "Automatic per-asset recommendation"),
        tx("Alertes sur dérive de score", "Alerts on score drift"),
        tx("Export CSV · API · Webhook", "CSV · API · Webhook export"),
      ],
      image: "/images/unsplash/corporate-meeting.jpg",
      imageAlt: tx(
        "Analyste visualisant le scoring de risque du parc IT sur la plateforme",
        "Analyst reviewing IT fleet risk scoring on the platform"
      ),
      icon: Gauge,
      badge: tx("Décision éclairée", "Informed decision"),
      ctaLabel: tx("Voir un exemple de scoring", "See a scoring example"),
    },
    {
      id: "asset-management",
      eyebrow: tx("07 · Gestion unifiée", "07 · Unified management"),
      title: tx("Asset Management", "Asset Management"),
      subtitle: tx(
        "Licences, devices, environnements OT & IT unifiés",
        "Licenses, devices, OT & IT environments unified"
      ),
      description: tx(
        "Une seule plateforme pour piloter l'intégralité de votre parc — devices physiques ET licences logicielles, environnements IT classiques ET environnements OT industriels souvent oubliés. Nous consolidons Microsoft 365, Adobe, Oracle, SAP, AutoCAD, licences métier sectorielles, ainsi que vos équipements OT (automates, capteurs, HMI) dans un référentiel unique. Vous visualisez qui utilise quoi, où, depuis combien de temps, pour quel coût, et surtout : ce qui peut être rationalisé. En moyenne, nos clients récupèrent 18 à 24 % de licences inutilisées dès la première année, et identifient les devices OT critiques non patchés qui menacent leur compliance NIS2.",
        "A single platform to manage your entire fleet — physical devices AND software licenses, classic IT environments AND often-forgotten industrial OT environments. We consolidate Microsoft 365, Adobe, Oracle, SAP, AutoCAD, sector-specific licenses, as well as your OT equipment (PLCs, sensors, HMIs) into one repository. You see who uses what, where, for how long, at what cost, and most importantly: what can be rationalized. On average, our clients recover 18-24% of unused licenses in the first year, and identify critical unpatched OT devices that threaten their NIS2 compliance."
      ),
      benefits: [
        tx("Licences SaaS et on-prem unifiées", "SaaS and on-prem licenses unified"),
        tx("OT (automates, capteurs, HMI) intégré", "OT (PLCs, sensors, HMIs) integrated"),
        tx("Détection des licences inutilisées", "Unused license detection"),
        tx("Alertes patch management NIS2", "NIS2 patch management alerts"),
        tx("Coût par user / par site / par BU", "Cost per user / site / BU"),
        tx("ROI moyen : 18-24 % dès l'année 1", "Average ROI: 18-24% in year 1"),
      ],
      image: "/images/unsplash/diverse-team.jpg",
      imageAlt: tx(
        "Équipe consultant la vue unifiée des licences et devices sur la plateforme",
        "Team reviewing unified licenses and devices view on platform"
      ),
      icon: Layers,
      badge: tx("IT + OT + Licences", "IT + OT + Licenses"),
      ctaLabel: tx("Unifier mon asset management", "Unify my asset management"),
    },
  ];

  // Integrations
  const integrations = [
    { name: "Google Workspace", status: "available", hint: tx("SSO, Drive, Annuaire", "SSO, Drive, Directory"), initial: "G", color: "from-blue-500 to-red-500" },
    { name: "SAP", status: "available", hint: tx("Finance, Achats, Actifs", "Finance, Purchasing, Assets"), initial: "SAP", color: "from-sky-600 to-blue-800" },
    { name: "ServiceNow", status: "available", hint: tx("ITSM, CMDB, Workflows", "ITSM, CMDB, Workflows"), initial: "SN", color: "from-emerald-600 to-teal-700" },
    { name: "Apple Business Manager", status: "available", hint: tx("ABM, DEP, Jamf", "ABM, DEP, Jamf"), initial: "", color: "from-slate-700 to-slate-900" },
    { name: "Oracle", status: "roadmap", hint: tx("ERP, E-Business Suite", "ERP, E-Business Suite"), initial: "O", color: "from-red-600 to-red-800" },
    { name: "Microsoft Intune", status: "available", hint: tx("MDM, Autopilot", "MDM, Autopilot"), initial: "Mi", color: "from-sky-500 to-indigo-600" },
    { name: "Jamf Pro", status: "available", hint: tx("MDM Apple", "Apple MDM"), initial: "J", color: "from-indigo-600 to-purple-700" },
    { name: "Workday", status: "roadmap", hint: tx("HRIS, People data", "HRIS, People data"), initial: "W", color: "from-orange-500 to-amber-600" },
  ];

  // Meeting types
  const meetingTypes = [
    {
      duration: "30 min",
      title: tx("Découverte", "Discovery"),
      description: tx(
        "Présentation de GreenTechCycle, de votre contexte ITAD et des gains potentiels pour votre organisation.",
        "Introduction to GreenTechCycle, your ITAD context, and potential wins for your organization."
      ),
      icon: Users,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cta: tx("Réserver 30 min", "Book 30 min"),
      mailto: "mailto:contact@greentechcycle.fr?subject=RDV%20D%C3%A9couverte%20GreenTechCycle%20(30%20min)",
    },
    {
      duration: "45 min",
      title: tx("Démo plateforme", "Platform demo"),
      description: tx(
        "Démonstration live de la plateforme : scoring, effacement, reporting CSRD, tableau de bord risque, connecteurs.",
        "Live platform demo: scoring, erasure, CSRD reporting, risk dashboard, connectors."
      ),
      icon: Sparkles,
      color: "bg-sky-50 text-sky-700 border-sky-200",
      cta: tx("Réserver 45 min", "Book 45 min"),
      mailto: "mailto:contact@greentechcycle.fr?subject=D%C3%A9mo%20Plateforme%20GreenTechCycle%20(45%20min)",
    },
    {
      duration: "60 min",
      title: tx("Audit personnalisé", "Personalized audit"),
      description: tx(
        "Analyse de votre parc IT sur la base de vos données : recommandations de stratégie ITAD, valeur récupérable estimée.",
        "Analysis of your IT fleet based on your data: ITAD strategy recommendations, estimated recoverable value."
      ),
      icon: ClipboardList,
      color: "bg-amber-50 text-amber-700 border-amber-200",
      cta: tx("Réserver 60 min", "Book 60 min"),
      mailto: "mailto:contact@greentechcycle.fr?subject=Audit%20Personnalis%C3%A9%20GreenTechCycle%20(60%20min)",
    },
  ];

  // Ticket timeline steps
  const ticketSteps = [
    {
      icon: Ticket,
      title: tx("Création du ticket", "Ticket creation"),
      description: tx("Ouverture depuis la plateforme en 2 clics : type, urgence, pièces jointes.", "Open from the platform in 2 clicks: type, urgency, attachments."),
      time: "T+0",
    },
    {
      icon: UserCog,
      title: tx("Assignation", "Assignment"),
      description: tx("Routage automatique vers l'expert GTC selon le type de demande.", "Automatic routing to the right GTC expert based on the request type."),
      time: "T+5 min",
    },
    {
      icon: Bell,
      title: tx("Traitement & notifications", "Processing & notifications"),
      description: tx("Suivi en temps réel, notifications email + in-app à chaque étape.", "Real-time tracking, email + in-app notifications at every step."),
      time: "T+30 min",
    },
    {
      icon: CheckCircle,
      title: tx("Résolution", "Resolution"),
      description: tx("Validation par le client, capitalisation dans la base de connaissance.", "Client validation, knowledge-base capitalization."),
      time: "SLA",
    },
    {
      icon: FileCheck2,
      title: tx("Certificat / livrable", "Certificate / deliverable"),
      description: tx("Certificat signé délivré automatiquement si applicable (effacement, destruction).", "Signed certificate automatically issued where applicable (erasure, destruction)."),
      time: tx("Clôture", "Close"),
    },
  ];

  return (
    <main className="overflow-hidden bg-white">
      {/* ============================================ */}
      {/* HERO                                         */}
      {/* ============================================ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857] via-[#0B4633] to-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.08),_transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-semibold ring-1 ring-white/20 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#047857] animate-pulse" />
                {tx("7 services ITAD · 1 plateforme unifiée", "7 ITAD services · 1 unified platform")}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                {locale === "en" ? (
                  <>
                    ITAD management <br />
                    <span className="bg-gradient-to-r from-[#047857] to-[#6EE7B7] bg-clip-text text-transparent">
                      as it should be.
                    </span>
                  </>
                ) : (
                  <>
                    La gestion ITAD <br />
                    <span className="bg-gradient-to-r from-[#047857] to-[#6EE7B7] bg-clip-text text-transparent">
                      comme elle devrait être.
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
                {tx(
                  "De l'audit initial au certificat de destruction, nous couvrons chaque étape du cycle de vie de vos actifs IT avec la rigueur d'un broker ITAD certifié et la fluidité d'une plateforme SaaS moderne.",
                  "From initial audit to destruction certificate, we cover every step of your IT asset lifecycle with the rigor of a certified ITAD broker and the fluidity of a modern SaaS platform."
                )}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#047857]/30 hover:-translate-y-0.5"
                >
                  {tx("Réserver une démo", "Book a demo")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition"
                >
                  {tx("Parcourir les services", "Browse services")}
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Service nav strip */}
          <FadeIn delay={0.2}>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group relative flex flex-col items-center gap-2 px-3 py-4 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-center transition"
                  >
                    <Icon className="h-5 w-5 text-[#6EE7B7]" />
                    <span className="text-[11px] font-semibold text-white/90 leading-tight">
                      {s.title}
                    </span>
                  </a>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES LIST                                */}
      {/* ============================================ */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                {tx("Notre catalogue", "Our catalogue")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {tx(
                  "7 services intégrés, pensés pour s'emboîter.",
                  "7 integrated services, designed to fit together."
                )}
              </h2>
              <p className="text-lg text-slate-600 mt-4">
                {tx(
                  "Chaque service peut être déclenché seul — ou orchestré dans un workflow end-to-end depuis la plateforme. Vous gardez la main, nous sécurisons l'exécution.",
                  "Each service can be triggered standalone — or orchestrated in an end-to-end workflow from the platform. You stay in control, we secure execution."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="space-y-28 md:space-y-36">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              const reversed = i % 2 === 1;
              return (
                <div key={svc.id} id={svc.id} className="scroll-mt-32">
                  <FadeIn>
                    <div
                      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                        reversed ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Image */}
                      <div className="relative">
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                          <Image
                            src={svc.image}
                            alt={svc.imageAlt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#047857]/50 via-transparent to-transparent" />
                          <div className="absolute top-5 left-5 flex items-center gap-2">
                            <div className="h-11 w-11 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg">
                              <Icon className="h-5 w-5 text-[#047857]" />
                            </div>
                            <span className="px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-xs font-semibold text-slate-700 shadow-lg">
                              {svc.badge}
                            </span>
                          </div>
                        </div>
                        {/* Decorative number */}
                        <div
                          className={`hidden lg:flex absolute -z-0 ${
                            reversed ? "-right-4" : "-left-4"
                          } -bottom-6 text-[160px] font-black text-slate-100 leading-none select-none pointer-events-none`}
                        >
                          0{i + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                          {svc.eyebrow}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                          {svc.title}
                        </h3>
                        <p className="text-lg text-[#1E40AF] font-medium mb-5">
                          {svc.subtitle}
                        </p>
                        <p className="text-slate-600 leading-relaxed mb-7">
                          {svc.description}
                        </p>

                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 mb-8">
                          {svc.benefits.map((b, j) => (
                            <StaggerItem key={j}>
                              <div className="flex items-start gap-2.5">
                                <CheckCircle2 className="h-5 w-5 text-[#047857] flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-700 leading-snug">{b}</span>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>

                        <div className="flex flex-wrap gap-3">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#0B4633] text-white font-semibold px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
                          >
                            {svc.ctaLabel}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                          <Link
                            href="/plateforme"
                            className="inline-flex items-center gap-2 text-[#047857] hover:text-[#047857] font-semibold px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 transition"
                          >
                            {tx("Voir dans la plateforme", "See in platform")}
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 🔒 CYBERSECURITY — THE FLAGSHIP SECTION (defense-grade)     */}
      {/* ============================================================ */}
      <section id="cybersecurite" className="relative scroll-mt-24 bg-[#05070E] text-white overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(16,185,129,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(239,68,68,0.08),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(110,231,183,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(110,231,183,.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        {/* ---------- 8.1 · HERO OF CYBER SECTION ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <FadeIn>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 text-[11px] font-bold uppercase tracking-[0.18em] ring-1 ring-red-500/30 mb-6">
                    <Siren className="h-3.5 w-3.5" />
                    {tx("Dossier classifié · Niveau Défense", "Classified · Defense-grade")}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                    {tx(
                      "Cybersécurité ITAD,",
                      "ITAD Cybersecurity,"
                    )}
                    <br />
                    <span className="bg-gradient-to-r from-[#047857] via-[#6EE7B7] to-[#A7F3D0] bg-clip-text text-transparent">
                      {tx(
                        "au niveau que vos données exigent.",
                        "at the level your data demands."
                      )}
                    </span>
                  </h2>
                  <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                    {tx(
                      "Les autres brokers ITAD traitent la sécurité comme une case à cocher. Pour nous, c'est la colonne vertébrale de la plateforme. Procès-verbal d'huissier, identités vérifiées, background checks, scellés numérotés, GPS, vidéosurveillance — chaque asset qui quitte vos locaux est protégé par un protocole de niveau Défense, audité, traçable, et juridiquement opposable.",
                      "Other ITAD brokers treat security as a checkbox. For us, it is the backbone of the platform. Bailiff report, verified identities, background checks, numbered seals, GPS, video surveillance — every asset leaving your premises is protected by a defense-grade protocol, audited, traceable, and legally admissible."
                    )}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: tx("Niveau Défense", "Defense-grade"), icon: Shield },
                      { label: tx("Certifiable", "Certifiable"), icon: FileBadge },
                      { label: tx("Auditable", "Auditable"), icon: ScanEye },
                      { label: tx("Juridiquement opposable", "Legally admissible"), icon: Gavel },
                    ].map((b) => {
                      const I = b.icon;
                      return (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 ring-1 ring-white/10 text-xs font-semibold text-slate-200 backdrop-blur-sm"
                        >
                          <I className="h-3.5 w-3.5 text-[#6EE7B7]" />
                          {b.label}
                        </span>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>

              <div className="lg:col-span-5">
                <FadeIn direction="left">
                  <div className="relative">
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.25)]">
                      <Image
                        src="/images/unsplash/server-technician.jpg"
                        alt={tx(
                          "Opérateur ITAD certifié sous vidéosurveillance en zone sécurisée",
                          "Certified ITAD operator under video surveillance in a secure zone"
                        )}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070E] via-[#05070E]/40 to-transparent" />
                      {/* Classified stamp */}
                      <div className="absolute top-5 right-5 rotate-[8deg]">
                        <div className="px-3 py-1.5 rounded-md border-2 border-red-500/70 text-red-400 text-[10px] font-black uppercase tracking-[0.25em] bg-red-950/40 backdrop-blur-sm">
                          {tx("Confidentiel", "Classified")}
                        </div>
                      </div>
                      {/* Live indicator */}
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md ring-1 ring-white/10">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          </span>
                          <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold">
                              {tx("Chaîne de garde · live", "Chain of custody · live")}
                            </p>
                            <p className="text-xs text-slate-300 font-mono">
                              {tx("Convoi #7421 · Lyon → Lille · GPS OK", "Convoy #7421 · Lyon → Lille · GPS OK")}
                            </p>
                          </div>
                          <Radar className="h-5 w-5 text-emerald-400" />
                        </div>
                      </div>
                    </div>
                    {/* Floating KPI cards */}
                    <div className="hidden md:block absolute -left-6 top-1/3 bg-[#0A0F1E] ring-1 ring-white/10 rounded-2xl px-4 py-3 shadow-xl">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {tx("Intervenants vérifiés", "Verified operators")}
                      </p>
                      <p className="text-2xl font-bold text-white">100 %</p>
                    </div>
                    <div className="hidden md:block absolute -right-6 bottom-8 bg-[#0A0F1E] ring-1 ring-white/10 rounded-2xl px-4 py-3 shadow-xl">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        {tx("PV huissier", "Bailiff reports")}
                      </p>
                      <p className="text-2xl font-bold text-[#6EE7B7]">
                        {tx("Sur demande", "On request")}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- 8.2 · CHAIN OF CUSTODY (the big differentiator) ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                  <Lock className="h-3.5 w-3.5" />
                  {tx("01 · Chaîne de garde", "01 · Chain of custody")}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {tx(
                    "8 contrôles. 0 angle mort.",
                    "8 controls. 0 blind spots."
                  )}
                </h3>
                <p className="text-lg text-slate-300">
                  {tx(
                    "Chaque asset est suivi par un protocole de chaîne de garde d'un niveau que le marché ITAD n'a jamais proposé. De la prise en charge jusqu'à la destruction ou au reconditionnement, 8 contrôles imbriqués génèrent un dossier de preuves juridiquement opposable.",
                    "Every asset is tracked by a chain-of-custody protocol at a level the ITAD market has never offered. From pickup to destruction or refurbishment, 8 nested controls generate a legally admissible evidence file."
                  )}
                </p>
              </div>
            </FadeIn>

            <div className="relative max-w-5xl mx-auto">
              {/* Vertical line */}
              <div
                aria-hidden="true"
                className="absolute left-7 md:left-9 top-6 bottom-6 w-px bg-gradient-to-b from-[#047857] via-[#047857]/40 to-transparent"
              />

              <StaggerContainer className="space-y-5">
                {[
                  {
                    n: "01",
                    icon: Gavel,
                    title: tx("Procès-verbal d'huissier sur place", "On-site bailiff report"),
                    desc: tx(
                      "Un huissier de justice est présent physiquement lors de chaque opération sensible. Il constate l'état des lieux, les numéros de série, les scellés, les destructions. Son procès-verbal est un acte authentique, opposable devant toute juridiction — bien au-delà d'un simple certificat fournisseur.",
                      "A bailiff is physically present during every sensitive operation. They record the state of the premises, serial numbers, seals, destructions. Their report is an authentic legal document, admissible before any court — far beyond a simple supplier certificate."
                    ),
                    badge: tx("Acte authentique", "Legal evidence"),
                  },
                  {
                    n: "02",
                    icon: Fingerprint,
                    title: tx("Vérification d'identité des intervenants", "Operator identity verification"),
                    desc: tx(
                      "Chaque technicien qui touche un asset présente et enregistre sa pièce d'identité officielle avant l'intervention. Photo, numéro de pièce, date d'expiration sont conservés dans le dossier. Zéro opérateur anonyme. Zéro sous-traitance fantôme.",
                      "Every technician who touches an asset presents and records their official ID before the operation. Photo, ID number, expiration date are kept in the file. No anonymous operators. No ghost subcontracting."
                    ),
                    badge: tx("ID pièce + photo", "ID + photo"),
                  },
                  {
                    n: "03",
                    icon: UserCheck,
                    title: tx("Background check des intervenants", "Operator background check"),
                    desc: tx(
                      "Chaque intervenant fait l'objet d'une vérification d'antécédents : casier judiciaire (extrait B3), références professionnelles, habilitation confidentialité. Les opérateurs touchant des données classifiées passent une habilitation renforcée renouvelée annuellement.",
                      "Every operator undergoes a background check: criminal record, professional references, confidentiality clearance. Operators handling classified data go through enhanced annual re-clearance."
                    ),
                    badge: tx("Habilitation annuelle", "Annual clearance"),
                  },
                  {
                    n: "04",
                    icon: FileLock2,
                    title: tx("Scellés physiques numérotés", "Numbered physical seals"),
                    desc: tx(
                      "Chaque asset ou lot est scellé avec un sceau physique inviolable portant un numéro unique. Photos avant/après prise systématiquement. Toute rupture de scellé entre deux points de contrôle déclenche une alerte immédiate et un protocole d'incident.",
                      "Every asset or batch is sealed with a tamper-evident physical seal carrying a unique number. Before/after photos taken systematically. Any seal breach between two checkpoints triggers an immediate alert and incident protocol."
                    ),
                    badge: tx("Inviolable · photo", "Tamper-proof · photo"),
                  },
                  {
                    n: "05",
                    icon: Truck,
                    title: tx("Plaques d'immatriculation tracées", "Tracked vehicle registrations"),
                    desc: tx(
                      "Chaque véhicule de transport est identifié par sa plaque d'immatriculation, enregistrée dans le dossier. Le chauffeur est nommément désigné. Tout changement de véhicule en cours de route — même pour panne — est tracé et justifié dans le registre.",
                      "Every transport vehicle is identified by its license plate, recorded in the file. The driver is named. Any vehicle change en route — even for breakdown — is tracked and justified in the register."
                    ),
                    badge: tx("Chauffeur nommé", "Named driver"),
                  },
                  {
                    n: "06",
                    icon: MapPin,
                    title: tx("Traçabilité GPS en temps réel", "Real-time GPS tracking"),
                    desc: tx(
                      "Le convoi est suivi en temps réel par GPS depuis votre site jusqu'à notre entrepôt sécurisé. Itinéraire prédéfini, alertes sur écart > 500 m, temps d'arrêt consignés, température du conteneur surveillée pour les assets sensibles. Le trajet complet est archivé.",
                      "The convoy is tracked in real time by GPS from your site to our secure warehouse. Predefined route, alerts on deviation > 500 m, stop times logged, container temperature monitored for sensitive assets. The full route is archived."
                    ),
                    badge: tx("Écart ≤ 500 m", "Deviation ≤ 500 m"),
                  },
                  {
                    n: "07",
                    icon: Video,
                    title: tx("Vidéosurveillance des opérations", "Operations video surveillance"),
                    desc: tx(
                      "Chaque opération d'effacement, de démagnétisation ou de destruction est filmée intégralement, en HD, avec horodatage visible. Les vidéos sont stockées 10 ans, chiffrées AES-256, accessibles sur demande pour audit ou contentieux. Option : visionnage en direct depuis votre plateforme.",
                      "Every erasure, degaussing or destruction operation is filmed in full HD with visible timestamp. Videos are stored 10 years, AES-256 encrypted, available on request for audit or litigation. Option: live viewing from your platform."
                    ),
                    badge: tx("HD · 10 ans · AES-256", "HD · 10 years · AES-256"),
                  },
                  {
                    n: "08",
                    icon: ScrollText,
                    title: tx("Registre horodaté et signé", "Timestamped signed register"),
                    desc: tx(
                      "Chaque action est consignée dans un registre numérique horodaté à la milliseconde (NTP synchronisé), signé par clé cryptographique (eIDAS qualifiée), et ancré en blockchain notariée. Impossibilité technique de réécrire l'historique a posteriori.",
                      "Every action is logged in a millisecond-precision digital register (NTP synced), signed with a qualified eIDAS cryptographic key, and anchored on a notarized blockchain. Technically impossible to rewrite history after the fact."
                    ),
                    badge: tx("eIDAS · Blockchain", "eIDAS · Blockchain"),
                  },
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <StaggerItem key={step.n}>
                      <div className="relative flex gap-5 md:gap-8 group">
                        {/* Step marker */}
                        <div className="relative z-10 flex-shrink-0">
                          <div className="h-14 w-14 md:h-[72px] md:w-[72px] rounded-2xl bg-gradient-to-br from-[#047857] to-[#064E3B] ring-1 ring-[#047857]/40 flex items-center justify-center shadow-lg shadow-[#047857]/10 group-hover:shadow-[#047857]/30 transition-all">
                            <Icon className="h-6 w-6 md:h-7 md:w-7 text-[#6EE7B7]" />
                          </div>
                          <div className="absolute -top-1.5 -right-1.5 h-6 min-w-6 px-1.5 rounded-full bg-[#6EE7B7] text-[10px] font-black text-[#05070E] flex items-center justify-center ring-2 ring-[#05070E]">
                            {step.n}
                          </div>
                        </div>

                        {/* Card */}
                        <div className="flex-1 bg-white/[0.03] ring-1 ring-white/10 rounded-2xl p-5 md:p-7 backdrop-blur-sm group-hover:ring-[#047857]/30 group-hover:bg-white/[0.05] transition">
                          <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                            <h4 className="text-lg md:text-xl font-bold text-white leading-tight">
                              {step.title}
                            </h4>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#047857]/10 text-[#6EE7B7] text-[10px] font-bold uppercase tracking-wider ring-1 ring-[#047857]/20">
                              <CheckCircle2 className="h-3 w-3" />
                              {step.badge}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <FadeIn>
                <div className="mt-10 bg-gradient-to-r from-[#047857]/10 via-[#047857]/5 to-transparent ring-1 ring-[#047857]/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5">
                  <FileSignature className="h-10 w-10 text-[#6EE7B7] flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-white mb-1">
                      {tx(
                        "Dossier de preuves remis à la fin de chaque opération",
                        "Evidence file handed over at the end of every operation"
                      )}
                    </p>
                    <p className="text-sm text-slate-300">
                      {tx(
                        "PV d'huissier, scans des pièces d'identité, photos des scellés, enregistrement GPS, vidéos horodatées, registre cryptographique — tout est consolidé dans un dossier PDF signé eIDAS, directement téléchargeable depuis la plateforme.",
                        "Bailiff report, ID scans, seal photos, GPS log, timestamped videos, cryptographic register — all consolidated in an eIDAS-signed PDF file, directly downloadable from the platform."
                      )}
                    </p>
                  </div>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-5 py-3 rounded-xl transition whitespace-nowrap"
                  >
                    {tx("Voir un dossier type", "See a sample file")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* ---------- 8.3 · ZERO TRUST ITAD ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                  <KeyRound className="h-3.5 w-3.5" />
                  {tx("02 · Zero Trust ITAD", "02 · Zero Trust ITAD")}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {tx(
                    "Ne faites confiance à aucun maillon. Vérifiez-les tous.",
                    "Trust no link. Verify them all."
                  )}
                </h3>
                <p className="text-lg text-slate-300">
                  {tx(
                    "Le principe Zero Trust appliqué à la chaîne ITAD : aucune étape n'est considérée comme sûre par défaut. Chaque maillon est vérifié, audité, et certifiable indépendamment — même les nôtres. Un échec de vérification bloque la chaîne entière.",
                    "Zero Trust applied to the ITAD chain: no step is trusted by default. Every link is verified, audited, and independently certifiable — even ours. A verification failure blocks the entire chain."
                  )}
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  icon: Database,
                  title: tx("Réception", "Reception"),
                  desc: tx(
                    "Comptage contradictoire, hash d'empreinte, scan RFID par asset.",
                    "Contradictory count, fingerprint hash, per-asset RFID scan."
                  ),
                },
                {
                  icon: ScanEye,
                  title: tx("Identification", "Identification"),
                  desc: tx(
                    "Reconnaissance série + matériel, classification données, niveau de risque.",
                    "Serial + hardware recognition, data classification, risk level."
                  ),
                },
                {
                  icon: Shield,
                  title: tx("Isolation", "Isolation"),
                  desc: tx(
                    "Zone sécurisée air-gap, accès biométrique, vidéosurveillance H24.",
                    "Air-gapped secure zone, biometric access, 24/7 video surveillance."
                  ),
                },
                {
                  icon: Cpu,
                  title: tx("Traitement", "Treatment"),
                  desc: tx(
                    "Effacement / destruction selon la méthode choisie, sous supervision.",
                    "Erasure / destruction per chosen method, under supervision."
                  ),
                },
                {
                  icon: ClipboardCheck,
                  title: tx("Vérification", "Verification"),
                  desc: tx(
                    "Échantillonnage aléatoire, double contrôle, test de récupération forensique.",
                    "Random sampling, double-check, forensic recovery test."
                  ),
                },
                {
                  icon: FileBadge,
                  title: tx("Certification", "Certification"),
                  desc: tx(
                    "Certificat signé, hash SHA-256, ancrage blockchain, archivage 10 ans.",
                    "Signed certificate, SHA-256 hash, blockchain anchor, 10-year archive."
                  ),
                },
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                  <StaggerItem key={link.title}>
                    <div className="relative h-full bg-white/[0.03] ring-1 ring-white/10 rounded-2xl p-5 hover:bg-white/[0.06] hover:ring-[#047857]/30 transition group">
                      {/* Connector arrows on desktop */}
                      {i < 5 && (
                        <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-6 w-6 rounded-full bg-[#0A0F1E] ring-1 ring-white/10 items-center justify-center">
                          <ArrowRight className="h-3 w-3 text-[#6EE7B7]" />
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#047857]/20 to-[#047857]/5 ring-1 ring-[#047857]/30 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[#6EE7B7]" />
                        </div>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30 text-emerald-300 text-[9px] font-bold uppercase tracking-wider">
                          <CheckCircle className="h-2.5 w-2.5" />
                          {tx("Vérifié", "Verified")}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 mb-1">
                        0{i + 1} / 06
                      </p>
                      <h4 className="text-base font-bold text-white mb-1.5">{link.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{link.desc}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <FadeIn>
              <div className="mt-10 grid md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Network,
                    title: tx("Segmentation réseau", "Network segmentation"),
                    desc: tx(
                      "Chaque zone de traitement est isolée sur un VLAN dédié. Aucun asset client n'est jamais connecté à internet pendant le traitement.",
                      "Every processing zone is isolated on a dedicated VLAN. No client asset is ever connected to the internet during treatment."
                    ),
                  },
                  {
                    icon: Eye,
                    title: tx("Principe du double regard", "Four-eyes principle"),
                    desc: tx(
                      "Toute opération irréversible (destruction, effacement purge) est validée par deux opérateurs habilités indépendants.",
                      "Every irreversible operation (destruction, purge erasure) is validated by two independent cleared operators."
                    ),
                  },
                  {
                    icon: Binary,
                    title: tx("Preuves cryptographiques", "Cryptographic proofs"),
                    desc: tx(
                      "Chaque étape émet un hash SHA-256 chaîné à l'étape précédente. Altérer une étape invalide toute la chaîne — détection immédiate.",
                      "Each step emits a SHA-256 hash chained to the previous one. Altering a step invalidates the whole chain — immediate detection."
                    ),
                  },
                ].map((b) => {
                  const I = b.icon;
                  return (
                    <div
                      key={b.title}
                      className="bg-gradient-to-br from-white/[0.05] to-transparent ring-1 ring-white/10 rounded-2xl p-6"
                    >
                      <I className="h-6 w-6 text-[#6EE7B7] mb-3" />
                      <h5 className="font-bold text-white text-sm mb-1.5">{b.title}</h5>
                      <p className="text-xs text-slate-400 leading-relaxed">{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ---------- 8.4 · UNIFICATION 4 PILLARS ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mx-auto text-center mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2 justify-center">
                  <Layers className="h-3.5 w-3.5" />
                  {tx("03 · Plateforme unifiée", "03 · Unified platform")}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {tx(
                    "Les autres font l'un OU l'autre.",
                    "The others do one OR the other."
                  )}
                  <br />
                  <span className="bg-gradient-to-r from-[#047857] to-[#6EE7B7] bg-clip-text text-transparent">
                    {tx("Nous unifions les 4 piliers.", "We unify the 4 pillars.")}
                  </span>
                </h3>
                <p className="text-lg text-slate-300">
                  {tx(
                    "ITAD, cybersécurité, asset management et carbone : quatre métiers longtemps séparés, pilotés par des équipes différentes, avec des outils différents. GreenTechCycle est le premier broker à les faire converger sur une seule plateforme, avec une seule source de vérité.",
                    "ITAD, cybersecurity, asset management and carbon: four disciplines long kept separate, run by different teams with different tools. GreenTechCycle is the first broker to converge them on a single platform, with a single source of truth."
                  )}
                </p>
              </div>
            </FadeIn>

            <div className="relative max-w-5xl mx-auto">
              {/* Central hub */}
              <div className="hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="h-36 w-36 rounded-full bg-gradient-to-br from-[#047857] via-[#059669] to-[#064E3B] flex items-center justify-center shadow-2xl shadow-[#047857]/30">
                    <div className="h-32 w-32 rounded-full bg-[#05070E] flex items-center justify-center ring-1 ring-white/10">
                      <div className="text-center">
                        <Sparkles className="h-6 w-6 text-[#6EE7B7] mx-auto mb-1" />
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                          {tx("Plateforme", "Platform")}
                        </p>
                        <p className="text-sm font-black text-white">GTC</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full ring-8 ring-[#047857]/10 animate-pulse" />
                </div>
              </div>

              {/* 4 quadrants */}
              <StaggerContainer className="grid md:grid-cols-2 gap-5 lg:gap-10">
                {[
                  {
                    icon: RefreshCcw,
                    tint: "from-emerald-500/20 to-emerald-700/5",
                    ring: "ring-emerald-400/30",
                    color: "text-emerald-300",
                    tag: tx("Pilier 1", "Pillar 1"),
                    title: "ITAD",
                    subtitle: tx("Cycle de vie des assets", "Asset lifecycle"),
                    bullets: [
                      tx("Collecte, transport, audit, traitement", "Collection, transport, audit, treatment"),
                      tx("Reconditionnement & valorisation B2B", "Refurbishment & B2B resale"),
                      tx("Filières DEEE certifiées R2v3 / e-Stewards", "Certified WEEE channels R2v3 / e-Stewards"),
                    ],
                    link: "/processus-itad",
                  },
                  {
                    icon: Shield,
                    tint: "from-red-500/15 to-red-700/5",
                    ring: "ring-red-400/30",
                    color: "text-red-300",
                    tag: tx("Pilier 2", "Pillar 2"),
                    title: tx("Cybersécurité", "Cybersecurity"),
                    subtitle: tx("Effacement · audit · conformité", "Erasure · audit · compliance"),
                    bullets: [
                      tx("Effacement NIST · DoD · IEEE 2883 · Gutmann", "Erasure NIST · DoD · IEEE 2883 · Gutmann"),
                      tx("Chaîne de garde niveau défense", "Defense-grade chain of custody"),
                      tx("Audit RGPD · NIS2 · DORA · ISO 27001", "RGPD · NIS2 · DORA · ISO 27001 audit"),
                    ],
                    link: "/securite",
                  },
                  {
                    icon: Layers,
                    tint: "from-sky-500/15 to-sky-700/5",
                    ring: "ring-sky-400/30",
                    color: "text-sky-300",
                    tag: tx("Pilier 3", "Pillar 3"),
                    title: tx("Asset Management", "Asset Management"),
                    subtitle: tx("Visibilité parc IT/OT & licences", "IT/OT fleet & licenses visibility"),
                    bullets: [
                      tx("Parc IT + OT industriel unifié", "Unified IT + industrial OT fleet"),
                      tx("Licences SaaS & on-prem rationalisées", "Rationalized SaaS & on-prem licenses"),
                      tx("Alertes patch management & EOL", "Patch management & EOL alerts"),
                    ],
                    link: "/plateforme",
                  },
                  {
                    icon: Leaf,
                    tint: "from-amber-500/15 to-amber-700/5",
                    ring: "ring-amber-400/30",
                    color: "text-amber-300",
                    tag: tx("Pilier 4", "Pillar 4"),
                    title: tx("Carbone & RSE", "Carbon & ESG"),
                    subtitle: tx("Bilan environnemental · ISO 14001", "Environmental footprint · ISO 14001"),
                    bullets: [
                      tx("Bilan carbone évité par asset", "Avoided carbon footprint per asset"),
                      tx("Alimentation ESRS E5 / CSRD automatique", "Automatic ESRS E5 / CSRD feed"),
                      tx("ISO 14001 · matière par matière tracée", "ISO 14001 · material-by-material traced"),
                    ],
                    link: "/impact",
                  },
                ].map((p) => {
                  const I = p.icon;
                  return (
                    <StaggerItem key={p.title}>
                      <div
                        className={`relative h-full bg-gradient-to-br ${p.tint} ring-1 ${p.ring} rounded-3xl p-7 md:p-8 backdrop-blur-sm hover:-translate-y-1 transition duration-300`}
                      >
                        <div className="flex items-start justify-between mb-5">
                          <div
                            className={`h-12 w-12 rounded-xl bg-white/10 ring-1 ${p.ring} flex items-center justify-center ${p.color}`}
                          >
                            <I className="h-6 w-6" />
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 ring-1 ${p.ring} text-[10px] font-bold uppercase tracking-wider ${p.color}`}
                          >
                            {p.tag}
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-1">{p.title}</h4>
                        <p className={`text-sm font-medium ${p.color} mb-5`}>{p.subtitle}</p>
                        <ul className="space-y-2.5 mb-6">
                          {p.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-slate-300">
                              <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${p.color}`} />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={p.link}
                          className={`inline-flex items-center gap-1.5 ${p.color} font-semibold text-sm hover:gap-2.5 transition-all`}
                        >
                          {tx("Explorer", "Explore")}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>

            <FadeIn>
              <div className="mt-12 max-w-3xl mx-auto text-center">
                <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
                  {tx(
                    "« Les autres font de l'ITAD ",
                    "\"The others do ITAD "
                  )}
                  <span className="text-[#6EE7B7]">
                    {tx("OU", "OR")}
                  </span>
                  {tx(
                    " de la cyber. Nous faisons les deux, ensemble, sur une seule plateforme. »",
                    " cyber. We do both, together, on a single platform.\""
                  )}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ---------- 8.5 · SCORING & RISK VISIBILITY DASHBOARD ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                  <BarChart3 className="h-3.5 w-3.5" />
                  {tx("04 · Scoring & visibilité", "04 · Scoring & visibility")}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {tx(
                    "Voyez vos risques avant qu'ils ne deviennent des incidents.",
                    "See your risks before they become incidents."
                  )}
                </h3>
                <p className="text-lg text-slate-300">
                  {tx(
                    "Chaque asset de votre parc est scoré sur deux axes indépendants : un score de risque (criticité des données, âge, état physique, vulnérabilités CVE connues) et un score de valeur résiduelle (potentiel de reconditionnement, prix marché). La plateforme consolide tout en une carte de chaleur temps réel — vous voyez, vous décidez.",
                    "Every asset in your fleet is scored on two independent axes: a risk score (data criticality, age, physical condition, known CVE vulnerabilities) and a residual-value score (refurbishment potential, market price). The platform consolidates everything into a real-time heatmap — you see, you decide."
                  )}
                </p>
              </div>
            </FadeIn>

            {/* Gauges on dark */}
            <div className="grid md:grid-cols-3 gap-5 mb-10">
              <ScaleIn delay={0}>
                <div className="bg-white rounded-2xl p-7 ring-1 ring-white/10 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                    <AlertTriangle className="h-3 w-3" />
                    {tx("Risque", "Risk")}
                  </div>
                  <Gauge180
                    value={78}
                    label={tx("Score de risque", "Risk score")}
                    color="#EF4444"
                    description={tx(
                      "Criticité données · âge · état · CVE connues",
                      "Data criticality · age · condition · known CVEs"
                    )}
                  />
                </div>
              </ScaleIn>
              <ScaleIn delay={0.1}>
                <div className="bg-white rounded-2xl p-7 ring-1 ring-white/10 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                    <TrendingUp className="h-3 w-3" />
                    {tx("Valeur", "Value")}
                  </div>
                  <Gauge180
                    value={62}
                    label={tx("Valeur résiduelle", "Residual value")}
                    color="#F59E0B"
                    description={tx(
                      "Reconditionnement · prix marché · demande",
                      "Refurbishment · market price · demand"
                    )}
                  />
                </div>
              </ScaleIn>
              <ScaleIn delay={0.2}>
                <div className="bg-white rounded-2xl p-7 ring-1 ring-white/10 text-center">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-4">
                    <RefreshCcw className="h-3 w-3" />
                    {tx("Reconditionnement", "Refurbishment")}
                  </div>
                  <Gauge180
                    value={85}
                    label={tx("Potentiel de remise en service", "Return-to-service potential")}
                    color="#047857"
                    description={tx(
                      "Diagnostic · pièces dispo · testabilité",
                      "Diagnostics · parts availability · testability"
                    )}
                  />
                </div>
              </ScaleIn>
            </div>

            {/* Dashboard mockup */}
            <FadeIn>
              <div className="bg-[#0A0F1E] ring-1 ring-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#047857] to-[#064E3B] flex items-center justify-center">
                      <Server className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                        {tx("Vue parc · temps réel", "Fleet view · real-time")}
                      </p>
                      <p className="font-bold text-white text-sm">
                        {tx("Portefeuille ITAD — 2 147 assets", "ITAD portfolio — 2,147 assets")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 ring-1 ring-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {tx("Live", "Live")}
                    </span>
                  </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {[
                    {
                      label: tx("Risque critique", "Critical risk"),
                      value: "47",
                      sub: tx("assets · immédiat", "assets · immediate"),
                      color: "text-red-400",
                      bg: "bg-red-500/10 ring-red-500/20",
                    },
                    {
                      label: tx("Risque élevé", "High risk"),
                      value: "183",
                      sub: tx("assets · 30 jours", "assets · 30 days"),
                      color: "text-orange-400",
                      bg: "bg-orange-500/10 ring-orange-500/20",
                    },
                    {
                      label: tx("Valorisables", "Recoverable"),
                      value: "1 412",
                      sub: tx("€ 284 600 estimé", "€ 284,600 estimated"),
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10 ring-emerald-500/20",
                    },
                    {
                      label: tx("À détruire", "To destroy"),
                      value: "96",
                      sub: tx("niveau confidentiel", "confidential tier"),
                      color: "text-slate-300",
                      bg: "bg-slate-500/10 ring-slate-500/20",
                    },
                  ].map((k) => (
                    <div
                      key={k.label}
                      className={`rounded-xl ${k.bg} ring-1 p-4`}
                    >
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        {k.label}
                      </p>
                      <p className={`text-2xl font-black ${k.color} mt-1`}>{k.value}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{k.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-12 gap-5">
                  {/* Risk heatmap */}
                  <div className="md:col-span-7 bg-white/[0.02] ring-1 ring-white/5 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        {tx("Heatmap risque × valeur", "Risk × value heatmap")}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {tx("10 × 6 buckets", "10 × 6 buckets")}
                      </span>
                    </div>
                    <div className="grid grid-cols-10 gap-[3px]">
                      {Array.from({ length: 60 }).map((_, i) => {
                        const col = i % 10;
                        const row = Math.floor(i / 10);
                        // simulate intensity: higher in top-right (risk) + diag
                        const intensity = Math.min(1, (col + row + Math.random() * 3) / 13);
                        let bg = "bg-emerald-500/30";
                        if (intensity > 0.3) bg = "bg-emerald-400/50";
                        if (intensity > 0.5) bg = "bg-amber-400/60";
                        if (intensity > 0.7) bg = "bg-orange-500/70";
                        if (intensity > 0.85) bg = "bg-red-500/80";
                        return <div key={i} className={`${bg} rounded-[3px] aspect-square`} />;
                      })}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                      <span>{tx("← Valeur faible", "← Low value")}</span>
                      <div className="flex items-center gap-1.5">
                        <span>{tx("Risque :", "Risk:")}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/40 text-emerald-100 font-bold">
                          OK
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-400/60 text-amber-900 font-bold">
                          !
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-red-500/80 text-white font-bold">
                          !!
                        </span>
                      </div>
                      <span>{tx("Valeur haute →", "High value →")}</span>
                    </div>
                  </div>

                  {/* Top risks list */}
                  <div className="md:col-span-5 bg-white/[0.02] ring-1 ring-white/5 rounded-2xl p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                      {tx("Top risques à traiter", "Top risks to address")}
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Dell R740 · srv-prod-22",
                          tag: tx("RH · PII", "HR · PII"),
                          score: 94,
                          color: "bg-red-500",
                        },
                        {
                          name: "Lenovo T14 · lot LN-118",
                          tag: tx("Finance · bancaire", "Finance · banking"),
                          score: 87,
                          color: "bg-red-500",
                        },
                        {
                          name: 'MacBook Pro 16" · dir-cfo',
                          tag: tx("COMEX · confidentiel", "COMEX · confidential"),
                          score: 82,
                          color: "bg-orange-500",
                        },
                        {
                          name: "HP EliteDesk · lot HP-207",
                          tag: tx("R&D · brevets", "R&D · patents"),
                          score: 76,
                          color: "bg-orange-500",
                        },
                        {
                          name: "NAS Synology · site Lille",
                          tag: tx("Production · logs OT", "Production · OT logs"),
                          score: 71,
                          color: "bg-amber-500",
                        },
                      ].map((r) => (
                        <div key={r.name} className="flex items-center gap-3">
                          <HardDrive className="h-4 w-4 text-slate-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{r.name}</p>
                            <p className="text-[10px] text-slate-500">{r.tag}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className={`h-full ${r.color}`}
                                style={{ width: `${r.score}%` }}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-white w-6 text-right">
                              {r.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ---------- 8.6 · ERASURE METHODOLOGIES (not "certifications") ---------- */}
        <div className="relative py-24 md:py-32 border-b border-white/5">
          <div className="container mx-auto px-4">
            <FadeIn>
              <div className="max-w-3xl mb-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                  <Binary className="h-3.5 w-3.5" />
                  {tx("05 · Méthodologies d'effacement", "05 · Erasure methodologies")}
                </p>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                  {tx(
                    "5 méthodologies. Une par niveau de menace.",
                    "5 methodologies. One per threat level."
                  )}
                </h3>
                <p className="text-lg text-slate-300">
                  {tx(
                    "Nous ne suivons pas une méthodologie. Nous les appliquons toutes, en choisissant celle qui correspond exactement à la sensibilité des données et au type de support. Un SSD moderne n'a pas les mêmes besoins qu'un disque magnétique classifié.",
                    "We don't follow one methodology. We apply them all, picking the one that exactly matches the data sensitivity and media type. A modern SSD has different needs than a classified magnetic disk."
                  )}
                </p>
              </div>
            </FadeIn>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  code: "NIST 800-88 Rev. 1",
                  title: tx("Le standard de référence", "The gold standard"),
                  levels: [
                    { name: "Clear", desc: tx("Effacement logique · réutilisable", "Logical wipe · reusable") },
                    { name: "Purge", desc: tx("Reset cryptographique · irrécupérable", "Crypto-erase · unrecoverable") },
                    { name: "Destroy", desc: tx("Destruction physique · unique", "Physical destruction · single-use") },
                  ],
                  media: tx("HDD · SSD · mobiles · serveurs", "HDD · SSD · mobile · servers"),
                  when: tx(
                    "La grande majorité des cas. Recommandé NIST, ANSSI, R2v3.",
                    "The vast majority of cases. Recommended by NIST, ANSSI, R2v3."
                  ),
                  security: 4,
                  accent: "from-emerald-500/20 to-emerald-900/5 ring-emerald-400/30 text-emerald-300",
                },
                {
                  code: "DoD 5220.22-M",
                  title: tx("Standard militaire historique", "Historical military standard"),
                  levels: [
                    { name: "Pass 1", desc: tx("Écriture de zéros", "Zero overwrite") },
                    { name: "Pass 2", desc: tx("Écriture de uns", "One overwrite") },
                    { name: "Pass 3-7", desc: tx("Motifs aléatoires vérifiés", "Verified random patterns") },
                  ],
                  media: tx("HDD magnétiques · environnements sensibles", "Magnetic HDD · sensitive environments"),
                  when: tx(
                    "Environnements historiquement militaires, défense, souverains.",
                    "Historically military, defense, sovereign environments."
                  ),
                  security: 4,
                  accent: "from-sky-500/20 to-sky-900/5 ring-sky-400/30 text-sky-300",
                },
                {
                  code: "IEEE 2883-2022",
                  title: tx("Le standard SSD moderne", "The modern SSD standard"),
                  levels: [
                    { name: "Clear", desc: tx("Block erase ATA", "ATA block erase") },
                    { name: "Purge", desc: tx("Sanitize Block Erase + vérification", "Sanitize Block Erase + verification") },
                    { name: "NVMe", desc: tx("Cryptographic erase natif", "Native cryptographic erase") },
                  ],
                  media: tx("SSD · NVMe · stockage flash moderne", "SSD · NVMe · modern flash storage"),
                  when: tx(
                    "Indispensable sur SSD : les méthodes HDD ne fonctionnent plus à cause du wear-leveling.",
                    "Mandatory for SSDs: HDD methods no longer work due to wear-leveling."
                  ),
                  security: 5,
                  accent: "from-violet-500/20 to-violet-900/5 ring-violet-400/30 text-violet-300",
                },
                {
                  code: "Gutmann 35 passes",
                  title: tx("Sécurité paranoïaque", "Paranoid security"),
                  levels: [
                    { name: "P1-4", desc: tx("Patterns aléatoires", "Random patterns") },
                    { name: "P5-31", desc: tx("27 motifs spécifiques à chaque encodage", "27 encoding-specific patterns") },
                    { name: "P32-35", desc: tx("Patterns aléatoires finaux", "Final random patterns") },
                  ],
                  media: tx("HDD très anciens · archives classifiées", "Very old HDD · classified archives"),
                  when: tx(
                    "Cas extrêmes : données ultra-sensibles sur supports historiques. Plus lent mais maximal.",
                    "Extreme cases: ultra-sensitive data on historical media. Slower but maximal."
                  ),
                  security: 5,
                  accent: "from-red-500/20 to-red-900/5 ring-red-400/30 text-red-300",
                },
                {
                  code: tx("Destruction physique", "Physical destruction"),
                  title: tx("Quand l'effacement ne suffit pas", "When erasure isn't enough"),
                  levels: [
                    { name: tx("Broyage", "Shredding"), desc: tx("Particules < 6 mm", "Particles < 6 mm") },
                    { name: tx("Démag.", "Degauss."), desc: tx("Champ ≥ 8000 Oersted", "Field ≥ 8000 Oersted") },
                    { name: tx("Incinération", "Incineration"), desc: tx("Four certifié · 1000°C", "Certified furnace · 1000°C") },
                  ],
                  media: tx("Tous supports · média irrécupérables", "All media · unrecoverable media"),
                  when: tx(
                    "Supports défectueux, données classifiées Diffusion Restreinte ou supérieure, exigence client.",
                    "Faulty media, Restricted Distribution or higher classified data, client requirement."
                  ),
                  security: 5,
                  accent: "from-slate-500/20 to-slate-900/5 ring-slate-400/30 text-slate-300",
                },
                {
                  code: tx("Crypto-shredding", "Crypto-shredding"),
                  title: tx("Chiffrement puis destruction de clé", "Encrypt then destroy key"),
                  levels: [
                    { name: "AES-256", desc: tx("Chiffrement FDE natif", "Native FDE encryption") },
                    { name: tx("Clé", "Key"), desc: tx("Stockée en HSM dédié", "Stored in dedicated HSM") },
                    { name: tx("Destruction", "Destruction"), desc: tx("Zéroïsation HSM · irréversible", "HSM zeroization · irreversible") },
                  ],
                  media: tx("Cloud · SSD chiffrés · environnements hybrides", "Cloud · encrypted SSDs · hybrid environments"),
                  when: tx(
                    "Environnements cloud ou volumes trop vastes pour un effacement passe-par-passe.",
                    "Cloud environments or volumes too large for pass-by-pass erasure."
                  ),
                  security: 4,
                  accent: "from-amber-500/20 to-amber-900/5 ring-amber-400/30 text-amber-300",
                },
              ].map((m) => (
                <StaggerItem key={m.code}>
                  <div
                    className={`relative h-full bg-gradient-to-br ${m.accent} ring-1 rounded-3xl p-6 backdrop-blur-sm hover:-translate-y-1 transition duration-300`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                          {tx("Méthodologie", "Methodology")}
                        </p>
                        <p className="font-mono text-base font-bold text-white">{m.code}</p>
                      </div>
                      {/* Security level bars */}
                      <div className="flex items-end gap-0.5 h-8">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 rounded-sm ${
                              idx < m.security ? "bg-[#6EE7B7]" : "bg-white/10"
                            }`}
                            style={{ height: `${(idx + 1) * 18}%` }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-base font-semibold text-white mb-4">{m.title}</p>

                    {/* Sub-levels */}
                    <div className="space-y-1.5 mb-4 bg-black/30 rounded-xl p-3">
                      {m.levels.map((l) => (
                        <div key={l.name} className="flex items-baseline gap-2 text-xs">
                          <span className="font-mono font-bold text-[#6EE7B7] flex-shrink-0 min-w-[60px]">
                            {l.name}
                          </span>
                          <span className="text-slate-300">{l.desc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">
                          {tx("Support cible", "Target media")}
                        </p>
                        <p className="text-slate-300">{m.media}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-0.5">
                          {tx("Quand l'utiliser", "When to use")}
                        </p>
                        <p className="text-slate-300 leading-relaxed">{m.when}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        {/* ---------- 8.7 · SECURITY AUDIT & COMPLIANCE ---------- */}
        <div className="relative py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <FadeIn>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                    <ScanEye className="h-3.5 w-3.5" />
                    {tx("06 · Audit de sécurité", "06 · Security audit")}
                  </p>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-5">
                    {tx(
                      "Tout est tracé. Tout est auditable.",
                      "Everything tracked. Everything auditable."
                    )}
                  </h3>
                  <p className="text-lg text-slate-300 mb-8">
                    {tx(
                      "Chaque opération déclenche automatiquement un audit de sécurité : échantillonnage aléatoire, vérification cryptographique, contrôle de conformité aux méthodologies choisies. Le rapport d'audit est généré sous 24h, signé, et directement exploitable par vos auditeurs internes ou vos autorités de tutelle.",
                      "Every operation automatically triggers a security audit: random sampling, cryptographic verification, methodology compliance check. The audit report is generated within 24h, signed, and directly usable by your internal auditors or regulators."
                    )}
                  </p>

                  <div className="space-y-3 mb-8">
                    {[
                      {
                        icon: ClipboardCheck,
                        title: tx("Audit automatique par lot", "Automatic per-batch audit"),
                        desc: tx(
                          "Échantillonnage ≥ 10 % des assets, contrôle d'intégrité, test de récupération forensique.",
                          "≥ 10% asset sampling, integrity check, forensic recovery test."
                        ),
                      },
                      {
                        icon: FileSignature,
                        title: tx("Rapport d'audit signé sous 24h", "Signed audit report within 24h"),
                        desc: tx(
                          "PDF + JSON · signature qualifiée eIDAS · preuves cryptographiques attachées.",
                          "PDF + JSON · qualified eIDAS signature · attached cryptographic proofs."
                        ),
                      },
                      {
                        icon: Clock,
                        title: tx("Timeline d'audit consultable 10 ans", "10-year audit timeline"),
                        desc: tx(
                          "Chaque action est tracée et rejouable a posteriori pour toute inspection future.",
                          "Every action is tracked and replayable after the fact for any future inspection."
                        ),
                      },
                    ].map((f) => {
                      const I = f.icon;
                      return (
                        <div
                          key={f.title}
                          className="flex items-start gap-4 bg-white/[0.03] ring-1 ring-white/10 rounded-2xl p-5"
                        >
                          <div className="h-10 w-10 rounded-xl bg-[#047857]/10 ring-1 ring-[#047857]/30 flex items-center justify-center flex-shrink-0">
                            <I className="h-5 w-5 text-[#6EE7B7]" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm mb-1">{f.title}</p>
                            <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </FadeIn>
              </div>

              <div>
                <FadeIn direction="left">
                  {/* Compliance badges */}
                  <div className="bg-gradient-to-br from-[#047857]/40 via-[#05070E] to-[#05070E] ring-1 ring-[#047857]/20 rounded-3xl p-7 md:p-9 mb-6">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6EE7B7] mb-4 inline-flex items-center gap-2">
                      <Shield className="h-3.5 w-3.5" />
                      {tx("Conformités couvertes", "Compliance covered")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "RGPD", desc: tx("Art. 32 · sécurité du traitement", "Art. 32 · processing security") },
                        { name: "NIS2", desc: tx("Directive UE · cybersécurité", "EU Directive · cybersecurity") },
                        { name: "DORA", desc: tx("Résilience opérationnelle fin.", "Financial op. resilience") },
                        { name: "ISO 27001", desc: tx("SMSI · certification", "ISMS · certification") },
                        { name: "ISO 27040", desc: tx("Sécurité du stockage", "Storage security") },
                        { name: "ANSSI", desc: tx("Référentiel effacement FR", "FR erasure baseline") },
                      ].map((c) => (
                        <div
                          key={c.name}
                          className="bg-white/[0.04] ring-1 ring-white/10 rounded-xl p-3 hover:bg-white/[0.06] transition"
                        >
                          <p className="font-black text-white text-sm">{c.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{c.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample audit card */}
                  <div className="bg-[#0A0F1E] ring-1 ring-white/10 rounded-3xl p-6 md:p-7">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[11px] font-bold">
                          AUDIT-2026-0871
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                          {tx("Conforme", "Compliant")}
                        </span>
                      </div>
                      <FileBadge className="h-5 w-5 text-[#6EE7B7]" />
                    </div>
                    <p className="font-bold text-white mb-1">
                      {tx(
                        "Audit effacement NIST 800-88 — 142 postes",
                        "NIST 800-88 erasure audit — 142 workstations"
                      )}
                    </p>
                    <p className="text-xs text-slate-500 mb-5">
                      {tx(
                        "Site Lyon · lot L-7421 · 14 avril 2026",
                        "Lyon site · batch L-7421 · April 14, 2026"
                      )}
                    </p>

                    <div className="space-y-2.5">
                      {[
                        { label: tx("Assets scannés", "Assets scanned"), value: "142 / 142", ok: true },
                        { label: tx("Échantillons vérifiés", "Samples verified"), value: "18 (12.7 %)", ok: true },
                        { label: tx("Récupération forensique", "Forensic recovery"), value: tx("0 byte récupéré", "0 byte recovered"), ok: true },
                        { label: tx("Hash chaîne custody", "Custody chain hash"), value: "SHA-256 ✓", ok: true },
                        { label: tx("Signature eIDAS", "eIDAS signature"), value: tx("Valide", "Valid"), ok: true },
                        { label: tx("Huissier présent", "Bailiff present"), value: tx("Me Lemaire · PV #4412", "Me Lemaire · report #4412"), ok: true },
                      ].map((r) => (
                        <div
                          key={r.label}
                          className="flex items-center justify-between text-xs border-b border-white/5 pb-2.5 last:border-0 last:pb-0"
                        >
                          <span className="text-slate-400">{r.label}</span>
                          <span className="font-mono font-semibold text-white flex items-center gap-1.5">
                            {r.value}
                            {r.ok && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        {tx("Généré en", "Generated in")}
                      </p>
                      <p className="text-xs font-mono font-bold text-[#6EE7B7]">
                        21h 47min
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Bottom CTA */}
            <FadeIn>
              <div className="mt-16 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6EE7B7] mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {tx("Prêt à sécuriser votre ITAD ?", "Ready to secure your ITAD?")}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
                  {tx(
                    "Demandez un audit blanc gratuit sur 50 de vos assets.",
                    "Request a free blind audit on 50 of your assets."
                  )}
                </h3>
                <p className="text-slate-300 mb-7 max-w-2xl mx-auto">
                  {tx(
                    "Notre équipe cyber vous livre sous 10 jours un rapport d'audit complet avec scoring, recommandations et simulation de la chaîne de garde. Aucun engagement.",
                    "Our cyber team delivers within 10 days a full audit report with scoring, recommendations and chain-of-custody simulation. No commitment."
                  )}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#047857]/30"
                  >
                    {tx("Demander l'audit blanc", "Request the blind audit")}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link
                    href="/securite"
                    className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl ring-1 ring-white/15 backdrop-blur transition"
                  >
                    {tx("Voir la page sécurité complète", "See full security page")}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* E-TICKETING                                  */}
      {/* ============================================ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <FadeIn>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                  {tx("Support intégré", "Integrated support")}
                </p>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                  {tx("E-Ticketing natif", "Native e-ticketing")}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {tx(
                    "Un système de tickets intégré à la plateforme. Ouvrez une demande, suivez son avancement en temps réel, recevez les notifications pertinentes, archivez le certificat associé. Aucun email perdu, aucune relance manuelle.",
                    "A ticket system integrated in the platform. Open a request, track progress in real time, receive relevant notifications, archive the associated certificate. No lost emails, no manual follow-ups."
                  )}
                </p>
                <div className="space-y-3 mb-7">
                  {[
                    tx("SLA contractuels par type de demande", "Contractual SLAs per request type"),
                    tx("Notifications email + in-app + webhook", "Email + in-app + webhook notifications"),
                    tx("Historique complet et exportable", "Full history, exportable"),
                    tx("Base de connaissance alimentée automatiquement", "Auto-fed knowledge base"),
                  ].map((li) => (
                    <div key={li} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-[#047857] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{li}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/plateforme"
                  className="inline-flex items-center gap-2 text-[#047857] font-semibold hover:text-[#047857] transition"
                >
                  {tx("Découvrir la plateforme", "Discover the platform")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </div>

            {/* Ticket timeline mockup */}
            <div className="lg:col-span-8">
              <FadeIn direction="left">
                <div className="bg-slate-50 rounded-3xl p-6 md:p-10 ring-1 ring-slate-100">
                  {/* Fake ticket header */}
                  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-100 p-5 mb-6">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                            #GTC-20408
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold uppercase tracking-wider">
                            {tx("En cours", "In progress")}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900">
                          {tx(
                            "Effacement NIST 800-88 — 142 postes site Lyon",
                            "NIST 800-88 erasure — 142 workstations Lyon site"
                          )}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {tx(
                            "Ouvert par Sarah L. · DSI · il y a 2h12",
                            "Opened by Sarah L. · IT Director · 2h12 ago"
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                          SLA
                        </p>
                        <p className="font-bold text-slate-900">24h</p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <ol className="relative space-y-5">
                    <div
                      aria-hidden="true"
                      className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-emerald-400 via-emerald-300 to-slate-200"
                    />
                    {ticketSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = idx <= 2;
                      return (
                        <li key={step.title} className="relative flex gap-4">
                          <div
                            className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-slate-50 flex-shrink-0 ${
                              isActive
                                ? "bg-gradient-to-br from-[#047857] to-[#047857] text-white"
                                : "bg-white ring-slate-100 border border-slate-200 text-slate-400"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div
                            className={`flex-1 bg-white rounded-xl p-4 ring-1 ${
                              isActive ? "ring-emerald-100" : "ring-slate-100"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                              <p className="font-semibold text-slate-900 text-sm">
                                {step.title}
                              </p>
                              <span className="text-[11px] font-mono text-slate-400">
                                {step.time}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INTEGRATIONS                                 */}
      {/* ============================================ */}
      <section className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.12),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="max-w-3xl mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6EE7B7] mb-3 inline-flex items-center gap-2">
                <Plug className="h-3.5 w-3.5" />
                {tx("Interconnexions", "Integrations")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                {tx(
                  "Connectée à votre stack existante.",
                  "Connected to your existing stack."
                )}
              </h2>
              <p className="text-lg text-slate-300">
                {tx(
                  "Des connecteurs natifs avec les principaux ERP, ITSM et MDM du marché. Plus une API ouverte REST + Webhook pour tout le reste.",
                  "Native connectors with the leading ERP, ITSM and MDM tools. Plus an open REST + Webhook API for everything else."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integ) => (
              <StaggerItem key={integ.name}>
                <div className="group relative h-full bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-sm ring-1 ring-white/10 hover:ring-white/20 rounded-2xl p-5 transition">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${integ.color} text-white font-bold flex items-center justify-center mb-4 shadow-lg text-sm`}
                  >
                    {integ.initial || <span className="text-[10px]">{integ.name.split(" ")[0]}</span>}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-white text-sm">{integ.name}</p>
                    {integ.status === "available" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                        <CircleDot className="h-3 w-3" />
                        {tx("Disponible", "Available")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                        <Clock className="h-3 w-3" />
                        {tx("Roadmap", "Roadmap")}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{integ.hint}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn>
            <div className="mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white/[0.04] ring-1 ring-white/10 rounded-2xl p-6">
              <div>
                <p className="font-semibold text-white mb-1">
                  {tx("Vous utilisez un outil qui n'est pas listé ?", "Using a tool that's not listed?")}
                </p>
                <p className="text-sm text-slate-400">
                  {tx(
                    "Notre API REST + Webhook et nos SDK JS/Python permettent d'intégrer n'importe quel système en quelques jours.",
                    "Our REST + Webhook API and JS/Python SDKs let you integrate any system in days."
                  )}
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-5 py-3 rounded-xl transition whitespace-nowrap"
              >
                {tx("Demander un connecteur", "Request a connector")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* APPOINTMENT BOOKING                          */}
      {/* ============================================ */}
      <section id="rdv" className="py-24 md:py-32 bg-gradient-to-b from-white to-[#F5F1EA] scroll-mt-24">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#047857] mb-3">
                {tx("Prise de rendez-vous", "Book a meeting")}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
                {tx(
                  "Parlons de votre projet ITAD.",
                  "Let's talk about your ITAD project."
                )}
              </h2>
              <p className="text-lg text-slate-600">
                {tx(
                  "Choisissez le format qui vous convient. Confirmation par email sous 2h ouvrées. Aucune inscription requise.",
                  "Pick the format that works for you. Email confirmation within 2 business hours. No signup needed."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-14">
            {meetingTypes.map((m) => {
              const Icon = m.icon;
              return (
                <StaggerItem key={m.title}>
                  <div className="h-full bg-white rounded-2xl p-7 ring-1 ring-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <div className={`inline-flex self-start items-center gap-2 px-3 py-1.5 rounded-lg border ${m.color} text-xs font-bold uppercase tracking-wider mb-5`}>
                      <CalendarDays className="h-3.5 w-3.5" />
                      {m.duration}
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-[#047857]/10 text-[#047857] flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{m.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-7 flex-1">
                      {m.description}
                    </p>
                    <a
                      href={m.mailto}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#047857] hover:bg-[#0B4633] text-white font-semibold rounded-xl transition"
                    >
                      {m.cta}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Quick contact form */}
          <FadeIn>
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl ring-1 ring-slate-100 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {tx("Ou laissez-nous un message", "Or drop us a message")}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {tx(
                      "Nous vous recontactons dans la journée.",
                      "We'll get back to you the same day."
                    )}
                  </p>
                </div>
              </div>
              <form
                className="grid sm:grid-cols-2 gap-4"
                action="mailto:contact@greentechcycle.fr"
                method="post"
                encType="text/plain"
              >
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    {tx("Nom complet", "Full name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    {tx("Email professionnel", "Work email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    {tx("Entreprise", "Company")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    {tx("Téléphone", "Phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    {tx("Votre besoin", "Your need")}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#047857] focus:ring-2 focus:ring-[#047857]/20 outline-none text-sm resize-none"
                    placeholder={tx(
                      "Ex : Nous renouvelons 800 postes en Q2 et cherchons un partenaire ITAD…",
                      "E.g.: We're refreshing 800 workstations in Q2 and need an ITAD partner…"
                    )}
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <LifeBuoy className="h-3.5 w-3.5" />
                    {tx(
                      "Vos données ne sont utilisées que pour vous recontacter.",
                      "Your data is used only to get back to you."
                    )}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap"
                  >
                    {tx("Envoyer", "Send")}
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-5 text-sm">
                <a
                  href="tel:+33186652210"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-[#047857] font-medium transition"
                >
                  <Phone className="h-4 w-4" />
                  +33 1 86 65 22 10
                </a>
                <a
                  href="mailto:contact@greentechcycle.fr"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-[#047857] font-medium transition"
                >
                  <Mail className="h-4 w-4" />
                  contact@greentechcycle.fr
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA                                    */}
      {/* ============================================ */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#047857] via-[#0B4633] to-[#0F172A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.2),_transparent_60%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
                {tx(
                  "Prêt à unifier votre ITAD ?",
                  "Ready to unify your ITAD?"
                )}
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                {tx(
                  "20 minutes suffisent pour évaluer le potentiel de gain sur votre parc. Sans engagement, sans baratin commercial.",
                  "20 minutes are enough to assess the potential on your fleet. No commitment, no sales pitch."
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-[#047857] hover:bg-[#059669] text-white font-semibold px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#047857]/30"
                >
                  {tx("Réserver 20 min avec un expert", "Book 20 min with an expert")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-4 rounded-xl border border-white/20 backdrop-blur transition"
                >
                  {tx("Nous contacter", "Contact us")}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
