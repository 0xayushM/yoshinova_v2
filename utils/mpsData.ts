import { ChartDataPoint } from "@/components/MPSComparisonChart";

export interface MPSStatBlock {
  icon: "peak" | "backup" | "co2" | "cost" | "uptime" | "solar";
  label: string;
  value: number;
  suffix: string;
}

export interface ZoneAccent {
  hsl: string;        // e.g. "210, 80%, 65%"
  hex: string;        // e.g. "#5b9bf5"
  rgb: string;        // e.g. "91, 155, 245"
  tailwind: string;   // e.g. "blue-400"
}

export interface MPSZoneData {
  title: string;
  slug: string;
  impact: string;
  heroMetric: { value: number; prefix: string; suffix: string };
  stats: [MPSStatBlock, MPSStatBlock, MPSStatBlock];
  accent: ZoneAccent;
  chartData: ChartDataPoint[];
  yAxisLabel: string;
  maxY: number;
}

// ── Zone accent palette ──
const accentBlue:    ZoneAccent = { hsl: "210, 80%, 65%", hex: "#5b9bf5", rgb: "91, 155, 245",  tailwind: "blue-400"   };
const accentTeal:    ZoneAccent = { hsl: "174, 60%, 50%", hex: "#33b5a6", rgb: "51, 181, 166",  tailwind: "teal-400"   };
const accentCyan:    ZoneAccent = { hsl: "188, 90%, 55%", hex: "#22d3ee", rgb: "34, 211, 238",  tailwind: "cyan-400"   };
const accentAmber:   ZoneAccent = { hsl: "38, 90%, 55%",  hex: "#f59e0b", rgb: "245, 158, 11",  tailwind: "amber-400"  };
const accentPurple:  ZoneAccent = { hsl: "270, 70%, 60%", hex: "#a855f7", rgb: "168, 85, 247",  tailwind: "purple-400" };
const accentGreen:   ZoneAccent = { hsl: "142, 60%, 50%", hex: "#34d399", rgb: "52, 211, 153",  tailwind: "emerald-400"};

// ── Residential ──
export const residentialData: MPSZoneData = {
  title: "Residential",
  slug: "residential",
  impact: "Store daytime solar, power your evenings — cut bills by 40%.",
  heroMetric: { value: 40, prefix: "↓", suffix: "% Peak Charges" },
  stats: [
    { icon: "peak",   label: "Peak Shaving",  value: 46, suffix: "%" },
    { icon: "backup", label: "Backup Hours",   value: 8,  suffix: "hrs" },
    { icon: "co2",    label: "CO₂ Reduction",  value: 32, suffix: "%" },
  ],
  accent: accentBlue,
  yAxisLabel: "Demand (kW)",
  maxY: 8,
  chartData: [
    { hour: 0, withoutMPS: 1.2, withMPS: 1.0 },
    { hour: 2, withoutMPS: 0.9, withMPS: 0.8 },
    { hour: 4, withoutMPS: 0.8, withMPS: 0.7 },
    { hour: 6, withoutMPS: 1.5, withMPS: 1.2 },
    { hour: 8, withoutMPS: 2.0, withMPS: 1.4 },
    { hour: 10, withoutMPS: 2.5, withMPS: 1.5 },
    { hour: 12, withoutMPS: 3.0, withMPS: 1.6 },
    { hour: 14, withoutMPS: 3.2, withMPS: 1.8 },
    { hour: 16, withoutMPS: 4.0, withMPS: 2.2 },
    { hour: 18, withoutMPS: 6.5, withMPS: 3.5 },
    { hour: 20, withoutMPS: 5.8, withMPS: 3.2 },
    { hour: 22, withoutMPS: 3.0, withMPS: 2.0 },
    { hour: 24, withoutMPS: 1.5, withMPS: 1.1 },
  ],
};

