"use client";

import React, { useState } from "react";
import ContactDialog from "./ContactDialog";
import { Reveal, RevealLine } from "./motion/Reveal";

/**
 * The differentiator. Was a dark photo overlay; now the one ink-filled plate
 * on the sheet, so it reads as a statement rather than another card. A
 * marquee of the method runs beneath it. Copy unchanged.
 */
const TICKER = [
  "Energy Audit",
  "Right-sized MPS",
  "Permanent cost reduction",
  "ROI guaranteed, not estimated",
  "Sized on your real load curve",
];

export default function Section10() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <section className="slide-over relative overflow-hidden bg-ink section-y-lg">
        <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
          <Reveal dir="none">
            <p className="t-label !text-white/45">Why Yoshinova</p>
          </Reveal>

          <h2 className="t-display mt-6 uppercase">
            <RevealLine as="span" className="!text-paper font-light">We audit first.</RevealLine>
            <RevealLine as="span" delay={110} className="!text-brand">Then we deploy.</RevealLine>
          </h2>

          <Reveal delay={180}>
            <p className="mt-8 max-w-[46ch] text-[clamp(1rem,1.6vw,1.25rem)] leading-relaxed text-white/70">
              Sized on your data, not industry averages. That&apos;s how we
              guarantee ROI instead of promising it.
            </p>
            <button onClick={() => setIsDialogOpen(true)} className="btn btn--onInk mt-9">
              Start With a Free Audit
            </button>
          </Reveal>
        </div>

        {/* method marquee */}
        {/* Two identical tracks side by side, each sliding a full width —
            the second is already in place when the first leaves, so the
            loop never shows a gap. */}
        <div className="marquee mt-20 border-y border-white/12 py-5" aria-hidden>
          {[0, 1].map((dup) => (
            <div className="marquee-track" key={dup}>
              {TICKER.map((t) => (
                <span key={`${dup}-${t}`} className="flex items-center gap-3 whitespace-nowrap text-[clamp(1rem,2.2vw,1.6rem)] text-white/35">
                  <span className="inline-block h-1.5 w-1.5 shrink-0 bg-brand" />
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </>
  );
}
