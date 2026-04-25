# GreenTechCycle — Carbon methodology sources & emission factors

This document lists every source, framework, emission factor and assumption
used by the public `/impact` page, the `CarbonCalculator` component and the
ESRS E5 mapping. It is the single source of truth: any update to a coefficient
must be reflected here first, then propagated to the calculator constants.

Last review: 2026-04-25.

---

## 1. Frameworks & standards

| # | Framework | Version | URL |
|---|---|---|---|
| 1 | GHG Protocol Corporate Standard | 2015 revision | https://ghgprotocol.org/corporate-standard |
| 2 | GHG Protocol Corporate Value Chain (Scope 3) Standard | 2011 | https://ghgprotocol.org/corporate-value-chain-scope-3-standard |
| 3 | ISO 14064-1:2018 — GHG quantification & reporting at organisation level | 2018 | https://www.iso.org/standard/66453.html |
| 4 | ISO 14067:2018 — Carbon footprint of products | 2018 | https://www.iso.org/standard/71206.html |
| 5 | ADEME Méthode Bilan Carbone® v8.7 | May 2024 | https://www.bilancarbone-methode.com/ |
| 6 | ADEME Base Empreinte® (emission factor database) | v23, May 2024 | https://base-empreinte.ademe.fr/ |
| 7 | Boavizta API | v1.4, 2024 | https://github.com/Boavizta/boaviztapi |
| 8 | Boavizta Datavizta | 2024 | https://datavizta.boavizta.org/ |
| 9 | NEGAOCTET — Référentiel d'évaluation environnementale des services numériques | 2022 | https://negaoctet.org/ |
| 10 | Institut du Numérique Responsable (INR) — Référentiel GES Numérique | 2022 | https://institutnr.org/ |
| 11 | EFRAG ESRS E5 — Resource use and circular economy (Delegated Act 2023/2772) | July 2023 | https://www.efrag.org/lab6 |
| 12 | EFRAG ESRS XBRL Taxonomy | 2024 | https://www.efrag.org/News/Public-440/EFRAG-publishes-the-ESRS-XBRL-Taxonomy |
| 13 | NIST SP 800-88 Rev.1 — Guidelines for Media Sanitization | 2014 | https://csrc.nist.gov/publications/detail/sp/800-88/rev-1/final |
| 14 | R2v3 — Responsible Recycling standard (SERI) | 2023 update | https://sustainableelectronics.org/r2-standard |
| 15 | WEEELABEX — European WEEE treatment standard | 2022 update | https://weee-forum.org/weeelabex/ |

---

## 2. Manufacturing & refurbishment emission factors (kgCO2e per device)

Source-of-truth coefficients embedded in `src/components/CarbonCalculator.tsx`.

| Device | New manufacturing (kgCO2e) | Refurbishment (kgCO2e) | Net avoided (kgCO2e) | Source |
|---|---:|---:|---:|---|
| Laptop 14" pro grade | 169 | 17 | 152 | ADEME Base Empreinte v23, fiche `IT-PORTABLE-2024` |
| Desktop tower | 265 | 30 | 235 | ADEME Base Empreinte v23, fiche `IT-DESKTOP-2024` ; refurbishment ~11% via Boavizta API v1.4 |
| 24" LED display | 357 | 41 | 316 | ADEME Base Empreinte v23, fiche `IT-MONITOR-LED-24` ; HOP 2023 study |
| Server 1U | 1,500 | 150 | 1,350 | Boavizta `cloud_server_compute_1u` baseline, refurbishment ~10% |
| 48-port switch | 432 | 58 | 374 | Boavizta `network_switch_48p`, refurbishment ~13% |
| Smartphone | 57 | 6 | 51 | ADEME Base Empreinte v23, fiche `MOBILE-SMARTPHONE-2024` ; HOP 2023 |

### Annual operational use (kgCO2e/year)

Computed under the RTE 2024 French grid mix factor of **52 gCO2/kWh**
(direct emissions, MWh consumed in metropolitan France, 2024 average).

| Device | Yearly use (kgCO2e/yr) | Implicit electrical consumption |
|---|---:|---|
| Laptop | 25 | ~480 kWh/yr (8h/day, 220 days, 30 W average) |
| Desktop | 50 | ~960 kWh/yr (8h/day, 220 days, 60 W average) |
| Server 1U | 1,200 | ~23,000 kWh/yr (24/7, 350 W average) |
| Smartphone | 7 | ~135 kWh/yr (charge + standby) |

