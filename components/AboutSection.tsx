"use client";

import { CurtainLink } from "./Curtain";
import { Reveal, RevealLine } from "./motion/Reveal";

/**
 * The platform statement. Was a dark video wall; now a quiet sheet with the
 * footage as a watermark and the statement set as the only object on it.
 * Copy unchanged.
 */
export default function AboutSection() {
  return (
    <section className="slide-over relative overflow-hidden bg-sheet py-24 md:py-36">
      <div className="absolute inset-0">
        <video
          className="video-paper h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/about_poster.jpg"
        >
          <source src="/video/about.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sheet via-sheet/70 to-sheet" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 sm:px-8 md:px-10 lg:px-14">
        <Reveal dir="none">
          <p className="t-label tick-row">Our platform</p>
        </Reveal>

        <h2 className="t-h2 max-w-[20ch] font-light">
          <RevealLine as="span">We measure what your</RevealLine>
          <RevealLine as="span" delay={90}>power actually costs,</RevealLine>
          <RevealLine as="span" delay={180}>then build the system</RevealLine>
          <RevealLine as="span" delay={270}>that lowers it.</RevealLine>
        </h2>

        <Reveal delay={620} className="mt-12">
          <p className="t-label mb-4">Learn More</p>
          <CurtainLink
            href="/about"
            className="group inline-flex items-center gap-4 border-b-2 border-brand pb-2 transition-colors duration-300 hover:border-ink"
          >
            <span className="text-ink text-base md:text-lg">Our Platform</span>
            <svg className="h-5 w-5 text-brand-deep transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </CurtainLink>
        </Reveal>
      </div>
    </section>
  );
}
