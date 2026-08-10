"use client";

import React, { useEffect, useRef, useState } from "react";
import ContactDialog from "./ContactDialog";
import { CurtainLink } from "./Curtain";

/**
 * Split editorial hero → deployment mosaic.
 *
 * The previous version floated a white card over full-bleed footage, which
 * always reads as a patch: a panel sitting on a photo, fighting it. Here the
 * type block is *structural* — a paper column that is one half of the grid,
 * meeting the media at a hard vertical rule. Nothing overlays anything, so
 * nothing needs a scrim, and the footage stays full-colour and uncovered.
 *
 * Three movements, all off one scroll value:
 *
 *   0.00 → 0.30  the paper column exits left; the media panel widens to full
 *                bleed and takes the whole stage
 *   0.30 → 0.85  five more tiles slide in; the media shrinks into its cell —
 *                the six deployment zones
 *   0.85 → 1.00  hold. Nothing fades out; the section just unpins.
 *
 * Tiles 1–5 are images today; each is a one-line swap to <video>. See
 * ASSET_PROMPTS.md.
 */

type Cell = { left: number; top: number; width: number; height: number };

/* where the media panel sits before anything moves — the other half of the
   split, not a full-bleed background.

   Three ratios, because the constraint is the headline, not the picture.
   "PROFITABILITY" is one unbreakable 13-character word: on a 1440px screen
   it clears 46% of the width comfortably, on a 1024–1280px laptop it does
   not, and the word was overflowing its column. Below 1280 the paper takes
   the larger half and the media gives way. */
const SPLIT_DESKTOP: Cell = { left: 46, top: 0, width: 54, height: 100 };
const SPLIT_NARROW: Cell = { left: 54, top: 0, width: 46, height: 100 };
const SPLIT_MOBILE: Cell = { left: 0, top: 0, width: 100, height: 44 };
const FULL: Cell = { left: 0, top: 0, width: 100, height: 100 };

const FINAL_DESKTOP: Cell[] = [
  { left: 33.333, top: 0, width: 33.333, height: 50 },
  { left: 0, top: 0, width: 33.333, height: 50 },
  { left: 66.666, top: 0, width: 33.333, height: 50 },
  { left: 0, top: 50, width: 33.333, height: 50 },
  { left: 33.333, top: 50, width: 33.333, height: 50 },
  { left: 66.666, top: 50, width: 33.333, height: 50 },
];

const START_DESKTOP: Cell[] = [
  FULL,
  { left: -120, top: 0, width: 33.333, height: 50 },
  { left: 120, top: 0, width: 33.333, height: 50 },
  { left: -120, top: 50, width: 33.333, height: 50 },
  { left: 33.333, top: 130, width: 33.333, height: 50 },
  { left: 120, top: 50, width: 33.333, height: 50 },
];

const FINAL_MOBILE: Cell[] = [
  { left: 0, top: 0, width: 50, height: 33.333 },
  { left: 50, top: 0, width: 50, height: 33.333 },
  { left: 0, top: 33.333, width: 50, height: 33.333 },
  { left: 50, top: 33.333, width: 50, height: 33.333 },
  { left: 0, top: 66.666, width: 50, height: 33.333 },
  { left: 50, top: 66.666, width: 50, height: 33.333 },
];

const START_MOBILE: Cell[] = [
  FULL,
  { left: 120, top: 0, width: 50, height: 33.333 },
  { left: -120, top: 33.333, width: 50, height: 33.333 },
  { left: 120, top: 33.333, width: 50, height: 33.333 },
  { left: -120, top: 66.666, width: 50, height: 33.333 },
  { left: 50, top: 130, width: 50, height: 33.333 },
];

type Media =
  | { kind: "video"; src: string; poster: string; label: string }
  | { kind: "image"; src: string; label: string };

