"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  Search,
  Gauge,
  CheckSquare,
  Truck,
  Settings,
  FileCheck,
  Award,
  Radar,
  Shield,
  HardDrive,
  Server,
  Cpu,
  TrendingUp,
  Leaf,
  BarChart3,
  Target,
  Sparkles,
  CheckCircle2,
  Clock,
  Lock,
  Recycle,
  Activity,
  Briefcase,
  CircleDollarSign,
  ShieldCheck,
  Zap,
  Eye,
  Video,
  Signal,
  Box,
  Layers,
  ArrowDownUp,
  Hash,
  FileText,
  AlertTriangle,
  Users,
  Laptop,
  Brain,
  Atom,
  Plug,
  Camera,
  Battery,
  Network,
  CircleDot,
  Calendar,
} from "lucide-react";
import RelatedArticles from "@/components/RelatedArticles";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/motion";

const useTx = () => {
  const locale = useLocale();
  return (fr: string, en: string) => (locale === "en" ? en : fr);
};

// ---------- Roadmap badge ----------
type RoadmapStatus = "dev" | "beta" | "planned";
function RoadmapBadge({ status, tx }: { status: RoadmapStatus; tx: ReturnType<typeof useTx> }) {
  const labels = {
    dev: { label: tx("En développement", "In development"), cls: "bg-amber-100 text-amber-700 border-amber-200" },
    beta: { label: "Beta", cls: "bg-sky-100 text-sky-700 border-sky-200" },
    planned: { label: tx("Planifié", "Planned"), cls: "bg-slate-100 text-slate-600 border-slate-200" },
  };
  const s = labels[status];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full border ${s.cls}`}>
      <CircleDot className="w-2.5 h-2.5" />
      {s.label}
    </span>
  );
}

export default function MethodologyPage() {
  const tx = useTx();

  // ---------- 8 Engineering Modules ----------
  const modules = [
    {
      num: "01",
      duration: tx("J+0 → J+2", "D+0 → D+2"),
      icon: Search,
      color: "from-sky-500 to-blue-600",
      accent: "text-sky-700",
      bg: "bg-sky-50",
      border: "border-sky-200",
      title: tx("Discovery & Cartographie", "Discovery & Mapping"),
      description: tx(
        "Scan automatique du réseau, déploiement d'agents, identification RFID/code-barres. Cartographie exhaustive du parc IT/OT avec réconciliation CMDB.",
        "Automatic network scan, agent deployment, RFID/barcode identification. Exhaustive IT/OT fleet mapping with CMDB reconciliation."
      ),
      inputs: tx("Accès réseau client, périmètre défini, accès CMDB", "Client network access, defined scope, CMDB access"),
      outputs: tx("Inventaire exhaustif avec scoring initial, delta CMDB", "Exhaustive inventory with initial scoring, CMDB delta"),
      checkpoints: tx("Validation du périmètre, réconciliation CMDB, signature client", "Scope validation, CMDB reconciliation, client sign-off"),
      proofs: tx("Rapport d'inventaire signé, delta avec CMDB client, hash SHA-256 par asset", "Signed inventory report, client CMDB delta, SHA-256 hash per asset"),
      sla: tx("500 assets inventoriés en 48h, précision 99,2%", "500 assets inventoried in 48h, 99.2% accuracy"),
      details: [
        tx("Connecteurs CMDB · AD · Intune · Jamf · ServiceNow", "CMDB · AD · Intune · Jamf · ServiceNow connectors"),
        tx("Photos haute définition + géolocalisation", "High-res photos + geolocation"),
        tx("Hash SHA-256 de l'empreinte hardware unique", "SHA-256 hash of unique hardware fingerprint"),
        tx("Identification des assets Shadow IT non inventoriés", "Shadow IT asset identification (uninventoried)"),
      ],
    },
    {
      num: "02",
      duration: tx("J+2 → J+4", "D+2 → D+4"),
      icon: Gauge,
      color: "from-violet-500 to-indigo-600",
      accent: "text-violet-700",
      bg: "bg-violet-50",
      border: "border-violet-200",
      title: tx("Risk Assessment & Scoring", "Risk Assessment & Scoring"),
      description: tx(
        "Scoring multicritère : criticité des données (classification C1-C4), vulnérabilités CVE, âge, état physique. Moteur à 12 critères pondérés inspiré du NIST CSF et ISO 31000.",
        "Multi-criteria scoring: data criticality (C1-C4 classification), CVE vulnerabilities, age, physical condition. 12-criteria weighted engine inspired by NIST CSF and ISO 31000."
      ),
      inputs: tx("Inventaire complet, classification données client, référentiel CVE", "Complete inventory, client data classification, CVE reference"),
      outputs: tx("Matrice de risque par asset, recommandation automatique (4 voies)", "Risk matrix per asset, automatic recommendation (4 channels)"),
      checkpoints: tx("Validation des pondérations, revue de la matrice par le RSSI", "Weight validation, matrix review by CISO"),
      proofs: tx("Rapport de scoring avec justification de chaque décision, logs algorithmiques", "Scoring report with justification for each decision, algorithm logs"),
      sla: tx("12 critères × 100 points · Méthodologie NIST CSF / ISO 31000", "12 criteria × 100 points · NIST CSF / ISO 31000 methodology"),
      details: [
        tx("Classification C1 (public) → C4 (top secret)", "Classification C1 (public) → C4 (top secret)"),
        tx("Scan CVE automatisé + base NVD NIST", "Automated CVE scan + NIST NVD database"),
        tx("Valeur marché temps réel par modèle", "Real-time market value per model"),
        tx("CO₂ évité projeté sur 3 ans (Source : ADEME)", "Projected avoided CO₂ over 3 years (Source: ADEME)"),
      ],
    },
    {
      num: "03",
      duration: tx("J+4 → J+5", "D+4 → D+5"),
      icon: CheckSquare,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      title: tx("Decision Engine", "Decision Engine"),
      description: tx(
        "4 voies de traitement : Reconditionner / Recycler / Valoriser / Détruire. Validation multi-niveaux (principe des 4 yeux), comité de décision incluant le client, DPO et RSSI.",
        "4 processing channels: Refurbish / Recycle / Recover / Destroy. Multi-level validation (4-eyes principle), decision committee including client, DPO and CISO."
      ),
      inputs: tx("Matrice de risque, scoring par asset, politique client", "Risk matrix, per-asset scoring, client policy"),
      outputs: tx("Plan d'action validé par le client avec voie assignée à chaque asset", "Client-validated action plan with assigned channel per asset"),
      checkpoints: tx("4-eyes principle, comité de décision, signature client/DPO/RSSI", "4-eyes principle, decision committee, client/DPO/CISO sign-off"),
      proofs: tx("PV de décision co-signé, traçabilité des approbations, log horodaté", "Co-signed decision minutes, approval traceability, timestamped log"),
      sla: tx("100% des décisions validées 4-eyes · Signature eIDAS qualifiée", "100% decisions 4-eyes validated · Qualified eIDAS signature"),
      details: [
        tx("Parcours d'approbation configurable par rôle", "Role-configurable approval workflow"),
        tx("Signature électronique eIDAS qualifiée", "Qualified eIDAS electronic signature"),
        tx("Archivage probatoire 10 ans", "10-year probative archiving"),
        tx("Escalade automatique si asset critique (C3/C4)", "Automatic escalation for critical assets (C3/C4)"),
      ],
    },
    {
      num: "04",
      duration: tx("J+5 → J+7", "D+5 → D+7"),
      icon: Truck,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      title: tx("Logistique sécurisée", "Secure Logistics"),
      description: tx(
        "Transport sécurisé avec scellés numérotés inviolables, suivi GPS temps réel, plaques et chauffeurs enregistrés. Assurance spécifique valeur déclarée. Chaîne de traçabilité physique documentée à chaque transfert.",
        "Secure transport with tamper-proof numbered seals, real-time GPS tracking, registered plates and drivers. Specific declared value insurance. Physical chain of custody documented at every transfer."
      ),
      inputs: tx("Plan d'action validé, liste de colisage, périmètre de collecte", "Validated action plan, packing list, collection scope"),
      outputs: tx("Bordereaux de transport signés, tracking temps réel, PV de réception", "Signed transport slips, real-time tracking, reception minutes"),
      checkpoints: tx("Vérification scellés au départ et à l'arrivée, contrôle GPS continu", "Seal verification at departure and arrival, continuous GPS monitoring"),
      proofs: tx("Logs GPS, photos scellés départ/arrivée, PV de réception signé, vidéo chargement", "GPS logs, departure/arrival seal photos, signed reception minutes, loading video"),
      sla: tx("100% des transferts GPS-tracés · Scellés numérotés vérifiés", "100% GPS-tracked transfers · Verified numbered seals"),
      details: [
        tx("Scellés numérotés inviolables avec QR code", "Tamper-proof numbered seals with QR code"),
        tx("Véhicules géolocalisés + dashcam embarquée", "Geolocated vehicles + onboard dashcam"),
        tx("Convoi double-équipage pour lots C3/C4", "Dual-crew convoy for C3/C4 batches"),
        tx("Option huissier au chargement/déchargement", "Bailiff option at loading/unloading"),
      ],
    },
    {
      num: "05",
      duration: tx("J+7 → J+14", "D+7 → D+14"),
      icon: Settings,
      color: "from-rose-500 to-red-600",
      accent: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
      title: tx("Processing", "Processing"),
      description: tx(
        "4 filières selon la décision du module 03. Chaque filière suit un protocole spécifique avec preuves dédiées.",
        "4 channels per module 03 decision. Each channel follows a specific protocol with dedicated evidence."
      ),
      inputs: tx("Assets réceptionnés, plan d'action validé, voie assignée", "Received assets, validated action plan, assigned channel"),
      outputs: tx("Certificat spécifique par voie : effacement / destruction / reconditionnement / recyclage", "Channel-specific certificate: erasure / destruction / refurbishment / recycling"),
      checkpoints: tx("Validation par opérateur qualifié, double contrôle sur assets C3/C4", "Qualified operator validation, dual check on C3/C4 assets"),
      proofs: tx("Logs horodatés, vidéo HD de destruction, hash cryptographique des certificats, BSD DEEE", "Timestamped logs, HD destruction video, certificate cryptographic hash, WEEE waste slip"),
      sla: tx("4 filières · Standards NIST 800-88 / DoD / IEEE 2883 / Gutmann", "4 channels · NIST 800-88 / DoD / IEEE 2883 / Gutmann standards"),
      details: [
        tx("Effacement : NIST 800-88 · DoD 5220.22-M · IEEE 2883 selon scoring", "Erasure: NIST 800-88 · DoD 5220.22-M · IEEE 2883 per scoring"),
        tx("Destruction : broyage industriel < 2mm, certificat vidéo HD", "Destruction: industrial shredding < 2mm, HD video certificate"),
        tx("Reconditionnement : tests fonctionnels complets, benchmarking, garantie 12 mois", "Refurbishment: full functional tests, benchmarking, 12-month warranty"),
        tx("Recyclage : tri matières, filières DEEE agréées Ecologic/Ecosystem", "Recycling: material sorting, approved WEEE channels Ecologic/Ecosystem"),
      ],
    },
    {
      num: "06",
      duration: tx("J+14 → J+15", "D+14 → D+15"),
      icon: Eye,
      color: "from-primary to-emerald-700",
      accent: "text-primary",
      bg: "bg-primary/5",
      border: "border-primary/20",
      title: tx("Verification & Audit", "Verification & Audit"),
      description: tx(
        "Double vérification indépendante : l'auditeur n'est jamais l'opérateur. Échantillonnage aléatoire 10% minimum + vérification exhaustive sur tous les assets critiques (C3/C4).",
        "Independent double verification: auditor is never the operator. Random sampling minimum 10% + exhaustive verification on all critical assets (C3/C4)."
      ),
      inputs: tx("Lots traités, certificats de processing, logs opérationnels", "Processed batches, processing certificates, operational logs"),
      outputs: tx("Rapport d'audit complet, attestation d'audit signée", "Complete audit report, signed audit attestation"),
      checkpoints: tx("Séparation des rôles opérateur/auditeur, tests cryptographiques ATA/NVMe", "Operator/auditor role separation, ATA/NVMe cryptographic tests"),
      proofs: tx("Attestation d'audit signée, preuves photographiques, rapport PDF signé + hash SHA-256", "Signed audit attestation, photographic evidence, signed PDF report + SHA-256 hash"),
      sla: tx("100% lots audités · 10% échantillonnage minimum · 100% C3/C4 vérifiés", "100% batches audited · 10% minimum sampling · 100% C3/C4 verified"),
      details: [
        tx("Équipe qualité indépendante de l'équipe opérations", "Quality team independent from operations team"),
        tx("Tests cryptographiques ATA Secure Erase / NVMe Sanitize", "ATA Secure Erase / NVMe Sanitize cryptographic tests"),
        tx("Vérification exhaustive sur assets C3/C4 (100%)", "Exhaustive verification on C3/C4 assets (100%)"),
        tx("Rapport PDF signé numériquement + hash SHA-256 vérifiable", "Digitally signed PDF report + verifiable SHA-256 hash"),
      ],
    },
    {
      num: "07",
      duration: tx("J+15 → J+16", "D+15 → D+16"),
      icon: Award,
      color: "from-indigo-500 to-purple-600",
      accent: "text-indigo-700",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      title: tx("Certification & Livrables", "Certification & Deliverables"),
      description: tx(
        "Génération automatique de l'ensemble des livrables certifiés : certificats d'effacement avec hash SHA-256 vérifiable, rapport RSE/Carbone, rapport financier, PV d'huissier si Chain of Custody premium.",
        "Automatic generation of all certified deliverables: erasure certificates with verifiable SHA-256 hash, CSR/Carbon report, financial report, bailiff report for premium Chain of Custody."
      ),
      inputs: tx("Rapports d'audit validés, données de traitement, données carbone", "Validated audit reports, processing data, carbon data"),
      outputs: tx("Dossier complet client : certificats, rapport RSE, rapport financier, PV huissier (PDF, Excel, API)", "Complete client package: certificates, CSR report, financial report, bailiff minutes (PDF, Excel, API)"),
      checkpoints: tx("Validation des certificats, contrôle de cohérence, signature numérique", "Certificate validation, consistency check, digital signature"),
      proofs: tx("Certificats individuels par numéro de série avec hash SHA-256, rapport carbone ESRS E5", "Individual certificates per serial number with SHA-256 hash, ESRS E5 carbon report"),
      sla: tx("5+ livrables par mission · Certificats vérifiables en ligne", "5+ deliverables per mission · Online-verifiable certificates"),
      details: [
        tx("Certificats d'effacement individuels (hash SHA-256 vérifiable)", "Individual erasure certificates (verifiable SHA-256 hash)"),
        tx("Rapport RSE/Carbone : tonnes CO₂ évitées, % valorisation (ADEME/Boavizta)", "CSR/Carbon report: avoided CO₂ tonnes, % recovery (ADEME/Boavizta)"),
        tx("Rapport financier : valeur récupérée, ROI de l'opération", "Financial report: recovered value, operation ROI"),
        tx("Export direct : PDF signé, Excel, API REST, ESRS E5", "Direct export: signed PDF, Excel, REST API, ESRS E5"),
      ],
    },
    {
      num: "08",
      duration: tx("Permanent", "Permanent"),
      icon: Radar,
      color: "from-cyan-500 to-teal-600",
      accent: "text-cyan-700",
      bg: "bg-cyan-50",
      border: "border-cyan-200",
      title: tx("Supervision continue", "Continuous Monitoring"),
      description: tx(
        "Tableau de bord temps réel avec KPI en direct. Alertes proactives sur anomalies. Veille réglementaire automatique : dès qu'une nouvelle norme sort, nous mettons à jour vos parcours. Notation continue du parc restant.",
        "Real-time dashboard with live KPIs. Proactive anomaly alerts. Automatic regulatory monitoring: when a new standard is released, we update your workflows. Continuous scoring of remaining fleet."
      ),
      inputs: tx("Données historiques, parc résiduel client, flux réglementaire", "Historical data, client residual fleet, regulatory feed"),
      outputs: tx("Rapports périodiques, recommandations proactives, alertes temps réel", "Periodic reports, proactive recommendations, real-time alerts"),
      checkpoints: tx("Revue trimestrielle, mise à jour des scoring, validation des alertes", "Quarterly review, scoring update, alert validation"),
      proofs: tx("Tableau de bord exportable, historique complet des alertes et actions", "Exportable dashboard, complete alert and action history"),
      sla: tx("99,9% uptime · Veille réglementaire hebdomadaire · Alertes temps réel", "99.9% uptime · Weekly regulatory watch · Real-time alerts"),
      details: [
        tx("KPI live : parc, carbone, valeur récupérée, conformité", "Live KPIs: fleet, carbon, recovered value, compliance"),
        tx("Veille réglementaire automatisée (NIS2, CSRD, AI Act…)", "Automated regulatory watch (NIS2, CSRD, AI Act…)"),
        tx("Alertes : e-mail · Slack · Teams · webhook", "Alerts: email · Slack · Teams · webhook"),
        tx("Scoring continu du parc restant avec recommandations", "Continuous fleet scoring with recommendations"),
      ],
    },
  ];

  // ---------- Roadmap 2026/2027 ----------
  const roadmap = [
    {
      period: tx("2026 S1", "2026 H1"),
      items: [
        { title: tx("IA pour scoring prédictif", "AI for predictive scoring"), desc: tx("Prédire la fin de vie des assets avant qu'elle ne survienne (maintenance prédictive ITAD", "Predict asset end-of-life before it happens) ITAD predictive maintenance"), status: "dev" as RoadmapStatus },
        { title: tx("Connecteurs SAP, ServiceNow, Intune", "SAP, ServiceNow, Intune connectors"), desc: tx("Intégration native avec les ITSM et ERP leaders du marché", "Native integration with market-leading ITSM and ERP"), status: "dev" as RoadmapStatus },
      ],
    },
    {
      period: tx("2026 S2", "2026 H2"),
      items: [
        { title: tx("Module Quantum-Ready Assessment", "Quantum-Ready Assessment module"), desc: tx("Évaluation de la vulnérabilité post-quantum de votre parc (standards NIST PQC 2024", "Post-quantum vulnerability assessment of your fleet) NIST PQC 2024 standards"), status: "beta" as RoadmapStatus },
        { title: tx("Robotique & Cobots", "Robotics & Cobots"), desc: tx("Intégration des assets robotiques et cobots dans le cycle ITAD, firmware, trajectoires, modèles", "Robotics and cobots integration in ITAD lifecycle, firmware, trajectories, models"), status: "planned" as RoadmapStatus },
      ],
    },
    {
      period: tx("2027 S1", "2027 H1"),
      items: [
        { title: tx("Computer Vision pour inventaire", "Computer Vision for inventory"), desc: tx("Reconnaissance visuelle automatique des assets (inventaire par caméra sans scan manuel", "Automatic visual asset recognition) camera inventory without manual scanning"), status: "planned" as RoadmapStatus },
        { title: tx("Digital Product Passport", "Digital Product Passport"), desc: tx("Conformité Règlement Batteries & EcoDesign (passeport numérique par asset", "Batteries Regulation & EcoDesign compliance) digital passport per asset"), status: "planned" as RoadmapStatus },
      ],
    },
    {
      period: tx("2027 S2", "2027 H2"),
      items: [
        { title: tx("Architecture Edge Computing", "Edge Computing Architecture"), desc: tx("Processing distribué pour les clients multi-sites, réduction des latences et des transferts", "Distributed processing for multi-site clients, reduced latency and transfers"), status: "planned" as RoadmapStatus },
        { title: tx("API Marketplace", "API Marketplace"), desc: tx("Connecteurs tiers certifiés (écosystème ouvert de partenaires intégrés", "Certified third-party connectors) open integrated partner ecosystem"), status: "planned" as RoadmapStatus },
      ],
    },
  ];

  // ---------- SLAs ----------
  const slas = [
    { metric: tx("Délai diagnostic", "Diagnostic time"), value: "48h max", icon: Clock, color: "text-sky-600" },
    { metric: tx("Délai traitement complet", "Full processing time"), value: tx("14 jours ouvrés", "14 business days"), icon: Calendar, color: "text-amber-600" },
    { metric: tx("Taux conformité audit", "Audit compliance rate"), value: "99,97%", icon: ShieldCheck, color: "text-emerald-600" },
    { metric: tx("Taux valorisation", "Recovery rate"), value: "72%", icon: TrendingUp, color: "text-accent" },
    { metric: tx("Disponibilité plateforme", "Platform uptime"), value: "99,9%", icon: Signal, color: "text-indigo-600" },
    { metric: tx("Temps de réponse support", "Support response time"), value: tx("4h ouvrées", "4 business hours"), icon: Zap, color: "text-purple-600" },
    { metric: tx("Incidents sécurité (historique)", "Security incidents (history)"), value: tx("Zéro", "Zero"), icon: Shield, color: "text-rose-600" },
  ];

  // ---------- Hero KPIs ----------
  const heroKpis = [
    { value: 12000, suffix: "+", label: tx("Assets traités / an", "Assets processed / year") },
    { value: 99.97, decimals: 2, suffix: "%", label: tx("Conformité audit", "Audit compliance") },
    { value: 0, suffix: tx("incident", "incident"), label: tx("Zéro incident sécurité", "Zero security incident"), displayValue: "0" },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-primary py-20 lg:py-28">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="absolute top-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-accent text-sm font-medium">
                  <Activity className="w-4 h-4" />
                  {tx("Ingénierie de processus ITAD", "ITAD process engineering")}
                </span>
              </div>
              <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1]">
                {tx("Une ingénierie de processus", "Process engineering")}{" "}
                <span className="text-accent">{tx("certifiable à chaque étape", "certifiable at every step")}</span>
              </h1>
              <p className="text-center text-lg md:text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                {tx(
                  "Chaque action est validée, authentifiée, auditable et reproductible. 8 modules d'ingénierie avec inputs, outputs, points de contrôle et preuves, pas une simple liste d'étapes.",
                  "Every action is validated, authenticated, auditable and reproducible. 8 engineering modules with inputs, outputs, checkpoints and evidence, not just a list of steps."
                )}
              </p>

              {/* Hero KPIs */}
              <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
                {heroKpis.map((k, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-5 py-6 text-center">
                    <div className="text-3xl md:text-4xl font-black text-accent">
                      {k.displayValue ? (
                        <span>{k.displayValue}</span>
                      ) : (
                        <CountUp end={k.value} decimals={k.decimals || 0} suffix={k.suffix} />
                      )}
                    </div>
                    <p className="text-xs uppercase tracking-wider text-slate-300 mt-2">{k.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/25 transition"
                >
                  {tx("Demander une évaluation", "Request an assessment")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur transition"
                >
                  {tx("Explorer les 8 modules", "Explore the 8 modules")}
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8 ENGINEERING MODULES ═══════════════ */}
      <section id="modules" className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-4">
                <Layers className="w-3.5 h-3.5" />
                {tx("Processus ITAD (8 modules d'ingénierie", "ITAD Process) 8 engineering modules")}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                {tx("Chaque module est un bloc d'ingénierie validé", "Every module is a validated engineering block")}
              </h2>
              <p className="text-lg text-slate-600">
                {tx(
                  "Inputs, outputs, points de contrôle qualité, preuves générées et SLA spécifique. Durées indicatives pour un parc de 500 assets.",
                  "Inputs, outputs, quality checkpoints, generated evidence and specific SLA. Indicative times for a 500-asset fleet."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-6xl mx-auto space-y-6">
            {modules.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeIn key={m.num} delay={i * 0.04}>
                  <article className={`group relative rounded-3xl border ${m.border} bg-white overflow-hidden hover:shadow-xl transition-all`}>
                    <div className={`absolute top-0 left-0 h-full w-1.5 bg-gradient-to-b ${m.color}`} />
                    <div className="p-6 md:p-8 pl-8 md:pl-12">
                      {/* Header */}
                      <div className="flex items-start gap-4 md:gap-6 mb-6">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`text-4xl font-black ${m.accent} leading-none`}>{m.num}</span>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">{m.title}</h3>
                          </div>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${m.bg} ${m.accent} text-xs font-semibold`}>
                              <Clock className="w-3 h-3" /> {m.duration}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold`}>
                              <Target className="w-3 h-3" /> {m.sla}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-700 leading-relaxed mb-6">{m.description}</p>

                      {/* I/O + Checkpoints + Proofs grid */}
                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div className={`rounded-xl ${m.bg} border ${m.border} p-4`}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                            <ArrowDownUp className="w-3 h-3" /> Inputs
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">{m.inputs}</p>
                        </div>
                        <div className={`rounded-xl ${m.bg} border ${m.border} p-4`}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                            <Box className="w-3 h-3" /> Outputs
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">{m.outputs}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> {tx("Points de contrôle", "Checkpoints")}
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">{m.checkpoints}</p>
                        </div>
                        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {tx("Preuves générées", "Generated evidence")}
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">{m.proofs}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {m.details.map((d, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle2 className={`w-4 h-4 ${m.accent} flex-shrink-0 mt-0.5`} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ ROADMAP 2026/2027 ═══════════════ */}
      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-widest mb-4">
                <Brain className="w-3.5 h-3.5" />
                {tx("Feuille de route technologique", "Technology roadmap")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {tx("Feuille de route technologique 2026 / 2027", "Technology roadmap 2026 / 2027")}
              </h2>
              <p className="text-lg text-slate-600">
                {tx(
                  "IA prédictive, quantum-ready, computer vision, digital product passport, les prochaines évolutions de la plateforme GTC.",
                  "Predictive AI, quantum-ready, computer vision, digital product passport, the next evolutions of the GTC platform."
                )}
              </p>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            {/* Vertical timeline */}
            <div className="relative border-l-2 border-purple-200 ml-4 md:ml-8">
              {roadmap.map((period, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="mb-10 last:mb-0 pl-8 md:pl-12 relative">
                    {/* Dot */}
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-100" />
                    {/* Period */}
                    <p className="text-sm font-bold uppercase tracking-widest text-purple-700 mb-4">{period.period}</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {period.items.map((item, j) => (
                        <div key={j} className="bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-lg hover:border-purple-200 transition">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                            <RoadmapBadge status={item.status} tx={tx} />
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SLA & GARANTIES ═══════════════ */}
      <section className="py-20 lg:py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                {tx("Garanties & SLA contractuels", "Guarantees & contractual SLAs")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {tx("Des engagements chiffrés et contractualisés", "Quantified and contractualized commitments")}
              </h2>
              <p className="text-lg text-slate-300">
                {tx(
                  "Chaque SLA est mesuré en continu sur le tableau de bord client et garanti contractuellement.",
                  "Every SLA is continuously measured on the client dashboard and contractually guaranteed."
                )}
              </p>
            </div>
          </FadeIn>

          {/* SLA table */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_auto] divide-y divide-white/10">
                {slas.map((sla, i) => {
                  const Icon = sla.icon;
                  return (
                    <div key={i} className="contents">
                      <div className="flex items-center gap-4 px-6 py-5">
                        <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${sla.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-white font-semibold">{sla.metric}</p>
                      </div>
                      <div className="flex items-center px-6 py-5">
                        <p className={`text-xl md:text-2xl font-black ${sla.color}`}>{sla.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-primary via-primary-700 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <Activity className="w-10 h-10 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {tx("Mettez notre ingénierie de processus à l'épreuve", "Put our process engineering to the test")}
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                {tx(
                  "Planifiez une évaluation avec un expert senior : nous déroulons notre processus sur un échantillon de votre parc et vous remettons une projection chiffrée.",
                  "Schedule an assessment with a senior expert: we run our process on a sample of your fleet and deliver a quantified projection."
                )}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg shadow-accent/25 transition"
                >
                  {tx("Demander une évaluation", "Request an assessment")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/reglementation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 backdrop-blur transition"
                >
                  <BookOpen className="w-5 h-5" />
                  {tx("Cadre réglementaire", "Regulatory framework")}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedArticles
        title="Approfondir notre méthodologie"
        subtitle="Notre méthodologie s'appuie sur les meilleures pratiques du secteur. Découvrez les analyses qui les sous-tendent."
        limit={3}
        tone="light"
      />
    </main>
  );
}
