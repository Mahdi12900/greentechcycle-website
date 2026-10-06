/**
 * Tableaux comparatifs détaillés de /tarifs (refonte v4, 2026-10-06), groupés par catégorie.
 *
 * Règle : une case n'est cochée (« ✓ ») que si le contenu déjà publié sur le site le
 * justifie. Sources : src/content/pricing.ts (prix, périmètres), Platform.chapters dans
 * messages/*.json (fonctions de la plateforme : connecteurs, scan, règles, certificats
 * SHA-256 conservés dix ans, accès auditeur, extraits comptables), cartes de /tarifs
 * (Waki Box, Service ITAD). Les capacités IT/OT, Oracle et indicateurs legacy sont
 * énoncées par GreenTechCycle sans précision de palier : « Sur devis » partout tant que
 * le rattachement n'est pas confirmé (voir reports/refonte-v4-plan.md).
 *
 * Valeurs spéciales : « ✓ » inclus, « — » non inclus / non applicable ; toute autre
 * chaîne est affichée telle quelle.
 */

type L = { fr: string; en: string };
export interface CompRow {
  label: L;
  values: L[];
}
export interface CompGroup {
  title: L;
  rows: CompRow[];
}

const Y: L = { fr: "✓", en: "✓" };
const N: L = { fr: "—", en: "—" };
const Q: L = { fr: "Sur devis", en: "On quote" };
const l = (fr: string, en = fr): L => ({ fr, en });

export const PLATFORM_COMPARISON: CompGroup[] = [
  {
    title: l("Tarif et périmètre", "Price and scope"),
    rows: [
      { label: l("Prix", "Price"), values: [l("1 400 € HT/mois", "€1,400 ex-VAT/month"), l("Dès 2 500 € HT/mois", "From €2,500 ex-VAT/month"), l("Dès 4,20 € HT/actif/mois", "From €4.20 ex-VAT/asset/month")] },
      { label: l("Actifs gérés", "Managed assets"), values: [l("Jusqu'à 200", "Up to 200"), l("201 à 2 000", "201 to 2,000"), l("Au-delà de 2 000", "Above 2,000")] },
      { label: l("Devis détaillé sous 48 h", "Detailed quote within 48h"), values: [N, Y, Y] },
    ],
  },
  {
    title: l("Inventaire et découverte", "Inventory and discovery"),
    rows: [
      { label: l("Import par lots, par interface ou par scan terrain", "Batch, interface or field-scan import"), values: [Y, Y, Y] },
      { label: l("Détection des incohérences et actifs orphelins", "Inconsistency and orphan-asset detection"), values: [Y, Y, Y] },
      { label: l("Score de vulnérabilité résiduelle par disque et OS", "Residual vulnerability score per disk and OS"), values: [Y, Y, Y] },
    ],
  },
  {
    title: l("Couverture IT et OT", "IT and OT coverage"),
    rows: [
      { label: l("Postes, serveurs, réseau, stockage", "Workstations, servers, network, storage"), values: [Y, Y, Y] },
      { label: l("OT / IoT : caméras, feux, antennes, capteurs", "OT / IoT: cameras, traffic lights, antennas, sensors"), values: [Q, Q, Q] },
    ],
  },
  {
    title: l("Intégrations", "Integrations"),
    rows: [
      { label: l("ServiceNow, GLPI, Intune, JAMF, EasyVista", "ServiceNow, GLPI, Intune, JAMF, EasyVista"), values: [Y, Y, Y] },
      { label: l("Extraits comptables SAP, Sage, Cegid", "SAP, Sage, Cegid accounting exports"), values: [Y, Y, Y] },
      { label: l("Connecteurs ERP / SIRH additionnels", "Additional ERP / HRIS connectors"), values: [N, l("Activables", "Activatable"), l("Activables", "Activatable")] },
      { label: l("Oracle et autres ERP", "Oracle and other ERPs"), values: [Q, Q, Q] },
    ],
  },
  {
    title: l("Preuve et conformité", "Proof and compliance"),
    rows: [
      { label: l("Certificats horodatés, empreinte SHA-256 conservée dix ans", "Timestamped certificates, SHA-256 fingerprint kept ten years"), values: [Y, Y, Y] },
      { label: l("Motif de décision journalisé pour chaque actif", "Decision rationale logged for each asset"), values: [Y, Y, Y] },
      { label: l("Validation à quatre yeux des décisions à enjeu", "Four-eyes validation for high-stakes decisions"), values: [Y, Y, Y] },
      { label: l("Accès auditeur en lecture seule sous 24 h", "Read-only auditor access within 24h"), values: [Y, Y, Y] },
      { label: l("Conformité RGPD native", "Native GDPR compliance"), values: [Y, Y, Y] },
    ],
  },
  {
    title: l("Carbone et CSRD", "Carbon and CSRD"),
    rows: [
      { label: l("Empreinte carbone par actif (ADEME Base Empreinte v23)", "Per-asset carbon footprint (ADEME Base Empreinte v23)"), values: [Y, Y, Y] },
      { label: l("Reporting CSRD", "CSRD reporting"), values: [Y, Y, Y] },
    ],
  },
  {
    title: l("Cycle de vie et maintenance", "Lifecycle and maintenance"),
    rows: [
      { label: l("Cotation marché secondaire mise à jour chaque semaine", "Secondary-market valuation updated weekly"), values: [Y, Y, Y] },
      { label: l("Indicateurs legacy : âge, fin de support, risque de panne", "Legacy indicators: age, end of support, failure risk"), values: [Q, Q, Q] },
      { label: l("Planification du renouvellement", "Renewal planning"), values: [Q, Q, Q] },
    ],
  },
  {
    title: l("Sécurité, service et SLA", "Security, service and SLA"),
    rows: [
      { label: l("Hébergement souverain, disponibilité 99,9 %", "Sovereign hosting, 99.9% availability"), values: [Y, Y, Y] },
      { label: l("Utilisateurs concurrents", "Concurrent users"), values: [l("Standard"), l("Élargis", "Expanded"), Q] },
      { label: l("Niveau de SLA", "SLA level"), values: [l("Standard"), l("Standard"), l("Sur mesure", "Tailored")] },
    ],
  },
];

