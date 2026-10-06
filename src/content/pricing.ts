/**
 * Liste de prix publique GreenTechCycle — source unique du site (publiée le 2026-10-06).
 *
 * Source de vérité : reports/price-book-gtc.xlsx, feuilles `Liste_publique`, `Tarif_par_tranche`
 * et `Collecte_valeur` (+ reports/price-book-gtc.md §1, §1 bis, §4–§10). Seuls les prix de la liste
 * PUBLIQUE figurent ici : aucun coût, plancher, marge ni condition de deal desk interne.
 *
 * Lecteurs : /tarifs (page, JSON-LD schema.org), configurateur ITAD (accueil + /tarifs), ancres de
 * prix des pages Accueil, Plateforme, Services, Secteurs, Waki Box et Réserver.
 * Tous les prix sont hors taxes (HT), en euros, engagement annuel sauf mention.
 */

export type L = { fr: string; en: string };
export type Lang = "fr" | "en";

/* ── Formatage ───────────────────────────────────────────────────────────── */

/** Montant en euros : « 8,50 € » / « €8.50 » (décimales seulement si nécessaires). */
export function eur(n: number, lang: Lang, opts: { decimals?: boolean } = {}): string {
  const frac = opts.decimals ?? !Number.isInteger(n);
  const s = new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR", {
    minimumFractionDigits: frac ? 2 : 0,
    maximumFractionDigits: frac ? 2 : 0,
  })
    .format(n)
    .replace(/ /g, " ");
  return lang === "en" ? `€${s}` : `${s} €`;
}

export function num(n: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "fr-FR").format(n).replace(/ /g, " ");
}

/* ── Tranches communes (9) et tarification progressive ───────────────────── */

export interface Band {
  min: number;
  /** null = sans borne haute */
  max: number | null;
}

export const BANDS: Band[] = [
  { min: 1, max: 50 },
  { min: 51, max: 150 },
  { min: 151, max: 250 },
  { min: 251, max: 500 },
  { min: 501, max: 1000 },
  { min: 1001, max: 2000 },
  { min: 2001, max: 5000 },
  { min: 5001, max: 10000 },
  { min: 10001, max: null },
];

export function bandLabel(b: Band, lang: Lang): string {
  return b.max == null ? `${num(b.min - 1, lang)}+` : `${num(b.min, lang)}–${num(b.max, lang)}`;
}

/** Prix par tranche (9 valeurs, null = tranche non disponible pour l'offre). */
export type BandPrices = (number | null)[];

/**
 * Total progressif (comme un barème d'impôt) : les 50 premières unités au prix de la tranche 1,
 * les 100 suivantes au prix de la tranche 2, etc. Le total ne baisse jamais quand la quantité monte.
 * Retourne null si la quantité atteint une tranche indisponible.
 */
export function graduatedTotal(qty: number, prices: BandPrices): number | null {
  let rest = Math.max(0, Math.floor(qty));
  let total = 0;
  for (let i = 0; i < BANDS.length && rest > 0; i++) {
    const b = BANDS[i];
    const size = b.max == null ? rest : b.max - b.min + 1;
    const n = Math.min(rest, size);
    const p = prices[i];
    if (p == null) return null;
    total += n * p;
    rest -= n;
  }
  return Math.round(total * 100) / 100;
}

/** Prix unitaire de la tranche contenant la quantité (pour l'affichage « tranche atteinte »). */
export function bandIndex(qty: number): number {
  const i = BANDS.findIndex((b) => qty >= b.min && (b.max == null || qty <= b.max));
  return i < 0 ? 0 : i;
}

/* ── Plateforme : essai, palier gratuit, éditions ────────────────────────── */

/** Facturation mensuelle sans engagement : +20 % sur le prix annuel. */
export const MONTHLY_BILLING_UPLIFT = 0.2;
/** Engagement pluriannuel sur les abonnements. */
export const MULTI_YEAR_DISCOUNT = { twoYears: 0.05, threeYears: 0.08 };
export const INDEXATION_CAP = 0.03;

export const TRIAL = {
  days: 90,
  extensionDays: 30,
  maxAssets: 300,
  users: 3,
  dataRetentionDays: 30,
};
export const FREE_TIER = { assets: 50, users: 1 };

export type EditionId = "essentials" | "professional" | "enterprise";

export interface Edition {
  id: EditionId;
  name: string;
  /** € HT par actif IT et par mois, engagement annuel, 9 tranches */
  bands: BandPrices;
  /** Actifs facturés au minimum */
  minAssets?: number;
  /** Minimum mensuel en € HT */
  minMonthly?: number;
  /** Plafond d'actifs de l'édition (null = sans plafond) */
  maxAssets: number | null;
  /** Au-delà : nous contacter */
  contactAbove?: number;
  recommended?: boolean;
}

export const EDITIONS: Edition[] = [
  { id: "essentials", name: "Essentials", bands: [8.5, 7, 5.5, 3.3, 3, 2.8, null, null, null], minAssets: 100, maxAssets: 2000 },
  { id: "professional", name: "Professional", bands: [10.65, 8.75, 6.9, 4.15, 3.75, 3.5, 3.15, 2.75, 2.25], minMonthly: 2500, maxAssets: 50000, recommended: true },
  { id: "enterprise", name: "Enterprise", bands: [11.9, 9.8, 7.7, 4.6, 4.2, 3.9, 3.5, 3.1, 2.5], minAssets: 2000, maxAssets: null, contactAbove: 50000 },
];

export function edition(id: EditionId): Edition {
  return EDITIONS.find((e) => e.id === id)!;
}

