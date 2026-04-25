"use client";

import { Cpu } from "lucide-react";
import { useLocale } from "next-intl";
import ServicePageTemplate from "../ServicePageTemplate";
import type { ServicePageData } from "../ServicePageTemplate";

export default function WakiBoxPage() {
  const locale = useLocale();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  const data: ServicePageData = {
    eyebrow: tx("06 -- Collecte IoT", "06 -- IoT collection"),
    title: tx("WakiBox", "WakiBox"),
    subtitle: tx(
      "Bornes de collecte connectees installees dans vos locaux. Detection automatique des depots par RFID, pesee integree, alertes de remplissage temps reel, gamification.",
      "Connected collection kiosks installed in your premises. Automatic RFID deposit detection, integrated weighing, real-time fill alerts, gamification."
    ),
    description: tx(
      "WakiBox est notre solution IoT de collecte intelligente, concue pour les organisations multi-sites. Chaque borne est connectee a la plateforme GTC et detecte automatiquement les depots (RFID), pese les equipements, classe les assets et alerte quand le remplissage atteint le seuil de collecte. L'application embarquee gamifie la collecte pour encourager les comportements responsables (classements par service, badges, challenges). Resultat : un taux de collecte 3x superieur aux bacs passifs, un pilotage centralise et des donnees de flux injectees dans votre reporting CSRD.",
      "WakiBox is our intelligent IoT collection solution, designed for multi-site organizations. Each kiosk connects to the GTC platform and automatically detects deposits (RFID), weighs equipment, classifies assets and alerts when the fill threshold is reached. The embedded app gamifies collection to encourage responsible behavior. Result: 3x higher collection rate than passive bins, centralized monitoring and flow data injected into your CSRD reporting."
    ),
    icon: Cpu,
    badge: tx("Monitoring temps reel", "Real-time monitoring"),
    image: "/images/unsplash/tech-datacenter.jpg",
    imageAlt: tx("Borne WakiBox de collecte connectee", "Connected WakiBox collection kiosk"),
    benefits: [
      tx("Borne de collecte connectee plug-and-play", "Plug-and-play connected collection kiosk"),
      tx("Detection automatique des depots par RFID", "Automatic RFID deposit detection"),
      tx("Pesee integree et classification automatique", "Integrated weighing and automatic classification"),
      tx("Alertes de remplissage en temps reel", "Real-time fill alerts"),
      tx("Dashboard de suivi par site", "Per-site monitoring dashboard"),
      tx("Gamification pour encourager le reemploi", "Gamification to encourage reuse"),
    ],
    methodology: {
      title: tx("Deploiement WakiBox", "WakiBox deployment"),
      steps: [
        { title: tx("Etude d'implantation", "Site survey"), desc: tx("Analyse des flux, identification des emplacements optimaux, dimensionnement du nombre de bornes par site.", "Flow analysis, optimal location identification, kiosk quantity sizing per site.") },
        { title: tx("Installation et configuration", "Installation and configuration"), desc: tx("Livraison, installation physique, connexion WiFi/4G, configuration des seuils d'alerte et des regles de classification.", "Delivery, physical installation, WiFi/4G connection, alert threshold and classification rule configuration.") },
        { title: tx("Formation et lancement", "Training and launch"), desc: tx("Formation des equipes locales, communication interne, lancement de la campagne de gamification.", "Local team training, internal communication, gamification campaign launch.") },
        { title: tx("Pilotage centralise", "Centralized monitoring"), desc: tx("Suivi des taux de remplissage, declenchement automatique des collectes, reporting CSRD des flux.", "Fill rate monitoring, automatic collection triggering, CSRD flow reporting.") },
      ],
    },
    deliverables: [
      tx("Bornes WakiBox installees et configurees", "Installed and configured WakiBox kiosks"),
      tx("Dashboard de pilotage multi-sites", "Multi-site monitoring dashboard"),
      tx("Reporting de flux par site et par periode", "Per-site and per-period flow reporting"),
      tx("Donnees de gamification (classements, badges)", "Gamification data (rankings, badges)"),
    ],
    sla: [
      { metric: tx("Taux de disponibilite borne", "Kiosk uptime"), value: "99,5 %" },
      { metric: tx("Delai de collecte apres alerte", "Collection after alert"), value: "48 h" },
      { metric: tx("Support maintenance", "Maintenance support"), value: "J+1" },
    ],
    certifications: ["R2v3", "CE", "RoHS"],
    faq: [
      { q: tx("Combien de bornes par site ?", "How many kiosks per site?"), a: tx("En general, 1 borne pour 200 a 500 collaborateurs. Le dimensionnement exact depend de la disposition des locaux et des flux observes.", "Typically, 1 kiosk per 200-500 employees. Exact sizing depends on floor plan and observed flows.") },
      { q: tx("La WakiBox fonctionne-t-elle en mode hors-ligne ?", "Does WakiBox work offline?"), a: tx("Oui, les depots sont enregistres localement et synchronises des le retour de la connexion. Aucune perte de donnees.", "Yes, deposits are recorded locally and synced when connectivity returns. No data loss.") },
    ],
    ctaPrimary: { label: tx("Deployer WakiBox", "Deploy WakiBox"), href: "/contact?ref=service-wakibox" },
    ctaSecondary: { label: tx("Voir le cas retail", "See the retail case"), href: "/cas-usages#retail-multi-sites-wakibox" },
  };

  return <ServicePageTemplate data={data} />;
}