// ── Society ──
export const societyData: MPSZoneData = {
  title: "Society",
  slug: "residential",
  impact: "Shared storage for elevators, pumps & EV charging — always on.",
  heroMetric: { value: 35, prefix: "↓", suffix: "% Demand Charges" },
  stats: [
    { icon: "peak",   label: "Peak Shaving",  value: 38, suffix: "%" },
    { icon: "backup", label: "Backup Hours",   value: 6,  suffix: "hrs" },
    { icon: "cost",   label: "Cost Savings",   value: 28, suffix: "%" },
  ],
  accent: accentTeal,
  yAxisLabel: "Demand (kW)",
  maxY: 60,
  chartData: [
    { hour: 0, withoutMPS: 12, withMPS: 10 },
    { hour: 2, withoutMPS: 10, withMPS: 8 },
    { hour: 4, withoutMPS: 9, withMPS: 7 },
    { hour: 6, withoutMPS: 15, withMPS: 11 },
    { hour: 8, withoutMPS: 25, withMPS: 18 },
    { hour: 10, withoutMPS: 30, withMPS: 20 },
    { hour: 12, withoutMPS: 35, withMPS: 22 },
    { hour: 14, withoutMPS: 38, withMPS: 24 },
    { hour: 16, withoutMPS: 40, withMPS: 26 },
    { hour: 18, withoutMPS: 50, withMPS: 30 },
    { hour: 20, withoutMPS: 45, withMPS: 28 },
    { hour: 22, withoutMPS: 25, withMPS: 18 },
    { hour: 24, withoutMPS: 14, withMPS: 11 },
  ],
};

// ── Telecom ──
export const telecomData: MPSZoneData = {
  title: "Telecom",
  slug: "telecom",
  impact: "Replace diesel backup with zero-downtime battery power.",
  heroMetric: { value: 60, prefix: "↓", suffix: "% Fuel Costs" },
  stats: [
    { icon: "uptime", label: "Uptime",         value: 99, suffix: ".9%" },
    { icon: "backup", label: "Backup Hours",    value: 12, suffix: "hrs" },
    { icon: "co2",    label: "CO₂ Reduction",   value: 55, suffix: "%" },
  ],
  accent: accentCyan,
  yAxisLabel: "Demand (kW)",
  maxY: 20,
  chartData: [
    { hour: 0, withoutMPS: 8, withMPS: 7 },
    { hour: 2, withoutMPS: 7.5, withMPS: 6.8 },
    { hour: 4, withoutMPS: 7.5, withMPS: 6.5 },
    { hour: 6, withoutMPS: 8, withMPS: 7 },
    { hour: 8, withoutMPS: 10, withMPS: 8 },
    { hour: 10, withoutMPS: 13, withMPS: 9 },
    { hour: 12, withoutMPS: 15, withMPS: 10 },
    { hour: 14, withoutMPS: 16, withMPS: 10.5 },
    { hour: 16, withoutMPS: 14, withMPS: 9.5 },
    { hour: 18, withoutMPS: 12, withMPS: 8.5 },
    { hour: 20, withoutMPS: 10, withMPS: 7.5 },
    { hour: 22, withoutMPS: 9, withMPS: 7.2 },
    { hour: 24, withoutMPS: 8, withMPS: 7 },
  ],
};

// ── Industrial ──
export const industrialData: MPSZoneData = {
  title: "Industrial",
  slug: "industrial",
  impact: "Shave machinery peaks and unlock demand-response revenue.",
  heroMetric: { value: 30, prefix: "↓", suffix: "% Demand Charges" },
  stats: [
    { icon: "peak",   label: "Peak Shaving",  value: 33, suffix: "%" },
    { icon: "cost",   label: "Cost Savings",   value: 22, suffix: "%" },
    { icon: "co2",    label: "CO₂ Reduction",  value: 18, suffix: "%" },
  ],
  accent: accentAmber,
  yAxisLabel: "Demand (MW)",
  maxY: 5,
  chartData: [
    { hour: 0, withoutMPS: 0.8, withMPS: 0.7 },
    { hour: 2, withoutMPS: 0.6, withMPS: 0.5 },
    { hour: 4, withoutMPS: 0.5, withMPS: 0.4 },
    { hour: 6, withoutMPS: 1.2, withMPS: 0.9 },
    { hour: 8, withoutMPS: 2.8, withMPS: 2.0 },
    { hour: 10, withoutMPS: 3.8, withMPS: 2.5 },
    { hour: 12, withoutMPS: 4.2, withMPS: 2.8 },
    { hour: 14, withoutMPS: 4.0, withMPS: 2.7 },
    { hour: 16, withoutMPS: 3.5, withMPS: 2.4 },
    { hour: 18, withoutMPS: 2.5, withMPS: 1.8 },
    { hour: 20, withoutMPS: 1.5, withMPS: 1.2 },
    { hour: 22, withoutMPS: 1.0, withMPS: 0.8 },
    { hour: 24, withoutMPS: 0.8, withMPS: 0.7 },
  ],
};

