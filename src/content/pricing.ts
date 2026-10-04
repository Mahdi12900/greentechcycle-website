/**
 * Registre des prix publics GreenTechCycle (grille validée le 2026-10-04).
 *
 * Seul endroit où modifier un prix Plateforme ou Service ITAD : /tarifs (cartes, tableaux,
 * FAQ, JSON-LD schema.org) et les ancres des pages Services, Plateforme et Secteurs lisent
 * ce fichier. Tous les prix sont hors taxes (HT).
 *
 * Choix de formulation (2026-10-04) : la grille validée ne fixait pas la tranche 201–499 actifs.
 * Plutôt qu'un « sur devis » qui laisserait un trou dans une grille annoncée comme publique, le
 * palier Standard couvre 201 à 2 000 actifs « à partir de 2 500 € HT/mois » (prix inchangé).
 *
 * Inchangés : Waki Box (plans, pilote, options), Reporting CSRD 990 € HT/an, Pilote 3 jours
 * 2 900 € HT — ces prix restent dans la page /tarifs.
 */

type L = { fr: string; en: string };

export interface PriceTier {
  id: string;
  name: L;
  /** Montant numérique (€ HT) pour le JSON-LD */
  amount: number;
  /** « à partir de » : le montant est un prix de départ */
  from: boolean;
  /** Prix affiché, unité comprise */
  price: L;
  /** Périmètre du palier */
  scope: L;
  /** Unité schema.org (UnitPriceSpecification.unitText) */
  unitText: string;
}

/** Plateforme GTC SaaS — abonnement mensuel */
export const PLATFORM_TIERS: PriceTier[] = [
  {
    id: "essentiel",
    name: { fr: "Essentiel", en: "Essential" },
    amount: 1400,
    from: false,
    price: { fr: "1 400 € HT/mois", en: "€1,400 ex-VAT/month" },
    scope: { fr: "Jusqu'à 200 actifs", en: "Up to 200 assets" },
    unitText: "mois",
  },
  {
    id: "standard",
    name: { fr: "Standard", en: "Standard" },
    amount: 2500,
    from: true,
    price: { fr: "À partir de 2 500 € HT/mois", en: "From €2,500 ex-VAT/month" },
    scope: { fr: "De 201 à 2 000 actifs", en: "201 to 2,000 assets" },
    unitText: "mois",
  },
  {
    id: "grand-compte",
    name: { fr: "Grand compte", en: "Enterprise" },
    amount: 4.2,
    from: true,
    price: { fr: "À partir de 4,20 € HT/actif/mois", en: "From €4.20 ex-VAT/asset/month" },
    scope: { fr: "Au-delà de 2 000 actifs, puis devis", en: "Above 2,000 assets, then quote" },
    unitText: "actif/mois",
  },
];

/** Service ITAD — prix unitaire par équipement traité */
export const ITAD_TIERS: PriceTier[] = [
  {
    id: "poste",
    name: { fr: "Poste standard", en: "Standard device" },
    amount: 19,
    from: true,
    price: { fr: "À partir de 19 € HT/poste", en: "From €19 ex-VAT/device" },
    scope: { fr: "Par poste de travail, portable ou fixe", en: "Per workstation, laptop or desktop" },
    unitText: "poste",
  },
  {
    id: "complexe",
    name: { fr: "Équipement complexe", en: "Complex equipment" },
    amount: 55,
    from: true,
    price: { fr: "À partir de 55 € HT/unité", en: "From €55 ex-VAT/unit" },
    scope: { fr: "Serveur, baie ou autre équipement complexe", en: "Server, rack or other complex equipment" },
    unitText: "unité",
  },
];

/** Ancres courtes réutilisées dans les pages (prix d'entrée de chaque brique) */
export const PRICE_ANCHORS = {
  platform: { fr: "À partir de 1 400 € HT/mois", en: "From €1,400 ex-VAT/month" },
  platformShort: { fr: "Plateforme dès 1 400 €/mois", en: "Platform from €1,400/month" },
  itad: { fr: "À partir de 19 € HT/poste", en: "From €19 ex-VAT/device" },
  itadShort: { fr: "ITAD dès 19 €/poste", en: "ITAD from €19/device" },
} satisfies Record<string, L>;
