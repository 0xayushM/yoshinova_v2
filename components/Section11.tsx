"use client";

import React, { useState } from "react";
import Image from "next/image";
import ContactDialog from "./ContactDialog";
import { CurtainLink } from "./Curtain";
import { Reveal, RevealLine } from "./motion/Reveal";

const PILLARS = [
  { no: "01", title: "Chief Energy Advisor", description: "Every audit personally led. No juniors, no guesswork.", metric: "1:1", metricLabel: "Senior-led audits" },
  { no: "02", title: "Data-Driven Deployment", description: "MPS sized on your real load curve. ROI guaranteed, not estimated.", metric: "100%", metricLabel: "Real-data sizing" },
  { no: "03", title: "MSME-First Approach", description: "Built for India's industrial backbone — accessible, practical, proven.", metric: "In-house", metricLabel: "Assembly & R&D" },
];

const BADGES = [
  ["IMS", "Certified"],
  ["R&D", "Govt. Recognised"],
  ["LFP", "Chemistry"],
];

export default function Section11() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-paper section-y">
        <div className="sheet-grid pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <div className="grid gap-12 xl:grid-cols-2 xl:gap-16">
            <div>
              <Reveal dir="none">
                <p className="t-label tick-row flex items-center gap-3">
                  <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                  Who We Are
                </p>
              </Reveal>

              <h2 className="t-display uppercase">
                <RevealLine as="span" className="font-light">Built On</RevealLine>
                <RevealLine as="span" delay={110}>Trust<span className="text-brand-deep">.</span></RevealLine>
              </h2>

              <Reveal delay={180} className="mt-10 max-w-xl">
                <p className="t-label">What we do</p>
                <h3 className="t-h3 mt-3 font-normal leading-snug">
                  India&apos;s MSME Energy Profitability Partner — turning power
                  bills into <span className="text-brand-deep">profit margins</span>.
                </h3>

                <div className="mt-8 flex flex-wrap items-center gap-2.5">
                  <button onClick={() => setIsDialogOpen(true)} className="btn btn--primary group">
                    Talk to our advisor
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <CurtainLink href="/about" className="btn btn--outline">About Yoshinova</CurtainLink>
                </div>

                <dl className="mt-10 grid grid-cols-3 gap-6 rule-t pt-7">
                  {BADGES.map(([v, k]) => (
                    <div key={v}>
                      <dt className="text-2xl text-ink md:text-3xl">{v}</dt>
                      <dd className="t-label mt-1.5">{k}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* the facility plate */}
            <Reveal dir="right" delay={120}>
              <figure className="relative">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-2">
                  <Image
                    src="/images/residential2.webp"
                    alt="Yoshinova manufacturing facility, Bahadurgarh"
                    fill
                    sizes="(max-width: 1280px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute right-4 top-4 max-w-[220px] bg-paper/95 px-4 py-3 backdrop-blur-sm">
                    <p className="t-label">Live Site Status</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
                      <p className="text-sm text-ink">Operational</p>
                    </div>
                    <p className="mt-1.5 text-[11.5px] leading-snug text-ink-2">
                      IMS-certified facility — Bahadurgarh, Haryana
                    </p>
                  </div>
                </div>
                <figcaption className="t-label mt-3 flex items-center justify-between">
                  <span>Manufacturing — Bahadurgarh, Haryana</span>
                  <span className="text-brand-deep">Lithium-ion MPS, assembled in-house</span>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* three pillars */}
          <ol className="mt-16 grid gap-px border border-hair bg-hair md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.no} dir="up" delay={i * 110} className="flex h-full flex-col justify-between bg-sheet p-6 md:p-8">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="t-label">{p.no}</span>
                    <div className="text-right">
                      <p className="tnum text-2xl leading-none text-ink">{p.metric}</p>
                      <p className="t-label mt-1.5">{p.metricLabel}</p>
                    </div>
                  </div>
                  <h3 className="t-h3 mt-8 font-light">{p.title}</h3>
                  <p className="t-body mt-3">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
}
