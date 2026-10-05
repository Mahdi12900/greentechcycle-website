"use client";

/**
 * CarbonCalculator
 * ----------------
 * Client-side carbon ROI calculator for enterprise IT fleets.
 *
 * Methodology
 * -----------
 * Compares two scenarios on an annual basis:
 *   A, "Buy new every cycle" (baseline). Manufacturing emissions of brand-new
 *       devices renewed each year at the user-configured renewal rate.
 *   B, "GTC refurbishment + lifetime extension". Manufacturing emissions
 *       reduced to the refurbishment-only emission factor.
 *
 * Avoided emissions are computed as:
 *   avoided_co2_kg = Σ (qty_i × renewal_rate × (EF_new_i − EF_refurb_i))
 *
 * Emission factors (kgCO2e per device, manufacturing/refurbishment)
 * sourced from ADEME Base Empreinte v23 (May 2024) and Boavizta API v1.4.
 * Annual usage emission factors are kept identical across scenarios because
 * we do not assume an energy-mix change between buying new vs. refurbished
 * (conservative assumption, see /docs/carbon-methodology-sources.md).
 *
 *   Laptop     , new manufacturing  : 169 kgCO2e   | refurbishment :  17 kgCO2e | use : 25 kgCO2e/yr
 *   Desktop    , new manufacturing  : 265 kgCO2e   | refurbishment :  30 kgCO2e | use : 50 kgCO2e/yr
 *   Server (1U), new manufacturing  : 1500 kgCO2e  | refurbishment : 150 kgCO2e | use : 1200 kgCO2e/yr
 *   Smartphone , new manufacturing  :  57 kgCO2e   | refurbishment :   6 kgCO2e | use : 7 kgCO2e/yr
 *
 * Equivalences:
 *   - Combustion-car km : 0.193 kgCO2e/km  (ADEME 2024 average passenger car)
 *   - WEEE mass per device (kg) :  laptop 2.1 | desktop 8.5 | server 15.0 | smartphone 0.2
 *   - Manufacturing-line € savings (per refurbished device replacement):
 *       laptop 180 € | desktop 220 € | server 1500 € | smartphone 60 €
 *     (illustrative public market spread between new B-stock and refurbished
 *      grade-A unit, GTC pricing observation 2025).
 */

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Calculator,
  Laptop,
  Monitor,
  Server,
  Smartphone,
  Leaf,
  Car,
  Euro,
  Recycle,
  ChevronDown,
  ChevronUp,
  Mail,
  ArrowRight,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Documented coefficients, see file header for sources
// -----------------------------------------------------------------------------

interface DeviceFactors {
  /** kgCO2e released when a brand-new device is manufactured */
  newFab: number;
  /** kgCO2e released when an existing device is refurbished by GTC */
  refurbFab: number;
  /** kgCO2e per year of operational use (identical across scenarios) */
  yearlyUse: number;
  /** kg of WEEE mass (waste of electrical and electronic equipment) per device */
  weeeKg: number;
  /** € avoided on the manufacturing line per refurbished replacement */
  euroSaving: number;
}

const FACTORS = {
  laptops: {
    newFab: 169,
    refurbFab: 17,
    yearlyUse: 25,
    weeeKg: 2.1,
    euroSaving: 180,
  } as DeviceFactors,
  desktops: {
    newFab: 265,
    refurbFab: 30,
    yearlyUse: 50,
    weeeKg: 8.5,
    euroSaving: 220,
  } as DeviceFactors,
  servers: {
    newFab: 1500,
    refurbFab: 150,
    yearlyUse: 1200,
    weeeKg: 15.0,
    euroSaving: 1500,
  } as DeviceFactors,
  smartphones: {
    newFab: 57,
    refurbFab: 6,
    yearlyUse: 7,
    weeeKg: 0.2,
    euroSaving: 60,
  } as DeviceFactors,
} as const;

/** ADEME 2024, average French passenger car, combustion engine */
const KG_CO2E_PER_CAR_KM = 0.193;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

interface FleetState {
  laptops: number;
  desktops: number;
  servers: number;
  smartphones: number;
  /** % of the fleet renewed each year (e.g. 25 ⇒ 4-year refresh cycle) */
  renewalRate: number;
  /** Average target life (years), informational, used to align renewal rate */
  usageYears: number;
}

const DEFAULT_FLEET: FleetState = {
  laptops: 1500,
  desktops: 600,
  servers: 80,
  smartphones: 1200,
  renewalRate: 25,
  usageYears: 4,
};

