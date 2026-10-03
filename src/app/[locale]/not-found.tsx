import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Home, Briefcase, Mail, Monitor } from "lucide-react";
import Logo from "@/components/Logo";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  const helpfulLinks = [
    { href: "/services", icon: Briefcase, label: t("links.services") },
    { href: "/contact", icon: Mail, label: t("links.contact") },
    { href: "/demo", icon: Monitor, label: t("links.demo") },
  ];

  return (
    <section className="bg-bg py-16 lg:py-24">
      <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">
        <Logo size="lg" markOnly />
        <p className="mt-8 text-eyebrow uppercase text-fg-muted">404</p>
        <h1 className="mt-3 max-w-[18ch] text-display-lg text-fg">{t("title")}</h1>
        <p className="mt-4 max-w-[65ch] text-body-lg text-fg-strong">{t("subtitle")}</p>
        <div className="mt-8">
          <ButtonLink href="/" size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            {t("cta")}
          </ButtonLink>
        </div>
        <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-track pt-6">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="inline-flex min-h-[44px] items-center gap-2 text-body-sm font-medium text-emerald hover:text-emerald-hover">
                <link.icon className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
