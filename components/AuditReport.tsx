"use client";

import React, { useMemo, useState } from "react";
import ContactDialog from "./ContactDialog";
import { DELIVERABLES, ECONOMICS, rupees, rupeesShort } from "@/lib/segments";
import { Reveal, RevealLine } from "./motion/Reveal";
import { track, trackOnce } from "@/lib/analytics";

const BILL_BANDS = [
  { label: "< ₹1 L", value: 75_000 },
  { label: "₹1–5 L", value: 300_000 },
  { label: "₹5–15 L", value: 1_000_000 },
  { label: "₹15–40 L", value: 2_500_000 },
  { label: "₹40 L+", value: 4_500_000 },
];

/**
 * What you receive, and what it's worth — one row, not two stacked blocks.
 *
 * The deliverables were four large cards in a 2×2, which is a lot of height
 * for four short paragraphs. They're a numbered ledger now, which reads
 * faster and fills the estimator's height instead of fighting it. Inside the
 * estimator the two sliders and the result sit side by side on wide screens
 * rather than stacking. Copy is unchanged throughout.
 */
export default function AuditReport() {
  const [bill, setBill] = useState(800_000);
  const [dieselShare, setDieselShare] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);

  const result = useMemo(() => {
    const d = dieselShare / 100;
    const rate = Math.min(ECONOMICS.baseSavingsRate + d * 0.35, 0.55);
    const monthly = bill * rate;
    const litres = ((bill * d) / ECONOMICS.dieselPerUnit) * ECONOMICS.litresPerUnit * 12;
    return { monthly, annual: monthly * 12, litres };
  }, [bill, dieselShare]);

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-sheet section-y">
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <div className="grid gap-10 xl:grid-cols-[1fr_1.05fr] xl:gap-14 xl:items-center">

            {/* ── left: the promise + the ledger of deliverables ── */}
            <div className="flex flex-col">
              <Reveal dir="none">
                <p className="t-label tick-row">What you walk away with</p>
              </Reveal>

              <h2 className="t-h2 uppercase">
                <RevealLine as="span" className="font-light">The audit is</RevealLine>
                <RevealLine as="span" delay={100} className="text-brand-deep">the product.</RevealLine>
              </h2>

              <Reveal delay={140}>
                <p className="t-lede mt-5 max-w-[42ch]">
                  Nobody wakes up wanting a battery. They wake up angry about a
                  bill. So we sell the measurement first.
                </p>
              </Reveal>

              <ol className="mt-9 border-t border-hair">
                {DELIVERABLES.map((d, i) => (
                  <Reveal
                    key={d.n}
                    dir="up"
                    delay={i * 80}
                    as="li"
                    className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-hair py-4 sm:grid-cols-[3rem_11rem_1fr] sm:gap-5"
                  >
                    <span className="t-label !text-brand-deep pt-1">{d.n}</span>
                    <span className="t-h3 text-[1.05rem] leading-snug">{d.t}</span>
                    <span className="t-body col-span-2 text-[13.5px] sm:col-span-1">
                      {d.d}
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* ── right: the estimator ── */}
            <Reveal dir="right" delay={120}>
              <div className="border border-hair bg-paper p-6 md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="t-h3">What would this save you?</h3>
                  <p className="t-label">Rough it out first</p>
                </div>

                {/* inputs, side by side */}
                <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label htmlFor="bill" className="t-label block">Average monthly power bill</label>
                    <output htmlFor="bill" className="tnum mt-2 block text-[clamp(1.4rem,3.2vw,2rem)] tracking-tight text-ink">
                      {rupees(bill)}
                    </output>
                    <input id="bill" type="range" min={50_000} max={5_000_000} step={50_000}
                      value={bill} onChange={(e) => { setBill(+e.target.value); trackOnce("estimator_used", { input: "bill" }); }} className="range-paper mt-3.5" />
                  </div>

                  <div>
                    <label htmlFor="diesel" className="t-label block">Share of power from diesel</label>
                    <output htmlFor="diesel" className="tnum mt-2 block text-[clamp(1.4rem,3.2vw,2rem)] tracking-tight text-ink">
                      {dieselShare}%
                    </output>
                    <input id="diesel" type="range" min={0} max={60} step={1}
                      value={dieselShare} onChange={(e) => { setDieselShare(+e.target.value); trackOnce("estimator_used", { input: "diesel_share" }); }} className="range-paper mt-3.5" />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {BILL_BANDS.map((b) => (
                    <button key={b.label} type="button" onClick={() => setBill(b.value)}
                      className="t-label border border-hair px-3 py-1.5 transition-colors duration-300 hover:border-brand hover:!text-ink">
                      {b.label}
                    </button>
                  ))}
                </div>

                {/* result — number beside the breakdown, not above it */}
                <div className="mt-8 grid gap-6 rule-t pt-6 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <div>
                    <p className="t-label">Indicative annual saving</p>
                    <p className="tnum mt-1.5 text-[clamp(2rem,6vw,3rem)] leading-none tracking-tight text-brand-deep">
                      {rupeesShort(result.annual)}
                    </p>
                  </div>
                  <dl className="self-center">
                    <Row k="Monthly saving" v={rupees(result.monthly)} />
                    <Row k="Estimated payback" v={ECONOMICS.payback} />
                    <Row k="Diesel litres avoided / yr"
                      v={result.litres >= 1000 ? `${Math.round(result.litres / 1000)}k L` : `${Math.round(result.litres)} L`} />
                  </dl>
                </div>

                <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  <button onClick={() => setDialogOpen(true)} className="btn btn--primary w-full">
                    Book the free audit
                  </button>
                  <a href="https://wa.me/919718204687" target="_blank" rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { location: "estimator" })}
                    className="btn btn--outline w-full">
                    Or message us on WhatsApp
                  </a>
                </div>

                <p className="t-label mt-3 !tracking-[0.1em] normal-case">
                  We reply within one working day.
                </p>

                <details className="group mt-5">
                  <summary className="t-label cursor-pointer list-none marker:hidden hover:!text-ink">
                    How this is calculated
                    <span className="ml-1.5 inline-block transition-transform group-open:rotate-90">›</span>
                  </summary>
                  <p className="mt-3 text-[11.5px] leading-relaxed text-ink-3">
                    Indicative only. Model uses a genset at roughly ₹{ECONOMICS.dieselPerUnit}/kWh
                    (₹92/L at 0.28 L/kWh) against industrial grid tariffs of ₹8–12/kWh, and the
                    ToD peak multiplier of at least 1.2× set by the Electricity (Rights of
                    Consumers) Rules. Your real number depends on your load curve, your DISCOM
                    and your tariff category — which is what the audit measures.
                  </p>
                </details>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} type="energy-audit" />
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-hair py-2 text-sm last:border-0">
      <dt className="text-ink-2">{k}</dt>
      <dd className="tnum text-ink">{v}</dd>
    </div>
  );
}
