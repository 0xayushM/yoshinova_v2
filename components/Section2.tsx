"use client";

import Image from "next/image";
import React, { useState } from "react";
import ContactDialog from "./ContactDialog";
import { Reveal, RevealLine } from "./motion/Reveal";

/**
 * The dual bleed — the strongest argument on the site, so it gets the
 * clearest structure: a numbered ledger of what each leak costs. Copy is
 * unchanged; the numbers are pulled up from the body text so the eye can
 * price the problem before it reads a sentence.
 */
const LEDGER = [
  {
    n: "01",
    t: "Inside Bleed",
    d: "Poor power factor, idle load, inefficient motors. Costs you every shift.",
    metric: "0.82",
    metricLabel: "typical power factor we find",
    tone: "rust" as const,
  },
  {
    n: "02",
    t: "Outside Bleed",
    d: "ToD peak tariffs, and a genset covering every outage at ₹25+ a unit.",
    metric: "₹25+",
    metricLabel: "per unit on the genset",
    tone: "rust" as const,
  },
];

export default function Section2() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-paper section-y">
        <div className="sheet-grid pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <Reveal dir="none">
            <p className="t-label tick-row">The Problem We Solve</p>
          </Reveal>

          <h2 className="t-h2 uppercase">
            <RevealLine as="span" className="font-light">The dual bleed</RevealLine>
            <RevealLine as="span" delay={100}>in power costs</RevealLine>
          </h2>

          <div className="mt-14 grid gap-px border border-hair bg-hair lg:grid-cols-[0.85fr_1fr_1fr_1.1fr]">
            {/* the floor itself */}
            <Reveal dir="none" className="relative hidden min-h-[24rem] bg-paper-2 lg:block">
              <Image
                src="/images/industrial2.webp"
                alt="Industrial facility"
                fill
                sizes="25vw"
                className="object-cover grayscale"
                loading="lazy"
              />
              <span className="absolute bottom-4 left-4 t-label bg-paper px-2 py-1 text-ink">
                Your floor
              </span>
            </Reveal>

            {LEDGER.map((c, i) => (
              <Reveal key={c.n} dir="up" delay={i * 110} className="flex h-full flex-col justify-between bg-sheet p-6 md:p-8">
                <div>
                  <span className="t-label text-rust">{c.n}</span>
                  <h3 className="t-h3 mt-4">{c.t}</h3>
                  <p className="t-body mt-4">{c.d}</p>
                </div>
                <div className="mt-10 rule-t pt-5">
                  <p className="tnum text-3xl leading-none tracking-tight text-rust md:text-4xl">
                    {c.metric}
                  </p>
                  <p className="t-label mt-2">{c.metricLabel}</p>
                </div>
              </Reveal>
            ))}

            {/* the answer — the only filled block on the sheet */}
            <Reveal dir="up" delay={230} className="flex h-full flex-col justify-between bg-brand-deep p-6 md:p-8">
              <div>
                <span className="t-label !text-white/70">03</span>
                <h3 className="t-h3 mt-4 !text-white">Our Approach</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-white/90">
                  Audit first. Then a right-sized MPS. We earn the authority
                  before we sell the solution.
                </p>
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="btn btn--onGreen mt-10 self-start"
              >
                Book an Energy Audit
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
}
