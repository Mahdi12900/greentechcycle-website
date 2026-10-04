/**
 * GreenTechCycle Lab — contenu de la page /lab (2026-10-04).
 *
 * Source : « Green Tech Cycle Lab — Manuel maître professionnel » v1.0 (oct. 2026), texte extrait
 * dans reports/lab-manuel/, et la revue reports/revue-gtc-lab-manuel.md (§5 + « À ne pas faire »).
 * La page de référence est indiquée en commentaire (p. N) pour chaque bloc.
 *
 * Règles de publication (décision du 2026-10-04) :
 *  - tout ce qui concerne le Lab est au futur ou « en recherche » : aucune brique n'est
 *    présentée comme une fonctionnalité livrée de la plateforme ;
 *  - aucun niveau de maturité (P0–P5) revendiqué, aucune date inventée ;
 *  - aucune certification revendiquée ; pas de chiffres externes non revérifiés
 *    (NIST Rev. 2, AI Act) ; pas de mention d'outils de calcul gratuits ni de l'organisation interne.
 */

type L = { fr: string; en: string };

/** p. 3 — Mission */
export const LAB_MISSION: L = {
  fr: "Concevoir, expérimenter, documenter et transférer des technologies de confiance pour sécuriser, tracer, prolonger, valoriser et mettre en conformité le cycle de vie des actifs numériques.",
  en: "Design, test, document and transfer trusted technologies that secure, trace, extend, recover value from and bring into compliance the lifecycle of digital assets.",
};

/** p. 3 — Domaines à l'intersection desquels le Lab travaillera */
export const LAB_DOMAINS: L[] = [
  { fr: "Cybersécurité", en: "Cybersecurity" },
  { fr: "IT Asset Management", en: "IT Asset Management" },
  { fr: "IT Asset Disposition", en: "IT Asset Disposition" },
  { fr: "Économie circulaire numérique", en: "Circular digital economy" },
  { fr: "Mesure carbone", en: "Carbon measurement" },
  { fr: "Gouvernance de l'IA", en: "AI governance" },
];

/** p. 3 — Vision : des briques cohérentes plutôt qu'un produit isolé (objectifs de recherche) */
export const LAB_BRICKS: L[] = [
  { fr: "Une représentation fiable des actifs", en: "A reliable representation of assets" },
  { fr: "Un moteur de risque lié au cycle de vie", en: "A lifecycle-aware risk engine" },
  { fr: "Une capacité d'assainissement documentée", en: "A documented sanitisation capability" },
  { fr: "Une chaîne de preuve vérifiable", en: "A verifiable chain of proof" },
  { fr: "Une évaluation de valeur résiduelle", en: "A residual-value assessment" },
  { fr: "Une mesure carbone transparente", en: "Transparent carbon measurement" },
  { fr: "Un graphe de conformité", en: "A compliance graph" },
];

/** p. 3 — Lignes rouges */
export const LAB_RED_LINES: L[] = [
  {
    fr: "Aucun code de recherche ne sera déployé automatiquement chez un client.",
    en: "No research code will ever be deployed automatically at a client.",
  },
  {
    fr: "Aucune donnée client identifiante ne sera traitée sans base légale, minimisation, autorisation et contrôles adaptés.",
    en: "No identifying client data will be processed without a legal basis, minimisation, authorisation and appropriate controls.",
  },
  {
    fr: "Aucun agent IA ne déclenchera seul une action destructive, une dépense substantielle, une publication, une promesse contractuelle ou une mise en production.",
    en: "No AI agent will, on its own, trigger a destructive action, a substantial expense, a publication, a contractual commitment or a production release.",
  },
  {
    fr: "Aucune capacité d'assainissement ne sera présentée comme une garantie universelle sans périmètre de test, protocole et preuve adaptés.",
    en: "No sanitisation capability will be presented as a universal guarantee without a defined test scope, protocol and matching proof.",
  },
];

/** p. 6 — Les cinq dimensions de la preuve */
export const LAB_PROOF_DIMENSIONS: { key: string; name: L; question: L; artefact: L }[] = [
  {
    key: "identity",
    name: { fr: "Identité", en: "Identity" },
    question: { fr: "Quel support a été traité ?", en: "Which medium was processed?" },
    artefact: { fr: "Inventaire, numéro de série, capacité, modèle", en: "Inventory, serial number, capacity, model" },
  },
  {
    key: "decision",
    name: { fr: "Décision", en: "Decision" },
    question: { fr: "Pourquoi cette méthode ?", en: "Why this method?" },
    artefact: { fr: "Matrice de compatibilité, règles", en: "Compatibility matrix, rules" },
  },
  {
    key: "execution",
    name: { fr: "Exécution", en: "Execution" },
    question: { fr: "Qu'est-ce qui a été fait ?", en: "What was done?" },
    artefact: { fr: "Journal d'événements horodaté", en: "Timestamped event log" },
  },
  {
    key: "verification",
    name: { fr: "Vérification", en: "Verification" },
    question: { fr: "Que constate-t-on ensuite ?", en: "What do we observe afterwards?" },
    artefact: { fr: "Résultats de contrôle, anomalies", en: "Check results, anomalies" },
  },
  {
    key: "integrity",
    name: { fr: "Intégrité", en: "Integrity" },
    question: { fr: "Le rapport a-t-il été modifié ?", en: "Has the report been altered?" },
    artefact: { fr: "Empreinte, signature, vérificateur", en: "Hash, signature, verifier" },
  },
];

