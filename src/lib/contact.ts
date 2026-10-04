/**
 * Identité légale et canaux de contact — source unique (phase 3, 2026-10-04).
 *
 * LEGAL : uniquement ce qu'indique la fiche Pappers lue le 2026-10-04
 * (https://www.pappers.fr/entreprise/waki-cloud-solution-891123952). Rien d'autre.
 *
 * Canaux : WhatsApp = +33 7 45 01 32 39 par défaut (variable d'environnement
 * prioritaire) ; emails sales / support / lab.rd / noreply (voir EMAILS).
 * Aucun téléphone n'est publié tant qu'il n'est pas confirmé.
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

/**
 * Numéro WhatsApp au format international, chiffres uniquement.
 * Valeur par défaut : +33 7 45 01 32 39 (communiqué par GreenTechCycle le 2026-10-04),
 * surchargeable par NEXT_PUBLIC_WHATSAPP_NUMBER.
 */
const WHATSAPP_DEFAULT = "33745013239";
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_DEFAULT).replace(/\D/g, "");

/**
 * Adresses email publiques GreenTechCycle (communiquées le 2026-10-04).
 * - sales   : contact commercial (démo, devis, formulaire « commercial », bouton email de /contact) ;
 *             surchargeable par NEXT_PUBLIC_CONTACT_EMAIL ;
 * - support : clients existants / support (formulaire « support », pied de page) ;
 * - lab     : lab R&D, partenariats, « projet de lab » (uniquement là où le sujet existe déjà) ;
 * - noreply : expéditeur des emails automatiques — JAMAIS affichée comme contact.
 */
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const envSales = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();

export const EMAILS = {
  sales: isEmail(envSales) ? envSales : "sales@greentechcycle.fr",
  support: "support@greentechcycle.fr",
  lab: "lab.rd@greentechcycle.fr",
  noreply: "noreply@greentechcycle.fr",
} as const;

/** Email de contact principal (commercial). */
export const CONTACT_EMAIL = EMAILS.sales;

/** Sujets du formulaire de contact → destinataire interne. */
export type ContactTopic = "commercial" | "support" | "lab";
export const CONTACT_TOPICS: Record<ContactTopic, { recipient: string; label: { fr: string; en: string } }> = {
  commercial: {
    recipient: EMAILS.sales,
    label: { fr: "Commercial : démo, devis, nouveau projet", en: "Sales: demo, quote, new project" },
  },
  support: {
    recipient: EMAILS.support,
    label: { fr: "Support : je suis déjà client", en: "Support: I am an existing client" },
  },
  lab: {
    recipient: EMAILS.lab,
    label: { fr: "Lab R&D ou partenariat", en: "R&D lab or partnership" },
  },
};
export const isContactTopic = (v: unknown): v is ContactTopic =>
  typeof v === "string" && Object.prototype.hasOwnProperty.call(CONTACT_TOPICS, v);

/** Lien click-to-chat WhatsApp (wa.me) avec message pré-rempli, ou null si non configuré. */
export function whatsappHref(message: string): string | null {
  if (WHATSAPP_NUMBER.length < 8) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Lien mailto pré-rempli vers `to` (commercial par défaut). */
export function mailtoHref(subject: string, body = "", to: string = CONTACT_EMAIL): string | null {
  if (!isEmail(to)) return null;
  const q = new URLSearchParams({ subject, ...(body ? { body } : {}) }).toString().replace(/\+/g, "%20");
  return `mailto:${to}?${q}`;
}

/** Messages pré-remplis par langue. */
export const PREFILL = {
  fr: {
    whatsapp: "Bonjour GreenTechCycle, je souhaite échanger sur la fin de vie de notre parc IT.",
    subject: "Demande de contact — GreenTechCycle",
    supportSubject: "Support client — GreenTechCycle",
    labSubject: "Projet de lab / partenariat R&D — GreenTechCycle",
  },
  en: {
    whatsapp: "Hello GreenTechCycle, I would like to discuss the end of life of our IT fleet.",
    subject: "Contact request — GreenTechCycle",
    supportSubject: "Client support — GreenTechCycle",
    labSubject: "Lab project / R&D partnership — GreenTechCycle",
  },
} as const;
