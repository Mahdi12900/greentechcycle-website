/**
 * FAQ de la page /tarifs — partagée entre la page et le JSON-LD FAQPage (tarifs/layout.tsx).
 * Les montants cités reprennent la liste publique src/content/pricing.ts (2026-10-06).
 */

export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_FAQ: { fr: PricingFaq[]; en: PricingFaq[] } = {
  fr: [
    {
      q: "Quel palier choisir ?",
      a: "Essentials suffit pour inventorier jusqu'à 2 000 actifs et suivre l'âge et la fin de support. Passez en Professional dès que vous planifiez les renouvellements ou connectez SAP, Oracle ou ServiceNow (1 connecteur inclus), jusqu'à 50 000 actifs. Enterprise, à partir de 2 000 actifs, ajoute le risque de panne et la prévision budgétaire, SSO + SCIM, une sandbox et jusqu'à 5 connecteurs. Pour Waki Box : Essentiel (1 borne), Confort (2 bornes), Premium (4 bornes et plus, multi-sites). Le plus simple reste l'essai gratuit de 90 jours sur votre propre parc.",
    },
    {
      q: "Pourquoi un tarif par tranche ?",
      a: "Plus le parc est grand, moins l'unité coûte. La tarification est progressive, comme un barème d'impôt : les 50 premiers actifs sont facturés au prix de la tranche 1–50, les 100 suivants au prix de la tranche 51–150, etc. Exemple Essentials à 500 actifs : 50 × 8,50 + 100 × 7,00 + 100 × 5,50 + 250 × 3,30 = 2 500 € HT/mois, soit 5,00 € par actif. Il n'y a jamais d'effet de seuil : 51 actifs ne coûtent jamais moins cher que 50. La même règle s'applique aux services ITAD, par catégorie d'appareil commandée.",
    },
    {
      q: "Comment fonctionne le rachat net de frais ?",
      a: "Au devis, nous estimons la valeur de rachat de vos équipements (selon catégorie et état) et les frais de collecte. Si la valeur couvre au moins 1,5 fois les frais, la collecte est offerte : les frais sont simplement déduits du rachat et vous recevez le solde. Sinon, la collecte est facturée au prix liste et le rachat vous est payé après audit. Règle simple : en Île-de-France, la collecte standard est offerte sans calcul dès 20 appareils en bon état (grade A/B) par enlèvement. Les appareils de moins de 10 € de valeur ne donnent pas de crédit. Une collecte offerte n'est jamais refacturée après audit.",
    },
    {
      q: "Qu'est-ce qui est dans le socle, qu'est-ce qui est en module ?",
      a: "Le socle Asset Management (inventaire, import, indicateurs de fin de support, et selon l'édition renouvellements, prévision, connecteurs, SSO) est inclus dans le prix par actif. Les modules s'ajoutent à n'importe quelle édition : OT/IoT Visibility, collecteur OT, connecteurs natifs supplémentaires, orchestration ITAD, Carbone et CSRD, Pack Conformité. Les services ITAD, la collecte et Waki Box sont facturés à l'usage, indépendamment de l'abonnement.",
    },
    {
      q: "Que se passe-t-il à la fin de l'essai gratuit ?",
      a: "L'essai dure 90 jours (une prolongation de 30 jours possible), jusqu'à 300 actifs IT et 3 utilisateurs, sans carte bancaire. À la fin, vous choisissez une édition, ou votre compte bascule sur le palier gratuit permanent (50 actifs, 1 utilisateur, lecture seule). Les données au-delà de 50 actifs sont conservées 30 jours, puis supprimées. L'essai n'inclut pas l'OT/IoT, le Pack Conformité, le CSRD ni l'IA.",
    },
    {
      q: "Comment fonctionnent les crédits IA ?",
      a: "Un crédit correspond à une question d'audit traitée par l'assistant IA, avec citation des preuves. Le Pack Conformité Essentials inclut 300 crédits par an, Professional 2 000. Au-delà : 1 100 € HT par tranche de 1 000 crédits, ou packs prépayés à −10 % et −20 %. Les crédits annuels ne sont pas reportés ; une alerte vous prévient à 80 % de consommation. Chaque réponse de l'IA est un brouillon que vous validez.",
    },
    {
      q: "À quoi sert le constat par commissaire de justice (P3) ?",
      a: "Le commissaire de justice est un officier public : présent sur site, il dresse un procès-verbal de constat (inventaire, méthode, numéros de série, photos) à forte valeur probante, utile en banque, assurance, santé ou en cas de litige. Prix : 1 765 € HT par intervention jusqu'à 3 heures, 550 € HT l'heure supplémentaire ; ses honoraires sont refacturés sur son devis préalable, le déplacement hors zone au réel + 10 %. La preuve numérique P1 (SHA-256, certificat par actif, journal d'audit chaîné) reste incluse dans chaque prix.",
    },
    {
      q: "Les prix sont-ils HT ? Sont-ils indexés ?",
      a: "Tous les prix sont hors taxes ; la TVA applicable en France métropolitaine est de 20 %. Une indexation annuelle est prévue, plafonnée à 3 %, notifiée 60 jours avant application. Les déplacements sont inclus en Île-de-France ; ailleurs, ils sont refacturés au réel + 10 %.",
    },
    {
      q: "Le Pilote GTC à 2 800 € HT est-il déductible ?",
      a: "Oui. Si vous signez un contrat Plateforme dans les 90 jours suivant la restitution du Pilote, les 2 800 € HT sont déduits de votre première facture annuelle.",
    },
    {
      q: "Quels modes de paiement acceptez-vous ?",
      a: "Prélèvement SEPA (recommandé), carte bancaire et virement. Les abonnements sont facturés annuellement à l'avance, ou mensuellement sans engagement avec une majoration de 20 %.",
    },
  ],
  en: [
    {
      q: "Which tier should I choose?",
      a: "Essentials is enough to inventory up to 2,000 assets and track age and end of support. Move to Professional as soon as you plan renewals or connect SAP, Oracle or ServiceNow (1 connector included), up to 50,000 assets. Enterprise, from 2,000 assets, adds failure risk and budget forecasting, SSO + SCIM, a sandbox and up to 5 connectors. For Waki Box: Essentiel (1 kiosk), Confort (2 kiosks), Premium (4+ kiosks, multi-site). The simplest way to decide is the free 90-day trial on your own fleet.",
    },
    {
      q: "Why tiered (banded) pricing?",
      a: "The larger the fleet, the lower the unit price. Pricing is graduated, like a tax scale: the first 50 assets are billed at the 1–50 band price, the next 100 at the 51–150 band price, and so on. Example, Essentials at 500 assets: 50 × €8.50 + 100 × €7.00 + 100 × €5.50 + 250 × €3.30 = €2,500 ex-VAT/month, i.e. €5.00 per asset. There is never a threshold effect: 51 assets never cost less than 50. The same rule applies to ITAD services, per device category ordered.",
    },
    {
      q: 'How does "buyback net of fees" work?',
      a: "In the quote, we estimate the buyback value of your equipment (by category and condition) and the pick-up fees. If the value covers at least 1.5 times the fees, the pick-up is free: the fees are simply deducted from the buyback and you receive the balance. Otherwise, the pick-up is billed at list price and the buyback is paid after audit. Simple rule: in Île-de-France, the standard pick-up is free with no calculation from 20 devices in good condition (grade A/B) per collection. Devices worth under €10 earn no credit. A free pick-up is never re-billed after audit.",
    },
    {
      q: "What is in the core, and what is a module?",
      a: "The Asset Management core (inventory, import, end-of-support indicators, and depending on the edition renewals, forecasting, connectors, SSO) is included in the per-asset price. Modules add on to any edition: OT/IoT Visibility, OT collector, extra native connectors, ITAD orchestration, Carbon & CSRD, Compliance pack. ITAD services, pick-up and Waki Box are billed on usage, independently of the subscription.",
    },
    {
      q: "What happens at the end of the free trial?",
      a: "The trial lasts 90 days (one 30-day extension possible), up to 300 IT assets and 3 users, no credit card. At the end, you choose an edition, or your account moves to the permanent free tier (50 assets, 1 user, read-only). Data beyond 50 assets is kept for 30 days, then deleted. The trial excludes OT/IoT, the Compliance pack, CSRD and AI.",
    },
    {
      q: "How do AI credits work?",
      a: "One credit is one audit question handled by the AI assistant, with the evidence cited. The Compliance pack Essentials includes 300 credits a year, Professional 2,000. Beyond that: €1,100 ex-VAT per 1,000 credits, or prepaid packs at −10% and −20%. Annual credits do not roll over; an alert warns you at 80% usage. Every AI answer is a draft that you approve.",
    },
    {
      q: "What is the commissaire de justice statement (P3) for?",
      a: "A commissaire de justice is a French public court officer: on site, they draw up an official statement (inventory, method, serial numbers, photos) with high evidential value, useful in banking, insurance, healthcare or in case of dispute. Price: €1,765 ex-VAT per intervention up to 3 hours, €550 ex-VAT per extra hour; their fees are passed through on their prior quote, travel outside the zone at cost + 10%. P1 digital proof (SHA-256, per-asset certificate, chained audit log) remains included in every price.",
    },
    {
      q: "Are prices ex-VAT? Are they indexed?",
      a: "All prices are ex-VAT; the applicable VAT rate in mainland France is 20%. Annual indexation is capped at 3%, notified 60 days before it applies. Travel is included in Île-de-France; elsewhere it is billed at cost + 10%.",
    },
    {
      q: "Is the €2,800 ex-VAT GTC Pilot deductible?",
      a: "Yes. If you sign a Platform contract within 90 days of the Pilot debrief, the €2,800 ex-VAT is deducted from your first annual invoice.",
    },
    {
      q: "What payment methods do you accept?",
      a: "SEPA direct debit (recommended), card and wire transfer. Subscriptions are billed annually in advance, or monthly with no commitment at a 20% uplift.",
    },
  ],
};