/**
 * Prix mensuel liste (engagement annuel) d'une édition pour un nombre d'actifs, minimums appliqués.
 * null si l'édition ne couvre pas ce volume (Essentials au-delà de 2 000 actifs).
 */
export function editionMonthly(id: EditionId, assets: number): number | null {
  const e = edition(id);
  if (e.maxAssets != null && assets > e.maxAssets) return null;
  const billed = Math.max(assets, e.minAssets ?? 0);
  const t = graduatedTotal(billed, e.bands);
  if (t == null) return null;
  return Math.max(t, e.minMonthly ?? 0);
}

/** Module OT/IoT Visibility : € HT par actif OT et par mois, minimum 500 actifs OT facturés. */
export const OT_BANDS: BandPrices = [3.4, 3.2, 3, 2.8, 2.5, 2.2, 1.9, 1.6, 1.25];
export const OT_MIN_ASSETS = 500;
export function otMonthly(assets: number): number {
  return graduatedTotal(Math.max(assets, OT_MIN_ASSETS), OT_BANDS) ?? 0;
}

/** Quantités des exemples publiés (feuille Tarif_par_tranche, bloc C). */
export const EXAMPLE_QUANTITIES = [50, 150, 250, 500, 1000, 2000, 5000, 10000, 20000];

/** Matrice fonctionnelle Bon / Mieux / Meilleur (✓ / — / texte). */
export interface FeatureRow {
  label: L;
  values: [L, L, L];
}
const Y: L = { fr: "✓", en: "✓" };
const N: L = { fr: "—", en: "—" };
const same = (fr: string, en: string): L => ({ fr, en });

export const EDITION_FEATURES: { title: L; rows: FeatureRow[] }[] = [
  {
    title: same("Inventaire et cycle de vie", "Inventory and lifecycle"),
    rows: [
      { label: same("Inventaire IT (postes, serveurs, réseau, mobiles)", "IT inventory (endpoints, servers, network, mobile)"), values: [Y, Y, Y] },
      { label: same("Import CSV / API générique", "CSV import / generic API"), values: [Y, Y, Y] },
      { label: same("Indicateurs âge et fin de support (EoL / EoS)", "Age and end-of-life / end-of-support indicators"), values: [Y, Y, Y] },
      { label: same("Planification des renouvellements", "Renewal planning"), values: [N, Y, Y] },
      { label: same("Risque de panne et prévision budgétaire", "Failure risk and budget forecasting"), values: [N, N, Y] },
    ],
  },
  {
    title: same("Intégrations et accès", "Integrations and access"),
    rows: [
      { label: same("Connecteurs natifs SAP / Oracle / ServiceNow", "Native SAP / Oracle / ServiceNow connectors"), values: [N, same("1 inclus", "1 included"), same("Jusqu'à 5 inclus", "Up to 5 included")] },
      { label: same("Utilisateurs nommés", "Named users"), values: [same("5", "5"), same("25", "25"), same("Illimité", "Unlimited")] },
      { label: same("SSO SAML / SCIM", "SAML SSO / SCIM"), values: [N, same("SSO", "SSO"), same("SSO + SCIM", "SSO + SCIM")] },
      { label: same("Environnement sandbox", "Sandbox environment"), values: [N, N, Y] },
    ],
  },
  {
    title: same("Sécurité et données", "Security and data"),
    rows: [
      { label: same("Résidence des données dans l'UE", "EU data residency"), values: [Y, Y, same("✓ + localisation contractuelle", "✓ + contractual location")] },
      { label: same("Export du journal d'audit (SIEM)", "Audit log export (SIEM)"), values: [N, Y, Y] },
    ],
  },
  {
    title: same("Accompagnement", "Support and success"),
    rows: [
      { label: same("Support inclus", "Included support"), values: [same("Standard", "Standard"), same("Standard", "Standard"), same("Standard", "Standard")] },
      { label: same("Customer Success inclus", "Included Customer Success"), values: [same("Mutualisé", "Pooled"), same("Mutualisé", "Pooled"), same("Mutualisé ; dédié si ARR ≥ 60 000 €", "Pooled; dedicated if ARR ≥ €60,000")] },
      { label: same("Onboarding guidé (garde-fous ci-dessous)", "Guided onboarding (guardrails below)"), values: [Y, Y, Y] },
      { label: same("Modules (OT/IoT, Conformité, CSRD, orchestration ITAD)", "Modules (OT/IoT, Compliance, CSRD, ITAD orchestration)"), values: [same("Option", "Add-on"), same("Option", "Add-on"), same("Option", "Add-on")] },
    ],
  },
];

/* ── Modules à la carte ──────────────────────────────────────────────────── */

export interface PriceLine {
  id: string;
  name: L;
  /** Montant € HT (null = nous contacter / inclus) */
  amount: number | null;
  /** Prix affiché quand amount est null (« Inclus », « Nous contacter »…) */
  priceText?: L;
  /** Métrique / unité */
  unit: L;
  note?: L;
}