// ── Commercial ──
export const commercialData: MPSZoneData = {
  title: "Commercial",
  slug: "commercial",
  impact: "Flatten HVAC spikes and arbitrage time-of-use rates.",
  heroMetric: { value: 25, prefix: "↓", suffix: "% Peak Charges" },
  stats: [
    { icon: "peak",   label: "Peak Shaving",  value: 40, suffix: "%" },
    { icon: "cost",   label: "Cost Savings",   value: 25, suffix: "%" },
    { icon: "backup", label: "Backup Hours",   value: 4,  suffix: "hrs" },
  ],
  accent: accentPurple,
  yAxisLabel: "Demand (kW)",
  maxY: 120,
  chartData: [
    { hour: 0, withoutMPS: 15, withMPS: 12 },
    { hour: 2, withoutMPS: 12, withMPS: 10 },
    { hour: 4, withoutMPS: 10, withMPS: 8 },
    { hour: 6, withoutMPS: 20, withMPS: 15 },
    { hour: 8, withoutMPS: 60, withMPS: 40 },
    { hour: 10, withoutMPS: 90, withMPS: 55 },
    { hour: 12, withoutMPS: 100, withMPS: 60 },
    { hour: 14, withoutMPS: 95, withMPS: 58 },
    { hour: 16, withoutMPS: 85, withMPS: 52 },
    { hour: 18, withoutMPS: 50, withMPS: 35 },
    { hour: 20, withoutMPS: 30, withMPS: 22 },
    { hour: 22, withoutMPS: 20, withMPS: 15 },
    { hour: 24, withoutMPS: 15, withMPS: 12 },
  ],
};

// ── Solar ──
export const solarData: MPSZoneData = {
  title: "Solar",
  slug: "solar",
  impact: "Bridge the midday-to-evening gap — 80%+ self-consumption.",
  heroMetric: { value: 80, prefix: "↑", suffix: "% Self-Consumption" },
  stats: [
    { icon: "solar",  label: "Solar Utilization", value: 82, suffix: "%" },
    { icon: "co2",    label: "CO₂ Reduction",     value: 45, suffix: "%" },
    { icon: "cost",   label: "Cost Savings",       value: 35, suffix: "%" },
  ],
  accent: accentGreen,
  yAxisLabel: "Demand (MW)",
  maxY: 1.5,
  chartData: [
    { hour: 0, withoutMPS: 0.1, withMPS: 0.08 },
    { hour: 2, withoutMPS: 0.08, withMPS: 0.06 },
    { hour: 4, withoutMPS: 0.05, withMPS: 0.04 },
    { hour: 6, withoutMPS: 0.15, withMPS: 0.1 },
    { hour: 8, withoutMPS: 0.3, withMPS: 0.15 },
    { hour: 10, withoutMPS: 0.5, withMPS: 0.2 },
    { hour: 12, withoutMPS: 0.6, withMPS: 0.18 },
    { hour: 14, withoutMPS: 0.55, withMPS: 0.2 },
    { hour: 16, withoutMPS: 0.7, withMPS: 0.35 },
    { hour: 18, withoutMPS: 1.2, withMPS: 0.6 },
    { hour: 20, withoutMPS: 1.0, withMPS: 0.55 },
    { hour: 22, withoutMPS: 0.4, withMPS: 0.25 },
    { hour: 24, withoutMPS: 0.15, withMPS: 0.1 },
  ],
};
