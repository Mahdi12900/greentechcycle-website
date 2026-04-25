"use client";

import { Shield } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function CybersecuritePage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("05 -- Defense-grade", "05 -- Defense-grade"),
    title: tx("Cybersecurite ITAD", "ITAD Cybersecurity"),
    subtitle: tx(
      "Chaine de garde scellee eIDAS, PV d'huissier, zero trust, videosurveillance HD archivee 10 ans. Le niveau de preuve que vos RSSI et auditeurs exigent.",
      "eIDAS-sealed chain of custody, bailiff reports, zero trust, HD video surveillance archived 10 years. The evidence level your CISOs and auditors demand."
    ),
    description: tx(
      "Les autres brokers ITAD traitent la securite comme une case a cocher. Pour nous, c'est la colonne vertebrale de la plateforme. Proces-verbal d'huissier, identites verifiees, background checks, scelles numerotes, GPS, videosurveillance -- chaque asset qui quitte vos locaux est protege par un protocole de niveau Defense, audite, tracable, et juridiquement opposable. 8 controles imbriques generent un dossier de preuves complet.",
      "Other ITAD brokers treat security as a checkbox. For us, it is the backbone of the platform. Bailiff report, verified identities, background checks, numbered seals, GPS, video surveillance -- every asset leaving your premises is protected by a defense-grade protocol, audited, traceable, and legally admissible."
    ),
    icon: Shield,
    badge: tx("Niveau Defense", "Defense-grade"),
    image: "/images/cybersecurity.jpg",
    imageAlt: tx("Zone securisee d'effacement sous videosurveillance", "Secure erasure zone under video surveillance"),
    benefits: [
      tx("Proces-verbal d'huissier sur place", "On-site bailiff report"),
      tx("Verification d'identite des intervenants", "Operator identity verification"),
      tx("Background check et habilitation annuelle", "Background check and annual clearance"),
      tx("Scelles physiques numerotes inviolables", "Tamper-evident numbered physical seals"),
      tx("Tracabilite GPS temps reel du convoi", "Real-time GPS convoy tracking"),
      tx("Videosurveillance HD archivee 10 ans (AES-256)", "HD video archived 10 years (AES-256)"),
      tx("Registre horodaté signe eIDAS", "eIDAS-signed timestamped register"),
      tx("Preuves cryptographiques chainées SHA-256", "SHA-256 chained cryptographic proofs"),
    ],
    methodology: {
      title: tx("Protocole de chaine de garde", "Chain of custody protocol"),
      steps: [
        { title: tx("Constat d'huissier", "Bailiff report"), desc: tx("Un huissier de justice constate l'etat des lieux, les numeros de serie, les scelles. Acte authentique opposable.", "A bailiff records the state of premises, serial numbers, seals. Authentic legal document, court-admissible.") },
        { title: tx("Scellement et convoyage", "Sealing and transport"), desc: tx("Scelles inviolables, plaques d'immatriculation enregistrees, chauffeur nomme, GPS temps reel, alerte ecart > 500 m.", "Tamper-evident seals, registered plates, named driver, real-time GPS, deviation alert > 500 m.") },
        { title: tx("Traitement en zone securisee", "Secure zone processing"), desc: tx("Zone air-gap, acces biometrique, videosurveillance H24, principe du double regard sur chaque operation irreversible.", "Air-gapped zone, biometric access, 24/7 video, four-eyes principle on every irreversible operation.") },
        { title: tx("Dossier de preuves", "Evidence file"), desc: tx("PV huissier, scans d'identite, photos scelles, enregistrement GPS, videos horodatees, registre cryptographique -- consolide dans un PDF signe eIDAS.", "Bailiff report, ID scans, seal photos, GPS log, timestamped videos, cryptographic register -- consolidated in an eIDAS-signed PDF.") },
      ],
    },
    deliverables: [
      tx("Dossier de preuves PDF signe eIDAS", "eIDAS-signed evidence file PDF"),
      tx("PV d'huissier (acte authentique)", "Bailiff report (authentic legal document)"),
      tx("Videos horodatees des operations", "Timestamped operation videos"),
      tx("Registre cryptographique blockchain", "Blockchain cryptographic register"),
    ],
    sla: [
      { metric: tx("Intervenants verifies", "Verified operators"), value: "100 %" },
      { metric: tx("Archivage preuves", "Evidence archival"), value: "10 ans" },
      { metric: tx("Alerte ecart GPS", "GPS deviation alert"), value: "< 500 m" },
    ],
    certifications: ["R2v3", "ISO 27001", "eIDAS", "NIST 800-88", "HMG IS5"],
    faq: [
      { q: tx("Le PV d'huissier est-il systematique ?", "Is the bailiff report systematic?"), a: tx("Il est recommande pour les operations sensibles (IGI 1300, donnees financieres, sante). Il est optionnel sur les lots a risque standard.", "It is recommended for sensitive operations (restricted distribution, financial data, healthcare). It is optional for standard-risk batches.") },
      { q: tx("Puis-je visionner les operations en direct ?", "Can I watch operations live?"), a: tx("Oui, la plateforme offre un acces en visionnage direct depuis votre dashboard pour les operations de destruction et d'effacement.", "Yes, the platform offers live viewing access from your dashboard for destruction and erasure operations.") },
    ],
    ctaPrimary: { label: tx("Parler a un expert securite", "Talk to a security expert"), href: "/contact?ref=service-cyber" },
    ctaSecondary: { label: tx("Voir la page securite", "See security page"), href: "/securite" },
  };

  return <ServicePageTemplate data={data} />;
}