export const MODULES: PriceLine[] = [
  { id: "ot", name: same("OT/IoT Visibility", "OT/IoT Visibility"), amount: 3.4, unit: same("par actif OT et par mois, 1–50", "per OT asset per month, 1–50"), note: same("Dégressif sur 9 tranches jusqu'à 1,25 € au-delà de 10 000 ; minimum 500 actifs OT", "Graduated over 9 bands down to €1.25 above 10,000; minimum 500 OT assets") },
  { id: "ot-collector", name: same("Collecteur OT", "OT collector"), amount: 110, unit: same("par site et par mois", "per site per month"), note: same("Boîtier de collecte sur site", "On-site collection appliance") },
  { id: "connector", name: same("Connecteur natif SAP / Oracle / ServiceNow", "Native SAP / Oracle / ServiceNow connector"), amount: 650, unit: same("par connecteur et par mois", "per connector per month"), note: same("1 inclus en Professional, 5 en Enterprise", "1 included in Professional, 5 in Enterprise") },
  { id: "orchestration", name: same("Orchestration ITAD et chaîne de preuve", "ITAD orchestration and chain of proof"), amount: 250, unit: same("par site et par mois", "per site per month") },
  { id: "csrd-ess", name: same("Carbone et CSRD — Essentials", "Carbon & CSRD — Essentials"), amount: 990, unit: same("par entité et par an", "per entity per year") },
  { id: "csrd-pro", name: same("Carbone et CSRD — Professional", "Carbon & CSRD — Professional"), amount: 2900, unit: same("par an, jusqu'à 5 entités", "per year, up to 5 entities") },
];

/** Pack Conformité : éditions (Enterprise sur contact). */
export const COMPLIANCE_PACKS = [
  {
    id: "essentials",
    name: "Essentials",
    amount: 6900 as number | null,
    aiCredits: 300 as number | null,
    entities: same("1 entité", "1 entity"),
    frameworks: same("NIS2 + RGPD (preuves de fin de vie IT)", "NIS2 + GDPR (IT end-of-life evidence)"),
    auditorSeats: same("2", "2"),
    templates: same("10", "10"),
    exports: same("Mensuels", "Monthly"),
    review: N,
  },
  {
    id: "professional",
    name: "Professional",
    amount: 19800 as number | null,
    aiCredits: 2000 as number | null,
    entities: same("3 entités", "3 entities"),
    frameworks: same("NIS2, DORA, RGPD, CSRD / ESRS E5", "NIS2, DORA, GDPR, CSRD / ESRS E5"),
    auditorSeats: same("10", "10"),
    templates: same("30", "30"),
    exports: same("Continus", "Continuous"),
    review: same("1 jour de consultant / an", "1 consultant day / year"),
  },
  {
    id: "enterprise",
    name: "Enterprise",
    amount: null as number | null,
    aiCredits: null as number | null,
    entities: same("À partir de 10 entités", "From 10 entities"),
    frameworks: same("Tous + contrôles personnalisés", "All + custom controls"),
    auditorSeats: same("Illimité", "Unlimited"),
    templates: same("30 + personnalisés", "30 + custom"),
    exports: same("Continus + API GRC", "Continuous + GRC API"),
    review: same("Revue trimestrielle + accompagnement le jour de l'audit", "Quarterly review + audit-day support"),
  },
];

export const COMPLIANCE_CONTENTS: L[] = [
  same("Bibliothèque de preuves par actif (effacement, chaîne de garde, certificats) rattachée aux exigences", "Per-asset evidence library (erasure, chain of custody, certificates) mapped to requirements"),
  same("Exports automatisés de preuves vers le dossier d'audit", "Automated evidence exports to the audit file"),
  same("Portail auditeur en lecture, avec journal des consultations", "Read-only auditor portal with access log"),
  same("Assistant IA d'audit : brouillons de réponses citant les preuves, à valider par vous", "AI audit assistant: draft answers citing the evidence, for you to approve"),
  same("Modèles de politiques et procédures, cartographie exigence → contrôle → preuve", "Policy and procedure templates, requirement → control → evidence mapping"),
];

/** Crédits IA : 1 crédit = 1 question d'audit traitée avec citations. */
export const AI_CREDITS = {
  overagePer1000: 1100,
  prepaidDiscounts: [0.1, 0.2],
};

/* ── Services ITAD : prix par catégorie et par tranche (€ HT par appareil) ─ */

export type ItadLineId =
  | "ws-e1"
  | "ws-e2"
  | "srv-e1"
  | "srv-e2"
  | "drive"
  | "storage"
  | "net-small"
  | "net-core"
  | "mobile"
  | "ot"
  | "screen"
  | "e3-atelier"
  | "e3-site";

export interface ItadLine {
  id: ItadLineId;
  name: L;
  unit: L;
  level?: "E1" | "E2" | "E3";
  bands: BandPrices;
}

