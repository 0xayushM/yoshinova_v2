"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import LoadCurve from "./LoadCurve";
import ContactDialog from "./ContactDialog";
import { FINDINGS, rupeesShort } from "@/lib/segments";

const STEPS = [
  {
    n: "01",
    t: "Your day today",
    d: "One sharp evening peak sets the demand charge on your whole monthly bill — and the genset covers the gap when the grid drops out.",
  },
  {
    n: "02",
    t: "What the audit finds",
    d: "Our Chief Energy Advisor walks your floor with a logger and a power quality analyser, and pins every leak to the hour it happens.",
  },
  {
    n: "03",
    t: "After a right-sized MPS",
    d: "The system charges in the cheap solar-hours window and discharges through your peak. The curve flattens. The genset stays off.",
  },
] as const;

const STEP_SECONDS = 7;

/**
 * Replaces Sections 4–9 — the six full-screen zone deep-dives that existed
 * only to park the 3D model in frame, and which duplicated the zone grid in
 * Section 3_2 that already links to each service page.
 *
 * What goes here instead is the thing the visitor is actually being asked to
 * buy: the audit.
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
        progressRef.current +=
          (target - progressRef.current) * Math.min(dt * 3.2, 1);
        if (Math.abs(progressRef.current - target) < 0.001)
          progressRef.current = target;
      }
      tick((n) => (n + 1) % 1000);

      if (!reduced && !manualRef.current) {
        timerRef.current += dt;
        barRefs.current.forEach((el, i) => {
          if (el)
            el.style.width =
              i === step ? `${(timerRef.current / STEP_SECONDS) * 100}%` : "0%";
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

  const onReadout = useCallback(
    (r: { peak: number; dieselHours: number; cost: number }) => {
      setReadout((prev) =>
        Math.abs(prev.peak - r.peak) < 0.5 &&
        prev.dieselHours === r.dieselHours &&
        Math.abs(prev.cost - r.cost) < 50
          ? prev
          : r,
      );
    },
    [],
  );

  const pick = (i: number) => {
    manualRef.current = true;
    timerRef.current = 0;
    barRefs.current.forEach((el) => el && (el.style.width = "0%"));
    setStep(i);
  };

  const after = progressRef.current > 0.5;

  return (
    <>
      <section className="w-screen relative overflow-hidden bg-[#0a0a0a] py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 md:px-8 lg:px-12">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
            Inside an energy audit
          </p>
          <h2 className="text-white uppercase text-[clamp(1.75rem,5.5vw,3.75rem)] font-light leading-[1] tracking-tighter">
            We don&apos;t estimate
          </h2>
          <h2 className="text-[#8BC34A] uppercase text-[clamp(1.75rem,5.5vw,3.75rem)] font-normal leading-[1] tracking-tighter">
            your bill. We measure it.
          </h2>
          <p className="text-white/70 text-sm md:text-base lg:text-lg mt-5 max-w-2xl leading-relaxed">
            Thirty days of interval data from your own meter, plotted against
            your DISCOM&apos;s Time-of-Day windows. Walk the three steps below —
            what your day costs now, what we find on the floor, and what a
            right-sized MPS does to the curve.
          </p>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_1fr] xl:gap-10 xl:items-stretch">
            {/* ---------- the chart ---------- */}
            <div className="flex flex-col border border-white/15 bg-white/[0.03] backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 px-4 py-3">
                <span className="text-white/50 text-[11px] uppercase tracking-widest">
                  Industrial · 24-hour load profile
                </span>
                <span className="flex gap-4 text-[10.5px] text-white/50">
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-0.5 w-3.5 bg-[#EF4444]" />
                    Today
                  </span>
                  <span className="flex items-center gap-1.5">
                    <i className="inline-block h-0.5 w-3.5 bg-[#8BC34A]" />
                    With MPS
                  </span>
                </span>
              </div>

              {/* flex-1 + min-h: the canvas grows into whatever height the
                  grid gives the column, so there is never an empty block. */}
              <div className="relative flex-1 min-h-[290px] md:min-h-[380px]">
                <LoadCurve
                  progress={progressRef.current}
                  step={step}
                  onReadout={onReadout}
                  reducedMotion={reduced}
                />
              </div>

              <div className="grid grid-cols-3 gap-px border-t border-white/15 bg-white/15">
                <Readout
                  k="Peak demand"
                  v={`${Math.round(readout.peak).toLocaleString("en-IN")} kW`}
                  tone={after ? "good" : "none"}
                />
                <Readout
                  k="Diesel hours / day"
                  v={`${readout.dieselHours} hr${readout.dieselHours === 1 ? "" : "s"}`}
                  tone={readout.dieselHours === 0 ? "good" : "bad"}
                />
                <Readout
                  k="Cost of this day"
                  v={rupeesShort(readout.cost)}
                  tone={after ? "good" : "bad"}
                />
              </div>

              <p className="px-4 py-3 text-[11px] text-white/35 border-t border-white/10">
                Drag across the chart to scrub the hour
                {!reduced && " · steps advance automatically"}
              </p>
            </div>

            {/* ---------- the steps + findings ---------- */}
            <div className="flex flex-col gap-2.5 xl:h-full">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => pick(i)}
                  aria-current={step === i}
                  className={`relative overflow-hidden border p-4 text-left transition-colors ${
                    step === i
                      ? "border-[#8BC34A]/60 bg-[#8BC34A]/10"
                      : "border-white/15 hover:border-white/35"
                  }`}
                >
                  <span
                    className={`text-[11px] uppercase tracking-widest ${
                      step === i ? "text-[#8BC34A]" : "text-white/40"
                    }`}
                  >
                    Step {s.n}
                  </span>
                  <span className="mt-1.5 block text-white text-lg md:text-xl">
                    {s.t}
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-relaxed text-white/60">
                    {s.d}
                  </span>
                  <span
                    ref={(el) => {
                      barRefs.current[i] = el;
                    }}
                    className="absolute bottom-0 left-0 block h-0.5 w-0 bg-[#8BC34A]"
                  />
                </button>
              ))}

              {/* the leak register — appears with step 2 */}
              <div
                className={`border border-white/15 transition-opacity duration-500 ${
                  step === 1 ? "opacity-100" : "opacity-45"
                }`}
              >
                <p className="border-b border-white/15 px-4 py-2.5 text-[11px] uppercase tracking-widest text-[#F59E0B]">
                  Leak register — sample
                </p>
                <ul className="divide-y divide-white/10">
                  {FINDINGS.map((f) => (
                    <li key={f.label} className="px-4 py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-white text-[13.5px]">
                          {f.label}
                        </span>
                        <span className="tnum shrink-0 text-[#F59E0B] text-[12.5px]">
                          {f.cost}
                        </span>
                      </div>
                      <p className="mt-1 text-[11.5px] text-white/40">
                        {f.instrument} · {String(f.hour).padStart(2, "0")}:00
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setDialogOpen(true)}
                className="mt-1 inline-block btn-slide btn-slide--solid bg-[#6A9F30] px-6 py-4 text-white text-xs md:text-sm uppercase tracking-widest cursor-pointer"
              >
                Get this report for your floor — free
              </button>
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

function Readout({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone: "good" | "bad" | "none";
}) {
  return (
    <div className="bg-[#0a0a0a] px-3 py-3.5">
      <div className="text-[9.5px] uppercase tracking-widest text-white/40">
        {k}
      </div>
      <div
        className={`tnum mt-1.5 text-[clamp(16px,4.4vw,24px)] tracking-tight ${
          tone === "good"
            ? "text-[#8BC34A]"
            : tone === "bad"
              ? "text-[#EF4444]"
              : "text-white"
        }`}
      >
        {v}
      </div>
    </div>
  );
}
