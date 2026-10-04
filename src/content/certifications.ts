/**
 * Conformité & démarche — page /certifications (mis à jour le 2026-10-04).
 *
 * FAIT (utilisateur, 2026-10-04) : GreenTechCycle ne détient AUCUNE certification à ce jour.
 * La démarche ISO 27001 est en cours. R2v3, ISO 14001, ISO 9001, e-Stewards, HMG IS5,
 * Qualiopi… ne doivent jamais être présentés comme obtenus.
 *
 * Ce fichier ne liste donc que :
 *  - les MÉTHODES appliquées (normes techniques d'effacement / destruction déjà décrites
 *    dans le contenu GTC) — ce ne sont pas des certifications ;
 *  - la démarche EN COURS (ISO 27001), sans date cible (aucune n'a été communiquée) ;
 *  - le cadre réglementaire auquel la plateforme aide les clients à répondre ;
 *  - les preuves réellement produites par la plateforme.
 * `source` cite l'emplacement d'origine dans le contenu.
 */

export type ItemStatus = "method" | "inProgress";

export interface ComplianceItem {
  id: string;
  name: string;
  status: ItemStatus;
  description: { fr: string; en: string };
  source: string;
}

/** Méthodes appliquées (normes techniques), pas des certifications */
export const METHODS: ComplianceItem[] = [
  {
    id: "nist80088",
    name: "NIST SP 800-88",
    status: "method",
    description: {
      fr: "Effacement Clear, Purge ou Destroy selon la classification de vos données.",
      en: "Clear, Purge or Destroy erasure according to your data classification.",
    },
    source: "Platform.faq.items[2].a",
  },
  {
    id: "ieee2883",
    name: "IEEE 2883-2022",
    status: "method",
    description: { fr: "Appliquée aux supports SSD et NVMe.", en: "Applied to SSD and NVMe media." },
    source: "Platform.faq.items[2].a",
  },
  {
    id: "hmgis5",
    name: "HMG IS5 Enhanced",
    status: "method",
    description: {
      fr: "Méthode de destruction appliquée aux missions les plus sensibles (broyage 6 mm).",
      en: "Destruction method applied to the most sensitive missions (6 mm shredding).",
    },
    source: "Home.valueChain.steps[1] · UseCases (« broyage HMG IS5 Enhanced 6 mm »)",
  },
  {
    id: "dod522022m",
    name: "DoD 5220.22-M",
    status: "method",
    description: { fr: "Effacement par passes multiples.", en: "Multi-pass overwrite." },
    source: "services/effacement-securise · Services.items.effacement (« 3 passes »)",
  },
];

/** Démarche en cours — aucune date cible communiquée, donc aucune affichée */
export const IN_PROGRESS: ComplianceItem[] = [
  {
    id: "iso27001",
    name: "ISO 27001",
    status: "inProgress",
    description: {
      fr: "Système de management de la sécurité de l'information : démarche de certification en cours.",
      en: "Information security management system: certification process in progress.",
    },
    source: "Décision utilisateur 2026-10-04 (« ISO c'est en cours »)",
  },
];

/** Cadre réglementaire couvert par les contenus Réglementation (renvoi vers /reglementation) */
export const REGULATIONS = ["CSRD · ESRS E5", "RGPD", "NIS2", "DORA", "AGEC", "DEEE"];

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
