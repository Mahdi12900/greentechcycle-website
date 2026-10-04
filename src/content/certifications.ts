/**
 * Certifications, référentiels et statuts — page /certifications (phase 3, 2026-10-04).
 *
 * Règle : uniquement ce qui est déjà écrit dans le contenu GreenTechCycle, avec le
 * statut tel qu'écrit (ISO 27001 = « en cours », décision du 2026-10-04).
 * `source` cite l'emplacement d'origine (clé de messages/*.json ou fichier).
 *
 * `toProvide` : numéro de certificat, organisme et date de validité — À FOURNIR par
 * GreenTechCycle. Ces champs ne sont JAMAIS affichés tant qu'ils sont vides
 * (aucune valeur fictive).
 */

export type CertStatus = "certification" | "inProgress" | "method" | "status";

export interface CertItem {
  id: string;
  name: string;
  status: CertStatus;
  description: { fr: string; en: string };
  source: string;
  toProvide?: { number: string | null; issuer: string | null; validUntil: string | null };
}

const TBD = { number: null, issuer: null, validUntil: null };

export const CERTIFICATIONS: CertItem[] = [
  {
    id: "r2v3",
    name: "R2v3",
    status: "certification",
    description: {
      fr: "Responsible Recycling (R2:2013 SERI). Engagement contractuel R2v3 pour chaque mission.",
      en: "Responsible Recycling (R2:2013 SERI). Contractual R2v3 commitment on every mission.",
    },
    source: "Home.differentiators.items[1] · Security.certifications.items[0] (« R2v3 (Responsible Recycling) ») · WhyGTC.commitments.items[4].source",
    toProvide: TBD,
  },
  {
    id: "iso14001",
    name: "ISO 14001:2015",
    status: "certification",
    description: { fr: "Management environnemental.", en: "Environmental management." },
    source: "Home.differentiators.items[1] · Security.certifications.items[1]",
    toProvide: TBD,
  },
  {
    id: "iso27001",
    name: "ISO 27001:2022",
    status: "inProgress",
    description: { fr: "Sécurité de l'information. Démarche en cours.", en: "Information security. Process in progress." },
    source: "TrustBar.text (« ISO 27001 (en cours) ») · décision utilisateur 2026-10-04",
    toProvide: TBD,
  },
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    status: "certification",
    description: { fr: "Management de la qualité.", en: "Quality management." },
    source: "Home.differentiators.items[1]",
    toProvide: TBD,
  },
  {
    id: "estewards",
    name: "e-Stewards",
    status: "certification",
    description: {
      fr: "Recyclage responsable des équipements électroniques.",
      en: "Responsible recycling of electronic equipment.",
    },
    source: "Home.differentiators.items[1] · Security.certifications.items[3]",
    toProvide: TBD,
  },
  {
    id: "qualiopi",
    name: "Qualiopi",
    status: "certification",
    description: { fr: "Formation.", en: "Training." },
    source: "Security.certifications.items[4] (« Qualiopi (formation) »)",
    toProvide: TBD,
  },
];

export const METHODS: CertItem[] = [
  {
    id: "nist80088",
    name: "NIST SP 800-88",
    status: "method",
    description: {
      fr: "Effacement Clear, Purge ou Destroy selon la classification de vos données.",
      en: "Clear, Purge or Destroy erasure according to your data classification.",
    },
    source: "Platform.faq.items[2].a (« Trois niveaux NIST 800-88 … (Clear, Purge, Destroy) appliqués selon la classification de vos données »)",
  },
  {
    id: "ieee2883",
    name: "IEEE 2883-2022",
    status: "method",
    description: { fr: "Appliquée aux supports SSD et NVMe.", en: "Applied to SSD and NVMe media." },
    source: "Platform.faq.items[2].a (« Pour les supports SSD et NVMe, nous appliquons IEEE 2883 »)",
  },
  {
    id: "hmgis5",
    name: "HMG IS5 Enhanced",
    status: "method",
    description: {
      fr: "Niveau Enhanced, cité pour les missions de destruction les plus sensibles.",
      en: "Enhanced level, cited for the most sensitive destruction missions.",
    },
    source: "Home.differentiators.items[1] · UseCases (« broyage HMG IS5 Enhanced 6 mm »)",
  },
  {
    id: "dod522022m",
    name: "DoD 5220.22-M",
    status: "method",
    description: { fr: "Effacement par passes multiples.", en: "Multi-pass overwrite." },
    source: "services/effacement-securise (certifications) · Services.items.effacement (« 3 passes »)",
  },
  {
    id: "esus",
    name: "ESUS",
    status: "status",
    description: {
      fr: "Statut entreprise solidaire d'utilité sociale.",
      en: "Solidarity enterprise of social utility status.",
    },
    source: "Home.differentiators.items[3].body",
  },
];

/** Preuves réellement produites par la plateforme (dépôt greentechcycle-command-center, lu le 2026-10-04). */
export const PLATFORM_PROOFS = {
  fr: [
    "Certificat d'effacement horodaté, un par actif",
    "Empreinte SHA-256 de chaque certificat",
    "Journal d'audit chaîné (SHA-256)",
    "QR code de vérification sur chaque certificat",
  ],
  en: [
    "Timestamped erasure certificate, one per asset",
    "SHA-256 fingerprint of every certificate",
    "Chained audit log (SHA-256)",
    "Verification QR code on every certificate",
  ],
};
