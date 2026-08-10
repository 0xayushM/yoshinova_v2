/**
 * Data behind the energy-audit walkthrough.
 *
 * This replaces `utils/rigHelpers.tsx`, which held camera positions for the
 * 3D scene. Where that file described where a model should sit, this one
 * describes what an audit actually finds — which is the thing a factory
 * owner is being asked to buy.
 *
 * NOTE FOR ENGINEERING: the savings rates and payback ranges are conservative
 * placeholders drawn from published ranges. Replace them with figures the
 * engineering team will stand behind before this goes live. An estimator that
 * over-promises costs more in wasted site visits than it earns in leads.
 */

/** A representative Indian industrial day, normalised 0..1. */
export const LOAD_CURVE = [
  0.28, 0.26, 0.25, 0.25, 0.27, 0.38, 0.62, 0.78, 0.86, 0.9, 0.92, 0.94, 0.88,
  0.9, 0.93, 0.96, 1, 0.92, 0.74, 0.6, 0.5, 0.42, 0.35, 0.3,
];

export const PEAK_KW = 1400;

/** Hours the genset typically covers. */
export const DIESEL_HOURS = [18, 19, 20];

/** Fraction of the curve's range a right-sized MPS removes. */
export const SHAVE = 0.4;

export interface Finding {
  /** hour of day this attaches to on the curve */
  hour: number;
  /** what the advisor found */
  label: string;
  /** what it costs, in the owner's own units */
  cost: string;
  /** which instrument produced it — this is what makes it an audit, not a guess */
  instrument: string;
}

/**
 * The findings are the product. Each one is something a person with a clamp
 * meter and a logger can actually produce, priced in rupees.
 */
export const FINDINGS: Finding[] = [
  {
    hour: 2,
    label: "Idle overnight load",
    cost: "₹41,000 / month",
    instrument: "30-day interval meter log",
  },
  {
    hour: 10,
    label: "Power factor 0.82",
    cost: "penalty on every unit billed",
    instrument: "Power quality analyser",
  },
  {
    hour: 16,
    label: "Peak window, ToD 1.2×",
    cost: "sets your monthly demand charge",
    instrument: "Load curve vs. tariff schedule",
  },
  {
    hour: 19,
    label: "DG covering the evening gap",
    cost: "₹26 / unit vs ₹10 on grid",
    instrument: "DG runtime + fuel reconciliation",
  },
];

/** What the visitor physically receives. The audit is the product. */
export const DELIVERABLES = [
  {
    n: "01",
    t: "30-day load profile",
    d: "Which hours actually cost you, from your own meter.",
  },
  {
    n: "02",
    t: "Itemised leak register",
    d: "Every finding priced per month, with the reading behind it.",
  },
  {
    n: "03",
    t: "Right-sized MPS proposal",
    d: "Sized to your measured curve, with the payback arithmetic shown.",
  },
  {
    n: "04",
    t: "Yours either way",
    d: "Yours even if you buy nothing. Some fixes cost you nothing at all.",
  },
];

export const ECONOMICS = {
  /** DG at ~₹92/L and 0.28 L/kWh */
  dieselPerUnit: 26,
  /** typical Indian industrial grid tariff */
  gridPerUnit: 10,
  /** litres burned per unit generated */
  litresPerUnit: 0.28,
  /** indicative share of bill saved before diesel displacement */
  baseSavingsRate: 0.26,
  payback: "3.5–5 yrs",
} as const;

/**
 * The with-MPS curve: cap the top `SHAVE` fraction of the range, then add a
 * charging draw in the cheap solar-hours window (10:00–15:00).
 *
 * The charging bump deliberately pushes the green line *above* the red one in
 * that window. That is honest — charging is load — and it is the clearest way
 * to show what the system is actually doing.
 */
export function mpsCurve(curve: number[] = LOAD_CURVE, shave = SHAVE) {
  const max = Math.max(...curve);
  const min = Math.min(...curve);
  const cap = max - (max - min) * shave;
  return curve.map((v, h) => {
    const capped = Math.min(v, cap);
    return h >= 10 && h <= 15 ? Math.min(cap, capped + (max - min) * 0.16) : capped;
  });
}

export const rupees = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export function rupeesShort(n: number) {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(1).replace(/\.0$/, "") + " Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(1).replace(/\.0$/, "") + " L";
  return rupees(n);
}
