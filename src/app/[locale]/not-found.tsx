import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Home, Briefcase, Mail, Monitor } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations("NotFound");

  const helpfulLinks = [
    { href: "/services", icon: Briefcase, label: t("links.services") },
    { href: "/contact", icon: Mail, label: t("links.contact") },
    { href: "/demo", icon: Monitor, label: t("links.demo") },
  ];

  return (
    <section className="section-padding min-h-[70vh] flex items-center justify-center">
      <div className="container-max max-w-2xl text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 p-3">
            <Image src="/icon-only.svg" alt="GreenTechCycle" width={56} height={56} className="w-full h-full" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {t("subtitle")}
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors mb-12"
        >
          <Home className="w-5 h-5" />
          {t("cta")}
        </Link>

        {/* Helpful Links */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 mb-4">-</p>
          <div className="flex flex-wrap justify-center gap-4">
            {helpfulLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
