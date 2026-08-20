/**
 * The objections a factory owner actually raises, in the order they raise
 * them. These are written to be answered plainly — an FAQ that dodges reads
 * worse than no FAQ.
 *
 * ⚠️ NEEDS YOUR SIGN-OFF. Two answers below are my best reconstruction from
 * the service-page copy and are marked inline. Specifically:
 *   · how long the audit takes on site
 *   · warranty terms
 * Correct them before launch — a wrong answer here costs more than a missing
 * one, because it gets quoted back to you in a sales call.
 */

export interface Faq {
  q: string;
  a: string;
  /** flagged answers are placeholders pending client confirmation */
  needsConfirmation?: boolean;
}

export const FAQS: Faq[] = [
  {
    q: "What does the energy audit cost?",
    a: "There is a modest charge, and it scales with your facility — meter count, floor area and how many load points we instrument — so we can only quote it once we understand your site. It is deliberately small: most reports pay for themselves several times over, and several findings usually cost nothing to fix. Our Chief Energy Advisor walks your floor, pulls 30 days of interval data from your meter, and hands you a report with every finding priced per month — and it is yours whether or not you ever buy hardware from us.",
  },
  {
    q: "How long does the audit take?",
    a: "A half-day on site for most facilities, then roughly a week to compile the report while we log a full 30 days of load data. Larger multi-meter plants take longer; we will tell you upfront if yours does.",
    needsConfirmation: true,
  },
  {
    q: "What is an MPS, and how is it different from a BESS?",
    a: "MPS stands for Machine Protection System. It is the same underlying technology as a battery energy storage system — lithium-iron-phosphate cells, a battery management system, an inverter — but sized and built in modules against your measured load curve rather than sold as a fixed catalogue product. If you have been quoted for a BESS elsewhere, you are comparing like with like.",
  },
  {
    q: "What is the payback period?",
    a: "Typically three and a half to six years depending on your tariff category, how much of your power currently comes from a genset, and how sharp your peak is. Diesel-heavy sites pay back fastest, because displacing fuel at roughly ₹26 a unit with grid power at ₹8–12 is a much bigger delta than tariff arbitrage alone. The audit is what turns that range into your number.",
  },
  {
    q: "Do I have to buy anything after the audit?",
    a: "Usually a few things, yes. The audit almost always surfaces fixes and upgrades worth installing, and your advisor will recommend the specific ones that matter for your floor. But nothing is recommended on faith — each one is costed against the savings and efficiency it unlocks, so the return easily justifies the spend before you commit. We recommend only what pays back; if something does not on your site, we will tell you to skip it.",
  },
  {
    q: "Will installation interrupt production?",
    a: "Rarely. Systems ship pre-assembled and switchgear cut-overs are scheduled around your shifts, so most lines never see the change. Commissioning typically runs five to seven days from delivery.",
  },
  {
    q: "What warranty do you offer?",
    a: "LFP cells rated to 6,000+ cycles, with the system covered under warranty and a live dashboard pushing state of charge, kWh discharged and rupees saved to your phone so you can verify performance as it accrues.",
    needsConfirmation: true,
  },
  {
    q: "Where do you operate?",
    a: "Across India, manufacturing from our IMS-certified facility in Bahadurgarh, Haryana. We have deployed from Pune to Pithampur; if you are unsure whether we cover your location, ask — we will tell you straight.",
  },
];
