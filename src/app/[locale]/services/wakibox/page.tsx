"use client";

import { Cpu } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function WakiBoxPage() {
  const locale = useLocale();
  const isEn = locale === "en";
  const tx = (fr: string, en: string) => (isEn ? en : fr);

  const data: ServicePageData = {
    slug: "wakibox",
    eyebrow: tx("06 — Collecte connectée", "06 — Connected collection"),
    title: "WakiBox",
    subtitle: tx(
      "Une borne installée dans le hall, et la collecte se fait toute seule. Détection automatique par RFID, pesée intégrée, alerte de remplissage en temps réel et un brin de ludification — pour multiplier par trois le geste utile.",
      "A kiosk in your lobby, and collection happens on its own. Automatic RFID detection, integrated weighing, real-time fill alerts and a touch of gamification — to triple the useful gesture."
    ),
    description: tx(
      "WakiBox est notre borne de collecte connectée, conçue pour les organisations multi-sites qui veulent rendre la collecte des équipements en fin de vie aussi simple que poser un colis. Chaque borne est reliée à la console GreenTechCycle. Elle détecte automatiquement les dépôts par RFID, pèse l'équipement, le classe, et alerte la logistique quand le seuil de remplissage est atteint. Une application embarquée transforme le geste en classement convivial entre services — badges, défis, retours visibles. Résultat : un taux de collecte multiplié par trois face aux bacs passifs, un pilotage centralisé, et des données de flux injectées directement dans votre rapport CSRD.",
      "WakiBox is our connected collection kiosk, built for multi-site organisations that want collection of end-of-life equipment to be as simple as dropping a parcel. Each kiosk connects to the GreenTechCycle console. It automatically detects deposits by RFID, weighs the equipment, classifies it, and alerts logistics when the fill threshold is reached. An embedded app turns the gesture into a friendly ranking between teams — badges, challenges, visible feedback. Result: a 3x higher collection rate vs passive bins, centralised monitoring, and flow data fed straight into your CSRD report."
    ),
    narrative: tx(
      "WakiBox a été déployée en moins de quatre semaines dans un réseau de 142 magasins. Voici comment elle s'installe, se connecte et entre en service — sans bloquer vos équipes IT internes.",
      "WakiBox has been rolled out in less than four weeks across a network of 142 stores. Here is how it is installed, connected and put into service — without blocking your internal IT teams."
    ),
    deliveryNarrative: tx(
      "Vous recevez les bornes installées et configurées, une console de pilotage par site, un rapport de flux par période, et l'ensemble des données de ludification. Tout est exploitable par vos directions RSE et logistique sans intervention IT.",
      "You receive installed and configured kiosks, a per-site monitoring console, a per-period flow report, and the full gamification dataset. Everything is usable by your sustainability and logistics teams without IT involvement."
    ),
    icon: Cpu,
    badge: tx("Supervision temps réel", "Real-time monitoring"),
    image: "/photos/service-wakibox.jpg",
    imageAlt: tx(
      "Borne WakiBox de collecte connectée installée dans des locaux d'entreprise",
      "WakiBox connected collection kiosk installed in office premises"
    ),
    imageSecondary:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
    imageSecondaryAlt: tx(
      "Équipe en entreprise utilisant un dispositif de collecte connecté",
      "Team using a connected collection device in a workplace"
    ),
    benefits: [
      tx("Borne prête à l'emploi, branchée en cinq minutes", "Plug-and-play kiosk, ready in five minutes"),
      tx("Détection automatique des dépôts par RFID", "Automatic RFID deposit detection"),
      tx("Pesée intégrée et classement automatique", "Integrated weighing and automatic classification"),
      tx("Alertes de remplissage en temps réel", "Real-time fill alerts"),
      tx("Console de suivi par site", "Per-site monitoring console"),
      tx("Animation interne pour encourager le réemploi", "Internal engagement to drive reuse"),
    ],
    proof: [
      { value: "x3", label: tx("vs bacs passifs", "vs passive bins"), color: "#10B981" },
      { value: "99,5", unit: "%", label: tx("disponibilité borne mesurée", "measured kiosk uptime"), color: "#0EA5E9" },
      { value: "48", unit: "h", label: tx("collecte après alerte", "collection after alert"), color: "#F59E0B" },
    ],
    methodology: {
      title: tx("De l'étude d'implantation au pilotage central", "From site survey to central monitoring"),
      intro: "",
      steps: [
        {
          title: tx("Étude d'implantation", "Site survey"),
          desc: tx(
            "Analyse des flux par site, identification des emplacements à fort passage, dimensionnement du nombre de bornes. Vous recevez un plan d'implantation chiffré avant toute commande.",
            "Per-site flow analysis, identification of high-traffic locations, kiosk count sizing. You receive a quantified placement plan before any order."
          ),
        },
        {
          title: tx("Installation et configuration", "Installation and configuration"),
          desc: tx(
            "Livraison, fixation, raccordement Wi-Fi ou 4G, configuration des seuils d'alerte et des règles de classement. Aucune intervention sur votre infrastructure réseau interne.",
            "Delivery, fixing, Wi-Fi or 4G connection, alert threshold and classification rules configured. No intervention on your internal network infrastructure."
          ),
        },
        {
          title: tx("Formation et lancement", "Training and launch"),
          desc: tx(
            "Formation des équipes locales en trente minutes, kit de communication interne fourni, lancement de la campagne d'animation avec classements entre services.",
            "Local team training in thirty minutes, internal communication kit provided, engagement campaign launch with team rankings."
          ),
        },
        {
          title: tx("Pilotage centralisé", "Centralised monitoring"),
          desc: tx(
            "Suivi des taux de remplissage, déclenchement automatique des collectes par notre logistique, restitution des flux dans votre rapport CSRD.",
            "Fill rate monitoring, automatic collection triggering by our logistics, flow restitution into your CSRD report."
          ),
        },
      ],
    },
    deliverables: [
      tx("Bornes WakiBox installées et configurées", "Installed and configured WakiBox kiosks"),
      tx("Console de pilotage multi-sites", "Multi-site monitoring console"),
      tx("Rapport de flux par site et par période", "Per-site and per-period flow report"),
      tx("Données d'animation interne (classements, badges)", "Internal engagement data (rankings, badges)"),
    ],
    sla: [
      { metric: tx("Disponibilité de la borne", "Kiosk uptime"), value: "99,5 %" },
      { metric: tx("Délai de collecte après alerte", "Collection after alert"), value: tx("48 h", "48h") },
      { metric: tx("Support et maintenance", "Support and maintenance"), value: tx("J+1", "Day 1") },
    ],
    certifications: ["R2v3", "CE", "RoHS"],
    quote: {
      text: tx(
        "En six mois, nos 142 magasins ont collecté 18 tonnes d'équipements en fin de vie. Avant WakiBox, on en récupérait à peine quatre. Le geste est devenu naturel.",
        "In six months, our 142 stores collected 18 tonnes of end-of-life equipment. Before WakiBox, we barely recovered four. The gesture became natural."
      ),
      name: "Élodie R.",
      role: tx("Directrice RSE, distribution spécialisée", "Sustainability Director, specialty retail"),
    },
    faq: [
      {
        q: tx("Combien de bornes prévoir par site ?", "How many kiosks per site?"),
        a: tx(
          "En général, une borne pour 200 à 500 collaborateurs. Le dimensionnement exact dépend de la disposition des locaux et des flux observés. Nous le validons avec vous avant la commande.",
          "Typically one kiosk per 200-500 employees. Exact sizing depends on layout and observed flows. We validate it with you before ordering."
        ),
      },
      {
        q: tx("La WakiBox fonctionne-t-elle hors connexion ?", "Does WakiBox work offline?"),
        a: tx(
          "Oui. Les dépôts sont enregistrés localement et synchronisés au retour de la connexion. Aucune perte de donnée, même en cas de coupure prolongée.",
          "Yes. Deposits are recorded locally and synced when connectivity returns. No data loss, even after prolonged outages."
        ),
      },
    ],
    ctaPrimaryLabel: tx("Réserver une démonstration", "Book a demo"),
    ctaSecondaryLabel: tx("Voir le cas distribution", "See the retail case"),
    ctaSecondaryHref: "/cas-usages",
    isEn,
  };

  return <ServicePageTemplate data={data} />;
}