export const ITAD_GROUPS: { title: L; lines: ItadLine[] }[] = [
  {
    title: same("Postes de travail (portables et fixes)", "Workstations (laptops and desktops)"),
    lines: [
      { id: "ws-e1", name: same("Poste — E1 NIST Clear", "Workstation — E1 NIST Clear"), unit: same("poste", "device"), level: "E1", bands: [24.5, 22, 21, 20.5, 19.5, 19.5, 19, 18.5, 18] },
      { id: "ws-e2", name: same("Poste — E2 NIST Purge vérifiée", "Workstation — E2 verified NIST Purge"), unit: same("poste", "device"), level: "E2", bands: [30.5, 28, 27, 26, 25, 24, 23.5, 23, 22] },
    ],
  },
  {
    title: same("Serveurs et stockage", "Servers and storage"),
    lines: [
      { id: "srv-e1", name: same("Serveur ≤ 4 disques — E1 Clear", "Server ≤ 4 drives — E1 Clear"), unit: same("serveur", "server"), level: "E1", bands: [80, 75, 75, 70, 70, 70, 70, 65, 65] },
      { id: "srv-e2", name: same("Serveur ≤ 4 disques — E2 Purge vérifiée", "Server ≤ 4 drives — E2 verified Purge"), unit: same("serveur", "server"), level: "E2", bands: [95, 90, 90, 85, 85, 85, 80, 80, 75] },
      { id: "drive", name: same("Disque supplémentaire (serveur, baie)", "Additional drive (server, array)"), unit: same("disque", "drive"), bands: [17, 15, 14, 14, 13.5, 13, 13, 13, 12.5] },
      { id: "storage", name: same("Baie de stockage / NAS (hors disques)", "Storage array / NAS (drives excluded)"), unit: same("baie", "array"), bands: [55, 50, 45, 45, 40, 40, 35, 35, 35] },
    ],
  },
  {
    title: same("Réseau, mobiles, OT et écrans", "Network, mobile, OT and screens"),
    lines: [
      { id: "net-small", name: same("Petit équipement réseau (switch, borne Wi-Fi, pare-feu)", "Small network device (switch, Wi-Fi AP, firewall)"), unit: same("unité", "unit"), bands: [20, 17, 16, 15, 14, 13.5, 12.5, 12, 11] },
      { id: "net-core", name: same("Cœur de réseau (châssis, routeur cœur)", "Core network (chassis, core router)"), unit: same("unité", "unit"), bands: [50, 45, 45, 40, 40, 40, 35, 35, 30] },
      { id: "mobile", name: same("Smartphone / tablette (E2)", "Smartphone / tablet (E2)"), unit: same("appareil", "device"), level: "E2", bands: [15.5, 13, 12, 11.5, 11, 10.5, 10.5, 10, 10] },
      { id: "ot", name: same("Équipement OT / IoT", "OT / IoT device"), unit: same("appareil", "device"), bands: [15.5, 12.5, 12, 11, 10.5, 10, 9.5, 9, 8.5] },
      { id: "screen", name: same("Écran (sans donnée)", "Screen (no data)"), unit: same("écran", "screen"), bands: [8.5, 6, 5.5, 5, 4.5, 4.5, 4.5, 4, 4] },
    ],
  },
  {
    title: same("Destruction physique (E3)", "Physical destruction (E3)"),
    lines: [
      { id: "e3-atelier", name: same("E3 destruction — en atelier", "E3 destruction — at our workshop"), unit: same("support", "media"), level: "E3", bands: [10.5, 8, 7.5, 7, 7, 7, 6.5, 6.5, 6.5] },
      { id: "e3-site", name: same("E3 destruction — sur site (+ mobilisation)", "E3 destruction — on site (+ mobilisation)"), unit: same("support", "media"), level: "E3", bands: [11.5, 9, 8.5, 8, 7.5, 7.5, 7.5, 7, 7] },
    ],
  },
];

export const ITAD_LINES: ItadLine[] = ITAD_GROUPS.flatMap((g) => g.lines);
export function itadLine(id: ItadLineId): ItadLine {
  return ITAD_LINES.find((l) => l.id === id)!;
}

export const ITAD_FEES = {
  /** Frais d'ouverture de lot, lot de moins de 50 appareils ; offert au-delà */
  smallLot: 170,
  smallLotThreshold: 50,
  /** Journée d'effacement sur site (2 techniciens), en plus du prix par appareil */
  onsiteDay: 1140,
  /** Mobilisation par intervention de destruction E3 sur site */
  e3Mobilisation: 680,
};

export const ERASURE_LEVELS: { id: "E1" | "E2" | "E3"; name: L; desc: L; when: L }[] = [
  {
    id: "E1",
    name: same("E1 — Clear", "E1 — Clear"),
    desc: same("Écrasement logique de toutes les zones adressables, test, certificat par numéro de série (NIST SP 800-88 Clear).", "Logical overwrite of all addressable areas, test, certificate per serial number (NIST SP 800-88 Clear)."),
    when: same("Postes standard, réemploi visé", "Standard devices, reuse intended"),
  },
  {
    id: "E2",
    name: same("E2 — Purge vérifiée", "E2 — Verified Purge"),
    desc: same("Effacement cryptographique ou block erase, puis vérification : récupération infaisable même en laboratoire, réemploi possible (NIST Purge).", "Cryptographic or block erase, then verification: recovery infeasible even in a lab, reuse still possible (NIST Purge)."),
    when: same("SSD, données sensibles, secteurs régulés", "SSDs, sensitive data, regulated sectors"),
  },
  {
    id: "E3",
    name: same("E3 — Destruction", "E3 — Destroy"),
    desc: same("Broyage du support, rendu inutilisable (NIST Destroy), certificat par numéro de série.", "Media shredded and rendered unusable (NIST Destroy), certificate per serial number."),
    when: same("Supports défectueux, exigence de destruction", "Faulty media, destruction requirement"),
  },
];

/* ── Niveaux de preuve P1–P4 ─────────────────────────────────────────────── */