const MEDIA: Media[] = [
  { kind: "video", src: "/video/yoshinova_hero.mp4", poster: "/video/yoshinova_hero_poster.jpg", label: "Every zone we power" },
  { kind: "image", src: "/images/industrial.webp", label: "Industrial" },
  { kind: "image", src: "/images/commercial.webp", label: "Commercial" },
  { kind: "image", src: "/images/residential.webp", label: "Residential" },
  { kind: "image", src: "/images/solar.webp", label: "Solar" },
  { kind: "image", src: "/images/telecom.webp", label: "Telecom" },
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerpCell = (a: Cell, b: Cell, t: number): Cell => ({
  left: lerp(a.left, b.left, t),
  top: lerp(a.top, b.top, t),
  width: lerp(a.width, b.width, t),
  height: lerp(a.height, b.height, t),
});
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

export default function HeroMosaic() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    // tablets and the 1366×768 / 1280×800 laptop class
    const nq = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
    const rq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mq.matches);
      setNarrow(nq.matches);
      setReduced(rq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    nq.addEventListener("change", sync);
    rq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      nq.removeEventListener("change", sync);
      rq.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setProgress(Math.min(Math.max(0, -rect.top), total) / total);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const START = mobile ? START_MOBILE : START_DESKTOP;
  const FINAL = mobile ? FINAL_MOBILE : FINAL_DESKTOP;
  const SPLIT = mobile ? SPLIT_MOBILE : narrow ? SPLIT_NARROW : SPLIT_DESKTOP;

  const p = reduced ? 1 : progress;
  const split = easeInOutCubic(clamp01(p / 0.3));        // column exits, media widens
  const grid = easeInOutCubic(clamp01((p - 0.3) / 0.55)); // tiles converge

  /* the media panel: split position → full bleed → its grid cell */
  const heroFullBleed = lerpCell(SPLIT, FULL, split);
  const heroCell = lerpCell(heroFullBleed, FINAL[0], grid);

  const columnOut = split;                   // 0 = in place, 1 = gone
  const tileLabelOpacity = clamp01((grid - 0.5) / 0.5);

  return (
    <>
      <section
        ref={wrapperRef}
        className="relative"
        style={{ height: reduced ? "100svh" : "230vh" }}
        aria-label="Yoshinova deployment zones"
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-paper">
          {/* ══ media tiles ══ */}
          <div className="absolute inset-0">
            {MEDIA.map((m, i) => {
              const isHero = i === 0;
              const cell = isHero ? heroCell : lerpCell(START[i], FINAL[i], grid);

              return (
                <div
                  key={m.src}
                  className="absolute"
                  style={{
                    left: `${cell.left}%`,
                    top: `${cell.top}%`,
                    width: `${cell.width}%`,
                    height: `${cell.height}%`,
                    padding: grid > 0.05 ? "5px" : "0",
                    transition: "padding 220ms ease-out",
                    willChange: "left, top, width, height",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden bg-paper-2">
                    {m.kind === "video" ? (
                      <video
                        src={m.src}
                        poster={m.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-hidden
                        preload={isHero ? "auto" : "metadata"}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.src}
                        alt=""
                        aria-hidden
                        loading={i < 3 ? "eager" : "lazy"}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}

                    <div
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 pt-16"
                      style={{
                        opacity: tileLabelOpacity,
                        transform: `translateY(${(1 - tileLabelOpacity) * 10}px)`,
                      }}
                    >
                      <span className="t-label !text-white/90">{m.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ══ the paper column — structural, not an overlay ══ */}
          <div
            className="absolute left-0 top-0 z-10 h-full border-r border-hair bg-paper"
            style={{
              // SPLIT.left, not SPLIT_DESKTOP.left — the column and the media
              // panel have to agree on where the seam is at every breakpoint
              width: mobile ? "100%" : `${SPLIT.left}%`,
              top: mobile ? `${SPLIT_MOBILE.height}%` : 0,
              height: mobile ? `${100 - SPLIT_MOBILE.height}%` : "100%",
              transform: mobile
                ? `translateY(${columnOut * 100}%)`
                : `translateX(${-columnOut * 101}%)`,
              willChange: "transform",
            }}
          >
            <div className="sheet-grid absolute inset-0 opacity-70" />

            {/* Every gap here is fluid against height. With fixed margins
                (mt-6/mt-6/mt-8) plus the nav clearance, the stack needed
                ~640px; a 1366×768 window leaves about 700px, and a shorter
                one left the CTAs below the fold. `min-h-0` lets the column
                actually clip rather than push the stage taller. */}
            <div className="relative flex h-full min-h-0 flex-col justify-center px-6 pt-[max(4.5rem,10svh)] pb-[max(1.5rem,3svh)] sm:px-10 md:px-12 lg:px-14">
              <p className="t-label flex items-center gap-3">
                <span className="h-px w-8 bg-brand" />
                Energy Audit · MPS Deployment · India
              </p>

              {/* balance keeps the three lines from going ragged when the
                  column narrows; the word "Profitability" sets the floor */}
              <h1
                className="t-display uppercase [text-wrap:balance]"
                style={{ marginTop: "clamp(0.75rem, 2.2svh, 1.5rem)" }}
              >
                <span className="block">Your Energy</span>
                <span className="block text-brand-deep">Profitability</span>
                <span className="block text-brand-deep">Partner</span>
              </h1>

              <p
                className="t-lede max-w-[40ch]"
                style={{ marginTop: "clamp(0.75rem, 2.2svh, 1.5rem)" }}
              >
                We audit your floor free, then size a Modular Power System to
                the load curve we measured. Diesel out, peak charges down.
              </p>
              <div className="opacity-0 md:hidden" style={{ marginTop: "clamp(1rem, 3svh, 2rem)" }}>
                <div className="">.</div>
                <div className="">.</div>
                <div className="">.</div>
                <div className="">.</div>
              </div>
              <div
                className="hidden md:flex flex-col gap-2.5 sm:flex-row sm:flex-wrap"
                style={{ marginTop: "clamp(1rem, 3svh, 2rem)" }}
              >
                <button className="btn btn--primary" onClick={() => setDialogOpen(true)}>
                  Request Free Audit
                </button>
                <CurtainLink href="/contact" className="btn btn--outline">
                  Contact Us
                </CurtainLink>
                <a href="/brochure/yoshinova-mps-brochure.pdf" download className="btn btn--outline group">
                  Download Brochure
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                  </svg>
                </a>
              </div>

              {/* the site's own motif, drawn once: a day flattened by an MPS */}
              {/* <figure className="mt-auto hidden pt-10 md:block">
                <svg viewBox="0 0 420 60" className="h-14 w-full max-w-[420px]" aria-hidden>
                  <path
                    d="M0 46 L60 44 Q100 42 130 20 T210 8 Q260 6 300 26 T420 40"
                    fill="none" stroke="var(--color-rust)" strokeWidth="1.5"
                    strokeDasharray="620" strokeDashoffset="620"
                    style={{ animation: "hero-draw 2.2s var(--ease-out-quint) .6s forwards" }}
                  />
                  <path
                    d="M0 48 L60 47 Q120 46 180 30 T420 28"
                    fill="none" stroke="var(--color-brand)" strokeWidth="2"
                    strokeDasharray="620" strokeDashoffset="620"
                    style={{ animation: "hero-draw 2.2s var(--ease-out-quint) 1s forwards" }}
                  />
                </svg>
                <figcaption className="t-label mt-1 flex gap-5">
                  <span className="text-rust">— your day today</span>
                  <span className="text-brand-deep">— with a right-sized MPS</span>
                </figcaption>
              </figure> */}
            </div>
          </div>

          {/* ══ status pill ══ */}
          {/* desktop only — on mobile this sat on top of the hero CTAs, and
              the fixed contact bar now occupies that corner */}
          {/* <div className="absolute bottom-6 right-24 z-20 hidden items-center gap-2 border border-hair bg-paper/90 px-4 py-2 backdrop-blur-sm md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span className="t-label">
              {grid < 1 ? "Scroll · watch the zones separate" : "Six deployment zones"}
            </span>
          </div> */}
        </div>
      </section>

      <ContactDialog isOpen={dialogOpen} onClose={() => setDialogOpen(false)} type="energy-audit" />
    </>
  );
}
