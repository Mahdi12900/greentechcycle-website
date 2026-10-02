import {
  Building2,
  Heart,
  Factory,
  ShoppingCart,
  Zap,
  Truck,
  Landmark,
  Cpu,
  Tv,
  Briefcase,
  FlaskConical,
  HardHat,
  UtensilsCrossed,
  GraduationCap,
  Wheat,
  Radio,
} from "lucide-react";
import type { ComponentType } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Slugs, FR canonical, same URL path for both locales
───────────────────────────────────────────────────────────────────────────── */
export type SectorSlug =
  | "finance"
  | "sante"
  | "industrie"
  | "retail"
  | "energie"
  | "transport-logistique"
  | "public"
  | "tech"
  | "medias-audiovisuel"
  | "conseil"
  | "pharma-biotech"
  | "btp"
  | "horeca"
  | "education-recherche"
  | "agroalimentaire"
  | "telecom";

/* ─────────────────────────────────────────────────────────────────────────────
   Sector definition (visual / routing)
───────────────────────────────────────────────────────────────────────────── */
export interface SectorDef {
  slug: SectorSlug;
  number: number;
  icon: ComponentType<{ className?: string }>;
  /** Photo locale (/public). `null` = pas de photo dédiée → panneau d'identité (DESIGN.md §7). */
  image: string | null;
  color: string;
  accent: string;
  priority: 1 | 2 | 3; // 1=haute, 2=moyenne, 3=faible
  featured?: boolean;
}

export const SECTORS: SectorDef[] = [
  { slug: "finance", number: 1, icon: Building2, image: "/photos/case-banque.jpg", color: "bg-forest/10 text-forest", accent: "blue", priority: 1, featured: true },
  { slug: "sante", number: 2, icon: Heart, image: "/photos/case-hopital.jpg", color: "bg-ochre/10 text-danger", accent: "red", priority: 2 },
  { slug: "industrie", number: 3, icon: Factory, image: "/photos/case-industrie.jpg", color: "bg-ochre/10 text-ochre", accent: "amber", priority: 1 },
  { slug: "retail", number: 4, icon: ShoppingCart, image: "/photos/sector-retail.jpg", color: "bg-leaf/10 text-leaf", accent: "teal", priority: 1 },
  { slug: "energie", number: 5, icon: Zap, image: "/photos/case-energie.jpg", color: "bg-leaf/10 text-leaf", accent: "emerald", priority: 2 },
  { slug: "transport-logistique", number: 6, icon: Truck, image: null, color: "bg-forest/10 text-forest", accent: "sky", priority: 2 },
  { slug: "public", number: 7, icon: Landmark, image: "/photos/case-administration.jpg", color: "bg-forest/10 text-forest", accent: "purple", priority: 3 },
  { slug: "tech", number: 8, icon: Cpu, image: "/images/datacenter.jpg", color: "bg-forest/10 text-forest", accent: "indigo", priority: 1 },
  { slug: "medias-audiovisuel", number: 9, icon: Tv, image: "/photos/case-media-tf1.jpg", color: "bg-forest/10 text-forest", accent: "pink", priority: 1, featured: true },
  { slug: "conseil", number: 10, icon: Briefcase, image: "/photos/corporate-meeting.jpg", color: "bg-muted/10 text-ink-700", accent: "slate", priority: 1 },
  { slug: "pharma-biotech", number: 11, icon: FlaskConical, image: "/images/hospital.jpg", color: "bg-forest/10 text-forest", accent: "cyan", priority: 2 },
  { slug: "btp", number: 12, icon: HardHat, image: "/images/industry.jpg", color: "bg-ochre/10 text-ochre", accent: "orange", priority: 3 },
  { slug: "horeca", number: 13, icon: UtensilsCrossed, image: "/images/office.jpg", color: "bg-forest/10 text-forest", accent: "rose", priority: 2 },
  { slug: "education-recherche", number: 14, icon: GraduationCap, image: "/photos/case-universite.jpg", color: "bg-forest/10 text-forest", accent: "violet", priority: 3 },
  { slug: "agroalimentaire", number: 15, icon: Wheat, image: null, color: "bg-forest/10 text-forest", accent: "lime", priority: 2 },
  { slug: "telecom", number: 16, icon: Radio, image: "/photos/case-telco.jpg", color: "bg-forest/10 text-forest", accent: "fuchsia", priority: 2 },
];

export const ALL_SECTOR_SLUGS: SectorSlug[] = SECTORS.map((s) => s.slug);

export function getSectorDef(slug: string): SectorDef | undefined {
  return SECTORS.find((s) => s.slug === slug);
}

/* ─────────────────────────────────────────────────────────────────────────────
   Content types
───────────────────────────────────────────────────────────────────────────── */
export interface SectorContent {
  hero: { title: string; subtitle: string };
  profile: { description: string; regulations: string };
  painPoints: string[];
  useCases: { title: string; description: string }[];
  roi: { lever: string; gain: string }[];
  personas: { role: string; description: string }[];
  quote: string;
  objections: { question: string; answer: string }[];
  cta: { title: string; button: string };
  tf1Reference?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
   Priority matrix data
───────────────────────────────────────────────────────────────────────────── */
export interface MatrixRow {
  slug: SectorSlug;
  dealSize: string;
  velocity: string;
  priority: string;
  stars: number;
}
