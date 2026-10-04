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
  { id: "home-hero-background", page: "/", ratio: "16/9", subject: "Fond animé du hero — boucle muette 9 s (SLOT_VIDEOS, vidéo de test)", fallback: "poster gtc-hero-loop-poster.webp", state: "video" },
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
  { id: "demo-video", page: "/demo", ratio: "16/9", subject: "Présentation GreenTechCycle 24,5 s, voix off FR, sous-titres FR/EN (SLOT_VIDEOS, vidéo de test) — à remplacer par la capture réelle de la plateforme", fallback: "DashboardMock inventory", previous: "/images/hero-dashboard.jpg", state: "video" },

  // Blog
  { id: "blog-hero", page: "/blog", ratio: "16/9", subject: "Illustration éditoriale", fallback: "GeometryField", previous: "/photos/blog-economie-circulaire.jpg", state: "fallback" },
  { id: "blog-card-{slug}", page: "/blog", ratio: "16/10", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
  { id: "blog-{slug}", page: "/blog/{slug}", ratio: "16/9", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
  { id: "related-{slug}", page: "articles liés", ratio: "16/10", subject: "Visuel de l'article", fallback: "GeometryField", previous: "article.image", state: "fallback" },
];

/**
 * Vidéos par emplacement (phase vidéo, branchées le 2026-10-04 — vidéos de TEST).
 * Fichiers dans /public/videos (MP4 H.264 « faststart » + WebM VP9 pour la boucle).
 * - `loop`   : vidéo d'ambiance muette, en boucle, sans contrôle (VideoBackground / SlotVideo) ;
 *              poster seul si prefers-reduced-motion ou Save-Data ; chargée après l'événement load.
 * - `player` : vidéo avec voix off, contrôles, muette par défaut + bouton « Activer le son »,
 *              sous-titres WebVTT fr/en (VideoPlayer).
 * Les emplacements portent `data-video-ready` / `data-media-slot` dans le HTML.
 */
export interface SlotVideoSpec {
  kind: "loop" | "player";
  sources: { src: string; type: string }[];
  poster: string;
  /** Durée (s), pour le libellé accessible */
  duration?: number;
  captions?: { fr: string; en: string };
}

export const SLOT_VIDEOS: Partial<Record<string, SlotVideoSpec>> = {
  // Fond animé du hero d'accueil : boucle 9 s (cycle collecte → effacement → reconditionnement → recyclage)
  "home-hero-background": {
    kind: "loop",
    sources: [
      { src: "/videos/gtc-hero-loop.webm", type: "video/webm" }, // 85 Ko
      { src: "/videos/gtc-hero-loop.mp4", type: "video/mp4" }, // 268 Ko
    ],
    poster: "/videos/gtc-hero-loop-poster.webp",
    duration: 9,
  },
  // /demo : présentation 24,5 s, voix off française + musique
  "demo-video": {
    kind: "player",
    sources: [{ src: "/videos/gtc-presentation.mp4", type: "video/mp4" }], // 1,8 Mo
    poster: "/videos/gtc-presentation-poster.webp",
    duration: 24.5,
    captions: { fr: "/videos/gtc-presentation.fr.vtt", en: "/videos/gtc-presentation.en.vtt" },
  },
};

/** Emplacements prévus pour une vidéo */
export const VIDEO_READY_SLOTS = ["home-hero-background", "demo-video"] as const;