export const ITAD_COMPARISON: CompGroup[] = [
  {
    title: l("Tarif et périmètre", "Price and scope"),
    rows: [
      { label: l("Prix unitaire", "Unit price"), values: [l("Dès 19 € HT/poste", "From €19 ex-VAT/device"), l("Dès 55 € HT/unité", "From €55 ex-VAT/unit")] },
      { label: l("Périmètre", "Scope"), values: [l("Poste fixe ou portable", "Desktop or laptop"), l("Serveur, baie, équipement complexe", "Server, rack, complex equipment")] },
      { label: l("Smartphones, OT / IoT", "Smartphones, OT / IoT"), values: [Q, Q] },
      { label: l("Devis détaillé sous 48 h après cadrage de 30 min", "Detailed quote within 48h after a 30-min scoping call"), values: [Y, Y] },
    ],
  },
  {
    title: l("Inventaire et audit", "Inventory and audit"),
    rows: [
      { label: l("Audit et inventaire, cartographie exhaustive", "Audit and inventory, exhaustive mapping"), values: [Y, Y] },
      { label: l("Détection des actifs orphelins", "Orphan-asset detection"), values: [Y, Y] },
    ],
  },
  {
    title: l("Effacement et preuve", "Erasure and proof"),
    rows: [
      { label: l("Effacement NIST 800-88 (Clear, Purge) selon la sensibilité", "NIST 800-88 erasure (Clear, Purge) by sensitivity"), values: [Y, Y] },
      { label: l("Destruction physique (Destroy)", "Physical destruction (Destroy)"), values: [Q, Q] },
      { label: l("Certificat horodaté par actif, empreinte SHA-256", "Timestamped per-asset certificate, SHA-256 fingerprint"), values: [Y, Y] },
      { label: l("Vidéo-surveillance horodatée du plateau de traitement", "Timestamped CCTV of the processing floor"), values: [Y, Y] },
    ],
  },
  {
    title: l("Logistique", "Logistics"),
    rows: [
      { label: l("Collecte sécurisée (véhicules tracés GPS, personnel habilité)", "Secure pick-up (GPS-tracked vehicles, cleared staff)"), values: [Q, Q] },
      { label: l("Effacement sur site", "On-site erasure"), values: [Q, Q] },
    ],
  },
  {
    title: l("Valorisation et fin de vie", "Value recovery and end of life"),
    rows: [
      { label: l("Reconditionnement et revente", "Refurbishment and resale"), values: [Y, l("Selon valeur résiduelle", "Depending on residual value")] },
      { label: l("Recyclage DEEE réglementaire avec bordereaux", "Regulatory WEEE recycling with tracking slips"), values: [Y, Y] },
    ],
  },
  {
    title: l("Carbone et CSRD", "Carbon and CSRD"),
    rows: [
      { label: l("Empreinte carbone (facteurs ADEME)", "Carbon footprint (ADEME factors)"), values: [Y, Y] },
      { label: l("Reporting CSRD ESRS E5", "CSRD ESRS E5 reporting"), values: [l("Option 990 € HT/an", "Option €990 ex-VAT/yr"), l("Option 990 € HT/an", "Option €990 ex-VAT/yr")] },
    ],
  },
];

