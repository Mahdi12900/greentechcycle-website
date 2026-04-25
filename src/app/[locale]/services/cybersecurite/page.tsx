"use client";

import { Shield } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function CybersecuritePage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "cybersecurite-itad",
    eyebrow: tx("05 — Niveau Défense", "05 — Defence-grade"),
    title: tx("Cybersécurité ITAD", "ITAD cybersecurity"),
    subtitle: tx(
      "Les autres acteurs traitent la sécurité comme une case à cocher. Pour nous, c'est la colonne vertébrale du métier : huissier, scellés numérotés, GPS, vidéosurveillance archivée dix ans, registre signé eIDAS.",
      "Other ITAD vendors treat security as a checkbox. For us, it is the spine of the trade: bailiff, numbered seals, GPS, video surveillance archived for ten years, eIDAS-signed register."
    ),
    description: tx(
      "Quand un actif sort de vos locaux, vous transférez une responsabilité. Si une donnée fuit en chemin, c'est votre nom qui apparaît dans la presse — pas celui du transporteur. Notre protocole de chaîne de garde a été conçu avec d'anciens RSSI bancaires et de défense pour produire un dossier juridiquement opposable. Procès-verbal d'huissier, vérification d'identité des intervenants, vérification d'antécédents annuelle, scellés inviolables, suivi GPS, vidéosurveillance haute définition. Huit contrôles imbriqués générant un dossier de preuves complet.",
      "When an asset leaves your premises, you transfer a responsibility. If data leaks in transit, it is your name that hits the press — not the carrier's. Our chain of custody protocol was built with former banking and defence CISOs to produce a legally admissible dossier. Bailiff report, operator identity verification, annual background screening, tamper-evident seals, GPS tracking, high-definition video surveillance. Eight interlocked controls producing a complete evidence file."
    ),
    narrative: tx(
      "Le protocole n'est ni un document marketing ni une charte interne : c'est un enchaînement industriel, audité chaque année par un cabinet externe, gravé dans nos contrats. Voici comment il se déroule.",
      "The protocol is neither a marketing document nor an internal charter: it is an industrial sequence, audited every year by an external firm, written into our contracts. Here is how it unfolds."
    ),
    deliveryNarrative: tx(
      "Vous repartez avec un dossier opposable devant un tribunal, pas avec une attestation sur l'honneur. Acte d'huissier authentique, vidéos horodatées, registre cryptographique chaîné — la totalité scellée dans un PDF signé eIDAS.",
      "You leave with a court-admissible dossier, not a self-attested certificate. Authentic bailiff record, timestamped videos, chained cryptographic register — all sealed in an eIDAS-signed PDF."
    ),
    icon: Shield,
    badge: tx("Niveau Défense", "Defence-grade"),
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80",
    imageAlt: tx(
      "Salle d'effacement sécurisée sous vidéosurveillance",
      "Secure erasure room under video surveillance"
    ),
    imageSecondary:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1600&q=80",
    imageSecondaryAlt: tx(
      "Convoyage sécurisé d'équipements informatiques",
      "Secure convoy of IT equipment"
    ),
    benefits: [
      tx("Procès-verbal d'huissier sur site", "On-site bailiff report"),
      tx("Vérification d'identité des intervenants", "Operator identity verification"),
      tx("Vérification d'antécédents et habilitation annuelle", "Annual background screening and clearance"),
      tx("Scellés physiques numérotés inviolables", "Tamper-evident numbered physical seals"),
      tx("Traçabilité GPS temps réel du convoi", "Real-time GPS convoy tracking"),
      tx("Vidéosurveillance haute définition archivée 10 ans (AES-256)", "HD video archived 10 years (AES-256)"),
      tx("Registre horodaté signé eIDAS", "eIDAS-signed timestamped register"),
      tx("Preuves cryptographiques chaînées SHA-256", "SHA-256 chained cryptographic proofs"),
    ],
    proof: [
      { value: "100", unit: "%", label: tx("intervenants vérifiés", "verified operators"), color: "#10B981" },
      { value: "10", unit: tx("ans", "yrs"), label: tx("archivage des preuves", "evidence archival"), color: "#0EA5E9" },
      { value: "<500", unit: "m", label: tx("alerte écart GPS", "GPS deviation alert"), color: "#F59E0B" },
    ],
    methodology: {
      title: tx("Huit contrôles, un seul dossier opposable", "Eight controls, one admissible dossier"),
      intro: "",
      steps: [
        {
          title: tx("Constat d'huissier", "Bailiff report"),
          desc: tx(
            "Un huissier de justice constate l'état des lieux, les numéros de série, la pose des scellés. L'acte authentique qui en résulte est opposable devant n'importe quelle juridiction française et reconnu à l'étranger.",
            "A bailiff records the state of premises, serial numbers, seal placement. The resulting authentic record is admissible before any French jurisdiction and recognised abroad."
          ),
        },
        {
          title: tx("Scellement et convoyage", "Sealing and transport"),
          desc: tx(
            "Scellés inviolables numérotés, plaque d'immatriculation enregistrée, conducteur nommément habilité, suivi GPS temps réel avec alerte automatique en cas d'écart supérieur à 500 mètres de l'itinéraire validé.",
            "Numbered tamper-evident seals, registered licence plate, named cleared driver, real-time GPS tracking with automatic alert if the route deviates by more than 500 metres."
          ),
        },
        {
          title: tx("Traitement en zone sécurisée", "Secure zone processing"),
          desc: tx(
            "Zone air-gap, accès biométrique, vidéosurveillance 24 heures sur 24, principe du double regard sur chaque opération irréversible. Aucun support ne quitte la zone sans preuve générée.",
            "Air-gapped zone, biometric access, 24/7 video surveillance, four-eyes principle on every irreversible operation. No device leaves the zone without a generated proof."
          ),
        },
        {
          title: tx("Constitution du dossier de preuves", "Evidence file build-up"),
          desc: tx(
            "Procès-verbal d'huissier, scans d'identité, photos de scellés, journal GPS, vidéos horodatées, registre cryptographique — l'ensemble est consolidé dans un PDF signé eIDAS, archivé dix ans, accessible à tout moment.",
            "Bailiff report, ID scans, seal photos, GPS log, timestamped videos, cryptographic register — all consolidated in an eIDAS-signed PDF, archived for ten years, accessible at any time."
          ),
        },
      ],
    },
    deliverables: [
      tx("Dossier de preuves PDF signé eIDAS", "eIDAS-signed evidence file PDF"),
      tx("Procès-verbal d'huissier (acte authentique)", "Bailiff report (authentic record)"),
      tx("Vidéos horodatées des opérations", "Timestamped operation videos"),
      tx("Registre cryptographique blockchain", "Blockchain cryptographic register"),
    ],
    sla: [
      { metric: tx("Intervenants vérifiés", "Verified operators"), value: "100 %" },
      { metric: tx("Archivage des preuves", "Evidence archival"), value: tx("10 ans", "10 yrs") },
      { metric: tx("Alerte écart GPS", "GPS deviation alert"), value: "< 500 m" },
    ],
    certifications: ["R2v3", "ISO 27001", "eIDAS", "NIST 800-88", "HMG IS5"],
    quote: {
      text: tx(
        "Quand l'inspection ACPR est arrivée, j'ai posé un seul PDF sur la table. Quinze minutes plus tard, le sujet était clos. C'est ce niveau de preuve que nous attendions depuis dix ans.",
        "When the regulatory inspection arrived, I put a single PDF on the table. Fifteen minutes later, the topic was closed. That's the level of evidence we had been waiting for ten years."
      ),
      name: "Marc B.",
      role: tx("RSSI, banque CAC 40", "CISO, CAC 40 bank"),
    },
    faq: [
      {
        q: tx("Le procès-verbal d'huissier est-il systématique ?", "Is the bailiff report systematic?"),
        a: tx(
          "Il est recommandé pour les opérations sensibles : données financières, données de santé, informations classifiées. Il reste optionnel sur les lots à risque standard. Nous adaptons le niveau au niveau réel de l'enjeu.",
          "It is recommended for sensitive operations: financial data, health data, classified information. It remains optional on standard-risk batches. We adapt the level to the actual stakes."
        ),
      },
      {
        q: tx("Puis-je suivre les opérations en direct ?", "Can I watch operations live?"),
        a: tx(
          "Oui. La console GreenTechCycle offre un accès au visionnage direct des destructions et effacements depuis votre poste. Vos auditeurs peuvent obtenir un accès en lecture pendant la durée de leur mission.",
          "Yes. The GreenTechCycle console provides live viewing of destructions and erasures from your desk. Your auditors can be granted read-only access for the duration of their mission."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver un audit sécurité", "Book a security review"),
    ctaSecondaryLabel: tx("Voir la page sécurité", "See security page"),
    ctaSecondaryHref: "/securite",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
