import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const root = join(import.meta.dirname, "..");

// ─── FR Sectors ───
const sectorsFr = {
  banque: {
    hero: {
      title: "ITAD pour la banque et la finance",
      subtitle: "DORA, PCI-DSS, ACPR/AMF — sécurisez le décommissionnement de vos actifs IT critiques",
      kpis: [
        { value: "100%", label: "traçabilité DORA" },
        { value: "48h", label: "certificat effacement" },
        { value: "412€", label: "valeur résiduelle/poste" }
      ]
    },
    profile: {
      title: "Profil du secteur bancaire",
      narrative: "Le secteur financier traite les données les plus sensibles : positions de trading, données clients, informations réglementaires. Depuis janvier 2025, le règlement DORA impose une résilience opérationnelle numérique couvrant toute la chaîne de sous-traitance ITAD. Les régulateurs ACPR et AMF exigent une traçabilité sans faille. Les parcs IT bancaires — datacenters de trading, agences, guichets automatiques, terminaux de paiement — génèrent des flux de décommissionnement continus et à haut risque.",
      highlights: [
        "Parcs IT moyens de 8 000 à 45 000 actifs par groupe bancaire",
        "Cycles de renouvellement accélérés (3 ans postes, 5 ans serveurs)",
        "Données classifiées DORA art. 28-30 sur chaque support",
        "Obligation de registre TPP auditable annuellement"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Conformité DORA art. 28-30", description: "Chaque prestataire ITAD doit être inscrit au registre TPP et auditable annuellement. Les sanctions pour non-conformité atteignent 1 % du CA mondial journalier." },
        { title: "Effacement haute sécurité", description: "Les données de trading, positions clients et informations réglementaires nécessitent un effacement NIST 800-88 Purge avec double validation 4-eyes obligatoire." },
        { title: "Piste d'audit complète", description: "L'ACPR et l'AMF exigent une traçabilité de bout en bout, du retrait physique à la preuve de destruction, avec horodatage qualifié." },
        { title: "Gestion multi-entités", description: "Les groupes bancaires opèrent des dizaines de filiales, succursales et centres de traitement, chacun avec ses propres exigences réglementaires." },
        { title: "Chaîne de garde opposable", description: "Chaque actif doit être tracé individuellement avec une chaîne de garde scellée, de la prise en charge jusqu'à la preuve de destruction ou réemploi." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Décommissionnement datacenter de trading", description: "Effacement certifié de 2 400 serveurs contenant des algorithmes de trading haute fréquence et des données de marché classifiées.", result: "100 % conforme DORA, 1,2 M€ de valeur récupérée" },
        { title: "Roll-out réseau d'agences", description: "Remplacement coordonné de 4 800 postes en 1 200 agences sur 6 mois, sans interruption de service, avec effacement PCI-DSS.", result: "0 incident données, 890 k€ de valeur reconditionnement" },
        { title: "Migration guichets automatiques", description: "Retrait et destruction sécurisée de 1 600 GAB contenant données cartes SAM, certificats EMV et logs transactionnels.", result: "Destruction certifiée 100 %, rapport ACPR livré J+5" },
        { title: "Audit régulateur ACPR/AMF", description: "Restitution complète de la piste d'audit ITAD pour inspection réglementaire, avec export dédié auditeurs.", result: "Audit ACPR passé sans réserve en 4 jours" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "412", suffix: "€", label: "valeur résiduelle récupérée par poste" },
        { value: "96", suffix: "%", label: "taux de conformité DORA atteint" },
        { value: "1850", suffix: "t", label: "CO₂e évitées (parc 8 000 postes)" },
        { value: "4", suffix: "j", label: "délai restitution audit ACPR" }
      ],
      details: "Sur un parc de 8 000 postes renouvelés, le passage par GTC génère en moyenne 3,3 M€ de valeur récupérée et 1 850 tCO₂e évitées, tout en garantissant la conformité DORA/PCI-DSS/ACPR."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI / CTO", concern: "Continuité opérationnelle et registre TPP DORA", ctaAngle: "Tableau de bord temps réel multi-entités" },
        { role: "RSSI / CISO", concern: "Effacement certifié et chaîne de garde", ctaAngle: "Certificats NIST 800-88 avec validation 4-eyes" },
        { role: "DAF / CFO", concern: "Valorisation des actifs et optimisation budgétaire", ctaAngle: "Module Asset Intelligence avec cotation marché EMEA" },
        { role: "Direction conformité", concern: "Conformité DORA, PCI-DSS, ACPR", ctaAngle: "Matrice réglementaire pré-configurée + export auditeurs" },
        { role: "Directeur RSE", concern: "Reporting CSRD scope 3 IT", ctaAngle: "Module Carbon avec facteurs Boavizta calibrés finance" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour la banque",
      items: [
        { title: "Qualification DORA art. 28", description: "GTC est qualifié comme prestataire ITAD conforme aux exigences DORA, inscrit au registre TPP et auditable annuellement." },
        { title: "Effacement 4-eyes natif", description: "Chaque opération critique est validée par deux opérateurs indépendants, conformément aux standards bancaires." },
        { title: "Chaîne de garde blockchain", description: "Traçabilité de bout en bout avec scellé eIDAS et horodatage qualifié RGS**, opposable devant les régulateurs." },
        { title: "Export auditeurs dédié", description: "Restitution formatée ACPR/AMF/BCE en un clic, avec preuves cryptographiques vérifiables." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur bancaire",
      items: [
        { question: "GTC est-il qualifié au titre de DORA art. 28-30 ?", answer: "Oui. GTC figure au registre TPP en tant que prestataire ITAD critique. Nous fournissons le dossier de qualification DORA complet, incluant les rapports d'audit annuels, les certifications R2v3 et ISO 27001, et la matrice de conformité article 28." },
        { question: "Quel est le délai de restitution des certificats d'effacement ?", answer: "Les certificats individuels NIST 800-88 sont disponibles sous 24 h après traitement. Pour un audit ACPR/AMF, nous livrons le rapport consolidé sous 4 jours ouvrés." },
        { question: "Comment gérez-vous les données de trading haute fréquence ?", answer: "Les serveurs HFT sont traités en zone sécurisée dédiée avec effacement NIST 800-88 Purge suivi d'une destruction physique HMG IS5 Enhanced (broyage 6 mm). Double validation 4-eyes systématique." },
        { question: "Pouvez-vous intervenir sur plusieurs entités bancaires simultanément ?", answer: "Oui. Notre plateforme gère les droits multi-entités avec cloisonnement strict (RBAC). Chaque filiale dispose de son propre espace, ses propres SLA et ses propres exports réglementaires." }
      ]
    },
    cta: {
      title: "Sécurisez votre ITAD bancaire",
      subtitle: "Audit DORA gratuit sous 48 h — nos consultants financiers reviennent avec un plan conforme.",
      button: "Demander un audit DORA",
      secondaryButton: "Voir le cas banque CAC 40"
    }
  },
  sante: {
    hero: {
      title: "ITAD pour le secteur santé",
      subtitle: "HDS, données patients, CNIL — protégez les données de santé de bout en bout",
      kpis: [
        { value: "100%", label: "conformité HDS" },
        { value: "4200", label: "postes reconditionnés" },
        { value: "24h", label: "certificats disponibles" }
      ]
    },
    profile: {
      title: "Profil du secteur santé",
      narrative: "Les établissements de santé gèrent des données patients particulièrement sensibles : dossiers médicaux, imagerie, résultats de laboratoire, données génomiques. La certification HDS encadre strictement le traitement de ces données, y compris leur destruction. La CNIL est particulièrement vigilante sur ce secteur. Les parcs IT hospitaliers — postes soignants, serveurs DPI, équipements d'imagerie, dispositifs médicaux connectés — représentent des volumes considérables avec des cycles de vie variables.",
      highlights: [
        "Parcs de 2 000 à 12 000 actifs par GHT (Groupement Hospitalier de Territoire)",
        "Équipements médicaux connectés (IoMT) avec données embarquées",
        "Obligation de destruction physique pour certains supports",
        "Budget IT contraint et matériel souvent vieillissant"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Données patients HDS", description: "Les dossiers médicaux, images DICOM et résultats de laboratoire exigent un effacement conforme HDS avec certificat individuel par support." },
        { title: "Équipements médicaux connectés", description: "Les dispositifs IoMT (moniteurs, pompes, imageurs) contiennent des données patients embarquées difficiles à effacer avec les méthodes standard." },
        { title: "Traçabilité CNIL/ARS", description: "Les audits réguliers de la CNIL et des ARS exigent une piste d'audit complète, du retrait au certificat de destruction." },
        { title: "Multi-sites GHT", description: "Les GHT regroupent CHU, cliniques, EHPAD et cabinets avec des parcs hétérogènes et des contraintes logistiques complexes." },
        { title: "Valorisation solidaire", description: "La loi AGEC et la mission sociale hospitalière encouragent le réemploi via des circuits ESS (Envie, Emmaüs, Ateliers du Bocage)." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Renouvellement parc CHU 9 000 lits", description: "Décommissionnement coordonné de 4 200 postes soignants et 180 serveurs DPI sur 8 sites, sans interruption des soins.", result: "4 200 postes reconditionnés ESS, 0 incident données" },
        { title: "Migration PACS imagerie", description: "Effacement et destruction de 340 stations d'imagerie contenant des données DICOM patients sur 15 ans.", result: "100 % destruction certifiée, rapport CNIL livré J+3" },
        { title: "Retrait dispositifs IoMT", description: "Collecte et traitement sécurisé de 1 800 dispositifs médicaux connectés (moniteurs, pompes, capteurs) en fin de vie.", result: "Données embarquées effacées, 62 % reconditionnés" },
        { title: "Audit CNIL données de santé", description: "Restitution complète de la piste d'audit pour contrôle CNIL, couvrant 3 années de décommissionnement.", result: "Contrôle CNIL passé sans observation" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "4200", suffix: "+", label: "postes reconditionnés via filière ESS" },
        { value: "89", suffix: "%", label: "taux de réemploi atteint" },
        { value: "680", suffix: "t", label: "CO₂e évitées (parc GHT moyen)" },
        { value: "3", suffix: "j", label: "délai restitution audit CNIL" }
      ],
      details: "Sur un GHT de 4 200 postes, le reconditionnement ESS génère 840 k€ de valeur sociale et 680 tCO₂e évitées, avec conformité HDS/CNIL garantie."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI hospitalier", concern: "Continuité des soins pendant le décommissionnement", ctaAngle: "Planning coordonné par service avec zéro interruption" },
        { role: "RSSI / DPO", concern: "Effacement HDS et traçabilité CNIL", ctaAngle: "Certificats conformes HDS + piste d'audit 360°" },
        { role: "Directeur GHT", concern: "Pilotage multi-établissements et budget", ctaAngle: "Tableau de bord consolidé GHT avec suivi budgétaire" },
        { role: "Ingénieur biomédical", concern: "Gestion des dispositifs médicaux connectés", ctaAngle: "Module IoMT dédié avec effacement spécifique" },
        { role: "Direction RSE", concern: "Réemploi solidaire et bilan carbone", ctaAngle: "Filière ESS partenaire + reporting CSRD santé" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour la santé",
      items: [
        { title: "Expertise HDS certifiée", description: "Processus d'effacement et de destruction conformes aux exigences de la certification Hébergeur de Données de Santé." },
        { title: "Gestion IoMT native", description: "Module dédié aux dispositifs médicaux connectés avec protocoles d'effacement adaptés (mémoires flash, firmwares)." },
        { title: "Filière ESS partenaire", description: "Circuit de reconditionnement via Envie, Emmaüs et Ateliers du Bocage pour maximiser l'impact social." },
        { title: "Conformité CNIL santé", description: "Piste d'audit conforme au référentiel CNIL santé, avec restitution formatée pour contrôle." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur santé",
      items: [
        { question: "Êtes-vous certifié HDS ?", answer: "GTC opère en conformité avec les exigences HDS pour la destruction de données de santé. Nos certificats NIST 800-88 sont reconnus par la CNIL et les ARS comme preuve de destruction conforme." },
        { question: "Comment traitez-vous les équipements d'imagerie PACS ?", answer: "Les stations PACS sont traitées en zone sécurisée dédiée. Les données DICOM sont effacées selon le protocole NIST 800-88 Purge, puis les disques font l'objet d'une destruction physique certifiée." },
        { question: "Pouvez-vous intervenir sans interrompre les soins ?", answer: "Oui. Nous planifions chaque intervention service par service, en dehors des créneaux critiques. Notre SLA garantit zéro interruption de soins." },
        { question: "Quelle est votre couverture géographique pour les GHT ?", answer: "Nos 4 sites en France couvrent l'ensemble du territoire. Pour les GHT multi-sites, nous déployons des équipes dédiées avec un coordinateur unique." }
      ]
    },
    cta: {
      title: "Protégez les données de santé",
      subtitle: "Audit HDS gratuit sous 48 h — nos consultants santé analysent votre parc et vos obligations.",
      button: "Demander un audit HDS",
      secondaryButton: "Voir le cas CHU"
    }
  },
  industrie: {
    hero: {
      title: "ITAD pour l'industrie",
      subtitle: "Automates, SCADA, IoT industriel — gérez le cycle de vie de vos équipements IT/OT",
      kpis: [
        { value: "IT+OT", label: "inventaire unifié" },
        { value: "20 ans", label: "cycles de vie gérés" },
        { value: "73%", label: "taux de réemploi" }
      ]
    },
    profile: {
      title: "Profil du secteur industriel",
      narrative: "L'industrie utilise un mélange d'IT classique et d'OT (technologie opérationnelle) : automates programmables, systèmes SCADA, capteurs IoT, PC industriels. Ces équipements ont des cycles de vie longs (10 à 20 ans) et contiennent souvent des données de production sensibles, de la propriété intellectuelle et des configurations critiques. Le scope 3 IT est particulièrement lourd dans l'industrie manufacturière avec des équipements volumineux et des métaux rares.",
      highlights: [
        "Flottes hétérogènes de 500 à 15 000 actifs IT/OT par site industriel",
        "Équipements EOSL (fin de support constructeur) sans pièces de rechange",
        "Données de production et propriété intellectuelle embarquées",
        "Obligation CSRD/ESRS E5 sur le scope 3 industriel"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Convergence IT/OT", description: "Les automates, SCADA et HMI coexistent avec l'IT classique mais requièrent des protocoles d'effacement spécifiques adaptés aux mémoires flash et PLC." },
        { title: "Cycles de vie longs", description: "Les équipements industriels vivent 10 à 20 ans. Le suivi EOSL, la gestion des pièces de rechange et la planification de remplacement sont critiques." },
        { title: "Scope 3 carbone lourd", description: "Les équipements industriels volumineux (serveurs, automates, machines-outils connectées) pèsent lourd dans le bilan carbone scope 3." },
        { title: "Propriété intellectuelle", description: "Les données de production, recettes de fabrication et paramètres machines embarqués représentent un risque majeur de fuite industrielle." },
        { title: "Sites distribués", description: "Les groupes industriels opèrent des dizaines de sites de production avec des parcs hétérogènes à coordonner." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Modernisation ligne de production", description: "Remplacement coordonné de 480 automates PLC et 120 stations HMI sur 3 sites, avec effacement des programmes et données de production.", result: "0 fuite IP, 890 tCO₂e évitées" },
        { title: "Décommissionnement SCADA", description: "Retrait sécurisé de 240 RTU et concentrateurs SCADA contenant des topologies réseau et des clés cryptographiques.", result: "Destruction certifiée 100 %, matrice NIS2 validée" },
        { title: "Migration datacenter usine", description: "Décommissionnement de 1 200 serveurs et baies de stockage d'un datacenter industriel sur 2 sites.", result: "1,8 M€ valeur récupérée, rapport CSRD ESRS E5 livré" },
        { title: "Renouvellement IoT capteurs", description: "Collecte et traitement de 8 000 capteurs IoT industriels en fin de vie, avec effacement firmware et recyclage certifié.", result: "98 % recyclage matière, 0 donnée résiduelle" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "1.8", suffix: "M€", label: "valeur récupérée (datacenter usine)" },
        { value: "890", suffix: "t", label: "CO₂e évitées par site" },
        { value: "73", suffix: "%", label: "taux de réemploi atteint" },
        { value: "100", suffix: "%", label: "conformité NIS2/CSRD" }
      ],
      details: "Sur un site industriel de 1 200 serveurs et 500 automates, GTC récupère en moyenne 1,8 M€ de valeur et évite 890 tCO₂e tout en garantissant la conformité NIS2 et CSRD ESRS E5."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI industriel", concern: "Inventaire IT/OT unifié et planification EOSL", ctaAngle: "Plateforme IT+OT avec alertes fin de support" },
        { role: "RSSI / OT Security", concern: "Effacement des données de production et IP", ctaAngle: "Protocoles adaptés automates, SCADA, flash" },
        { role: "Directeur usine", concern: "Continuité de production pendant le décommissionnement", ctaAngle: "Intervention planifiée hors production" },
        { role: "Direction RSE", concern: "Bilan carbone scope 3 et CSRD", ctaAngle: "Module Carbon calibré industrie + ESRS E5" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour l'industrie",
      items: [
        { title: "Inventaire IT/OT unifié", description: "Une seule plateforme pour gérer automates, SCADA, capteurs IoT et IT classique avec un inventaire consolidé." },
        { title: "Effacement adapté OT", description: "Protocoles spécifiques pour mémoires flash PLC, firmwares SCADA et données embarquées industrielles." },
        { title: "Module EOSL natif", description: "Suivi des fins de support constructeur avec alertes proactives et planification de remplacement." },
        { title: "Bilan carbone industriel", description: "Module Carbon calibré sur les facteurs Boavizta v1.4 pour équipements industriels lourds." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur industriel",
      items: [
        { question: "Savez-vous effacer les automates PLC et les systèmes SCADA ?", answer: "Oui. Nous disposons de protocoles spécifiques pour les mémoires flash PLC (Siemens, Rockwell, Schneider), les RTU SCADA et les HMI. L'effacement couvre les programmes, données de configuration et clés cryptographiques." },
        { question: "Pouvez-vous intervenir sur site de production sans arrêt ?", answer: "Oui. Nous planifions les interventions pendant les arrêts de maintenance programmés ou en dehors des créneaux de production. Notre SLA garantit zéro impact sur la production." },
        { question: "Comment gérez-vous les équipements EOSL sans support constructeur ?", answer: "Notre module EOSL gère le cycle de vie complet : alerte anticipée, sourcing pièces de rechange, planification de remplacement et décommissionnement sécurisé en fin de vie." },
        { question: "Quel reporting CSRD fournissez-vous pour l'industrie ?", answer: "Module CSRD ESRS E5 automatisé couvrant les 11 data points applicables, calibré sur les facteurs d'émission industriels Boavizta v1.4. Export audit ISAE 3410-ready." }
      ]
    },
    cta: {
      title: "Optimisez votre ITAD industrielle",
      subtitle: "Audit IT/OT gratuit sous 48 h — nos experts industriels cartographient votre parc.",
      button: "Demander un audit industriel",
      secondaryButton: "Voir le cas industrie CSRD"
    }
  },
  retail: {
    hero: {
      title: "ITAD pour le commerce et la distribution",
      subtitle: "PCI-DSS v4.0, RGPD, CSRD — gérez la fin de vie des caisses, terminaux et parcs multi-sites",
      kpis: [
        { value: "3000", label: "sites orchestrés" },
        { value: "90j", label: "délai de déploiement" },
        { value: "89k€", label: "économies annuelles" }
      ]
    },
    profile: {
      title: "Profil du secteur commerce et distribution",
      narrative: "Les enseignes multi-sites traitent des données carte de paiement (PCI-DSS) et des données clients RGPD. Le renouvellement triennal des caisses POS, terminaux de paiement, étiquettes électroniques et bornes interactives génère des flux ITAD lourds et hétérogènes, à coordonner sans rupture commerciale. Les directions financières exigent une valorisation actuarielle des actifs et un reporting CSRD ESRS E5 par enseigne.",
      highlights: [
        "300 à 3 000 points de vente avec renouvellement simultané",
        "Caisses POS contenant cartes SAM, certificats EMV, données SAV",
        "Pression franchisés et directeurs de magasin sur coûts et délais",
        "Reporting CSRD consolidé multi-enseignes et multi-pays"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Orchestration multi-sites", description: "Coordonner le retrait de 300 à 3 000 points de vente en 90 jours sans perturber l'activité commerciale est un défi logistique majeur." },
        { title: "Conformité PCI-DSS", description: "Les caisses POS et terminaux de paiement contiennent des cartes SAM, certificats EMV et données transactionnelles soumis à PCI-DSS v4.0." },
        { title: "Terminaux hétérogènes", description: "Bornes interactives, étiquettes RFID/ESL, coffres-forts numériques, imprimantes tickets — chaque type requiert un traitement spécifique." },
        { title: "Valorisation des actifs", description: "Les directions financières exigent une cotation marché précise pour maximiser la valeur de revente des équipements reconditionnables." },
        { title: "Reporting multi-enseignes", description: "Les groupes de distribution opèrent plusieurs enseignes dans plusieurs pays, chacune avec ses propres exigences CSRD." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Remplacement caisses POS 220 magasins", description: "Retrait et effacement de 4 800 caisses POS avec cartes SAM et certificats EMV dans 220 points de vente en 90 jours.", result: "0 incident PCI-DSS, 89 k€/an économisés" },
        { title: "Migration étiquettes électroniques", description: "Collecte et recyclage de 180 000 étiquettes ESL et modules RFID sur 450 magasins avec traçabilité unitaire.", result: "95 % recyclage matière, rapport DEEE conforme" },
        { title: "Déploiement WakiBox en magasin", description: "Installation de bornes WakiBox dans 120 magasins pour la collecte mutualisée des équipements en fin de vie.", result: "Taux de collecte +340 %, coût logistique -62 %" },
        { title: "Reporting CSRD multi-pays", description: "Consolidation du reporting CSRD ESRS E5 pour 3 enseignes dans 5 pays, avec données par magasin.", result: "Rapport CSRD livré J-90 avant clôture, 0 réserve audit" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "89", suffix: "k€", label: "économies annuelles (enseigne 220 mag.)" },
        { value: "95", suffix: "%", label: "taux de recyclage matière" },
        { value: "340", suffix: "%", label: "hausse taux de collecte WakiBox" },
        { value: "0", suffix: "", label: "réserve audit CSRD" }
      ],
      details: "Pour une enseigne de 220 magasins, le passage par GTC génère 89 k€/an d'économies (valorisation + effacement mutualisé) et un rapport CSRD ESRS E5 conforme sans réserve."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI commerce", concern: "Orchestration multi-sites sans rupture commerciale", ctaAngle: "Plan de déploiement par vagues avec suivi temps réel" },
        { role: "RSSI", concern: "Effacement PCI-DSS et données clients", ctaAngle: "Certificats PCI-DSS individuels par terminal" },
        { role: "DAF", concern: "Valorisation des actifs et optimisation coûts", ctaAngle: "Module Asset Intelligence cotation marché EMEA" },
        { role: "Directeur réseau", concern: "Impact minimal sur les magasins", ctaAngle: "Intervention hors heures d'ouverture garantie" },
        { role: "Direction RSE", concern: "CSRD multi-enseignes et économie circulaire", ctaAngle: "Reporting ESRS E5 par enseigne, par pays" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour le commerce",
      items: [
        { title: "Orchestration multi-sites", description: "Planification par vagues avec suivi temps réel, coordonnée avec les directeurs de magasin pour zéro impact commercial." },
        { title: "Module WakiBox magasin", description: "Borne de collecte mutualisée installée en réserve, pour les petits équipements en fin de vie (accessoires, périphériques, ESL)." },
        { title: "Asset Intelligence", description: "Cotation marché EMEA en temps réel pour maximiser la valeur de revente des caisses et terminaux reconditionnables." },
        { title: "API magasin TMS", description: "Connecteur natif avec les systèmes de gestion logistique pour coordonner les enlèvements sans perturber les livraisons." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur commerce",
      items: [
        { question: "Pouvez-vous gérer 3 000 sites simultanément ?", answer: "Oui. Notre module de planification multi-sites gère jusqu'à 5 000 points de vente par campagne. Nous déployons par vagues de 50 à 200 magasins selon la capacité logistique régionale." },
        { question: "Comment effacez-vous les cartes SAM des caisses POS ?", answer: "Les cartes SAM sont extraites et détruites physiquement conformément à PCI-DSS Appendix A1. Un PV de destruction unitaire est émis par caisse." },
        { question: "Quel est le délai d'intervention par magasin ?", answer: "Intervention standard sous 5 jours ouvrés après planification. Mode express 48 h disponible pour les urgences (fermeture magasin, transfert)." },
        { question: "Fournissez-vous un reporting par magasin ?", answer: "Oui. Chaque magasin dispose de son propre espace sur la plateforme avec inventaire, certificats et KPI. Le reporting est consolidable par enseigne, par pays et par groupe." }
      ]
    },
    cta: {
      title: "Orchestrez votre ITAD multi-sites",
      subtitle: "Plan de déploiement gratuit sous 48 h — nos experts commerce dimensionnent votre campagne.",
      button: "Demander un plan de déploiement",
      secondaryButton: "Voir le cas WakiBox commerce"
    }
  },
  energie: {
    hero: {
      title: "ITAD pour l'énergie et les utilités",
      subtitle: "NIS2, DORA, code de l'énergie — sécurisez la fin de vie des infrastructures critiques OT/IT",
      kpis: [
        { value: "OIV", label: "opérateurs accompagnés" },
        { value: "50k", label: "actifs OT traités" },
        { value: "IGI 1300", label: "conforme" }
      ]
    },
    profile: {
      title: "Profil du secteur énergie",
      narrative: "Les opérateurs d'énergie (production, transport, distribution) opèrent des actifs IT/OT classés Opérateur d'Importance Vitale (OIV) ou Opérateur de Services Essentiels (OSE/NIS2). Le décommissionnement de concentrateurs Linky, RTU SCADA, postes de conduite ou pare-feu IT exige une chaîne de garde tracée, une destruction conforme IGI 1300 pour les actifs Diffusion Restreinte, et un reporting CSRD scope 3 documenté.",
      highlights: [
        "Flottes de 4 000 à 50 000 actifs OT (concentrateurs, RTU, IED)",
        "Cycles de vie 12-20 ans avec EOSL constructeur fréquent",
        "Données embarquées sensibles : topologie réseau, clés cryptographiques",
        "Audit ANSSI attendu sous 30 jours"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Infrastructure critique OIV", description: "Les actifs classés OIV/SIIV requièrent des procédures de décommissionnement renforcées avec habilitations confidentiel défense." },
        { title: "Volumétrie OT massive", description: "Les flottes de 4 000 à 50 000 concentrateurs, RTU et IED nécessitent une logistique de collecte et traitement à grande échelle." },
        { title: "Destruction IGI 1300", description: "Les actifs Diffusion Restreinte exigent une destruction physique conforme IGI 1300 avec broyage 6 mm et procès-verbal scellé." },
        { title: "Conformité NIS2/DORA", description: "NIS2 classe l'énergie en entité essentielle. DORA s'applique aux activités de trading et couverture énergie." },
        { title: "Convoyage sécurisé", description: "Le transport des actifs sensibles nécessite un convoyage classe T2/T3 avec habilitations spécifiques." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Remplacement concentrateurs Linky", description: "Décommissionnement de 35 000 concentrateurs de première génération avec effacement firmware et recyclage certifié.", result: "100 % traçabilité, 1 200 tCO₂e évitées" },
        { title: "Migration SCADA poste de conduite", description: "Retrait sécurisé de 180 RTU et stations de conduite contenant topologies réseau et clés cryptographiques.", result: "Destruction IGI 1300 certifiée, audit ANSSI validé" },
        { title: "Décommissionnement datacenter trading", description: "Effacement et destruction de 800 serveurs de trading énergie conformément aux exigences DORA.", result: "Conformité DORA validée, 2,4 M€ récupérés" },
        { title: "Renouvellement smart-meters", description: "Collecte et recyclage de 12 000 compteurs intelligents avec effacement des données de consommation clients.", result: "RGPD conforme, 94 % recyclage matière" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "2.4", suffix: "M€", label: "valeur récupérée (datacenter)" },
        { value: "1200", suffix: "t", label: "CO₂e évitées par campagne" },
        { value: "100", suffix: "%", label: "conformité NIS2/DORA" },
        { value: "30", suffix: "j", label: "restitution audit ANSSI" }
      ],
      details: "Sur une campagne de décommissionnement énergie (datacenter + OT), GTC récupère en moyenne 2,4 M€ et évite 1 200 tCO₂e, avec conformité NIS2/DORA/IGI 1300 garantie."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI énergie", concern: "Inventaire OIV/SIIV et conformité NIS2", ctaAngle: "Plateforme avec tagging OIV et matrice NIS2" },
        { role: "RSSI / CISO", concern: "Destruction IGI 1300 et chaîne de garde", ctaAngle: "Destruction certifiée + scellé eIDAS RGS**" },
        { role: "Responsable OT", concern: "Gestion des flottes SCADA et concentrateurs", ctaAngle: "Module OT unifié avec alertes EOSL" },
        { role: "Direction RSE", concern: "Bilan carbone scope 3 OT/IT", ctaAngle: "Module Carbon calibré facteurs énergie Boavizta" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour l'énergie",
      items: [
        { title: "Habilitations confidentiel défense", description: "Équipes habilitées pour le traitement des actifs classés Diffusion Restreinte et la manipulation des supports IGI 1300." },
        { title: "Logistique grande échelle", description: "Capacité de traitement de 50 000+ actifs OT par campagne avec convoyage T2/T3 sécurisé." },
        { title: "Matrice NIS2/DORA/IEC 62443", description: "Matrice de conformité pré-configurée couvrant les trois cadres réglementaires applicables au secteur énergie." },
        { title: "Module Carbon énergie", description: "Facteurs d'émission Boavizta v1.4 calibrés pour les équipements OT énergie (concentrateurs, RTU, smart-meters)." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur énergie",
      items: [
        { question: "Disposez-vous des habilitations pour les actifs OIV ?", answer: "Oui. Nos équipes sont habilitées confidentiel défense pour le traitement des actifs classés OIV/SIIV et Diffusion Restreinte. La destruction est réalisée conformément à l'IGI 1300 avec broyage 6 mm." },
        { question: "Quelle capacité pour les flottes OT de 50 000+ actifs ?", answer: "Nos 4 sites en France traitent jusqu'à 80 000 actifs par campagne. Pour les flottes de concentrateurs, nous déployons des unités mobiles de collecte sur site." },
        { question: "Comment gérez-vous les exigences DORA pour le trading énergie ?", answer: "Le module DORA est pré-configuré pour les entités de trading énergie. Nous fournissons la qualification prestataire ITAD art. 28 et le registre TPP dédié." },
        { question: "Quel délai pour un audit ANSSI ?", answer: "Restitution complète sous 30 jours. Notre export dédié ANSSI/CSPN est formaté selon les attendus de l'agence, avec preuves cryptographiques vérifiables." }
      ]
    },
    cta: {
      title: "Sécurisez vos actifs critiques énergie",
      subtitle: "Audit NIS2/DORA gratuit sous 48 h — nos experts énergie évaluent votre périmètre OIV.",
      button: "Demander un audit NIS2/DORA",
      secondaryButton: "Voir le cas énergie OSE"
    }
  },
  transport: {
    hero: {
      title: "ITAD pour le transport et la logistique",
      subtitle: "Flottes IoT, billetique, ITS — sécurisez la fin de vie de vos équipements embarqués",
      kpis: [
        { value: "IoT", label: "flottes gérées" },
        { value: "NIS2", label: "conforme transport" },
        { value: "98%", label: "recyclage matière" }
      ]
    },
    profile: {
      title: "Profil du secteur transport",
      narrative: "Le secteur transport opère des flottes d'équipements embarqués (billettiques, systèmes ITS, capteurs IoT, GPS, caméras embarquées) répartis sur des réseaux étendus. La directive NIS2 classe les opérateurs de transport en entités essentielles. Les données de mobilité, de billettique et de géolocalisation sont soumises au RGPD. Le renouvellement des flottes génère des volumes importants d'équipements à traiter de manière sécurisée et traçable.",
      highlights: [
        "Flottes de 2 000 à 30 000 équipements embarqués par réseau",
        "Données de mobilité, billettique et géolocalisation RGPD",
        "Systèmes ITS (transport intelligent) avec données trafic",
        "Équipements distribués sur réseaux routiers, ferroviaires, urbains"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Flottes IoT embarquées", description: "Les capteurs, GPS, caméras et modules de communication embarqués contiennent des données de géolocalisation et des firmwares propriétaires à effacer." },
        { title: "Billettique et données voyageurs", description: "Les valideurs, bornes de vente et systèmes de billettique contiennent des données de paiement et de déplacement soumises au RGPD." },
        { title: "Équipements ITS distribués", description: "Les systèmes de transport intelligent (panneaux, capteurs trafic, feux connectés) sont répartis sur des réseaux étendus difficiles d'accès." },
        { title: "Conformité NIS2 transport", description: "La directive NIS2 classe les opérateurs de transport en entités essentielles avec des obligations de cybersécurité renforcées." },
        { title: "Renouvellement de flottes", description: "Le remplacement coordonné de milliers d'équipements embarqués nécessite une logistique de collecte terrain complexe." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Migration billettique réseau urbain", description: "Remplacement de 4 500 valideurs et 320 bornes de vente sur un réseau de transport urbain, avec effacement des données voyageurs.", result: "100 % RGPD conforme, 0 interruption service" },
        { title: "Renouvellement GPS flotte logistique", description: "Collecte et effacement de 8 000 modules GPS embarqués contenant des historiques de géolocalisation et des données clients.", result: "RGPD conforme, 92 % recyclage matière" },
        { title: "Décommissionnement ITS autoroutier", description: "Retrait sécurisé de 1 200 capteurs de trafic et panneaux connectés sur 450 km d'autoroute.", result: "Données trafic effacées, 98 % recyclage" },
        { title: "Remplacement caméras embarquées", description: "Effacement et destruction de 3 600 caméras de vidéosurveillance embarquées contenant des enregistrements RGPD.", result: "Destruction certifiée, rapport CNIL livré" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "98", suffix: "%", label: "taux de recyclage matière" },
        { value: "450", suffix: "t", label: "CO₂e évitées par campagne" },
        { value: "0", suffix: "", label: "interruption de service" },
        { value: "100", suffix: "%", label: "conformité NIS2" }
      ],
      details: "Sur une campagne de renouvellement billettique (4 500 valideurs), GTC garantit zéro interruption de service, 98 % de recyclage matière et un rapport NIS2 conforme."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI transport", concern: "Gestion des flottes embarquées et billettique", ctaAngle: "Plateforme IoT avec inventaire embarqué" },
        { role: "RSSI", concern: "Effacement données mobilité et NIS2", ctaAngle: "Certificats NIST 800-88 + matrice NIS2 transport" },
        { role: "Directeur réseau", concern: "Continuité de service pendant le remplacement", ctaAngle: "Planification par ligne/zone sans interruption" },
        { role: "Direction RSE", concern: "Bilan carbone flotte IT et CSRD", ctaAngle: "Module Carbon transport + ESRS E5" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour le transport",
      items: [
        { title: "Logistique terrain", description: "Équipes mobiles pour la collecte sur réseau étendu : dépôts, stations, voies, aires d'autoroute." },
        { title: "Module IoT embarqué", description: "Gestion spécifique des capteurs, GPS, caméras et modules de communication avec effacement firmware adapté." },
        { title: "Conformité NIS2 transport", description: "Matrice pré-configurée pour les entités essentielles du secteur transport (routier, ferroviaire, urbain, aérien)." },
        { title: "Continuité de service", description: "Planification par ligne et par zone pour garantir zéro interruption de service pendant le remplacement." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur transport",
      items: [
        { question: "Pouvez-vous intervenir sur un réseau de transport en exploitation ?", answer: "Oui. Nous planifions chaque intervention par ligne et par zone, en dehors des heures de pointe. Notre SLA garantit zéro interruption de service voyageurs." },
        { question: "Comment effacez-vous les modules IoT embarqués ?", answer: "Nos protocoles couvrent les mémoires flash, firmwares et données de configuration des capteurs, GPS, caméras et modules de communication. Effacement NIST 800-88 adapté à chaque type de support." },
        { question: "Gérez-vous la collecte sur réseau étendu ?", answer: "Oui. Nos équipes mobiles interviennent sur dépôts, stations, voies et aires d'autoroute. Nous disposons de véhicules adaptés pour la collecte sécurisée de gros volumes." },
        { question: "Quelle conformité NIS2 pour le transport ?", answer: "Notre matrice NIS2 transport couvre les exigences spécifiques aux entités essentielles : routier, ferroviaire, urbain et aérien. Export auditeur dédié ANSSI." }
      ]
    },
    cta: {
      title: "Sécurisez vos flottes embarquées",
      subtitle: "Audit transport gratuit sous 48 h — nos experts dimensionnent votre campagne terrain.",
      button: "Demander un audit transport",
      secondaryButton: "Voir le cas billettique"
    }
  },
  public: {
    hero: {
      title: "ITAD pour le secteur public",
      subtitle: "Marchés publics, UGAP, RGPD renforcé — transparence et sobriété numérique pour les collectivités",
      kpis: [
        { value: "UGAP", label: "référencé" },
        { value: "100%", label: "filière ESS" },
        { value: "NF", label: "X50-140 conforme" }
      ]
    },
    profile: {
      title: "Profil du secteur public",
      narrative: "Le secteur public (collectivités, administrations, établissements publics) est soumis à des obligations renforcées de transparence, de conformité RGPD et de respect des marchés publics. La norme NF X50-140 encadre spécifiquement la gestion des DEEE. Les cahiers des charges sont stricts et les procédures d'achat encadrées par le code de la commande publique. La loi AGEC impose le réemploi et la sobriété numérique.",
      highlights: [
        "Parcs de 500 à 8 000 postes par collectivité ou administration",
        "Obligation de mise en concurrence et transparence des marchés",
        "Loi AGEC : réemploi obligatoire et dons aux associations",
        "RGPD renforcé avec responsabilité accrue des agents publics"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Marchés publics stricts", description: "Le code de la commande publique impose des cahiers des charges précis, une mise en concurrence transparente et des critères RSE pondérés." },
        { title: "RGPD agents et citoyens", description: "Les données traitées couvrent à la fois les agents publics et les citoyens, avec une responsabilité publique renforcée en cas de violation." },
        { title: "Sobriété numérique AGEC", description: "La loi AGEC impose le réemploi prioritaire, les dons aux associations et la sobriété numérique dans les achats publics." },
        { title: "Budget contraint", description: "Les collectivités opèrent avec des budgets IT limités et doivent maximiser la valorisation de leurs parcs en fin de vie." },
        { title: "Audit Cour des comptes", description: "La restitution doit être transparente et auditable par les chambres régionales des comptes et les inspections générales." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Renouvellement parc ministère", description: "Décommissionnement de 6 500 postes et 240 serveurs d'un ministère, avec effacement classifié et circuit de don ESS.", result: "100 % filière ESS, 4 500 dons Emmaüs/Envie" },
        { title: "Collectivité territoriale", description: "Gestion du parc IT de 12 communes regroupées (2 400 postes), avec mutualisation des coûts et reporting DEEE consolidé.", result: "Coût unitaire -35 %, rapport NF X50-140 livré" },
        { title: "Établissement d'enseignement supérieur", description: "Reconditionnement de 3 200 postes étudiants avec effacement RGPD et redistribution via filière ESS.", result: "89 % réemploi, 480 tCO₂e évitées" },
        { title: "Audit CRC (Chambre Régionale des Comptes)", description: "Restitution complète et transparente du programme ITAD pour contrôle budgétaire et conformité.", result: "Audit CRC passé sans observation" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "4500", suffix: "+", label: "dons ESS réalisés (Emmaüs, Envie)" },
        { value: "35", suffix: "%", label: "réduction du coût unitaire" },
        { value: "480", suffix: "t", label: "CO₂e évitées par programme" },
        { value: "0", suffix: "", label: "réserve audit CRC" }
      ],
      details: "Sur un programme ministériel de 6 500 postes, GTC génère 4 500 dons ESS, réduit les coûts de 35 % par rapport au marché précédent et livre un rapport NF X50-140 conforme."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI collectivité", concern: "Conformité marchés publics et UGAP", ctaAngle: "Plateforme référencée UGAP avec traçabilité marchés" },
        { role: "DPO", concern: "RGPD agents et citoyens", ctaAngle: "Certificats RGPD avec piste d'audit complète" },
        { role: "Directeur général des services", concern: "Budget et transparence", ctaAngle: "Reporting budgétaire auditable CRC" },
        { role: "Élu en charge du numérique", concern: "Sobriété numérique et impact social", ctaAngle: "Filière ESS + bilan carbone communication" },
        { role: "Responsable achats", concern: "Critères RSE dans les marchés", ctaAngle: "Dossier technique complet avec notation RSE" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour le secteur public",
      items: [
        { title: "Référencé UGAP", description: "GTC est référencé sur la centrale d'achat UGAP, simplifiant la passation de commande pour les collectivités et administrations." },
        { title: "Filière ESS partenaire", description: "Circuit de reconditionnement et de don via Envie, Emmaüs et Ateliers du Bocage pour maximiser l'impact social." },
        { title: "Conformité NF X50-140", description: "Processus certifié conforme à la norme NF X50-140 pour la gestion des DEEE dans le secteur public." },
        { title: "Transparence CRC", description: "Reporting transparent et auditable par les chambres régionales des comptes, avec traçabilité budgétaire complète." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur public",
      items: [
        { question: "Êtes-vous référencé UGAP ?", answer: "Oui. GTC est référencé sur la centrale d'achat UGAP, ce qui permet une passation de commande simplifiée sans mise en concurrence supplémentaire pour les collectivités et administrations." },
        { question: "Comment gérez-vous les dons ESS ?", answer: "Nous opérons un circuit de don structuré avec Envie, Emmaüs et les Ateliers du Bocage. Chaque don est tracé individuellement avec un certificat de réemploi conforme loi AGEC." },
        { question: "Quelle conformité pour les marchés publics ?", answer: "Notre dossier technique intègre tous les critères RSE pondérés, les certifications R2v3/ISO 14001, la conformité NF X50-140 et les preuves de traçabilité exigées par le code de la commande publique." },
        { question: "Pouvez-vous consolider plusieurs collectivités ?", answer: "Oui. Notre plateforme gère les groupements de commandes inter-collectivités avec un reporting consolidé et des coûts mutualisés." }
      ]
    },
    cta: {
      title: "Structurez votre ITAD publique",
      subtitle: "Audit collectivité gratuit sous 48 h — nos experts secteur public analysent votre parc et vos obligations AGEC.",
      button: "Demander un audit collectivité",
      secondaryButton: "Voir le cas ministère"
    }
  },
  tech: {
    hero: {
      title: "ITAD pour la technologie et le SaaS",
      subtitle: "Datacenters, parcs développeurs, conformité SOC 2 — gérez la fin de vie de vos actifs tech",
      kpis: [
        { value: "SOC 2", label: "conforme" },
        { value: "99.2%", label: "précision inventaire" },
        { value: "73%", label: "taux de réemploi" }
      ]
    },
    profile: {
      title: "Profil du secteur technologie",
      narrative: "Les entreprises technologiques et SaaS opèrent des datacenters, des parcs développeurs haut de gamme et des infrastructures cloud hybrides. La conformité SOC 2 Type II exige un contrôle strict du cycle de vie des actifs, incluant la preuve de destruction des données. Les cycles de renouvellement sont rapides (2-3 ans pour les postes développeurs, 3-5 ans pour les serveurs) et la valeur résiduelle des équipements haut de gamme est significative.",
      highlights: [
        "Datacenters propres ou colocalisés avec équipements haute densité",
        "Parcs développeurs haut de gamme (MacBook Pro, stations GPU)",
        "Conformité SOC 2 Type II avec preuve de destruction",
        "Cycles de renouvellement rapides et valeur résiduelle élevée"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Conformité SOC 2 Type II", description: "Les rapports SOC 2 exigent des preuves formelles de destruction des données lors du décommissionnement, avec contrôles vérifiables." },
        { title: "Datacenters haute densité", description: "Les serveurs GPU, baies de stockage NVMe et équipements réseau 400G représentent des volumes et valeurs considérables." },
        { title: "Propriété intellectuelle", description: "Le code source, les données clients SaaS et les configurations d'infrastructure constituent des actifs critiques à protéger." },
        { title: "Valeur résiduelle élevée", description: "Les MacBook Pro, stations GPU et serveurs récents conservent une valeur résiduelle significative sur le marché reconditionné." },
        { title: "Croissance rapide", description: "Les entreprises tech en hypercroissance renouvellent leurs parcs fréquemment, générant des flux ITAD continus." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Décommissionnement datacenter SaaS", description: "Effacement et destruction de 1 600 serveurs GPU et 400 To de stockage NVMe d'un éditeur SaaS en migration cloud.", result: "SOC 2 conforme, 3,2 M€ valeur récupérée" },
        { title: "Renouvellement parc développeurs", description: "Remplacement de 850 MacBook Pro et 120 stations GPU, avec effacement certifié et revente reconditionnée.", result: "412 €/poste récupéré, 0 donnée résiduelle" },
        { title: "Fermeture bureau satellite", description: "Décommissionnement complet d'un bureau de 200 postes (tech startup), avec inventaire, effacement et valorisation en 10 jours.", result: "100 % traité en 10 j, 89 k€ récupérés" },
        { title: "Audit SOC 2 Type II", description: "Restitution des preuves de destruction pour audit SOC 2 annuel, couvrant 2 400 actifs décommissionnés.", result: "Audit SOC 2 passé sans exception" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "3.2", suffix: "M€", label: "valeur récupérée (datacenter SaaS)" },
        { value: "412", suffix: "€", label: "valeur résiduelle par poste dev" },
        { value: "100", suffix: "%", label: "conformité SOC 2" },
        { value: "10", suffix: "j", label: "délai bureau complet 200 postes" }
      ],
      details: "Pour un éditeur SaaS de 1 600 serveurs et 850 postes développeurs, GTC récupère 3,2 M€ de valeur et garantit la conformité SOC 2 Type II sans exception."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "CTO / VP Engineering", concern: "Décommissionnement datacenter et IP", ctaAngle: "Effacement certifié serveurs GPU + chaîne de garde" },
        { role: "CISO / Security Lead", concern: "SOC 2 et preuve de destruction", ctaAngle: "Export SOC 2 dédié avec preuves cryptographiques" },
        { role: "CFO / VP Finance", concern: "Valeur résiduelle des actifs haut de gamme", ctaAngle: "Asset Intelligence cotation marché tech EMEA" },
        { role: "IT Ops / SRE Lead", concern: "Logistique de décommissionnement datacenter", ctaAngle: "Plan de retrait par baie avec suivi temps réel" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour la technologie",
      items: [
        { title: "Export SOC 2 natif", description: "Module de restitution SOC 2 Type II intégré, avec preuves de destruction cryptographiquement vérifiables." },
        { title: "Expertise datacenter GPU", description: "Protocoles adaptés aux serveurs GPU haute densité, baies NVMe et équipements réseau dernière génération." },
        { title: "Cotation tech EMEA", description: "Module Asset Intelligence avec cotation spécifique marché tech reconditionné (MacBook Pro, ThinkPad X1, serveurs Dell/HP)." },
        { title: "Agilité startup", description: "Processus allégé pour les entreprises en hypercroissance : onboarding J+1, intervention sous 5 jours, facturation mensuelle." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur technologie",
      items: [
        { question: "Fournissez-vous les preuves SOC 2 de destruction ?", answer: "Oui. Notre module SOC 2 génère automatiquement les preuves de destruction au format attendu par les auditeurs (EY, Deloitte, PwC, KPMG). Certificats cryptographiquement vérifiables avec hash SHA-256." },
        { question: "Comment gérez-vous les serveurs GPU haute valeur ?", answer: "Les serveurs GPU (NVIDIA A100/H100, AMD MI300) sont traités individuellement avec effacement firmware, effacement SSD NVMe et cotation marché spécifique. La valeur résiduelle GPU est significative." },
        { question: "Quel délai pour un bureau de 200 postes ?", answer: "10 jours ouvrés de l'inventaire à la livraison des certificats. Mode express 5 jours disponible pour les fermetures urgentes." },
        { question: "Gérez-vous les parcs MacBook et matériel Apple ?", answer: "Oui. Nous maîtrisons l'effacement des Mac (T2/M1/M2/M3) avec désactivation MDM, effacement FileVault et certificat individuel. Cotation Apple reconditionné intégrée." }
      ]
    },
    cta: {
      title: "Optimisez votre ITAD technologique",
      subtitle: "Audit tech gratuit sous 48 h — nos experts dimensionnent votre décommissionnement datacenter ou parc dev.",
      button: "Demander un audit tech",
      secondaryButton: "Voir le cas SaaS"
    }
  },
  medias: {
    hero: {
      title: "ITAD pour les médias et l'audiovisuel",
      subtitle: "Broadcast, régies, datacenters média — GTC, partenaire ITAD du groupe TF1",
      kpis: [
        { value: "65k€", label: "contrat TF1 HT/an" },
        { value: "100%", label: "traçabilité broadcast" },
        { value: "Multi-sites", label: "couverture nationale" }
      ]
    },
    profile: {
      title: "Profil du secteur médias et audiovisuel",
      narrative: "Le secteur des médias et de l'audiovisuel opère des infrastructures techniques complexes : régies de diffusion, plateaux de tournage, datacenters de traitement vidéo, studios de postproduction. Les équipements broadcast (serveurs de playout, matrices vidéo, encodeurs, mélangeurs) ont des cycles de vie spécifiques et contiennent des données de production confidentielles (grilles de programmes, droits, contenus inédits). GreenTechCycle est fier d'accompagner le groupe TF1 dans la gestion de ses actifs IT en fin de vie, avec un contrat-cadre récurrent de 65 000 € HT/an couvrant l'audit, l'effacement sécurisé, la valorisation et le reporting CSRD.",
      highlights: [
        "Référence phare : contrat-cadre TF1 — 65 000 € HT/an récurrent",
        "Équipements broadcast spécialisés (playout, encodeurs, matrices)",
        "Données de production confidentielles (grilles, droits, contenus)",
        "Multi-sites : sièges, studios, régies, centres de diffusion"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Équipements broadcast spécialisés", description: "Les serveurs de playout, matrices vidéo, encodeurs SDI/IP et mélangeurs sont des équipements spécialisés qui nécessitent des protocoles de traitement adaptés." },
        { title: "Données de production confidentielles", description: "Les grilles de programmes, droits de diffusion, contenus inédits et données d'audience sont des actifs stratégiques à protéger impérativement." },
        { title: "Migration IP/cloud broadcast", description: "La transition du broadcast SDI vers l'IP et le cloud génère des volumes importants d'équipements legacy à décommissionner." },
        { title: "Multi-sites studios et régies", description: "Les groupes médias opèrent des dizaines de sites (sièges, studios, régies, centres de diffusion) avec des contraintes d'accès spécifiques." },
        { title: "Reporting CSRD médias", description: "Les groupes médias cotés sont soumis à la CSRD avec des obligations de reporting scope 3 IT incluant les équipements broadcast." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Contrat-cadre TF1 — référence phare", description: "Accompagnement récurrent du groupe TF1 : audit trimestriel, effacement sécurisé des équipements broadcast, valorisation du matériel reconditionnable et reporting CSRD annuel.", result: "65 000 € HT/an, 100 % traçabilité, 0 incident" },
        { title: "Migration broadcast SDI vers IP", description: "Décommissionnement de 480 équipements SDI legacy (matrices, routeurs, encodeurs) lors de la migration vers une infrastructure IP.", result: "340 k€ valeur récupérée, certification complète" },
        { title: "Fermeture studio régional", description: "Décommissionnement complet d'un studio de 120 postes et 40 serveurs de montage/postproduction, avec effacement des rushes et projets.", result: "100 % données effacées, 89 % réemploi" },
        { title: "Renouvellement régie diffusion", description: "Remplacement sécurisé des serveurs de playout et systèmes d'automation d'une régie de diffusion 24/7.", result: "0 interruption antenne, certificats J+24h" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "65", suffix: "k€", label: "contrat-cadre TF1 HT/an" },
        { value: "340", suffix: "k€", label: "valeur récupérée (migration SDI)" },
        { value: "100", suffix: "%", label: "traçabilité broadcast" },
        { value: "0", suffix: "", label: "interruption d'antenne" }
      ],
      details: "Le contrat-cadre TF1 illustre le modèle GTC pour les médias : un accompagnement récurrent à 65 000 € HT/an couvrant audit, effacement, valorisation et CSRD, avec 100 % de traçabilité et zéro incident sur 3 ans."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI média", concern: "Gestion du parc broadcast et IT convergé", ctaAngle: "Plateforme unifiée broadcast + IT classique" },
        { role: "Directeur technique antenne", concern: "Continuité de diffusion 24/7", ctaAngle: "Intervention planifiée hors fenêtres critiques" },
        { role: "RSSI", concern: "Protection des contenus et données d'audience", ctaAngle: "Effacement certifié + chaîne de garde scellée" },
        { role: "DAF", concern: "Valorisation des équipements broadcast", ctaAngle: "Cotation spécialisée broadcast reconditionné" },
        { role: "Direction RSE", concern: "CSRD scope 3 incluant broadcast", ctaAngle: "Module Carbon avec facteurs broadcast Boavizta" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour les médias",
      items: [
        { title: "Référence TF1 vérifiable", description: "Contrat-cadre récurrent avec le groupe TF1, premier groupe audiovisuel privé français. Référence vérifiable sur demande." },
        { title: "Expertise broadcast", description: "Protocoles adaptés aux équipements de diffusion : serveurs de playout, matrices vidéo, encodeurs SDI/IP, systèmes d'automation." },
        { title: "Contrat-cadre multi-sites", description: "Formule d'accompagnement récurrent couvrant audit, effacement, valorisation et reporting CSRD sur tous les sites du groupe." },
        { title: "Continuité d'antenne garantie", description: "Intervention planifiée en coordination avec la direction technique pour garantir zéro interruption de diffusion." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur médias",
      items: [
        { question: "Quelle est votre référence dans les médias ?", answer: "Notre référence phare est le groupe TF1, avec un contrat-cadre récurrent de 65 000 € HT/an couvrant l'ensemble du cycle ITAD : audit trimestriel, effacement sécurisé, valorisation et reporting CSRD. Cette référence est vérifiable sur demande sous NDA." },
        { question: "Savez-vous traiter les équipements broadcast ?", answer: "Oui. Nous avons développé des protocoles spécifiques pour les serveurs de playout (Grass Valley, Harmonic), les matrices vidéo (Evertz, Riedel), les encodeurs et les systèmes d'automation broadcast." },
        { question: "Pouvez-vous intervenir sans interrompre la diffusion ?", answer: "Oui. Nous planifions chaque intervention en coordination avec la direction technique antenne, en dehors des fenêtres de diffusion critiques. Notre SLA garantit zéro interruption d'antenne." },
        { question: "Proposez-vous un contrat-cadre récurrent ?", answer: "Oui. Notre formule contrat-cadre média couvre : audit trimestriel, effacement à la demande, valorisation du matériel reconditionnable et reporting CSRD annuel. Tarification forfaitaire annuelle." }
      ]
    },
    mediaGtc: {
      title: "Média GTC — TF1, référence phare",
      subtitle: "Comment GreenTechCycle est devenu le partenaire ITAD du groupe TF1",
      quote: "GreenTechCycle nous apporte la rigueur et la traçabilité que nous exigeons pour nos actifs broadcast. Le contrat-cadre couvre l'ensemble de nos sites avec un reporting CSRD intégré.",
      quoteAuthor: "Direction des Systèmes d'Information, Groupe TF1",
      contractValue: "65 000 € HT/an",
      contractLabel: "Contrat-cadre récurrent",
      features: [
        "Audit trimestriel de l'ensemble du parc IT et broadcast",
        "Effacement sécurisé conforme aux exigences groupe",
        "Valorisation du matériel reconditionnable sur le marché pro",
        "Reporting CSRD ESRS E5 annuel intégré",
        "Couverture multi-sites : siège, studios, régies, centres de diffusion"
      ],
      ctaLabel: "Étudier un contrat-cadre média",
      ctaHref: "/contact?offre=media-cadre"
    },
    cta: {
      title: "Rejoignez TF1 — choisissez le partenaire ITAD des médias",
      subtitle: "Étude de contrat-cadre média gratuite sous 48 h — nos experts audiovisuel dimensionnent votre accompagnement.",
      button: "Étudier un contrat-cadre média",
      secondaryButton: "Voir le cas TF1"
    }
  },
  conseil: {
    hero: {
      title: "ITAD pour le conseil et les services professionnels",
      subtitle: "Confidentialité client, mobilité, audit de données — sécurisez les parcs consultants",
      kpis: [
        { value: "100%", label: "confidentialité client" },
        { value: "48h", label: "effacement garanti" },
        { value: "412€", label: "valeur par poste" }
      ]
    },
    profile: {
      title: "Profil du secteur conseil",
      narrative: "Les cabinets de conseil et services professionnels (audit, stratégie, IT, juridique) gèrent des données client hautement confidentielles sur des parcs mobiles distribués. Les consultants utilisent des laptops haut de gamme renouvelés tous les 2-3 ans, contenant des données de mission, des modèles propriétaires et des informations client sensibles. La rotation du personnel et la mobilité permanente complexifient la collecte et l'effacement.",
      highlights: [
        "Parcs de 500 à 10 000 laptops haut de gamme (ThinkPad, MacBook Pro)",
        "Données client confidentielles sur chaque poste consultant",
        "Rotation du personnel élevée (20-30 % annuel en Big Four)",
        "Laptops distribués dans des dizaines de bureaux et chez les clients"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Confidentialité client", description: "Chaque laptop consultant contient des données de mission, des modèles propriétaires et des informations client protégées par le secret professionnel." },
        { title: "Mobilité des parcs", description: "Les consultants travaillent chez les clients, en bureaux satellites et en télétravail. La collecte des équipements en fin de vie est un défi logistique." },
        { title: "Rotation du personnel", description: "Avec 20-30 % de rotation annuelle en Big Four, le flux de décommissionnement est continu et imprévisible." },
        { title: "Valeur résiduelle élevée", description: "Les ThinkPad X1 et MacBook Pro de 2-3 ans conservent une valeur significative sur le marché reconditionné." },
        { title: "Audit interne exigeant", description: "Les directions conformité des Big Four exigent des preuves de destruction formelles pour chaque poste décommissionné." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Renouvellement annuel Big Four", description: "Remplacement de 2 400 ThinkPad X1 Carbon dans un cabinet Big Four, avec effacement certifié et revente reconditionnée.", result: "412 €/poste récupéré, 100 % certificats J+24h" },
        { title: "Fermeture bureau satellite", description: "Décommissionnement complet d'un bureau de 85 postes consultants, avec collecte sur site et effacement express.", result: "Traité en 5 jours, 0 donnée résiduelle" },
        { title: "Offboarding consultant express", description: "Effacement à la demande de laptops de consultants quittant le cabinet, avec certificat individuel sous 48 h.", result: "SLA 48 h tenu à 99,8 %, secret professionnel garanti" },
        { title: "Audit interne conformité", description: "Restitution des preuves de destruction pour audit interne annuel du cabinet, couvrant 1 800 postes décommissionnés.", result: "Audit passé sans exception" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "412", suffix: "€", label: "valeur récupérée par poste consultant" },
        { value: "99.8", suffix: "%", label: "SLA 48 h respecté" },
        { value: "0", suffix: "", label: "fuite de données client" },
        { value: "24", suffix: "h", label: "certificats disponibles" }
      ],
      details: "Sur un renouvellement annuel de 2 400 postes consultants, GTC récupère 988 k€ de valeur et délivre 100 % des certificats sous 24 h, avec zéro fuite de données client."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI / CTO", concern: "Gestion du parc mobile distribué", ctaAngle: "Plateforme avec suivi multi-bureaux et collecte terrain" },
        { role: "RSSI / DPO", concern: "Secret professionnel et données client", ctaAngle: "Effacement certifié NIST 800-88 + chaîne de garde" },
        { role: "DAF / CFO", concern: "Valorisation du parc laptop haut de gamme", ctaAngle: "Cotation marché reconditionné premium" },
        { role: "Direction conformité", concern: "Preuves de destruction pour audit interne", ctaAngle: "Export audit dédié Big Four / mid-cap" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour le conseil",
      items: [
        { title: "Collecte terrain multi-bureaux", description: "Équipes mobiles pour la collecte dans les bureaux, chez les clients et au domicile des consultants (programme BYOD/WFH)." },
        { title: "SLA 48 h garanti", description: "Chaque laptop reçu est effacé et certifié sous 48 h maximum. Certificat individuel NIST 800-88 avec hash SHA-256." },
        { title: "Cotation premium", description: "Module Asset Intelligence avec cotation spécifique marché premium (ThinkPad X1, MacBook Pro, Dell XPS) pour maximiser la valeur." },
        { title: "Export audit Big Four", description: "Restitution formatée pour les audits internes des Big Four, avec preuves cryptographiquement vérifiables." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur conseil",
      items: [
        { question: "Comment garantissez-vous la confidentialité des données client ?", answer: "Chaque laptop est traité individuellement avec effacement NIST 800-88 Purge et chaîne de garde scellée. Le secret professionnel est garanti par notre certification R2v3 et nos protocoles de sécurité audités annuellement." },
        { question: "Pouvez-vous collecter chez les consultants en télétravail ?", answer: "Oui. Nous proposons un service de collecte à domicile avec enveloppe sécurisée prépayée et suivi de livraison. Le consultant dépose son laptop et reçoit un accusé de réception traçable." },
        { question: "Quel est le délai de restitution des certificats ?", answer: "Certificats individuels sous 24 h après réception. SLA 48 h garanti contractuellement avec pénalités en cas de dépassement." },
        { question: "Gérez-vous les parcs MacBook avec puce Apple Silicon ?", answer: "Oui. Nous maîtrisons l'effacement des Mac M1/M2/M3/M4 avec désactivation MDM, effacement Secure Erase Apple et certificat individuel. Cotation Apple reconditionné intégrée." }
      ]
    },
    cta: {
      title: "Sécurisez les données de vos clients",
      subtitle: "Audit conseil gratuit sous 48 h — nos experts dimensionnent votre programme ITAD consultants.",
      button: "Demander un audit conseil",
      secondaryButton: "Voir le cas Big Four"
    }
  },
  pharma: {
    hero: {
      title: "ITAD pour l'industrie pharmaceutique",
      subtitle: "Laboratoires R&D, GxP/Annexe 11, données essais cliniques — conformité réglementaire totale",
      kpis: [
        { value: "GxP", label: "conforme Annexe 11" },
        { value: "100%", label: "traçabilité R&D" },
        { value: "21CFR", label: "Part 11 ready" }
      ]
    },
    profile: {
      title: "Profil du secteur pharmaceutique",
      narrative: "L'industrie pharmaceutique opère des laboratoires R&D, des sites de production et des centres d'essais cliniques avec des exigences réglementaires parmi les plus strictes au monde. L'Annexe 11 des BPF (Bonnes Pratiques de Fabrication) et la FDA 21 CFR Part 11 encadrent la gestion des systèmes informatisés, incluant leur décommissionnement. Les données d'essais cliniques, de pharmacovigilance et de propriété intellectuelle sont des actifs stratégiques protégés.",
      highlights: [
        "Systèmes GxP validés soumis à l'Annexe 11 BPF et 21 CFR Part 11",
        "Données d'essais cliniques et de pharmacovigilance ultra-sensibles",
        "Propriété intellectuelle R&D (molécules, procédés, formulations)",
        "Audit ANSM et FDA avec exigences de traçabilité renforcées"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Conformité GxP Annexe 11", description: "Les systèmes informatisés GxP doivent être décommissionnés selon une procédure validée, avec preuve d'effacement conforme aux BPF." },
        { title: "Données essais cliniques", description: "Les données de patients, résultats d'essais et protocoles sont soumis à des obligations de conservation et de destruction réglementées." },
        { title: "Propriété intellectuelle R&D", description: "Les données de recherche (molécules, procédés, formulations) représentent des milliards d'euros d'investissement à protéger." },
        { title: "Audit ANSM / FDA", description: "Les inspections ANSM et FDA exigent une piste d'audit complète, incluant les preuves de décommissionnement des systèmes GxP." },
        { title: "Durées de rétention longues", description: "Certaines données pharmaceutiques doivent être conservées 15 à 30 ans. Le décommissionnement doit respecter ces durées." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Décommissionnement LIMS laboratoire", description: "Retrait validé de 12 systèmes LIMS et 180 postes de laboratoire, avec effacement conforme Annexe 11 et archivage des données.", result: "100 % conforme BPF, piste d'audit validée ANSM" },
        { title: "Migration essais cliniques", description: "Effacement sécurisé de 340 postes et serveurs contenant des données d'essais cliniques phases I-III, après vérification des durées de rétention.", result: "0 donnée détruite prématurément, FDA-ready" },
        { title: "Renouvellement R&D site", description: "Décommissionnement de 520 stations de calcul et 80 serveurs de simulation contenant de la propriété intellectuelle moléculaire.", result: "IP protégée, 1,2 M€ valeur récupérée" },
        { title: "Inspection ANSM préparation", description: "Mise en conformité accélérée de la piste d'audit ITAD avant inspection ANSM, couvrant 2 ans de décommissionnement.", result: "Inspection passée sans observation majeure" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "1.2", suffix: "M€", label: "valeur récupérée (site R&D)" },
        { value: "100", suffix: "%", label: "conformité GxP Annexe 11" },
        { value: "0", suffix: "", label: "observation majeure ANSM" },
        { value: "15-30", suffix: "ans", label: "rétention gérée" }
      ],
      details: "Sur un site R&D de 520 postes et 80 serveurs, GTC récupère 1,2 M€ de valeur tout en garantissant la conformité GxP, le respect des durées de rétention et la protection de la propriété intellectuelle."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI pharma", concern: "Décommissionnement systèmes GxP validés", ctaAngle: "Protocole Annexe 11 validé avec piste d'audit" },
        { role: "Responsable assurance qualité", concern: "Conformité BPF et inspection ANSM", ctaAngle: "Dossier de qualification décommissionnement GxP" },
        { role: "RSSI / DPO", concern: "Protection données essais cliniques", ctaAngle: "Effacement certifié + vérification durées de rétention" },
        { role: "Directeur R&D", concern: "Protection de la propriété intellectuelle", ctaAngle: "Chaîne de garde renforcée pour données IP" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour la pharmacie",
      items: [
        { title: "Protocole Annexe 11 validé", description: "Procédure de décommissionnement validée conforme à l'Annexe 11 des BPF, avec documentation de qualification complète." },
        { title: "Gestion des durées de rétention", description: "Module de vérification automatique des durées de rétention avant toute destruction, évitant les destructions prématurées." },
        { title: "Export audit ANSM/FDA", description: "Restitution formatée pour les inspections ANSM et FDA, avec piste d'audit complète et preuves vérifiables." },
        { title: "Protection IP renforcée", description: "Chaîne de garde renforcée pour les actifs contenant de la propriété intellectuelle, avec effacement multi-passes et destruction physique." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur pharmaceutique",
      items: [
        { question: "Votre procédure est-elle conforme à l'Annexe 11 des BPF ?", answer: "Oui. Notre procédure de décommissionnement est validée conformément à l'Annexe 11 des BPF (EU GMP). Nous fournissons le dossier de qualification complet (QI/QO/QP) et la documentation de validation." },
        { question: "Comment vérifiez-vous les durées de rétention avant destruction ?", answer: "Notre module de rétention vérifie automatiquement les durées applicables (15 à 30 ans selon le type de données) avant d'autoriser la destruction. Aucun effacement n'est possible si la durée n'est pas écoulée." },
        { question: "Fournissez-vous les documents pour une inspection ANSM ?", answer: "Oui. Notre export ANSM inclut la piste d'audit complète, les certificats de destruction, le dossier de validation de la procédure et les preuves de conformité Annexe 11." },
        { question: "Gérez-vous les systèmes LIMS et SCADA pharmaceutiques ?", answer: "Oui. Nos protocoles couvrent les LIMS, ELN, SCADA de production, systèmes MES et postes de laboratoire avec effacement adapté à chaque type d'équipement GxP." }
      ]
    },
    cta: {
      title: "Conformité ITAD pharmaceutique garantie",
      subtitle: "Audit pharma gratuit sous 48 h — nos experts GxP évaluent votre parc et vos obligations Annexe 11.",
      button: "Demander un audit pharma",
      secondaryButton: "Voir le cas laboratoire R&D"
    }
  },
  btp: {
    hero: {
      title: "ITAD pour le BTP et la construction",
      subtitle: "Chantiers distribués, mobilité matériel, sécurité des données projets",
      kpis: [
        { value: "Multi-chantiers", label: "couverture nationale" },
        { value: "48h", label: "intervention terrain" },
        { value: "100%", label: "traçabilité DEEE" }
      ]
    },
    profile: {
      title: "Profil du secteur BTP",
      narrative: "Le secteur BTP opère des chantiers distribués sur l'ensemble du territoire, avec des équipements IT mobiles (tablettes de chantier, PC durcis, stations de calcul BIM) et des systèmes de gestion de projet contenant des données sensibles (plans, appels d'offres, données financières). La mobilité du matériel, l'exposition aux conditions de chantier et la multiplicité des sites rendent la gestion ITAD complexe.",
      highlights: [
        "Équipements mobiles durcis exposés aux conditions de chantier",
        "Données de projet sensibles (plans BIM, appels d'offres, coûts)",
        "Multiplicité des chantiers avec matériel rotatif",
        "Obligation DEEE et économie circulaire BTP (loi AGEC)"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Chantiers distribués", description: "Les équipements sont répartis sur des dizaines de chantiers simultanés, avec une rotation fréquente rendant l'inventaire et la collecte complexes." },
        { title: "Données projets sensibles", description: "Les plans BIM, maquettes numériques, appels d'offres et données financières de projets sont des actifs stratégiques à protéger." },
        { title: "Matériel durci usé", description: "Les tablettes et PC de chantier subissent des conditions difficiles (poussière, chocs, humidité) réduisant leur valeur de revente." },
        { title: "Conformité DEEE BTP", description: "La loi AGEC impose une traçabilité spécifique pour les DEEE du BTP, avec obligation de réemploi prioritaire." },
        { title: "Budget dispersé", description: "Les budgets IT sont dispersés par projet et par chantier, rendant la consolidation et l'optimisation difficiles." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Fin de chantier grand projet", description: "Collecte et traitement de 180 tablettes de chantier, 45 PC durcis et 12 stations BIM à la fin d'un chantier de 3 ans.", result: "100 % données projet effacées, 62 % réemploi" },
        { title: "Renouvellement parc siège", description: "Décommissionnement de 640 postes et 80 serveurs du siège d'un groupe BTP, avec effacement des données d'appels d'offres.", result: "412 €/poste récupéré, DEEE conforme" },
        { title: "Rotation matériel multi-chantiers", description: "Mise en place d'un circuit de collecte récurrent pour les équipements en rotation sur 35 chantiers actifs.", result: "Coût logistique -45 %, traçabilité 100 %" },
        { title: "Audit DEEE groupe BTP", description: "Consolidation du reporting DEEE pour un groupe BTP de 12 filiales, avec traçabilité par chantier et par filiale.", result: "Rapport DEEE consolidé, 0 réserve audit" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "412", suffix: "€", label: "valeur récupérée par poste" },
        { value: "45", suffix: "%", label: "réduction coût logistique" },
        { value: "62", suffix: "%", label: "taux de réemploi chantier" },
        { value: "100", suffix: "%", label: "traçabilité DEEE" }
      ],
      details: "Sur un groupe BTP de 640 postes siège et 35 chantiers, GTC réduit les coûts logistiques de 45 % et récupère 412 € de valeur par poste, avec reporting DEEE consolidé."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI groupe BTP", concern: "Gestion parc mobile multi-chantiers", ctaAngle: "Plateforme avec suivi par chantier et rotation" },
        { role: "Directeur de projet", concern: "Protection des données projet et BIM", ctaAngle: "Effacement certifié en fin de chantier" },
        { role: "DAF", concern: "Consolidation budgétaire multi-filiales", ctaAngle: "Reporting financier par chantier, filiale, groupe" },
        { role: "Direction RSE", concern: "DEEE et économie circulaire BTP", ctaAngle: "Module DEEE conforme loi AGEC BTP" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour le BTP",
      items: [
        { title: "Collecte terrain chantiers", description: "Équipes mobiles pour la collecte directement sur chantier, avec véhicules adaptés et conditionnement sécurisé." },
        { title: "Gestion de la rotation", description: "Module de suivi des équipements en rotation entre chantiers, avec alerte fin de vie et planification de collecte." },
        { title: "Effacement matériel durci", description: "Protocoles adaptés aux tablettes et PC durcis (Panasonic Toughbook, Getac) avec effacement firmware spécifique." },
        { title: "Reporting DEEE multi-filiales", description: "Consolidation du reporting DEEE par chantier, par filiale et par groupe, conforme loi AGEC." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur BTP",
      items: [
        { question: "Pouvez-vous collecter directement sur chantier ?", answer: "Oui. Nos équipes mobiles interviennent sur chantier avec des véhicules adaptés. Nous assurons le conditionnement sécurisé sur site et le transport vers nos centres de traitement." },
        { question: "Comment gérez-vous le matériel durci abîmé ?", answer: "Les tablettes et PC durcis endommagés sont traités individuellement. L'effacement est réalisé si le support est fonctionnel, sinon destruction physique certifiée. La valeur de revente est ajustée en fonction de l'état." },
        { question: "Pouvez-vous consolider le reporting de 12 filiales ?", answer: "Oui. Notre plateforme gère le multi-filiales avec un reporting consolidé au niveau groupe. Chaque filiale dispose de son propre espace avec visibilité sur ses chantiers." },
        { question: "Quel délai d'intervention sur chantier ?", answer: "Intervention sous 48 h ouvrés en Île-de-France, 5 jours ouvrés en province. Mode express disponible pour les fins de chantier urgentes." }
      ]
    },
    cta: {
      title: "Sécurisez vos données de chantier",
      subtitle: "Audit BTP gratuit sous 48 h — nos experts dimensionnent votre programme ITAD multi-chantiers.",
      button: "Demander un audit BTP",
      secondaryButton: "Voir le cas grand chantier"
    }
  },
  horeca: {
    hero: {
      title: "ITAD pour l'hôtellerie et la restauration",
      subtitle: "POS, parcs distribués, données clients fidélité — gérez vos équipements multi-sites",
      kpis: [
        { value: "Multi-sites", label: "hôtels et restaurants" },
        { value: "PCI-DSS", label: "conforme" },
        { value: "89%", label: "réemploi atteint" }
      ]
    },
    profile: {
      title: "Profil du secteur hôtellerie-restauration",
      narrative: "Le secteur HoReCa opère des centaines d'établissements (hôtels, restaurants, bars, traiteurs) avec des systèmes POS, des bornes de réservation, des systèmes de gestion hôtelière (PMS) et des équipements de fidélité contenant des données clients sensibles. Les chaînes hôtelières et groupes de restauration renouvellent régulièrement leurs parcs, avec des contraintes de saisonnalité et de continuité de service.",
      highlights: [
        "Systèmes POS et PMS contenant données de paiement et clients",
        "Parcs distribués sur des centaines d'établissements",
        "Saisonnalité forte impactant les fenêtres de renouvellement",
        "Programmes de fidélité avec données personnelles RGPD"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Données POS et paiement", description: "Les systèmes de caisse et terminaux de paiement contiennent des données carte soumises à PCI-DSS et des données transactionnelles RGPD." },
        { title: "Systèmes PMS hôteliers", description: "Les systèmes de gestion hôtelière contiennent des données de réservation, passeports, cartes bancaires et préférences clients." },
        { title: "Parcs distribués saisonniers", description: "Les renouvellements doivent être planifiés en basse saison pour minimiser l'impact sur l'exploitation." },
        { title: "Données fidélité RGPD", description: "Les programmes de fidélité accumulent des données personnelles (habitudes, préférences, historique) soumises au RGPD." },
        { title: "Franchisés et indépendants", description: "Les groupes hôteliers et de restauration incluent des franchisés et indépendants avec des parcs hétérogènes." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Renouvellement POS chaîne de restaurants", description: "Remplacement de 1 800 caisses POS dans 320 restaurants pendant la basse saison hivernale.", result: "0 interruption service, PCI-DSS conforme" },
        { title: "Migration PMS chaîne hôtelière", description: "Décommissionnement de 450 serveurs PMS et 2 200 postes réception lors de la migration vers un PMS cloud.", result: "Données clients effacées, 78 % réemploi" },
        { title: "Renouvellement bornes check-in", description: "Retrait et recyclage de 680 bornes de check-in automatique contenant des données passeport et carte bancaire.", result: "Destruction certifiée, RGPD conforme" },
        { title: "Consolidation DEEE groupe hôtelier", description: "Reporting DEEE consolidé pour un groupe de 85 hôtels et 120 restaurants dans 4 pays.", result: "Rapport CSRD ESRS E5 livré, 0 réserve" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "89", suffix: "%", label: "taux de réemploi" },
        { value: "0", suffix: "", label: "interruption de service" },
        { value: "78", suffix: "%", label: "réemploi PMS/postes" },
        { value: "100", suffix: "%", label: "conformité PCI-DSS" }
      ],
      details: "Pour une chaîne de 320 restaurants, le renouvellement POS via GTC garantit zéro interruption de service, 89 % de réemploi et la conformité PCI-DSS complète."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI groupe hôtelier", concern: "Migration PMS et renouvellement multi-sites", ctaAngle: "Plan de déploiement par région, par saison" },
        { role: "RSSI", concern: "PCI-DSS et données clients hôteliers", ctaAngle: "Effacement certifié POS/PMS + destruction" },
        { role: "Directeur d'exploitation", concern: "Continuité de service pendant le remplacement", ctaAngle: "Intervention basse saison, hors heures de pointe" },
        { role: "Direction RSE", concern: "CSRD et économie circulaire HoReCa", ctaAngle: "Reporting ESRS E5 multi-pays" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour l'hôtellerie-restauration",
      items: [
        { title: "Planification saisonnière", description: "Intervention en basse saison pour minimiser l'impact sur l'exploitation. Planification coordonnée avec les directeurs d'établissement." },
        { title: "Expertise POS/PMS", description: "Protocoles spécifiques pour les systèmes de caisse (Micros, Lightspeed) et PMS hôteliers (Opera, Protel)." },
        { title: "Multi-pays multi-franchise", description: "Gestion des groupes internationaux avec franchisés et indépendants, reporting consolidé multi-pays." },
        { title: "WakiBox établissement", description: "Borne de collecte compacte pour les petits équipements en fin de vie, adaptée aux contraintes d'espace HoReCa." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur hôtellerie-restauration",
      items: [
        { question: "Pouvez-vous intervenir sans perturber le service ?", answer: "Oui. Nous intervenons en basse saison et en dehors des heures de service. Pour les établissements 24/7, nous planifions des fenêtres de maintenance coordonnées avec la direction." },
        { question: "Gérez-vous les systèmes PMS hôteliers (Opera, Protel) ?", answer: "Oui. Nos protocoles couvrent les principaux PMS hôteliers : Oracle Opera, Protel, Mews, Cloudbeds. Effacement des données de réservation, passeport et carte bancaire conforme RGPD et PCI-DSS." },
        { question: "Comment gérez-vous les franchisés indépendants ?", answer: "Chaque franchisé dispose de son propre espace sur la plateforme. Le groupe peut consolider les données tout en respectant l'autonomie de gestion de chaque établissement." },
        { question: "Quel délai pour un groupe de 300+ établissements ?", answer: "Nous déployons par vagues de 30 à 50 établissements par semaine. Un groupe de 300 établissements est traité en 6 à 10 semaines selon la complexité." }
      ]
    },
    cta: {
      title: "Gérez votre ITAD hôtellerie-restauration",
      subtitle: "Audit HoReCa gratuit sous 48 h — nos experts dimensionnent votre programme multi-établissements.",
      button: "Demander un audit HoReCa",
      secondaryButton: "Voir le cas chaîne hôtelière"
    }
  },
  education: {
    hero: {
      title: "ITAD pour l'éducation et la recherche",
      subtitle: "RGPD mineurs, parcs étudiants, financement DEEE — reconditionnez et redistribuez",
      kpis: [
        { value: "RGPD", label: "mineurs protégé" },
        { value: "89%", label: "réemploi ESS" },
        { value: "DEEE", label: "financement mobilisé" }
      ]
    },
    profile: {
      title: "Profil du secteur éducation",
      narrative: "Le secteur éducatif (écoles, collèges, lycées, universités, grandes écoles, organismes de recherche) gère des parcs IT importants avec des contraintes spécifiques : RGPD renforcé pour les données de mineurs, budgets limités, obligation de réemploi (loi AGEC), et possibilité de financement via les éco-organismes DEEE. Les parcs étudiants sont renouvelés par vagues liées aux calendriers scolaires.",
      highlights: [
        "Parcs de 500 à 15 000 postes par établissement ou groupement",
        "RGPD renforcé pour les données d'élèves mineurs",
        "Calendrier de renouvellement lié aux vacances scolaires",
        "Financement possible via éco-organismes DEEE (Ecologic, Ecosystem)"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "RGPD mineurs", description: "Les données d'élèves mineurs bénéficient d'une protection RGPD renforcée (art. 8). L'effacement doit être irréversible et certifié." },
        { title: "Budget limité", description: "Les établissements éducatifs disposent de budgets IT contraints et doivent maximiser la valeur de leurs équipements en fin de vie." },
        { title: "Financement DEEE", description: "Les éco-organismes (Ecologic, Ecosystem) proposent des financements pour la collecte et le recyclage des DEEE éducatifs." },
        { title: "Calendrier scolaire", description: "Les renouvellements doivent impérativement être réalisés pendant les vacances scolaires pour ne pas perturber les cours." },
        { title: "Réemploi et don", description: "La loi AGEC et la mission éducative encouragent le réemploi via des circuits ESS et le don aux associations." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Renouvellement parc universitaire", description: "Décommissionnement de 3 200 postes étudiants et 120 serveurs de recherche pendant les vacances d'été, avec redistribution ESS.", result: "89 % réemploi, 4 500 dons ESS, 480 tCO₂e évitées" },
        { title: "Groupe scolaire primaire-collège", description: "Remplacement de 850 tablettes et 120 PC dans 8 écoles et 2 collèges, avec effacement RGPD mineurs certifié.", result: "100 % RGPD conforme, financement DEEE mobilisé" },
        { title: "Laboratoire de recherche", description: "Décommissionnement de 180 stations de calcul et 40 serveurs de recherche, avec protection des données scientifiques.", result: "IP protégée, 1,1 M€ valeur récupérée" },
        { title: "Académie régionale", description: "Mutualisation du programme ITAD pour 45 établissements d'une académie, avec reporting consolidé et financement DEEE.", result: "Coût unitaire -40 %, rapport DEEE académie" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "4500", suffix: "+", label: "dons ESS réalisés" },
        { value: "40", suffix: "%", label: "réduction coût unitaire (mutualisation)" },
        { value: "480", suffix: "t", label: "CO₂e évitées" },
        { value: "89", suffix: "%", label: "taux de réemploi" }
      ],
      details: "Sur une académie de 45 établissements, la mutualisation via GTC réduit les coûts de 40 % et génère 4 500 dons ESS, avec financement DEEE mobilisé et reporting académique consolidé."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI académie/université", concern: "Gestion du parc étudiant et calendrier scolaire", ctaAngle: "Planification vacances scolaires + collecte terrain" },
        { role: "DPO", concern: "RGPD mineurs et données étudiantes", ctaAngle: "Effacement certifié RGPD art. 8 + certificats" },
        { role: "Responsable financier", concern: "Budget limité et financement DEEE", ctaAngle: "Dossier financement éco-organismes intégré" },
        { role: "Président d'université", concern: "Engagement RSE et économie circulaire", ctaAngle: "Filière ESS + bilan carbone communication" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour l'éducation",
      items: [
        { title: "Planification calendrier scolaire", description: "Intervention exclusivement pendant les vacances scolaires et universitaires pour zéro perturbation des cours." },
        { title: "RGPD mineurs certifié", description: "Protocole d'effacement renforcé pour les données d'élèves mineurs, conforme RGPD art. 8 avec certificat individuel." },
        { title: "Financement DEEE intégré", description: "Montage du dossier de financement auprès des éco-organismes (Ecologic, Ecosystem) inclus dans notre prestation." },
        { title: "Mutualisation académique", description: "Gestion des groupements d'établissements (académie, COMUE) avec reporting consolidé et coûts mutualisés." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur éducation",
      items: [
        { question: "Pouvez-vous intervenir pendant les vacances scolaires uniquement ?", answer: "Oui. C'est notre mode opératoire standard pour l'éducation. Nous planifions chaque intervention pendant les vacances (été, Toussaint, février, Pâques) en fonction de vos priorités." },
        { question: "Comment fonctionne le financement DEEE ?", answer: "Nous montons le dossier de financement auprès d'Ecologic ou Ecosystem pour vous. Le financement couvre une partie des coûts de collecte et de recyclage. Il est directement déduit de notre facture." },
        { question: "Gérez-vous les tablettes scolaires (iPad, Chromebook) ?", answer: "Oui. Nous traitons iPad, Chromebook, tablettes Android et PC portables scolaires. Effacement MDM, réinitialisation usine certifiée et recyclage ou réemploi." },
        { question: "Pouvez-vous mutualiser plusieurs établissements ?", answer: "Oui. Notre plateforme gère les groupements d'établissements avec un reporting consolidé. La mutualisation réduit les coûts unitaires de 30 à 40 % par rapport à un traitement individuel." }
      ]
    },
    cta: {
      title: "Reconditionnez votre parc éducatif",
      subtitle: "Audit éducation gratuit sous 48 h — nos experts dimensionnent votre programme avec financement DEEE.",
      button: "Demander un audit éducation",
      secondaryButton: "Voir le cas université ESS"
    }
  },
  agroalimentaire: {
    hero: {
      title: "ITAD pour l'agroalimentaire",
      subtitle: "IT/OT usines, traçabilité, parcs production distribués — gérez vos actifs de bout en bout",
      kpis: [
        { value: "IT+OT", label: "usines couvertes" },
        { value: "IFS/BRC", label: "compatible" },
        { value: "CSRD", label: "reporting intégré" }
      ]
    },
    profile: {
      title: "Profil du secteur agroalimentaire",
      narrative: "L'industrie agroalimentaire opère des usines de production avec des systèmes IT/OT (automates de ligne, SCADA, MES, ERP) et des parcs IT classiques (bureautique, logistique, commercial). Les certifications IFS/BRC et les exigences de traçabilité alimentaire imposent une gestion rigoureuse des systèmes informatisés. Les sites de production distribués sur le territoire génèrent des flux ITAD importants avec des contraintes d'hygiène et de sécurité alimentaire.",
      highlights: [
        "Systèmes MES et SCADA de ligne de production",
        "Traçabilité alimentaire IFS/BRC sur les systèmes informatisés",
        "Sites de production distribués (usines, entrepôts, plateformes)",
        "Obligation CSRD scope 3 IT pour les groupes cotés"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "IT/OT usines de production", description: "Les automates de ligne, systèmes MES et SCADA contiennent des données de production, recettes et paramètres process sensibles." },
        { title: "Traçabilité IFS/BRC", description: "Les certifications IFS et BRC exigent une traçabilité des systèmes informatisés, incluant leur décommissionnement." },
        { title: "Sites distribués", description: "Les groupes agroalimentaires opèrent des dizaines d'usines, entrepôts et plateformes logistiques avec des parcs hétérogènes." },
        { title: "Contraintes d'hygiène", description: "Les interventions en zone de production alimentaire sont soumises à des protocoles d'hygiène stricts." },
        { title: "Données commerciales", description: "Les données de négoce, contrats fournisseurs et prix de revient sont des actifs stratégiques à protéger." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Modernisation ligne de conditionnement", description: "Remplacement de 120 automates et 60 PC industriels sur 3 lignes de conditionnement, avec effacement des recettes et paramètres.", result: "0 fuite recette, intervention hors production" },
        { title: "Migration ERP groupe", description: "Décommissionnement de 380 postes et 45 serveurs lors de la migration ERP SAP vers S/4HANA.", result: "Données migrées et originaux effacés, rapport IFS" },
        { title: "Consolidation multi-usines", description: "Programme ITAD mutualisé pour 18 usines d'un groupe agroalimentaire, avec reporting CSRD consolidé.", result: "Coût -38 %, CSRD ESRS E5 livré" },
        { title: "Entrepôt logistique connecté", description: "Retrait de 2 400 terminaux de préparation de commandes et 180 bornes de quai en fin de vie.", result: "95 % recyclage, données effacées" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "38", suffix: "%", label: "réduction coût multi-usines" },
        { value: "95", suffix: "%", label: "taux de recyclage matière" },
        { value: "0", suffix: "", label: "fuite de recette/IP" },
        { value: "100", suffix: "%", label: "conformité IFS/BRC" }
      ],
      details: "Sur un groupe de 18 usines, la mutualisation via GTC réduit les coûts de 38 % et garantit la conformité IFS/BRC, avec reporting CSRD ESRS E5 consolidé."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI groupe agroalimentaire", concern: "IT/OT multi-usines et migration ERP", ctaAngle: "Plateforme unifiée IT+OT + plan migration" },
        { role: "Directeur qualité", concern: "Conformité IFS/BRC systèmes informatisés", ctaAngle: "Piste d'audit conforme IFS/BRC" },
        { role: "Directeur d'usine", concern: "Continuité de production et hygiène", ctaAngle: "Intervention hors production, protocole hygiène" },
        { role: "Direction RSE", concern: "CSRD scope 3 et économie circulaire", ctaAngle: "Module Carbon + ESRS E5 multi-usines" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour l'agroalimentaire",
      items: [
        { title: "Expertise IT/OT agroalimentaire", description: "Protocoles adaptés aux automates de ligne, MES, SCADA et systèmes de traçabilité alimentaire." },
        { title: "Conformité IFS/BRC", description: "Piste d'audit conforme aux exigences IFS et BRC pour le décommissionnement des systèmes informatisés." },
        { title: "Protocole hygiène zone production", description: "Intervention en zone de production alimentaire avec respect des protocoles HACCP et hygiène." },
        { title: "Mutualisation multi-usines", description: "Programme ITAD mutualisé pour les groupes multi-sites avec reporting consolidé et coûts optimisés." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur agroalimentaire",
      items: [
        { question: "Pouvez-vous intervenir en zone de production alimentaire ?", answer: "Oui. Nos équipes respectent les protocoles HACCP et les exigences d'hygiène de vos sites de production. Nous intervenons en tenue adaptée avec des outils décontaminés." },
        { question: "Gérez-vous les automates de ligne de production ?", answer: "Oui. Nos protocoles couvrent les automates (Siemens, Rockwell, Schneider), les systèmes MES et SCADA, avec effacement des recettes, paramètres et données de production." },
        { question: "Comment garantissez-vous la conformité IFS/BRC ?", answer: "Notre piste d'audit est formatée selon les exigences IFS Food et BRC Food Safety. Nous fournissons les preuves de décommissionnement conforme pour vos audits de certification." },
        { question: "Quel reporting CSRD pour un groupe multi-usines ?", answer: "Module CSRD ESRS E5 avec reporting par usine, par pays et consolidé groupe. Facteurs d'émission calibrés pour les équipements agroalimentaires." }
      ]
    },
    cta: {
      title: "Gérez votre ITAD agroalimentaire",
      subtitle: "Audit agroalimentaire gratuit sous 48 h — nos experts dimensionnent votre programme multi-usines.",
      button: "Demander un audit agroalimentaire",
      secondaryButton: "Voir le cas groupe agroalimentaire"
    }
  },
  telecom: {
    hero: {
      title: "ITAD pour les télécommunications",
      subtitle: "Équipements réseau, CPE/box clients, RGPD à grande échelle — gérez des millions d'actifs",
      kpis: [
        { value: "Millions", label: "d'actifs gérés" },
        { value: "RGPD", label: "grande échelle" },
        { value: "1.2M€", label: "valeur récupérée" }
      ]
    },
    profile: {
      title: "Profil du secteur télécommunications",
      narrative: "Les opérateurs télécoms gèrent des millions d'équipements : CPE clients (box, décodeurs, routeurs), équipements réseau (routeurs, commutateurs, stations de base), et infrastructures datacenter. Les volumes sont considérables, les données RGPD à grande échelle (millions d'abonnés), et les obligations de recyclage DEEE massives. Les opérateurs mobiles renouvellent leurs stations de base (4G/5G) et les opérateurs fixes leurs CPE à un rythme soutenu.",
      highlights: [
        "Flottes de millions de CPE clients (box, décodeurs, routeurs WiFi)",
        "Équipements réseau (routeurs core, commutateurs, stations de base 4G/5G)",
        "Données RGPD à grande échelle (millions d'abonnés)",
        "Obligation DEEE massive et objectifs de recyclage ambitieux"
      ]
    },
    pains: {
      title: "Vos douleurs prioritaires",
      items: [
        { title: "Volumétrie massive CPE", description: "Les opérateurs gèrent des millions de box et décodeurs clients à recycler ou reconditionner, nécessitant une logistique industrielle." },
        { title: "RGPD grande échelle", description: "Les CPE contiennent des données de configuration, historiques de navigation et identifiants abonnés à effacer pour des millions d'équipements." },
        { title: "Équipements réseau haute valeur", description: "Les routeurs core, commutateurs et stations de base 4G/5G ont une valeur résiduelle significative sur le marché reconditionné." },
        { title: "Obligation DEEE massive", description: "Les opérateurs sont soumis à des objectifs de recyclage DEEE ambitieux, avec reporting détaillé auprès des éco-organismes." },
        { title: "Migration 4G vers 5G", description: "Le déploiement 5G génère des volumes considérables d'équipements 4G à décommissionner dans des délais contraints." }
      ]
    },
    useCases: {
      title: "Cas d'usage prioritaires",
      items: [
        { title: "Reconditionnement CPE opérateur", description: "Programme de reconditionnement de 2,4 millions de box et décodeurs, avec effacement RGPD et remise en circulation.", result: "68 % reconditionné, 1,2 M€ valeur récupérée" },
        { title: "Décommissionnement stations 4G", description: "Retrait sécurisé de 4 800 stations de base 4G lors du déploiement 5G, avec effacement des configurations réseau.", result: "Configs effacées, 3,8 M€ valeur marché" },
        { title: "Migration datacenter opérateur", description: "Décommissionnement de 6 000 serveurs et 1 200 commutateurs d'un datacenter opérateur en migration cloud.", result: "5,2 M€ récupérés, RGPD conforme" },
        { title: "Reporting DEEE opérateur", description: "Consolidation du reporting DEEE pour un opérateur national, couvrant CPE, réseau et datacenter.", result: "Objectifs DEEE atteints, rapport éco-organisme validé" }
      ]
    },
    roi: {
      title: "Retour sur investissement estimé",
      kpis: [
        { value: "5.2", suffix: "M€", label: "valeur récupérée (datacenter)" },
        { value: "68", suffix: "%", label: "taux reconditionnement CPE" },
        { value: "3.8", suffix: "M€", label: "valeur stations 4G" },
        { value: "100", suffix: "%", label: "objectifs DEEE atteints" }
      ],
      details: "Sur un programme combiné (datacenter + stations 4G + CPE), GTC récupère plus de 10 M€ de valeur et garantit l'atteinte des objectifs DEEE de l'opérateur."
    },
    personas: {
      title: "Décideurs concernés",
      items: [
        { role: "DSI / CTO opérateur", concern: "Migration 5G et décommissionnement 4G", ctaAngle: "Plan de retrait stations par lot et région" },
        { role: "DPO", concern: "RGPD millions d'abonnés sur CPE", ctaAngle: "Effacement industriel certifié NIST 800-88" },
        { role: "Directeur réseau", concern: "Logistique de retrait équipements réseau", ctaAngle: "Logistique grande échelle + convoyage sécurisé" },
        { role: "Direction RSE", concern: "Objectifs DEEE et CSRD scope 3", ctaAngle: "Module DEEE + Carbon opérateur" }
      ]
    },
    arguments: {
      title: "Pourquoi choisir GTC pour les télécoms",
      items: [
        { title: "Capacité industrielle", description: "Infrastructure de traitement capable de gérer des millions d'actifs par an (CPE, équipements réseau, serveurs)." },
        { title: "Effacement RGPD industriel", description: "Chaîne d'effacement automatisée NIST 800-88 pour les CPE à grande échelle, avec certificat par lot ou unitaire." },
        { title: "Cotation réseau EMEA", description: "Module Asset Intelligence avec cotation spécialisée équipements réseau et télécom (Cisco, Nokia, Ericsson, Huawei)." },
        { title: "Module DEEE opérateur", description: "Reporting DEEE calibré pour les volumes opérateurs, avec exports conformes aux exigences des éco-organismes." }
      ]
    },
    objections: {
      title: "Questions fréquentes — secteur télécommunications",
      items: [
        { question: "Quelle capacité de traitement pour les CPE ?", answer: "Notre infrastructure traite jusqu'à 5 millions de CPE par an. La chaîne d'effacement automatisée NIST 800-88 permet un débit de 2 000 unités par jour et par site." },
        { question: "Comment gérez-vous les stations de base 4G/5G ?", answer: "Nos équipes interviennent sur site pour le démontage des stations. Les configurations réseau et clés sont effacées, puis les équipements sont transportés en convoyage sécurisé vers nos centres de traitement." },
        { question: "Quel reporting DEEE pour les volumes opérateur ?", answer: "Notre module DEEE est calibré pour les volumes opérateurs (millions d'unités). Reporting par type d'équipement, par région et par éco-organisme. Export conforme aux déclarations annuelles ADEME." },
        { question: "Cotez-vous les équipements réseau (Cisco, Nokia) ?", answer: "Oui. Notre module Asset Intelligence couvre les équipements réseau des principaux constructeurs : Cisco, Nokia, Ericsson, Huawei, Juniper. Cotation marché reconditionné EMEA en temps réel." }
      ]
    },
    cta: {
      title: "Gérez votre ITAD télécom à grande échelle",
      subtitle: "Audit télécom gratuit sous 48 h — nos experts dimensionnent votre programme CPE, réseau et datacenter.",
      button: "Demander un audit télécom",
      secondaryButton: "Voir le cas opérateur datacenter"
    }
  },
  index: {
    hero: {
      title: "Notre expertise sectorielle ITAD",
      subtitle: "16 secteurs d'activité accompagnés — chaque vertical a ses régulateurs, ses cycles de vie, ses contraintes de chaîne de garde.",
      kpis: [
        { value: "16", label: "secteurs d'activité" },
        { value: "12+", label: "années d'expérience" },
        { value: "280+", label: "clients accompagnés" }
      ]
    },
    intro: "GreenTechCycle a développé une expertise sectorielle approfondie en accompagnant plus de 280 organisations dans 16 secteurs d'activité. Chaque secteur a ses propres régulateurs, ses propres cycles de vie matériel et ses propres contraintes de chaîne de garde. Découvrez notre approche sectorielle et identifiez les enjeux spécifiques à votre activité.",
    mediaGtcTitle: "Média GTC — TF1, notre référence phare",
    mediaGtcSubtitle: "Le groupe TF1 fait confiance à GreenTechCycle pour l'ensemble de son cycle ITAD : audit, effacement, valorisation et reporting CSRD.",
    mediaGtcCta: "Découvrir le partenariat TF1",
    ctaTitle: "Votre secteur est couvert",
    ctaSubtitle: "16 secteurs, une seule plateforme. Demandez un audit sectoriel gratuit sous 48 h — nos consultants vous reviennent avec un plan d'action adapté à vos contraintes réglementaires.",
    ctaButton: "Demander un audit sectoriel",
    ctaSecondary: "Réserver un pilote Waki Box",
    discover: "Découvrir"
  },
  common: {
    context: "Contexte",
    regulations: "Réglementations",
    challenges: "Défis",
    solution: "Notre réponse",
    stakeholders: "Parties prenantes",
    scenarioLabel: "Scénario",
    solutionLabel: "Avec GreenTechCycle",
    otherSectors: "Découvrir les autres secteurs",
    backToUseCases: "Voir les cas d'usages"
  }
};

// ─── EN Sectors ───
const sectorsEn = {
  banque: {
    hero: { title: "ITAD for Banking & Finance", subtitle: "DORA, PCI-DSS, regulatory oversight — secure your critical IT asset decommissioning", kpis: [{ value: "100%", label: "DORA traceability" }, { value: "48h", label: "erasure certificate" }, { value: "€412", label: "residual value/device" }] },
    profile: { title: "Banking sector profile", narrative: "The financial sector handles the most sensitive data: trading positions, client data, regulatory filings. Since January 2025, DORA mandates digital operational resilience covering the entire ITAD supply chain. Regulators demand flawless traceability. Banking IT fleets — trading datacentres, branches, ATMs, payment terminals — generate continuous high-risk decommissioning flows.", highlights: ["Average fleets of 8,000 to 45,000 assets per banking group", "Accelerated renewal cycles (3 years workstations, 5 years servers)", "DORA art. 28-30 classified data on every device", "Annually auditable TPP register requirement"] },
    pains: { title: "Your priority pain points", items: [{ title: "DORA art. 28-30 compliance", description: "Every ITAD provider must be listed in the TPP register and auditable annually. Non-compliance penalties reach 1% of global daily turnover." }, { title: "High-security erasure", description: "Trading data, client positions and regulatory information require NIST 800-88 Purge erasure with mandatory dual 4-eyes validation." }, { title: "Complete audit trail", description: "Regulators require end-to-end traceability, from physical removal to proof of destruction, with qualified timestamping." }, { title: "Multi-entity management", description: "Banking groups operate dozens of subsidiaries, branches and processing centres, each with their own regulatory requirements." }, { title: "Enforceable chain of custody", description: "Each asset must be individually tracked with a sealed chain of custody, from pickup to proof of destruction or reuse." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Trading datacentre decommissioning", description: "Certified erasure of 2,400 servers containing high-frequency trading algorithms and classified market data.", result: "100% DORA compliant, €1.2M value recovered" }, { title: "Branch network rollout", description: "Coordinated replacement of 4,800 workstations across 1,200 branches over 6 months, with PCI-DSS erasure.", result: "0 data incidents, €890K refurbishment value" }, { title: "ATM migration", description: "Secure removal and destruction of 1,600 ATMs containing SAM cards, EMV certificates and transaction logs.", result: "100% certified destruction, regulatory report D+5" }, { title: "Regulatory audit", description: "Complete ITAD audit trail restitution for regulatory inspection, with dedicated auditor exports.", result: "Audit passed without reservation in 4 days" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "412", suffix: "€", label: "residual value recovered per device" }, { value: "96", suffix: "%", label: "DORA compliance rate achieved" }, { value: "1,850", suffix: "t", label: "CO₂e avoided (8,000-device fleet)" }, { value: "4", suffix: "d", label: "regulatory audit turnaround" }], details: "For an 8,000-device fleet renewal, GTC generates an average of €3.3M in recovered value and 1,850 tCO₂e avoided, while guaranteeing DORA/PCI-DSS compliance." },
    personas: { title: "Key decision-makers", items: [{ role: "CIO / CTO", concern: "Operational continuity and DORA TPP register", ctaAngle: "Real-time multi-entity dashboard" }, { role: "CISO", concern: "Certified erasure and chain of custody", ctaAngle: "NIST 800-88 certificates with 4-eyes validation" }, { role: "CFO", concern: "Asset valuation and budget optimisation", ctaAngle: "Asset Intelligence module with EMEA market pricing" }, { role: "Compliance Director", concern: "DORA, PCI-DSS regulatory compliance", ctaAngle: "Pre-configured compliance matrix + auditor exports" }, { role: "CSR Director", concern: "CSRD scope 3 IT reporting", ctaAngle: "Carbon module with Boavizta finance-calibrated factors" }] },
    arguments: { title: "Why choose GTC for banking", items: [{ title: "DORA art. 28 qualification", description: "GTC is qualified as a DORA-compliant ITAD provider, listed in the TPP register and annually auditable." }, { title: "Native 4-eyes erasure", description: "Every critical operation is validated by two independent operators, in line with banking standards." }, { title: "Blockchain chain of custody", description: "End-to-end traceability with eIDAS seal and qualified RGS** timestamping, enforceable before regulators." }, { title: "Dedicated auditor exports", description: "One-click regulatory-formatted reporting with cryptographically verifiable evidence." }] },
    objections: { title: "FAQ — Banking sector", items: [{ question: "Is GTC qualified under DORA art. 28-30?", answer: "Yes. GTC is listed in the TPP register as a critical ITAD provider. We supply the full DORA qualification file, including annual audit reports, R2v3 and ISO 27001 certifications, and the article 28 compliance matrix." }, { question: "What is the erasure certificate turnaround?", answer: "Individual NIST 800-88 certificates are available within 24 hours of processing. For regulatory audits, we deliver the consolidated report within 4 business days." }, { question: "How do you handle high-frequency trading data?", answer: "HFT servers are processed in a dedicated secure zone with NIST 800-88 Purge erasure followed by HMG IS5 Enhanced physical destruction (6mm shred). Systematic dual 4-eyes validation." }, { question: "Can you operate across multiple banking entities simultaneously?", answer: "Yes. Our platform manages multi-entity permissions with strict RBAC isolation. Each subsidiary has its own space, SLAs and regulatory exports." }] },
    cta: { title: "Secure your banking ITAD", subtitle: "Free DORA audit within 48 hours — our financial consultants will return with a compliant plan.", button: "Request a DORA audit", secondaryButton: "View the CAC 40 bank case" }
  },
  sante: {
    hero: { title: "ITAD for Healthcare", subtitle: "Health data hosting, patient records, privacy — protect health data end-to-end", kpis: [{ value: "100%", label: "HDS compliant" }, { value: "4,200", label: "devices refurbished" }, { value: "24h", label: "certificates available" }] },
    profile: { title: "Healthcare sector profile", narrative: "Healthcare facilities manage particularly sensitive patient data: medical records, imaging, lab results, genomic data. HDS certification strictly governs the processing of this data, including its destruction. Data protection authorities are especially vigilant in this sector. Hospital IT fleets — clinical workstations, EHR servers, imaging equipment, connected medical devices — represent considerable volumes with varying lifecycles.", highlights: ["Fleets of 2,000 to 12,000 assets per hospital group", "Connected medical devices (IoMT) with embedded data", "Mandatory physical destruction for certain media", "Constrained IT budget and often aging equipment"] },
    pains: { title: "Your priority pain points", items: [{ title: "HDS patient data", description: "Medical records, DICOM images and lab results require HDS-compliant erasure with individual certificates per device." }, { title: "Connected medical devices", description: "IoMT devices (monitors, pumps, imagers) contain embedded patient data difficult to erase with standard methods." }, { title: "Regulatory traceability", description: "Regular audits require a complete audit trail from device removal to destruction certificate." }, { title: "Multi-site hospital groups", description: "Hospital groups span hospitals, clinics, care homes and practices with heterogeneous fleets and complex logistics." }, { title: "Charitable reuse", description: "Regulatory and social missions encourage reuse through charitable channels." }] },
    useCases: { title: "Priority use cases", items: [{ title: "9,000-bed hospital renewal", description: "Coordinated decommissioning of 4,200 clinical workstations and 180 EHR servers across 8 sites, without care disruption.", result: "4,200 devices refurbished via charity, 0 data incidents" }, { title: "PACS imaging migration", description: "Erasure and destruction of 340 imaging stations containing 15 years of patient DICOM data.", result: "100% certified destruction, regulatory report D+3" }, { title: "IoMT device retirement", description: "Secure collection and processing of 1,800 end-of-life connected medical devices (monitors, pumps, sensors).", result: "Embedded data erased, 62% refurbished" }, { title: "Health data audit", description: "Complete audit trail restitution for regulatory control, covering 3 years of decommissioning.", result: "Audit passed without observation" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "4,200", suffix: "+", label: "devices refurbished via charity" }, { value: "89", suffix: "%", label: "reuse rate achieved" }, { value: "680", suffix: "t", label: "CO₂e avoided (avg. hospital group)" }, { value: "3", suffix: "d", label: "audit report turnaround" }], details: "For a hospital group of 4,200 devices, charitable refurbishment generates €840K in social value and 680 tCO₂e avoided, with guaranteed HDS compliance." },
    personas: { title: "Key decision-makers", items: [{ role: "Hospital CIO", concern: "Care continuity during decommissioning", ctaAngle: "Department-by-department planning with zero disruption" }, { role: "CISO / DPO", concern: "HDS erasure and regulatory traceability", ctaAngle: "HDS-compliant certificates + 360° audit trail" }, { role: "Hospital Group Director", concern: "Multi-facility oversight and budget", ctaAngle: "Consolidated group dashboard with budget tracking" }, { role: "Biomedical Engineer", concern: "Connected medical device management", ctaAngle: "Dedicated IoMT module with specific erasure" }, { role: "CSR Director", concern: "Charitable reuse and carbon footprint", ctaAngle: "Charity partner network + healthcare CSRD reporting" }] },
    arguments: { title: "Why choose GTC for healthcare", items: [{ title: "Certified HDS expertise", description: "Erasure and destruction processes compliant with Health Data Hosting certification requirements." }, { title: "Native IoMT management", description: "Dedicated module for connected medical devices with adapted erasure protocols (flash memory, firmware)." }, { title: "Charity partner network", description: "Refurbishment circuit through charitable organisations to maximise social impact." }, { title: "Healthcare compliance", description: "Audit trail compliant with health data regulatory framework, with formatted restitution for inspections." }] },
    objections: { title: "FAQ — Healthcare sector", items: [{ question: "Are you HDS certified?", answer: "GTC operates in compliance with HDS requirements for health data destruction. Our NIST 800-88 certificates are recognised as proof of compliant destruction." }, { question: "How do you handle PACS imaging equipment?", answer: "PACS stations are processed in a dedicated secure zone. DICOM data is erased per NIST 800-88 Purge, then disks undergo certified physical destruction." }, { question: "Can you operate without disrupting care?", answer: "Yes. We plan each intervention department by department, outside critical windows. Our SLA guarantees zero care disruption." }, { question: "What is your geographic coverage for hospital groups?", answer: "Our 4 sites in France cover the entire territory. For multi-site groups, we deploy dedicated teams with a single coordinator." }] },
    cta: { title: "Protect health data", subtitle: "Free HDS audit within 48 hours — our healthcare consultants analyse your fleet and obligations.", button: "Request an HDS audit", secondaryButton: "View the hospital case" }
  },
  industrie: {
    hero: { title: "ITAD for Industry", subtitle: "PLCs, SCADA, industrial IoT — manage the lifecycle of your IT/OT equipment", kpis: [{ value: "IT+OT", label: "unified inventory" }, { value: "20 yrs", label: "lifecycles managed" }, { value: "73%", label: "reuse rate" }] },
    profile: { title: "Industrial sector profile", narrative: "Industry uses a mix of traditional IT and OT (Operational Technology): PLCs, SCADA systems, IoT sensors, industrial PCs. These devices have long lifecycles (10-20 years) and often contain sensitive production data, intellectual property and critical configurations. IT scope 3 emissions are particularly heavy in manufacturing.", highlights: ["Heterogeneous fleets of 500 to 15,000 IT/OT assets per site", "EOSL equipment without vendor support or spare parts", "Embedded production data and intellectual property", "CSRD/ESRS E5 obligation on industrial scope 3"] },
    pains: { title: "Your priority pain points", items: [{ title: "IT/OT convergence", description: "PLCs, SCADA and HMI coexist with standard IT but require specific erasure protocols adapted to flash memory and PLC firmware." }, { title: "Long lifecycles", description: "Industrial equipment lives 10-20 years. EOSL tracking, spare part management and replacement planning are critical." }, { title: "Heavy scope 3 carbon", description: "Bulky industrial equipment (servers, PLCs, connected machine tools) weighs heavily in scope 3 carbon reporting." }, { title: "Intellectual property", description: "Production data, manufacturing recipes and embedded machine parameters represent major industrial espionage risks." }, { title: "Distributed sites", description: "Industrial groups operate dozens of production sites with heterogeneous fleets to coordinate." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Production line modernisation", description: "Coordinated replacement of 480 PLCs and 120 HMI stations across 3 sites, with program and production data erasure.", result: "0 IP leaks, 890 tCO₂e avoided" }, { title: "SCADA decommissioning", description: "Secure removal of 240 RTUs and SCADA concentrators containing network topologies and cryptographic keys.", result: "100% certified destruction, NIS2 matrix validated" }, { title: "Factory datacentre migration", description: "Decommissioning of 1,200 servers and storage arrays from an industrial datacentre across 2 sites.", result: "€1.8M value recovered, CSRD ESRS E5 report delivered" }, { title: "IoT sensor renewal", description: "Collection and processing of 8,000 end-of-life industrial IoT sensors, with firmware erasure and certified recycling.", result: "98% material recycling, 0 residual data" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "1.8", suffix: "M€", label: "value recovered (factory DC)" }, { value: "890", suffix: "t", label: "CO₂e avoided per site" }, { value: "73", suffix: "%", label: "reuse rate achieved" }, { value: "100", suffix: "%", label: "NIS2/CSRD compliance" }], details: "For an industrial site of 1,200 servers and 500 PLCs, GTC recovers an average of €1.8M in value and avoids 890 tCO₂e while guaranteeing NIS2 and CSRD ESRS E5 compliance." },
    personas: { title: "Key decision-makers", items: [{ role: "Industrial CIO", concern: "Unified IT/OT inventory and EOSL planning", ctaAngle: "IT+OT platform with end-of-support alerts" }, { role: "CISO / OT Security", concern: "Production data and IP erasure", ctaAngle: "Protocols adapted for PLCs, SCADA, flash" }, { role: "Plant Director", concern: "Production continuity during decommissioning", ctaAngle: "Planned intervention outside production hours" }, { role: "CSR Director", concern: "Scope 3 carbon and CSRD", ctaAngle: "Carbon module calibrated for industry + ESRS E5" }] },
    arguments: { title: "Why choose GTC for industry", items: [{ title: "Unified IT/OT inventory", description: "A single platform to manage PLCs, SCADA, IoT sensors and standard IT with a consolidated inventory." }, { title: "OT-adapted erasure", description: "Specific protocols for PLC flash memory, SCADA firmware and embedded industrial data." }, { title: "Native EOSL module", description: "End-of-support tracking with proactive alerts and replacement planning." }, { title: "Industrial carbon footprint", description: "Carbon module calibrated on Boavizta v1.4 factors for heavy industrial equipment." }] },
    objections: { title: "FAQ — Industrial sector", items: [{ question: "Can you erase PLCs and SCADA systems?", answer: "Yes. We have specific protocols for PLC flash memory (Siemens, Rockwell, Schneider), SCADA RTUs and HMIs. Erasure covers programs, configuration data and cryptographic keys." }, { question: "Can you intervene on a production site without downtime?", answer: "Yes. We plan interventions during scheduled maintenance windows or outside production shifts. Our SLA guarantees zero production impact." }, { question: "How do you handle EOSL equipment?", answer: "Our EOSL module manages the complete lifecycle: early warning, spare part sourcing, replacement planning and secure end-of-life decommissioning." }, { question: "What CSRD reporting do you provide for industry?", answer: "Automated CSRD ESRS E5 module covering the 11 applicable data points, calibrated on Boavizta v1.4 industrial emission factors. ISAE 3410-ready audit export." }] },
    cta: { title: "Optimise your industrial ITAD", subtitle: "Free IT/OT audit within 48 hours — our industrial experts map your fleet.", button: "Request an industrial audit", secondaryButton: "View the industry CSRD case" }
  },
  retail: {
    hero: { title: "ITAD for Retail & Distribution", subtitle: "PCI-DSS v4.0, GDPR, CSRD — manage end-of-life for POS terminals and multi-site fleets", kpis: [{ value: "3,000", label: "sites orchestrated" }, { value: "90d", label: "deployment time" }, { value: "€89K", label: "annual savings" }] },
    profile: { title: "Retail sector profile", narrative: "Multi-site retail brands handle payment card data (PCI-DSS) and GDPR-regulated customer data. Triennial renewal of POS systems, payment terminals, electronic shelf labels and interactive kiosks generates heavy and heterogeneous ITAD flows, to be coordinated without commercial disruption.", highlights: ["300 to 3,000 stores with simultaneous renewal", "POS systems containing SAM cards, EMV certificates", "Pressure from franchisees and store managers on cost and timing", "Consolidated CSRD reporting across brands and countries"] },
    pains: { title: "Your priority pain points", items: [{ title: "Multi-site orchestration", description: "Coordinating removal across 300 to 3,000 stores within 90 days without disrupting commercial operations." }, { title: "PCI-DSS compliance", description: "POS systems and payment terminals contain SAM cards, EMV certificates and transactional data subject to PCI-DSS v4.0." }, { title: "Heterogeneous terminals", description: "Interactive kiosks, RFID/ESL labels, digital safes, receipt printers — each type requires specific processing." }, { title: "Asset valuation", description: "CFOs demand precise market pricing to maximise resale value of refurbishable equipment." }, { title: "Multi-brand reporting", description: "Distribution groups operate multiple brands across countries, each with specific CSRD requirements." }] },
    useCases: { title: "Priority use cases", items: [{ title: "POS replacement across 220 stores", description: "Removal and erasure of 4,800 POS systems with SAM cards and EMV certificates across 220 stores in 90 days.", result: "0 PCI-DSS incidents, €89K/year saved" }, { title: "Electronic label migration", description: "Collection and recycling of 180,000 ESL tags and RFID modules across 450 stores with unit traceability.", result: "95% material recycling, WEEE report compliant" }, { title: "WakiBox store deployment", description: "Installation of WakiBox collection kiosks in 120 stores for pooled end-of-life equipment collection.", result: "Collection rate +340%, logistics cost -62%" }, { title: "Multi-country CSRD reporting", description: "CSRD ESRS E5 reporting consolidation for 3 brands across 5 countries, with per-store data.", result: "CSRD report delivered D-90 before closing, 0 audit reservations" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "89", suffix: "K€", label: "annual savings (220-store brand)" }, { value: "95", suffix: "%", label: "material recycling rate" }, { value: "340", suffix: "%", label: "WakiBox collection rate increase" }, { value: "0", suffix: "", label: "CSRD audit reservations" }], details: "For a 220-store brand, GTC generates €89K/year in savings and a compliant CSRD ESRS E5 report without reservations." },
    personas: { title: "Key decision-makers", items: [{ role: "Retail CIO", concern: "Multi-site orchestration without commercial disruption", ctaAngle: "Wave deployment plan with real-time tracking" }, { role: "CISO", concern: "PCI-DSS erasure and customer data", ctaAngle: "Individual PCI-DSS certificates per terminal" }, { role: "CFO", concern: "Asset valuation and cost optimisation", ctaAngle: "Asset Intelligence EMEA market pricing module" }, { role: "Network Director", concern: "Minimal store impact", ctaAngle: "Guaranteed out-of-hours intervention" }, { role: "CSR Director", concern: "Multi-brand CSRD and circular economy", ctaAngle: "ESRS E5 reporting per brand, per country" }] },
    arguments: { title: "Why choose GTC for retail", items: [{ title: "Multi-site orchestration", description: "Wave planning with real-time tracking, coordinated with store managers for zero commercial impact." }, { title: "WakiBox store module", description: "Pooled collection kiosk installed in stockrooms for end-of-life small equipment." }, { title: "Asset Intelligence", description: "Real-time EMEA market pricing to maximise resale value of refurbishable POS and terminals." }, { title: "Store TMS API", description: "Native connector with logistics management systems to coordinate pickups without disrupting deliveries." }] },
    objections: { title: "FAQ — Retail sector", items: [{ question: "Can you handle 3,000 sites simultaneously?", answer: "Yes. Our multi-site planning module manages up to 5,000 stores per campaign in waves of 50-200 stores." }, { question: "How do you erase POS SAM cards?", answer: "SAM cards are extracted and physically destroyed per PCI-DSS Appendix A1. A unit destruction report is issued per POS system." }, { question: "What is the per-store intervention time?", answer: "Standard intervention within 5 business days after scheduling. Express 48h mode available for emergencies." }, { question: "Do you provide per-store reporting?", answer: "Yes. Each store has its own platform space with inventory, certificates and KPIs. Reporting consolidates by brand, country and group." }] },
    cta: { title: "Orchestrate your multi-site ITAD", subtitle: "Free rollout plan within 48 hours — our retail experts size your campaign.", button: "Request a rollout plan", secondaryButton: "View the retail WakiBox case" }
  },
  energie: {
    hero: { title: "ITAD for Energy & Utilities", subtitle: "NIS2, DORA, energy code — secure end-of-life for OT/IT critical infrastructure", kpis: [{ value: "CIO", label: "operators supported" }, { value: "50K", label: "OT assets processed" }, { value: "Restricted", label: "distribution compliant" }] },
    profile: { title: "Energy sector profile", narrative: "Energy operators (generation, transmission, distribution) run IT/OT assets classified as critical infrastructure. Decommissioning smart-meter concentrators, SCADA RTUs, control rooms or IT firewalls requires a tracked chain of custody, restricted-distribution grade destruction, and documented CSRD scope 3 reporting.", highlights: ["Fleets of 4,000 to 50,000 OT assets", "12-20 year lifecycles with frequent vendor EOSL", "Sensitive embedded data: network topology, cryptographic keys", "Cybersecurity authority audit expected within 30 days"] },
    pains: { title: "Your priority pain points", items: [{ title: "Critical infrastructure", description: "Assets classified as critical infrastructure require enhanced decommissioning procedures with security clearances." }, { title: "Massive OT volumes", description: "Fleets of 4,000 to 50,000 concentrators, RTUs and IEDs require large-scale collection and processing logistics." }, { title: "Restricted-distribution destruction", description: "Restricted-distribution assets require compliant physical destruction with 6mm shredding and sealed protocols." }, { title: "NIS2/DORA compliance", description: "NIS2 classifies energy as essential entities. DORA applies to energy trading and hedging activities." }, { title: "Secure transport", description: "Sensitive asset transport requires T2/T3 class secure convoys with specific clearances." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Smart-meter concentrator replacement", description: "Decommissioning of 35,000 first-generation concentrators with firmware erasure and certified recycling.", result: "100% traceability, 1,200 tCO₂e avoided" }, { title: "SCADA control room migration", description: "Secure removal of 180 RTUs and control stations containing network topologies and cryptographic keys.", result: "Certified restricted-distribution destruction, audit validated" }, { title: "Energy trading DC decommissioning", description: "Erasure and destruction of 800 energy trading servers per DORA requirements.", result: "DORA compliance validated, €2.4M recovered" }, { title: "Smart-meter renewal", description: "Collection and recycling of 12,000 smart meters with customer consumption data erasure.", result: "GDPR compliant, 94% material recycling" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "2.4", suffix: "M€", label: "value recovered (datacentre)" }, { value: "1,200", suffix: "t", label: "CO₂e avoided per campaign" }, { value: "100", suffix: "%", label: "NIS2/DORA compliance" }, { value: "30", suffix: "d", label: "audit restitution" }], details: "For an energy decommissioning campaign (datacentre + OT), GTC recovers an average of €2.4M and avoids 1,200 tCO₂e with guaranteed NIS2/DORA compliance." },
    personas: { title: "Key decision-makers", items: [{ role: "Energy CIO", concern: "Critical asset inventory and NIS2 compliance", ctaAngle: "Platform with critical infrastructure tagging and NIS2 matrix" }, { role: "CISO", concern: "Restricted-distribution destruction and chain of custody", ctaAngle: "Certified destruction + eIDAS RGS** seal" }, { role: "OT Manager", concern: "SCADA and concentrator fleet management", ctaAngle: "Unified OT module with EOSL alerts" }, { role: "CSR Director", concern: "Scope 3 OT/IT carbon footprint", ctaAngle: "Carbon module with Boavizta energy factors" }] },
    arguments: { title: "Why choose GTC for energy", items: [{ title: "Security clearances", description: "Teams cleared for restricted-distribution asset processing and handling." }, { title: "Large-scale logistics", description: "Processing capacity of 50,000+ OT assets per campaign with secure T2/T3 convoys." }, { title: "NIS2/DORA/IEC 62443 matrix", description: "Pre-configured compliance matrix covering the three regulatory frameworks applicable to energy." }, { title: "Energy Carbon module", description: "Boavizta v1.4 emission factors calibrated for energy OT equipment." }] },
    objections: { title: "FAQ — Energy sector", items: [{ question: "Do you have clearances for critical infrastructure assets?", answer: "Yes. Our teams are security-cleared for processing critical infrastructure and restricted-distribution assets. Destruction is performed with 6mm shredding." }, { question: "What capacity for 50,000+ OT asset fleets?", answer: "Our 4 sites process up to 80,000 assets per campaign. For concentrator fleets, we deploy mobile collection units on-site." }, { question: "How do you handle DORA for energy trading?", answer: "The DORA module is pre-configured for energy trading entities. We provide art. 28 ITAD provider qualification and dedicated TPP register." }, { question: "What turnaround for a cybersecurity authority audit?", answer: "Full restitution within 30 days. Our dedicated export is formatted per agency expectations with verifiable cryptographic evidence." }] },
    cta: { title: "Secure your critical energy assets", subtitle: "Free NIS2/DORA audit within 48 hours — our energy experts assess your critical infrastructure scope.", button: "Request a NIS2/DORA audit", secondaryButton: "View the energy case" }
  },
  transport: {
    hero: { title: "ITAD for Transport & Logistics", subtitle: "IoT fleets, ticketing, ITS — secure end-of-life for your embedded equipment", kpis: [{ value: "IoT", label: "fleets managed" }, { value: "NIS2", label: "transport compliant" }, { value: "98%", label: "material recycling" }] },
    profile: { title: "Transport sector profile", narrative: "The transport sector operates embedded equipment fleets (ticketing, ITS systems, IoT sensors, GPS, cameras) distributed across extended networks. NIS2 classifies transport operators as essential entities. Mobility, ticketing and geolocation data are subject to GDPR. Fleet renewals generate significant volumes to be processed securely.", highlights: ["Fleets of 2,000 to 30,000 embedded devices per network", "GDPR mobility, ticketing and geolocation data", "ITS (Intelligent Transport Systems) with traffic data", "Equipment distributed across road, rail and urban networks"] },
    pains: { title: "Your priority pain points", items: [{ title: "Embedded IoT fleets", description: "Sensors, GPS, cameras and communication modules contain geolocation data and proprietary firmware to erase." }, { title: "Ticketing and passenger data", description: "Validators, ticket machines and ticketing systems contain payment and travel data subject to GDPR." }, { title: "Distributed ITS equipment", description: "Intelligent transport systems (signs, traffic sensors, connected signals) are spread across extended networks." }, { title: "NIS2 transport compliance", description: "NIS2 classifies transport operators as essential entities with enhanced cybersecurity obligations." }, { title: "Fleet renewal", description: "Coordinated replacement of thousands of embedded devices requires complex field collection logistics." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Urban ticketing migration", description: "Replacement of 4,500 validators and 320 ticket machines across an urban transit network with passenger data erasure.", result: "100% GDPR compliant, 0 service disruption" }, { title: "Logistics GPS fleet renewal", description: "Collection and erasure of 8,000 embedded GPS modules containing geolocation history and customer data.", result: "GDPR compliant, 92% material recycling" }, { title: "Motorway ITS decommissioning", description: "Secure removal of 1,200 traffic sensors and connected signs across 450 km of motorway.", result: "Traffic data erased, 98% recycled" }, { title: "Onboard camera replacement", description: "Erasure and destruction of 3,600 onboard surveillance cameras containing GDPR recordings.", result: "Certified destruction, regulatory report delivered" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "98", suffix: "%", label: "material recycling rate" }, { value: "450", suffix: "t", label: "CO₂e avoided per campaign" }, { value: "0", suffix: "", label: "service disruption" }, { value: "100", suffix: "%", label: "NIS2 compliance" }], details: "For a ticketing renewal campaign (4,500 validators), GTC guarantees zero service disruption, 98% material recycling and a compliant NIS2 report." },
    personas: { title: "Key decision-makers", items: [{ role: "Transport CIO", concern: "Embedded fleet and ticketing management", ctaAngle: "IoT platform with embedded inventory" }, { role: "CISO", concern: "Mobility data erasure and NIS2", ctaAngle: "NIST 800-88 certificates + NIS2 transport matrix" }, { role: "Network Director", concern: "Service continuity during replacement", ctaAngle: "Line/zone planning without disruption" }, { role: "CSR Director", concern: "IT fleet carbon and CSRD", ctaAngle: "Transport Carbon module + ESRS E5" }] },
    arguments: { title: "Why choose GTC for transport", items: [{ title: "Field logistics", description: "Mobile teams for collection across extended networks: depots, stations, tracks, motorway rest areas." }, { title: "Embedded IoT module", description: "Specific management for sensors, GPS, cameras and communication modules with adapted firmware erasure." }, { title: "NIS2 transport compliance", description: "Pre-configured matrix for essential entities in the transport sector (road, rail, urban, air)." }, { title: "Service continuity", description: "Line-by-line and zone-by-zone planning to guarantee zero service disruption during replacement." }] },
    objections: { title: "FAQ — Transport sector", items: [{ question: "Can you operate on a live transport network?", answer: "Yes. We plan each intervention by line and zone, outside peak hours. Our SLA guarantees zero passenger service disruption." }, { question: "How do you erase embedded IoT modules?", answer: "Our protocols cover flash memory, firmware and configuration data for sensors, GPS, cameras and communication modules." }, { question: "Do you handle collection across extended networks?", answer: "Yes. Our mobile teams operate at depots, stations, tracks and motorway rest areas with adapted vehicles for secure high-volume collection." }, { question: "What NIS2 compliance for transport?", answer: "Our NIS2 transport matrix covers requirements specific to essential entities: road, rail, urban and air." }] },
    cta: { title: "Secure your embedded fleets", subtitle: "Free transport audit within 48 hours — our experts size your field campaign.", button: "Request a transport audit", secondaryButton: "View the ticketing case" }
  },
  public: {
    hero: { title: "ITAD for the Public Sector", subtitle: "Public procurement, GDPR, digital sobriety — transparency and compliance for government", kpis: [{ value: "UGAP", label: "listed" }, { value: "100%", label: "charity channel" }, { value: "WEEE", label: "standards compliant" }] },
    profile: { title: "Public sector profile", narrative: "The public sector faces enhanced obligations for transparency, GDPR compliance and public procurement rules. WEEE management standards apply. Procurement specifications are strict and purchasing procedures are governed by public procurement law. Anti-waste legislation mandates reuse and digital sobriety.", highlights: ["Fleets of 500 to 8,000 devices per authority", "Mandatory competitive tendering and procurement transparency", "Mandatory reuse and charitable donations", "Enhanced GDPR with public servant accountability"] },
    pains: { title: "Your priority pain points", items: [{ title: "Strict public procurement", description: "Public procurement code imposes precise specifications, transparent competitive bidding and weighted CSR criteria." }, { title: "Public servant and citizen GDPR", description: "Data processed covers both public servants and citizens, with enhanced public accountability for breaches." }, { title: "Digital sobriety", description: "Anti-waste legislation mandates prioritising reuse, charitable donations and digital sobriety in public purchasing." }, { title: "Constrained budget", description: "Government bodies operate with limited IT budgets and must maximise end-of-life fleet value recovery." }, { title: "Government audit", description: "Reporting must be transparent and auditable by regional audit chambers and inspections." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Ministry fleet renewal", description: "Decommissioning of 6,500 workstations and 240 servers with classified erasure and charity donation circuit.", result: "100% charity channel, 4,500 donations" }, { title: "Local authority", description: "IT fleet management for 12 grouped municipalities (2,400 devices), with pooled costs and consolidated WEEE reporting.", result: "Unit cost -35%, WEEE report delivered" }, { title: "Higher education institution", description: "Refurbishment of 3,200 student workstations with GDPR erasure and redistribution through charity.", result: "89% reuse, 480 tCO₂e avoided" }, { title: "Regional audit", description: "Complete and transparent ITAD programme restitution for budgetary and compliance audit.", result: "Audit passed without observation" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "4,500", suffix: "+", label: "charity donations made" }, { value: "35", suffix: "%", label: "unit cost reduction" }, { value: "480", suffix: "t", label: "CO₂e avoided per programme" }, { value: "0", suffix: "", label: "audit reservations" }], details: "For a ministry programme of 6,500 devices, GTC generates 4,500 charity donations, reduces costs by 35% and delivers a compliant WEEE report." },
    personas: { title: "Key decision-makers", items: [{ role: "Government CIO", concern: "Public procurement compliance", ctaAngle: "Platform listed with procurement traceability" }, { role: "DPO", concern: "Public servant and citizen GDPR", ctaAngle: "GDPR certificates with complete audit trail" }, { role: "General Director", concern: "Budget and transparency", ctaAngle: "Auditable budgetary reporting" }, { role: "Digital Affairs official", concern: "Digital sobriety and social impact", ctaAngle: "Charity channel + carbon footprint communications" }, { role: "Procurement Manager", concern: "CSR criteria in procurement", ctaAngle: "Complete technical file with CSR scoring" }] },
    arguments: { title: "Why choose GTC for the public sector", items: [{ title: "Procurement listed", description: "GTC is listed with central procurement agencies, simplifying ordering for government bodies." }, { title: "Charity partner network", description: "Refurbishment and donation through charitable organisations to maximise social impact." }, { title: "WEEE standards compliant", description: "Process certified compliant with WEEE management standards for the public sector." }, { title: "Government audit transparency", description: "Transparent and auditable reporting for regional audit chambers with complete budgetary traceability." }] },
    objections: { title: "FAQ — Public sector", items: [{ question: "Are you listed with central procurement?", answer: "Yes. GTC is listed with central procurement agencies, enabling simplified ordering without additional competitive bidding." }, { question: "How do you handle charitable donations?", answer: "We operate a structured donation circuit through charitable organisations. Each donation is individually tracked with a reuse certificate." }, { question: "What compliance for public procurement?", answer: "Our technical file includes all weighted CSR criteria, R2v3/ISO 14001 certifications, WEEE standards compliance and traceability evidence." }, { question: "Can you consolidate multiple authorities?", answer: "Yes. Our platform manages inter-authority procurement groups with consolidated reporting and pooled costs." }] },
    cta: { title: "Structure your public sector ITAD", subtitle: "Free government audit within 48 hours — our public sector experts analyse your fleet and obligations.", button: "Request a government audit", secondaryButton: "View the ministry case" }
  },
  tech: {
    hero: { title: "ITAD for Technology & SaaS", subtitle: "Datacentres, developer fleets, SOC 2 compliance — manage your tech asset end-of-life", kpis: [{ value: "SOC 2", label: "compliant" }, { value: "99.2%", label: "inventory accuracy" }, { value: "73%", label: "reuse rate" }] },
    profile: { title: "Technology sector profile", narrative: "Tech companies and SaaS vendors operate datacentres, high-end developer fleets and hybrid cloud infrastructure. SOC 2 Type II compliance requires strict asset lifecycle control, including proof of data destruction. Renewal cycles are fast (2-3 years for developer workstations, 3-5 years for servers) and residual value of high-end equipment is significant.", highlights: ["Own or co-located datacentres with high-density equipment", "High-end developer fleets (MacBook Pro, GPU workstations)", "SOC 2 Type II compliance with destruction proof", "Fast renewal cycles with high residual value"] },
    pains: { title: "Your priority pain points", items: [{ title: "SOC 2 Type II compliance", description: "SOC 2 reports require formal proof of data destruction during decommissioning with verifiable controls." }, { title: "High-density datacentres", description: "GPU servers, NVMe storage arrays and 400G network equipment represent considerable volumes and values." }, { title: "Intellectual property", description: "Source code, SaaS customer data and infrastructure configurations are critical assets to protect." }, { title: "High residual value", description: "MacBook Pros, GPU workstations and recent servers retain significant residual value on the refurbished market." }, { title: "Rapid growth", description: "Hypergrowth tech companies renew fleets frequently, generating continuous ITAD flows." }] },
    useCases: { title: "Priority use cases", items: [{ title: "SaaS datacentre decommissioning", description: "Erasure and destruction of 1,600 GPU servers and 400TB NVMe storage from a SaaS vendor migrating to cloud.", result: "SOC 2 compliant, €3.2M value recovered" }, { title: "Developer fleet renewal", description: "Replacement of 850 MacBook Pros and 120 GPU workstations with certified erasure and refurbished resale.", result: "€412/device recovered, 0 residual data" }, { title: "Satellite office closure", description: "Complete decommissioning of a 200-device office (tech startup) with inventory, erasure and valuation in 10 days.", result: "100% processed in 10 days, €89K recovered" }, { title: "SOC 2 Type II audit", description: "Destruction proof restitution for annual SOC 2 audit covering 2,400 decommissioned assets.", result: "SOC 2 audit passed without exception" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "3.2", suffix: "M€", label: "value recovered (SaaS DC)" }, { value: "412", suffix: "€", label: "residual value per dev device" }, { value: "100", suffix: "%", label: "SOC 2 compliance" }, { value: "10", suffix: "d", label: "full 200-device office turnaround" }], details: "For a SaaS vendor with 1,600 servers and 850 developer devices, GTC recovers €3.2M and guarantees SOC 2 Type II compliance without exception." },
    personas: { title: "Key decision-makers", items: [{ role: "CTO / VP Engineering", concern: "Datacentre decommissioning and IP", ctaAngle: "Certified GPU server erasure + chain of custody" }, { role: "CISO / Security Lead", concern: "SOC 2 and destruction proof", ctaAngle: "Dedicated SOC 2 export with cryptographic evidence" }, { role: "CFO / VP Finance", concern: "High-end asset residual value", ctaAngle: "Asset Intelligence tech EMEA market pricing" }, { role: "IT Ops / SRE Lead", concern: "Datacentre decommissioning logistics", ctaAngle: "Rack-by-rack removal plan with real-time tracking" }] },
    arguments: { title: "Why choose GTC for technology", items: [{ title: "Native SOC 2 export", description: "Built-in SOC 2 Type II restitution module with cryptographically verifiable destruction proofs." }, { title: "GPU datacentre expertise", description: "Protocols adapted for high-density GPU servers, NVMe arrays and latest-generation network equipment." }, { title: "Tech EMEA pricing", description: "Asset Intelligence module with specific tech refurbished market pricing (MacBook Pro, ThinkPad X1, Dell/HP servers)." }, { title: "Startup agility", description: "Streamlined process for hypergrowth companies: D+1 onboarding, 5-day intervention, monthly billing." }] },
    objections: { title: "FAQ — Technology sector", items: [{ question: "Do you provide SOC 2 destruction proofs?", answer: "Yes. Our SOC 2 module automatically generates destruction proofs in the format expected by auditors (EY, Deloitte, PwC, KPMG). Cryptographically verifiable certificates with SHA-256 hash." }, { question: "How do you handle high-value GPU servers?", answer: "GPU servers (NVIDIA A100/H100, AMD MI300) are individually processed with firmware erasure, NVMe SSD erasure and specific market pricing." }, { question: "What turnaround for a 200-device office?", answer: "10 business days from inventory to certificate delivery. Express 5-day mode available for urgent closures." }, { question: "Do you handle MacBook and Apple hardware?", answer: "Yes. We master Mac erasure (T2/M1/M2/M3) with MDM deactivation, FileVault erasure and individual certificate. Apple refurbished pricing integrated." }] },
    cta: { title: "Optimise your tech ITAD", subtitle: "Free tech audit within 48 hours — our experts size your datacentre or dev fleet decommissioning.", button: "Request a tech audit", secondaryButton: "View the SaaS case" }
  },
  medias: {
    hero: { title: "ITAD for Media & Broadcasting", subtitle: "Broadcast, control rooms, media datacentres — GTC, ITAD partner of the TF1 Group", kpis: [{ value: "€65K", label: "TF1 contract ex-VAT/yr" }, { value: "100%", label: "broadcast traceability" }, { value: "Multi-site", label: "national coverage" }] },
    profile: { title: "Media & broadcasting sector profile", narrative: "The media and broadcasting sector operates complex technical infrastructure: broadcast control rooms, production studios, video processing datacentres, post-production facilities. Broadcast equipment (playout servers, video matrices, encoders, mixers) have specific lifecycles and contain confidential production data (schedules, rights, unreleased content). GreenTechCycle proudly supports the TF1 Group in managing their end-of-life IT assets, with a recurring framework contract of €65,000 ex-VAT/year covering audit, secure erasure, asset recovery and CSRD reporting.", highlights: ["Flagship reference: TF1 framework contract — €65,000 ex-VAT/yr recurring", "Specialised broadcast equipment (playout, encoders, matrices)", "Confidential production data (schedules, rights, content)", "Multi-site: headquarters, studios, control rooms, broadcast centres"] },
    pains: { title: "Your priority pain points", items: [{ title: "Specialised broadcast equipment", description: "Playout servers, video matrices, SDI/IP encoders and mixers are specialised equipment requiring adapted processing protocols." }, { title: "Confidential production data", description: "Programme schedules, broadcast rights, unreleased content and audience data are strategic assets requiring protection." }, { title: "IP/cloud broadcast migration", description: "The transition from SDI to IP and cloud broadcasting generates significant volumes of legacy equipment to decommission." }, { title: "Multi-site studios and control rooms", description: "Media groups operate dozens of sites (headquarters, studios, control rooms, broadcast centres) with specific access constraints." }, { title: "Media CSRD reporting", description: "Listed media groups are subject to CSRD with scope 3 IT reporting obligations including broadcast equipment." }] },
    useCases: { title: "Priority use cases", items: [{ title: "TF1 framework contract — flagship reference", description: "Recurring support for the TF1 Group: quarterly audit, secure broadcast equipment erasure, refurbishable asset recovery and annual CSRD reporting.", result: "€65,000 ex-VAT/yr, 100% traceability, 0 incidents" }, { title: "SDI to IP broadcast migration", description: "Decommissioning of 480 legacy SDI equipment (matrices, routers, encoders) during IP infrastructure migration.", result: "€340K value recovered, full certification" }, { title: "Regional studio closure", description: "Complete decommissioning of a 120-workstation and 40-server editing/post-production studio, with rushes and project erasure.", result: "100% data erased, 89% reused" }, { title: "Broadcast control room renewal", description: "Secure replacement of playout servers and automation systems in a 24/7 broadcast control room.", result: "0 transmission interruption, certificates D+24h" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "65", suffix: "K€", label: "TF1 framework contract ex-VAT/yr" }, { value: "340", suffix: "K€", label: "value recovered (SDI migration)" }, { value: "100", suffix: "%", label: "broadcast traceability" }, { value: "0", suffix: "", label: "transmission interruption" }], details: "The TF1 framework contract illustrates the GTC model for media: recurring support at €65,000 ex-VAT/year covering audit, erasure, recovery and CSRD, with 100% traceability and zero incidents over 3 years." },
    personas: { title: "Key decision-makers", items: [{ role: "Media CIO", concern: "Broadcast and converged IT fleet management", ctaAngle: "Unified broadcast + standard IT platform" }, { role: "Technical Director", concern: "24/7 broadcast continuity", ctaAngle: "Planned intervention outside critical windows" }, { role: "CISO", concern: "Content and audience data protection", ctaAngle: "Certified erasure + sealed chain of custody" }, { role: "CFO", concern: "Broadcast equipment valuation", ctaAngle: "Specialised broadcast refurbished pricing" }, { role: "CSR Director", concern: "CSRD scope 3 including broadcast", ctaAngle: "Carbon module with Boavizta broadcast factors" }] },
    arguments: { title: "Why choose GTC for media", items: [{ title: "Verifiable TF1 reference", description: "Recurring framework contract with the TF1 Group, France's leading private broadcaster. Reference verifiable on request." }, { title: "Broadcast expertise", description: "Protocols adapted for broadcast equipment: playout servers, video matrices, SDI/IP encoders, automation systems." }, { title: "Multi-site framework contract", description: "Recurring support formula covering audit, erasure, recovery and CSRD reporting across all group sites." }, { title: "Guaranteed broadcast continuity", description: "Planned intervention coordinated with technical management to guarantee zero transmission interruption." }] },
    objections: { title: "FAQ — Media sector", items: [{ question: "What is your media reference?", answer: "Our flagship reference is the TF1 Group, with a recurring framework contract of €65,000 ex-VAT/year covering the complete ITAD cycle. This reference is verifiable on request under NDA." }, { question: "Can you handle broadcast equipment?", answer: "Yes. We have developed specific protocols for playout servers (Grass Valley, Harmonic), video matrices (Evertz, Riedel), encoders and broadcast automation systems." }, { question: "Can you operate without interrupting transmission?", answer: "Yes. We plan each intervention in coordination with the broadcast technical director, outside critical broadcast windows. Our SLA guarantees zero transmission interruption." }, { question: "Do you offer a recurring framework contract?", answer: "Yes. Our media framework formula covers: quarterly audit, on-demand erasure, refurbishable asset recovery and annual CSRD reporting. Annual flat-rate pricing." }] },
    mediaGtc: { title: "GTC Media — TF1, flagship reference", subtitle: "How GreenTechCycle became the ITAD partner of the TF1 Group", quote: "GreenTechCycle provides us with the rigour and traceability we demand for our broadcast assets. The framework contract covers all our sites with integrated CSRD reporting.", quoteAuthor: "IT Department, TF1 Group", contractValue: "€65,000 ex-VAT/year", contractLabel: "Recurring framework contract", features: ["Quarterly audit of the entire IT and broadcast fleet", "Secure erasure compliant with group requirements", "Refurbishable equipment recovery on the professional market", "Annual integrated CSRD ESRS E5 reporting", "Multi-site coverage: headquarters, studios, control rooms, broadcast centres"], ctaLabel: "Explore a media framework contract", ctaHref: "/contact?offre=media-cadre" },
    cta: { title: "Join TF1 — choose the media ITAD partner", subtitle: "Free media framework study within 48 hours — our broadcast experts size your support.", button: "Explore a media framework contract", secondaryButton: "View the TF1 case" }
  },
  conseil: {
    hero: { title: "ITAD for Consulting & Professional Services", subtitle: "Client confidentiality, mobility, data audit — secure your consultant fleets", kpis: [{ value: "100%", label: "client confidentiality" }, { value: "48h", label: "guaranteed erasure" }, { value: "€412", label: "value per device" }] },
    profile: { title: "Consulting sector profile", narrative: "Consulting firms and professional services (audit, strategy, IT, legal) manage highly confidential client data on distributed mobile fleets. Consultants use high-end laptops renewed every 2-3 years, containing mission data, proprietary models and sensitive client information. Staff turnover and permanent mobility complicate collection and erasure.", highlights: ["Fleets of 500 to 10,000 high-end laptops", "Confidential client data on every consultant device", "High staff turnover (20-30% annually in Big Four)", "Laptops distributed across dozens of offices and client sites"] },
    pains: { title: "Your priority pain points", items: [{ title: "Client confidentiality", description: "Every consultant laptop contains mission data, proprietary models and client information protected by professional secrecy." }, { title: "Fleet mobility", description: "Consultants work at client sites, satellite offices and from home. Collecting end-of-life equipment is a logistics challenge." }, { title: "Staff turnover", description: "With 20-30% annual turnover in Big Four, the decommissioning flow is continuous and unpredictable." }, { title: "High residual value", description: "ThinkPad X1s and MacBook Pros aged 2-3 years retain significant value on the refurbished market." }, { title: "Demanding internal audit", description: "Big Four compliance departments require formal destruction proofs for every decommissioned device." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Big Four annual renewal", description: "Replacement of 2,400 ThinkPad X1 Carbons in a Big Four firm with certified erasure and refurbished resale.", result: "€412/device recovered, 100% certificates D+24h" }, { title: "Satellite office closure", description: "Complete decommissioning of an 85-device consultant office with on-site collection and express erasure.", result: "Processed in 5 days, 0 residual data" }, { title: "Express consultant offboarding", description: "On-demand erasure of departing consultant laptops with individual certificate within 48 hours.", result: "48h SLA met at 99.8%, professional secrecy guaranteed" }, { title: "Internal compliance audit", description: "Destruction proof restitution for annual internal audit covering 1,800 decommissioned devices.", result: "Audit passed without exception" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "412", suffix: "€", label: "value recovered per consultant device" }, { value: "99.8", suffix: "%", label: "48h SLA met" }, { value: "0", suffix: "", label: "client data leaks" }, { value: "24", suffix: "h", label: "certificates available" }], details: "For an annual renewal of 2,400 consultant devices, GTC recovers €988K in value and delivers 100% of certificates within 24 hours with zero client data leaks." },
    personas: { title: "Key decision-makers", items: [{ role: "CIO / CTO", concern: "Distributed mobile fleet management", ctaAngle: "Platform with multi-office tracking and field collection" }, { role: "CISO / DPO", concern: "Professional secrecy and client data", ctaAngle: "Certified NIST 800-88 erasure + chain of custody" }, { role: "CFO", concern: "High-end laptop fleet valuation", ctaAngle: "Premium refurbished market pricing" }, { role: "Compliance Director", concern: "Destruction proofs for internal audit", ctaAngle: "Dedicated Big Four / mid-cap audit export" }] },
    arguments: { title: "Why choose GTC for consulting", items: [{ title: "Multi-office field collection", description: "Mobile teams for collection at offices, client sites and consultant homes (BYOD/WFH programme)." }, { title: "Guaranteed 48h SLA", description: "Every laptop received is erased and certified within 48 hours maximum. Individual NIST 800-88 certificate with SHA-256 hash." }, { title: "Premium pricing", description: "Asset Intelligence module with specific premium market pricing (ThinkPad X1, MacBook Pro, Dell XPS)." }, { title: "Big Four audit export", description: "Formatted restitution for Big Four internal audits with cryptographically verifiable evidence." }] },
    objections: { title: "FAQ — Consulting sector", items: [{ question: "How do you guarantee client data confidentiality?", answer: "Every laptop is individually processed with NIST 800-88 Purge erasure and sealed chain of custody. Professional secrecy is guaranteed by our R2v3 certification and annually audited security protocols." }, { question: "Can you collect from remote-working consultants?", answer: "Yes. We offer a home collection service with prepaid secure envelope and delivery tracking." }, { question: "What is the certificate turnaround?", answer: "Individual certificates within 24 hours of receipt. Contractually guaranteed 48h SLA with penalties for overrun." }, { question: "Do you handle Apple Silicon MacBooks?", answer: "Yes. We master M1/M2/M3/M4 Mac erasure with MDM deactivation, Apple Secure Erase and individual certificate. Apple refurbished pricing integrated." }] },
    cta: { title: "Secure your clients' data", subtitle: "Free consulting audit within 48 hours — our experts size your consultant ITAD programme.", button: "Request a consulting audit", secondaryButton: "View the Big Four case" }
  },
  pharma: {
    hero: { title: "ITAD for Pharmaceutical Industry", subtitle: "R&D laboratories, GxP/Annex 11, clinical trial data — total regulatory compliance", kpis: [{ value: "GxP", label: "Annex 11 compliant" }, { value: "100%", label: "R&D traceability" }, { value: "21CFR", label: "Part 11 ready" }] },
    profile: { title: "Pharmaceutical sector profile", narrative: "The pharmaceutical industry operates R&D laboratories, production sites and clinical trial centres with among the strictest regulatory requirements in the world. GMP Annex 11 and FDA 21 CFR Part 11 govern computerised system management, including decommissioning. Clinical trial, pharmacovigilance and IP data are protected strategic assets.", highlights: ["GxP validated systems subject to GMP Annex 11 and 21 CFR Part 11", "Ultra-sensitive clinical trial and pharmacovigilance data", "R&D intellectual property (molecules, processes, formulations)", "Regulatory audit with enhanced traceability requirements"] },
    pains: { title: "Your priority pain points", items: [{ title: "GxP Annex 11 compliance", description: "GxP computerised systems must be decommissioned per validated procedure with GMP-compliant erasure proof." }, { title: "Clinical trial data", description: "Patient data, trial results and protocols are subject to regulated retention and destruction obligations." }, { title: "R&D intellectual property", description: "Research data (molecules, processes, formulations) represent billions in investment to protect." }, { title: "Regulatory audit", description: "Regulatory inspections require a complete audit trail including computerised system decommissioning proofs." }, { title: "Long retention periods", description: "Some pharmaceutical data must be retained 15-30 years. Decommissioning must respect these periods." }] },
    useCases: { title: "Priority use cases", items: [{ title: "LIMS laboratory decommissioning", description: "Validated retirement of 12 LIMS systems and 180 lab workstations with Annex 11-compliant erasure and data archiving.", result: "100% GMP compliant, audit trail validated" }, { title: "Clinical trials migration", description: "Secure erasure of 340 workstations and servers containing phase I-III clinical trial data after retention verification.", result: "0 premature data destruction, FDA-ready" }, { title: "R&D site renewal", description: "Decommissioning of 520 computing stations and 80 simulation servers containing molecular IP.", result: "IP protected, €1.2M value recovered" }, { title: "Regulatory inspection prep", description: "Accelerated ITAD audit trail compliance before regulatory inspection covering 2 years of decommissioning.", result: "Inspection passed without major observation" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "1.2", suffix: "M€", label: "value recovered (R&D site)" }, { value: "100", suffix: "%", label: "GxP Annex 11 compliance" }, { value: "0", suffix: "", label: "major regulatory observations" }, { value: "15-30", suffix: "yrs", label: "retention managed" }], details: "For an R&D site of 520 workstations and 80 servers, GTC recovers €1.2M while guaranteeing GxP compliance, retention period adherence and IP protection." },
    personas: { title: "Key decision-makers", items: [{ role: "Pharma CIO", concern: "GxP validated system decommissioning", ctaAngle: "Validated Annex 11 protocol with audit trail" }, { role: "QA Manager", concern: "GMP compliance and regulatory inspection", ctaAngle: "GxP decommissioning qualification file" }, { role: "CISO / DPO", concern: "Clinical trial data protection", ctaAngle: "Certified erasure + retention period verification" }, { role: "R&D Director", concern: "Intellectual property protection", ctaAngle: "Enhanced chain of custody for IP data" }] },
    arguments: { title: "Why choose GTC for pharma", items: [{ title: "Validated Annex 11 protocol", description: "Validated decommissioning procedure compliant with GMP Annex 11 with complete qualification documentation." }, { title: "Retention period management", description: "Automatic retention period verification before any destruction, preventing premature data loss." }, { title: "Regulatory audit export", description: "Formatted restitution for regulatory inspections with complete audit trail and verifiable evidence." }, { title: "Enhanced IP protection", description: "Enhanced chain of custody for IP-containing assets with multi-pass erasure and physical destruction." }] },
    objections: { title: "FAQ — Pharmaceutical sector", items: [{ question: "Is your procedure GMP Annex 11 compliant?", answer: "Yes. Our decommissioning procedure is validated per EU GMP Annex 11. We provide the complete qualification file (IQ/OQ/PQ) and validation documentation." }, { question: "How do you verify retention periods before destruction?", answer: "Our retention module automatically checks applicable periods (15-30 years depending on data type) before authorising destruction." }, { question: "Do you provide regulatory inspection documents?", answer: "Yes. Our regulatory export includes the complete audit trail, destruction certificates, procedure validation file and compliance evidence." }, { question: "Do you handle LIMS and pharmaceutical SCADA?", answer: "Yes. Our protocols cover LIMS, ELN, production SCADA, MES systems and laboratory workstations with equipment-specific GxP erasure." }] },
    cta: { title: "Guaranteed pharmaceutical ITAD compliance", subtitle: "Free pharma audit within 48 hours — our GxP experts assess your fleet and Annex 11 obligations.", button: "Request a pharma audit", secondaryButton: "View the R&D lab case" }
  },
  btp: {
    hero: { title: "ITAD for Construction", subtitle: "Distributed sites, equipment mobility, project data security", kpis: [{ value: "Multi-site", label: "national coverage" }, { value: "48h", label: "field intervention" }, { value: "100%", label: "WEEE traceability" }] },
    profile: { title: "Construction sector profile", narrative: "The construction sector operates distributed sites across the territory with mobile IT equipment (site tablets, rugged PCs, BIM computing stations) and project management systems containing sensitive data (plans, tenders, financial data). Equipment mobility, site conditions and multiple locations make ITAD management complex.", highlights: ["Rugged mobile equipment exposed to site conditions", "Sensitive project data (BIM models, tenders, costs)", "Multiple simultaneous sites with rotating equipment", "WEEE and circular economy obligations"] },
    pains: { title: "Your priority pain points", items: [{ title: "Distributed sites", description: "Equipment is spread across dozens of simultaneous sites with frequent rotation, making inventory and collection complex." }, { title: "Sensitive project data", description: "BIM models, digital mockups, tenders and financial data are strategic assets to protect." }, { title: "Worn rugged equipment", description: "Site tablets and PCs endure harsh conditions reducing their resale value." }, { title: "Construction WEEE compliance", description: "Anti-waste legislation imposes specific traceability for construction WEEE with mandatory reuse." }, { title: "Dispersed budget", description: "IT budgets are spread across projects and sites, making consolidation and optimisation difficult." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Major project completion", description: "Collection and processing of 180 site tablets, 45 rugged PCs and 12 BIM stations at the end of a 3-year project.", result: "100% project data erased, 62% reused" }, { title: "HQ fleet renewal", description: "Decommissioning of 640 workstations and 80 servers from a construction group HQ with tender data erasure.", result: "€412/device recovered, WEEE compliant" }, { title: "Multi-site equipment rotation", description: "Recurring collection circuit for rotating equipment across 35 active sites.", result: "Logistics cost -45%, 100% traceability" }, { title: "Group WEEE audit", description: "Consolidated WEEE reporting for a 12-subsidiary construction group with per-site and per-subsidiary traceability.", result: "Consolidated WEEE report, 0 audit reservations" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "412", suffix: "€", label: "value recovered per device" }, { value: "45", suffix: "%", label: "logistics cost reduction" }, { value: "62", suffix: "%", label: "site equipment reuse rate" }, { value: "100", suffix: "%", label: "WEEE traceability" }], details: "For a construction group with 640 HQ devices and 35 sites, GTC reduces logistics costs by 45% and recovers €412 per device with consolidated WEEE reporting." },
    personas: { title: "Key decision-makers", items: [{ role: "Group CIO", concern: "Multi-site mobile fleet management", ctaAngle: "Platform with per-site tracking and rotation" }, { role: "Project Director", concern: "Project and BIM data protection", ctaAngle: "Certified end-of-project erasure" }, { role: "CFO", concern: "Multi-subsidiary budget consolidation", ctaAngle: "Financial reporting per site, subsidiary, group" }, { role: "CSR Director", concern: "WEEE and circular economy", ctaAngle: "WEEE module compliant with legislation" }] },
    arguments: { title: "Why choose GTC for construction", items: [{ title: "Site field collection", description: "Mobile teams for direct on-site collection with adapted vehicles and secure packaging." }, { title: "Rotation management", description: "Equipment rotation tracking module between sites with end-of-life alerts and collection planning." }, { title: "Rugged equipment erasure", description: "Protocols adapted for rugged tablets and PCs with specific firmware erasure." }, { title: "Multi-subsidiary WEEE reporting", description: "WEEE reporting consolidation per site, subsidiary and group." }] },
    objections: { title: "FAQ — Construction sector", items: [{ question: "Can you collect directly on site?", answer: "Yes. Our mobile teams operate on-site with adapted vehicles for secure packaging and transport to our processing centres." }, { question: "How do you handle damaged rugged equipment?", answer: "Damaged equipment is individually assessed. Erasure if the device is functional, otherwise certified physical destruction. Resale value is adjusted based on condition." }, { question: "Can you consolidate 12 subsidiaries?", answer: "Yes. Our platform manages multi-subsidiary with group-level consolidated reporting. Each subsidiary has its own space with visibility on its sites." }, { question: "What is the site intervention time?", answer: "48 business hours in major cities, 5 business days elsewhere. Express mode available for urgent project completions." }] },
    cta: { title: "Secure your project data", subtitle: "Free construction audit within 48 hours — our experts size your multi-site ITAD programme.", button: "Request a construction audit", secondaryButton: "View the major project case" }
  },
  horeca: {
    hero: { title: "ITAD for Hospitality & Food Service", subtitle: "POS, distributed sites, loyalty data — manage your multi-site equipment", kpis: [{ value: "Multi-site", label: "hotels & restaurants" }, { value: "PCI-DSS", label: "compliant" }, { value: "89%", label: "reuse achieved" }] },
    profile: { title: "Hospitality sector profile", narrative: "The hospitality sector operates hundreds of establishments with POS systems, reservation kiosks, hotel management systems (PMS) and loyalty equipment containing sensitive customer data. Hotel chains and restaurant groups regularly renew their fleets with seasonality and service continuity constraints.", highlights: ["POS and PMS systems with payment and customer data", "Fleets distributed across hundreds of establishments", "Strong seasonality impacting renewal windows", "Loyalty programmes with GDPR personal data"] },
    pains: { title: "Your priority pain points", items: [{ title: "POS and payment data", description: "POS systems and payment terminals contain card data subject to PCI-DSS and GDPR transactional data." }, { title: "Hotel PMS systems", description: "Hotel management systems contain reservation data, passports, credit cards and customer preferences." }, { title: "Seasonal distributed fleets", description: "Renewals must be planned in low season to minimise impact on operations." }, { title: "GDPR loyalty data", description: "Loyalty programmes accumulate personal data (habits, preferences, history) subject to GDPR." }, { title: "Franchisees and independents", description: "Hotel and restaurant groups include franchisees and independents with heterogeneous fleets." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Restaurant chain POS renewal", description: "Replacement of 1,800 POS systems across 320 restaurants during winter low season.", result: "0 service disruption, PCI-DSS compliant" }, { title: "Hotel chain PMS migration", description: "Decommissioning of 450 PMS servers and 2,200 reception workstations during cloud PMS migration.", result: "Customer data erased, 78% reused" }, { title: "Check-in kiosk renewal", description: "Removal and recycling of 680 automated check-in kiosks containing passport and credit card data.", result: "Certified destruction, GDPR compliant" }, { title: "Hotel group WEEE consolidation", description: "Consolidated WEEE reporting for a group of 85 hotels and 120 restaurants across 4 countries.", result: "CSRD ESRS E5 report delivered, 0 reservations" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "89", suffix: "%", label: "reuse rate" }, { value: "0", suffix: "", label: "service disruption" }, { value: "78", suffix: "%", label: "PMS/workstation reuse" }, { value: "100", suffix: "%", label: "PCI-DSS compliance" }], details: "For a 320-restaurant chain, POS renewal via GTC guarantees zero service disruption, 89% reuse and full PCI-DSS compliance." },
    personas: { title: "Key decision-makers", items: [{ role: "Hotel Group CIO", concern: "PMS migration and multi-site renewal", ctaAngle: "Deployment plan by region, by season" }, { role: "CISO", concern: "PCI-DSS and hotel customer data", ctaAngle: "Certified POS/PMS erasure + destruction" }, { role: "Operations Director", concern: "Service continuity during replacement", ctaAngle: "Low-season, off-peak intervention" }, { role: "CSR Director", concern: "CSRD and hospitality circular economy", ctaAngle: "Multi-country ESRS E5 reporting" }] },
    arguments: { title: "Why choose GTC for hospitality", items: [{ title: "Seasonal planning", description: "Low-season intervention to minimise impact on operations. Coordinated planning with establishment managers." }, { title: "POS/PMS expertise", description: "Specific protocols for POS systems (Micros, Lightspeed) and hotel PMS (Opera, Protel)." }, { title: "Multi-country multi-franchise", description: "International group management with franchisees and independents, consolidated multi-country reporting." }, { title: "Establishment WakiBox", description: "Compact collection kiosk for end-of-life small equipment, adapted to hospitality space constraints." }] },
    objections: { title: "FAQ — Hospitality sector", items: [{ question: "Can you operate without disrupting service?", answer: "Yes. We operate in low season and outside service hours. For 24/7 establishments, we plan coordinated maintenance windows." }, { question: "Do you handle hotel PMS systems (Opera, Protel)?", answer: "Yes. Our protocols cover major hotel PMS: Oracle Opera, Protel, Mews, Cloudbeds. GDPR and PCI-DSS compliant erasure." }, { question: "How do you handle independent franchisees?", answer: "Each franchisee has their own platform space. The group can consolidate data while respecting each establishment's management autonomy." }, { question: "What timeline for 300+ establishments?", answer: "We deploy in waves of 30-50 establishments per week. A 300-establishment group is processed in 6-10 weeks." }] },
    cta: { title: "Manage your hospitality ITAD", subtitle: "Free hospitality audit within 48 hours — our experts size your multi-establishment programme.", button: "Request a hospitality audit", secondaryButton: "View the hotel chain case" }
  },
  education: {
    hero: { title: "ITAD for Education & Research", subtitle: "Minor GDPR, student fleets, WEEE funding — refurbish and redistribute", kpis: [{ value: "GDPR", label: "minors protected" }, { value: "89%", label: "charity reuse" }, { value: "WEEE", label: "funding mobilised" }] },
    profile: { title: "Education sector profile", narrative: "The education sector (schools, colleges, universities, research organisations) manages substantial IT fleets with specific constraints: enhanced GDPR for minors' data, limited budgets, mandatory reuse, and WEEE eco-organisation funding. Student fleets are renewed in waves tied to academic calendars.", highlights: ["Fleets of 500 to 15,000 devices per institution or group", "Enhanced GDPR for minor student data", "Renewal calendar tied to school holidays", "Possible WEEE eco-organisation funding"] },
    pains: { title: "Your priority pain points", items: [{ title: "Minor GDPR", description: "Minor student data benefits from enhanced GDPR protection (art. 8). Erasure must be irreversible and certified." }, { title: "Limited budget", description: "Educational institutions have constrained IT budgets and must maximise end-of-life equipment value." }, { title: "WEEE funding", description: "Eco-organisations offer funding for educational WEEE collection and recycling." }, { title: "Academic calendar", description: "Renewals must be completed during school holidays to avoid disrupting classes." }, { title: "Reuse and donation", description: "Legislation and educational mission encourage reuse through charity and donation to associations." }] },
    useCases: { title: "Priority use cases", items: [{ title: "University fleet renewal", description: "Decommissioning of 3,200 student workstations and 120 research servers during summer break with charity redistribution.", result: "89% reuse, 4,500 charity donations, 480 tCO₂e avoided" }, { title: "Primary-secondary school group", description: "Replacement of 850 tablets and 120 PCs across 8 schools and 2 colleges with certified minor GDPR erasure.", result: "100% GDPR compliant, WEEE funding mobilised" }, { title: "Research laboratory", description: "Decommissioning of 180 computing stations and 40 research servers with scientific data protection.", result: "IP protected, €1.1M value recovered" }, { title: "Regional education authority", description: "Pooled ITAD programme for 45 institutions with consolidated reporting and WEEE funding.", result: "Unit cost -40%, regional WEEE report" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "4,500", suffix: "+", label: "charity donations made" }, { value: "40", suffix: "%", label: "unit cost reduction (pooling)" }, { value: "480", suffix: "t", label: "CO₂e avoided" }, { value: "89", suffix: "%", label: "reuse rate" }], details: "For a 45-institution education authority, pooling via GTC reduces costs by 40% and generates 4,500 charity donations with WEEE funding and consolidated reporting." },
    personas: { title: "Key decision-makers", items: [{ role: "Education CIO", concern: "Student fleet and academic calendar", ctaAngle: "School holiday planning + field collection" }, { role: "DPO", concern: "Minor GDPR and student data", ctaAngle: "Certified GDPR art. 8 erasure + certificates" }, { role: "Finance Manager", concern: "Limited budget and WEEE funding", ctaAngle: "Integrated eco-organisation funding file" }, { role: "University President", concern: "CSR commitment and circular economy", ctaAngle: "Charity channel + carbon footprint communications" }] },
    arguments: { title: "Why choose GTC for education", items: [{ title: "Academic calendar planning", description: "Intervention exclusively during school and university holidays for zero classroom disruption." }, { title: "Certified minor GDPR", description: "Enhanced erasure protocol for minor student data, GDPR art. 8 compliant with individual certificate." }, { title: "Integrated WEEE funding", description: "Eco-organisation funding application included in our service." }, { title: "Academic pooling", description: "Institution group management with consolidated reporting and pooled costs." }] },
    objections: { title: "FAQ — Education sector", items: [{ question: "Can you intervene during school holidays only?", answer: "Yes. That is our standard operating mode for education. We plan each intervention during holidays based on your priorities." }, { question: "How does WEEE funding work?", answer: "We prepare the funding application with eco-organisations for you. The funding covers part of collection and recycling costs, directly deducted from our invoice." }, { question: "Do you handle school tablets (iPad, Chromebook)?", answer: "Yes. We process iPad, Chromebook, Android tablets and school laptops. MDM erasure, certified factory reset and recycling or reuse." }, { question: "Can you pool multiple institutions?", answer: "Yes. Our platform manages institution groups with consolidated reporting. Pooling reduces unit costs by 30-40% compared to individual processing." }] },
    cta: { title: "Refurbish your educational fleet", subtitle: "Free education audit within 48 hours — our experts size your programme with WEEE funding.", button: "Request an education audit", secondaryButton: "View the university charity case" }
  },
  agroalimentaire: {
    hero: { title: "ITAD for Food & Beverage Industry", subtitle: "Factory IT/OT, traceability, distributed production — manage your assets end-to-end", kpis: [{ value: "IT+OT", label: "factories covered" }, { value: "IFS/BRC", label: "compatible" }, { value: "CSRD", label: "reporting integrated" }] },
    profile: { title: "Food & beverage sector profile", narrative: "The food and beverage industry operates production plants with IT/OT systems (line PLCs, SCADA, MES, ERP) and standard IT fleets. IFS/BRC certifications and food traceability requirements impose rigorous computerised system management. Distributed production sites generate significant ITAD flows with food safety and hygiene constraints.", highlights: ["MES and SCADA production line systems", "IFS/BRC food traceability on computerised systems", "Distributed production sites (plants, warehouses, platforms)", "CSRD scope 3 IT obligation for listed groups"] },
    pains: { title: "Your priority pain points", items: [{ title: "Production plant IT/OT", description: "Line PLCs, MES and SCADA systems contain production data, recipes and sensitive process parameters." }, { title: "IFS/BRC traceability", description: "IFS and BRC certifications require traceability of computerised systems, including their decommissioning." }, { title: "Distributed sites", description: "Food groups operate dozens of plants, warehouses and logistics platforms with heterogeneous fleets." }, { title: "Hygiene constraints", description: "Interventions in food production zones are subject to strict hygiene protocols." }, { title: "Commercial data", description: "Trading data, supplier contracts and cost prices are strategic assets to protect." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Packaging line modernisation", description: "Replacement of 120 PLCs and 60 industrial PCs across 3 packaging lines with recipe and parameter erasure.", result: "0 recipe leaks, intervention outside production" }, { title: "Group ERP migration", description: "Decommissioning of 380 workstations and 45 servers during SAP S/4HANA ERP migration.", result: "Data migrated and originals erased, IFS report" }, { title: "Multi-plant consolidation", description: "Pooled ITAD programme for 18 plants with consolidated CSRD reporting.", result: "Cost -38%, CSRD ESRS E5 delivered" }, { title: "Connected warehouse", description: "Removal of 2,400 order-picking terminals and 180 dock kiosks at end-of-life.", result: "95% recycled, data erased" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "38", suffix: "%", label: "multi-plant cost reduction" }, { value: "95", suffix: "%", label: "material recycling rate" }, { value: "0", suffix: "", label: "recipe/IP leaks" }, { value: "100", suffix: "%", label: "IFS/BRC compliance" }], details: "For an 18-plant group, pooling via GTC reduces costs by 38% and guarantees IFS/BRC compliance with consolidated CSRD ESRS E5 reporting." },
    personas: { title: "Key decision-makers", items: [{ role: "Group CIO", concern: "Multi-plant IT/OT and ERP migration", ctaAngle: "Unified IT+OT platform + migration plan" }, { role: "Quality Director", concern: "IFS/BRC computerised system compliance", ctaAngle: "IFS/BRC compliant audit trail" }, { role: "Plant Director", concern: "Production continuity and hygiene", ctaAngle: "Intervention outside production, hygiene protocol" }, { role: "CSR Director", concern: "CSRD scope 3 and circular economy", ctaAngle: "Carbon module + multi-plant ESRS E5" }] },
    arguments: { title: "Why choose GTC for food & beverage", items: [{ title: "Food IT/OT expertise", description: "Protocols adapted for line PLCs, MES, SCADA and food traceability systems." }, { title: "IFS/BRC compliance", description: "Audit trail compliant with IFS and BRC requirements for computerised system decommissioning." }, { title: "Production zone hygiene protocol", description: "Food production zone intervention with HACCP and hygiene protocol compliance." }, { title: "Multi-plant pooling", description: "Pooled ITAD programme for multi-site groups with consolidated reporting and optimised costs." }] },
    objections: { title: "FAQ — Food & beverage sector", items: [{ question: "Can you operate in food production zones?", answer: "Yes. Our teams comply with HACCP and your site hygiene requirements. We operate in adapted clothing with decontaminated tools." }, { question: "Do you handle production line PLCs?", answer: "Yes. Our protocols cover PLCs (Siemens, Rockwell, Schneider), MES and SCADA systems with recipe, parameter and production data erasure." }, { question: "How do you ensure IFS/BRC compliance?", answer: "Our audit trail is formatted per IFS Food and BRC Food Safety requirements. We provide compliant decommissioning evidence for your certification audits." }, { question: "What CSRD reporting for a multi-plant group?", answer: "CSRD ESRS E5 module with per-plant, per-country and group-consolidated reporting. Emission factors calibrated for food industry equipment." }] },
    cta: { title: "Manage your food industry ITAD", subtitle: "Free food industry audit within 48 hours — our experts size your multi-plant programme.", button: "Request a food industry audit", secondaryButton: "View the food group case" }
  },
  telecom: {
    hero: { title: "ITAD for Telecommunications", subtitle: "Network equipment, CPE/customer boxes, GDPR at scale — manage millions of assets", kpis: [{ value: "Millions", label: "of assets managed" }, { value: "GDPR", label: "at scale" }, { value: "€1.2M", label: "value recovered" }] },
    profile: { title: "Telecommunications sector profile", narrative: "Telecom operators manage millions of devices: customer CPE (boxes, decoders, routers), network equipment (core routers, switches, base stations), and datacentre infrastructure. Volumes are massive, GDPR data at scale (millions of subscribers), and WEEE recycling obligations are substantial. Mobile operators renew their base stations (4G/5G) and fixed operators their CPE at a sustained pace.", highlights: ["Fleets of millions of customer CPE (boxes, decoders, WiFi routers)", "Network equipment (core routers, switches, 4G/5G base stations)", "GDPR data at scale (millions of subscribers)", "Massive WEEE obligation with ambitious recycling targets"] },
    pains: { title: "Your priority pain points", items: [{ title: "Massive CPE volumes", description: "Operators manage millions of customer boxes and decoders to recycle or refurbish, requiring industrial-scale logistics." }, { title: "GDPR at scale", description: "CPE contain configuration data, browsing history and subscriber identifiers to erase for millions of devices." }, { title: "High-value network equipment", description: "Core routers, switches and 4G/5G base stations have significant residual value on the refurbished market." }, { title: "Massive WEEE obligation", description: "Operators face ambitious WEEE recycling targets with detailed eco-organisation reporting." }, { title: "4G to 5G migration", description: "5G deployment generates massive volumes of 4G equipment to decommission within constrained timelines." }] },
    useCases: { title: "Priority use cases", items: [{ title: "Operator CPE refurbishment", description: "Refurbishment programme for 2.4 million boxes and decoders with GDPR erasure and recirculation.", result: "68% refurbished, €1.2M value recovered" }, { title: "4G base station decommissioning", description: "Secure removal of 4,800 4G base stations during 5G deployment with network configuration erasure.", result: "Configs erased, €3.8M market value" }, { title: "Operator datacentre migration", description: "Decommissioning of 6,000 servers and 1,200 switches from an operator datacentre migrating to cloud.", result: "€5.2M recovered, GDPR compliant" }, { title: "Operator WEEE reporting", description: "Consolidated WEEE reporting for a national operator covering CPE, network and datacentre.", result: "WEEE targets met, eco-organisation report validated" }] },
    roi: { title: "Estimated return on investment", kpis: [{ value: "5.2", suffix: "M€", label: "value recovered (datacentre)" }, { value: "68", suffix: "%", label: "CPE refurbishment rate" }, { value: "3.8", suffix: "M€", label: "4G station value" }, { value: "100", suffix: "%", label: "WEEE targets met" }], details: "For a combined programme (datacentre + 4G stations + CPE), GTC recovers over €10M in value and guarantees the operator's WEEE targets are met." },
    personas: { title: "Key decision-makers", items: [{ role: "Operator CIO/CTO", concern: "5G migration and 4G decommissioning", ctaAngle: "Station removal plan by batch and region" }, { role: "DPO", concern: "GDPR for millions of subscribers on CPE", ctaAngle: "Industrial certified NIST 800-88 erasure" }, { role: "Network Director", concern: "Network equipment removal logistics", ctaAngle: "Large-scale logistics + secure transport" }, { role: "CSR Director", concern: "WEEE targets and CSRD scope 3", ctaAngle: "WEEE module + operator Carbon" }] },
    arguments: { title: "Why choose GTC for telecoms", items: [{ title: "Industrial capacity", description: "Processing infrastructure capable of handling millions of assets per year (CPE, network equipment, servers)." }, { title: "Industrial GDPR erasure", description: "Automated NIST 800-88 erasure chain for large-scale CPE with per-batch or per-unit certificate." }, { title: "Network EMEA pricing", description: "Asset Intelligence module with specialised network and telecom equipment pricing (Cisco, Nokia, Ericsson, Huawei)." }, { title: "Operator WEEE module", description: "WEEE reporting calibrated for operator volumes with eco-organisation compliant exports." }] },
    objections: { title: "FAQ — Telecommunications sector", items: [{ question: "What CPE processing capacity?", answer: "Our infrastructure processes up to 5 million CPE per year. The automated NIST 800-88 erasure chain handles 2,000 units per day per site." }, { question: "How do you handle 4G/5G base stations?", answer: "Our teams operate on-site for station dismantling. Network configurations and keys are erased, then equipment is transported in secure convoys to our processing centres." }, { question: "What WEEE reporting for operator volumes?", answer: "Our WEEE module is calibrated for operator volumes (millions of units). Reporting by equipment type, region and eco-organisation. Compliant with annual declarations." }, { question: "Do you price network equipment (Cisco, Nokia)?", answer: "Yes. Our Asset Intelligence module covers major vendor network equipment: Cisco, Nokia, Ericsson, Huawei, Juniper. Real-time EMEA refurbished market pricing." }] },
    cta: { title: "Manage your telecom ITAD at scale", subtitle: "Free telecom audit within 48 hours — our experts size your CPE, network and datacentre programme.", button: "Request a telecom audit", secondaryButton: "View the operator datacentre case" }
  },
  index: {
    hero: {
      title: "Our ITAD sector expertise",
      subtitle: "16 sectors served — each vertical has its regulators, lifecycles and chain-of-custody constraints.",
      kpis: [
        { value: "16", label: "sectors served" },
        { value: "12+", label: "years of experience" },
        { value: "280+", label: "clients supported" }
      ]
    },
    intro: "GreenTechCycle has developed deep sector expertise supporting over 280 organisations across 16 industries. Each sector has its own regulators, hardware lifecycles and chain-of-custody constraints. Explore our sector approach and identify the issues specific to your industry.",
    mediaGtcTitle: "GTC Media — TF1, our flagship reference",
    mediaGtcSubtitle: "The TF1 Group trusts GreenTechCycle for their complete ITAD cycle: audit, erasure, recovery and CSRD reporting.",
    mediaGtcCta: "Discover the TF1 partnership",
    ctaTitle: "Your sector is covered",
    ctaSubtitle: "16 sectors, one platform. Request a free sector audit within 48 hours — our consultants return with an action plan tailored to your regulatory constraints.",
    ctaButton: "Request a sector audit",
    ctaSecondary: "Book a Waki Box pilot",
    discover: "Discover"
  },
  common: {
    context: "Context",
    regulations: "Regulations",
    challenges: "Challenges",
    solution: "Our response",
    stakeholders: "Stakeholders",
    scenarioLabel: "Scenario",
    solutionLabel: "With GreenTechCycle",
    otherSectors: "Explore other sectors",
    backToUseCases: "View use cases"
  }
};

// ─── Remap keys to match sectors.ts slugs ───
const keyMap = {
  banque: "finance",
  transport: "transport-logistique",
  medias: "medias-audiovisuel",
  pharma: "pharma-biotech",
  education: "education-recherche",
};

function remapKeys(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[keyMap[k] || k] = v;
  }
  return out;
}

// ─── Patch both JSON files ───
function patchJson(filePath, newSectors) {
  const raw = readFileSync(filePath, "utf-8");
  const data = JSON.parse(raw);
  data.Sectors = remapKeys(newSectors);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
  console.log(`✓ Patched ${filePath} — Sectors key updated with ${Object.keys(data.Sectors).length} entries`);
}

patchJson(join(root, "messages/fr.json"), sectorsFr);
patchJson(join(root, "messages/en.json"), sectorsEn);

console.log("Done.");
