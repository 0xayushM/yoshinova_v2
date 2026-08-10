"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import LoadCurve from "./LoadCurve";
import ContactDialog from "./ContactDialog";
import { FINDINGS, rupeesShort } from "@/lib/segments";
import { Reveal, RevealLine } from "./motion/Reveal";

const STEPS = [
  { n: "01", t: "Your day today", d: "One evening peak sets the demand charge on your whole month. The genset covers the rest." },
  { n: "02", t: "What the audit finds", d: "Every leak pinned to the hour it happens, priced per month." },
  { n: "03", t: "After a right-sized MPS", d: "Charges cheap, discharges through your peak. The genset stays off." },
] as const;

const STEP_SECONDS = 7;

/**
 * The audit, in two rows.
 *
 * Row 1 — the chart and the three process steps, side by side.
 * Row 2 — the leak register as a four-across strip, then the ask.
 *
 * The chart height is fixed rather than flex-grown. An earlier version let
 * the canvas absorb whatever height the grid gave it, which killed the empty
 * block but stretched the plot to a full screen when the step column grew.
 * A load curve doesn't get more readable past ~420px tall; it just gets
 * taller.
 */
export default function AuditWalkthrough() {
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [readout, setReadout] = useState({ peak: 0, dieselHours: 0, cost: 0 });

  const progressRef = useRef(0);
  const [, tick] = useState(0);
  const timerRef = useRef(0);
  const manualRef = useRef(false);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const target = step === 2 ? 1 : 0;
      if (reduced) progressRef.current = target;
      else {
        progressRef.current += (target - progressRef.current) * Math.min(dt * 3.2, 1);
        if (Math.abs(progressRef.current - target) < 0.001) progressRef.current = target;
      }
      tick((n) => (n + 1) % 1000);

      if (!reduced && !manualRef.current) {
        timerRef.current += dt;
        barRefs.current.forEach((el, i) => {
          if (el) el.style.width = i === step ? `${(timerRef.current / STEP_SECONDS) * 100}%` : "0%";
        });
        if (timerRef.current >= STEP_SECONDS) {
          timerRef.current = 0;
          setStep((s) => (s + 1) % 3);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [step, reduced]);

  const onReadout = useCallback((r: { peak: number; dieselHours: number; cost: number }) => {
    setReadout((prev) =>
      Math.abs(prev.peak - r.peak) < 0.5 && prev.dieselHours === r.dieselHours && Math.abs(prev.cost - r.cost) < 50 ? prev : r,
    );
  }, []);

  const pick = (i: number) => {
    manualRef.current = true;
    timerRef.current = 0;
    barRefs.current.forEach((el) => el && (el.style.width = "0%"));
    setStep(i);
  };

  const after = progressRef.current > 0.5;

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-paper section-y">
        <div className="sheet-grid pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          {/* ── header ── */}
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Reveal dir="none">
                <p className="t-label tick-row">Inside an energy audit</p>
              </Reveal>
              <h2 className="t-h2 uppercase">
                <RevealLine as="span" className="font-light">We don&apos;t estimate</RevealLine>
                <RevealLine as="span" delay={100} className="text-brand-deep">your bill. We measure it.</RevealLine>
              </h2>
            </div>
            <Reveal dir="right" delay={140}>
              <p className="t-body max-w-[34ch] lg:text-right">
                Thirty days of your own meter data, against your DISCOM&apos;s
                ToD windows.
              </p>
            </Reveal>
          </div>

          {/* ══ ROW 1 — the chart and the process ══ */}
          <div className="mt-12 grid gap-5 xl:grid-cols-[1.5fr_1fr] xl:items-stretch">
            <Reveal dir="left" className="flex flex-col border border-hair bg-sheet">
              <div className="flex flex-wrap items-center justify-between gap-3 rule-b px-5 py-3.5">
                <span className="t-label">Industrial · 24-hour load profile</span>
                <span className="flex gap-4 text-[10.5px] text-ink-3">
                  <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-3.5 bg-rust" />Today</span>
                  <span className="flex items-center gap-1.5"><i className="inline-block h-0.5 w-3.5 bg-brand-deep" />With MPS</span>
                </span>
              </div>

              {/* fixed height — a load curve gains nothing past ~420px */}
              <div className="relative h-[300px] md:h-[380px] xl:h-[420px]">
                <LoadCurve progress={progressRef.current} step={step} onReadout={onReadout} reducedMotion={reduced} />
              </div>

              <div className="mt-auto grid grid-cols-3 gap-px rule-t bg-hair">
                <Readout k="Peak demand" v={`${Math.round(readout.peak).toLocaleString("en-IN")} kW`} tone={after ? "good" : "none"} />
                <Readout k="Diesel hours / day" v={`${readout.dieselHours} hr${readout.dieselHours === 1 ? "" : "s"}`} tone={readout.dieselHours === 0 ? "good" : "bad"} />
                <Readout k="Cost of this day" v={rupeesShort(readout.cost)} tone={after ? "good" : "bad"} />
              </div>
            </Reveal>

            {/* the three steps */}
            <div className="flex flex-col gap-3">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => pick(i)}
                  aria-current={step === i}
                  className={`relative flex-1 overflow-hidden border p-5 text-left transition-colors duration-300 ${
                    step === i ? "border-brand bg-brand/8" : "border-hair bg-sheet hover:border-ink-3"
                  }`}
                >
                  <span className={`t-label ${step === i ? "!text-brand-deep" : ""}`}>Step {s.n}</span>
                  <span className="t-h3 mt-2 block">{s.t}</span>
                  <span className="t-body mt-2 block text-[13.5px]">{s.d}</span>
                  <span ref={(el) => { barRefs.current[i] = el; }} className="absolute bottom-0 left-0 block h-0.5 w-0 bg-brand" />
                </button>
              ))}
              <p className="t-label !tracking-[0.1em]">
                Drag across the chart to scrub the hour
                {!reduced && " · steps advance automatically"}
              </p>
            </div>
          </div>

          {/* ══ ROW 2 — the leak register, four across ══ */}
          <Reveal dir="up" delay={80} className="mt-5">
            <div className="border border-hair bg-sheet">
              <div className="flex flex-wrap items-center justify-between gap-3 rule-b px-5 py-3.5">
                <span className="t-label !text-amber">Leak register — sample</span>
                <span className="t-label">
                  What a real audit hands you, priced per month
                </span>
              </div>

              <ol className="grid gap-px bg-hair sm:grid-cols-2 xl:grid-cols-4">
                {FINDINGS.map((f) => (
                  <li key={f.label} className="flex flex-col bg-sheet p-5">
                    <span className="tnum t-label !text-amber">
                      {String(f.hour).padStart(2, "0")}:00
                    </span>
                    <span className="t-h3 mt-3 block text-[1.05rem] leading-snug">
                      {f.label}
                    </span>
                    <span className="tnum mt-3 block text-[15px] text-amber">
                      {f.cost}
                    </span>
                    <span className="mt-auto pt-5 t-label !tracking-[0.1em] normal-case">
                      {f.instrument}
                    </span>
                  </li>
                ))}
              </ol>

              {/* the ask, on the same plate */}
              <div className="flex flex-col items-start justify-between gap-4 rule-t px-5 py-5 sm:flex-row sm:items-center">
                <p className="t-body max-w-[44ch] text-[14px]">
                  Instrument readings, not industry averages.
                </p>
                <button onClick={() => setDialogOpen(true)} className="btn btn--primary shrink-0">
                  Get this report for your floor — free
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} type="energy-audit" />
    </>
  );
}

function Readout({ k, v, tone }: { k: string; v: string; tone: "good" | "bad" | "none" }) {
  return (
    <div className="bg-sheet px-4 py-4">
      <div className="t-label">{k}</div>
      <div className={`tnum mt-1.5 text-[clamp(1rem,2.6vw,1.5rem)] tracking-tight ${tone === "good" ? "text-brand-deep" : tone === "bad" ? "text-rust" : "text-ink"}`}>
        {v}
      </div>
    </div>
  );
}