export const PROOF_LEVELS: (PriceLine & { includes: L; when: L })[] = [
  {
    id: "P1",
    name: same("P1 — Preuve numérique", "P1 — Digital proof"),
    amount: null,
    priceText: same("Inclus", "Included"),
    unit: same("dans chaque prix ITAD", "in every ITAD price"),
    includes: same("Horodatage, empreinte SHA-256, certificat par actif vérifiable par QR, journal d'audit chaîné.", "Timestamp, SHA-256 fingerprint, per-asset certificate verifiable by QR, chained audit log."),
    when: same("Tous les clients", "Every client"),
  },
  {
    id: "P2",
    name: same("P2 — Témoin GTC", "P2 — GTC witness"),
    amount: 255,
    unit: same("par lot de 200 actifs", "per lot of 200 assets"),
    note: same("+ 0,50 € par actif au-delà", "+ €0.50 per asset beyond"),
    includes: same("Collaborateur GTC témoin, vidéo horodatée, scellés numérotés pendant le transport, procès-verbal GTC signé.", "GTC staff witness, timestamped video, numbered seals in transit, signed GTC report."),
    when: same("Données sensibles, audit interne", "Sensitive data, internal audit"),
  },
  {
    id: "P3",
    name: same("P3 — Constat par commissaire de justice", "P3 — Statement by a commissaire de justice (court officer)"),
    amount: 1765,
    unit: same("par intervention (≤ 3 h)", "per intervention (≤ 3 h)"),
    note: same("Heure supplémentaire 550 € ; déplacement hors zone au réel + 10 %", "Extra hour €550; travel outside the zone at cost + 10%"),
    includes: same("Officier public présent sur site ; procès-verbal de constat à forte valeur probante (inventaire, méthode, numéros de série, photos). Honoraires refacturés sur devis préalable du commissaire.", "Public officer on site; high-evidence official statement (inventory, method, serial numbers, photos). Fees passed through on the officer's prior quote."),
    when: same("Banque, assurance, santé, litiges potentiels, DORA", "Banking, insurance, healthcare, potential disputes, DORA"),
  },
  {
    id: "P4",
    name: same("P4 — Défense / classifié", "P4 — Defence / classified"),
    amount: null,
    priceText: same("Nous contacter", "Contact us"),
    unit: same("via partenaire habilité", "via a cleared partner"),
    includes: same("Uniquement via un partenaire habilité : GreenTechCycle ne détient pas d'habilitation.", "Only through a cleared partner: GreenTechCycle holds no security clearance."),
    when: same("Défense, OIV", "Defence, operators of vital importance"),
  },
];

export const REPORTING: PriceLine[] = [
  { id: "R1", name: same("R1 — Rapport ITAD standard", "R1 — Standard ITAD report"), amount: null, priceText: same("Inclus", "Included"), unit: same("PDF + CSV + certificats par actif", "PDF + CSV + per-asset certificates") },
  { id: "R3", name: same("R3 — Rapport attesté", "R3 — Attested report"), amount: 1050, unit: same("par rapport", "per report"), note: same("Revue par un consultant conformité, note méthodologique, prêt pour l'auditeur", "Reviewed by a compliance consultant, methodology note, auditor-ready") },
];

/* ── Collecte ────────────────────────────────────────────────────────────── */

/** Règle de la collecte valorisée (rachat net de frais). */
export const COLLECTION_VALUE_RULE = {
  /** Collecte offerte quand la valeur de rachat estimée ≥ ratio × frais */
  ratio: 1.5,
  /** Règle simplifiée : N1 en Île-de-France offerte dès N appareils grade A/B par enlèvement */
  simpleRuleDevices: 20,
  /** Pas de crédit sous cette valeur unitaire */
  minDeviceValue: 10,
};

export interface CollectionClass {
  id: "C1" | "C2" | "C3" | "C4";
  name: L;
  pallets: number;
  crew: L;
  /** Île-de-France (≤ 200 km) : planifiée J+10, prioritaire J+3, urgente J+1 ; puis planifiée 200–500 km et 500–1 000 km */
  z1Planned: number;
  z1Priority: number;
  z1Urgent: number;
  z2a: number;
  z2b: number;
}

export const COLLECTION_CLASSES: CollectionClass[] = [
  { id: "C1", name: same("Très petit lot", "Very small lot"), pallets: 2, crew: same("Camionnette, 2 personnes, ½ journée", "Van, 2 people, half day"), z1Planned: 800, z1Priority: 880, z1Urgent: 1000, z2a: 2260, z2b: 3795 },
  { id: "C2", name: same("Petit lot", "Small lot"), pallets: 6, crew: same("Camion 20 m³, 3 personnes, ½ journée", "20 m³ truck, 3 people, half day"), z1Planned: 1275, z1Priority: 1400, z1Urgent: 1590, z2a: 3410, z2b: 5620 },
  { id: "C3", name: same("Lot moyen", "Medium lot"), pallets: 18, crew: same("1 poids lourd, 4 personnes, 1 journée", "1 HGV, 4 people, 1 day"), z1Planned: 2790, z1Priority: 3070, z1Urgent: 3490, z2a: 5600, z2b: 8485 },
  { id: "C4", name: same("Grand lot", "Large lot"), pallets: 36, crew: same("2 poids lourds, 8 personnes, 08 h–19 h", "2 HGVs, 8 people, 8 am–7 pm"), z1Planned: 5545, z1Priority: 6100, z1Urgent: 6930, z2a: 11165, z2b: 16935 },
];

export const COLLECTION_EXTRAS: PriceLine[] = [
  { id: "N2", name: same("N2 — Sécurisée scellée", "N2 — Sealed & secured"), amount: 100, unit: same("par véhicule", "per vehicle"), note: same("Scellés numérotés, GPS, procès-verbal de prise en charge", "Numbered seals, GPS, handover report") },
  { id: "N3", name: same("N3 — Escorte", "N3 — Escort"), amount: 1110, unit: same("par convoi (≤ 2 véhicules) et par jour", "per convoy (≤ 2 vehicles) per day"), note: same("En plus du N2 : agent de sécurité en véhicule suiveur", "On top of N2: security officer in a follow vehicle") },
  { id: "conso", name: same("Consommables", "Consumables"), amount: 29, unit: same("par palette", "per pallet"), note: same("Palette, film, scotch, étiquettes", "Pallet, film, tape, labels") },
  { id: "dech", name: same("Mise en déchetterie", "Waste disposal"), amount: 58, unit: same("par palette de grade D", "per grade-D pallet"), note: same("Déchets sans valeur, filière DEEE", "Valueless waste, WEEE channel") },
];

