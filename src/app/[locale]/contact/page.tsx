"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FadeIn, ScaleIn } from "@/components/motion";
import Image from "next/image";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", type: "quote", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setTimeout(() => { setPending(false); setSubmitted(true); }, 800);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-dark py-24 md:py-32 overflow-hidden">
        <Image
          src="/images/office.jpg"
          alt="Bureau GreenTechCycle - Contactez notre équipe"
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="container-max mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t("hero.title")}</h1>
              <p className="text-lg md:text-xl text-white/80">{t("hero.subtitle")}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20 bg-light">
        <div className="container-max mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <FadeIn className="lg:col-span-2">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
                {submitted ? (
                  <div className="text-center py-12">
                    <ScaleIn>
                      <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
                    </ScaleIn>
                    <p className="text-xl font-bold text-gray-900">{t("form.success")}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.name")} *</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.email")} *</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.company")} *</label>
                        <input type="text" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.phone")}</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.type")} *</label>
                      <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none bg-white">
                        <option value="quote">{t("form.typeOptions.quote")}</option>
                        <option value="info">{t("form.typeOptions.info")}</option>
                        <option value="partnership">{t("form.typeOptions.partnership")}</option>
                        <option value="other">{t("form.typeOptions.other")}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t("form.message")} *</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none" />
                    </div>
                    <button type="submit" disabled={pending} className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50">
                      {pending ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                      {t("form.submit")}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Info sidebar */}
            <FadeIn delay={0.2}>
              <div className="space-y-5">
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line mt-1">{t("info.address")}</p>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <a href="tel:+33186652210" className="text-sm text-gray-600 hover:text-primary mt-1">{t("info.phone")}</a>
                </div>
                <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary-50 rounded-lg flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <a href="mailto:contact@greentechcycle.fr" className="text-sm text-gray-600 hover:text-primary mt-1">{t("info.email")}</a>
                </div>
                {/* Crisp placeholder */}
                <div className="bg-gray-50 p-5 rounded-xl border border-dashed border-gray-300 text-center">
                  <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">{t("crisp.placeholder")}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
