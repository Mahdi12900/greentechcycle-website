/**
 * Clients GreenTechCycle cités publiquement (liste communiquée par l'utilisateur le 2026-10-04).
 *
 * Affichage : wordmarks typographiques monochromes (DESIGN.md v2), sans logo officiel :
 * aucun fichier de logo n'a été fourni et les autorisations d'usage des marques ne sont
 * pas connues. Pour afficher un logo officiel plus tard, déposer le fichier (SVG monochrome
 * de préférence) dans /public/clients/ et renseigner `logo` ; le composant ClientWordmarks
 * l'utilisera automatiquement.
 *
 * Ces noms ne sont rattachés à AUCUNE étude de cas ni à aucun chiffre : les cas clients
 * restent anonymisés (seul le cas TF1, déjà public, est nommé).
 *
 * Orthographe : « Agirc-Arrco » (saisi « Aggirc Arcco ») et « Adecco » (saisi « Addecco »)
 * sont normalisés ; « Groupe ADF Habitations » et « Les musées de France » sont repris
 * tels qu'écrits par l'utilisateur.
 */
export interface Client {
  id: string;
  name: string;
  /** Chemin d'un logo officiel (ex. "/clients/tf1.svg") — vide tant qu'il n'est pas fourni */
  logo?: string;
}

export const CLIENTS: Client[] = [
  { id: "tf1", name: "TF1" },
  { id: "bouygues", name: "Groupe Bouygues" },
  { id: "agirc-arrco", name: "Agirc-Arrco" },
  { id: "adf-habitations", name: "Groupe ADF Habitations" },
  { id: "rrg", name: "RRG – Renault Retail Group" },
  { id: "musees-de-france", name: "Les musées de France" },
  { id: "econocom", name: "Econocom" },
  { id: "adecco", name: "Adecco" },
  { id: "vivendi", name: "Groupe Vivendi" },
];
