"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { FadeIn } from "@/components/motion";
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
  slots: string[];
  consent: boolean;
};

const TOTAL_STEPS = 4;

function emailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ReservationForm({ offerSlug }: { offerSlug: string | null }) {
  const t = useTranslations("reserver");

  const sizes = t.raw("form.sizes") as SelectOption[];
  const personas = t.raw("form.personas") as SelectOption[];
  const slots = t.raw("form.slots") as SelectOption[];

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "fallback" | "error">("idle");
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
    slots: [],
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

  const toggleSlot = (slotValue: string) => {
    setData((d) => {
      const exists = d.slots.includes(slotValue);
      if (exists) return { ...d, slots: d.slots.filter((s) => s !== slotValue) };
      if (d.slots.length >= 3) return d;
      return { ...d, slots: [...d.slots, slotValue] };
    });
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
      if (data.slots.length === 0) next.slots = t("form.errorSlot");
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
      const json = (await res.json()) as { success: boolean; reservation_id?: string; mode?: string };
      if (json.success && json.reservation_id) {
        const mode = json.mode === "fallback" ? "&mode=fallback" : "";
        router.push(`/reserver/merci?ref=${json.reservation_id}${mode}`);
        return;
      }
      setSubmitState("fallback");
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
      className="bg-white rounded-3xl border border-gray-150 shadow-xl shadow-[#0F172A]/5 p-6 lg:p-10 max-w-3xl mx-auto"
      aria-label="Formulaire de réservation"
    >
      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
          {stepCounter}
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`h-1.5 rounded-full transition-all ${
                i + 1 === step
                  ? "w-8 bg-[#10B981]"
                  : i + 1 < step
                  ? "w-4 bg-[#10B981]/60"
                  : "w-4 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1 — coordonnées */}
      {step === 1 && (
        <FadeIn>
          <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">
            {t("form.step1Title")}
          </h3>
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
        </FadeIn>
      )}

      {/* Step 2 — organisation */}
      {step === 2 && (
        <FadeIn>
          <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">
            {t("form.step2Title")}
          </h3>
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
        </FadeIn>
      )}

      {/* Step 3 — besoin */}
      {step === 3 && (
        <FadeIn>
          <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mb-6 tracking-tight">
            {t("form.step3Title")}
          </h3>
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
        </FadeIn>
      )}

      {/* Step 4 — créneaux + consent */}
      {step === 4 && (
        <FadeIn>
          <h3 className="text-xl lg:text-2xl font-bold text-[#0F172A] mb-2 tracking-tight">
            {t("form.step4Title")}
          </h3>
          <p className="text-[13px] text-gray-500 mb-6">{t("form.labels.slots")}</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {slots.map((s) => {
              const checked = data.slots.includes(s.value);
              const disabled = !checked && data.slots.length >= 3;
              return (
                <label
                  key={s.value}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition ${
                    checked
                      ? "bg-[#10B981]/8 border-[#10B981]/40"
                      : disabled
                      ? "bg-gray-50 border-gray-100 cursor-not-allowed opacity-60"
                      : "bg-white border-gray-200 hover:border-[#10B981]/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={disabled}
                    onChange={() => toggleSlot(s.value)}
                    className="mt-0.5 h-4 w-4 accent-[#10B981]"
                  />
                  <span className="text-[13px] text-[#0F172A] leading-snug">{s.label}</span>
                </label>
              );
            })}
          </div>
          {errors.slots && <p className="text-xs text-red-600 mb-4">{errors.slots}</p>}

          <label className="flex items-start gap-3 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={data.consent}
              onChange={(e) => update("consent", e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#10B981]"
            />
            <span className="text-[12px] text-gray-600 leading-relaxed">
              {t("form.labels.consent")}
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-600 mt-2">{errors.consent}</p>}
        </FadeIn>
      )}

      {/* Status banners */}
      {submitState === "fallback" && (
        <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-xl bg-[#FEF3F2] border border-[#F59E0B]/30">
          <AlertTriangle
            className="h-5 w-5 text-[#F59E0B] flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <p className="text-[13px] font-semibold text-[#0F172A] mb-1">{t("fallback.title")}</p>
            <p className="text-[12px] text-gray-600 leading-relaxed">{t("fallback.body")}</p>
            <a
              href="mailto:mahdi@greentechcycle.fr"
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#0F172A] underline underline-offset-4 mt-1"
            >
              {t("fallback.mailtoLabel")}
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
      {submitState === "error" && (
        <div className="mt-6 flex items-start gap-3 px-5 py-4 rounded-xl bg-[#FEF3F2] border border-red-300">
          <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-[13px] font-semibold text-[#0F172A] mb-1">{t("error.title")}</p>
            <p className="text-[12px] text-gray-600 leading-relaxed">{t("error.body")}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between gap-4 flex-wrap">
        {step > 1 ? (
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex items-center gap-2 text-[#0F172A] hover:text-[#10B981] font-semibold text-sm transition-colors"
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
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
          >
            {t("form.next")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#0E9F6E] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#10B981]/25 hover:-translate-y-0.5 text-sm"
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
   Sub-fields — kept inline for simplicity, no shared design-system needed
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
        className="block text-[10px] font-bold text-[#0F172A] mb-2 uppercase tracking-[0.12em]"
      >
        {label}
        {!optional && <span className="text-[#10B981] ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-[#0F172A] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] transition ${
          error ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-[#F8FAFC]"
        }`}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-600">{error}</p>}
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
        className="block text-[10px] font-bold text-[#0F172A] mb-2 uppercase tracking-[0.12em]"
      >
        {label}
        {!optional && <span className="text-[#10B981] ml-1">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-[#0F172A] text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] transition resize-y ${
          error ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-[#F8FAFC]"
        }`}
      />
      {error && <p className="mt-1.5 text-[11px] text-red-600">{error}</p>}
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
        className="block text-[10px] font-bold text-[#0F172A] mb-2 uppercase tracking-[0.12em]"
      >
        {label}
        <span className="text-[#10B981] ml-1">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-xl border text-[#0F172A] text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] transition ${
          error ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-[#F8FAFC]"
        }`}
      >
        <option value="">—</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-[11px] text-red-600">{error}</p>}
    </div>
  );
}

