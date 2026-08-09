"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LiveMetricChart, { LiveMetricSeries as Series } from './LiveMetricChart';

interface LiveMetricGraphProps {
  /** Section eyebrow (small caps label above the title) */
  eyebrow: string;
  /** Big title above the graph */
  title: string;
  /** Subtitle / explanatory copy */
  subtitle?: string;
  /** Y-axis units label (e.g. "kW", "₹/hr") */
  yUnit?: string;
  /** Two-three series to plot. First series is primary. */
  series: Series[];
  /** Three callouts shown to the right of the graph */
  callouts: { label: string; value: string; sub?: string }[];
  /** Background — light or dark */
  theme?: 'light' | 'dark';
}

/**
 * A polished, animated 24-hour metric graph.
 * - Lines draw themselves once on mount + every loop
 * - A live "now" sweep marker runs across continuously
 * - Numeric counters tick up on the right
 *
 * Sized to a healthy ~16:8 aspect (wider than tall but not flat).
 */
export default function LiveMetricGraph({
  eyebrow,
  title,
  subtitle,
  yUnit = 'kW',
  series,
  callouts,
  theme = 'light',
}: LiveMetricGraphProps) {
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Counter tick-ups
      callouts.forEach((c, i) => {
        const el = counterRefs.current[i];
        if (!el) return;
        // Try to extract a numeric portion (handles "-45%", "12.4 kW", "₹2,340", etc.)
        const match = c.value.match(/-?\d[\d,]*(?:\.\d+)?/);
        if (!match) {
          el.textContent = c.value;
          return;
        }
        const raw = match[0];
        const isNegative = raw.startsWith('-') || c.value.startsWith('-');
        const cleanNum = parseFloat(raw.replace(/,/g, '').replace('-', ''));
        if (Number.isNaN(cleanNum)) {
          el.textContent = c.value;
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: cleanNum,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.2 + i * 0.15,
          onUpdate: () => {
            const display = obj.v >= 100 ? Math.round(obj.v) : Math.round(obj.v * 10) / 10;
            const prefix = isNegative ? '-' : '';
            const suffix = c.value.replace(raw, '').replace('-', '');
            el.textContent = `${prefix}${display.toLocaleString()}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [callouts]);

  // Theme tokens
  const isDark = theme === 'dark';
  const sectionBg = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
  const cardBg = isDark ? 'bg-white/[0.03] border border-white/10' : 'bg-[#f8fafc] border border-black/[0.06]';
  const eyeColor = '#6A9F30';
  const titleColor = isDark ? 'text-white' : 'text-black';
  const subColor = isDark ? 'text-white/65' : 'text-black/60';
  const calloutBorder = isDark ? 'border-white/10' : 'border-black/10';
  const calloutLabel = isDark ? 'text-white/50' : 'text-black/50';
  const calloutSub = isDark ? 'text-white/55' : 'text-black/55';

  return (
    <section ref={sectionRef} className={`w-full ${sectionBg} px-6 md:px-14 py-24 md:py-32`}>
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-end md:justify-between mb-10 md:mb-12 gap-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: eyeColor }}>
              {eyebrow}
            </p>
            <h2 className={`${titleColor} text-3xl md:text-5xl font-medium uppercase tracking-tight leading-tight`}>
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className={`${subColor} text-base md:text-lg leading-relaxed max-w-md mt-4 md:mt-0`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Graph */}
          <div className={`lg:col-span-8 ${cardBg} p-4 md:p-8 flex items-center justify-center`}>
            <LiveMetricChart series={series} yUnit={yUnit} theme={theme} />
          </div>

          {/* Callout column */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            {callouts.map((c, i) => (
              <div key={i} className={`${cardBg} p-5 md:p-6 flex flex-col justify-center`}>
                <p className={`${calloutLabel} text-[10px] uppercase tracking-widest mb-2`}>{c.label}</p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-medium leading-none mb-2 text-[#6A9F30]">
                  <span
                    ref={(el) => {
                      counterRefs.current[i] = el;
                    }}
                  >
                    {c.value}
                  </span>
                </p>
                {c.sub && (
                  <p className={`${calloutSub} text-xs md:text-sm leading-relaxed border-t ${calloutBorder} pt-3 mt-2`}>
                    {c.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
