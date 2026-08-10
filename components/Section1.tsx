"use client";

import React from "react";
import HeroMosaic from "./HeroMosaic";
import { Reveal, CountUp } from "./motion/Reveal";

/**
 * Hero = the scroll-driven mosaic, followed by the metric band.
 *
 * The band is the bridge into "the dual bleed", so it's built as an
 * instrument panel rather than four boxes: an index per reading, a hairline
 * that fills on approach, and the tone carrying the meaning — rust is what
 * you're paying, green is what you keep.
 */
const METRICS = [
  {
    n: "01",
    v: <><CountUp to={28} prefix="₹" />–28</>,
    k: "per unit on diesel",
    sub: "at ₹92/L, 0.28 L per kWh",
    tone: "rust" as const,
  },
  {
    n: "02",
    v: <><CountUp to={1.2} decimals={1} />×</>,
    k: "minimum peak-hour ToD multiplier",
    sub: "Electricity (Rights of Consumers) Rules",
    tone: "rust" as const,
  },
  {
    n: "03",
    v: <>−<CountUp to={40} />%</>,
    k: "typical peak demand after MPS",
    sub: "measured against unmanaged load",
    tone: "brand" as const,
  },
  {
    n: "04",
    v: <>₹<CountUp to={0} /></>,
    k: "cost of the audit that proves it",
    sub: "the report is yours either way",
    tone: "brand" as const,
  },
];

export default function Section1() {
  return (
    <>
      <HeroMosaic />

      <section className="relative bg-paper pb-16 pt-10 md:pb-20">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <Reveal dir="none">
            <p className="t-label tick-row">What the numbers say</p>
          </Reveal>

          <dl className="grid grid-cols-1 gap-px border-y border-hair bg-hair sm:grid-cols-2 lg:grid-cols-4">
            {METRICS.map((m, i) => (
              <Reveal
                key={m.n}
                dir="up"
                delay={i * 90}
                className="group relative flex flex-col justify-between bg-paper px-6 py-8 transition-colors duration-500 hover:bg-sheet"
              >
                <div className="flex items-start justify-between">
                  <span className="t-label">{m.n}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      m.tone === "rust" ? "bg-rust" : "bg-brand"
                    }`}
                  />
                </div>

                <dt
                  className={`tnum mt-10 text-[clamp(2rem,4.6vw,3.1rem)] leading-none tracking-[-0.04em] ${
                    m.tone === "rust" ? "text-rust" : "text-brand-deep"
                  }`}
                >
                  {m.v}
                </dt>

                <dd className="mt-4">
                  {/* accent rule draws itself in as the card is approached */}
                  <span
                    className={`block h-px w-8 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full ${
                      m.tone === "rust" ? "bg-rust/50" : "bg-brand/50"
                    }`}
                  />
                  <span className="mt-3 block text-[13.5px] leading-snug text-ink">
                    {m.k}
                  </span>
                  <span className="mt-1.5 block text-[11.5px] leading-snug text-ink-3">
                    {m.sub}
                  </span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
