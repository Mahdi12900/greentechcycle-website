"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import {
  ArrowRight,
  Scale,
  Shield,
  ShieldCheck,
  FileCheck,
  Leaf,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Brain,
  Recycle,
  Building2,
  Server,
  Landmark,
  Heart,
  CreditCard,
  Factory,
  Radio,
  Zap,
  ShoppingBag,
  CircleDot,
  Sparkles,
  BookOpen,
  Gavel,
  BarChart3,
  Eye,
  Clock,
  Cpu,
  LinkIcon,
  ChevronDown,
  ChevronRight,
  Target,
  Workflow,
  Database,
  Activity,
  Network,
  Cloud,
  Bot,
  Atom,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
  ScaleIn,
} from "@/components/motion";

// ---------- i18n helper ----------
const useTx = () => {
  const locale = useLocale();
  return (fr: string, en: string) => (locale === "en" ? en : fr);
};

// ---------- Status pill ----------
type Status = "active" | "upcoming" | "update";

function StatusBadge({ status, tx }: { status: Status; tx: ReturnType<typeof useTx> }) {
  const labels = {
    active: { label: tx("En vigueur", "In force"), cls: "bg-accent/10 text-accent border-accent/30" },
    upcoming: { label: tx("À venir 2026", "Upcoming 2026"), cls: "bg-amber-100 text-amber-700 border-amber-200" },
    update: { label: tx("Mise à jour 2025", "Updated 2025"), cls: "bg-sky-100 text-sky-700 border-sky-200" },
  };
  const s = labels[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full border ${s.cls}`}>
      <CircleDot className="w-3 h-3" />
      {s.label}
    </span>
  );
}

// ---------- Collapsible sector card ----------
function SectorSection({
  sector,
  isOpen,
  toggle,
  tx,
}: {
  sector: {
    id: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    title: string;
    description: string;
    items: Array<{
      name: string;
      fullName: string;
      jurisdiction: string;
      inForce: string;
      status: Status;
      description: string;
      prerequisites: string;
      keyFigure: string;
      subFigure: string;
      gtcHelp: string;
    }>;
  };
  isOpen: boolean;
  toggle: () => void;
  tx: ReturnType<typeof useTx>;
}) {
  const Icon = sector.icon;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <button
        onClick={toggle}
        className="w-full flex items-center gap-4 p-6 md:p-8 text-left hover:bg-slate-50/50 transition"
      >
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sector.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">{sector.title}</h3>
          <p className="text-sm text-slate-500 mt-1">{sector.description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full ${sector.bgColor} ${sector.textColor} text-xs font-bold`}>
            {sector.items.length} {tx("réglementations", "regulations")}
          </span>
          {isOpen ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 md:px-8 pb-8 pt-0">
          <div className="grid md:grid-cols-2 gap-5">
            {sector.items.map((reg) => (
              <article
                key={reg.name}
                className="group h-full bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${sector.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-lg font-bold text-slate-900">{reg.name}</h4>
                        <StatusBadge status={reg.status} tx={tx} />
                      </div>
                      <p className="text-sm text-slate-500">{reg.fullName}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-4">
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" />
                      {reg.jurisdiction}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {reg.inForce}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{reg.description}</p>

                  {/* Prerequisites */}
                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 mb-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      {tx("Pré-requis techniques", "Technical prerequisites")}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">{reg.prerequisites}</p>
                  </div>

                  {/* Key figure */}
                  <div className={`rounded-xl ${sector.bgColor} border ${sector.borderColor} p-4 mb-4`}>
                    <p className={`text-xs font-semibold uppercase tracking-wider ${sector.textColor} mb-1`}>
                      {tx("Impact chiffré", "Quantified impact")}
                    </p>
                    <p className={`text-lg font-bold ${sector.textColor}`}>{reg.keyFigure}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{reg.subFigure}</p>
                  </div>

                  {/* GTC help */}
                  <div className="flex items-start gap-2 bg-accent/5 rounded-xl p-3 border border-accent/10">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <span className="font-semibold text-slate-900">{tx("Comment GTC aide", "How GTC helps")} :</span>{" "}
                      {reg.gtcHelp}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function RegulationPage() {
  const tx = useTx();

  // ---------- Sectors with regulations ----------
  const sectors = [
    {
      id: "finance",
      icon: Landmark,
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
      title: tx("Finance & Banque", "Finance & Banking"),
      description: tx(
        "PCI-DSS, DORA, Bâle III/IV, MiFID II — les obligations les plus strictes en matière de données de paiement et résilience opérationnelle.",
        "PCI-DSS, DORA, Basel III/IV, MiFID II — the strictest obligations for payment data and operational resilience."
      ),
      items: [
        {
          name: "PCI-DSS v4.0",
          fullName: tx("Payment Card Industry Data Security Standard", "Payment Card Industry Data Security Standard"),
          jurisdiction: tx("International · Paiement", "International · Payment"),
          inForce: tx("Avril 2024 · fin transition mars 2025", "April 2024 · transition ends March 2025"),
          status: "active" as Status,
          description: tx(
            "Contrôle 9.4.6 : destruction sécurisée obligatoire des médias contenant des données de cartes de paiement. Contrôle 3.2.1 : effacement cryptographique en fin de vie. Audit QSA annuel requis. Chiffrement AES-256 minimum pour les données en transit et au repos.",
            "Control 9.4.6: mandatory secure destruction of media containing payment card data. Control 3.2.1: cryptographic erasure at EOL. Annual QSA audit required. AES-256 minimum encryption for data in transit and at rest."
          ),
          prerequisites: tx(
            "Chiffrement AES-256, destruction certifiée des supports, audit QSA annuel, segmentation réseau PCI, journalisation 12 mois.",
            "AES-256 encryption, certified media destruction, annual QSA audit, PCI network segmentation, 12-month logging."
          ),
          keyFigure: tx("Jusqu'à 500K$/mois de non-conformité", "Up to $500K/month of non-compliance"),
          subFigure: tx("Révocation de l'agrément Visa/Mastercard", "Visa/Mastercard accreditation revocation"),
          gtcHelp: tx(
            "Parcours dédié PCI-DSS avec validation QSA fournie, certificats d'effacement AES-256 par support.",
            "Dedicated PCI-DSS workflow with QSA validation, AES-256 erasure certificates per media."
          ),
        },
        {
          name: "DORA",
          fullName: tx("Digital Operational Resilience Act", "Digital Operational Resilience Act"),
          jurisdiction: tx("Union Européenne · Secteur financier", "European Union · Financial sector"),
          inForce: tx("Janvier 2025", "January 2025"),
          status: "active" as Status,
          description: tx(
            "Résilience opérationnelle numérique obligatoire pour banques, assurances et prestataires ICT critiques. Tests de pénétration ICT obligatoires (TLPT). Registre des prestataires tiers ICT à maintenir et communiquer aux autorités.",
            "Mandatory digital operational resilience for banks, insurers and critical ICT providers. Mandatory ICT penetration testing (TLPT). Third-party ICT provider register to maintain and report to authorities."
          ),
          prerequisites: tx(
            "Tests de pénétration ICT réguliers, gestion risques tiers formalisée, registre ICT, plan de continuité numérique, notification d'incidents majeurs.",
            "Regular ICT penetration tests, formalized third-party risk management, ICT register, digital continuity plan, major incident notification."
          ),
          keyFigure: tx("1% du CA quotidien / jour d'amende", "1% of daily revenue / day of fine"),
          subFigure: tx("22 000 entités financières concernées en UE", "22,000 EU financial entities concerned"),
          gtcHelp: tx(
            "Registre ICT prêt à l'emploi, logs signés horodatés, audit tier 3 trimestriel, preuves de gestion des risques tiers.",
            "Ready-to-use ICT register, timestamped signed logs, quarterly tier-3 audit, third-party risk management evidence."
          ),
        },
        {
          name: tx("Bâle III / IV", "Basel III / IV"),
          fullName: tx("Cadre prudentiel bancaire international", "International banking prudential framework"),
          jurisdiction: tx("International · Banque (BIS/BCBS)", "International · Banking (BIS/BCBS)"),
          inForce: tx("2023 · Bâle IV janv. 2025", "2023 · Basel IV Jan. 2025"),
          status: "active" as Status,
          description: tx(
            "Exigences de conservation et destruction réglementaire des données bancaires. Durée de rétention 5 à 10 ans selon le type. Traçabilité complète des opérations, destruction programmée obligatoire après la période légale de conservation.",
            "Requirements for retention and regulatory destruction of banking data. Retention period 5 to 10 years per type. Complete operation traceability, scheduled destruction required after legal retention period."
          ),
          prerequisites: tx(
            "Politique de rétention par type de donnée, destruction programmée automatisée, piste d'audit complète, archivage probatoire.",
            "Retention policy per data type, automated scheduled destruction, complete audit trail, probative archiving."
          ),
          keyFigure: tx("Rétention obligatoire 5 à 10 ans", "Mandatory 5-10 year retention"),
          subFigure: tx("Destruction programmée post-rétention", "Scheduled post-retention destruction"),
          gtcHelp: tx(
            "Politique de rétention automatisée par type d'asset, alertes de fin de période, destruction certifiée programmée.",
            "Automated retention policy per asset type, end-of-period alerts, scheduled certified destruction."
          ),
        },
        {
          name: "MiFID II",
          fullName: tx("Markets in Financial Instruments Directive II", "Markets in Financial Instruments Directive II"),
          jurisdiction: tx("Union Européenne · Marchés financiers", "European Union · Financial markets"),
          inForce: tx("2018 · révision 2024", "2018 · revised 2024"),
          status: "update" as Status,
          description: tx(
            "Conservation obligatoire de toutes les communications et données de trading pendant 5 ans minimum. Après la période légale, destruction sécurisée avec preuve auditable exigée par les régulateurs AMF/ESMA.",
            "Mandatory retention of all trading communications and data for minimum 5 years. After legal period, secure destruction with auditable proof required by AMF/ESMA regulators."
          ),
          prerequisites: tx(
            "Archivage 5 ans minimum, horodatage certifié, destruction sécurisée post-rétention, traçabilité par transaction.",
            "5-year minimum archiving, certified timestamping, secure post-retention destruction, per-transaction traceability."
          ),
          keyFigure: tx("5 ans de conservation minimum", "5-year minimum retention"),
          subFigure: tx("Destruction sécurisée obligatoire après", "Mandatory secure destruction after"),
          gtcHelp: tx(
            "Archivage probatoire intégré, destruction programmée à J+5ans avec certificat horodaté.",
            "Integrated probative archiving, scheduled destruction at D+5years with timestamped certificate."
          ),
        },
      ],
    },
    {
      id: "sante",
      icon: Heart,
      color: "from-rose-500 to-red-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
      textColor: "text-rose-700",
      title: tx("Santé", "Healthcare"),
      description: tx(
        "HIPAA, HDS, MDR, HAS 2024 — protection des données de santé, obligations de chiffrement et destruction des PHI.",
        "HIPAA, HDS, MDR, HAS 2024 — health data protection, encryption obligations and PHI destruction."
      ),
      items: [
        {
          name: "HIPAA",
          fullName: tx("Health Insurance Portability & Accountability Act", "Health Insurance Portability & Accountability Act"),
          jurisdiction: tx("États-Unis · Santé", "United States · Healthcare"),
          inForce: tx("1996 · rév. 2024 Security Rule", "1996 · rev. 2024 Security Rule"),
          status: "update" as Status,
          description: tx(
            "Protection des PHI (Protected Health Information). La HIPAA Security Rule exige une destruction documentée et sécurisée avec preuve signée pour TOUT support contenant des PHI. Sanctions pénales possibles : jusqu'à 10 ans d'emprisonnement pour divulgation volontaire.",
            "Protection of PHI (Protected Health Information). HIPAA Security Rule requires documented secure destruction with signed proof for ANY PHI-containing media. Criminal penalties possible: up to 10 years imprisonment for willful disclosure."
          ),
          prerequisites: tx(
            "Chiffrement obligatoire des PHI, destruction certifiée de tous les supports, piste d'audit signée, formation du personnel, BAA avec les sous-traitants.",
            "Mandatory PHI encryption, certified destruction of all media, signed audit trail, staff training, BAA with subcontractors."
          ),
          keyFigure: tx("Jusqu'à 1,5M$/an par catégorie de violation", "Up to $1.5M/year per violation category"),
          subFigure: tx("Sanctions pénales jusqu'à 10 ans", "Criminal penalties up to 10 years"),
          gtcHelp: tx(
            "Chaîne de destruction HIPAA-compliant avec double signature, certificats HDS, traçabilité PHI par support.",
            "HIPAA-compliant destruction chain with dual signature, HDS certificates, per-media PHI traceability."
          ),
        },
        {
          name: "HDS",
          fullName: tx("Hébergement de Données de Santé", "Health Data Hosting"),
          jurisdiction: tx("France · Santé", "France · Healthcare"),
          inForce: tx("2018 · rév. 2024", "2018 · rev. 2024"),
          status: "update" as Status,
          description: tx(
            "Certification obligatoire pour tout hébergeur de données de santé en France. Basée sur ISO 27001 + exigences spécifiques santé. Exige la destruction sécurisée documentée en fin de contrat et l'absence de rémanence sur les supports.",
            "Mandatory certification for all health data hosting in France. Based on ISO 27001 + specific health requirements. Requires documented secure destruction at end of contract and zero data remanence on media."
          ),
          prerequisites: tx(
            "Certification HDS active, ISO 27001, destruction certifiée des supports en fin de contrat, localisation France/UE des données.",
            "Active HDS certification, ISO 27001, certified media destruction at contract end, France/EU data location."
          ),
          keyFigure: tx("Certification obligatoire", "Mandatory certification"),
          subFigure: tx("Sanctions pénales Code de la santé", "Criminal sanctions Health Code"),
          gtcHelp: tx(
            "Destruction on-site ou en usine France, certificats compatibles HDS, zéro transit hors UE.",
            "On-site or France facility destruction, HDS-compatible certificates, zero transit outside EU."
          ),
        },
        {
          name: "MDR",
          fullName: tx("Medical Devices Regulation (UE) 2017/745", "Medical Devices Regulation (EU) 2017/745"),
          jurisdiction: tx("Union Européenne · Dispositifs médicaux", "European Union · Medical devices"),
          inForce: tx("Mai 2021 · plein effet 2024", "May 2021 · full effect 2024"),
          status: "active" as Status,
          description: tx(
            "Encadre le cycle de vie complet des dispositifs médicaux connectés : de la conception à la fin de vie. Les données embarquées dans les DM doivent être effacées de manière sécurisée et traçable avant toute mise au rebut ou reconditionnement.",
            "Governs the complete lifecycle of connected medical devices: from design to end-of-life. Data embedded in MDs must be securely and traceably erased before disposal or refurbishment."
          ),
          prerequisites: tx(
            "Traçabilité UDI, effacement données embarquées DM, documentation technique complète, conformité CE.",
            "UDI traceability, embedded MD data erasure, complete technical documentation, CE compliance."
          ),
          keyFigure: tx("Traçabilité UDI obligatoire", "Mandatory UDI traceability"),
          subFigure: tx("Couvre IoMT & DM connectés", "Covers IoMT & connected MDs"),
          gtcHelp: tx(
            "Prise en charge spécifique DM connectés : effacement firmware, traçabilité UDI, rapport ANSM-compatible.",
            "Specific connected MD handling: firmware erasure, UDI traceability, ANSM-compatible report."
          ),
        },
        {
          name: "HAS 2024",
          fullName: tx("Haute Autorité de Santé — Recommandations ITAD", "French Health Authority — ITAD Recommendations"),
          jurisdiction: tx("France · Établissements de santé", "France · Healthcare facilities"),
          inForce: "2024",
          status: "update" as Status,
          description: tx(
            "Recommandations spécifiques aux établissements de santé : effacement/destruction systématique des DM connectés et supports contenant des données patients. Conservation des preuves 10 ans. Obligation de traçabilité bout en bout.",
            "Specific recommendations for healthcare facilities: systematic erasure/destruction of connected MDs and media containing patient data. 10-year evidence retention. End-to-end traceability obligation."
          ),
          prerequisites: tx(
            "Effacement systématique avant sortie, conservation des preuves 10 ans, procédure documentée, formation équipes.",
            "Systematic erasure before disposal, 10-year evidence retention, documented procedure, team training."
          ),
          keyFigure: tx("10 ans de conservation des preuves", "10-year evidence retention"),
          subFigure: tx("Couvre DM connectés & IoMT", "Covers connected MDs & IoMT"),
          gtcHelp: tx(
            "Archive légale 10 ans, export à la demande pour inspection ARS, rapport spécifique établissement de santé.",
            "10-year legal archive, on-demand export for ARS inspection, healthcare facility specific report."
          ),
        },
      ],
    },
    {
      id: "industrie",
      icon: Factory,
      color: "from-orange-500 to-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      textColor: "text-amber-700",
      title: tx("Industrie & OT", "Industry & OT"),
      description: tx(
        "NIS2, IEC 62443, Directive Machines — cybersécurité industrielle, systèmes OT/SCADA et convergence IT/OT.",
        "NIS2, IEC 62443, Machinery Directive — industrial cybersecurity, OT/SCADA systems and IT/OT convergence."
      ),
      items: [
        {
          name: "NIS2",
          fullName: tx("Network & Information Security Directive 2", "Network & Information Security Directive 2"),
          jurisdiction: tx("Union Européenne · 18 secteurs", "European Union · 18 sectors"),
          inForce: tx("Octobre 2024 · transposition nationale", "October 2024 · national transposition"),
          status: "active" as Status,
          description: tx(
            "La directive la plus impactante de 2024-2025. Élargit la cybersécurité à 18 secteurs essentiels et importants. Notification d'incident sous 24h obligatoire. La gestion des actifs et de leur fin de vie est une exigence de base. Amendes dissuasives.",
            "The most impactful directive of 2024-2025. Expands cybersecurity to 18 essential and important sectors. Mandatory 24h incident notification. Asset lifecycle management is a baseline requirement. Dissuasive fines."
          ),
          prerequisites: tx(
            "Registre des actifs IT/OT, notification d'incident 24h, gestion des risques chaîne d'approvisionnement, audits réguliers, formation dirigeants.",
            "IT/OT asset register, 24h incident notification, supply chain risk management, regular audits, executive training."
          ),
          keyFigure: tx("10M€ ou 2% du CA mondial", "€10M or 2% of global revenue"),
          subFigure: tx("160 000 entreprises concernées en Europe", "160,000 companies concerned in Europe"),
          gtcHelp: tx(
            "Chain of custody scellée, registre d'actifs automatisé, notifications de fin de vie, preuves de destruction pour audit NIS2.",
            "Sealed chain of custody, automated asset register, EOL notifications, destruction evidence for NIS2 audit."
          ),
        },
        {
          name: "IEC 62443",
          fullName: tx("Cybersécurité des systèmes d'automatisation industrielle", "Industrial Automation Cybersecurity"),
          jurisdiction: tx("International (IEC/ISA)", "International (IEC/ISA)"),
          inForce: tx("2023 · édition 4", "2023 · edition 4"),
          status: "active" as Status,
          description: tx(
            "Standard de référence pour la cybersécurité des systèmes industriels OT/SCADA. Définit les niveaux de sécurité (SL1-SL4), les zones et les conduits. Exige la gestion sécurisée du décommissionnement des automates, RTU et IHM.",
            "Reference standard for OT/SCADA industrial cybersecurity. Defines security levels (SL1-SL4), zones and conduits. Requires secure decommissioning management of PLCs, RTUs and HMIs."
          ),
          prerequisites: tx(
            "Segmentation réseau OT, niveaux de sécurité SL1-SL4, gestion des accès, décommissionnement sécurisé des automates.",
            "OT network segmentation, SL1-SL4 security levels, access management, secure PLC decommissioning."
          ),
          keyFigure: tx("4 niveaux de sécurité SL1→SL4", "4 security levels SL1→SL4"),
          subFigure: tx("Couvre automates, RTU, SCADA, IHM", "Covers PLCs, RTUs, SCADA, HMIs"),
          gtcHelp: tx(
            "Prise en charge des assets OT : automates, RTU, IHM. Effacement firmware, traçabilité spécifique environnement industriel.",
            "OT asset handling: PLCs, RTUs, HMIs. Firmware erasure, industrial environment specific traceability."
          ),
        },
        {
          name: tx("Directive Machines 2023/1230", "Machinery Directive 2023/1230"),
          fullName: tx("Règlement Machines (UE) 2023/1230", "Machinery Regulation (EU) 2023/1230"),
          jurisdiction: tx("Union Européenne", "European Union"),
          inForce: tx("Janvier 2027", "January 2027"),
          status: "upcoming" as Status,
          description: tx(
            "Remplace la directive 2006/42/CE. Intègre la cybersécurité dès la conception des machines. Les machines connectées avec composants numériques doivent intégrer des exigences de sécurité tout au long du cycle de vie, y compris la fin de vie.",
            "Replaces directive 2006/42/EC. Integrates cybersecurity from machine design. Connected machines with digital components must integrate security requirements throughout lifecycle, including end-of-life."
          ),
          prerequisites: tx(
            "Cybersécurité by design, évaluation de conformité CE, documentation technique incluant fin de vie, gestion des mises à jour.",
            "Cybersecurity by design, CE conformity assessment, technical documentation including EOL, update management."
          ),
          keyFigure: tx("Application janvier 2027", "Application January 2027"),
          subFigure: tx("Cybersécurité intégrée by design", "Cybersecurity integrated by design"),
          gtcHelp: tx(
            "Anticipation des exigences 2027 : traçabilité des composants numériques des machines, effacement des données embarquées.",
            "2027 requirements anticipation: digital machine component traceability, embedded data erasure."
          ),
        },
      ],
    },
    {
      id: "public",
      icon: Building2,
      color: "from-indigo-600 to-purple-700",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
      title: tx("Secteur Public & Défense", "Public Sector & Defense"),
      description: tx(
        "ANSSI SecNumCloud, RGS, eIDAS 2.0, IGI 1300 — souveraineté numérique et classification défense.",
        "ANSSI SecNumCloud, RGS, eIDAS 2.0, IGI 1300 — digital sovereignty and defense classification."
      ),
      items: [
        {
          name: "ANSSI / SecNumCloud",
          fullName: tx("Référentiel SecNumCloud v3.2 — ANSSI", "SecNumCloud Framework v3.2 — ANSSI"),
          jurisdiction: tx("France · OIV/OSE", "France · Critical operators"),
          inForce: tx("Rév. 3.2 · 2024", "Rev. 3.2 · 2024"),
          status: "update" as Status,
          description: tx(
            "Référentiel français de confiance pour les services cloud et les opérateurs d'importance vitale. Exigences strictes de souveraineté : destruction maîtrisée des médias sur territoire français, absence de loi extra-territoriale étrangère (Cloud Act).",
            "French cloud trust framework for vital importance operators. Strict sovereignty requirements: controlled media destruction on French territory, no foreign extra-territorial law (Cloud Act)."
          ),
          prerequisites: tx(
            "Qualification ANSSI, destruction sur territoire français, absence de soumission au Cloud Act, chiffrement souverain.",
            "ANSSI qualification, destruction on French territory, no Cloud Act submission, sovereign encryption."
          ),
          keyFigure: tx("Qualification obligatoire OIV/OSE", "Required for OIV/OSE operators"),
          subFigure: tx("Destruction exclusivement sur territoire FR", "Destruction exclusively on FR territory"),
          gtcHelp: tx(
            "Broyage sur site ou en usine France, zéro transit hors UE, certificats compatibles RGS/SecNumCloud.",
            "On-site or France facility shredding, zero transit outside EU, RGS/SecNumCloud compatible certificates."
          ),
        },
        {
          name: "eIDAS 2.0",
          fullName: tx("Règlement Identité Numérique Européenne", "European Digital Identity Regulation"),
          jurisdiction: tx("Union Européenne", "European Union"),
          inForce: tx("2024 · déploiement 2026", "2024 · deployment 2026"),
          status: "active" as Status,
          description: tx(
            "Portefeuille d'identité numérique européen (EUDI Wallet). Signatures électroniques qualifiées, services de confiance. Implications pour l'ITAD : les assets contenant des certificats eIDAS doivent être décommissionnés avec révocation des clés.",
            "European Digital Identity Wallet (EUDI Wallet). Qualified electronic signatures, trust services. ITAD implications: assets containing eIDAS certificates must be decommissioned with key revocation."
          ),
          prerequisites: tx(
            "Gestion des certificats et clés eIDAS, révocation lors du décommissionnement, traçabilité des portefeuilles numériques.",
            "eIDAS certificate and key management, revocation at decommissioning, digital wallet traceability."
          ),
          keyFigure: tx("450M+ citoyens européens", "450M+ European citizens"),
          subFigure: tx("Portefeuille EUDI obligatoire 2026", "Mandatory EUDI wallet 2026"),
          gtcHelp: tx(
            "Gestion spécifique des certificats eIDAS : révocation, destruction des clés, traçabilité cryptographique.",
            "Specific eIDAS certificate management: revocation, key destruction, cryptographic traceability."
          ),
        },
        {
          name: "IGI 1300",
          fullName: tx("Instruction Générale Interministérielle 1300", "Interministerial General Instruction 1300"),
          jurisdiction: tx("France · Classification Défense", "France · Defense Classification"),
          inForce: tx("Rév. 2021 · mise à jour 2024", "Rev. 2021 · updated 2024"),
          status: "active" as Status,
          description: tx(
            "Instruction encadrant la protection du secret de la défense nationale. Définit les niveaux Confidentiel Défense, Secret, Très Secret. Les supports classifiés doivent être détruits selon des procédures agréées par le SGDSN.",
            "Instruction governing national defense secrecy protection. Defines Confidential Defense, Secret, Top Secret levels. Classified media must be destroyed per SGDSN-approved procedures."
          ),
          prerequisites: tx(
            "Habilitation du personnel, destruction agréée SGDSN, traçabilité bout en bout, PV de destruction, absence de rémanence.",
            "Personnel clearance, SGDSN-approved destruction, end-to-end traceability, destruction minutes, zero data remanence."
          ),
          keyFigure: tx("3 niveaux de classification", "3 classification levels"),
          subFigure: tx("Destruction agréée SGDSN", "SGDSN-approved destruction"),
          gtcHelp: tx(
            "Broyage certifié DIN 66399 niveau H-5/H-7, PV de destruction signé, habilitation du personnel GTC.",
            "DIN 66399 H-5/H-7 certified shredding, signed destruction minutes, GTC personnel clearance."
          ),
        },
      ],
    },
    {
      id: "energie",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
      title: tx("Énergie & Télécoms", "Energy & Telecoms"),
      description: tx(
        "Code de l'énergie, ARCEP, NIS2 sectoriel — obligations des opérateurs d'énergie et télécoms.",
        "Energy Code, ARCEP, sectoral NIS2 — energy and telecom operator obligations."
      ),
      items: [
        {
          name: tx("Code de l'énergie Art. L111-73", "Energy Code Art. L111-73"),
          fullName: tx("Protection des données de compteurs intelligents", "Smart meter data protection"),
          jurisdiction: tx("France · Énergie", "France · Energy"),
          inForce: tx("2023 · rév. 2024", "2023 · rev. 2024"),
          status: "active" as Status,
          description: tx(
            "Encadre la collecte et le traitement des données de consommation issues des compteurs intelligents (Linky, Gazpar). Les données de consommation fines doivent être effacées des équipements de mesure en fin de vie selon des procédures documentées.",
            "Governs collection and processing of consumption data from smart meters (Linky, Gazpar). Detailed consumption data must be erased from end-of-life metering equipment per documented procedures."
          ),
          prerequisites: tx(
            "Effacement des données de comptage, procédure documentée de fin de vie, traçabilité des équipements de mesure.",
            "Metering data erasure, documented EOL procedure, metering equipment traceability."
          ),
          keyFigure: tx("35M+ compteurs Linky déployés", "35M+ Linky meters deployed"),
          subFigure: tx("Données de consommation fines protégées", "Detailed consumption data protected"),
          gtcHelp: tx(
            "Effacement certifié des équipements de mesure, traçabilité des compteurs intelligents par numéro de série.",
            "Certified metering equipment erasure, smart meter traceability by serial number."
          ),
        },
        {
          name: "ARCEP",
          fullName: tx("Obligations des opérateurs télécoms", "Telecom operator obligations"),
          jurisdiction: tx("France · Télécoms", "France · Telecoms"),
          inForce: tx("Continu · rév. 2024", "Ongoing · rev. 2024"),
          status: "active" as Status,
          description: tx(
            "L'ARCEP impose aux opérateurs des obligations de conservation des données de connexion (1 an) et de destruction sécurisée après la période légale. Les équipements réseau (routeurs, switches, antennes) contiennent des configurations sensibles.",
            "ARCEP requires operators to retain connection data (1 year) and securely destroy after legal period. Network equipment (routers, switches, antennas) contains sensitive configurations."
          ),
          prerequisites: tx(
            "Conservation 1 an des données de connexion, destruction post-rétention, effacement des configurations réseau.",
            "1-year connection data retention, post-retention destruction, network configuration erasure."
          ),
          keyFigure: tx("Conservation 1 an · destruction obligatoire après", "1-year retention · mandatory destruction after"),
          subFigure: tx("Concerne tous les opérateurs FR", "Concerns all FR operators"),
          gtcHelp: tx(
            "Effacement des configurations réseau (Cisco IOS, Junos), destruction certifiée des équipements télécoms.",
            "Network configuration erasure (Cisco IOS, Junos), certified telecom equipment destruction."
          ),
        },
      ],
    },
    {
      id: "retail",
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
      textColor: "text-pink-700",
      title: tx("Retail & E-commerce", "Retail & E-commerce"),
      description: tx(
        "PCI-DSS, Loi Hamon, DMA — protection des données de paiement et des consommateurs numériques.",
        "PCI-DSS, Hamon Law, DMA — payment data and digital consumer protection."
      ),
      items: [
        {
          name: "PCI-DSS v4.0",
          fullName: tx("Sécurité des données de cartes bancaires", "Payment card data security"),
          jurisdiction: tx("International · Retail/Paiement", "International · Retail/Payment"),
          inForce: tx("Avril 2024", "April 2024"),
          status: "active" as Status,
          description: tx(
            "Tout commerçant acceptant les paiements par carte est soumis au PCI-DSS. Les terminaux de paiement (TPE), serveurs de transaction et bases de données clients contiennent des données PAN qui doivent être détruites de manière certifiée en fin de vie.",
            "Any merchant accepting card payments is subject to PCI-DSS. Payment terminals (POS), transaction servers and customer databases contain PAN data requiring certified destruction at EOL."
          ),
          prerequisites: tx(
            "Chiffrement AES-256 des PAN, destruction certifiée des TPE, segmentation réseau, logs 12 mois.",
            "AES-256 PAN encryption, certified POS destruction, network segmentation, 12-month logs."
          ),
          keyFigure: tx("5K-100K$/mois en amendes", "$5K-100K/month in fines"),
          subFigure: tx("+ révocation agrément Visa/MC", "+ Visa/MC accreditation revocation"),
          gtcHelp: tx(
            "Destruction certifiée des TPE et serveurs de paiement, parcours PCI-DSS automatisé, rapport QSA-ready.",
            "Certified POS and payment server destruction, automated PCI-DSS workflow, QSA-ready report."
          ),
        },
        {
          name: tx("Loi Hamon / DMA", "Hamon Law / DMA"),
          fullName: tx("Protection du consommateur numérique", "Digital consumer protection"),
          jurisdiction: tx("France / Union Européenne", "France / European Union"),
          inForce: tx("2024 · DMA plein effet", "2024 · DMA full effect"),
          status: "active" as Status,
          description: tx(
            "Le Digital Markets Act et la législation française renforcent les droits des consommateurs numériques : portabilité des données, droit à la suppression, transparence sur le traitement. Les bases clients retail sont parmi les plus volumineuses à gérer en ITAD.",
            "The Digital Markets Act and French legislation strengthen digital consumer rights: data portability, right to deletion, processing transparency. Retail customer databases are among the largest to manage in ITAD."
          ),
          prerequisites: tx(
            "Portabilité des données clients, suppression sur demande, transparence du traitement, destruction certifiée des bases marketing.",
            "Customer data portability, deletion on request, processing transparency, certified marketing database destruction."
          ),
          keyFigure: tx("10% du CA mondial max (DMA)", "10% of global revenue max (DMA)"),
          subFigure: tx("Protection renforcée des consommateurs", "Enhanced consumer protection"),
          gtcHelp: tx(
            "Destruction certifiée des bases clients, export de portabilité compatible DMA, preuves de suppression.",
            "Certified customer database destruction, DMA-compatible portability export, deletion evidence."
          ),
        },
      ],
    },
  ];

  // ---------- Transversal regulations ----------
  const transversal = [
    {
      name: "RGPD",
      fullName: tx("Règlement Général sur la Protection des Données", "General Data Protection Regulation"),
      jurisdiction: tx("Union Européenne", "European Union"),
      inForce: "2018",
      status: "active" as Status,
      icon: Shield,
      color: "text-sky-700",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200",
      description: tx(
        "Art. 17 : droit à l'effacement. Art. 33 : notification de violation sous 72h. Art. 83 : amendes jusqu'à 4% du CA mondial ou 20M€. Le RGPD impose une obligation de résultat sur la destruction des données personnelles en fin de vie des équipements.",
        "Art. 17: right to erasure. Art. 33: breach notification within 72h. Art. 83: fines up to 4% of global revenue or €20M. GDPR imposes an obligation of result on personal data destruction at equipment end-of-life."
      ),
      keyFigure: tx("4,5 milliards € d'amendes cumulées depuis 2018", "€4.5 billion in cumulative fines since 2018"),
      subFigure: tx("Source : CNIL / EDPB · Toutes entreprises concernées", "Source: CNIL / EDPB · All companies concerned"),
      gtcHelp: tx(
        "Certificats d'effacement NIST/IEEE par asset, procès-verbal d'huissier, export RGPD-ready pour le DPO.",
        "Per-asset NIST/IEEE erasure certificates, bailiff report, GDPR-ready export for the DPO."
      ),
    },
    {
      name: "NIS2",
      fullName: tx("Network & Information Security Directive 2", "Network & Information Security Directive 2"),
      jurisdiction: tx("Union Européenne · 18 secteurs", "European Union · 18 sectors"),
      inForce: tx("Octobre 2024", "October 2024"),
      status: "active" as Status,
      icon: Lock,
      color: "text-indigo-700",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      description: tx(
        "La directive la plus structurante de la décennie. 160 000 entreprises européennes concernées dans 18 secteurs. Notification d'incident sous 24h, gestion des risques cyber supply chain, registre d'actifs obligatoire. La gestion de la fin de vie IT est explicitement dans le périmètre.",
        "The most structuring directive of the decade. 160,000 European companies in 18 sectors. 24h incident notification, cyber supply chain risk management, mandatory asset register. IT end-of-life management is explicitly in scope."
      ),
      keyFigure: tx("10M€ ou 2% du CA mondial", "€10M or 2% of global revenue"),
      subFigure: tx("160 000 entreprises en Europe · Source : ENISA 2024", "160,000 companies in Europe · Source: ENISA 2024"),
      gtcHelp: tx(
        "Registre d'actifs automatisé, chain of custody scellée, preuves de destruction NIS2-compliant.",
        "Automated asset register, sealed chain of custody, NIS2-compliant destruction evidence."
      ),
    },
    {
      name: "CSRD",
      fullName: tx("Corporate Sustainability Reporting Directive", "Corporate Sustainability Reporting Directive"),
      jurisdiction: tx("Union Européenne", "European Union"),
      inForce: tx("2024 → 2026 (déploiement progressif)", "2024 → 2026 (phased deployment)"),
      status: "active" as Status,
      icon: Leaf,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: tx(
        "Comptes-rendus extra-financiers obligatoires avec double matérialité. ESRS E1 (climat), E5 (économie circulaire), S1 (main d'œuvre). L'ITAD contribue directement aux indicateurs E5 (taux de réemploi, tonnages recyclés) et E1 (CO₂ évité). Tiers-attestation obligatoire.",
        "Mandatory non-financial reporting with double materiality. ESRS E1 (climate), E5 (circular economy), S1 (workforce). ITAD directly contributes to E5 indicators (reuse rate, recycled tonnage) and E1 (avoided CO₂). Third-party attestation required."
      ),
      keyFigure: tx("50 000 entreprises UE concernées", "50,000 EU companies concerned"),
      subFigure: tx("Double matérialité · Tiers-attestation · Source : Commission UE", "Double materiality · Third-party attestation · Source: EU Commission"),
      gtcHelp: tx(
        "Export direct ESRS E1/E5, bilan carbone ADEME/Boavizta pré-intégré, rapport CSRD clé en main.",
        "Direct ESRS E1/E5 export, pre-integrated ADEME/Boavizta carbon assessment, turnkey CSRD report."
      ),
    },
    {
      name: "AI Act",
      fullName: tx("Règlement européen sur l'Intelligence Artificielle", "EU Artificial Intelligence Act"),
      jurisdiction: tx("Union Européenne", "European Union"),
      inForce: tx("Août 2024 · phases 2025-2027", "August 2024 · phases 2025-2027"),
      status: "upcoming" as Status,
      icon: Brain,
      color: "text-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      description: tx(
        "Premier cadre juridique mondial sur l'IA. Classification par niveaux de risque. Registre des systèmes IA à haut risque. Implications ITAD : les serveurs contenant des modèles IA (GPU H100, TPU v5), datasets d'entraînement et poids de modèles nécessitent une traçabilité et une destruction spécifiques.",
        "First global legal framework on AI. Risk-level classification. High-risk AI system register. ITAD implications: servers containing AI models (GPU H100, TPU v5), training datasets and model weights require specific traceability and destruction."
      ),
      keyFigure: tx("35M€ ou 7% du CA mondial", "€35M or 7% of global revenue"),
      subFigure: tx("Registre UE des systèmes IA · Source : Commission UE", "EU register of AI systems · Source: EU Commission"),
      gtcHelp: tx(
        "Traçabilité dédiée des accélérateurs IA (GPU, TPU), effacement certifié des datasets et modèles, registre AI Act-ready.",
        "Dedicated AI accelerator traceability (GPU, TPU), certified dataset and model erasure, AI Act-ready register."
      ),
    },
    {
      name: "ISO 27001",
      fullName: tx("Système de Management de la Sécurité de l'Information", "Information Security Management System"),
      jurisdiction: tx("International (ISO/IEC)", "International (ISO/IEC)"),
      inForce: tx("Rév. 2022", "Rev. 2022"),
      status: "update" as Status,
      icon: ShieldCheck,
      color: "text-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      description: tx(
        "Le standard SMSI de référence mondiale. 70 000+ certifications. Contrôle A.8.10 (effacement d'information), A.7.14 (sortie sécurisée des équipements). Audit de surveillance annuel. Prérequis pour de nombreuses certifications sectorielles (HDS, SecNumCloud).",
        "The global ISMS reference standard. 70,000+ certifications. Control A.8.10 (information deletion), A.7.14 (secure equipment disposal). Annual surveillance audit. Prerequisite for many sectoral certifications (HDS, SecNumCloud)."
      ),
      keyFigure: tx("70 000+ certifications mondiales", "70,000+ worldwide certifications"),
      subFigure: tx("Audit surveillance annuel · Source : ISO", "Annual surveillance audit · Source: ISO"),
      gtcHelp: tx(
        "Preuves A.7.14 / A.8.10 automatiquement générées, export audit-ready, intégration directe avec votre SMSI.",
        "Auto-generated A.7.14 / A.8.10 evidence, audit-ready export, direct ISMS integration."
      ),
    },
    {
      name: "ISO 14001",
      fullName: tx("Système de Management Environnemental", "Environmental Management System"),
      jurisdiction: tx("International (ISO)", "International (ISO)"),
      inForce: tx("Rév. 2015", "Rev. 2015"),
      status: "active" as Status,
      icon: Recycle,
      color: "text-emerald-700",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      description: tx(
        "350 000+ certifications mondiales. Management environnemental et amélioration continue. Intégration du bilan carbone ITAD dans la démarche ISO 14001 : taux de valorisation, tonnages DEEE, CO₂ évité par le reconditionnement.",
        "350,000+ worldwide certifications. Environmental management and continuous improvement. ITAD carbon assessment integration into ISO 14001: recovery rate, WEEE tonnage, CO₂ avoided through refurbishment."
      ),
      keyFigure: tx("350 000+ certifications mondiales", "350,000+ worldwide certifications"),
      subFigure: tx("Bilan matière et carbone intégré · Source : ISO", "Integrated material and carbon assessment · Source: ISO"),
      gtcHelp: tx(
        "Bilan matière et carbone automatisé, suivi des flux DEEE, rapports ISO 14001-ready.",
        "Automated material and carbon assessment, WEEE flow tracking, ISO 14001-ready reports."
      ),
    },
  ];

  // ---------- Timeline 2024→2028 ----------
  const timeline = [
    {
      date: tx("Oct 2024", "Oct 2024"),
      title: "NIS2",
      impact: tx("Registre d'actifs obligatoire, notification incident 24h", "Mandatory asset register, 24h incident notification"),
      business: tx("Amende 10M€ / 2% CA — Préparez votre registre d'actifs MAINTENANT", "Fine €10M / 2% revenue — Prepare your asset register NOW"),
    },
    {
      date: tx("Jan 2025", "Jan 2025"),
      title: "DORA",
      impact: tx("Résilience opérationnelle numérique obligatoire pour la finance", "Mandatory digital operational resilience for finance"),
      business: tx("22 000 entités — Registre ICT et tests de pénétration requis", "22,000 entities — ICT register and penetration tests required"),
    },
    {
      date: tx("Mar 2025", "Mar 2025"),
      title: "PCI-DSS v4.0",
      impact: tx("Fin de la période transitoire, conformité totale obligatoire", "End of transition period, full compliance mandatory"),
      business: tx("Révocation agrément possible — Auditez vos processus de destruction", "Accreditation revocation possible — Audit your destruction processes"),
    },
    {
      date: tx("Jan 2026", "Jan 2026"),
      title: "CSRD v3",
      impact: tx("PME cotées > 10 salariés soumises aux comptes-rendus extra-financiers", "Listed SMEs > 10 employees subject to non-financial reporting"),
      business: tx("50 000 entreprises — Mettez en place votre reporting ESRS E5 maintenant", "50,000 companies — Set up your ESRS E5 reporting now"),
    },
    {
      date: tx("Août 2026", "Aug 2026"),
      title: "AI Act · HR",
      impact: tx("Systèmes IA haut risque : registre, traçabilité, audit", "High-risk AI systems: register, traceability, audit"),
      business: tx("GPU/TPU à tracer — Identifiez vos assets IA et leur cycle de vie", "GPU/TPU to track — Identify your AI assets and their lifecycle"),
    },
    {
      date: tx("Jan 2027", "Jan 2027"),
      title: tx("Directive Machines", "Machinery Dir."),
      impact: tx("Cybersécurité intégrée by design, exigences fin de vie", "Cybersecurity integrated by design, EOL requirements"),
      business: tx("Industrie — Anticipez la gestion de fin de vie des machines connectées", "Industry — Anticipate connected machinery EOL management"),
    },
    {
      date: tx("Fév 2027", "Feb 2027"),
      title: tx("Passeport batterie", "Battery passport"),
      impact: tx("Passeport numérique obligatoire pour toutes les batteries industrielles", "Mandatory digital passport for all industrial batteries"),
      business: tx("Traçabilité batterie par batterie — Préparez votre chaîne de custody", "Battery-by-battery traceability — Prepare your chain of custody"),
    },
    {
      date: tx("Jan 2028", "Jan 2028"),
      title: tx("Passeport produit numérique", "Digital product passport"),
      impact: tx("ESPR : passeport numérique pour les produits IT (EcoDesign)", "ESPR: digital passport for IT products (EcoDesign)"),
      business: tx("IT concerné — Chaque asset devra avoir son passeport numérique", "IT concerned — Every asset will need its digital passport"),
    },
  ];

  // ---------- Enjeux & crises ----------
  const enjeuxSections = [
    {
      id: "geopolitique",
      icon: Globe,
      color: "from-red-500 to-rose-600",
      title: tx("Instabilité géopolitique", "Geopolitical instability"),
      items: [
        {
          title: tx("Guerre en Ukraine", "War in Ukraine"),
          text: tx(
            "Impact direct sur les chaînes d'approvisionnement électronique, sanctions sur les composants, transferts de données sensibles vers/depuis les zones de conflit. Les entreprises doivent revoir leurs flux d'équipements IT et garantir la conformité sanctions.",
            "Direct impact on electronic supply chains, component sanctions, sensitive data transfers to/from conflict zones. Companies must review IT equipment flows and ensure sanctions compliance."
          ),
        },
        {
          title: tx("Tensions Chine-Taiwan", "China-Taiwan tensions"),
          text: tx(
            "TSMC représente 54% de la production mondiale de semi-conducteurs. Toute perturbation entraînerait une pénurie massive. Le reconditionnement et l'allongement de la durée de vie des équipements deviennent une nécessité stratégique, pas seulement écologique.",
            "TSMC accounts for 54% of global semiconductor production. Any disruption would cause massive shortages. Refurbishment and equipment lifespan extension become a strategic necessity, not just ecological."
          ),
        },
        {
          title: tx("Souveraineté numérique européenne", "European digital sovereignty"),
          text: tx(
            "Cloud Act US vs RGPD : conflit juridique non résolu. Les données sur des serveurs US sont accessibles aux autorités américaines. La localisation des traitements et la destruction sur territoire européen deviennent des exigences de souveraineté.",
            "US Cloud Act vs GDPR: unresolved legal conflict. Data on US servers is accessible to American authorities. Processing localization and destruction on European territory become sovereignty requirements."
          ),
        },
      ],
    },
    {
      id: "energie",
      icon: Zap,
      color: "from-amber-500 to-yellow-600",
      title: tx("Défi énergétique", "Energy challenge"),
      items: [
        {
          title: tx("Data centers : 2-3% de la consommation mondiale", "Data centers: 2-3% of global consumption"),
          text: tx(
            "Les data centers consomment 2-3% de l'électricité mondiale (Source : IEA 2024). PUE moyen mondial : 1,58 — objectif UE : 1,3 d'ici 2030. Le reconditionnement évite la fabrication de nouveaux équipements : -47kg CO₂ par laptop reconditionné (Source : ADEME).",
            "Data centers consume 2-3% of global electricity (Source: IEA 2024). Global average PUE: 1.58 — EU target: 1.3 by 2030. Refurbishment avoids new equipment manufacturing: -47kg CO₂ per refurbished laptop (Source: ADEME)."
          ),
        },
        {
          title: tx("Directive EcoDesign / ESPR", "EcoDesign Directive / ESPR"),
          text: tx(
            "Durabilité et réparabilité obligatoires pour les produits numériques. Score de réparabilité étendu, passeport produit numérique. Le reconditionnement IT s'inscrit directement dans cette dynamique réglementaire.",
            "Mandatory durability and repairability for digital products. Extended repairability score, digital product passport. IT refurbishment fits directly into this regulatory dynamic."
          ),
        },
      ],
    },
    {
      id: "ia-emergent",
      icon: Brain,
      color: "from-purple-500 to-violet-600",
      title: tx("IA & Technologies émergentes", "AI & Emerging technologies"),
      items: [
        {
          title: tx("IA générative : explosion des besoins GPU/TPU", "Generative AI: exploding GPU/TPU needs"),
          text: tx(
            "Les serveurs IA (GPU H100, A100, TPU v5) ont un cycle de vie raccourci : 18-24 mois vs 5-7 ans pour un serveur classique. Le volume de décommissionnement IA va exploser d'ici 2027. Ces assets contiennent des modèles et données d'entraînement sensibles.",
            "AI servers (GPU H100, A100, TPU v5) have shortened lifecycles: 18-24 months vs 5-7 years for standard servers. AI decommissioning volume will explode by 2027. These assets contain sensitive models and training data."
          ),
        },
        {
          title: tx("Quantum computing : menace sur le chiffrement actuel", "Quantum computing: threat to current encryption"),
          text: tx(
            "Les ordinateurs quantiques menacent le chiffrement RSA et AES actuels. Le NIST a publié ses standards post-quantum (PQC) en 2024. Les entreprises doivent préparer la transition et s'assurer que les données effacées aujourd'hui résistent aux attaques quantiques futures.",
            "Quantum computers threaten current RSA and AES encryption. NIST published post-quantum standards (PQC) in 2024. Companies must prepare the transition and ensure data erased today withstands future quantum attacks."
          ),
        },
        {
          title: tx("Robotique & edge computing", "Robotics & edge computing"),
          text: tx(
            "Nouveaux types d'assets à gérer : robots industriels, cobots, dispositifs edge computing. Ces équipements embarquent des données opérationnelles sensibles (trajectoires, modèles, données de production) nécessitant une destruction sécurisée spécifique.",
            "New asset types to manage: industrial robots, cobots, edge computing devices. These embed sensitive operational data (trajectories, models, production data) requiring specific secure destruction."
          ),
        },
      ],
    },
    {
      id: "posture-it",
      icon: Cloud,
      color: "from-cyan-500 to-teal-600",
      title: tx("Nouvelle posture IT", "New IT posture"),
      items: [
        {
          title: tx("De 'posséder' à 'utiliser' — FinOps, GreenOps", "From 'own' to 'use' — FinOps, GreenOps"),
          text: tx(
            "Le shift vers le cloud n'élimine pas les assets physiques : serveurs on-premise résiduels, postes de travail, équipements réseau. La question 'que faire des assets physiques restants ?' devient critique dans chaque migration cloud.",
            "The shift to cloud doesn't eliminate physical assets: residual on-premise servers, workstations, network equipment. The question 'what to do with remaining physical assets?' becomes critical in every cloud migration."
          ),
        },
        {
          title: tx("Shadow IT : 30-40% des assets non inventoriés", "Shadow IT: 30-40% of assets uninventoried"),
          text: tx(
            "Selon Gartner, 30 à 40% des actifs IT d'une entreprise ne sont pas dans l'inventaire officiel. Ces assets 'fantômes' contiennent potentiellement des données sensibles et échappent aux processus de décommissionnement sécurisé.",
            "According to Gartner, 30 to 40% of a company's IT assets are not in the official inventory. These 'shadow' assets potentially contain sensitive data and escape secure decommissioning processes."
          ),
        },
        {
          title: tx("Convergence IT/OT", "IT/OT convergence"),
          text: tx(
            "Les environnements industriels deviennent des cibles cyber de premier plan. La convergence IT/OT multiplie la surface d'attaque et complexifie la gestion de fin de vie : les automates, capteurs IoT et systèmes SCADA nécessitent des processus ITAD spécifiques.",
            "Industrial environments are becoming prime cyber targets. IT/OT convergence multiplies the attack surface and complicates EOL management: PLCs, IoT sensors and SCADA systems require specific ITAD processes."
          ),
        },
      ],
    },
  ];

  // ---------- Sources ----------
  const sources = [
    { name: "ENISA", desc: tx("European Union Agency for Cybersecurity — rapports annuels sur les menaces", "European Union Agency for Cybersecurity — annual threat reports") },
    { name: "Gartner", desc: tx("Prédictions cybersécurité, Magic Quadrant ITAM", "Cybersecurity predictions, ITAM Magic Quadrant") },
    { name: "Greenpeace", desc: tx("Rapports empreinte carbone du numérique — « Clicking Clean »", "Digital carbon footprint reports — 'Clicking Clean'") },
    { name: "ADEME", desc: tx("Facteurs d'émission, bilans carbone reconditionnement", "Emission factors, refurbishment carbon assessments") },
    { name: "CNIL / EDPB", desc: tx("Statistiques amendes RGPD — 4,5Md€ cumulés", "GDPR fine statistics — €4.5B cumulative") },
    { name: "IEA", desc: tx("International Energy Agency — consommation énergétique data centers", "International Energy Agency — data center energy consumption") },
    { name: "NIST", desc: tx("Référentiels cybersécurité, standards post-quantum PQC 2024", "Cybersecurity frameworks, post-quantum PQC standards 2024") },
  ];

  // ---------- Value proposition ----------
  const valueProps = [
    {
      icon: Workflow,
      title: tx("Plateforme unifiée", "Unified platform"),
      text: tx("Réponse à la fragmentation des outils : un seul outil pour inventaire, notation, destruction, certification et restitution.", "Answer to tool fragmentation: one tool for inventory, scoring, destruction, certification and reporting."),
    },
    {
      icon: LinkIcon,
      title: tx("Chain of custody", "Chain of custody"),
      text: tx("Réponse à l'exigence de traçabilité : chaque transfert documenté, scellé, GPS-tracé, de la collecte au certificat.", "Answer to traceability requirements: every transfer documented, sealed, GPS-tracked, from collection to certificate."),
    },
    {
      icon: Target,
      title: tx("Scoring automatisé", "Automated scoring"),
      text: tx("Réponse au volume d'assets : algorithme multicritère pour traiter des milliers d'assets avec une décision reproductible et auditable.", "Answer to asset volume: multi-criteria algorithm to process thousands of assets with reproducible, auditable decisions."),
    },
    {
      icon: Leaf,
      title: tx("Bilan carbone intégré", "Integrated carbon assessment"),
      text: tx("Réponse aux obligations CSRD / ISO 14001 : export ESRS E1/E5 automatisé avec facteurs ADEME et Boavizta pré-intégrés.", "Answer to CSRD / ISO 14001 obligations: automated ESRS E1/E5 export with pre-integrated ADEME and Boavizta factors."),
    },
    {
      icon: Database,
      title: tx("API ouverte", "Open API"),
      text: tx("Réponse à l'intégration : connecteurs CMDB, ServiceNow, SAP, Intune pour s'intégrer dans votre écosystème existant.", "Answer to integration: CMDB, ServiceNow, SAP, Intune connectors to integrate into your existing ecosystem."),
    },
    {
      icon: Shield,
      title: tx("Multi-standard", "Multi-standard"),
      text: tx("Réponse à la complexité : NIST, DoD, IEEE, RGPD, NIS2, CSRD couverts dans un parcours unique et certifié.", "Answer to complexity: NIST, DoD, IEEE, GDPR, NIS2, CSRD covered in a single certified workflow."),
    },
  ];

  const [openSectors, setOpenSectors] = useState<Record<string, boolean>>({ finance: true });
  const toggleSector = (id: string) => setOpenSectors((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="min-h-screen bg-white">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-900 to-slate-950 py-24 lg:py-36">
        {/* Animated background layers */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
          <div className="absolute bottom-1/4 -left-40 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_70%)]" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating regulation badges (decorative) */}
        <div className="hidden lg:block absolute top-28 left-[8%] rotate-[-8deg] opacity-40">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-accent" /> RGPD
          </div>
        </div>
        <div className="hidden lg:block absolute top-40 right-[10%] rotate-[5deg] opacity-40">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-accent" /> NIS2
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-40 left-[12%] rotate-[6deg] opacity-40">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5">
            <Leaf className="w-3 h-3 text-accent" /> CSRD
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-52 right-[14%] rotate-[-4deg] opacity-40">
          <div className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-[11px] font-bold text-white tracking-wider flex items-center gap-1.5">
            <Recycle className="w-3 h-3 text-accent" /> DEEE
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              {/* Centered shield/balance emblem */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full" />
                  <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/20 to-emerald-500/10 border border-accent/30 backdrop-blur-xl flex items-center justify-center shadow-[0_0_60px_rgba(16,185,129,0.4)]">
                    <Scale className="w-11 h-11 text-accent" strokeWidth={1.75} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/40 ring-4 ring-slate-950">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/90 text-xs font-medium tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {tx("Expertise IT · Métier · Réglementaire", "Expertise IT · Business · Regulatory")}
                </span>
              </div>

              <h1 className="text-center text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
                {tx("La conformité n'est pas", "Compliance is not")}
                <br />
                <span className="bg-gradient-to-r from-accent via-emerald-300 to-accent bg-clip-text text-transparent">
                  {tx("une option.", "an option.")}
                </span>
              </h1>

              <p className="text-center text-lg md:text-xl text-slate-300/90 mb-14 max-w-3xl mx-auto leading-relaxed font-light">
                {tx(
                  "GreenTechCycle maîtrise l'intersection entre IT, métier et réglementation. Une plateforme unique pour naviguer la complexité ITAD et transformer la conformité en ",
                  "GreenTechCycle masters the intersection of IT, business and regulation. One platform to navigate ITAD complexity and turn compliance into "
                )}
                <span className="text-accent font-medium">
                  {tx("avantage concurrentiel.", "competitive advantage.")}
                </span>
              </p>

              {/* Hero KPIs — premium 4-column */}
              <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
                {[
                  { num: 30, suffix: "+", decimals: 0, label: tx("Réglementations maîtrisées", "Regulations mastered"), icon: Gavel, accent: true },
                  { num: 78, suffix: "%", decimals: 0, label: tx("Non-conformes RGPD", "Non-compliant GDPR"), icon: AlertTriangle },
                  { num: 4.5, suffix: tx(" Md€", "B€"), decimals: 1, label: tx("Amendes RGPD cumulées", "Cumulative GDPR fines"), icon: BarChart3 },
                  { num: 160, suffix: "k", decimals: 0, label: tx("Entreprises NIS2 UE", "EU companies NIS2"), icon: Network },
                ].map((kpi, i) => {
                  const KIcon = kpi.icon;
                  return (
                    <StaggerItem key={i}>
                      <div className="group relative rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 px-5 py-6 hover:border-accent/40 hover:from-white/[0.1] transition-all duration-500 h-full">
                        <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-60 transition">
                          <KIcon className="w-5 h-5 text-accent" />
                        </div>
                        <div className={`text-4xl md:text-5xl font-black mb-3 ${kpi.accent ? "text-accent" : "text-white"}`}>
                          <CountUp end={kpi.num} decimals={kpi.decimals} suffix={kpi.suffix} />
                        </div>
                        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-medium leading-snug">
                          {kpi.label}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-14">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-600 text-white font-semibold rounded-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.8)] transition-all hover:-translate-y-0.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {tx("Demander un audit de conformité", "Request compliance audit")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                <a
                  href="#sectors"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/15 backdrop-blur-xl transition-all"
                >
                  <Landmark className="w-4 h-4" />
                  {tx("Explorer par secteur", "Explore by sector")}
                </a>
              </div>

              {/* Scroll indicator */}
              <div className="hidden lg:flex justify-center mt-16">
                <div className="flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase">
                  <span>{tx("Défiler", "Scroll")}</span>
                  <div className="w-px h-12 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ TRUST STRIP ═══════════════ */}
      <section className="relative bg-slate-950 border-y border-white/5 py-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-primary-900/40 to-slate-950" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs">
            <span className="text-slate-500 uppercase tracking-widest font-semibold">
              {tx("Réglementations couvertes", "Regulations covered")}
            </span>
            {[
              { label: "RGPD", icon: Shield },
              { label: "NIS2", icon: Lock },
              { label: "CSRD", icon: Leaf },
              { label: "DORA", icon: BarChart3 },
              { label: "ISO 27001", icon: ShieldCheck },
              { label: "HDS", icon: Heart },
              { label: "PCI-DSS", icon: CreditCard },
              { label: "AI Act", icon: Brain },
              { label: "DEEE", icon: Recycle },
            ].map(({ label, icon: BIcon }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-slate-300 font-semibold tracking-wide">
                <BIcon className="w-3.5 h-3.5 text-accent" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTOR NAV ═══════════════ */}
      <section className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              <Target className="w-3 h-3" />
              {tx("Naviguer", "Navigate")}
            </span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              <a
                href="#transversal"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-900 bg-slate-900 text-white text-sm font-semibold whitespace-nowrap hover:bg-slate-800 hover:shadow-md transition"
              >
                <Globe className="w-4 h-4" />
                {tx("Transversales", "Cross-sector")}
              </a>
              {sectors.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#sectors`}
                    onClick={() => setOpenSectors((prev) => ({ ...prev, [s.id]: true }))}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${s.borderColor} ${s.bgColor} ${s.textColor} text-sm font-semibold whitespace-nowrap hover:shadow-md hover:-translate-y-0.5 transition`}
                  >
                    <Icon className="w-4 h-4" />
                    {s.title}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRANSVERSAL REGULATIONS ═══════════════ */}
      <section id="transversal" className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-accent/[0.04] to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-5">
                <Globe className="w-3.5 h-3.5" />
                {tx("Socle commun", "Common foundation")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
                {tx("Réglementations ", "Cross-sector ")}
                <span className="relative">
                  <span className="relative z-10">{tx("transversales", "regulations")}</span>
                  <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/20 -z-0" />
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {tx(
                  "Ces réglementations s'appliquent à toutes les entreprises, quel que soit le secteur. Elles forment le socle de conformité minimum que chaque DSI doit maîtriser.",
                  "These regulations apply to all companies regardless of sector. They form the minimum compliance foundation every CIO must master."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {transversal.map((reg) => {
              const Icon = reg.icon;
              return (
                <StaggerItem key={reg.name}>
                  <article className="group relative h-full bg-white rounded-3xl border border-slate-200/80 hover:border-accent/30 hover:shadow-2xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    {/* Decorative corner glow */}
                    <div className={`absolute -top-16 -right-16 w-40 h-40 ${reg.bgColor} rounded-full blur-3xl opacity-0 group-hover:opacity-70 transition-opacity duration-700`} />

                    <div className="relative p-7">
                      <div className="flex items-start justify-between gap-3 mb-5">
                        <div className={`w-14 h-14 rounded-2xl ${reg.bgColor} border ${reg.borderColor} flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                          <Icon className={`w-7 h-7 ${reg.color}`} strokeWidth={1.75} />
                        </div>
                        <StatusBadge status={reg.status} tx={tx} />
                      </div>

                      <h3 className="text-2xl font-bold text-slate-900 mb-1 tracking-tight">{reg.name}</h3>
                      <p className="text-xs text-slate-500 mb-4 font-medium">{reg.fullName}</p>

                      <div className="flex flex-wrap gap-3 text-[11px] text-slate-500 mb-5 pb-5 border-b border-slate-100">
                        <span className="inline-flex items-center gap-1">
                          <Globe className="w-3 h-3" /> {reg.jurisdiction}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {reg.inForce}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-5">{reg.description}</p>

                      <div className={`rounded-2xl ${reg.bgColor} border ${reg.borderColor} p-4 mb-4`}>
                        <p className={`text-xs font-bold uppercase tracking-wider ${reg.color} mb-1 flex items-center gap-1.5`}>
                          <TrendingUp className="w-3 h-3" />
                          {tx("Impact chiffré", "Quantified impact")}
                        </p>
                        <p className={`text-base font-bold ${reg.color}`}>{reg.keyFigure}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{reg.subFigure}</p>
                      </div>

                      <div className="flex items-start gap-2.5 bg-gradient-to-br from-accent/5 to-emerald-50 rounded-2xl p-4 border border-accent/10">
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-sm shadow-accent/30">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          <span className="font-bold text-slate-900">{tx("Comment GTC aide", "How GTC helps")} :</span> {reg.gtcHelp}
                        </p>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════ REGULATIONS BY SECTOR ═══════════════ */}
      <section id="sectors" className="py-24 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-5">
                <Landmark className="w-3.5 h-3.5" />
                {tx("Par secteur d'activité", "By industry sector")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
                {tx("Cadre réglementaire ", "Regulatory framework ")}
                <span className="text-primary">{tx("par secteur", "by sector")}</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {tx(
                  "Le DSI cherche ce qui s'applique à SON secteur. Cliquez sur votre domaine pour voir les réglementations qui vous concernent, avec pré-requis techniques et impact business.",
                  "The CIO looks for what applies to THEIR sector. Click your domain to see the regulations that concern you, with technical prerequisites and business impact."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto space-y-4">
            {sectors.map((sector, i) => (
              <FadeIn key={sector.id} delay={i * 0.04}>
                <SectorSection
                  sector={sector}
                  isOpen={!!openSectors[sector.id]}
                  toggle={() => toggleSector(sector.id)}
                  tx={tx}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TIMELINE 2024→2028 ═══════════════ */}
      <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
          <div className="absolute top-1/3 left-[10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-[10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest mb-5">
                <Clock className="w-3.5 h-3.5" />
                {tx("Agenda réglementaire 2024 — 2028", "Regulatory agenda 2024 — 2028")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight leading-[1.1]">
                {tx("Chaque jalon,", "Every milestone,")}
                <br />
                <span className="bg-gradient-to-r from-accent via-emerald-300 to-accent bg-clip-text text-transparent">
                  {tx("un impact business concret", "concrete business impact")}
                </span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed">
                {tx(
                  "Pas juste des dates — ce qui change pour le DSI/RSSI, l'impact financier, et ce que GTC recommande de faire maintenant.",
                  "Not just dates — what changes for the CIO/CISO, the financial impact, and what GTC recommends doing now."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[27px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((t, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <FadeIn key={i} delay={i * 0.08} direction={isLeft ? "right" : "left"}>
                    <div className={`relative flex items-start gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Timeline node */}
                      <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                        <div className="w-14 h-14 rounded-2xl bg-slate-900 border-2 border-accent flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest text-center leading-tight px-1">
                            {t.date}
                          </span>
                        </div>
                      </div>

                      {/* Spacer for desktop alternating layout */}
                      <div className="hidden md:block md:w-1/2" />

                      {/* Card */}
                      <div className={`flex-1 md:w-1/2 ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                        <div className="group bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-accent/40 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] transition-all duration-500">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-flex md:hidden items-center text-[10px] font-bold uppercase tracking-widest text-accent">
                              {t.date}
                            </span>
                            <span className="md:ml-0 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                              <Sparkles className="w-3 h-3" />
                              {tx("Jalon clé", "Key milestone")}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{t.title}</h3>
                          <p className="text-sm text-slate-300 leading-relaxed mb-4">{t.impact}</p>
                          <div className="flex items-start gap-2 bg-gradient-to-br from-accent/15 to-emerald-500/5 rounded-xl px-3 py-2.5 border border-accent/20">
                            <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-accent/90 font-medium leading-relaxed">
                              {t.business}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ENJEUX & CRISES ACTUELLES ═══════════════ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-widest mb-5">
                <Activity className="w-3.5 h-3.5" />
                {tx("Contexte géopolitique & technologique", "Geopolitical & technological context")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
                {tx("Enjeux & crises qui ", "Issues & crises ")}
                <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                  {tx("redéfinissent l'ITAD", "redefining ITAD")}
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {tx(
                  "Au-delà de la réglementation, des forces géopolitiques, énergétiques et technologiques redessinent les priorités de la gestion des actifs IT.",
                  "Beyond regulation, geopolitical, energy and technological forces are reshaping IT asset management priorities."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
            {enjeuxSections.map((section, i) => {
              const SectionIcon = section.icon;
              return (
                <FadeIn key={section.id} delay={i * 0.06}>
                  <div className="group relative h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/30 overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-500">
                    {/* Gradient top bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${section.color}`} />

                    <div className="p-7 md:p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                          <SectionIcon className="w-7 h-7 text-white" strokeWidth={1.75} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{section.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {section.items.map((item, j) => (
                          <div key={j} className="relative pl-5 border-l-2 border-slate-200 hover:border-accent transition-colors">
                            <h4 className="font-bold text-slate-900 mb-1.5 text-sm tracking-tight">{item.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ PROPOSITION DE VALEUR GTC ═══════════════ */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-5">
                <Sparkles className="w-3.5 h-3.5" />
                {tx("Notre réponse", "Our answer")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
                {tx("Comment ", "How ")}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">GreenTechCycle</span>
                </span>
                {tx(" vous aide", " helps you")}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {tx(
                  "GreenTechCycle a été conçu pour répondre à chacun de ces défis avec une plateforme unifiée, certifiée et auditable.",
                  "GreenTechCycle was designed to address each of these challenges with a unified, certified and auditable platform."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-14">
            {valueProps.map((vp, i) => {
              const VPIcon = vp.icon;
              return (
                <StaggerItem key={i}>
                  <div className="group relative h-full bg-white rounded-3xl p-7 border border-slate-200 hover:shadow-2xl hover:shadow-slate-900/5 hover:border-accent/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-emerald-50 border border-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <VPIcon className="w-7 h-7 text-accent" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2.5 tracking-tight">{vp.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{vp.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Services & certifications links */}
          <FadeIn>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
              <Link
                href="/services"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Workflow className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 mb-0.5">{tx("Nos services", "Our services")}</p>
                  <p className="text-xs text-slate-500">{tx("ITAD, destruction, reconditionnement", "ITAD, destruction, refurbishment")}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/securite"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-accent hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 mb-0.5">{tx("Nos certifications", "Our certifications")}</p>
                  <p className="text-xs text-slate-500">{tx("ISO 27001, R2v3, NIST, DoD", "ISO 27001, R2v3, NIST, DoD")}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-accent group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/methodologie"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-secondary hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 mb-0.5">{tx("Notre méthodologie", "Our methodology")}</p>
                  <p className="text-xs text-slate-500">{tx("Processus ITAD 7 étapes", "ITAD 7-step process")}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-secondary group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ BLOG / RESSOURCES ═══════════════ */}
      <section className="py-24 lg:py-32 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-5">
                <BookOpen className="w-3.5 h-3.5" />
                {tx("Ressources & analyses", "Resources & insights")}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 tracking-tight leading-[1.1]">
                {tx("Approfondir la ", "Dive deeper into ")}
                <span className="text-primary">{tx("conformité", "compliance")}</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {tx(
                  "Analyses, guides pratiques et retours d'expérience pour comprendre et anticiper les exigences réglementaires ITAD.",
                  "Analyses, practical guides and insights to understand and anticipate ITAD regulatory requirements."
                )}
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-10">
            {[
              {
                slug: "nis2-compliance-it-infrastructure",
                title: tx("NIS2 & conformité IT : obligations d'infrastructure", "NIS2 & IT compliance: infrastructure obligations"),
                excerpt: tx("Décryptage des exigences NIS2 pour la gestion de votre parc IT : registre d'actifs, notification d'incidents, chain of custody.", "Breakdown of NIS2 requirements for IT fleet management: asset register, incident notification, chain of custody."),
                icon: Lock,
                color: "from-indigo-500 to-blue-600",
                iconBg: "bg-indigo-50",
                iconColor: "text-indigo-600",
                tag: "NIS2 · Cybersécurité",
              },
              {
                slug: "csrd-et-itad-reporting-esg-actifs-it",
                title: tx("CSRD & ITAD : intégrer l'IT aux comptes-rendus ESG", "CSRD & ITAD: embedding IT into ESG reporting"),
                excerpt: tx("Comment contribuer aux indicateurs ESRS E1 et E5 avec votre programme ITAD : CO₂ évité, taux de réemploi, bilan matière.", "How to contribute to ESRS E1 and E5 indicators with your ITAD program: avoided CO₂, reuse rate, material balance."),
                icon: Leaf,
                color: "from-emerald-500 to-teal-600",
                iconBg: "bg-emerald-50",
                iconColor: "text-emerald-600",
                tag: "CSRD · ESG",
              },
              {
                slug: "securite-donnees-fin-de-vie-equipements-it",
                title: tx("Sécurité des données en fin de vie IT", "End-of-life IT data security"),
                excerpt: tx("Protéger vos données sensibles lors du décommissionnement : méthodes d'effacement NIST, DoD, IEEE, certificats et preuves.", "Protect sensitive data during decommissioning: NIST, DoD, IEEE erasure methods, certificates and evidence."),
                icon: Shield,
                color: "from-rose-500 to-red-600",
                iconBg: "bg-rose-50",
                iconColor: "text-rose-600",
                tag: "RGPD · Sécurité",
              },
              {
                slug: "guide-deee-reglementation-entreprise",
                title: tx("Guide DEEE : obligations entreprises 2026", "WEEE guide: 2026 company obligations"),
                excerpt: tx("Responsabilité Élargie du Producteur, éco-organismes, traçabilité des DEEE : ce que chaque entreprise doit mettre en place.", "Extended Producer Responsibility, eco-organisations, WEEE traceability: what every company must put in place."),
                icon: Recycle,
                color: "from-green-500 to-emerald-600",
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
                tag: "DEEE · AGEC",
              },
              {
                slug: "economie-circulaire-it-entreprise",
                title: tx("Économie circulaire IT en entreprise", "Circular IT economy in enterprise"),
                excerpt: tx("Du reconditionnement à la valorisation des actifs : construire une stratégie circulaire rentable et conforme loi AGEC.", "From refurbishment to asset recovery: building a profitable circular strategy compliant with AGEC law."),
                icon: Zap,
                color: "from-amber-500 to-orange-600",
                iconBg: "bg-amber-50",
                iconColor: "text-amber-600",
                tag: "AGEC · Circularité",
              },
            ].map((article, i) => {
              const AIcon = article.icon;
              return (
                <StaggerItem key={i}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group relative h-full flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-300 transition-all duration-500"
                  >
                    {/* Visual header */}
                    <div className={`relative h-40 bg-gradient-to-br ${article.color} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.4), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2), transparent 50%)",
                      }} />
                      <AIcon className="w-20 h-20 text-white/90 relative z-10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.25} />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-[10px] font-bold text-white tracking-wider uppercase border border-white/30">
                        {article.tag}
                      </span>
                    </div>

                    <div className="flex-1 p-6 flex flex-col">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-primary transition">
                        {article.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                        {article.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                        {tx("Lire l'article", "Read article")}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-semibold transition-all"
              >
                <BookOpen className="w-4 h-4" />
                {tx("Voir tous les articles", "See all articles")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ SOURCES & RÉFÉRENCES ═══════════════ */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-4">
                <FileCheck className="w-3 h-3" />
                {tx("Données sourcées", "Sourced data")}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                {tx("Sources & Références", "Sources & References")}
              </h2>
              <p className="text-slate-600">
                {tx(
                  "Toutes les données citées proviennent de sources institutionnelles et d'analystes reconnus.",
                  "All cited data comes from institutional sources and recognized analysts."
                )}
              </p>
            </div>
          </FadeIn>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {sources.map((s, i) => (
              <div key={i} className="group bg-slate-50 hover:bg-white rounded-xl p-4 border border-slate-200 hover:border-accent/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-5 bg-accent rounded-full" />
                  <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary to-slate-950 overflow-hidden">
        {/* Ambient lights */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -top-20 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              {/* Central emblem */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/40 blur-3xl rounded-full animate-pulse" style={{ animationDuration: "4s" }} />
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-accent/30 to-emerald-500/10 border border-accent/40 backdrop-blur-xl flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.5)]">
                    <Scale className="w-10 h-10 text-accent" strokeWidth={1.75} />
                  </div>
                </div>
              </div>

              <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.05]">
                {tx("Transformez la conformité", "Turn compliance")}
                <br />
                <span className="bg-gradient-to-r from-accent via-emerald-300 to-accent bg-clip-text text-transparent">
                  {tx("en avantage concurrentiel", "into competitive edge")}
                </span>
              </h2>

              <p className="text-center text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                {tx(
                  "Nos experts cartographient les réglementations qui vous concernent, identifient les écarts et construisent votre plan d'action priorisé.",
                  "Our experts map the regulations that apply to you, identify gaps and build your prioritized action plan."
                )}
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-600 text-white font-semibold rounded-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.8)] hover:-translate-y-0.5 transition-all"
                >
                  <ShieldCheck className="w-5 h-5" />
                  {tx("Demander un audit de conformité", "Request compliance audit")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-xl transition-all"
                >
                  <Eye className="w-5 h-5" />
                  {tx("Voir la démo", "See the demo")}
                </Link>
              </div>

              {/* Secondary CTAs grid */}
              <div className="grid sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
                <Link
                  href="/securite"
                  className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-white">{tx("Nos certifications", "Our certifications")}</p>
                    <p className="text-xs text-slate-400">{tx("ISO 27001, R2v3, NIST", "ISO 27001, R2v3, NIST")}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </Link>
                <Link
                  href="/methodologie"
                  className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-white">{tx("Méthodologie", "Methodology")}</p>
                    <p className="text-xs text-slate-400">{tx("Processus ITAD en 7 étapes", "7-step ITAD process")}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </Link>
                <Link
                  href="/blog"
                  className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-white">{tx("Ressources", "Resources")}</p>
                    <p className="text-xs text-slate-400">{tx("Guides & analyses", "Guides & analyses")}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition" />
                </Link>
              </div>

              {/* Trust footer */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-14 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {tx("Audit gratuit", "Free audit")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {tx("Réponse sous 24h", "Response within 24h")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {tx("Expertise certifiée", "Certified expertise")}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  {tx("RGPD · NIS2 · CSRD", "GDPR · NIS2 · CSRD")}
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedArticles
        categories={["Réglementation", "Conformité"]}
        title="Guides de conformité réglementaire"
        subtitle="CSRD, NIS2, DEEE : des analyses détaillées pour sécuriser votre conformité IT."
        limit={3}
        tone="light"
      />
    </main>
  );
}
