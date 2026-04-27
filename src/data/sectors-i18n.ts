import type { SectorSlug, SectorContent, MatrixRow } from "./sectors";
import { sectorContentFr } from "./sectors-content-fr";
import { sectorContentEn } from "./sectors-content-en";

/* ─────────────────────────────────────────────────────────────────────────────
   Phase data type
───────────────────────────────────────────────────────────────────────────── */
export interface PhaseData {
  title: string;
  period: string;
  description: string;
  sectors: string[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sector display names (used by hub getSectorName)
───────────────────────────────────────────────────────────────────────────── */
const SECTOR_NAMES: Record<string, Record<SectorSlug, string>> = {
  fr: {
    finance: "Banque & Finance",
    sante: "Santé",
    industrie: "Industrie",
    retail: "Commerce & Distribution",
    energie: "Énergie & Utilités",
    "transport-logistique": "Transport & Logistique",
    public: "Secteur public",
    tech: "Technologie & SaaS",
    "medias-audiovisuel": "Médias & Audiovisuel",
    conseil: "Conseil & Services",
    "pharma-biotech": "Pharma & Biotech",
    btp: "BTP & Construction",
    horeca: "Hôtellerie-Restauration",
    "education-recherche": "Éducation & Recherche",
    agroalimentaire: "Agroalimentaire",
    telecom: "Télécommunications",
  },
  en: {
    finance: "Banking & Finance",
    sante: "Healthcare",
    industrie: "Industry",
    retail: "Retail & Distribution",
    energie: "Energy & Utilities",
    "transport-logistique": "Transport & Logistics",
    public: "Public Sector",
    tech: "Technology & SaaS",
    "medias-audiovisuel": "Media & Broadcasting",
    conseil: "Consulting & Services",
    "pharma-biotech": "Pharma & Biotech",
    btp: "Construction",
    horeca: "Hospitality & Food Service",
    "education-recherche": "Education & Research",
    agroalimentaire: "Food & Beverage",
    telecom: "Telecommunications",
  },
};

export function getSectorName(locale: string, slug: SectorSlug | string): string {
  return SECTOR_NAMES[locale]?.[slug as SectorSlug] ?? slug;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Hub page labels
───────────────────────────────────────────────────────────────────────────── */
type HubLabels = {
  heroTitle: string;
  heroSubtitle: string;
  howToReadTitle: string;
  howToReadBricks: { title: string; description: string }[];
  sectorGridTitle: string;
  viewSector: string;
  tf1Badge: string;
  annexe1Title: string;
  annexe1Cols: string[];
  annexe2Title: string;
  ctaTitle: string;
  ctaSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  trustItems: string[];
};

export function getHubLabels(locale: string): HubLabels {
  const fr = locale === "fr";
  return {
    heroTitle: fr
      ? "Notre expertise sectorielle ITAD"
      : "Our ITAD Sector Expertise",
    heroSubtitle: fr
      ? "16 secteurs d'activité accompagnés, chaque vertical a ses régulateurs, ses cycles de vie, ses contraintes de chaîne de garde."
      : "16 sectors served, each vertical has its regulators, lifecycles and chain-of-custody constraints.",
    howToReadTitle: fr
      ? "Comment lire nos fiches sectorielles"
      : "How to read our sector profiles",
    howToReadBricks: fr
      ? [
          { title: "Profil & douleurs", description: "Contexte réglementaire, volumétrie type et les 5 douleurs prioritaires identifiées sur le terrain." },
          { title: "Cas d'usage & ROI", description: "4 cas concrets chiffrés avec résultats vérifiables, plus une estimation ROI sectorielle." },
          { title: "Personas & objections", description: "Les décideurs concernés (DSI, RSSI, DAF, RSE) et les 4 objections les plus fréquentes, avec réponses." },
        ]
      : [
          { title: "Profile & pain points", description: "Regulatory context, typical fleet sizes and the 5 priority pain points identified in the field." },
          { title: "Use cases & ROI", description: "4 concrete cases with verifiable results, plus a sector-specific ROI estimate." },
          { title: "Personas & objections", description: "Key decision-makers (CIO, CISO, CFO, CSR) and the 4 most common objections, with answers." },
        ],
    sectorGridTitle: fr
      ? "16 secteurs, une seule plateforme"
      : "16 sectors, one platform",
    viewSector: fr ? "Voir la fiche" : "View profile",
    tf1Badge: fr ? "Référence TF1" : "TF1 Reference",
    annexe1Title: fr
      ? "Matrice de priorisation sectorielle"
      : "Sector Prioritisation Matrix",
    annexe1Cols: fr
      ? ["Secteur", "Taille de deal", "Vélocité", "Priorité"]
      : ["Sector", "Deal size", "Velocity", "Priority"],
    annexe2Title: fr
      ? "Séquencement commercial recommandé"
      : "Recommended Commercial Sequencing",
    ctaTitle: fr
      ? "Votre secteur est couvert"
      : "Your sector is covered",
    ctaSubtitle: fr
      ? "16 secteurs, une seule plateforme. Demandez un audit sectoriel gratuit sous 48 h."
      : "16 sectors, one platform. Request a free sector audit within 48 hours.",
    ctaPrimary: fr ? "Demander un audit sectoriel" : "Request a sector audit",
    ctaSecondary: fr ? "Voir les cas d'usages" : "View use cases",
    trustItems: [
      "R2v3 · ISO 14001",
      "NIST 800-88 rev2",
      fr ? "Conforme RGPD · NIS2 · DORA" : "GDPR · NIS2 · DORA compliant",
      "CSRD ESRS E5 ready",
    ],
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   Priority matrix data
───────────────────────────────────────────────────────────────────────────── */
export function getMatrixData(locale: string): MatrixRow[] {
  const fr = locale === "fr";
  return [
    { slug: "finance", dealSize: fr ? "80-500 k€" : "€80-500K", velocity: fr ? "Élevée" : "High", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "industrie", dealSize: fr ? "50-300 k€" : "€50-300K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "retail", dealSize: fr ? "40-200 k€" : "€40-200K", velocity: fr ? "Élevée" : "High", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "tech", dealSize: fr ? "60-400 k€" : "€60-400K", velocity: fr ? "Élevée" : "High", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "medias-audiovisuel", dealSize: fr ? "Sur devis (TF1)" : "Custom (TF1)", velocity: fr ? "Élevée" : "High", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "conseil", dealSize: fr ? "30-150 k€" : "€30-150K", velocity: fr ? "Élevée" : "High", priority: fr ? "Haute" : "High", stars: 3 },
    { slug: "sante", dealSize: fr ? "40-250 k€" : "€40-250K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "energie", dealSize: fr ? "100-600 k€" : "€100-600K", velocity: fr ? "Lente" : "Slow", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "transport-logistique", dealSize: fr ? "30-180 k€" : "€30-180K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "pharma-biotech", dealSize: fr ? "50-300 k€" : "€50-300K", velocity: fr ? "Lente" : "Slow", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "horeca", dealSize: fr ? "20-100 k€" : "€20-100K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "agroalimentaire", dealSize: fr ? "30-150 k€" : "€30-150K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "telecom", dealSize: fr ? "200 k€-2 M€" : "€200K-2M", velocity: fr ? "Lente" : "Slow", priority: fr ? "Moyenne" : "Medium", stars: 2 },
    { slug: "public", dealSize: fr ? "20-120 k€" : "€20-120K", velocity: fr ? "Lente" : "Slow", priority: fr ? "Basse" : "Low", stars: 1 },
    { slug: "btp", dealSize: fr ? "15-80 k€" : "€15-80K", velocity: fr ? "Moyenne" : "Medium", priority: fr ? "Basse" : "Low", stars: 1 },
    { slug: "education-recherche", dealSize: fr ? "10-60 k€" : "€10-60K", velocity: fr ? "Lente" : "Slow", priority: fr ? "Basse" : "Low", stars: 1 },
  ];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Phase sequencing data
───────────────────────────────────────────────────────────────────────────── */
export function getPhases(locale: string): PhaseData[] {
  const fr = locale === "fr";
  return fr
    ? [
        {
          title: "Phase 1 : Socle",
          period: "Q1-Q2 2026",
          description: "Secteurs à haute vélocité commerciale et taille de deal significative. Base de revenus récurrents.",
          sectors: [
            "Banque & Finance : DORA, PCI-DSS, ACPR",
            "Industrie : IT/OT, NIS2, CSRD",
            "Commerce & Distribution : PCI-DSS, multi-sites",
            "Technologie & SaaS : SOC 2, datacenters GPU",
            "Médias & Audiovisuel : TF1, broadcast (référence phare)",
            "Conseil & Services : Big Four, mobilité consultants",
          ],
        },
        {
          title: "Phase 2 : Extension",
          period: "Q3-Q4 2026",
          description: "Secteurs à taille de deal moyenne avec des cycles de vente plus longs. Diversification du portefeuille.",
          sectors: [
            "Santé : HDS, GHT, dispositifs médicaux connectés",
            "Énergie & Utilités : OIV, NIS2, grande échelle",
            "Transport & Logistique : IoT embarqué, billetique, NIS2",
            "Pharma & Biotech : GxP, Annexe 11, essais cliniques",
            "Hôtellerie-Restauration : POS, PMS, saisonnier",
            "Agroalimentaire : IT/OT usines, IFS/BRC",
            "Télécommunications : CPE, réseau, échelle massive",
          ],
        },
        {
          title: "Phase 3 : Couverture",
          period: "2027",
          description: "Secteurs à cycle de vente long et budget contraint. Complétude du portefeuille sectoriel.",
          sectors: [
            "Secteur public : UGAP, marchés publics, filière ESS",
            "BTP & Construction, chantiers distribués, données projets",
            "Éducation & Recherche : RGPD mineurs, financement DEEE",
          ],
        },
      ]
    : [
        {
          title: "Phase 1 : Foundation",
          period: "Q1-Q2 2026",
          description: "Sectors with high commercial velocity and significant deal size. Recurring revenue base.",
          sectors: [
            "Banking & Finance : DORA, PCI-DSS",
            "Industry : IT/OT, NIS2, CSRD",
            "Retail & Distribution : PCI-DSS, multi-site",
            "Technology & SaaS : SOC 2, GPU datacentres",
            "Media & Broadcasting : TF1, broadcast (flagship reference)",
            "Consulting & Services : Big Four, consultant mobility",
          ],
        },
        {
          title: "Phase 2 : Expansion",
          period: "Q3-Q4 2026",
          description: "Sectors with medium deal size and longer sales cycles. Portfolio diversification.",
          sectors: [
            "Healthcare : HDS, hospital groups, IoMT",
            "Energy & Utilities, critical infrastructure, NIS2",
            "Transport & Logistics, embedded IoT, ticketing, NIS2",
            "Pharma & Biotech : GxP, Annex 11, clinical trials",
            "Hospitality & Food Service : POS, PMS, seasonal",
            "Food & Beverage, factory IT/OT, IFS/BRC",
            "Telecommunications : CPE, network, massive scale",
          ],
        },
        {
          title: "Phase 3 : Coverage",
          period: "2027",
          description: "Sectors with long sales cycles and constrained budgets. Sector portfolio completeness.",
          sectors: [
            "Public Sector, procurement, charity channel",
            "Construction, distributed sites, project data",
            "Education & Research, minor GDPR, WEEE funding",
          ],
        },
      ];
}

/* ─────────────────────────────────────────────────────────────────────────────
   Sector content, full data for sector detail pages
───────────────────────────────────────────────────────────────────────────── */
const contentMap: Record<string, Record<SectorSlug, SectorContent>> = {
  fr: sectorContentFr,
  en: sectorContentEn,
};

export function getSectorContent(locale: string, slug: SectorSlug): SectorContent {
  const loc = contentMap[locale] ?? contentMap.fr;
  return loc[slug];
}