Use-phase emission factors are kept identical between the "buy new" and the
"GTC refurbishment" scenarios. This is a deliberately **conservative**
assumption: in practice, GTC also right-sizes fleets and removes legacy
power-hungry hardware, which would further decrease use-phase emissions —
but we do not credit that effect on the public calculator without a per-site
audit.

---

## 3. Equivalences

| Equivalence | Factor | Source |
|---|---|---|
| Combustion-car kilometer | 0.193 kgCO2e/km | ADEME Base Empreinte v23, fiche `voiture-particuliere-essence-moyenne-2024` |
| WEEE mass — laptop | 2.1 kg | EU WEEE Directive 2012/19/EU + ADEME ESR 2024 |
| WEEE mass — desktop | 8.5 kg | idem |
| WEEE mass — server 1U | 15.0 kg | idem |
| WEEE mass — smartphone | 0.2 kg | idem |
| Manufacturing-line € spread (laptop) | ~180 €/unit | GTC pricing observation 2025 (B-stock vs. grade-A refurb) |
| Manufacturing-line € spread (desktop) | ~220 €/unit | idem |
| Manufacturing-line € spread (server) | ~1,500 €/unit | idem |
| Manufacturing-line € spread (smartphone) | ~60 €/unit | idem |

---

## 4. Methodological choices

1. **System boundary**: cradle-to-grave (raw material extraction → use → end of life).
2. **Scope 3 categories covered**: 3.1 (purchased goods), 3.11 (use of sold products
   for as-a-service / leasing arrangements), 3.12 (end-of-life treatment).
3. **Functional unit**: 1 active device-year of service.
4. **Allocation method (refurbishment)**: Boavizta open allocation method —
   a refurbished asset is *not* re-counted under Scope 3.1 for the second user.
   This avoids double-counting and is consistent with ISO 14067 §7.4.
5. **Time horizon**: 100-year GWP (IPCC AR6).
6. **Geographical scope of the grid mix**: France metropolitan (RTE 2024 average).
   For multi-country deployments, GTC switches to per-country IEA / EEA grid mixes.
7. **Uncertainty treatment**: every coefficient inherits the uncertainty band
   provided by its source dataset. ADEME Base Empreinte fiches typically carry
   ±20% on manufacturing-phase factors and ±15% on use-phase factors.

---

## 5. Reporting deliverables (mapping to ESRS E5)

| Datapoint | Coverage | Format |
|---|---|---|
| E5-1 Policies | Documented (ITAD circular charter) | PDF + DOCX |
| E5-2 Actions & resources | Refurbished-asset register, certificates | PDF + Excel + REST API |
| E5-3 Targets | Per-site reuse / recovery targets, SBTi-aligned | PDF + Excel |
| E5-4 Resource inflows | Tonnages collected, recycled-content rate | Excel + API + XBRL |
| E5-5 Resource outflows | Reuse, recovery, disposal volumes; chain-of-custody | Excel + API + iXBRL (ESEF) |
| E5-6 Anticipated financial effects | Residual value, marginal abatement cost | PDF + Excel |

---

## 6. Audit trail

Each customer report shipped by GreenTechCycle includes:

- a **methodology annex** (this file in PDF form, dated and version-tagged),
- a **factor table** (CSV) listing every emission factor consumed and its source,
- a **chain-of-custody** export (CSV) with one row per asset (serial number,
  pickup date, erasure certificate hash SHA-256, destination, reuse status),
- a **reconciliation report** linking each kgCO2e in the headline figure
  back to a row of the factor table and the chain-of-custody.

This 4-layer audit trail is what makes the figures opposable for ISO 14064-1
verification and for ESRS E5 reasonable assurance under CSRD.

---

## 7. Change log

- **2026-04-25** — Initial public version. Migration from ADEME Base Empreinte v22
  to v23 (May 2024 release). Re-baseline of laptop manufacturing factor from
  156 to 169 kgCO2e (Apple/Lenovo/HP weighted average 2024 datasheets).
- *Older versions: see internal RSE Confluence space.*
