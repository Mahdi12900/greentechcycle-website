"use client";

import { RefreshCcw } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function ReconditionnementPage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("03 -- Valorisation", "03 -- Value recovery"),
    title: tx("Reconditionnement & Valorisation", "Refurbishment & Value Recovery"),
    subtitle: tx(
      "Maximiser la valeur recuperee sur chaque asset : grading qualite A/B/C, revente B2B, dark store interne, dons en circuit solidaire.",
      "Maximize recovered value on every asset: A/B/C quality grading, B2B resale, internal dark store, charitable donations."
    ),
    description: tx(
      "Chaque asset eligible passe par notre chaine de reconditionnement : diagnostic, remise en etat cosmetique, remplacement des composants defaillants, mise a jour firmware, tests fonctionnels 360 degres, grade qualite (A / B / C). Nous valorisons ensuite les equipements sur nos canaux de revente B2B, en dark store interne pour vos propres collaborateurs, ou en don a des associations eligibles (avec deduction fiscale). Vous recuperez une part significative de la valeur residuelle, validee contractuellement en amont.",
      "Every eligible asset goes through our refurbishment line: diagnostic, cosmetic restoration, component replacement, firmware upgrade, 360-degree functional testing, A/B/C quality grading. We then resell via B2B channels, internal dark store, or charitable donations. You recover a significant share of residual value, contractually locked in advance."
    ),
    icon: RefreshCcw,
    badge: tx("+40 % valeur recuperee", "+40% recovered value"),
    image: "/photos/service-reconditionnement.jpg",
    imageAlt: tx("Ingenieurs inspectant des equipements avant reconditionnement", "Engineers inspecting equipment before refurbishment"),
    benefits: [
      tx("Grading qualite A / B / C norme", "Standardized A / B / C quality grading"),
      tx("Revente B2B + dark store interne + dons", "B2B resale + internal dark store + donations"),
      tx("Part de valeur residuelle reversee au client", "Residual value share returned to client"),
      tx("Garantie 12 mois sur les equipements reconditionnes", "12-month warranty on refurbished equipment"),
      tx("Rapport trimestriel des flux et prix obtenus", "Quarterly flow and price report"),
      tx("Mesure du CO2 evite par reemploi", "CO2 avoided through reuse measurement"),
    ],
    methodology: {
      title: tx("Processus de reconditionnement", "Refurbishment process"),
      steps: [
        { title: tx("Diagnostic complet", "Full diagnostic"), desc: tx("Tests hardware 360 degres, evaluation cosmetique, identification des composants a remplacer.", "360-degree hardware tests, cosmetic evaluation, identification of components to replace.") },
        { title: tx("Remise en etat", "Restoration"), desc: tx("Remplacement des composants defaillants, nettoyage professionnel, mise a jour BIOS/firmware.", "Replace faulty components, professional cleaning, BIOS/firmware update.") },
        { title: tx("Tests et grading", "Testing and grading"), desc: tx("Suite de tests fonctionnels, attribution du grade A/B/C, preinstallation systeme si demande.", "Functional test suite, A/B/C grade assignment, OS pre-installation if requested.") },
        { title: tx("Mise en marche", "Market placement"), desc: tx("Cotation sur le marche reconditionne EMEA, mise en vente sur nos canaux B2B ou cession solidaire.", "EMEA refurbished market valuation, B2B channel listing or charitable transfer.") },
      ],
    },
    deliverables: [
      tx("Rapport de grading par asset", "Per-asset grading report"),
      tx("Fiche produit reconditionne (specs, grade, photos)", "Refurbished product sheet (specs, grade, photos)"),
      tx("Avoir ou facture de valeur residuelle", "Residual value credit note or invoice"),
      tx("Rapport d'impact CO2 evite", "Avoided CO2 impact report"),
      tx("Certificat de cession solidaire (si applicable)", "Charitable transfer certificate (if applicable)"),
    ],
    sla: [
      { metric: tx("Delai de reconditionnement", "Refurbishment turnaround"), value: "10 jours" },
      { metric: tx("Taux de reemploi moyen", "Average reuse rate"), value: "72 %" },
      { metric: tx("Garantie equipements", "Equipment warranty"), value: "12 mois" },
    ],
    certifications: ["R2v3", "ISO 14001", "Boavizta member"],
    faq: [
      { q: tx("Quel pourcentage de valeur puis-je recuperer ?", "What percentage of value can I recover?"), a: tx("En moyenne, nos clients recuperent 40 % de la valeur neuve sur les equipements de moins de 4 ans. Ce taux varie selon l'etat, l'age et la demande marche.", "On average, our clients recover 40% of new value on equipment under 4 years old. This rate varies by condition, age and market demand.") },
      { q: tx("Les dons ouvrent-ils droit a une deduction fiscale ?", "Are donations eligible for tax deduction?"), a: tx("Oui, les dons a des associations reconnues d'utilite publique donnent droit a une reduction d'impot de 60 % du montant du don, dans la limite de 0,5 % du chiffre d'affaires.", "Yes, donations to recognized public-benefit organizations qualify for a 60% tax deduction, up to 0.5% of revenue.") },
    ],
    ctaPrimary: { label: tx("Valoriser mon parc", "Recover my value"), href: "/contact?ref=service-recond" },
    ctaSecondary: { label: tx("Voir les cas d'usages", "See use cases"), href: "/cas-usages" },
  };

  return <ServicePageTemplate data={data} />;
}