export const WAKIBOX_COMPARISON: CompGroup[] = [
  {
    title: l("Tarif et engagement", "Price and commitment"),
    rows: [
      { label: l("Abonnement mensuel", "Monthly subscription"), values: [l("39 € HT"), l("79 € HT"), l("Dès 149 € HT", "From €149 ex-VAT")] },
      { label: l("Mise en service", "Setup"), values: [l("150 € HT"), l("290 € HT"), l("490 € HT / borne", "€490 ex-VAT / kiosk")] },
      { label: l("Engagement", "Commitment"), values: [l("12 mois", "12 months"), l("12 mois", "12 months"), l("24 mois", "24 months")] },
      { label: l("Organisation type", "Typical organisation"), values: [l("10 à 50 collaborateurs", "10 to 50 employees"), l("50 à 300 collaborateurs", "50 to 300 employees"), l("300+ collaborateurs", "300+ employees")] },
    ],
  },
  {
    title: l("Bornes et collecte", "Kiosks and collection"),
    rows: [
      { label: l("Bornes incluses", "Kiosks included"), values: [l("1"), l("Jusqu'à 3", "Up to 3"), l("Illimitées, multi-sites", "Unlimited, multi-site")] },
      { label: l("Collectes planifiées / mois", "Scheduled collections / month"), values: [l("1"), l("2"), l("Illimité", "Unlimited")] },
      { label: l("Délai de collecte 48 h garanti", "48h collection SLA guaranteed"), values: [N, N, Y] },
      { label: l("Borne supplémentaire", "Additional kiosk"), values: [l("32 € HT/mois", "€32 ex-VAT/month"), l("32 € HT/mois", "€32 ex-VAT/month"), l("32 € HT/mois", "€32 ex-VAT/month")] },
      { label: l("Intervention d'urgence (5 jours ouvrés)", "Emergency intervention (5 business days)"), values: [l("120 € HT"), l("120 € HT"), l("120 € HT")] },
    ],
  },
  {
    title: l("Plateforme et données", "Platform and data"),
    rows: [
      { label: l("Utilisateurs plateforme", "Platform users"), values: [l("1"), l("5"), l("Illimité", "Unlimited")] },
      { label: l("Télémétrie LoRaWAN temps réel", "Real-time LoRaWAN telemetry"), values: [N, Y, Y] },
      { label: l("Alertes de remplissage", "Fill-level alerts"), values: [N, Y, Y] },
      { label: l("Intégration ERP / SIRH par API", "ERP / HRIS integration via API"), values: [N, N, Y] },
    ],
  },
  {
    title: l("Reporting et CSRD", "Reporting and CSRD"),
    rows: [
      { label: l("Rapport de flux DEEE", "WEEE flow report"), values: [l("Trimestriel", "Quarterly"), l("Mensuel", "Monthly"), Y] },
      { label: l("Rapports CSRD ESRS E5", "CSRD ESRS E5 reports"), values: [N, Y, Y] },
      { label: l("Reporting CSRD ESRS E5 annuel prêt audit", "Audit-ready annual CSRD ESRS E5 report"), values: [l("Option 990 € HT/an", "Option €990 ex-VAT/yr"), l("Option 990 € HT/an", "Option €990 ex-VAT/yr"), l("Option 990 € HT/an", "Option €990 ex-VAT/yr")] },
    ],
  },
  {
    title: l("Support", "Support"),
    rows: [
      { label: l("Délai de réponse", "Response time"), values: [l("Courriel J+2", "Email D+2"), l("Prioritaire J+1", "Priority D+1"), l("Dédié, 4 h", "Dedicated, 4h")] },
      { label: l("Responsable de compte dédié", "Dedicated account manager"), values: [N, N, Y] },
    ],
  },
];