/** Option messagerie (palettes préparées par le client) : forfait par envoi + prix par palette. */
export const PARCEL_OPTION = {
  shipmentFee: 35,
  zones: [
    { id: "z1", name: same("≤ 200 km", "≤ 200 km"), first: 130, floor: 60, priority: 190, urgent: 320, steps: same("2e : 95 € · 3e–5e : 85 € · 6e–10e : 70 € · 11e+ : 60 €", "2nd: €95 · 3rd–5th: €85 · 6th–10th: €70 · 11th+: €60") },
    { id: "z2a", name: same("200–500 km", "200–500 km"), first: 200, floor: 95, priority: 300, urgent: 500 },
    { id: "z2b", name: same("500–1 000 km", "500–1,000 km"), first: 335, floor: 160, priority: 500, urgent: 840 },
    { id: "z3", name: same("Europe (UE, Royaume-Uni, Suisse)", "Europe (EU, UK, Switzerland)"), first: 355, floor: 170, priority: 535, urgent: 895 },
  ] as { id: string; name: L; first: number; floor: number; priority: number; urgent: number; steps?: L }[],
};

/* ── Waki Box ────────────────────────────────────────────────────────────── */

export const WAKI_PLANS = [
  { id: "essentiel", name: "Essentiel", kiosks: 1, monthly: 40, setup: 225 as number | null, commitmentMonths: 12 },
  { id: "confort", name: "Confort", kiosks: 2, monthly: 76, setup: 305 as number | null, commitmentMonths: 12 },
  { id: "premium", name: "Premium", kiosks: 4, monthly: 147, setup: null as number | null, commitmentMonths: 24 },
] as const;
export type WakiPlanId = (typeof WAKI_PLANS)[number]["id"];

export const WAKI_EXTRA_KIOSK = { monthly: 36, setup: 105 };
/** Mise en service par borne (Premium, bornes additionnelles) selon le nombre de bornes posées en une intervention */
export const WAKI_SETUP_BANDS = [
  { min: 1, max: 4, price: 105 },
  { min: 5, max: 10, price: 95 },
  { min: 11, max: 25, price: 90 },
  { min: 26, max: null as number | null, price: 85 },
];

export const WAKI_ADDONS: PriceLine[] = [
  { id: "formation", name: same("Formation collaborateurs (2 h)", "Employee training (2 h)"), amount: 590, unit: same("par session", "per session") },
  { id: "animation-rse", name: same("Animation RSE", "CSR event facilitation"), amount: 970, unit: same("par jour", "per day") },
  { id: "kit", name: same("Kit signalétique", "Signage kit"), amount: 200, unit: same("par kit", "per kit") },
  { id: "audit", name: same("Audit terrain ITAD / DEEE", "ITAD / WEEE field audit"), amount: 1600, unit: same("par jour, rapport inclus", "per day, report included") },
  { id: "csrd", name: same("Carbone et CSRD — Essentials (ESRS E5)", "Carbon & CSRD — Essentials (ESRS E5)"), amount: 990, unit: same("par entité et par an", "per entity per year") },
];

export const WAKI_BUNDLES = [
  { id: "rse", name: same("Bundle Waki Box RSE", "Waki Box CSR bundle"), amount: 720, contents: same("Formation collaborateurs (2 h) + kit signalétique", "Employee training (2 h) + signage kit"), components: 590 + 200 },
  { id: "deee", name: same("Bundle Waki Box Conformité DEEE", "Waki Box WEEE compliance bundle"), amount: 2710, contents: same("Audit terrain + Carbone et CSRD Essentials + formation + kit", "Field audit + Carbon & CSRD Essentials + training + kit"), components: 1600 + 990 + 590 + 200 },
];

/* ── Support, Customer Success, services professionnels ──────────────────── */

export const SUPPORT_TIERS = [
  {
    id: "standard",
    name: "Standard",
    price: same("Inclus", "Included"),
    channels: same("E-mail, portail", "Email, portal"),
    hours: same("9 h–18 h, lundi–vendredi", "9 am–6 pm, Monday–Friday"),
    availability: same("99,5 % (objectif, sans crédit)", "99.5% (target, no credit)"),
    contact: N,
    review: N,
  },
  {
    id: "premium",
    name: "Premium",
    price: same("15 % de l'abonnement annuel (min. 3 000 €)", "15% of annual subscription (min. €3,000)"),
    channels: same("+ téléphone, WhatsApp Business", "+ phone, WhatsApp Business"),
    hours: same("8 h–20 h, lundi–samedi ; S1 en 24/7", "8 am–8 pm, Monday–Saturday; S1 24/7"),
    availability: same("99,9 % garantie + crédits", "99.9% guaranteed + credits"),
    contact: same("Responsable support nommé", "Named support lead"),
    review: same("Semestrielle", "Semi-annual"),
  },
  {
    id: "enterprise",
    name: "Enterprise / Mission-critical",
    price: same("25 % de l'abonnement annuel (min. 18 000 €)", "25% of annual subscription (min. €18,000)"),
    channels: same("+ astreinte, canal Teams / Slack partagé", "+ on-call line, shared Teams / Slack channel"),
    hours: same("24/7/365 pour S1 et S2", "24/7/365 for S1 and S2"),
    availability: same("99,95 % garantie + crédits", "99.95% guaranteed + credits"),
    contact: same("Technical Account Manager nommé", "Named Technical Account Manager"),
    review: same("Trimestrielle", "Quarterly"),
  },
];

