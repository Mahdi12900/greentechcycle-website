"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";
import { PRICE_ANCHORS } from "@/content/pricing";

export default function EffacementSecurisePage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "effacement-securise",
    eyebrow: tx("02 · Sécurité des données", "02 · Data security"),
    title: tx("Effacement sécurisé", "Secure data erasure"),
    subtitle: tx(
      "Quand un poste sort de votre organisation, ce n'est pas la machine qui inquiète : ce sont les fichiers qu'elle a hébergés. Nous garantissons un effacement opposable, attesté actif par actif, archivé dix ans.",
      "When a device leaves your organisation, it isn't the machine that worries you: it's the files it has hosted. We guarantee admissible erasure, attested asset by asset, archived for ten years."
    ),
    description: tx(
      "Trois familles de méthodes coexistent dans le monde de l'effacement, et choisir la mauvaise revient à laisser une porte ouverte. Nous appliquons NIST 800-88 dans la majorité des cas, DoD 5220.22-M sur les environnements historiquement sensibles, et IEEE 2883-2022 sur les SSD modernes où les méthodes anciennes deviennent inopérantes. Chaque opération est tracée, horodatée et signée. Un audit interne est déclenché automatiquement sur chaque lot, nous ne vous laissons pas vérifier seul.",
      "Three families of erasure methods coexist, and picking the wrong one leaves a door open. We apply NIST 800-88 in the majority of cases, DoD 5220.22-M for historically sensitive environments, and IEEE 2883-2022 for modern SSDs where legacy methods become ineffective. Every operation is logged, timestamped and signed. An internal audit is automatically triggered for each batch, you don't verify on your own."
    ),
    narrative: tx(
      "L'effacement n'est pas une commande dans un script : c'est une chaîne contrôlée, exécutée en zone sécurisée par des opérateurs habilités, sous le principe du double regard pour les opérations irréversibles. Voici comment elle se déroule.",
      "Erasure isn't a command in a script: it's a controlled chain, executed in a secure zone by cleared operators, under the four-eyes principle for irreversible operations. Here is how it unfolds."
    ),
    deliveryNarrative: tx(
      "À la fin de la mission, vous tenez en main les preuves dont vos commissaires aux comptes, votre RSSI et vos auditeurs CNIL ont besoin. Pas de courriels d'engagement, pas de captures d'écran : des certificats individuels, signés et opposables.",
      "At the end of the mission, you hold the evidence your auditors, CISO and data protection officers actually need. No commitment emails, no screenshots: individual, signed, admissible certificates."
    ),
    icon: ShieldCheck,
    badge: tx("Certificat sous 24 h", "Certificate within 24h"),
    image: "/photos/service-effacement.jpg",
    imageAlt: tx(
      "Opérateur appliquant un effacement NIST 800-88 sur un disque dur",
      "Operator applying NIST 800-88 erasure on a hard drive"
    ),
    imageSecondary:
      "/photos/service-effacement.jpg",
    imageSecondaryAlt: tx(
      "Salle d'effacement sécurisée avec disques en attente de traitement",
      "Secure erasure room with drives awaiting processing"
    ),
    benefits: [
      tx("Méthodologie NIST 800-88 (Clear, Purge, Destroy)", "NIST 800-88 methodology (Clear, Purge, Destroy)"),
      tx("Standard militaire DoD 5220.22-M trois passes", "DoD 5220.22-M three-pass military standard"),
      tx("IEEE 2883-2022 pour SSD et NVMe modernes", "IEEE 2883-2022 for modern SSDs and NVMe"),
      tx("Audit de sécurité interne sur chaque opération", "Internal security audit on every operation"),
      tx("Certificat signé et empreinte SHA-256 par actif", "Signed certificate and SHA-256 hash per asset"),
      tx("Destruction physique si le support est irrécupérable", "Physical destruction if the device is unrecoverable"),
    ],
    proof: [
      { value: "24", unit: "h", label: tx("certificat délivré", "certificate delivered") },
      { value: "99,97", unit: "%", label: tx("taux de réussite mesuré", "measured success rate") },
      { value: "10", unit: tx("ans", "yrs"), label: tx("archivage des preuves", "evidence archival") },
    ],
    methodology: {
      title: tx("Quatre étapes, zéro angle mort", "Four steps, zero blind spot"),
      intro: "",
      steps: [
        {
          title: tx("Classification des supports", "Media classification"),
          desc: tx(
            "Nous identifions le type de support (disque mécanique, SSD, NVMe, bande) et la sensibilité des données qu'il contient. Cette classification dicte la méthode appliquée et le niveau de preuve attendu.",
            "We identify the media type (mechanical disk, SSD, NVMe, tape) and the sensitivity of the data it carries. This classification dictates the method applied and the level of evidence expected."
          ),
        },
        {
          title: tx("Sélection de la méthode", "Method selection"),
          desc: tx(
            "Clear pour les données non sensibles, Purge pour les données sensibles avec vérification forensique, Destroy pour les données classifiées. Le choix est documenté et validé par votre RSSI avant exécution.",
            "Clear for non-sensitive data, Purge for sensitive data with forensic verification, Destroy for classified data. The choice is documented and validated by your CISO before execution."
          ),
        },
        {
          title: tx("Exécution sous supervision", "Supervised execution"),
          desc: tx(
            "Effacement en zone sécurisée, vidéosurveillance haute définition, principe du double regard pour Purge et Destroy. Aucun support ne quitte la zone tant que sa preuve n'est pas générée.",
            "Erasure performed in a secure zone, high-definition video surveillance, four-eyes principle for Purge and Destroy. No device leaves the area until its proof is generated."
          ),
        },
        {
          title: tx("Vérification et certificat", "Verification and certificate"),
          desc: tx(
            "Échantillonnage aléatoire, tentative de récupération forensique, génération du certificat individuel horodaté (empreinte SHA-256). Chaque preuve est versée à votre dossier accessible à tout moment.",
            "Random sampling, forensic recovery attempt, generation of a timestamped individual certificate (SHA-256 fingerprint). Every proof is filed in your dossier, accessible at any time."
          ),
        },
      ],
    },
    deliverables: [
      tx("Certificat d'effacement horodaté (SHA-256) par actif", "Timestamped erasure certificate (SHA-256) per asset"),
      tx("Rapport consolidé par lot ou par mission", "Consolidated report per batch or mission"),
      tx("Vidéo horodatée des opérations", "Timestamped operation video"),
      tx("Registre cryptographique chaîné SHA-256", "SHA-256 chained cryptographic register"),
    ],
    sla: [
      { metric: tx("Délai de remise du certificat", "Certificate turnaround"), value: "24 h" },
      { metric: tx("Taux de réussite de l'effacement", "Erasure success rate"), value: "99,97 %" },
      { metric: tx("Archivage des preuves", "Evidence archival"), value: tx("10 ans", "10 yrs") },
    ],
    certifications: ["NIST 800-88 rev2", "DoD 5220.22-M", "IEEE 2883-2022", "ISO 27001 (en cours)"],
    quote: {
      text: tx(
        "Quatre jours d'audit ACPR, zéro question restée sans preuve. Le registre horodaté de GreenTechCycle a fait taire les inspecteurs en quinze minutes.",
        "Four days of regulatory audit, zero question left without proof. GreenTechCycle's timestamped register silenced the inspectors in fifteen minutes."
      ),
      name: "Marc B.",
      role: tx("RSSI, banque CAC 40", "CISO, CAC 40 bank"),
    },
    faq: [
      {
        q: tx("Quelle différence entre Clear, Purge et Destroy ?", "What's the difference between Clear, Purge and Destroy?"),
        a: tx(
          "Clear : écrasement logique standard, suffisant pour des données non sensibles. Purge : écrasement renforcé avec vérification forensique, exigé pour les données sensibles. Destroy : destruction physique du support (broyage ou démagnétisation) pour les données classifiées.",
          "Clear: standard logical overwrite, sufficient for non-sensitive data. Purge: enhanced overwrite with forensic verification, required for sensitive data. Destroy: physical destruction of the device (shredding or degaussing) for classified data."
        ),
      },
      {
        q: tx("L'effacement est-il possible sur site ?", "Is on-site erasure possible?"),
        a: tx(
          "Oui. Nous déployons des unités mobiles d'effacement pour les actifs qui ne doivent pas quitter vos locaux. Les conditions de sécurité (zone fermée, double regard, vidéosurveillance) sont strictement identiques à celles de notre centre.",
          "Yes. We deploy mobile erasure units for assets that must not leave your premises. Security conditions (sealed area, four-eyes principle, video surveillance) are strictly identical to our centre."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver une mission", "Book a mission"),
    ctaSecondaryLabel: tx("Voir notre démarche de conformité", "See our compliance approach"),
    ctaSecondaryHref: "/securite",
    pricingAnchor: tx(PRICE_ANCHORS.itad.fr, PRICE_ANCHORS.itad.en),
    pricingHref: "/tarifs",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
