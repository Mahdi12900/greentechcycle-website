"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function EffacementSecurisePage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("02 -- Securite des donnees", "02 -- Data security"),
    title: tx("Effacement Securise", "Secure Data Erasure"),
    subtitle: tx(
      "Methodologies NIST 800-88 (Clear / Purge / Destroy), DoD 5220.22-M, IEEE 2883. Certificat individuel par actif, hash SHA-256, archivage 10 ans.",
      "NIST 800-88 (Clear / Purge / Destroy), DoD 5220.22-M, IEEE 2883 methodologies. Per-asset certificate, SHA-256 hash, 10-year archival."
    ),
    description: tx(
      "Nous appliquons les trois methodologies d'effacement reconnues mondialement selon la sensibilite de vos donnees et le type de media. NIST 800-88 (Clear / Purge / Destroy) pour la grande majorite des cas, DoD 5220.22-M pour les environnements historiquement sensibles, et IEEE 2883-2022 pour les SSD modernes. Chaque operation est tracee, horodatee et genere un certificat signe avec hash SHA-256. Un audit de securite interne est declenche automatiquement sur chaque lot.",
      "We apply the three globally recognized erasure methodologies based on data sensitivity and media type. NIST 800-88 (Clear / Purge / Destroy) for most cases, DoD 5220.22-M for historically sensitive environments, and IEEE 2883-2022 for modern SSDs. Each operation is logged, timestamped and generates a signed certificate with SHA-256 hash."
    ),
    icon: ShieldCheck,
    badge: tx("Certificat sous 24h", "Certificate within 24h"),
    image: "/photos/service-effacement.jpg",
    imageAlt: tx("Operateur effacant un disque selon NIST 800-88", "Operator wiping a disk using NIST 800-88"),
    benefits: [
      tx("Methodologie NIST 800-88 (Clear -- Purge -- Destroy)", "NIST 800-88 methodology (Clear -- Purge -- Destroy)"),
      tx("Standard militaire DoD 5220.22-M 3 passes", "Military DoD 5220.22-M 3-pass standard"),
      tx("IEEE 2883-2022 pour SSD / NVMe modernes", "IEEE 2883-2022 for modern SSD / NVMe"),
      tx("Audit de securite interne sur chaque operation", "Internal security audit on every operation"),
      tx("Certificat signe + hash SHA-256 par asset", "Signed certificate + SHA-256 hash per asset"),
      tx("Destruction physique si irrecuperable", "Physical destruction if unrecoverable"),
    ],
    methodology: {
      title: tx("Processus d'effacement", "Erasure process"),
      steps: [
        { title: tx("Classification des medias", "Media classification"), desc: tx("Identification du type de support (HDD, SSD, NVMe, bande) et du niveau de sensibilite des donnees.", "Identify media type (HDD, SSD, NVMe, tape) and data sensitivity level.") },
        { title: tx("Selection de la methodologie", "Methodology selection"), desc: tx("Choix du protocole adapte : Clear pour donnees non sensibles, Purge pour donnees sensibles, Destroy pour donnees classifiees.", "Select the appropriate protocol: Clear for non-sensitive data, Purge for sensitive data, Destroy for classified data.") },
        { title: tx("Execution sous supervision", "Supervised execution"), desc: tx("Effacement execute en zone securisee, videosurveillance, principe du double regard pour les operations Purge/Destroy.", "Erasure performed in secure zone, video surveillance, four-eyes principle for Purge/Destroy operations.") },
        { title: tx("Verification et certification", "Verification and certification"), desc: tx("Echantillonnage aleatoire, tentative de recuperation forensique, generation du certificat signe eIDAS.", "Random sampling, forensic recovery attempt, eIDAS-signed certificate generation.") },
      ],
    },
    deliverables: [
      tx("Certificat d'effacement signe eIDAS par asset", "eIDAS-signed erasure certificate per asset"),
      tx("Rapport consolide par lot/mission", "Consolidated report per batch/mission"),
      tx("Video horodatee des operations", "Timestamped operation video"),
      tx("Registre cryptographique (hash SHA-256)", "Cryptographic register (SHA-256 hash)"),
    ],
    sla: [
      { metric: tx("Delai certificat", "Certificate turnaround"), value: "24 h" },
      { metric: tx("Taux de reussite effacement", "Erasure success rate"), value: "99,97 %" },
      { metric: tx("Archivage des preuves", "Evidence archival"), value: "10 ans" },
    ],
    certifications: ["NIST 800-88 rev2", "DoD 5220.22-M", "IEEE 2883-2022", "R2v3", "ISO 27001"],
    faq: [
      { q: tx("Quelle difference entre Clear, Purge et Destroy ?", "What's the difference between Clear, Purge and Destroy?"), a: tx("Clear : ecrasement logiciel standard. Purge : ecrasement renforce avec verification forensique. Destroy : destruction physique du media (broyage, demagnetisation).", "Clear: standard logical overwrite. Purge: enhanced overwrite with forensic verification. Destroy: physical destruction of the media (shredding, degaussing).") },
      { q: tx("L'effacement est-il possible sur site ?", "Is on-site erasure possible?"), a: tx("Oui, nous deployons des unites mobiles d'effacement pour les actifs qui ne doivent pas quitter vos locaux.", "Yes, we deploy mobile erasure units for assets that must not leave your premises.") },
    ],
    ctaPrimary: { label: tx("Securiser mes donnees", "Secure my data"), href: "/contact?ref=service-effacement" },
    ctaSecondary: { label: tx("Voir les certifications", "See certifications"), href: "/securite" },
  };

  return <ServicePageTemplate data={data} />;
}
