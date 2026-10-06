/**
 * Groupes sectoriels pour la bande de confiance de l'accueil (JFrog-inspired,
 * reports/revue-section-gtc.md, option C). Chaque groupe associe les noms de
 * clients publics (src/content/clients.ts) déjà affichés sur le site à leur
 * secteur réel, et au contenu qualitatif déjà publié pour ce secteur.
 *
 * Règle de vérité (voir rapport) : on ne peut afficher un vrai nom de client à
 * côté d'un témoignage détaillé que si ce client a explicitement autorisé la
 * publication nominative de ce témoignage. Seul le secteur Médias dispose d'un
 * texte nominatif déjà publié (tf1Reference, src/data/sectors-content-fr.ts) :
 * c'est le seul réutilisé ici. Pour tous les autres secteurs, aucun verbatim
 * nominatif ou anonymisé existant sur le site ne correspond factuellement à ce
 * secteur (les témoignages anonymisés de l'accueil/cas d'usages couvrent
 * Banque, Santé, Industrie, Telco — pas ces 6 secteurs) : afficher un texte
 * générique plutôt que d'inventer ou de mal attribuer une citation.
 */

type L = { fr: string; en: string };

export interface TrustSector {
  id: string;
  label: L;
  /** Identifiants dans src/content/clients.ts */
  clientIds: string[];
  /** true si un texte nominatif déjà publié existe pour ce secteur (ex. TF1) */
  hasNamedReference: boolean;
  text: L;
}

export const TRUST_SECTORS: TrustSector[] = [
  {
    id: "medias",
    label: { fr: "Médias & Audiovisuel", en: "Media & Broadcasting" },
    clientIds: ["tf1", "bouygues", "vivendi"],
    hasNamedReference: true,
    text: {
      fr: "TF1 nous fait confiance pour la gestion de son parc IT et broadcast. Nous comprenons les contraintes spécifiques du secteur, des stations de montage haut de gamme aux batteries broadcast, en passant par le reporting ESG groupe.",
      en: "TF1 trusts us to manage its IT and broadcast fleet. We understand the sector's specific constraints, from high-end editing stations to broadcast batteries, including group ESG reporting.",
    },
  },
  {
    id: "protection-sociale",
    label: { fr: "Protection sociale", en: "Social protection" },
    clientIds: ["agirc-arrco"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
  {
    id: "logement",
    label: { fr: "Logement social", en: "Social housing" },
    clientIds: ["adf-habitations"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
  {
    id: "automobile-retail",
    label: { fr: "Automobile & Retail", en: "Automotive & Retail" },
    clientIds: ["rrg"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
  {
    id: "culture-public",
    label: { fr: "Culture & secteur public", en: "Culture & public sector" },
    clientIds: ["musees-de-france"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
  {
    id: "services-it",
    label: { fr: "Services IT", en: "IT services" },
    clientIds: ["econocom"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
  {
    id: "rh-services",
    label: { fr: "RH & Services", en: "HR & Services" },
    clientIds: ["adecco"],
    hasNamedReference: false,
    text: {
      fr: "Étude de cas disponible sous NDA — nous contacter pour un échange avec les équipes ayant piloté ce projet.",
      en: "Case study available under NDA — contact us to speak with the teams who ran this project.",
    },
  },
];
