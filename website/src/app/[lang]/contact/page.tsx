import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.contact.title,
    description: dict.meta.contact.description,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const t = dict.contact;

  return (
    <>
      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-green-100 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.form.company}
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.form.role}
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white">
                      <option value="dsi">{t.form.roles.dsi}</option>
                      <option value="rssi">{t.form.roles.rssi}</option>
                      <option value="itManager">
                        {t.form.roles.itManager}
                      </option>
                      <option value="procurement">
                        {t.form.roles.procurement}
                      </option>
                      <option value="other">{t.form.roles.other}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t.form.message}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  >
                    {t.form.submitDemo}
                  </button>
                  <button
                    type="button"
                    className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
                  >
                    {t.form.submit}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-surface rounded-xl p-6 border border-gray-200">
                <div className="text-2xl mb-2">&#x2709;</div>
                <div className="font-medium">{t.info.email}</div>
                <div className="text-sm text-muted">
                  contact@greentechcycle.com
                </div>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-gray-200">
                <div className="text-2xl mb-2">&#x260E;</div>
                <div className="font-medium">{t.info.phone}</div>
                <div className="text-sm text-muted">+33 1 23 45 67 89</div>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-gray-200">
                <div className="text-2xl mb-2">&#x1F4CD;</div>
                <div className="font-medium">{t.info.location}</div>
                <div className="text-sm text-muted">
                  {t.info.locationValue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
