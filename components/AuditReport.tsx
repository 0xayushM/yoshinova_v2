"use client";

import React, { useMemo, useState } from "react";
import ContactDialog from "./ContactDialog";
import { DELIVERABLES, ECONOMICS, rupees, rupeesShort } from "@/lib/segments";

const BILL_BANDS = [
  { label: "< ₹1 L", value: 75_000 },
  { label: "₹1–5 L", value: 300_000 },
  { label: "₹5–15 L", value: 1_000_000 },
  { label: "₹15–40 L", value: 2_500_000 },
  { label: "₹40 L+", value: 4_500_000 },
];

/**
 * Second half of the audit block. Answers the only two questions a factory
 * owner has after the walkthrough: what do I actually get, and what is it
 * worth?
 *
 * The estimator doubles as the lead magnet — by the time the visitor sees a
 * number that is theirs, the ask converts far better than a cold form.
 */
export default function AuditReport() {
  const [bill, setBill] = useState(800_000);
  const [dieselShare, setDieselShare] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);

  const result = useMemo(() => {
    const d = dieselShare / 100;
    // Diesel-heavy sites save more: displacing ₹26/unit with ₹10/unit grid
    // power is a bigger delta than tariff arbitrage alone.
    const rate = Math.min(ECONOMICS.baseSavingsRate + d * 0.35, 0.55);
    const monthly = bill * rate;
    const litres =
      ((bill * d) / ECONOMICS.dieselPerUnit) * ECONOMICS.litresPerUnit * 12;
    return { monthly, annual: monthly * 12, litres };
  }, [bill, dieselShare]);

  return (
    <>
      <section className="w-screen relative overflow-hidden bg-[#0e100e] py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 xl:grid-cols-[1.15fr_1fr] xl:gap-14 xl:items-stretch">
            {/* ---------- what you get ---------- */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                What you walk away with
              </p>
              <h2 className="text-white uppercase text-[clamp(1.75rem,5vw,3.25rem)] font-light leading-[1] tracking-tighter">
                The audit is
              </h2>
              <h2 className="text-[#8BC34A] uppercase text-[clamp(1.75rem,5vw,3.25rem)] font-normal leading-[1] tracking-tighter">
                the product.
              </h2>
              <p className="text-white/70 text-sm md:text-base mt-5 max-w-xl leading-relaxed">
                Nobody wakes up wanting a battery. They wake up angry about a
                bill. So we sell the measurement first — and the report is yours
                whether or not you ever buy hardware from us.
              </p>

              <ol className="mt-8 grid gap-px bg-white/10 border border-white/10 sm:grid-cols-2">
                {DELIVERABLES.map((d) => (
                  <li key={d.n} className="bg-[#0e100e] p-5 flex flex-col">
                    <span className="text-[#8BC34A] text-[11px] uppercase tracking-widest">
                      {d.n}
                    </span>
                    <h3 className="text-white text-lg md:text-xl mt-2">{d.t}</h3>
                    <p className="text-white/60 text-[13.5px] leading-relaxed mt-2">
                      {d.d}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* ---------- estimator ---------- */}
            <div className="border border-white/15 bg-white/[0.03] p-5 md:p-7 h-full">
              <p className="text-white/40 text-xs uppercase tracking-widest">
                Rough it out first
              </p>
              <h3 className="text-white text-[clamp(1.25rem,2.6vw,1.625rem)] mt-2">
                What would this save you?
              </h3>

              <div className="mt-6">
                <label
                  htmlFor="bill"
                  className="block text-[11px] uppercase tracking-widest text-white/45"
                >
                  Average monthly power bill
                </label>
                <output
                  htmlFor="bill"
                  className="tnum mt-2 block text-white text-[clamp(24px,6vw,36px)] tracking-tight"
                >
                  {rupees(bill)}
                </output>
                <input
                  id="bill"
                  type="range"
                  min={50_000}
                  max={5_000_000}
                  step={50_000}
                  value={bill}
                  onChange={(e) => setBill(+e.target.value)}
                  className="audit-range mt-4"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {BILL_BANDS.map((b) => (
                    <button
                      key={b.label}
                      type="button"
                      onClick={() => setBill(b.value)}
                      className="audit-tab border border-white/20 px-3 py-2 text-[11px] uppercase tracking-widest text-white/60 hover:border-[#8BC34A]/60 hover:text-white cursor-pointer"
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7">
                <label
                  htmlFor="diesel"
                  className="block text-[11px] uppercase tracking-widest text-white/45"
                >
                  Share of power from diesel
                </label>
                <output
                  htmlFor="diesel"
                  className="tnum mt-2 block text-white text-[clamp(24px,6vw,36px)] tracking-tight"
                >
                  {dieselShare}%
                </output>
                <input
                  id="diesel"
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={dieselShare}
                  onChange={(e) => setDieselShare(+e.target.value)}
                  className="audit-range mt-4"
                />
              </div>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-[11px] uppercase tracking-widest text-white/45">
                  Indicative annual saving
                </p>
                <p className="tnum text-[#8BC34A] text-[clamp(34px,9vw,56px)] leading-none tracking-tight mt-2">
                  {rupeesShort(result.annual)}
                </p>
                <dl className="mt-4">
                  <Row k="Monthly saving" v={rupees(result.monthly)} />
                  <Row k="Estimated payback" v={ECONOMICS.payback} />
                  <Row
                    k="Diesel litres avoided / yr"
                    v={
                      result.litres >= 1000
                        ? `${Math.round(result.litres / 1000)}k L`
                        : `${Math.round(result.litres)} L`
                    }
                  />
                </dl>
              </div>

              <button
                onClick={() => setDialogOpen(true)}
                className="mt-6 w-full btn-slide btn-slide--solid bg-[#6A9F30] px-6 py-4 text-white text-xs md:text-sm uppercase tracking-widest cursor-pointer"
              >
                Book the free audit
              </button>
              <a
                href="https://wa.me/919718204687"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 btn-slide btn-slide--light block w-full border border-white/40 px-6 py-4 text-center text-white text-xs md:text-sm uppercase tracking-widest"
              >
                Or message us on WhatsApp
              </a>

              <p className="mt-4 text-[11px] leading-relaxed text-white/35">
                Indicative only. Model uses a genset at roughly ₹
                {ECONOMICS.dieselPerUnit}/kWh (₹92/L at 0.28 L/kWh) against
                industrial grid tariffs of ₹8–12/kWh, and the ToD peak
                multiplier of at least 1.2× set by the Electricity (Rights of
                Consumers) Rules. Your real number depends on your load curve,
                your DISCOM and your tariff category — which is what the audit
                measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type="energy-audit"
      />
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-white/12 py-2.5 text-sm">
      <dt className="text-white/55">{k}</dt>
      <dd className="tnum text-white">{v}</dd>
    </div>
  );
}
