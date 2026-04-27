"use client";

import { Recycle } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function RecyclageDEEEPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "recyclage-deee",
    eyebrow: tx("04 (Économie circulaire", "04) Circular economy"),
    title: tx("Recyclage responsable des DEEE", "Responsible WEEE recycling"),
    subtitle: tx(
      "Pour ce qui ne peut plus servir, nous orchestrons un recyclage entièrement conforme à la directive DEEE et à la responsabilité élargie du producteur. Chaque matière est tracée, pesée, valorisée, et nourrit directement votre rapport CSRD.",
      "For what can no longer serve, we orchestrate WEEE-compliant recycling under extended producer responsibility. Every material is tracked, weighed, recovered, and directly feeds your CSRD reporting."
    ),
    description: tx(
      "Quand un actif est irrécupérable, l'enjeu n'est plus la valeur marchande, c'est la responsabilité environnementale et juridique. Notre réseau d'éco-organismes certifiés (Ecologic, Ecosystem) garantit une traçabilité de bout en bout. Chaque matière, des métaux ferreux aux cartes électroniques, est pesée, photographiée et valorisée en filière dédiée. Le bilan carbone évité et les matières premières secondaires réinjectées remontent automatiquement dans votre rapport CSRD ESRS E5, sans aucune ressaisie manuelle. Mise en décharge : zéro.",
      "When an asset is unrecoverable, the issue is no longer market value but environmental and legal responsibility. Our certified eco-organisation network (Ecologic, Ecosystem) guarantees end-to-end traceability. Every material, from ferrous metals to electronic boards, is weighed, photographed and recovered via a dedicated channel. The avoided carbon footprint and secondary raw materials feed automatically into your CSRD ESRS E5 reporting, with no manual re-entry. Landfill rate: zero."
    ),
    narrative: tx(
      "La traçabilité matière n'est pas une promesse marketing : c'est une exigence réglementaire qui se vérifie poste par poste, ligne de bordereau par ligne de bordereau. Voici comment elle est tenue.",
      "Material traceability isn't a marketing promise: it's a regulatory requirement verified item by item, slip line by slip line. Here is how it is upheld."
    ),
    deliveryNarrative: tx(
      "Nos livrables ne sont pas faits pour rassurer le service achats : ils sont conçus pour passer un audit CSRD sans correction. Bordereaux numérisés, registres horodatés, exports XBRL prêts à intégrer.",
      "Our deliverables aren't designed to reassure procurement: they are built to pass a CSRD audit without correction. Digital tracking slips, timestamped registers, XBRL exports ready to ingest."
    ),
    icon: Recycle,
    badge: tx("100 % traçable", "100% traceable"),
    image:
      "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=1600&q=80",
    imageAlt: tx(
      "Démantèlement et tri de cartes électroniques en filière DEEE certifiée",
      "Dismantling and sorting of electronic boards in a certified WEEE channel"
    ),
    imageSecondary:
      "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=1600&q=80",
    imageSecondaryAlt: tx(
      "Atelier de recyclage de matériel informatique",
      "IT material recycling workshop"
    ),
    benefits: [
      tx("Conformité DEEE et REP intégrale", "Full WEEE and EPR compliance"),
      tx("Réseau Ecologic et Ecosystem certifié", "Certified Ecologic and Ecosystem network"),
      tx("Traçabilité matière par matière", "Material-by-material traceability"),
      tx("Bilan carbone évité calculé automatiquement", "Avoided carbon footprint computed automatically"),
      tx("Alimentation automatique ESRS E5 et CSRD", "Automatic ESRS E5 and CSRD feed"),
      tx("Bordereau de suivi des déchets numérisé", "Digital waste tracking slip"),
    ],
    proof: [
      { value: "98,1", unit: "%", label: tx("matière valorisée mesurée", "measured material recovery"), color: "#10B981" },
      { value: "0", unit: "%", label: tx("mise en décharge", "landfill rate"), color: "#0EA5E9" },
      { value: "72", unit: "h", label: tx("bordereau délivré", "tracking slip delivery"), color: "#F59E0B" },
    ],
    methodology: {
      title: tx("De l'actif inopérant à la donnée CSRD", "From unfit asset to CSRD data point"),
      intro: "",
      steps: [
        {
          title: tx("Tri et démantèlement", "Sorting and dismantling"),
          desc: tx(
            "Séparation des composants par catégorie : métaux ferreux, métaux non ferreux, plastiques, cartes électroniques, batteries, écrans. Chaque catégorie part vers une filière agréée distincte.",
            "Component separation by category: ferrous metals, non-ferrous metals, plastics, electronic boards, batteries, screens. Each category is routed to a separate approved channel."
          ),
        },
        {
          title: tx("Pesée et traçabilité", "Weighing and traceability"),
          desc: tx(
            "Chaque matière est pesée sur balance étalonnée, photographiée et enregistrée dans le registre cryptographique. Le bordereau de suivi des déchets numérique est généré dans la foulée.",
            "Each material is weighed on a calibrated scale, photographed and recorded in the cryptographic register. The digital waste tracking slip is generated immediately."
          ),
        },
        {
          title: tx("Valorisation en filière", "Channel recovery"),
          desc: tx(
            "Acheminement vers les filières de recyclage certifiées, extraction des métaux rares, refonte des métaux ferreux et non ferreux, regranulation des plastiques. Les matières secondaires sont tracées jusqu'au client final.",
            "Routing to certified recycling channels, rare metals extraction, ferrous and non-ferrous remelting, plastics re-granulation. Secondary materials are tracked to the end customer."
          ),
        },
        {
          title: tx("Restitution CSRD automatisée", "Automated CSRD output"),
          desc: tx(
            "Génération automatique des points de donnée ESRS E5 : ressources entrantes et sortantes, taux de circularité, intensité matière. Export XBRL et PDF signé eIDAS prêts pour vos commissaires aux comptes.",
            "Automatic generation of ESRS E5 data points: incoming and outgoing resources, circularity rate, material intensity. eIDAS-signed XBRL and PDF exports ready for your auditors."
          ),
        },
      ],
    },
    deliverables: [
      tx("Bordereau de suivi des déchets numérisé", "Digital waste tracking slip"),
      tx("Rapport de traçabilité matière", "Material traceability report"),
      tx("Bilan carbone évité par catégorie", "Avoided carbon report by category"),
      tx("Export ESRS E5 pour rapport CSRD", "ESRS E5 export for CSRD report"),
    ],
    sla: [
      { metric: tx("Taux de valorisation matière", "Material recovery rate"), value: "98,1 %" },
      { metric: tx("Mise en décharge", "Landfill rate"), value: "0 %" },
      { metric: tx("Délai bordereau", "Tracking slip turnaround"), value: "72 h" },
    ],
    certifications: ["R2v3", "ISO 14001", "DEEE/WEEE", "Ecologic", "Ecosystem"],
    quote: {
      text: tx(
        "Notre rapport ESRS E5 a été validé sans réserve par KPMG dès le premier exercice. Les exports automatiques de GreenTechCycle ont fait gagner deux semaines à notre équipe RSE.",
        "Our ESRS E5 report was validated without reservation by KPMG on the first cycle. GreenTechCycle's automatic exports saved our sustainability team two weeks of work."
      ),
      name: "Yann F.",
      role: tx("Directeur RSE, énergéticien européen", "Sustainability Director, European utility"),
    },
    faq: [
      {
        q: tx("Que devient la matière recyclée ?", "What happens to recycled material?"),
        a: tx(
          "Les métaux sont refondus et réinjectés dans la filière sidérurgique. Les plastiques sont regranulés. Les cartes électroniques sont traitées pour extraction des métaux précieux. Chaque filière est documentée jusqu'au client final.",
          "Metals are remelted and re-injected into the steel industry. Plastics are re-granulated. Electronic boards are processed for precious metals extraction. Each channel is documented all the way to the end customer."
        ),
      },
      {
        q: tx("Le rapport CSRD est-il vraiment automatique ?", "Is the CSRD report truly automatic?"),
        a: tx(
          "Oui. Les points de donnée ESRS E5 sont calculés en continu à partir des bordereaux numérisés. Vous récupérez un export prêt pour vos commissaires aux comptes, sans aucune ressaisie.",
          "Yes. ESRS E5 data points are continuously computed from digital tracking slips. You retrieve an export ready for your auditors, with no manual re-entry."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver une collecte", "Book a collection"),
    ctaSecondaryLabel: tx("Voir l'impact carbone", "See carbon impact"),
    ctaSecondaryHref: "/impact",
    pricingAnchor: tx("À partir de 15 € HT/poste", "Starting at €15 HT/device"),
    pricingHref: "/tarifs",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