/** Matrice de sévérité : première réponse · contournement / résolution */
export const SEVERITY_MATRIX: { id: string; label: L; values: [L, L, L] }[] = [
  { id: "S1", label: same("S1 — Bloquant (indisponibilité, perte de preuve)", "S1 — Critical (outage, loss of proof)"), values: [same("4 h ouvrées · 2 j ouvrés", "4 business h · 2 business days"), same("1 h (24/7) · 8 h", "1 h (24/7) · 8 h"), same("30 min (24/7) · 4 h · résolution 24 h", "30 min (24/7) · 4 h · resolution 24 h")] },
  { id: "S2", label: same("S2 — Dégradation majeure, sans contournement", "S2 — Major degradation, no workaround"), values: [same("8 h ouvrées · 5 j ouvrés", "8 business h · 5 business days"), same("4 h · 2 j ouvrés", "4 h · 2 business days"), same("1 h (24/7) · 1 jour", "1 h (24/7) · 1 day")] },
  { id: "S3", label: same("S3 — Impact modéré, avec contournement", "S3 — Moderate impact, workaround exists"), values: [same("2 j ouvrés · 15 j ouvrés", "2 business days · 15 business days"), same("1 j ouvré · 10 j ouvrés", "1 business day · 10 business days"), same("4 h · 5 j ouvrés", "4 h · 5 business days")] },
  { id: "S4", label: same("S4 — Question, évolution", "S4 — Question, feature request"), values: [same("5 j ouvrés · prochaine version", "5 business days · next release"), same("2 j ouvrés · prochaine version", "2 business days · next release"), same("1 j ouvré · comité roadmap", "1 business day · roadmap committee")] },
];

export const SERVICE_CREDITS: { label: L; values: [L, L] }[] = [
  { label: same("< 99,95 % et ≥ 99,9 %", "< 99.95% and ≥ 99.9%"), values: [N, same("5 %", "5%")] },
  { label: same("< 99,9 % et ≥ 99 %", "< 99.9% and ≥ 99%"), values: [same("10 %", "10%"), same("10 %", "10%")] },
  { label: same("< 99 % et ≥ 95 %", "< 99% and ≥ 95%"), values: [same("25 %", "25%"), same("25 %", "25%")] },
  { label: same("< 95 %", "< 95%"), values: [same("50 %", "50%"), same("50 %", "50%")] },
];

export const CSM_TIERS = [
  {
    id: "essential",
    name: same("Essential", "Essential"),
    price: same("Inclus", "Included"),
    threshold: same("Tous les clients", "All clients"),
    contents: same("Webinaire de lancement, bilan de santé trimestriel, ressources d'adoption, pool de CSM", "Launch webinar, quarterly health check, adoption resources, pool of CSMs"),
  },
  {
    id: "dedie",
    name: same("Dédié", "Dedicated"),
    price: same("10 % de l'abonnement (min. 7 500 €)", "10% of subscription (min. €7,500)"),
    threshold: same("Inclus si ARR ≥ 60 000 €", "Included if ARR ≥ €60,000"),
    contents: same("CSM nommé, point mensuel, revue trimestrielle (QBR), plan d'adoption et de succès", "Named CSM, monthly call, quarterly business review, adoption and success plan"),
  },
  {
    id: "strategique",
    name: same("Stratégique", "Strategic"),
    price: same("18 % de l'abonnement (min. 30 000 €)", "18% of subscription (min. €30,000)"),
    threshold: same("Inclus si ARR ≥ 250 000 €", "Included if ARR ≥ €250,000"),
    contents: same("CSM dédié + 40 h d'architecte par an, revue exécutive, feuille de route pluriannuelle", "Dedicated CSM + 40 architect hours a year, executive review, multi-year roadmap"),
  },
];

/** Onboarding inclus : garde-fous écrits. */
export const ONBOARDING_GUARDRAILS: { label: L; value: L }[] = [
  { label: same("Effort", "Effort"), value: same("≤ 3 jours d'accompagnement à distance", "≤ 3 days of remote guidance") },
  { label: same("Délai", "Timebox"), value: same("30 jours calendaires après activation du tenant", "30 calendar days after tenant activation") },
  { label: same("Périmètre", "Scope"), value: same("1 site ; import CSV + 1 connecteur du catalogue en configuration standard ; ≤ 2 000 actifs", "1 site; CSV import + 1 catalogue connector in standard configuration; ≤ 2,000 assets") },
  { label: same("Formation", "Training"), value: same("2 sessions de 2 h (administrateurs + utilisateurs)", "2 × 2-hour sessions (admins + users)") },
  { label: same("Livrables", "Deliverables"), value: same("Tenant configuré, import validé, 1 tableau de bord, plan d'adoption", "Configured tenant, validated import, 1 dashboard, adoption plan") },
  { label: same("Exclus", "Excluded"), value: same("Développements spécifiques, migration de CMDB historique, OT, intervention sur site, SSO personnalisé, plus de 20 champs personnalisés", "Custom development, legacy CMDB migration, OT, on-site work, custom SSO, more than 20 custom fields") },
  { label: same("Hors périmètre", "Out of scope"), value: same("Demande écrite → estimation sous 3 jours ouvrés au tarif journalier → accord écrit avant exécution", "Written request → estimate within 3 business days at day rate → written approval before work starts") },
];

