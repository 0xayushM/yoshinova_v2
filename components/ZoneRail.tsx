"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ZONES, type Zone } from "@/lib/zones";
import { CurtainLink, useCurtainRouter } from "./Curtain";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * MPS Deployment — a pinned horizontal rail.
 *
 * Desktop: the section pins and the rail travels sideways as you scroll, so
 * the six zones read as one continuous run rather than a grid you skim. The
 * intro panel is the first car on the rail, which means nothing is stranded
 * in a column while the cards move.
 *
 * Below 1024px: no pinning. Scroll-jacking on touch is where this pattern
 * usually goes wrong, so it degrades to a native snap-scroll rail you flick
 * with a thumb — same cards, same order, no hijacked gestures.
 */
export default function ZoneRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(true);

  /* On a phone the intro panel as the first car ate the whole viewport, so
     the first zone card was clipped to a sliver and the copy sat above a
     tall empty gap. Below lg the intro becomes a normal block above the rail
     and the rail carries only the six cards. Rendered once either way — no
     duplicate headings. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        pinned: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        flat: "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      },
      (ctx) => {
        if (!ctx.conditions?.pinned) return;

        const distance = () => track.scrollWidth - window.innerWidth + 96;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              setActive(Math.round(self.progress * (ZONES.length - 1)));
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { x: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="slide-over relative overflow-hidden bg-brand-deep py-14 lg:h-[100svh] lg:py-0"
    >
      {/* section index, sits above the rail on desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-14 pt-10 lg:flex">
        <p className="t-label !text-white/60">Service 02 — MPS Deployment</p>
        <p className="t-label !text-white/60 tnum">
          {String(active + 1).padStart(2, "0")} / {String(ZONES.length).padStart(2, "0")}
        </p>
      </div>

      {/* phones: the intro reads as a normal block, above the rail */}
      {!desktop && (
        <div className="px-5 pb-9 sm:px-8 md:px-10">
          <IntroCard />
        </div>
      )}

      <div className="lg:flex lg:h-full lg:items-center">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-4 sm:px-8 md:px-10 lg:snap-none lg:gap-5 lg:overflow-visible lg:px-14 lg:pb-0 no-scrollbar"
        >
          {/* desktop: the intro is the first car on the rail */}
          {desktop && <IntroCard />}

          {ZONES.map((z) => (
            <ZoneCardRail key={z.n} zone={z} />
          ))}

          {/* end cap so the last card isn't flush to the edge */}
          <div className="hidden w-14 shrink-0 lg:block" aria-hidden />
        </div>
      </div>

      {/* progress rail */}
      <div className="absolute inset-x-5 bottom-6 z-20 hidden sm:inset-x-8 md:inset-x-10 lg:inset-x-14 lg:block">
        <span className="block h-px w-full bg-white/25">
          <span
            ref={fillRef}
            className="block h-px w-full origin-left scale-x-0 bg-white"
          />
        </span>
      </div>

      <p className="mt-4 px-5 t-label !text-white/50 sm:px-8 md:px-10 lg:hidden">
        Swipe to explore all six zones →
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function IntroCard() {
  return (
    <article className="w-full lg:w-[24rem] lg:shrink-0 xl:w-[28rem]">
      <div className="flex h-full flex-col justify-center">
        <h2 className="t-h2 uppercase !text-white">MPS Deployment</h2>
        <p className="mt-5 border-t border-white/35 pt-5 text-lg text-white">
          Asset Creation &amp; Revenue Generation
        </p>
        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-white/90">
          Sized to your measured load curve, not a catalogue. Six zones,
          same method.
        </p>
        <CurtainLink href="/services" className="btn btn--onGreen mt-8 self-start">
          Learn More
        </CurtainLink>
      </div>
    </article>
  );
}

/**
 * On lg+ the card is height-bound, not aspect-bound.
 *
 * A fixed 5:4 plate on a 30rem card produced a ~650px card, which does not
 * fit inside the pinned 100svh rail on a 1366×768 laptop — the "View service"
 * row was cut off. The card now takes at most 74svh and the plate is the
 * elastic part: it gives up height first, so the spec block always keeps its
 * content. Below lg the rail scrolls natively and the aspect ratio stands.
 */
function ZoneCardRail({ zone }: { zone: Zone }) {
  const { navigate } = useCurtainRouter();

  return (
    <article className="w-[76vw] shrink-0 snap-start sm:w-[54vw] md:w-[24rem] lg:h-[min(36rem,74svh)] lg:w-[26rem] xl:w-[30rem]">
      <button
        onClick={() => navigate(`/services/${zone.slug}`)}
        className="group flex h-full w-full flex-col bg-sheet text-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5"
      >
        {/* plate */}
        <span className="relative block aspect-[7/6] w-full overflow-hidden bg-paper-2 md:aspect-[5/4] lg:aspect-auto lg:min-h-0 lg:flex-[1_1_44%]">
          <Image
            src={zone.image}
            alt={zone.title}
            fill
            sizes="(max-width: 1024px) 76vw, (max-width: 1280px) 26rem, 30rem"
            className="object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
            loading="lazy"
          />
          <span className="absolute left-3 top-3 bg-paper px-2 py-1 t-label !text-ink">
            Zone {zone.n}
          </span>
        </span>

        {/* spec block */}
        <span className="flex flex-1 flex-col p-5">
          <span className="t-h3 block">{zone.title}</span>
          <span className="t-body mt-2 block text-[13.5px]">{zone.description}</span>

          <span className="mt-4 block rule-t pt-4 text-[13px] leading-relaxed text-ink-2">
            {zone.pain}
          </span>

          <span className="mt-auto grid grid-cols-2 gap-px bg-hair pt-px">
            <span className="bg-sheet pt-4">
              <span className="t-label block">Typical size</span>
              <span className="tnum mt-1 block text-[15px] text-ink">{zone.size}</span>
            </span>
            <span className="bg-sheet pl-4 pt-4">
              <span className="t-label block">{zone.headlineLabel}</span>
              <span className="tnum mt-1 block text-[15px] text-brand-deep">
                {zone.headline}
              </span>
            </span>
          </span>

          <span className="mt-5 flex items-center gap-2 t-label !text-ink">
            View service
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <span className="mt-2 block h-px w-0 bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
        </span>
      </button>
    </article>
  );
}
