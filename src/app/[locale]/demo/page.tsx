"use client";

import FilmPlayer from "@/components/visuals/FilmPlayer";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button, ButtonLink } from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import SlotPicker from "@/components/reservation/SlotPicker";
import { Monitor, Send, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function DemoPage() {
  const t = useTranslations("Demo");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    equipment: "",
    message: "",
    appointmentStart: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const screenshotItems = t.raw("screenshots.items") as string[];
  const equipmentOptions = t.raw("form.equipmentOptions") as string[];

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = t("form.required");
    if (!formData.company.trim()) next.company = t("form.required");
    if (!formData.email.trim()) next.email = t("form.required");
    else if (!emailIsValid(formData.email)) next.email = t("form.errorEmail");
    if (!formData.phone.trim()) next.phone = t("form.required");
    if (!formData.equipment) next.equipment = t("form.required");
    if (!formData.appointmentStart) next.appointmentStart = t("form.errorAppointment");
    if (!formData.consent) next.consent = t("form.required");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || submitting) return;
    setSubmitting(true);
    setSubmitState("idle");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          needs: formData.equipment,
          message: formData.message,
          appointmentStart: formData.appointmentStart,
          consent: formData.consent,
          source: "demo",
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("submit_failed");
      setSubmitState("success");
    } catch (err) {
      console.error("Demo submit failed", err);
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const label = "block text-body-sm font-medium text-fg";
  const field =
    "mt-2 h-11 w-full rounded-lg border border-track bg-bg px-3 text-body text-fg placeholder:text-fg-muted focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/25";

  return (
    <div>
      {/* Hero : titre + vidéo de présentation en grand, juste sous le titre */}
      <section className="bg-bg pb-16 pt-12 lg:pb-24 lg:pt-16" aria-labelledby="demo-title">
        <div className="mx-auto max-w-site px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <h1 id="demo-title" className="max-w-[20ch] text-display-lg text-fg">{t("hero.title")}</h1>
            <p className="mt-6 max-w-[65ch] text-body-lg text-fg-strong">{t("hero.subtitle")}</p>
          </div>
          <figure className="mx-auto mt-10 max-w-[1100px]" aria-labelledby="demo-video-title">
            <h2 id="demo-video-title" className="mb-4 text-display-sm text-fg">{t("video.title")}</h2>
            <FilmPlayer id="brand-film" placement="demo" />
            <figcaption className="mt-3 text-caption text-fg-muted">{t("video.placeholder")}</figcaption>
          </figure>
          <div className="mt-10">
            <ButtonLink href="#demo-form" size="lg">{t("form.submit")}</ButtonLink>
          </div>
        </div>
      </section>

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
      <section id="demo-form" className="border-t border-track bg-bg-card py-12 lg:py-16" aria-labelledby="demo-form-title">
        <div className="mx-auto max-w-[calc(720px+4rem)] px-5 sm:px-6 lg:px-8">
          <div className="reveal">
            <SectionHeader id="demo-form-title" title={t("form.title")} intro={t("form.subtitle")} />
          </div>
          <div className="rounded-xl border border-track bg-bg p-6 lg:p-8">
            {submitState === "success" ? (
              <div className="flex items-start gap-3" role="status">
                <CheckCircle className="h-6 w-6 flex-shrink-0 text-emerald" aria-hidden="true" />
                <p className="text-body text-fg">{t("form.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="demo-name" className={label}>{t("form.fields.name")}</label>
                    <input id="demo-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} aria-invalid={!!errors.name} className={`${field} ${errors.name ? "border-danger bg-amber-dim" : ""}`} />
                    {errors.name && <p className="mt-1.5 text-caption text-danger">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="demo-company" className={label}>{t("form.fields.company")}</label>
                    <input id="demo-company" type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} aria-invalid={!!errors.company} className={`${field} ${errors.company ? "border-danger bg-amber-dim" : ""}`} />
                    {errors.company && <p className="mt-1.5 text-caption text-danger">{errors.company}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="demo-email" className={label}>{t("form.fields.email")}</label>
                    <input id="demo-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} aria-invalid={!!errors.email} className={`${field} ${errors.email ? "border-danger bg-amber-dim" : ""}`} />
                    {errors.email && <p className="mt-1.5 text-caption text-danger">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="demo-phone" className={label}>{t("form.fields.phone")}</label>
                    <input id="demo-phone" type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} aria-invalid={!!errors.phone} className={`${field} ${errors.phone ? "border-danger bg-amber-dim" : ""}`} />
                    {errors.phone && <p className="mt-1.5 text-caption text-danger">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="demo-equipment" className={label}>{t("form.fields.equipment")}</label>
                  <select id="demo-equipment" name="equipment" value={formData.equipment} onChange={handleChange} aria-invalid={!!errors.equipment} className={`${field} ${errors.equipment ? "border-danger bg-amber-dim" : ""}`}>
                    <option value="">--</option>
                    {equipmentOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.equipment && <p className="mt-1.5 text-caption text-danger">{errors.equipment}</p>}
                </div>
                <div>
                  <label htmlFor="demo-message" className={label}>{t("form.fields.message")}</label>
                  <textarea id="demo-message" name="message" value={formData.message} onChange={handleChange} rows={4} className={`${field} h-auto resize-y py-3`} />
                </div>

                <p className="text-caption text-fg-muted">{t("form.appointmentHint")}</p>
                <SlotPicker
                  id="demo-appointment"
                  label={t("form.fields.appointment")}
                  value={formData.appointmentStart}
                  onChange={(iso) => {
                    setFormData((d) => ({ ...d, appointmentStart: iso }));
                    if (errors.appointmentStart) setErrors((er) => ({ ...er, appointmentStart: "" }));
                  }}
                  error={errors.appointmentStart}
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData((d) => ({ ...d, consent: e.target.checked }));
                      if (errors.consent) setErrors((er) => ({ ...er, consent: "" }));
                    }}
                    className="mt-1 h-4 w-4 accent-emerald"
                  />
                  <span className="text-caption text-fg-strong leading-relaxed">{t("form.consent")}</span>
                </label>
                {errors.consent && <p className="text-caption text-danger">{errors.consent}</p>}

                {submitState === "error" && (
                  <div className="flex items-start gap-3 rounded-xl border border-danger bg-amber-dim px-5 py-4">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-danger" aria-hidden="true" />
                    <div>
                      <p className="text-body-sm font-semibold text-fg mb-1">{t("form.errorTitle")}</p>
                      <p className="text-caption text-fg-strong leading-relaxed">{t("form.errorBody")}</p>
                    </div>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t("form.submit")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
