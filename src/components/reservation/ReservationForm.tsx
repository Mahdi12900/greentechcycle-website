"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import SlotPicker from "@/components/reservation/SlotPicker";

import {
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Send,
} from "lucide-react";

type SelectOption = { value: string; label: string };

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  size: string;
  persona: string;
  sites: string;
  needs: string;
  message: string;
  appointmentStart: string;
  consent: boolean;
};

const TOTAL_STEPS = 4;

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ReservationForm({ offerSlug }: { offerSlug: string | null }) {
  const t = useTranslations("reserver");
  const isEn = useLocale() === "en";

  const sizes = t.raw("form.sizes") as SelectOption[];
  const personas = t.raw("form.personas") as SelectOption[];

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    size: "",
    persona: "",
    sites: "",
    needs: "",
    message: "",
    appointmentStart: "",
    consent: false,
  });

  const router = useRouter();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const n = { ...e };
        delete n[key as string];
        return n;
      });
    }
  };

  const validateStep = (s: number): boolean => {
    const next: Record<string, string> = {};
    if (s === 1) {
      if (!data.name.trim()) next.name = t("form.required");
      if (!data.email.trim()) next.email = t("form.required");
      else if (!emailIsValid(data.email)) next.email = t("form.errorEmail");
      if (!data.phone.trim()) next.phone = t("form.required");
    }
    if (s === 2) {
      if (!data.company.trim()) next.company = t("form.required");
      if (!data.size) next.size = t("form.required");
      if (!data.persona) next.persona = t("form.required");
    }
    if (s === 3) {
      if (!data.needs.trim()) next.needs = t("form.required");
    }
    if (s === 4) {
      if (!data.appointmentStart) next.appointmentStart = t("form.errorSlot");
      if (!data.consent) next.consent = t("form.required");
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };
  const goPrev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setSubmitting(true);
    setSubmitState("idle");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, offerSlug, source: "site-reserver" }),
      });
      const json = (await res.json()) as { success: boolean; reservation_id?: string };
      if (json.success && json.reservation_id) {
        router.push(`/reserver/merci?ref=${json.reservation_id}`);
        return;
      }
      setSubmitState("error");
    } catch (err) {
      console.error("Reservation submit failed", err);
      setSubmitState("error");
    } finally {
      setSubmitting(false);
    }
  };

  const stepCounter = useMemo(
    () => t("form.stepCounter", { current: step, total: TOTAL_STEPS }),
    [step, t]
  );

  return (
    <form
      onSubmit={submit}
      noValidate
      className="bg-bg-card rounded-2xl border border-track p-6 lg:p-10 max-w-3xl mx-auto"
      aria-label={isEn ? "Booking form" : "Formulaire de réservation"}
    >
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        <p className="uppercase text-fg-muted text-eyebrow">
          {stepCounter}
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-colors ${ i + 1 === step ? "w-8 bg-emerald" : i + 1 < step ? "w-4 bg-emerald/60" : "w-4 bg-track" }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1, coordonnées */}
      {step === 1 && (
        <div className="reveal">
          <h2 className="text-heading-lg text-fg mb-6">
            {t("form.step1Title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              id="r-name"
              label={t("form.labels.name")}
              placeholder={t("form.placeholders.name")}
              value={data.name}
              error={errors.name}
              onChange={(v) => update("name", v)}
              autoComplete="name"
            />
            <Field
              id="r-email"
              label={t("form.labels.email")}
              placeholder={t("form.placeholders.email")}
              value={data.email}
              error={errors.email}
              onChange={(v) => update("email", v)}
              type="email"
              autoComplete="email"
            />
            <Field
              id="r-phone"
              label={t("form.labels.phone")}
              placeholder={t("form.placeholders.phone")}
              value={data.phone}
              error={errors.phone}
              onChange={(v) => update("phone", v)}
              type="tel"
              autoComplete="tel"
              className="sm:col-span-2"
            />
          </div>
        </div>
      )}

      {/* Step 2, organisation */}
      {step === 2 && (
        <div className="reveal">
          <h2 className="text-heading-lg text-fg mb-6">
            {t("form.step2Title")}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              id="r-company"
              label={t("form.labels.company")}
              placeholder={t("form.placeholders.company")}
              value={data.company}
              error={errors.company}
              onChange={(v) => update("company", v)}
              autoComplete="organization"
              className="sm:col-span-2"
            />
            <SelectField
              id="r-size"
              label={t("form.labels.size")}
              value={data.size}
              error={errors.size}
              onChange={(v) => update("size", v)}
              options={sizes}
            />
            <SelectField
              id="r-persona"
              label={t("form.labels.persona")}
              value={data.persona}
              error={errors.persona}
              onChange={(v) => update("persona", v)}
              options={personas}
            />
          </div>
        </div>
      )}

      {/* Step 3, besoin */}
      {step === 3 && (
        <div className="reveal">
          <h2 className="text-heading-lg text-fg mb-6">
            {t("form.step3Title")}
          </h2>
          <div className="grid gap-4">
            <Field
              id="r-sites"
              label={t("form.labels.sites")}
              placeholder={t("form.placeholders.sites")}
              value={data.sites}
              error={errors.sites}
              onChange={(v) => update("sites", v)}
              optional
            />
            <TextareaField
              id="r-needs"
              label={t("form.labels.needs")}
              placeholder={t("form.placeholders.needs")}
              value={data.needs}
              error={errors.needs}
              onChange={(v) => update("needs", v)}
              rows={3}
            />
            <TextareaField
              id="r-message"
              label={t("form.labels.message")}
              placeholder={t("form.placeholders.message")}
              value={data.message}
              error={errors.message}
              onChange={(v) => update("message", v)}
              rows={3}
              optional
            />
          </div>
        </div>
      )}

      {/* Step 4, créneau réel + consent */}
      {step === 4 && (
        <div className="reveal">
          <h2 className="text-heading-lg text-fg mb-2">
            {t("form.step4Title")}
          </h2>
          <p className="text-body-sm text-fg-muted mb-6">{t("form.appointmentHint")}</p>
          <SlotPicker
            id="r-appointment"
            label={t("form.labels.appointment")}
            value={data.appointmentStart}
            onChange={(iso) => update("appointmentStart", iso)}
            error={errors.appointmentStart}
          />

          <label className="flex items-start gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald"
            />
            <span className="text-caption text-fg-strong leading-relaxed">
              {t("form.labels.consent")}
            </span>
          </label>
          {errors.consent && <p className="text-xs text-danger mt-2">{errors.consent}</p>}
        </div>
      )}

      {/* Status banner */}
      {submitState === "error" && (
        <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-dim border border-danger">
          <AlertTriangle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-body-sm font-semibold text-fg mb-1">{t("error.title")}</p>
            <p className="text-caption text-fg-strong leading-relaxed">{t("error.body")}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-track flex items-center justify-between gap-4 flex-wrap">
        {step > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-2 text-fg hover:text-emerald font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("form.previous")}
          </button>
        ) : (
          <span />
        )}
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-hover text-bg font-semibold px-6 py-3 rounded-xl transition-colors duration-150 hover:border-track-strong hover: text-sm"
          >
            {t("form.next")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-emerald hover:bg-emerald-hover disabled:opacity-60 disabled:cursor-not-allowed text-bg font-semibold px-7 py-3.5 rounded-xl transition-colors duration-150 hover:border-track-strong hover: text-sm"
          >
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
          </button>
        )}
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Sub-fields, kept inline for simplicity, no shared design-system needed
───────────────────────────────────────────────────────────────────────── */
function Field({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  optional,
  className = "",
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-fg mb-2 uppercase text-eyebrow"
      >
        {label}
        {!optional && <span className="text-emerald ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald transition ${ error ? "border-danger bg-amber-dim" : "border-track bg-bg-card" }`}
      />
      {error && <p className="mt-1.5 text-caption text-danger">{error}</p>}
    </div>
  );
}

function TextareaField({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  rows = 3,
  optional,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  rows?: number;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-fg mb-2 uppercase text-eyebrow"
      >
        {label}
        {!optional && <span className="text-emerald ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-fg text-sm placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald transition resize-y ${ error ? "border-danger bg-amber-dim" : "border-track bg-bg-card" }`}
      />
      {error && <p className="mt-1.5 text-caption text-danger">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  options: SelectOption[];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-fg mb-2 uppercase text-eyebrow"
      >
        {label}
        <span className="text-emerald ml-1">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-fg text-sm focus:outline-none focus:ring-2 focus:ring-emerald/40 focus:border-emerald transition ${ error ? "border-danger bg-amber-dim" : "border-track bg-bg-card" }`}
      >
        <option value="">-</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-caption text-danger">{error}</p>}
    </div>
  );
}