export default function CarbonCalculator() {
  const t = useTranslations("Impact.calculator");
  const [fleet, setFleet] = useState<FleetState>(DEFAULT_FLEET);
  const [methodOpen, setMethodOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const update = <K extends keyof FleetState>(key: K, value: number) =>
    setFleet((prev) => ({ ...prev, [key]: Math.max(0, value) }));

  // ---------------------------------------------------------------------------
  // Computation
  // ---------------------------------------------------------------------------
  const results = useMemo(() => {
    const renewalShare = Math.min(Math.max(fleet.renewalRate, 0), 100) / 100;

    type DeviceKey = "laptops" | "desktops" | "servers" | "smartphones";
    const deviceKeys: DeviceKey[] = [
      "laptops",
      "desktops",
      "servers",
      "smartphones",
    ];

    let avoidedCo2Kg = 0;
    let euroSaved = 0;
    let weeeAvoidedKg = 0;
    let scenarioANewKg = 0;
    let scenarioBRefurbKg = 0;

    for (const key of deviceKeys) {
      const qty = fleet[key];
      const f = FACTORS[key];
      const renewedPerYear = qty * renewalShare;

      // Annual manufacturing emissions per scenario
      const aManufKg = renewedPerYear * f.newFab;
      const bManufKg = renewedPerYear * f.refurbFab;

      // Annual use emissions (identical in both scenarios, conservative)
      const useKg = qty * f.yearlyUse;

      scenarioANewKg += aManufKg + useKg;
      scenarioBRefurbKg += bManufKg + useKg;

      avoidedCo2Kg += aManufKg - bManufKg;
      euroSaved += renewedPerYear * f.euroSaving;
      weeeAvoidedKg += renewedPerYear * f.weeeKg;
    }

    return {
      avoidedTco2: avoidedCo2Kg / 1000,
      avoidedCarKm: avoidedCo2Kg / KG_CO2E_PER_CAR_KM,
      euroSaved,
      weeeAvoidedKg,
      scenarioANewT: scenarioANewKg / 1000,
      scenarioBRefurbT: scenarioBRefurbKg / 1000,
    };
  }, [fleet]);

  const formatNumber = (n: number, decimals = 0) =>
    n.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || submitting) return;
    setSubmitting(true);
    setSubmitFailed(false);
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0] || "Visiteur",
          email,
          consent: true,
          topic: "commercial",
          source: "carbon-calculator",
          message: `Demande de rapport carbone personnalisé (simulateur /impact). Parc simulé : ${fleet.laptops} laptops, ${fleet.desktops} desktops, ${fleet.servers} serveurs, ${fleet.smartphones} smartphones. CO₂ évité estimé : ${formatNumber(results.avoidedTco2, 1)} tCO₂e/an.`,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("submit_failed");
      setSubmitted(true);
    } catch (err) {
      console.error("Carbon calculator email submit failed", err);
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const fields = t.raw("fields") as Record<string, string>;
  const outputs = t.raw("outputs") as Record<string, string>;

  return (
    <div className="bg-bg-card rounded-2xl border border-track overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-10 py-6 border-b border-track bg-emerald/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald text-bg flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-heading-lg text-fg">
              {t("title")}
            </h3>
            <p className="text-sm text-fg-strong">{t("subtitle")}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Inputs column */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-track">
          <h4 className="uppercase text-fg-strong mb-6 text-eyebrow">
            {t("inputsTitle")}
          </h4>

          <div className="space-y-5">
            <NumberField
              icon={<Laptop className="w-4 h-4" />}
              label={fields.laptops}
              value={fleet.laptops}
              onChange={(v) => update("laptops", v)}
            />
            <NumberField
              icon={<Monitor className="w-4 h-4" />}
              label={fields.desktops}
              value={fleet.desktops}
              onChange={(v) => update("desktops", v)}
            />
            <NumberField
              icon={<Server className="w-4 h-4" />}
              label={fields.servers}
              value={fleet.servers}
              onChange={(v) => update("servers", v)}
            />
            <NumberField
              icon={<Smartphone className="w-4 h-4" />}
              label={fields.smartphones}
              value={fleet.smartphones}
              onChange={(v) => update("smartphones", v)}
            />

            <div className="pt-4 border-t border-track grid grid-cols-2 gap-4">
              <NumberField
                label={fields.renewalRate}
                value={fleet.renewalRate}
                onChange={(v) => update("renewalRate", v)}
                suffix="%"
                max={100}
                compact
              />
              <NumberField
                label={fields.usageYears}
                value={fleet.usageYears}
                onChange={(v) => update("usageYears", v)}
                suffix="ans"
                max={15}
                compact
              />
            </div>
          </div>
        </div>

        {/* Results column */}
        <div className="p-6 md:p-10 bg-bg-card">
          {/* Scenario comparison */}
          <h4 className="uppercase text-fg-strong mb-4 text-eyebrow">
            {t("scenarioTitle")}
          </h4>
          <div className="space-y-3 mb-6">
            <ScenarioBar
              label={t("scenarioA")}
              value={results.scenarioANewT}
              max={Math.max(results.scenarioANewT, results.scenarioBRefurbT, 1)}
              color="bg-amber"
              suffix="tCO₂e/an"
            />
            <ScenarioBar
              label={t("scenarioB")}
              value={results.scenarioBRefurbT}
              max={Math.max(results.scenarioANewT, results.scenarioBRefurbT, 1)}
              color="bg-emerald"
              suffix="tCO₂e/an"
            />
          </div>

          {/* Outputs */}
          <h4 className="uppercase text-fg-strong mb-4 text-eyebrow">
            {t("outputsTitle")}
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <OutputCard
              icon={<Leaf className="w-5 h-5" />}
              value={formatNumber(results.avoidedTco2, 1)}
              label={outputs.co2}
              accent="text-emerald"
            />
            <OutputCard
              icon={<Car className="w-5 h-5" />}
              value={formatNumber(results.avoidedCarKm, 0)}
              label={outputs.carKm}
              accent="text-emerald"
            />
            <OutputCard
              icon={<Euro className="w-5 h-5" />}
              value={formatNumber(results.euroSaved, 0)}
              label={outputs.money}
              accent="text-amber"
            />
            <OutputCard
              icon={<Recycle className="w-5 h-5" />}
              value={formatNumber(results.weeeAvoidedKg, 0)}
              label={outputs.weee}
              accent="text-emerald"
            />
          </div>

          {/* Disclaimer */}
          <p className="mt-5 text-xs text-fg-strong leading-relaxed">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      {/* Email capture */}
      <div className="border-t border-track bg-bg-card px-6 md:px-10 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <p className="text-base font-semibold text-fg flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald" />
              {t("ctaResults")}
            </p>
            <p className="text-sm text-fg-strong mt-1">{t("ctaResultsHint")}</p>
          </div>
          {submitted ? (
            <p className="text-sm text-emerald font-medium bg-emerald-dim border border-emerald/30 rounded-lg px-4 py-3">
              {t("emailSuccess")}
            </p>
          ) : (
            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="flex-1 lg:w-72 px-4 py-3 rounded-lg border border-track focus:border-emerald focus:ring-2 focus:ring-emerald/25 outline-none text-sm"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-emerald hover:bg-emerald-hover disabled:opacity-60 disabled:cursor-not-allowed text-bg font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
                >
                  {t("emailSubmit")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              {submitFailed && (
                <p className="mt-2 text-xs text-danger">{t("emailError")}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Methodology accordion */}
      <div className="border-t border-track px-6 md:px-10 py-5">
        <button
          type="button"
          onClick={() => setMethodOpen((v) => !v)}
          className="w-full flex items-center justify-between text-left text-sm font-semibold text-fg hover:text-emerald transition-colors"
          aria-expanded={methodOpen}
        >
          <span className="inline-flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            {t("methodToggle")}
          </span>
          {methodOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {methodOpen && (
          <div className="mt-4 text-sm text-fg-strong leading-relaxed bg-bg-card rounded-xl p-5 border border-track">
            <p className="font-semibold text-fg mb-2">{t("methodTitle")}</p>
            <p>{t("methodBody")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Subcomponents
// -----------------------------------------------------------------------------

function NumberField({
  icon,
  label,
  value,
  onChange,
  suffix,
  max,
  compact = false,
}: {
  icon?: React.ReactNode;
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  max?: number;
  compact?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-fg-strong mb-1.5 flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full ${ compact ? "px-3 py-2 text-base" : "px-4 py-2.5 text-lg" } font-semibold text-fg rounded-lg border border-track focus:border-emerald focus:ring-2 focus:ring-emerald/25 outline-none transition-colors bg-bg-card`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fg-strong font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function ScenarioBar({
  label,
  value,
  max,
  color,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix: string;
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-fg">{label}</span>
        <span className="text-xs font-semibold text-fg">
          {value.toLocaleString("fr-FR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}{" "}
          {suffix}
        </span>
      </div>
      <div className="h-3 bg-bg-card rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-colors duration-150`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function OutputCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: string;
}) {
  return (
    <div className="bg-bg-card rounded-xl p-4 border border-track">
      <div className={`flex items-center gap-2 mb-2 ${accent}`}>{icon}</div>
      <div className="text-xl md:text-2xl font-semibold text-fg leading-tight">
        {value}
      </div>
      <div className="text-caption text-fg-strong mt-1 leading-snug">{label}</div>
    </div>
  );
}
