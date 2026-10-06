"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { useSiteUi } from "@/components/SiteUiContext";

/**
 * Header unique (DESIGN.md §6.1–6.2).
 * - Seul élément fixe en haut. Se retire (`data-hidden`) quand une barre
 *   d'onglets (SectionNav) prend le relais.
 * - Logo seul, 5 menus + Tarifs, switch langue texte, bouton primaire md.
 */
export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { headerHidden } = useSiteUi();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const megaMenus: Record<string, { href: string; label: string }[]> = {
    platform: [
      { href: "/plateforme", label: t("megaMenu.platform.items.overview") },
      { href: "/plateforme#modules", label: t("megaMenu.platform.items.modules") },
      { href: "/plateforme#it-ot", label: t("megaMenu.platform.items.itot") },
      { href: "/plateforme#integrations", label: t("megaMenu.platform.items.integrations") },
      { href: "/plateforme#governance", label: t("megaMenu.platform.items.governance") },
      { href: "/plateforme#mobile", label: t("megaMenu.platform.items.mobile") },
      { href: "/tarifs", label: t("megaMenu.platform.items.pricing") },
    ],
    solutions: [
      { href: "/services", label: t("megaMenu.solutions.items.services") },
      { href: "/services/audit-inventaire", label: t("megaMenu.solutions.items.audit") },
      { href: "/services/effacement-securise", label: t("megaMenu.solutions.items.erasure") },
      { href: "/services/reconditionnement-valorisation", label: t("megaMenu.solutions.items.refurbish") },
      { href: "/services/recyclage-deee", label: t("megaMenu.solutions.items.recycling") },
      { href: "/services/cybersecurite", label: t("megaMenu.solutions.items.cyber") },
      { href: "/services/wakibox", label: t("megaMenu.solutions.items.wakibox") },
      { href: "/services/collecte-logistique", label: t("megaMenu.solutions.items.collection") },
      { href: "/certifications", label: t("megaMenu.solutions.items.certifications") },
      { href: "/cas-usages", label: t("megaMenu.solutions.items.useCases") },
    ],
    sectors: [
      { href: "/secteurs", label: t("megaMenu.sectors.items.overview") },
      { href: "/secteurs/finance", label: t("megaMenu.sectors.items.finance") },
      { href: "/secteurs/sante", label: t("megaMenu.sectors.items.sante") },
      { href: "/secteurs/industrie", label: t("megaMenu.sectors.items.industrie") },
      { href: "/secteurs/retail", label: t("megaMenu.sectors.items.retail") },
      { href: "/secteurs/energie", label: t("megaMenu.sectors.items.energie") },
      { href: "/secteurs/transport-logistique", label: t("megaMenu.sectors.items.transport") },
      { href: "/secteurs/public", label: t("megaMenu.sectors.items.public") },
      { href: "/secteurs/tech", label: t("megaMenu.sectors.items.tech") },
      { href: "/secteurs/medias-audiovisuel", label: t("megaMenu.sectors.items.medias") },
      { href: "/secteurs/conseil", label: t("megaMenu.sectors.items.conseil") },
      { href: "/secteurs/pharma-biotech", label: t("megaMenu.sectors.items.pharma") },
      { href: "/secteurs/btp", label: t("megaMenu.sectors.items.btp") },
      { href: "/secteurs/horeca", label: t("megaMenu.sectors.items.horeca") },
      { href: "/secteurs/education-recherche", label: t("megaMenu.sectors.items.education") },
      { href: "/secteurs/agroalimentaire", label: t("megaMenu.sectors.items.agroalimentaire") },
      { href: "/secteurs/telecom", label: t("megaMenu.sectors.items.telecom") },
    ],
    resources: [
      { href: "/faq", label: t("megaMenu.resources.items.faq") },
      { href: "/reglementation", label: t("megaMenu.resources.items.regulation") },
      { href: "/methodologie", label: t("megaMenu.resources.items.methodology") },
      { href: "/processus-itad", label: t("megaMenu.resources.items.process") },
      { href: "/securite", label: t("megaMenu.resources.items.security") },
      { href: "/impact", label: t("megaMenu.resources.items.impact") },
      { href: "/blog", label: t("megaMenu.resources.items.blog") },
    ],
    company: [
      { href: "/pourquoi-gtc", label: t("megaMenu.company.items.whyGtc") },
      { href: "/resultats-clients", label: t("megaMenu.company.items.results") },
      { href: "/parcours-client", label: t("megaMenu.company.items.journey") },
      { href: "/ecosysteme", label: t("megaMenu.company.items.ecosystem") },
      { href: "/lab", label: t("megaMenu.company.items.lab") },
      { href: "/carrieres", label: t("megaMenu.company.items.careers") },
    ],
  };

  const navItems = [
    { key: "platform", label: t("nav.platform") },
    { key: "solutions", label: t("nav.solutions") },
    { key: "sectors", label: t("nav.sectors") },
    { key: "resources", label: t("nav.resources") },
    { key: "company", label: t("nav.company") },
  ];

  /** Un menu est « actif » si la page courante fait partie de ses liens. */
  const isActiveGroup = (key: string) =>
    megaMenus[key].some((l) => {
      const base = l.href.split("#")[0];
      return base !== "/tarifs" && (pathname === base || pathname.startsWith(base + "/"));
    });
  const pricingActive = pathname === "/tarifs";

  function handleMouseEnter(key: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(key);
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  }

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  /* Échap ferme menus ; clic extérieur ferme le menu déroulant */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  /* Bordure basse après 8 px de défilement (§6.1) — écouteur passif */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Panneau mobile plein écran : bloque le scroll de la page */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const linkBase =
    "relative inline-flex h-10 items-center gap-1 rounded-lg px-3 text-body-sm font-medium transition-colors";
  const linkIdle = "text-fg-strong hover:bg-white/[0.04] hover:text-fg";
  const linkActive =
    "text-fg after:absolute after:inset-x-3 after:-bottom-[13px] lg:after:-bottom-[17px] after:h-0.5 after:bg-emerald";

  const hidden = headerHidden && !mobileOpen;

  return (
    <header
      data-hidden={hidden ? "true" : undefined}
      className={`fixed inset-x-0 top-0 z-50 border-b bg-bg/80 backdrop-blur-md transition-[transform,border-color] duration-200 ease-out ${
        scrolled || mobileOpen ? "is-scrolled border-track" : "border-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="container-max px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6 xl:h-[72px]">
          <Link href="/" className="flex flex-shrink-0 items-center" aria-label="GreenTechCycle — accueil">
            <Logo />
          </Link>

          {/* Navigation desktop — bascule à xl (1280px) : à lg (1024px) le menu complet + CTA
              débordait de 167px (reports/qa-affichage-gtc.md §1), le panneau mobile prend le relais
              jusqu'à xl. */}
          <nav ref={navRef} className="hidden items-center gap-1 xl:flex" aria-label={locale === "en" ? "Main navigation" : "Navigation principale"}>
            {navItems.map((item) => {
              const open = openMenu === item.key;
              const active = isActiveGroup(item.key);
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setOpenMenu(open ? null : item.key)}
                    className={`${linkBase} ${active ? linkActive : linkIdle}`}
                    aria-expanded={open}
                    aria-controls={`menu-${item.key}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 text-fg-muted transition-transform ${open ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  {open && (
                    <div
                      id={`menu-${item.key}`}
                      className={`absolute left-0 top-full z-50 mt-2 rounded-xl border border-track bg-bg p-2 shadow-float ${
                        item.key === "sectors" ? "grid w-[480px] grid-cols-2 gap-x-2" : "w-64"
                      }`}
                    >
                      {megaMenus[item.key].map((link) => {
                        const current = pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={current ? "page" : undefined}
                            className={`block rounded-lg px-3 py-2 text-body-sm transition-colors hover:bg-white/[0.04] hover:text-fg ${
                              current ? "font-semibold text-fg" : "text-fg-strong"
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              href="/tarifs"
              aria-current={pricingActive ? "page" : undefined}
              className={`${linkBase} ${pricingActive ? linkActive : linkIdle}`}
            >
              {t("nav.pricing")}
            </Link>
          </nav>

          {/* Droite */}
          <div className="hidden items-center gap-2 xl:flex">
            <button
              type="button"
              onClick={switchLocale}
              className="inline-flex h-10 items-center rounded-lg px-3 text-body-sm font-medium text-fg-strong transition-colors hover:bg-white/[0.04] hover:text-fg"
              aria-label={locale === "fr" ? "Switch to English" : "Passer en français"}
              lang={locale === "fr" ? "en" : "fr"}
            >
              {locale === "fr" ? "EN" : "FR"}
            </button>
            <Link
              href="/demo"
              className="group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-lg bg-emerald px-5 text-body-sm font-semibold text-bg transition-colors hover:bg-emerald-hover"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Bascule mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-fg xl:hidden"
            aria-label={
              mobileOpen
                ? locale === "en" ? "Close menu" : "Fermer le menu"
                : locale === "en" ? "Open menu" : "Ouvrir le menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Panneau mobile plein écran sous la barre */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 flex flex-col border-t border-track bg-bg xl:hidden"
          aria-label={locale === "en" ? "Mobile menu" : "Menu mobile"}
        >
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <Link
              href="/tarifs"
              className="flex h-11 items-center text-heading-md text-fg"
            >
              {t("nav.pricing")}
            </Link>
            {navItems.map((item) => (
              <div key={item.key} className="mt-6 border-t border-track pt-6">
                <p className="mb-2 text-eyebrow uppercase text-fg-muted">{item.label}</p>
                <ul className={item.key === "sectors" ? "grid grid-cols-2 gap-x-4" : ""}>
                  {megaMenus[item.key].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        className="flex min-h-[44px] items-center text-body text-fg-strong hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="flex gap-3 border-t border-track bg-bg px-5 pt-4"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <button
              type="button"
              onClick={switchLocale}
              className="h-12 rounded-lg border border-track px-4 text-body-sm font-semibold text-fg"
              lang={locale === "fr" ? "en" : "fr"}
            >
              {locale === "fr" ? "English" : "Français"}
            </button>
            <Link
              href="/demo"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald px-6 text-body font-semibold text-bg hover:bg-emerald-hover"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
