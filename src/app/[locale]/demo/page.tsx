"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import Image from "next/image";
import { Play, Monitor, BarChart3, Layout, Layers, Send, CheckCircle } from "lucide-react";

export default function DemoPage() {
  const t = useTranslations("Demo");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    equipment: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const screenshotItems = t.raw("screenshots.items") as string[];
  const equipmentOptions = t.raw("form.equipmentOptions") as string[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen bg-light">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary to-dark py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {t("hero.subtitle")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Video Placeholder */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-8">
              {t("video.title")}
            </h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/hero-dashboard.jpg"
                alt="Aperçu de la plateforme GreenTechCycle - Demandez une démo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/30 transition-colors duration-300" />
              <button
                className="absolute inset-0 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-accent/40 rounded-2xl"
                aria-label="Lire la vidéo de démonstration"
              >
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/40 group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" aria-hidden="true" />
                </div>
              </button>
              <div className="absolute bottom-4 left-4 text-white/60 text-sm">
                {t("video.placeholder")}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-16">
              {t("screenshots.title")}
            </h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshotItems.map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-dark rounded-xl overflow-hidden shadow-xl border border-white/10">
                  <div className="h-8 bg-dark/80 flex items-center px-4 gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="p-4 h-56 flex items-center justify-center">
                    <div className="text-center">
                      <Monitor className="w-10 h-10 text-accent mx-auto mb-3" />
                      <p className="text-white/70 text-sm font-medium">{item}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-light to-white">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-dark text-center mb-4">
              {t("form.title")}
            </h2>
            <p className="text-center text-dark/60 mb-12">
              {t("form.subtitle")}
            </p>
          </FadeIn>

          {submitted ? (
            <ScaleIn>
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
                <p className="text-lg text-dark">
                  {t("form.success")}
                </p>
              </div>
            </ScaleIn>
          ) : (
            <FadeIn>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {t("form.fields.name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {t("form.fields.company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {t("form.fields.email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {t("form.fields.phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    {t("form.fields.equipment")}
                  </label>
                  <select
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                  >
                    <option value="">--</option>
                    {equipmentOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    {t("form.fields.message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/25"
                >
                  <Send className="w-5 h-5" />
                  {t("form.submit")}
                </button>
              </form>
            </FadeIn>
          )}
        </div>
      </section>
    </main>
  );
}
