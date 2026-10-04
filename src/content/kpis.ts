/**
 * Registre unique des chiffres GreenTechCycle (phase 3, 2026-10-04).
 *
 * C'est le SEUL endroit où modifier un chiffre affiché sur le site :
 *  - les blocs KPI (compteurs, jauges, barres) lisent ce fichier via <KpiStat> / <KpiGauge> ;
 *  - les textes de `messages/*.json` contiennent des jetons `%kpi.<id>%`, remplacés
 *    au chargement des messages (src/i18n/request.ts → injectKpis).
 *
 * Règle : aucun montant en euros (valeur récupérée, CA, économies) n'est publié
 * pour l'instant — décision du 2026-10-04.
 *
 * `toValidate: true` = valeur reprise de la page d'accueil datée, en attendant
 * l'arbitrage de GreenTechCycle entre les valeurs contradictoires listées dans
 * `alternatives` (relevées dans le contenu existant). Changer `value` ici
 * suffit à mettre tout le site à jour.
 */

export type Locale = "fr" | "en";
type L = Record<Locale, string>;

export interface Kpi {
  /** Valeur numérique (sans unité) */
  value: number;
  decimals?: number;
  /** Suffixe affiché après la valeur (ex. « + », « % », « tCO₂e ») */
  unit: L;
  label: L;
  /** Période couverte par la valeur */
  period: L;
  /** Source telle qu'écrite dans le contenu GTC */
  source: L;
  /** Date de la donnée (AAAA-MM) */
  date: string;
  /** true = à valider par GreenTechCycle avant publication définitive */
  toValidate: boolean;
  /** Valeurs concurrentes trouvées dans le contenu (pour l'arbitrage) */
  alternatives?: string[];
}

