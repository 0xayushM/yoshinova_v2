"use client";

import React, { useState } from "react";
import ContactDialog from "./ContactDialog";
import { Reveal } from "./motion/Reveal";

/** Footer. All contact detail preserved, restacked on the sheet. */
export default function Section13() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <footer className="slide-over mobile-bar-clearance relative overflow-hidden bg-ink pt-20 md:pt-28">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          {/* the ask */}
          <Reveal dir="left">
            <p className="t-label !text-white/45">Start here</p>
            <h2 className="t-h2 mt-4 !text-paper font-light">
              Start With an<br />Energy Audit
            </h2>
            <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-white/60">
              We find your hidden savings first. Then we talk MPS.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <button onClick={() => setIsDialogOpen(true)} className="btn btn--onInk">
                Request Energy Audit
              </button>
              <a href="https://wa.me/919718204687" target="_blank" rel="noopener noreferrer" className="btn btn--onInk">
                WhatsApp
              </a>
            </div>
            <p className="mt-10 text-[15px] leading-relaxed text-white/50">
              Energy Audit → Right-sized MPS → Permanent cost reduction.
            </p>
          </Reveal>

          {/* the details */}
          <Reveal dir="right" delay={100}>
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="t-label !text-white/40">Yoshinova</dt>
                <dd className="mt-2 text-[13px] leading-relaxed text-white/70">
                  Your Energy Profitability Partner
                </dd>
              </div>
              <div>
                <dt className="t-label !text-white/40">General Enquiries</dt>
                <dd className="mt-2">
                  <a href="mailto:projecthead@ojasmobility.com" className="text-[13px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand">
                    projecthead@ojasmobility.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-label !text-white/40">New Projects</dt>
                <dd className="mt-2">
                  <a href="mailto:projecthead@ojasmobility.com" className="text-[13px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand">
                    projecthead@ojasmobility.com
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-label !text-white/40">Phone</dt>
                <dd className="mt-2">
                  <a href="tel:+919718204687" className="text-[13px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand">
                    +91 97182 04687
                  </a>
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="t-label !text-white/40">Address</dt>
                <dd className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-white/70">
                  Ojas Mobility LLP, Part-B, Plot No. 103, Udyog Vihar,
                  Delhi-Rohtak Road, Vill-Sankhol, Bahadurgarh -124507, Haryana
                </dd>
              </div>
              <div>
                <dt className="t-label !text-white/40">Follow</dt>
                <dd className="mt-2">
                  <a href="https://www.linkedin.com/company/yoshinova/" target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/80 underline underline-offset-4 transition-colors hover:text-brand">
                    LinkedIn
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* ── wordmark ──
            Drawn as SVG text, not HTML text.

            Sizing it with `clamp(3rem, 15vw, 13rem)` was a guess about how
            wide nine capitals of a display face would render, and the guess
            was wrong on narrow screens: the word came out a few pixels wider
            than its column and the final A was sliced off by the parent's
            overflow-hidden. It also can't be right in general — the answer
            depends on the font's metrics, not on the viewport.

            An SVG viewBox makes the fit exact by construction: the artwork
            is declared 1000×160 and scaled to whatever width the column
            happens to be, so it lands flush at every size. `textLength`
            pins the glyph run to the full 1000 units, so the word always
            spans the column edge to edge — no clipping, no short measure. */}
        <div className="relative mt-20 border-t border-white/12 pt-10">
          <svg
            viewBox="0 0 1000 160"
            className="block w-full select-none"
            role="img"
            aria-label="Yoshinova"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="wordmark-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5F5F2" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#F5F5F2" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <text
              x="500"
              y="130"
              textAnchor="middle"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#wordmark-fade)"
              style={{ fontFamily: "var(--font-display)", fontSize: "150px", letterSpacing: "-0.04em" }}
            >
              YOSHINOVA
            </text>
          </svg>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 sm:flex-row">
          <p className="t-label !text-white/35">
            © {new Date().getFullYear()} Yoshinova. All rights reserved.
            <a href="/privacy" className="ml-4 underline underline-offset-4 hover:!text-paper">
              Privacy Policy
            </a>
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group t-label flex items-center gap-2 !text-white/50 transition-colors hover:!text-paper"
          >
            Back to top
            <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>

      <ContactDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} type="energy-audit" />
    </footer>
  );
}
