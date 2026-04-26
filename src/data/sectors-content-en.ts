import type { SectorContent, SectorSlug, MatrixRow } from "./sectors";
import type { PhaseData } from "./sectors-content-fr";

/* ═══════════════════════════════════════════════════════════════════════════
   CONTENT EN — 16 SECTOR PAGES
   ═══════════════════════════════════════════════════════════════════════════ */

export const sectorContentEn: Record<SectorSlug, SectorContent> = {
  finance: {
    hero: { title: "Banking, insurance & financial services", subtitle: "DORA, NIS2, ACPR/AMF, CSRD — secure the lifecycle of your critical IT assets within one of Europe's strictest regulatory frameworks." },
    profile: {
      description: "The European financial sector operates under one of the world's most rigorous regulatory frameworks. With 20,000 to 100,000 workstations per retail bank, IT asset lifecycle management is a massive challenge at the intersection of data security, regulatory compliance and environmental responsibility.",
      regulations: "DORA (effective January 2025) mandates full traceability of ICT operational resilience, including third-party providers such as ITAD. NIS2 strengthens cyber obligations. ACPR and AMF require auditable evidence. CSRD mandates granular ESG reporting, and GDPR strictly governs personal data destruction.",
    },
    painPoints: [
      "Customer data leakage risk combines GDPR and banking secrecy requirements. A single improperly erased hard drive in a branch can trigger a major reputational crisis and cascading regulatory sanctions.",
      "Since January 2025, DORA requires end-to-end ICT operational resilience tracing, including third-party providers. Your ITAD chain must now be documented, audited and resilient.",
      "ACPR auditors demand an irrefutable chain of custody for every decommissioned asset. A shared Excel file among three providers no longer suffices.",
      "Physical destruction costs (€10-30 per device) accumulate on volumes of tens of thousands of units per year — while a significant share could be refurbished and resold.",
      "ESG data must be consolidated across multi-country, multi-subsidiary structures, each with its own processes and providers.",
      "The reputational risk of a poorly erased device remains every banking CISO's nightmare.",
    ],
    useCases: [
      { title: "Post-merger renewal: accelerated inventory and auditor traceability", description: "During a banking merger, 30-40% of the IT estate becomes redundant. GreenTechCycle deploys ITAM connectors for a full inventory in 2-3 weeks, applies automated decisioning, and generates a complete chain of custody for post-merger auditors." },
      { title: "DORA compliance: ITAD provider registry and incident tracking", description: "DORA requires an up-to-date registry of all third-party ICT providers. GreenTechCycle centralizes ITAD chain information — R2v3 certifications, ISO 27001, SLAs, incident tracking — and generates ACPR exports in one click." },
      { title: "CSRD ESRS E5 multi-subsidiary reporting", description: "With 5 to 30 entities across multiple countries, consolidating IT end-of-life data is challenging. GreenTechCycle centralizes flows, calculates ESRS E5 indicators by entity and group, and produces an auditable report." },
      { title: "Waki Box in bank branches", description: "With 500-2,000 branches, small WEEE accumulates everywhere. The Waki Box provides fleet-wide granularity: every deposit is tracked, collections are optimized by route, and HQ gets a real-time dashboard." },
    ],
    roi: [
      { lever: "Partial ITAD insourcing", gain: "-30 to 40% on annual ITAD costs" },
      { lever: "Eligible device refurbishment", gain: "+€80-150 per refurbished workstation" },
      { lever: "Reporting automation", gain: "-0.5 to 1 FTE on ESG/compliance reporting" },
      { lever: "DORA/GDPR penalty avoidance", gain: "Up to 2% of global revenue" },
      { lever: "Measured carbon impact", gain: "300 kgCO₂e avoided per refurbished workstation" },
    ],
    personas: [
      { role: "CISO", description: "Ensures data security throughout the asset lifecycle, responsible for DORA ICT compliance." },
      { role: "CIO", description: "Drives fleet renewals, balancing cost, security and sustainability." },
      { role: "Compliance Officer", description: "Verifies regulatory compliance of every process, interfaces with ACPR and AMF." },
      { role: "CSR Director", description: "Owns CSRD objectives and consolidates multi-entity environmental data." },
      { role: "Indirect Procurement", description: "Negotiates ITAD contracts, optimizes costs while ensuring service quality." },
    ],
    quote: "GTC is the only platform that reconciles DORA, NIS2 and CSRD obligations on your IT estate in real time. Your ACPR auditors see the same data as your CISO and CSR Director.",
    objections: [
      { question: "We already have ServiceNow and Iron Mountain", answer: "GreenTechCycle orchestrates, it doesn't replace. The platform integrates with your existing tools and coordinates your physical providers, adding the traceability, scoring and reporting layer each one lacks." },
      { question: "Our data is too sensitive for a third-party platform", answer: "Hosted in France (Supabase eu-west-1), GDPR-compliant, ISO 27001 certified, multi-tenant isolation via Row Level Security, annual penetration testing." },
      { question: "The cost seems high compared to our current contracts", answer: "The real TCO includes FTEs mobilized, uncovered regulatory risk, and unrecovered residual value. Our banking clients see ROI in 8-12 months." },
    ],
    cta: { title: "Secure your financial ITAD", button: "Request a DORA audit" },
  },

  sante: {
    hero: { title: "Healthcare & hospitals", subtitle: "HDS, GDPR Article 9, NIS2 — protect patient data while unlocking value from your hospital IT estate." },
    profile: {
      description: "The healthcare sector manages some of the most sensitive data in existence: patient records, medical imaging, test results. With 5,000 to 50,000 workstations per university hospital, plus medical tablets and imaging equipment storing local data, ITAD management is a security, logistics and budget challenge.",
      regulations: "Health Data Hosting (HDS) strictly governs patient data processing. GDPR Article 9 protects health data as a special category. MDR governs medical devices. NIS2 classifies healthcare facilities as essential service operators.",
    },
    painPoints: [
      "Distinguishing patient-data equipment from administrative workstations is essential but rarely automated.",
      "Public hospital budget pressure makes every euro count.",
      "Multi-site facilities (5-30 buildings) each have different ITAD processes, creating risk and cost overruns.",
      "The reputational and legal risk of a patient data breach is considerable.",
      "Listed private hospital groups face growing CSRD reporting obligations.",
      "End-of-life imaging equipment (MRI, CT scanners) contain locally stored patient images.",
    ],
    useCases: [
      { title: "Certified erasure of end-of-life medical devices", description: "MRI and CT scanners store patient images locally. GreenTechCycle orchestrates NIST 800-88 Purge erasure with a CNIL-compliant certificate during replacement cycles." },
      { title: "Unified multi-site platform for university hospitals", description: "A typical university hospital has 12 sites with 12 different ITAD processes. GreenTechCycle unifies inventories and applies a consistent security policy." },
      { title: "Value recovery from administrative equipment", description: "Administrative workstations (finance, HR, reception) don't contain patient data and are eligible for refurbishment. On 10,000 workstations, €50-100 per device represents €500K-1M." },
      { title: "Waki Box in wards and reception areas", description: "Blood pressure monitors, oximeters, bed remotes, batteries — the Waki Box secures small WEEE, prevents lithium battery fire risks, and traces every deposit." },
    ],
    roi: [
      { lever: "Administrative equipment recovery", gain: "€60-90 per eligible workstation" },
      { lever: "Certified destruction optimization", gain: "-25 to 35% on costs" },
      { lever: "GDPR Article 9 penalty avoidance", gain: "Up to 4% of revenue" },
      { lever: "Centralized WEEE logistics", gain: "-0.3 to 0.5 FTE/year" },
      { lever: "Lithium battery fire safety", gain: "Risk eliminated via controlled collection" },
    ],
    personas: [
      { role: "Hospital CIO", description: "Drives digital transformation and IT budget priorities." },
      { role: "CISO", description: "Defines data security policy and validates erasure levels by equipment category." },
      { role: "Logistics Director", description: "Coordinates physical flows across sites." },
      { role: "Hospital Procurement", description: "Uses public purchasing frameworks." },
      { role: "CSRD Referent (private groups)", description: "Consolidates environmental data for listed hospital groups." },
    ],
    quote: "GTC enables your facility to meet GDPR health data obligations while recovering value from your administrative fleet. The platform automatically distinguishes your sensitive equipment from your administrative assets.",
    objections: [
      { question: "We buy through UGAP", answer: "GreenTechCycle is eligible for public purchasing frameworks. We support public procurement tender documentation." },
      { question: "Our CISO requires physical destruction everywhere", answer: "GreenTechCycle fully respects your CISO's policy. Physical destruction for sensitive equipment, refurbishment only for CISO-validated administrative workstations." },
    ],
    cta: { title: "Secure your hospital ITAD", button: "Request a healthcare audit" },
  },

  industrie: {
    hero: { title: "Industry & manufacturing", subtitle: "CSRD, ISO 14001, REACH/RoHS — unify IT and OT lifecycle management across your industrial sites to meet OEM ESG requirements." },
    profile: {
      description: "French industry operates at the crossroads of two technology worlds: classic IT and OT (PLCs, sensors, ATEX terminals, HMIs). This duality, combined with geographically isolated sites and growing OEM ESG pressure, makes technology asset lifecycle management particularly complex.",
      regulations: "CSRD applies to large industries and their subcontractors via OEM requirements. ISO 14001 governs environmental management. REACH and RoHS regulate hazardous substances. Environmental codes mandate WEEE traceability.",
    },
    painPoints: [
      "Isolated industrial sites make ITAD logistics costly and complex.",
      "OEM ESG pressure is now a direct commercial issue — when Renault, Airbus or Total ask for precise WEEE data, contract renewal depends on the answer.",
      "Equipment reuse sometimes faces legal blocks related to IP and industrial secrets.",
      "OT equipment (HMIs, PLCs, field terminals) often escapes classic IT management.",
      "Industrial battery volumes (forklifts, portable tools) represent a major environmental and safety challenge.",
      "Each site having its own ITAD contract means costs are rarely optimized.",
    ],
    useCases: [
      { title: "OEM CSRD reporting: from 5 days to 5 minutes", description: "GreenTechCycle automates ESG report production and turns this constraint into a commercial advantage: a client ESG dossier ready in 5 minutes instead of 5 days." },
      { title: "Unified IT + OT management", description: "GreenTechCycle integrates IT and OT equipment in a single repository with OT-specific rules: adapted scoring, specific components, industrial secret compliance." },
      { title: "Multi-site logistics optimization", description: "15 industrial sites with 15 different ITAD contracts — GreenTechCycle consolidates flows and generates 30-40% logistics savings." },
      { title: "Waki Box for workshops and production areas", description: "Sensors, transmitters, tool chargers, walkie-talkies — the Waki Box centralizes small WEEE flows and feeds site environmental reporting." },
    ],
    roi: [
      { lever: "Multi-site contract consolidation", gain: "-30 to 40% on ITAD costs" },
      { lever: "IT workstation refurbishment", gain: "+€50-100 per workstation" },
      { lever: "ESG commercial advantage", gain: "Direct revenue impact (faster RFP response)" },
      { lever: "REACH/RoHS penalty avoidance", gain: "Up to €7,500 per violation" },
      { lever: "CSR/QSE reporting automation", gain: "-0.5 FTE" },
    ],
    personas: [
      { role: "CIO / Industrial IT Manager", description: "Manages a hybrid IT/OT estate across multiple sites." },
      { role: "QSE Manager", description: "Carries ISO 14001 certifications and environmental compliance." },
      { role: "CSR Director", description: "Consolidates ESG data and responds to OEM questionnaires." },
      { role: "Industrial Director", description: "Arbitrates investments and multi-site operational optimizations." },
      { role: "Procurement", description: "Negotiates framework contracts and seeks savings on indirect services." },
    ],
    quote: "Your OEM clients demand increasingly precise ESG data. With GTC, client ESG dossier in 5 minutes instead of 5 days.",
    objections: [
      { question: "Our OT equipment has 15-20 year cycles, it's not classic IT", answer: "That's exactly why you have no visibility on their end-of-life. GreenTechCycle integrates OT with specific rules." },
      { question: "We have a global contract with Veolia/Suez/Paprec", answer: "GreenTechCycle sits on top of your existing physical operators, adding the data, traceability and reporting layer they don't provide." },
    ],
    cta: { title: "Unify your industrial ITAD", button: "Request a multi-site audit" },
  },

  retail: {
    hero: { title: "Retail & mass distribution", subtitle: "CSRD, PCI DSS, GDPR — turn your regulatory obligation into a marketing advantage across hundreds of stores." },
    profile: {
      description: "Retail and mass distribution operate dense networks of 100 to 1,000 stores with massive standardized IT estates: POS systems, payment terminals, electronic shelf labels, scanners, back offices. Reverse logistics is an operational nightmare, while CSRD pressure and ESG storytelling transform this constraint into a strategic opportunity.",
      regulations: "CSRD applies to listed retailers with ESRS E5 waste requirements. PCI DSS strictly governs payment terminal erasure. GDPR protects customer data collected in-store.",
    },
    painPoints: [
      "Reverse logistics is a nightmare in retail — collecting equipment from 500-2,000 stores without centralized visibility.",
      "Payment terminals and POS systems store customer banking data. PCI DSS non-compliance can result in fines up to €100,000 per violation.",
      "Massive volumes of small WEEE are often discarded without sorting or traceability.",
      "CSRD Scope 3 pressure now includes electronic waste.",
      "ESG storytelling has become a critical competitive lever.",
      "Coordination between HQ and franchised stores adds complexity.",
    ],
    useCases: [
      { title: "PCI DSS certified erasure of payment terminals and POS systems", description: "500 stores with 5,000-10,000 terminals renewed every 5-7 years. GreenTechCycle applies NIST 800-88 with individual PCI DSS certificates per device." },
      { title: "Waki Box in every store: brand tool and centralized management", description: "The Waki Box serves as collection point for scanner batteries, internal WEEE, and even customer deposits (take-back program for stores over 200m²)." },
      { title: "Consolidated group CSRD reporting: 800 stores, one report", description: "GreenTechCycle automatically centralizes flows from every store and generates a consolidated CSRD report with ESRS E5 granularity." },
      { title: "POS renewal optimization", description: "Scoring identifies POS systems with 1-2 years of remaining life for reallocation to lower-traffic stores, saving €200-500 per reused unit." },
    ],
    roi: [
      { lever: "Per-unit terminal erasure", gain: "-€15-20 per device" },
      { lever: "Back-office refurbishment", gain: "+€80-120 per workstation" },
      { lever: "Multi-store logistics optimization", gain: "-35 to 45% on costs" },
      { lever: "ESG storytelling and acquisition", gain: "Measurable footfall impact" },
      { lever: "PCI DSS avoidance", gain: "Up to €100,000 per violation" },
    ],
    personas: [
      { role: "Group CIO", description: "Drives network IT strategy and national fleet renewals." },
      { role: "CSR / Sustainability Director", description: "Owns environmental commitments and CSRD reporting." },
      { role: "Store Operations Director", description: "Coordinates logistics and operational processes in stores." },
      { role: "PCI DSS Officer", description: "Ensures banking data processing compliance, including end-of-life." },
      { role: "Marketing Director", description: "Leverages ESG commitments in brand communication." },
    ],
    quote: "GTC lets you turn your CSRD obligation into a marketing advantage. Imagine every store equipped with a connected box measuring WEEE and CO₂ in real time, feeding your group report AND your customer communication.",
    objections: [
      { question: "Our stores are franchised, we don't control their IT", answer: "GreenTechCycle offers a hybrid model. Platform and Waki Box provided by HQ as a franchisee CSR kit at no cost to franchisees." },
      { question: "We already have eco-organization agreements", answer: "Your agreements remain valid. GreenTechCycle adds the data and reporting layer eco-organizations don't provide." },
    ],
    cta: { title: "Turn your retail ITAD into a competitive advantage", button: "Request a network demo" },
  },

  energie: {
    hero: { title: "Energy & utilities", subtitle: "NIS2, CSRD, ANSSI — manage IT and OT lifecycles across your critical infrastructure with the granularity regulators and investors demand." },
    profile: {
      description: "The energy sector combines critical infrastructure, very long OT lifecycles, massive volumes of connected equipment (smart meters) and unparalleled ESG pressure. Operators like EDF, Engie, Veolia and TotalEnergies run considerable internal data centers, thousands of distributed sites, and face unprecedented renewal waves.",
      regulations: "NIS2 classifies energy operators as essential service operators (fines up to €10M or 2% of revenue). CSRD places energy companies on the ESG frontline. ANSSI imposes specific cybersecurity requirements for critical infrastructure.",
    },
    painPoints: [
      "Massive volumes of end-of-life smart meters represent an unprecedented logistics challenge. The 35 million Linky meters deployed 2015-2021 will reach end-of-life in waves starting 2030.",
      "Internal data centers contain thousands of servers renewed every 4-6 years with sensitive data.",
      "OT security for critical infrastructure prohibits any approximation in end-of-life management.",
      "Energy companies are on the CSRD frontline, scrutinized by ESG analysts.",
      "Distributed sites multiply collection points across the territory.",
      "Atypical lifecycle coexistence: short for smart meters, medium for IT, long for industrial OT.",
    ],
    useCases: [
      { title: "Smart meter decommissioning: anticipating the 2030 wave", description: "35 million Linky meters deployed 2015-2021 will reach end-of-life in massive waves. GreenTechCycle traces individual decommissioning, orchestrates consumption data erasure, and organizes recycling." },
      { title: "Internal data center ITAD: security and value recovery", description: "Thousands of servers renewed every 4-6 years. GreenTechCycle orchestrates R2v3 + ISO 27001 erasure, maximizes residual value (€100-500 per server) and produces ANSSI-required certificates." },
      { title: "Frontline CSRD reporting: the rigor analysts demand", description: "GreenTechCycle produces ESRS E5 indicators of superior granularity and reliability, directly usable in your CSRD declaration and investor roadshows." },
      { title: "Waki Box for distributed sites", description: "Electrical substations, relay stations, mobile teams: the Waki Box centralizes small WEEE flows and automatically feeds each site's environmental reporting." },
    ],
    roi: [
      { lever: "Data center operator optimization", gain: "-50% on specialized costs" },
      { lever: "Smart meter volume", gain: "-€3-5 per unit on processing" },
      { lever: "Server refurbishment", gain: "+€100-500 per eligible server" },
      { lever: "NIS2 avoidance", gain: "Up to €10M or 2% of revenue" },
      { lever: "Improved ESG rating", gain: "Direct impact on market valuation" },
    ],
    personas: [
      { role: "Group CIO", description: "Drives IT strategy for a multi-business group at national or European scale." },
      { role: "CISO / Cyber", description: "Responsible for information security including critical equipment decommissioning." },
      { role: "Group CSR Director", description: "Owns sustainability objectives and coordinates group-level CSRD reporting." },
      { role: "Network Operations Director", description: "Manages distributed infrastructure and field equipment lifecycles." },
      { role: "Sustainability", description: "Defines environmental strategy, interfaces with ESG analysts." },
    ],
    quote: "As an NIS2 essential operator and ESG-scrutinized entity, you cannot afford an opaque ITAD chain. GTC gives you the granular visibility that regulators and investors demand.",
    objections: [
      { question: "Our OT cycles are 10-15 years, it's not urgent", answer: "Now is exactly the right time to prepare. The Linky wave and data center renewals arrive in 4-6 years." },
      { question: "Our data is classified, impossible to put on an external platform", answer: "GreenTechCycle offers on-premise deployment for very high sensitivity environments, installed on your infrastructure under your full control." },
    ],
    cta: { title: "Prepare your energy ITAD", button: "Request an infrastructure audit" },
  },

  "transport-logistique": {
    hero: { title: "Transport & logistics", subtitle: "CSRD, sensitive sites, massive fleets — manage the lifecycle of tens of thousands of mobile terminals across critical infrastructure." },
    profile: {
      description: "Transport operators (SNCF, Air France, RATP, ADP), shipping companies, road carriers and logistics providers (Geodis, FM Logistic, Bolloré) operate massive, heterogeneous IT fleets across sensitive sites.",
      regulations: "CSRD applies to major transport companies with particular attention to Scope 3 IT. Sensitive sites (airports, ports, stations) impose strict access controls. Aviation, rail and maritime security regulations govern digital equipment management.",
    },
    painPoints: [
      "Fleets of 10,000-100,000 PDAs require structured lifecycle management with per-user tracking.",
      "Onboard equipment in trains, buses and ships contains sensitive operational data requiring certified erasure at maintenance sites.",
      "Sensitive sites impose strict access protocols that complicate ITAD operations.",
      "Heavy batteries (forklifts, pallet trucks, AGVs) are a major environmental and safety issue in logistics warehouses.",
      "Transport CSRD reporting covers Scope 1 (fuel) and Scope 2 (energy) well, but Scope 3 IT is often a blind spot.",
      "International cross-border operations add multilingual and multi-regulatory complexity.",
    ],
    useCases: [
      { title: "Massive mobile terminal management", description: "50,000 PDAs for controllers, drivers and agents, renewed every 4-5 years. GreenTechCycle tracks each device per user, automates returns, and applies optimal decisioning." },
      { title: "Certified erasure of onboard equipment", description: "Trains, buses, ships contain sensitive operational data. GreenTechCycle orchestrates certified erasure directly at maintenance sites." },
      { title: "CSRD fleet IT reporting: filling the Scope 3 blind spot", description: "GreenTechCycle precisely quantifies IT fleet carbon footprint for CSRD reporting." },
      { title: "Waki Box for warehouses and logistics platforms", description: "50,000m² warehouses generate significant battery, bulb and small WEEE volumes. The Waki Box centralizes these flows with automatic traceability." },
    ],
    roi: [
      { lever: "PDA refurbishment", gain: "€100-200 per refurbished terminal" },
      { lever: "Centralized onboard erasure", gain: "Reputational risk reduction" },
      { lever: "Return logistics optimization", gain: "-25 to 35% on costs" },
      { lever: "Support automation", gain: "-0.5 FTE" },
    ],
    personas: [
      { role: "CIO / Digital Director", description: "Drives digital transformation and manages a massive, heterogeneous IT fleet." },
      { role: "Mobility / Fleet IT Manager", description: "Manages mobile terminal lifecycles for field agents." },
      { role: "Group CSR Director", description: "Consolidates group ESG data and drives CSRD reporting." },
      { role: "CISO", description: "Ensures data security on sensitive sites and onboard equipment." },
      { role: "Logistics Director", description: "Coordinates physical flows in warehouses and platforms." },
    ],
    quote: "You manage massive IT fleets on sensitive sites. GTC tracks 100,000 devices as simply as 100, automatically applies your security rules, and recovers cash from devices you were discarding.",
    objections: [
      { question: "Our sites have strict access controls", answer: "GreenTechCycle adapts to your security protocols. Our teams are experienced with sensitive environments." },
      { question: "PDA volumes vary significantly year to year", answer: "GreenTechCycle pricing is flexible and adapts to actual volumes processed." },
    ],
    cta: { title: "Structure your transport ITAD", button: "Request a fleet audit" },
  },

  public: {
    hero: { title: "Public sector & local government", subtitle: "AGEC law, carbon reporting, ANSSI — meet your environmental exemplarity obligations while recovering budget from your IT estate." },
    profile: {
      description: "Government ministries, public operators, local authorities and public institutions manage 20,000-200,000 workstations per ministry. Public procurement constraints, expected environmental exemplarity and ANSSI security requirements for sovereign ministries make public ITAD a domain apart.",
      regulations: "The AGEC law and 3R decree impose measurable reuse targets (minimum 20%). Carbon reporting (BEGES) is mandatory for municipalities over 50,000 inhabitants. ANSSI governs sovereign ministry security. Public procurement (BOAMP, TED) imposes specific purchasing processes.",
    },
    painPoints: [
      "Public procurement processes significantly lengthen sales cycles.",
      "Environmental exemplarity decrees impose measurable reuse targets that must be documented.",
      "Volumes are considerable but budgets are constrained.",
      "ANSSI security for sovereign ministries requires specific erasure and traceability levels.",
      "Inter-administration structures complicate ITAD governance.",
      "Mandatory BEGES for municipalities over 50,000 requires IT data few administrations can produce.",
    ],
    useCases: [
      { title: "UGAP public procurement listing", description: "Access to public procurement via purchasing centrals represents a long-term high-volume sales channel. GreenTechCycle supports the listing process." },
      { title: "AGEC law and 3R decree compliance", description: "The AGEC law imposes minimum 20% reuse. GreenTechCycle tracks every device, documents its destination and produces the reports required by oversight bodies." },
      { title: "Mandatory carbon reporting (BEGES)", description: "GreenTechCycle provides exploitable data for the IT component of the carbon report." },
      { title: "Enhanced erasure for sovereign ministries", description: "Defense, Interior and Foreign Affairs operate under specific RGS classification levels. GreenTechCycle provides enhanced erasure with traceability acceptable to internal inspections." },
    ],
    roi: [
      { lever: "Documented AGEC compliance", gain: "Exemplarity reputation" },
      { lever: "Workstation refurbishment", gain: "€60-80 per workstation" },
      { lever: "BEGES automation", gain: "-0.3 to 0.5 FTE" },
      { lever: "Multi-site logistics optimization", gain: "-30 to 40%" },
    ],
    personas: [
      { role: "CIO / Digital Director", description: "Drives administration digital strategy and fleet renewals." },
      { role: "Public Procurement Officers", description: "Master public procurement procedures." },
      { role: "Digital Responsibility Referent", description: "Owns digital sobriety and reuse objectives." },
      { role: "Local Government CSR Director", description: "Coordinates environmental commitments and BEGES." },
      { role: "Ministerial CISO", description: "Defines end-of-life security requirements based on classification level." },
    ],
    quote: "GTC helps you meet your AGEC and carbon reporting obligations while recovering budget. Our platform is designed to integrate with your public procurement processes.",
    objections: [
      { question: "Public procurement cycles are very long (12-24 months)", answer: "We understand public procurement constraints. The initial listing investment opens a high-volume recurring channel." },
      { question: "ANSSI security prohibits certain external platform processing", answer: "GreenTechCycle offers on-premise deployment for classified sovereign environments." },
    ],
    cta: { title: "Modernize your public ITAD", button: "Request a public audit" },
  },

  tech: {
    hero: { title: "Tech & digital services", subtitle: "Employer brand, MacBook Pro, CSRD — turn your premium laptops into an RSE lever and massive savings." },
    profile: {
      description: "IT service companies, SaaS vendors, pure players, digital agencies and scale-ups share a common profile: 100% laptop fleets, often premium (MacBook Pro at €2,000-3,000), frequent renewal (3 years for developers), an employer brand where CSR increasingly matters, and rapid growth that expands the fleet without visibility.",
      regulations: "CSRD will progressively apply to scale-ups exceeding 250 employees. GDPR strictly governs sensitive data stored on laptops (source code, client access, IP).",
    },
    painPoints: [
      "Developer laptop renewal every 3 years generates constant, predictable volumes without structured end-of-life processes.",
      "Employer brand is a critical issue in the tech talent war — developers increasingly evaluate their employer's CSR consistency.",
      "Rapid scale-up growth expands the IT fleet without visibility following.",
      "Laptop data (source code, client access, IP) is among the most sensitive in the company.",
      "Premium MacBook Pro workstations retain high residual value (€400-800 after 3 years) that is systematically lost.",
    ],
    useCases: [
      { title: "Internal reuse: a senior MacBook Pro becomes a sales workstation", description: "A 3-year-old senior developer MacBook Pro has ample power for sales, HR or junior staff. Savings of €1,500-2,500 per workstation, on 100 units/year, represent €150-250K annual savings." },
      { title: "CSR employer brand: publishable indicators", description: "GreenTechCycle produces concrete, verifiable indicators: kg CO₂ avoided, reuse rate, devices refurbished. These feed your HR communications and strengthen talent attraction." },
      { title: "Departing employee laptop program", description: "Offer departing employees the option to purchase their refurbished laptop at an advantageous price. GreenTechCycle orchestrates erasure, refurbishment, transfer and billing." },
      { title: "Scale-up CSRD reporting: anticipating the 250-employee threshold", description: "Setting up GreenTechCycle now builds data history and processes for when the CSRD obligation applies." },
    ],
    roi: [
      { lever: "Internal MacBook Pro reuse", gain: "€1,500-2,500 per reused workstation" },
      { lever: "External resale", gain: "€400-800 per resold workstation" },
      { lever: "GDPR source code avoidance", gain: "Up to 4% of revenue" },
      { lever: "Employer brand", gain: "Improved talent conversion rate" },
    ],
    personas: [
      { role: "CIO / CTO", description: "Drives technical strategy and manages developer equipment fleet." },
      { role: "HR / People Director", description: "Owns employer brand and seeks differentiating attraction levers." },
      { role: "CFO", description: "Optimizes costs and identifies value recovery levers." },
      { role: "CEO / Founder", description: "Embodies company values and arbitrates strategic investments." },
    ],
    quote: "Your developers cost €100K/year but their laptop changes every 3 years for €2,500. GTC saves you 50% via internal reuse while building your CSR credibility to attract top talent. ROI in 3 months.",
    objections: [
      { question: "We're only 80 people, CSRD doesn't apply yet", answer: "That's the ideal time. Setting up processes now, when volumes are manageable, means you'll be ready when the obligation applies. And reuse savings are immediate." },
      { question: "We manage this internally with a spreadsheet", answer: "The spreadsheet works up to 50 workstations. Beyond that, GreenTechCycle automates what spreadsheets can't: scoring, certified erasure, legally defensible traceability." },
    ],
    cta: { title: "Optimize your tech fleet", button: "Request a scale-up demo" },
  },

  "medias-audiovisuel": {
    hero: { title: "Media & broadcast", subtitle: "CSRD, intellectual property, broadcast security — the reference ITAD platform for French media groups, validated by TF1." },
    profile: {
      description: "TV groups (TF1, M6, France TV, Canal+, Arte), radio (Radio France, RTL, NRJ), press, production studios (Banijay, Mediawan, Newen), streaming and ad sales operate massive, heterogeneous IT estates. Classic workstations coexist with high-value broadcast equipment (editing stations, video servers, IP cameras, production control rooms).",
      regulations: "CSRD applies to listed groups. GDPR protects contributor and talent data. ARCOM conventions govern broadcaster obligations. Content intellectual property is a major legal concern. Physical security of live production control rooms imposes specific constraints.",
    },
    painPoints: [
      "Extreme IT heterogeneity: standard workstations, premium editing stations (Avid, Final Cut, Premiere at €6,000-15,000), video servers, IP cameras, production control rooms — with very different lifecycles.",
      "Editing stations contain ultra-sensitive data: unaired rushes, embargoed content, archives worth millions. An ITAD breach could cost an exclusive, a premiere, a contract.",
      "Multiple sites with remote production control rooms generate permanent mobile equipment flows.",
      "ESG pressure is strong on public media brands scrutinized by NGOs and regulators.",
      "Contractual intellectual property means some stored content belongs to third parties and its erasure must be documented and legally defensible.",
      "Professional broadcast batteries (cameras, light packs, walkie-talkies, wireless mics) are massive (100-300Wh per Anton/Bauer or V-Mount battery) with significant fire risks.",
    ],
    useCases: [
      { title: "Certified erasure of editing stations and video servers", description: "Editing stations contain terabytes of rushes, pre-edits, client archives and embargoed content. GreenTechCycle orchestrates NIST 800-88 Purge with thorough verification and produces legally defensible certificates. Media groups have 200-1,500 active stations and process 30-250 per year." },
      { title: "Broadcast station refurbishment and internal reuse", description: "An Avid/Final Cut/Premiere station purchased for €6,000-15,000 for VFX or color grading retains ample power for news, sports or light post-production. Automatic scoring evaluates residual power vs. target use criticality. Savings of €1,500-3,000 per station on 50-100 units/year." },
      { title: "Media-specific CSRD ESRS E5 reporting", description: "TF1, M6, Lagardère and Vivendi-Canal+ are scrutinized by ESG analysts. IT + broadcast Scope 3 is poorly understood but significant. GreenTechCycle provides ESRS E5 granularity by equipment type with auditable figures." },
      { title: "Professional broadcast battery management", description: "A news camera uses 4-8 Anton/Bauer or V-Mount batteries at 100-300Wh each. GreenTechCycle centralizes management with ADR-certified transport partners and full traceability." },
      { title: "Event and sports production control room program", description: "Roland-Garros, Tour de France, World Cup, Olympics — each major event generates IT deployment/teardown peaks. GreenTechCycle offers an event mode with pre- and post-event processing." },
    ],
    roi: [
      { lever: "Internal station reuse", gain: "€1,500-3,000 per station" },
      { lever: "Secured broadcast erasure", gain: "IP litigation avoidance" },
      { lever: "Eligible device resale", gain: "€500-2,000 per workstation" },
      { lever: "Multi-site broadcast logistics", gain: "-30 to 40% on costs" },
      { lever: "Reporting automation", gain: "-0.5 to 1 FTE" },
      { lever: "GDPR content leak avoidance", gain: "Up to 4% of revenue" },
      { lever: "ESG storytelling image", gain: "Measurable public credibility" },
    ],
    personas: [
      { role: "CIO / Technical Director", description: "Drives IT and broadcast strategy, manages a high-value heterogeneous fleet." },
      { role: "Broadcast / Antenna Director", description: "Responsible for production and distribution equipment, arbitrates station renewals." },
      { role: "CISO", description: "Content security guardian, validates erasure levels by category." },
      { role: "CSR / Sustainability Director", description: "Owns group ESG commitments and leverages data in corporate communication." },
      { role: "Procurement", description: "Negotiates ITAD contracts and seeks optimization levers on a high-value fleet." },
      { role: "Legal Director", description: "Ensures IP and contractual confidentiality compliance in the ITAD chain." },
    ],
    quote: "Your editing stations contain the rushes that make the difference between you and your competitors. An ITAD breach could cost an exclusive, a premiere, a contract. GTC is the only platform that reconciles broadcast-grade certified erasure, court-defensible traceability, fleet economic optimization, and group ESG reporting.",
    tf1Reference: "TF1 trusts us to manage their IT and broadcast fleet. We understand the specific constraints of your sector, from premium editing stations to broadcast batteries to group ESG reporting. Here's how we can replicate these results for you.",
    objections: [
      { question: "Our broadcast equipment is too specific for a generalist platform", answer: "GreenTechCycle's data model accepts any equipment type with category-specific scoring and decisioning rules. TF1 entrusts us with their Avid stations, video servers and IP cameras." },
      { question: "Our current providers are broadcast specialists", answer: "GreenTechCycle orchestrates, it doesn't replace. Your specialized providers stay. The platform adds unified visibility and consolidated reporting." },
      { question: "Content leak risk is critical", answer: "The maximum risk is the status quo: Excel processes and multiple providers without unified traceability. GreenTechCycle creates an irrefutable chain of custody with signatures, timestamps and photos at every step." },
      { question: "Our ESG storytelling is managed internally by communications", answer: "Precise, auditable figures are necessary. Communication based on estimates risks greenwashing accusations. GreenTechCycle provides real, measured, certified figures." },
    ],
    cta: { title: "Join TF1 and secure your broadcast ITAD", button: "Request a media demo" },
  },

  conseil: {
    hero: { title: "Consulting, audit & professional services", subtitle: "Professional secrecy, mobility, rigor — your ITAD practices must match what you sell to your clients." },
    profile: {
      description: "Consulting firms (Big 4, Tier 2, boutiques), law firms, accountants, HR firms and agencies operate 100% laptop fleets with extreme mobility. Professional secrecy demands a superior level of ITAD rigor.",
      regulations: "Professional secrecy (lawyers, auditors, accountants) strictly governs client data protection. GDPR applies to personal data processed on behalf of clients. CSRD reaches firms indirectly via client ESG questionnaires.",
    },
    painPoints: [
      "Professional secrecy is the cornerstone. A partner laptop containing sensitive client files, poorly erased and resold, can trigger liability and client loss.",
      "Extreme consultant mobility multiplies risks: lost, stolen or forgotten laptops.",
      "Rapid renewal generates a constant flow of equipment to process.",
      "Enterprise clients impose increasingly detailed ESG questionnaires.",
      "A firm selling rigor and compliance must apply the same standards internally.",
    ],
    useCases: [
      { title: "Certified erasure guaranteeing professional secrecy", description: "GreenTechCycle applies NIST 800-88 Purge with legally defensible certificates, ensuring client data is irreversibly destroyed." },
      { title: "Internal reuse between assignments and hierarchy levels", description: "GreenTechCycle orchestrates internal reallocations with certified erasure between each user." },
      { title: "Instant response to client ESG questionnaires", description: "GreenTechCycle responds instantly with CO₂ avoided, reuse rate and full traceability — a commercial advantage during contract renewals." },
    ],
    roi: [
      { lever: "Internal laptop reuse", gain: "€800-1,500 per reallocated workstation" },
      { lever: "External resale", gain: "€300-600 per workstation" },
      { lever: "Professional secrecy breach avoidance", gain: "Priceless (reputation + clients)" },
      { lever: "ESG commercial advantage", gain: "Advantage in contract renewals" },
    ],
    personas: [
      { role: "CIO / IT Director", description: "Manages the firm's laptop fleet and renewal processes." },
      { role: "Managing Partner", description: "Bears firm responsibility and professional obligation compliance." },
      { role: "HR Director", description: "Manages arrivals, departures and equipment reallocations." },
      { role: "Compliance Officer", description: "Ensures professional secrecy and regulatory compliance." },
    ],
    quote: "Your business rests on confidentiality and rigor. Your internal practices must match what you sell. GTC gives you the irrefutable traceability your confidentiality clause demands.",
    objections: [
      { question: "We're only 200 people, it's manageable manually", answer: "200 laptops renewed every 3 years means 65 devices per year. One oversight can cost a client. GreenTechCycle structures the process and eliminates human error risk." },
      { question: "Our IT already handles erasure internally", answer: "Does your IT produce legally defensible certificates in case of litigation? GreenTechCycle traceability is designed to withstand legal scrutiny." },
    ],
    cta: { title: "Secure your consulting ITAD", button: "Request a confidentiality audit" },
  },

  "pharma-biotech": {
    hero: { title: "Pharmaceutical & biotech", subtitle: "GMP, GxP, FDA/EMA — ITAD traceability defensible before the world's most demanding regulators." },
    profile: {
      description: "Laboratories (Sanofi, Servier, Pierre Fabre), biotechs, CROs and CDMOs operate at the intersection of cutting-edge research and the strictest regulation. R&D data worth hundreds of millions (formulas, patents, clinical trial results) coexist with lab equipment storing local trial data.",
      regulations: "Good Manufacturing Practices (GMP) and the GxP framework govern IT processes. FDA and EMA impose validation and traceability requirements for clinical trial equipment. ISO 14001 and ISO 27001 are systematic. CSRD places major labs under ESG analyst scrutiny.",
    },
    painPoints: [
      "GxP validation of IT processes, including ITAD, is a regulatory requirement.",
      "Research data worth hundreds of millions — a leak can compromise years of R&D and marketing authorizations.",
      "Lab equipment stores clinical trial data locally requiring specific erasure.",
      "Long lifecycles (7-10 years per researcher workstation) mean years of sensitive data accumulation.",
      "International sites add multi-regulatory complexity.",
    ],
    useCases: [
      { title: "R&D erasure with authority-defensible proof", description: "GreenTechCycle produces timestamped, signed traceability defensible before courts and regulatory authorities." },
      { title: "GxP-validated ITAD for clinical trial equipment", description: "GreenTechCycle offers a service variant specifically designed to pass FDA and EMA external audits." },
      { title: "Analyst-grade CSRD reporting", description: "GreenTechCycle provides the granularity and data reliability Big Pharma CSRD reports demand." },
    ],
    roi: [
      { lever: "IT workstation refurbishment", gain: "€50-120 per workstation" },
      { lever: "Documented GxP compliance", gain: "Audit non-conformity avoidance" },
      { lever: "Patent and R&D protection", gain: "Priceless (hundreds of M€ in R&D)" },
      { lever: "Automated CSRD reporting", gain: "-0.3 to 0.5 FTE" },
    ],
    personas: [
      { role: "CIO / IT Director", description: "Manages a hybrid IT estate (office + lab) in a heavily regulated environment." },
      { role: "Quality / Validation Manager", description: "Validates GxP processes and prepares FDA/EMA audits." },
      { role: "CISO", description: "Protects R&D data and group intellectual property." },
      { role: "CSR Director", description: "Owns CSRD objectives and consolidates multi-site ESG data." },
    ],
    quote: "In your sector, an ITAD traceability gap can cost a patent or FDA authorization. GTC produces evidence defensible before the world's most demanding regulators.",
    objections: [
      { question: "GxP validation is a long and costly process", answer: "GreenTechCycle has pre-documented validation protocols for pharma ITAD, significantly reducing initial validation time and cost." },
      { question: "Our data is too sensitive to leave our premises", answer: "Erasure is performed on-site in your facilities. Data never leaves your infrastructure. Only traceability metadata is recorded on the platform." },
    ],
    cta: { title: "Secure your pharma ITAD", button: "Request a GxP audit" },
  },

  btp: {
    hero: { title: "Construction & building", subtitle: "OEM CSRD pressure, distributed sites — centralize your mobile terminal and heavy battery management." },
    profile: {
      description: "Major construction firms (Vinci, Bouygues, Eiffage), regional mid-caps and contractors operate in an environment where digital is gaining ground (BIM, drones, field tablets) while IT structures remain often informal.",
      regulations: "CSRD applies indirectly via majors requiring ESG data from subcontractors. Environmental regulations govern construction site waste. Lithium battery regulations apply to drones and power tools.",
    },
    painPoints: [
      "Ruggedized tablets on construction sites suffer 15-25% annual breakage, loss and theft rates.",
      "Professional drones and their lithium batteries require dedicated treatment chains.",
      "CSRD pressure comes via major construction firms demanding ESG data from subcontractors.",
      "Multiple temporary construction sites complicate collection logistics.",
      "Construction companies rarely have structured IT teams for formalized ITAD processes.",
    ],
    useCases: [
      { title: "Centralized construction site mobile terminal management", description: "5,000-20,000 tablets and PDAs deployed across sites. GreenTechCycle tracks each device, automates replacements and orchestrates recovery for refurbishment." },
      { title: "Heavy battery management (drones and equipment)", description: "Professional drone lithium batteries (200-500g) require ADR-certified partners. GreenTechCycle centralizes and traces this chain." },
      { title: "OEM CSRD reporting", description: "Mid-cap construction firms that respond quickly to major firms' ESG questionnaires gain an advantage in tenders." },
    ],
    roi: [
      { lever: "Reduced tablet loss/theft", gain: "-10 to 15% on loss rate" },
      { lever: "Tablet refurbishment", gain: "€80-150 per tablet" },
      { lever: "ESG tender advantage", gain: "Impact on win rate" },
    ],
    personas: [
      { role: "CIO / IT Manager", description: "Manages a dispersed IT fleet across numerous sites with limited resources." },
      { role: "QSE Manager", description: "Carries certifications and environmental compliance." },
      { role: "Procurement Director", description: "Seeks simple, economical WEEE management solutions." },
    ],
    quote: "Your field tablets are still worth money. GTC tracks them, recovers them and refurbishes them — instead of losing them on construction sites.",
    objections: [
      { question: "We don't have a dedicated IT team", answer: "GreenTechCycle is designed to work without a dedicated IT team. Simple onboarding, intuitive platform, and our support assists your site managers." },
      { question: "Per-site volumes are too low", answer: "Consolidation creates value. 20 tablets per site across 100 sites means 2,000 tablets to manage." },
    ],
    cta: { title: "Structure your construction ITAD", button: "Request a field audit" },
  },

  horeca: {
    hero: { title: "Hospitality, catering & tourism", subtitle: "PCI DSS, CSRD, CSR storytelling — turn equipment management into a brand lever and compliance asset." },
    profile: {
      description: "Hotel groups (Accor, Louvre Hotels), contract catering (Areas, Elior, Sodexo) and tourism (Pierre & Vacances, Club Med) operate networks of 200-5,000 properties. IT estates mix payment terminals, POS systems, client terminals, room TVs and wellness equipment.",
      regulations: "PCI DSS governs payment terminals. GDPR protects reservation and banking data. CSRD applies to listed groups.",
    },
    painPoints: [
      "Massive POS and payment terminal volumes across 200-5,000 properties require industrial-scale PCI DSS erasure.",
      "Room TV and wellness equipment renewal generates large WEEE volumes without structured chains.",
      "Client terminals store reservation and banking data requiring mandatory erasure.",
      "Seasonality generates small WEEE peaks often managed without traceability.",
      "CSR storytelling is crucial in a sector where brand image and guest experience are key differentiators.",
    ],
    useCases: [
      { title: "Room TV and equipment renewal: from removal to reporting", description: "500 hotels on 5-7 year cycles. GreenTechCycle orchestrates removal, B2B sorting/recycling and produces ESG traceability for the group CSRD report." },
      { title: "Certified PMS and check-in terminal erasure", description: "Check-in kiosks and PMS terminals store reservation data and card numbers. GreenTechCycle guarantees compliant erasure with individual PCI DSS certificates." },
      { title: "Waki Box in back-of-house and services", description: "The Waki Box collects batteries, remotes and small equipment. Beyond compliance, it becomes a guest communication element illustrating the property's environmental commitment." },
    ],
    roi: [
      { lever: "Back-office refurbishment", gain: "€60-100 per workstation" },
      { lever: "Certified PCI DSS erasure", gain: "Penalty avoidance (up to €100,000)" },
      { lever: "CSR brand storytelling", gain: "Impact on guest satisfaction and loyalty" },
    ],
    personas: [
      { role: "Group CIO", description: "Drives network IT strategy and fleet renewals." },
      { role: "CSR Director", description: "Owns environmental commitments and CSRD reporting." },
      { role: "Operations Director", description: "Coordinates operational processes across properties." },
      { role: "Marketing Director", description: "Leverages CSR commitments in brand communication." },
    ],
    quote: "Every hotel, every restaurant is a customer touchpoint. GTC turns your WEEE management into a CSR story your guests want to hear.",
    objections: [
      { question: "Margins are tight in hospitality", answer: "GreenTechCycle generates net savings via refurbishment and logistics optimization. CSR storytelling has measurable impact on footfall and loyalty." },
      { question: "Our properties are too geographically dispersed", answer: "That's precisely our value proposition. GreenTechCycle centralizes and optimizes flows from hundreds of properties via a single platform." },
    ],
    cta: { title: "Optimize your hospitality ITAD", button: "Request a network demo" },
  },

  "education-recherche": {
    hero: { title: "Education & research", subtitle: "Carbon reporting, exemplarity, tight budgets — unlock value from your IT estate while setting an example for students and oversight bodies." },
    profile: {
      description: "Universities, grandes écoles, research organizations (CNRS, INSERM, INRIA, CEA) and private schools operate campuses of 30,000-100,000 users. IT estates mix administrative equipment, student workstations, specialized research stations and network infrastructure.",
      regulations: "BEGES (carbon reporting) is mandatory for public universities. GDPR protects student and research data. Public procurement governs purchases. Environmental exemplarity is an increasing oversight body expectation.",
    },
    painPoints: [
      "Volumes are considerable but IT budgets are among the tightest across all sectors.",
      "Specialized research equipment stores locally stored data, sometimes patentable.",
      "Research data includes pending patents — insufficient erasure can compromise patent filings.",
      "Multi-site campuses multiply collection points and logistics complexity.",
      "Exemplarity is a strong expectation from students, researchers and oversight bodies.",
    ],
    useCases: [
      { title: "Internal reuse and student program", description: "End-of-life administrative laptops often retain sufficient power for libraries and student loan programs. GreenTechCycle orchestrates erasure, refurbishment and deployment." },
      { title: "Enhanced erasure for research equipment", description: "Researcher laptops containing patentable data require minimum Purge-level erasure with defensible certificates." },
      { title: "University BEGES and CSR reporting", description: "Public universities face mandatory BEGES. IT Scope 3 is a significant component. GreenTechCycle provides precise, exploitable data." },
    ],
    roi: [
      { lever: "Administrative workstation refurbishment", gain: "€40-80 per workstation" },
      { lever: "Student loan program", gain: "Extended use value + image" },
      { lever: "BEGES automation", gain: "-0.2 to 0.3 FTE" },
      { lever: "Environmental exemplarity", gain: "Impact on oversight bodies and recruitment" },
    ],
    personas: [
      { role: "CIO / Digital Director", description: "Manages a massive IT fleet with constrained budgets and varied security requirements." },
      { role: "VP Property / Facilities", description: "Drives property and equipment investments." },
      { role: "Sustainability Manager", description: "Owns environmental commitments and BEGES coordination." },
      { role: "Research Director", description: "Ensures IP and research data protection." },
    ],
    quote: "You teach sustainability to your students. GTC helps you practice it internally, with measurable results your oversight bodies and students can verify.",
    objections: [
      { question: "Budgets are too tight to invest in a platform", answer: "GreenTechCycle generates net savings from year one via refurbishment and value recovery. The investment is more than offset by financial returns." },
      { question: "Public procurement makes the process very long", answer: "We understand university procurement constraints. The listing investment opens a stable recurring channel." },
    ],
    cta: { title: "Unlock value from your university IT estate", button: "Request a campus audit" },
  },

  agroalimentaire: {
    hero: { title: "Food & agriculture industry", subtitle: "CSRD, HACCP, distributed sites — manage IT and OT equipment lifecycle in a sector under societal pressure." },
    profile: {
      description: "Processing industries (Danone, Lactalis, LDC), agricultural cooperatives and traders operate factories with hybrid IT/OT estates. Distributed sites in rural areas and societal pressure on environmental practices make ITAD management a logistics, regulatory and image challenge.",
      regulations: "CSRD applies to major food groups with particular attention to the value chain (Scope 3). HACCP governs production processes. Environmental regulations are reinforced by societal pressure.",
    },
    painPoints: [
      "IT/OT coexistence (production line sensors, quality control terminals) creates a heterogeneous estate.",
      "Rural site locations make collection logistics costly and complex.",
      "Societal pressure on the food sector regarding environmental practices is strong.",
      "Cold/humid zone equipment has reduced durability and higher replacement rates.",
      "Commercial and quality control mobile terminal fleets are renewed frequently.",
    ],
    useCases: [
      { title: "Commercial and quality fleet mobile terminal management", description: "1,000-10,000 PDAs and ruggedized tablets. GreenTechCycle manages the complete lifecycle." },
      { title: "CSRD ESRS E5 and food Scope 3 reporting", description: "The food value chain is scrutinized end-to-end. IT is an underrecognized but real Scope 3 component." },
      { title: "Waki Box for workshops and logistics areas", description: "Scanner batteries, remotes, maintenance accessories — the Waki Box centralizes these flows with automatic traceability." },
    ],
    roi: [
      { lever: "Mobile terminal refurbishment", gain: "€60-120 per terminal" },
      { lever: "Automated CSRD reporting", gain: "-0.3 FTE" },
      { lever: "Rural site logistics optimization", gain: "-20 to 30% on costs" },
    ],
    personas: [
      { role: "CIO / IT Manager", description: "Manages a hybrid IT/OT fleet across multiple production and distribution sites." },
      { role: "QSE / HACCP Manager", description: "Ensures process compliance including production zone equipment management." },
      { role: "CSR Director", description: "Owns sustainability objectives under strong societal pressure." },
      { role: "Industrial Director", description: "Arbitrates investments and optimizes production site processes." },
    ],
    quote: "In a sector where every environmental detail is scrutinized, GTC gives you the precise, auditable figures your consumers, distributors and shareholders demand.",
    objections: [
      { question: "Our sites are too geographically isolated", answer: "GreenTechCycle optimizes collection routes for rural sites. Cross-client pooling in the same geographic areas makes operations economically viable." },
      { question: "Per-site volume is too low", answer: "Cross-site consolidation creates value. GreenTechCycle aggregates flows from all your sites and optimizes collections by geographic zone." },
    ],
    cta: { title: "Structure your food industry ITAD", button: "Request a multi-site audit" },
  },

  telecom: {
    hero: { title: "Telecom & operators", subtitle: "REEN law, AGEC, massive volumes — manage millions of devices with the environmental rigor regulators and public opinion demand." },
    profile: {
      description: "Operators (Orange, SFR, Bouygues Telecom, Free), their B2B subsidiaries, MVNOs and equipment manufacturers manage some of the largest IT volumes in the French economy. Millions of boxes and modems, considerable internal data centers and distributed network infrastructure create an ITAD environment of unique complexity and scale.",
      regulations: "The REEN law mandates transparency on digital services' environmental footprint. The AGEC law imposes reuse and recycling targets. CSRD applies to all major operators. High public exposure on digital carbon footprint adds constant societal pressure.",
    },
    painPoints: [
      "End-of-life box and modem volumes run into millions per year, requiring industrial-scale processes.",
      "Internal data centers contain thousands of servers with customer data and sensitive network configurations.",
      "Distributed technical sites multiply collection points across the entire territory.",
      "Digital responsibility regulation (REEN, AGEC) imposes growing transparency.",
      "High public exposure means every environmental commitment is scrutinized.",
    ],
    useCases: [
      { title: "Massive box refurbishment program", description: "Returned subscriber boxes are erased, refurbished and redeployed at 30-50% of new box cost. GreenTechCycle traces each box individually and certifies previous subscriber data erasure." },
      { title: "Massive telecom data center ITAD", description: "Thousands of servers renewed every 4-6 years. GreenTechCycle deploys an industrial erasure and sorting platform, maximizes residual value and produces required security certificates." },
      { title: "REEN law compliance", description: "GreenTechCycle provides exploitable data on end-of-life IT, directly integrable into REEN compliance reports." },
    ],
    roi: [
      { lever: "Box refurbishment", gain: "50-70% savings vs. new purchase" },
      { lever: "Data center server recovery", gain: "€100-400 per server" },
      { lever: "Documented REEN compliance", gain: "Regulatory sanction avoidance" },
      { lever: "Responsible digital image", gain: "Impact on public perception" },
    ],
    personas: [
      { role: "Group CIO", description: "Drives IT strategy for an operator managing millions of devices." },
      { role: "Data Center Director", description: "Manages server renewals and infrastructure optimization." },
      { role: "CSR / Responsible Digital Director", description: "Owns environmental commitments and REEN compliance." },
      { role: "Network Logistics Director", description: "Coordinates equipment flows across distributed technical sites." },
    ],
    quote: "You manage millions of devices. GTC gives you visibility and traceability at industrial scale, with the environmental rigor public opinion demands.",
    objections: [
      { question: "Volumes are too large for a SaaS platform", answer: "GreenTechCycle is designed for industrial scale. The platform manages hundreds of thousands of assets without performance degradation." },
      { question: "We already have internal industrial processes", answer: "GreenTechCycle integrates with your existing processes and adds the traceability, reporting and optimization layer internal tools don't always provide." },
    ],
    cta: { title: "Industrialize your telecom ITAD", button: "Request a volume audit" },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   PRIORITY MATRIX EN
   ═══════════════════════════════════════════════════════════════════════════ */

export const matrixDataEn: MatrixRow[] = [
  { slug: "finance", dealSize: "Very high", velocity: "Slow (12-18 months)", priority: "High", stars: 3 },
  { slug: "sante", dealSize: "High", velocity: "Very slow (UGAP)", priority: "Medium", stars: 2 },
  { slug: "industrie", dealSize: "High", velocity: "Medium (6-12 months)", priority: "High", stars: 3 },
  { slug: "retail", dealSize: "Very high", velocity: "Medium (6-9 months)", priority: "High", stars: 3 },
  { slug: "energie", dealSize: "Very high", velocity: "Slow (9-15 months)", priority: "Medium", stars: 2 },
  { slug: "transport-logistique", dealSize: "High", velocity: "Medium", priority: "Medium", stars: 2 },
  { slug: "public", dealSize: "Variable", velocity: "Very slow (UGAP)", priority: "Low", stars: 1 },
  { slug: "tech", dealSize: "Medium", velocity: "Fast (3-6 months)", priority: "High", stars: 3 },
  { slug: "medias-audiovisuel", dealSize: "Very high", velocity: "Medium (TF1 ref.)", priority: "High", stars: 3 },
  { slug: "conseil", dealSize: "Medium", velocity: "Fast (3-4 months)", priority: "High", stars: 3 },
  { slug: "pharma-biotech", dealSize: "High", velocity: "Slow (GxP validation)", priority: "Medium", stars: 2 },
  { slug: "btp", dealSize: "Medium", velocity: "Medium", priority: "Low", stars: 1 },
  { slug: "horeca", dealSize: "High (groups)", velocity: "Medium", priority: "Medium", stars: 2 },
  { slug: "education-recherche", dealSize: "Variable", velocity: "Very slow (tenders)", priority: "Low", stars: 1 },
  { slug: "agroalimentaire", dealSize: "High", velocity: "Medium", priority: "Medium", stars: 2 },
  { slug: "telecom", dealSize: "Very high", velocity: "Slow (12-18 months)", priority: "Medium", stars: 2 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SEQUENCING PHASES EN
   ═══════════════════════════════════════════════════════════════════════════ */

export const phasesEn: PhaseData[] = [
  {
    title: "Capitalize on TF1 and velocity",
    period: "Months 1-6",
    description: "The first months must generate quick wins and capitalize on the TF1 reference. Short-cycle sectors with clear needs are prioritized.",
    sectors: [
      "Media & Broadcast — target M6, France TV, Canal+, Lagardère, Radio France",
      "Tech & Digital Services — short sales cycles (3-6 months)",
      "Consulting & Audit — immediate professional secrecy traceability need",
      "Industrial mid-caps — manageable cycles, OEM pressure",
    ],
  },
  {
    title: "Scale up",
    period: "Months 6-18",
    description: "With a solid reference portfolio, larger deals become accessible. High-value, medium-cycle sectors are the target.",
    sectors: [
      "Banking & Finance — six-figure deals, prestige and recurrence",
      "Retail & Mass distribution — massive volumes, marketing impact",
      "Pharma & Biotech — strong reference, differentiating GxP validation",
    ],
  },
  {
    title: "Conquest",
    period: "Months 18+",
    description: "Long-cycle, complex-deal sectors require the track record and credibility built in previous phases.",
    sectors: [
      "Energy & Utilities — complex deals, Linky wave anticipation",
      "Telecom & Operators — national volumes, industrial scale",
      "Public Sector & Local Government — UGAP listing, recurring channel",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   HUB LABELS EN
   ═══════════════════════════════════════════════════════════════════════════ */

export const hubLabelsEn = {
  heroTitle: "Industry sectors",
  heroSubtitle: "ITAD · Security · Unified platform — 16-sector catalogue",
  howToReadTitle: "How to read this catalogue",
  howToReadBricks: [
    { title: "SaaS Platform", description: "Traceability, decisioning scoring, CSRD/ESG reporting and real-time dashboards to drive your ITAD." },
    { title: "Waki Box", description: "Connected secure collection box for small WEEE and batteries, deployed in your premises with automatic reporting." },
    { title: "ITAD Service", description: "NIST 800-88 certified erasure, refurbishment, recovery and recycling orchestrated by the platform." },
  ],
  sectorGridTitle: "16 sectors, one platform",
  tf1Badge: "TF1 Reference",
  annexe1Title: "Commercial prioritization matrix",
  annexe1Cols: ["Sector", "Deal size", "Velocity", "Priority"],
  annexe2Title: "Recommended sequencing",
  ctaTitle: "Ready to secure your ITAD?",
  ctaSubtitle: "Request a personalized audit for your industry sector.",
  ctaPrimary: "Request an audit",
  ctaSecondary: "See use cases",
  trustItems: ["R2v3 certified", "ISO 14001", "NIST 800-88", "GDPR & CSRD compliant"],
  viewSector: "Discover this sector",
};
