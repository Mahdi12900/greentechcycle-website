"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const megaMenus: Record<string, { href: string; label: string }[]> = {
    platform: [
      { href: "/plateforme", label: t("megaMenu.platform.items.overview") },
      { href: "/plateforme#modules", label: t("megaMenu.platform.items.modules") },
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
      { href: "/demo", label: t("megaMenu.resources.items.demo") },
      { href: "/faq", label: t("megaMenu.resources.items.faq") },
      { href: "/reglementation", label: t("megaMenu.resources.items.regulation") },
      { href: "/methodologie", label: t("megaMenu.resources.items.methodology") },
      { href: "/processus-itad", label: t("megaMenu.resources.items.process") },
      { href: "/securite", label: t("megaMenu.resources.items.security") },
      { href: "/impact", label: t("megaMenu.resources.items.impact") },
    ],
    company: [
      { href: "/pourquoi-gtc", label: t("megaMenu.company.items.whyGtc") },
      { href: "/parcours-client", label: t("megaMenu.company.items.journey") },
      { href: "/ecosysteme", label: t("megaMenu.company.items.ecosystem") },
      { href: "/carrieres", label: t("megaMenu.company.items.careers") },
    ],
  };

  const navItems = [
    { key: "platform", label: t("nav.platform"), hasMenu: true },
    { key: "solutions", label: t("nav.solutions"), hasMenu: true },
    { key: "sectors", label: t("nav.sectors"), hasMenu: true },
    { key: "resources", label: t("nav.resources"), hasMenu: true },
    { key: "company", label: t("nav.company"), hasMenu: true },
  ];

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src="/logo/logo-horizontal.svg" alt="GreenTechCycle" width={200} height={40} className="h-10 w-auto" priority />
          </Link>

          {/* Desktop nav with mega-menus */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-50">
              {t("nav.home")}
            </Link>
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-1"
                  aria-expanded={openMenu === item.key}
                  aria-haspopup="true"
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openMenu === item.key ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                {openMenu === item.key && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50" role="menu">
                    {megaMenus[item.key].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50 focus:text-primary"
                        role="menuitem"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/tarifs" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-gray-50">
              {t("nav.pricing")}
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={switchLocale}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors rounded-lg hover:bg-gray-50"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              {locale === "fr" ? "EN" : "FR"}
            </button>
            <Link
              href="/demo"
              className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t("cta")}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg" aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto" role="navigation" aria-label="Menu mobile">
          <div className="px-4 py-4 space-y-1">
            <Link href="/" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              {t("nav.home")}
            </Link>
            <Link href="/tarifs" className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
              {t("nav.pricing")}
            </Link>
            {navItems.map((item) => (
              <div key={item.key}>
                <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-3">
                  {item.label}
                </div>
                {megaMenus[item.key].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-3 flex items-center gap-2">
              <button onClick={switchLocale} className="flex-1 text-center px-4 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg">
                <Globe className="w-4 h-4 inline mr-1.5" />{locale === "fr" ? "English" : "Français"}
              </button>
              <Link href="/demo" className="flex-1 text-center px-4 py-3 bg-primary text-white font-semibold rounded-lg">
                {t("cta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
