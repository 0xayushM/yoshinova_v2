"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * The original loading screen, restored — logo top-left, full-width hairline
 * progress bar, percentage underneath.
 *
 * One thing changed: what it waits for. On the live site the bar eased to 90%
 * and then sat there until the 38 MB GLB finished downloading, so on a normal
 * Indian connection the hero was behind a black screen for 30+ seconds. There
 * is no model any more, so it runs a fixed ~1.6 s curve to 100% and leaves.
 * The page underneath is fully rendered the whole time.
 *
 * It also plays once per session rather than on every navigation.
 */
const DURATION = 1600;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const skip =
      sessionStorage.getItem("yn-loaded") === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      setGone(true);
      return;
    }
    sessionStorage.setItem("yn-loaded", "1");

    document.body.style.overflow = "hidden";
    let raf = 0;
    let start: number | null = null;

    const step = (t: number) => {
      if (start === null) start = t;
      const pct = Math.min((t - start) / DURATION, 1);
      const eased = 1 - Math.pow(1 - pct, 3); // ease-out cubic, as before
      setProgress(Math.round(eased * 100));
      if (pct < 1) raf = requestAnimationFrame(step);
      else {
        window.setTimeout(() => setVisible(false), 180);
        window.setTimeout(() => {
          document.body.style.overflow = "";
          setGone(true);
        }, 900);
      }
    };

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!mounted || gone) return null;

  const content = (
    <div
      aria-hidden
      className={`fixed inset-0 z-[99999] flex flex-col transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Panels sit behind the bar and lift as a curtain on exit, so the
          loader and the route transitions share one visual language. */}
      <div
        ref={panelsRef}
        className="absolute inset-0 grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#0a0a0a] origin-top transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform: visible ? "scaleY(1)" : "scaleY(0)",
              transitionDelay: `${(visible ? 0 : i * 55)}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        {/* Logo, matching the navbar position */}
        <div className="p-4 md:px-10 lg:px-14 pt-4">
          <Image
            src="/logo_white.webp"
            alt="Yoshinova"
            width={160}
            height={200}
            priority
            className="object-contain h-20 w-auto sm:h-28 md:h-36 lg:h-[200px]"
          />
        </div>

        {/* Progress bar + percentage */}
        <div className="flex flex-1 items-center">
          <div className="w-full px-4 md:px-10 lg:px-14">
            <div className="relative h-[3px] w-full bg-white/20">
              <div
                className="absolute left-0 top-0 h-full bg-[#6A9F30] transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-lg font-bold text-white/70 sm:text-xl">
              {progress}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
