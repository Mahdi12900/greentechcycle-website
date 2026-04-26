import type { SectorContent, SectorSlug, MatrixRow } from "./sectors";

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENU FR — 16 FICHES SECTEURS
   ═══════════════════════════════════════════════════════════════════════════ */

export const sectorContentFr: Record<SectorSlug, SectorContent> = {
  /* ───────────────────────────────────────────────────────────────────────
     1. BANQUE, ASSURANCE ET SERVICES FINANCIERS
  ─────────────────────────────────────────────────────────────────────── */
  finance: {
    hero: {
      title: "Banque, assurance et services financiers",
      subtitle: "DORA, NIS2, ACPR/AMF, CSRD — sécurisez le cycle de vie de vos actifs IT critiques dans un cadre réglementaire parmi les plus exigeants d'Europe.",
    },
    profile: {
      description: "Le secteur financier européen opère sous l'un des cadres réglementaires les plus stricts au monde. Avec des volumes de 20 000 à 100 000 postes par banque réseau, la gestion du cycle de vie des actifs IT représente un enjeu colossal, à la croisée de la sécurité des données, de la conformité réglementaire et de la responsabilité environnementale. Chaque poste de travail, chaque serveur, chaque terminal d'agence contient potentiellement des données relevant du secret bancaire, de la protection des investisseurs ou du RGPD.",
      regulations: "DORA (effectif depuis janvier 2025) impose une traçabilité complète de la résilience opérationnelle ICT, y compris pour les prestataires tiers comme l'ITAD. NIS2 renforce les obligations cyber. L'ACPR et l'AMF exigent des preuves auditables. La CSRD impose un reporting ESG granulaire, et le RGPD encadre strictement la destruction des données personnelles.",
    },
    painPoints: [
      "Le risque de fuite de données clients conjugue les exigences du RGPD et du secret bancaire. Un seul disque dur mal effacé dans une agence peut déclencher une crise réputationnelle majeure et des sanctions réglementaires en cascade.",
      "Depuis janvier 2025, DORA impose de tracer la résilience opérationnelle ICT de bout en bout, y compris chez les prestataires tiers. Votre chaîne ITAD doit désormais être documentée, auditée et résiliente — exactement comme vos systèmes de production.",
      "Les auditeurs ACPR exigent une chaîne de traçabilité irréfutable pour chaque actif décommissionné. Un fichier Excel partagé entre trois prestataires ne suffit plus : il faut des preuves horodatées, signées et opposables.",
      "Le coût de la destruction physique, entre 10 et 30 € par appareil, s'accumule sur des volumes de dizaines de milliers d'unités par an — alors qu'une part significative de ces équipements pourrait être reconditionnée et valorisée.",
      "Les données ESG doivent être consolidées à travers des structures multi-pays et multi-filiales, chacune avec ses propres processus et prestataires. La CSRD exige une granularité ESRS E5 par entité et au niveau groupe.",
      "Le risque réputationnel d'un appareil mal effacé reste le cauchemar de tout CISO bancaire. Les conséquences dépassent largement l'amende : perte de confiance des clients, couverture médiatique négative, impact sur le cours de l'action.",
    ],
    useCases: [
      {
        title: "Renouvellement post-fusion : inventaire accéléré et traçabilité auditeur",
        description: "Lors d'une fusion bancaire, 30 à 40 % du parc IT devient redondant. GreenTechCycle déploie ses connecteurs ITAM pour réaliser un inventaire exhaustif en 2 à 3 semaines, applique un scoring décisionnel automatisé (reconditionnement, recyclage, destruction) et génère une chaîne de traçabilité complète directement exploitable par les auditeurs post-fusion.",
      },
      {
        title: "Conformité DORA : registre prestataires ITAD et suivi d'incidents",
        description: "DORA exige un registre à jour de tous les prestataires ICT tiers, incluant leurs certifications, SLA et incidents. GreenTechCycle centralise ces informations pour votre chaîne ITAD — certifications R2v3, ISO 27001, SLA de traitement, tracking d'incidents — et génère les exports nécessaires pour l'ACPR en un clic.",
      },
      {
        title: "Reporting CSRD ESRS E5 multi-filiales",
        description: "Avec 5 à 30 entités réparties dans plusieurs pays, consolider les données de fin de vie IT relève du défi. GreenTechCycle centralise les flux entrants et sortants de chaque filiale, calcule automatiquement les indicateurs ESRS E5 par entité et au niveau groupe, et produit un rapport auditable directement intégrable dans votre déclaration CSRD.",
      },
      {
        title: "Waki Box dans les agences bancaires",
        description: "Avec 500 à 2 000 agences, les petits DEEE s'accumulent partout sans visibilité. La Waki Box installée dans chaque agence offre une granularité fleet-wide : chaque dépôt est tracé, les collectes sont optimisées par tournée logistique, et le siège dispose d'un tableau de bord temps réel de l'ensemble du réseau.",
      },
    ],
    roi: [
      { lever: "Internalisation partielle ITAD", gain: "-30 à 40 % sur la facture ITAD annuelle" },
      { lever: "Reconditionnement postes éligibles", gain: "+80 à 150 € par poste reconditionné" },
      { lever: "Automatisation reporting", gain: "-0,5 à 1 ETP sur le reporting ESG/conformité" },
      { lever: "Évitement amendes DORA/RGPD", gain: "Jusqu'à 2 % du CA mondial" },
      { lever: "Impact carbone mesuré", gain: "300 kg CO₂e évités par poste reconditionné" },
    ],
    personas: [
      { role: "CISO", description: "Garant de la sécurité des données tout au long du cycle de vie des actifs, responsable de la conformité DORA volet ICT." },
      { role: "DSI", description: "Pilote les renouvellements de parc, arbitre entre coûts, sécurité et durabilité." },
      { role: "Compliance Officer", description: "Vérifie la conformité réglementaire de chaque processus, interface avec l'ACPR et l'AMF." },
      { role: "Directeur RSE", description: "Porte les objectifs CSRD et consolide les données environnementales multi-entités." },
      { role: "Achats indirects", description: "Négocie les contrats ITAD, optimise les coûts tout en garantissant la qualité de service." },
    ],
    quote: "GTC est la seule plateforme qui réconcilie en temps réel les obligations DORA, NIS2 et CSRD sur votre parc IT. Vos auditeurs ACPR voient les mêmes données que votre CISO et votre DRSE.",
    objections: [
      {
        question: "Nous avons déjà ServiceNow et Iron Mountain",
        answer: "GreenTechCycle orchestre, ne remplace pas. La plateforme s'intègre à vos outils existants (ServiceNow, ITSM) et coordonne vos prestataires physiques (Iron Mountain, brokers) en ajoutant la couche de traçabilité, scoring et reporting qui manque à chacun.",
      },
      {
        question: "Nos données sont trop sensibles pour une plateforme tierce",
        answer: "Hébergement France (Supabase eu-west-1), conforme RGPD, certifié ISO 27001, isolation multi-tenant par Row Level Security, audit de pénétration annuel. Vos données restent souveraines.",
      },
      {
        question: "Le coût semble élevé par rapport à nos contrats actuels",
        answer: "Le TCO réel inclut les ETP mobilisés, le risque réglementaire non couvert et la valeur résiduelle non récupérée. Nos clients bancaires constatent un retour sur investissement en 8 à 12 mois.",
      },
    ],
    cta: {
      title: "Sécurisez votre ITAD financière",
      button: "Demander un audit DORA",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     2. SANTÉ ET HÔPITAUX
  ─────────────────────────────────────────────────────────────────────── */
  sante: {
    hero: {
      title: "Santé et hôpitaux",
      subtitle: "HDS, RGPD article 9, NIS2 — protégez les données patients tout en valorisant votre parc IT hospitalier.",
    },
    profile: {
      description: "Le secteur de la santé gère des données parmi les plus sensibles qui existent : dossiers patients, imagerie médicale, résultats d'analyses. Avec 5 000 à 50 000 postes par CHU, auxquels s'ajoutent tablettes médicales, terminaux de chevet et équipements d'imagerie (IRM, scanners) contenant des données locales, la gestion ITAD représente un défi à la fois sécuritaire, logistique et budgétaire.",
      regulations: "L'Hébergement de Données de Santé (HDS) encadre strictement le traitement des données patients. Le RGPD article 9 protège les données de santé comme catégorie spéciale. Le MDR encadre les dispositifs médicaux. La HAS fixe les standards de qualité. NIS2 classe les établissements de santé comme opérateurs de services essentiels.",
    },
    painPoints: [
      "Distinguer les équipements contenant des données patients des postes bureautiques administratifs est indispensable mais rarement automatisé. Un mauvais tri peut conduire à un effacement insuffisant sur un poste sensible ou à une destruction inutile d'un poste valorisable.",
      "La pression budgétaire du secteur hospitalier public rend chaque euro compte. Les budgets IT sont contraints alors que les volumes d'équipements en fin de vie augmentent avec la digitalisation des soins.",
      "Les établissements multi-sites, souvent répartis sur 5 à 30 bâtiments, cumulent autant de processus ITAD différents. L'absence de politique unifiée génère des risques et des surcoûts.",
      "Le risque réputationnel et juridique d'une fuite de données patients est considérable. Au-delà de l'amende RGPD (jusqu'à 4 % du CA), c'est la confiance des patients et la crédibilité de l'établissement qui sont en jeu.",
      "Les groupes hospitaliers privés cotés (Elsan, Ramsay, Vivalto) font face à des obligations de reporting CSRD croissantes, ajoutant une couche de complexité à la gestion de fin de vie IT.",
      "Les équipements d'imagerie médicale en fin de vie (IRM, scanners) contiennent des images patients stockées localement. Leur cycle de remplacement (7 à 10 ans) nécessite un effacement certifié de niveau médical.",
    ],
    useCases: [
      {
        title: "Effacement certifié des dispositifs médicaux en fin de vie",
        description: "Les IRM et scanners stockent localement des images patients. Lors du remplacement (tous les 7 à 10 ans), GreenTechCycle orchestre un effacement NIST 800-88 Purge avec certificat conforme CNIL, garantissant la destruction irréversible des données médicales tout en documentant chaque étape pour les audits HAS.",
      },
      {
        title: "Plateforme unifiée multi-sites CHU",
        description: "Un CHU typique compte 12 sites avec 12 processus ITAD différents. GreenTechCycle unifie les inventaires, applique une politique de sécurité cohérente, et offre au DSI une vision consolidée de l'ensemble du parc en fin de vie, quel que soit le site d'origine.",
      },
      {
        title: "Récupération de valeur sur le matériel bureautique",
        description: "Les postes administratifs (DAF, DRH, accueil) ne contiennent pas de données patients et sont éligibles au reconditionnement. Sur un parc de 10 000 postes, la récupération de 50 à 100 € par poste représente 500 000 € à 1 M€ de valeur, directement réinjectables dans le budget IT hospitalier.",
      },
      {
        title: "Waki Box dans les services et accueils",
        description: "Tensiomètres, oxymètres, télécommandes de lits connectés, piles et petites batteries s'accumulent dans les services de soins. La Waki Box sécurise ces petits DEEE, prévient les risques d'incendie liés aux batteries lithium, et trace chaque dépôt pour le reporting environnemental de l'établissement.",
      },
    ],
    roi: [
      { lever: "Récupération valeur bureautique", gain: "60 à 90 € par poste éligible" },
      { lever: "Optimisation destruction certifiée", gain: "-25 à 35 % sur les coûts" },
      { lever: "Évitement amende RGPD article 9", gain: "Jusqu'à 4 % du CA" },
      { lever: "Logistique DEEE centralisée", gain: "-0,3 à 0,5 ETP par an" },
      { lever: "Sécurité incendie batteries lithium", gain: "Risque éliminé via collecte contrôlée" },
    ],
    personas: [
      { role: "DSI hospitalier", description: "Pilote la transformation numérique de l'établissement et arbitre les priorités budgétaires IT." },
      { role: "RSSI", description: "Définit la politique de sécurité des données, valide les niveaux d'effacement par catégorie d'équipement." },
      { role: "Directeur logistique", description: "Coordonne les flux physiques sur les différents sites et gère les prestataires de collecte." },
      { role: "Acheteurs hospitaliers (UGAP)", description: "Passent par les centrales d'achat publiques, recherchent des solutions référencées et conformes." },
      { role: "Référent CSRD groupe privé", description: "Consolide les données environnementales pour le reporting des groupes hospitaliers cotés." },
    ],
    quote: "GTC permet à votre établissement de respecter ses obligations RGPD données de santé tout en récupérant de la valeur sur votre parc bureautique. La plateforme distingue automatiquement vos équipements sensibles de votre matériel administratif.",
    objections: [
      {
        question: "Nous passons par l'UGAP pour nos achats",
        answer: "GreenTechCycle est référençable auprès des centrales d'achat publiques. Nous accompagnons les établissements dans la rédaction des appels d'offres et nous conformons aux exigences des marchés publics hospitaliers.",
      },
      {
        question: "Notre RSSI exige la destruction physique de tous les supports",
        answer: "GreenTechCycle respecte intégralement la politique de votre RSSI. La destruction physique est appliquée sur les équipements sensibles identifiés, tandis que le reconditionnement n'est proposé que pour les postes administratifs validés par le RSSI comme non sensibles.",
      },
    ],
    cta: {
      title: "Sécurisez votre ITAD hospitalière",
      button: "Demander un audit santé",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     3. INDUSTRIE ET MANUFACTURING
  ─────────────────────────────────────────────────────────────────────── */
  industrie: {
    hero: {
      title: "Industrie et manufacturing",
      subtitle: "CSRD, ISO 14001, REACH/RoHS — unifiez la gestion IT et OT de vos sites industriels pour répondre aux exigences ESG de vos donneurs d'ordre.",
    },
    profile: {
      description: "L'industrie française opère à la croisée de deux mondes technologiques : l'IT bureautique classique et l'OT (automates, capteurs, terminaux ATEX, interfaces homme-machine). Cette dualité, combinée à des sites souvent isolés géographiquement et à la pression croissante des donneurs d'ordre en matière d'ESG, rend la gestion du cycle de vie des actifs technologiques particulièrement complexe.",
      regulations: "La CSRD s'applique aux grandes industries et à leurs sous-traitants via les exigences des donneurs d'ordre. L'ISO 14001 encadre le management environnemental. REACH et RoHS régulent les substances dangereuses dans les équipements. Le code de l'environnement impose des obligations de traçabilité des déchets électroniques.",
    },
    painPoints: [
      "Les sites industriels isolés rendent la logistique ITAD coûteuse et complexe. Chaque site a ses propres contraintes d'accès, ses horaires, ses protocoles de sécurité — multipliés par 15, 20 ou 30 sites, les coûts explosent.",
      "La pression ESG des donneurs d'ordre est devenue un enjeu commercial direct. Quand Renault, Stellantis, Airbus ou Total demandent des données précises sur votre gestion des déchets électroniques, la réponse conditionne le renouvellement du contrat.",
      "Le réemploi des équipements industriels se heurte parfois à des blocages juridiques liés à la propriété intellectuelle et au secret industriel. Des automates contenant des configurations propriétaires ne peuvent pas être reconditionnés sans précautions spécifiques.",
      "Les équipements OT (HMI, automates, terminaux terrain) échappent souvent à la gestion IT classique. Avec des durées de vie de 15 à 20 ans, ils accumulent des données opérationnelles sans que personne n'ait de visibilité sur leur fin de vie.",
      "Les volumes de batteries industrielles (chariots élévateurs, outillage portatif) représentent un enjeu environnemental et sécuritaire majeur, souvent sous-estimé dans les plans de gestion des déchets.",
      "Chaque site ayant son propre contrat ITAD, les coûts sont rarement optimisés et la qualité de service varie considérablement d'un prestataire à l'autre.",
    ],
    useCases: [
      {
        title: "Reporting CSRD donneurs d'ordre : de 5 jours à 5 minutes",
        description: "Quand un donneur d'ordre CSRD demande vos données ESG sur la gestion des déchets IT, la réponse prend habituellement 3 à 6 semaines de travail manuel. GreenTechCycle automatise la production de ces rapports et transforme cette contrainte en avantage commercial : un dossier ESG client prêt en 5 minutes au lieu de 5 jours, un atout décisif lors des appels d'offres.",
      },
      {
        title: "Gestion unifiée IT + OT",
        description: "GreenTechCycle intègre dans un même référentiel vos équipements IT bureautiques et vos équipements OT (HMI, automates, terminaux terrain). Le scoring et la décision de fin de vie sont adaptés aux spécificités OT : durées de vie longues, composants spécifiques, contraintes de secret industriel.",
      },
      {
        title: "Optimisation logistique multi-sites",
        description: "Avec 15 sites industriels et 15 contrats ITAD différents, les coûts et la qualité de service sont rarement optimisés. GreenTechCycle consolide les flux, mutualise les collectes et négocie des conditions groupées, générant des économies de 30 à 40 % sur la facture logistique.",
      },
      {
        title: "Waki Box ateliers et zones de production",
        description: "Capteurs, transmetteurs, chargeurs d'outillage, talkies-walkies, lampes de poche : les ateliers accumulent des petits DEEE sans filière dédiée. La Waki Box installée dans chaque zone de production centralise ces flux et alimente automatiquement le reporting environnemental du site.",
      },
    ],
    roi: [
      { lever: "Consolidation contrats multi-sites", gain: "-30 à 40 % sur la facture ITAD" },
      { lever: "Reconditionnement IT bureautique", gain: "+50 à 100 € par poste" },
      { lever: "Avantage commercial ESG", gain: "Impact direct sur le CA (réponse RFP accélérée)" },
      { lever: "Évitement amende REACH/RoHS", gain: "Jusqu'à 7 500 € par infraction" },
      { lever: "Automatisation reporting RSE/QSE", gain: "-0,5 ETP" },
    ],
    personas: [
      { role: "DSI / Responsable IT industriel", description: "Gère un parc hybride IT/OT réparti sur de multiples sites, souvent avec des moyens limités." },
      { role: "Responsable QSE", description: "Porte les certifications ISO 14001 et veille au respect des réglementations environnementales sur chaque site." },
      { role: "Directeur RSE", description: "Consolide les données ESG et répond aux questionnaires des donneurs d'ordre." },
      { role: "Direction Industrielle", description: "Arbitre les investissements et les optimisations opérationnelles multi-sites." },
      { role: "Achats", description: "Négocie les contrats cadres et recherche des leviers d'économie sur les services indirects." },
    ],
    quote: "Vos clients donneurs d'ordre demandent des données ESG de plus en plus précises. Avec GTC, dossier ESG client en 5 minutes au lieu de 5 jours.",
    objections: [
      {
        question: "Nos équipements OT ont des cycles de 15 à 20 ans, ce n'est pas de l'IT classique",
        answer: "C'est justement parce que vos équipements OT ont des cycles longs que vous n'avez pas de visibilité sur leur fin de vie. GreenTechCycle intègre l'OT avec des règles spécifiques : scoring adapté, gestion des composants spécifiques, respect du secret industriel.",
      },
      {
        question: "Nous avons un contrat global avec Veolia/Suez/Paprec",
        answer: "GreenTechCycle se positionne en surcouche de vos opérateurs physiques existants. Votre contrat Veolia ou Suez reste en place. GreenTechCycle ajoute la couche data, traçabilité et reporting que ces opérateurs ne fournissent pas.",
      },
    ],
    cta: {
      title: "Unifiez votre ITAD industrielle",
      button: "Demander un audit multi-sites",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     4. RETAIL ET GRANDE DISTRIBUTION
  ─────────────────────────────────────────────────────────────────────── */
  retail: {
    hero: {
      title: "Retail et grande distribution",
      subtitle: "CSRD, PCI DSS, RGPD — transformez votre obligation réglementaire en avantage marketing dans un réseau de centaines de points de vente.",
    },
    profile: {
      description: "Le retail et la grande distribution opèrent des réseaux denses de 100 à 1 000 points de vente, avec des parcs IT massifs et standardisés : caisses enregistreuses, terminaux de paiement (TPE), étiquettes électroniques, scanners, back-offices. La logistique inverse de ces équipements en fin de vie est un cauchemar opérationnel, tandis que la pression CSRD et l'exigence de storytelling ESG transforment cette contrainte en opportunité stratégique.",
      regulations: "La CSRD s'applique aux enseignes cotées avec des exigences ESRS E5 sur les déchets. PCI DSS encadre strictement l'effacement des terminaux de paiement. Le RGPD protège les données clients collectées en magasin. Le code du commerce impose des obligations de traçabilité.",
    },
    painPoints: [
      "La logistique inverse est un cauchemar dans le retail. Collecter des équipements dans 500 à 2 000 magasins, coordonner les retours, trier, traiter — sans visibilité centralisée, les coûts et les délais dérapent systématiquement.",
      "Les terminaux de paiement et caisses enregistreuses stockent des données bancaires clients. Le non-respect de PCI DSS lors de la fin de vie peut entraîner des amendes allant jusqu'à 100 000 € par infraction.",
      "Les volumes énormes de petits DEEE (scanners, étiquettes électroniques, accessoires) sont souvent jetés sans tri ni traçabilité dans les arrière-boutiques, créant un angle mort réglementaire et environnemental.",
      "La pression CSRD sur le Scope 3 inclut désormais les déchets électroniques. Pour les enseignes cotées, la granularité des données attendues par les analystes ESG augmente chaque année.",
      "Le storytelling ESG est devenu un levier concurrentiel critique. Dans un marché où Lidl et Aldi gagnent des parts de marché sur le prix, les enseignes premium différencient leur marque par leurs engagements environnementaux.",
      "La coordination entre le siège et les magasins franchisés ajoute une couche de complexité : les franchisés ont leurs propres contraintes et ne disposent pas toujours des moyens pour gérer correctement la fin de vie de leur matériel.",
    ],
    useCases: [
      {
        title: "Effacement certifié TPE et caisses : conformité PCI DSS garantie",
        description: "Avec 500 magasins et 5 000 à 10 000 TPE renouvelés tous les 5 à 7 ans, l'effacement conforme PCI DSS est un enjeu industriel. GreenTechCycle applique le protocole NIST 800-88 avec certificat individuel par appareil, garantissant la conformité PCI DSS de bout en bout.",
      },
      {
        title: "Waki Box dans chaque magasin : outil de marque et gestion centralisée",
        description: "La Waki Box installée dans chaque magasin sert de point de collecte pour les batteries des scanners, les petits DEEE internes, et peut même accueillir les dépôts clients (programme de reprise consommateur pour les magasins de plus de 200 m²). Le siège dispose d'un tableau de bord temps réel de l'ensemble du réseau.",
      },
      {
        title: "Reporting CSRD groupe consolidé : 800 magasins, un seul rapport",
        description: "Consolider les données de fin de vie IT de 800 magasins relevait de l'impossible avec des fichiers Excel. GreenTechCycle centralise automatiquement les flux de chaque point de vente et génère un rapport CSRD consolidé au niveau groupe, avec la granularité ESRS E5 attendue par les auditeurs.",
      },
      {
        title: "Optimisation du renouvellement des caisses",
        description: "Le scoring GreenTechCycle identifie les caisses disposant encore de 1 à 2 ans de vie utile, permettant leur réaffectation dans des magasins à moindre flux. L'économie de 200 à 500 € par caisse réutilisée, multipliée sur le réseau, représente un levier financier significatif.",
      },
    ],
    roi: [
      { lever: "Effacement unitaire TPE/caisses", gain: "-15 à 20 € par appareil" },
      { lever: "Reconditionnement back-office", gain: "+80 à 120 € par poste" },
      { lever: "Logistique multi-magasins optimisée", gain: "-35 à 45 % sur les coûts" },
      { lever: "Storytelling ESG et acquisition", gain: "Impact mesurable sur la fréquentation" },
      { lever: "Évitement PCI DSS", gain: "Jusqu'à 100 000 € par infraction" },
    ],
    personas: [
      { role: "DSI groupe", description: "Pilote la stratégie IT du réseau et les renouvellements de parc à l'échelle nationale." },
      { role: "Directeur RSE / Sustainability", description: "Porte les engagements environnementaux de l'enseigne et alimente le reporting CSRD." },
      { role: "Directeur opérations magasins", description: "Coordonne les flux logistiques et les processus opérationnels dans les points de vente." },
      { role: "Responsable PCI DSS", description: "Garantit la conformité des processus de traitement des données bancaires, y compris en fin de vie." },
      { role: "Direction Marketing", description: "Exploite les engagements ESG dans la communication de marque et le storytelling client." },
    ],
    quote: "GTC vous permet de transformer votre obligation CSRD en avantage marketing. Imaginez chacun de vos magasins équipé d'une box connectée qui mesure en temps réel ses kg DEEE, kg CO₂, alimente votre rapport groupe ET votre communication client.",
    objections: [
      {
        question: "Nos magasins sont franchisés, nous ne contrôlons pas leur IT",
        answer: "GreenTechCycle propose un modèle hybride. La plateforme et les Waki Box sont fournies par le siège dans un kit RSE franchisé. Les franchisés n'ont rien à payer et bénéficient du service. Le siège conserve la visibilité et le reporting consolidé.",
      },
      {
        question: "Nous avons déjà des accords avec des éco-organismes",
        answer: "Vos accords éco-organismes restent parfaitement valides. GreenTechCycle s'intercale en amont pour fournir la couche data et reporting que les éco-organismes ne proposent pas : traçabilité unitaire, scoring décisionnel, reporting CSRD automatisé.",
      },
    ],
    cta: {
      title: "Transformez votre ITAD retail en avantage compétitif",
      button: "Demander une démo réseau",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     5. ÉNERGIE ET UTILITIES
  ─────────────────────────────────────────────────────────────────────── */
  energie: {
    hero: {
      title: "Énergie et utilities",
      subtitle: "NIS2, CSRD, ANSSI — gérez les cycles de vie IT et OT de vos infrastructures critiques avec la traçabilité que régulateurs et investisseurs exigent.",
    },
    profile: {
      description: "Le secteur de l'énergie conjugue des infrastructures critiques, des cycles de vie OT très longs, des volumes massifs d'équipements connectés (smart meters) et une pression ESG sans égale. Les acteurs comme EDF, Engie, Veolia ou TotalEnergies opèrent des datacenters internes considérables, des milliers de sites distribués (centrales, postes électriques, stations) et font face à des vagues de renouvellement d'une ampleur inédite.",
      regulations: "NIS2 classe les opérateurs énergétiques comme opérateurs de services essentiels avec des obligations renforcées (amendes jusqu'à 10 M€ ou 2 % du CA). La CSRD place les énergéticiens en première ligne du reporting ESG. La CRE encadre les opérateurs régulés. L'ANSSI impose des exigences de cybersécurité spécifiques aux infrastructures critiques.",
    },
    painPoints: [
      "Les volumes massifs de smart meters en fin de vie représentent un défi logistique et environnemental sans précédent. Les 35 millions de compteurs Linky déployés entre 2015 et 2021 arriveront en vagues de fin de vie à partir de 2030.",
      "Les datacenters internes des grands énergéticiens comptent des milliers de serveurs renouvelés tous les 4 à 6 ans. Ces serveurs contiennent des données sensibles (consommation clients, données d'infrastructure critique) exigeant un effacement de niveau R2v3 et ISO 27001.",
      "La sécurité OT des infrastructures critiques interdit toute approximation dans la gestion de fin de vie. Un équipement réseau décommissionné contenant des configurations d'infrastructure peut représenter une vulnérabilité majeure.",
      "Les énergéticiens sont en première ligne de la CSRD. Scrutés par les analystes ESG, ils doivent produire des rapports ESRS E5 d'une rigueur supérieure à celle de tout autre secteur.",
      "Les sites distribués (centrales, postes électriques, stations de relève, équipes mobiles) multiplient les points de collecte et complexifient la logistique.",
      "Les cycles de vie atypiques coexistent : court pour les smart meters (10-15 ans), moyen pour l'IT bureautique (3-5 ans), long pour l'OT industriel (15-25 ans).",
    ],
    useCases: [
      {
        title: "Démantèlement des smart meters : anticiper la vague 2030",
        description: "Les 35 millions de compteurs Linky déployés entre 2015 et 2021 arriveront en vagues massives de fin de vie. GreenTechCycle trace le démantèlement unitaire, orchestre l'effacement des données de consommation, et organise le recyclage avec la traçabilité que l'ADEME et les régulateurs exigent.",
      },
      {
        title: "ITAD datacenters internes : sécurité et valorisation",
        description: "Des milliers de serveurs renouvelés tous les 4 à 6 ans, contenant des données clients et d'infrastructure critique. GreenTechCycle orchestre l'effacement R2v3 + ISO 27001, maximise la valeur résiduelle des serveurs reconditionnables (100 à 500 € par unité) et produit les certificats exigés par l'ANSSI.",
      },
      {
        title: "Reporting CSRD première ligne : la rigueur que les analystes exigent",
        description: "Les énergéticiens sont parmi les entreprises les plus scrutées par les analystes ESG. GreenTechCycle produit des indicateurs ESRS E5 d'une granularité et d'une fiabilité supérieures, directement exploitables dans votre déclaration CSRD et lors des roadshows investisseurs.",
      },
      {
        title: "Waki Box sites distribués",
        description: "Postes électriques, stations de relève, équipes mobiles : les petits DEEE (piles, batteries d'outillage, lampes) s'accumulent sur des centaines de sites sans filière. La Waki Box centralise ces flux et alimente automatiquement le reporting environnemental de chaque site.",
      },
    ],
    roi: [
      { lever: "Optimisation opérateurs datacenter", gain: "-50 % sur les coûts spécialisés" },
      { lever: "Volume smart meters", gain: "-3 à 5 € par unité sur le traitement" },
      { lever: "Reconditionnement serveurs", gain: "+100 à 500 € par serveur éligible" },
      { lever: "Évitement NIS2", gain: "Jusqu'à 10 M€ ou 2 % du CA" },
      { lever: "Notation ESG améliorée", gain: "Impact direct sur la valorisation boursière" },
    ],
    personas: [
      { role: "DSI groupe", description: "Pilote la stratégie IT d'un groupe multi-métiers (production, distribution, services) à l'échelle nationale ou européenne." },
      { role: "RSSI / Cyber", description: "Responsable de la sécurité des systèmes d'information, y compris la chaîne de décommissionnement des équipements critiques." },
      { role: "Directeur RSE groupe", description: "Porte les objectifs de développement durable et coordonne le reporting CSRD à l'échelle du groupe." },
      { role: "Directeur Opérations Réseau", description: "Gère les infrastructures distribuées et les cycles de vie des équipements terrain." },
      { role: "Développement Durable", description: "Définit et pilote la stratégie environnementale, interface avec les analystes ESG et les agences de notation." },
    ],
    quote: "En tant qu'opérateur essentiel NIS2 et acteur scruté ESG, vous ne pouvez pas vous permettre une chaîne ITAD opaque. GTC vous donne la visibilité granulaire que régulateurs et investisseurs exigent.",
    objections: [
      {
        question: "Nos cycles OT sont de 10 à 15 ans, ce n'est pas urgent",
        answer: "C'est justement le bon moment pour se préparer. La vague Linky et les renouvellements datacenter arrivent dans 4 à 6 ans. Mettre en place la plateforme maintenant permet d'être prêt et de capitaliser sur les premières années pour affiner les processus.",
      },
      {
        question: "Nos données sont classifiées, impossible de les mettre sur une plateforme externe",
        answer: "GreenTechCycle propose un déploiement sur site (on-premise) pour les environnements de très haute sensibilité. La plateforme est installée sur votre infrastructure, sous votre contrôle total, tout en conservant les fonctionnalités de traçabilité et reporting.",
      },
    ],
    cta: {
      title: "Préparez votre ITAD énergétique",
      button: "Demander un audit infrastructure",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     6. TRANSPORT ET LOGISTIQUE
  ─────────────────────────────────────────────────────────────────────── */
  "transport-logistique": {
    hero: {
      title: "Transport et logistique",
      subtitle: "CSRD, sites sensibles, flottes massives — gérez le cycle de vie de dizaines de milliers de terminaux mobiles sur des infrastructures critiques.",
    },
    profile: {
      description: "Transporteurs (SNCF, Air France, RATP, ADP), armateurs, routiers et logisticiens (Geodis, FM Logistic, Bolloré) opèrent des flottes IT massives et hétérogènes sur des sites sensibles. Des dizaines de milliers de PDA, des équipements embarqués dans les locomotives, bus et navires, et des entrepôts de 50 000 m² génèrent des volumes de DEEE considérables dans un contexte de forte pression CSRD et de sécurité renforcée.",
      regulations: "La CSRD s'applique aux grands transporteurs avec une attention particulière sur le Scope 3 IT, souvent moins maîtrisé que le Scope 1 carburant. Les sites sensibles (aéroports, ports, gares) imposent des contrôles d'accès stricts. Les réglementations de sûreté du transport aérien, ferroviaire et maritime encadrent la gestion des équipements numériques.",
    },
    painPoints: [
      "Les flottes de 10 000 à 100 000 PDA (contrôleurs SNCF, conducteurs, agents RATP) nécessitent un cycle de vie structuré : attribution, retour, effacement, décision, avec un tracking par utilisateur sur des milliers d'agents mobiles.",
      "Les équipements embarqués dans les locomotives, bus et navires contiennent des données opérationnelles sensibles (plans de chargement, données clients, configurations réseau). Leur effacement certifié doit être orchestré sur les sites de maintenance, pas en central.",
      "Les sites sensibles (aéroports, ports, gares) imposent des protocoles d'accès stricts qui complexifient les opérations de collecte et de traitement ITAD.",
      "Les batteries lourdes (chariots élévateurs, transpalettes, AGV) représentent un enjeu environnemental et sécuritaire majeur dans les entrepôts logistiques.",
      "Le reporting CSRD des transporteurs couvre bien le Scope 1 (carburant) et le Scope 2 (énergie), mais le Scope 3 IT est souvent un angle mort, faute de données fiables.",
      "Les opérations internationales et transfrontalières ajoutent une dimension multilingue et multi-réglementaire à la gestion ITAD.",
    ],
    useCases: [
      {
        title: "Gestion massive des terminaux mobiles",
        description: "50 000 PDA de contrôleurs, conducteurs et agents, renouvelés tous les 4 à 5 ans. GreenTechCycle trace chaque appareil par utilisateur, automatise les retours, orchestre l'effacement certifié et applique le scoring décisionnel optimal (reconditionnement interne, revente, recyclage).",
      },
      {
        title: "Effacement certifié des équipements embarqués",
        description: "Locomotives, bus, navires contiennent des données opérationnelles sensibles. GreenTechCycle orchestre l'effacement certifié directement sur les sites de maintenance, avec des certificats conformes aux exigences de sûreté du transport.",
      },
      {
        title: "Reporting CSRD fleet IT : combler l'angle mort du Scope 3",
        description: "Les transporteurs maîtrisent leur Scope 1 carburant mais pas leur Scope 3 IT. GreenTechCycle quantifie précisément l'empreinte carbone du parc IT et produit les indicateurs exploitables pour le reporting CSRD.",
      },
      {
        title: "Waki Box entrepôts et plateformes logistiques",
        description: "Un entrepôt de 50 000 m² génère des volumes importants de batteries (transpalettes, scanners, chargeurs), d'ampoules industrielles et de petits DEEE. La Waki Box centralise ces flux dans les zones pause et bureaux chefs d'équipe, avec traçabilité automatique.",
      },
    ],
    roi: [
      { lever: "Reconditionnement PDA", gain: "100 à 200 € par terminal reconditionné" },
      { lever: "Effacement embarqué centralisé", gain: "Réduction du risque réputationnel" },
      { lever: "Logistique retour optimisée", gain: "-25 à 35 % sur les coûts" },
      { lever: "Automatisation support", gain: "-0,5 ETP service support" },
    ],
    personas: [
      { role: "DSI / Directeur Numérique", description: "Pilote la transformation numérique du groupe de transport et gère un parc IT massif et hétérogène." },
      { role: "Responsable Mobilité / Fleet IT", description: "Gère le cycle de vie des terminaux mobiles attribués aux agents terrain." },
      { role: "Directeur RSE groupe", description: "Consolide les données ESG du groupe et pilote le reporting CSRD." },
      { role: "RSSI", description: "Garantit la sécurité des données sur les sites sensibles et les équipements embarqués." },
      { role: "Directeur Logistique", description: "Coordonne les flux physiques dans les entrepôts et plateformes." },
    ],
    quote: "Vous gérez des flottes IT massives sur sites sensibles. GTC tracke 100 000 appareils aussi simplement que 100, applique vos règles sécurité automatiquement, récupère du cash sur appareils que vous jetiez sans savoir.",
    objections: [
      {
        question: "Nos sites sont sécurisés avec des contrôles d'accès stricts",
        answer: "GreenTechCycle s'adapte à vos protocoles de sûreté. Nos équipes sont habituées aux environnements sensibles (aéroports, gares, ports) et disposent des habilitations nécessaires.",
      },
      {
        question: "Les volumes de PDA changent beaucoup d'une année sur l'autre",
        answer: "La tarification GreenTechCycle est flexible et s'adapte aux volumes réels traités. Pas d'engagement volume minimum, pas de surfacturation en cas de pic.",
      },
    ],
    cta: {
      title: "Structurez votre ITAD transport",
      button: "Demander un audit fleet",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     7. SECTEUR PUBLIC ET COLLECTIVITÉS
  ─────────────────────────────────────────────────────────────────────── */
  public: {
    hero: {
      title: "Secteur public et collectivités",
      subtitle: "Loi AGEC, BEGES, ANSSI — respectez vos obligations d'exemplarité environnementale tout en récupérant du budget sur votre parc IT.",
    },
    profile: {
      description: "L'État (ministères), les opérateurs publics (CNAM, Pôle Emploi, CAF), les collectivités (régions, départements, communes) et les établissements publics (universités, hôpitaux, ÉPIC) représentent des volumes de 20 000 à 200 000 postes par ministère. Les contraintes spécifiques des marchés publics, l'exemplarité environnementale attendue et les exigences de sécurité ANSSI pour les ministères régaliens font de l'ITAD public un domaine à part.",
      regulations: "La loi AGEC et le décret 3R imposent des objectifs chiffrés de réemploi (minimum 20 %). Le BEGES est obligatoire pour les collectivités de plus de 50 000 habitants (article L229-25). L'ANSSI encadre la sécurité des ministères régaliens et des OIV. Les marchés publics (BOAMP, TED) imposent des processus d'achat spécifiques.",
    },
    painPoints: [
      "Les processus d'achat public (BOAMP, TED, UGAP) allongent considérablement les cycles de vente et imposent des contraintes de forme qui découragent de nombreux prestataires ITAD.",
      "Les décrets d'exemplarité environnementale (loi AGEC, décret 3R, économie circulaire dans la commande publique) imposent des objectifs chiffrés de réemploi qui doivent être documentés et vérifiables.",
      "Les volumes sont considérables (20 000 à 200 000 postes par ministère) mais les budgets sont contraints. Chaque euro économisé ou récupéré par le reconditionnement est un argument politique fort.",
      "La sécurité ANSSI des ministères régaliens (Défense, Intérieur, Affaires Étrangères) exige des niveaux d'effacement et de traçabilité acceptables par les inspections internes, avec des classifications RGS spécifiques.",
      "Les structures inter-administrations et les mutualisations compliquent la gouvernance ITAD : qui est responsable, quels processus s'appliquent, comment consolider les données ?",
      "Le BEGES obligatoire pour les collectivités de plus de 50 000 habitants nécessite des données exploitables sur le parc IT que peu d'administrations sont capables de produire.",
    ],
    useCases: [
      {
        title: "Référencement marché public UGAP",
        description: "L'accès au marché public via les centrales d'achat (UGAP, CAIH) représente un canal de vente à long terme avec des volumes considérables. GreenTechCycle accompagne la démarche de référencement et propose une offre calibrée pour les dizaines de milliers d'acheteurs publics éligibles.",
      },
      {
        title: "Conformité loi AGEC et décret 3R",
        description: "La loi AGEC impose un minimum de 20 % de réemploi dans les achats publics. GreenTechCycle trace chaque équipement, documente sa destination (réemploi, recyclage, destruction) et produit les rapports trimestriels et annuels exigés par les tutelles.",
      },
      {
        title: "Bilan carbone obligatoire (BEGES)",
        description: "L'article L229-25 du code de l'environnement impose un BEGES aux collectivités de plus de 50 000 habitants. GreenTechCycle fournit les données exploitables pour la composante IT du bilan : empreinte carbone par poste, par site, par catégorie d'équipement.",
      },
      {
        title: "Effacement renforcé ministères régaliens",
        description: "Les ministères de la Défense, de l'Intérieur et des Affaires Étrangères opèrent sous des niveaux de classification RGS spécifiques. GreenTechCycle propose un service d'effacement renforcé avec traçabilité acceptable par les inspections internes et les audits de sécurité ministériels.",
      },
    ],
    roi: [
      { lever: "Conformité AGEC documentée", gain: "Réputation d'exemplarité" },
      { lever: "Reconditionnement bureautique", gain: "60 à 80 € par poste" },
      { lever: "Automatisation BEGES", gain: "-0,3 à 0,5 ETP" },
      { lever: "Logistique multi-sites optimisée", gain: "-30 à 40 %" },
    ],
    personas: [
      { role: "DSI / Directeur Numérique", description: "Pilote la stratégie numérique de l'administration et gère les renouvellements de parc." },
      { role: "Acheteurs commande publique", description: "Maîtrisent les procédures de marchés publics et recherchent des solutions conformes et référencées." },
      { role: "RMNR", description: "Le Référent Ministériel Numérique Responsable porte les objectifs de sobriété numérique et de réemploi." },
      { role: "Directeur RSE collectivités", description: "Coordonne les engagements environnementaux et le BEGES de la collectivité." },
      { role: "RSSI ministériel", description: "Définit les exigences de sécurité pour la fin de vie des équipements, en fonction du niveau de classification." },
    ],
    quote: "GTC vous aide à respecter vos obligations AGEC et bilan carbone tout en récupérant du budget. Notre plateforme est conçue pour s'intégrer à vos processus marchés publics.",
    objections: [
      {
        question: "Les cycles d'achat public sont très longs (12-24 mois)",
        answer: "Nous connaissons les contraintes des marchés publics et nous y sommes adaptés. L'investissement initial dans le référencement ouvre ensuite un canal récurrent de volume considérable.",
      },
      {
        question: "La sécurité ANSSI interdit certains traitements sur plateforme externe",
        answer: "GreenTechCycle propose un déploiement on-premise pour les environnements régaliens classifiés. La plateforme est installée sur votre infrastructure, sous votre contrôle total.",
      },
    ],
    cta: {
      title: "Modernisez votre ITAD publique",
      button: "Demander un audit public",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     8. TECH ET SERVICES NUMÉRIQUES
  ─────────────────────────────────────────────────────────────────────── */
  tech: {
    hero: {
      title: "Tech et services numériques",
      subtitle: "Marque employeur, MacBook Pro, CSRD — transformez vos laptops haut de gamme en levier RSE et en économies massives.",
    },
    profile: {
      description: "ESN, éditeurs SaaS, pure players, agences digitales et scale-ups partagent un profil commun : des parcs 100 % laptops, souvent haut de gamme (MacBook Pro à 2 000-3 000 €), un renouvellement fréquent (3 ans pour les développeurs), une marque employeur où la RSE pèse de plus en plus, et une croissance rapide qui fait grossir le parc sans visibilité. La valeur résiduelle de ces équipements est considérable — et souvent perdue.",
      regulations: "La CSRD s'appliquera progressivement aux scale-ups dépassant 250 salariés. Le RGPD encadre strictement les données sensibles stockées sur les laptops (code source, accès clients, propriété intellectuelle). Les obligations de conformité s'intensifient à mesure que les entreprises tech grandissent.",
    },
    painPoints: [
      "Le renouvellement des laptops développeurs tous les 3 ans génère des volumes constants et prévisibles. Pourtant, la plupart des entreprises tech n'ont pas de processus structuré pour gérer la fin de vie de ces équipements coûteux.",
      "La marque employeur est un enjeu critique dans la guerre des talents tech. Les développeurs, de plus en plus sensibles aux engagements RSE de leur employeur, évaluent la cohérence entre discours et pratiques.",
      "La croissance rapide des scale-ups fait grossir le parc IT sans que la visibilité suive. Quand l'entreprise passe de 50 à 500 collaborateurs en 3 ans, la gestion du parc en fin de vie est rarement une priorité — jusqu'à ce que les armoires débordent.",
      "Les données stockées sur les laptops (code source, accès clients, propriété intellectuelle) sont parmi les plus sensibles de l'entreprise. Un laptop mal effacé peut compromettre des mois de développement ou des accès clients.",
      "Les MacBook Pro et stations de travail haut de gamme conservent une valeur résiduelle élevée (400 à 800 € après 3 ans) qui est systématiquement perdue quand les appareils sont simplement stockés ou jetés.",
    ],
    useCases: [
      {
        title: "Réemploi interne : un MacBook Pro senior devient un poste commercial",
        description: "Un MacBook Pro de 3 ans pour un développeur senior conserve une puissance largement suffisante pour un commercial, un RH ou un junior. L'économie de 1 500 à 2 500 € par poste, sur 100 postes par an, représente 150 000 à 250 000 € d'économies annuelles. GreenTechCycle orchestre l'effacement, le reconditionnement et la réattribution.",
      },
      {
        title: "Marque employeur RSE : des indicateurs publiables",
        description: "GreenTechCycle produit des indicateurs concrets et vérifiables : kg de CO₂ évités, taux de réemploi, nombre d'appareils reconditionnés. Ces chiffres alimentent directement vos communications RH (LinkedIn, page carrières, jobboards) et renforcent votre attractivité auprès des talents sensibles à l'engagement environnemental.",
      },
      {
        title: "Programme collaborateur partant : le laptop reconditionné comme avantage RH",
        description: "Un collaborateur quitte l'entreprise ? Proposez-lui de racheter son laptop reconditionné à prix avantageux. GreenTechCycle orchestre l'effacement certifié, le reconditionnement, le transfert de propriété et la facturation. Un avantage RH apprécié qui prolonge la durée de vie de l'appareil.",
      },
      {
        title: "Reporting CSRD scale-ups : anticiper le cap des 250 salariés",
        description: "La CSRD s'appliquera à terme aux entreprises dépassant 250 salariés. Mettre GreenTechCycle en place dès maintenant permet de constituer un historique de données, de roder les processus et d'arriver préparé le jour où l'obligation s'applique.",
      },
    ],
    roi: [
      { lever: "Réemploi interne MacBook Pro", gain: "1 500 à 2 500 € par poste réutilisé" },
      { lever: "Revente externe", gain: "400 à 800 € par poste revendu" },
      { lever: "Évitement RGPD code source", gain: "Jusqu'à 4 % du CA" },
      { lever: "Marque employeur", gain: "Amélioration du taux de conversion talents" },
    ],
    personas: [
      { role: "DSI / CTO", description: "Pilote la stratégie technique et gère le parc d'équipements développeurs." },
      { role: "DRH / People", description: "Porte la marque employeur et recherche des leviers d'attractivité différenciants." },
      { role: "CFO", description: "Optimise les coûts et identifie les leviers de récupération de valeur." },
      { role: "CEO / Fondateur", description: "Incarne les valeurs de l'entreprise et arbitre les investissements stratégiques." },
    ],
    quote: "Vos développeurs vous coûtent 100 000 € par an mais leur laptop change tous les 3 ans pour 2 500 €. GTC vous fait économiser 50 % via le réemploi interne, tout en construisant votre crédibilité RSE pour attirer les meilleurs talents. Retour sur investissement à 3 mois.",
    objections: [
      {
        question: "On n'est que 80, la CSRD ne s'applique pas encore",
        answer: "Justement, c'est le moment idéal. Mettre en place les processus maintenant, quand les volumes sont gérables, permet d'arriver préparé quand l'obligation s'appliquera. Et les économies de réemploi sont immédiates, quelle que soit votre taille.",
      },
      {
        question: "On gère ça en interne avec un tableur",
        answer: "Le tableur fonctionne jusqu'à 50 postes. Au-delà, les oublis s'accumulent, les laptops traînent dans les armoires, et la valeur résiduelle se dégrade. GreenTechCycle automatise ce que le tableur ne peut pas : scoring, effacement certifié, traçabilité opposable.",
      },
    ],
    cta: {
      title: "Optimisez votre parc tech",
      button: "Demander une démo scale-up",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     9. MÉDIAS ET AUDIOVISUEL ⭐
  ─────────────────────────────────────────────────────────────────────── */
  "medias-audiovisuel": {
    hero: {
      title: "Médias et audiovisuel",
      subtitle: "CSRD, propriété intellectuelle, sécurité broadcast — la plateforme ITAD de référence pour les groupes médias français, validée par TF1.",
    },
    profile: {
      description: "Groupes TV (TF1, M6, France TV, Canal+, Arte), radio (Radio France, RTL, NRJ, Lagardère), presse (Le Monde, Bouygues Médias, Bertelsmann), producteurs et studios (Banijay, Mediawan, Newen), streaming (Salto, Molotov) et régies publicitaires (TF1 Pub, M6 Pub, FranceTV Pub) opèrent des parcs IT massifs et hétérogènes. La coexistence de postes bureautiques classiques et d'équipements broadcast de haute valeur (stations de montage, serveurs vidéo, caméras IP, régies de production) crée un environnement ITAD unique en son genre.",
      regulations: "La CSRD s'applique aux groupes cotés (TF1, M6 via RTL Group, Lagardère). Le RGPD protège les données des contributeurs et talents. Les conventions ARCOM encadrent les obligations des diffuseurs hertziens. La propriété intellectuelle des contenus stockés est un enjeu juridique majeur. La sécurité physique des régies en direct impose des contraintes spécifiques.",
    },
    painPoints: [
      "L'hétérogénéité IT est extrême dans les médias : postes bureautiques standards, stations de montage haut de gamme (Avid, Final Cut, Premiere à 6 000-15 000 €), serveurs vidéo, caméras IP, régies de production coexistent avec des cycles de vie très différents (3 ans bureau, 5-7 ans stations, 7-10 ans régies).",
      "Les stations de montage contiennent des données ultra-sensibles : rushs non diffusés, contenus sous embargo, archives valant des millions d'euros. Une faille dans la chaîne ITAD peut coûter une exclusivité, une avant-première, un contrat.",
      "Les sites multiples avec régies déportées (événementiel, sport, terrain) génèrent un flux permanent de matériel mobile dont la traçabilité est un défi quotidien.",
      "La pression ESG est forte sur les marques médias publiques, scrutées par les ONG, les téléspectateurs et les régulateurs. Le risque de greenwashing est réel si les chiffres communiqués ne sont pas auditables.",
      "La propriété intellectuelle contractuelle ajoute une dimension juridique : certains contenus stockés appartiennent à des tiers (producteurs, distributeurs) et leur effacement doit être documenté et opposable.",
      "Les batteries professionnelles broadcast (caméras, packs lumière, talkies-walkies, micros HF) sont massives (100-300 Wh par batterie Anton/Bauer ou V-Mount) et présentent des risques d'incendie importants nécessitant une gestion tracée avec des partenaires habilités transport ADR.",
    ],
    useCases: [
      {
        title: "Effacement certifié stations de montage et serveurs vidéo",
        description: "Les stations de montage contiennent des téraoctets de rushs, prémontages, archives clients et contenus sous embargo. GreenTechCycle orchestre un effacement NIST 800-88 Purge avec vérification approfondie, produit un certificat opposable et documente la chaîne de traçabilité de la régie à la destination finale. Les groupes médias comptent 200 à 1 500 stations actives et en traitent 30 à 250 par an.",
      },
      {
        title: "Reconditionnement et réemploi interne des stations broadcast",
        description: "Une station Avid, Final Cut ou Premiere achetée 6 000 à 15 000 € pour les effets spéciaux ou l'étalonnage cinéma conserve une puissance largement suffisante pour le news, le sport ou la post-production légère après 3 à 5 ans. Le scoring automatique évalue la puissance résiduelle par rapport à la criticité de l'usage cible. L'économie de 1 500 à 3 000 € par station, sur 50 à 100 unités par an, représente 75 000 à 300 000 € d'économies.",
      },
      {
        title: "Reporting CSRD ESRS E5 spécifique secteur médias",
        description: "TF1, M6, Lagardère et Vivendi-Canal+ sont scrutés par les analystes ESG. Le Scope 3 IT et broadcast est méconnu mais significatif. GreenTechCycle fournit la granularité ESRS E5 par type de matériel et produit des chiffres précis et auditables exploitables à la fois dans le reporting CSRD et dans les reportages développement durable diffusés à l'antenne.",
      },
      {
        title: "Gestion des batteries professionnelles broadcast",
        description: "Une caméra de reportage utilise 4 à 8 batteries Anton/Bauer ou V-Mount Sony de 100 à 300 Wh chacune. Les régies plateau comptent des dizaines de talkies-walkies, micros HF et lumières LED autonomes. GreenTechCycle centralise la gestion de ces batteries avec des partenaires habilités transport ADR et une traçabilité complète.",
      },
      {
        title: "Programme régies événementielles et sport",
        description: "Roland-Garros, Tour de France, Coupe du Monde, festivals, JO : chaque événement majeur génère un pic de déploiement et de démontage IT. GreenTechCycle propose un mode événementiel avec préparation pré-événement et traitement post-événement, garantissant un bon traitement de chaque équipement dans des délais serrés.",
      },
    ],
    roi: [
      { lever: "Réemploi interne stations", gain: "1 500 à 3 000 € par station" },
      { lever: "Effacement broadcast sécurisé", gain: "Évitement contentieux propriété intellectuelle" },
      { lever: "Revente équipements éligibles", gain: "500 à 2 000 € par poste" },
      { lever: "Logistique multi-sites broadcast", gain: "-30 à 40 % sur les coûts" },
      { lever: "Automatisation reporting", gain: "-0,5 à 1 ETP" },
      { lever: "Évitement RGPD fuite contenu", gain: "Jusqu'à 4 % du CA" },
      { lever: "Storytelling ESG image", gain: "Crédibilité mesurable auprès du public" },
    ],
    personas: [
      { role: "DSI / Directeur Technique", description: "Pilote la stratégie IT et broadcast du groupe, gère un parc hétérogène de haute valeur." },
      { role: "Directeur Broadcast / Antennes", description: "Responsable des équipements de production et de diffusion, arbitre les renouvellements de stations." },
      { role: "RSSI", description: "Garant de la sécurité des contenus, valide les niveaux d'effacement par catégorie." },
      { role: "Directeur RSE / Sustainability", description: "Porte les engagements ESG du groupe et exploite les données dans la communication corporate." },
      { role: "Achats", description: "Négocie les contrats ITAD et recherche des leviers d'optimisation sur un parc de haute valeur." },
      { role: "Direction Juridique", description: "Veille au respect de la propriété intellectuelle et de la confidentialité contractuelle dans la chaîne ITAD." },
    ],
    quote: "Vos stations de montage contiennent les rushs qui font la différence entre vous et vos concurrents. Une faille ITAD peut coûter une exclusivité, une avant-première, un contrat. GTC est la seule plateforme qui réconcilie effacement certifié niveau broadcast, traçabilité opposable aux tribunaux, optimisation économique du parc, et reporting ESG groupe.",
    tf1Reference: "TF1 nous fait confiance pour la gestion de son parc IT et broadcast. Nous comprenons les contraintes spécifiques de votre secteur, des stations de montage haut de gamme aux batteries broadcast, en passant par le reporting ESG groupe. Voici comment nous pouvons reproduire ces résultats chez vous.",
    objections: [
      {
        question: "Notre matériel broadcast est trop spécifique pour une plateforme généraliste",
        answer: "Le modèle de données GreenTechCycle accepte tout type d'équipement avec des règles de scoring et de décision spécifiques par catégorie. TF1 nous confie ses stations Avid, ses serveurs vidéo et ses caméras IP — la preuve que la plateforme s'adapte aux spécificités broadcast.",
      },
      {
        question: "Nos prestataires actuels sont des spécialistes broadcast",
        answer: "GreenTechCycle orchestre, ne remplace pas. Vos prestataires spécialisés restent en place. La plateforme ajoute la visibilité unifiée et le reporting consolidé qui manquent quand chaque prestataire travaille en silo.",
      },
      {
        question: "Le risque de fuite de contenus est critique, on ne peut pas prendre ce risque",
        answer: "Le risque maximal est justement le statu quo : des processus Excel, des prestataires multiples sans chaîne de traçabilité unifiée. GreenTechCycle crée une chaîne de traçabilité irréfutable avec signatures, horodatages et photos à chaque étape — le niveau de preuve que vos juristes exigent.",
      },
      {
        question: "Notre storytelling ESG est géré en interne par la communication",
        answer: "Des chiffres précis et auditables sont nécessaires. Une communication basée sur des estimations expose au risque de greenwashing, avec des conséquences ARCOM et ONG. GreenTechCycle fournit les chiffres réels, mesurés et certifiés que votre direction de la communication peut exploiter en toute sécurité.",
      },
    ],
    cta: {
      title: "Rejoignez TF1 et sécurisez votre ITAD broadcast",
      button: "Demander une démo médias",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     10. CONSEIL, AUDIT ET SERVICES PROFESSIONNELS
  ─────────────────────────────────────────────────────────────────────── */
  conseil: {
    hero: {
      title: "Conseil, audit et services professionnels",
      subtitle: "Secret professionnel, mobilité, rigueur — vos pratiques ITAD doivent être à la hauteur de ce que vous vendez à vos clients.",
    },
    profile: {
      description: "Cabinets de conseil (Big 4, Tier 2, boutiques), cabinets d'avocats, experts-comptables, cabinets RH et agences opèrent des parcs 100 % laptops avec une mobilité extrême. Le secret professionnel impose un niveau de rigueur ITAD supérieur : un laptop de partner mal effacé peut compromettre des dossiers clients et engager la responsabilité du cabinet.",
      regulations: "Le secret professionnel (avocats, auditeurs, experts-comptables) encadre strictement la protection des données clients. Le RGPD s'applique aux données personnelles traitées pour le compte des clients. La CSRD touche les cabinets indirectement via les questionnaires ESG de leurs clients grands comptes.",
    },
    painPoints: [
      "Le secret professionnel est la pierre angulaire des métiers de conseil et d'audit. Un laptop de partner contenant des dossiers clients sensibles, mal effacé et revendu, peut entraîner une mise en cause du cabinet et la perte de clients majeurs.",
      "La mobilité extrême des consultants multiplie les risques : laptops perdus, volés, oubliés dans des taxis ou des salons d'aéroport. Chaque appareil égaré est potentiellement un dossier client compromis.",
      "Le renouvellement rapide (2 à 3 ans pour les seniors) génère un flux constant d'équipements à traiter, sans que les cabinets disposent toujours d'un processus structuré.",
      "Les clients grands comptes imposent des questionnaires ESG de plus en plus détaillés. La réponse sur la gestion des déchets IT du cabinet doit être rapide, documentée et crédible.",
      "Un cabinet qui vend de la rigueur et de la conformité à ses clients se doit d'appliquer les mêmes standards en interne. L'incohérence entre le discours et les pratiques est un risque réputationnel.",
    ],
    useCases: [
      {
        title: "Effacement certifié garantissant le secret professionnel",
        description: "Un mauvais effacement du laptop d'un partner peut entraîner une mise en cause du cabinet et la perte de clients. GreenTechCycle applique l'effacement NIST 800-88 Purge avec certificat opposable, garantissant que les données clients sont irréversiblement détruites et que la preuve est juridiquement recevable.",
      },
      {
        title: "Réemploi interne entre missions et niveaux hiérarchiques",
        description: "Le laptop d'un senior parti en mission longue peut être réattribué. Le laptop d'un partner partant à la retraite peut servir à un junior. GreenTechCycle orchestre les réattributions internes avec effacement certifié entre chaque utilisateur.",
      },
      {
        title: "Réponse instantanée aux questionnaires ESG clients",
        description: "Les Big 4 et grandes ETI demandent à leurs prestataires des données ESG précises. GreenTechCycle répond instantanément avec les kg de CO₂ évités, le taux de réemploi et la traçabilité complète. Un avantage commercial lors des renouvellements de contrats.",
      },
    ],
    roi: [
      { lever: "Réemploi interne laptops", gain: "800 à 1 500 € par poste réattribué" },
      { lever: "Revente externe", gain: "300 à 600 € par poste" },
      { lever: "Évitement mise en cause secret pro", gain: "Inestimable (réputation + clients)" },
      { lever: "Gain commercial ESG", gain: "Avantage dans les renouvellements de contrats" },
    ],
    personas: [
      { role: "DSI / Directeur IT", description: "Gère le parc de laptops du cabinet et les processus de renouvellement." },
      { role: "Managing Partner", description: "Porte la responsabilité du cabinet et la conformité aux obligations professionnelles." },
      { role: "DRH", description: "Gère les arrivées et départs de collaborateurs et les réattributions d'équipements." },
      { role: "Responsable conformité", description: "Veille au respect du secret professionnel et des obligations réglementaires." },
    ],
    quote: "Votre métier repose sur la confidentialité et la rigueur. Vos pratiques internes doivent être à la hauteur de ce que vous vendez. GTC vous donne la traçabilité irréfutable que votre clause de confidentialité exige.",
    objections: [
      {
        question: "Nous ne sommes que 200, c'est gérable manuellement",
        answer: "200 laptops renouvelés tous les 3 ans, c'est 65 appareils par an à traiter correctement. Un seul oubli peut coûter un client. GreenTechCycle structure le processus et élimine le risque d'erreur humaine.",
      },
      {
        question: "Notre IT gère déjà l'effacement en interne",
        answer: "Votre IT efface les données, mais produit-elle des certificats opposables en cas de litige ? La traçabilité GreenTechCycle est conçue pour résister à un examen juridique — pas seulement pour cocher une case.",
      },
    ],
    cta: {
      title: "Sécurisez votre ITAD conseil",
      button: "Demander un audit confidentialité",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     11. PHARMACEUTIQUE ET BIOTECH
  ─────────────────────────────────────────────────────────────────────── */
  "pharma-biotech": {
    hero: {
      title: "Pharmaceutique et biotech",
      subtitle: "BPF, GxP, FDA/EMA — une traçabilité ITAD opposable aux régulateurs les plus exigeants au monde.",
    },
    profile: {
      description: "Laboratoires (Sanofi, Servier, Pierre Fabre), biotechs, CRO et CDMO opèrent à la croisée de la recherche de pointe et de la réglementation la plus stricte. Les données R&D valant des centaines de millions d'euros (formules, brevets, résultats d'essais cliniques) coexistent avec des équipements de laboratoire (HPLC, séquenceurs, microscopes) stockant localement des données d'essais. Les cycles de vie sont longs (7-10 ans pour un poste chercheur) et les certifications ISO systématiques.",
      regulations: "Les Bonnes Pratiques de Fabrication (BPF) et le cadre GxP encadrent les processus IT. La FDA et l'EMA imposent des exigences de validation et de traçabilité pour les équipements impliqués dans les essais cliniques. L'ISO 14001 et ISO 27001 sont systématiques dans la Big Pharma. La CSRD place les grands laboratoires sous le regard des analystes ESG.",
    },
    painPoints: [
      "La validation GxP des processus IT, y compris l'ITAD, est une exigence réglementaire. Tout processus touchant à des équipements impliqués dans des essais cliniques doit être documenté, validé et auditable selon les standards FDA/EMA.",
      "Les données de recherche valent des centaines de millions d'euros. Des formules de médicaments, des brevets en cours, des résultats d'essais cliniques : une fuite ITAD peut compromettre des années de R&D et des autorisations de mise sur le marché.",
      "Les équipements de laboratoire (HPLC, séquenceurs, microscopes) stockent localement des données d'essais cliniques. Leur fin de vie nécessite un effacement spécifique, souvent plus complexe que pour l'IT bureautique standard.",
      "Les cycles de vie longs (7-10 ans pour un poste chercheur) signifient que les équipements accumulent des années de données sensibles avant d'être décommissionnés.",
      "Les sites internationaux ajoutent une dimension multi-réglementaire : chaque pays a ses propres exigences en matière de destruction de données et de gestion des déchets électroniques.",
    ],
    useCases: [
      {
        title: "Effacement R&D avec preuve opposable aux autorités",
        description: "Quand une biotech dépose un brevet, la traçabilité de la destruction des données associées peut devenir un enjeu juridique. GreenTechCycle produit une traçabilité horodatée et signée, opposable devant les tribunaux et les autorités réglementaires.",
      },
      {
        title: "ITAD validée GxP pour les équipements d'essais cliniques",
        description: "Les équipements impliqués dans des essais cliniques BPF nécessitent un processus ITAD validé et auditable. GreenTechCycle propose une variante de service spécifiquement conçue pour passer les audits externes FDA et EMA.",
      },
      {
        title: "Reporting CSRD analystes : la granularité que la Big Pharma exige",
        description: "Les grands laboratoires sont scrutés par les analystes ESG sur leur Scope 3, y compris les déchets IT. GreenTechCycle fournit la granularité et la fiabilité des données que les rapports CSRD de la Big Pharma exigent.",
      },
    ],
    roi: [
      { lever: "Reconditionnement IT bureautique", gain: "50 à 120 € par poste" },
      { lever: "Conformité GxP documentée", gain: "Évitement de non-conformité audit" },
      { lever: "Protection brevets et R&D", gain: "Valeur inestimable (centaines de M€ de R&D)" },
      { lever: "Reporting CSRD automatisé", gain: "-0,3 à 0,5 ETP" },
    ],
    personas: [
      { role: "DSI / Directeur IT", description: "Gère un parc IT hybride (bureautique + labo) dans un environnement fortement réglementé." },
      { role: "Responsable Qualité / Validation", description: "Valide les processus GxP et prépare les audits FDA/EMA." },
      { role: "RSSI", description: "Protège les données R&D et les propriétés intellectuelles du groupe." },
      { role: "Directeur RSE", description: "Porte les objectifs CSRD et consolide les données ESG multi-sites." },
    ],
    quote: "Dans votre secteur, une faille de traçabilité ITAD peut coûter un brevet ou une autorisation FDA. GTC produit les preuves opposables aux régulateurs les plus exigeants au monde.",
    objections: [
      {
        question: "La validation GxP est un processus long et coûteux",
        answer: "GreenTechCycle a pré-documenté les protocoles de validation pour l'ITAD pharma. L'accompagnement réduit considérablement le temps et le coût de la validation initiale.",
      },
      {
        question: "Nos données sont trop sensibles pour quitter nos murs",
        answer: "L'effacement est réalisé sur site dans vos locaux. Les données ne quittent jamais votre infrastructure. Seules les métadonnées de traçabilité (certificats, horodatages) sont enregistrées sur la plateforme.",
      },
    ],
    cta: {
      title: "Sécurisez votre ITAD pharma",
      button: "Demander un audit GxP",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     12. CONSTRUCTION ET BTP
  ─────────────────────────────────────────────────────────────────────── */
  btp: {
    hero: {
      title: "Construction et BTP",
      subtitle: "CSRD donneurs d'ordre, chantiers distribués — centralisez la gestion de vos terminaux mobiles et batteries lourdes.",
    },
    profile: {
      description: "Les majors du BTP (Vinci, Bouygues, Eiffage), les ETI régionales et les artisans opèrent dans un environnement où le numérique gagne du terrain (BIM, drones, tablettes terrain) tandis que les structures IT restent souvent peu formalisées. Les tablettes durcies cassées, perdues ou volées (15-25 % par an), les drones professionnels et leurs batteries lithium, et la multiplication des chantiers temporaires créent des défis ITAD spécifiques.",
      regulations: "La CSRD s'applique indirectement via les majors qui exigent des données ESG de leurs sous-traitants. Les réglementations environnementales encadrent la gestion des déchets sur les chantiers. La filière batteries lithium (drones, outillage) est soumise à des obligations de traçabilité spécifiques.",
    },
    painPoints: [
      "Les tablettes durcies utilisées sur les chantiers subissent un taux de casse, perte et vol de 15 à 25 % par an. Sans processus structuré, ces appareils (et les données qu'ils contiennent) disparaissent sans traçabilité.",
      "Les drones professionnels et leurs batteries lithium (200-500 g par batterie) nécessitent une filière de traitement dédiée avec des partenaires habilités.",
      "La pression CSRD arrive via les majors du BTP qui demandent des données ESG précises à leurs sous-traitants. Une réponse rapide et documentée est un avantage compétitif dans les appels d'offres.",
      "Les multiples chantiers temporaires compliquent la logistique de collecte et de traitement des équipements en fin de vie.",
      "Les entreprises du BTP disposent rarement d'une équipe IT structurée capable de gérer un processus ITAD formalisé.",
    ],
    useCases: [
      {
        title: "Gestion centralisée des terminaux mobiles chantier",
        description: "Avec 5 000 à 20 000 tablettes et PDA déployés sur les chantiers, GreenTechCycle trace chaque appareil, automatise les remplacements et orchestre la récupération pour reconditionnement. Le taux de perte est réduit et la valeur résiduelle est maximisée.",
      },
      {
        title: "Gestion des batteries lourdes (drones et équipements)",
        description: "Les batteries lithium des drones professionnels (200-500 g) nécessitent une filière dédiée avec des partenaires habilités au transport ADR. GreenTechCycle centralise et trace cette filière.",
      },
      {
        title: "Reporting CSRD donneurs d'ordre",
        description: "Les ETI du BTP qui répondent rapidement aux questionnaires ESG des majors gagnent un avantage dans les appels d'offres. GreenTechCycle automatise la production de ces réponses.",
      },
    ],
    roi: [
      { lever: "Réduction perte/vol tablettes", gain: "-10 à 15 % sur le taux de perte" },
      { lever: "Reconditionnement tablettes", gain: "80 à 150 € par tablette" },
      { lever: "Avantage commercial RFP ESG", gain: "Impact sur le taux de succès" },
    ],
    personas: [
      { role: "DSI / Responsable IT", description: "Gère un parc IT dispersé sur de nombreux chantiers avec des moyens souvent limités." },
      { role: "Responsable QSE", description: "Porte les certifications et la conformité environnementale du groupe." },
      { role: "Direction des achats", description: "Recherche des solutions simples et économiques pour la gestion des déchets électroniques." },
    ],
    quote: "Vos tablettes terrain valent encore de l'argent. GTC les trace, les récupère et les reconditionne — au lieu de les perdre sur les chantiers.",
    objections: [
      {
        question: "On n'a pas d'équipe IT dédiée pour gérer ça",
        answer: "GreenTechCycle est conçu pour fonctionner sans équipe IT dédiée. L'onboarding est simple, la plateforme est intuitive, et notre support accompagne vos chefs de chantier dans l'utilisation quotidienne.",
      },
      {
        question: "Les volumes par chantier sont trop faibles",
        answer: "C'est la consolidation qui crée la valeur. 20 tablettes par chantier sur 100 chantiers, c'est 2 000 tablettes à gérer. GreenTechCycle centralise et optimise ces flux fragmentés.",
      },
    ],
    cta: {
      title: "Structurez votre ITAD chantier",
      button: "Demander un audit terrain",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     13. HÔTELLERIE, RESTAURATION ET TOURISME
  ─────────────────────────────────────────────────────────────────────── */
  horeca: {
    hero: {
      title: "Hôtellerie, restauration et tourisme",
      subtitle: "PCI DSS, CSRD, storytelling RSE — transformez la gestion de vos équipements en levier de marque et de conformité.",
    },
    profile: {
      description: "Les groupes hôteliers (Accor, Louvre Hotels), la restauration collective (Areas, Elior, Sodexo) et le tourisme (Pierre & Vacances, Club Med) opèrent des réseaux de 200 à 5 000 établissements. Les parcs IT mêlent TPE, caisses, terminaux client (PMS, check-in), TV de chambres et équipements wellness. Le storytelling RSE est devenu un levier de marque essentiel dans un secteur tourné vers l'expérience client.",
      regulations: "PCI DSS encadre les terminaux de paiement dans l'hôtellerie et la restauration. Le RGPD protège les données de réservation et les informations bancaires des clients. La CSRD s'applique aux groupes cotés avec des exigences de reporting ESG croissantes.",
    },
    painPoints: [
      "Les volumes massifs de TPE et caisses enregistreuses dans 200 à 5 000 établissements nécessitent un effacement conforme PCI DSS à l'échelle industrielle.",
      "Le renouvellement des TV de chambres et équipements wellness (500 hôtels sur des cycles de 5-7 ans) génère des volumes importants de DEEE sans filière structurée.",
      "Les terminaux clients (PMS, check-in) stockent des données de réservation et des informations bancaires dont l'effacement est obligatoire.",
      "La saisonnalité génère des pics de petits DEEE (loisirs, jouets piscine, télécommandes) souvent gérés sans traçabilité.",
      "Le storytelling RSE est crucial dans un secteur où l'image de marque et l'expérience client sont les premiers leviers de différenciation.",
    ],
    useCases: [
      {
        title: "Renouvellement TV chambres et équipements : de la dépose au reporting",
        description: "500 hôtels, des cycles de 5-7 ans : le renouvellement des TV de chambres et des équipements est un projet logistique majeur. GreenTechCycle orchestre la dépose, le tri B2B/recyclage et produit la traçabilité ESG exploitable dans le rapport CSRD du groupe.",
      },
      {
        title: "Effacement certifié terminaux client PMS et check-in",
        description: "Les bornes de check-in et les terminaux PMS stockent des données de réservation et des numéros de carte bancaire. GreenTechCycle garantit l'effacement conforme et produit les certificats PCI DSS unitaires.",
      },
      {
        title: "Waki Box en arrière-cuisine et services : storytelling client",
        description: "La Waki Box installée dans les zones de service collecte les piles, télécommandes et petits équipements. Au-delà de la conformité, elle devient un élément de communication client, illustrant l'engagement environnemental de l'établissement.",
      },
    ],
    roi: [
      { lever: "Reconditionnement back-office", gain: "60 à 100 € par poste" },
      { lever: "Effacement PCI DSS certifié", gain: "Évitement amende (jusqu'à 100 000 €)" },
      { lever: "Storytelling RSE marque", gain: "Impact sur la satisfaction et fidélité client" },
    ],
    personas: [
      { role: "DSI groupe", description: "Pilote la stratégie IT du réseau d'établissements et les renouvellements de parc." },
      { role: "Directeur RSE", description: "Porte les engagements environnementaux du groupe et alimente le reporting CSRD." },
      { role: "Directeur des opérations", description: "Coordonne les processus opérationnels dans les établissements." },
      { role: "Direction Marketing", description: "Exploite les engagements RSE dans la communication de marque." },
    ],
    quote: "Chaque hôtel, chaque restaurant est un point de contact avec vos clients. GTC transforme votre gestion DEEE en histoire RSE que vos clients veulent entendre.",
    objections: [
      {
        question: "Les marges sont serrées dans l'hôtellerie-restauration",
        answer: "GreenTechCycle génère des économies nettes via le reconditionnement et l'optimisation logistique. Le storytelling RSE a un impact mesurable sur la fréquentation et la fidélité client.",
      },
      {
        question: "Nos établissements sont trop dispersés géographiquement",
        answer: "C'est précisément notre valeur ajoutée. GreenTechCycle centralise et optimise les flux de centaines d'établissements via une plateforme unique et des tournées logistiques mutualisées.",
      },
    ],
    cta: {
      title: "Optimisez votre ITAD hôtellerie",
      button: "Demander une démo réseau",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     14. ÉDUCATION ET RECHERCHE
  ─────────────────────────────────────────────────────────────────────── */
  "education-recherche": {
    hero: {
      title: "Éducation et recherche",
      subtitle: "BEGES, exemplarité, budgets contraints — valorisez votre parc IT tout en montrant l'exemple à vos étudiants et tutelles.",
    },
    profile: {
      description: "Universités, grandes écoles, organismes de recherche (CNRS, INSERM, INRIA, CEA) et écoles privées opèrent des campus de 30 000 à 100 000 utilisateurs. Le parc IT mêle équipements administratifs, postes étudiants, stations de recherche spécialisées (microscopes, spectromètres, capteurs de laboratoire) et infrastructures réseau. Les budgets sont contraints mais l'exemplarité environnementale est attendue par les étudiants, les tutelles et la société.",
      regulations: "Le BEGES est obligatoire pour les universités publiques. Le RGPD protège les données étudiants et les données de recherche. Les marchés publics encadrent les achats. L'exemplarité environnementale est une attente croissante des tutelles ministérielles.",
    },
    painPoints: [
      "Les volumes sont considérables (des milliers de postes par campus) mais les budgets IT sont parmi les plus serrés de tous les secteurs. Chaque euro récupéré par le reconditionnement est un argument fort pour les tutelles.",
      "Les équipements de recherche spécialisés (microscopes, spectromètres, capteurs) stockent localement des données de recherche, parfois brevetables. Leur fin de vie nécessite un traitement spécifique.",
      "Les données de recherche incluent parfois des brevets en cours. Un effacement insuffisant peut compromettre une procédure de dépôt de brevet ou une publication scientifique.",
      "Les campus multi-sites (bâtiments principaux + laboratoires hors campus) multiplient les points de collecte et la complexité logistique.",
      "L'image d'exemplarité est un enjeu fort : les étudiants, les chercheurs et les tutelles attendent une cohérence entre l'enseignement du développement durable et les pratiques internes.",
    ],
    useCases: [
      {
        title: "Réemploi interne et programme étudiant",
        description: "Les laptops administratifs en fin de vie conservent souvent une puissance suffisante pour les bibliothèques et les salles de prêt étudiants. GreenTechCycle orchestre l'effacement, le reconditionnement et la mise à disposition, prolongeant la durée de vie des équipements tout en améliorant le service aux étudiants.",
      },
      {
        title: "Effacement renforcé du matériel de recherche",
        description: "Les laptops et stations de chercheurs contenant des données brevetables nécessitent un effacement de niveau Purge minimum avec certificat opposable. GreenTechCycle garantit ce niveau de sécurité pour protéger la propriété intellectuelle de l'établissement.",
      },
      {
        title: "Reporting BEGES et RSE universitaire",
        description: "Les universités publiques sont soumises au BEGES obligatoire. Le parc IT représente une composante significative du Scope 3. GreenTechCycle fournit les données précises et exploitables pour la composante IT du bilan carbone.",
      },
    ],
    roi: [
      { lever: "Reconditionnement postes admin", gain: "40 à 80 € par poste" },
      { lever: "Programme prêt étudiant", gain: "Valeur d'usage prolongée + image" },
      { lever: "Automatisation BEGES", gain: "-0,2 à 0,3 ETP" },
      { lever: "Exemplarité environnementale", gain: "Impact tutelles et recrutement" },
    ],
    personas: [
      { role: "DSI / Directeur Numérique", description: "Gère un parc IT massif avec des budgets contraints et des exigences de sécurité variées." },
      { role: "Vice-président Patrimoine", description: "Pilote les investissements immobiliers et matériels de l'établissement." },
      { role: "Responsable Développement Durable", description: "Porte les engagements environnementaux et coordonne le BEGES." },
      { role: "Direction de la Recherche", description: "Veille à la protection de la propriété intellectuelle et des données de recherche." },
    ],
    quote: "Vous enseignez le développement durable à vos étudiants. GTC vous aide à le pratiquer en interne, avec des résultats mesurables que vos tutelles et vos étudiants pourront vérifier.",
    objections: [
      {
        question: "Les budgets sont trop serrés pour investir dans une plateforme",
        answer: "GreenTechCycle génère des économies nettes dès la première année via le reconditionnement et la récupération de valeur. L'investissement est largement compensé par les retours financiers.",
      },
      {
        question: "Les marchés publics rendent le processus très long",
        answer: "Nous connaissons les contraintes des marchés publics universitaires et nous y sommes adaptés. L'investissement dans le référencement ouvre un canal récurrent stable.",
      },
    ],
    cta: {
      title: "Valorisez votre parc IT universitaire",
      button: "Demander un audit campus",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     15. AGROALIMENTAIRE
  ─────────────────────────────────────────────────────────────────────── */
  agroalimentaire: {
    hero: {
      title: "Agroalimentaire",
      subtitle: "CSRD, HACCP, sites distribués — maîtrisez le cycle de vie de vos équipements IT et OT dans un secteur sous pression sociétale.",
    },
    profile: {
      description: "Industries de transformation (Danone, Lactalis, LDC), coopératives agricoles et négociants opèrent des usines avec des parcs hybrides IT bureautique et OT industriel (capteurs de ligne de production, terminaux de contrôle qualité). Les sites distribués (silos, fermes, usines de transformation) en zones rurales et la pression sociétale sur l'environnement font de la gestion ITAD un enjeu à la fois logistique, réglementaire et d'image.",
      regulations: "La CSRD s'applique aux grands groupes agroalimentaires avec une attention particulière sur la chaîne de valeur (Scope 3). HACCP encadre les processus de production et touche indirectement la gestion des équipements en zone de production. Les réglementations environnementales sont renforcées par la pression sociétale sur le secteur.",
    },
    painPoints: [
      "La coexistence d'IT bureautique et d'OT industriel (capteurs de ligne de production, terminaux de contrôle qualité) crée un parc hétérogène difficile à gérer de manière unifiée.",
      "Les sites en zone rurale rendent la logistique de collecte coûteuse et complexe. Les tournées doivent être optimisées pour être économiquement viables.",
      "La pression sociétale sur le secteur agroalimentaire en matière d'environnement est forte. Les consommateurs, les ONG et les médias scrutent les pratiques des industriels.",
      "Les équipements en zone froide ou humide ont une durabilité réduite et un taux de remplacement plus élevé que la moyenne.",
      "Les flottes de terminaux mobiles (commerciaux, contrôleurs qualité) sont renouvelées fréquemment et génèrent des volumes réguliers.",
    ],
    useCases: [
      {
        title: "Gestion des terminaux mobiles flotte commerciale et qualité",
        description: "Les commerciaux et contrôleurs qualité utilisent 1 000 à 10 000 PDA et tablettes durcies. GreenTechCycle gère le cycle complet : déploiement, suivi, retour, effacement, reconditionnement ou recyclage.",
      },
      {
        title: "Reporting CSRD ESRS E5 et Scope 3 alimentaire",
        description: "La chaîne de valeur agroalimentaire est scrutée de bout en bout. Le parc IT est un composant méconnu mais réel du Scope 3. GreenTechCycle quantifie et documente cette composante avec la précision attendue par les auditeurs CSRD.",
      },
      {
        title: "Waki Box ateliers et zones logistiques",
        description: "Batteries de scanners, télécommandes, accessoires de maintenance : les ateliers et zones logistiques accumulent des petits DEEE. La Waki Box centralise ces flux avec traçabilité automatique.",
      },
    ],
    roi: [
      { lever: "Reconditionnement terminaux mobiles", gain: "60 à 120 € par terminal" },
      { lever: "Reporting CSRD automatisé", gain: "-0,3 ETP" },
      { lever: "Optimisation logistique sites ruraux", gain: "-20 à 30 % sur les coûts" },
    ],
    personas: [
      { role: "DSI / Responsable IT", description: "Gère un parc hybride IT/OT réparti sur de multiples sites de production et de distribution." },
      { role: "Responsable QSE / HACCP", description: "Veille à la conformité des processus, y compris la gestion des équipements en zone de production." },
      { role: "Directeur RSE", description: "Porte les objectifs de développement durable dans un contexte de forte pression sociétale." },
      { role: "Direction industrielle", description: "Arbitre les investissements et optimise les processus sur les sites de production." },
    ],
    quote: "Dans un secteur où chaque détail environnemental est scruté, GTC vous donne les chiffres précis et auditables que vos consommateurs, vos distributeurs et vos actionnaires exigent.",
    objections: [
      {
        question: "Nos sites sont trop isolés géographiquement",
        answer: "GreenTechCycle optimise les tournées de collecte pour les sites ruraux. La mutualisation avec d'autres clients dans les mêmes zones géographiques rend l'opération économiquement viable.",
      },
      {
        question: "Le volume par site est trop faible",
        answer: "C'est la consolidation inter-sites qui crée la valeur. GreenTechCycle agrège les flux de tous vos sites et optimise les collectes par zone géographique.",
      },
    ],
    cta: {
      title: "Structurez votre ITAD agroalimentaire",
      button: "Demander un audit multi-sites",
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
     16. TELECOM ET OPÉRATEURS
  ─────────────────────────────────────────────────────────────────────── */
  telecom: {
    hero: {
      title: "Télécom et opérateurs",
      subtitle: "Loi REEN, AGEC, volumes massifs — gérez des millions d'équipements avec la rigueur environnementale que régulateurs et opinion publique exigent.",
    },
    profile: {
      description: "Les opérateurs (Orange, SFR, Bouygues Telecom, Free), leurs filiales B2B, les MVNO et les équipementiers gèrent des volumes IT parmi les plus importants de l'économie française. Des millions de boxes et modems, des datacenters internes considérables et des infrastructures réseau distribuées (centraux, NRA, antennes) créent un environnement ITAD d'une complexité et d'une échelle uniques.",
      regulations: "La loi REEN impose la transparence sur l'empreinte environnementale des services numériques. La loi AGEC impose des objectifs de réemploi et de recyclage. La CSRD s'applique à tous les grands opérateurs. La forte exposition publique sur l'empreinte carbone du numérique ajoute une pression sociétale constante.",
    },
    painPoints: [
      "Les volumes de boxes et modems en fin de vie se comptent en millions par an. Le traitement à cette échelle nécessite des processus industriels que peu de prestataires ITAD maîtrisent.",
      "Les datacenters internes des opérateurs comptent des milliers de serveurs renouvelés tous les 4 à 6 ans, avec des données clients et des configurations réseau sensibles.",
      "Les sites techniques distribués (centraux téléphoniques, NRA, antennes relais) multiplient les points de collecte sur l'ensemble du territoire.",
      "La pression réglementaire sur le numérique responsable (loi REEN, loi AGEC) impose une transparence croissante sur l'empreinte environnementale des services numériques.",
      "La forte exposition publique des opérateurs télécoms sur les questions d'empreinte carbone rend chaque engagement environnemental scruté et potentiellement critiqué s'il n'est pas étayé par des données solides.",
    ],
    useCases: [
      {
        title: "Programme reconditionnement boxes massif",
        description: "Les boxes revenues des abonnés sont effacées, reconditionnées et redéployées à 30-50 % du coût d'une box neuve. Sur des volumes de centaines de milliers d'unités par an, l'économie est considérable. GreenTechCycle trace chaque box individuellement et certifie l'effacement des données de l'abonné précédent.",
      },
      {
        title: "ITAD massif datacenters télécom",
        description: "Des milliers de serveurs renouvelés tous les 4 à 6 ans dans les datacenters internes des opérateurs. GreenTechCycle déploie une plateforme industrielle d'effacement et de tri, maximise la valeur résiduelle et produit les certificats de sécurité exigés.",
      },
      {
        title: "Conformité loi REEN",
        description: "La loi REEN impose la transparence sur l'empreinte environnementale des services numériques. GreenTechCycle fournit les données exploitables sur le parc IT en fin de vie, directement intégrables dans les rapports de conformité REEN.",
      },
    ],
    roi: [
      { lever: "Reconditionnement boxes", gain: "50-70 % d'économie vs achat neuf" },
      { lever: "Valorisation serveurs datacenter", gain: "100 à 400 € par serveur" },
      { lever: "Conformité REEN documentée", gain: "Évitement sanctions réglementaires" },
      { lever: "Image numérique responsable", gain: "Impact sur la perception publique" },
    ],
    personas: [
      { role: "DSI groupe", description: "Pilote la stratégie IT d'un opérateur gérant des millions d'équipements." },
      { role: "Directeur Datacenters", description: "Gère les renouvellements de serveurs et l'optimisation de l'infrastructure." },
      { role: "Directeur RSE / Numérique Responsable", description: "Porte les engagements environnementaux et la conformité REEN." },
      { role: "Direction Logistique Réseau", description: "Coordonne les flux d'équipements sur les sites techniques distribués." },
    ],
    quote: "Vous gérez des millions d'équipements. GTC vous donne la visibilité et la traçabilité à l'échelle industrielle que votre volume exige, avec la rigueur environnementale que l'opinion publique attend.",
    objections: [
      {
        question: "Les volumes sont trop importants pour une plateforme SaaS",
        answer: "GreenTechCycle est conçu pour l'échelle industrielle. La plateforme gère des centaines de milliers d'actifs sans dégradation de performance. Les opérateurs télécoms sont notre cible naturelle.",
      },
      {
        question: "Nous avons déjà des process industriels en interne",
        answer: "GreenTechCycle s'intègre à vos process existants et ajoute la couche de traçabilité, reporting et optimisation que les outils internes ne fournissent pas toujours.",
      },
    ],
    cta: {
      title: "Industrialisez votre ITAD télécom",
      button: "Demander un audit volumes",
    },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   MATRICE DE PRIORISATION COMMERCIALE
   ═══════════════════════════════════════════════════════════════════════════ */

export const matrixDataFr: MatrixRow[] = [
  { slug: "finance", dealSize: "Très élevée", velocity: "Lente (12-18 mois)", priority: "Haute", stars: 3 },
  { slug: "sante", dealSize: "Élevée", velocity: "Très lente (UGAP)", priority: "Moyenne", stars: 2 },
  { slug: "industrie", dealSize: "Élevée", velocity: "Moyenne (6-12 mois)", priority: "Haute", stars: 3 },
  { slug: "retail", dealSize: "Très élevée", velocity: "Moyenne (6-9 mois)", priority: "Haute", stars: 3 },
  { slug: "energie", dealSize: "Très élevée", velocity: "Lente (9-15 mois)", priority: "Moyenne", stars: 2 },
  { slug: "transport-logistique", dealSize: "Élevée", velocity: "Moyenne", priority: "Moyenne", stars: 2 },
  { slug: "public", dealSize: "Variable", velocity: "Très lente (UGAP)", priority: "Faible", stars: 1 },
  { slug: "tech", dealSize: "Moyenne", velocity: "Rapide (3-6 mois)", priority: "Haute", stars: 3 },
  { slug: "medias-audiovisuel", dealSize: "Très élevée", velocity: "Moyenne (réf. TF1)", priority: "Haute", stars: 3 },
  { slug: "conseil", dealSize: "Moyenne", velocity: "Rapide (3-4 mois)", priority: "Haute", stars: 3 },
  { slug: "pharma-biotech", dealSize: "Élevée", velocity: "Lente (validation GxP)", priority: "Moyenne", stars: 2 },
  { slug: "btp", dealSize: "Moyenne", velocity: "Moyenne", priority: "Faible", stars: 1 },
  { slug: "horeca", dealSize: "Élevée (groupes)", velocity: "Moyenne", priority: "Moyenne", stars: 2 },
  { slug: "education-recherche", dealSize: "Variable", velocity: "Très lente (marchés)", priority: "Faible", stars: 1 },
  { slug: "agroalimentaire", dealSize: "Élevée", velocity: "Moyenne", priority: "Moyenne", stars: 2 },
  { slug: "telecom", dealSize: "Très élevée", velocity: "Lente (12-18 mois)", priority: "Moyenne", stars: 2 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SÉQUENCEMENT COMMERCIAL — 3 PHASES
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PhaseData {
  title: string;
  period: string;
  description: string;
  sectors: string[];
}

export const phasesFr: PhaseData[] = [
  {
    title: "Capitaliser sur TF1 et la vélocité",
    period: "Mois 1-6",
    description: "Les premiers mois doivent générer des victoires rapides et capitaliser sur la référence TF1. Les secteurs à cycles courts et besoin clair sont prioritaires.",
    sectors: [
      "Médias & Audiovisuel — cibler M6, France TV, Canal+, Lagardère, Radio France",
      "Tech & Services numériques — cycles de vente courts (3-6 mois)",
      "Conseil & Audit — besoin immédiat de traçabilité secret professionnel",
      "Industrie ETI — cycles maîtrisables, pression donneurs d'ordre",
    ],
  },
  {
    title: "Monter en gamme",
    period: "Mois 6-18",
    description: "Avec un portefeuille de références solides, les deals de plus grande envergure deviennent accessibles. Les secteurs à forte valeur et cycles moyens sont la cible.",
    sectors: [
      "Banque & Finance — deals à 6 chiffres, prestige et récurrence",
      "Retail & Grande distribution — volumes massifs, impact marketing",
      "Pharma & Biotech — référence forte, validation GxP différenciante",
    ],
  },
  {
    title: "Conquête",
    period: "Mois 18+",
    description: "Les secteurs à cycles longs et deals complexes nécessitent un historique et une crédibilité construits sur les phases précédentes.",
    sectors: [
      "Énergie & Utilities — deals complexes, anticipation vague Linky",
      "Télécom & Opérateurs — volumes nationaux, échelle industrielle",
      "Secteur public & Collectivités — référencement UGAP, canal récurrent",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LABELS HUB FR
   ═══════════════════════════════════════════════════════════════════════════ */

export const hubLabelsFr = {
  heroTitle: "Secteurs d'activité",
  heroSubtitle: "ITAD · Sécurité · Plateforme unifiée — Catalogue 16 secteurs",
  howToReadTitle: "Comment lire ce catalogue",
  howToReadBricks: [
    { title: "Plateforme SaaS", description: "Traçabilité, scoring décisionnel, reporting CSRD/ESG et tableaux de bord temps réel pour piloter votre ITAD." },
    { title: "Waki Box", description: "Box connectée de collecte sécurisée pour les petits DEEE et batteries, déployée dans vos locaux avec remontée automatique." },
    { title: "Service ITAD", description: "Effacement certifié NIST 800-88, reconditionnement, valorisation et recyclage orchestrés par la plateforme." },
  ],
  sectorGridTitle: "16 secteurs, une plateforme",
  tf1Badge: "Référence TF1",
  annexe1Title: "Matrice de priorisation commerciale",
  annexe1Cols: ["Secteur", "Taille deal", "Vélocité", "Priorité"],
  annexe2Title: "Séquencement recommandé",
  ctaTitle: "Prêt à sécuriser votre ITAD ?",
  ctaSubtitle: "Demandez un audit personnalisé pour votre secteur d'activité.",
  ctaPrimary: "Demander un audit",
  ctaSecondary: "Voir les cas d'usages",
  trustItems: ["R2v3 certifié", "ISO 14001", "NIST 800-88", "Conforme RGPD & CSRD"],
  viewSector: "Découvrir le secteur",
};