export const KPIS = {
  // ⚠ toValidate : accueil « 152 ETI clientes en production (avr. 2026) » ;
  // ailleurs « 180+ entreprises accompagnées 2024-2025 » et « 280+ clients accompagnés ».
  clients: {
    value: 152,
    unit: { fr: "", en: "" },
    label: { fr: "ETI clientes en production", en: "mid-cap clients in production" },
    period: { fr: "avril 2026", en: "April 2026" },
    source: { fr: "Liste publique sur demande NDA", en: "Public list available under NDA" },
    date: "2026-04",
    toValidate: true,
    alternatives: ["180+ (Résultats clients, 2024-2025)", "280+ (index Secteurs)"],
  },
  // ⚠ toValidate : accueil « 12 412 actifs IT traités (41 missions 2025) » ;
  // ailleurs « 42 000+ (2024-2025) » et « 84 000+ orchestrés (cumul mars 2026) ».
  assets: {
    value: 12412,
    unit: { fr: "", en: "" },
    label: { fr: "actifs IT traités", en: "IT assets processed" },
    period: { fr: "2025", en: "2025" },
    source: { fr: "41 missions facturées 2025", en: "41 invoiced missions in 2025" },
    date: "2025-12",
    toValidate: true,
    alternatives: ["42 000+ (Résultats clients, 2024-2025)", "84 000+ actifs orchestrés (Plateforme, cumul mars 2026)"],
  },
  // ⚠ toValidate : accueil « 45 tCO₂e évitées en 2025 » ; ailleurs « 1 850 tCO₂e » et « 6 200 t (cumul) ».
  carbon: {
    value: 45,
    unit: { fr: " tCO₂e", en: " tCO₂e" },
    label: { fr: "évitées en 2025 (scope 3.1)", en: "avoided in 2025 (scope 3.1)" },
    period: { fr: "2025", en: "2025" },
    source: { fr: "Méthode Boavizta v1.4 + ADEME v23", en: "Boavizta v1.4 + ADEME v23 method" },
    date: "2025-12",
    toValidate: true,
    alternatives: ["1 850 tCO₂e (Résultats clients)", "6 200 t cumul quatre ans (Plateforme, Services)"],
  },
  // ⚠ toValidate : « 38 experts habilités » / « 38 techniciens » / « 38 collaborateurs en CDI » / « 38 ETP ».
  team: {
    value: 38,
    unit: { fr: "", en: "" },
    label: { fr: "experts habilités", en: "cleared experts" },
    period: { fr: "2026", en: "2026" },
    source: { fr: "Effectif GreenTechCycle", en: "GreenTechCycle headcount" },
    date: "2026-04",
    toValidate: true,
    alternatives: ["38 techniciens habilités", "38 collaborateurs en CDI", "12 techniciens habilités confidentiel défense"],
  },
  // ⚠ toValidate : « taux réemploi 73 % » (accueil) ; « 72 % » ailleurs (Pourquoi GTC, FAQ, services).
  reuse: {
    value: 73,
    unit: { fr: " %", en: "%" },
    label: { fr: "taux de réemploi moyen", en: "average reuse rate" },
    period: { fr: "2025", en: "2025" },
    source: { fr: "Filière ESS partenaire · R2v3", en: "Partner social-economy channel · R2v3" },
    date: "2025-12",
    toValidate: true,
    alternatives: ["72 % (Pourquoi GTC, FAQ, Reconditionnement, Méthodologie, Plateforme)"],
  },
  // ⚠ toValidate : valeur unique dans le contenu, mais à rapprocher des 12 412 actifs (2025).
  certificates: {
    value: 38000,
    unit: { fr: "+", en: "+" },
    label: { fr: "certificats NIST 800-88 émis", en: "NIST 800-88 certificates issued" },
    period: { fr: "cumul, mars 2026", en: "cumulative, March 2026" },
    source: { fr: "Plateforme GreenTechCycle", en: "GreenTechCycle platform" },
    date: "2026-03",
    toValidate: true,
  },
  // ⚠ toValidate : valeur unique (Cas d'usage), cumul non daté précisément.
  refurbished: {
    value: 28500,
    unit: { fr: "+", en: "+" },
    label: { fr: "postes reconditionnés (cumul)", en: "devices refurbished (cumulative)" },
    period: { fr: "toutes missions", en: "all missions" },
    source: { fr: "Inventaire GTC toutes missions", en: "GTC inventory, all missions" },
    date: "2025-12",
    toValidate: true,
  },
  // Chiffre externe sourcé (hero d'accueil) : pas à valider.
  manufacturing: {
    value: 78,
    unit: { fr: " %", en: "%" },
    label: {
      fr: "de l'empreinte carbone d'un parc IT est figée à la fabrication",
      en: "of an IT fleet's carbon footprint is locked in at manufacturing",
    },
    period: { fr: "2024", en: "2024" },
    source: {
      fr: "ADEME : Évaluation environnementale du numérique 2024 (scope 3.1 fabrication)",
      en: "ADEME: Environmental assessment of digital 2024 (scope 3.1 manufacturing)",
    },
    date: "2024-01",
    toValidate: false,
  },
} satisfies Record<string, Kpi>;

export type KpiId = keyof typeof KPIS;

/** Valeur formatée selon la langue (sans unité) : « 12 412 » / « 12,412 ». */
export function formatKpiValue(id: KpiId, locale: Locale): string {
  const k: Kpi = KPIS[id];
  return k.value.toLocaleString(locale === "en" ? "en-GB" : "fr-FR", {
    minimumFractionDigits: k.decimals ?? 0,
    maximumFractionDigits: k.decimals ?? 0,
  });
}

/** Valeur + unité : « 45 tCO₂e », « 73 % », « 38 000+ ». */
export function formatKpi(id: KpiId, locale: Locale): string {
  return formatKpiValue(id, locale) + KPIS[id].unit[locale];
}

/**
 * Remplace les jetons `%kpi.<id>%` (valeur) et `%kpi.<id>.full%` (valeur + unité)
 * dans toutes les chaînes des messages. Appelé une fois au chargement des messages.
 */
export function injectKpis<T>(messages: T, locale: Locale): T {
  const re = /%kpi\.([a-zA-Z]+)(\.full)?%/g;
  const visit = (v: unknown): unknown => {
    if (typeof v === "string") {
      return v.replace(re, (m, id: string, full?: string) =>
        id in KPIS ? (full ? formatKpi(id as KpiId, locale) : formatKpiValue(id as KpiId, locale)) : m
      );
    }
    if (Array.isArray(v)) return v.map(visit);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, visit(x)]));
    return v;
  };
  return visit(messages) as T;
}
