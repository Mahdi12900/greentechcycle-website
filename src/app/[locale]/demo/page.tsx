"use client";

import DashboardMock from "@/components/visuals/DashboardMock";
import MediaSlot from "@/components/visuals/MediaSlot";
import VideoPlayer from "@/components/visuals/VideoPlayer";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { Monitor, Send, CheckCircle } from "lucide-react";

export default function DemoPage() {
  const t = useTranslations("Demo");
  const isEn = useLocale() === "en";
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

  const label = "block text-body-sm font-medium text-fg";
  const field =
    "mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <div>
      {/* Hero court (paper) */}
      <section className="bg-bg py-16 lg:py-24" aria-labelledby="demo-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <h1 id="demo-title" className="max-w-[20ch] text-display-lg text-fg">{t("hero.title")}</h1>
            <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>
            <div className="mt-8">
              <ButtonLink href="#demo-form" size="lg">{t("form.submit")}</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu vidéo */}
      <Section tone="cream" bordered>
        <div className="reveal">
          <SectionHeader title={t("video.title")} />
          <figure>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-track shadow-float">
              <VideoPlayer
                id="demo-video"
                title={isEn ? "GreenTechCycle presentation video, 25 seconds, French voice-over, captions available" : "Vidéo de présentation GreenTechCycle, 25 secondes, voix off en français, sous-titres disponibles"}
                fallback={<MediaSlot fill id="demo-video" alt="Aperçu de la plateforme GreenTechCycle" fallback={<DashboardMock state="inventory" />} />}
              />
            </div>
            <figcaption className="mt-3 text-caption text-fg-muted">{t("video.placeholder")}</figcaption>
          </figure>
          {/* Transcription de la voix off (accessibilité, lisible sans lecture de la vidéo) */}
          <details className="mt-4 max-w-[65ch] rounded-xl border border-track bg-bg p-4 text-body-sm text-fg-strong">
            <summary className="cursor-pointer font-medium text-fg">{isEn ? "Read the transcript" : "Lire la transcription"}</summary>
            <p className="mt-3">
              {isEn
                ? "ITAD is not a product. It is a chain of proof. 152 mid-cap clients. 12,412 assets processed. 45 tonnes of CO₂ avoided. 73% reuse. Collection, certified erasure, refurbishment, recycling. GreenTechCycle: the platform that unifies your ITAD."
                : "L'ITAD n'est pas un produit. C'est une chaîne de preuves. 152 ETI clientes. 12 412 actifs traités. 45 tonnes de CO₂ évitées. 73 % de réemploi. Collecte, effacement certifié, reconditionnement, recyclage. GreenTechCycle : la plateforme qui unifie votre ITAD."}
            </p>
          </details>
        </div>
      </Section>

      {/* Écrans de la plateforme */}
      <Section tone="paper">
        <div className="reveal">
          <SectionHeader title={t("screenshots.title")} />
        </div>
        <div className="reveal-stagger grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {screenshotItems.map((item, index) => (
            <div key={index} className="reveal h-full">
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-track bg-bg-card p-8 text-center">
                <Monitor className="h-8 w-8 text-emerald" strokeWidth={1.75} aria-hidden="true" />
                <p className="mt-3 text-body-sm font-medium text-fg">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulaire §6.16 */}
      <section id="demo-form" className="border-t border-track bg-bg-card py-16 lg:py-24" aria-labelledby="demo-form-title">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <SectionHeader id="demo-form-title" title={t("form.title")} intro={t("form.subtitle")} />
          </div>
          <div className="rounded-xl border border-track bg-bg p-6 lg:p-8">
            {submitted ? (
              <div className="flex items-start gap-3" role="status">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald" aria-hidden="true" />
                <p className="text-body text-fg">{t("form.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="demo-name" className={label}>{t("form.fields.name")}</label>
                    <input id="demo-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={field} />
                  </div>
                  <div>
                    <label htmlFor="demo-company" className={label}>{t("form.fields.company")}</label>
                    <input id="demo-company" type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} required className={field} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="demo-email" className={label}>{t("form.fields.email")}</label>
                    <input id="demo-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={field} />
                  </div>
                  <div>
                    <label htmlFor="demo-phone" className={label}>{t("form.fields.phone")}</label>
                    <input id="demo-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="demo-equipment" className={label}>{t("form.fields.equipment")}</label>
                  <select id="demo-equipment" name="equipment" value={formData.equipment} onChange={handleChange} required className={field}>
                    <option value="">--</option>
                    {equipmentOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="demo-message" className={label}>{t("form.fields.message")}</label>
                  <textarea id="demo-message" name="message" value={formData.message} onChange={handleChange} rows={4} className={`${field} h-auto resize-y py-3`} />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {t("form.submit")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