/** p. 6 — Politique de refus : conditions de refus ou de dégradation du niveau de confiance */
export const LAB_REFUSAL_CASES: { code: string; label: L }[] = [
  { code: "unknown_medium", label: { fr: "Le support est inconnu", en: "The medium is unknown" } },
  { code: "firmware_out_of_scope", label: { fr: "Son firmware est hors périmètre", en: "Its firmware is out of scope" } },
  { code: "method_unavailable", label: { fr: "La méthode est indisponible", en: "The method is unavailable" } },
  { code: "signature_failed", label: { fr: "La signature ne peut pas être générée", en: "The signature cannot be generated" } },
  { code: "log_incomplete", label: { fr: "Un journal est incomplet", en: "A log is incomplete" } },
  { code: "critical_error", label: { fr: "Une erreur critique survient", en: "A critical error occurs" } },
];

/** p. 7 — Classification D0–D4 (simplifiée) */
export const LAB_DATA_LEVELS: { level: string; name: L; handling: L; strict?: boolean }[] = [
  { level: "D0", name: { fr: "Public", en: "Public" }, handling: { fr: "Local ou cloud", en: "Local or cloud" } },
  { level: "D1", name: { fr: "Interne", en: "Internal" }, handling: { fr: "Local chiffré, dépôt privé", en: "Encrypted local, private repository" } },
  { level: "D2", name: { fr: "Confidentiel", en: "Confidential" }, handling: { fr: "Local ; cloud sur approbation", en: "Local; cloud only on approval" } },
  { level: "D3", name: { fr: "Sensible", en: "Sensitive" }, handling: { fr: "Local en priorité ; cloud contrôlé", en: "Local first; controlled cloud" } },
  {
    level: "D4",
    name: { fr: "Critique", en: "Critical" },
    handling: { fr: "Local chiffré, coffre-fort ; aucun LLM externe", en: "Encrypted local vault; no external LLM" },
    strict: true,
  },
];

/** p. 9 — Pipeline de données obligatoire */
export const LAB_PIPELINE: L[] = [
  { fr: "Collecte", en: "Collection" },
  { fr: "Classification", en: "Classification" },
  { fr: "Minimisation", en: "Minimisation" },
  { fr: "Pseudonymisation", en: "Pseudonymisation" },
  { fr: "Validation humaine", en: "Human sign-off" },
  { fr: "Traitement", en: "Processing" },
  { fr: "Signature", en: "Signature" },
  { fr: "Archivage", en: "Archiving" },
  { fr: "Purge", en: "Purge" },
];

/** p. 7 + p. 9 — Principes d'architecture hybride contrôlée */
export const LAB_HYBRID_PRINCIPLES: L[] = [
  { fr: "Les clés de signature et les données sensibles restent en local.", en: "Signing keys and sensitive data stay local." },
  { fr: "Le cloud n'est qu'un accélérateur temporaire, jamais une décision implicite d'un agent IA.", en: "The cloud is only a temporary accelerator, never an implicit decision by an AI agent." },
  { fr: "Le banc d'essai matériel est isolé du réseau par défaut.", en: "The hardware test bench is isolated from the network by default." },
  { fr: "MFA sur tous les services externes, sauvegardes avec restauration testée.", en: "MFA on every external service, backups with tested restores." },
];

/** p. 11 — Gouvernance IA : 5 règles « humain dans la boucle » */
export const LAB_AI_RULES: { title: L; body: L }[] = [
  {
    title: { fr: "Double confirmation humaine", en: "Two-person confirmation" },
    body: {
      fr: "Aucune commande destructive ne pourra être exécutée par un agent sans double confirmation humaine.",
      en: "No destructive command can be executed by an agent without confirmation by two humans.",
    },
  },
  {
    title: { fr: "Validation humaine des actes engageants", en: "Human sign-off on binding actions" },
    body: {
      fr: "Données personnelles, publication, brevet, contrat : la décision reste humaine.",
      en: "Personal data, publication, patents, contracts: the decision stays human.",
    },
  },
  {
    title: { fr: "Bac à sable et revue avant fusion", en: "Sandbox and review before merge" },
    body: {
      fr: "Le code produit par un agent sera généré en bac à sable et relu avant toute fusion.",
      en: "Agent-generated code will be produced in a sandbox and reviewed before any merge.",
    },
  },
  {
    title: { fr: "Traçabilité de chaque exécution", en: "Every run traced" },
    body: {
      fr: "Tâche, agent, modèle, version, prompt hashé, données, coût, résultat et décision humaine seront enregistrés. Les prompts seront versionnés comme du code.",
      en: "Task, agent, model, version, hashed prompt, data, cost, result and human decision will be recorded. Prompts will be versioned like code.",
    },
  },
  {
    title: { fr: "Model Cards et Prompt Cards", en: "Model Cards and Prompt Cards" },
    body: {
      fr: "Chaque modèle et chaque prompt aura sa fiche : usage, limites, licence, biais, responsable et date de revue.",
      en: "Every model and every prompt will have its card: use, limits, licence, bias, owner and review date.",
    },
  },
];

