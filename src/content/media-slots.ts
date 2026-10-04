/**
 * Registre des emplacements média (DESIGN.md v2 §7.3).
 *
 * Toutes les photos de stock ont été retirées : chaque emplacement affiche
 * aujourd'hui un visuel construit en code (`fallback`). Quand le client livrera
 * ses propres photos ou vidéos, il suffit de passer `src` (ou `video`) au
 * <MediaSlot id="…"> correspondant puis de passer l'entrée à "photo"/"video".
 *
 * Les ids dynamiques (`cas-${slug}`…) sont décrits par famille avec `{slug}`.
 * `previous` = ancienne photo de stock (pour mémoire, à ne pas réutiliser).
 */
export type MediaSlotState = "fallback" | "photo" | "video";

export interface MediaSlotEntry {
  id: string;
  page: string;
  ratio: string;
  subject: string;
  fallback: string;
  previous?: string;
  state: MediaSlotState;
}

export const MEDIA_SLOTS: MediaSlotEntry[] = [
  // Accueil
  { id: "home-hero", page: "/", ratio: "4/3", subject: "Atelier ITAD GreenTechCycle, opérateur et lot de laptops", fallback: "DashboardMock inventory", previous: "/photos/hp-atelier-itad.jpg", state: "fallback" },
  { id: "home-hero-background", page: "/", ratio: "16/9", subject: "Fond animé du hero — boucle muette 9 s (SLOT_VIDEOS, vidéo anglaise)", fallback: "poster gtc-hero-loop-en-poster.webp", state: "video" },
  { id: "home-case-{slug}", page: "/", ratio: "16/10", subject: "Site client réel par cas (banque, hôpital, industrie)", fallback: "GeometryField + pictogramme", previous: "/photos/case-{banque|hopital|industrie}.jpg", state: "fallback" },
  { id: "home-testimonial", page: "/", ratio: "1/1", subject: "Portrait du DSI cité (avec accord)", fallback: "GeometryField UserRound", previous: "/photos/hp-dsi-strategy.jpg", state: "fallback" },

  // Plateforme
  { id: "plateforme-hero", page: "/plateforme", ratio: "16/10", subject: "Capture réelle de la plateforme GTC — candidat vidéo screencast", fallback: "DashboardMock inventory", previous: "/photos/hp-dsi-strategy.jpg", state: "fallback" },
  { id: "plateforme-{slug}", page: "/plateforme#parcours", ratio: "16/10", subject: "Capture de l'écran du module (ingestion, audit, décision, traçabilité, restitution)", fallback: "DashboardMock (état par chapitre)", previous: "chap.photo", state: "fallback" },

  // Services
  { id: "services-hero", page: "/services", ratio: "4/3", subject: "Chaîne de traitement en atelier", fallback: "LifecycleDiagram", previous: "/photos/hp-atelier-itad.jpg", state: "fallback" },
  { id: "services-{slug}", page: "/services", ratio: "16/10", subject: "Geste métier du service (scan, effacement, reconditionnement, tri DEEE)", fallback: "GeometryField + pictogramme", previous: "s.image", state: "fallback" },
  { id: "service-{slug}-hero", page: "/services/{slug}", ratio: "4/3", subject: "Photo terrain du service", fallback: "DashboardMock / CertificateCard / LifecycleDiagram selon le service", previous: "data.image", state: "fallback" },
  { id: "service-{slug}-pourquoi", page: "/services/{slug}", ratio: "4/3", subject: "Détail équipement ou atelier", fallback: "LifecycleDiagram (nœud du service)", previous: "data.imageSecondary", state: "fallback" },
  { id: "waki-box-hero", page: "/waki-box", ratio: "4/3", subject: "La Waki Box en situation chez un client — candidat vidéo", fallback: "DashboardMock inventory", previous: "/photos/ewaste-recycling.jpg", state: "fallback" },
  { id: "waki-box-promesse", page: "/waki-box", ratio: "4/3", subject: "Tableau de bord client réel", fallback: "DashboardMock reporting", previous: "/photos/impact-dashboard.jpg", state: "fallback" },

  // Secteurs
  { id: "secteur-{slug}", page: "/secteurs/{slug}", ratio: "4/3", subject: "Environnement du secteur (salle de rédaction, bloc hospitalier…)", fallback: "GeometryField + pictogramme du secteur", previous: "sectorDef.image", state: "fallback" },

  // Cas d'usage
  { id: "cas-usages-hero", page: "/cas-usages", ratio: "4/3", subject: "Certificat d'effacement imprimé ou remise client", fallback: "CertificateCard", previous: "/photos/case-banque.jpg", state: "fallback" },
  { id: "cas-{slug}", page: "/cas-usages", ratio: "16/10", subject: "Photo du site client (avec accord)", fallback: "GeometryField + pictogramme", previous: "c.photo", state: "fallback" },
  { id: "cas-tf1-media", page: "/cas-usages", ratio: "16/10", subject: "Collecte chez TF1 (avec accord) — candidat vidéo témoignage", fallback: "DashboardMock reporting", previous: "tf1.photo", state: "fallback" },

  // Pourquoi GTC / Impact
  { id: "pourquoi-hero", page: "/pourquoi-gtc", ratio: "4/3", subject: "Équipe GreenTechCycle en atelier", fallback: "LifecycleDiagram", previous: "/photos/team-workshop.jpg", state: "fallback" },
  { id: "pourquoi-fondateur", page: "/pourquoi-gtc", ratio: "4/5", subject: "Portrait du fondateur", fallback: "GeometryField UserRound", previous: "/photos/founder-portrait.jpg", state: "fallback" },
  { id: "pourquoi-{slug}", page: "/pourquoi-gtc", ratio: "16/10", subject: "Illustration de chaque conviction", fallback: "GeometryField + pictogramme", previous: "c.photo", state: "fallback" },
  { id: "impact-hero", page: "/impact", ratio: "4/3", subject: "Rapport d'impact client réel", fallback: "DashboardMock reporting", previous: "/photos/impact-sustainability.jpg", state: "fallback" },

  // Tarifs / Démo
  { id: "tarifs-hero", page: "/tarifs", ratio: "4/3", subject: "Waki Box ou écran de suivi", fallback: "DashboardMock reporting compact", previous: "/photos/service-wakibox.jpg", state: "fallback" },
  { id: "tarifs-brique-{name}", page: "/tarifs", ratio: "16/10", subject: "Visuel de chaque brique tarifaire", fallback: "GeometryField + pictogramme", previous: "b.photo", state: "fallback" },
  { id: "tarifs-pilote", page: "/tarifs", ratio: "4/3", subject: "Signature du pilote / audit", fallback: "CertificateCard", previous: "/photos/hp-audit-signature.jpg", state: "fallback" },
  { id: "tarifs-devis-{slug}", page: "/tarifs", ratio: "16/10", subject: "Visuel par type de devis", fallback: "DashboardMock erasure / LifecycleDiagram", previous: "card.photo", state: "fallback" },
  { id: "demo-video", page: "/demo", ratio: "16/9", subject: "Présentation GreenTechCycle 24,7 s, voix off anglaise, sans sous-titres (SLOT_VIDEOS)", fallback: "DashboardMock inventory", previous: "/images/hero-dashboard.jpg", state: "video" },

  // Vidéos de cas clients (anglais, lecture au clic)
  { id: "case-banque", page: "/cas-usages#cas-banque-cac40, /secteurs/finance", ratio: "16/9", subject: "Cas Banque CAC40 · 35 s", fallback: "poster", state: "video" },
  { id: "case-chu", page: "/cas-usages#cas-en-video, /secteurs/sante", ratio: "16/9", subject: "Cas CHU · 34 s", fallback: "poster", state: "video" },
  { id: "case-tf1", page: "/cas-usages (cas phare TF1), /secteurs/medias-audiovisuel", ratio: "16/9", subject: "Cas TF1 · 33 s", fallback: "poster", state: "video" },
  { id: "case-energie", page: "/cas-usages#cas-en-video, /secteurs/energie", ratio: "16/9", subject: "Cas Énergie · 35 s", fallback: "poster", state: "video" },

  // Blog
  { id: "blog-hero", page: "/blog", ratio: "16/9", subject: "Illustration éditoriale", fallback: "GeometryField", previous: "/photos/blog-economie-circulaire.jpg", state: "fallback" },
  { id: "blog-card-{slug}", page: "/blog", ratio: "16/10", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
  { id: "blog-{slug}", page: "/blog/{slug}", ratio: "16/9", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
  { id: "related-{slug}", page: "articles liés", ratio: "16/10", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
];

/**
 * Vidéos par emplacement (décision du 2026-10-04 : vidéos en ANGLAIS uniquement, même fichier
 * sur les pages fr et en, et AUCUN sous-titre). Fichiers dans /public/videos :
 * WebM VP9 (servie en priorité) + MP4 H.264 « faststart » en repli, 1280×720 pour les vidéos
 * avec voix off, poster WebP.
 * - `loop`   : vidéo d'ambiance muette, en boucle, sans contrôle (VideoBackground / SlotVideo) ;
 *              poster seul si prefers-reduced-motion ou Save-Data ; chargée après l'événement load.
 * - `player` : vidéo avec voix off anglaise, lecture au clic, `preload="none"`, muette par défaut
 *              + bouton « Activer le son » (VideoPlayer). `description` = texte accessible
 *              (aria-label + description masquée visuellement) à la place des sous-titres.
 */
export interface SlotVideoSpec {
  kind: "loop" | "player";
  sources: { src: string; type: string }[];
  poster: string;
  /** Durée (s) */
  duration?: number;
  /** Titre et description accessibles (fr/en) — la voix off est en anglais */
  title?: { fr: string; en: string };
  description?: { fr: string; en: string };
}

const v = (name: string) => [
  { src: `/videos/${name}.webm`, type: "video/webm" },
  { src: `/videos/${name}.mp4`, type: "video/mp4" },
];

export const SLOT_VIDEOS: Partial<Record<string, SlotVideoSpec>> = {
  // Fond animé du hero d'accueil : boucle muette 9 s (WebM 82 Ko / MP4 267 Ko)
  "home-hero-background": {
    kind: "loop",
    sources: v("gtc-hero-loop-en"),
    poster: "/videos/gtc-hero-loop-en-poster.webp",
    duration: 9,
  },
  // /demo : présentation 24,7 s, voix off anglaise (WebM 394 Ko / MP4 501 Ko)
  "demo-video": {
    kind: "player",
    sources: v("gtc-presentation-en"),
    poster: "/videos/gtc-presentation-en-poster.webp",
    duration: 24.7,
    title: { fr: "Présentation GreenTechCycle", en: "GreenTechCycle presentation" },
    description: {
      fr: "Vidéo de 25 secondes, voix off en anglais : l'ITAD comme chaîne de preuves, les chiffres clés (152 ETI clientes, 12 412 actifs traités, 45 tCO₂e évitées, 73 % de réemploi) et le cycle collecte, effacement certifié, reconditionnement, recyclage.",
      en: "25-second video with English voice-over: ITAD as a chain of proof, key figures (152 mid-cap clients, 12,412 assets processed, 45 tCO₂e avoided, 73% reuse) and the collection, certified erasure, refurbishment, recycling cycle.",
    },
  },
  // Cas Banque CAC40 (UseCases.cases[0]) : 35 s
  "case-banque": {
    kind: "player",
    sources: v("gtc-case-banque-en"),
    poster: "/videos/gtc-case-banque-en-poster.webp",
    duration: 35.4,
    title: { fr: "Cas client : banque tier-1 CAC40", en: "Customer case: tier-1 CAC40 bank" },
    description: {
      fr: "Vidéo de 35 secondes, voix off en anglais : 2 400 postes trading floor migrés vers Windows 11 sous NIS2 et DORA ; collecte scellée, effacement NIST certifié, reconditionnement, recyclage, rapport signé ; résultat : 11 semaines au lieu de 6 mois, 312 tCO₂e évitées, pré-audit superviseur en 4 jours au lieu de 3 semaines.",
      en: "35-second video with English voice-over: 2,400 trading-floor workstations migrated to Windows 11 under NIS2 and DORA; sealed collection, certified NIST erasure, refurbishment, recycling, signed reporting; result: 11 weeks instead of 6 months, 312 tCO₂e avoided, supervisor pre-audit in 4 days instead of 3 weeks.",
    },
  },
  // Cas CHU (UseCases.cases[1]) : 34 s
  "case-chu": {
    kind: "player",
    sources: v("gtc-case-chu-en"),
    poster: "/videos/gtc-case-chu-en-poster.webp",
    duration: 33.7,
    title: { fr: "Cas client : CHU de 9 000 lits", en: "Customer case: 9,000-bed teaching hospital" },
    description: {
      fr: "Vidéo de 34 secondes, voix off en anglais : 800 disques d'imagerie médicale en fin de vie ; extraction sur site sous vidéosurveillance, effacement NIST 800-88 Purge, broyage 6 mm classé HDS, procès-verbaux par actif, reconditionnement ESS du reste ; résultat : 800 disques détruits en 9 jours, 0 interruption de bloc opératoire, 84 tCO₂e évitées.",
      en: "34-second video with English voice-over: 800 medical-imaging drives at end of life; on-site extraction under video surveillance, NIST 800-88 Purge erasure, 6 mm HDS-classified shredding, per-asset reports, social-economy refurbishment for the rest; result: 800 drives destroyed in 9 days, 0 operating-block interruption, 84 tCO₂e avoided.",
    },
  },
  // Cas TF1 (casUsages.featuredTf1) : 33 s
  "case-tf1": {
    kind: "player",
    sources: v("gtc-case-tf1-en"),
    poster: "/videos/gtc-case-tf1-en-poster.webp",
    duration: 33,
    title: { fr: "Cas client : TF1", en: "Customer case: TF1" },
    description: {
      fr: "Vidéo de 33 secondes, voix off en anglais : studios, régies et datacenters broadcast de TF1 sous un contrat ITAD récurrent ; audit d'inventaire, effacement certifié, reconditionnement broadcast ; résultat : 100 % d'effacement conforme NIST 800-88, 18 t valorisées chaque année, 74 % de réemploi.",
      en: "33-second video with English voice-over: TF1's studios, control rooms and broadcast datacenters under one recurring ITAD contract; inventory audit, certified erasure, broadcast refurbishment; result: 100% NIST 800-88 compliant erasure, 18 t recovered every year, 74% reuse rate.",
    },
  },
  // Cas Énergie (UseCases.cases[5]) : 35 s
  "case-energie": {
    kind: "player",
    sources: v("gtc-case-energie-en"),
    poster: "/videos/gtc-case-energie-en-poster.webp",
    duration: 34.5,
    title: { fr: "Cas client : opérateur énergétique", en: "Customer case: energy operator" },
    description: {
      fr: "Vidéo de 35 secondes, voix off en anglais : 4 200 concentrateurs de compteurs intelligents contenant des clés cryptographiques, audit national de cybersécurité sous 30 jours ; extraction sur site, transport sécurisé, effacement des modules, broyage, chaîne de garde horodatée ; résultat : 4 200 unités traitées en 38 jours, 0 incident, audit national validé en 9 jours.",
      en: "35-second video with English voice-over: 4,200 smart-meter concentrators holding cryptographic keys, national cybersecurity audit within 30 days; on-site extraction, secure transport, module erasure, shredding, timestamped chain of custody; result: 4,200 units processed in 38 days, 0 incidents, national audit cleared in 9 days.",
    },
  },
};

/** Emplacements dotés d'une vidéo */
export const VIDEO_READY_SLOTS = ["home-hero-background", "demo-video", "case-banque", "case-chu", "case-tf1", "case-energie"] as const;
