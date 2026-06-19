import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const otherLang = lang === "fr" ? "en" : "fr";

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Navigation */}
        <nav className="bg-surface border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href={`/${lang}`} className="flex items-center gap-2">
                <span className="text-2xl">♻</span>
                <span className="text-xl font-bold text-primary-dark">
                  GreenTechCycle
                </span>
              </a>

              <div className="hidden md:flex items-center gap-6">
                <a
                  href={`/${lang}#features`}
                  className="text-muted hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  {dict.nav.platform}
                </a>
                <a
                  href={`/${lang}#modules`}
                  className="text-muted hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  {dict.nav.sectors}
                </a>
                <a
                  href={`/${lang}/tarifs`}
                  className="text-muted hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  {dict.nav.pricing}
                </a>
                <a
                  href={`/${lang}/blog`}
                  className="text-muted hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  {dict.nav.blog}
                </a>
                <a
                  href={`/${lang}/contact`}
                  className="text-muted hover:text-primary-dark transition-colors text-sm font-medium"
                >
                  {dict.nav.contact}
                </a>
                <a
                  href={`/${otherLang}`}
                  className="text-muted hover:text-primary-dark transition-colors text-xs font-medium uppercase border border-gray-300 rounded px-2 py-1"
                >
                  {otherLang.toUpperCase()}
                </a>
                <a
                  href={`/${lang}/contact`}
                  className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                >
                  {dict.nav.bookDemo}
                </a>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-3">
                <a
                  href={`/${otherLang}`}
                  className="text-muted text-xs font-medium uppercase border border-gray-300 rounded px-2 py-1"
                >
                  {otherLang.toUpperCase()}
                </a>
                <a
                  href={`/${lang}/contact`}
                  className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  {dict.nav.bookDemo}
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">♻</span>
                  <span className="text-lg font-bold text-white">
                    GreenTechCycle
                  </span>
                </div>
                <p className="text-sm">{dict.footer.description}</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">
                  {dict.footer.platform}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href={`/${lang}#features`} className="hover:text-white transition-colors">
                      {dict.footer.features}
                    </a>
                  </li>
                  <li>
                    <a href={`/${lang}#modules`} className="hover:text-white transition-colors">
                      {dict.footer.modules}
                    </a>
                  </li>
                  <li>
                    <a href={`/${lang}#compliance`} className="hover:text-white transition-colors">
                      {dict.footer.compliance}
                    </a>
                  </li>
                  <li>
                    <a href={`/${lang}/tarifs`} className="hover:text-white transition-colors">
                      {lang === "fr" ? "Tarifs" : "Pricing"}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">
                  {dict.footer.company}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href={`/${lang}/blog`} className="hover:text-white transition-colors">
                      {dict.footer.blog}
                    </a>
                  </li>
                  <li>
                    <a href={`/${lang}/carrieres`} className="hover:text-white transition-colors">
                      {dict.footer.careers}
                    </a>
                  </li>
                  <li>
                    <a href={`/${lang}/contact`} className="hover:text-white transition-colors">
                      {dict.footer.contact}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">
                  {dict.footer.legal}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      {dict.footer.privacy}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      {dict.footer.terms}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      {dict.footer.cookies}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-6 text-center text-sm">
              <p>&copy; 2026 GreenTechCycle. {dict.footer.rights}</p>
              <p className="mt-2">{dict.footer.tagline}</p>
            </div>
          </div>
        </footer>

        {/* Chat Widget */}
        <div className="chat-widget fixed bottom-6 right-6 z-[9999]">
          <button
            className="bg-primary hover:bg-primary-dark text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-colors"
            aria-label={dict.chat.title}
            title={dict.chat.title}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
              />
            </svg>
          </button>
        </div>
      </body>
    </html>
  );
}
