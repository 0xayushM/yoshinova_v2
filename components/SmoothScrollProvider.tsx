"use client";

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * Lightweight site-wide smooth-scroll using Lenis.
 *
 * Why Lenis (not GSAP ScrollSmoother)
 *  - Doesn't restructure the DOM with a fixed wrapper, so no first-paint
 *    "black screen" on client-side navigation.
 *  - ~3 kB gzipped, runs on a single shared rAF — does not stack with React
 *    re-renders.
 *  - Updates the real window.scrollY (via window.scrollTo) and emits native
 *    'scroll' events, so the homepage's 3D ModelViewer / SceneRig — which
 *    reads window.scrollY directly — keeps working without any code change.
 *
 * GSAP integration
 *  - We funnel Lenis's scroll callback into ScrollTrigger.update so any
 *    scroll-trigger animation on any page stays in sync. Lenis's rAF is
 *    driven by gsap.ticker so we avoid a second concurrent rAF loop.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect users who prefer reduced motion — never instantiate Lenis.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      // Tuned for "feels native, not floaty" on a desktop trackpad and on
      // touch devices. Keep the duration short so navigation jumps don't
      // feel sluggish.
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Native touch — no synthetic momentum. Lenis only smooths wheel.
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Forward scroll events to ScrollTrigger so any GSAP triggers on this
    // page (UseCaseGrid hovers, MarketInsight reveals, future timelines)
    // stay aligned with the smoothed scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis off gsap.ticker — one rAF for the whole page.
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    // Disable ticker lag-smoothing for low-latency wheel input.
    gsap.ticker.lagSmoothing(0);

    // Reset scroll to top on route entry.
    lenis.scrollTo(0, { immediate: true });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
