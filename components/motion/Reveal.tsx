"use client";

import React, { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * IntersectionObserver + CSS transitions rather than a GSAP timeline per
 * element: one observer handles the whole page, nothing runs on the main
 * thread while scrolling, and it degrades to "already visible" when
 * prefers-reduced-motion is set (handled in globals.css).
 */

type Dir = "up" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  /** direction the element travels from */
  dir?: Dir;
  /** ms before this element starts */
  delay?: number;
  as?: ElementType;
  className?: string;
  /** fraction of the element that must be visible */
  threshold?: number;
}

const DIR_CLASS: Record<Dir, string> = {
  up: "rv-up",
  left: "rv-left",
  right: "rv-right",
  scale: "rv-scale",
  none: "",
};

export function Reveal({
  children,
  dir = "up",
  delay = 0,
  as: Tag = "div",
  className = "",
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.unobserve(el); // reveal once; re-animating on scroll-back is noise
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`rv ${DIR_CLASS[dir]} ${className}`}
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/**
 * A line of type that slides out from behind its own edge. Use one per
 * line — the mask is what makes the effect, so it needs a real box.
 */
export function RevealLine({
  children,
  delay = 0,
  as: Tag = "span",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={`rv-mask ${className}`}
      style={{ ["--rv-delay" as string]: `${delay}ms` }}
    >
      <Tag>{children}</Tag>
    </span>
  );
}

/** Staggers its children by `step` ms without needing per-child props. */
export function Stagger({
  children,
  step = 90,
  dir = "up",
  className = "",
}: {
  children: ReactNode;
  step?: number;
  dir?: Dir;
  className?: string;
}) {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <Reveal dir={dir} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Counts a number up when it scrolls into view. Used for the metric strip —
 * a number that arrives at its value reads as measured rather than claimed.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1400,
  className = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const render = (v: number) =>
      (el.textContent =
        prefix +
        v.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix);

    if (reduced) {
      render(to);
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          render(to * (1 - Math.pow(1 - p, 4)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} className={`tnum ${className}`}>
      {prefix}0{suffix}
    </span>
  );
}
