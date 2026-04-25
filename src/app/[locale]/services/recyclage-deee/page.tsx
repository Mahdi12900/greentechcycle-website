"use client";

import { Recycle } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function RecyclageDEEEPage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("04 -- Economie circulaire", "04 -- Circular economy"),
    title: tx("Recyclage Responsable DEEE", "Responsible WEEE Recycling"),
    subtitle: tx(
      "Conformite DEEE/REP integrale, tracabilite matiere par matiere, bilan carbone evite calcule automatiquement et alimentation ESRS E5.",
      "Full WEEE/EPR compliance, material-by-material traceability, automatic avoided carbon calculation and ESRS E5 feed."
    ),
    description: tx(
      "Pour les equipements non reconditionnables, nous orchestrons un recyclage 100 % conforme a la directive DEEE et a la responsabilite elargie du producteur. Notre reseau d'eco-organismes certifies (Ecologic, Ecosystem) garantit une tracabilite bout-en-bout : chaque matiere (metaux ferreux, non ferreux, plastiques, cartes electroniques) est pesee, tracee et valorisee en filiere. Le bilan carbone evite et les matieres premieres secondaires reinjectees alimentent directement votre reporting CSRD (ESRS E5) sans aucune ressaisie manuelle.",
      "For non-refurbishable equipment, we orchestrate 100% WEEE-compliant recycling under extended producer responsibility. Our certified eco-organization network guarantees end-to-end traceability: each material is weighed, tracked and valorized. The avoided carbon footprint feeds directly into your CSRD reporting (ESRS E5) with zero manual re-entry."
    ),
    icon: Recycle,
    badge: tx("100 % tracable", "100% traceable"),
    image: "/images/unsplash/ewaste-recycling.jpg",
    imageAlt: tx("Recyclage d'equipements electroniques en filiere DEEE", "Certified WEEE electronics recycling"),
    benefits: [
      tx("Conformite DEEE / REP integrale", "Full WEEE / EPR compliance"),
      tx("Reseau Ecologic + Ecosystem certifies", "Certified Ecologic + Ecosystem network"),
      tx("Tracabilite matiere par matiere", "Material-by-material traceability"),
      tx("Bilan carbone evite calcule automatiquement", "Automatic avoided-carbon calculation"),
      tx("Alimentation automatique ESRS E5 / CSRD", "Automatic ESRS E5 / CSRD feed"),
      tx("Bordereau de suivi des dechets (BSD) numerise", "Digital waste tracking slip (BSD)"),
    ],
    methodology: {
      title: tx("Processus de recyclage", "Recycling process"),
      steps: [
        { title: tx("Tri et demantelement", "Sorting and dismantling"), desc: tx("Separation des composants par categorie : metaux, plastiques, cartes, batteries, ecrans.", "Component separation by category: metals, plastics, boards, batteries, screens.") },
        { title: tx("Pesee et tracabilite", "Weighing and traceability"), desc: tx("Chaque matiere est pesee, photographiee et enregistree dans le registre de tracabilite.", "Each material is weighed, photographed and recorded in the traceability register.") },
        { title: tx("Valorisation en filiere", "Channel valorization"), desc: tx("Acheminement vers les filieres de recyclage certifiees, extraction des metaux rares.", "Routing to certified recycling channels, rare metals extraction.") },
        { title: tx("Reporting CSRD automatise", "Automated CSRD reporting"), desc: tx("Generation automatique des data points ESRS E5 : ressources entrantes/sortantes, taux de circularite.", "Automatic generation of ESRS E5 data points: resource inflows/outflows, circularity rate.") },
      ],
    },
    deliverables: [
      tx("Bordereau de suivi des dechets (BSD) numerise", "Digital waste tracking slip (BSD)"),
      tx("Rapport de tracabilite matiere", "Material traceability report"),
      tx("Bilan carbone evite", "Avoided carbon report"),
      tx("Export ESRS E5 pour rapport CSRD", "ESRS E5 export for CSRD report"),
    ],
    sla: [
      { metric: tx("Taux de valorisation matiere", "Material recovery rate"), value: "98,1 %" },
      { metric: tx("Mise en decharge", "Landfill rate"), value: "0 %" },
      { metric: tx("Delai BSD", "BSD turnaround"), value: "72 h" },
    ],
    certifications: ["R2v3", "ISO 14001", "DEEE/WEEE", "Ecologic", "Ecosystem"],
    faq: [
      { q: tx("Que devient la matiere recyclée ?", "What happens to recycled material?"), a: tx("Les metaux sont refondus, les plastiques regranules, les cartes electroniques traitees pour extraction des metaux precieux. Chaque filiere est tracee et documentee.", "Metals are remelted, plastics re-granulated, electronic boards processed for precious metal extraction. Every channel is tracked and documented.") },
    ],
    ctaPrimary: { label: tx("Recycler en conformite", "Recycle compliantly"), href: "/contact?ref=service-recyclage" },
    ctaSecondary: { label: tx("Voir l'impact carbone", "See carbon impact"), href: "/impact" },
  };

  return <ServicePageTemplate data={data} />;
}