export const PS_PACKAGES: PriceLine[] = [
  { id: "pilote-3j", name: same("Pilote GTC 3 jours", "GTC 3-day Pilot"), amount: 2800, unit: same("forfait", "fixed fee"), note: same("Déductible d'un contrat Plateforme signé sous 90 jours", "Deductible from a Platform contract signed within 90 days") },
  { id: "quickstart", name: same("QuickStart Plus", "QuickStart Plus"), amount: 10700, unit: same("forfait", "fixed fee"), note: same("10 jours, 3 sites, 2 connecteurs natifs configurés", "10 days, 3 sites, 2 native connectors configured") },
  { id: "int-sap-ora", name: same("Intégration SAP ou Oracle", "SAP or Oracle integration"), amount: 14800, unit: same("forfait", "fixed fee"), note: same("Cadrage, mapping, synchronisation, recette, mise en production", "Scoping, mapping, sync, acceptance, go-live") },
  { id: "int-snow", name: same("Intégration ServiceNow", "ServiceNow integration"), amount: 11800, unit: same("forfait", "fixed fee"), note: same("CMDB bidirectionnelle, règles de réconciliation", "Bidirectional CMDB, reconciliation rules") },
  { id: "ot-city", name: same("Découverte OT d'une ville", "City OT discovery"), amount: 43700, unit: same("forfait (≈ 20 000 équipements)", "fixed fee (≈ 20,000 devices)"), note: same("Inventaire caméras, feux, antennes, capteurs ; collecteurs en abonnement", "Inventory of cameras, traffic lights, antennas, sensors; collectors billed as subscription") },
  { id: "csrd-first", name: same("Premier rapport CSRD", "First CSRD report"), amount: 7200, unit: same("forfait, 1 entité", "fixed fee, 1 entity"), note: same("ESRS E5 IT + carbone IT, note méthodologique", "ESRS E5 IT + IT carbon, methodology note") },
  { id: "lab", name: same("Pilote GreenTechCycle Lab (8 semaines)", "GreenTechCycle Lab pilot (8 weeks)"), amount: 11900, unit: same("forfait", "fixed fee"), note: same("Pilote encadré d'un programme de R&D GTC", "Supervised pilot of a GTC R&D programme") },
  { id: "audit", name: same("Audit terrain ITAD", "ITAD field audit"), amount: 1600, unit: same("par jour", "per day"), note: same("Rapport inclus", "Report included") },
];

export const DAY_RATES: PriceLine[] = [
  { id: "csm", name: same("Customer Success Manager / chef de projet", "Customer Success Manager / project manager"), amount: 970, unit: same("par jour", "per day") },
  { id: "compliance", name: same("Consultant conformité", "Compliance consultant"), amount: 1050, unit: same("par jour", "per day") },
  { id: "architect", name: same("Architecte solution", "Solution architect"), amount: 1210, unit: same("par jour", "per day") },
];

/* ── Ancres courtes réutilisées dans les pages (calculées depuis la liste) ── */

const both = (f: (lang: Lang) => string): L => ({ fr: f("fr"), en: f("en") });
const WS = ITAD_LINES.find((l) => l.id === "ws-e1")!.bands as number[];
const ESS = EDITIONS[0].bands;
const HT = (lang: Lang) => (lang === "en" ? "ex-VAT" : "HT");

export const PRICE_ANCHORS = {
  trial: both((l) => (l === "en" ? `Free ${TRIAL.days}-day trial, no credit card` : `Essai gratuit ${TRIAL.days} jours, sans carte bancaire`)),
  platform: both((l) =>
    l === "en"
      ? `From ${eur(ESS[0]!, l)} ex-VAT per asset per month, graduated`
      : `Dès ${eur(ESS[0]!, l)} HT par actif et par mois, dégressif`
  ),
  platformShort: both((l) => (l === "en" ? `Platform from ${eur(ESS[0]!, l)}/asset/month` : `Plateforme dès ${eur(ESS[0]!, l)}/actif/mois`)),
  platformExample: both((l) =>
    l === "en"
      ? `${eur(editionMonthly("essentials", 200)!, l)} ex-VAT/month for 200 assets (Essentials)`
      : `${eur(editionMonthly("essentials", 200)!, l)} HT/mois pour 200 actifs (Essentials)`
  ),
  itad: both((l) =>
    l === "en"
      ? `${eur(WS[0], l)} to ${eur(WS[WS.length - 1], l)} ex-VAT per device, by volume`
      : `De ${eur(WS[0], l)} à ${eur(WS[WS.length - 1], l)} HT par poste, selon le volume`
  ),
  itadShort: both((l) => (l === "en" ? `ITAD ${eur(WS[0], l)} → ${eur(WS[WS.length - 1], l)}/device` : `ITAD ${eur(WS[0], l)} → ${eur(WS[WS.length - 1], l)}/poste`)),
  waki: both((l) => (l === "en" ? `From ${eur(WAKI_PLANS[0].monthly, l)} ex-VAT/month` : `Dès ${eur(WAKI_PLANS[0].monthly, l)} HT/mois`)),
  wakiPilot: both((l) =>
    l === "en"
      ? `1st month free, then ${eur(WAKI_PLANS[0].monthly, l)} ex-VAT/month`
      : `1er mois offert, puis ${eur(WAKI_PLANS[0].monthly, l)} HT/mois`
  ),
  pilot3: both((l) => `${eur(PS_PACKAGES.find((p) => p.id === "pilote-3j")!.amount!, l)} ${HT(l)}`),
  collection: both((l) =>
    l === "en"
      ? `Pick-up free when the buyback value covers it, otherwise from ${eur(COLLECTION_CLASSES[0].z1Planned, l)} ex-VAT`
      : `Collecte offerte quand la valeur de rachat la finance, sinon dès ${eur(COLLECTION_CLASSES[0].z1Planned, l)} HT`
  ),
} satisfies Record<string, L>;