/** p. 12–14 — Programmes de R&D (tous « en recherche ») */
export const LAB_PROGRAMMES: { id: string; name: L; summary: L }[] = [
  {
    id: "GTCL-01",
    name: { fr: "Assainissement des supports", en: "Media sanitisation" },
    summary: {
      fr: "Une brique de décision et de preuve pour l'assainissement : inventaire non destructif, classification HDD / SSD SATA / NVMe, mode simulation, journal en ajout seul, rapport signé. Sans prétention de garantie universelle.",
      en: "A decision-and-proof building block for sanitisation: non-destructive inventory, HDD / SATA SSD / NVMe classification, simulation mode, append-only log, signed report. No claim of a universal guarantee.",
    },
  },
  {
    id: "GTCL-02",
    name: { fr: "Preuve et certificat", en: "Proof and certificate" },
    summary: {
      fr: "Rechercher comment un certificat pourra être vérifié de façon indépendante : chaîne de conservation, résistance à la modification, signature et clé publique.",
      en: "Research how a certificate could be verified independently: chain of custody, tamper resistance, signature and public key.",
    },
  },
  {
    id: "GTCL-03",
    name: { fr: "Asset Intelligence", en: "Asset Intelligence" },
    summary: {
      fr: "Un graphe d'actifs capable de rapprocher des inventaires hétérogènes : normalisation, règles d'identité, score de confiance, audit des décisions de fusion.",
      en: "An asset graph able to reconcile heterogeneous inventories: normalisation, identity rules, confidence scoring, audit of merge decisions.",
    },
  },
  {
    id: "GTCL-04",
    name: { fr: "Valeur résiduelle", en: "Residual value" },
    summary: {
      fr: "Étudier l'estimation de la valeur future d'un actif, avec intervalle d'incertitude et facteurs explicatifs. Jamais une décision financière automatique.",
      en: "Study how to estimate an asset's future value, with an uncertainty range and explanatory factors. Never an automatic financial decision.",
    },
  },
  {
    id: "GTCL-05",
    name: { fr: "Carbone circulaire", en: "Circular carbon" },
    summary: {
      fr: "Des scénarios documentés de conservation, réemploi, reconditionnement et fin de vie, qui distinguent données mesurées, déclarées, estimées et de référence, avec leur incertitude.",
      en: "Documented scenarios for keeping, reusing, refurbishing and retiring assets, separating measured, declared, estimated and reference data, with their uncertainty.",
    },
  },
  {
    id: "GTCL-06",
    name: { fr: "Green-Scheduling", en: "Green-Scheduling" },
    summary: {
      fr: "Planifier les tâches non critiques selon coût, intensité carbone, délai et sécurité, de façon explicable. Une tâche critique ne sera jamais déplacée automatiquement.",
      en: "Schedule non-critical jobs by cost, carbon intensity, lead time and security, in an explainable way. A critical job will never be moved automatically.",
    },
  },
  {
    id: "GTCL-07",
    name: { fr: "Dé-identification", en: "De-identification" },
    summary: {
      fr: "Réduire l'exposition des données avant tout traitement externe, et refuser la sortie vers le cloud quand le niveau de confiance est insuffisant.",
      en: "Reduce data exposure before any external processing, and refuse to send data to the cloud when confidence is too low.",
    },
  },
  {
    id: "GTCL-08",
    name: { fr: "Gouvernance réglementaire", en: "Regulatory governance" },
    summary: {
      fr: "Un graphe reliant exigences, contrôles, preuves, actifs et responsables, sans fausses correspondances ni prétention de remplacer un avis juridique.",
      en: "A graph linking requirements, controls, evidence, assets and owners, without false matches and without claiming to replace legal advice.",
    },
  },
];

/** p. 12 — Discipline de recherche commune à tous les programmes */
export const LAB_METHOD: L[] = [
  { fr: "État de l'art daté", en: "Dated state of the art" },
  { fr: "Hypothèse falsifiable", en: "Falsifiable hypothesis" },
  { fr: "Protocole et métriques", en: "Protocol and metrics" },
  { fr: "Critères de succès et d'échec", en: "Success and failure criteria" },
  { fr: "Décision Continuer / Pivoter / Arrêter", en: "Continue / Pivot / Stop decision" },
];
