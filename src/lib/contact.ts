/**
 * Identité légale et canaux de contact — source unique (phase 3, 2026-10-04).
 *
 * LEGAL : uniquement ce qu'indique la fiche Pappers lue le 2026-10-04
 * (https://www.pappers.fr/entreprise/waki-cloud-solution-891123952). Rien d'autre.
 *
 * Canaux : le numéro WhatsApp et l'email de contact ne sont pas encore connus.
 * Ils sont lus dans les variables d'environnement publiques (injectées au build) ;
 * un canal non configuré n'est simplement pas affiché. Aucun téléphone n'est
 * publié tant qu'il n'est pas confirmé.
 */

export const LEGAL = {
  name: "WAKI CLOUD SOLUTION",
  form: { fr: "SASU, société par actions simplifiée unipersonnelle", en: "SASU (French single-shareholder simplified joint-stock company)" },
  siren: "891 123 952",
  rcs: "891 123 952 R.C.S. Meaux",
  capital: { fr: "5 150,00 €", en: "€5,150.00" },
  street: "3 rue des Tournelles",
  postalCode: "77174",
  city: "Villeneuve-Saint-Denis",
  country: "FR",
  source: "https://www.pappers.fr/entreprise/waki-cloud-solution-891123952",
  readOn: "2026-10-04",
} as const;

/** Numéro WhatsApp au format international, chiffres uniquement (ex. 33612345678). */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/** Email de contact public. Vide = canal masqué. */
export const CONTACT_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim())
  ? (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim()
  : "";

/** Lien click-to-chat WhatsApp (wa.me) avec message pré-rempli, ou null si non configuré. */
export function whatsappHref(message: string): string | null {
  if (WHATSAPP_NUMBER.length < 8) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Lien mailto pré-rempli, ou null si l'email de contact n'est pas configuré. */
export function mailtoHref(subject: string, body = ""): string | null {
  if (!CONTACT_EMAIL) return null;
  const q = new URLSearchParams({ subject, ...(body ? { body } : {}) }).toString().replace(/\+/g, "%20");
  return `mailto:${CONTACT_EMAIL}?${q}`;
}

/** Messages pré-remplis par langue. */
export const PREFILL = {
  fr: {
    whatsapp: "Bonjour GreenTechCycle, je souhaite échanger sur la fin de vie de notre parc IT.",
    subject: "Demande de contact — GreenTechCycle",
  },
  en: {
    whatsapp: "Hello GreenTechCycle, I would like to discuss the end of life of our IT fleet.",
    subject: "Contact request — GreenTechCycle",
  },
} as const;
